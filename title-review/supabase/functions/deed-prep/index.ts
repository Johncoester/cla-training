// CLA Deed Prep: pulls deed facts from the contract and the search (Supabase project "CLA Training").
// Separate from title-review on purpose (John, Nov 19 2026: parts must be movable on their own). The AI returns FACTS only;
// the deed wording comes from js/deed-md.js (CLA's recorded deed language), so the AI never writes the deed itself.
import postgres from "npm:postgres@3.4.4";
import { createClient } from "npm:@supabase/supabase-js@2.45.4";

const MODEL = "claude-sonnet-5-5";
const MAX_TOKENS = 16000;
const EFFORT = "medium";
const PRICE_IN = 2.0, PRICE_OUT = 10.0;
const BUCKET = "title-review";
const RELAY_URL = "https://aqcervntopidtcazcmlv.supabase.co/functions/v1/claude-relay";
const RELAY_TOKEN = "0LuyYaZiw2TqIo6sDcojrSABf_5LLhsw";

const sql = postgres(Deno.env.get("SUPABASE_DB_URL")!, { prepare: false, max: 3 });
const sb = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const CORS = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...CORS, "Content-Type": "application/json" } });
const clip = (s: unknown, n: number) => String(s ?? "").slice(0, n);

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  let body: any; try { body = await req.json(); } catch { return json({ error: "Bad request" }, 400); }
  try {
    switch (body.action) {
      case "from_review": return json(await fromReview(body));
      case "create": return json(await createDeed(body));
      case "start": return json(await startDeed(body.id));
      case "get": return json(await getDeed(body.id));
      case "status": return json(await statuses(body.ids));
      case "save_edits": return json(await saveEdits(body));
      case "approve": return json(await approve(body));
      case "feedback": return json(await feedback(body));
      case "list": return json(await listDeedOnly());
      default: return json({ error: "Unknown action" }, 400);
    }
  } catch (e) { console.error(e); return json({ error: String((e as Error)?.message ?? e) }, 500); }
});

