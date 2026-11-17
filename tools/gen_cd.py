import json
d = json.load(open('tools/deal.json'))
def m(x, neg=False):
    s = f"${abs(x):,.2f}"
    return ("–" + s) if (x < 0 or neg) else s
def co(n): return f'<span class="co">{n}</span>'
def row(cells, cls=""):
    return "<tr" + (f' class="{cls}"' if cls else "") + ">" + "".join(f"<td>{c}</td>" for c in cells) + "</tr>"
def callouts(items):
    return '<ol class="callouts">' + "".join(f'<li><b>{t}</b> {e}</li>' for t, e in items) + "</ol>"
def split(form, expl):
    return f'<div class="split"><div class="form">{form}</div><div class="expl">{expl}</div></div>'

SAMPLE = '<p class="note">Sample loan for training only. All names, numbers and the property are made up. Title premiums use the "Acme" practice rates from the pre-licensing course.</p>'

# ---------------- CD PAGE 1 ----------------
p1 = f'''<div class="fhead"><b>Closing Disclosure</b><span>Page 1 of 5 · Loan ID # 2026-55120</span></div>
<p class="fsmall">This form is a statement of final loan terms and closing costs. Compare this document with your Loan Estimate.</p>
<div class="fgrid3">
<div>{co(1)}<h5>Closing Information</h5><table class="ft">{row(["Date Issued","11/14/2026"])}{row(["Closing Date","11/20/2026"])}{row(["Disbursement Date","11/20/2026"])}{row(["Settlement Agent","Sample Title &amp; Escrow"])}{row(["File #","CLA-26-1188"])}{row(["Property","123 Sample Lane, Anytown, MD 21000"])}{row(["Sale Price",m(d['price'])])}</table></div>
<div>{co(2)}<h5>Transaction Information</h5><table class="ft">{row(["Borrower","Maria &amp; James Carter"])}{row(["Seller","Robert Ellis"])}{row(["Lender","Example Mortgage Co."])}</table></div>
<div>{co(3)}<h5>Loan Information</h5><table class="ft">{row(["Loan Term","30 years"])}{row(["Purpose","Purchase"])}{row(["Product","Fixed Rate"])}{row(["Loan Type","☒ Conventional ☐ FHA ☐ VA"])}{row(["MIC #","88-104"])}</table></div>
</div>
<h5>{co(4)} Loan Terms <span class="fsmall">— Can this amount increase after closing?</span></h5>
<table class="ft wide">{row(["Loan Amount",m(d['loan']),"NO"])}{row(["Interest Rate","6.25%","NO"])}{row(["Monthly Principal &amp; Interest",m(d['pi']),"NO"])}{row(["Prepayment Penalty","—","NO"])}{row(["Balloon Payment","—","NO"])}</table>
<h5>{co(5)} Projected Payments</h5>
<table class="ft wide"><tr><th>Payment Calculation</th><th>Years 1–9</th><th>Years 10–30</th></tr>
{row(["Principal &amp; Interest",m(d['pi']),m(d['pi'])])}{row(["Mortgage Insurance","+ $120.00","+ —"])}{row(["Estimated Escrow","+ $500.00","+ $500.00"])}
{row(["<b>Estimated Total Monthly Payment</b>","<b>"+m(d['pi']+620)+"</b>","<b>"+m(d['pi']+500)+"</b>"])}
{row(["Estimated Taxes, Insurance &amp; Assessments","$575.00 a month","In escrow: property taxes YES · homeowner's insurance YES · HOA dues NO"])}</table>
<h5>{co(6)} Costs at Closing</h5>
<table class="ft wide">{row(["Closing Costs",m(d['J_b_total']),"Includes "+m(d['D_total'])+" in Loan Costs + "+m(d['I_b'])+" in Other Costs – $0 in Lender Credits. See page 2."])}
{row(["Cash to Close",m(d['cash_to_close']),"Includes Closing Costs. See Calculating Cash to Close on page 3."])}</table>'''

p1x = callouts([
 ("Closing Information.", "The dates and the property. <b>Closing date</b> is the signing; <b>disbursement date</b> is when money is paid out. On a primary-residence refinance, the disbursement date must be after the 3-day right to cancel. Check that the sale price matches the contract and the settlement agent and file number are ours."),
 ("Transaction Information.", "Borrower names must match the loan documents and the new deed exactly. Seller names must match the current vesting deed. A mismatch here is the most common thing that stops a closing."),
 ("Loan Information.", "Term, purpose (purchase or refinance), product (fixed or adjustable) and loan type (conventional, FHA, VA). The <b>MIC #</b> appears when there's mortgage insurance."),
 ("Loan Terms.", "The five big numbers, each with a yes/no for whether it can change after closing. Compare loan amount and rate to the lender's closing instructions and the note."),
 ("Projected Payments.", "What the borrower will pay each month, broken into principal and interest, mortgage insurance and escrow. Here the mortgage insurance drops off after year 9, so the payment goes down. The bottom row shows which costs are escrowed and which the borrower pays on their own (HOA dues here)."),
 ("Costs at Closing.", "The two totals buyers care about most. <b>Closing Costs</b> is all closing costs (page 2, line J). <b>Cash to Close</b> is what the buyer must bring, after the down payment, deposit, credits and adjustments. It must match our settlement statement to the penny."),
])

# ---------------- CD PAGE 2 ----------------
def cc_rows(items, col):
    out = ""
    for it in items:
        lbl, at, bf = it[0], it[1], it[2]
        cells = [lbl, m(at) if at else "", m(bf) if bf else "", "", ""]
        if col == "s": cells = [lbl, "", "", m(at) if at else "", ""]
        out += row(cells)
    return out
