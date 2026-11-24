// Course: Fraud Prevention & Seller Verification (draft).
// Source: CLA "Training - Day 2" session, Nov 24 2026 (Gemini meeting notes forwarded by Cris Bolea).
(function(){
const SECTIONS = { WF: "Wire Fraud & Buyer Protection", PA: "Powers of Attorney & Notaries", SI: "Seller Impersonation & Identity", DS: "Disbursements, Deeds & Information Security" };
const NOTE = '<p class="note">From CLA\'s fraud-prevention training session, November 24, 2026. When something doesn\'t feel right, stop and escalate.</p>';
const DO = items => '<div class="ex"><b>How we do it at CLA</b><ul style="margin:6px 0 0">' + items.map(i => '<li>' + i + '</li>').join('') + '</ul></div>';

const LESSONS = [
{id:"F01",s:"WF",t:"How wire fraud happens",m:6,
 body: NOTE + `
<p>Most wire fraud starts with a <b>phishing link</b>. Someone on the deal (a buyer, an agent, a lender, even one of us) clicks a link, their computer or email is compromised, and the fraudster quietly reads the transaction emails. When money is about to move, the fraudster sends <b>fake wire instructions</b> that look exactly like ours.</p>
<p>These attacks are real and current. Law enforcement, including the FBI, is investigating recent attempts on transactions like ours. The money is usually gone within hours.</p>
<h4>Why email is the weak spot</h4>
<p>A compromised email account can send messages that look perfectly normal: right name, right signature, right file details. That's why CLA never relies on email alone for anything involving money.</p>`,
 keys:[["How it starts","A phishing link compromises someone's email or computer"],["What the fraudster sends","Fake wire instructions that look real"],["Weak spot","Email"]],
 traps:["Trusting an email because the signature and file details are right."],
 qs:["FQ01","FQ02","FQ03"]},

{id:"F02",s:"WF",t:"Protecting the buyer",m:6,
 body: NOTE + DO([
"Wire instructions go out <b>only through Qualia Connect</b>, never by email.",
"Buyers sign Qualia Connect's <b>anti-fraud awareness acknowledgment</b> before they get instructions.",
"Cover wire fraud on the <b>introductory buyer call</b>: we will never change our wire instructions, and they should call us before sending money.",
"Confirm instructions with the buyer by <b>text or phone</b>, using digits of the account number, so they can match what they see in Qualia.",
"Non-public information and closing documents go <b>only through Qualia Connect</b> too."]) + `
<h4>If a buyer says our instructions changed</h4>
<p>Stop. Tell them not to send anything. Our instructions don't change. Escalate to a manager right away.</p>`,
 keys:[["Wire instructions","Only through Qualia Connect, never by plain email"],["Buyer acknowledgment","Signed in Qualia Connect"],["Intro call","Warn about wire fraud"],["Confirmation","By text or phone with account digits"]],
 traps:["Emailing instructions 'just this once' because the buyer can't log in.","Treating a 'changed instructions' call as routine."],
 qs:["FQ04","FQ05","FQ06","FQ07"]},

{id:"F03",s:"PA",t:"Powers of attorney: why they're risky",m:7,
 body: NOTE + `
<p>A POA lets someone else sign for an owner. On the <b>seller side</b> it's far riskier than on the buyer side, because a seller POA can be used to sell a house the real owner never agreed to sell, and to send the proceeds to a fraudster.</p>
<h4>Our rules</h4>
<ul>
<li>Any POA <b>drafted outside CLA</b> goes to the <b>title team</b> for review and approval before it's used.</li>
<li>Any mention of <b>dementia or Alzheimer's</b> is an automatic escalation. The owner must be verified as being of sound mind, and a POA may not be enough.</li>
<li>If the seller <b>dies</b> while the contract is open, the POA ends at death. The sale has to go through the <b>estate (probate)</b>.</li>
</ul>
<h4>Better than a POA: get the real owner to sign</h4>
<p>Wherever we can, we avoid the POA altogether. We hold a <b>remote online notarization (RON)</b> session or send an <b>independent notary</b> to the owner. CLA covers the <b>$150</b> independent notary fee to keep the signing secure.</p>`,
 keys:[["Seller POA","Much higher risk than buyer POA"],["Outside-drafted POA","Title team approval first"],["Dementia/Alzheimer's","Automatic escalation"],["Seller dies","POA void; goes through probate"],["Alternative","RON or independent notary (CLA pays $150)"]],
 traps:["Accepting a seller POA because 'the family says it's fine.'","Continuing on a POA after the seller has died."],
 qs:["FQ08","FQ09","FQ10","FQ11","FQ12"]},

{id:"F04",s:"PA",t:"Third-party notaries",m:4,
 body: NOTE + `
<p>A notary the seller finds on their own (a "third-party" notary) is <b>not acceptable</b> unless it's verified through a law firm. A fraudster can line up a friendly notary as easily as a fake ID.</p>` + DO([
"Use CLA's own closers, a RON session, or an <b>independent notary CLA sends</b>.",
"If the seller insists on their own notary, escalate. It needs law firm verification.",
"Remember CLA pays the $150 for an independent notary; cost isn't a reason to cut corners."]),
 keys:[["Seller's own notary","Not acceptable without law firm verification"],["Our options","CLA closer, RON, or an independent notary we send"]],
 traps:["Letting the seller pick the notary to save time."],
 qs:["FQ13","FQ14"]},

{id:"F05",s:"SI",t:"Seller impersonation red flags",m:7,
 body: NOTE + `
<p>In seller impersonation fraud, someone pretends to be the owner and sells a property they don't own. The real owner often finds out after the money is gone.</p>
<h4>Red flags</h4>
<ul>
<li>A property that is <b>free and clear</b> or has a lot of equity, especially if the owner lives elsewhere.</li>
<li><b>Vacant land</b> or a vacant house.</li>
<li>A price <b>below market</b>.</li>
<li>A seller who <b>won't meet in person</b> or always has a reason not to.</li>
<li>Pressure to <b>rush</b> the closing.</li>
<li>A request to send proceeds somewhere other than an account in the seller's name.</li>
</ul>
<p>One red flag isn't proof. Two or three together means slow down and verify.</p>`,
 keys:[["Highest risk","Free-and-clear or high-equity property"],["Other flags","Vacant land, below-market price, won't meet, rush"]],
 traps:["Ignoring red flags because the agent seems legitimate."],
 qs:["FQ15","FQ16","FQ17","FQ18"]},

{id:"F06",s:"SI",t:"Verifying the seller and escalating",m:6,
 body: NOTE + DO([
"Get a <b>government-issued ID</b> for every seller.",
"Compare the seller's signature to the signature on the <b>prior recorded deed</b> from when they bought.",
"When you can't verify, or something doesn't add up, <b>escalate</b> to leadership: Caroline, Matt, Victoria or Joel.",
"Don't let a rush closing date override verification."]) + `
<p>It's always fine to escalate. A delayed closing can be fixed; a stolen house or wire usually can't.</p>`,
 keys:[["Seller ID","Government-issued"],["Signature check","Against the prior recorded deed"],["Escalate to","Leadership: Caroline, Matt, Victoria or Joel"]],
 traps:["Skipping verification to make the closing date."],
 qs:["FQ19","FQ20","FQ21"]},

{id:"F07",s:"DS",t:"Disbursement controls",m:5,
 body: NOTE + `
<p>The two biggest dollar risks on any file are <b>seller proceeds</b> and <b>mortgage payoffs</b>. That's where fraudsters aim.</p>` + DO([
"Seller proceeds go <b>only to an account belonging to the legal party of record</b>, the person or entity on title.",
"For an <b>entity</b> (LLC, corporation, trust), the account must be in that entity's name, not a member's or a third party's.",
"Any exception must be <b>cleared before closing</b>, not on disbursement day.",
"Verify payoff instructions by phone with the lender, using a number you found independently."]),
 keys:[["Biggest risks","Seller proceeds and payoffs"],["Proceeds account","Must belong to the party of record"],["Entity seller","Account in the entity's name"],["Exceptions","Cleared before closing"]],
 traps:["Wiring an LLC's proceeds to a member's personal account.","Approving a proceeds change on disbursement day."],
 qs:["FQ22","FQ23","FQ24"]},

{id:"F08",s:"DS",t:"Ladybird deeds, quitclaims and how title passes at death",m:5,
 body: NOTE + `
<p><b>Ladybird deeds</b> (enhanced life estate deeds, used in Florida) and <b>quitclaim deeds</b> often move property within a family. They can lead to <b>ownership lawsuits</b> if other family members object.</p>` + DO([
"Vet any ladybird or similar deed for <b>possible family disputes</b> before drafting it.",
"Coordinate with David when a ladybird or similar estate deed needs to be drafted.",
"Know how the property is held. The <b>tenancy</b> decides who owns it when an owner dies (survivorship vs. passing through the estate)."]),
 keys:[["Ladybird / quitclaim deeds","Vet for family disputes"],["Drafting estate deeds","Coordinate with David"],["At an owner's death","Tenancy decides who owns it"]],
 traps:["Drafting a family deed without asking about other heirs."],
 qs:["FQ25","FQ26"]}
];

const Q = [
["FQ01","WF","How does most wire fraud start?",["A clerk at the county recorder's office leaking the file", "A buyer mistyping the account number on their bank's site", "A bank employee quietly redirecting the funds after they arrive", "A phishing link that compromises someone's email or computer"],3,"Phishing links let fraudsters watch transaction emails."],
["FQ02","WF","An email has the right name, signature and file details and asks for a wire. Can you trust it?",["Yes, if it came from the real estate agent's usual address", "Not on that alone, because a compromised account can send exactly that email", "Yes, as long as the signature block matches past emails", "Yes, because it references the correct CLA file number"],1,"Compromised accounts send normal-looking emails."],
["FQ03","WF","Why doesn't CLA rely on email for anything involving money?",["Qualia's license agreement doesn't allow email at all", "Email is too slow to reach the buyer before the closing", "Banks won't accept wire requests that arrive by email", "Accounts can be hacked and read"],3,"Email is the weak spot in most wire fraud."],
["FQ04","WF","How does CLA send wire instructions?",["By text message from the processor's work phone", "By email, as a password-protected PDF attachment", "Through the buyer's agent, who forwards them on", "Only through Qualia Connect"],3,"Wire instructions go only through Qualia Connect."],
["FQ05","WF","What do buyers sign in Qualia Connect before getting wire instructions?",["An anti-fraud awareness acknowledgment about wire scams", "A limited power of attorney for the closer to sign", "The deed and the transfer tax forms for the county", "The lender's final Closing Disclosure and the loan note"],0,"Qualia Connect requires the anti-fraud acknowledgment."],
["FQ06","WF","A buyer calls saying they got new wire instructions from us. What do you do?",["Tell them not to send anything, then escalate it to a manager right away", "Confirm the new instructions since they came from our domain", "Tell them to use whichever set of instructions is newer", "Ask them to forward the email so you can update the file"],0,"Our instructions never change."],
["FQ07","WF","How can you confirm wire instructions with a buyer outside email?",["Reply to their last email with the account digits in it", "Post them in the deal's group chat so everyone sees them", "Have the buyer's agent call them to confirm the details", "By text or phone, reading them digits of the account number to match"],3,"Confirm by text or phone with account digits."],
["FQ08","PA","Which POA carries more risk?",["A buyer-side POA", "A seller-side POA", "They're the same", "Neither; POAs are always safe once notarized"],1,"A seller POA can be used to sell a house the owner never agreed to sell."],
["FQ09","PA","A POA was drafted by an outside attorney. What happens before it's used?",["Nothing extra is needed if an attorney drafted it", "The listing agent approves it and sends it to the closer", "The processor accepts it as long as it's notarized", "The CLA title team reviews and approves it before it's used"],3,"Outside-drafted POAs go to the title team."],
["FQ10","PA","The seller's son mentions his mother has dementia. What happens?",["Proceed with the son's POA, since he's family", "Nothing changes as long as the mother is still alive", "It's escalated automatically so the seller's sound mind can be verified", "Have the son sign the deed in his own name instead"],2,"Dementia or Alzheimer's triggers automatic escalation."],
["FQ11","PA","The seller dies before closing. What about the POA?",["The agent named in the POA can still sign the deed", "The buyer decides whether to accept it or cancel", "It's void at death, so the sale has to go through probate", "It stays valid until the closing that was already scheduled"],2,"A POA ends at the owner's death."],
["FQ12","PA","How does CLA avoid relying on a risky seller POA?",["Letting the buyer's agent sign for the seller at closing", "Accepting any POA as long as a notary stamped it", "Skipping the seller's signing and recording anyway", "A RON session or an independent notary CLA pays for"],3,"RON or an independent notary ($150, paid by CLA) gets the real owner to sign."],
["FQ13","PA","The seller wants to use a notary they found themselves. Is that acceptable?",["Only on refinances", "Not without law firm verification", "Yes, if they're licensed in the state", "Yes, any commissioned notary is acceptable"],1,"Third-party notaries need law firm verification."],
["FQ14","PA","Who pays the $150 independent notary fee CLA arranges?",["The lender", "The buyer", "The seller", "CLA pays it to keep the signing secure"],3,"CLA covers it to keep signings secure."],
["FQ15","SI","Which property is the highest risk for seller impersonation?",["A house with a large first mortgage and a HELOC", "A free-and-clear house, owner out of town", "A condo or townhouse inside an HOA community", "A new construction sale directly from the builder"],1,"High equity with no lender involved is the classic target."],
["FQ16","SI","Which is a seller impersonation red flag?",["A buyer with a lender pre-approval letter", "A seller who meets our notary at the property", "A vacant lot listed well below market price", "A normal 45-day closing with a financed buyer"],2,"Vacant land and below-market prices are red flags."],
["FQ17","SI","The seller can never meet in person and wants to close in a week. What does that suggest?",["Nothing unusual for a seller who travels for work", "The buyer is probably the one committing fraud", "Red flags that call for slowing down and verifying", "Just a motivated seller, so close as fast as possible"],2,"Won't meet plus rush closing are classic red flags."],
["FQ18","SI","One red flag shows up on a file. Is it proof of fraud?",["Yes, so cancel the file and notify the agents", "No, but two or three together means verify", "No, so it can be ignored on this file", "Yes, so call the police before doing anything else"],1,"One flag isn't proof; several together call for verification."],
["FQ19","SI","How do you verify the seller's signature?",["Signatures aren't checked if the ID looks valid", "Compare it to the signature on the prior recorded deed", "Ask the listing agent whether it looks right", "Compare it only to the signature on the sales contract"],1,"Check against the deed from when they bought."],
["FQ20","SI","You can't verify the seller's identity. Who do you escalate to?",["The listing agent who brought in the file", "The buyer's lender and loan officer", "Nobody; close on schedule and note the file", "Caroline, Matt, Victoria or Joel"],3,"Escalate to leadership."],
["FQ21","SI","The closing date is tomorrow and verification isn't finished. What wins?",["Verification comes first, even if closing moves", "The closing date", "The buyer's rate lock", "The agent's request"],0,"A delayed closing can be fixed; a stolen house can't."],
["FQ22","DS","What are the two biggest dollar risks on a file?",["Recording fees and transfer taxes", "Seller proceeds and mortgage payoffs", "HOA dues and prorations", "Title premiums and endorsement charges"],1,"That's where fraudsters aim."],
["FQ23","DS","An LLC is selling. Where can its proceeds go?",["Wherever the manager says in a signed letter", "Only to an account held in the LLC's own name", "To any member's personal account the manager names", "To the buyer's agent to hold until it's sorted out"],1,"Proceeds go only to the party of record."],
["FQ24","DS","When must a proceeds-account exception be cleared?",["On disbursement day", "It doesn't need clearing", "Before closing, not on disbursement day", "After recording"],2,"Exceptions are cleared before closing."],
["FQ25","DS","Why vet a ladybird or quitclaim deed for family issues?",["They can lead to family lawsuits", "They need two notaries and two witnesses to record", "Lenders won't accept them on a future refinance", "They cost more to record than a regular deed"],0,"Family disputes can turn into lawsuits."],
["FQ26","DS","What decides who owns a property when an owner dies?",["How title is held", "The buyer's purchase contract", "The listing agent", "The county assessor's records"],0,"Survivorship vs. estate depends on the tenancy."]
];
const QUESTIONS = Q.map(([id,s,q,o,a,e]) => ({id,s,q,o,a,e}));

window.COURSES = window.COURSES || [];
window.COURSES.push({
  id: "fraud",
  draft: true,
  title: "Fraud Prevention & Seller Verification",
  subtitle: "Wire fraud · POAs · Seller impersonation · Disbursement controls",
  description: "How wire fraud and seller impersonation happen, CLA's rules for wire instructions, powers of attorney and notaries, how to verify sellers, where proceeds may go, and when to escalate.",
  source: "CLA fraud-prevention training, Nov 24 2026",
  exam: { counts: {WF:5, PA:5, SI:5, DS:4}, minutes: 25, pass: 80 },
  rateCharts: false,
  sections: SECTIONS,
  lessons: LESSONS,
  questions: QUESTIONS
});
})();
