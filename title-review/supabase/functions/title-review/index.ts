// CLA Title Review: standalone review service (Supabase project "CLA Training").
// No logins by design (owner's decision, Nov 17 2026). The website calls this function;
// tables live in schema title_review and are reachable only from here.
import postgres from "npm:postgres@3.4.4";
import { createClient } from "npm:@supabase/supabase-js@2.45.4";
import { PDFDocument, StandardFonts } from "npm:pdf-lib@1.17.1";

const MODEL = "claude-sonnet-5-5";
const MAX_TOKENS = 32000;
// Sonnet 5.5 thinks at "high" effort by default, which made big files run past the server's ~6.5-minute limit.
const EFFORT = "medium";
// Estimated list prices per million tokens (verify against Anthropic pricing page).
const PRICE_IN = 2.0, PRICE_OUT = 10.0;
const BUCKET = "title-review";
const SELFTEST_TOKEN = "cla-selftest-q8w2";
const RELAY_URL = "https://aqcervntopidtcazcmlv.supabase.co/functions/v1/claude-relay";
const RELAY_TOKEN = "0LuyYaZiw2TqIo6sDcojrSABf_5LLhsw";

const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { prepare: false, max: 3 });
const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, {
  auth: { persistSession: false },
});

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });
const clip = (s: unknown, n: number) => String(s ?? "").slice(0, n);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Use POST" }, 405);
  let body: any;
  try { body = await req.json(); } catch { return json({ error: "Bad request" }, 400); }
  try {
    switch (body.action) {
      case "create": return json(await createReview(body));
      case "start": return json(await startReview(body.id));
      case "get": return json(await getReview(body.id));
      case "status": return json(await getStatuses(body.ids));
      case "list": return json(await listReviews());
      case "feedback": return json(await saveFeedback(body));
      case "rules": return json(await getRules());
      case "reparse": return json(await reparse(body.id));
      case "selftest":
        if (body.token !== SELFTEST_TOKEN) return json({ error: "not found" }, 404);
        return json(await selfTest());
      default: return json({ error: "Unknown action" }, 400);
    }
  } catch (e) {
    console.error(e);
    return json({ error: String((e as Error)?.message ?? e) }, 500);
  }
});

/* ---------------- actions ---------------- */
async function createReview(b: any) {
  const files = Array.isArray(b.files) ? b.files.slice(0, 12) : [];
  if (!files.length) throw new Error("Add at least the search package.");
  const [row] = await sql`
    insert into title_review.reviews (file_no, state, tx_type, underwriter, reviewer_name, notes, status)
    values (${clip(b.file_no, 60)}, ${clip(b.state, 4) || "MD"}, ${clip(b.tx_type, 40)}, ${clip(b.underwriter, 60)},
            ${clip(b.reviewer_name, 80)}, ${clip(b.notes, 2000)}, 'uploading')
    returning id`;
  const uploads = [];
  const meta = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const safe = clip(f.name, 120).replace(/[^A-Za-z0-9._-]+/g, "_") || `file${i}.pdf`;
    const path = `${row.id}/${i}-${safe}`;
    const { data, error } = await sb.storage.from(BUCKET).createSignedUploadUrl(path);
    if (error) throw error;
    uploads.push({ path, token: data.token, signedUrl: data.signedUrl });
    meta.push({ path, name: clip(f.name, 200), kind: ["search", "commitment", "contract", "other"].includes(f.kind) ? f.kind : "other", bytes: Number(f.bytes) || 0 });
  }
  await sql`update title_review.reviews set files = ${sql.json(meta)} where id = ${row.id}`;
  return { id: row.id, uploads };
}

async function startReview(id: string) {
  const [r] = await sql`update title_review.reviews set status = 'queued', progress = 'Waiting to start', error = null, raw_output = null
                        where id = ${id} and status in ('uploading','error') returning id`;
  if (!r) throw new Error("Review not found or already running.");
  // @ts-ignore EdgeRuntime is provided by Supabase
  EdgeRuntime.waitUntil(runReview(id));
  return { ok: true };
}

