// Course: Taxes, Prorations & Recording Fees (draft).
// Rates come from CLA's closing-cost calculator fee sheet (CLA Fee Tables, live sheet; Nov 2026), which was checked
// against official state and county sources and confirmed by CLA recording (Melissa Gamble). Proration method matches the calculator.
(function(){
const SECTIONS = { PR: "Tax Prorations", RF: "Recording Fees", MD: "Maryland Transfer & Recordation Taxes", DV: "DC & Virginia Taxes", FL: "Florida Taxes & Putting It Together" };
const NOTE = '<p class="note">Rates are from CLA\'s fee calculator sheet (Nov 2026). Rates change; when in doubt, run the calculator at quotes.clatitle.com or ask recording.</p>';
const DO = items => '<div class="ex"><b>How to do it</b><ul style="margin:6px 0 0">' + items.map(i => '<li>' + i + '</li>').join('') + '</ul></div>';
const EX = h => '<div class="ex"><b>Example:</b> ' + h + '</div>';

const LESSONS = [
{id:"X01",s:"PR",t:"How tax prorations work",m:7,
 body: NOTE + `
<p>Property taxes cover a period of time. At closing we split that period: the <b>seller pays for the days they owned the house</b>, and the <b>buyer pays from closing day on</b>.</p>
<h4>The three rules CLA uses</h4>
<ul>
<li>The <b>seller owns every day through the day before closing</b>. The buyer owns closing day.</li>
<li>Use a <b>365-day year</b>: daily amount = annual tax ÷ 365.</li>
<li>Start from the <b>"paid through" date</b>, the last day the taxes are already paid for.</li>
</ul>
<table class="lt"><tr><th>If the taxes are…</th><th>Then…</th></tr>
<tr><td><b>Paid past closing</b> (paid ahead)</td><td>The buyer <b>credits the seller</b> for the days after closing that the seller already paid for. Seller credit, buyer debit.</td></tr>
<tr><td><b>Unpaid up to closing</b></td><td>The seller <b>owes the buyer</b> for the unpaid days the seller owned it. Seller debit, buyer credit.</td></tr></table>` +
EX(`Maryland, annual tax $7,300 ($20.00 a day). The bill is paid through June 30, 2027. Closing is February 15, 2027. The seller paid for February 15 through June 30, which is 136 days the buyer will own. The buyer credits the seller 136 × $20.00 = <b>$2,720.00</b>.`) + DO([
"Get the <b>real tax bill</b> or the lien certificate. Don't prorate from the listing.",
"Confirm the <b>paid-through date</b>. Don't assume the seller paid the last bill.",
"Watch for exemptions (homestead, senior) that end at the sale, and partial-year assessments on new construction."]),
 keys:[["Seller owns","Through the day before closing"],["Daily rate","Annual tax ÷ 365"],["Paid ahead","Buyer credits the seller"],["Unpaid","Seller owes the buyer"]],
 traps:["Giving the seller closing day.","Prorating from a listing figure instead of the actual bill."],
 qs:["XQ01","XQ02","XQ03","XQ04","XQ05"]},

{id:"X02",s:"PR",t:"Each state's tax year",m:8,
 body: NOTE + `
<table class="lt"><tr><th>State</th><th>Tax year and billing</th><th>What it usually means at closing</th></tr>
<tr><td><b>Maryland</b></td><td>July 1 – June 30, billed <b>in advance</b>. Owner-occupied homes pay in two halves, due <b>September 30</b> and <b>December 31</b>.</td><td>Taxes are usually paid ahead, so the buyer credits the seller.</td></tr>
<tr><td><b>DC</b></td><td>October 1 – September 30. Halves due <b>March 31</b> (Oct–Mar) and <b>September 15</b> (Apr–Sep).</td><td>Depends on the closing date. In the fall the seller often owes for the days since October 1.</td></tr>
<tr><td><b>Virginia</b></td><td>Calendar year, set by each locality. Fairfax-style: January–June due <b>July 28</b>, July–December due <b>December 5</b>.</td><td>Check the locality's due dates every time; they differ.</td></tr>
<tr><td><b>Florida</b></td><td>Calendar year, billed <b>in arrears</b> each November.</td><td>Before November, the current year is unpaid, so the seller owes from January 1 to the day before closing.</td></tr></table>` +
EX(`DC, annual tax $5,840 ($16.00 a day). Closing is November 20, 2026. The October–March half isn't due until March 31, so taxes are paid through September 30. The seller owes October 1 through November 19: 50 days × $16.00 = <b>$800.00</b>, charged to the seller and credited to the buyer.`) +
EX(`Florida, annual tax $4,380 ($12.00 a day). Closing is May 11, 2026. Nothing is paid for 2026 yet. The seller owes January 1 through May 10: 130 days × $12.00 = <b>$1,560.00</b>.`),
 keys:[["Maryland","Jul 1–Jun 30, paid in advance (Sep 30 / Dec 31)"],["DC","Oct 1–Sep 30 (Mar 31 / Sep 15)"],["Virginia","Calendar year; locality due dates vary"],["Florida","Calendar year, billed in arrears in November"]],
 traps:["Prorating DC on a calendar year.","Assuming Florida taxes are paid ahead like Maryland."],
 qs:["XQ06","XQ07","XQ08","XQ09"]},

{id:"X03",s:"PR",t:"Other prorations and what isn't a proration",m:5,
 body: NOTE + `
<p>Taxes aren't the only thing split by days. The same seller-through-the-day-before rule applies to:</p>
<ul>
<li><b>HOA and condo dues</b> paid in advance for the month or quarter.</li>
<li><b>Ground rent</b> in Maryland (usually paid twice a year).</li>
<li><b>Front foot benefit charges</b> and other annual charges in some Maryland counties.</li>
<li><b>Water and sewer</b> where the bill is a lien (Baltimore City, for example), or a DC Water final read.</li>
</ul>
<h4>Not a proration</h4>
<p>The lender's <b>initial escrow deposit</b> (the months of taxes and insurance the buyer funds into their new escrow account) is a <b>prepaid</b>, not a proration. It's on the lender's CD in Section G and doesn't involve the seller.</p>`,
 keys:[["HOA dues","Prorated like taxes"],["Lender's initial escrow","A prepaid (CD Section G), not a proration"]],
 traps:["Confusing the buyer's escrow deposit with the tax proration."],
 qs:["XQ10","XQ11","XQ12"]},

{id:"X04",s:"RF",t:"Recording fees",m:8,
 body: NOTE + `
<p>Each document recorded in the land records costs a <b>recording fee</b>. The buyer usually pays to record the deed and the new deed of trust; the seller pays to record the release of their old loan.</p>
<table class="lt"><tr><th>Where</th><th>Recording fees</th></tr>
<tr><td><b>Maryland</b></td><td>Deed <b>$60</b>; deed of trust <b>$60</b> for a principal residence (it's <b>$115</b> if not a principal residence; the deed stays $60); release <b>$50</b>; power of attorney <b>$20</b> (up to 9 pages) or <b>$75</b> (10+ pages). The $60 includes the $40 surcharge; POAs have no surcharge.</td></tr>
<tr><td><b>DC</b></td><td>Deed <b>$30</b>; deed of trust <b>$155</b>; release <b>$30</b>; POA <b>$30</b> (each includes the $5 surcharge).</td></tr>
<tr><td><b>Virginia</b></td><td>Per document, by pages: <b>$26</b> (1–10), <b>$40</b> (11–30), <b>$60</b> (31+). Add a <b>$20</b> processing fee on deeds, deeds of trust and releases, a <b>$3</b> open-space fee, and a <b>$1</b> transfer fee on deeds. Some rural counties add a $5 paper-filing fee.</td></tr>
<tr><td><b>Florida</b></td><td><b>$10</b> for the first page and <b>$8.50</b> for each additional page.</td></tr></table>` +
EX(`Florida: a 3-page deed is $10 + 2 × $8.50 = <b>$27.00</b>. An 18-page mortgage is $10 + 17 × $8.50 = <b>$154.50</b>.`) +
`<h4>CLA's quoting rule</h4>
<p>Quote recording fees <b>a little high rather than short</b>. Being over by $20–$50 is fine; we refund the difference after recording. Coming up short at the recorder's counter is not.</p>
<p>CLA also charges an <b>e-recording fee</b> ($4.75 per side through Simplifile) as its own fee, separate from the county's recording fee.</p>`,
 keys:[["MD deed / DOT (principal residence)","$60 each"],["MD release","$50"],["DC deed / DOT","$30 / $155"],["VA by pages","$26 / $40 / $60 + $20 processing"],["FL","$10 first page + $8.50 each additional"],["Quoting","A little high, never short"]],
 traps:["Quoting $60 for a Maryland deed of trust on an investment property.","Forgetting Virginia's $20 processing fee."],
 qs:["XQ13","XQ14","XQ15","XQ16","XQ17","XQ18"]},

{id:"X05",s:"MD",t:"Maryland transfer and recordation taxes: the basics",m:8,
 body: NOTE + `
<p>A Maryland purchase usually has three government taxes:</p>
<table class="lt"><tr><th>Tax</th><th>Rate</th><th>Usual payer</th></tr>
<tr><td><b>State transfer tax</b></td><td><b>0.5%</b> of the price</td><td>Split 50/50 by default; the contract can change it</td></tr>
<tr><td><b>County transfer tax</b></td><td>A percentage that varies by county (0% to 1.5% and up)</td><td>Split 50/50 by default</td></tr>
<tr><td><b>County recordation tax</b></td><td>So many dollars <b>per $500</b> of price, by county</td><td>Split 50/50 by default</td></tr></table>
<h4>Per $500 means round up</h4>
<p>Recordation is charged per $500 <b>or fraction</b>. Divide the price by 500 and round <b>up</b>.</p>` +
EX(`Prince George's County, $450,000 price, not a first-time buyer. State transfer 0.5% = $2,250. County transfer 1.4% = $6,300. Recordation $2.75 × 900 = $2,475. Total <b>$11,025</b>, split $5,512.50 each.`) +
EX(`Same county, $452,300 price. $452,300 ÷ 500 = 904.6, rounded up to 905. Recordation = 905 × $2.75 = <b>$2,488.75</b>.`) +
`<h4>First-time Maryland homebuyers</h4>
<ul>
<li>The state transfer tax drops to <b>0.25%</b>, and the <b>seller pays it</b>.</li>
<li>By default the <b>seller also pays</b> the county transfer and recordation taxes (the contract can say otherwise).</li>
<li>Some counties add an extra first-time-buyer exemption.</li>
</ul>
<h4>Refinances</h4>
<p>Recordation tax on a refinance is generally charged only on <b>new money</b> (the amount above the old loan's unpaid balance) when the original borrower still lives there. No transfer tax applies to a refinance.</p>`,
 keys:[["State transfer","0.5%, split by default"],["Recordation","Per $500 or fraction, round up"],["First-time buyer","State 0.25%, seller pays; seller pays county taxes by default"],["Refinance recordation","Only on new money (owner-occupant)"]],
 traps:["Rounding the $500 units down.","Charging the buyer half the taxes on a first-time-buyer file."],
 qs:["XQ19","XQ20","XQ21","XQ22","XQ23"]},

{id:"X06",s:"MD",t:"Maryland county rates CLA sees most",m:7,
 body: NOTE + `
<table class="lt"><tr><th>County</th><th>County transfer</th><th>Recordation (per $500)</th><th>Notes</th></tr>
<tr><td>Montgomery</td><td>1.0%</td><td>Tiered: $4.45 up to $500k, rising in steps above that</td><td>First $100,000 exempt from recordation for an owner-occupant. Use the calculator.</td></tr>
<tr><td>Prince George's</td><td>1.4%</td><td>$2.75</td><td></td></tr>
<tr><td>Anne Arundel</td><td>1.0% (1.5% over $1M)</td><td>$3.50</td><td></td></tr>
<tr><td>Howard</td><td>1.25%</td><td>$2.50</td><td></td></tr>
<tr><td>Baltimore County</td><td>1.5%</td><td>$2.50</td><td>First $22,000 exempt from transfer tax for an owner-occupant.</td></tr>
<tr><td>Baltimore City</td><td>1.5% (2.1% over $1M)</td><td>$5.00 ($5.75 over $1M)</td><td>Owner-occupant $22,000 exemption on recordation; on transfer only when the price is $249,900 or less.</td></tr>
<tr><td>Frederick</td><td>None</td><td>$7.00</td><td>Only the state transfer tax applies.</td></tr>
<tr><td>Charles</td><td>0.5%</td><td>$7.00</td><td></td></tr></table>
<p>Many smaller counties exempt the first $25,000–$50,000 for an owner-occupied home. The calculator has every county.</p>`,
 keys:[["Frederick","No county transfer tax; $7.00 recordation"],["Prince George's","1.4% / $2.75"],["Montgomery","1.0%; tiered recordation, $100k owner-occupant exemption"],["Baltimore City","1.5% / $5.00 (higher over $1M)"]],
 traps:["Adding a county transfer tax in Frederick.","Applying Baltimore City's $22,000 transfer exemption above $249,900."],
 qs:["XQ24","XQ25","XQ26","XQ27"]},

{id:"X07",s:"DV",t:"DC recordation and transfer taxes",m:6,
 body: NOTE + `
<table class="lt"><tr><th>Tax</th><th>Rate (residential)</th><th>Usual payer</th></tr>
<tr><td><b>Recordation tax</b></td><td>1.1% under $400,000; 1.45% at $400,000 and up</td><td>Buyer</td></tr>
<tr><td><b>Transfer tax</b></td><td>1.1% under $400,000; 1.45% at $400,000 and up</td><td>Seller</td></tr></table>
<p>DC applies the rate to the <b>whole price</b>, not just the part over $400,000.</p>` +
EX(`A $399,000 sale: 1.1% × $399,000 = $4,389 each. A $400,000 sale: 1.45% × $400,000 = <b>$5,800</b> each. One thousand dollars of price adds $1,411 of each tax.`) +
`<ul>
<li><b>First-time DC homebuyers</b> may qualify for a reduced <b>0.725%</b> recordation rate (price limit $794,000 for FY2027, plus income limits).</li>
<li>A residential refinance of 1–5 units is generally <b>exempt</b> from the deed of trust recordation tax, with the security interest affidavit attached.</li>
</ul>`,
 keys:[["DC recordation (buyer)","1.1% / 1.45% at $400k+"],["DC transfer (seller)","1.1% / 1.45% at $400k+"],["Whole price","Rate applies to the entire price"],["First-time buyer","0.725% recordation if eligible"]],
 traps:["Charging 1.45% only on the amount over $400,000.","Charging recordation tax on a residential refinance."],
 qs:["XQ28","XQ29","XQ30","XQ31"]},

{id:"X08",s:"DV",t:"Virginia recordation and grantor taxes",m:6,
 body: NOTE + `
<table class="lt"><tr><th>Tax</th><th>Rate</th><th>Payer</th></tr>
<tr><td>State recordation on the deed</td><td>$0.25 per $100 of price</td><td>Buyer</td></tr>
<tr><td>Local recordation on the deed</td><td>One-third of the state tax</td><td>Buyer</td></tr>
<tr><td>State + local recordation on the deed of trust</td><td>Same rates on the loan amount</td><td>Buyer</td></tr>
<tr><td>Refinance deed of trust</td><td>$0.18 per $100 state + $0.06 local</td><td>Borrower</td></tr>
<tr><td>Grantor tax</td><td>$0.50 per $500 of price (0.1%)</td><td>Seller</td></tr>
<tr><td>Northern Virginia fees</td><td>Congestion relief $0.10 per $100 + WMATA capital $0.10 per $100</td><td>Seller</td></tr>
<tr><td>Hampton Roads fee</td><td>$0.06 per $100</td><td>Seller</td></tr></table>` +
EX(`Fairfax County, $600,000 price, $480,000 loan. Buyer: deed state $1,500 + local $500; deed of trust state $1,200 + local $400. Seller: grantor tax $600 + congestion relief $600 + WMATA $600 = <b>$1,800</b>.`),
 keys:[["VA state recordation","$0.25 per $100 (buyer)"],["VA local","One-third of state"],["Grantor tax","$0.50 per $500 (seller)"],["NoVA fees","$0.10 + $0.10 per $100 (seller)"]],
 traps:["Charging the grantor tax to the buyer.","Missing the two Northern Virginia fees."],
 qs:["XQ32","XQ33","XQ34"]},

{id:"X09",s:"FL",t:"Florida documentary stamps and intangible tax",m:6,
 body: NOTE + `
<table class="lt"><tr><th>Tax</th><th>Rate</th><th>Customary payer</th></tr>
<tr><td>Doc stamps on the deed</td><td>$0.70 per $100 of price ($0.60 in Miami-Dade for a single-family home)</td><td>Seller</td></tr>
<tr><td>Doc stamps on the note</td><td>$0.35 per $100 of the loan</td><td>Buyer</td></tr>
<tr><td>Intangible tax on the mortgage</td><td>0.2% (2 mills) of the loan, no rounding</td><td>Buyer</td></tr></table>` +
EX(`$400,000 price, $320,000 loan. Deed stamps $2,800 (seller). Note stamps $1,120 and intangible tax $640 (buyer).`) +
`<p>On a Florida refinance, note stamps and intangible tax are charged on the full new loan unless it qualifies as a renewal of the existing loan. Miami-Dade adds a surtax on deeds for property that isn't a single-family home.</p>`,
 keys:[["Deed stamps","$0.70 per $100 (seller)"],["Note stamps","$0.35 per $100 (buyer)"],["Intangible tax","0.2% of the loan (buyer)"]],
 traps:["Using $0.70 for a Miami-Dade single-family home.","Rounding the intangible tax."],
 qs:["XQ35","XQ36","XQ37"]},

{id:"X10",s:"FL",t:"Putting taxes and fees on the statement",m:5,
 body: NOTE + `
<ul>
<li>Transfer taxes and recording fees go in the <b>taxes and other government fees</b> section (Section E of the CD), on the buyer or seller side as the contract and local custom say.</li>
<li>Prorations go in the <b>adjustments</b> section, as a credit to one side and a debit to the other.</li>
<li>The <b>contract controls</b> who pays. The defaults in these lessons apply only when the contract is silent.</li>
<li><b>Maryland non-resident sellers:</b> Maryland requires withholding from the proceeds (8.75% for individuals, 8.25% for entities) unless the Comptroller issues a reduced-withholding certificate. Spot these sellers early.</li>
<li>Run every quote through the <b>calculator</b>, then check it against the lender's CD.</li>
</ul>`,
 keys:[["Taxes and recording fees","CD Section E"],["Prorations","Adjustments: credit one side, debit the other"],["Who pays","The contract controls"],["MD non-resident withholding","8.75% individual / 8.25% entity"]],
 traps:["Using local custom when the contract says otherwise.","Finding a non-resident seller the week of closing."],
 qs:["XQ38","XQ39","XQ40"]}
];

const Q = [
["XQ01","PR","Who owns the day of closing for prorations at CLA?",["The buyer", "The seller", "Whoever the lender chooses", "They split it 50/50"],0,"The seller owns through the day before closing; the buyer owns closing day."],
["XQ02","PR","Annual taxes are $7,300. What's the daily amount?",["$608.33", "$14.60", "$20.28", "$20.00"],3,"$7,300 ÷ 365 = $20.00."],
["XQ03","PR","Maryland taxes are paid through June 30. Closing is February 15. Who credits whom?",["The seller credits the buyer", "Nobody; Maryland doesn't prorate", "The lender credits the seller", "The buyer credits the seller"],3,"The seller paid ahead, so the buyer reimburses those days."],
["XQ04","PR","Using the same file ($20.00 a day, 136 days paid ahead), what's the credit to the seller?",["$1,360.00", "$2,720.00", "$2,700.00", "$2,740.00"],1,"136 × $20.00 = $2,720.00."],
["XQ05","PR","Where should the annual tax figure for a proration come from?",["The tax figure printed on the MLS listing sheet", "The actual tax bill or lien certificate", "The buyer's estimate", "Last year's appraisal"],1,"Prorate from the real bill."],
["XQ06","PR","What is Maryland's property tax year?",["April 1 – March 31", "October 1 – September 30", "July 1 – June 30, paid in advance", "Calendar year January to December, paid in arrears"],2,"Maryland bills July–June, in advance."],
["XQ07","PR","DC taxes are paid through September 30 and closing is November 20. How many days does the seller owe?",["49", "50", "51", "81"],1,"October 1 through November 19 is 50 days."],
["XQ08","PR","On a Florida closing in May, what usually happens with the current year's taxes?",["The buyer credits the seller for the rest of the year", "Nothing; Florida doesn't prorate", "The seller owes January 1 to the day before closing", "The seller owes the whole year"],2,"Florida bills in arrears in November, so the current year is unpaid."],
["XQ09","PR","Why check the locality on a Virginia proration?",["Each locality sets its own due dates", "The state collects all taxes", "Virginia doesn't tax homes", "Virginia prorates on a 360-day banker's year instead"],0,"Virginia localities set their own billing and due dates."],
["XQ10","PR","HOA dues are paid for the whole month. Closing is the 20th. How are they handled?",["Refunded by the association", "Paid entirely by the buyer", "Prorated like taxes", "Ignored; dues aren't prorated"],2,"Dues paid in advance are prorated."],
["XQ11","PR","The buyer funds 3 months of taxes into the lender's new escrow account. What is that?",["A tax proration between the buyer and the seller", "A transfer tax", "A recording fee", "A prepaid on the lender's CD"],3,"The initial escrow deposit is a prepaid (Section G), not a proration."],
["XQ12","PR","Which of these is usually prorated in Maryland?",["The lender's origination fee", "The recording fee", "Ground rent", "The owner's title policy"],2,"Ground rent is prorated like taxes."],
["XQ13","RF","What does Maryland charge to record a deed?",["$30", "$50", "$60", "$115"],2,"The Maryland deed fee is $60, including the $40 surcharge."],
["XQ14","RF","A Maryland deed of trust on an investment property (not a principal residence) records for how much?",["$50", "$115", "$155", "$60"],1,"It's $115 when not a principal residence."],
["XQ15","RF","What does DC charge to record a deed of trust?",["$60", "$155", "$30", "$26"],1,"DC charges $155 for a deed of trust, $30 for a deed."],
["XQ16","RF","What does Florida charge to record a 3-page deed?",["$10.00", "$27.00", "$30.00", "$25.50"],1,"$10 + 2 × $8.50 = $27.00."],
["XQ17","RF","A Virginia deed is 8 pages. Besides the $26 clerk fee, what fee applies to it?",["The $155 DOT fee", "The $20 processing fee", "Nothing else", "A $40 state surcharge, like Maryland's"],1,"Virginia adds a $20 processing fee (plus small open-space and transfer fees)."],
["XQ18","RF","What's CLA's rule when quoting recording fees?",["Leave them off the quote", "Quote a little high, never short", "Quote a little short, never high", "Quote exactly; refunds aren't allowed"],1,"Over by $20–$50 is fine and refunded; short is not."],
["XQ19","MD","What is Maryland's state transfer tax for a buyer who isn't a first-time buyer?",["0.5%, paid by the buyer", "1.0%, paid by the buyer", "0.5%, split by default", "0.25%, paid by the seller"],2,"0.5%, split 50/50 unless the contract says otherwise."],
["XQ20","MD","A Prince George's County price is $452,300. How many $500 units are used for recordation?",["905", "900", "904", "904.6"],0,"Per $500 or fraction: round 904.6 up to 905."],
["XQ21","MD","Prince George's, $450,000, not a first-time buyer. What's the total of the three taxes?",["$9,000", "$8,775", "$11,025", "$13,500"],2,"$2,250 + $6,300 + $2,475 = $11,025."],
["XQ22","MD","On a first-time Maryland homebuyer purchase, what's the state transfer tax?",["0.5%, split 50/50", "0.25%, paid by the seller", "0%, fully exempt", "0.25%, paid entirely by the buyer at closing"],1,"First-time buyers: 0.25%, and the seller pays it."],
["XQ23","MD","On a Maryland owner-occupied refinance by the original borrower, recordation tax is generally charged on what?",["The home's full assessed value on the tax roll", "Nothing; refinances are exempt", "The full new loan amount", "Only the new money above the old balance"],3,"Only new money is taxed."],
["XQ24","MD","Which county has no county transfer tax?",["Anne Arundel", "Frederick", "Prince George's", "Howard"],1,"Frederick has only the state transfer tax."],
["XQ25","MD","What's Prince George's County's transfer tax rate?",["1.4%", "1.5%", "1.0%", "0.5%"],0,"Prince George's charges 1.4%."],
["XQ26","MD","Montgomery County gives an owner-occupant what recordation break?",["Half the rate on the part over $500,000", "No recordation at all", "First $22,000 exempt", "First $100,000 exempt"],3,"The first $100,000 is exempt for an individual owner-occupant."],
["XQ27","MD","A Baltimore City owner-occupant buys at $300,000. Does the $22,000 transfer-tax exemption apply?",["Only for first-time buyers", "No, only at $249,900 or less", "Yes, but only to the state tax", "Yes, at any price"],1,"The transfer exemption applies only at $249,900 or less."],
["XQ28","DV","Who usually pays DC's recordation tax?",["Split 50/50", "The seller", "The lender", "The buyer"],3,"Recordation is the buyer's; transfer is the seller's."],
["XQ29","DV","A DC sale is $400,000. What's the recordation tax?",["$5,800", "$4,400", "$7,250", "$4,389"],0,"1.45% of the whole $400,000 = $5,800."],
["XQ30","DV","How does DC apply its higher rate at $400,000 and up?",["Only to condos", "To the whole price", "Only to the part over $400,000", "Only to the seller's tax"],1,"DC uses a whole-amount bracket."],
["XQ31","DV","A DC owner refinances a single-family home. Is deed of trust recordation tax due?",["Only if cash-out", "Generally no, with the affidavit attached", "Yes, 1.45% of the full new loan amount", "Yes, 1.1% of the loan"],1,"Residential 1–5 unit refinances are generally exempt with the affidavit."],
["XQ32","DV","Who pays Virginia's grantor tax?",["The buyer", "The lender", "The seller", "Split 50/50"],2,"Grantor tax is the seller's: $0.50 per $500."],
["XQ33","DV","A Fairfax sale is $600,000. What do the seller's grantor tax and two Northern Virginia fees total?",["$1,800", "$1,200", "$2,400", "$600"],0,"$600 + $600 + $600 = $1,800."],
["XQ34","DV","How is Virginia's local recordation tax figured?",["One-third of the state tax", "Equal to the state tax", "A flat $50 per document, set by the state", "Half of the state tax"],0,"Localities levy up to one-third of the state rate."],
["XQ35","FL","Who customarily pays Florida doc stamps on the deed?",["Split 50/50", "The lender", "The buyer", "The seller"],3,"Deed stamps are customarily the seller's."],
["XQ36","FL","A Florida loan is $320,000. What's the intangible tax?",["$1,120", "$2,240", "$640", "$320"],2,"0.2% × $320,000 = $640."],
["XQ37","FL","What's the deed stamp rate for a single-family home in Miami-Dade?",["$0.60 per $100", "$1.05 per $100", "$0.35 per $100", "$0.70 per $100"],0,"Miami-Dade single-family homes use $0.60."],
["XQ38","FL","Where do transfer taxes and recording fees go on the CD?",["Section G, initial escrow payment and prepaids", "Section A, origination charges", "Section E, taxes and other government fees", "The adjustments section"],2,"Government taxes and fees are Section E."],
["XQ39","FL","The contract says the buyer pays all transfer taxes, but local custom splits them. Which wins?",["Whichever is cheaper", "Local custom", "The lender", "The contract"],3,"The contract controls who pays."],
["XQ40","FL","What does Maryland withhold from a non-resident individual seller's proceeds?",["Nothing", "10% of the full sales price, like federal FIRPTA", "15% of the price", "8.75%, unless a reduced certificate is issued"],3,"8.75% for individuals (8.25% for entities)."]
];
const QUESTIONS = Q.map(([id,s,q,o,a,e]) => ({id,s,q,o,a,e}));

window.COURSES = window.COURSES || [];
window.COURSES.push({
  id: "taxesfees",
  draft: true,
  title: "Taxes, Prorations & Recording Fees",
  subtitle: "Prorations · Recording fees · Transfer & recordation taxes · MD, DC, VA, FL",
  description: "How to prorate property taxes in each state, what each county charges to record, and how Maryland, DC, Virginia and Florida transfer, recordation and documentary taxes are figured and who pays them.",
  source: "CLA fee calculator sheet (Nov 2026)",
  exam: { counts: {PR:8, RF:5, MD:7, DV:5, FL:5}, minutes: 40, pass: 80 },
  rateCharts: false,
  sections: SECTIONS,
  lessons: LESSONS,
  questions: QUESTIONS
});
})();
