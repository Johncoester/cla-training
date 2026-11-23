// Course: Settlement Funding, Timing & Wire Safety — CLA procedures (draft).
// Source: CLA settlement training led by Matt Landsberg, Nov 23, 2026 (Google Meet / Gemini notes).
(function(){
const SECTIONS = { FU: "Buyer Funds", TM: "Timing & Same-Day Proceeds", WS: "Wire Safety" };
const SRC = '<p class="note">From CLA\'s settlement training on November 23, 2026, led by Matt Landsberg. These are CLA\'s own procedures. If anything here doesn\'t match how you were told to do it, ask Matt, Caroline or Maynara.</p>';

const LESSONS = [
{id:"F01",s:"FU",t:"Buyer funds: when they must arrive and how we accept them",m:7,
 body: SRC + `
<h4>Funds come in the day before</h4>
<p>Buyers should send their cash to close <b>the day before settlement</b>. In Maryland, DC and Virginia, the buyer's funds must be <b>in our account at or before closing</b>; that's what makes it a "wet" (good-funds) closing. If we close without the money and the buyer never sends a $50,000 or $100,000 wire, <b>CLA is on the hook</b>. Late buyer funds also mean the seller doesn't get paid on time.</p>
<h4>What we accept, and what we don't</h4>
<table class="lt"><tr><th>Payment method</th><th>CLA rule</th></tr>
<tr><td><b>Federal wire</b></td><td>✓ Accepted. It's the standard. Wires go through the Federal Reserve and can't be pulled back by the sender.</td></tr>
<tr><td><b>Cashier's check</b></td><td>✓ Accepted <b>up to $5,000</b>.</td></tr>
<tr><td><b>ACH transfer</b></td><td>✗ Not accepted. It can take up to 5 business days and the sender can reverse it.</td></tr>
<tr><td><b>Zelle</b></td><td>✗ Not accepted. It can be reversed. Title companies and underwriters across the industry refuse it.</td></tr>
<tr><td><b>Cash</b></td><td>✗ Never, for any amount. Federal anti-money-laundering rules.</td></tr></table>
<h4>Earnest money deposits (EMD)</h4>
<p>Personal checks are fine for EMD, even large ones, but we <b>wait 5–6 days for the check to clear</b> before we'd return any of it. A known scam is to send a big personal check, cancel the contract right away, and ask for a refund by wire before the check bounces.</p>
<h4>Too much or too little</h4>
<ul>
<li><b>Buyer sent too much</b> (for example $100,000 when $98,000 was needed): refund the $2,000 difference by <b>office check or wire</b>.</li>
<li><b>Buyer is short:</b> tell the buyer right away. The balance must come by <b>wire or cashier's check</b>. A personal check for a small difference (like $2,000) is allowed <b>only with approval from Matt or Caroline</b>.</li>
</ul>`,
 keys:[["Buyer funds should arrive","The day before settlement"],["Accepted","Federal wire; cashier's check up to $5,000"],["Never accepted","ACH, Zelle, cash"],["EMD personal check","Wait 5–6 days to clear before any refund"],["Small shortage by personal check","Only with Matt's or Caroline's approval"]],
 traps:["\"I sent it by ACH\" is not good funds, even if the money shows up.","A large personal-check EMD followed by a quick cancellation and a wire-refund request is a classic scam."],
 qs:["FQ01","FQ02","FQ03","FQ04","FQ05","FQ06"]},

{id:"F02",s:"FU",t:"When buyer funds haven't arrived: verify and escalate",m:5,
 body: SRC + `
<h4>"I already sent it"</h4>
<p>Buyers often say they've wired the money when it hasn't landed. <b>Ask for the wire confirmation</b> from their bank and check it carefully: amount, our account, date, and the bank's reference number. Remember that receiving banks process at different speeds; some institutions (Navy Federal was the example given) can take hours or post the next day.</p>
<h4>When to escalate</h4>
<ul>
<li>If a <b>large amount</b> (for example $100,000) hasn't arrived by closing time, <b>stop and escalate</b> to <b>Caroline, Matt or Maynara</b>. They decide whether it's safe to proceed.</li>
<li>Small amounts (around $5,000) carry little risk and may proceed.</li>
<li>Don't make the call on a large shortfall yourself.</li>
</ul>
<h4>Lender funds</h4>
<p>Delayed loan funds from a major bank (Bank of America was the example) are usually fine to work around. <b>Private and hard-money lenders need more caution</b>: confirm the money is actually in before relying on it.</p>`,
 keys:[["First step","Get and check the buyer's wire confirmation"],["Large amount missing at closing","Escalate to Caroline, Matt or Maynara"],["Private lenders","Extra caution; confirm funds are in"]],
 traps:["A screenshot of a wire request isn't proof the wire went out. Check the confirmation details.","Large shortfalls are a manager decision, never a closer decision."],
 qs:["FQ07","FQ08","FQ09"]},

{id:"F03",s:"TM",t:"Scheduling closings so sellers get paid the same day",m:6,
 body: SRC + `
<p>Sellers want their money the day of closing, and many won't hand over the keys until they see it. Same-day proceeds depend on <b>when the buyer signs</b>, <b>how fast documents come back</b>, and <b>bank cutoff times</b>.</p>
<h4>The timeline that works</h4>
<table class="lt"><tr><th>Time</th><th>What needs to happen</th></tr>
<tr><td><b>By 1:00 p.m.</b></td><td>Buyer signs. That gives about 90% certainty the seller is paid the same day.</td></tr>
<tr><td><b>2:00–2:30 p.m.</b></td><td>Third-party notary scan-backs received, so we can check signatures and documents.</td></tr>
<tr><td><b>Before 3:00 p.m.</b></td><td>Seller proceeds disbursed.</td></tr></table>
<ul>
<li><b>Third-party notaries:</b> tell them clearly the scan-backs are urgent.</li>
<li><b>Receiving bank:</b> same-day delivery depends on the seller's bank cutoff; credit unions can be slower.</li>
<li><b>Late afternoon closings:</b> tell the seller up front that proceeds will likely arrive <b>around noon the next business day</b>.</li>
</ul>
<h4>Back-to-back closings</h4>
<p>When our seller is buying another home the same day (often with another title company), the pressure is high. Schedule these <b>in our office at 9:00 a.m.</b> so we stay in control of the timing.</p>`,
 keys:[["Latest buyer signing for same-day proceeds","1:00 p.m."],["Notary scan-backs","By 2:00–2:30 p.m."],["Disburse seller proceeds","Before 3:00 p.m."],["Back-to-back closings","In office at 9:00 a.m."],["Late afternoon closing","Proceeds likely around noon next business day"]],
 traps:["Promising same-day proceeds on a 4 p.m. closing sets up an angry seller. Set expectations early.","A slow notary scan-back can cost the seller a day. Follow up."],
 qs:["FQ10","FQ11","FQ12","FQ13"]},

{id:"F04",s:"WS",t:"Wire safety: verification, changes and red flags",m:6,
 body: SRC + `
<h4>Verification comes before speed</h4>
<p>Our funding team <b>calls sellers and payoff lenders to verify wire instructions</b> before sending large wires. That can make a seller wait, but one fraudulent wire can cost the company millions. A seller who's upset for an hour is better than a seller whose proceeds were stolen.</p>
<h4>Changing wire instructions</h4>
<ul>
<li><b>Never accept a change by phone call</b>, even if the voice sounds right. Criminals now use <b>AI voice cloning</b>.</li>
<li>A seller who wants to change wiring instructions, including after closing, must <b>come to the office in person with a valid government-issued ID</b>.</li>
<li>Never accept new instructions by email alone.</li>
</ul>
<h4>Red flags</h4>
<ul>
<li>A <b>last-minute change</b> to where the money goes.</li>
<li>A change requested by <b>one spouse or one business partner</b> sending money somewhere new.</li>
<li>Pressure to skip verification "because we're in a hurry."</li>
</ul>
<h4>When fraud spikes</h4>
<p>Underwriter data shows fraud peaks in the days <b>before holidays and long weekends</b> and at <b>month-end</b>, when everyone is rushed. Be extra careful then.</p>
<h4>Coming in future trainings</h4>
<p>Seller impersonation, Fura procedures and FIRPTA holdbacks will be covered in upcoming sessions.</p>`,
 keys:[["Wire changes","In person with government ID only; never by phone or email"],["Why not by phone","AI voice cloning"],["Fraud peaks","Before holidays, long weekends, month-end"],["Red flag","Last-minute change by one spouse or partner"]],
 traps:["A familiar voice on the phone is not verification anymore.","The busiest days are the most dangerous days."],
 qs:["FQ14","FQ15","FQ16","FQ17","FQ18"]}
];

const QUESTIONS = [
{id:"FQ01",s:"FU",q:"When should a buyer send their cash to close?",o:["The morning of settlement","The day before settlement","Any time before recording","Within 3 days after closing"],a:1,e:"CLA asks buyers to send funds the day before so they're in our account at or before closing."},
{id:"FQ02",s:"FU",q:"Which payment method does CLA accept for cash to close?",o:["ACH transfer","Zelle","A federal wire","Cash, if under $10,000"],a:2,e:"Wires are the standard. ACH and Zelle can be reversed, and cash is never accepted."},
{id:"FQ03",s:"FU",q:"Up to what amount does CLA accept a cashier's check?",o:["$1,000","$5,000","$10,000","Any amount"],a:1,e:"Cashier's checks are accepted up to $5,000; larger amounts must be wired."},
{id:"FQ04",s:"FU",q:"Why doesn't CLA accept ACH transfers for closing funds?",o:["The fees are higher than wire fees", "They're slow and can be reversed", "The IRS prohibits them for real estate", "They only work on refinance closings"],a:1,e:"ACH can take up to 5 business days and can be pulled back; a wire is final."},
{id:"FQ05",s:"FU",q:"A buyer pays a large EMD by personal check, cancels the contract two days later, and asks for a wire refund. What do you do?",o:["Wire the refund the same day they ask", "Wait 5–6 days for the check to clear", "Refund half now and half after closing", "Send the refund to them by Zelle"],a:1,e:"This is a known scam pattern. The check must clear before any money goes back."},
{id:"FQ06",s:"FU",q:"The buyer is $2,000 short and wants to bring a personal check. What's the rule?",o:["Always accept it, since it's a small amount", "Never accept it, even with approval", "Only with Matt's or Caroline's approval", "Accept it if the buyer's agent agrees"],a:2,e:"Shortages normally come by wire or cashier's check; a small personal check needs Matt's or Caroline's sign-off."},
{id:"FQ07",s:"FU",q:"A buyer says they wired $100,000, but it hasn't arrived at closing time. What should you do?",o:["Close anyway, since the buyer says it was sent", "Escalate to Caroline, Matt or Maynara", "Ask the seller to wait until next week", "Take a personal check for the full amount"],a:1,e:"Large missing amounts require a manager's risk decision before closing."},
{id:"FQ08",s:"FU",q:"What should you ask for when a buyer insists the wire was sent?",o:["The bank's wire confirmation, checked carefully", "A screenshot of their bank account balance", "A text message from their real estate agent", "Nothing; take the buyer at their word"],a:0,e:"Check the confirmation: amount, our account, date and the bank reference."},
{id:"FQ09",s:"FU",q:"Which lender's funds call for extra caution if they're late?",o:["A major national bank","A private or hard-money lender","A credit union you know well","All lenders are treated the same"],a:1,e:"Major-bank delays are usually fine; private lenders need confirmed funds."},
{id:"FQ10",s:"TM",q:"What's the latest time a buyer should sign to give a good chance of same-day seller proceeds?",o:["10:00 a.m.","1:00 p.m.","4:00 p.m.","5:00 p.m."],a:1,e:"A 1 p.m. buyer signing gives about 90% certainty of same-day seller proceeds."},
{id:"FQ11",s:"TM",q:"After a 1:00 p.m. closing with a third-party notary, when should the scan-backs come in?",o:["By 2:00–2:30 p.m.","By end of day","The next morning","They aren't needed"],a:0,e:"Scan-backs by 2–2:30 let us verify documents and disburse before 3 p.m."},
{id:"FQ12",s:"TM",q:"Your seller is buying another home the same day with another title company. How should their closing be scheduled?",o:["Late in the afternoon, to give everyone time", "In our office at 9:00 a.m.", "With a mobile notary at the seller's home at noon", "Whenever the seller says works best"],a:1,e:"Back-to-back closings go in our office at 9 a.m. for maximum control."},
{id:"FQ13",s:"TM",q:"A seller closes at 4:00 p.m. What should you tell them about proceeds?",o:["They'll arrive within the hour", "Likely around noon the next business day", "In about five business days", "The same day, guaranteed"],a:1,e:"Late afternoon closings usually disburse the next business day; set expectations early."},
{id:"FQ14",s:"WS",q:"A seller calls after closing asking to send proceeds to a different account. The voice sounds exactly like them. What do you do?",o:["Make the change, since you know the voice", "Ask them to email the new instructions", "Require an office visit with a government ID", "Ask their agent to approve the change"],a:2,e:"No phone changes: AI voice cloning makes voices unreliable. In person with ID only."},
{id:"FQ15",s:"WS",q:"Why does the funding team call sellers and payoff lenders before sending large wires?",o:["To give the seller time to change their mind", "To verify the instructions and stop fraud", "Because the Closing Disclosure requires it", "To confirm the agents' commissions"],a:1,e:"Verification protects against wire fraud, which can cost millions."},
{id:"FQ16",s:"WS",q:"When does wire fraud tend to peak?",o:["Mid-week, in the middle of the month", "Before holidays and long weekends, and month-end", "Mostly during the summer months", "It's spread evenly through the year"],a:1,e:"Underwriter data shows spikes when everyone is rushed: holidays, long weekends, month-end."},
{id:"FQ17",s:"WS",q:"Which is a red flag?",o:["A seller asking what time closing starts", "A spouse redirecting proceeds at the last minute", "A buyer asking for our wire instructions early", "An agent asking for the settlement statement"],a:1,e:"Last-minute changes by one spouse or business partner are a major warning sign."},
{id:"FQ18",s:"WS",q:"A seller is upset that funding is taking an extra hour to verify wire instructions. What's the right approach?",o:["Skip verification to keep the seller happy", "Explain why it matters, and finish verifying", "Send half the money now and half later", "Let the seller verify their own instructions"],a:1,e:"Verification always comes before speed."}
];

window.COURSES = window.COURSES || [];
window.COURSES.push({
  id: "funding",
  draft: true,
  title: "Settlement Funding, Timing & Wire Safety",
  subtitle: "CLA procedures · From the Nov 23 settlement training",
  description: "CLA's rules for buyer funds, accepted payment methods, missing funds, scheduling for same-day seller proceeds, and protecting wires from fraud.",
  source: "CLA settlement training led by Matt Landsberg, Nov 23, 2026",
  exam: { counts: {FU:7, TM:3, WS:4}, minutes: 20, pass: 80 },
  rateCharts: false,
  sections: SECTIONS,
  lessons: LESSONS,
  questions: QUESTIONS
});
})();