A = [("01 Points (0.5% of loan amount)",1800,0),("02 Application / underwriting fee",995,0)]
B = [("01 Appraisal fee to Sample Appraisers",0,650),("02 Credit report fee",0,65),("03 Flood certification",10,0),("04 Tax service fee",85,0)]
C = [("01 Survey (location drawing)",350,0),("02 Title – Abstract / search",175,0),("03 Title – Closing protection letter",45,0),("04 Title – Endorsements",100,0),("05 Title – Examination fee",250,0),("06 Title – Lender's title insurance",d['lenders_full'],0),("07 Title – Settlement fee",595,0)]
th = "<tr><th></th><th>Borrower-Paid<br>At Closing</th><th>Borrower-Paid<br>Before Closing</th><th>Seller-Paid<br>At Closing</th><th>Paid by<br>Others</th></tr>"
p2 = f'''<div class="fhead"><b>Closing Cost Details</b><span>Page 2 of 5</span></div>
<table class="ft cc">{th}
<tr class="sec"><td colspan=5><b>Loan Costs</b></td></tr>
<tr class="sub"><td colspan=5>{co(1)} A. Origination Charges — {m(d['A_t'])}</td></tr>{cc_rows(A,'b')}
<tr class="sub"><td colspan=5>{co(2)} B. Services Borrower Did Not Shop For — {m(d['B_at']+d['B_bf'])}</td></tr>{cc_rows(B,'b')}
<tr class="sub"><td colspan=5>{co(3)} C. Services Borrower Did Shop For — {m(d['C_t'])}</td></tr>{cc_rows(C,'b')}
<tr class="tot"><td>D. TOTAL LOAN COSTS (Borrower-Paid) {m(d['D_total'])}</td><td>{m(d['D_at'])}</td><td>{m(d['B_bf'])}</td><td></td><td></td></tr>
<tr class="sec"><td colspan=5><b>Other Costs</b></td></tr>
<tr class="sub"><td colspan=5>{co(4)} E. Taxes and Other Government Fees</td></tr>
{row(["01 Recording fees — Deed $60.00 · Mortgage $60.00","$120.00","","",""])}{row(["02 State recordation tax","$1,400.00","","$1,400.00",""])}{row(["03 State transfer tax","$1,000.00","","$1,000.00",""])}{row(["04 County transfer tax","$2,000.00","","$2,000.00",""])}
<tr class="sub"><td colspan=5>{co(5)} F. Prepaids</td></tr>
{row(["01 Homeowner's insurance premium (12 mo.)","$1,200.00","","",""])}{row([f"02 Prepaid interest ({m(d['perdiem'])} per day from 11/20/26 to 12/1/26)",m(d['prepaid_int']),"","",""])}
<tr class="sub"><td colspan=5>{co(6)} G. Initial Escrow Payment at Closing</td></tr>
{row(["01 Homeowner's insurance $100.00 per month for 2 mo.","$200.00","","",""])}{row(["02 Property taxes $400.00 per month for 3 mo.","$1,200.00","","",""])}{row(["03 Aggregate adjustment","–$200.00","","",""])}
<tr class="sub"><td colspan=5>{co(7)} H. Other</td></tr>
{row(["01 Title – Owner's title insurance (optional)",m(d['cd_owner']),"","",""])}{row(["02 Real estate commission – listing broker","","","$10,000.00",""])}{row(["03 Real estate commission – buyer's broker","","","$10,000.00",""])}{row(["04 Home warranty","","","$550.00",""])}{row(["05 Title – Seller settlement fee","","","$295.00",""])}{row(["06 Deed preparation (attorney)","","","$150.00",""])}
<tr class="tot"><td>I. TOTAL OTHER COSTS (Borrower-Paid) {m(d['I_b'])}</td><td>{m(d['I_b'])}</td><td></td><td></td><td></td></tr>
<tr class="tot"><td>{co(8)} J. TOTAL CLOSING COSTS (Borrower-Paid) {m(d['J_b_total'])}</td><td>{m(d['J_b_at'])}</td><td>{m(d['B_bf'])}</td><td>{m(d['J_s'])}</td><td></td></tr>
{row(["Lender Credits","","","",""])}
</table>'''

p2x = callouts([
 ("A. Origination Charges.", "The lender's own fees: points, application and underwriting. <b>Zero tolerance</b>: they can't go up from the Loan Estimate."),
 ("B. Services the borrower could not shop for.", "Third-party services the lender picks (appraisal, credit report, flood certification). The appraisal and credit report were paid <b>before closing</b>, so they sit in that column and are subtracted on page 3. Zero tolerance when the lender chose the provider."),
 ("C. Services the borrower did shop for.", "Usually our title charges and the survey. Every title fee starts with <b>\"Title –\"</b> and is listed alphabetically. Notice the lender's title insurance shows <b>$1,740.00</b>, the full lender's rate, not the $35 simultaneous-issue fee we actually charge. That's how the federal rules make lenders disclose it (see callout 7)."),
 ("E. Taxes and Other Government Fees.", "Recording fees and transfer and recordation taxes. Here buyer and seller split the taxes 50/50, as the contract says. On a first-time Maryland homebuyer deal, the seller pays the state transfer tax. Recording fees fall under the <b>10% tolerance</b>, transfer taxes under zero tolerance."),
 ("F. Prepaids.", "Paid up front for the future: a year of homeowner's insurance and <b>prepaid interest</b> from closing to the end of the month. Prepaid interest = per diem × days. Closing later in the month means less prepaid interest."),
 ("G. Initial Escrow.", "Money that starts the borrower's escrow account so the lender can pay taxes and insurance when due. The aggregate adjustment is a required true-up so the lender doesn't over-collect."),
 ("H. Other.", "Everything else: commissions, home warranty, seller title fees, and the <b>owner's title policy, which must say \"(optional)\"</b>. It shows $595.00, not the $2,300.00 we charge, because the federal formula is <i>owner's premium + simultaneous fee − full lender's premium</i> = $2,300 + $35 − $1,740. The total title cost is the same either way: $3,500.00."),
 ("J. Total Closing Costs.", "Borrower total (at closing plus before closing) and the seller's total. The borrower's J carries to page 1 and page 3."),
])