// Deed from a finished title review: reuses the files already uploaded (search, commitment, contract).
async function fromReview(b: any) {
  const [r] = await sql`select id, file_no, files from title_review.reviews where id = ${b.review_id}`;
  if (!r) throw new Error("Review not found.");
  const files = (r.files || []) as any[];
  if (!files.some((f) => f.kind === "contract" || /contract|agreement of sale|sales? agreement/i.test(f.name))) throw new Error("This review has no sales contract. Upload the contract to prepare the deed.");
  const [d] = await sql`insert into title_review.deeds (review_id, file_no, reviewer_name, files, status) values (${r.id}, ${r.file_no}, ${clip(b.reviewer_name, 80)}, ${sql.json(files)}, 'queued') returning id`;
  // @ts-ignore
  EdgeRuntime.waitUntil(runDeed(d.id));
  return { id: d.id };
}
// Deed on its own: the page uploads the contract and search through signed links, then calls start.
async function createDeed(b: any) {
  const files = Array.isArray(b.files) ? b.files.slice(0, 12) : [];
  const request = b.deed_only ? checkRequest(b.request) : null;   // Deed only (no contract): the deed request form takes the contract's place
  if (!request && !files.some((f: any) => f.kind === "contract")) throw new Error("Add the sales contract. The deed needs the sellers, buyers and price from it.");
  if (!files.some((f: any) => f.kind === "search")) throw new Error("Add the search package. The deed needs the vesting deed and legal description from it.");
  const [d] = await sql`insert into title_review.deeds (file_no, reviewer_name, status, request) values (${clip(b.file_no, 60)}, ${clip(b.reviewer_name, 80)}, 'uploading', ${request ? sql.json(request) : null}) returning id`;
  const uploads = [], meta = [];
  for (let i = 0; i < files.length; i++) {
    const f = files[i];
    const path = `deeds/${d.id}/${i}-${clip(f.name, 120).replace(/[^A-Za-z0-9._-]+/g, "_") || "file.pdf"}`;
    const { data, error } = await sb.storage.from(BUCKET).createSignedUploadUrl(path);
    if (error) throw error;
    uploads.push({ path, token: data.token });
    meta.push({ path, name: clip(f.name, 200), kind: ["search", "commitment", "contract", "other"].includes(f.kind) ? f.kind : "other", bytes: Number(f.bytes) || 0 });
  }
  await sql`update title_review.deeds set files = ${sql.json(meta)} where id = ${d.id}`;
  return { id: d.id, uploads };
}
// the page checks the form with js/data/deed-request.js (cleanDeedRequest); this repeats the checks that matter so a bad call can't slip in
const REQUEST_TYPES: Record<string, string> = { add_owner: "gift", remove_owner: "quitclaim", gift: "gift", divorce: "quitclaim", into_trust: "gift", into_llc: "into_llc", other: "quitclaim" };
function checkRequest(r: any) {
  if (!r || typeof r !== "object" || !REQUEST_TYPES[r.type]) throw new Error("Choose what the deed is for.");
  const list = (v: unknown) => (Array.isArray(v) ? v : []).map((x) => clip(x, 120).trim()).filter(Boolean).slice(0, 6);
  const out = { type: r.type, deedType: REQUEST_TYPES[r.type], newOwners: list(r.newOwners), tenancy: ["sole", "tbe", "jt", "tic", "entity"].includes(r.tenancy) ? r.tenancy : "",
    leaving: list(r.leaving), entityName: clip(r.entityName, 160), trustees: list(r.trustees).slice(0, 4), consideration: r.consideration === "paid" ? "paid" : "none",
    amount: r.consideration === "paid" ? Number(r.amount) || 0 : 0, relationship: clip(r.relationship, 160), mortgage: ["yes", "no", "unknown"].includes(r.mortgage) ? r.mortgage : "",
    lender: clip(r.lender, 120), residence: ["yes", "no", "unknown"].includes(r.residence) ? r.residence : "", requestedBy: clip(r.requestedBy, 160), notes: clip(r.notes, 1500) };
  if (!out.newOwners.length) throw new Error("Type who will own the property after the deed.");
  if (!out.tenancy) throw new Error("Choose how the new owners will hold title.");
  if (out.consideration === "paid" && !(out.amount > 0)) throw new Error("Type the amount being paid.");
  if (out.consideration === "none" && out.relationship.length < 3) throw new Error("Say how the people are related. The clerk needs it for the tax exemption.");
  if (!out.mortgage || !out.residence) throw new Error("Answer the mortgage and main-home questions.");
  return out;
}
async function listDeedOnly() {
  const rows = await sql`select id, created_at, file_no, reviewer_name, status, request->>'type' as request_type, (usage->>'est_cost_usd')::numeric as cost
                         from title_review.deeds where review_id is null and request is not null order by created_at desc limit 100`;
  return { deeds: rows };
}
async function startDeed(id: string) {
  const [r] = await sql`update title_review.deeds set status = 'queued', error = null, raw_output = null where id = ${id} and status in ('uploading','error') returning id`;
  if (!r) throw new Error("Deed not found or already running.");
  // @ts-ignore
  EdgeRuntime.waitUntil(runDeed(id));
  return { ok: true };
}
async function getDeed(id: string) {
  const [d] = await sql`select * from title_review.deeds where id = ${id}`;
  if (!d) throw new Error("Deed not found.");
  const files = [];
  for (const f of (d.files || []) as any[]) { const { data } = await sb.storage.from(BUCKET).createSignedUrl(f.path, 3600); files.push({ name: f.name, kind: f.kind, url: data?.signedUrl ?? null }); }
  d.files = files; delete d.raw_output;
  const fb = await sql`select finding_id, finding_title, verdict, note, reviewer_name from title_review.feedback where deed_id = ${id}`;
  return { deed: d, feedback: fb };
}
async function statuses(ids: unknown) {
  const list = Array.isArray(ids) ? ids.filter((x) => typeof x === "string").slice(0, 20) : [];
  if (!list.length) return { deeds: [] };
  await sql`update title_review.deeds set status = 'error', error = 'The deed was cut off before it finished. Click Retry.', completed_at = now()
            where id = any(${list}::uuid[]) and status in ('queued','running') and started_at < now() - interval '8 minutes'`;
  const rows = await sql`select id, file_no, status, progress, error, (usage->>'est_cost_usd')::numeric as cost from title_review.deeds where id = any(${list}::uuid[])`;
  return { deeds: rows };
}
async function saveEdits(b: any) {
  await sql`update title_review.deeds set edits = ${sql.json(b.edits ?? {})} where id = ${b.id}`;
  return { ok: true };
}
async function approve(b: any) {
  if (!clip(b.approved_by, 80).trim()) throw new Error("Type the approving attorney's name.");
  await sql`update title_review.deeds set approved_by = ${clip(b.approved_by, 80)}, approved_at = now() where id = ${b.id}`;
  return { ok: true };
}
async function feedback(b: any) {
  const verdict = ["correct", "wrong", "not_needed", "missed", "note"].includes(b.verdict) ? b.verdict : null;
  if (!verdict || !b.deed_id) throw new Error("Missing feedback details.");
  if (!clip(b.note, 4000).trim() && verdict !== "correct") throw new Error("Add a short note saying what's wrong or missing.");
  await sql`insert into title_review.feedback (deed_id, finding_id, finding_title, category, verdict, note, reviewer_name)
            values (${b.deed_id}, ${clip(b.finding_id, 40)}, ${clip(b.finding_title, 300)}, 'Deed', ${verdict}, ${clip(b.note, 4000)}, ${clip(b.reviewer_name, 80)})`;
  return { ok: true };
}

