/* deed-md.js : Maryland deed preparation (John, Nov 19 2026: "add a deed preparation"; Cris Bolea's Deed Preparation Checklist
 * and sample deeds, emailed Nov 19; "DEED- IMPORTANT NOTES" in Drive).
 * PURE: no network, no page. Given the deed facts (pulled from the contract and the search by the AI, or from a portal file),
 *   buildDeed(facts)  -> the deed in CLA's own standard wording, as blocks a page or a Word writer can lay out
 *   checkDeed(facts)  -> the checklist: what passed, what is flagged, what supporting documents are still needed
 * The AI never writes deed wording. It only supplies facts; every sentence below is copied from CLA's recorded deeds
 * (MD-24-23755 tenants by the entirety, MD-24-22141 personal representatives, MD-21-11251 sole owner), so two deeds with the
 * same facts always read the same. Built to move into the portal unchanged: the portal passes a file's facts instead of the AI's.
 * Every draft needs attorney review (the certification names the attorney in DEED_SETTINGS). */

export const DEED_SETTINGS = {
  attorney: 'Joel L. Steinberg, Esq.',      // signs the preparation certificate on every CLA sample deed
  returnTo: ['CLA TITLE & ESCROW', '9210 Corporate Boulevard, Suite 150', 'Rockville, MD 20850'],
  underwriter: 'Fidelity National Title Insurance Company',
};

// Deed types CLA uses (samples in Cris's email and in Drive). Only the arm's-length sale deed is drafted automatically for now;
// the others are drafted by the attorney from the named sample, and the checklist says so.
export const DEED_TYPES = {
  sale: { label: 'Deed (sale, special warranty)', auto: true },
  gift: { label: 'Deed of gift / no consideration', auto: false, sample: 'QCD SAMPLE - MONTGOMERY COUNTY ADDING SPOUSE' },
  quitclaim: { label: 'Quitclaim deed', auto: false, sample: 'MD SAMPLE - QUITCLAIM DEED' },
  substitute_trustee: { label: "Substitute trustees' deed (foreclosure)", auto: false, sample: 'DEED SAMPLE - SUBSTITUTE TRUSTEES DEED' },
  ground_rent_redemption: { label: 'Deed in redemption of ground rent', auto: false, sample: 'DEED SAMPLE - GROUND RENT REDEMPTION' },
  into_llc: { label: 'Deed into an LLC (no consideration)', auto: false, sample: 'DEED-MD-7752 - Deed Into LLC' },
};

export const TENANCIES = {
  sole: 'Sole Owner',
  tbe: 'tenants by the entirety',
  jt: 'joint tenants',
  tic: 'tenants in common',
  entity: '',
};

