// Course: CLA Processor Playbook (draft).
// Source: CLA processor training manual compiled from 558 recorded processor calls, Sep–Nov 2026.
// Names, client details and file specifics were removed on purpose. Policies marked "confirm" are pending manager review.
(function(){
const SECTIONS = { FW: "Funds & Wires", BL: "Balancing & Taxes", TC: "Signers & Title Clearance", OP: "Payoffs, Scheduling & Special Files", CM: "Policies, Refunds & Communication" };
const SRC = '<p class="note">Built from what CLA processors actually do on recorded calls (Sep–Nov 2026). Where a rule is still being confirmed by management, it says so.</p>';
const HOW = items => '<div class="ex"><b>How we do it at CLA</b><ul style="margin:6px 0 0">' + items.map(i => '<li>' + i + '</li>').join('') + '</ul></div>';

const LESSONS = [
{id:"K01",s:"FW",t:"Wire instructions and verification",m:6,
 body: SRC + `
<p>Wire fraud is the biggest money risk in our business, so CLA handles wire instructions the same way on every file, no exceptions.</p>` + HOW([
"Wire instructions go out <b>only through Qualia (Qualia Connect)</b>. Never by plain email, never through the agents, never through anyone else.",
"Earnest money instructions go out through Qualia the <b>same day</b>, by end of day at the latest.",
"<b>Every wire is verified by voice.</b> Funding calls whoever is sending or receiving money and confirms the instructions verbally before money moves.",
"Before discussing instructions with a caller, <b>identify the file</b>: last name or property address.",
"When someone sends us instructions for an outgoing wire (a payoff, seller proceeds), we <b>call to verify them</b> before sending, no matter who emailed them.",
"After a buyer wires, ask them to <b>email the bank's wire confirmation</b>, and tell them we'll update them once it lands."]) + `
<h4>Welcome the callers who check</h4>
<p>A buyer who calls to confirm our routing and account numbers is doing exactly the right thing. Thank them and verify. The ones who <i>don't</i> call are the ones to worry about.</p>
<h4>When your call might look like a scam</h4>
<p>If you're cold-calling someone to sign a document or send money, they may think <i>you're</i> the scammer. Back up the call with a message through Qualia so they can see it's really us.</p>
<h4>Holidays</h4>
<p>Banks don't send wires on federal holidays. Plan disbursements around them, and remember fraud attempts spike before holidays and long weekends.</p>`,
 keys:[["Wire instructions sent","Only through Qualia / Qualia Connect"],["Every wire","Verified by phone before money moves"],["EMD instructions","Same day, end of day at the latest"],["Federal holidays","No outgoing wires"]],
 traps:["\"The agent forwarded our wire instructions\" is exactly what we don't allow.","Emailed payoff instructions get a verification call too, even from a lender."],
 qs:["KQ01","KQ02","KQ03","KQ04"]},

{id:"K02",s:"FW",t:"Earnest money and closing funds",m:7,
 body: SRC + `
<h4>Earnest money (EMD)</h4>
<p>Buyers get an email listing the accepted ways to send the deposit: a <b>bank wire</b>, a <b>check payable to "CLA Title and Escrow" submitted through our website</b>, or a check sent by <b>FedEx</b>. A wire is usually easiest. A buyer with no checkbook can use the portal link or wire.</p>
<h4>Cash to close</h4>
<ul>
<li>On every file (Maryland, DC and Florida), <b>anything over $5,000 must be wired</b>. Smaller amounts may come by cashier's check, but cashier's checks clear slowly.</li>
<li>Wires should show the <b>file number or the buyer's (or LLC's) name</b> in the description so funding can match them. A name alone is acceptable.</li>
<li>Buyers must wire the <b>exact cash to close</b>. The earnest money is <b>already credited</b> in that figure, so they must not subtract it again.</li>
<li>Slow bank transfer (some banks say up to 72 hours)? Have the buyer <b>start it now</b> and send the receipt.</li>
</ul>` + HOW([
"Confirm receipts with the <b>exact amount</b> received; funding also confirms by email.",
"If the statement lists more than one account, confirm <b>which account</b> the money goes to.",
"Ask for the <b>back image</b> of deposited checks when reviewing them.",
"The commission is wired out <b>only after the lender's funds are in</b>.",
"Keys aren't released until funds are confirmed, and release needs <b>approval</b>."]) + `
<div class="ex"><b>Example:</b> Cash to close is $61,820.75. The buyer subtracts their earnest money again and wires $57,626.75. They're <b>$4,194.00 short</b> and must send the difference before closing.</div>`,
 keys:[["Cash to close over $5,000 (MD, DC, FL)","Must be wired"],["Wire description","File number or buyer/LLC name"],["EMD in cash to close","Already credited; don't subtract again"],["Commission paid","After lender funds arrive"]],
 traps:["Buyers subtracting the deposit twice is the most common shortfall.","Never release keys or pay commission before funds are confirmed."],
 qs:["KQ05","KQ06","KQ07","KQ08","KQ09"]},

{id:"K03",s:"BL",t:"Balancing the lender CD and the settlement statement",m:8,
 body: SRC + `
<p>Before every closing, our settlement statement (ALTA) and the lender's latest Closing Disclosure must have <b>matching bottom lines</b>. When they balance, confirm by email that the CD is "balanced and final."</p>
<h4>Check the lender's CD line by line</h4>
<p>Errors we've caught on lender CDs include: the wrong number of HOA months collected up front (for example $85 when the association collects two months, $170), the wrong tax reserve months, an old tax bill, and the wrong borrower names on the deed of trust. Call the lender's closer with each error.</p>
<p><b>Watch for silent changes.</b> Lenders sometimes change a CD after it's e-signed without telling us. Always balance to the <b>latest</b> version.</p>
<h4>Match the other title company to the penny</h4>
<p>When the other side has its own title company, our figures must match theirs exactly, even a $3.50 difference. A late credit can push a file into <b>over-funding</b>, so don't just add credits without rebalancing.</p>` + HOW([
"Commissions must be labeled <b>\"commission\"</b> on the CD, never \"admin fee,\" and separate lines stay separate.",
"Remove items that don't apply (for example a water escrow on a file that doesn't need one).",
"For an addendum, ask: <b>\"Is the sales price changing, or is it a credit?\"</b> The buyer's wire changes only once it's signed.",
"Seller-credit addenda must match the ALTA.",
"An ALTA <b>stamped approved</b> goes back for re-approval if anyone changes it.",
"If an addendum came in late, make sure nobody signs the <b>old</b> settlement statement.",
"Seller proceeds can go to a non-titled party only if it's on the ALTA <b>and</b> the seller signs an authorization.",
"Confirm occupancy (do both buyers plan to live there?) when setting up the ALTA."]) ,
 keys:[["Before closing","CD and ALTA bottom lines match; confirm 'balanced and final'"],["Commission label","\"Commission,\" never \"admin fee\""],["Approved ALTA changed","Goes back for re-approval"],["Late addendum","Don't sign the old statement"]],
 traps:["Balancing to an outdated CD the lender changed without telling you.","A late credit added without rebalancing can over-fund the file."],
 qs:["KQ10","KQ11","KQ12","KQ13"]},

{id:"K04",s:"BL",t:"Tax prorations and seller tax issues (DC, MD, FL)",m:8,
 body: SRC + `
<h4>Every jurisdiction is different, so look it up</h4>
<table class="lt"><tr><th>Where</th><th>What to know</th></tr>
<tr><td><b>DC</b></td><td>Tax year runs <b>October 1 – September 30</b>, not the calendar year. The seller owes from October 1 through closing. Even experienced processors look it up every time.</td></tr>
<tr><td><b>Maryland</b></td><td>Tax year runs July 1 – June 30. Watch for county requirements, such as a current bill that must be paid before a lot split can get its new tax ID.</td></tr>
<tr><td><b>Florida</b></td><td>When the seller already paid: credit the seller from closing through <b>December 31</b> for county (ad valorem) taxes, and from closing through <b>October 1</b> for non-ad valorem assessments.</td></tr></table>
<h4>Crossing into a new tax year</h4>
<p>A closing that slips into a new tax year can change things. In one case the property was reclassified (residential to vacant), which changed the taxes due to record the deed and required an updated statement. Warn clients when a delay could cross a tax-year change.</p>
<h4>Maryland withholding for non-resident sellers</h4>
<ul>
<li>Identify non-resident sellers <b>early</b>. Withholding can affect the timeline. Call the seller and follow up by email.</li>
<li>For a seller who is a Maryland resident, the Maryland withholding line is <b>zero</b>.</li>
<li>If a spouse is a non-resident, their share may need withholding. You may need their <b>ITIN</b>.</li>
<li>If a proceeds check was issued wrong, it gets <b>reissued</b>. Don't let the seller cash it.</li>
</ul>` + HOW([
"Delinquent taxes found in the search are paid by the <b>seller</b> at closing.",
"Verify tax IDs <b>against public records</b>, not just what someone emailed.",
"Homestead and exemption questions go to the <b>county</b>. Don't give tax advice."]),
 keys:[["DC tax year","Oct 1 – Sep 30"],["MD tax year","Jul 1 – Jun 30"],["FL (seller paid)","Ad valorem to Dec 31; non-ad valorem to Oct 1"],["MD resident seller withholding","Zero"],["Delinquent taxes","Paid by the seller at closing"]],
 traps:["Prorating DC taxes on a calendar year.","Not flagging a non-resident seller until the week of closing."],
 qs:["KQ14","KQ15","KQ16","KQ17"]},

{id:"K05",s:"TC",t:"Who must sign",m:7,
 body: SRC + `
<table class="lt"><tr><th>Situation</th><th>Who signs</th></tr>
<tr><td>More than one owner on the deed</td><td><b>Every vested owner</b> signs, even if one insists he's \"the only one who needs to sign.\" Remote online notarization (RON) can help with a hard-to-reach owner.</td></tr>
<tr><td>Florida homestead</td><td>The seller's spouse signs the deed <b>even if not on title</b>. Ask: \"Is this property a homestead?\"</td></tr>
<tr><td>Power of attorney</td><td>Only after the <b>lender approves</b> the POA. Find out which POA form the lender accepts before drafting one. The agent must have the <b>original signed POA</b> and signs in the exact wording it shows.</td></tr>
<tr><td>Trust</td><td>Get the <b>trust documents</b>. Read who has authority: if one trustee has sole authority and can sign, only that trustee signs.</td></tr>
<tr><td>LLC or company seller</td><td>The company must be <b>in good standing</b>. No settlement until we have the certificate of good standing (plus the operating agreement where required).</td></tr></table>` + HOW([
"Read a POA's <b>gift and transfer authority</b> before accepting it for a transfer <i>to the agent</i>; general language may not allow it.",
"Don't take a seller's word that they \"filed\" for good standing. Wait for the certificate.",
"Request corporate documents from entity <b>buyers</b> too.",
"Individuals leave the TIN field blank in Qualia intake; it's for entities.",
"For married buyers taking title together, confirm the vesting and, if needed, each owner's percentage."]),
 keys:[["Vested owners","All of them sign"],["FL homestead spouse","Signs even if not on title"],["POA","Lender approval first; original document"],["LLC seller","Certificate of good standing before settlement"]],
 traps:["\"He says he's the only one who needs to sign\" is not an answer. Check the vesting.","Scheduling a POA signing before the lender approves the POA."],
 qs:["KQ18","KQ19","KQ20","KQ21","KQ22"]},

{id:"K06",s:"TC",t:"Curative work: judgments, ground rents, permits, corrective deeds",m:8,
 body: SRC + `
<h4>Judgments</h4>
<p>An open judgment on the commitment needs a payoff. <b>Tell the affected party before you request the payoff</b>, and word the email carefully. Clients and loan officers get upset when a payoff request lands with no warning and sounds like an accusation.</p>
<h4>Ground rents</h4>
<p>When a ground rent is being redeemed, the lender needs a <b>formal signed document</b> from the ground rent owner, not an informal note, and the final title must show <b>fee simple</b>. We may need to type up the document for the owner to sign, then record it and confirm the recording. (How we treat unregistered ground rents is being confirmed with management.)</p>
<h4>Open or abandoned permits (Florida)</h4>
<p>If the county won't cancel an old permit (for example because it never became active), ask the seller to check with the county's permit resolution office, which is usually more helpful than the front desk. The fallback is a <b>seller affidavit / hold-harmless at closing</b> stating the work was never begun.</p>
<h4>Corrective deeds</h4>
<p>If a recorded deed has an error (like a missing unit number), <b>everyone who signed the original deed signs the corrective deed</b>.</p>
<h4>Releases and the chain of title</h4>
<ul>
<li>An open deed of trust from an old loan needs a <b>recorded release</b> before we can insure.</li>
<li>Check that the abstract covers the <b>full search period</b> (60 years is the standard). One abstract only went back to 1985 and had to be sent back.</li>
<li>Prior foreclosures or unusual owners need more digging (taxes, names).</li>
</ul>` + HOW([
"Court orders (divorce, estate) must be the <b>final, judge-signed</b> copy, sent as a PDF scan, not a phone photo.",
"Old surveys need a <b>recertification</b> from the original survey company.",
"Missing items get reported to the <b>title team</b> right away."]),
 keys:[["Judgment payoff","Tell the party first"],["Ground rent redemption","Formal signed document; title shows fee simple"],["Corrective deed","Everyone who signed the original"],["Search depth","60 years"],["Court documents","Final judge-signed copy, PDF"]],
 traps:["Treating a ground-rent owner's informal note as proof of redemption.","Accepting a county front-desk 'no' as final."],
 qs:["KQ23","KQ24","KQ25","KQ26"]},

{id:"K07",s:"OP",t:"Payoffs and HOA / condo statements",m:6,
 body: SRC + `
<h4>Mortgage payoffs</h4>
<ul>
<li>Many servicers <b>won't give payoffs through their phone system</b>. Some only take requests through their web portal (PennyMac is one). Phone holds can run 15–30 minutes, so use portals or email when you can.</li>
<li>Many servicers need a <b>borrower authorization form</b> first. Get it signed early.</li>
<li>If the loan was <b>transferred</b>, order from the <b>current</b> servicer.</li>
<li>Ask whether to email or fax the request, and <b>follow up</b>. Some credit unions are slow.</li>
<li>Payoffs older than about 30 days usually need to be <b>updated</b>.</li>
<li>Title orders payoffs for <b>other liens</b> too; the borrower doesn't have to.</li>
</ul>
<h4>HOA and condo statements</h4>
<ul>
<li><b>Order early and keep following up.</b> One statement ordered in late October still hadn't arrived in November because the management company couldn't find the property.</li>
<li>Management companies <b>charge</b> for statements (for example $50 for an HOA statement; $189.95 through one condo platform). Be ready to explain these fees to sellers.</li>
<li>Watch for a <b>second association</b> and any <b>capital contribution</b> the buyer pays.</li>
<li>Some associations collect <b>two months</b> of dues up front.</li>
</ul>`,
 keys:[["Payoff requests","Portal or email; many won't use phone"],["Before ordering","Borrower authorization form"],["Transferred loan","Order from the current servicer"],["Payoff age","Update if older than ~30 days"],["HOA statements","Order early; fees apply"]],
 traps:["Ordering from the old servicer after a loan transfer.","Missing a second HOA or its capital contribution."],
 qs:["KQ27","KQ28","KQ29","KQ30"]},

{id:"K08",s:"OP",t:"Scheduling signings: notaries, RON and timing",m:6,
 body: SRC + `
<p>CLA can close almost anywhere: the signer's home, their job, on their lunch break, or one of our offices.</p>` + HOW([
"Get an <b>exact time</b>, not a window like \"anytime before 5.\"",
"Confirm the <b>address</b> and the <b>best phone number</b> for the notary, then double-check the notary's booking date.",
"Make a <b>reminder call the day before</b>.",
"Confirm time and location with <b>every party</b>, update the file notes, and send <b>calendar invites</b>.",
"RON (remote online notarization) works for sellers signing separately or hard-to-reach signers."]) + `
<h4>Split signings and FedEx</h4>
<p>When documents travel from one signer to another by FedEx, a late signing can miss the FedEx cutoff and push the whole closing back. Set a clear deadline (for example <b>sign before 4 p.m.</b>), send the <b>return</b> label (not the outbound one), and stay on the line until it's confirmed received.</p>
<h4>Wet ink vs. e-signature</h4>
<p>Some documents <b>can't be e-signed</b>. If someone e-signs one of those, we need the <b>signed original</b>. Some documents also need a notary. The Closing Disclosure can usually be e-signed.</p>
<h4>When things go wrong</h4>
<p>A notary reports a no-show: call the client right away. A seller is unresponsive: the buyer can still sign, and disbursement waits until the seller signs. Some lenders need settlement confirmed before they send loan funds.</p>`,
 keys:[["Signing time","Exact time, never a window"],["Day before","Reminder call"],["FedEx split signing","Firm deadline (e.g., sign before 4); return label"],["Wet-ink documents","Need the signed original"]],
 traps:["Giving the notary a time window or the wrong date.","Accepting an e-signature on a wet-ink document."],
 qs:["KQ31","KQ32","KQ33","KQ34"]},

{id:"K09",s:"OP",t:"Special transactions",m:6,
 body: SRC + `
<table class="lt"><tr><th>File type</th><th>What to watch</th></tr>
<tr><td><b>Assignment deals</b></td><td>Buyers change often. If the assignor cancels with one buyer and brings another, make sure the old contract is properly cancelled and <b>re-audit the CDs</b> for the new buyer. Confirm how the assignment fee is handled on each file.</td></tr>
<tr><td><b>Divorce / marital settlement agreement (MSA)</b></td><td>Check that net proceeds actually cover the MSA payouts. If they don't, the parties don't need a new MSA, but we need <b>something in writing</b> from them about how to distribute. Pay the right party; an overpayment to the wrong spouse has to be recovered.</td></tr>
<tr><td><b>Repair escrows</b></td><td>Need <b>lender approval</b> and an <b>invoice</b>.</td></tr>
<tr><td><b>Construction holdbacks</b></td><td>Funds held in escrow until the work is done, then released. Check the lender documents carefully; wrong documents mean a revised package.</td></tr>
<tr><td><b>Unfamiliar requests</b></td><td>(For example a \"title approval letter\" the team hasn't seen.) Ask for a sample and take it to the title team.</td></tr></table>`,
 keys:[["Assignment buyer change","Re-audit the CDs"],["MSA short on proceeds","Written direction from the parties"],["Repair escrow","Lender approval + invoice"]],
 traps:["Closing with a new assignee before the prior contract is cancelled.","Paying MSA amounts without checking net proceeds."],
 qs:["KQ35","KQ36","KQ37"]},

{id:"K10",s:"CM",t:"Owner's policies, invoices, refunds and post-closing",m:6,
 body: SRC + `
<h4>Owner's policy choices</h4>
<p>Buyers choose a <b>basic</b> or <b>enhanced</b> (homeowner's) owner's policy. If they switch, the premium changes, so <b>update the CD and the ALTA</b>.</p>
<h4>Paying seller bills and reimbursements</h4>
<ul>
<li>Seller invoices can be paid from proceeds at closing; with several sellers, split as directed.</li>
<li>Leased equipment and service accounts should transfer to the buyer, or the seller keeps getting billed.</li>
<li><b>Reimbursements need an invoice.</b> Accounting reviews them closely.</li>
</ul>
<h4>Refunds and corrections</h4>
<ul>
<li>Water escrow refunds typically go out within <b>one to two weeks</b>.</li>
<li>When sending a refund or check overnight, send the recipient the <b>tracking label</b>.</li>
<li>Wrong proceeds checks get <b>reissued</b>, not cashed.</li>
<li>Rush services may come in regular, rush or super-rush tiers (rush is about 2–3 business days).</li>
</ul>
<h4>After closing</h4>
<p>Send the closing statement to the <b>water company</b> so the account moves into the buyer's name. If a client says they never got the recorded deed, check the <b>recording status</b> and reply.</p>`,
 keys:[["Policy switch","Update CD and ALTA"],["Reimbursements","Invoice required"],["Water escrow refund","About 1–2 weeks"],["Water account","Send closing statement to the water company"]],
 traps:["Paying a reimbursement with no invoice.","Forgetting to update the figures after a policy change."],
 qs:["KQ38","KQ39","KQ40"]},

{id:"K11",s:"CM",t:"Communication, email habits and file handoffs",m:6,
 body: SRC + `
<h4>Don't assume an email arrived</h4>
<p>Emails land in spam, get stuck in outboxes, and disappear during outages (like the November 12–13 email problems). For anything important (wire instructions, commitments, figures), <b>confirm it was received</b>. During an outage, use the <b>phone and Qualia messages</b>.</p>` + HOW([
"<b>Save key emails into the file</b> and get changes confirmed <b>in writing</b>.",
"Ask callers to put requests in an <b>email</b> so there's a record.",
"Copy the agents when they ask to be on everything.",
"<b>Call before you send</b> to someone who doesn't know you yet, and follow texts with calls.",
"When a closing slips, update <b>everyone</b>, and call the buyer yourself rather than assuming the agent did.",
"If a client can't open Qualia (blocked site, phone issues), have a fallback, such as emailing the document securely."]) + `
<h4>Stay in our lane</h4>
<p>We don't handle keys. Title-fee and Closing Disclosure questions go to the <b>closer</b>. Legal questions go to an attorney.</p>
<h4>When you take over someone else's files</h4>
<p>Files sometimes move between processors. When you inherit files: review each one, <b>contact every party</b> to introduce yourself and confirm where things stand, and update your manager.</p>
<h4>Working two files at once</h4>
<p>Emailing about two files at the same time is how mix-ups happen. Double-check the file name and parties before you hit send.</p>`,
 keys:[["Important emails","Confirm receipt"],["Email outage","Phone and Qualia messages"],["Changes","Confirmed in writing, saved to the file"],["Inherited files","Contact every party right away"],["Keys","Not title's job"]],
 traps:["Assuming the buyer's agent told the buyer about a delay.","Sending the right email to the wrong file's parties."],
 qs:["KQ41","KQ42","KQ43","KQ44"]}
];

const Q = [
["KQ01","FW","How does CLA send wire instructions to a buyer?",["Only through Qualia (Qualia Connect)","By email from the processor on the file","Through the buyer's real estate agent","By text message on closing day"],0,"Wire instructions go out only through Qualia, never by plain email or through third parties."],
["KQ02","FW","A buyer calls to confirm our routing and account numbers before wiring. What do you do?",["Tell them it isn't necessary","Thank them and verify the numbers","Ask their agent to confirm instead","Refuse to discuss wires by phone"],1,"Buyers who call to verify are doing the right thing; verify with them."],
["KQ03","FW","A lender emails instructions for an outgoing payoff wire. What happens before we send it?",["Nothing, since it came from the lender","We call to verify the instructions","The buyer's agent reviews them","We mail a check instead"],1,"Every outgoing wire's instructions are verified by phone, whoever sent them."],
["KQ04","FW","You're calling a former owner about signing a corrective deed and they think it's a scam. What helps?",["Give them your personal cell phone number", "Back up the call with a Qualia message", "Tell them to call the county recorder", "Mail a letter and wait two weeks"],1,"A message through the official portal shows it's really CLA."],
["KQ05","FW","Cash to close is $61,820.75. The buyer wires $57,626.75 after subtracting their earnest money. What happened?",["The lender raised the loan amount that morning", "The deposit was already credited in cash to close", "CLA added a wire fee that wasn't disclosed", "Nothing; that's the correct way to figure it"],1,"The earnest money is already factored into cash to close."],
["KQ06","FW","On a Maryland, DC or Florida file, which closing funds must be wired?",["Anything over $50,000","Only the earnest money","Anything over $5,000","None; personal checks are fine"],2,"Amounts over $5,000 must be wired; smaller amounts may come by cashier's check."],
["KQ07","FW","What should a buyer put in the wire description?",["Leave it blank for security reasons", "The listing agent's license number", "The file number or buyer's name", "The word \"gift\" and nothing else"],2,"Funding uses the file number or name to match the wire."],
["KQ08","FW","When does CLA wire out the commission on a financed purchase?",["As soon as the earnest money check clears", "After the lender's loan funds have arrived", "Before the signing, so agents are paid on time", "Thirty days after the deed records"],1,"Commissions go out only after lender funds arrive."],
["KQ09","FW","A buyer's bank says the transfer may take up to 72 hours. What do you advise?",["Wait until the day before closing to start it", "Start it now and send us the receipt", "Bring the money in cash to closing", "Cancel it and send the funds by Zelle"],1,"Start slow transfers right away and send proof."],
["KQ10","BL","A lender's CD shows a $12,000 \"selling agent admin fee\" that's really the commission. What's the fix?",["Leave it, since the amount is right", "Split it into two admin fees", "Relabel the line as commission", "Move it to the buyer's side"],2,"Commissions must be labeled as commission on the CD."],
["KQ11","BL","The CD shows one month of HOA dues ($85), but the association collects two months up front. What should it show?",["$85","$255","$170","$0"],2,"Two months × $85 = $170."],
["KQ12","BL","Someone changes an ALTA after it was stamped approved. What has to happen?",["It goes back for re-approval","Nothing, if the bottom line didn't change","The closer initials it at the table","The lender issues a new Loan Estimate"],0,"Any change to an approved ALTA sends it back for approval."],
["KQ13","BL","A $10,000 addendum comes in. What's the first question to ask?",["Will the lender pay it straight to the seller?", "Is it a price change or a credit?", "Did the HOA board approve the change?", "Does the survey need to be redone now?"],1,"Price changes and credits flow through the numbers differently."],
["KQ14","BL","What is DC's real estate tax year?",["January 1 – December 31, like the calendar", "July 1 – June 30, like Maryland", "October 1 – September 30", "April 1 – March 31, like a fiscal year"],2,"DC's tax year runs October 1 through September 30."],
["KQ15","BL","On a Florida file where the seller already paid, through what date are non-ad valorem assessments prorated?",["October 1","December 31","The recording date","June 30"],0,"County ad valorem taxes go to Dec 31; non-ad valorem assessments go to Oct 1."],
["KQ16","BL","A Maryland seller is a state resident. What should the Maryland withholding line show?",["The capital gains tax", "10% of the price", "Zero, since withholding is for non-residents", "Whatever the agent estimates"],2,"Withholding applies to non-resident sellers; residents show zero."],
["KQ17","BL","A closing slips into a new tax year. Why does that matter?",["It never affects anything at closing", "It can change the taxes due to record", "The seller gets back the prior year's taxes", "The lender waives the escrow account"],1,"A tax-year change can reclassify the property and change the taxes due."],
["KQ18","TC","One seller says he's the only one who needs to sign, but the deed shows a second owner. Who signs?",["Just him, with a notarized letter", "Both vested owners must sign", "Only whoever is on the contract", "Whoever the lender picks"],1,"Every vested owner must sign to convey title."],
["KQ19","TC","On a Florida homestead, the seller's wife isn't on title. Does she sign the deed?",["No, only titled owners sign","Yes, she signs the deed","Only if she's on the loan","Only if the buyer asks"],1,"Florida homestead rules require the spouse's signature even if not on title."],
["KQ20","TC","A buyer wants to sign by power of attorney on Thursday. What has to happen first?",["The realtor approves it in writing","The POA is recorded before the lender sees it","The lender approves the POA","Nothing else"],2,"The lender must approve the POA before the signing."],
["KQ21","TC","An LLC seller isn't in good standing and says he \"already filed.\" When can we settle?",["Now, and cure it after recording", "Once we have the certificate", "When the members sign personally", "When the buyer waives it in writing"],1,"No settlement until the certificate arrives; a filing claim isn't enough."],
["KQ22","TC","A trust has three trustees, but one has sole authority and is able to sign. Who signs?",["The trustee with sole authority", "All three trustees together", "The beneficiaries of the trust", "The named successor trustee"],0,"Read the trust: if one trustee has sole authority and can act, only that trustee signs."],
["KQ23","TC","An open judgment shows on the commitment. What should happen before the payoff request goes out?",["Nothing; just request it","Tell the affected party first","Ask the buyer to pay it","Remove it from the commitment"],1,"Give the party notice and word the request carefully."],
["KQ24","TC","A ground-rent owner sends an informal note saying the rent is redeemed. Is that enough?",["Yes, if the lender doesn't object","No; we need a formal signed document","Ground rents never matter on purchases","Only if the buyer agrees"],1,"Lenders need a formal signed redemption so title shows fee simple."],
["KQ25","TC","A recorded deed is missing the unit number and needs a corrective deed. Who signs it?",["Only the person who owns it now", "Everyone who signed the original", "Only the title company, as preparer", "The buyer's lender, as beneficiary"],1,"Everyone who signed the original deed signs the correction."],
["KQ26","TC","An abstract's deeds only go back to 1985. What's wrong?",["Nothing; 1985 is far enough back", "It isn't a full 60-year search", "The deeds in it are unsigned", "The plat comes from another county"],1,"The standard is a 60-year search; send it back."],
["KQ27","OP","A servicer's phone system says payoffs can only be requested online. What do you do?",["Keep calling until a person answers", "Use the servicer's portal or email", "Have the borrower get it themselves", "Estimate it from the last statement"],1,"Many servicers only take payoff requests through a portal or email."],
["KQ28","OP","The loan transferred to a new servicer on November 1. Where do you order the payoff?",["The original servicer","The current servicer","The county recorder","The borrower"],1,"Always order from whoever services the loan now."],
["KQ29","OP","What do many servicers require before they'll release a payoff?",["A copy of the recorded vesting deed", "A borrower authorization form", "The buyer's loan pre-approval letter", "The HOA's resale disclosure package"],1,"Get the borrower's signed authorization early."],
["KQ30","OP","A seller asks about a $189.95 fee on a condo file. What is it?",["CLA's own fee for ordering the payoff", "A county recording fee for the release", "The management company's statement fee", "A prepayment penalty from the lender"],2,"Management companies charge to produce payoff statements."],
["KQ31","OP","A lender says the borrower can sign \"anytime before 5.\" What does title need?",["Nothing more","An exact signing time","The lender's approval of the notary","A morning slot"],1,"Notaries and closers need an exact time."],
["KQ32","OP","On a split signing, why set a firm \"sign before 4\" deadline?",["The county closes at 4","To make the FedEx cutoff","The notary charges more after 4","The lender's office closes"],1,"Missing FedEx can push back the whole closing."],
["KQ33","OP","A party e-signs a document that has to be wet-signed. What do you need?",["A screenshot of the e-signature","A verbal confirmation","The signed original","Nothing more"],2,"Wet-ink documents require the signed original."],
["KQ34","OP","After setting a signing time with all parties, what's the next step?",["Wait for the agents to confirm with everyone", "Update the notes and send calendar invites", "Mail each party a confirmation letter", "Nothing else is needed"],1,"Confirm with everyone, note the file, and send invites."],
["KQ35","OP","An assignor cancels with the first buyer and brings a new one. What must you do?",["Close using the original buyer's documents", "Re-audit the CDs for the new buyer", "Have the first buyer sign the new documents", "Nothing; the figures carry over"],1,"Buyer changes on assignments require re-auditing the figures."],
["KQ36","OP","On a divorce sale, net proceeds can't cover the MSA payouts. What do you need?",["A new MSA approved by the court", "Written direction from the parties", "Nothing; pay whoever asks first", "A new appraisal of the property"],1,"Written direction from the parties is enough; no new MSA is required."],
["KQ37","OP","An agent wants a repair escrow at closing. What two things are needed?",["The buyer's credit score and move-in date", "The HOA's written consent", "A permit from the county", "Lender approval and an invoice"],3,"Repair escrows need the lender's approval and an invoice."],
["KQ38","CM","A $250 reimbursement request for condo documents comes in with no invoice. What do you do?",["Pay it, since it's small","Ask for an invoice","Ask for a W-9 only","Get the HOA president to sign"],1,"Reimbursements need invoices; accounting reviews them."],
["KQ39","CM","A buyer switches from the enhanced to the basic owner's policy. What must follow?",["Nothing; both policies cost the same", "A new survey of the property", "Update the figures on the CD and the ALTA", "The lender must re-approve the loan"],2,"The premium changes, so the figures must be updated."],
["KQ40","CM","After closing, how does the water account move into the buyer's name?",["We send the water company the closing statement", "The seller cancels and the buyer reapplies", "The lender sets up the new account", "The buyer sends in a copy of the survey"],0,"CLA sends the closing statement to the water company."],
["KQ41","CM","During an email outage, how should you reach a client?",["Wait for email to come back","Phone and Qualia messages","Fax only","Overnight letter"],1,"When email fails, use the phone and the Qualia portal."],
["KQ42","CM","A closing won't happen tomorrow. You've told the agents. What else?",["Wait for the lender to tell the buyer","Call the buyer yourself","Ask the seller to tell the buyer","Nothing else"],1,"Don't assume the agent passed it on."],
["KQ43","CM","An agent asks title to handle getting the keys to the buyer. What do you say?",["We'll hold them until funding", "The notary will bring them", "Explain that title doesn't handle keys", "The lender will handle them"],2,"Keys aren't part of title's role."],
["KQ44","CM","You inherit a group of files from another processor. What's the first step?",["Wait for the parties to call you", "Contact every party on each file", "Close out the files that look done", "Ask to reassign them again"],1,"Introduce yourself to every party and confirm status right away."]
];
const QUESTIONS = Q.map(([id,s,q,o,a,e]) => ({id,s,q,o,a,e}));

window.COURSES = window.COURSES || [];
window.COURSES.push({
  id: "playbook",
  draft: true,
  title: "CLA Processor Playbook",
  subtitle: "CLA procedures · From 558 recorded processor calls",
  description: "How CLA processors actually handle wires and funds, balancing, tax prorations, who signs, curative work, payoffs, scheduling, special files, refunds and communication.",
  source: "CLA processor calls, Sep–Nov 2026",
  exam: { counts: {FW:6, BL:5, TC:6, OP:6, CM:3}, minutes: 35, pass: 80 },
  rateCharts: false,
  sections: SECTIONS,
  lessons: LESSONS,
  questions: QUESTIONS
});
})();
