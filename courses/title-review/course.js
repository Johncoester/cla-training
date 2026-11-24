// Course: Reviewing a Title Search & Understanding Liens (draft).
// Written in general language. Checked for accuracy against CLA's underwriter guidance (kept private, not quoted here).
// Where a rule depends on the underwriter, the lesson says to check the underwriter's requirements.
(function(){
const SECTIONS = { BA: "Commitment, Chain & Vesting", ML: "Mortgages & Judgments", TL: "Tax & Other Liens", EX: "Exceptions & Authority to Sign", UW: "Clearing Title & the Underwriter" };
const NOTE = '<p class="note">General rules for title review. Time limits come from state and federal law; when a file depends on one, show the dates and let the underwriter decide. Never call a lien expired on your own.</p>';
const DO = items => '<div class="ex"><b>How to review it</b><ul style="margin:6px 0 0">' + items.map(i => '<li>' + i + '</li>').join('') + '</ul></div>';

const LESSONS = [
{id:"T01",s:"BA",t:"What a title search and commitment are",m:7,
 body: NOTE + `
<p>The <b>title search</b> is the abstractor's report of everything recorded against the property and its owners: deeds, mortgages, releases, judgments, liens, easements, plats and taxes. The <b>title commitment</b> is the underwriter's promise to insure once certain things are done. Reviewing title means reading the search, spotting what's wrong, and making sure the commitment deals with every item.</p>
<table class="lt"><tr><th>Part of the commitment</th><th>What it says</th></tr>
<tr><td><b>Schedule A</b></td><td>Who is being insured, the policy amounts, who owns the land today (vesting), and the legal description.</td></tr>
<tr><td><b>Schedule B-I: Requirements</b></td><td>What must happen before the policy issues: pay off and release the mortgage, record the new deed, pay the judgment, provide the trust papers.</td></tr>
<tr><td><b>Schedule B-II: Exceptions</b></td><td>What the policy will <b>not</b> cover: easements, covenants, survey matters, taxes not yet due.</td></tr></table>` + DO([
"Match the <b>owner's name</b> in Schedule A to the vesting deed and to the contract seller, letter for letter.",
"Match the <b>legal description</b> in the commitment to the vesting deed and the plat.",
"Every open lien in the search must show up as a <b>requirement</b> (to be paid or released) or an <b>exception</b>. Nothing should just disappear.",
"Check the search <b>covers the full period</b> your office requires, and that it runs up to a recent effective date."]),
 keys:[["Schedule A","Insured, amounts, current owner, legal description"],["Schedule B-I","Requirements to clear before closing"],["Schedule B-II","Exceptions the policy won't cover"],["Every open lien","Becomes a requirement or an exception"]],
 traps:["A lien in the search that isn't on the commitment at all.","A legal description that doesn't match the vesting deed."],
 qs:["TQ01","TQ02","TQ03","TQ04"]},

{id:"T02",s:"BA",t:"Chain of title and vesting",m:7,
 body: NOTE + `
<p>The <b>chain of title</b> is the line of deeds from owner to owner. Each deed's buyer (grantee) should be the next deed's seller (grantor), with no gaps.</p>
<h4>What breaks a chain</h4>
<ul>
<li><b>Gaps:</b> an owner appears who never received a deed of record.</li>
<li><b>Name variations:</b> "Robert J. Smith" buys and "Bob Smith" sells. Usually curable with an affidavit or a recital, but it must be dealt with.</li>
<li><b>Deaths:</b> an owner died and the land passed by will, by estate, or by survivorship, but nothing of record shows it.</li>
<li><b>Legal description changes:</b> a lot split, a missing unit number, a wrong lot or block.</li>
<li><b>Bad signatures or acknowledgments:</b> a missing notary, or a missing spouse where one was needed. Some state laws cure a defective acknowledgment after time passes. Ask the underwriter before relying on that.</li>
</ul>
<h4>Deed types</h4>
<p>A <b>general warranty deed</b> promises title against everyone. A <b>special warranty deed</b> only promises against problems the seller created. A <b>quitclaim deed</b> promises nothing; it only passes whatever the seller had. A quitclaim in the chain isn't automatically bad, but read why it was used.</p>`,
 keys:[["Chain of title","Each grantee becomes the next grantor"],["Name variation","Must be cured, often by affidavit"],["Quitclaim","Passes only what the grantor had; ask why"],["Defective acknowledgment","May be cured by statute; underwriter decides"]],
 traps:["Assuming 'Bob' and 'Robert' are the same person with nothing in the file.","Missing that a prior owner died with no estate or survivorship of record."],
 qs:["TQ05","TQ06","TQ07","TQ08"]},

{id:"T03",s:"BA",t:"How title is held",m:7,
 body: NOTE + `
<table class="lt"><tr><th>Form</th><th>What it means</th><th>Review point</th></tr>
<tr><td><b>Tenants in common</b></td><td>Each owner holds a share that passes through their estate when they die.</td><td>A deceased co-owner's share needs an estate or heirs to sign.</td></tr>
<tr><td><b>Joint tenants with right of survivorship</b></td><td>When one dies, the survivors own it all.</td><td>Confirm it was <b>created properly</b>. Don't assume. Liens against <b>any</b> joint tenant must be shown. Never insure one joint tenant's share alone.</td></tr>
<tr><td><b>Tenants by the entirety</b></td><td>Married couples only (MD, DC, VA and FL all recognize it). Neither spouse can sell alone; the survivor owns it all.</td><td>Confirm they were <b>married when they took title</b>. A survivor needs proof of death and of no divorce before the death.</td></tr></table>
<h4>The big exception: federal tax liens</h4>
<p>An ordinary judgment against <b>one</b> spouse doesn't attach to land held by the entirety. A <b>federal tax lien against one spouse does</b> (the Supreme Court's <i>U.S. v. Craft</i> case). So always search federal tax liens against <b>each spouse's</b> name.</p>`+DO([
"Don't read \"husband and wife\" on a deed as joint tenancy. Read the actual words of the vesting deed.",
"A survivor claiming title: get the <b>death certificate</b> and check for a will or divorce that changes things.",
"Search every owner, and for entireties property, each spouse, for liens."]),
 keys:[["Tenants in common","Share passes through the estate"],["Joint tenancy","Survivors take all; liens vs. any tenant shown"],["Tenancy by the entirety","Married couples; one spouse can't sell alone"],["Federal tax lien vs. one spouse","Does attach to entireties property"]],
 traps:["Ignoring a federal tax lien because it's only against one spouse.","Assuming joint tenancy from the words 'husband and wife'."],
 qs:["TQ09","TQ10","TQ11","TQ12"]},

{id:"T04",s:"ML",t:"Mortgages and deeds of trust",m:7,
 body: NOTE + `
<p>In Maryland, DC and Virginia, most home loans are secured by a <b>deed of trust</b>. Florida uses a <b>mortgage</b>. Either way, every open one must be <b>paid and released</b> or kept as an exception the buyer and lender agree to.</p>
<h4>What to look for</h4>
<ul>
<li><b>Open loans with no release.</b> An old refinance often leaves a loan that was paid off but never released. You need a recorded release (or the lender's payoff and a release after closing).</li>
<li><b>Assignments.</b> The loan may have moved to a new lender. The payoff and release come from whoever holds it <b>now</b>.</li>
<li><b>MERS.</b> Many loans name MERS as nominee for the lender. Releases and assignments signed by MERS are normal; track who the real holder is.</li>
<li><b>Credit lines (HELOCs).</b> They can be drawn on again until closed. They need a freeze and close-out at payoff (covered in the payoffs course).</li>
<li><b>Modifications and subordinations.</b> A recorded subordination changes which loan comes first. It must be in writing and recorded.</li>
</ul>
<h4>"It's so old it must be expired"</h4>
<p>State laws do let very old deeds of trust lapse after a set number of years past maturity. But the rules differ by state and can be extended. <b>Show the dates and let the underwriter decide.</b> Never drop an old loan on your own.</p>`,
 keys:[["Every open DOT/mortgage","Paid and released, or an agreed exception"],["Assigned loan","Payoff and release from the current holder"],["Old open loan","Show the dates; underwriter decides"],["Subordination","Written and recorded"]],
 traps:["Dropping an old open deed of trust because it 'looks expired'.","Ordering a payoff from the original lender after an assignment."],
 qs:["TQ13","TQ14","TQ15","TQ16"]},

{id:"T05",s:"ML",t:"Judgments",m:7,
 body: NOTE + `
<p>A <b>money judgment</b> becomes a lien on real estate the debtor owns in the county where it's recorded or indexed, including land bought later. It must be paid at closing (or proven not to be our seller's).</p>
<h4>How long judgments last (general rules, state law)</h4>
<table class="lt"><tr><th>Where</th><th>Ordinary judgment</th></tr>
<tr><td>Maryland</td><td>12 years, and can be renewed. Judgments for the State of Maryland or the U.S. last longer.</td></tr>
<tr><td>DC</td><td>12 years, and can be renewed for another 12.</td></tr>
<tr><td>Virginia</td><td>Older judgments 20 years; judgments entered after July 1, 2021, 10 years. Both can be extended.</td></tr></table>
<p>Even with these rules, <b>show the dates and let the underwriter decide</b>. Renewals and special creditors change the answer.</p>
<h4>Is it really our seller?</h4>
<p>Common names produce judgments against other people with the same name. Compare middle names, addresses and dates. If it isn't the seller, a <b>same-name (identity) affidavit</b> usually handles it. The affidavit must state the <b>facts</b> (different address, different middle name), not just "it's not me."</p>` + DO([
"Tell the seller <b>before</b> requesting a judgment payoff, and word it carefully.",
"Get a written payoff from the creditor or its attorney, pay it at closing, and get the release or satisfaction recorded.",
"Child support liens and court costs are judgment-type liens too. Treat them the same way."]),
 keys:[["Judgment lien","Attaches to the debtor's land in that county"],["MD / DC ordinary judgment","12 years, renewable"],["VA judgment after 7/1/2021","10 years, renewable"],["Same-name judgment","Identity affidavit stating facts"]],
 traps:["Ignoring a judgment against a seller with a common name without checking.","Accepting an affidavit that only says 'that's not me.'"],
 qs:["TQ17","TQ18","TQ19","TQ20"]},

{id:"T06",s:"TL",t:"Tax liens: federal, state and estate",m:8,
 body: NOTE + `
<h4>Federal tax liens (IRS)</h4>
<ul>
<li>A notice of federal tax lien generally lasts <b>10 years and 30 days from the assessment</b>, unless the IRS refiles it, which adds another 10 years.</li>
<li>Search federal liens <b>far enough back</b> (at least 11 years, or the whole time the seller has owned the property if that's longer).</li>
<li>It comes off only with a recorded <b>release, certificate of discharge, or non-attachment</b>, or a properly handled foreclosure. A paid-off-but-unreleased federal lien still needs the release.</li>
<li>Remember the entireties rule: a federal lien against <b>one spouse</b> attaches.</li>
</ul>
<h4>State and local tax liens</h4>
<p>Maryland, DC and Virginia all file their own tax liens (income, sales, withholding). How long they last varies by state and type of tax. Real estate taxes are their own category and come <b>ahead of almost everything</b>.</p>
<h4>Estate tax: the lien you can't see</h4>
<p>The federal estate tax lien attaches <b>at death, for 10 years, with no filing at all</b>. When title comes through someone who died within the last 10 years, the underwriter may want proof the estate was well under the federal exemption, or that the tax was paid. Some states have their own inheritance or estate taxes too (Maryland does).</p>`,
 keys:[["Federal tax lien","10 years + 30 days from assessment, unless refiled"],["Federal lien search","At least 11 years back, or the whole ownership"],["Removing a federal lien","Release, discharge or non-attachment, recorded"],["Federal estate tax lien","At death, 10 years, no filing"]],
 traps:["Assuming no estate tax issue because nothing is recorded.","Dropping a federal lien that only looks lapsed without underwriter approval."],
 qs:["TQ21","TQ22","TQ23","TQ24"]},

{id:"T07",s:"TL",t:"Other liens: HOA, mechanics', municipal, UCC, ground rent",m:7,
 body: NOTE + `
<table class="lt"><tr><th>Lien</th><th>What to know</th></tr>
<tr><td><b>HOA / condo</b></td><td>Unpaid dues and assessments can become a recorded lien. Get the association's statement (Florida: the estoppel certificate) and pay what's owed at closing.</td></tr>
<tr><td><b>Mechanics' liens</b></td><td>Contractors and suppliers who weren't paid can lien the property, sometimes for work done <b>before</b> anything is recorded. Ask about recent work. Removing the mechanics' lien exception needs underwriter approval and an owner's affidavit.</td></tr>
<tr><td><b>Municipal / utility</b></td><td>Water and sewer, code-violation fines, demolition or nuisance abatement charges. In some places these are collected like taxes and must be paid. DC has some liens of this kind that never expire.</td></tr>
<tr><td><b>UCC fixture filings</b></td><td>Financing for things attached to the house (solar panels, HVAC). They usually last 5 years unless continued. Leased solar is a common surprise.</td></tr>
<tr><td><b>Ground rent (Maryland)</b></td><td>The land is leased and the owner of the house pays a yearly rent. Find out whether it's being redeemed (bought out) or will stay. Redemption needs formal signed paperwork.</td></tr>
<tr><td><b>Florida tax certificates</b></td><td>When Florida taxes go unpaid, the county sells a tax certificate. It must be <b>redeemed</b> at closing.</td></tr></table>`,
 keys:[["HOA/condo lien","Get the statement or estoppel; pay at closing"],["Mechanics' liens","Can exist before recording; ask about recent work"],["UCC fixture filing","Usually 5 years unless continued"],["Florida tax certificate","Must be redeemed"]],
 traps:["Missing a solar lease or UCC filing on the house.","Deleting the mechanics' lien exception after recent construction without approval."],
 qs:["TQ25","TQ26","TQ27","TQ28"]},

{id:"T08",s:"EX",t:"Easements, covenants, surveys and standard exceptions",m:6,
 body: NOTE + `
<p>Not every recorded item is a problem to clear. Many simply <b>stay on the policy as exceptions</b>, and the buyer takes title subject to them.</p>
<ul>
<li><b>Easements:</b> rights others have to use part of the land (utility lines, shared driveways, drainage). Read them. An easement running under the house is a real problem.</li>
<li><b>Covenants and restrictions:</b> rules from the subdivision or HOA (fences, rentals, sheds). They become exceptions. Discriminatory language in old covenants is void and is excluded.</li>
<li><b>Plats:</b> the recorded subdivision map. It shows lots, building lines and easements.</li>
<li><b>Survey matters:</b> fences off the line, encroachments, sheds over a setback. Without a survey, the policy excepts survey matters. With an acceptable survey, the underwriter may remove or narrow that exception.</li>
<li><b>Standard exceptions:</b> parties in possession, unrecorded liens, survey matters and taxes not yet due. Removing one takes the right affidavit or survey and sometimes underwriter approval.</li>
</ul>`,
 keys:[["Easement","Stays as an exception; read it"],["No survey","Survey matters are excepted"],["Standard exceptions","Removed only with affidavits, a survey or approval"],["Discriminatory covenants","Void; excluded"]],
 traps:["Treating every recorded easement as something to pay off.","Removing a standard exception without the supporting affidavit or survey."],
 qs:["TQ29","TQ30","TQ31"]},

{id:"T09",s:"EX",t:"Who has authority: estates, trusts, companies, POAs, bankruptcy",m:8,
 body: NOTE + `
<table class="lt"><tr><th>Seller</th><th>What you need</th></tr>
<tr><td><b>Estate</b></td><td>The court appointment of the personal representative and authority to sell. Heirs may need to sign. Watch for creditor-claim periods and estate tax.</td></tr>
<tr><td><b>Trust</b></td><td>The trust (or a certification of trust) showing who the trustees are and that they can sell.</td></tr>
<tr><td><b>LLC</b></td><td>Good standing, and the operating agreement and every amendment, to see who can sell or mortgage. Day-to-day manager authority usually does <b>not</b> cover selling the real estate.</td></tr>
<tr><td><b>Corporation</b></td><td>Good standing (and authority to do business here if formed elsewhere) plus a board resolution signed by the proper officers.</td></tr>
<tr><td><b>Power of attorney</b></td><td>A written, recordable POA in effect that day that <b>specifically</b> allows what's being done. A power to sell doesn't include a power to mortgage or to give the land away. Ask <b>why</b> a POA is being used.</td></tr></table>
<h4>Red flags that go to the underwriter</h4>
<ul>
<li>A recent change to who controls an LLC, or a recent name change.</li>
<li>A sale between an LLC and one of its own members.</li>
<li>Signers or owners outside the U.S.</li>
<li>An agent under a POA who benefits personally.</li>
<li>Any owner or managing member <b>in bankruptcy</b>.</li>
</ul>
<p>Verify control changes using contact information from an <b>independent source</b>, not from the person asking for the money.</p>`,
 keys:[["LLC seller","Good standing + operating agreement and amendments"],["POA","Must specifically grant the power used"],["Owner in bankruptcy","Underwriter; court approval may be needed"],["Verify changes","Using independent contact information"]],
 traps:["Accepting a 'general' POA for a real estate sale.","Relying on a managing member's word without the operating agreement."],
 qs:["TQ32","TQ33","TQ34","TQ35"]},

{id:"T10",s:"UW",t:"Clearing title and when to call the underwriter",m:6,
 body: NOTE + `
<h4>Clearing tools</h4>
<ul>
<li><b>Payoff and release:</b> for mortgages, judgments and liens.</li>
<li><b>Affidavits:</b> identity, marital status, heirship, possession, no recent work. They must state <b>facts</b> the signer actually knows ("my middle name is James and I never lived in Prince George's County"), not conclusions ("I am the sole heir").</li>
<li><b>Corrective or confirmatory deeds:</b> signed by everyone who signed the original.</li>
<li><b>Recorded subordinations</b> and court orders (final and judge-signed).</li>
</ul>
<h4>Always call the underwriter for</h4>
<ul>
<li>Policy amounts over CLA's authority (before the commitment goes out).</li>
<li>Removing a standard exception after recent construction.</li>
<li>Foreclosure buyers, bankruptcies, short sales with revocable approvals.</li>
<li>Old liens you think have expired.</li>
<li><b>Any deal that doesn't make sense:</b> a quick resale at a big markup, a new owner with no loan, a seller nobody has spoken to.</li>
</ul>` + DO(["Write findings with the <b>recording reference</b> (book/page or instrument number) so anyone can pull the document.","Note what's needed, who will get it, and by when."]),
 keys:[["Affidavits","State facts, not conclusions"],["Over CLA's authority","Underwriter approval before the commitment"],["Deal doesn't make sense","Call the underwriter"],["Findings","Include the recording reference"]],
 traps:["An affidavit that just says 'sole heir.'","Sending a commitment over CLA's authority before approval."],
 qs:["TQ36","TQ37","TQ38","TQ39","TQ40"]}
];

const Q = [
["TQ01","BA","Which part of the commitment lists what must happen before the policy can issue?",["Schedule B-II, the exceptions", "The jacket and its conditions page", "Schedule B-I, the requirements", "Schedule A, with the owner and amounts"],2,"Schedule B-I lists requirements such as payoffs, releases and recording the new deed."],
["TQ02","BA","An easement for a utility line is recorded against the lot. Where does it usually appear?",["Nowhere; easements aren't insured", "Schedule B-I, as a payoff", "Schedule A, in the vesting", "Schedule B-II, as an exception"],3,"Easements usually stay as exceptions the buyer takes subject to."],
["TQ03","BA","The search shows an open judgment against the seller, but the commitment doesn't mention it. What's wrong?",["It belongs in the legal description instead", "Every open lien must be a requirement or an exception", "Nothing, since judgments are cleared automatically when the deed records", "Only the buyer's lender needs to worry about open judgments"],1,"Nothing open in the search should just disappear from the commitment."],
["TQ04","BA","Schedule A names \"Mary L. Jones,\" but the vesting deed went to \"Mary L. Jones-Carter.\" What do you do?",["Resolve the name difference before closing", "Have the buyer sign an affidavit that the names are close enough", "Ignore it, since the first and middle names already match", "Change the contract to match Schedule A"],0,"Names must match across Schedule A, the vesting deed and the contract, or be cured."],
["TQ05","BA","In a clean chain of title, who should be the grantor on each deed?",["Whoever pays the transfer taxes", "The grantee on the deed before it", "The county recorder's office", "The lender on the last deed of trust"],1,"Each grantee becomes the next grantor, with no gaps."],
["TQ06","BA","Robert J. Smith bought the house; the deed out is signed \"Bob Smith.\" What's the usual cure?",["A new boundary survey of the lot and the house", "An affidavit or recital tying the names together", "A quitclaim deed from the county recorder's office", "Nothing; nicknames don't matter"],1,"Name variations are cured with an affidavit or a recital in the deed."],
["TQ07","BA","What does a quitclaim deed promise the buyer?",["Title good against everyone", "Title backed by the underwriter", "Title good against the seller's own acts", "Nothing beyond whatever the seller had"],3,"A quitclaim passes only what the grantor had and makes no promises."],
["TQ08","BA","A deed in the chain has a defective notary acknowledgment. A state law may cure it after time passes. Who decides whether to rely on that?",["The processor, from the dates", "The underwriter, after reviewing the dates", "The listing agent", "The seller's attorney alone"],1,"Curative statutes are applied with underwriter guidance."],
["TQ09","BA","A deed reads \"to John and Ann Lee, husband and wife.\" Can you assume it's a joint tenancy?",["No; read the deed's actual tenancy wording", "Yes, if they're still married today", "No; married couples can't be joint tenants", "Yes, that wording always means joint tenancy"],0,"Don't read 'husband and wife' as joint tenancy; confirm how it was created."],
["TQ10","BA","A couple holds title as tenants by the entirety. There's an ordinary judgment against the husband only. Generally, does it attach?",["Only if the wife also co-signed the deed of trust on the house", "Yes, it always attaches to the husband's half of the house", "Yes, but only after he dies", "No, an ordinary judgment against one spouse generally doesn't"],3,"Entireties property is generally protected from one spouse's ordinary creditors."],
["TQ11","BA","Same couple, but the lien is a federal tax lien against the husband only. Does it attach?",["No, entireties property is fully protected from all of one spouse's debts", "Only if it was filed in DC", "Yes; federal tax liens reach one spouse's interest", "Only if the wife also owes back taxes to the IRS herself"],2,"Under U.S. v. Craft, a federal tax lien against one spouse attaches."],
["TQ12","BA","A surviving spouse says they own the house now. What do you need?",["A new appraisal of the property in the survivor's name", "Only the surviving spouse's signed word that they own it", "The lender's approval", "Proof of death and that there was no divorce"],3,"Survivorship needs proof of death and that the tenancy wasn't ended by divorce."],
["TQ13","ML","The search shows a 2015 deed of trust that was refinanced in 2019 but never released. What's needed?",["Nothing, because the 2019 refinance automatically replaced it", "A recorded release, or a payoff and then a release", "A new deed from the seller to the buyer's lender", "A survey showing the old loan no longer affects the land"],1,"Paid but unreleased loans still need a recorded release."],
["TQ14","ML","A loan was assigned to a new lender. Who gives the payoff and release?",["MERS, in every case", "The original lender on the deed of trust", "The buyer's lender", "Whoever holds the loan now"],3,"Payoffs and releases come from the current holder."],
["TQ15","ML","An open deed of trust from 1994 has no release, and you think it's expired. What do you do?",["Show the dates and let the underwriter decide", "Drop it, since any deed of trust over 30 years old has expired", "Ask the seller whether they remember paying it off years ago", "Remove it from the search report"],0,"Old loans can lapse by statute, but the underwriter decides."],
["TQ16","ML","A second loan is supposed to sit behind the new first loan. What makes that work?",["The closer's notes in the file", "A written, recorded subordination", "The order in which the checks are written", "A verbal agreement from the second lender"],1,"Subordinations must be in writing and recorded."],
["TQ17","ML","In Maryland, how long does an ordinary money judgment generally last?",["20 years, never renewable", "5 years", "Forever", "12 years, renewable"],3,"Ordinary Maryland judgments last 12 years and can be renewed."],
["TQ18","ML","A Virginia judgment was entered in 2023. Generally, how long does it last?",["10 years, unless extended", "20 years from the judgment", "5 years from entry", "Until the debtor dies"],0,"Virginia judgments entered after July 1, 2021 generally last 10 years."],
["TQ19","ML","A judgment is against \"Michael Brown,\" and our seller is Michael T. Brown with a different address. What usually handles it?",["Remove it from the search without any paperwork in the file", "An identity affidavit stating the facts", "Ask the creditor to waive it", "Pay it anyway at closing, just to be safe with the buyer"],1,"A same-name affidavit with specific facts usually clears it."],
["TQ20","ML","Before requesting a payoff on a judgment against the seller, what should happen?",["Tell the seller first", "Nothing; just request it", "Record a release", "Notify the county sheriff"],0,"Give the seller notice before requesting the payoff."],
["TQ21","TL","Generally, how long does a notice of federal tax lien last?",["10 years and 30 days from assessment, unless refiled", "Until the property is sold", "20 years from recording, and it can never be refiled", "5 years from the date the notice is filed in the land records"],0,"It lasts 10 years and 30 days from assessment unless refiled."],
["TQ22","TL","How far back should you search for federal tax liens?",["Only the last 2 years, since older liens have expired", "At least 11 years, or the whole ownership if longer", "Back to the seller's last sale only, never any further", "Federal liens aren't searched"],1,"Search far enough to catch any lien still in force."],
["TQ23","TL","A seller says the IRS lien is paid. What clears it from title?",["A paid receipt from the seller's CPA", "A recorded release, discharge or non-attachment", "The seller's bank statement showing the payment to the IRS", "An email from the IRS agent saying the balance is now zero"],1,"Only a recorded IRS release, discharge or non-attachment clears it."],
["TQ24","TL","The seller inherited the house from a parent who died four years ago. Nothing is recorded about estate tax. Is there a possible issue?",["No; with nothing recorded against the parent there can't be a lien", "Only if the parent lived in DC when they died", "Yes; the federal estate tax lien needs no filing", "No; estate tax ends at probate"],2,"The federal estate tax lien attaches at death for 10 years with no filing."],
["TQ25","TL","Why ask the seller about recent renovations?",["To help set the sales price for the buyer's appraisal", "To calculate the state and county transfer taxes", "Unpaid contractors can lien it before anything records", "To decide whether the buyer needs an inspection"],2,"Unpaid contractors can lien the property for recent work."],
["TQ26","TL","A UCC fixture filing for solar panels shows up. What is it?",["An HOA rule about what can be installed on roofs", "A ground rent on the land", "A county building permit that was never closed out", "Financing tied to items attached to the house"],3,"Fixture filings secure financing on things attached to the house."],
["TQ27","TL","A Florida property has an outstanding tax certificate. What happens at closing?",["Nothing; it expires at sale", "It is redeemed (paid off)", "The buyer assumes it", "The HOA pays it"],1,"Tax certificates must be redeemed."],
["TQ28","TL","Why can a DC litter or nuisance-abatement lien matter even if it's old?",["They're paid by the buyer's lender", "They only apply to commercial and multifamily property in DC", "They expire one year after recording unless renewed", "They're collected like taxes and some never expire"],3,"Some DC municipal liens are collected like taxes, and some are perpetual."],
["TQ29","EX","There's no survey on a purchase. What happens to survey matters?",["They're insured anyway under the standard owner's policy", "They're excepted from the policy", "The buyer can't close until a survey is ordered and done", "The seller has to pay for a new survey"],1,"Without an acceptable survey, survey matters stay excepted."],
["TQ30","EX","An old subdivision covenant has discriminatory language. How is it handled?",["The buyer must agree to it in writing", "It must be paid off", "It blocks closing until removed in court", "It is void and excluded"],3,"Discriminatory covenants are void and excluded."],
["TQ31","EX","A recorded easement runs right under the house. Is that a problem?",["No, easements are always fine", "Only if the HOA objects", "Yes; read it and raise it", "Only on a refinance"],2,"An easement under the house is a real issue to raise."],
["TQ32","EX","An LLC's manager says she can sign the sale because she runs the business day to day. What do you check?",["Nothing; an LLC's manager can always sell its real estate", "The LLC's bank statements and its last tax return", "The operating agreement and every amendment", "Only the manager's driver's license"],2,"Day-to-day authority usually doesn't cover selling the real estate."],
["TQ33","EX","A POA lets the agent sell the house. The agent also wants to sign a new mortgage. Is that covered?",["Only if it was notarized", "Yes, as long as the buyer's lender agrees to accept it", "No; a power to sell doesn't include mortgaging", "Yes, a power to sell includes every other real estate power"],2,"The POA must specifically grant each power used."],
["TQ34","EX","A managing member of the selling LLC is in personal bankruptcy. What happens?",["It goes to the underwriter for review", "The member signs an affidavit and closes", "Nothing; the LLC isn't in bankruptcy", "The buyer must sign a waiver"],0,"A member's bankruptcy can require court approval; underwriter review."],
["TQ35","EX","The LLC just changed who controls it and the new manager wants the proceeds. How do you verify?",["Use the phone number the new manager gave", "Accept the email since it came from the LLC's domain", "Ask the agent to vouch for him", "Use contact information from an independent source"],3,"Verify control changes through an independent source."],
["TQ36","UW","Which affidavit statement is acceptable?",["\"I never lived at that address, and my middle name is James.\"", "\"Title to this property is good and marketable.\"", "\"There are no problems with the title to this house.\"", "\"I am the sole heir of my late mother's estate.\""],0,"Affidavits must state facts the signer knows, not conclusions."],
["TQ37","UW","The policy amount is above CLA's authority. When is underwriter approval needed?",["After closing, when the final policy is issued", "Before the commitment goes out", "Never for purchases", "Only if the buyer's lender asks for it in writing"],1,"Approval comes before committing to that amount."],
["TQ38","UW","A property sold six weeks ago for $180,000 and is now selling for $410,000 with no renovations. What do you do?",["Raise the title premium", "Close it; prices change", "Ask the buyer if they're sure", "Call the underwriter before going further"],3,"Deals that don't make sense go to the underwriter."],
["TQ39","UW","What should every title finding include so anyone can pull the document?",["The recording reference", "The buyer's phone number", "The appraised value", "The agent's commission"],0,"Book/page or instrument number lets anyone find the document."],
["TQ40","UW","Who signs a corrective deed?",["Only the buyer who is purchasing the property", "The title company", "Only the current lender holding the deed of trust", "Everyone who signed the original deed"],3,"A corrective deed is signed by everyone who signed the original."]
];
const QUESTIONS = Q.map(([id,s,q,o,a,e]) => ({id,s,q,o,a,e}));

window.COURSES = window.COURSES || [];
window.COURSES.push({
  id: "titlereview",
  draft: true,
  title: "Reviewing a Title Search & Understanding Liens",
  subtitle: "Title review · Chain, vesting, liens, judgments and exceptions",
  description: "How to read a title search and commitment: chain of title, how title is held, mortgages, judgments, tax and other liens, exceptions, who has authority to sign, and when to call the underwriter.",
  source: "CLA Title training; general state and federal rules",
  exam: { counts: {BA:8, ML:6, TL:6, EX:5, UW:5}, minutes: 40, pass: 80 },
  rateCharts: false,
  sections: SECTIONS,
  lessons: LESSONS,
  questions: QUESTIONS
});
})();
