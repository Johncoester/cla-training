import json, os
from datetime import date

def m(x): return f"${x:,.2f}"
def co(n): return f'<span class="co">{n}</span>'
def row(cells, cls=""):
    return "<tr" + (f' class="{cls}"' if cls else "") + ">" + "".join(f"<td>{c}</td>" for c in cells) + "</tr>"
def callouts(items): return '<ol class="callouts">' + "".join(f'<li><b>{t}</b> {e}</li>' for t, e in items) + "</ol>"
def split(form, expl): return f'<div class="split"><div class="form">{form}</div><div class="expl">{expl}</div></div>'
SAMPLE = '<p class="note">All names, numbers and properties in this course are made up for training.</p>'

# ---------- proration examples (computed so the math is right) ----------
d1 = (date(2027,6,30) - date(2027,3,10)).days + 1           # buyer days Mar 10 – Jun 30
tax1 = round(4800/365*d1, 2)
d2 = (date(2027,3,31) - date(2027,2,20)).days + 1           # Feb 20 – Mar 31
hoa2 = round(450*d2/90, 2)
d3 = (date(2027,4,14) - date(2027,1,1)).days + 1            # Jan 1 – Apr 14 (seller's days)
gr3 = round(120/365*d3, 2)

# ---------- commitment mock ----------
commit = f'''<div class="fhead"><b>Commitment for Title Insurance</b><span>File CLA-27-0412</span></div>
<h5>{co(1)} Schedule A</h5>
<table class="ft">{row(["Effective Date","February 3, 2027 at 8:00 a.m."])}{row(["Policies to be issued","ALTA Owner's Policy — $385,000.00 — Proposed insured: Aisha N. Grant<br>ALTA Loan Policy — $365,750.00 — Proposed insured: Example Mortgage Co., its successors and/or assigns"])}{row(["Estate or interest","Fee simple"])}{row(["Title vested in","Thomas R. Baker and Linda M. Baker, as tenants by the entirety, by deed recorded in Liber 12045, folio 330"])}{row(["Land","Lot 14, Block C, \"Maple Ridge, Section 2,\" Plat Book 88, page 17, Sample County, Maryland"])}</table>
<h5>{co(2)} Schedule B, Part I — Requirements</h5>
<table class="ft">{row(["1.","Pay the premiums and charges for the policies."])}{row(["2.",co(3)+" Deed from Thomas R. Baker and Linda M. Baker to Aisha N. Grant, to be recorded."])}{row(["3.","Deed of Trust from Aisha N. Grant to secure $365,750.00, to be recorded."])}{row(["4.",co(4)+" Payoff and release of Deed of Trust to Old Bank, N.A., recorded in Liber 12045, folio 341, securing $280,000.00."])}{row(["5.","Payoff and release of Home Equity Line of Credit Deed of Trust to Community FCU, recorded in Liber 13377, folio 102. Borrower to sign close-out letter."])}{row(["6.",co(5)+" Satisfy or show not to be the same party: Judgment, Capital Card Services v. Thomas Baker, Case No. C-02-CV-21-000881, entered 06/14/2021, $6,412.17."])}{row(["7.","Owner's affidavit, judgment affidavit and residency certification from the sellers."])}{row(["8.","Real estate taxes for fiscal year 2026–2027 to be paid. Water and sewer charges to be paid through settlement."])}{row(["9.","Statutory notice of availability of owner's title insurance and reissue-rate notice."])}</table>
<h5>{co(6)} Schedule B, Part II — Exceptions</h5>
<table class="ft">{row(["1.","Rights or claims of parties in possession not shown by the public records."])}{row(["2.","Encroachments, overlaps or other matters an accurate survey would disclose."])}{row(["3.","Taxes and assessments not yet due and payable."])}{row(["4.",co(7)+" Declaration of Covenants for Maple Ridge, Liber 9001, folio 1, and Homeowners Association assessments."])}{row(["5.","10-foot public utility easement along the rear lot line, as shown on Plat Book 88, page 17."])}{row(["6.","Building restriction line of 30 feet from Ridge Road, as shown on the plat."])}</table>'''
commitx = callouts([
 ("Schedule A.", "The deal in one box. The <b>effective date</b> is the date the search runs through, not the day the commitment was typed. Check: proposed insureds spelled exactly as on the contract and loan, amounts equal the price and loan amount, the vesting matches the sellers on the contract, and the legal description matches the deed."),
 ("Schedule B-I: requirements.", "Everything that must happen before we can issue the policies. Each item becomes a task on your checklist. Nothing closes until every line is done or the underwriter waives it in writing."),
 ("The new deed.", "Grantors must match the vesting exactly. Here both Thomas <i>and</i> Linda must sign, even if only one of them is \"the seller\" on the listing."),
 ("Payoffs.", "Each recorded mortgage needs a written payoff now and a recorded release later. Note the second line: a HELOC also needs a close-out letter, or it can be drawn on again."),
 ("Judgments.", "A judgment against a name that matches the seller. Either it's paid (and satisfied in the court file), or the seller signs an affidavit that he isn't that person, backed by details like a different address or middle name. Because the sellers hold as tenants by the entirety, a judgment against only one of them may not attach, but follow the underwriter's guidance."),
 ("Schedule B-II: exceptions.", "Items the policy won't cover. The first three are standard exceptions that often come out of the loan policy with an owner's affidavit and survey. The rest are specific matters found in the search."),
 ("Specific exceptions.", "Covenants, easements and building lines from the plat. These normally stay in the policy. Compare them with the survey: a shed in the 10-foot utility easement or a porch past the 30-foot building line is a problem to raise before closing."),
])