/* ---------- small helpers ---------- */
const clean = (s) => String(s == null ? '' : s).replace(/\s+/g, ' ').trim();
const listAnd = (xs) => { const a = xs.filter(Boolean); return a.length <= 1 ? (a[0] || '') : a.length === 2 ? `${a[0]} and ${a[1]}` : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`; };
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
export function longDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(String(iso || ''));
  return m ? `${MONTHS[Number(m[2]) - 1]} ${Number(m[3])}, ${m[1]}` : clean(iso);
}
const ONES = ['', 'ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN', 'ELEVEN', 'TWELVE', 'THIRTEEN', 'FOURTEEN', 'FIFTEEN', 'SIXTEEN', 'SEVENTEEN', 'EIGHTEEN', 'NINETEEN'];
const TENS = ['', '', 'TWENTY', 'THIRTY', 'FORTY', 'FIFTY', 'SIXTY', 'SEVENTY', 'EIGHTY', 'NINETY'];
function under1000(n) {
  const h = Math.floor(n / 100), r = n % 100, out = [];
  if (h) out.push(`${ONES[h]} HUNDRED`);
  if (r) out.push(r < 20 ? ONES[r] : `${TENS[Math.floor(r / 10)]}${r % 10 ? ' ' + ONES[r % 10] : ''}`);
  return out.join(' ');
}
// CLA's style, from the samples: "EIGHT HUNDRED THIRTY TWO THOUSAND AND 00/100 DOLLARS ($832,000.00)" (no hyphens)
export function amountWords(amount) {
  const cents = Math.round((Number(amount) || 0) * 100), dollars = Math.floor(cents / 100), c = cents % 100;
  const parts = []; let n = dollars;
  for (const [size, name] of [[1e9, 'BILLION'], [1e6, 'MILLION'], [1e3, 'THOUSAND'], [1, '']]) {
    const chunk = Math.floor(n / size); n %= size;
    if (chunk) parts.push(`${under1000(chunk)}${name ? ' ' + name : ''}`);
  }
  const usd = '$' + (cents / 100).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  return `${parts.join(' ') || 'ZERO'} AND ${String(c).padStart(2, '0')}/100 DOLLARS (${usd})`;
}

/* ---------- parties ---------- */
// facts.grantors: [{ name, kind: 'individual'|'personal_representative'|'entity'|'trustee', estateOf, decedentDiedOn, entityDesc, signer, signerTitle }]
// facts.grantees: [{ name, kind: 'individual'|'entity', entityDesc, gender: 'F'|'M'|'' }], facts.tenancy, facts.granteesMarried
function grantorClause(f) {
  const g = f.grantors || [];
  const prs = g.filter((x) => x.kind === 'personal_representative');
  const others = g.filter((x) => x.kind !== 'personal_representative').map((x) =>
    x.kind === 'entity' ? `${clean(x.name)}${x.entityDesc ? ', ' + clean(x.entityDesc) : ''}`
      : x.kind === 'trustee' ? (/trustee/i.test(x.name) ? clean(x.name) : `${clean(x.name)}${x.trustName ? `, Trustee of the ${clean(x.trustName)}` : ', Trustee'}`)
        : clean(x.name));
  const parts = [...others];
  if (prs.length) {
    const est = prs[0];
    parts.unshift(`${listAnd(prs.map((x) => clean(x.name)))}, Personal Representative${prs.length > 1 ? 's' : ''} of Estate of ${clean(est.estateOf)}${est.decedentDiedOn ? `, who passed on ${longDate(est.decedentDiedOn)}` : ''}`);
  }
  return listAnd(parts);
}
// "husband and wife" / "wife and husband": the order follows the names (IMPORTANT NOTES 2: a female first grantee is WIFE AND HUSBAND)
export function maritalPhrase(f) {
  const e = f.grantees || [];
  if (!f.granteesMarried || e.length !== 2) return '';
  const [a, b] = e.map((x) => x.gender);
  if (a === 'F' && b === 'M') return 'wife and husband';
  if (a === 'M' && b === 'F') return 'husband and wife';
  return 'spouses';
}
function tenancyPhrase(f) {
  if (f.tenancy === 'sole') return 'as Sole Owner';
  if (f.tenancy === 'entity') return '';
  return `as ${TENANCIES[f.tenancy] || 'tenants in common'}`;
}
function granteeNames(f) { return listAnd((f.grantees || []).map((x) => clean(x.name))); }
// first paragraph: names, marital status and tenancy (IMPORTANT NOTES 1)
function granteeClause(f) {
  const e = f.grantees || [];
  if (f.tenancy === 'entity') return listAnd(e.map((x) => `${clean(x.name)}${x.entityDesc ? ', ' + clean(x.entityDesc) : ''}`));
  if (f.tenancy === 'sole') return `${granteeNames(f)}, Sole Owner`;
  return [granteeNames(f), maritalPhrase(f), tenancyPhrase(f)].filter(Boolean).join(', ');
}
const plural = (xs) => (xs || []).length > 1;
function granteePronouns(f) {
  const e = f.grantees || [];
  if (f.tenancy === 'entity' || (e.length === 1 && e[0].kind === 'entity')) return { poss: 'its', obj: 'it' };
  if (e.length > 1) return { poss: 'their', obj: 'them' };
  return e[0] && e[0].gender === 'F' ? { poss: 'her', obj: 'her' } : e[0] && e[0].gender === 'M' ? { poss: 'his', obj: 'him' } : { poss: 'their', obj: 'them' };
}
// who the grant runs to: CLA's survivorship wording for sole owner / TBE / JT; tenants in common and entities take no survivorship
function grantRunsTo(f) {
  const p = granteePronouns(f);
  if (f.tenancy === 'entity') return `${p.poss} successors and assigns, in fee simple`;
  if (f.tenancy === 'tic') return `${p.poss} heirs, personal representatives and assigns, in fee simple`;
  return `${p.poss} assigns, the survivor of ${p.obj} and the survivor's heirs, personal representatives and assigns, in fee simple`;
}
function grantorCovenant(f) {
  const g = f.grantors || [];
  const entity = g.length === 1 && g[0].kind === 'entity';
  const many = plural(g) || g.some((x) => x.kind === 'personal_representative' && g.length > 1);
  const who = many ? 'they' : entity ? 'it' : g[0] && g[0].gender === 'F' ? 'she' : g[0] && g[0].gender === 'M' ? 'he' : 'they';
  const has = who === 'they' ? 'have' : 'has';
  return `And the said part${many ? 'ies' : 'y'} of the first part hereby covenant${many ? '' : 's'} that ${who} ${has} not done or suffered to be done any act, matter or thing whatsoever, to encumber the property hereby conveyed; that ${who} will warrant specially the property hereby granted; and that ${who} will execute such further assurances of the same as may be requisite.`;
}
function situate(f) {
  return /baltimore city/i.test(f.county || '') ? 'Baltimore City, State of Maryland' : `the County of ${clean(f.county).replace(/\s+county$/i, '')}, State of Maryland`;
}
function countyName(f) { return /baltimore city/i.test(f.county || '') ? 'Baltimore City' : `${clean(f.county).replace(/\s+county$/i, '')} County`; }
function beingSame(f) {
  const p = f.priorDeed || {};
  let s = `Being the same property which by deed dated ${longDate(p.dated)}, and recorded among the Land Records of ${countyName(f)}, Maryland on ${longDate(p.recorded)}, in Liber ${clean(p.liber)}, in Folio ${clean(p.folio)}, was granted and conveyed by ${clean(p.from)} unto ${clean(p.to)}.`;
  for (const d of f.deaths || []) s += ` Said that ${clean(d.name)} departed this world on or about ${longDate(d.diedOn)}, leaving ${clean(d.leaving)}.`;
  return s;
}