async function getReview(id: string) {
  const [r] = await sql`select id, created_at, file_no, state, tx_type, underwriter, reviewer_name, notes, files, status, progress,
                               result, model, usage, error, rules_version, started_at, completed_at
                        from title_review.reviews where id = ${id}`;
  if (!r) throw new Error("Review not found.");
  // Short-lived links so the page can show and download the uploaded PDFs (1 hour).
  const files = [];
  for (const f of (r.files || []) as any[]) {
    const { data } = await sb.storage.from(BUCKET).createSignedUrl(f.path, 3600);
    files.push({ name: f.name, kind: f.kind, bytes: f.bytes, url: data?.signedUrl ?? null });
  }
  r.files = files;
  const fb = await sql`select finding_id, verdict, note, reviewer_name from title_review.feedback
                       where review_id = ${id} and finding_id is not null`;
  return { review: r, feedback: fb };
}

async function getStatuses(ids: unknown) {
  const list = Array.isArray(ids) ? ids.filter((x) => typeof x === "string").slice(0, 20) : [];
  if (!list.length) return { reviews: [] };
  // A run that has shown no progress for 8 minutes was cut off; mark it so the team can retry.
  await sql`update title_review.reviews set status = 'error', error = 'The review was cut off before it finished. Click Retry.', completed_at = now()
            where id = any(${list}::uuid[]) and status in ('queued','running') and started_at < now() - interval '8 minutes'`;
  const rows = await sql`select id, file_no, status, progress, error, started_at, (usage->>'est_cost_usd')::numeric as cost,
                                result->'summary'->>'overall' as overall
                         from title_review.reviews where id = any(${list}::uuid[])`;
  return { reviews: rows };
}

async function listReviews() {
  const rows = await sql`
    select r.id, r.created_at, r.file_no, r.state, r.tx_type, r.reviewer_name, r.status,
           r.result->'summary'->>'overall' as overall,
           jsonb_array_length(coalesce(r.result->'findings','[]'::jsonb)) as findings,
           (select count(*) from jsonb_array_elements(coalesce(r.result->'findings','[]'::jsonb)) f where (f->>'team_missed')::boolean) as missed,
           (select count(*) from title_review.feedback f where f.review_id = r.id) as feedback,
           (r.usage->>'est_cost_usd')::numeric as cost
    from title_review.reviews r order by r.created_at desc limit 60`;
  return { reviews: rows };
}

async function saveFeedback(b: any) {
  const verdict = ["correct", "wrong", "not_needed", "missed", "note"].includes(b.verdict) ? b.verdict : null;
  if (!verdict || !b.review_id) throw new Error("Missing feedback details.");
  if (verdict === "missed" || !b.finding_id) {
    if (!clip(b.note, 4000).trim()) throw new Error("Describe what was missed.");
    await sql`insert into title_review.feedback (review_id, verdict, category, priority, note, reviewer_name)
              values (${b.review_id}, 'missed', ${clip(b.category, 60)}, ${clip(b.priority, 20)}, ${clip(b.note, 4000)}, ${clip(b.reviewer_name, 80)})`;
  } else {
    await sql`insert into title_review.feedback (review_id, finding_id, finding_title, category, priority, verdict, note, reviewer_name)
              values (${b.review_id}, ${clip(b.finding_id, 20)}, ${clip(b.finding_title, 300)}, ${clip(b.category, 60)}, ${clip(b.priority, 20)},
                      ${verdict}, ${clip(b.note, 4000)}, ${clip(b.reviewer_name, 80)})
              on conflict (review_id, finding_id) where finding_id is not null
              do update set verdict = excluded.verdict, note = excluded.note, reviewer_name = excluded.reviewer_name, updated_at = now()`;
  }
  return { ok: true };
}

async function getRules() {
  const [r] = await sql`select version, text, note, created_at from title_review.rules order by version desc limit 1`;
  return r ?? { version: 0, text: "" };
}

