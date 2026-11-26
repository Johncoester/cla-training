// CLA Closing Package Explainer (Supabase project "CLA Training"), John, Nov 25 2026.
// Explains closing documents in plain English so staff (including the Philippines team) can answer
// signers on the phone. It is NOT a QC check: documents are treated as correct and only explained.
// No logins, same as the Title Review (owner's choice for testing). Stateless: nothing is stored;
// the page sends page text (or a page image for scans) and gets the explanation back.

const SMART = "claude-sonnet-5-5"; // page explanations, caller questions, signer emails
const QUICK = "claude-haiku-5-5";  // sorting the package, one-line explanations
const SELFTEST_TOKEN = "cla-ce-selftest-7k3p";
const RELAY_URL = "https://aqcervntopidtcazcmlv.supabase.co/functions/v1/claude-relay";
const RELAY_TOKEN = "0LuyYaZiw2TqIo6sDcojrSABf_5LLhsw";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { ...CORS, "Content-Type": "application/json" } });
const clip = (s: unknown, n: number) => String(s ?? "").slice(0, n);

const CTX = `You help staff at C.L.A. Title & Escrow (a title and escrow company in Maryland, DC and Virginia) explain closing documents over the phone to buyers, sellers and borrowers. Notaries at the table only witness signatures, so staff need clear, accurate, plain-English explanations (8th-grade reading level).
Your job is to EXPLAIN the documents exactly as written, not to check them. Assume every document and number is correct. Never call anything an error, a mistake, missing, blank or wrong, and never suggest corrections.
Never give legal or tax advice; say to ask the closer, lender, an attorney or a tax professional when needed. Use only figures that appear in the documents; never invent numbers. Never repeat Social Security numbers, account numbers or dates of birth.
Skip shipping labels, cover sheets and fax pages.

`;
const SIDE: Record<string, string> = {
  buyer: `SIDE: Explain for the BUYER / BORROWER only. Include only what the buyer or borrower pays, receives, owes or signs (Borrower-Paid and Buyer columns, the Borrower's Transaction, loan terms, escrow, prepaids, cash to close). Leave out seller-only lines such as the seller's commission, payoff or cash to seller. If this page is only for the seller, say so in the summary and return no items.\n\n`,
  seller: `SIDE: Explain for the SELLER only. Include only what the seller pays, receives or signs (Seller-Paid and Seller columns, the Seller's Transaction, mortgage payoffs, commissions, seller credits, tax prorations, transfer taxes the seller pays, cash to seller). Leave out lines that only concern the buyer or their loan. If this page is only for the buyer or borrower (such as the Note or loan disclosures), say so in the summary and return no items.\n\n`,
  both: `SIDE: Explain for both buyer and seller. For every item, paidBy says who pays or receives it.\n\n`,
};
const side = (s: unknown) => SIDE[String(s)] ?? SIDE.both;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: CORS });
  if (req.method !== "POST") return json({ error: "Use POST" }, 405);
  let b: any;
  try { b = await req.json(); } catch { return json({ error: "Bad request" }, 400); }
  try {
    switch (b.action) {
      case "index": return json(await indexDocs(b));
      case "page": return json(await explainPage(b));
      case "line": return json(await explainLine(b));
      case "ask": return json(await ask(b));
      case "summary": return json(await summary(b));
      case "selftest":
        if (b.token !== SELFTEST_TOKEN) return json({ error: "not found" }, 404);
        return json(await selfTest());
      default: return json({ error: "Unknown action" }, 400);
    }
  } catch (e) {
    console.error(e);
    return json({ error: String((e as Error)?.message ?? e) }, 500);
  }
});

/* ---------------- actions ---------------- */
async function indexDocs(b: any) {
  const pages = (Array.isArray(b.pages) ? b.pages : []).slice(0, 60);
  if (!pages.length) throw new Error("No pages were sent.");
  const txt = pages.map((p: any) => `=== Page ${Number(p.n) || 0} ===\n${clip(p.text, 500)}`).join("\n");
  const prompt = CTX + `Below is the start of each page of a real estate closing package. Split it into its separate documents.
Reply with only JSON: {"documents":[{"name":"Closing Disclosure","type":"closing_disclosure","start":1,"end":5,"purpose":"one plain sentence: what this document is for"}]}
type is one of: closing_disclosure, settlement_statement, note, deed_of_trust, rider, deed, affidavit, escrow, payment_letter, title, tax, disclosure, authorization, shipping, other. Use shipping for shipping labels. Cover every page listed, in order, using the page numbers shown.

${txt}`;
  return await askJson(QUICK, prompt, 4000);
}