# ---------------- CD PAGE 3 ----------------
p3 = f'''<div class="fhead"><b>Calculating Cash to Close</b><span>Page 3 of 5</span></div>
<p class="fsmall">{co(1)} Use this table to see what has changed from your Loan Estimate.</p>
<table class="ft cc"><tr><th></th><th>Loan Estimate</th><th>Final</th><th>Did this change?</th></tr>
{row(["Total Closing Costs (J)","$14,700.00",m(d['J_b_total']),"YES • See Total Loan Costs (D) and Total Other Costs (I)"])}
{row(["Closing Costs Paid Before Closing","$0","–$715.00","YES • You paid these Closing Costs before closing"])}
{row(["Closing Costs Financed (Paid from your Loan Amount)","$0","$0","NO"])}
{row(["Down Payment / Funds from Borrower","$40,000.00","$40,000.00","NO"])}
{row(["Deposit","–$10,000.00","–$10,000.00","NO"])}
{row(["Funds for Borrower","$0","$0","NO"])}
{row(["Seller Credits","–$5,000.00","–$5,000.00","NO"])}
{row(["Adjustments and Other Credits","$2,850.00","$2,960.10","YES • See details in Sections K and L"])}
<tr class="tot"><td>Cash to Close</td><td>$42,550.00</td><td>{m(d['cash_to_close'])}</td><td></td></tr></table>
<div class="fhead" style="margin-top:12px"><b>Summaries of Transactions</b></div>
<div class="fgrid2">
<div>{co(2)}<h5>Borrower's Transaction</h5><table class="ft">
<tr class="sub"><td colspan=2>K. Due from Borrower at Closing — {m(d['K'])}</td></tr>
{row(["01 Sale Price of Property",m(d['price'])])}{row(["03 Closing Costs Paid at Closing (J)",m(d['J_b_at'])])}
<tr class="sub"><td colspan=2>{co(3)} Adjustments for Items Paid by Seller in Advance</td></tr>
{row(["County taxes 11/20/26 to 06/30/27",m(d['tax_prorate'])])}{row(["HOA dues 11/20/26 to 11/30/26",m(d['hoa_prorate'])])}
<tr class="sub"><td colspan=2>L. Paid Already by or on Behalf of Borrower — {m(d['L'])}</td></tr>
{row(["01 Deposit","$10,000.00"])}{row(["02 Loan Amount",m(d['loan'])])}{row(["05 Seller Credit","$5,000.00"])}
<tr class="tot"><td>Cash to Close ☒ From ☐ To Borrower</td><td>{m(d['cash_to_close'])}</td></tr></table></div>
<div>{co(4)}<h5>Seller's Transaction</h5><table class="ft">
<tr class="sub"><td colspan=2>M. Due to Seller at Closing — {m(d['M'])}</td></tr>
{row(["01 Sale Price of Property",m(d['price'])])}{row(["County taxes 11/20/26 to 06/30/27",m(d['tax_prorate'])])}{row(["HOA dues 11/20/26 to 11/30/26",m(d['hoa_prorate'])])}
<tr class="sub"><td colspan=2>N. Due from Seller at Closing — {m(d['N'])}</td></tr>
{row(["02 Closing Costs Paid at Closing (J)",m(d['J_s'])])}{row(["{0} Payoff of First Mortgage Loan".format(co(5)),m(d['payoff'])])}{row(["07 Seller Credit","$5,000.00"])}
<tr class="tot"><td>Cash ☐ From ☒ To Seller</td><td>{m(d['cash_to_seller'])}</td></tr></table></div></div>'''

p3x = callouts([
 ("Calculating Cash to Close.", "Compares each piece of cash to close against the Loan Estimate and explains any change. The rows add up to cash to close: $15,053.04 − $715.00 + $40,000.00 − $10,000.00 − $5,000.00 + $2,960.10 = <b>$42,298.14</b>."),
 ("Borrower's Transaction.", "<b>K</b> is everything the buyer owes (price, closing costs, adjustments). <b>L</b> is everything already paid or credited (deposit, loan, seller credit). <b>K − L = cash to close.</b>"),
 ("Prorations (adjustments).", "Maryland property taxes run on a July 1–June 30 year and are usually paid in advance. The seller already paid the whole year, so the buyer reimburses the seller from the closing date through June 30: $4,800 ÷ 365 × 223 days = $2,932.60. The same idea applies to HOA dues and ground rent. Check the dates and the math on every file."),
 ("Seller's Transaction.", "<b>M</b> is what the seller is owed; <b>N</b> is what comes out of their proceeds (their closing costs, payoffs, credits to the buyer). <b>M − N = seller's proceeds.</b> The seller usually gets their own seller-only Closing Disclosure from us."),
 ("Payoffs.", "The seller's mortgage payoff must match a written payoff statement good through the disbursement date, including the per diem. An old or verbal payoff is a common way money gets short."),
])

# ---------------- CD PAGES 4-5 ----------------
p45 = f'''<div class="fhead"><b>Additional Information About This Loan</b><span>Page 4 of 5</span></div>
<h5>{co(1)} Loan Disclosures</h5>
<table class="ft wide">{row(["Assumption","☒ will not allow assumption of this loan on the original terms"])}{row(["Demand Feature","☒ does not have a demand feature"])}{row(["Late Payment","If any payment is more than 15 days late, a fee of 5% of the monthly principal and interest"])}{row(["Negative Amortization","☒ do not have a negative amortization feature"])}{row(["Partial Payments","☒ may hold partial payments until you pay the rest"])}{row(["Security Interest","You are granting a security interest in 123 Sample Lane, Anytown, MD 21000"])}</table>
<h5>{co(2)} Escrow Account</h5>
<table class="ft wide">{row(["Escrowed Property Costs over Year 1","$6,000.00 — homeowner's insurance, property taxes"])}{row(["Non-Escrowed Property Costs over Year 1","$900.00 — HOA dues"])}{row(["Initial Escrow Payment","$1,200.00"])}{row(["Monthly Escrow Payment","$500.00"])}</table>
<div class="fhead" style="margin-top:12px"><b>Loan Calculations</b><span>Page 5 of 5</span></div>
<table class="ft wide">{row([co(3)+" Total of Payments",m(d['top'])])}{row(["Finance Charge",m(d['fin_charge'])])}{row(["Amount Financed",m(d['amt_fin'])])}{row(["Annual Percentage Rate (APR)",f"{d['apr']:.3f}%"])}{row(["Total Interest Percentage (TIP)",f"{d['tip']:.3f}%"])}</table>
<h5>{co(4)} Contact Information</h5>
<table class="ft wide"><tr><th></th><th>Lender</th><th>Real Estate Broker (B)</th><th>Real Estate Broker (S)</th><th>Settlement Agent</th></tr>
{row(["Name","Example Mortgage Co.","Buyer Side Realty","Listing Side Realty","Sample Title &amp; Escrow"])}{row(["License / NMLS ID","NMLS 000000","MD 00001","MD 00002","MD 00003"])}{row(["Contact","Pat Lee","Sam Ortiz","Dana Fox","(our closer)"])}</table>
<h5>{co(5)} Confirm Receipt</h5><p class="fsmall">By signing, you are only confirming that you have received this form. Borrower ______ Date ____ Co-Borrower ______ Date ____</p>'''