/* ---------------- the review ---------------- */
async function runReview(id: string) {
  const setProgress = (p: string) => sql`update title_review.reviews set progress = ${p} where id = ${id}`;
  let rawText = "";
  try {
    const [r] = await sql`update title_review.reviews set status = 'running', started_at = now(), progress = 'Reading the PDFs'
                          where id = ${id} returning *`;
    const rules = await getRules();
    const corrections = await sql`
      select verdict, category, finding_title, note from title_review.feedback
      where verdict in ('missed','wrong') and review_id is not null order by created_at desc limit 40`;

    const content: any[] = [];
    const files = (r.files || []) as any[];
    const order = { search: 0, commitment: 1, contract: 2, other: 3 } as Record<string, number>;
    files.sort((a, b) => (order[a.kind] ?? 3) - (order[b.kind] ?? 3));
    let totalBytes = 0;
    for (const f of files) {
      // Claude fetches each PDF straight from private storage through a short-lived signed link,
      // so this function never loads or re-encodes large files (that hit the CPU limit on an 11 MB scan).
      const { data, error } = await sb.storage.from(BUCKET).createSignedUrl(f.path, 3600);
      if (error || !data?.signedUrl) throw new Error(`Couldn't open "${f.name}". Upload it again.`);
      totalBytes += Number(f.bytes) || 0;
      const label = f.kind === "search" ? "SEARCH PACKAGE" : f.kind === "commitment" ? "DRAFT COMMITMENT" : f.kind === "contract" ? "SALES CONTRACT" : "OTHER DOCUMENT";
      content.push({ type: "text", text: `The next document is the ${label}. Its exact file name is "${f.name}".` });
      content.push({ type: "document", source: { type: "url", url: data.signedUrl }, title: clip(f.name, 200) });
    }
    if (totalBytes > 25 * 1024 * 1024) throw new Error("These files add up to more than 25 MB, too much to finish in one run. Leave out the contract or other extras, or split the search package.");
    if (totalBytes > 30 * 1024 * 1024) throw new Error("The files add up to more than 30 MB. Remove duplicates or very large scans and try again.");

    const hasCommitment = files.some((f) => f.kind === "commitment");
    content.push({ type: "text", text: taskPrompt(r, hasCommitment, corrections, files.map((f) => f.name)) });
    await setProgress("Claude is reviewing the file (usually 1-4 minutes)");

    const system = rules.text;
    // Use a key saved in this project if there is one; otherwise go through the relay in the
    // "test portal" project, where John saved the key on Nov 17 2026.
    const ownKey = (Deno.env.get("ANTHROPIC_API_KEY") ?? "").trim();
    // Streamed, so a long answer keeps bytes flowing and never trips the 150-second idle timeout.
    const reqBody = JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, output_config: { effort: EFFORT }, stream: true, system, messages: [{ role: "user", content }] });
    const resp = ownKey
      ? await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: { "x-api-key": ownKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
          body: reqBody,
        })
      : await fetch(RELAY_URL, { method: "POST", headers: { "x-cla-relay-token": RELAY_TOKEN, "content-type": "application/json" }, body: reqBody });
    if (!resp.ok) {
      let errBody: any = {};
      try { errBody = await resp.json(); } catch { /* not JSON */ }
      throw new Error(friendlyApiError(resp.status, errBody));
    }
    const out = await readStream(resp, async (chars) => {
      await setProgress(`Claude is writing the review (${Math.round(chars / 1000)}k characters so far)`);
    });
    rawText = out.text;
    const inTok = out.usage?.input_tokens ?? 0, outTok = out.usage?.output_tokens ?? 0;
    const usage = { input_tokens: inTok, output_tokens: outTok, est_cost_usd: Math.round(((inTok * PRICE_IN + outTok * PRICE_OUT) / 1e6) * 100) / 100, stop_reason: out.stop_reason };
    await sql`update title_review.reviews set usage = ${sql.json(usage)} where id = ${id}`;
    let result = parseJson(rawText);
    if (!result && out.stop_reason === "max_tokens") {
      // Cut off near the end: keep everything that came through complete.
      result = repairJson(rawText);
      if (result) result.partial = true;
    }
    if (!result && out.stop_reason === "max_tokens") throw new Error("Claude's answer was too long and got cut off. Click Retry; if it happens again, split the package into smaller PDFs.");
    if (!result || !Array.isArray(result.findings)) throw new Error("The review came back unreadable. Click Retry.");
    result.findings.forEach((f: any, i: number) => { if (!f.id) f.id = "F" + (i + 1); });

    await sql`update title_review.reviews set status = 'done', progress = 'Done', result = ${sql.json(result)},
              model = ${out.model ?? MODEL}, rules_version = ${rules.version}, completed_at = now()
              where id = ${id}`;
  } catch (e) {
    console.error("review failed", id, e);
    await sql`update title_review.reviews set status = 'error', progress = '', error = ${String((e as Error)?.message ?? e).slice(0, 1000)},
              raw_output = ${rawText ? rawText.slice(0, 200000) : null}, completed_at = now() where id = ${id}`;
  }
}