/* ---------- the deed ---------- */
// Blocks: { kind: 'notice'|'title'|'p'|'center'|'legal'|'signature'|'notary'|'cert'|'returnTo'|'header'|'pagebreak', text, ... }
export function buildDeed(facts) {
  const f = facts || {};
  const type = DEED_TYPES[f.deedType || 'sale'];
  if (!type || !type.auto) throw new Error(`${type ? type.label : 'This deed type'} is drafted by the attorney from the sample deed, not automatically.`);
  const year = clean(f.year) || String(new Date().getFullYear());
  const month = clean(f.month) || '__________';
  const g = f.grantors || [];
  const B = [];
  B.push({ kind: 'header', lines: [`File No.: ${clean(f.fileNo)}`, 'Property Address:', ...String(f.propertyAddress || '').split(/\n|,\s*(?=[A-Z][a-z]+,?\s+MD)/).map(clean).filter(Boolean), `Tax ID #: ${clean(f.taxId)}`, `Title Insurance: ${DEED_SETTINGS.underwriter}`] });
  B.push({ kind: 'returnTo', lines: ['AFTER RECORDING, PLEASE RETURN TO:', ...DEED_SETTINGS.returnTo] });
  const many = plural(g) || (g[0] && g[0].kind === 'personal_representative' && g.length > 1);
  const manyE = plural(f.grantees);
  B.push({ kind: 'p', text: `This Deed, made this _________ day of ${month}, ${year} by and between ${grantorClause(f)}, part${many ? 'ies' : 'y'} of the first part, Grantor${many ? 's' : ''}; and ${granteeClause(f)}, part${manyE ? 'ies' : 'y'} of the second part, Grantee${manyE ? 's' : ''}.` });
  B.push({ kind: 'center', text: '- Witnesseth -' });
  const tp = tenancyPhrase(f);
  B.push({ kind: 'p', text: `That for and in consideration of the sum of ${amountWords(f.consideration)}, which includes the amount of any outstanding Mortgage or Deed of Trust, if any, the receipt whereof is hereby acknowledged, the said Grantor${many ? 's' : ''} ${many ? 'do' : 'does'} grant and convey to the said ${granteeNames(f)}${f.tenancy === 'sole' || f.tenancy === 'entity' ? '' : maritalPhrase(f) ? ', ' + maritalPhrase(f) : ''}${tp ? ', ' + tp : ''}, ${grantRunsTo(f)}, all that lot of ground situate in ${situate(f)} and described as follows, that is to say:` });
  B.push({ kind: 'center', text: '(SEE ATTACHED EXHIBIT A)' });
  for (const c of f.extraClauses || []) B.push({ kind: 'p', text: clean(c) });   // FFB lien, MPDU covenants, condominium: copied word for word from the record
  B.push({ kind: 'p', text: 'SUBJECT TO any and all covenants, easements, plat restrictions, agreements, and other restrictions of record.' });
  B.push({ kind: 'p', text: beingSame(f) });
  B.push({ kind: 'p', text: 'Together with the buildings and improvements thereon erected, made or being; and all and every, the rights, alleys, ways, waters, privileges, appurtenances and advantages thereto belonging, or in anywise appertaining.' });
  B.push({ kind: 'p', text: `To Have and To Hold the said tract of ground and premises above described and mentioned, and hereby intended to be conveyed, together with the rights, privileges, appurtenances and advantages thereto belonging or appertaining unto and to the proper use and benefit of the said ${granteeNames(f)}${f.tenancy === 'sole' || f.tenancy === 'entity' ? '' : maritalPhrase(f) ? ', ' + maritalPhrase(f) : ''}${tp ? ', ' + tp : ''}, ${grantRunsTo(f)}.` });
  B.push({ kind: 'p', text: grantorCovenant(f) });
  B.push({ kind: 'p', text: `As Witness the hand and seal of said Grantor${many ? 's' : ''}, the day and year first above written.` });
  B.push({ kind: 'signature', blocks: signatureBlocks(f) });
  for (const who of notaryGroups(f)) B.push({ kind: 'notary', text: `I hereby certify that on the _____ day of __________, ${year}, before me, the subscriber, a Notary Public of the State of Maryland, in and for the County aforesaid, personally appeared ${who}, known to me or satisfactorily proven to be the person whose name is subscribed to the within instrument and made oath in due form of law that the matters and facts set forth herein are true.` });
  B.push({ kind: 'cert', text: 'THIS IS TO CERTIFY that the within Deed was prepared by, or under the supervision of the undersigned, an Attorney duly admitted to practice before the Court of Appeals of Maryland.', signer: DEED_SETTINGS.attorney });
  B.push({ kind: 'pagebreak' });
  B.push({ kind: 'title', text: 'EXHIBIT A' });
  B.push({ kind: 'p', text: `ALL that certain lot, parcel or tract of land, situate and lying in ${situate(f).replace(/^the /, 'the ')}, and being more particularly described as follows:` });
  for (const para of legalBody(f.legalDescription).split(/\n\s*\n/).map((x) => x.trim()).filter(Boolean)) B.push({ kind: 'legal', text: para });
  B.push({ kind: 'p', text: 'FOR INFORMATIONAL PURPOSES ONLY:' });
  B.push({ kind: 'p', text: `Property Address: ${clean(String(f.propertyAddress || '').replace(/\n/g, ', '))}` });
  B.push({ kind: 'p', text: `Tax ID: ${clean(f.taxId)}` });
  B.push({ kind: 'p', text: beingSame(f) });
  return B;
}
// the record's own lead-in ("All that lot of ground situate in ... that is to say:") duplicates Exhibit A's opening line
export function legalBody(t) { return String(t || '').replace(/^\s*all that (lot|piece|parcel)[^:]{0,250}?(that is to say|as follows)\s*:\s*/i, '').trim(); }
function signatureBlocks(f) {
  const out = [];
  const g = f.grantors || [];
  const prs = g.filter((x) => x.kind === 'personal_representative');
  if (prs.length) out.push({ heading: `Estate of ${clean(prs[0].estateOf)}`, signers: prs.map((x) => `${clean(x.name)}, Personal Representative`), by: true });
  for (const x of g.filter((y) => y.kind !== 'personal_representative')) {
    if (x.kind === 'entity') out.push({ heading: clean(x.name), signers: [`${clean(x.signer) || '____________________'}, ${clean(x.signerTitle) || 'Authorized Signatory'}`], by: true });
    else if (x.kind === 'trustee') out.push({ heading: x.trustName ? clean(x.trustName) : '', signers: [`${clean(x.signer || String(x.name).split(',')[0])}, Trustee`], by: !!x.trustName });
    else out.push({ heading: '', signers: [clean(x.name)], by: false });
  }
  return out;
}
function notaryGroups(f) {
  const g = f.grantors || [];
  const prs = g.filter((x) => x.kind === 'personal_representative');
  const out = [];
  if (prs.length) out.push(`${listAnd(prs.map((x) => clean(x.name)))}, Personal Representative${prs.length > 1 ? 's' : ''} of Estate of ${clean(prs[0].estateOf)}`);
  const ind = g.filter((x) => x.kind === 'individual').map((x) => clean(x.name));
  for (const x of g.filter((y) => y.kind === 'trustee')) out.push(`${clean(x.signer || String(x.name).split(',')[0])}, Trustee${x.trustName ? ' of the ' + clean(x.trustName) : ''}`);
  if (ind.length) out.push(listAnd(ind));
  for (const x of g.filter((y) => y.kind === 'entity')) out.push(`${clean(x.signer) || '____________________'}, ${clean(x.signerTitle) || 'Authorized Signatory'} of ${clean(x.name)}`);
  return out;
}
// plain text of the deed (for the review page, tests and comparing with a sample)
export function deedText(blocks) {
  const out = [];
  for (const b of blocks) {
    if (b.kind === 'header' || b.kind === 'returnTo') out.push(b.lines.join('\n'));
    else if (b.kind === 'signature') for (const s of b.blocks) out.push([s.heading, ...s.signers.map((n) => `${s.by ? 'By: ' : ''}______________________________(SEAL)\n${n}`)].filter(Boolean).join('\n'));
    else if (b.kind === 'notary') out.push(`STATE OF MARYLAND\nCOUNTY OF ____________________________, to wit:\n${b.text}\nAs witness, my hand and notarial seal.\n______________________________\nSignature of Notary Public\nMy Commission Expires:`);
    else if (b.kind === 'cert') out.push(`${b.text}\n______________________________(SEAL)\n${b.signer}`);
    else if (b.kind === 'pagebreak') out.push('----- page break -----');
    else out.push(b.text);
  }
  return out.join('\n\n');
}