async function runDeed(id: string) {
  const setProgress = (p: string) => sql`update title_review.deeds set progress = ${p} where id = ${id}`;
  let raw = "";
  try {
    const [d] = await sql`update title_review.deeds set status = 'running', started_at = now(), progress = 'Reading the contract and search' where id = ${id} returning *`;
    const corrections = await sql`select verdict, finding_title, note from title_review.feedback where deed_id is not null and verdict in ('wrong','missed') order by created_at desc limit 30`;
    const content: any[] = [];
    const files = (d.files || []) as any[];
    const order: Record<string, number> = { contract: 0, search: 1, commitment: 2, other: 3 };
    files.sort((a, b) => (order[a.kind] ?? 4) - (order[b.kind] ?? 4));
    for (const f of files) {
      const { data, error } = await sb.storage.from(BUCKET).createSignedUrl(f.path, 3600);
      if (error || !data?.signedUrl) throw new Error(`Couldn't open "${f.name}". Upload it again.`);
      const label = f.kind === "search" ? "SEARCH PACKAGE" : f.kind === "commitment" ? "DRAFT COMMITMENT" : f.kind === "contract" || /contract/i.test(f.name) ? "SALES CONTRACT" : "OTHER DOCUMENT";
      content.push({ type: "text", text: `The next document is the ${label}. File name: "${f.name}".` });
      content.push({ type: "document", source: { type: "url", url: data.signedUrl }, title: clip(f.name, 200) });
    }
    content.push({ type: "text", text: factsPrompt(d, corrections) });
    await setProgress("Claude is pulling the deed facts (about 1-3 minutes)");
    const ownKey = (Deno.env.get("ANTHROPIC_API_KEY") ?? "").trim();
    const reqBody = JSON.stringify({ model: MODEL, max_tokens: MAX_TOKENS, output_config: { effort: EFFORT }, stream: true, system: SYSTEM, messages: [{ role: "user", content }] });
    const resp = ownKey
      ? await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "x-api-key": ownKey, "anthropic-version": "2023-06-01", "content-type": "application/json" }, body: reqBody })
      : await fetch(RELAY_URL, { method: "POST", headers: { "x-cla-relay-token": RELAY_TOKEN, "content-type": "application/json" }, body: reqBody });
    if (!resp.ok) { let e: any = {}; try { e = await resp.json(); } catch { /* */ } throw new Error(friendly(resp.status, e)); }
    const out = await readStream(resp, async (n) => { await setProgress(`Claude is writing the deed facts (${Math.round(n / 1000)}k characters)`); });
    raw = out.text;
    const usage = { input_tokens: out.usage.input_tokens, output_tokens: out.usage.output_tokens, est_cost_usd: Math.round(((out.usage.input_tokens * PRICE_IN + out.usage.output_tokens * PRICE_OUT) / 1e6) * 100) / 100, stop_reason: out.stop_reason };
    await sql`update title_review.deeds set usage = ${sql.json(usage)} where id = ${id}`;
    const facts = parseJson(raw);
    if (!facts || !Array.isArray(facts.grantors)) throw new Error("The deed facts came back unreadable. Click Retry.");
    await sql`update title_review.deeds set status = 'done', progress = 'Done', facts = ${sql.json(facts)}, model = ${out.model}, completed_at = now() where id = ${id}`;
  } catch (e) {
    console.error("deed failed", id, e);
    await sql`update title_review.deeds set status = 'error', progress = '', error = ${String((e as Error)?.message ?? e).slice(0, 1000)}, raw_output = ${raw ? raw.slice(0, 100000) : null}, completed_at = now() where id = ${id}`;
  }
}