# ---------- payoff mock ----------
payoff = f'''<div class="fhead"><b>Payoff Statement</b><span>Old Bank, N.A. · Loan Servicing</span></div>
<table class="ft">{row([co(1)+" Borrower(s)","Thomas R. Baker, Linda M. Baker"])}{row(["Property","412 Maple Ridge Ct, Sampletown, MD 21000"])}{row(["Loan number","…7731"])}{row(["Statement date","02/20/2027"])}{row([co(2)+" Good through","03/12/2027"])}</table>
<h5>{co(3)} Amount to pay in full</h5>
<table class="ft cc">{row(["Unpaid principal balance","$231,406.18"])}{row(["Interest from 02/01/2027 to 03/12/2027","$1,032.66"])}{row(["Recording / release fee","$60.00"])}{row(["Payoff statement fee","$30.00"])}{row(["Late charges","$0.00"])}<tr class="tot"><td>Total amount to pay in full by 03/12/2027</td><td>$232,528.84</td></tr></table>
<table class="ft">{row([co(4)+" Per diem after 03/12/2027","$25.82 per day"])}{row([co(5)+" Escrow balance","$2,184.50 — refunded to borrower separately after payoff"])}</table>
<h5>{co(6)} Remittance</h5>
<table class="ft">{row(["Wire to","Old Bank, N.A. · ABA ****1102 · Acct ****9035 · Ref: Loan …7731"])}{row(["Important","Old Bank will never change wiring instructions by email. Verify by calling the number on our website before sending funds."])}</table>
<p class="fsmall">{co(7)} Funds received after 2:00 p.m. ET are credited the next business day. This statement is subject to final verification upon receipt of funds.</p>'''
payoffx = callouts([
 ("Who and what.", "Borrower names, property address and loan number must match our file and the mortgage listed in the commitment. A payoff for the wrong loan is surprisingly common when the seller has more than one property."),
 ("Good-through date.", "The payoff is only valid through this date. It must be <b>on or after your disbursement date</b>. Closing slipped? Order an updated payoff or add per diem."),
 ("The total.", "Principal plus interest to the good-through date plus fees. This is the number that goes on the settlement statement as the seller's payoff."),
 ("Per diem.", "Daily interest after the good-through date. If the money arrives two days late, add 2 × $25.82, or the payoff will be short and the loan won't be released."),
 ("Escrow balance.", "The servicer refunds the seller's escrow balance <b>after</b> payoff. Don't subtract it from the payoff or credit it on the statement."),
 ("Wire instructions.", "Payoff fraud is real: criminals send fake payoff letters with their own bank account. <b>Call the lender at a phone number you find independently</b> (their website, or a prior verified file) to confirm the instructions before wiring. Never use the number on the letter alone."),
 ("Cut-off time.", "Wires after the cut-off post the next business day, which adds a day of interest. Send payoffs early on disbursement day."),
])