p45x = callouts([
 ("Loan Disclosures.", "Plain-language features of the loan: whether a buyer could assume it, late fee terms, how partial payments are handled. Mostly the lender's responsibility, but read them so you can answer basic questions."),
 ("Escrow Account.", "What the lender will pay from escrow (taxes, insurance) versus what the borrower pays directly (here, HOA dues). The initial escrow payment must match page 2, section G."),
 ("Loan Calculations.", "Federal cost-of-credit figures. <b>APR</b> is higher than the 6.25% note rate because it spreads certain fees (points, underwriting, prepaid interest) over the loan. If the APR goes up more than 1/8% after the borrower received the CD, a new CD and a <b>new 3-business-day wait</b> are required. These numbers are the lender's to calculate, not ours."),
 ("Contact Information.", "Names, license and NMLS numbers. Check that our company, license number and closer's name are correct. Lenders get this wrong more than you'd expect."),
 ("Confirm Receipt.", "Signing only confirms the borrower received the form; it isn't agreement to the loan. The lender may require the signed CD back in the closing package."),
])

# ---------------- ALTA ----------------
def ar(lbl, sd="", sc="", bd="", bc="", cls=""):
    return row([lbl, sd, sc, bd, bc], cls)
alta = f'''<div class="fhead"><b>ALTA Combined Settlement Statement</b><span>File CLA-26-1188</span></div>
<div class="fgrid2 fsmall" style="margin-bottom:8px"><div>{co(1)} <b>Settlement agent:</b> Sample Title &amp; Escrow<br><b>Property:</b> 123 Sample Lane, Anytown, MD 21000<br><b>Buyer:</b> Maria &amp; James Carter · <b>Seller:</b> Robert Ellis</div><div><b>Lender:</b> Example Mortgage Co.<br><b>Settlement date:</b> 11/20/2026 · <b>Disbursement date:</b> 11/20/2026</div></div>
<table class="ft cc"><tr><th>{co(2)} Description</th><th>Seller Debit</th><th>Seller Credit</th><th>Borrower Debit</th><th>Borrower Credit</th></tr>
<tr class="sec"><td colspan=5>Financial</td></tr>
{ar("Sale price of property","",m(d['price']),m(d['price']),"")}{ar("Deposit","","","","$10,000.00")}{ar("Loan amount","","","",m(d['loan']))}{ar("Seller credit (closing costs)","$5,000.00","","","$5,000.00")}
<tr class="sec"><td colspan=5>{co(3)} Prorations / Adjustments</td></tr>
{ar("County taxes 11/20/26 to 06/30/27","",m(d['tax_prorate']),m(d['tax_prorate']),"")}{ar("HOA dues 11/20/26 to 11/30/26","",m(d['hoa_prorate']),m(d['hoa_prorate']),"")}
<tr class="sec"><td colspan=5>{co(4)} Loan Charges to Example Mortgage Co.</td></tr>
{ar("Points (0.5% of loan amount)","","","$1,800.00","")}{ar("Application / underwriting fee","","","$995.00","")}{ar("Flood certification","","","$10.00","")}{ar("Tax service fee","","","$85.00","")}{ar("Appraisal fee — POC by borrower $650.00","","","","")}{ar("Credit report — POC by borrower $65.00","","","","")}{ar(f"Prepaid interest {m(d['perdiem'])}/day 11/20/26–12/1/26","","",m(d['prepaid_int']),"")}
<tr class="sec"><td colspan=5>Impounds (escrow)</td></tr>
{ar("Homeowner's insurance 2 mo. @ $100.00","","","$200.00","")}{ar("Property taxes 3 mo. @ $400.00","","","$1,200.00","")}{ar("Aggregate adjustment","","","–$200.00","")}
<tr class="sec"><td colspan=5>{co(5)} Title Charges &amp; Escrow / Settlement Charges</td></tr>
{ar("Owner's title insurance (coverage $400,000)","","",m(d['owners_full']),"")}{ar("Lender's title insurance (coverage $360,000) — simultaneous","","","$35.00","")}{ar("Settlement fee","$295.00","","$595.00","")}{ar("Examination fee","","","$250.00","")}{ar("Abstract / search","","","$175.00","")}{ar("Endorsements","","","$100.00","")}{ar("Closing protection letter","","","$45.00","")}{ar("Deed preparation (attorney)","$150.00","","","")}
<tr class="sec"><td colspan=5>Commission</td></tr>
{ar("Listing broker – Listing Side Realty","$10,000.00","","","")}{ar("Buyer's broker – Buyer Side Realty","$10,000.00","","","")}
<tr class="sec"><td colspan=5>Government Recording and Transfer Charges</td></tr>
{ar("Recording fees (deed $60.00, deed of trust $60.00)","","","$120.00","")}{ar("State recordation tax","$1,400.00","","$1,400.00","")}{ar("State transfer tax","$1,000.00","","$1,000.00","")}{ar("County transfer tax","$2,000.00","","$2,000.00","")}
<tr class="sec"><td colspan=5>{co(6)} Payoff(s)</td></tr>
{ar("Payoff – Old Bank, loan #…4411 (incl. per diem through 11/20)",m(d['payoff']),"","","")}
<tr class="sec"><td colspan=5>Miscellaneous</td></tr>
{ar("Homeowner's insurance premium – Sample Insurance Co.","","","$1,200.00","")}{ar("Survey – Sample Surveyors","","","$350.00","")}{ar("Home warranty – Sample Warranty Co.","$550.00","","","")}
<tr class="tot"><td>Subtotals</td><td>{m(d['N'])}</td><td>{m(d['M'])}</td><td>{m(d['K'])}</td><td>{m(d['L'])}</td></tr>
<tr class="tot"><td>{co(7)} Due From Borrower</td><td></td><td></td><td></td><td>{m(d['cash_to_close'])}</td></tr>
<tr class="tot"><td>Due To Seller</td><td>{m(d['cash_to_seller'])}</td><td></td><td></td><td></td></tr>
<tr class="tot"><td>Totals</td><td>{m(d['M'])}</td><td>{m(d['M'])}</td><td>{m(d['K'])}</td><td>{m(d['K'])}</td></tr></table>
<p class="fsmall">{co(8)} Buyer ______ Seller ______ Settlement Agent ______ — We have reviewed this statement and authorize disbursement as shown.</p>'''