function taskPrompt(r: any, hasCommitment: boolean, corrections: any[], fileNames: string[]) {
  const corr = corrections.length
    ? "RECENT TEAM CORRECTIONS (do not repeat these mistakes):\n" +
      corrections.map((c: any) => `- [${c.verdict === "missed" ? "AI MISSED" : "AI WRONG"}] ${c.category || ""}: ${c.finding_title ? `"${c.finding_title}" - ` : ""}${c.note || ""}`).join("\n") + "\n\n"
    : "";
  return `${corr}TASK
Review this title file the way a senior CLA title examiner would. File: ${r.file_no || "(none)"}. State: ${r.state}. Transaction: ${r.tx_type}. Underwriter: ${r.underwriter}.
${r.notes ? "Notes from the team: " + r.notes : ""}
${hasCommitment ? "A draft commitment is included. Compare it line by line with the search and set team_missed true for anything the commitment gets wrong or leaves out." : "No draft commitment was uploaded. Review the search only; team_missed is false for every finding."}
Cite recording references (liber/folio or instrument) for every finding. For "pages", give the exact file name (one of: ${fileNames.map((n) => `"${n}"`).join(", ")}) and the PDF page number (1 = first page of that PDF file, counting every page, not the page number printed on the paper) where the evidence is. Do not invent facts that are not in the documents; if something needed is missing from the package, make that a finding (category Search Quality). Never include SSNs or account numbers.

KEEP IT TIGHT: at most 15 findings, merge related items, and keep every text field under 300 characters (qualia_note under 1500). Write the JSON on as few lines as possible, with no indentation.

Reply with ONLY one JSON object, no other text, in this shape:
{"summary":{"property":"","county":"","vesting":"","vesting_deed":"","seller":"","buyer":"","lender":"","through_date":"","commitment_date":"","open_mortgages":0,"judgments_liens":0,"overall":"ready|curative_needed|escalate","headline":"one plain sentence on the state of title"},
"findings":[{"id":"F1","priority":"CRITICAL|HIGH|MEDIUM|LOW","category":"","title":"","recording_ref":"","parties":"","issue":"","concern":"","documents_required":"","action":"","underwriter_review":false,"team_missed":false,"source":"short description, e.g. Search package p.4","pages":[{"file":"exact file name","page":4}],"confidence":"high|medium|low"}],
"commitment_check":[{"item":"","status":"ok|issue|missing","note":""}],
"questions":[""],
"qualia_note":"",
"qualia_tasks":[""]}
Order findings CRITICAL first. commitment_check is [] if no commitment was uploaded.`;
}

// Reads an Anthropic streaming (SSE) response into {text, usage, stop_reason, model}.
async function readStream(resp: Response, onProgress: (chars: number) => Promise<unknown>) {
  const reader = resp.body!.getReader();
  const dec = new TextDecoder();
  let buf = "", text = "", model = MODEL, stop_reason = null as string | null;
  const usage = { input_tokens: 0, output_tokens: 0 };
  let lastReport = 0;
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    buf += dec.decode(value, { stream: true });
    let idx;
    while ((idx = buf.indexOf("\n\n")) >= 0) {
      const chunk = buf.slice(0, idx); buf = buf.slice(idx + 2);
      const dataLine = chunk.split("\n").find((l) => l.startsWith("data:"));
      if (!dataLine) continue;
      let ev: any;
      try { ev = JSON.parse(dataLine.slice(5).trim()); } catch { continue; }
      if (ev.type === "message_start") { model = ev.message?.model ?? model; usage.input_tokens = ev.message?.usage?.input_tokens ?? 0; }
      else if (ev.type === "content_block_delta" && ev.delta?.type === "text_delta") { text += ev.delta.text; }
      else if (ev.type === "message_delta") { stop_reason = ev.delta?.stop_reason ?? stop_reason; if (ev.usage?.output_tokens) usage.output_tokens = ev.usage.output_tokens; }
      else if (ev.type === "error") { throw new Error(friendlyApiError(ev.error?.type === "overloaded_error" ? 529 : 500, ev)); }
    }
    if (text.length - lastReport > 4000) { lastReport = text.length; await onProgress(text.length); }
  }
  return { text, usage, stop_reason, model };
}