LESSONS = [
{"id":"D01","s":"TW","t":"Opening a file the right way","m":8,"body": SAMPLE + '''
<p>Most problems at the closing table were visible on day one. A careful file opening catches them while there's still time to fix them.</p>
<h4>Read the whole contract first</h4>
<ul>
<li><b>Parties:</b> every buyer and seller, spelled exactly. Compare the sellers with the current vesting deed as soon as you have it.</li>
<li><b>Property:</b> address, county, and whether it's a condo, HOA, ground rent (leasehold) or new construction.</li>
<li><b>Price, deposit and who holds it</b> (us or the broker).</li>
<li><b>Financing:</b> loan type, amount, lender and loan officer, or all cash.</li>
<li><b>Dates:</b> settlement date and any deadlines (financing, inspections).</li>
<li><b>Costs:</b> who pays transfer and recordation taxes, seller credits, and whether the buyer is a first-time Maryland homebuyer.</li>
<li><b>Addenda:</b> they often change the price, credits or the closing date. Use the latest version.</li>
</ul>
<h4>Order everything early</h4>
<ol>
<li>Title search (full search on a purchase, or as the underwriter allows on a refinance).</li>
<li>Payoffs for every mortgage and lien you know about, with the seller's signed authorization.</li>
<li>HOA / condo resale documents and dues statement.</li>
<li>Survey or location drawing, if the buyer or lender wants one.</li>
<li>Municipal items the jurisdiction requires, such as a lien certificate or water/sewer final reading where applicable.</li>
<li>Prior owner's policy, if the seller has one, for the reissue discount.</li>
</ol>
<h4>Send the welcome emails</h4>
<p>Introduce yourself to the agents, lender and parties; list what you need from each; and <b>warn the buyer in writing that we will never email or change wiring instructions</b>.</p>
<h4>Red flags to raise now, not later</h4>
<p>Seller name doesn't match the deed; seller is deceased, divorcing, in bankruptcy, or signing by power of attorney; a company or trust is the seller; vacant land or a paid-off house with a remote seller; a closing date that's too soon for the work involved.</p>''',
 "keys":[["First thing to check","Sellers on the contract vs. the vesting deed"],["Order on day one","Search, payoffs, HOA docs, survey, municipal items"],["Wire warning","In writing, at the start of every file"]],
 "traps":["The newest contract addendum controls. Don't build the file from the original contract alone.","Ask for the prior owner's policy up front so the reissue discount isn't missed."],
 "qs":["PQ01","PQ02","PQ03","PQ04"]},
{"id":"D02","s":"TW","t":"Reading a title search","m":10,"body": SAMPLE + '''
<p>The title search (abstract) is the raw research. The examiner turns it into the commitment, but processors who can read a search spot problems faster and ask better questions.</p>
<h4>What's in a search package</h4>
<ul>
<li><b>Chain of title:</b> the deeds showing ownership passing from owner to owner. The Maryland custom is to search back about <b>60 years</b>. Each deed should connect: the grantee on one deed is the grantor on the next.</li>
<li><b>Vesting deed:</b> the deed into the current owners. It tells you exactly who must sign and how they hold title (tenants by the entirety, joint tenants, tenants in common, a trust or company).</li>
<li><b>Open mortgages / deeds of trust:</b> anything recorded and not released.</li>
<li><b>Judgments and liens</b> against the owners, usually run for about the last <b>12 years</b>: court judgments, federal and state tax liens, mechanics' liens, HOA liens.</li>
<li><b>Easements, covenants and plats:</b> utility easements, HOA declarations, building restriction lines.</li>
<li><b>Taxes:</b> the tax account, amount, and whether it's paid; plus any special assessments or water/sewer charges.</li>
<li><b>Ground rent:</b> whether the property is leasehold, the annual rent and who owns the ground rent.</li>
</ul>
<h4>Common problems the search turns up</h4>
<table class="lt"><tr><th>Problem</th><th>What it usually means</th></tr>
<tr><td>Break in the chain (a name appears from nowhere)</td><td>Missing deed, estate never probated, or a name change. The examiner needs the missing link.</td></tr>
<tr><td>Old mortgage never released</td><td>Probably paid off years ago but never released. Needs a release from the lender (or its successor), or another release method.</td></tr>
<tr><td>Judgment against a similar name</td><td>May or may not be our seller. Compare middle names, addresses, case details; affidavit or payoff.</td></tr>
<tr><td>Deceased owner in the chain</td><td>Estate documents needed; check the register of wills.</td></tr>
<tr><td>Different name spelling between deeds</td><td>Name affidavit or corrective documents.</td></tr>
<tr><td>Owner is an LLC or trust</td><td>Entity documents showing who can sign.</td></tr></table>
<h4>Bring-down search</h4>
<p>The search is only current through its effective date. A <b>bring-down</b> (update) just before closing checks for anything recorded since, such as a new judgment or lien.</p>''',
 "keys":[["Maryland search custom","About 60 years"],["Judgment search","Owners in about the last 12 years"],["Vesting deed tells you","Who signs and how they hold title"],["Bring-down","Update right before closing"]],
 "traps":["A paid-off mortgage is still a problem if it was never released of record.","A name match isn't proof it's the same person. Check before you ask the seller to pay someone else's judgment."],
 "qs":["PQ05","PQ06","PQ07","PQ08"]},
{"id":"D03","s":"TW","t":"Reading the title commitment, line by line","m":11,"body": SAMPLE + split(commit, commitx),
 "keys":[["Schedule A","Who, how much, what estate, who owns it, the land"],["Schedule B-I","Requirements: must be done before closing"],["Schedule B-II","Exceptions: not covered by the policy"],["Effective date","Search through date"]],
 "traps":["If both spouses are on the vesting deed, both sign the new deed, whoever's name is on the listing.","Compare B-II easements and building lines with the survey before closing, not after."],
 "qs":["PQ09","PQ10","PQ11","PQ12","PQ13"]},
{"id":"D04","s":"TW","t":"Clearing common title requirements","m":11,"body": SAMPLE + '''
<p>Each Schedule B-I requirement has a usual cure. Know them so you can order the right document the day the commitment comes out.</p>
<table class="lt"><tr><th>Requirement</th><th>Usual way to clear it</th></tr>
<tr><td>Open mortgage / deed of trust</td><td>Written payoff, pay at closing, track and record the release.</td></tr>
<tr><td>Open HELOC</td><td>Payoff plus the borrower's signed close-out (freeze) letter, so it can't be drawn on again.</td></tr>
<tr><td>Old mortgage paid long ago, never released</td><td>Request a release from the lender or its successor. If that fails, Maryland allows other release methods (for example the canceled-check process). Ask the examiner.</td></tr>
<tr><td>Judgment against the seller</td><td>Payoff from the plaintiff's attorney and an order of satisfaction filed in the court case.</td></tr>
<tr><td>Judgment against a similar name</td><td>Seller signs a judgment affidavit that it isn't them, if the underwriter accepts it.</td></tr>
<tr><td>Federal or state tax lien</td><td>Payoff from the IRS or Comptroller; the government files the release. Allow extra time.</td></tr>
<tr><td>Deceased owner</td><td>Estate opened with the register of wills; letters of administration; the Personal Representative signs.</td></tr>
<tr><td>Seller is an LLC or corporation</td><td>Articles, operating agreement or bylaws, a resolution authorizing the sale and the signer, and good standing.</td></tr>
<tr><td>Seller is a trust</td><td>Copy of the trust agreement (or a trust certification) showing the trustee's power to sell.</td></tr>
<tr><td>Power of attorney</td><td>Underwriter and lender approval, the original POA recorded, and confirmation with the principal that it's still in effect.</td></tr>
<tr><td>Divorce</td><td>Both spouses sign, or a court order or recorded deed shows who now owns it.</td></tr>
<tr><td>Bankruptcy</td><td>Court order authorizing the sale or refinance.</td></tr>
<tr><td>Unpaid taxes or water charges</td><td>Collect and pay at closing; get the jurisdiction's certificate or final reading where required.</td></tr>
<tr><td>Ground rent</td><td>Collect rent through settlement, or redeem it if the buyer or lender requires it.</td></tr>
<tr><td>Name variations</td><td>Name affidavit ("one and the same person") or corrective document.</td></tr></table>
<h4>Habits that keep requirements moving</h4>
<ul>
<li>Turn every B-I line into a checklist task with an owner and a due date.</li>
<li>Order the slow items first: estates, entity documents, tax liens, missing releases.</li>
<li>When in doubt, ask the examiner or underwriter <b>in writing</b>, and keep their answer in the file.</li>
<li>Mark up the commitment as items clear, so anyone can see what's left.</li>
</ul>''',
 "keys":[["HELOC","Payoff + borrower's close-out letter"],["Judgment cure","Payoff + order of satisfaction in the court file"],["Entity seller","Formation docs, authorizing resolution, good standing"],["Slow items first","Estates, entities, tax liens, missing releases"]],
 "traps":["Paying a HELOC without a close-out letter can leave it open.","Underwriter approvals and waivers should be in writing and saved in the file."],
 "qs":["PQ14","PQ15","PQ16","PQ17","PQ18"]},
{"id":"D05","s":"PY","t":"Ordering and verifying payoffs","m":10,"body": SAMPLE + split(payoff, payoffx),
 "keys":[["Good-through date","On or after disbursement"],["Late funds","Add per diem × extra days"],["Escrow balance","Refunded by servicer later; don't net it"],["Wire instructions","Verify by phone at an independently found number"]],
 "traps":["A payoff that expires before disbursement leaves the loan short and unreleased.","Fake payoff letters with a criminal's wire instructions are a growing fraud."],
 "qs":["PQ19","PQ20","PQ21","PQ22","PQ23"]},
{"id":"D06","s":"PY","t":"Releases and post-closing lien tracking","m":7,"body": SAMPLE + '''
<p>Paying off a loan isn't the end. The job is finished when the <b>release is recorded</b> in the land records. An unreleased mortgage will show up on the next owner's title search, sometimes years later.</p>
<h4>The release workflow</h4>
<ol>
<li>Send the payoff (by wire, from the signed settlement statement) with the loan number as the reference.</li>
<li>Confirm the lender received it and the loan shows paid in full.</li>
<li>Log the payoff in your <b>release tracking</b> list: lender, loan number, amount, date sent, recording reference of the mortgage.</li>
<li>Follow up if the release hasn't recorded within your company's set time frame.</li>
<li>Once recorded, note the recording reference and close the item.</li>
</ol>
<h4>When the release doesn't come</h4>
<ul>
<li>Call or write the lender's release department, citing the payoff date and amount.</li>
<li>If the loan was sold or the lender merged, find the current servicer or successor.</li>
<li>Maryland law gives settlement agents ways to clear an unreleased lien when a lender won't respond (for example the canceled-check release process). Take it to your examiner or manager.</li>
</ul>
<h4>Other liens paid at closing</h4>
<p><b>Judgments:</b> the plaintiff or their attorney files an order or line of satisfaction in the court case. <b>Tax liens:</b> the IRS or Comptroller issues the release. <b>HOA liens:</b> the association records a release. Track each one the same way as a mortgage release.</p>''',
 "keys":[["Job is done when","The release is recorded"],["Track","Lender, loan #, amount, date sent, mortgage recording ref"],["Loan sold?","Find the current servicer or successor"]],
 "traps":["\"Paid in full\" is not the same as \"released of record.\"","Judgment and tax-lien releases need tracking too, not just mortgages."],
 "qs":["PQ24","PQ25","PQ26"]},
{"id":"D07","s":"PR","t":"Prorations and settlement math","m":12,"body": SAMPLE + f'''
<p>A <b>proration</b> splits an ongoing cost (property taxes, HOA dues, ground rent, sometimes water) between buyer and seller according to who owns the home for which days.</p>
<h4>The two rules that decide the direction</h4>
<table class="lt"><tr><th>Situation</th><th>Who credits whom</th></tr>
<tr><td>Seller <b>already paid</b> for time after closing (paid in advance)</td><td>Buyer reimburses seller: <b>credit seller, debit buyer</b>.</td></tr>
<tr><td>Seller <b>hasn't paid</b> for time before closing (paid in arrears or unpaid)</td><td>Seller pays buyer for their share: <b>credit buyer, debit seller</b>.</td></tr></table>
<h4>The formula</h4>
<p><b>Daily rate × number of days.</b> Daily rate = annual amount ÷ 365 (or period amount ÷ days in the period). The contract controls who owns the closing day; usually the buyer is charged starting on the settlement date.</p>
<div class="ex"><b>Example 1: taxes paid in advance (Maryland).</b> Maryland county taxes run July 1 – June 30. The seller paid the full year, $4,800. Settlement is March 10, 2027. The buyer owns March 10 through June 30 = {d1} days.<br>$4,800 ÷ 365 × {d1} = <b>{m(tax1)}</b>: credit seller, debit buyer.</div>
<div class="ex"><b>Example 2: quarterly HOA dues paid in advance.</b> Dues are $450 for January–March (90 days), paid by the seller. Settlement is February 20, 2027. The buyer owns February 20 through March 31 = {d2} days.<br>$450 × {d2} ÷ 90 = <b>{m(hoa2)}</b>: credit seller, debit buyer.</div>
<div class="ex"><b>Example 3: ground rent paid in arrears.</b> Annual ground rent is $120, paid after each half-year. The seller has paid through December 31. Settlement is April 15, 2027, so the seller owned January 1 through April 14 = {d3} days but hasn't paid for them.<br>$120 ÷ 365 × {d3} = <b>{m(gr3)}</b>: credit buyer, debit seller (the buyer will pay the full half-year when it comes due).</div>
<h4>Jurisdictions differ</h4>
<p>Maryland counties generally bill a July–June tax year in advance, and owner-occupants may be able to pay in two installments. <b>DC and Virginia localities use different tax years and due dates</b>, some paid in arrears. Always check the actual tax bill: the tax year, what's been paid, and what's due before or after settlement.</p>
<h4>Other settlement math to double-check</h4>
<ul>
<li><b>Transfer and recordation taxes</b>: right rates, right split per the contract, first-time-buyer rules.</li>
<li><b>Prepaid interest</b>: per diem × days from settlement to the end of the month.</li>
<li><b>Seller credits</b>: within the lender's limits and shown on both the CD and our statement.</li>
<li><b>Commissions</b>: match the brokers' commission instructions.</li>
</ul>''',
 "keys":[["Paid in advance","Credit seller, debit buyer"],["Paid in arrears / unpaid","Credit buyer, debit seller"],["Formula","Daily rate × days"],["MD tax year","July 1 – June 30, generally paid in advance"]],
 "traps":["Getting the direction backward doubles the error. Ask \"who already paid?\" first.","Don't assume DC or Virginia work like Maryland. Check the bill."],
 "qs":["PQ27","PQ28","PQ29","PQ30","PQ31"]},
{"id":"D08","s":"DO","t":"HOA and condo files","m":8,"body": SAMPLE + '''
<p>If the property is in a homeowners association or condominium, there's extra paperwork, extra money, and extra deadlines.</p>
<h4>What to order</h4>
<ul>
<li><b>Resale disclosure package:</b> the governing documents, budget, rules, fees and any pending special assessments. Maryland law requires sellers to provide it, and buyers generally get a short window (7 days under the Maryland condo and HOA laws) to cancel after receiving it, so get it moving early.</li>
<li><b>Dues statement / payoff letter:</b> current dues, the paid-through date, any balance owed, late fees, transfer or move-in fees, and any capital contribution the buyer pays.</li>
<li><b>Condo questionnaire</b> for the lender (on condos), plus the association's <b>master insurance</b> certificate. The buyer usually needs their own HO-6 (walls-in) policy.</li>
</ul>
<h4>On the settlement statement</h4>
<ul>
<li>Pay any past-due balance from the seller's proceeds.</li>
<li>Prorate current dues (see the prorations lesson).</li>
<li>Charge the buyer any transfer fee or capital contribution the documents require.</li>
<li>Special assessments: check the contract for who pays installments due after closing.</li>
</ul>
<h4>Why lenders care</h4>
<p>Unpaid association dues can become a lien, and in a foreclosure a recorded association lien can get limited priority over the mortgage (up to 4 months of regular assessments, capped at $1,200). That's why lenders want dues paid at closing and why they ask for the ALTA 4 (condo) or ALTA 5 (planned unit development) endorsement.</p>''',
 "keys":[["Order early","Resale package, dues statement, condo questionnaire"],["Buyer cancellation window","7 days after receiving the package (MD condo/HOA laws)"],["Condo insurance","Master policy + buyer's own HO-6"],["Lender endorsements","ALTA 4 (condo), ALTA 5 (PUD)"]],
 "traps":["Late resale documents can push back closing because of the buyer's cancellation window.","Past-due dues come out of the seller's proceeds, not the buyer's."],
 "qs":["PQ32","PQ33","PQ34","PQ35"]},
{"id":"D09","s":"DO","t":"Surveys and location drawings","m":7,"body": SAMPLE + '''
<p>A survey shows where the property lines are and where the improvements (house, deck, fence, driveway, shed) sit. It's the only way to spot problems that don't appear in the land records.</p>
<h4>Two kinds</h4>
<table class="lt"><tr><th></th><th>Location drawing</th><th>Boundary survey</th></tr>
<tr><td>What it does</td><td>Shows improvements in relation to the lines</td><td>Locates and marks the actual property lines</td></tr>
<tr><td>Accuracy</td><td>About 1 foot</td><td>Precise</td></tr>
<tr><td>Typical use</td><td>Most residential purchases</td><td>Commercial, fence disputes, new building, when the buyer wants survey coverage</td></tr>
<tr><td>Owner's policy survey exception</td><td>Usually stays</td><td>Can be removed</td></tr></table>
<h4>What to look for</h4>
<ul>
<li><b>Encroachments:</b> the neighbor's fence, driveway or shed over the line, or ours over theirs.</li>
<li><b>Easements:</b> anything built inside a utility or drainage easement.</li>
<li><b>Building restriction lines (setbacks):</b> the house or an addition past the line on the plat.</li>
<li><b>Flood zone</b> designation, which may require flood insurance.</li>
<li>Does the drawing match the <b>legal description and plat</b> in the commitment?</li>
</ul>
<h4>When you see a problem</h4>
<p>Don't decide it yourself. Send it to the examiner or underwriter. They may accept it, take a specific exception, ask for an affidavit, or offer affirmative coverage. Tell the agents early so the buyer can decide what to do.</p>''',
 "keys":[["Location drawing","About 1-foot accuracy; survey exception usually stays"],["Boundary survey","Locates lines; can remove survey exception"],["Look for","Encroachments, easements, setbacks, flood zone"]],
 "traps":["A shed in the utility easement can mean the utility has the right to remove it.","Underwriting decides how to handle a survey problem. Your job is to catch it and send it up."],
 "qs":["PQ36","PQ37","PQ38"]}
]