async function explainPage(b: any) {
  const scan = !String(b.text ?? "").trim();
  const image = scan ? imageBlock(b.image) : null;
  if (scan && !image) throw new Error("This page is a scan with no readable text.");
  const prompt = CTX + side(b.side) + `Document: ${clip(b.doc, 200)} (${clip(b.type, 40)}). This is page ${Number(b.docPage) || 1} of that document, page ${Number(b.n) || 1} of the package.
${scan ? 'The page is attached as an image (a scan). Leave "lines" empty.' : 'The page text is below, one numbered line per row ("12| text").'}
Reply with only JSON:
{"summary":"2-3 plain sentences: what this page is and why the signer sees or signs it",
"sign":"what the signer is agreeing to or confirming on this page, or empty",
"items":[{"lines":[12,13],"label":"short name, e.g. Settlement fee","what":"1-3 plain sentences: what it is, why it is charged or listed","amount":"the amount as shown, or empty","paidBy":"Borrower, Seller, Lender, Paid by others, or empty","tip":"one sentence a staff member could say on the phone"}],
"questions":[{"q":"a question signers commonly ask about this page","a":"a short plain answer"}]}
Include 4-16 items covering every line with money, rates, dates, parties, signatures and anything signers ask about (prorations, adjustments, escrow, prepaids, points, title insurance, recording and transfer taxes, credits, payoffs, commissions, cash to close or cash to seller, APR). Each item's lines are the row numbers it covers. Up to 4 questions. If the page is a shipping label or cover sheet, say so in one sentence and return no items.

${scan ? "" : clip(b.text, 12000)}`;
  return await askJson(SMART, prompt, 6000, image ? [image] : [], "low");
}

async function explainLine(b: any) {
  const prompt = CTX + side(b.side) + `Document: ${clip(b.doc, 200)}. Page text (numbered rows):
${clip(b.text, 8000)}

The staff member tapped row ${Number(b.id) || 0}: "${clip(b.line, 400)}". In 2-4 plain sentences they can read aloud, explain what this line means for the signer. If it has an amount, say who pays it and why. Plain text only, no headings.`;
  return { text: await askText(QUICK, prompt, 800) };
}

async function ask(b: any) {
  const q = clip(b.question, 1000).trim();
  if (!q) throw new Error("Type the caller's question first.");
  const prompt = CTX + side(b.side) + `The package contains: ${clip(b.list, 2000)}.
The staff member is looking at: ${clip(b.doc, 200)}, page ${Number(b.n) || 1}.

Text of that document:
${clip(b.text, 40000)}

Caller's question: ${q}

Answer in 3-6 plain sentences the staff member can read aloud. If the answer is not in these pages, say which document or person to check with. Plain text only.`;
  return { text: await askText(SMART, prompt, 1500, [], "low") };
}

async function summary(b: any) {
  const who = b.side === "seller"
    ? "the sellers. Use only seller figures: sale price, cash to seller (net proceeds), mortgage payoff, commissions, seller credits, transfer taxes and fees the seller pays, tax prorations. Do not mention the buyer's loan, cash to close or their costs. Sellers do not bring closing funds unless the figures show they owe money."
    : "the buyers / borrowers (if this is a refinance or a cash purchase, write for that). Use only buyer/borrower figures: cash to close, sale price, loan amount, interest rate, monthly payment, their closing costs, credits, escrow and prepaids. Do not mention the seller's proceeds, payoff or commission.";
  const images = (Array.isArray(b.images) ? b.images : []).slice(0, 4).map(imageBlock).filter(Boolean) as any[];
  const prompt = CTX + `Write a friendly, plain-English email from C.L.A. Title & Escrow to ${who}
Send it before their closing so they arrive knowing what they will sign. Address it to: ${clip(b.names, 200) || (b.side === "seller" ? "the sellers" : "the buyers")}. Closing: ${clip(b.when, 100) || "soon"}. Sign it from: ${clip(b.from, 100) || "The C.L.A. Title & Escrow team"}, C.L.A. Title & Escrow.
Documents in the package: ${clip(b.list, 2000)}.
Include, with short headings: a warm opening; their key numbers exactly as shown; what they will be signing (one line per document they sign); a few terms they will see, explained in one sentence each using their figures (such as prorations, escrow, prepaids, title insurance, payoff, transfer taxes, whichever apply to them); what to bring (valid government photo ID, and funds exactly as instructed if they owe any); a wire fraud warning (C.L.A. will never change wiring instructions by email; call the office at a number you already know before sending money or giving account details for proceeds); and that the closer will answer questions at the table. Under 450 words. Plain text, blank lines between sections, no markdown symbols.
Reply with only JSON: {"subject":"...","body":"..."}

Source pages:
${clip(b.text, 60000) || "(The pages are attached as images.)"}`;
  return await askJson(SMART, prompt, 3000, images, "low");
}