// Closes a JSON answer that was cut off mid-way, dropping the last unfinished item.
function repairJson(text: string) {
  const a = text.indexOf("{");
  if (a < 0) return null;
  const t = text.slice(a);
  const stack: string[] = [];
  let inStr = false, esc = false, lastCut = -1, lastStack: string[] = [];
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (inStr) { if (esc) esc = false; else if (c === "\\") esc = true; else if (c === '"') inStr = false; continue; }
    if (c === '"') inStr = true;
    else if (c === "{" || c === "[") stack.push(c === "{" ? "}" : "]");
    else if (c === "}" || c === "]") { stack.pop(); lastCut = i + 1; lastStack = stack.slice(); }
    else if (c === ",") { lastCut = i; lastStack = stack.slice(); }
  }
  if (lastCut < 0) return null;
  const fixed = t.slice(0, lastCut) + lastStack.reverse().join("");
  try { return JSON.parse(fixed); } catch { return null; }
}

async function reparse(id: string) {
  const [r] = await sql`select raw_output from title_review.reviews where id = ${id}`;
  if (!r?.raw_output) throw new Error("Nothing saved to recover.");
  const result = parseJson(r.raw_output) ?? repairJson(r.raw_output);
  if (!result || !Array.isArray(result.findings)) throw new Error("Could not recover this review.");
  result.partial = true;
  result.findings.forEach((f: any, i: number) => { if (!f.id) f.id = "F" + (i + 1); });
  await sql`update title_review.reviews set status = 'done', progress = 'Done', error = null, result = ${sql.json(result)} where id = ${id}`;
  return { ok: true, findings: result.findings.length };
}

function parseJson(text: string) {
  try { return JSON.parse(text); } catch { /* fall through */ }
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) { try { return JSON.parse(fence[1]); } catch { /* */ } }
  const a = text.indexOf("{"), b = text.lastIndexOf("}");
  if (a >= 0 && b > a) { try { return JSON.parse(text.slice(a, b + 1)); } catch { /* */ } }
  // Claude sometimes writes a broken copy, says so, then a corrected copy: try each JSON start on a new line, latest first.
  const starts: number[] = []; let i = -1;
  while ((i = text.indexOf('{"', i + 1)) >= 0) if (i === 0 || /\n\s*$/.test(text.slice(Math.max(0, i - 4), i))) starts.push(i);
  for (const s of starts.reverse()) { try { return JSON.parse(text.slice(s, b + 1)); } catch { /* */ } }
  return null;
}

function friendlyApiError(status: number, out: any) {
  const msg = String(out?.error?.message ?? "");
  if (status === 401) return "The Claude API key isn't working. John needs to re-save ANTHROPIC_API_KEY in Supabase.";
  if (status === 400 && /credit|balance/i.test(msg)) return "The Claude account is out of credits. John needs to add credits at platform.claude.com.";
  if (status === 400 && /page/i.test(msg)) return "The PDFs have too many pages for one review (limit about 100 pages total). Remove pages that don't matter and try again.";
  if (status === 413 || /too large|too long|prompt is too long/i.test(msg)) return "The files are too large for one review. Remove duplicates or split the package and try again.";
  if (status === 429) return "Too many reviews at once or a spending limit was reached. Wait a few minutes and click Retry.";
  if (status >= 500 || status === 529) return "Claude is busy right now. Wait a minute and click Retry.";
  return `Claude returned an error (${status}): ${msg.slice(0, 300)}`;
}