const SYSTEM = `You are a senior Maryland title examiner at CLA Title & Escrow pulling the facts needed to prepare a deed.
You do NOT write the deed. You return facts in JSON; CLA's software writes the deed in CLA's standard wording.
Follow CLA's Deed Preparation Checklist (Cris Bolea, Nov 2026) and CLA's deed notes:
- The grantors are the CURRENT OWNERS OF RECORD from the current vesting deed in the search, exactly as named there. Sellers on the contract must match them; report every difference.
- The grantees are the BUYERS on the contract (after any assignment or addendum), full legal names as written on the contract.
- Copy the legal description WORD FOR WORD from the vesting deed (or the commitment's legal description if the vesting deed copy is not in the package). Never shorten, fix or paraphrase it. Keep its paragraph breaks.
- Marital status of the SELLERS and of the BUYERS, and the buyers' tenancy, go in the first paragraph (grantorsMarried = the two sellers are married to each other). If two grantees are married and the first named is a woman, it is "wife and husband".
- A deceased owner needs a personal representative (estate) or survivorship; cite the estate number when given.
- Recorded matters that CLA carries onto the deed (front foot benefit / deferred water and sewer liens, MPDU covenants, condominium common elements, ground rent / leasehold) go in extraClauses, copied word for word from the vesting deed.
- Never include SSNs, account numbers or dates of birth.
- If something is not in the documents, leave it empty and say what is missing in flags. Do not guess names, dates, libers or folios.
- flags are ONLY problems that affect THIS DEED and need someone to act (wrong or missing party, name spelling, how the buyers take title, estate/trust/entity authority, legal description, price, deed-specific tax exemption). One short sentence on the problem, one on what to do. Never flag things that are fine, and leave out commitment, payoff, tax-bill, HOA and loan issues: the title review covers those. At most 8 flags.
- ONE flag per problem (CLA team, Nov 20): put related points in the same flag. How the buyers take title, their marital status and the wife/husband order are ONE flag. Everything about one person (spelling, which name to use, how they sign) is ONE flag.
- Do not ask about anything the contract, the vesting deed or the other documents already answer, and do not ask questions that cannot change the deed: one buyer in their own name can only take title as sole owner; in Maryland a seller's marital status is not needed on the deed and no spouse joinder is needed (only flag a divorce or death that changes who owns or must sign).
- Name differences that are only word order or capitalization (SDAT style "SMITH JOHN A") are not problems; real spelling differences are.`;