altax = callouts([
 ("Header.", "Who, what and when: settlement agent, property, parties, lender, settlement and disbursement dates. It must match the CD and the contract."),
 ("Four columns.", "Every dollar shows as a <b>debit</b> (money a party owes or pays) or a <b>credit</b> (money a party receives or already paid) for the seller and the borrower. The sale price is a <b>credit</b> to the seller and a <b>debit</b> to the borrower: the same dollars, two sides."),
 ("Prorations.", "The same tax and HOA adjustments as page 3 of the CD, shown as a seller credit and a borrower debit."),
 ("Loan charges.", "The lender's fees, matching CD sections A and B. Items paid outside of closing are marked <b>POC</b> (paid outside closing) and kept out of the columns, which is why the appraisal and credit report show no amount here."),
 ("Title charges.", "The <b>actual</b> premiums: owner's $2,300.00 and lender's $35.00 (simultaneous issue). Compare the CD: lender's $1,740.00 and owner's $595.00. Different presentation, <b>same $3,500.00 total</b>. Settlement fees can be split between buyer and seller."),
 ("Payoffs.", "Each lien being paid, with the loan number and the per diem through the disbursement date. This is what we actually wire out."),
 ("Bottom line.", "<b>Due From Borrower $42,298.14</b> and <b>Due To Seller $190,114.77</b>, exactly the CD's cash to close and cash to seller. The statement balances: each side's debit column equals its credit column."),
 ("Signatures.", "Buyer and seller sign to approve, and we disburse <b>only</b> what's shown. If it isn't on the signed statement, it doesn't get paid."),
])

# ---------------- reconciliation ----------------
recon = '''<table class="lt"><tr><th>Check</th><th>Closing Disclosure</th><th>ALTA statement</th><th>Match?</th></tr>
<tr><td>Cash from borrower</td><td>$42,298.14 (page 1 &amp; 3)</td><td>Due From Borrower $42,298.14</td><td>✓ Must match exactly</td></tr>
<tr><td>Cash to seller</td><td>$190,114.77 (seller CD)</td><td>Due To Seller $190,114.77</td><td>✓ Must match exactly</td></tr>
<tr><td>Lender's title insurance</td><td>$1,740.00 (section C)</td><td>$35.00</td><td>Different on purpose</td></tr>
<tr><td>Owner's title insurance</td><td>$595.00 (section H, "optional")</td><td>$2,300.00</td><td>Different on purpose</td></tr>
<tr><td>Total title premiums</td><td>$2,335.00</td><td>$2,335.00</td><td>✓ Must match</td></tr>
<tr><td>Appraisal / credit report</td><td>"Before closing" column</td><td>Marked POC, no amount in columns</td><td>✓ Same money, shown differently</td></tr>
<tr><td>Prorations, payoffs, commissions</td><td>Sections K–N</td><td>Prorations, payoffs, commission sections</td><td>✓ Must match line for line</td></tr></table>'''