/* ---------- the checklist ---------- */
// Name matching for "sellers must match" (John, Nov 19): the same person written two ways should match ("John A. Smith" vs "John Smith"),
// a different person or a missing owner should not.
const NOISE = new Set(['etal', 'et', 'al', 'and', 'trustee', 'trustees', 'of', 'the', 'revocable', 'irrevocable', 'living', 'trust', 'estate', 'personal', 'representative', 'mr', 'mrs', 'ms', 'dr']);
export function nameKey(n) { return clean(n).toLowerCase().replace(/[.,]/g, ' ').replace(/\s+/g, ' ').trim(); }
const tokens = (n) => nameKey(n).split(' ').filter((t) => t && !NOISE.has(t));
// One contract line can hold several people, SDAT style ("MADURO NOVIA SUNDAY ETAL & WEIDENHAFT JEFFREY BAYN"): split it.
export function splitNames(list) {
  const out = [];
  for (const x of list || []) for (const part of String(x).split(/\s+&\s+|\s+and\s+(?=[A-Z])|;\s*/)) { const c = clean(part.replace(/\bET\s*AL\b\.?/i, '')); if (c) out.push(c); }
  return out;
}
// The same person written two ways should match ("John A. Smith", "SMITH JOHN A", "John C Gaughan Revocable Trust" vs
// "John C. Gaughan, Trustee of the John C. Gaughan Revocable Trust"); a different person should not. Match = same first and last
// name tokens in any order, and middle names/initials that don't conflict.
function sameName(a, b) {
  const A = tokens(a), Bt = tokens(b);
  if (!A.length || !Bt.length) return false;
  const long = (t) => t.length > 1;
  const aFull = A.filter(long), bFull = Bt.filter(long);
  const [small, big] = aFull.length <= bFull.length ? [aFull, bFull] : [bFull, aFull];
  if (!small.length) return false;
  if (small.length === 1) return big.length === 1 && big[0] === small[0];
  const hits = small.filter((t) => big.includes(t) || big.some((u) => u.startsWith(t) || t.startsWith(u))).length;
  return hits >= Math.min(2, small.length) && hits >= small.length - 1;
}
function exact(a, b) { return nameKey(a).replace(/\s/g, '') === nameKey(b).replace(/\s/g, ''); }
export function compareNames(listA, listB) {
  const missing = [], spelled = [];
  for (const a of listA) {
    const hit = listB.find((b) => sameName(a, b));
    if (!hit) missing.push(a); else if (!exact(a, hit)) spelled.push([a, hit]);
  }
  return { missing, spelled };
}