// Deed only: the request form, in plain lines, instead of a sales contract
function requestPrompt(r: any) {
  if (!r) return "";
  const L = [
    `What the deed is for: ${r.type}`, `New owners after the deed: ${r.newOwners.join("; ")}`, `How they hold title: ${r.tenancy}`,
    r.leaving?.length ? `Coming off the title: ${r.leaving.join("; ")}` : "", r.entityName ? `${r.type === "into_trust" ? "Trust" : "LLC"}: ${r.entityName}` : "",
    r.trustees?.length ? `Trustees: ${r.trustees.join("; ")}` : "", `Consideration: ${r.consideration === "paid" ? "$" + r.amount : "none (no money changing hands)"}`,
    r.relationship ? `Relationship: ${r.relationship}` : "", `Mortgage on the property: ${r.mortgage}${r.lender ? " (" + r.lender + ")" : ""}`, `Owners' main home: ${r.residence}`,
    r.requestedBy ? `Requested by: ${r.requestedBy}` : "", r.notes ? `Notes: ${r.notes}` : ""].filter(Boolean);
  return `THIS IS A DEED-ONLY REQUEST. THERE IS NO SALES CONTRACT, so do not look for one and never flag that it is missing.
CLA's deed request form (filled in by CLA staff from the client's request; it takes the place of the contract):
${L.join("\n")}
Use it: deedType "${r.deedType}"; grantees = the new owners above (as written, unless an ID or document in the package shows the full legal name), and set
grantees' kind "entity" for a trust or LLC; tenancy "${r.tenancy}", tenancySource "stated"; consideration ${r.consideration === "paid" ? r.amount : 0};
contractSellers and contractBuyers empty. The grantors are still the current owners of record from the vesting deed. Flag only deed problems the
form and the documents leave open (for example an owner of record who is not signing, or a trustee or LLC signer not named).

`;
}

function factsPrompt(d: any, corrections: any[]) {
  const corr = corrections.length ? "RECENT CORRECTIONS FROM CLA's TEAM (do not repeat):\n" + corrections.map((c: any) => `- ${c.verdict === "missed" ? "MISSED" : "WRONG"}: ${c.finding_title ? c.finding_title + " - " : ""}${c.note || ""}`).join("\n") + "\n\n" : "";
  return `${corr}${requestPrompt(d.request)}File: ${d.file_no || "(none)"}. Return ONLY one JSON object, no other text, in this shape (dates as YYYY-MM-DD):
{"deedType":"sale|gift|quitclaim|substitute_trustee|ground_rent_redemption|into_llc",
"fileNo":"","propertyAddress":"street\\ncity, MD zip","county":"e.g. Montgomery or Baltimore City","taxId":"as on SDAT, e.g. 02-03414356",
"legalDescription":"the description itself, word for word, starting at the lot/unit/metes-and-bounds text (leave out the granting lead-in \"all that lot of ground situate in ... that is to say:\"), paragraphs separated by a blank line","legalSource":"vesting deed | commitment Schedule A | ...","legalMatchesCommitment":true,"legalDiffNote":"",
"priorDeed":{"dated":"","recorded":"","liber":"","folio":"","from":"grantors of the vesting deed exactly as written","to":"grantees of the vesting deed with their tenancy only, e.g. \"John Smith and Mary Smith, his wife, as tenants by the entirety\" (no habendum words like unto the survivor, heirs and assigns, fee simple)"},
"ownersOfRecord":["each current owner, exactly as on the vesting deed"],
"deaths":[{"name":"","diedOn":"","leaving":"who title passed to / personal representative and estate no.","survivorshipCovers":false}],
"grantors":[{"name":"","kind":"individual|personal_representative|entity|trustee","maritalStatus":"married|unmarried|divorced|widowed|","gender":"F|M|","genderBasis":"stated|name|","estateOf":"","decedentDiedOn":"","entityDesc":"e.g. a Maryland limited liability company","signer":"","signerTitle":"","trustName":"","poa":false}],
"grantorsMarried":false,
"contractSellers":["one entry per seller, as written on the contract"],"contractBuyers":["one entry per buyer, as written on the contract"],
"grantees":[{"name":"","kind":"individual|entity","gender":"F|M|","genderBasis":"stated|name|","entityDesc":""}],
"tenancy":"sole|tbe|jt|tic|entity","tenancySource":"stated|assumed","tenancyEvidence":"quote the contract wording that states it, if any","granteesMarried":false,
"consideration":0,"priceChangedByAddendum":false,"principalResidence":true,"firstTimeBuyer":false,
"extraClauses":["word for word"],
"flags":[{"step":"1. File review|2. Parties|5. Taxes|6. Drafting|7. Quality control","text":"what is wrong or missing and what to do"}],
"evidence":{"vestingDeed":"file name and PDF page","contractParties":"file name and PDF page","price":"file name and PDF page","legal":"file name and PDF page"}}
Rules: tenancy "tbe" only for two buyers married to each other. If the contract doesn't say how the buyers take title, set tenancySource "assumed" and use sole for one buyer, tbe for a married couple, otherwise jt. gender: use the contract/deed wording (Mr./Mrs., husband/wife) and set genderBasis "stated"; if only the first name suggests it, set genderBasis "name".`;
}