Q = [
("PQ01","TW","What should you compare first when a new purchase contract comes in?",["Sellers on the contract vs. the vesting deed", "The listing photos vs. the appraisal report", "The buyer's credit score vs. the loan amount", "The commission amount vs. the sale price"],0,"Name and ownership mismatches are the most common cause of delays; catch them on day one."),
("PQ02","TW","A contract has two addenda changing the price and the closing date. Which document controls?",["The original contract, since it was signed first", "The most recent signed addendum", "Whichever version the lender prefers to use", "The listing agreement between seller and broker"],1,"Later signed addenda modify the contract; build the file from the latest terms."),
("PQ03","TW","Why ask the seller for their prior owner's title policy at file opening?",["It replaces the need for a new title search", "It may qualify for a reissue discount", "The lender requires it on every purchase loan", "It shows the seller's current mortgage payoff"],1,"A prior owner's policy can qualify for the reissue rate, which we must offer."),
("PQ04","TW","Which of these should be flagged at file opening as a potential red flag?",["The buyer already has a pre-approval letter", "A remote, email-only seller of vacant land", "The property is located in a subdivision", "The deposit is held by the listing broker"],1,"Remote, email-only sellers of vacant or paid-off property fit a common impersonation fraud pattern."),
("PQ05","TW","About how far back does a customary Maryland title search go?",["10 years","30 years","60 years","Back to the first land grant every time"],2,"Maryland custom is about 60 years, longer when needed."),
("PQ06","TW","The search shows a 2004 deed of trust that the seller says was paid off years ago. What's the issue?",["None, since the seller says it was paid", "It was never released, so it must be cleared", "It expires on its own after 10 years", "It only matters to the buyer's new lender"],1,"A paid loan still clouds title until a release is recorded."),
("PQ07","TW","The vesting deed tells you two key things. What are they?",["The sale price and the new loan amount", "Who must sign and how they hold title", "The annual tax amount and HOA dues", "The current lender and the loan number"],1,"The vesting deed shows the current owners and their form of ownership."),
("PQ08","TW","Why run a bring-down search right before closing?",["To confirm the sale price hasn't changed", "To catch anything recorded since the search", "Because commitments expire after three days", "To get a copy of the latest survey"],1,"The search is only current through its effective date."),
("PQ09","TW","On a commitment, what is the effective date?",["The date the commitment was typed","The date the search runs through","The settlement date","The date the policy is issued"],1,"Schedule A's effective date is the search through date."),
("PQ10","TW","Where do you find the list of things that must be done before the policy can be issued?",["Schedule A, with the proposed insureds", "Schedule B-I (requirements)", "Schedule B-II, with the exceptions", "The cover page of the policy jacket"],1,"B-I lists requirements; B-II lists exceptions the policy won't cover."),
("PQ11","TW","The listing says the seller is Thomas Baker, but the vesting deed shows Thomas and Linda Baker as tenants by the entirety. Who signs the deed?",["Thomas only","Thomas and Linda","Linda only","Whoever attends closing"],1,"Everyone on the vesting deed must sign to convey full title."),
("PQ12","TW","A survey shows the shed sits inside the 10-foot utility easement listed in Schedule B-II. What should you do?",["Nothing, because easements are always excepted", "Raise it with underwriting and the agents early", "Have the buyer sign a waiver at closing", "Remove the easement from the commitment"],1,"Survey conflicts with recorded easements are underwriting issues to raise early."),
("PQ13","TW","Which Schedule B-II items most often come out of the final loan policy?",["Specific easements shown on the recorded plat", "Standard ones like parties in possession", "The HOA declaration of covenants", "Building restriction lines from the plat"],1,"Standard exceptions are usually removed from the loan policy with an owner's affidavit and survey."),
("PQ14","TW","A seller has an open HELOC being paid off at closing. Besides the payoff, what else do you need?",["Nothing beyond the payoff itself", "The borrower's signed close-out letter", "A new appraisal of the property", "The HOA resale disclosure package"],1,"Without a close-out letter the line can be drawn on again and stay a lien."),
("PQ15","TW","A $6,400 judgment against \"Thomas Baker\" appears, but the seller is Thomas R. Baker of a different address. What's a common cure?",["Pay it from the seller's proceeds regardless", "A judgment affidavit, if underwriting accepts it", "Ignore it, since the address is different", "Have the buyer pay it at closing"],1,"Similar-name judgments are often cleared by affidavit with supporting details."),
("PQ16","TW","The seller is an LLC. Which documents will the underwriter typically want?",["Each member's personal tax returns", "Formation docs, a resolution and good standing", "Only the signer's driver's license", "The company's last three bank statements"],1,"We need proof the company exists and that the signer has authority."),
("PQ17","TW","Which requirements should you order first because they take the longest?",["The welcome emails to agents and parties", "Estates, entity docs, tax liens, missing releases", "The final settlement statement", "Scheduling the closing room"],1,"Slow items should start on day one."),
("PQ18","TW","The underwriter tells you by phone it will waive a requirement. What should you do?",["Rely on the call, since underwriting decided", "Get the waiver in writing and save it", "Have the buyer sign off on it instead", "Delete the requirement from the commitment"],1,"Underwriter decisions belong in writing in the file."),
("PQ19","PY","A payoff is good through March 12, but disbursement moves to March 15. What do you do?",["Use the same payoff total as before", "Update the payoff or add 3 days of per diem", "Subtract the escrow balance to cover it", "Ask the buyer to cover the difference later"],1,"Interest accrues daily; a stale payoff leaves the loan short."),
("PQ20","PY","The payoff shows a $2,184 escrow balance. How should it appear on the settlement statement?",["Subtract it from the payoff amount", "Show it as a credit to the seller", "Leave it off; the servicer refunds it later", "Show it as a credit to the buyer"],2,"Servicers refund escrow balances after payoff; don't net them."),
("PQ21","PY","A payoff letter arrives by email with wiring instructions. What's the safest way to verify it?",["Call the phone number printed on the letter", "Reply to the email asking for confirmation", "Call a number you found independently", "Trust it if it has the lender's logo"],2,"Fake payoff letters carry the criminal's contact info; verify independently."),
("PQ22","PY","The per diem is $25.82 and the wire arrives 2 days after the good-through date. How much is the payoff short?",["$25.82","$51.64","$0","$12.91"],1,"2 × $25.82 = $51.64."),
("PQ23","PY","Why send payoffs early on disbursement day?",["Lenders charge lower fees in the morning", "Late wires post the next day, adding interest", "RESPA requires morning payoffs", "So the HOA is paid before the lender"],1,"Missing the cut-off adds a day of interest and can leave the loan short."),
("PQ24","PY","When is a payoff truly finished?",["When our wire to the lender is sent", "When the lender confirms it received the funds", "When the release is recorded", "When the buyer moves into the home"],2,"Only a recorded release clears the lien from title."),
("PQ25","PY","The seller's loan was sold twice since it was made, and the release hasn't arrived. Who do you contact?",["The original lender only", "The current servicer or successor", "The county land records office", "The buyer's new lender"],1,"Releases come from the current holder or its successor."),
("PQ26","PY","A judgment against the seller was paid at closing. How is it released?",["The buyer records a release in the land records", "An order of satisfaction in the court case", "It's released automatically after 30 days", "The title company files its own affidavit"],1,"Judgments are satisfied in the court file, usually by the plaintiff or its attorney."),
("PQ27","PR","The seller prepaid property taxes for the full year. At settlement, what happens?",["The seller credits the buyer", "The buyer reimburses the seller", "No proration is needed", "The lender reimburses the seller"],1,"Paid in advance means the buyer reimburses the seller for the days after closing."),
("PQ28","PR","Ground rent is paid in arrears, and the seller hasn't paid for January 1 through settlement on April 15. Which is right?",["The buyer reimburses the seller", "The seller credits the buyer", "No proration is needed", "They split the half-year 50/50"],1,"Unpaid time belongs to the seller, so the seller credits the buyer."),
("PQ29","PR","Annual taxes are $4,800 (July–June), prepaid by the seller. Settlement is March 10, giving the buyer 113 days. What's the proration?",["$1,486.03 credit to seller","$1,486.03 credit to buyer","$3,313.97 credit to seller","$400.00 credit to seller"],0,"$4,800 ÷ 365 × 113 = $1,486.03, credited to the seller."),
("PQ30","PR","Quarterly HOA dues of $450 for Jan–Mar (90 days) were paid by the seller. Settlement is Feb 20; the buyer owns 40 days. What's the proration?",["$200.00 credit to seller","$200.00 credit to buyer","$250.00 credit to seller","$150.00 credit to seller"],0,"$450 × 40 ÷ 90 = $200.00, credited to the seller."),
("PQ31","PR","A DC property is settling, and you usually work Maryland files. What should you do about tax prorations?",["Use the Maryland July–June tax year", "Work from the actual DC tax bill", "Skip the proration on DC files", "Use a January–December year"],1,"Tax years and due dates differ by jurisdiction; always work from the bill."),
("PQ32","DO","Why order the HOA or condo resale package as early as possible?",["It's optional and rarely needed", "Buyers get a cancellation window after receiving it", "Lenders never ask for it", "It replaces the title search on condos"],1,"Maryland gives buyers a 7-day window after receiving the package."),
("PQ33","DO","The dues statement shows the seller is $600 behind. Who pays it at closing?",["The buyer, as a closing cost", "The seller, from their proceeds", "The lender, from escrow", "Nobody; the association waives it"],1,"Past-due balances are the seller's obligation."),
("PQ34","DO","On a condo purchase, which insurance does the buyer usually need in addition to the association's master policy?",["Flood insurance only","An HO-6 (walls-in) policy","Title insurance for the building","None"],1,"The master policy covers the building; the owner's HO-6 covers the unit interior and personal property."),
("PQ35","DO","Which endorsement does a lender typically request on a condominium loan?",["ALTA 4","ALTA 6","ALTA 8.1","ALTA 9"],0,"ALTA 4 is the condominium endorsement; ALTA 5 is for planned unit developments."),
("PQ36","DO","Which statement about a location drawing is correct?",["It precisely marks the property lines", "It's accurate to about a foot; exception stays", "It removes the owner's survey exception", "It's only used on commercial deals"],1,"A boundary survey is needed to locate lines and remove the owner's survey exception."),
("PQ37","DO","A location drawing shows the neighbor's fence 2 feet onto our seller's lot. What's your job?",["Tell the buyer it's nothing to worry about", "Send it to underwriting and tell the agents", "Order the neighbor to remove the fence", "Remove the survey exception from the policy"],1,"Underwriting decides how to handle encroachments; processors catch and escalate."),
("PQ38","DO","Which item on a survey might trigger a lender's insurance requirement?",["The color of the house", "The flood zone designation", "The driveway material", "The lot and block number"],1,"Properties in certain flood zones need flood insurance."),
]
QUESTIONS = [{"id":i,"s":s,"q":q,"o":o,"a":a,"e":e} for i,s,q,o,a,e in Q]
SECTIONS = {"TW":"Title Work","PY":"Payoffs & Releases","PR":"Prorations & Math","DO":"HOA, Condos & Surveys"}
out = """// Course: Day-to-Day Processing (draft). Generated by tools/gen_processing.py.
(function(){
const SECTIONS = %s;
const LESSONS = %s;
const QUESTIONS = %s;
window.COURSES = window.COURSES || [];
window.COURSES.push({
  id: "processing",
  draft: true,
  title: "Day-to-Day Processing",
  subtitle: "Processing · For processors and closers",
  description: "Opening a file, reading title searches and commitments, clearing requirements, payoffs and releases, prorations, HOA and condo files, and surveys.",
  source: "",
  exam: { counts: {TW:9, PY:5, PR:4, DO:4}, minutes: 30, pass: 80 },
  rateCharts: false,
  sections: SECTIONS,
  lessons: LESSONS,
  questions: QUESTIONS
});
})();
""" % (json.dumps(SECTIONS), json.dumps(LESSONS, ensure_ascii=False, indent=0), json.dumps(QUESTIONS, ensure_ascii=False, indent=0))
os.makedirs('courses/processing', exist_ok=True)
open('courses/processing/course.js','w').write(out)
print("ok", len(LESSONS), len(QUESTIONS), d1, tax1, d2, hoa2, d3, gr3)
