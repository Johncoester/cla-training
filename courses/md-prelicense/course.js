// Course: Maryland Title Insurance Producer Pre-Licensing (MLTA course book, 2013 ed.)
// To add a course: copy this folder, change the id/title/content, and add a <script> tag for it in index.html.
(function(){
// Answer index `a` is 0-based into `o`. `p` = course-book page reference.
const SECTIONS = {
  TE: "Title Examination",
  ST: "Settlement, CPLs & Producers",
  PO: "Commitments, Policies & Endorsements",
  RT: "Title Insurance Rates",
  LW: "State & Federal Law"
};

const QUESTIONS = [
// ---------------- TITLE EXAMINATION ----------------
{id:"TE01",s:"TE",q:"Ann and Carl took title \"as joint tenants with rights of survivorship.\" Without Ann's joinder, Carl signed a 3-year lease of the property to a tenant. Carl later died. Ann now wants to sell. What will the settlement company most likely require?",
 o:["Only Carl's death certificate, since Ann conveys as the surviving joint tenant",
    "Carl's death certificate plus a joint tenancy affidavit signed by Ann at settlement",
    "An estate opened for Carl, with his Personal Representative joining in the deed",
    "Ann's signature alone, since a lease never affects how title is held"],
 a:2,e:"A joint tenant who signs a contract, deed, deed of trust or LEASE without joinder of the other joint tenants severs the joint tenancy into a tenancy in common. With no survivorship, Carl's interest passes to his estate, so his PR must convey it.",p:"25, 46–47"},
{id:"TE02",s:"TE",q:"A deed reads: \"to Maria Lopez (an undivided 60% interest) and Dev Patel (an undivided 40% interest), as joint tenants.\" Maria dies. Who holds Maria's interest?",
 o:["Dev Patel, automatically, by right of survivorship under the deed",
    "Maria's estate, because the grantees hold as tenants in common",
    "Dev Patel, but only once Maria's death certificate is recorded",
    "Dev and Maria's heirs, split 60/40 under the deed's stated shares"],
 a:1,e:"All four unities (possession, interest, time, title) are required. Unequal fractional interests destroy the unity of interest, so the grantees are tenants in common despite the \"joint tenants\" language. Maria's share goes to her estate.",p:"25–26, 46"},
{id:"TE03",s:"TE",q:"Husband and wife own as tenants by the entireties. The title report shows four items, each against the HUSBAND ONLY. They are refinancing. Which one must be paid and released at settlement?",
 o:["A $14,000 Capital One judgment entered in Circuit Court","A State of Maryland tax lien","A judgment in favor of the State of Maryland","A Federal (IRS) tax lien"],
 a:3,e:"Tenancy by the entireties shields the property from ordinary judgments, State of Maryland tax liens and State-plaintiff judgments against one spouse — but NOT from IRS tax liens or judgments in favor of the United States (U.S. v. Craft). Those attach and must be paid.",p:"49–50"},
{id:"TE04",s:"TE",q:"Tom and Lisa owned as tenants by the entireties. A $40,000 Discover Card judgment was entered against Tom only in 2019. Lisa died in 2024. Tom is selling in 2026. What is the status of the Discover judgment?",
 o:["It never attaches, because it was entered while the entireties tenancy existed",
    "It now attaches to the property and must be paid at settlement",
    "It attaches only to Lisa's estate, not to the property Tom owns",
    "It expired automatically when the entireties tenancy ended at Lisa's death"],
 a:1,e:"The shield exists only while the entireties tenancy exists. When the NON-debtor spouse dies, the debtor spouse becomes sole owner and the existing judgment (still within 12 years) attaches to the property.",p:"50"},
{id:"TE05",s:"TE",q:"Mike and Nora own as properly-created joint tenants (never severed). A Circuit Court judgment from a private creditor was entered against Mike only. Mike dies. Nora is selling. What happens to the judgment?",
 o:["It must be paid from Nora's proceeds because it attached when Mike died","It attaches only to Mike's estate; no lien attaches to Nora's property","It converts to a lien on Nora's half only","Nora must obtain a court order to sell free of it"],
 a:1,e:"If the joint tenant DEBTOR dies, a non-U.S./non-IRS judgment attaches only to the debtor's estate. The survivor takes free of it. (Compare: if the NON-debtor dies, the judgment attaches.)",p:"48"},
{id:"TE06",s:"TE",q:"Your title search, run in November 2026, shows the following against the current owner. None has been renewed or continued. Which is STILL enforceable?",
 o:["A Mastercard Circuit Court judgment entered June 2013","An IRS tax lien assessed in 2015 with notice filed in Circuit Court","A financing statement for replacement windows recorded in 2020","An HOA Statement of Lien recorded in 2016"],
 a:3,e:"Private judgments: 12 years from entry (expired 2025). IRS liens: 10 years from assessment (expired 2025). Financing statements: 5 years (expired 2025). HOA/condo Statements of Lien recorded after 10/1/08: 12 years (good until 2028).",p:"43–45"},
{id:"TE07",s:"TE",q:"A judgment in favor of the United States of America (unpaid federal student loan) was filed in the county Circuit Court in March 2007 and has never been renewed. Settlement is in November 2026. Proper treatment?",
 o:["Ignore it, because all judgments in Maryland expire after 12 years",
    "It is still enforceable and must be paid or released at settlement",
    "It is enforceable indefinitely and can never be released of record",
    "It is enforceable only against the purchase money lender, not the buyer"],
 a:1,e:"Judgments in favor of the U.S. are enforceable for 20 years from filing in the Circuit Court where the property sits, with one renewal period. A 2007 filing runs to 2027.",p:"43"},
{id:"TE08",s:"TE",q:"A first-lien deed of trust recorded in 2015 is being foreclosed. The condo's recorded Statement of Lien shows 7 months of unpaid regular assessments at $350/month, plus $400 in late fees and $900 in attorney fees. How much of the association's lien primes the foreclosing deed of trust?",
 o:["$2,450 (all 7 months)","$1,400 (4 months)","$1,200","$2,700 (assessments, late fees and attorney fees)"],
 a:2,e:"The association gets priority for up to 4 months of regular assessments, capped at $1,200. 4 × $350 = $1,400, so the cap controls. Late fees, interest, attorney fees, fines and special assessments never get priority.",p:"44"},
{id:"TE09",s:"TE",q:"A leasehold owner has not paid a $120/year ground rent for 9 years. The reversionary fee owner never sent a bill during that time and now resurfaces demanding payment. What is the MOST he can collect under Maryland law?",
 o:["$1,080 (9 years)","$360","$860","$2,000 (the redemption amount)"],
 a:2,e:"A reversionary owner who made no demand may collect no more than 3 years of back ground rent plus $500 for court costs and legal fees: (3 × $120) + $500 = $860.",p:"7"},
{id:"TE10",s:"TE",q:"A Baltimore leasehold carries an annual ground rent of $90. The leasehold owner wants a Deed of Redemption. Using the statutory capitalization rate, what is the redemption amount?",
 o:["$540","$900","$1,500","$1,800"],
 a:2,e:"Redemption = annual ground rent capitalized at 6%: $90 ÷ 0.06 = $1,500. On recording, the Deed of Redemption (merger deed) extinguishes the ground rent.",p:"6"},
{id:"TE11",s:"TE",q:"A leasehold owner has made no ground rent payment for 22 continuous years and has never received a bill. The reversionary owner proves he MAILED a demand letter in year 15 (the leasehold owner says it never arrived). Is the ground rent extinguished by operation of law?",
 o:["Yes, because more than 20 continuous years passed without any payment",
    "Yes, because a demand only counts if the leasehold owner received it",
    "No, because a demand was mailed during the period, received or not",
    "No, because ground rents can only be extinguished through the SDAT process"],
 a:2,e:"Ground rents are extinguished if no demand is made and no payment received for more than 20 continuous years. But if the reversionary owner proves a demand was mailed during that period — regardless of receipt — the rent is NOT extinguished.",p:"6–7"},
{id:"TE12",s:"TE",q:"A leasehold owner is 8 months behind on ground rent. Under current Maryland law (post-2007), what is the reversionary fee owner's remedy?",
 o:["File an ejectment action to recover the property and merge the estates",
    "Perfect a lien against the leasehold and foreclose if necessary",
    "Record a Deed of Redemption without the leasehold owner's signature",
    "Wait — ground rent is not delinquent in Maryland until it is 12 months late"],
 a:1,e:"The 2007 legislation prohibits ejectment for nonpayment. The reversionary owner's only remedy now is to perfect a lien against the leasehold and foreclose if necessary.",p:"5"},
{id:"TE13",s:"TE",q:"Deed: \"Mary Smith to Bobby Smith, however, reserving a life estate in Mary Smith.\" Mary wants to refinance. Who must sign the new deed of trust for it to be insurable?",
 o:["Mary only — she holds the present possessory estate","Bobby only — he holds the vested remainder","Both Mary and Bobby","Mary, plus a court order authorizing the encumbrance"],
 a:2,e:"This is a BARE life estate (no powers reserved). The life tenant cannot sell, encumber or mortgage without the remainderman's joinder. Had the deed said \"reserving a life estate WITH POWERS,\" Mary could act alone.",p:"26–27"},
{id:"TE14",s:"TE",q:"A Maryland principal signed a non-statutory power of attorney in 2026. It was acknowledged before a notary. Besides the notary, ONE other adult witness signed, in the presence of the principal and the notary. Is it valid for a sale?",
 o:["No — on or after Oct. 1, 2010 it must be on a Maryland statutory form",
    "No — it needs two adult witnesses in addition to the notary public",
    "Yes, assuming it grants the necessary real-estate authority",
    "Yes — because it was notarized, no witnesses are needed at all"],
 a:2,e:"POAs signed on/after 10/1/2010 must be in writing, signed, acknowledged before a notary and attested by two or more adult witnesses. The notary may be one of the two. Non-statutory forms remain valid if those formalities are met and the authority is granted.",p:"18"},
{id:"TE15",s:"TE",q:"The spouse of an active-duty Army soldier is stationed with him in Germany and must sign a POA for a Maryland sale. Before whom may she acknowledge it?",
 o:["Only a U.S. Consul or Vice Consul at the U.S. Embassy in Germany",
    "A German notary, whose acknowledgment Maryland gives full faith and credit",
    "An Army Staff Sergeant serving as the unit's administrative NCO",
    "A commissioned officer, Second Lieutenant (or Ensign) or higher"],
 a:3,e:"Military POAs cover service members and their spouses/dependents. The acknowledgment may be taken anywhere before a commissioned officer — 2nd Lt. or higher (Army, Air Force, Marines) or Ensign or higher (Navy, Coast Guard). A Staff Sergeant is not a commissioned officer. Civilians abroad use the U.S. Embassy.",p:"21–22"},
{id:"TE16",s:"TE",q:"A deed was signed by an attorney-in-fact and recorded before the POA was recorded. Under §4-107(b), which of the following is NOT one of the conditions that makes the late recording of the POA acceptable?",
 o:["The POA was dated and acknowledged on or before the deed's effective date",
    "No written revocation was recorded before the deed was recorded",
    "The agent gave an affidavit of no actual knowledge of the principal's death",
    "The principal re-acknowledged the POA after the deed was recorded"],
 a:3,e:"The three conditions: POA dated/acknowledged on or before the deed date; no recorded revocation through the deed's recording; and an agent affidavit/certification of no actual knowledge of revocation by death. Re-acknowledgment is not a requirement.",p:"23"},
{id:"TE17",s:"TE",q:"The record owner died testate in 1966. His will was never probated. Who holds title today, and is a deed out of the estate needed?",
 o:["A Personal Representative must be appointed now and sign a PR's deed",
    "The devisees under the will, with no deed of distribution needed",
    "The State of Maryland, by escheat after the will went unprobated",
    "The heirs at law under intestacy, because the will was never probated"],
 a:1,e:"For deaths BEFORE January 1, 1970, title vested automatically in the devisees (testate) or heirs (intestate). For deaths on/after 1/1/1970, title vests in the Personal Representative once appointed.",p:"16"},
{id:"TE18",s:"TE",q:"A seller is in an active Chapter 7 bankruptcy and the court has entered an order authorizing the sale. Who signs the deed?",
 o:["The debtor, as debtor-in-possession",
    "The Chapter 7 bankruptcy trustee",
    "The debtor and the bankruptcy judge",
    "The debtor's largest secured creditor"],
 a:1,e:"Chapter 7: after the court order, the Bankruptcy TRUSTEE signs. Chapter 13: after the court order, the DEBTOR (debtor-in-possession) signs. Note also that a joint tenant's Chapter 7 filing severs a joint tenancy.",p:"15, 25"},
{id:"TE19",s:"TE",q:"You paid off a deed of trust on March 1. The lender never sent a release. You want to use the canceled-check release method under §3-105. Which sequence is correct?",
 o:["Wait 30 days after payoff, then record the canceled check with a certificate",
    "Wait 60 days, send the §3-105 notice, then wait 30 more days before recording",
    "Wait 90 days after payoff, then record the check with a seller's affidavit",
    "Record right away with a certified copy of the check and the payoff letter"],
 a:1,e:"Allow the lienholder 60 days from full payment; then send a copy of §3-105 and notice that relief will be sought unless a release is received within 30 days; then wait 30 more days from mailing. Record with the check (or certified copy), a certificate, and an affidavit by a Maryland-barred attorney.",p:"40–41"},
{id:"TE20",s:"TE",q:"A deed of trust recorded in 1994 states a maturity date of June 1, 2009. No foreclosure was ever started and no continuation statement was filed. Status in 2026?",
 o:["Still enforceable, because mortgages last 40 years from recording",
    "Presumed unenforceable, because 12 years have passed since maturity",
    "Enforceable until a release or certificate of satisfaction is recorded",
    "Enforceable until 2029, which is 20 years after the maturity date"],
 a:1,e:"If no foreclosure begins within 12 years after the stated maturity date, the mortgage/deed of trust is presumed unenforceable. The 40-year rule applies only when there is NO ascertainable maturity date.",p:"44"},
{id:"TE21",s:"TE",q:"The owner died in 2020 with a gross estate above the unified credit. No IRS filing appears anywhere in the land records. A buyer is purchasing from the estate. Which is true of the federal estate tax lien?",
 o:["It doesn't exist, because no notice of lien was ever filed of record",
    "It arose at death, lasts 10 years, and does not protect a bona fide purchaser",
    "It lasts 20 years from death and is enforceable only against the heirs",
    "It is subordinate to any purchase money deed of trust recorded later"],
 a:1,e:"The federal estate tax lien is \"secret/silent\": no filing required, arises at death when the estate exceeds the unified credit, enforceable 10 years from death, and gives no protection to BFPs or lenders. It's released by an IRS closing letter.",p:"42–43, 45"},
{id:"TE22",s:"TE",q:"A deed is dated May 3 on its first page, but the grantor's acknowledgment is dated May 10. It's recorded May 12. What is the deed's effective date?",
 o:["May 3, the date on the deed's first page",
    "May 10, the acknowledgment date",
    "May 12, the recording date",
    "The date the buyer took possession"],
 a:1,e:"The date on the first page of the deed OR the date of acknowledgment, whichever is LATER, is the effective date of the instrument. Recording establishes priority/notice, not the effective date.",p:"8"},
{id:"TE23",s:"TE",q:"A purchaser obtains a house location drawing (not a boundary survey). Which statement is accurate?",
 o:["It is accurate to within about one inch and may be used to set property lines",
    "It is accurate to about a foot and won't remove the owner's survey exception",
    "It allows the survey exception to be removed from both the loan and owner's policies",
    "It can never be used in a transaction that has institutional financing"],
 a:1,e:"A location drawing locates improvements and is accurate to about 12 inches; it states it is not to be used to establish property lines. Most insurers keep the survey exception in the OWNER'S policy unless a boundary survey is obtained — but it typically comes out of the loan policy.",p:"36, 193–194"},
{id:"TE24",s:"TE",q:"How are an ordinary Circuit Court money judgment and a condominium Statement of Lien each released?",
 o:["Both are released by recording a release in the Land Records",
    "Judgment: Order/Line of Satisfaction in the case file; lien: recorded release",
    "Judgment: a release in the Land Records; lien: a filing in the court case",
    "Both are released automatically once the payoff check has cleared"],
 a:1,e:"Common money judgments are released by an Order/Line of Satisfaction in the court's case file — not the Land Records. HOA/condo Statements of Lien are released by a recorded release signed on behalf of the association.",p:"42–43"},

// ---------------- SETTLEMENT / CPL / PRODUCERS ----------------
{id:"ST01",s:"ST",q:"Which loss would MOST likely be covered under the underwriter's Closing Protection Letter issued to the lender?",
 o:["The agent's bank fails while holding the loan funds; the lender had chosen no bank",
    "An unfiled mechanics' lien that the commitment did not insure against",
    "The agent skipped the prior lien payoff the lender's written instructions required",
    "A lender instruction that conflicted with the commitment, which the agent followed"],
 a:2,e:"The CPL covers the agent's failure to follow the lender's written closing instructions and fraud/dishonesty in handling funds or documents. It excludes bank failure (unless the lender picked the bank), mechanics' liens not insured, and instructions that conflict with the commitment.",p:"93–94"},
{id:"ST02",s:"ST",q:"The mortgage broker's closing instructions require funds to be disbursed at the table. The lender's instructions say no disbursement until a funding number is issued. What do you do?",
 o:["Follow the broker, since the broker originated the loan and sent the file",
    "Follow whichever instruction is more favorable to the borrower",
    "Follow the lender's instructions and wait for the funding number",
    "Ask the buyer's real estate agent which instruction should control"],
 a:2,e:"When broker instructions conflict with the lender's, the lender's control. Where a funding number is required, the producer may not deposit loan funds without it, and nothing is disbursed until funding.",p:"104, 113–114"},
{id:"ST03",s:"ST",q:"At the settlement table, buyer and seller disagree about whether the contract includes the garage refrigerator. Both ask the settlement officer to decide. What is the correct response?",
 o:["Read the contract yourself and rule on it based on its plain language",
    "Propose a $200 credit to split the difference so the closing can go forward",
    "Decline to decide; withdraw until the parties resolve it in writing",
    "Call the listing agent and follow whatever she decides is fair"],
 a:2,e:"The producer must stay neutral and may not arbitrate disputes over contract terms. The producer must withdraw until the parties resolve the conflict. Ruling on the contract also risks the unauthorized practice of law.",p:"96–97, 110"},
{id:"ST04",s:"ST",q:"A purchase money deed of trust (institutional lender, residential) was recorded WITHOUT an affidavit of disbursement. A separate refinance deed of trust was recorded WITHOUT an affidavit of consideration. Which is correct?",
 o:["Both deeds of trust are valid between the parties but not against third parties",
    "Purchase DOT: invalid as to everyone; refinance DOT: valid only between the parties",
    "Both deeds of trust are void as to everyone, including the borrower",
    "Both deeds of trust are fully valid because the affidavits are optional"],
 a:1,e:"Missing affidavit of consideration: valid between lender and borrower, not against non-parties. Missing affidavit of disbursement on a (non-commercial, non-seller-take-back) purchase money DOT: not valid between the parties or anyone else.",p:"102–103, 380–381"},
{id:"ST05",s:"ST",q:"A qualified first-time Maryland homebuyer buys a $400,000 principal residence. The state transfer tax rate is 0.5%. The contract is silent on who pays transfer and recordation taxes. How much STATE transfer tax is due, and who pays it?",
 o:["$2,000, split equally between buyer and seller",
    "$1,000, paid by the buyer",
    "$1,000, paid by the seller",
    "$0, because first-time buyers are fully exempt"],
 a:2,e:"On a qualified FTMHB purchase the state transfer tax becomes 0.25% ($1,000), and the seller must pay it — not negotiable. Because the contract is silent, the seller also pays 100% of the recordation tax and county transfer tax.",p:"104–105, 379–380"},
{id:"ST06",s:"ST",q:"Two buyers are taking title. Buyer A has never owned a home anywhere. Buyer B owned and lived in a condo in Rockville ten years ago. Both will live in the new home. Do they get the first-time Maryland homebuyer transfer tax benefit?",
 o:["Yes, because one qualifying buyer is enough for the exemption",
    "Yes, but only for Buyer A's half of the state transfer tax",
    "No, because every grantee must qualify (or be a non-occupying co-borrower)",
    "Yes, as long as Buyer B signs a first-time homebuyer affidavit"],
 a:2,e:"All grantees must qualify as first-time Maryland homebuyers, or be a co-borrower on the purchase money loan who won't occupy. Buyer B previously owned a Maryland principal residence, so the exemption is lost.",p:"105, 380"},
{id:"ST07",s:"ST",q:"A Delaware LLC that is not registered to do business in Maryland sells a Maryland rental property. Seller's net proceeds are $200,000 and no exemption certificate was obtained. How much Maryland withholding tax must be collected?",
 o:["$0 — LLCs are exempt","$14,000 (7%)","$16,500 (8.25%)","$20,000 (10%)"],
 a:2,e:"Nonresident entities owe 8.25% of the total payment (net proceeds); nonresident individuals owe 7%. Without withholding (or a residency certification/exemption certificate), the clerk won't record the deed.",p:"106, 378"},
{id:"ST08",s:"ST",q:"A purchase money lender funds a Maryland consumer loan the day AFTER settlement with a personal check from an out-of-state bank. Under Maryland's good funds law, what is the consequence for the lender?",
 o:["The deed of trust is void as to the borrower and all third parties",
    "The lender may not charge interest for the first 30 days",
    "A civil penalty of up to $1,000 per violation, imposed by the MIA",
    "None, because the good funds rules apply only to second mortgages"],
 a:1,e:"Purchase money lenders must disburse on or before settlement in an approved form (cash, wire, certified, cashier's, teller's check, etc.). If not, the lender cannot charge interest for the first 30 days following settlement.",p:"108–109, 383"},
{id:"ST09",s:"ST",q:"Which party in a residential transaction is NOT required to receive a Gramm-Leach-Bliley privacy notice from the settlement company?",
 o:["The trustee of the seller's revocable family trust",
    "The individual borrower in a refinance",
    "An LLC buying an investment property",
    "The individual seller"],
 a:2,e:"GLB applies to natural individual consumers — including trustees of an inter vivos revocable family trust. It does not apply to lenders, corporations, partnerships, LLCs or business trusts.",p:"106–107"},
{id:"ST10",s:"ST",q:"For convenience, a healthy borrower asks you to close her residential loan at her kitchen table. Under Maryland law, may you?",
 o:["Yes, as long as she signs a written request for the location",
    "Yes, as long as the lender approves the location verbally in advance",
    "No; another location is allowed only on a written request due to sickness",
    "Yes, because the location rules apply only to commercial loans"],
 a:2,e:"A closing elsewhere than the listed locations is permitted only upon the borrower's written request to accommodate the borrower's sickness. Convenience isn't enough.",p:"384–385"},
{id:"ST11",s:"ST",q:"The original mortgagor refinances her principal residence. New loan: $350,000. Principal balance of the loan being paid off: $280,000. She signs and records the required affidavit. On what amount is recordation tax assessed?",
 o:["$350,000","$280,000","$70,000","$0 — refinances are exempt"],
 a:2,e:"For a refinance by the original mortgagor (or with spouse) on a principal residence, with the affidavit reciting the payoff balance, recordation tax is assessed only on the new money: $350,000 − $280,000 = $70,000.",p:"385–386"},
{id:"ST12",s:"ST",q:"After closing, the seller calls and asks you to send $500 from her proceeds to her landscaper. The payment is not on the signed settlement statement. What should you do?",
 o:["Pay it, because the funds are the seller's own proceeds",
    "Pay it once the seller confirms the request in writing by email",
    "Don't pay it; disbursements must follow the signed statement",
    "Pay it, then amend and re-sign the settlement statement afterward"],
 a:2,e:"Disbursements must be made in accordance with the signed settlement statement. If an item isn't on it, you may not disburse for it, and checks can't go to anyone not named on it.",p:"118"},
{id:"ST13",s:"ST",q:"During post-closing reconciliation, your escrow account for a file is $312 short. What does the course book say must happen?",
 o:["Bill the buyer for the shortage after closing",
    "Cover it from the next file's deposit when it comes in",
    "The producer entity must fund it right away",
    "Report it to the MIA within 30 days and wait"],
 a:2,e:"Any shortage in the escrow account must be immediately funded by the title insurance producer entity; any overage must be returned to the proper party.",p:"109"},
{id:"ST14",s:"ST",q:"The lender's instructions include: \"Settlement agent certifies the borrower has no other undisclosed debts.\" What should the settlement officer do?",
 o:["Sign it, since it is standard lender language",
    "Have the borrower initial the certification instead",
    "Get it clarified or waived in writing by the lender",
    "Strike it from the instructions and proceed"],
 a:2,e:"Contingencies that require the producer to use discretion or guarantee something outside his or her control should be clarified or waived in writing by the lender. The producer may never unilaterally modify the lender's instructions.",p:"114–115"},

// ---------------- COMMITMENTS / POLICIES / ENDORSEMENTS ----------------
{id:"PO01",s:"PO",q:"Bob settled on January 3. The settlement company recorded his deed January 9. On January 8 the IRS recorded a federal tax lien against the SELLER. Bob bought an owner's policy. Result?",
 o:["Not covered — the lien arose after settlement","Covered under the gap coverage (Covered Risk #10)","Not covered — federal liens are excluded","Covered only if the lien exceeds $10,000"],
 a:1,e:"Covered Risk #10 (gap coverage) insures matters filed or recorded after settlement but before the insured deed is recorded. Policy date = recording date.",p:"198"},
{id:"PO02",s:"PO",q:"Same facts, except what was recorded between settlement and the deed's recording was a lien for real property taxes that became due and payable during that window. Covered?",
 o:["Yes, under the gap coverage of Covered Risk #10",
    "Yes, under Covered Risk #2 for unpaid taxes and assessments",
    "No, because taxes are carved out of the gap coverage",
    "No, because only the loan policy carries gap coverage"],
 a:2,e:"Exclusion #5 carves real property taxes/assessments out of the gap coverage provided by Covered Risk #10.",p:"198, 203"},
{id:"PO03",s:"PO",q:"An insured owner bought with a location drawing. Two years later a neighbor's survey shows the insured's deck sits 2 feet over the boundary. The owner's policy contains the standard survey exception. The claim is:",
 o:["Covered under Covered Risk #2 (survey matters)","Denied — the survey exception overrides the covered risk","Covered because the location drawing was within tolerance","Covered under the unmarketability provision"],
 a:1,e:"Covered Risk #2 includes matters an accurate survey would disclose, but the survey exception in the owner's policy negates that coverage. A lender's policy usually has no survey exception, so the LENDER would get encroachment coverage.",p:"193–194, 214–215"},
{id:"PO04",s:"PO",q:"After purchase, the county cites the insured owner for a building-code violation the prior owner committed. No notice of the violation was ever recorded in the public records. Is the owner covered under a standard 2006 ALTA owner's policy?",
 o:["Yes, under Covered Risk #5 for violations of building and zoning laws",
    "No, because no notice was recorded, so Exclusion #1 applies",
    "Yes, because the owner obtained a home inspection before settlement",
    "Yes, under Covered Risk #3, because the violation makes title unmarketable"],
 a:1,e:"Governmental regulations (zoning, building codes, etc.) are excluded unless a notice of the violation/enforcement was recorded in the Public Records by the policy date. Code-enforcement files aren't public records for title purposes.",p:"195, 199"},
{id:"PO05",s:"PO",q:"Which owner's-policy claim would the insurer most likely PAY?",
 o:["The insured knew of a forged seller signature at settlement and said nothing",
    "The agent missed the insured's own Visa judgment, which she must pay off to sell",
    "A deed in the chain 20 years ago is voided as a fraudulent transfer",
    "The county takes the land by eminent domain with no notice recorded"],
 a:2,e:"A fraudulent/preferential transfer EARLIER in the chain is covered by Covered Risk #9 (the creditors' rights exclusion applies only to the transfer vesting title in the insured). Known-but-undisclosed matters (3(b)), insured-created defects (3(a)), and unrecorded eminent domain (Excl. #2) are not covered.",p:"197–202"},
{id:"PO06",s:"PO",q:"An insured owner deeds the property, with no consideration, to each of the following. In which case does the GRANTEE remain an insured under the original 2006 ALTA owner's policy?",
 o:["Her adult son, as a gift",
    "Her ex-husband, under a separation agreement",
    "An LLC that she wholly owns",
    "Her neighbor, as a gift"],
 a:2,e:"\"Insured\" includes a grantee without consideration only if the grantee is wholly owned by the insured, wholly owns the insured, or is wholly owned by an affiliate also wholly owned by the same party — or is a trustee/beneficiary of the insured's estate-planning trust. A gift to a child or neighbor isn't covered.",p:"203–204"},
{id:"PO07",s:"PO",q:"The insured's lot is reachable only by a steep, wooded slope, but the recorded plat shows the lot abutting a dedicated public road. The insured claims lack of access. Result?",
 o:["Covered, because Covered Risk #4 insures practical vehicle access to the lot",
    "Covered, if the insured shows a driveway can't be built on the slope",
    "Denied, because the public records show a legal right of access",
    "Denied, because access is excluded from coverage in the owner's policy"],
 a:2,e:"Covered Risk #4 insures a legal right of access, not physical convenience — \"it does not matter that the insured needs to be a mountain goat.\" If the public records show legal access, there's no claim.",p:"194–195"},
{id:"PO08",s:"PO",q:"A title defect is discovered and it would cost more than the policy amount to cure. What may the insurer do under the Conditions?",
 o:["Deny the claim, because the cost to cure exceeds the policy limits",
    "Tender the policy limits plus costs it authorized, ending its liability",
    "Pay half the policy amount and cancel the remaining coverage",
    "Require the insured to cure the defect and submit receipts for reimbursement"],
 a:1,e:"The insurer may terminate liability by paying or tendering the amount of insurance, together with costs, attorneys' fees and expenses incurred with its consent up to the time of payment.",p:"206"},
{id:"PO09",s:"PO",q:"An owner's policy is $400,000. The insurer pays $60,000 on a partial-failure claim and spends $25,000 in attorney fees defending title. What coverage remains?",
 o:["$315,000","$340,000","$400,000","$375,000"],
 a:1,e:"All payments under the policy, EXCEPT costs, attorneys' fees and expenses, reduce the amount of insurance. $400,000 − $60,000 = $340,000.",p:"208"},
{id:"PO10",s:"PO",q:"Which date is the EFFECTIVE DATE of a title insurance commitment?",
 o:["The date the commitment is typed and issued","The date the abstractor visited the courthouse","The \"through date\" of the title search","The settlement date"],
 a:2,e:"The commitment's effective date is the date through which title has been searched — not the issue date or the date the search was done. (The POLICY date is the recording date of the insured instrument.)",p:"186"},
{id:"PO11",s:"PO",q:"Liability under a typical ALTA commitment ends at the earliest of which events?",
 o:["30 days after the effective date, or at settlement, whichever is first",
    "180 days after the effective date, or when the policy is issued",
    "One year after the commitment is issued, with no earlier ending event",
    "When the buyer's financing contingency in the contract expires"],
 a:1,e:"Commitment liability typically terminates 180 days after its effective date or when the policy issues, whichever is first. Commitments expire after 6 months unless extended.",p:"184–185"},
{id:"PO12",s:"PO",q:"The insured lender foreclosed and bought the property at its own foreclosure sale. What is the status of its loan policy?",
 o:["Terminated, because the loan was satisfied by the foreclosure",
    "Continues, insuring title as of the original policy date",
    "Continues, but insuring title only as of the foreclosure sale date",
    "Converts automatically into an owner's policy dated as of the trustee's deed"],
 a:1,e:"The loan policy expires when the loan is satisfied — UNLESS it's satisfied by foreclosure. A foreclosing insured lender keeps coverage as of the original policy date.",p:"240, Quiz p.260"},
{id:"PO13",s:"PO",q:"A Maryland loan was sold. The promissory note was endorsed to the new lender, but no assignment of the deed of trust was recorded. A covered defect later prevents foreclosure. Is the assignee an insured?",
 o:["No, because an assignment must be recorded and shown on Schedule A",
    "Yes, because the assignee holds the original endorsed note",
    "Only if the original lender files the claim on the assignee's behalf",
    "Only for one year following the transfer of the note"],
 a:1,e:"Loan policies are freely assignable. Because Maryland DOTs are transferred by off-record endorsement of the note (title stays with the trustees), the assignee holding the original endorsed note is an insured.",p:"182, 218–219"},
{id:"PO14",s:"PO",q:"Why does a lender's policy usually NOT need to worry about unfiled mechanics' liens in Maryland?",
 o:["Mechanics' liens are excluded from all loan policies as standard practice",
    "They can't prime an earlier-recorded deed of trust in Maryland",
    "Lenders always require signed lien waivers from every contractor at closing",
    "The Closing Protection Letter covers the lender against them"],
 a:1,e:"Maryland mechanics' liens don't relate back to the start of work (Virginia's do). An unfiled mechanics' lien can't obtain priority over an earlier-recorded deed of trust. Covered Risk #11 addresses construction-lien priority in the loan policy.",p:"218"},
{id:"PO15",s:"PO",q:"Which statement about the ALTA Homeowner's Policy (enhanced owner's) is correct?",
 o:["It increases 10% a year for 5 years to 150% and covers some post-policy forgery",
    "It has no inflation feature, but it can be assigned to the next buyer",
    "It costs the same as the standard 2006 ALTA owner's policy",
    "It excludes coverage for a spouse who receives title in a divorce"],
 a:0,e:"The ALTA Homeowner's Policy has automatic inflation (+10% per year for 5 years, max 150%), covers post-policy forgery/impersonation, covers a spouse receiving title on dissolution of marriage, can't be assigned, and typically costs about 20% more.",p:"232–233"},
{id:"PO16",s:"PO",q:"A lender asks for an endorsement insuring that its adjustable-rate deed of trust won't lose validity or priority because of interest-rate changes under the formula in the mortgage. Which endorsement?",
 o:["ALTA 4","ALTA 5","ALTA 6","ALTA 8.1"],
 a:2,e:"ALTA 6/6.1 = variable rate. ALTA 4 = condominium. ALTA 5 = PUD. ALTA 8.1 = environmental protection lien. ALTA 9 = restrictions, encroachments, minerals.",p:"236–237"},
{id:"PO17",s:"PO",q:"Why does ALTA 8.1 coverage rarely matter in Maryland?",
 o:["Maryland bans environmental liens against residential property",
    "Maryland has no environmental \"super lien\" statute",
    "ALTA 8.1 coverage applies only to commercial property",
    "Maryland regulations prohibit lenders from requesting it"],
 a:1,e:"ALTA 8.1 insures against loss of priority to recorded environmental liens and unrecorded statutory 'super liens.' Maryland has no super lien statute, so an environmental lien must be filed first to take priority.",p:"237"},
{id:"PO18",s:"PO",q:"Which endorsements does the ALTA 2006 Short Form Loan Policy automatically incorporate?",
 o:["ALTA 4, 5, 6, 6.2, 7 and 9","ALTA 8.1 and 9 only","ALTA 3 and 4 only","None — all endorsements must be attached separately"],
 a:0,e:"The Short Form Loan Policy incorporates the typical residential endorsements: Condominium (4), PUD (5), Variable Rate (6), Negative Amortization (6.2), Manufactured Housing (7) and Restrictions/Encroachments/Minerals (9).",p:"233"},
{id:"PO19",s:"PO",q:"Which standard exception typically remains in BOTH the final loan policy and the final owner's policy?",
 o:["The survey exception",
    "The parties in possession exception",
    "The real property tax exception",
    "The mechanics' lien exception"],
 a:2,e:"With an owner's affidavit and a clear title report, the survey, parties in possession, unrecorded easements and mechanics' lien exceptions usually come out of the loan policy (but typically stay in the owner's policy). Some form of tax exception always remains in both.",p:"189–190, 211–212, 228"},
{id:"PO20",s:"PO",q:"A buyer purchases with an 80% first loan and a simultaneous 10% second deed of trust from a different lender. On the FIRST lender's final loan policy, where is the new second deed of trust disclosed?",
 o:["Schedule B-I, as a requirement to be met",
    "Schedule B, Part I, as a senior exception",
    "Schedule B-II, as a subordinate matter",
    "Nowhere, since it's junior to the insured lien"],
 a:2,e:"Schedule B-II of the loan policy discloses matters affecting title that are SUBORDINATE to the insured mortgage, such as a simultaneous second or a subordinated existing DOT.",p:"229"},

// ---------------- RATES (use Acme charts) ----------------
{id:"RT01",s:"RT",r:true,q:"Using the Acme FULL owner's rate chart, what is the premium for a standard owner's policy on a $312,400 purchase?",
 o:["$1,862","$1,865","$1,870","$2,187"],
 a:1,e:"Round UP to $313,000. 100 × $7 = $700; 100 × $6 = $600; 113 × $5 = $565. Total $1,865.",p:"241–242"},
{id:"RT02",s:"RT",r:true,q:"Using the Acme FULL owner's chart, what is the owner's premium on a $500,001 purchase?",
 o:["$2,800","$2,804","$2,805","$3,500"],
 a:1,e:"Any fraction of $1,000 rounds up: $501,000. $700 + $600 + (300 × $5 = $1,500) + (1 × $4 = $4) = $2,804.",p:"239, 242"},
{id:"RT03",s:"RT",r:true,q:"Sale price $350,000. The seller produces her current owner's policy for $240,000. Using the Acme OWNER'S REISSUE and FULL owner's charts, what is the new owner's premium?",
 o:["$1,050","$1,570","$1,620","$1,950"],
 a:1,e:"Reissue on the first $240k: 100 × $5 = $500; 100 × $4 = $400; 40 × $3 = $120 (=$1,020). Full rates in bracket on $240k–$350k: 110 × $5 = $550. Total $1,570.",p:"244–246"},
{id:"RT04",s:"RT",r:true,q:"Refinance: new loan $410,500. The owner produces her current OWNER'S policy for $300,000. Using the Acme LOAN REISSUE and FULL loan charts, what is the loan premium?",
 o:["$1,344","$1,233","$1,544","$1,744"],
 a:0,e:"Round up to $411,000. Loan reissue on first $300k: 100 × $4 = $400; 100 × $3 = $300; 100 × $2 = $200 (=$900). Full loan rate in bracket on $300k–$411k (tier 3): 111 × $4 = $444. Total $1,344.",p:"247–249"},
{id:"RT05",s:"RT",r:true,q:"Purchase at $250,000 with an owner's policy; the VA loan is $270,000 (closing costs financed). No prior policy. Acme simultaneous issue fee is $35. Total premium for both policies?",
 o:["$1,585","$1,615","$1,665","$2,920"],
 a:2,e:"Owner's: $700 + $600 + (50 × $5 = $250) = $1,550. Simultaneous fee $35 covers the loan up to $250k. Excess $250k–$270k at full LOAN rates in bracket (tier 3, $4): 20 × $4 = $80. Total $1,665.",p:"250–251"},
{id:"RT06",s:"RT",q:"A refinancing borrower produces the lender's (LOAN) policy from her purchase three years ago — she never bought an owner's policy. Is she entitled to a reissue rate on the new loan policy?",
 o:["Yes, because any prior title policy on the property qualifies",
    "Yes, but only up to 60% of the prior policy amount",
    "No, because the back policy must be an owner's policy",
    "Only if the prior policy was issued by the same underwriter"],
 a:2,e:"The prior policy must be an owner's or leasehold owner's policy. The new policy can be owner's or loan, and the back policy can come from any insurer licensed by the MIA.",p:"243–244, 371–372"},
{id:"RT07",s:"RT",q:"Which statement about reissue rates in Maryland is correct?",
 o:["The agent applies them only when the consumer asks for the discount",
    "The agent must offer them in writing and document the disclosure in the file",
    "They are set by statute at exactly a 40% discount for every insurer",
    "They apply only when the back policy came from the same underwriter"],
 a:1,e:"Producers must presume the consumer wants the discount, advise them in writing (including the need to produce the back owner's policy), and document it — typically with an acknowledgment signed at closing. 40% is common but not mandated.",p:"243–244, 363, 371–372"},
{id:"RT08",s:"RT",q:"Through a NEGLIGENT error, a settlement company charged the wrong premium on 3 files. What civil penalty may the Commissioner impose?",
 o:["Up to $250 per violation",
    "Up to $1,000 per violation",
    "Up to $1,000 total for all three violations",
    "None, because only willful miscalculations are penalized"],
 a:0,e:"Negligent miscalculation: up to $250 per violation. Willful miscalculation: up to $1,000 per violation.",p:"363"},
{id:"RT09",s:"RT",q:"A settlement company wants to give past clients a $100 \"loyalty credit\" against the title premium. The underwriter has no filed discount for it. Is this allowed?",
 o:["Yes, if it is disclosed on the settlement statement",
    "Yes, if the credit comes out of the agent's own commission",
    "No, unless the insurer's filed rates include that discount",
    "Yes, as long as it is offered only to repeat customers"],
 a:2,e:"No rebate, discount, abatement, credit or reduction of the filed premium may be offered unless approved in the insurer's rate filing. It's also an unfair trade practice/inducement.",p:"363, 366–367"},

// ---------------- LAWS & REGULATIONS ----------------
{id:"LW01",s:"LW",q:"A title insurance producer has held a Maryland license for 26 consecutive years and has been employed selling title insurance throughout. What continuing education is required to renew?",
 o:["None, because producers licensed 25+ years are exempt",
    "8 hours per 2-year period, at least 3 in ethics",
    "16 hours per 2-year period, at least 3 in ethics",
    "12 hours per 2-year period, at least 3 in ethics"],
 a:1,e:"Standard is 16 hours per 2-year renewal (3 ethics, max 1/2 correspondence). Producers licensed 25+ consecutive years need 8 hours, with an affidavit; the ethics and correspondence limits still apply.",p:"344–345"},
{id:"LW02",s:"LW",q:"Which is a valid way to earn CE credit toward a renewal?",
 o:["Retaking the same approved course again in the same renewal period",
    "Taking the same course in two renewal periods, four months apart",
    "An approved course, with the certificate kept for 4 years",
    "An unapproved national webinar on closing technology"],
 a:2,e:"No credit for repeating a course in the same period, for the same course in two periods within 6 months of each other, or for unapproved courses. Keep completion certificates for 4 years.",p:"344, 346"},
{id:"LW03",s:"LW",q:"A producer's license expired 45 days ago. He files for reinstatement with the renewal fee, the $100 reinstatement fee and proof of CE. Which is true?",
 o:["He must retake the pre-licensing course and the exam",
    "It's retroactive, but he can't do business until it's reinstated",
    "He may keep closing files while the application is pending",
    "Reinstatement isn't available once 30 days have passed"],
 a:1,e:"Reinstatement is available up to 1 year after expiration. Within 60 days, the Commissioner reinstates retroactively to the expiration date. Until reinstatement takes effect, no insurance business may be conducted.",p:"346–347"},
{id:"LW04",s:"LW",q:"A TIPIC embezzles a BUYER'S closing funds while acting for your settlement company. Which instrument is designed to protect that consumer?",
 o:["The company's $150,000 blanket fidelity bond","The company's $150,000 surety bond","The TIPIC's personal fidelity bond","The underwriter's errors & omissions policy"],
 a:1,e:"The fidelity bond protects the EMPLOYER/owner against dishonest acts of employees and TIPICs. The surety bond is for the benefit of CONSUMERS who suffer a loss from misappropriation. A TIPIC files neither bond personally.",p:"352–353"},
{id:"LW05",s:"LW",q:"Your company uses a TIPIC to close a refinance. Which is required?",
 o:["The TIPIC must be appointed by that transaction's insurer and covered by your bonds",
    "The TIPIC must file her own $150,000 surety bond with the Commissioner",
    "Any insurer's appointment works, and you aren't liable for her honest mistakes",
    "The TIPIC must be on your payroll as a W-2 employee"],
 a:0,e:"Entities may not use a TIPIC unless the TIPIC is appointed with the insurer on the transaction and covered by the entity's blanket bonds. The entity is the legal principal, liable for all TIPIC acts in scope — including unintentional ones. The DOT must recite the TIPIC info.",p:"354"},
{id:"LW06",s:"LW",q:"Your settlement company is a corporation. Who must hold a title insurance producer license and appointment?",
 o:["Only the designated principal contact","Each controlling owner and each officer","All employees, including clerical staff","Only the closers"],
 a:1,e:"For a corporation: each controlling owner and each officer. For an LLC: each person with direct control over fiscal management, and each manager and officer. For a partnership: each partner. Clerical staff need no license.",p:"351"},
{id:"LW07",s:"LW",q:"Match the penalty: a settlement company pays a real estate agent $100 for every contract she sends. Under MARYLAND law, the penalty on conviction is up to:",
 o:["A $500 fine and/or 6 months, per violation",
    "A $1,000 fine and/or 6 months, per violation",
    "A $10,000 fine and/or 1 year, in total",
    "A $50,000 fine and/or 1 year, per violation"],
 a:1,e:"Maryland: paying or receiving a referral fee is a misdemeanor — up to 6 months and/or $1,000 for EACH violation. Federally (RESPA §8): up to $10,000 and 1 year criminally, plus 3× the charge civilly.",p:"367, 389–390"},
{id:"LW08",s:"LW",q:"A seller's contract requires the buyer (using an FHA loan) to buy title insurance from the seller's cousin's title company. Under RESPA §9, the seller is liable to the buyer for:",
 o:["A flat $1,000 penalty payable to the buyer",
    "The buyer's actual damages only",
    "3 times all charges made for the title insurance",
    "Nothing, because §9 applies only to lenders"],
 a:2,e:"RESPA §9 prohibits a seller from requiring the buyer to use a particular title company as a condition of sale on a federally related mortgage; the seller is liable for 3× all title insurance charges. Maryland separately prohibits coerced use.",p:"369, 390"},
{id:"LW09",s:"LW",q:"A licensed producer converts escrow (trust) money. What is the criminal penalty under §10-121?",
 o:["Misdemeanor: up to a $50,000 fine and/or 1 year",
    "Felony: up to a $100,000 fine and/or 5 years",
    "Misdemeanor: up to a $500 fine and/or 6 months",
    "Administrative penalty only: $100 to $500 per violation"],
 a:0,e:"Converting or misappropriating trust money is a misdemeanor punishable by up to $50,000 and/or 1 year. ($500/6 months is for acting without a license; $100–$500 is the administrative penalty; $100,000 is the general willful-violation penalty.)",p:"353, 357–358"},
{id:"LW10",s:"LW",q:"Which settlement trust monies MUST go into a MAHT account?",
 o:["Funds expected to earn more than $50 in interest",
    "Funds expected to earn $50 or less in interest",
    "All trust funds held by every title agency",
    "None, because MAHT accounts are voluntary"],
 a:1,e:"Funds expected to earn $50 or less go to MAHT (interest to the Maryland Affordable Housing Trust). Larger amounts may go to a regular trust account. Attorneys using IOLTA for all settlement funds don't need MAHT. Annual report due March 31.",p:"118–119, 360–361"},
{id:"LW11",s:"LW",q:"An attorney admitted in Maryland owns a title agency that closes residential deals full-time. Which is correct?",
 o:["Neither the attorney nor the agency needs a license",
    "Both need licenses, and the agency needs fidelity and surety bonds",
    "Only the agency needs a license, because attorneys are exempt",
    "The agency counts as a law firm, so it needs no bonds"],
 a:1,e:"Attorneys who sell title insurance need a license but are exempt from education, exam and CE. A title AGENCY, even attorney-owned, needs an entity license and the bonds. Only a true LAW FIRM (primarily practicing law, title only incidental) avoids the entity license and bonds.",p:"354–355"},
{id:"LW12",s:"LW",q:"A non-attorney settlement agent is asked to prepare a deed from parents to their son for a transfer where NO title insurance will be issued. What should she do?",
 o:["Prepare it with a \"prepared by a party\" certification",
    "Give the parents a blank deed form with instructions",
    "Refer them to a Maryland attorney to prepare it",
    "Prepare it, as long as it's a quitclaim deed"],
 a:2,e:"Non-attorney agents may prepare documents reasonably necessary to insure title. A deed transferring title that will NOT be insured must be referred to a Maryland attorney — even handing over a sample deed may be UPL.",p:"373–375"},
{id:"LW13",s:"LW",q:"A producer licensed in Virginia moves to Maryland. To become a resident Maryland producer WITHOUT meeting Maryland's education, experience and exam requirements, she must apply within:",
 o:["30 days of moving to Maryland",
    "60 days of moving to Maryland",
    "90 days of establishing legal residence",
    "1 year of establishing legal residence"],
 a:2,e:"A producer licensed in another state who moves to Maryland must apply for a resident license within 90 days of establishing legal residence; if she does, education, experience and exam requirements are waived.",p:"350–351"},
{id:"LW14",s:"LW",q:"Which pairing of deadlines is correct?",
 o:["Licensee changes: 10 days; designated contact's changes: 30 days",
    "Licensee changes: 30 days; designated contact's changes: 10 days",
    "Both within 30 days",
    "Both within 10 days"],
 a:1,e:"Changes of legal name, trade name or address: within 30 days. The entity's designated principal contact must notify the MIA of changes to her information within 10 days.",p:"340, 347–348"},
{id:"LW15",s:"LW",q:"The underwriter received the premium from your agency late, and the agency then dissolved without remitting part of it. Can the insurer cancel the buyer's policy for nonpayment?",
 o:["Yes, after giving the buyer 30 days' written notice",
    "Yes, if the buyer doesn't pay the premium again",
    "No, because the premium was paid to the producer",
    "Only with the Commissioner's prior approval"],
 a:2,e:"§10-127: a title insurer may not cancel a policy for nonpayment of premium if the premium was paid to the producer but not forwarded.",p:"358"},
{id:"LW16",s:"LW",q:"How often must a title insurer conduct an on-site review of each appointed producer business entity's underwriting, claims and escrow practices?",
 o:["Every 4 years","Every 2 years at license renewal","Each calendar year","Only after a claim"],
 a:2,e:"Each calendar year, the title insurer must conduct an on-site review, including policy-blank inventory, and keep a written report available to the Commissioner; suspected violations must be reported in writing.",p:"353"},
{id:"LW17",s:"LW",q:"Which item is NOT a statutory requirement for a valid Maryland deed under §4-101 as summarized in the course book?",
 o:["A description sufficient to identify the property with reasonable certainty","A certificate of preparation","A recited amount of consideration and a habendum clause","Acknowledgment before a notary"],
 a:2,e:"Not statutorily required: tenancy/marital status, recited consideration, a habendum clause, warranty clause, witness and seal. Required items include grantor/grantee names, description, interest granted, residency/withholding certification, execution, certificate of preparation, acknowledgment, intake sheet and recording.",p:"383–384"},
{id:"LW18",s:"LW",q:"Which recording does NOT require a Maryland Land Instrument Intake Sheet?",
 o:["A deed","An assignment of a leasehold interest","A release of a deed of trust","An easement agreement"],
 a:2,e:"Intake sheets aren't required for an assignment or release of a mortgage/DOT, a substitution of trustees, a power of attorney, or a financing statement filing in the Land Records.",p:"376–377"},
{id:"LW19",s:"LW",q:"Under RESPA §10, what is the maximum escrow 'cushion' a lender may require, and what overage must be refunded after the annual analysis?",
 o:["1/12 of annual disbursements; refund any overage at all",
    "1/6 of annual disbursements; refund excess of $50 or more",
    "3 months of disbursements; refund excess over $100",
    "No cushion allowed; refund all overages immediately"],
 a:1,e:"Monthly deposits may not exceed 1/12 of annual disbursements plus shortages; the cushion may not exceed 1/6 (2 months). An excess of $50 or more must be returned to the borrower.",p:"390"},
{id:"LW20",s:"LW",q:"At closing, a buyer brings a $9,000 cashier's check and $3,000 in money orders. What reporting obligation does the course book describe?",
 o:["None, because each instrument is under $10,000",
    "Report it as a cash transaction to the IRS",
    "Report only the money orders, not the cashier's check",
    "Report it only if the buyer appears on the OFAC list"],
 a:1,e:"Cash includes cashier's, bank and teller's checks, drafts, traveler's checks and money orders under $10,000 that are aggregated in a closing (or related within a year) to exceed $10,000.",p:"392"},
{id:"LW21",s:"LW",q:"The Maryland Insurance Commissioner is:",
 o:["Elected statewide for a 4-year term; writes insurance law",
    "Appointed by the Governor with Senate consent for 4 years; enforces the law",
    "Appointed by the Lieutenant Governor for an 8-year term",
    "Appointed by the MLTA board of governors"],
 a:1,e:"The Governor appoints the Commissioner with Senate advice and consent for a 4-year term. The Commissioner enforces the Insurance Article, doesn't make laws, and may examine insurers and producers.",p:"358–359"},
{id:"LW22",s:"LW",q:"Which of these is a ground for the Commissioner to DENY or REVOKE a producer license?",
 o:["More than 120 days behind on court-ordered child support",
    "An unpaid parking ticket",
    "Holding a producer license in another state",
    "Being 19 years old"],
 a:0,e:"Grounds include child support arrears over 120 days, failure to pay income tax, a felony or moral-turpitude conviction, knowingly employing a fiduciary convicted of a felony/moral-turpitude crime within the prior 10 years, and more. The minimum age is 18.",p:"337–339, 356–357"}
];

// Study lessons. Written as plain-language summaries of the MLTA course book (2013 ed.).
// keys: [label, value]; traps: common exam mistakes; qs: practice question ids.
const LESSONS = [
{id:"L01",s:"TE",t:"Estates & Maryland ground rents",m:8,p:"3–10",
 body:`
<p><b>Fee simple</b> is the fullest form of ownership. It has no conditions, it can pass to heirs, and it's what most homeowners hold. <b>Real property</b> is land plus anything permanently attached to it (including easements). <b>Personal property</b> (chattels) is movable. Whether something counts as a <b>fixture</b> turns largely on the <i>intent</i> behind attaching it. That's why contracts list items like chandeliers and appliances.</p>
<h4>How a ground rent works</h4>
<p>A recorded ground lease (usually 99 years, renewable) splits title into two estates:</p>
<ul>
<li><b>Reversionary fee owner</b> holds the fee simple (the greater estate) and collects a small ground rent, usually paid semi-annually. This interest is transferred by <b>deed</b>.</li>
<li><b>Leasehold owner</b> lives in the house and maintains it. This interest is transferred by a recorded <b>Assignment of Leasehold</b>, which should recite the annual rent and the due dates.</li>
</ul>
<h4>Ending a ground rent</h4>
<ul>
<li><b>Redemption:</b> the leasehold owner pays the annual rent capitalized at 6% (rent ÷ 0.06) and gets a <b>Deed of Redemption / Merger Deed</b>, which merges the two estates back into fee simple.</li>
<li><b>Operation of law:</b> no demand made <i>and</i> no payment received for more than <b>20 continuous years</b>. But if the reversioner can prove a demand was <i>mailed</i> during that time (even if it was never received), the rent survives. For title insurance, get a court order confirming the fee has vested.</li>
<li><b>SDAT procedure:</b> if the leasehold owner has had no bill or contact for the past <b>3 years</b>, they can pay SDAT 3 years of rent plus the redemption amount and get an <b>Extinguishment Certificate</b>, which becomes conclusive once recorded.</li>
</ul>
<h4>Collections and remedies</h4>
<ul>
<li>A reversioner who made no demand and later resurfaces can collect at most <b>3 years</b> of back rent <b>plus $500</b> for costs and fees.</li>
<li>Ground rent is delinquent once it is more than <b>6 months</b> overdue. Since <b>2007</b>, <b>ejectment is prohibited</b>. The reversioner's only remedy is to perfect a lien against the leasehold and foreclose.</li>
<li>The 2007 Ground Rent Registry still exists, but <i>Muskin v. SDAT</i> (2011) held that failing to register does <b>not</b> extinguish the rent.</li>
</ul>`,
 keys:[["Redemption amount","Annual rent ÷ 6%"],["Extinguished by law","20+ yrs, no demand and no payment"],["Max back rent (no demand made)","3 years + $500"],["Delinquent","More than 6 months overdue"],["Ejectment","Banned since 2007: lien and foreclose instead"]],
 traps:["A mailed demand defeats the 20-year extinguishment even if it was never received.","The reversionary interest is the GREATER estate, even though the leasehold owner occupies the house.","Leasehold transfers use an Assignment, not a deed."],
 qs:["TE09","TE10","TE11","TE12"]},

{id:"L02",s:"TE",t:"Deeds & methods of transfer",m:9,p:"8–16",
 body:`
<p>Equitable title passes when the contract is fully signed. <b>Legal title</b> passes when the deed is executed, delivered and accepted, with full consideration paid. Maryland is a <b>race-notice</b> state: the first instrument recorded in the right county wins priority, so record without delay. If a property straddles a county line, record the deed in both counties.</p>
<p>A deed's <b>effective date</b> is the date on its first page or the acknowledgment date, <b>whichever is later</b>. In Maryland, deeds must be prepared by or under the supervision of a Maryland attorney, or by a party to the deed.</p>
<h4>Types of deeds</h4>
<ul>
<li><b>General warranty:</b> the grantor warrants against everyone's claims back through the whole chain. It's rare in Maryland.</li>
<li><b>Special warranty:</b> the grantor warrants only against claims arising <i>while the grantor owned it</i>. This is the <b>most common</b> Maryland deed.</li>
<li><b>Quitclaim:</b> conveys whatever interest the grantor may have, with no warranties. Use it when the grantor's interest is in doubt. For corrections, use a <b>confirmatory deed</b> with special warranty instead.</li>
<li><b>Trustee's or PR's deed:</b> no warranties, because the fiduciary has no personal knowledge of the title's history.</li>
</ul>
<h4>Other ways title moves</h4>
<ul>
<li><b>Foreclosure / tax sale:</b> due process and notice to all interested parties are essential. A defective notice can void the sale.</li>
<li><b>Deed in lieu of foreclosure:</b> the borrower deeds the property to the lender in exchange for forgiveness of the debt.</li>
<li><b>Short sale:</b> the lender releases its lien for less than the payoff. Reject approval letters that let the lender refuse to release after receiving its funds.</li>
<li><b>Adverse possession:</b> 20 continuous years of open, notorious and hostile use. <b>Eminent domain:</b> a government taking with fair compensation.</li>
<li><b>Bankruptcy:</b> every transaction requires a bankruptcy court order. In <b>Chapter 7</b>, the <b>trustee</b> signs. In <b>Chapter 13</b>, the <b>debtor</b> (debtor-in-possession) signs.</li>
</ul>
<h4>Estates</h4>
<ul>
<li>Death <b>on or after 1/1/1970</b>: title vests in the <b>Personal Representative</b> once Letters of Administration issue. The PR conveys.</li>
<li>Death <b>before 1/1/1970</b>: title vested automatically in the devisees (testate) or heirs (intestate). No PR deed is needed.</li>
<li><b>Testate</b> means the person died with a valid will. <b>Intestate</b> means no will, so Maryland's intestacy laws control.</li>
</ul>`,
 keys:[["Deed effective date","Later of the deed date or the acknowledgment date"],["Most common MD deed","Special warranty"],["Ch. 7 signer","Bankruptcy trustee (after court order)"],["Ch. 13 signer","Debtor-in-possession (after court order)"],["Estate cutoff","1/1/1970: PR (after) vs. heirs/devisees (before)"],["Adverse possession","20 continuous years"]],
 traps:["Recording date ≠ effective date.","A quitclaim isn't the right tool for fixing an error. Use a confirmatory deed.","No court order in a bankruptcy means the transaction can be voided."],
 qs:["TE17","TE18","TE22"]},

{id:"L03",s:"TE",t:"Powers of attorney",m:7,p:"17–24",
 body:`
<p>A power of attorney (POA) appoints an agent (attorney-in-fact). Underwriters treat POAs as <b>high risk</b>. Always ask why one is being used, and confirm the transaction with the principal directly.</p>
<h4>Execution requirements</h4>
<ul>
<li><b>Signed on or after 10/1/2010:</b> in writing, signed, acknowledged before a notary, and attested by <b>two adult witnesses</b> signing in each other's presence. The <b>notary can be one of the two</b>. Maryland statutory forms are optional. Non-statutory POAs are still valid if these formalities are met.</li>
<li><b>Signed before 10/1/2010:</b> notarized, no witnesses needed.</li>
<li><b>Another U.S. state:</b> valid if notarized there.</li>
<li><b>Foreign country:</b> acknowledged at the <b>U.S. Embassy</b> before a consul or similar officer.</li>
<li><b>Military (service member, spouse or dependent):</b> acknowledged anywhere before a <b>commissioned officer</b>, meaning 2nd Lt. or higher (Army, Air Force, Marines) or Ensign or higher (Navy, Coast Guard). Federal law preempts Maryland formalities.</li>
</ul>
<h4>Rules of use</h4>
<ul>
<li>A POA is effective immediately and lasts indefinitely unless it says otherwise. It ends at the principal's death, a revocation, or the appointment of a guardian.</li>
<li>POAs signed on or after <b>1/1/2000</b> are presumed <b>durable</b>. Older ones need a durability clause.</li>
<li>Agents can't delegate their authority, can't convey to themselves, and can't self-deal unless expressly authorized. A Personal Representative can't appoint an agent for the estate.</li>
<li>Reject a POA with blanks. For a new loan, the lender must approve the POA.</li>
<li>The Agent's Certification form is recommended. Record it with the POA and the deed.</li>
</ul>
<h4>Recording order (§4-107)</h4>
<p>The POA is normally recorded first. It may be recorded <b>after</b> the deed if (1) it was dated and acknowledged on or before the deed's effective date, (2) no written revocation was recorded, and (3) the agent gives an affidavit of no actual knowledge that the POA was revoked by the principal's death.</p>`,
 keys:[["Witnesses (post-10/1/2010)","2 adults; the notary may be one"],["Durable presumption","POAs signed on/after 1/1/2000"],["Abroad (civilian)","U.S. Embassy / consul"],["Military","Commissioned officer: 2nd Lt. / Ensign or higher"]],
 traps:["A sergeant or other non-commissioned officer can't take a military acknowledgment.","Be wary when the agent 'prefers you not contact' the principal, or when the parties are divorcing."],
 qs:["TE14","TE15","TE16"]},

{id:"L04",s:"TE",t:"Tenancy: how title is held",m:9,p:"24–28, 46–51",
 body:`
<ul>
<li><b>Sole owner:</b> at death, the property goes into the estate.</li>
<li><b>Tenants by the entireties (TBE):</b> married couples only. Created by "tenants by the entirety/entireties," "husband and wife," "his wife" or "her husband." The survivor takes automatically. <b>Divorce</b> converts it into a tenancy in common.</li>
<li><b>Joint tenants (JT):</b> survivorship requires the <b>four unities</b>: <b>possession, interest</b> (equal shares), <b>time and title</b> (same deed, same moment). The deed must expressly say "joint tenants" (RP §2-117).</li>
<li><b>Tenants in common (TIC):</b> this is the <b>default</b> when no tenancy is stated. Shares can be unequal, and there's no survivorship, so a deceased owner's share passes to their estate.</li>
</ul>
<h4>What severs a joint tenancy (making it a TIC)</h4>
<p>One joint tenant, acting without the others, signs a <b>contract, deed, deed of trust or lease</b>; one joint tenant files <b>Chapter 7</b>; or a creditor <b>levies/executes</b> on the property. Unequal shares mean it was never a JT in the first place.</p>
<h4>Life estates</h4>
<ul>
<li><b>Bare life estate</b> ("reserving a life estate"): the life tenant needs the remainderman to join in any sale or mortgage.</li>
<li><b>Life estate with powers</b> ("reserving a life estate <i>with powers</i>"): the life tenant can sell or mortgage alone and can even cut off the remainder.</li>
<li>Either way, the remainderman takes automatically at the life tenant's death. The property doesn't pass under the life tenant's will.</li>
</ul>
<h4>Trusts & entities</h4>
<p>For a revocable trust, the <b>trustee</b> named in the unrecorded trust agreement conveys. Always obtain and review that agreement. For entities (LLCs, corporations), verify that the entity exists, that it can enter the transaction, and that the signer has authority.</p>`,
 keys:[["Maryland default tenancy","Tenants in common"],["Four unities","Possession, interest, time, title"],["Statutory presumption against","Joint tenancy"],["Severs JT","Solo contract/deed/DOT/lease, Ch. 7 filing, creditor levy"]],
 traps:["'As joint tenants' with 60/40 shares is a TIC.","A lease signed by one joint tenant severs the joint tenancy.","Bare life estate: BOTH the life tenant and the remainderman sign."],
 qs:["TE01","TE02","TE13"]},

{id:"L05",s:"TE",t:"Searches, descriptions, easements & surveys",m:7,p:"28–37",
 body:`
<ul>
<li><b>Title search (abstract):</b> a summary of the chain of title. The Maryland custom is <b>60 years</b>. Refinances may use short searches. Judgments are customarily run on everyone in title for the last <b>12 years</b>. Abstractors report; the examiner decides what matters. Always read the actual instrument, not just the index.</li>
<li><b>Attorney opinion / certificate of title:</b> a legal opinion on marketability, based on the public records. It doesn't insure, doesn't cover hidden defects, and the remedy dies with the attorney (who may carry errors-and-omissions insurance).</li>
<li><b>Legal description:</b> either <b>metes and bounds</b> (courses and distances that must close back to the point of beginning; 1 acre = 43,560 sq ft) or <b>lot/block/plat</b>. A street address is <b>not</b> a sufficient legal description.</li>
<li><b>Encumbrances:</b> easements, rights of way and restrictive covenants run with the land. Every lien is an encumbrance, but not every encumbrance is a lien. A deed of trust is both.</li>
<li><b>Surveys:</b> a <b>location drawing</b> is accurate to about 1 foot, shows improvements and encroachments, and can't be used to set property lines. A <b>boundary survey</b> (often ALTA-certified) locates property lines exactly. Both carry FEMA flood determinations.</li>
</ul>`,
 keys:[["Customary search","60 years"],["Judgment search","Those in title in the last 12 years"],["Location drawing accuracy","About 1 foot"],["1 acre","43,560 sq ft"]],
 traps:["A location drawing doesn't remove the survey exception from the owner's policy.","A tax map number or street address isn't a legal description."],
 qs:["TE23"]},

{id:"L06",s:"TE",t:"Security instruments, priority & releases",m:8,p:"37–43",
 body:`
<p>In a <b>deed of trust</b>, the borrower (grantor) conveys legal title to a <b>trustee</b> for the lender (beneficiary) and keeps equitable title and possession. <b>All record owners must sign</b>, even if they aren't on the note, and it must be recorded. Types: purchase money, refinance, construction (funded in draws) and HELOC (usually a second lien).</p>
<h4>Priority</h4>
<p>First recorded is first in line (race-notice). For a new refinance loan to take first position over an existing HELOC, either pay off the HELOC <i>and close it to future advances</i> (with the borrower's close-out authorization), or record a <b>subordination agreement</b> signed by both lenders.</p>
<h4>Releasing a deed of trust (RP §3-105, §4-203)</h4>
<ul>
<li>A recorded release, or a certificate of satisfaction (full or partial).</li>
<li><b>Canceled-check method:</b> wait <b>60 days</b> after payoff, then mail the lienholder a copy of §3-105 with notice. Wait <b>30 more days</b>, then record the check (or a certified copy) with a certificate and a <b>Maryland attorney's affidavit</b>.</li>
<li>A release that cites the original instrument also releases re-recordings and associated financing statements, unless it says otherwise.</li>
</ul>
<h4>Releasing other liens</h4>
<ul>
<li><b>Money judgments:</b> an Order or Line of Satisfaction filed in the <b>court case file</b>, not the Land Records. A subordination or partial waiver must be signed by the <i>plaintiff</i>.</li>
<li><b>Federal and state tax liens:</b> released by the government.</li>
<li><b>Federal estate tax lien:</b> cleared by the IRS <b>closing letter</b>.</li>
<li><b>HOA/condo Statement of Lien:</b> a recorded release signed for the association.</li>
</ul>`,
 keys:[["Who signs the DOT","All record owners"],["Canceled-check release","60 days, notice, then 30 more days, plus attorney affidavit"],["Judgment release","Order/Line of Satisfaction in the case file"]],
 traps:["A co-owner who isn't on the note still must sign the deed of trust.","A paid-off HELOC that wasn't closed can move up to first position."],
 qs:["TE19","TE20","TE24"]},

{id:"L07",s:"TE",t:"Judgments, liens & statutes of limitation",m:10,p:"43–51",
 body:`
<h4>How long each lien lasts</h4>
<table class="lt"><tr><th>Lien</th><th>Enforceable</th></tr>
<tr><td>State court judgment (private plaintiff)</td><td>12 years from entry or last renewal</td></tr>
<tr><td>Judgment in favor of the State of Maryland</td><td>Indefinitely</td></tr>
<tr><td>Maryland state tax lien</td><td>Indefinitely (some follow 12 years for old chain items)</td></tr>
<tr><td>Judgment in favor of the United States</td><td>20 years from Circuit Court filing; one renewal</td></tr>
<tr><td>IRS tax lien</td><td>10 years from <i>assessment</i> (6 years before 11/5/1990)</td></tr>
<tr><td>HOA/condo Statement of Lien</td><td>12 years (3 years if recorded before 10/1/2008)</td></tr>
<tr><td>Financing statement</td><td>5 years from recording</td></tr>
<tr><td>Deed of trust with a maturity date</td><td>Presumed unenforceable 12 years after maturity</td></tr>
<tr><td>Deed of trust with no maturity date</td><td>40 years from recording</td></tr>
<tr><td>Federal estate tax lien</td><td>10 years from death; secret (not filed); no protection for buyers</td></tr></table>
<h4>HOA/condo priority in a foreclosure (deeds of trust recorded on or after 10/1/2011)</h4>
<p>The association's lien primes the deed of trust for up to <b>4 months of regular assessments, capped at $1,200</b>. Late fees, interest, fines, attorney fees and special assessments never get priority.</p>
<h4>Does a lien against ONE owner attach?</h4>
<table class="lt"><tr><th>Lien against one owner</th><th>TIC</th><th>JT / TBE</th></tr>
<tr><td>Ordinary judgment, MD tax lien, State of MD judgment</td><td>Attaches</td><td><b>Does not attach</b></td></tr>
<tr><td>IRS lien or U.S. judgment</td><td>Attaches</td><td><b>Attaches</b> (U.S. v. Craft)</td></tr></table>
<ul>
<li>If the <b>non-debtor</b> joint tenant or spouse dies, the debtor becomes sole owner and the judgment <b>now attaches</b>.</li>
<li>If the <b>debtor</b> dies first, the judgment attaches only to the debtor's estate, and the survivor takes free of it.</li>
<li>Insurers require a <b>joint tenancy affidavit</b> or a <b>continuous marital affidavit</b> at settlement. Neither helps against an IRS lien or U.S. judgment.</li>
<li>For a <b>bare life tenant</b>, a later judgment attaches but dies with the life tenant, so insurers often insure over it.</li>
</ul>`,
 keys:[["Private judgment","12 yrs"],["U.S. judgment","20 yrs"],["IRS lien","10 yrs from assessment"],["Financing statement","5 yrs"],["HOA priority cap","4 months of regular assessments, max $1,200"],["MD tax lien / State judgment","No limit"]],
 traps:["The IRS clock runs from assessment, not filing.","TBE and JT don't shield the property from federal liens.","The cap is $1,200 even if 4 months of dues add up to more."],
 qs:["TE03","TE04","TE05","TE06","TE07","TE08","TE21"]},

{id:"L08",s:"ST",t:"CPLs and everyone's role at settlement",m:8,p:"93–101",
 body:`
<h4>Closing Protection Letter (CPL)</h4>
<p>The CPL comes from the <b>underwriter</b>, usually for the <b>lender</b>, and goes out with the commitment. It is <b>not</b> title insurance. It protects the lender if the closing agent (1) isn't in good standing, (2) fails to follow the lender's <b>written</b> closing instructions, or (3) commits fraud or dishonesty with the lender's funds or documents.</p>
<p><b>Not covered:</b> instructions that conflict with the commitment; failure of the agent's bank (unless the lender chose that bank); and mechanics' liens not insured in the commitment. The agent may never modify a CPL. Most CPL claims come from failing to follow the lender's instructions.</p>
<h4>Who's who</h4>
<ul>
<li><b>Producer</b> (title agent or settlement company): represents the <b>insurer</b> and can bind it, but can't increase the insurer's liability without the insurer's explicit permission. Stays <b>neutral</b> toward buyer, seller and lender.</li>
<li>If buyer and seller dispute a contract term, the producer <b>may not arbitrate</b>. It withdraws until the parties resolve the dispute and provide written amended instructions.</li>
<li><b>Lender:</b> the producer follows the lender's instructions, except where they conflict with the contract or with the producer's ability to issue a proper policy. Then it notifies the parties and waits for written amendments.</li>
<li><b>Real estate agents</b> can't change the contract or the loan terms.</li>
<li><b>TIPIC:</b> an independent-contractor closer with the same duties as an employee closer.</li>
</ul>
<h4>Ground rules for closers</h4>
<p>Never rely on <b>verbal</b> instructions, never give legal advice, have no discretionary authority, and make no presumptions. Lender instructions that require the closer to guarantee something (for example, that the borrower has no other debts) must be clarified or waived <b>in writing</b>. If broker and lender instructions conflict, the <b>lender's control</b>.</p>`,
 keys:[["CPL issued by","Underwriter"],["CPL protects","Usually the lender"],["Producer represents","The title insurer"],["Broker vs. lender instructions","Lender wins"]],
 traps:["A CPL is not title insurance.","The closer can never change the lender's instructions unilaterally, not even 'obvious errors'."],
 qs:["ST01","ST02","ST03","ST14"]},

{id:"L09",s:"ST",t:"Pre-settlement: documents, taxes & notices",m:10,p:"101–109, 376–386",
 body:`
<h4>Affidavits in the deed of trust (RP §4-106)</h4>
<ul>
<li><b>Affidavit of consideration</b> (all non-commercial DOTs): if it's missing, the DOT is valid between borrower and lender but <b>not against third parties</b>.</li>
<li><b>Affidavit of disbursement</b> (non-commercial, non-seller-take-back purchase money DOTs): if it's missing, the DOT is valid against <b>no one</b>, not even between the parties.</li>
</ul>
<p><b>Certificate of preparation:</b> required on every deed, DOT and mortgage. It certifies preparation by or under a Maryland attorney, or by a party to the instrument. Every deed, DOT and leasehold assignment also needs a <b>Land Instrument Intake Sheet</b>.</p>
<h4>Transfer & recordation taxes</h4>
<ul>
<li>State transfer tax is <b>0.5%</b>. For a qualified <b>first-time Maryland homebuyer</b>, it drops to <b>0.25%</b>, which the <b>seller must pay</b> (not negotiable). The buyer pays none.</li>
<li>Every grantee must qualify (or be a non-occupying co-borrower on the purchase money loan) and sign an affidavit that's recorded with the deed.</li>
<li>In a first-time-buyer sale, the seller pays <b>all</b> of the recordation tax and county transfer tax <b>unless the contract says otherwise in writing</b>. A 50/50 split is common.</li>
<li><b>Refinance:</b> if the original mortgagor refinances a principal residence and signs an affidavit, recordation tax applies only to the <b>new money</b> (new loan minus the payoff balance).</li>
</ul>
<h4>Maryland withholding tax</h4>
<p>Withhold <b>7%</b> of net proceeds from nonresident individual sellers and <b>8.25%</b> from nonresident entities. No withholding if the seller certifies Maryland residency or principal-residence use, or has a Comptroller exemption certificate. Without one of these, the clerk won't record the deed.</p>
<h4>Required notices</h4>
<ul>
<li><b>Statutory Notice (Ins. §22-102):</b> owner's title insurance is optional. The buyer must accept or decline it <b>in writing</b>, and must be shown both the standard and enhanced options with their costs. Keep a copy in the file.</li>
<li><b>Reissue rate notice:</b> tell the buyer or borrower about the reissue discount in writing.</li>
<li><b>Privacy notice (Gramm-Leach-Bliley):</b> to natural persons, including trustees of a revocable trust. Not to lenders, LLCs or corporations. Give it no later than closing, and keep a copy in the file (an MIA requirement).</li>
<li>Check every party against the <b>OFAC / Patriot Act</b> list.</li>
</ul>
<h4>Good funds (RP §7-109)</h4>
<p>Purchase money lenders must fund <b>on or before settlement</b> by wire, cash, certified, cashier's or teller's check, a government check, or a check on an FDIC-insured bank in the 5th Federal Reserve District. If they don't, the lender can't charge interest for the first <b>30 days</b>.</p>`,
 keys:[["State transfer tax","0.5% (first-time buyer: 0.25%, paid by seller)"],["Withholding","7% individuals / 8.25% entities"],["Missing affidavit of consideration","Valid between the parties only"],["Missing affidavit of disbursement","Valid against no one"],["Late or bad lender funds","No interest for 30 days"]],
 traps:["One buyer who doesn't qualify kills the first-time-buyer exemption for everyone.","LLC buyers don't get a privacy notice; a trustee of a family trust does.","The refinance recordation break needs the ORIGINAL mortgagor, a principal residence and the affidavit."],
 qs:["ST04","ST05","ST06","ST07","ST08","ST09","ST11"]},

{id:"L10",s:"ST",t:"Loan instructions, closing & post-closing",m:7,p:"109–122, 384–385",
 body:`
<ul>
<li><b>Review the lender's instructions before closing.</b> Satisfy every loan condition (hazard policy, payoffs of credit cards, U&amp;O permit, etc.). Enter lender fees exactly as instructed. Escrow for taxes, ground rent and insurance.</li>
<li>If a <b>funding number</b> is required, don't deposit or disburse without it. Return the loan package on time (within about 24 hours). Late or incomplete packages can bring fines or a demand to repurchase the loan, and the lender will likely make a CPL claim.</li>
<li>If you can't comply with an instruction, <b>notify the lender</b> before proceeding.</li>
<li>Closing can't happen until every term of the contract and every commitment requirement is satisfied, whatever the parties want. Check ID (a valid driver's license is best).</li>
<li><b>Closing location for residential loans:</b> the lender's licensed office, an attorney's office (representing the lender, borrower, title company or insurer), or the title insurer's or agency's office. Anywhere else requires the borrower's <b>written request due to sickness</b>.</li>
</ul>
<h4>Post-closing</h4>
<ul>
<li>Disburse <b>only</b> what's on the signed settlement statement, only to the payees named, and only after funds are collected and wires have cleared.</li>
<li>The producer funds any escrow <b>shortage immediately</b> and returns overages.</li>
<li>Record documents promptly and in the right order. <b>Never mail them for recording.</b></li>
<li>Get and record releases of all paid-off liens. Issue the policies, remit premiums to the insurer, and close the file.</li>
<li><b>MAHT:</b> trust funds that would earn <b>$50 or less</b> in interest go into a Maryland Affordable Housing Trust account. Attorneys who keep all settlement funds in IOLTA are exempt. The annual report is due <b>March 31</b>.</li>
</ul>`,
 keys:[["MAHT threshold","$50 or less of interest"],["MAHT report","By March 31"],["Loan package return","About 24 hours / per instructions"]],
 traps:["Paying anything not on the settlement statement is a violation, even at the seller's request.","Closing at home for convenience isn't allowed. Only sickness, requested in writing."],
 qs:["ST10","ST12","ST13","LW10"]},

{id:"L11",s:"PO",t:"Title insurance basics & the commitment",m:9,p:"177–190",
 body:`
<p>Title insurance is a contract of <b>indemnity</b> plus a promise to defend. It looks <b>backward</b>: it insures against past defects, not future events. The premium is paid <b>once</b>. Insurers take on <i>off-record</i> risks (forgery, misindexing, gap matters) and except <i>on-record</i> risks. The first title insurer was Commonwealth Land Title (Philadelphia, 1876), and the industry grew after the abstractor-liability case <i>Watson v. Muirhead</i>.</p>
<h4>The commitment (binder)</h4>
<p>The commitment is the insurer's <b>offer</b> to issue the policy, subject to the exclusions, the conditions, the Schedule B-I requirements and the Schedule B-II exceptions. Paying the premium accepts the offer. Liability ends <b>180 days</b> after the effective date or when the policy issues, and commitments expire after <b>6 months</b>. If the proposed insured knows of a defect, it must tell the insurer in writing.</p>
<ul>
<li><b>Schedule A:</b> <b>effective date = the "through date" of the search</b>; the proposed insureds and amounts; the estate (fee simple or leasehold, or a fraction); the current owner and vesting deed; the full legal description (not a street address, and no personal property).</li>
<li><b>Schedule B-I (requirements):</b> record the deed and DOT; pay off and release liens; survey; bring-to-date search; ID; taxes; owner's affidavit; reissue and statutory notices; residency; plus extra items for estates, trusts, entities, bankruptcy, divorce, short sales, foreclosures and so on.</li>
<li><b>Schedule B-II (exceptions):</b> easements, covenants and other matters the insurer won't cover.</li>
</ul>
<h4>Standard exceptions and how they come out</h4>
<table class="lt"><tr><th>Exception</th><th>Loan policy</th><th>Owner's policy</th></tr>
<tr><td>Gap (matters recorded after the search date)</td><td colspan=2>Removed by a bring-to-date search with nothing new found</td></tr>
<tr><td>Real property taxes not yet due</td><td>Stays</td><td>Stays</td></tr>
<tr><td>Mechanics' liens</td><td>Removed (owner's affidavit)</td><td>Usually stays</td></tr>
<tr><td>Survey</td><td>Removed (affidavit / location drawing)</td><td>Stays unless boundary survey</td></tr>
<tr><td>Parties in possession</td><td>Removed (affidavit)</td><td>Usually stays</td></tr>
<tr><td>Unrecorded roads, easements</td><td>Removed (affidavit)</td><td>Stays</td></tr></table>`,
 keys:[["Commitment effective date","Search through date"],["Commitment liability","180 days / until policy issues"],["Policy date","Recording date of the insured instrument"],["Premium","One time, at filed rates"]],
 traps:["The effective date is NOT the date the commitment was issued.","Some form of tax exception always stays in both policies."],
 qs:["PO10","PO11","PO19","PO20"]},

{id:"L12",s:"PO",t:"Owner's policy: covered risks, exclusions, conditions",m:12,p:"191–212",
 body:`
<h4>The 10 covered risks (2006 ALTA owner's policy)</h4>
<ol>
<li>Title vested other than as stated (unknown heirs, misindexing, missed reversions).</li>
<li>Defects, liens and encumbrances: forgery, fraud, incapacity, lack of authority, defective execution or acknowledgment, invalid POA, recording errors, defective judicial proceedings, unpaid taxes that are due, and <i>survey matters</i>. In the owner's policy, the survey exception usually wipes out the survey coverage.</li>
<li>Unmarketable title (judged by the Maryland standard in <i>Zulver Realty</i>).</li>
<li>No right of access. This means <b>legal</b> access, not physical: "even a mountain goat" access counts.</li>
<li>Violation of laws or regulations (zoning, building, subdivision, environmental), <b>only if a notice was recorded</b>.</li>
<li>Police-power enforcement, only if a notice was recorded.</li>
<li>Eminent domain, only if a notice was recorded.</li>
<li>A completed taking binding on a purchaser for value without knowledge.</li>
<li><b>Creditors' rights:</b> fraudulent or preferential transfers <i>earlier in the chain</i>, plus late recording of the insured deed.</li>
<li><b>Gap coverage:</b> matters filed after settlement but before the deed is recorded, <i>except</i> real property taxes and assessments (Exclusion #5).</li>
</ol>
<h4>Exclusions</h4>
<p>(1) Government regulation and police power without a recorded notice; (2) eminent domain without a recorded notice; (3)(a) defects created, suffered, assumed or agreed to by the insured; (3)(b) matters known to the insured but not to the insurer and not recorded; (3)(c) no actual loss; (3)(d) post-policy matters; (3)(e) insured didn't pay value; (4) creditors' rights attacks on the <i>insured's own</i> transfer; (5) taxes during the gap.</p>
<h4>Key conditions</h4>
<ul>
<li><b>Insured</b> includes successors by operation of law (heirs, devisees, merger or dissolution). It also covers grantees who paid no consideration <i>only</i> when the grantee is wholly owned by, or wholly owns, the insured (or both are wholly owned by the same party), and trustees or beneficiaries of the insured's estate-planning trust. Gifts to family members aren't covered.</li>
<li>Coverage continues while the insured holds an interest or has warranty liability from a later sale. It's not assignable.</li>
<li>Give prompt <b>written notice</b>. A late notice reduces coverage only to the extent it prejudiced the insurer. The insurer may require a proof of loss.</li>
<li>The insurer may defend, settle, pay off third parties, or <b>tender the policy limits plus authorized costs</b> to end its liability. For a partial failure, it pays the loss in value or buys out the claim.</li>
<li>Liability is the lesser of the policy amount or the loss in value. Only <b>actual</b> loss counts; no consequential damages.</li>
<li>Payments, <i>except</i> costs and attorney fees, <b>reduce</b> the policy amount. Amounts paid under a loan policy on a mortgage excepted in, or agreed to by, the owner reduce the owner's coverage too (non-cumulative liability).</li>
<li><b>Subrogation:</b> after paying, the insurer steps into the insured's shoes against third parties. <b>Endorsements control</b> over the policy body.</li>
</ul>`,
 keys:[["Covered risks","10 (owner's) / 14 (loan)"],["Post-policy coverage","CR #9 creditors' rights, CR #10 gap"],["Gap exception to gap coverage","Real property taxes (Excl. #5)"],["Payments that don't reduce coverage","Costs and attorney fees"]],
 traps:["A fraudulent transfer earlier in the chain IS covered; the insured's own transfer is NOT.","Regulation, police-power and eminent-domain coverage requires a RECORDED notice.","A deed to a wholly owned LLC keeps coverage; a deed to an adult child doesn't."],
 qs:["PO01","PO02","PO03","PO04","PO05","PO06","PO07","PO08","PO09"]},

{id:"L13",s:"PO",t:"Loan policy, enhanced policies & endorsements",m:10,p:"181–183, 213–238",
 body:`
<h4>Loan policy</h4>
<ul>
<li>The amount is usually the loan amount. Liability <b>declines as the loan is paid</b> and ends at payoff, except a payoff by <b>foreclosure</b>: coverage continues as of the original date. The policy is <b>freely assignable</b>. In Maryland the note is endorsed off-record, so a recorded assignment isn't needed. Statistically, these policies last a little over 7 years.</li>
<li>Covered risks 1–8 match the owner's policy, plus: (9) invalid or unenforceable lien; (10) lack of priority; (11) construction and mechanics' lien priority; (12) assignment shown in Schedule A; (13) creditors' rights; (14) gap.</li>
<li>Usually <b>no survey exception</b>, so the lender gets encroachment coverage. The only standard exception kept is for taxes.</li>
<li>Maryland mechanics' liens <b>don't relate back</b> to when work began (Virginia's do), so an unfiled mechanics' lien can't prime an earlier-recorded DOT.</li>
<li>The loan policy excludes usury and consumer-credit violations by the lender.</li>
<li><b>Schedule B-II</b> discloses matters <i>subordinate</i> to the insured lien.</li>
</ul>
<h4>Owner's vs. loan premiums</h4>
<p>The owner's premium is higher because owner's coverage lasts indefinitely, its value grows with equity, and an owner can claim right away. A lender suffers a loss usually only after default and foreclosure.</p>
<h4>Enhanced owner's coverage: the ALTA Homeowner's Policy</h4>
<ul>
<li>Automatic inflation: <b>+10% per year for 5 years, up to 150%</b>.</li>
<li>Covers some <b>post-policy</b> events, including forgery and impersonation.</li>
<li>Covers heirs, trust transfers and a spouse who takes title in a divorce. It can't be assigned.</li>
<li>Premium is about <b>20% higher</b>. Deductibles and caps vary by insurer.</li>
</ul>
<h4>Short Form Loan Policy</h4>
<p>Residential only. It incorporates the long-form policy by reference, uses generic exceptions, and builds in <b>ALTA 4, 5, 6, 6.2, 7 and 9</b>. It's often issued at closing (an "instant" policy).</p>
<h4>Common endorsements (lender)</h4>
<table class="lt"><tr><th>ALTA</th><th>What it covers</th></tr>
<tr><td>4</td><td>Condominium: valid regime, priority over association assessments, separate tax parcel, no right of first refusal</td></tr>
<tr><td>5</td><td>PUD (mandatory HOA): covenants, priority over HOA liens, encroachments</td></tr>
<tr><td>6 / 6.1</td><td>Variable rate: the lien survives interest-rate changes (6.1 excludes state ARM-law noncompliance)</td></tr>
<tr><td>8.1</td><td>Environmental protection lien. Maryland has <b>no super lien</b>, so a lien must be recorded first to prime the DOT.</td></tr>
<tr><td>9</td><td>Restrictions, encroachments, minerals. Largely casualty-type coverage.</td></tr></table>`,
 keys:[["Inflation (Homeowner's)","+10%/yr × 5, max 150%"],["Enhanced premium","About +20%"],["Short Form includes","ALTA 4, 5, 6, 6.2, 7, 9"],["Variable rate","ALTA 6"],["Condo / PUD","ALTA 4 / ALTA 5"]],
 traps:["A foreclosing lender keeps its coverage.","ALTA 4 is condo, NOT variable rate (that's ALTA 6)."],
 qs:["PO12","PO13","PO14","PO15","PO16","PO17","PO18"]},

{id:"L14",s:"RT",t:"Calculating title insurance premiums",m:12,p:"239–253, 361–363",
 body:`
<p>Maryland is a <b>filed-rate</b> state. Insurers file rates with the Commissioner, and agents must charge exactly the filed rate: no discounts or rebates that aren't filed. Rates must be reasonable and adequate and not unfairly discriminatory, and they differ from insurer to insurer. Separate fees (abstract, exam, document prep and so on) may still be charged.</p>
<h4>The method</h4>
<ol>
<li><b>Round up</b> any fraction of $1,000 to the next full $1,000.</li>
<li>Apply each tier's rate only to the slice of the amount that falls in that tier.</li>
<li><b>Reissue:</b> use the reissue chart up to the face amount of the prior <b>owner's</b> policy, then the full chart <i>in bracket</i> above that.</li>
<li><b>Simultaneous issue:</b> when the loan is at or below the owner's amount, the loan policy costs a flat fee. Any loan amount above the owner's is priced at full loan rates, in bracket.</li>
</ol>
<div class="ex"><b>Worked example (Acme charts).</b> Price $350,000; seller's prior owner's policy is $240,000; loan $370,000.<br>
Owner's: reissue on the first $240k = 100×$5 + 100×$4 + 40×$3 = $1,020. Full rate on $240k–$350k = 110×$5 = $550. <b>Owner's total: $1,570.</b><br>
Loan: $35 simultaneous fee covers the first $350k. The excess $20k is at the tier-3 loan rate: 20×$4 = $80.<br><b>Grand total: $1,685.</b></div>
<h4>Reissue rules</h4>
<ul>
<li>The prior policy must be an <b>owner's</b> (or leasehold owner's) policy, never a loan policy. It can come from any insurer licensed by the MIA and must be produced by closing.</li>
<li>Typically a <b>40% discount</b> (60% of full rates), but that isn't mandated.</li>
<li>The agent must <b>take the initiative</b>: tell the consumer in writing and get a signed acknowledgment at closing.</li>
</ul>
<h4>Penalties for wrong premiums</h4>
<p><b>Negligent:</b> up to $250 per violation. <b>Willful:</b> up to $1,000 per violation.</p>`,
 keys:[["Rounding","Always UP to the next $1,000"],["Reissue base","Prior OWNER'S policy only"],["Typical reissue","60% of full (40% off)"],["Simultaneous fee (Acme)","$35"],["Negligent / willful penalty","$250 / $1,000 each"]],
 traps:["$500,001 is priced as $501,000, which reaches tier 4.","Above the reissue amount, the full rate picks up mid-bracket. Don't restart at tier 1.","When the loan exceeds the owner's amount, the excess is at LOAN rates."],
 qs:["RT01","RT02","RT03","RT04","RT05","RT06","RT07","RT08","RT09"]},

{id:"L15",s:"LW",t:"Licensing, CE, bonds & TIPICs",m:12,p:"333–360",
 body:`
<h4>Who needs a license</h4>
<p>Anyone, individual or business, who for compensation solicits, procures or negotiates title insurance, <b>or</b> provides escrow, closing or settlement services that may lead to a title policy, <b>or</b> controls closing funds. Clerical staff don't need one. Every producer needs a <b>license plus an appointment</b> from each insurer it writes for. Acting without one: a misdemeanor, up to <b>$500 and/or 6 months</b> per violation.</p>
<h4>Getting licensed</h4>
<ul>
<li>Age <b>18+</b>, good character, and either an approved course <i>or</i> an employer affidavit showing 1 year of employment in title insurance during the past 3 years. Pass the exam (fee <b>$70</b>; wait <b>14 days</b> to retake). License fee: <b>$54</b>.</li>
<li><b>Corporation:</b> each controlling owner and officer is licensed. <b>LLC:</b> those with direct fiscal control, plus managers and officers. <b>Partnership:</b> every partner.</li>
<li>An entity designates a producer as its MIA contact, who reports changes to her contact information within <b>10 days</b>. Name or address changes must be filed within <b>30 days</b>.</li>
<li>A producer licensed elsewhere who moves to Maryland must apply within <b>90 days</b> of establishing residence to skip education and exam.</li>
</ul>
<h4>Renewal & CE</h4>
<ul>
<li>The license renews every <b>2 years</b> (expiring at the end of the birth month after the first renewal).</li>
<li>CE: <b>16 hours</b> per period (<b>3 ethics</b>; at most half by correspondence). After <b>25+ consecutive years</b>: 8 hours.</li>
<li>No credit for repeating a course in the same period, or for the same course twice within 6 months. Keep certificates <b>4 years</b>. Maryland attorneys are <b>exempt from CE and exam</b> but still need a license.</li>
<li><b>Reinstatement:</b> available up to 1 year after expiration ($54 plus a $100 fee, plus CE). If filed within <b>60 days</b>, it's retroactive. No business may be done until the license is reinstated.</li>
</ul>
<h4>Bonds and oversight</h4>
<ul>
<li>Business entities file a <b>$150,000 fidelity bond</b>, which protects the <i>employer</i> from theft by employees and TIPICs, and a <b>$150,000 surety bond</b>, which protects <i>consumers</i>. TIPICs don't file their own.</li>
<li><b>TIPICs</b> must be appointed by the insurer on that transaction and covered by the entity's bonds. The entity is liable for all TIPIC acts, even unintentional ones. The DOT must show the TIPIC's name, address and license number and the entity's name.</li>
<li><b>Law firms</b> (primarily practicing law, title work incidental) need no entity license or bonds. An attorney-owned <b>title agency</b> needs both.</li>
<li>Insurers conduct an <b>on-site review of each agency every calendar year</b>. The Commissioner is appointed by the Governor with Senate consent for <b>4 years</b>, and <b>enforces</b> the law but doesn't make it.</li>
<li><b>Grounds for denial or revocation</b> include: fraud or misappropriation, a felony or crime of moral turpitude, failure to pay income tax, child support more than <b>120 days</b> behind, knowingly employing a fiduciary convicted within the past 10 years, and cheating on the exam. The administrative penalty is <b>$100–$500</b> per violation, plus restitution.</li>
</ul>`,
 keys:[["Min age","18"],["CE","16 hrs / 2 yrs (3 ethics); 8 hrs after 25 yrs"],["Fidelity bond","$150,000, protects the employer"],["Surety bond","$150,000, protects consumers"],["Exam fee / retake wait","$70 / 14 days"],["Move to MD","Apply within 90 days"],["Reinstate retroactively","Within 60 days"]],
 traps:["Fidelity = employer, surety = consumer.","Attorneys are exempt from CE and the exam, NOT from licensing."],
 qs:["LW01","LW02","LW03","LW04","LW05","LW06","LW11","LW13","LW14","LW16","LW21","LW22"]},

{id:"L16",s:"LW",t:"Prohibited practices, UPL & other Maryland laws",m:9,p:"353–385",
 body:`
<h4>Prohibited practices</h4>
<ul>
<li><b>Rebates and inducements:</b> no discount, credit or anything of value unless it's in the insurer's filed rates.</li>
<li><b>Twisting:</b> misrepresenting policy terms to get someone to drop or replace coverage.</li>
<li><b>Referral fees</b> (Maryland): a misdemeanor, up to <b>$1,000 and/or 6 months for each violation</b>. Commissions paid by the insurer to its agent are fine. Affiliated business arrangements are allowed if they comply with RESPA.</li>
<li><b>Coerced use</b> of a particular title company is prohibited. Charging a premium for insurance that isn't provided, or charging more or less than the filed rate, is prohibited.</li>
<li><b>Commingling:</b> premium money must be kept separate unless the insurer consents in writing.</li>
<li><b>Converting trust money:</b> a misdemeanor, up to <b>$50,000 and/or 1 year</b>. A willful violation of the Insurance Article in general: up to <b>$100,000</b>.</li>
<li>An insurer <b>can't cancel</b> a policy for nonpayment if the premium was paid to the producer.</li>
<li>Unfair claim practices include arbitrary denials, slow handling and failing to explain denials. Discrimination in underwriting is prohibited.</li>
</ul>
<h4>Unauthorized practice of law (UPL)</h4>
<p>Non-attorney agents may run closings, prepare settlement statements, handle funds, and prepare documents needed to <b>insure</b> title (releases, confirmatory deeds, lien waivers). Deeds and DOTs must still carry a proper certificate of preparation. They may <b>not</b> give legal advice, resolve disputes, or prepare a deed for a transfer that <b>won't be insured</b>. Even handing someone a sample form is risky. Seller-financed DOTs that won't be insured go to an attorney. All-cash deals where the buyer refuses an owner's policy are best referred to an attorney.</p>
<h4>Other Maryland requirements</h4>
<ul>
<li><b>A deed requires:</b> grantor and grantee names, a description, the interest granted, the residency certification, signature, certificate of preparation, notarization, intake sheet and recording. <b>Not required:</b> tenancy or marital status, consideration, a habendum clause, a warranty, witnesses or a seal.</li>
<li><b>Intake sheet not needed for:</b> releases or assignments of a DOT, a substitution of trustees, a POA, or a financing statement filing.</li>
</ul>`,
 keys:[["MD referral fee penalty","$1,000 / 6 mo, each violation"],["Trust money conversion","$50,000 / 1 yr"],["General willful violation","$100,000"],["Unlicensed activity","$500 / 6 mo"]],
 traps:["Preparing a deed for an uninsured transfer is UPL.","A $100 'thank you' per referral to an agent is an illegal referral fee."],
 qs:["LW07","LW09","LW12","LW15","LW17","LW18"]},

{id:"L17",s:"LW",t:"Federal laws: RESPA, privacy, OFAC, cash reporting",m:7,p:"386–392",
 body:`
<ul>
<li><b>RESPA</b> (1975; Regulation X; enforced by the CFPB since Dodd-Frank) covers <b>federally related mortgage loans</b> on 1–4 family homes. It doesn't apply to properties of 25+ acres, business or agricultural loans, or temporary and bridge loans.</li>
<li><b>Section 8:</b> no kickbacks, referral fees, fee splits or unearned fees. That includes gifts, meals, golf and event tickets. Penalties: up to <b>$10,000 and/or 1 year</b> criminal, and <b>3×</b> the charge in civil damages. <b>Affiliated business arrangements</b> (an ownership interest of more than 1%) are allowed only with a written disclosure.</li>
<li><b>Section 9:</b> a seller can't require the buyer to use a particular title company. The seller is liable for <b>3×</b> the title charges.</li>
<li><b>Section 10:</b> escrow deposits are limited to 1/12 of annual disbursements plus a cushion of up to <b>1/6 (2 months)</b>. An annual analysis is required, and any excess of <b>$50 or more</b> is refunded.</li>
<li><b>Gramm-Leach-Bliley:</b> privacy notices and safeguards for consumers' nonpublic personal information (see the pre-settlement lesson).</li>
<li><b>OFAC / Patriot Act:</b> screen parties against the Specially Designated Nationals list. On a likely match, call OFAC's hotline before blocking anything.</li>
<li><b>Cash reporting:</b> report to the IRS when cash, or cashier's checks, money orders and similar instruments <i>under $10,000 each</i>, add up to more than <b>$10,000</b> in one closing (or related transactions within a year).</li>
</ul>
<p class="note">The 2013 book predates TRID (the Closing Disclosure replaced the HUD-1 and GFE in 2015) and the 2016 FIRPTA rate change, so the exam leaves those topics out.</p>`,
 keys:[["RESPA §8 criminal","$10,000 / 1 yr"],["§8 civil / §9","3× the charge"],["Escrow cushion","1/6 (2 months)"],["Escrow refund","Excess of $50 or more"],["Cash reporting","Over $10,000 aggregated"]],
 traps:["Several instruments that are each under $10,000 still count once they're added together.","RESPA doesn't cover a 30-acre farm loan or a business-purpose loan."],
 qs:["LW08","LW19","LW20"]}
];

window.COURSES = window.COURSES || [];
window.COURSES.push({
  id: "md-prelicense",
  title: "Maryland Title Producer Pre-Licensing",
  subtitle: "MLTA Title Insurance Pre-Licensing Course",
  description: "Study lessons, practice questions and a timed certification exam covering title examination, settlements, policies, rates and Maryland and federal law.",
  source: "MLTA Title Insurance Pre-Licensing Course book (2013 edition)",
  exam: { counts: {TE:16, ST:10, PO:14, RT:6, LW:14}, minutes: 90, pass: 75 },
  rateCharts: true,
  sections: SECTIONS,
  lessons: LESSONS,
  questions: QUESTIONS
});
})();
