// Course: Reading the Closing Disclosure & ALTA Settlement Statement (draft).
// Generated from /home/claude/gen_cd.py: sample forms are recreated in HTML with a made-up loan.
(function(){
const SECTIONS = {"CD": "Closing Disclosure", "AL": "ALTA Settlement Statement", "RV": "Reviewing & Reconciling"};
const LESSONS = [
{
"id": "C01",
"s": "CD",
"t": "What the Closing Disclosure is and when it's used",
"m": 7,
"body": "<p class=\"note\">Sample loan for training only. All names, numbers and the property are made up. Title premiums use the \"Acme\" practice rates from the pre-licensing course.</p>\n<p>The <b>Closing Disclosure (CD)</b> is a 5-page federal form the <b>lender</b> gives the borrower before closing. It shows the final loan terms and every closing cost. It came from the federal \"Know Before You Owe\" rules (often called <b>TRID</b>), which replaced the old HUD-1 and Good Faith Estimate in October 2015.</p>\n<h4>What it's for</h4>\n<ul>\n<li>Gives the borrower the <b>final numbers</b> in a standard format so there are no surprises at the table.</li>\n<li>Lets the borrower <b>compare</b> against the <b>Loan Estimate</b> they received when they applied.</li>\n<li>Enforces <b>tolerances</b>: limits on how much certain costs can rise from the Loan Estimate.</li>\n</ul>\n<h4>Timing rules everyone must know</h4>\n<ul>\n<li>The borrower must <b>receive</b> the CD at least <b>3 business days before closing</b>.</li>\n<li>A <b>new</b> 3-day wait is required only if: the APR rises beyond tolerance (more than 1/8% on most fixed loans), the loan product changes (say, fixed to adjustable), or a prepayment penalty is added.</li>\n<li>Other changes (a fee, a credit, a proration) just need a corrected CD at or before closing, with no new wait.</li>\n<li>After closing, a corrected CD goes out within <b>30 days</b> if amounts changed, and refunds for tolerance violations within <b>60 days</b>.</li>\n</ul>\n<h4>Who does what</h4>\n<p>The <b>lender</b> owns the CD. Many lenders prepare it themselves; some ask the settlement agent to fill in the settlement side. As the title company, we send the lender our fees, taxes, prorations and payoffs, then <b>check the CD against our numbers</b>. We also prepare a separate <b>seller CD</b> showing only the seller's side.</p>\n<h4>Tolerances: how much costs can change</h4>\n<table class=\"lt\"><tr><th>Tolerance</th><th>Which costs</th></tr>\n<tr><td><b>Zero</b>: can't go up</td><td>The lender's own charges, services from a provider the lender required, transfer taxes</td></tr>\n<tr><td><b>10% total</b></td><td>Recording fees, and third-party services the borrower picked from the lender's list (often title and settlement)</td></tr>\n<tr><td><b>No limit</b></td><td>Prepaids, initial escrow, services the borrower shopped for on their own, the optional owner's title policy</td></tr></table>\n<h4>When there's NO Closing Disclosure</h4>\n<p><b>Cash deals</b> (no loan), <b>commercial or business-purpose loans</b>, <b>HELOCs</b> and <b>reverse mortgages</b> (which still use the HUD-1) don't get a CD. In those cases the <b>ALTA settlement statement</b> (or HUD-1) is the main closing statement.</p>",
"keys": [
[
"Who issues the CD",
"The lender"
],
[
"Must be received",
"3 business days before closing"
],
[
"New 3-day wait",
"APR up beyond tolerance, product change, prepayment penalty added"
],
[
"Replaced",
"HUD-1 and GFE (Oct. 2015, TRID)"
],
[
"No CD for",
"Cash, commercial, HELOC, reverse mortgage"
]
],
"traps": [
"A fee change alone does NOT restart the 3-day clock.",
"The title company doesn't own the CD, but we're responsible for checking our numbers on it."
],
"qs": [
"CQ01",
"CQ02",
"CQ03",
"CQ04",
"CQ05"
]
},
{
"id": "C02",
"s": "CD",
"t": "Page 1: loan terms, payments and the two big totals",
"m": 8,
"body": "<p class=\"note\">Sample loan for training only. All names, numbers and the property are made up. Title premiums use the \"Acme\" practice rates from the pre-licensing course.</p><div class=\"split\"><div class=\"form\"><div class=\"fhead\"><b>Closing Disclosure</b><span>Page 1 of 5 · Loan ID # 2026-55120</span></div>\n<p class=\"fsmall\">This form is a statement of final loan terms and closing costs. Compare this document with your Loan Estimate.</p>\n<div class=\"fgrid3\">\n<div><span class=\"co\">1</span><h5>Closing Information</h5><table class=\"ft\"><tr><td>Date Issued</td><td>11/14/2026</td></tr><tr><td>Closing Date</td><td>11/20/2026</td></tr><tr><td>Disbursement Date</td><td>11/20/2026</td></tr><tr><td>Settlement Agent</td><td>Sample Title &amp; Escrow</td></tr><tr><td>File #</td><td>CLA-26-1188</td></tr><tr><td>Property</td><td>123 Sample Lane, Anytown, MD 21000</td></tr><tr><td>Sale Price</td><td>$400,000.00</td></tr></table></div>\n<div><span class=\"co\">2</span><h5>Transaction Information</h5><table class=\"ft\"><tr><td>Borrower</td><td>Maria &amp; James Carter</td></tr><tr><td>Seller</td><td>Robert Ellis</td></tr><tr><td>Lender</td><td>Example Mortgage Co.</td></tr></table></div>\n<div><span class=\"co\">3</span><h5>Loan Information</h5><table class=\"ft\"><tr><td>Loan Term</td><td>30 years</td></tr><tr><td>Purpose</td><td>Purchase</td></tr><tr><td>Product</td><td>Fixed Rate</td></tr><tr><td>Loan Type</td><td>☒ Conventional ☐ FHA ☐ VA</td></tr><tr><td>MIC #</td><td>88-104</td></tr></table></div>\n</div>\n<h5><span class=\"co\">4</span> Loan Terms <span class=\"fsmall\">— Can this amount increase after closing?</span></h5>\n<table class=\"ft wide\"><tr><td>Loan Amount</td><td>$360,000.00</td><td>NO</td></tr><tr><td>Interest Rate</td><td>6.25%</td><td>NO</td></tr><tr><td>Monthly Principal &amp; Interest</td><td>$2,216.58</td><td>NO</td></tr><tr><td>Prepayment Penalty</td><td>—</td><td>NO</td></tr><tr><td>Balloon Payment</td><td>—</td><td>NO</td></tr></table>\n<h5><span class=\"co\">5</span> Projected Payments</h5>\n<table class=\"ft wide\"><tr><th>Payment Calculation</th><th>Years 1–9</th><th>Years 10–30</th></tr>\n<tr><td>Principal &amp; Interest</td><td>$2,216.58</td><td>$2,216.58</td></tr><tr><td>Mortgage Insurance</td><td>+ $120.00</td><td>+ —</td></tr><tr><td>Estimated Escrow</td><td>+ $500.00</td><td>+ $500.00</td></tr>\n<tr><td><b>Estimated Total Monthly Payment</b></td><td><b>$2,836.58</b></td><td><b>$2,716.58</b></td></tr>\n<tr><td>Estimated Taxes, Insurance &amp; Assessments</td><td>$575.00 a month</td><td>In escrow: property taxes YES · homeowner's insurance YES · HOA dues NO</td></tr></table>\n<h5><span class=\"co\">6</span> Costs at Closing</h5>\n<table class=\"ft wide\"><tr><td>Closing Costs</td><td>$15,053.04</td><td>Includes $6,860.00 in Loan Costs + $8,193.04 in Other Costs – $0 in Lender Credits. See page 2.</td></tr>\n<tr><td>Cash to Close</td><td>$42,298.14</td><td>Includes Closing Costs. See Calculating Cash to Close on page 3.</td></tr></table></div><div class=\"expl\"><ol class=\"callouts\"><li><b>Closing Information.</b> The dates and the property. <b>Closing date</b> is the signing; <b>disbursement date</b> is when money is paid out. On a primary-residence refinance, the disbursement date must be after the 3-day right to cancel. Check that the sale price matches the contract and the settlement agent and file number are ours.</li><li><b>Transaction Information.</b> Borrower names must match the loan documents and the new deed exactly. Seller names must match the current vesting deed. A mismatch here is the most common thing that stops a closing.</li><li><b>Loan Information.</b> Term, purpose (purchase or refinance), product (fixed or adjustable) and loan type (conventional, FHA, VA). The <b>MIC #</b> appears when there's mortgage insurance.</li><li><b>Loan Terms.</b> The five big numbers, each with a yes/no for whether it can change after closing. Compare loan amount and rate to the lender's closing instructions and the note.</li><li><b>Projected Payments.</b> What the borrower will pay each month, broken into principal and interest, mortgage insurance and escrow. Here the mortgage insurance drops off after year 9, so the payment goes down. The bottom row shows which costs are escrowed and which the borrower pays on their own (HOA dues here).</li><li><b>Costs at Closing.</b> The two totals buyers care about most. <b>Closing Costs</b> is all closing costs (page 2, line J). <b>Cash to Close</b> is what the buyer must bring, after the down payment, deposit, credits and adjustments. It must match our settlement statement to the penny.</li></ol></div></div>",
"keys": [
[
"Closing vs. disbursement date",
"Signing vs. paying out"
],
[
"Names",
"Borrowers match loan docs; sellers match vesting deed"
],
[
"Cash to Close",
"Must match our settlement statement to the penny"
]
],
"traps": [
"A name spelled differently from the vesting deed must be fixed before closing.",
"On a primary-residence refi, the disbursement date can't fall inside the 3-day right to cancel."
],
"qs": [
"CQ06",
"CQ07",
"CQ08",
"CQ09"
]
},
{
"id": "C03",
"s": "CD",
"t": "Page 2: closing cost details (sections A–J)",
"m": 12,
"body": "<p class=\"note\">Sample loan for training only. All names, numbers and the property are made up. Title premiums use the \"Acme\" practice rates from the pre-licensing course.</p><div class=\"split\"><div class=\"form\"><div class=\"fhead\"><b>Closing Cost Details</b><span>Page 2 of 5</span></div>\n<table class=\"ft cc\"><tr><th></th><th>Borrower-Paid<br>At Closing</th><th>Borrower-Paid<br>Before Closing</th><th>Seller-Paid<br>At Closing</th><th>Paid by<br>Others</th></tr>\n<tr class=\"sec\"><td colspan=5><b>Loan Costs</b></td></tr>\n<tr class=\"sub\"><td colspan=5><span class=\"co\">1</span> A. Origination Charges — $2,795.00</td></tr><tr><td>01 Points (0.5% of loan amount)</td><td>$1,800.00</td><td></td><td></td><td></td></tr><tr><td>02 Application / underwriting fee</td><td>$995.00</td><td></td><td></td><td></td></tr>\n<tr class=\"sub\"><td colspan=5><span class=\"co\">2</span> B. Services Borrower Did Not Shop For — $810.00</td></tr><tr><td>01 Appraisal fee to Sample Appraisers</td><td></td><td>$650.00</td><td></td><td></td></tr><tr><td>02 Credit report fee</td><td></td><td>$65.00</td><td></td><td></td></tr><tr><td>03 Flood certification</td><td>$10.00</td><td></td><td></td><td></td></tr><tr><td>04 Tax service fee</td><td>$85.00</td><td></td><td></td><td></td></tr>\n<tr class=\"sub\"><td colspan=5><span class=\"co\">3</span> C. Services Borrower Did Shop For — $3,255.00</td></tr><tr><td>01 Survey (location drawing)</td><td>$350.00</td><td></td><td></td><td></td></tr><tr><td>02 Title – Abstract / search</td><td>$175.00</td><td></td><td></td><td></td></tr><tr><td>03 Title – Closing protection letter</td><td>$45.00</td><td></td><td></td><td></td></tr><tr><td>04 Title – Endorsements</td><td>$100.00</td><td></td><td></td><td></td></tr><tr><td>05 Title – Examination fee</td><td>$250.00</td><td></td><td></td><td></td></tr><tr><td>06 Title – Lender's title insurance</td><td>$1,740.00</td><td></td><td></td><td></td></tr><tr><td>07 Title – Settlement fee</td><td>$595.00</td><td></td><td></td><td></td></tr>\n<tr class=\"tot\"><td>D. TOTAL LOAN COSTS (Borrower-Paid) $6,860.00</td><td>$6,145.00</td><td>$715.00</td><td></td><td></td></tr>\n<tr class=\"sec\"><td colspan=5><b>Other Costs</b></td></tr>\n<tr class=\"sub\"><td colspan=5><span class=\"co\">4</span> E. Taxes and Other Government Fees</td></tr>\n<tr><td>01 Recording fees — Deed $60.00 · Mortgage $60.00</td><td>$120.00</td><td></td><td></td><td></td></tr><tr><td>02 State recordation tax</td><td>$1,400.00</td><td></td><td>$1,400.00</td><td></td></tr><tr><td>03 State transfer tax</td><td>$1,000.00</td><td></td><td>$1,000.00</td><td></td></tr><tr><td>04 County transfer tax</td><td>$2,000.00</td><td></td><td>$2,000.00</td><td></td></tr>\n<tr class=\"sub\"><td colspan=5><span class=\"co\">5</span> F. Prepaids</td></tr>\n<tr><td>01 Homeowner's insurance premium (12 mo.)</td><td>$1,200.00</td><td></td><td></td><td></td></tr><tr><td>02 Prepaid interest ($61.64 per day from 11/20/26 to 12/1/26)</td><td>$678.04</td><td></td><td></td><td></td></tr>\n<tr class=\"sub\"><td colspan=5><span class=\"co\">6</span> G. Initial Escrow Payment at Closing</td></tr>\n<tr><td>01 Homeowner's insurance $100.00 per month for 2 mo.</td><td>$200.00</td><td></td><td></td><td></td></tr><tr><td>02 Property taxes $400.00 per month for 3 mo.</td><td>$1,200.00</td><td></td><td></td><td></td></tr><tr><td>03 Aggregate adjustment</td><td>–$200.00</td><td></td><td></td><td></td></tr>\n<tr class=\"sub\"><td colspan=5><span class=\"co\">7</span> H. Other</td></tr>\n<tr><td>01 Title – Owner's title insurance (optional)</td><td>$595.00</td><td></td><td></td><td></td></tr><tr><td>02 Real estate commission – listing broker</td><td></td><td></td><td>$10,000.00</td><td></td></tr><tr><td>03 Real estate commission – buyer's broker</td><td></td><td></td><td>$10,000.00</td><td></td></tr><tr><td>04 Home warranty</td><td></td><td></td><td>$550.00</td><td></td></tr><tr><td>05 Title – Seller settlement fee</td><td></td><td></td><td>$295.00</td><td></td></tr><tr><td>06 Deed preparation (attorney)</td><td></td><td></td><td>$150.00</td><td></td></tr>\n<tr class=\"tot\"><td>I. TOTAL OTHER COSTS (Borrower-Paid) $8,193.04</td><td>$8,193.04</td><td></td><td></td><td></td></tr>\n<tr class=\"tot\"><td><span class=\"co\">8</span> J. TOTAL CLOSING COSTS (Borrower-Paid) $15,053.04</td><td>$14,338.04</td><td>$715.00</td><td>$25,395.00</td><td></td></tr>\n<tr><td>Lender Credits</td><td></td><td></td><td></td><td></td></tr>\n</table></div><div class=\"expl\"><ol class=\"callouts\"><li><b>A. Origination Charges.</b> The lender's own fees: points, application and underwriting. <b>Zero tolerance</b>: they can't go up from the Loan Estimate.</li><li><b>B. Services the borrower could not shop for.</b> Third-party services the lender picks (appraisal, credit report, flood certification). The appraisal and credit report were paid <b>before closing</b>, so they sit in that column and are subtracted on page 3. Zero tolerance when the lender chose the provider.</li><li><b>C. Services the borrower did shop for.</b> Usually our title charges and the survey. Every title fee starts with <b>\"Title –\"</b> and is listed alphabetically. Notice the lender's title insurance shows <b>$1,740.00</b>, the full lender's rate, not the $35 simultaneous-issue fee we actually charge. That's how the federal rules make lenders disclose it (see callout 7).</li><li><b>E. Taxes and Other Government Fees.</b> Recording fees and transfer and recordation taxes. Here buyer and seller split the taxes 50/50, as the contract says. On a first-time Maryland homebuyer deal, the seller pays the state transfer tax. Recording fees fall under the <b>10% tolerance</b>, transfer taxes under zero tolerance.</li><li><b>F. Prepaids.</b> Paid up front for the future: a year of homeowner's insurance and <b>prepaid interest</b> from closing to the end of the month. Prepaid interest = per diem × days. Closing later in the month means less prepaid interest.</li><li><b>G. Initial Escrow.</b> Money that starts the borrower's escrow account so the lender can pay taxes and insurance when due. The aggregate adjustment is a required true-up so the lender doesn't over-collect.</li><li><b>H. Other.</b> Everything else: commissions, home warranty, seller title fees, and the <b>owner's title policy, which must say \"(optional)\"</b>. It shows $595.00, not the $2,300.00 we charge, because the federal formula is <i>owner's premium + simultaneous fee − full lender's premium</i> = $2,300 + $35 − $1,740. The total title cost is the same either way: $3,500.00.</li><li><b>J. Total Closing Costs.</b> Borrower total (at closing plus before closing) and the seller's total. The borrower's J carries to page 1 and page 3.</li></ol></div></div>",
"keys": [
[
"A–D",
"Loan costs"
],
[
"E–I",
"Other costs"
],
[
"J",
"Total closing costs"
],
[
"Title fees",
"Start with \"Title –\" and are listed alphabetically"
],
[
"CD owner's premium",
"Owner's + simultaneous − full lender's"
]
],
"traps": [
"The CD's lender and owner's title amounts won't match our invoice. That's correct; check that the TOTAL matches.",
"The owner's policy must be labeled \"(optional)\"."
],
"qs": [
"CQ10",
"CQ11",
"CQ12",
"CQ13",
"CQ14",
"CQ15"
]
},
{
"id": "C04",
"s": "CD",
"t": "Page 3: cash to close and the summaries of transactions",
"m": 10,
"body": "<p class=\"note\">Sample loan for training only. All names, numbers and the property are made up. Title premiums use the \"Acme\" practice rates from the pre-licensing course.</p><div class=\"split\"><div class=\"form\"><div class=\"fhead\"><b>Calculating Cash to Close</b><span>Page 3 of 5</span></div>\n<p class=\"fsmall\"><span class=\"co\">1</span> Use this table to see what has changed from your Loan Estimate.</p>\n<table class=\"ft cc\"><tr><th></th><th>Loan Estimate</th><th>Final</th><th>Did this change?</th></tr>\n<tr><td>Total Closing Costs (J)</td><td>$14,700.00</td><td>$15,053.04</td><td>YES • See Total Loan Costs (D) and Total Other Costs (I)</td></tr>\n<tr><td>Closing Costs Paid Before Closing</td><td>$0</td><td>–$715.00</td><td>YES • You paid these Closing Costs before closing</td></tr>\n<tr><td>Closing Costs Financed (Paid from your Loan Amount)</td><td>$0</td><td>$0</td><td>NO</td></tr>\n<tr><td>Down Payment / Funds from Borrower</td><td>$40,000.00</td><td>$40,000.00</td><td>NO</td></tr>\n<tr><td>Deposit</td><td>–$10,000.00</td><td>–$10,000.00</td><td>NO</td></tr>\n<tr><td>Funds for Borrower</td><td>$0</td><td>$0</td><td>NO</td></tr>\n<tr><td>Seller Credits</td><td>–$5,000.00</td><td>–$5,000.00</td><td>NO</td></tr>\n<tr><td>Adjustments and Other Credits</td><td>$2,850.00</td><td>$2,960.10</td><td>YES • See details in Sections K and L</td></tr>\n<tr class=\"tot\"><td>Cash to Close</td><td>$42,550.00</td><td>$42,298.14</td><td></td></tr></table>\n<div class=\"fhead\" style=\"margin-top:12px\"><b>Summaries of Transactions</b></div>\n<div class=\"fgrid2\">\n<div><span class=\"co\">2</span><h5>Borrower's Transaction</h5><table class=\"ft\">\n<tr class=\"sub\"><td colspan=2>K. Due from Borrower at Closing — $417,298.14</td></tr>\n<tr><td>01 Sale Price of Property</td><td>$400,000.00</td></tr><tr><td>03 Closing Costs Paid at Closing (J)</td><td>$14,338.04</td></tr>\n<tr class=\"sub\"><td colspan=2><span class=\"co\">3</span> Adjustments for Items Paid by Seller in Advance</td></tr>\n<tr><td>County taxes 11/20/26 to 06/30/27</td><td>$2,932.60</td></tr><tr><td>HOA dues 11/20/26 to 11/30/26</td><td>$27.50</td></tr>\n<tr class=\"sub\"><td colspan=2>L. Paid Already by or on Behalf of Borrower — $375,000.00</td></tr>\n<tr><td>01 Deposit</td><td>$10,000.00</td></tr><tr><td>02 Loan Amount</td><td>$360,000.00</td></tr><tr><td>05 Seller Credit</td><td>$5,000.00</td></tr>\n<tr class=\"tot\"><td>Cash to Close ☒ From ☐ To Borrower</td><td>$42,298.14</td></tr></table></div>\n<div><span class=\"co\">4</span><h5>Seller's Transaction</h5><table class=\"ft\">\n<tr class=\"sub\"><td colspan=2>M. Due to Seller at Closing — $402,960.10</td></tr>\n<tr><td>01 Sale Price of Property</td><td>$400,000.00</td></tr><tr><td>County taxes 11/20/26 to 06/30/27</td><td>$2,932.60</td></tr><tr><td>HOA dues 11/20/26 to 11/30/26</td><td>$27.50</td></tr>\n<tr class=\"sub\"><td colspan=2>N. Due from Seller at Closing — $212,845.33</td></tr>\n<tr><td>02 Closing Costs Paid at Closing (J)</td><td>$25,395.00</td></tr><tr><td><span class=\"co\">5</span> Payoff of First Mortgage Loan</td><td>$182,450.33</td></tr><tr><td>07 Seller Credit</td><td>$5,000.00</td></tr>\n<tr class=\"tot\"><td>Cash ☐ From ☒ To Seller</td><td>$190,114.77</td></tr></table></div></div></div><div class=\"expl\"><ol class=\"callouts\"><li><b>Calculating Cash to Close.</b> Compares each piece of cash to close against the Loan Estimate and explains any change. The rows add up to cash to close: $15,053.04 − $715.00 + $40,000.00 − $10,000.00 − $5,000.00 + $2,960.10 = <b>$42,298.14</b>.</li><li><b>Borrower's Transaction.</b> <b>K</b> is everything the buyer owes (price, closing costs, adjustments). <b>L</b> is everything already paid or credited (deposit, loan, seller credit). <b>K − L = cash to close.</b></li><li><b>Prorations (adjustments).</b> Maryland property taxes run on a July 1–June 30 year and are usually paid in advance. The seller already paid the whole year, so the buyer reimburses the seller from the closing date through June 30: $4,800 ÷ 365 × 223 days = $2,932.60. The same idea applies to HOA dues and ground rent. Check the dates and the math on every file.</li><li><b>Seller's Transaction.</b> <b>M</b> is what the seller is owed; <b>N</b> is what comes out of their proceeds (their closing costs, payoffs, credits to the buyer). <b>M − N = seller's proceeds.</b> The seller usually gets their own seller-only Closing Disclosure from us.</li><li><b>Payoffs.</b> The seller's mortgage payoff must match a written payoff statement good through the disbursement date, including the per diem. An old or verbal payoff is a common way money gets short.</li></ol></div></div>",
"keys": [
[
"Borrower cash to close",
"K − L"
],
[
"Seller proceeds",
"M − N"
],
[
"MD property tax year",
"July 1 – June 30, usually paid in advance"
],
[
"Payoffs",
"Written, good through the disbursement date"
]
],
"traps": [
"Proration dates are the #1 math error: confirm who owns the closing day and the end date of the tax year.",
"A payoff that expires before disbursement will leave the wire short."
],
"qs": [
"CQ16",
"CQ17",
"CQ18",
"CQ19"
]
},
{
"id": "C05",
"s": "CD",
"t": "Pages 4–5: loan disclosures, calculations and contacts",
"m": 7,
"body": "<p class=\"note\">Sample loan for training only. All names, numbers and the property are made up. Title premiums use the \"Acme\" practice rates from the pre-licensing course.</p><div class=\"split\"><div class=\"form\"><div class=\"fhead\"><b>Additional Information About This Loan</b><span>Page 4 of 5</span></div>\n<h5><span class=\"co\">1</span> Loan Disclosures</h5>\n<table class=\"ft wide\"><tr><td>Assumption</td><td>☒ will not allow assumption of this loan on the original terms</td></tr><tr><td>Demand Feature</td><td>☒ does not have a demand feature</td></tr><tr><td>Late Payment</td><td>If any payment is more than 15 days late, a fee of 5% of the monthly principal and interest</td></tr><tr><td>Negative Amortization</td><td>☒ do not have a negative amortization feature</td></tr><tr><td>Partial Payments</td><td>☒ may hold partial payments until you pay the rest</td></tr><tr><td>Security Interest</td><td>You are granting a security interest in 123 Sample Lane, Anytown, MD 21000</td></tr></table>\n<h5><span class=\"co\">2</span> Escrow Account</h5>\n<table class=\"ft wide\"><tr><td>Escrowed Property Costs over Year 1</td><td>$6,000.00 — homeowner's insurance, property taxes</td></tr><tr><td>Non-Escrowed Property Costs over Year 1</td><td>$900.00 — HOA dues</td></tr><tr><td>Initial Escrow Payment</td><td>$1,200.00</td></tr><tr><td>Monthly Escrow Payment</td><td>$500.00</td></tr></table>\n<div class=\"fhead\" style=\"margin-top:12px\"><b>Loan Calculations</b><span>Page 5 of 5</span></div>\n<table class=\"ft wide\"><tr><td><span class=\"co\">3</span> Total of Payments</td><td>$817,788.80</td></tr><tr><td>Finance Charge</td><td>$454,498.87</td></tr><tr><td>Amount Financed</td><td>$356,431.96</td></tr><tr><td>Annual Percentage Rate (APR)</td><td>6.611%</td></tr><tr><td>Total Interest Percentage (TIP)</td><td>121.659%</td></tr></table>\n<h5><span class=\"co\">4</span> Contact Information</h5>\n<table class=\"ft wide\"><tr><th></th><th>Lender</th><th>Real Estate Broker (B)</th><th>Real Estate Broker (S)</th><th>Settlement Agent</th></tr>\n<tr><td>Name</td><td>Example Mortgage Co.</td><td>Buyer Side Realty</td><td>Listing Side Realty</td><td>Sample Title &amp; Escrow</td></tr><tr><td>License / NMLS ID</td><td>NMLS 000000</td><td>MD 00001</td><td>MD 00002</td><td>MD 00003</td></tr><tr><td>Contact</td><td>Pat Lee</td><td>Sam Ortiz</td><td>Dana Fox</td><td>(our closer)</td></tr></table>\n<h5><span class=\"co\">5</span> Confirm Receipt</h5><p class=\"fsmall\">By signing, you are only confirming that you have received this form. Borrower ______ Date ____ Co-Borrower ______ Date ____</p></div><div class=\"expl\"><ol class=\"callouts\"><li><b>Loan Disclosures.</b> Plain-language features of the loan: whether a buyer could assume it, late fee terms, how partial payments are handled. Mostly the lender's responsibility, but read them so you can answer basic questions.</li><li><b>Escrow Account.</b> What the lender will pay from escrow (taxes, insurance) versus what the borrower pays directly (here, HOA dues). The initial escrow payment must match page 2, section G.</li><li><b>Loan Calculations.</b> Federal cost-of-credit figures. <b>APR</b> is higher than the 6.25% note rate because it spreads certain fees (points, underwriting, prepaid interest) over the loan. If the APR goes up more than 1/8% after the borrower received the CD, a new CD and a <b>new 3-business-day wait</b> are required. These numbers are the lender's to calculate, not ours.</li><li><b>Contact Information.</b> Names, license and NMLS numbers. Check that our company, license number and closer's name are correct. Lenders get this wrong more than you'd expect.</li><li><b>Confirm Receipt.</b> Signing only confirms the borrower received the form; it isn't agreement to the loan. The lender may require the signed CD back in the closing package.</li></ol></div></div>",
"keys": [
[
"APR vs. rate",
"APR includes certain fees, so it's higher"
],
[
"APR increase over 1/8%",
"New CD and new 3-day wait"
],
[
"Our part on page 5",
"Our company, license number and closer"
]
],
"traps": [
"Signing the CD only confirms receipt.",
"The loan calculations are the lender's numbers. Don't try to recompute or change them."
],
"qs": [
"CQ20",
"CQ21",
"CQ22"
]
},
{
"id": "C06",
"s": "AL",
"t": "The ALTA Settlement Statement: what it is and how to read it",
"m": 12,
"body": "<p class=\"note\">Sample loan for training only. All names, numbers and the property are made up. Title premiums use the \"Acme\" practice rates from the pre-licensing course.</p><p>The <b>ALTA Settlement Statement</b> is the title company's own <b>itemized accounting of every dollar</b> in the transaction: what comes in, what goes out, and to whom. The American Land Title Association publishes standard versions so statements look the same from company to company.</p>\n<h4>Why we use it when there's already a CD</h4>\n<ul>\n<li>The CD is the <b>lender's</b> federal disclosure about the <b>loan</b>. The ALTA is <b>our</b> disbursement record for the <b>whole deal</b>, with the exact payees, payoff details and actual title premiums.</li>\n<li>We <b>disburse from the signed ALTA statement</b>. It's also what agents and attorneys review, and what lenders and investors often request.</li>\n<li>On cash, commercial and other non-CD deals, it's <b>the</b> closing statement.</li>\n</ul>\n<h4>The four versions</h4>\n<p><b>Combined</b> (buyer and seller on one page), <b>Seller</b> only, <b>Buyer/Borrower</b> only, and <b>Cash</b> (no loan). Most companies give each side its own version so buyer and seller don't see each other's private details.</p><div class=\"split\"><div class=\"form\"><div class=\"fhead\"><b>ALTA Combined Settlement Statement</b><span>File CLA-26-1188</span></div>\n<div class=\"fgrid2 fsmall\" style=\"margin-bottom:8px\"><div><span class=\"co\">1</span> <b>Settlement agent:</b> Sample Title &amp; Escrow<br><b>Property:</b> 123 Sample Lane, Anytown, MD 21000<br><b>Buyer:</b> Maria &amp; James Carter · <b>Seller:</b> Robert Ellis</div><div><b>Lender:</b> Example Mortgage Co.<br><b>Settlement date:</b> 11/20/2026 · <b>Disbursement date:</b> 11/20/2026</div></div>\n<table class=\"ft cc\"><tr><th><span class=\"co\">2</span> Description</th><th>Seller Debit</th><th>Seller Credit</th><th>Borrower Debit</th><th>Borrower Credit</th></tr>\n<tr class=\"sec\"><td colspan=5>Financial</td></tr>\n<tr><td>Sale price of property</td><td></td><td>$400,000.00</td><td>$400,000.00</td><td></td></tr><tr><td>Deposit</td><td></td><td></td><td></td><td>$10,000.00</td></tr><tr><td>Loan amount</td><td></td><td></td><td></td><td>$360,000.00</td></tr><tr><td>Seller credit (closing costs)</td><td>$5,000.00</td><td></td><td></td><td>$5,000.00</td></tr>\n<tr class=\"sec\"><td colspan=5><span class=\"co\">3</span> Prorations / Adjustments</td></tr>\n<tr><td>County taxes 11/20/26 to 06/30/27</td><td></td><td>$2,932.60</td><td>$2,932.60</td><td></td></tr><tr><td>HOA dues 11/20/26 to 11/30/26</td><td></td><td>$27.50</td><td>$27.50</td><td></td></tr>\n<tr class=\"sec\"><td colspan=5><span class=\"co\">4</span> Loan Charges to Example Mortgage Co.</td></tr>\n<tr><td>Points (0.5% of loan amount)</td><td></td><td></td><td>$1,800.00</td><td></td></tr><tr><td>Application / underwriting fee</td><td></td><td></td><td>$995.00</td><td></td></tr><tr><td>Flood certification</td><td></td><td></td><td>$10.00</td><td></td></tr><tr><td>Tax service fee</td><td></td><td></td><td>$85.00</td><td></td></tr><tr><td>Appraisal fee — POC by borrower $650.00</td><td></td><td></td><td></td><td></td></tr><tr><td>Credit report — POC by borrower $65.00</td><td></td><td></td><td></td><td></td></tr><tr><td>Prepaid interest $61.64/day 11/20/26–12/1/26</td><td></td><td></td><td>$678.04</td><td></td></tr>\n<tr class=\"sec\"><td colspan=5>Impounds (escrow)</td></tr>\n<tr><td>Homeowner's insurance 2 mo. @ $100.00</td><td></td><td></td><td>$200.00</td><td></td></tr><tr><td>Property taxes 3 mo. @ $400.00</td><td></td><td></td><td>$1,200.00</td><td></td></tr><tr><td>Aggregate adjustment</td><td></td><td></td><td>–$200.00</td><td></td></tr>\n<tr class=\"sec\"><td colspan=5><span class=\"co\">5</span> Title Charges &amp; Escrow / Settlement Charges</td></tr>\n<tr><td>Owner's title insurance (coverage $400,000)</td><td></td><td></td><td>$2,300.00</td><td></td></tr><tr><td>Lender's title insurance (coverage $360,000) — simultaneous</td><td></td><td></td><td>$35.00</td><td></td></tr><tr><td>Settlement fee</td><td>$295.00</td><td></td><td>$595.00</td><td></td></tr><tr><td>Examination fee</td><td></td><td></td><td>$250.00</td><td></td></tr><tr><td>Abstract / search</td><td></td><td></td><td>$175.00</td><td></td></tr><tr><td>Endorsements</td><td></td><td></td><td>$100.00</td><td></td></tr><tr><td>Closing protection letter</td><td></td><td></td><td>$45.00</td><td></td></tr><tr><td>Deed preparation (attorney)</td><td>$150.00</td><td></td><td></td><td></td></tr>\n<tr class=\"sec\"><td colspan=5>Commission</td></tr>\n<tr><td>Listing broker – Listing Side Realty</td><td>$10,000.00</td><td></td><td></td><td></td></tr><tr><td>Buyer's broker – Buyer Side Realty</td><td>$10,000.00</td><td></td><td></td><td></td></tr>\n<tr class=\"sec\"><td colspan=5>Government Recording and Transfer Charges</td></tr>\n<tr><td>Recording fees (deed $60.00, deed of trust $60.00)</td><td></td><td></td><td>$120.00</td><td></td></tr><tr><td>State recordation tax</td><td>$1,400.00</td><td></td><td>$1,400.00</td><td></td></tr><tr><td>State transfer tax</td><td>$1,000.00</td><td></td><td>$1,000.00</td><td></td></tr><tr><td>County transfer tax</td><td>$2,000.00</td><td></td><td>$2,000.00</td><td></td></tr>\n<tr class=\"sec\"><td colspan=5><span class=\"co\">6</span> Payoff(s)</td></tr>\n<tr><td>Payoff – Old Bank, loan #…4411 (incl. per diem through 11/20)</td><td>$182,450.33</td><td></td><td></td><td></td></tr>\n<tr class=\"sec\"><td colspan=5>Miscellaneous</td></tr>\n<tr><td>Homeowner's insurance premium – Sample Insurance Co.</td><td></td><td></td><td>$1,200.00</td><td></td></tr><tr><td>Survey – Sample Surveyors</td><td></td><td></td><td>$350.00</td><td></td></tr><tr><td>Home warranty – Sample Warranty Co.</td><td>$550.00</td><td></td><td></td><td></td></tr>\n<tr class=\"tot\"><td>Subtotals</td><td>$212,845.33</td><td>$402,960.10</td><td>$417,298.14</td><td>$375,000.00</td></tr>\n<tr class=\"tot\"><td><span class=\"co\">7</span> Due From Borrower</td><td></td><td></td><td></td><td>$42,298.14</td></tr>\n<tr class=\"tot\"><td>Due To Seller</td><td>$190,114.77</td><td></td><td></td><td></td></tr>\n<tr class=\"tot\"><td>Totals</td><td>$402,960.10</td><td>$402,960.10</td><td>$417,298.14</td><td>$417,298.14</td></tr></table>\n<p class=\"fsmall\"><span class=\"co\">8</span> Buyer ______ Seller ______ Settlement Agent ______ — We have reviewed this statement and authorize disbursement as shown.</p></div><div class=\"expl\"><ol class=\"callouts\"><li><b>Header.</b> Who, what and when: settlement agent, property, parties, lender, settlement and disbursement dates. It must match the CD and the contract.</li><li><b>Four columns.</b> Every dollar shows as a <b>debit</b> (money a party owes or pays) or a <b>credit</b> (money a party receives or already paid) for the seller and the borrower. The sale price is a <b>credit</b> to the seller and a <b>debit</b> to the borrower: the same dollars, two sides.</li><li><b>Prorations.</b> The same tax and HOA adjustments as page 3 of the CD, shown as a seller credit and a borrower debit.</li><li><b>Loan charges.</b> The lender's fees, matching CD sections A and B. Items paid outside of closing are marked <b>POC</b> (paid outside closing) and kept out of the columns, which is why the appraisal and credit report show no amount here.</li><li><b>Title charges.</b> The <b>actual</b> premiums: owner's $2,300.00 and lender's $35.00 (simultaneous issue). Compare the CD: lender's $1,740.00 and owner's $595.00. Different presentation, <b>same $3,500.00 total</b>. Settlement fees can be split between buyer and seller.</li><li><b>Payoffs.</b> Each lien being paid, with the loan number and the per diem through the disbursement date. This is what we actually wire out.</li><li><b>Bottom line.</b> <b>Due From Borrower $42,298.14</b> and <b>Due To Seller $190,114.77</b>, exactly the CD's cash to close and cash to seller. The statement balances: each side's debit column equals its credit column.</li><li><b>Signatures.</b> Buyer and seller sign to approve, and we disburse <b>only</b> what's shown. If it isn't on the signed statement, it doesn't get paid.</li></ol></div></div>",
"keys": [
[
"Who prepares it",
"The settlement agent (us)"
],
[
"Debit",
"What a party owes or pays"
],
[
"Credit",
"What a party receives or already paid"
],
[
"POC",
"Paid outside closing: shown but not in the columns"
],
[
"We disburse from",
"The signed settlement statement"
]
],
"traps": [
"The sale price is a seller CREDIT and a borrower DEBIT.",
"The ALTA shows the ACTUAL title premiums, not the CD's federal presentation."
],
"qs": [
"CQ23",
"CQ24",
"CQ25",
"CQ26",
"CQ27"
]
},
{
"id": "C07",
"s": "RV",
"t": "Side by side: reconciling the CD and the ALTA",
"m": 10,
"body": "<p class=\"note\">Sample loan for training only. All names, numbers and the property are made up. Title premiums use the \"Acme\" practice rates from the pre-licensing course.</p><p>Before every closing, someone has to <b>balance the CD against our settlement statement</b>. The lender won't fund, and we won't disburse, if they disagree on cash to close.</p>\n<h4>What must match and what can differ</h4><table class=\"lt\"><tr><th>Check</th><th>Closing Disclosure</th><th>ALTA statement</th><th>Match?</th></tr>\n<tr><td>Cash from borrower</td><td>$42,298.14 (page 1 &amp; 3)</td><td>Due From Borrower $42,298.14</td><td>✓ Must match exactly</td></tr>\n<tr><td>Cash to seller</td><td>$190,114.77 (seller CD)</td><td>Due To Seller $190,114.77</td><td>✓ Must match exactly</td></tr>\n<tr><td>Lender's title insurance</td><td>$1,740.00 (section C)</td><td>$35.00</td><td>Different on purpose</td></tr>\n<tr><td>Owner's title insurance</td><td>$595.00 (section H, \"optional\")</td><td>$2,300.00</td><td>Different on purpose</td></tr>\n<tr><td>Total title premiums</td><td>$2,335.00</td><td>$2,335.00</td><td>✓ Must match</td></tr>\n<tr><td>Appraisal / credit report</td><td>\"Before closing\" column</td><td>Marked POC, no amount in columns</td><td>✓ Same money, shown differently</td></tr>\n<tr><td>Prorations, payoffs, commissions</td><td>Sections K–N</td><td>Prorations, payoffs, commission sections</td><td>✓ Must match line for line</td></tr></table>\n<h4>Pre-closing review checklist</h4>\n<ol>\n<li><b>Names and property:</b> borrowers match the loan documents and the new deed; sellers match the vesting deed; the address and county are right.</li>\n<li><b>Dates:</b> closing and disbursement dates are correct. For a primary-residence refi, disbursement is after the 3-business-day right to cancel.</li>\n<li><b>Sale price, loan amount, deposit and seller credit</b> match the contract, any addenda and the lender's instructions.</li>\n<li><b>Title fees</b> match our rate filing (including any reissue discount), and the CD shows lender's and owner's premiums the federal way.</li>\n<li><b>Taxes:</b> recordation and transfer taxes are calculated correctly and split as the contract says (seller pays the state transfer tax for a first-time Maryland homebuyer).</li>\n<li><b>Prorations:</b> right tax year, right days, right direction (who reimburses whom).</li>\n<li><b>Payoffs:</b> from current written statements, with per diem through disbursement, and every lien on the title commitment is accounted for.</li>\n<li><b>Commissions</b> match the listing agreement and the broker's commission instructions.</li>\n<li><b>Bottom line:</b> cash to close and cash to seller match exactly between the CD and the ALTA, and the statement balances.</li>\n</ol>\n<h4>Common errors that delay closings</h4>\n<ul>\n<li>The lender used an old title quote, or showed title fees our way instead of the federal way, so the CD doesn't tie out.</li>\n<li>A seller credit or lender credit is on one form and not the other.</li>\n<li>Proration figured on the wrong tax year or wrong number of days.</li>\n<li>A payoff expired or missing a second lien (HELOC, judgment).</li>\n<li>Recording fees or transfer taxes estimated instead of calculated.</li>\n</ul>\n<p>When the forms don't match, <b>don't change the lender's CD yourself</b>. Send the lender the corrected figures in writing and get an updated CD.</p>",
"keys": [
[
"Must match exactly",
"Cash from borrower, cash to seller"
],
[
"Can differ",
"Lender's and owner's title premiums (but not their total)"
],
[
"Mismatch fix",
"Send the lender corrected figures in writing"
]
],
"traps": [
"Matching totals but different title line items is normal; different cash to close is not.",
"Never edit the lender's CD yourself."
],
"qs": [
"CQ28",
"CQ29",
"CQ30",
"CQ31",
"CQ32"
]
}
];
const QUESTIONS = [
{
"id": "CQ01",
"s": "CD",
"q": "Who is responsible for issuing the Closing Disclosure to the borrower?",
"o": [
"The title company",
"The lender",
"The real estate agent",
"The seller"
],
"a": 1,
"e": "The CD is the lender's federal disclosure. The title company supplies figures and checks them."
},
{
"id": "CQ02",
"s": "CD",
"q": "How far in advance must the borrower receive the Closing Disclosure?",
"o": [
"At the closing table",
"1 business day",
"3 business days",
"10 calendar days"
],
"a": 2,
"e": "The borrower must receive the CD at least 3 business days before closing."
},
{
"id": "CQ03",
"s": "CD",
"q": "Two days before closing, the seller agrees to a $500 repair credit and the lender issues a corrected CD. Does closing have to move?",
"o": [
"Yes, because any corrected CD starts a new 3-business-day wait",
"No, a credit change doesn't restart the 3-day wait",
"Yes, because the seller credit changes cash to close",
"Only if the buyer objects to the corrected CD in writing"
],
"a": 1,
"e": "Only an APR increase beyond tolerance, a product change or an added prepayment penalty requires a new 3-day wait."
},
{
"id": "CQ04",
"s": "CD",
"q": "Which transaction would NOT have a Closing Disclosure?",
"o": [
"A financed purchase of a home",
"A refinance of a primary residence",
"An all-cash purchase",
"A purchase with an FHA loan"
],
"a": 2,
"e": "No loan means no CD. Cash deals use the ALTA settlement statement."
},
{
"id": "CQ05",
"s": "CD",
"q": "Which costs fall under zero tolerance and can't increase from the Loan Estimate?",
"o": [
"Prepaid interest",
"The lender's own origination charges",
"Homeowner's insurance premium",
"Services the borrower shopped for on their own"
],
"a": 1,
"e": "The lender's own charges, required-provider services and transfer taxes are zero tolerance."
},
{
"id": "CQ06",
"s": "CD",
"q": "On page 1, the seller's name is spelled \"Robert Elis,\" but the vesting deed says \"Robert Ellis.\" What should happen?",
"o": [
"Nothing, since it's a minor typo",
"Have it corrected before closing",
"Fix it on the deed instead",
"Note it on the settlement statement only"
],
"a": 1,
"e": "Names must match the vesting deed and loan documents. Get it corrected before closing."
},
{
"id": "CQ07",
"s": "CD",
"q": "What is the difference between the closing date and the disbursement date on the CD?",
"o": [
"They are always the same date on every transaction",
"Closing is the signing; disbursement is when money is paid out",
"Closing is when funds arrive; disbursement is the signing",
"Disbursement is the date the deed is recorded at the county"
],
"a": 1,
"e": "On a primary-residence refinance they differ by the 3-business-day right to cancel."
},
{
"id": "CQ08",
"s": "CD",
"q": "Where is the \"Cash to Close\" amount first shown on the CD?",
"o": [
"Page 1, Costs at Closing",
"Page 4, Loan Disclosures",
"Page 5, Loan Calculations",
"It isn't on the CD"
],
"a": 0,
"e": "Cash to Close appears on page 1 and is detailed on page 3."
},
{
"id": "CQ09",
"s": "CD",
"q": "In the sample, why does the projected monthly payment drop after year 9?",
"o": [
"The interest rate falls",
"Mortgage insurance ends",
"Escrow stops",
"The loan is paid off"
],
"a": 1,
"e": "The Projected Payments table shows mortgage insurance in years 1–9 only."
},
{
"id": "CQ10",
"s": "CD",
"q": "On page 2, which section lists the title company's fees in a typical file?",
"o": [
"A. Origination Charges (the lender's own fees)",
"C. Services Borrower Did Shop For",
"F. Prepaids (insurance and prepaid interest)",
"G. Initial Escrow Payment at Closing"
],
"a": 1,
"e": "Title fees usually appear in C (or B if the borrower used the lender's required provider), each starting with \"Title –\"."
},
{
"id": "CQ11",
"s": "CD",
"q": "Our invoice shows owner's title $2,300 and lender's title $35 (simultaneous). What will the CD show?",
"o": [
"Owner's $2,300 and lender's $35, matching our invoice",
"Lender's $1,740 and owner's $595",
"Lender's $2,335 and owner's $0 (all shown as lender's)",
"Owner's $2,335 and lender's $0 (all shown as owner's)"
],
"a": 1,
"e": "The CD shows the full lender's premium, and the owner's as owner's + simultaneous − full lender's: $2,300 + $35 − $1,740 = $595."
},
{
"id": "CQ12",
"s": "CD",
"q": "How must the owner's title policy be labeled on the CD?",
"o": [
"\"Required\"",
"\"(optional)\"",
"\"Seller-paid\"",
"It isn't shown"
],
"a": 1,
"e": "The owner's title policy goes in section H and must be marked optional."
},
{
"id": "CQ13",
"s": "CD",
"q": "Prepaid interest is $61.64 per day. Closing is 11/20 and the first interest period runs through 11/30 (11 days). What's the prepaid interest?",
"o": [
"$616.40",
"$678.04",
"$1,849.20",
"$61.64"
],
"a": 1,
"e": "$61.64 × 11 days = $678.04."
},
{
"id": "CQ14",
"s": "CD",
"q": "Which section holds money to start the borrower's escrow account?",
"o": [
"E",
"F",
"G",
"H"
],
"a": 2,
"e": "Section G is the initial escrow payment at closing."
},
{
"id": "CQ15",
"s": "CD",
"q": "Recording fees fall under which tolerance?",
"o": [
"Zero tolerance",
"10% cumulative tolerance",
"No limit",
"They aren't covered by tolerances"
],
"a": 1,
"e": "Recording fees and third-party services chosen from the lender's list share the 10% cumulative tolerance."
},
{
"id": "CQ16",
"s": "CD",
"q": "On page 3, how is the borrower's cash to close calculated in the Summaries of Transactions?",
"o": [
"L − K",
"K − L",
"M − N",
"K + L"
],
"a": 1,
"e": "K (due from borrower) minus L (paid already by or for the borrower)."
},
{
"id": "CQ17",
"s": "CD",
"q": "Maryland county taxes of $4,800 for July 1–June 30 were paid in full by the seller. Closing is November 20. Which is correct?",
"o": [
"The seller owes the buyer for July through November",
"The buyer reimburses the seller through June 30",
"No proration is needed when taxes are already paid",
"The lender reimburses the seller from the escrow account"
],
"a": 1,
"e": "The seller prepaid the whole year, so the buyer reimburses the seller for the part of the year they'll own the home."
},
{
"id": "CQ18",
"s": "CD",
"q": "Where does the seller's mortgage payoff appear on the CD?",
"o": [
"Section K, due from borrower at closing",
"Section L, paid already by or on behalf of the borrower",
"Section N, due from seller",
"Page 1, in the Loan Terms table"
],
"a": 2,
"e": "Payoffs reduce the seller's proceeds, so they're in N."
},
{
"id": "CQ19",
"s": "CD",
"q": "Why must a payoff be good through the disbursement date?",
"o": [
"So it covers the right per diem and the wire isn't short",
"Because the Closing Disclosure expires after 10 days",
"Because the owner's title policy requires a new statement",
"It doesn't matter as long as the lender approves it"
],
"a": 0,
"e": "Interest accrues daily. An expired payoff can leave the loan unpaid and a lien on title."
},
{
"id": "CQ20",
"s": "CD",
"q": "Why is the APR higher than the note rate?",
"o": [
"It includes certain loan fees spread over the loan",
"It includes property taxes and homeowner's insurance",
"It includes the owner's title policy premium",
"It doesn't; the APR and note rate are always the same"
],
"a": 0,
"e": "APR folds in finance charges like points and prepaid interest."
},
{
"id": "CQ21",
"s": "CD",
"q": "After the CD is delivered, the APR increases by more than 1/8%. What happens?",
"o": [
"Nothing, as long as the borrower already signed",
"A corrected CD and a new 3-day wait",
"Only the settlement statement needs to be updated",
"The loan is cancelled and must be re-applied for"
],
"a": 1,
"e": "An APR increase beyond tolerance triggers a new 3-day waiting period."
},
{
"id": "CQ22",
"s": "CD",
"q": "What does the borrower's signature on the CD mean?",
"o": [
"They agree to the loan terms",
"They received the form",
"They waive the 3-day wait",
"They authorize disbursement"
],
"a": 1,
"e": "The CD states that signing only confirms receipt."
},
{
"id": "CQ23",
"s": "AL",
"q": "Who prepares the ALTA settlement statement?",
"o": [
"The lender that is making the loan",
"The settlement agent (the title company)",
"The listing agent for the seller",
"The county land records office"
],
"a": 1,
"e": "It's the title company's itemized record of all funds."
},
{
"id": "CQ24",
"s": "AL",
"q": "On the ALTA statement, the sale price appears as:",
"o": [
"A debit to the seller and a credit to the borrower",
"A credit to the seller and a debit to the borrower",
"A credit to both",
"A debit to both"
],
"a": 1,
"e": "The seller receives the price (credit); the buyer pays it (debit)."
},
{
"id": "CQ25",
"s": "AL",
"q": "What does \"POC\" mean on a settlement statement?",
"o": [
"Paid outside closing",
"Price of contract",
"Proof of coverage",
"Payoff on completion"
],
"a": 0,
"e": "POC items are shown for disclosure but kept out of the columns because they weren't paid through closing."
},
{
"id": "CQ26",
"s": "AL",
"q": "Why do we need an ALTA statement on a financed deal that already has a CD?",
"o": [
"We don't; the CD replaces it on financed deals",
"It's our disbursement record, with actual payees",
"It replaces the deed as the record of the sale",
"Lenders no longer accept Closing Disclosures"
],
"a": 1,
"e": "The CD is the lender's loan disclosure; the ALTA is our accounting and disbursement authority."
},
{
"id": "CQ27",
"s": "AL",
"q": "A seller asks you to pay his gardener $300 from proceeds after closing, but it isn't on the signed statement. What do you do?",
"o": [
"Pay it, since it comes from his own proceeds",
"Pay it once he confirms the request by email",
"Don't pay it; it isn't on the signed statement",
"Add it to the statement afterward and pay it"
],
"a": 2,
"e": "We disburse only what's shown on the statement the parties signed."
},
{
"id": "CQ28",
"s": "RV",
"q": "Which two figures must match exactly between the CD and the ALTA statement?",
"o": [
"The lender's and owner's title premium line items",
"Cash from borrower and cash to seller",
"The APR and the note interest rate",
"The recording fees and each transfer tax line"
],
"a": 1,
"e": "Line items like title premiums can be presented differently, but cash to close and seller proceeds must match exactly."
},
{
"id": "CQ29",
"s": "RV",
"q": "The CD shows lender's title $1,740 and owner's $595; our ALTA shows $35 and $2,300. What do you conclude?",
"o": [
"The CD is wrong and must be corrected before closing",
"Normal, as long as the totals match",
"Our title rates must have been entered incorrectly",
"The buyer was overcharged and is owed a refund"
],
"a": 1,
"e": "TRID's disclosure method causes the difference. The total premium must match."
},
{
"id": "CQ30",
"s": "RV",
"q": "You find the CD's cash to close is $300 higher than our statement. What's the right fix?",
"o": [
"Edit the CD yourself so the numbers match",
"Send the lender corrected figures in writing",
"Close anyway and fix it after recording",
"Change our statement so it matches the CD"
],
"a": 1,
"e": "The CD belongs to the lender; we provide corrected figures in writing and get a revised CD."
},
{
"id": "CQ31",
"s": "RV",
"q": "A first-time Maryland homebuyer is purchasing. The contract is silent on transfer taxes. Who pays the state transfer tax?",
"o": [
"The buyer",
"The seller",
"Split 50/50",
"The lender"
],
"a": 1,
"e": "For a qualified first-time Maryland homebuyer, the seller pays the state transfer tax by law."
},
{
"id": "CQ32",
"s": "RV",
"q": "Which is the most common cause of a CD and settlement statement not tying out?",
"o": [
"The deed was notarized by a different notary",
"A credit, proration or payoff that doesn't match",
"The buyer brought a cashier's check instead of a wire",
"The survey arrived earlier than expected"
],
"a": 1,
"e": "Missing or mismatched credits, prorations, payoffs and title figures are the usual culprits."
}
];
window.COURSES = window.COURSES || [];
window.COURSES.push({
  id: "cd-alta",
  draft: true,
  title: "Reading the Closing Disclosure & ALTA Settlement Statement",
  subtitle: "Closing documents · Processors and closers",
  description: "Page-by-page walkthrough of the Closing Disclosure and the ALTA settlement statement on the same sample loan, with what every section means, what it's used for, and how to reconcile the two before closing.",
  source: "",
  exam: { counts: {CD:14, AL:4, RV:4}, minutes: 30, pass: 80 },
  rateCharts: false,
  sections: SECTIONS,
  lessons: LESSONS,
  questions: QUESTIONS
});
})();
