// Course: Payoffs, Lien Certificates & Florida Estoppels (draft).
// General language. Florida estoppel rules follow Florida statutes (Chapters 718 and 720); confirm current fee caps with the association's certificate.
(function(){
const SECTIONS = { PO: "Mortgage Payoffs", HR: "HELOCs, Releases & Other Payoffs", LC: "Lien Certificates, Taxes & Utilities", ES: "Florida Estoppels & HOA Statements" };
const NOTE = '<p class="note">General rules. Lender, county and association requirements change; read every statement you receive.</p>';
const DO = items => '<div class="ex"><b>How to do it</b><ul style="margin:6px 0 0">' + items.map(i => '<li>' + i + '</li>').join('') + '</ul></div>';

const LESSONS = [
{id:"P01",s:"PO",t:"What a payoff statement is",m:6,
 body: NOTE + `
<p>A <b>payoff statement</b> is the lender's written figure for paying the loan off completely on a given date. We pay it from the closing funds so the lender releases its deed of trust or mortgage.</p>
<h4>What's on it</h4>
<ul>
<li><b>Principal balance</b>, plus <b>interest</b> to the good-through date.</li>
<li><b>Per diem</b>: the daily interest if funds arrive later than that date.</li>
<li><b>Fees</b>: recording or release fees, late charges, sometimes a prepayment penalty.</li>
<li><b>Good-through date</b>: the last day the figure is valid.</li>
<li><b>Wire or mailing instructions</b> and the loan number.</li>
</ul>
<h4>What isn't on it</h4>
<p>The borrower's <b>escrow balance</b> is usually <b>not deducted</b>. The servicer refunds it to the borrower after payoff, typically within a few weeks. Tell sellers this so they don't expect it on the settlement statement.</p>`,
 keys:[["Payoff statement","Written figure to pay the loan in full by a date"],["Per diem","Daily interest after the good-through date"],["Escrow balance","Refunded later by the servicer, not deducted"]],
 traps:["Telling a seller their escrow balance will come off the payoff.","Using a verbal payoff figure from a phone call."],
 qs:["PQ01","PQ02","PQ03"]},

{id:"P02",s:"PO",t:"Ordering and reviewing a payoff",m:8,
 body: NOTE + DO([
"Get the borrower's signed <b>authorization</b> first; many servicers won't release a payoff without it.",
"Order from the <b>current servicer</b>. Check for loan transfers.",
"Use the servicer's <b>portal, email or fax</b>. Many won't give payoffs by phone.",
"Request a good-through date <b>past the expected funding date</b> to leave room for delays.",
"Order payoffs for <b>every open loan and lien</b> on the search, not just the first mortgage."]) + `
<h4>Review it against the search</h4>
<ul>
<li>Does the <b>loan</b> match the deed of trust on title (lender, original amount, recording reference)?</li>
<li>Is it the <b>full</b> payoff, not a reinstatement or a "monthly payment" figure?</li>
<li>Is it still <b>current</b>? Payoffs older than about 30 days, or past their good-through date, need updating.</li>
<li>Any surprises: a <b>prepayment penalty</b>, unusually large fees, or a borrower name you didn't expect?</li>
</ul>
<h4>Per diem math</h4>
<div class="ex"><b>Example:</b> The payoff is $245,312.40 good through December 1, with a per diem of $38.17. Funds will reach the lender December 4. That's 3 extra days: 3 × $38.17 = $114.51. Send <b>$245,426.91</b>.</div>
<h4>Verify the wire instructions</h4>
<p>Call the lender at a number you found <b>independently</b> (their website or a past statement), never the number on an emailed payoff, to confirm the wire instructions before sending.</p>`,
 keys:[["Before ordering","Borrower authorization"],["Good-through date","Past the expected funding date"],["Stale payoff","Older than ~30 days or past its date: update"],["Wire instructions","Verify by phone using an independent number"]],
 traps:["Paying a reinstatement figure instead of a payoff.","Calling the phone number printed on an emailed payoff to verify it."],
 qs:["PQ04","PQ05","PQ06","PQ07","PQ08"]},

{id:"P03",s:"HR",t:"HELOCs and credit lines",m:6,
 body: NOTE + `
<p>A home equity line of credit (HELOC) can be drawn on again until it's <b>closed</b>. Paying the balance to zero doesn't close it. If the borrower writes a check or uses the card after we pay, the lien comes back.</p>` + DO([
"Get a <b>fresh</b> payoff, ideally no more than a couple of days old.",
"Have the borrower sign the <b>freeze / close-out letter</b> (authorization to close the account and release the lien). Send it with the payoff.",
"Tell the borrower to <b>stop using</b> the line, checks and any card right away.",
"Check other open loans on title for <b>future-advance</b> language that works like a credit line.",
"Follow up until the <b>release</b> is recorded."]),
 keys:[["HELOC paid to zero","Not closed until the lender closes it"],["Freeze/close letter","Signed by the borrower, sent with payoff"],["Payoff age","Very fresh, about 2 days"]],
 traps:["Paying a HELOC to zero without a signed close-out letter.","Not warning the borrower to stop drawing on the line."],
 qs:["PQ09","PQ10","PQ11"]},

{id:"P04",s:"HR",t:"Releases after payoff",m:6,
 body: NOTE + `
<p>Paying a loan isn't the end of the job. The lender must sign and record a <b>release</b> (also called a certificate of satisfaction). Until it's recorded, the old loan still shows on title.</p>
<ul>
<li>State law gives lenders a deadline to release after payoff. If they miss it, state law usually provides a way for the settlement agent or title insurer to record a release affidavit after giving notice.</li>
<li>Keep the payoff letter, the wire confirmation, and the lender's acknowledgment. They're the proof if the release never comes.</li>
<li>Track open releases. A missing release turns up on the buyer's next sale or refinance.</li>
</ul>`+DO(["Note the payoff date and the release deadline in the file.","Check the land records after the deadline; if there's no release, escalate."]),
 keys:[["After payoff","Track the recorded release"],["Lender misses deadline","State law allows a release affidavit after notice"],["Proof of payment","Payoff letter + wire confirmation"]],
 traps:["Closing the file without tracking the release."],
 qs:["PQ12","PQ13","PQ14"]},

{id:"P05",s:"HR",t:"Judgment, tax lien and short-sale payoffs",m:6,
 body: NOTE + `
<table class="lt"><tr><th>Payoff</th><th>What to get</th></tr>
<tr><td><b>Judgments</b></td><td>A written payoff from the creditor or its attorney, with interest and court costs. Then a recorded satisfaction. Tell the seller before you request it.</td></tr>
<tr><td><b>IRS liens</b></td><td>A payoff or a certificate of discharge for the property, then a recorded release or discharge. Allow time; the IRS is slow.</td></tr>
<tr><td><b>State tax liens</b></td><td>A payoff from the state agency and a recorded release.</td></tr>
<tr><td><b>Short sales</b></td><td>The lender's written approval letter. Read every condition: closing deadline, net to lender, who pays what. An approval the lender can <b>revoke after payment</b> is not acceptable. Don't close until that's fixed (underwriter).</td></tr></table>`,
 keys:[["Judgment payoff","Written figure + recorded satisfaction"],["IRS lien","Payoff or discharge, then recorded release"],["Short sale approval","No right to revoke after payment"]],
 traps:["Closing a short sale whose approval the lender can revoke after payoff."],
 qs:["PQ15","PQ16","PQ17"]},

{id:"P06",s:"LC",t:"Lien certificates, taxes and utilities",m:7,
 body: NOTE + `
<p>Besides loans and judgments, a property can owe the <b>county, city or utility</b>. These often aren't in the land records. They're found by ordering the right certificate.</p>
<table class="lt"><tr><th>Where</th><th>What to order</th></tr>
<tr><td><b>Maryland</b></td><td>A <b>municipal lien certificate</b> (or tax and utility certification) from the county or Baltimore City. It shows real estate taxes and other charges such as water and sewer, which can be liens.</td></tr>
<tr><td><b>DC</b></td><td>A real property <b>tax certification</b> from the Office of Tax and Revenue and a <b>DC Water</b> final bill. Some DC charges are collected like taxes.</td></tr>
<tr><td><b>Virginia</b></td><td>Tax and utility figures from the locality's treasurer and the water or sewer authority.</td></tr>
<tr><td><b>Florida</b></td><td>A <b>municipal lien search</b>: open or expired permits, code violations, utility balances and special assessments. Also check for <b>tax certificates</b>.</td></tr></table>
<h4>Prorating taxes</h4>
<p>Paid taxes are credited back to the seller; unpaid ones are charged. Each place uses its own tax year (DC Oct–Sep, MD Jul–Jun, FL calendar year paid in arrears). Delinquent taxes are paid by the seller.</p>
<h4>Florida timing</h4>
<p>Florida taxes are billed in November for the current year and are discounted for early payment (4% in November). After March 31 they're delinquent, and a tax certificate can be sold.</p>`,
 keys:[["Maryland","Municipal lien certificate"],["DC","OTR tax certification + DC Water"],["Florida","Municipal lien search + tax certificates"],["Florida taxes","Billed in November, delinquent after March 31"]],
 traps:["Assuming no utility or code liens because the land records are clean.","Missing an open permit on a Florida file."],
 qs:["PQ18","PQ19","PQ20","PQ21"]},

{id:"P07",s:"ES",t:"Florida estoppel certificates",m:8,
 body: NOTE + `
<p>In Florida, an <b>estoppel certificate</b> is the condo or homeowners association's official statement of what the unit owes. It's governed by Florida statute (Chapter 718 for condos, 720 for HOAs). The name comes from the legal idea of estoppel: the association is held to what it says.</p>
<h4>The rules that matter</h4>
<ul>
<li>The association must deliver it within <b>10 business days</b> of the request.</li>
<li>It's good for <b>30 days</b> if delivered electronically, or <b>35 days</b> if mailed.</li>
<li>The buyer and lender can <b>rely on it</b>. If the association leaves an amount off, it generally can't collect that amount from a buyer who relied on the certificate.</li>
<li>The association's fees are <b>capped by statute</b>, with extra for rush service or a delinquent account. If it misses the 10-business-day deadline, it can't charge the fee.</li>
</ul>
<h4>What's on it</h4>
<p>Regular dues and when they're paid through, special assessments (current and approved), late fees, any open violations, capital contribution or transfer fees the buyer pays, and whether there's a <b>master association</b> too.</p>`+DO([
"Order estoppels for <b>every</b> association (condo, HOA and any master association) as soon as the file opens.",
"Note the <b>expiration date</b>. If closing moves past it, order an update.",
"Put each amount on the settlement statement on the correct side: past-due and current dues to the seller, the capital contribution to the buyer if the documents say so.",
"Read the special assessments section. A new assessment can change who pays what."]),
 keys:[["Estoppel delivery","Within 10 business days"],["Valid","30 days electronic / 35 days mailed"],["Missing an amount","Generally can't collect it from a relying buyer"],["Fees","Capped by statute; no fee if late"]],
 traps:["Closing on an expired estoppel.","Missing the master association."],
 qs:["PQ22","PQ23","PQ24","PQ25","PQ26"]},

{id:"P08",s:"ES",t:"HOA and condo statements in MD, DC and VA",m:5,
 body: NOTE + `
<p>Outside Florida, the association's statement goes by different names (paid assessment letter, resale certificate, payoff statement), but the job is the same: find out what's owed and pay it at closing.</p>
<ul>
<li>Order <b>early</b> and follow up. Management companies are often slow and charge for statements.</li>
<li>Check for a <b>second association</b> (a condo inside a larger community) and any <b>capital contribution</b> or initiation fee the buyer pays.</li>
<li>Some associations collect <b>two months</b> of dues up front; make sure the lender's CD matches.</li>
<li>Unpaid assessments can become a <b>recorded lien</b>; any recorded lien must be paid and released.</li>
<li>Virginia resale disclosure packages are separate from the payoff figure. Don't confuse the two.</li>
</ul>`,
 keys:[["Order","Early, with follow-up"],["Second association","Check every file"],["Up-front dues","Match the lender's CD"],["Recorded HOA lien","Paid and released"]],
 traps:["Using a resale disclosure package as the payoff figure.","Missing a second association's dues."],
 qs:["PQ27","PQ28","PQ29","PQ30"]}
];

const Q = [
["PQ01","PO","What does a payoff statement give you?",["The written amount to pay the loan in full by a date", "The borrower's credit score and payment history", "The lender's appraisal of the house", "The monthly payment that's due on the loan next month"],0,"A payoff is the full amount to retire the loan, valid through a date."],
["PQ02","PO","A seller expects their $3,100 escrow balance to reduce the payoff. What do you tell them?",["It's kept by the title company", "It will come off the payoff figure at closing", "It goes to the buyer as a credit at closing", "The servicer usually refunds it after payoff"],3,"Escrow balances are generally refunded by the servicer after payoff."],
["PQ03","PO","What is the per diem on a payoff?",["The total late fees owed on the loan so far", "The lender's fee for sending the payoff by wire", "The daily interest after the good-through date", "The release recording fee"],2,"Per diem is the daily interest past the good-through date."],
["PQ04","PO","What do many servicers require before they'll give a payoff?",["The buyer's final loan approval from their lender", "A copy of the survey", "The HOA estoppel certificate for the property", "The borrower's signed authorization"],3,"Get the borrower's authorization early."],
["PQ05","PO","The payoff is $245,312.40 good through December 1, with a $38.17 per diem. Funds arrive December 4. What do you send?",["$245,465.08", "$245,312.40", "$245,350.57", "$245,426.91"],3,"Three extra days × $38.17 = $114.51, added to the payoff."],
["PQ06","PO","The figure the servicer sent is labeled \"reinstatement amount.\" Can you pay the loan off with it?",["Only for HELOCs", "Yes, as long as you add the per diem to the figure", "No; that only brings the loan current", "Yes, a reinstatement and a payoff are the same thing"],2,"A reinstatement brings a loan current; it doesn't pay it off."],
["PQ07","PO","How do you verify payoff wire instructions?",["Call the number printed on the payoff", "Reply to the email they came in", "Call a number you found independently", "Ask the borrower to confirm"],2,"Use an independent number, never one from the emailed instructions."],
["PQ08","PO","The search shows a first mortgage and an open second deed of trust. Which payoffs do you order?",["Neither until closing day", "Only the first mortgage, since it's the largest loan", "Both, for every open loan and lien", "Only the second, since it was recorded more recently"],2,"Every open lien needs a payoff or other resolution."],
["PQ09","HR","A HELOC is paid down to zero. Is the lien gone?",["Only if the bank mails a card back", "No; it stays until the lender closes and releases it", "Yes, a zero balance ends the lien automatically", "Yes, thirty days after the balance reaches zero"],1,"A credit line stays open until it's closed and released."],
["PQ10","HR","What must the borrower sign on a HELOC payoff?",["A deed transferring the house back to the lender", "A survey affidavit", "A freeze / close-out letter", "A new loan application with the same lender"],2,"The close-out authorization goes with the payoff."],
["PQ11","HR","How fresh should a HELOC payoff be?",["As old as the last statement", "Up to 90 days old", "About a couple of days old", "Any age, if it has a per diem"],2,"HELOC balances can change quickly; use a very fresh payoff."],
["PQ12","HR","The loan is paid. What's still needed for clear title?",["The buyer's signature", "A recorded release", "Nothing more", "A new deed from the lender"],1,"The lender must record a release (certificate of satisfaction)."],
["PQ13","HR","The lender misses the release deadline. What does state law usually allow?",["The county removes old loans automatically after a year", "The buyer signs a quitclaim", "Nothing; we have to wait for the lender, however long it takes", "A release affidavit by the settlement agent or insurer after notice"],3,"State law typically provides a release affidavit procedure."],
["PQ14","HR","What proves the loan was paid if the release never comes?",["The settlement agent's memory of the closing day", "The buyer's new homeowner's insurance policy", "The payoff letter and the wire confirmation", "The appraisal"],2,"Keep the payoff letter and wire confirmation in the file."],
["PQ15","HR","What do you need to clear a judgment at closing?",["A verbal OK from the creditor's office on the phone", "A written payoff and a recorded satisfaction", "Only the seller's own receipt showing they paid it", "A new title search"],1,"Pay from a written payoff and record the satisfaction."],
["PQ16","HR","A short-sale approval says the lender can revoke it even after payment. What do you do?",["Pay the lender extra to be safe", "Close; it's standard language", "Don't close until it's removed", "Have the buyer sign a waiver"],2,"A revocable approval is not acceptable; involve the underwriter."],
["PQ17","HR","What clears an IRS lien on the property being sold?",["Nothing; IRS liens don't attach to houses", "A signed note from the seller's accountant saying it's paid", "A payoff or discharge, then a recorded release or discharge", "A copy of the seller's most recent federal tax return"],2,"The IRS release or discharge must be recorded."],
["PQ18","LC","On a Maryland file, what shows taxes and water and sewer charges?",["A municipal lien certificate", "The HOA estoppel", "The title commitment's Schedule B-II exceptions", "The deed of trust and its riders"],0,"Maryland counties and Baltimore City issue lien certificates."],
["PQ19","LC","On a Florida file, what does a municipal lien search look for?",["Only HOA dues", "Only federal tax liens filed against the seller", "The buyer's credit history and outstanding debts", "Open permits, code violations and utility balances"],3,"Florida municipal searches catch permits, code violations and utilities."],
["PQ20","LC","When do unpaid Florida real estate taxes become delinquent?",["After November 30", "On January 1", "Never; they're paid in advance", "After March 31"],3,"Florida taxes are delinquent after March 31."],
["PQ21","LC","The land records are clean. Can you skip the lien certificate?",["No; many municipal and utility charges aren't in the land records", "Yes, as long as the seller signs an affidavit about it", "Yes, clean land records mean there can't be any liens", "Only on a refinance"],0,"Utility and municipal charges often appear only on the certificate."],
["PQ22","ES","How long does a Florida association have to deliver an estoppel?",["10 business days", "30 calendar days", "48 hours", "Until closing day"],0,"Florida statute requires delivery within 10 business days."],
["PQ23","ES","An estoppel was emailed on May 1. Closing moved to June 10. What do you do?",["Use it; it's good for 90 days", "Have the seller sign an affidavit instead", "Nothing; the buyer's lender handles it", "Order an updated estoppel before closing"],3,"Electronic estoppels are good for 30 days; this one has expired."],
["PQ24","ES","How long is a mailed Florida estoppel good for?",["10 days", "60 days", "35 days", "30 days"],2,"Mailed certificates are valid for 35 days."],
["PQ25","ES","The association missed the 10-business-day deadline. What about its fee?",["The buyer pays it", "The seller pays a late fee", "It doubles", "It can't charge the fee"],3,"A late association can't charge for the estoppel."],
["PQ26","ES","An estoppel leaves off a $600 special assessment. Can the association collect it from the buyer who relied on it?",["Generally no; the buyer can rely on the certificate", "Yes, but the buyer only owes half of the assessment", "Yes, the association can collect it from the buyer at any time", "Only from the buyer's lender"],0,"The association is generally held to what the certificate says."],
["PQ27","ES","A condo sits inside a larger community. What should you check?",["Only the condo association, since it's the closest one", "The seller's homeowner's insurance", "The county's zoning map and the subdivision plat", "Whether there's a second (master) association"],3,"Order statements for every association."],
["PQ28","ES","The association collects two months of dues up front, but the CD shows one. What do you do?",["Have the CD corrected to two months", "Charge the second month to the seller instead", "Remove dues from the CD", "Leave it, since the difference is only one month"],0,"The lender's CD must match what the association collects."],
["PQ29","ES","A Virginia resale disclosure package arrives. Is it the payoff figure?",["Only for condos, never for homeowners associations", "Yes, the resale package and the payoff are the same document", "No; it's separate from the payoff figure", "Only if signed by the board"],2,"Don't confuse the resale package with the payoff figure."],
["PQ30","ES","Unpaid assessments were recorded as a lien. What's needed at closing?",["Nothing; HOA liens expire at sale", "A new survey", "Payment and a recorded release", "The buyer assumes it"],2,"Recorded association liens must be paid and released."]
];
const QUESTIONS = Q.map(([id,s,q,o,a,e]) => ({id,s,q,o,a,e}));

window.COURSES = window.COURSES || [];
window.COURSES.push({
  id: "payoffs",
  draft: true,
  title: "Payoffs, Lien Certificates & Florida Estoppels",
  subtitle: "Payoffs · HELOCs · Releases · Municipal liens · Estoppels",
  description: "What a payoff is and how to order and review one, per diem math, HELOC close-outs, releases, judgment and short-sale payoffs, lien certificates and municipal searches, and Florida estoppel certificates.",
  source: "CLA Title training; general rules and Florida statutes",
  exam: { counts: {PO:7, HR:7, LC:4, ES:7}, minutes: 30, pass: 80 },
  rateCharts: false,
  sections: SECTIONS,
  lessons: LESSONS,
  questions: QUESTIONS
});
})();