LESSONS = [
{"id":"C01","s":"CD","t":"What the Closing Disclosure is and when it's used","m":7,
 "body": f'''{SAMPLE}
<p>The <b>Closing Disclosure (CD)</b> is a 5-page federal form the <b>lender</b> gives the borrower before closing. It shows the final loan terms and every closing cost. It came from the federal "Know Before You Owe" rules (often called <b>TRID</b>), which replaced the old HUD-1 and Good Faith Estimate in October 2015.</p>
<h4>What it's for</h4>
<ul>
<li>Gives the borrower the <b>final numbers</b> in a standard format so there are no surprises at the table.</li>
<li>Lets the borrower <b>compare</b> against the <b>Loan Estimate</b> they received when they applied.</li>
<li>Enforces <b>tolerances</b>: limits on how much certain costs can rise from the Loan Estimate.</li>
</ul>
<h4>Timing rules everyone must know</h4>
<ul>
<li>The borrower must <b>receive</b> the CD at least <b>3 business days before closing</b>.</li>
<li>A <b>new</b> 3-day wait is required only if: the APR rises beyond tolerance (more than 1/8% on most fixed loans), the loan product changes (say, fixed to adjustable), or a prepayment penalty is added.</li>
<li>Other changes (a fee, a credit, a proration) just need a corrected CD at or before closing, with no new wait.</li>
<li>After closing, a corrected CD goes out within <b>30 days</b> if amounts changed, and refunds for tolerance violations within <b>60 days</b>.</li>
</ul>
<h4>Who does what</h4>
<p>The <b>lender</b> owns the CD. Many lenders prepare it themselves; some ask the settlement agent to fill in the settlement side. As the title company, we send the lender our fees, taxes, prorations and payoffs, then <b>check the CD against our numbers</b>. We also prepare a separate <b>seller CD</b> showing only the seller's side.</p>
<h4>Tolerances: how much costs can change</h4>
<table class="lt"><tr><th>Tolerance</th><th>Which costs</th></tr>
<tr><td><b>Zero</b>: can't go up</td><td>The lender's own charges, services from a provider the lender required, transfer taxes</td></tr>
<tr><td><b>10% total</b></td><td>Recording fees, and third-party services the borrower picked from the lender's list (often title and settlement)</td></tr>
<tr><td><b>No limit</b></td><td>Prepaids, initial escrow, services the borrower shopped for on their own, the optional owner's title policy</td></tr></table>
<h4>When there's NO Closing Disclosure</h4>
<p><b>Cash deals</b> (no loan), <b>commercial or business-purpose loans</b>, <b>HELOCs</b> and <b>reverse mortgages</b> (which still use the HUD-1) don't get a CD. In those cases the <b>ALTA settlement statement</b> (or HUD-1) is the main closing statement.</p>''',
 "keys":[["Who issues the CD","The lender"],["Must be received","3 business days before closing"],["New 3-day wait","APR up beyond tolerance, product change, prepayment penalty added"],["Replaced","HUD-1 and GFE (Oct. 2015, TRID)"],["No CD for","Cash, commercial, HELOC, reverse mortgage"]],
 "traps":["A fee change alone does NOT restart the 3-day clock.","The title company doesn't own the CD, but we're responsible for checking our numbers on it."],
 "qs":["CQ01","CQ02","CQ03","CQ04","CQ05"]},
{"id":"C02","s":"CD","t":"Page 1: loan terms, payments and the two big totals","m":8,"body": SAMPLE + split(p1, p1x),
 "keys":[["Closing vs. disbursement date","Signing vs. paying out"],["Names","Borrowers match loan docs; sellers match vesting deed"],["Cash to Close","Must match our settlement statement to the penny"]],
 "traps":["A name spelled differently from the vesting deed must be fixed before closing.","On a primary-residence refi, the disbursement date can't fall inside the 3-day right to cancel."],
 "qs":["CQ06","CQ07","CQ08","CQ09"]},
{"id":"C03","s":"CD","t":"Page 2: closing cost details (sections A–J)","m":12,"body": SAMPLE + split(p2, p2x),
 "keys":[["A–D","Loan costs"],["E–I","Other costs"],["J","Total closing costs"],["Title fees","Start with \"Title –\" and are listed alphabetically"],["CD owner's premium","Owner's + simultaneous − full lender's"]],
 "traps":["The CD's lender and owner's title amounts won't match our invoice. That's correct; check that the TOTAL matches.","The owner's policy must be labeled \"(optional)\"."],
 "qs":["CQ10","CQ11","CQ12","CQ13","CQ14","CQ15"]},
{"id":"C04","s":"CD","t":"Page 3: cash to close and the summaries of transactions","m":10,"body": SAMPLE + split(p3, p3x),
 "keys":[["Borrower cash to close","K − L"],["Seller proceeds","M − N"],["MD property tax year","July 1 – June 30, usually paid in advance"],["Payoffs","Written, good through the disbursement date"]],
 "traps":["Proration dates are the #1 math error: confirm who owns the closing day and the end date of the tax year.","A payoff that expires before disbursement will leave the wire short."],
 "qs":["CQ16","CQ17","CQ18","CQ19"]},
{"id":"C05","s":"CD","t":"Pages 4–5: loan disclosures, calculations and contacts","m":7,"body": SAMPLE + split(p45, p45x),
 "keys":[["APR vs. rate","APR includes certain fees, so it's higher"],["APR increase over 1/8%","New CD and new 3-day wait"],["Our part on page 5","Our company, license number and closer"]],
 "traps":["Signing the CD only confirms receipt.","The loan calculations are the lender's numbers. Don't try to recompute or change them."],
 "qs":["CQ20","CQ21","CQ22"]},
{"id":"C06","s":"AL","t":"The ALTA Settlement Statement: what it is and how to read it","m":12,
 "body": SAMPLE + '''<p>The <b>ALTA Settlement Statement</b> is the title company's own <b>itemized accounting of every dollar</b> in the transaction: what comes in, what goes out, and to whom. The American Land Title Association publishes standard versions so statements look the same from company to company.</p>
<h4>Why we use it when there's already a CD</h4>
<ul>
<li>The CD is the <b>lender's</b> federal disclosure about the <b>loan</b>. The ALTA is <b>our</b> disbursement record for the <b>whole deal</b>, with the exact payees, payoff details and actual title premiums.</li>
<li>We <b>disburse from the signed ALTA statement</b>. It's also what agents and attorneys review, and what lenders and investors often request.</li>
<li>On cash, commercial and other non-CD deals, it's <b>the</b> closing statement.</li>
</ul>
<h4>The four versions</h4>
<p><b>Combined</b> (buyer and seller on one page), <b>Seller</b> only, <b>Buyer/Borrower</b> only, and <b>Cash</b> (no loan). Most companies give each side its own version so buyer and seller don't see each other's private details.</p>''' + split(alta, altax),
 "keys":[["Who prepares it","The settlement agent (us)"],["Debit","What a party owes or pays"],["Credit","What a party receives or already paid"],["POC","Paid outside closing: shown but not in the columns"],["We disburse from","The signed settlement statement"]],
 "traps":["The sale price is a seller CREDIT and a borrower DEBIT.","The ALTA shows the ACTUAL title premiums, not the CD's federal presentation."],
 "qs":["CQ23","CQ24","CQ25","CQ26","CQ27"]},
{"id":"C07","s":"RV","t":"Side by side: reconciling the CD and the ALTA","m":10,
 "body": SAMPLE + '''<p>Before every closing, someone has to <b>balance the CD against our settlement statement</b>. The lender won't fund, and we won't disburse, if they disagree on cash to close.</p>
<h4>What must match and what can differ</h4>''' + recon + '''
<h4>Pre-closing review checklist</h4>
<ol>
<li><b>Names and property:</b> borrowers match the loan documents and the new deed; sellers match the vesting deed; the address and county are right.</li>
<li><b>Dates:</b> closing and disbursement dates are correct. For a primary-residence refi, disbursement is after the 3-business-day right to cancel.</li>
<li><b>Sale price, loan amount, deposit and seller credit</b> match the contract, any addenda and the lender's instructions.</li>
<li><b>Title fees</b> match our rate filing (including any reissue discount), and the CD shows lender's and owner's premiums the federal way.</li>
<li><b>Taxes:</b> recordation and transfer taxes are calculated correctly and split as the contract says (seller pays the state transfer tax for a first-time Maryland homebuyer).</li>
<li><b>Prorations:</b> right tax year, right days, right direction (who reimburses whom).</li>
<li><b>Payoffs:</b> from current written statements, with per diem through disbursement, and every lien on the title commitment is accounted for.</li>
<li><b>Commissions</b> match the listing agreement and the broker's commission instructions.</li>
<li><b>Bottom line:</b> cash to close and cash to seller match exactly between the CD and the ALTA, and the statement balances.</li>
</ol>
<h4>Common errors that delay closings</h4>
<ul>
<li>The lender used an old title quote, or showed title fees our way instead of the federal way, so the CD doesn't tie out.</li>
<li>A seller credit or lender credit is on one form and not the other.</li>
<li>Proration figured on the wrong tax year or wrong number of days.</li>
<li>A payoff expired or missing a second lien (HELOC, judgment).</li>
<li>Recording fees or transfer taxes estimated instead of calculated.</li>
</ul>
<p>When the forms don't match, <b>don't change the lender's CD yourself</b>. Send the lender the corrected figures in writing and get an updated CD.</p>''',
 "keys":[["Must match exactly","Cash from borrower, cash to seller"],["Can differ","Lender's and owner's title premiums (but not their total)"],["Mismatch fix","Send the lender corrected figures in writing"]],
 "traps":["Matching totals but different title line items is normal; different cash to close is not.","Never edit the lender's CD yourself."],
 "qs":["CQ28","CQ29","CQ30","CQ31","CQ32"]}
]