async function readStream(resp: Response, onProgress: (n: number) => Promise<unknown>) {
  const reader = resp.body!.getReader(); const dec = new TextDecoder();
  let buf = "", text = "", model = MODEL, stop_reason: string | null = null, last = 0;
  const usage = { input_tokens: 0, output_tokens: 0 };
  while (true) {
    const { done, value } = await reader.read(); if (done) break;
    buf += dec.decode(value, { stream: true }); let i;
    while ((i = buf.indexOf("\n\n")) >= 0) {
      const chunk = buf.slice(0, i); buf = buf.slice(i + 2);
      const line = chunk.split("\n").find((l) => l.startsWith("data:")); if (!line) continue;
      let ev: any; try { ev = JSON.parse(line.slice(5).trim()); } catch { continue; }
      if (ev.type === "message_start") { model = ev.message?.model ?? model; usage.input_tokens = ev.message?.usage?.input_tokens ?? 0; }
      else if (ev.type === "content_block_delta" && ev.delta?.type === "text_delta") text += ev.delta.text;
      else if (ev.type === "message_delta") { stop_reason = ev.delta?.stop_reason ?? stop_reason; if (ev.usage?.output_tokens) usage.output_tokens = ev.usage.output_tokens; }
      else if (ev.type === "error") throw new Error(friendly(ev.error?.type === "overloaded_error" ? 529 : 500, ev));
    }
    if (text.length - last > 3000) { last = text.length; await onProgress(text.length); }
  }
  return { text, usage, stop_reason, model };
}
function parseJson(t: string) {
  try { return JSON.parse(t); } catch { /* */ }
  const m = t.match(/```(?:json)?\s*([\s\S]*?)```/); if (m) { try { return JSON.parse(m[1]); } catch { /* */ } }
  const a = t.indexOf("{"), b = t.lastIndexOf("}"); if (a >= 0 && b > a) { try { return JSON.parse(t.slice(a, b + 1)); } catch { /* */ } }
  // a broken copy followed by a corrected one: try each JSON start on a new line, latest first
  const starts: number[] = []; let i = -1;
  while ((i = t.indexOf('{"', i + 1)) >= 0) if (i === 0 || /\n\s*$/.test(t.slice(Math.max(0, i - 4), i))) starts.push(i);
  for (const s of starts.reverse()) { try { return JSON.parse(t.slice(s, b + 1)); } catch { /* */ } }
  return null;
}
function friendly(status: number, out: any) {
  const msg = String(out?.error?.message ?? "");
  if (status === 401) return "The Claude API key isn't working. Tell John.";
  if (status === 400 && /credit|balance/i.test(msg)) return "The Claude account is out of credits. Tell John.";
  if (status === 413 || /too large|too long/i.test(msg)) return "The files are too large. Leave out extras and try again.";
  if (status === 429) return "Too many requests right now. Wait a few minutes and click Retry.";
  if (status >= 500 || status === 529) return "Claude is busy right now. Wait a minute and click Retry.";
  return `Claude returned an error (${status}): ${msg.slice(0, 300)}`;
}
