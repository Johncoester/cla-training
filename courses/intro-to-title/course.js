// Course: Introduction to Title — for new hires with no real estate background.
// draft: true means only admins can see it. Set to false (or delete the line) to publish to everyone.
(function(){
const SECTIONS = {
  FN: "Title Basics",
  PL: "People & Roles",
  TX: "Types of Transactions",
  OP: "How a File Moves"
};

const LESSONS = [
{id:"I01",s:"FN",t:"What a title company does (and why it matters)",m:8,
 body:`
<p>When someone buys a house, they aren't just buying a building. They're buying the <b>legal right to own it</b>. That right is called <b>title</b>. A title company makes sure the buyer gets clean title, handles the money safely, and insures the deal so that if a hidden problem shows up later, the buyer or the lender is protected.</p>
<h4>Three jobs in one</h4>
<ul>
<li><b>Research:</b> we search the public land records to confirm who really owns the property and find anything attached to it, such as unpaid mortgages, liens, judgments, easements or errors in old documents.</li>
<li><b>Escrow and settlement:</b> we act as the <b>neutral middle party</b>. We collect money from the buyer and the lender, pay off the seller's old loan, pay everyone who's owed (agents, taxes, fees), and make sure every document is signed correctly. We don't take sides. We follow the contract and the lender's instructions.</li>
<li><b>Title insurance:</b> we issue policies, on behalf of a title insurance company (the "underwriter"), that protect against problems with the title that already existed before closing.</li>
</ul>
<h4>What can go wrong with a title?</h4>
<p>More than you'd think. A past owner's forged signature; a lien from a contractor who was never paid; an heir nobody knew about who claims a share; an old mortgage that was paid but never officially released; a typo in a legal description. The title search catches most of these before closing. Title insurance covers the hidden ones.</p>
<h4>Two kinds of title insurance</h4>
<ul>
<li><b>Lender's policy:</b> protects the bank's loan. Almost every lender requires one, and the borrower usually pays for it.</li>
<li><b>Owner's policy:</b> protects the buyer's ownership for as long as they (or their heirs) own the home. In Maryland, it's <b>optional</b>, and the buyer must accept or decline it in writing.</li>
</ul>
<p>Unlike car or health insurance, title insurance is paid <b>once</b>, at closing, and it looks <b>backward</b>: it covers problems from the past, not future events.</p>`,
 keys:[["Title","The legal right to own a property"],["Our three jobs","Research, escrow/settlement, title insurance"],["Lender's policy","Protects the loan; usually required"],["Owner's policy","Protects the buyer; optional in MD"],["Premium","Paid once, at closing"]],
 traps:["A deed is a document; title is the ownership right itself.","We are neutral. We don't represent the buyer, the seller or the agent."],
 qs:["IQ01","IQ02","IQ03","IQ04","IQ05"]},

{id:"I02",s:"FN",t:"The words you'll hear every day",m:10,
 body:`
<p>Real estate has its own language. You don't have to memorize it today, but you'll hear these terms constantly.</p>
<h4>Documents</h4>
<table class="lt"><tr><th>Term</th><th>What it means</th></tr>
<tr><td>Contract of sale</td><td>The signed agreement between buyer and seller: price, dates, who pays what. It's the first thing we receive on a purchase.</td></tr>
<tr><td>Deed</td><td>The document that transfers ownership from the seller (grantor) to the buyer (grantee).</td></tr>
<tr><td>Deed of trust / mortgage</td><td>The document that makes the house collateral for a loan. In Maryland, most loans use a deed of trust.</td></tr>
<tr><td>Promissory note</td><td>The borrower's promise to repay the loan.</td></tr>
<tr><td>Title commitment</td><td>Our report before closing: what we'll insure, what must be fixed first (requirements) and what won't be covered (exceptions).</td></tr>
<tr><td>Title policy</td><td>The final insurance issued after closing and recording.</td></tr>
<tr><td>Survey / location drawing</td><td>A drawing showing the property lines and where the house, fence and driveway sit.</td></tr>
<tr><td>Closing Disclosure (CD)</td><td>The lender's final 5-page breakdown of the loan and costs. The borrower must receive it at least 3 business days before closing.</td></tr>
<tr><td>Settlement statement</td><td>Our itemized list of every dollar coming in and going out at closing.</td></tr></table>
<h4>Money words</h4>
<ul>
<li><b>Earnest money deposit (EMD):</b> the buyer's good-faith deposit when the contract is signed, credited toward the purchase at closing.</li>
<li><b>Payoff:</b> the exact amount needed to pay a loan or lien in full on a given date.</li>
<li><b>Lien:</b> a legal claim against the property for money owed (mortgage, unpaid taxes, a contractor, a court judgment).</li>
<li><b>Release:</b> the recorded document proving a lien was paid off.</li>
<li><b>Transfer and recordation taxes:</b> state and county taxes charged when a deed or loan is recorded.</li>
<li><b>Wire:</b> an electronic bank transfer. It's how most closing money moves, and it's the #1 target for fraud.</li>
</ul>
<h4>Process words</h4>
<ul>
<li><b>Closing / settlement:</b> the signing appointment where the deal happens. Maryland usually says "settlement."</li>
<li><b>Funding:</b> when the lender releases the loan money.</li>
<li><b>Disbursement:</b> when we pay everyone out.</li>
<li><b>Recording:</b> filing the deed and deed of trust with the county land records, which makes them official and public.</li>
<li><b>Ground rent:</b> a Maryland quirk (mostly around Baltimore) where the homeowner owns the house but pays a small yearly rent for the land under it.</li>
</ul>`,
 keys:[["Deed","Transfers ownership"],["Deed of trust","Makes the home collateral for a loan"],["Commitment","Pre-closing report: requirements and exceptions"],["Closing Disclosure","Borrower gets it 3 business days before closing"],["Recording","Filing with county land records"]],
 traps:["The deed of trust is not the deed. One secures a loan, the other transfers ownership.","Funding (lender releases money) and disbursement (we pay people) are different steps."],
 qs:["IQ06","IQ07","IQ08","IQ09","IQ10","IQ11"]},

{id:"I03",s:"PL",t:"Who does what inside a title company",m:9,
 body:`
<p>Every file passes through several hands. Knowing who owns each step tells you who to ask, and what happens if your step is late.</p>
<table class="lt"><tr><th>Role</th><th>What they do</th></tr>
<tr><td><b>Sales / business development</b></td><td>Builds relationships with real estate agents, lenders, builders and investors so they send us their deals. Visits offices, runs events, follows up on every closing.</td></tr>
<tr><td><b>Order entry / opener</b></td><td>Opens the new file when a contract or loan comes in: enters the parties, property and dates, and sends the welcome email.</td></tr>
<tr><td><b>Processor</b></td><td>The file's quarterback before closing. Orders the title search, requests payoffs, HOA and condo documents, and surveys, clears problems, talks to agents and lenders daily, and gets the file "clear to close."</td></tr>
<tr><td><b>Title examiner / abstractor</b></td><td>The abstractor searches the land records and court records. The examiner reviews the results, spots the problems, and decides what must be fixed before we can insure.</td></tr>
<tr><td><b>Closer / settlement officer</b></td><td>Runs the closing: prepares or reviews the settlement statement, explains documents, checks IDs, makes sure everything is signed and notarized, and follows the lender's instructions exactly. Must hold a Maryland title producer license.</td></tr>
<tr><td><b>Post-closer</b></td><td>After closing: sends documents for recording, returns the loan package to the lender, gets releases recorded for paid-off loans, and issues the final title policies.</td></tr>
<tr><td><b>Escrow / accounting</b></td><td>Handles the money: confirms incoming wires, sends payoffs and disbursements, and balances the escrow account every day.</td></tr>
<tr><td><b>Management / compliance</b></td><td>Oversees licensing, underwriter relationships, audits, security and quality.</td></tr></table>
<h4>Licensing matters</h4>
<p>In Maryland, anyone who sells title insurance or handles escrow, closing or settlement services needs a <b>title insurance producer license</b> from the Maryland Insurance Administration. Clerical work doesn't require one. Our pre-licensing course covers the exam.</p>
<h4>Teams can be spread out</h4>
<p>Many title companies split work across locations, for example processing in one office or country and closings in another. The handoffs between roles are where files get delayed, so clear notes in the file matter.</p>`,
 keys:[["Processor","Runs the file before closing; gets it clear to close"],["Examiner","Reviews the search and decides what must be fixed"],["Closer","Runs settlement; needs a producer license"],["Post-closer","Recording, lender package, releases, policies"],["License needed for","Selling title insurance or handling closings/escrow"]],
 traps:["The abstractor finds; the examiner decides.","Clerical staff don't need a producer license; closers do."],
 qs:["IQ12","IQ13","IQ14","IQ15","IQ16"]},

{id:"I04",s:"PL",t:"Our clients and partners",m:9,
 body:`
<p>A title company doesn't advertise to homebuyers much. Most of our business comes from <b>referral partners</b> who see deals first. Knowing what each one cares about is how we keep them sending files.</p>
<table class="lt"><tr><th>Who</th><th>Their role</th><th>What they want from us</th></tr>
<tr><td><b>Real estate agents</b> (listing and buyer's agents)</td><td>Represent the seller (listing) or buyer. Paid a commission at closing.</td><td>Fast, smooth closings, constant updates, no surprises, and a closing their client enjoys.</td></tr>
<tr><td><b>Lenders and loan officers</b></td><td>Provide the mortgage. Their processors and underwriters approve the loan.</td><td>Quick title commitments, exact compliance with their closing instructions, and loan packages returned on time.</td></tr>
<tr><td><b>Mortgage brokers</b></td><td>Shop the loan to different lenders.</td><td>Same as lenders. If broker and lender instructions conflict, the lender's control.</td></tr>
<tr><td><b>Builders / developers</b></td><td>Sell new-construction homes, often many at once.</td><td>Reliable closings at volume, coordination with their sales team, often their own contract forms.</td></tr>
<tr><td><b>Investors, wholesalers and cash buyers</b></td><td>Buy to fix and flip, rent, or assign the contract to another buyer.</td><td>Speed, experience with assignments and back-to-back closings, competitive pricing.</td></tr>
<tr><td><b>Buyers, sellers and borrowers</b></td><td>Our actual customers at the table.</td><td>Clear explanations, safe handling of their money, and respect for their time.</td></tr>
<tr><td><b>Attorneys</b></td><td>May represent a party, handle estates or divorces, or prepare deeds.</td><td>Accurate documents and coordination.</td></tr></table>
<h4>Others we work with every day</h4>
<p>The <b>title underwriter</b> (the insurance company we issue policies for), <b>HOAs and condo associations</b> (resale documents and dues payoffs), <b>surveyors</b>, the <b>county land records office</b>, existing <b>lenders</b> (for payoffs), and <b>abstractors</b>.</p>
<h4>Who picks the title company?</h4>
<p>Usually the buyer, often based on the agent's or loan officer's recommendation. Federal law (RESPA) says a seller <b>can't require</b> a buyer to use a particular title company when the buyer is getting a federally related loan. And nobody may pay or receive a <b>referral fee</b> for sending us business. It's illegal under both federal and Maryland law, even a gift card.</p>`,
 keys:[["Main referral sources","Agents, lenders, builders, investors"],["Broker vs. lender instructions","Lender's control"],["Who chooses title","Usually the buyer"],["Referral fees","Illegal under federal and MD law"]],
 traps:["A $50 gift card to an agent 'for the referral' is an illegal kickback.","The seller can't force the buyer to use the seller's title company."],
 qs:["IQ17","IQ18","IQ19","IQ20","IQ21"]},

{id:"I05",s:"TX",t:"Purchases: financed, cash, new construction and investors",m:11,
 body:`
<h4>Financed purchase (the most common deal)</h4>
<ol>
<li><b>Contract ratified:</b> buyer and seller sign. The agent sends us the contract, and we open the file.</li>
<li><b>Earnest money</b> is deposited (with us or the agent's broker).</li>
<li><b>Title search</b> is ordered. A <b>survey</b> may be ordered. HOA or condo documents are requested.</li>
<li>We issue the <b>title commitment</b> to the lender and send a <b>Closing Protection Letter</b>.</li>
<li>We order <b>payoffs</b> for the seller's mortgage and any liens.</li>
<li>The lender approves the loan ("clear to close") and sends the <b>Closing Disclosure</b> to the buyer at least <b>3 business days</b> before closing, then sends the loan documents and closing instructions to us.</li>
<li><b>Settlement:</b> everyone signs; we collect the buyer's funds (by wire); the lender <b>funds</b>.</li>
<li>We <b>record</b> the deed and deed of trust, <b>disburse</b> all payments, and pay off the seller's loan.</li>
<li><b>Post-closing:</b> releases are recorded, the loan package goes back to the lender, and the final policies are issued.</li>
</ol>
<p>A typical financed purchase takes about <b>30 to 45 days</b> from contract to closing.</p>
<h4>Cash purchase</h4>
<p>No lender, so no lender's policy, no loan documents and no Closing Disclosure. These can close in as little as 1–2 weeks. We still search title, offer the buyer an owner's policy, pay off the seller's liens and record the deed.</p>
<h4>New construction</h4>
<p>The <b>builder</b> is the seller and often uses their own contract. Watch for: the final survey from the builder, the use-and-occupancy permit, unpaid contractors (lien risk), and HOAs the builder still controls. Builders may close many homes in the same community.</p>
<h4>Investors and wholesalers</h4>
<ul>
<li><b>Fix-and-flip:</b> the investor buys (often cash or with a short-term "hard money" loan), renovates and resells. Title on the resale needs to be clean, including any contractor liens from the renovation.</li>
<li><b>Assignment:</b> a wholesaler puts a property under contract, then <b>assigns</b> that contract to another buyer for a fee. The end buyer closes directly with the seller.</li>
<li><b>Double (back-to-back) closing:</b> the investor buys and resells the same property the same day, in two separate closings. Lender rules and funding sources need extra care.</li>
</ul>`,
 keys:[["Typical financed timeline","30–45 days"],["Closing Disclosure","At least 3 business days before closing"],["Cash deal","No lender policy, no CD; can close fast"],["Assignment","Wholesaler sells their contract rights to an end buyer"]],
 traps:["No lender means no lender's policy, but we still offer the buyer an owner's policy.","New construction carries extra lien risk from unpaid contractors."],
 qs:["IQ22","IQ23","IQ24","IQ25","IQ26"]},

{id:"I06",s:"TX",t:"Refinances and other loans",m:7,
 body:`
<p>A <b>refinance</b> replaces an existing loan with a new one on a home the borrower already owns. There's no buyer or seller, just a <b>borrower</b> and a <b>lender</b>.</p>
<h4>Common types</h4>
<ul>
<li><b>Rate-and-term refinance:</b> a new loan to get a better rate or change the length of the loan.</li>
<li><b>Cash-out refinance:</b> a bigger new loan; the borrower keeps the difference as cash.</li>
<li><b>Home equity loan or line of credit (HELOC):</b> a second loan behind the first mortgage. A HELOC works like a credit card secured by the house.</li>
</ul>
<h4>What's different from a purchase</h4>
<ul>
<li>Only a <b>lender's policy</b> is issued. The owner already has (or chose not to get) an owner's policy.</li>
<li>The search may be shorter, and a reissue (discounted) rate may apply if the owner has an existing owner's policy. We must tell the borrower about the discount in writing.</li>
<li><b>All owners on the deed must sign the new deed of trust</b>, even if they aren't on the loan.</li>
<li>When the property is the borrower's <b>primary residence</b>, federal law gives the borrower a <b>3-business-day right to cancel</b> (rescission) after signing. The lender doesn't fund, and we don't disburse, until that period ends.</li>
<li>Paying off a HELOC? The borrower must sign a request to <b>close the line</b>, or it can be drawn on again and stay a lien.</li>
</ul>`,
 keys:[["Parties","Borrower and lender only"],["Policy issued","Lender's policy only"],["Right to cancel","3 business days on a primary-residence refi"],["Who signs the deed of trust","Every owner on the deed"]],
 traps:["A refi on a primary residence doesn't fund the same day; wait out the 3-day right to cancel.","A co-owner who isn't on the loan still signs the deed of trust."],
 qs:["IQ27","IQ28","IQ29","IQ30"]},

{id:"I07",s:"TX",t:"Special situations to flag early",m:8,
 body:`
<p>Most files are routine. These aren't. Your job isn't to solve them alone. It's to <b>spot them on day one and flag them</b> to your processor, examiner or manager, because each one needs extra documents and time.</p>
<table class="lt"><tr><th>Situation</th><th>Why it's different</th></tr>
<tr><td><b>Seller has died (estate sale)</b></td><td>A court-appointed Personal Representative usually signs for the estate. Probate documents are required.</td></tr>
<tr><td><b>Power of attorney</b></td><td>Someone signs for an owner who can't attend. High fraud risk; the underwriter and lender must approve the POA, and we confirm with the owner directly.</td></tr>
<tr><td><b>Divorce</b></td><td>Both spouses may still need to sign, or a court order may control the sale.</td></tr>
<tr><td><b>Short sale</b></td><td>The seller owes more than the sale price, and the lender agrees to take less. The lender's written approval letter sets strict terms.</td></tr>
<tr><td><b>Foreclosure / bank-owned (REO)</b></td><td>We must confirm the foreclosure was done properly before insuring the new buyer.</td></tr>
<tr><td><b>Bankruptcy</b></td><td>A court order is needed before the owner can sell or refinance.</td></tr>
<tr><td><b>Trust or company owns it</b></td><td>We need the trust agreement or company documents showing who can sign.</td></tr>
<tr><td><b>For sale by owner (no agents)</b></td><td>Nobody is guiding the parties, so contracts are often incomplete, and fraud risk is higher.</td></tr>
<tr><td><b>Name doesn't match</b></td><td>If the seller's name on our order differs from the name on the deed, stop and flag it immediately.</td></tr></table>
<h4>Fraud red flags</h4>
<p>A seller who can't meet, is "overseas" and wants everything done by email; a vacant property or land with no mortgage being sold quickly below value; last-minute changes to payment instructions; pressure to close fast. <b>Seller impersonation fraud</b> on vacant land and paid-off homes is growing. Report anything odd before going further.</p>`,
 keys:[["Estate sale","Personal Representative signs; probate docs needed"],["Bankruptcy","Court order required"],["Name mismatch","Flag immediately"],["Big fraud risk","Seller impersonation on vacant / paid-off property"]],
 traps:["It isn't your job to solve these, but it is your job to catch them early.","A remote seller who only communicates by email is a classic fraud warning sign."],
 qs:["IQ31","IQ32","IQ33","IQ34","IQ35"]},

{id:"I08",s:"OP",t:"A file's life, wire safety and great service",m:9,
 body:`
<h4>The life of a file</h4>
<p><b>Open → Search → Commitment → Clear title issues → Clear to close → Schedule → Settlement → Fund → Record and disburse → Post-close → File closed.</b> Every handoff should be noted in the file so the next person knows exactly where things stand.</p>
<h4>Wire fraud: the biggest risk in our business</h4>
<p>Criminals hack or fake email accounts of agents, title companies and buyers, then send "updated" wiring instructions so the money goes to them. A stolen wire is often <b>gone for good</b>.</p>
<ul>
<li><b>Never</b> change wiring instructions based on an email alone, even if it looks like it came from someone you know.</li>
<li><b>Always verify</b> by calling a phone number you already have on file or got independently, never the number in the email asking for the change.</li>
<li>Tell every buyer early: <b>we will never email you new wiring instructions or ask you to change them.</b> They should call us at a known number before sending money.</li>
<li>If a wire may have gone to the wrong place, tell your manager <b>immediately</b>. Speed is everything for getting money back.</li>
</ul>
<h4>Protecting people's information</h4>
<p>We handle Social Security numbers, bank accounts and IDs. Don't send them by unsecured email, don't leave files open on your desk or screen, and share only with people who need them for the file.</p>
<h4>Service that wins referrals</h4>
<ul>
<li><b>Update before you're asked.</b> Agents and loan officers hate chasing us. A quick status note prevents a frustrated call.</li>
<li><b>Bring problems early, with a plan.</b> "The seller's old mortgage isn't released; I've ordered a payoff and expect it Thursday" beats a surprise at closing.</li>
<li><b>Stay neutral and never give legal advice.</b> If someone asks what they <i>should</i> do legally, refer them to their attorney or agent.</li>
<li><b>Make closing day easy:</b> confirm the time, location, what ID to bring and how to send funds the day before.</li>
</ul>`,
 keys:[["Change in wire instructions","Verify by phone at a known number, never by email"],["Possible wire fraud","Tell your manager immediately"],["Legal questions","Refer to their attorney"],["Best service habit","Update before you're asked"]],
 traps:["The phone number inside a suspicious email is not a safe way to verify.","Explaining a document is fine; telling someone what they should do legally is not."],
 qs:["IQ36","IQ37","IQ38","IQ39","IQ40"]}
];

const QUESTIONS = [
{id:"IQ01",s:"FN",q:"In plain terms, what is \"title\"?",
 o:["The legal right to own a property", "The signed deed the buyer receives and records at closing", "The insurance policy issued after the deed is recorded", "The county's official tax record for the property"],
 a:0,e:"Title is the ownership right itself. The deed is the document that transfers it, and the policy insures it."},
{id:"IQ02",s:"FN",q:"Which of these is NOT one of a title company's core jobs?",
 o:["Searching land records to confirm ownership and liens", "Acting as the neutral party for closing funds", "Issuing title insurance policies on the property", "Negotiating the sale price on the buyer's behalf"],
 a:3,e:"Negotiating price is the agent's job. We research title, handle escrow and settlement neutrally, and issue title insurance."},
{id:"IQ03",s:"FN",q:"A buyer asks why she needs title insurance when the title search came back clean. What's the best answer?",
 o:["The lender requires every buyer to purchase an owner's policy", "It covers hidden past problems a search can't find", "It covers damage to the house from fire, flood or storms", "Maryland law requires every buyer to purchase it"],
 a:1,e:"Title insurance covers hidden past defects. It isn't property insurance, and in Maryland the owner's policy is optional."},
{id:"IQ04",s:"FN",q:"How is title insurance paid for, compared with homeowner's insurance?",
 o:["Monthly, added to the mortgage payment","Every year on the closing anniversary","Once, at closing","Only if a claim is filed"],
 a:2,e:"Title insurance is a one-time premium paid at closing. It covers problems from before the policy date."},
{id:"IQ05",s:"FN",q:"In Maryland, which statement about the owner's title policy is true?",
 o:["Lenders require it on every loan they make", "It's optional; the buyer accepts or declines it in writing", "Only buyers paying all cash are allowed to buy one", "The seller always pays for it as a closing cost"],
 a:1,e:"The lender's policy is usually required; the owner's policy is optional, and Maryland requires the buyer's written choice."},
{id:"IQ06",s:"FN",q:"Which document transfers ownership from the seller to the buyer?",
 o:["Deed of trust","Promissory note","Deed","Title commitment"],
 a:2,e:"The deed transfers ownership. The deed of trust makes the home collateral for the loan; the note is the promise to repay."},
{id:"IQ07",s:"FN",q:"What is a deed of trust?",
 o:["The document that transfers ownership to the buyer", "The document that makes the home collateral for a loan", "The title company's agreement for holding escrow money", "A family trust that holds ownership of the property"],
 a:1,e:"A deed of trust secures the loan with the property. In Maryland most mortgages are deeds of trust."},
{id:"IQ08",s:"FN",q:"A title commitment shows \"requirements\" and \"exceptions.\" What's the difference?",
 o:["Requirements: done before closing; exceptions: not covered", "Requirements are optional; exceptions must be completed", "They're two names for the same list of items", "Requirements apply to the buyer; exceptions to the seller"],
 a:0,e:"Requirements must be satisfied (e.g., pay off the old mortgage). Exceptions are matters the policy excludes (e.g., a utility easement)."},
{id:"IQ09",s:"FN",q:"How far ahead must a borrower receive the Closing Disclosure?",
 o:["At the closing table","24 hours before closing","At least 3 business days before closing","10 days before closing"],
 a:2,e:"Federal rules require the borrower to receive the Closing Disclosure at least 3 business days before closing."},
{id:"IQ10",s:"FN",q:"What does \"recording\" mean?",
 o:["Taking written notes of what's said during the closing", "Filing the deed and deed of trust with the county", "Saving the completed file in our closing software", "Sending the lender its signed loan package overnight"],
 a:1,e:"Recording files documents in the public land records, making them official and putting the world on notice."},
{id:"IQ11",s:"FN",q:"What is the difference between \"funding\" and \"disbursement\"?",
 o:["They mean the same thing and happen at the same moment", "The lender releases the loan money; then we pay everyone out", "Funding is the buyer's deposit; disbursement is the seller's check", "Disbursement happens first, and funding follows a day later"],
 a:1,e:"The lender funds the loan; then we disburse to the seller, payoffs, agents, taxes and fees."},
{id:"IQ12",s:"PL",q:"Who is the \"quarterback\" of a file before closing, ordering the search and payoffs and getting it clear to close?",
 o:["The closer who runs settlement", "The processor", "The post-closer who handles recording", "The abstractor at the courthouse"],
 a:1,e:"The processor runs the file before closing; the closer runs settlement; the post-closer handles what comes after."},
{id:"IQ13",s:"PL",q:"Who reviews the search results and decides what must be fixed before the company will insure?",
 o:["The abstractor who pulls the records at the courthouse", "The title examiner", "The listing agent who represents the seller", "The escrow accountant who balances the account"],
 a:1,e:"The abstractor gathers records; the examiner reviews them and sets the requirements."},
{id:"IQ14",s:"PL",q:"Which role needs a Maryland title insurance producer license?",
 o:["A receptionist who answers phones and greets clients", "A file clerk who scans and organizes closing documents", "A closer who runs settlements and handles escrow", "Nobody, because licenses are only required for owners"],
 a:2,e:"Selling title insurance or providing closing, settlement or escrow services requires a license. Clerical work doesn't."},
{id:"IQ15",s:"PL",q:"After closing, who sends documents for recording, returns the lender's package and issues the final policies?",
 o:["The processor","The closer","The post-closer","The sales rep"],
 a:2,e:"Post-closing handles recording, the lender package, lien releases and policy issuance."},
{id:"IQ16",s:"PL",q:"What is the main job of a title company's sales / business development team?",
 o:["Conducting closings and notarizing the documents", "Building relationships so partners send us deals", "Searching the land records for each new file", "Balancing the escrow account at the end of each day"],
 a:1,e:"Most title business comes from referral partners, so sales builds and keeps those relationships."},
{id:"IQ17",s:"PL",q:"A listing agent represents whom?",
 o:["The buyer","The seller","The lender","The title company"],
 a:1,e:"The listing agent represents the seller; the buyer's agent represents the buyer."},
{id:"IQ18",s:"PL",q:"The mortgage broker's instructions say one thing and the lender's closing instructions say another. Which do we follow?",
 o:["The broker's","The lender's","Whichever the buyer prefers","Whichever arrived first"],
 a:1,e:"The lender's instructions control. Ask the lender to clarify in writing if something conflicts."},
{id:"IQ19",s:"PL",q:"Which type of client typically buys properties to renovate and resell, or assigns contracts to other buyers?",
 o:["Builders who sell new-construction homes in volume", "Investors and wholesalers", "Loan officers who originate mortgages", "Property managers who run HOA communities"],
 a:1,e:"Investors flip or hold properties; wholesalers put properties under contract and assign them to end buyers."},
{id:"IQ20",s:"PL",q:"A loan officer offers to send you all his files if you give him a $100 gift card for each one. What do you do?",
 o:["Accept it, since it's a normal cost of marketing", "Accept it, as long as each card is under $100", "Decline, because paying for referrals is illegal", "Accept it, as long as the buyer agrees in writing"],
 a:2,e:"Referral fees and kickbacks, including gift cards, are prohibited by RESPA and Maryland law."},
{id:"IQ21",s:"PL",q:"Can a seller require the buyer to use the seller's title company when the buyer has a federally related mortgage?",
 o:["Yes, if the requirement is written into the contract", "Yes, as long as the seller pays all the title fees", "No", "Yes, but only on new-construction sales"],
 a:2,e:"RESPA Section 9 bars a seller from requiring a particular title company; the seller can owe the buyer three times the title charges."},
{id:"IQ22",s:"TX",q:"What usually starts a purchase file at a title company?",
 o:["Receiving the lender's closing instructions", "Receiving the ratified contract of sale", "Issuing the final owner's title policy", "Completing the buyer's final walk-through"],
 a:1,e:"A purchase file opens when we receive the signed (ratified) contract, usually from an agent."},
{id:"IQ23",s:"TX",q:"Which of these is true of an all-cash purchase?",
 o:["We skip the title search because there's no lender", "No lender's policy or CD, but title is still searched", "The buyer must still purchase a lender's policy", "Cash deals take longer than financed ones to close"],
 a:1,e:"No lender means no lender's policy or CD. Title is still searched, liens paid off and an owner's policy offered."},
{id:"IQ24",s:"TX",q:"Roughly how long does a typical financed purchase take from contract to closing?",
 o:["2–3 days","1 week","30–45 days","6 months"],
 a:2,e:"Most financed purchases take about 30–45 days to allow for the appraisal, loan approval and title work."},
{id:"IQ25",s:"TX",q:"What extra risk should you watch for on a new-construction closing?",
 o:["A ground rent is always attached to new homes", "Liens from unpaid contractors or suppliers", "The buyer usually can't qualify for a loan", "Builders never provide a survey of the lot"],
 a:1,e:"Unpaid contractors and suppliers can file liens. Also watch for the final survey, the use-and-occupancy permit and builder-controlled HOAs."},
{id:"IQ26",s:"TX",q:"A wholesaler has a property under contract and sells his rights in that contract to another buyer for a fee. This is called:",
 o:["A refinance","An assignment of contract","A short sale","A deed in lieu"],
 a:1,e:"In an assignment, the end buyer steps into the wholesaler's contract and closes directly with the seller."},
{id:"IQ27",s:"TX",q:"Who are the parties in a refinance?",
 o:["Buyer, seller and lender","Borrower and lender","Seller and lender","Buyer and seller"],
 a:1,e:"A refinance has no buyer or seller, just the borrower (current owner) and the new lender."},
{id:"IQ28",s:"TX",q:"Which policy is normally issued on a refinance?",
 o:["The owner's policy only", "The lender's policy only", "Both an owner's and a lender's policy", "No policy, since the title was insured before"],
 a:1,e:"Only a lender's policy is issued; the owner's coverage (if any) came from their purchase."},
{id:"IQ29",s:"TX",q:"A borrower refinances her primary residence on Monday. When can the loan fund?",
 o:["Right away, at the closing table on Monday", "After her 3-business-day right to cancel ends", "After a mandatory 30-day waiting period", "Only after the final title policy is issued"],
 a:1,e:"Federal law gives a 3-business-day right of rescission on a primary-residence refinance; the lender funds after it expires."},
{id:"IQ30",s:"TX",q:"Husband and wife own the home together, but only the husband is on the new refinance loan. Who signs the deed of trust?",
 o:["Only the husband, because he's the borrower", "Only the wife, because she isn't on the loan", "Both", "Whichever owner the lender chooses to name"],
 a:2,e:"All record owners must sign the deed of trust for the lender's lien to cover the whole property."},
{id:"IQ31",s:"TX",q:"The seller on a new file passed away last year. Who will most likely sign the deed?",
 o:["Any adult child of the seller who agrees to sign", "The listing agent, on behalf of the family", "The estate's court-appointed Personal Representative", "Nobody, because the house can't be sold until probate ends"],
 a:2,e:"For deaths since 1970 in Maryland, title vests in the estate's Personal Representative, who signs once appointed."},
{id:"IQ32",s:"TX",q:"The seller's name on our order is \"Michael Brown,\" but the vesting deed shows \"Michael and Lisa Brown.\" What should you do?",
 o:["Ignore it, since the first name and last name match", "Change the order to say Michael Brown only", "Flag it right away, because Lisa may need to sign", "Ask the buyer's agent to decide whether it matters"],
 a:2,e:"Any mismatch between the order and the vesting deed must be raised right away. Another owner may need to sign."},
{id:"IQ33",s:"TX",q:"A seller of a vacant lot with no mortgage says he's overseas, can't meet anyone, and wants everything handled by email quickly. This is:",
 o:["Routine, since many sellers travel for work", "A seller-impersonation fraud red flag", "Only a problem if the price is unusually high", "Fine, as long as he emails a copy of his ID"],
 a:1,e:"Remote, email-only sellers of vacant or paid-off property are a top fraud pattern. Flag it before going further."},
{id:"IQ34",s:"TX",q:"In a short sale, the key document that sets the terms is:",
 o:["The buyer's loan pre-approval letter", "The seller's lender's written approval letter", "The HOA's resale disclosure package", "The appraisal ordered by the buyer's lender"],
 a:1,e:"The seller's lender agrees to accept less than it's owed, and its approval letter sets strict conditions we must meet."},
{id:"IQ35",s:"TX",q:"What is your main job when you spot an unusual situation (estate, divorce, bankruptcy, POA) on a new file?",
 o:["Resolve it yourself before telling anyone else", "Flag it early to your processor or manager", "Wait until closing day to see whether it matters", "Ask the real estate agent to take care of it"],
 a:1,e:"Special situations need extra documents and time. Catching and flagging them on day one prevents delays."},
{id:"IQ36",s:"OP",q:"You receive an email that looks like it's from the seller's agent with \"updated wiring instructions\" for the seller's proceeds. What do you do?",
 o:["Update the instructions, since it came from the agent's email", "Reply to the same email asking them to confirm", "Call the seller at a number already in our file", "Call the phone number given in that email"],
 a:2,e:"Never change wiring instructions on an email alone. Verify by calling a number you already have, never one supplied in the suspicious email."},
{id:"IQ37",s:"OP",q:"What should every buyer be told early in the transaction about wiring money?",
 o:["Wire funds as soon as anyone emails you instructions", "We'll never email new wiring instructions; always call us first", "Use whichever instructions arrived in the most recent email", "Bring cash to closing, since it's the safest method"],
 a:1,e:"Warning buyers up front is one of the strongest defenses against wire fraud."},
{id:"IQ38",s:"OP",q:"You think a wire may have been sent to the wrong account. What's the first step?",
 o:["Wait a day to see if it bounces back","Tell your manager immediately","Email the buyer to ask what happened","Fix it quietly yourself"],
 a:1,e:"Speed is critical to recovering misdirected funds. Escalate right away."},
{id:"IQ39",s:"OP",q:"At closing, a seller asks you whether she should put the house in her daughter's name to avoid taxes. What do you say?",
 o:["Tell her it's a smart way to save on taxes", "Tell her it's a bad idea and she shouldn't do it", "Say we can't give legal advice; suggest an attorney", "Add the daughter to the deed before closing"],
 a:2,e:"Title staff stay neutral and don't give legal advice. Refer legal and tax questions to an attorney or accountant."},
{id:"IQ40",s:"OP",q:"Which habit does the most to keep agents and loan officers sending us files?",
 o:["Answering promptly whenever they call us", "Sending updates before they have to ask", "Waiting until closing to mention any problems", "Copying them on every internal email about the file"],
 a:1,e:"Proactive updates and raising problems early, with a plan, are what referral partners value most."}
];

window.COURSES = window.COURSES || [];
window.COURSES.push({
  id: "intro-to-title",
  draft: true,
  title: "Introduction to Title",
  subtitle: "Start here · For new team members",
  description: "What a title company does, who does what, who our clients are, the main types of deals, and how to keep money and information safe. No real estate experience needed.",
  source: "CLA Title internal training",
  exam: { counts: {FN:8, PL:7, TX:9, OP:4}, minutes: 35, pass: 80 },
  rateCharts: false,
  sections: SECTIONS,
  lessons: LESSONS,
  questions: QUESTIONS
});
})();