/* ---------------- self test with a made-up file (no client data) ---------------- */
async function selfTest() {
  const pdf = await PDFDocument.create();
  const font = await pdf.embedFont(StandardFonts.Helvetica);
  const pages = [
    ["SAMPLE ABSTRACTORS INC.  RECORD TITLE REPORT (NOT AN OPINION OF TITLE)", "Case No: TEST-26-00001   County: Montgomery County, MD   Full Search (60 years)",
     "Property: LOT 7, BLOCK C, SECTION 2, \"MAPLE RIDGE\", PLAT BOOK 210, PLAT 45", "Fee Simple Vested In: JOHN Q. SAMPLE and MARY R. SAMPLE, husband and wife, tenants by the entirety",
     "By Deed Dated: 3/14/2015  Recorded: 3/30/2015  Liber 50123 Folio 211", "Subject To:", "1. DEED OF TRUST to ABC Trustee, securing First Example Bank, $380,000.00, dated 3/14/2015, recorded 3/30/2015, Liber 50123 Folio 230",
     "2. DEED OF TRUST (HELOC) to XYZ Trustee, securing Second Example Credit Union, $75,000.00, dated 6/2/2019, recorded 6/20/2019, Liber 57001 Folio 12",
     "   Certificate of Satisfaction recorded 1/10/2022 Liber 63110 Folio 88 references Liber 57010 Folio 12", "Judgments and Liens:", "- State of Maryland (Comptroller) v. John Q. Sample, Notice of Lien for unpaid tax $4,212.18, Circuit Court Case 24-L-1199, filed 9/12/2024",
     "- Capital One v. John Sample, District Court judgment $2,890.00, Case D-061-CV-23-004411, entered 5/5/2023 (no Notice of Lien in Circuit Court found)",
     "Restrictions on Plat: 25' Building Restriction Line   Easements: 10' PUE per plat; WSSC ROW Liber 9811 Folio 402", "Covenants: Declaration Liber 9700 Folio 1",
     "Taxes: Account 07-01234567. 2025/2026 1st half PAID; 2nd half $3,118.42 DUE 12/31. Front Foot Benefit (WSSC) $412.00/yr, 14 years remaining",
     "Public Records Abstracted Through: 9/15/2026     Abstractor: J. Doe"],
    ["DRAFT COMMITMENT (TEST)  ALTA 2021  Fidelity National Title Insurance Company   File TEST-26-00001", "Schedule A: Commitment Date: October 30, 2026 8:00 AM",
     "Policy: ALTA Homeowner's  Proposed Insured: Pat Buyer  Amount: $640,000.00", "Loan Policy: Proposed Insured: Example Mortgage Corp., ISAOA/ATIMA  Amount: TBD",
     "Vested in: John Q. Sample, by Deed Liber 50123 Folio 211", "Schedule B-I: 4A. Deed from John Q. Sample and Mary R. Sample to Pat Buyer. 4B. Deed of Trust from Pat Buyer to Example Mortgage Corp.",
     "6. Payment and release of Deed of Trust Liber 50123 Folio 230 (First Example Bank).", "7. Taxes: informational only.",
     "Schedule B-II: 1-5 standard exceptions. 6. 25' BRL per plat. 7. 10' PUE per plat. 8. Declaration Liber 9700 Folio 1."],
  ];
  for (const lines of pages) {
    const p = pdf.addPage([612, 792]);
    let y = 750;
    for (const line of lines) {
      for (const chunk of (line.match(/.{1,95}(\s|$)/g) || [line])) { p.drawText(chunk.trim(), { x: 40, y, size: 10, font }); y -= 15; }
      y -= 4;
    }
  }
  const bytes = await pdf.save();
  const [row] = await sql`insert into title_review.reviews (file_no, state, tx_type, underwriter, reviewer_name, notes, status)
                          values ('TEST-26-00001', 'MD', 'Purchase', 'Fidelity National (FNTIC)', 'Self test (Claude)', 'Made-up test file, not a real client.', 'queued') returning id`;
  const path = `${row.id}/0-selftest.pdf`;
  const { error } = await sb.storage.from(BUCKET).upload(path, bytes, { contentType: "application/pdf" });
  if (error) throw error;
  await sql`update title_review.reviews set files = ${sql.json([{ path, name: "selftest-search-and-commitment.pdf", kind: "search", bytes: bytes.length }])} where id = ${row.id}`;
  const t0 = Date.now();
  await runReview(row.id);
  const [done] = await sql`select status, error, usage, result->'summary' as summary, jsonb_array_length(coalesce(result->'findings','[]'::jsonb)) as findings from title_review.reviews where id = ${row.id}`;
  return { id: row.id, seconds: Math.round((Date.now() - t0) / 1000), ...done };
}