// item: { step: checklist section (Cris's numbering), status: 'ok'|'flag'|'todo', text }
export function checkDeed(facts) {
  const f = facts || {}; const out = [];
  const add = (step, status, text) => out.push({ step, status, text });
  const type = DEED_TYPES[f.deedType || 'sale'];
  if (!type) add('3. Deed type', 'flag', 'Deed type not recognized. Pick the deed type before drafting.');
  else if (!type.auto) add('3. Deed type', 'flag', `${type.label}: the attorney drafts this from the sample "${type.sample}". The draft below is not produced for this type.`);
  else add('3. Deed type', 'ok', `${type.label}.`);

  // 1. file review
  add('1. File review', f.propertyAddress ? 'ok' : 'flag', f.propertyAddress ? `Property address: ${clean(String(f.propertyAddress).replace(/\n/g, ', '))}.` : 'Property address is missing.');
  add('1. File review', f.county ? 'ok' : 'flag', f.county ? `County: ${countyName(f)}, Maryland.` : 'County is missing.');
  const taxOk = /^\d{2}-\d{6,10}$/.test(clean(f.taxId)) || /^\d{2}-\d{2}-\d{4}-\d{3}/.test(clean(f.taxId));
  add('1. File review', taxOk ? 'ok' : 'flag', taxOk ? `Tax ID ${clean(f.taxId)}.` : `Tax ID "${clean(f.taxId) || 'missing'}" doesn't look like a Maryland account number (district-account, e.g. 02-03414356). Check SDAT.`);
  const p = f.priorDeed || {};
  const priorOk = p.liber && p.folio && p.dated && p.recorded && p.from && p.to;
  add('1. File review', priorOk ? 'ok' : 'flag', priorOk ? `Vesting deed: Liber ${p.liber}, Folio ${p.folio}, recorded ${longDate(p.recorded)}.` : 'The current vesting deed reference is incomplete (need date, recording date, liber, folio, from and to). Get the recorded deed.');
  add('1. File review', f.legalDescription && f.legalDescription.length > 40 ? 'ok' : 'flag', f.legalDescription && f.legalDescription.length > 40 ? 'Legal description copied from the record.' : 'Legal description is missing or too short. Copy it word for word from the vesting deed.');
  if (f.legalSource) add('7. Quality control', f.legalMatchesCommitment === false ? 'flag' : 'ok', f.legalMatchesCommitment === false ? `The legal description in the vesting deed and in the commitment differ. ${clean(f.legalDiffNote)}` : `Legal description taken from ${clean(f.legalSource)}.`);

  // 2. parties: sellers must match the contract AND title (John, Nov 19)
  const grantorNames = (f.grantors || []).map((x) => x.name);
  const owners = f.ownersOfRecord || [];
  const sellers = splitNames(f.contractSellers);
  if (!owners.length) add('2. Parties', 'flag', 'Owners of record (from the vesting deed) were not found in the search.');
  if (!sellers.length) add('2. Parties', 'flag', 'Sellers were not found in the contract. Upload the full contract.');
  const living = owners.filter((o) => !(f.deaths || []).some((d) => sameName(d.name, o)));
  if (owners.length && sellers.length) {
    const titleVsContract = compareNames(living, sellers);
    const contractVsTitle = compareNames(sellers, living);
    for (const m of titleVsContract.missing) add('2. Parties', 'flag', `${m} is an owner on title but is not a seller on the contract. Every owner must sign the deed: get them added to the contract or get proof they no longer own (death certificate, divorce decree, prior deed).`);
    for (const m of contractVsTitle.missing) add('2. Parties', 'flag', `${m} signed the contract as a seller but is not an owner on title. Confirm why (power of attorney, personal representative, new owner).`);
    for (const [a, b] of titleVsContract.spelled) add('2. Parties', 'flag', `Name differs: "${a}" on title vs "${b}" on the contract. The deed uses the title name; add an "also known as" if needed.`);
    if (!titleVsContract.missing.length && !contractVsTitle.missing.length && !titleVsContract.spelled.length) add('2. Parties', 'ok', `Sellers on the contract match the owners on title: ${listAnd(living)}.`);
  }
  for (const d of f.deaths || []) {
    const pr = (f.grantors || []).some((x) => x.kind === 'personal_representative');
    add('2. Parties', pr || d.survivorshipCovers ? 'ok' : 'flag', pr || d.survivorshipCovers ? `${d.name} is deceased (${longDate(d.diedOn)}); ${pr ? 'the personal representative signs' : 'title passed to the survivor'}.` : `${d.name} is deceased but no personal representative is on the deed. Get the estate papers (letters of administration) or proof title passed by survivorship.`);
  }
  for (const x of f.grantors || []) {
    const onTitle = owners.some((o) => sameName(o, x.name)) || x.kind === 'personal_representative';
    if (owners.length && !onTitle) add('7. Quality control', 'flag', `Grantor "${x.name}" is not an owner of record. The grantor names must match the current recorded deed.`);
  }
  // grantees vs contract buyers
  const buyers = splitNames(f.contractBuyers);
  if (buyers.length) {
    const c = compareNames(buyers, (f.grantees || []).map((x) => x.name));
    for (const m of c.missing) add('2. Parties', 'flag', `${m} is a buyer on the contract but not a grantee on the deed. Confirm vesting instructions (assignment or addendum?).`);
    if (!c.missing.length) add('2. Parties', 'ok', `Grantees match the buyers on the contract: ${listAnd(buyers)}.`);
  } else add('2. Parties', 'flag', 'Buyers were not found in the contract.');

  // tenancy rules + IMPORTANT NOTES
  const n = (f.grantees || []).length;
  if (f.tenancy === 'sole' && n !== 1) add('2. Parties', 'flag', `"Sole Owner" but there are ${n} grantees.`);
  if (f.tenancy === 'tbe' && (n !== 2 || !f.granteesMarried)) add('2. Parties', 'flag', 'Tenants by the entirety is only for two grantees who are married to each other.');
  if (!f.tenancy) add('2. Parties', 'flag', 'How the buyers will take title (sole owner, tenants by the entirety, joint tenants, tenants in common) is not stated. Ask the buyers.');
  else if (f.tenancySource !== 'stated') add('2. Parties', 'flag', `Tenancy "${TENANCIES[f.tenancy] || f.tenancy}" was assumed, not stated in the contract. Confirm vesting with the buyers.`);
  if (f.granteesMarried && n === 2) {
    const ph = maritalPhrase(f);
    add('6. Drafting', ph === 'spouses' ? 'flag' : 'ok', ph === 'spouses' ? "Couldn't tell which grantee is the wife and which is the husband. Confirm so the deed reads \"wife and husband\" or \"husband and wife\" in name order." : `Marital status reads "${ph}", in the order the names appear (a woman named first is "wife and husband").`);
  }
  if (f.granteesMarried && (f.grantees || []).some((x) => x.genderBasis === 'name')) add('6. Drafting', 'flag', 'Who is the wife and who is the husband was guessed from first names. Confirm, so the deed reads "wife and husband" or "husband and wife" in name order.');
  add('6. Drafting', 'ok', 'Tenancy and marital status are in the first paragraph.');

  // consideration
  if (f.deedType === 'sale' || !f.deedType) {
    if (!(Number(f.consideration) > 0)) add('5. Taxes', 'flag', 'No sale price found. A sale deed needs the consideration from the contract (or the final price after addenda).');
    else add('5. Taxes', f.priceChangedByAddendum ? 'flag' : 'ok', f.priceChangedByAddendum ? `Price ${amountWords(f.consideration)} comes from an addendum. Confirm it is the final price.` : `Consideration: ${amountWords(f.consideration)} (contract price).`);
  } else add('5. Taxes', 'flag', 'No-consideration deed: state the relationship and the exemption (statute and wording) in bold italics at the top. The clerk will not guess the exemption.');

  // extra recorded matters that belong on the deed
  for (const x of f.flags || []) add(x.step || '7. Quality control', 'flag', clean(x.text));

  // 4. supporting documents
  const docs = ['Copy of the current recorded deed (vesting deed).'];
  if ((f.grantors || []).some((x) => x.kind === 'personal_representative')) docs.push('Letters of Administration / small estate papers naming the personal representative, and the death certificate.');
  if ((f.deaths || []).length) docs.push('Death certificate for each deceased owner.');
  if ((f.grantors || []).some((x) => x.kind === 'entity') || (f.grantees || []).some((x) => x.kind === 'entity')) docs.push('Entity papers: Articles of Organization, Operating Agreement or resolution naming who may sign, and good standing.');
  if ((f.grantors || []).some((x) => x.kind === 'trustee')) docs.push('Trust agreement or certification of trust showing the trustee may sell.');
  if ((f.grantors || []).some((x) => x.poa)) docs.push('Recorded or recordable power of attorney.');
  for (const d of docs) add('4. Supporting documents', 'todo', d);
  // what goes with the deed to the clerk (CLA's recorded packages)
  add('5. Taxes', 'todo', 'Maryland Land Instrument Intake Sheet (taxes from the CLA calculator).');
  add('5. Taxes', 'todo', 'Form WH-AR (seller residency / principal residence), or withholding if the seller is not a Maryland resident.');
  if (f.principalResidence) add('5. Taxes', 'todo', 'Owner Occupancy Affidavit signed by the buyers.');
  if (f.firstTimeBuyer) add('5. Taxes', 'todo', 'Affidavit of Grantee as First-Time Maryland Home Buyer (state transfer tax exemption).');
  add('8. Legal review', 'todo', `Attorney review and approval: ${DEED_SETTINGS.attorney}.`);
  return out;
}