/* ---------------- Claude ---------------- */
function imageBlock(dataUrl: unknown) {
  const m = String(dataUrl ?? "").match(/^data:(image\/(?:jpeg|png|webp));base64,([A-Za-z0-9+/=]+)$/);
  if (!m || m[2].length > 6_000_000) return null;
  return { type: "image", source: { type: "base64", media_type: m[1], data: m[2] } };
}

async function callClaude(model: string, prompt: string, maxTokens: number, images: any[] = [], effort?: string) {
  const content = [...images, { type: "text", text: prompt }];
  const body: any = { model, max_tokens: maxTokens, messages: [{ role: "user", content }] };
  if (effort && model === SMART) body.output_config = { effort };
  const reqBody = JSON.stringify(body);
  const ownKey = (Deno.env.get("ANTHROPIC_API_KEY") ?? "").trim();
  const resp = ownKey
    ? await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "x-api-key": ownKey, "anthropic-version": "2023-06-01", "content-type": "application/json" },
        body: reqBody,
      })
    : await fetch(RELAY_URL, { method: "POST", headers: { "x-cla-relay-token": RELAY_TOKEN, "content-type": "application/json" }, body: reqBody });
  let out: any = {};
  try { out = await resp.json(); } catch { /* not JSON */ }
  if (!resp.ok) throw new Error(friendlyApiError(resp.status, out));
  return (out.content || []).filter((c: any) => c.type === "text").map((c: any) => c.text).join("").trim();
}
async function askText(model: string, prompt: string, maxTokens: number, images: any[] = [], effort?: string) {
  const t = await callClaude(model, prompt, maxTokens, images, effort);
  if (!t) throw new Error("Claude didn't send an answer. Try again.");
  return t;
}
async function askJson(model: string, prompt: string, maxTokens: number, images: any[] = [], effort?: string) {
  const t = await callClaude(model, prompt, maxTokens, images, effort);
  const r = parseJson(t);
  if (!r) throw new Error("The explanation came back unreadable. Try again.");
  return r;
}
function parseJson(text: string) {
  try { return JSON.parse(text); } catch { /* fall through */ }
  const fence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (fence) { try { return JSON.parse(fence[1]); } catch { /* */ } }
  const a = text.indexOf("{"), b = text.lastIndexOf("}");
  if (a >= 0 && b > a) { try { return JSON.parse(text.slice(a, b + 1)); } catch { /* */ } }
  return null;
}
function friendlyApiError(status: number, out: any) {
  const msg = String(out?.error?.message ?? "");
  if (status === 401) return "The Claude API key isn't working. John needs to re-save ANTHROPIC_API_KEY in Supabase.";
  if (status === 400 && /credit|balance/i.test(msg)) return "The Claude account is out of credits. John needs to add credits at platform.claude.com.";
  if (status === 413 || /too large|too long|prompt is too long/i.test(msg)) return "This page has too much to send at once.";
  if (status === 429) return "Too many requests at once. Wait a minute and try again.";
  if (status >= 500 || status === 529) return "Claude is busy right now. Wait a minute and try again.";
  return `Claude returned an error (${status}): ${msg.slice(0, 300)}`;
}

/* ---------------- self test with a made-up page (no client data) ---------------- */
async function selfTest() {
  const t0 = Date.now();
  const text = ["1| Closing Disclosure - Summaries of Transactions", "2| SELLER'S TRANSACTION", "3| 01 Sale Price of Property $400,000.00",
    "4| 08 County Property Taxes 12/15/26 to 06/30/27 $2,266.85", "5| 04 Payoff of First Mortgage Loan $212,480.33",
    "6| Real Estate Commission - Listing Broker $12,000.00", "7| Cash to Seller $168,591.52"].join("\n");
  const r = await explainPage({ doc: "Closing Disclosure", type: "closing_disclosure", n: 1, docPage: 1, side: "seller", text });
  return { seconds: Math.round((Date.now() - t0) / 1000), items: Array.isArray(r?.items) ? r.items.length : 0, summary: r?.summary ?? null };
}