Q = [
("CQ01","CD","Who is responsible for issuing the Closing Disclosure to the borrower?",["The title company","The lender","The real estate agent","The seller"],1,"The CD is the lender's federal disclosure. The title company supplies figures and checks them."),
("CQ02","CD","How far in advance must the borrower receive the Closing Disclosure?",["At the closing table","1 business day","3 business days","10 calendar days"],2,"The borrower must receive the CD at least 3 business days before closing."),
("CQ03","CD","Two days before closing, the seller agrees to a $500 repair credit and the lender issues a corrected CD. Does closing have to move?",["Yes, because any corrected CD starts a new 3-business-day wait", "No, a credit change doesn't restart the 3-day wait", "Yes, because the seller credit changes cash to close", "Only if the buyer objects to the corrected CD in writing"],1,"Only an APR increase beyond tolerance, a product change or an added prepayment penalty requires a new 3-day wait."),
("CQ04","CD","Which transaction would NOT have a Closing Disclosure?",["A financed purchase of a home","A refinance of a primary residence","An all-cash purchase","A purchase with an FHA loan"],2,"No loan means no CD. Cash deals use the ALTA settlement statement."),
("CQ05","CD","Which costs fall under zero tolerance and can't increase from the Loan Estimate?",["Prepaid interest","The lender's own origination charges","Homeowner's insurance premium","Services the borrower shopped for on their own"],1,"The lender's own charges, required-provider services and transfer taxes are zero tolerance."),
("CQ06","CD","On page 1, the seller's name is spelled \"Robert Elis,\" but the vesting deed says \"Robert Ellis.\" What should happen?",["Nothing, since it's a minor typo","Have it corrected before closing","Fix it on the deed instead","Note it on the settlement statement only"],1,"Names must match the vesting deed and loan documents. Get it corrected before closing."),
("CQ07","CD","What is the difference between the closing date and the disbursement date on the CD?",["They are always the same date on every transaction", "Closing is the signing; disbursement is when money is paid out", "Closing is when funds arrive; disbursement is the signing", "Disbursement is the date the deed is recorded at the county"],1,"On a primary-residence refinance they differ by the 3-business-day right to cancel."),
("CQ08","CD","Where is the \"Cash to Close\" amount first shown on the CD?",["Page 1, Costs at Closing","Page 4, Loan Disclosures","Page 5, Loan Calculations","It isn't on the CD"],0,"Cash to Close appears on page 1 and is detailed on page 3."),
("CQ09","CD","In the sample, why does the projected monthly payment drop after year 9?",["The interest rate falls","Mortgage insurance ends","Escrow stops","The loan is paid off"],1,"The Projected Payments table shows mortgage insurance in years 1–9 only."),
("CQ10","CD","On page 2, which section lists the title company's fees in a typical file?",["A. Origination Charges (the lender's own fees)", "C. Services Borrower Did Shop For", "F. Prepaids (insurance and prepaid interest)", "G. Initial Escrow Payment at Closing"],1,"Title fees usually appear in C (or B if the borrower used the lender's required provider), each starting with \"Title –\"."),
("CQ11","CD","Our invoice shows owner's title $2,300 and lender's title $35 (simultaneous). What will the CD show?",["Owner's $2,300 and lender's $35, matching our invoice", "Lender's $1,740 and owner's $595", "Lender's $2,335 and owner's $0 (all shown as lender's)", "Owner's $2,335 and lender's $0 (all shown as owner's)"],1,"The CD shows the full lender's premium, and the owner's as owner's + simultaneous − full lender's: $2,300 + $35 − $1,740 = $595."),
("CQ12","CD","How must the owner's title policy be labeled on the CD?",["\"Required\"","\"(optional)\"","\"Seller-paid\"","It isn't shown"],1,"The owner's title policy goes in section H and must be marked optional."),
("CQ13","CD","Prepaid interest is $61.64 per day. Closing is 11/20 and the first interest period runs through 11/30 (11 days). What's the prepaid interest?",["$616.40","$678.04","$1,849.20","$61.64"],1,"$61.64 × 11 days = $678.04."),
("CQ14","CD","Which section holds money to start the borrower's escrow account?",["E","F","G","H"],2,"Section G is the initial escrow payment at closing."),
("CQ15","CD","Recording fees fall under which tolerance?",["Zero tolerance","10% cumulative tolerance","No limit","They aren't covered by tolerances"],1,"Recording fees and third-party services chosen from the lender's list share the 10% cumulative tolerance."),
("CQ16","CD","On page 3, how is the borrower's cash to close calculated in the Summaries of Transactions?",["L − K","K − L","M − N","K + L"],1,"K (due from borrower) minus L (paid already by or for the borrower)."),
("CQ17","CD","Maryland county taxes of $4,800 for July 1–June 30 were paid in full by the seller. Closing is November 20. Which is correct?",["The seller owes the buyer for July through November", "The buyer reimburses the seller through June 30", "No proration is needed when taxes are already paid", "The lender reimburses the seller from the escrow account"],1,"The seller prepaid the whole year, so the buyer reimburses the seller for the part of the year they'll own the home."),
("CQ18","CD","Where does the seller's mortgage payoff appear on the CD?",["Section K, due from borrower at closing", "Section L, paid already by or on behalf of the borrower", "Section N, due from seller", "Page 1, in the Loan Terms table"],2,"Payoffs reduce the seller's proceeds, so they're in N."),
("CQ19","CD","Why must a payoff be good through the disbursement date?",["So it covers the right per diem and the wire isn't short", "Because the Closing Disclosure expires after 10 days", "Because the owner's title policy requires a new statement", "It doesn't matter as long as the lender approves it"],0,"Interest accrues daily. An expired payoff can leave the loan unpaid and a lien on title."),
("CQ20","CD","Why is the APR higher than the note rate?",["It includes certain loan fees spread over the loan", "It includes property taxes and homeowner's insurance", "It includes the owner's title policy premium", "It doesn't; the APR and note rate are always the same"],0,"APR folds in finance charges like points and prepaid interest."),
("CQ21","CD","After the CD is delivered, the APR increases by more than 1/8%. What happens?",["Nothing, as long as the borrower already signed", "A corrected CD and a new 3-day wait", "Only the settlement statement needs to be updated", "The loan is cancelled and must be re-applied for"],1,"An APR increase beyond tolerance triggers a new 3-day waiting period."),
("CQ22","CD","What does the borrower's signature on the CD mean?",["They agree to the loan terms","They received the form","They waive the 3-day wait","They authorize disbursement"],1,"The CD states that signing only confirms receipt."),
("CQ23","AL","Who prepares the ALTA settlement statement?",["The lender that is making the loan", "The settlement agent (the title company)", "The listing agent for the seller", "The county land records office"],1,"It's the title company's itemized record of all funds."),
("CQ24","AL","On the ALTA statement, the sale price appears as:",["A debit to the seller and a credit to the borrower","A credit to the seller and a debit to the borrower","A credit to both","A debit to both"],1,"The seller receives the price (credit); the buyer pays it (debit)."),
("CQ25","AL","What does \"POC\" mean on a settlement statement?",["Paid outside closing","Price of contract","Proof of coverage","Payoff on completion"],0,"POC items are shown for disclosure but kept out of the columns because they weren't paid through closing."),
("CQ26","AL","Why do we need an ALTA statement on a financed deal that already has a CD?",["We don't; the CD replaces it on financed deals", "It's our disbursement record, with actual payees", "It replaces the deed as the record of the sale", "Lenders no longer accept Closing Disclosures"],1,"The CD is the lender's loan disclosure; the ALTA is our accounting and disbursement authority."),
("CQ27","AL","A seller asks you to pay his gardener $300 from proceeds after closing, but it isn't on the signed statement. What do you do?",["Pay it, since it comes from his own proceeds", "Pay it once he confirms the request by email", "Don't pay it; it isn't on the signed statement", "Add it to the statement afterward and pay it"],2,"We disburse only what's shown on the statement the parties signed."),
("CQ28","RV","Which two figures must match exactly between the CD and the ALTA statement?",["The lender's and owner's title premium line items", "Cash from borrower and cash to seller", "The APR and the note interest rate", "The recording fees and each transfer tax line"],1,"Line items like title premiums can be presented differently, but cash to close and seller proceeds must match exactly."),
("CQ29","RV","The CD shows lender's title $1,740 and owner's $595; our ALTA shows $35 and $2,300. What do you conclude?",["The CD is wrong and must be corrected before closing", "Normal, as long as the totals match", "Our title rates must have been entered incorrectly", "The buyer was overcharged and is owed a refund"],1,"TRID's disclosure method causes the difference. The total premium must match."),
("CQ30","RV","You find the CD's cash to close is $300 higher than our statement. What's the right fix?",["Edit the CD yourself so the numbers match", "Send the lender corrected figures in writing", "Close anyway and fix it after recording", "Change our statement so it matches the CD"],1,"The CD belongs to the lender; we provide corrected figures in writing and get a revised CD."),
("CQ31","RV","A first-time Maryland homebuyer is purchasing. The contract is silent on transfer taxes. Who pays the state transfer tax?",["The buyer","The seller","Split 50/50","The lender"],1,"For a qualified first-time Maryland homebuyer, the seller pays the state transfer tax by law."),
("CQ32","RV","Which is the most common cause of a CD and settlement statement not tying out?",["The deed was notarized by a different notary", "A credit, proration or payoff that doesn't match", "The buyer brought a cashier's check instead of a wire", "The survey arrived earlier than expected"],1,"Missing or mismatched credits, prorations, payoffs and title figures are the usual culprits."),
]
QUESTIONS = [{"id":i,"s":s,"q":q,"o":o,"a":a,"e":e} for i,s,q,o,a,e in Q]
out = """// Course: Reading the Closing Disclosure & ALTA Settlement Statement (draft).
// Generated from /home/claude/gen_cd.py: sample forms are recreated in HTML with a made-up loan.
(function(){
const SECTIONS = %s;
const LESSONS = %s;
const QUESTIONS = %s;
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
""" % (json.dumps({"CD":"Closing Disclosure","AL":"ALTA Settlement Statement","RV":"Reviewing & Reconciling"}), json.dumps(LESSONS, ensure_ascii=False, indent=0), json.dumps(QUESTIONS, ensure_ascii=False, indent=0))
import os; os.makedirs('courses/cd-alta', exist_ok=True)
open('courses/cd-alta/course.js','w').write(out)
print("ok", len(LESSONS), len(QUESTIONS))
