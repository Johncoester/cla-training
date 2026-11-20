// Reproduce CLA's recorded deeds from their facts: the engine's wording must match what was recorded.
import { buildDeed, deedText, checkDeed, amountWords } from '../js/data/deed-md.js';
let fail = 0; const ok = (c, m) => { console.log(c ? 'ok  ' : 'FAIL', m); if (!c) fail++; };
const norm = (s) => s.replace(/\s+/g, ' ').trim();

// MD-24-23755 (tenants by the entirety, recorded Baltimore County Book 49378 Page 94)
const tbe = { fileNo: 'MD-24-23755', propertyAddress: '4131 Daylily Drive\nOwings Mills, MD 21117', taxId: '02-2200009525', county: 'Baltimore', month: 'August', year: '2024',
  grantors: [{ name: 'Simshindo Msola', kind: 'individual', gender: 'M' }], grantees: [{ name: 'Samson Airekholo', gender: 'M' }, { name: 'Mojirola Airekholo', gender: 'F' }],
  tenancy: 'tbe', tenancySource: 'stated', granteesMarried: false, consideration: 425000,
  priorDeed: { dated: '2009-06-18', recorded: '2009-06-26', liber: '28320', folio: '178', from: 'Louis C. Nan Jr and Melissa R. Hyatt', to: 'Simshindo Msola' },
  legalDescription: 'Being known and designated as Lot No. 77, as shown on the Plat entitled "1st Amended Plat Two, Section II, Lyonswood South" which is recorded among the Land Records of Baltimore County in Plat Book 71 Folio 29.',
  ownersOfRecord: ['Simshindo Msola'], contractSellers: ['Simshindo Msola'], contractBuyers: ['Samson E. Airekholo', 'Mojirola M. Airekholo'] };
const t = norm(deedText(buildDeed(tbe)));
const recorded = [
  'by and between Simshindo Msola, party of the first part, Grantor; and Samson Airekholo and Mojirola Airekholo, as tenants by the entirety, parties of the second part, Grantees.',
  "That for and in consideration of the sum of FOUR HUNDRED TWENTY FIVE THOUSAND AND 00/100 DOLLARS ($425,000.00), which includes the amount of any outstanding Mortgage or Deed of Trust, if any, the receipt whereof is hereby acknowledged, the said Grantor does grant and convey to the said Samson Airekholo and Mojirola Airekholo, as tenants by the entirety, their assigns, the survivor of them and the survivor's heirs, personal representatives and assigns, in fee simple, all that lot of ground situate in the County of Baltimore, State of Maryland and described as follows, that is to say:",
  'Being the same property which by deed dated June 18, 2009, and recorded among the Land Records of Baltimore County, Maryland on June 26, 2009, in Liber 28320, in Folio 178, was granted and conveyed by Louis C. Nan Jr and Melissa R. Hyatt unto Simshindo Msola.',
  "unto and to the proper use and benefit of the said Samson Airekholo and Mojirola Airekholo, as tenants by the entirety, their assigns, the survivor of them and the survivor's heirs, personal representatives and assigns, in fee simple.",
  'And the said party of the first part hereby covenants that he has not done or suffered to be done any act, matter or thing whatsoever, to encumber the property hereby conveyed; that he will warrant specially the property hereby granted; and that he will execute such further assurances of the same as may be requisite.',
  'ALL that certain lot, parcel or tract of land, situate and lying in the County of Baltimore, State of Maryland, and being more particularly described as follows:'];
for (const r of recorded) ok(t.includes(norm(r)), 'TBE matches recorded: ' + r.slice(0, 70));

// MD-24-22141 (personal representatives, recorded Montgomery Book 67900 Page 304)
const pr = { ...tbe, fileNo: 'MD-24-22141', county: 'Montgomery', month: 'February',
  grantors: [{ name: 'Lee A. Canby', kind: 'personal_representative', estateOf: 'Lorain H. Klimkosky', decedentDiedOn: '2023-10-31' }, { name: 'Thomas R. Klimkosky', kind: 'personal_representative', estateOf: 'Lorain H. Klimkosky', decedentDiedOn: '2023-10-31' }],
  grantees: [{ name: 'Brandon R. Rytting', gender: 'M' }, { name: 'Natalia Caillon Rytting', gender: 'F' }], granteesMarried: true, consideration: 832000,
  priorDeed: { dated: '1965-06-21', recorded: '1965-06-29', liber: '3373', folio: '437', from: 'Diamond Communities, Inc., a Maryland Corporation', to: 'Raymond P. Klimkosky and Lorain H. Klimkosky, his wife, as tenants by the entirety' },
  deaths: [{ name: 'Raymond P. Klimkosky', diedOn: '2019-07-01', leaving: 'Lorain H. Klimkosky, as surviving tenant by the entirety', survivorshipCovers: true },
    { name: 'Lorain H. Klimkosky', diedOn: '2023-10-31', leaving: 'Lee A. Canby, as Personal Representative per estate no. W117454' }],
  ownersOfRecord: ['Raymond P. Klimkosky', 'Lorain H. Klimkosky'], contractSellers: ['Lee A. Canby', 'Thomas R. Klimkosky'] };
const p = norm(deedText(buildDeed(pr)));
for (const r of [
  'by and between Lee A. Canby and Thomas R. Klimkosky, Personal Representatives of Estate of Lorain H. Klimkosky, who passed on October 31, 2023, parties of the first part, Grantors; and Brandon R. Rytting and Natalia Caillon Rytting, husband and wife, as tenants by the entirety, parties of the second part, Grantees.',
  'And the said parties of the first part hereby covenant that they have not done',
  'Said that Raymond P. Klimkosky departed this world on or about July 1, 2019, leaving Lorain H. Klimkosky, as surviving tenant by the entirety.',
  'EIGHT HUNDRED THIRTY TWO THOUSAND AND 00/100 DOLLARS ($832,000.00)']) ok(p.includes(norm(r)), 'PR matches recorded: ' + r.slice(0, 70));

// IMPORTANT NOTES 2: woman first = wife and husband
const wh = norm(deedText(buildDeed({ ...pr, grantees: [{ name: 'Jane Doe', gender: 'F' }, { name: 'John Doe', gender: 'M' }] })));
ok(wh.includes('Jane Doe and John Doe, wife and husband, as tenants by the entirety'), 'wife and husband when the woman is named first');
// tenants in common: no survivorship
const tic = norm(deedText(buildDeed({ ...tbe, tenancy: 'tic' })));
ok(tic.includes('as tenants in common, their heirs, personal representatives and assigns, in fee simple') && !tic.includes('survivor of them'), 'tenants in common take no survivorship wording');
// sole owner
const sole = norm(deedText(buildDeed({ ...tbe, tenancy: 'sole', grantees: [{ name: 'Ernest Hill', gender: 'M' }] })));
ok(sole.includes('and Ernest Hill, Sole Owner, party of the second part, Grantee.') && sole.includes('Ernest Hill, as Sole Owner, his assigns, the survivor of him'), 'sole owner wording matches MD-21-11251');
ok(amountWords(133871) === 'ONE HUNDRED THIRTY THREE THOUSAND EIGHT HUNDRED SEVENTY ONE AND 00/100 DOLLARS ($133,871.00)', 'amount in words matches MD-21-11251');

// checklist: owner on title missing from contract is flagged
const c = checkDeed({ ...tbe, ownersOfRecord: ['Simshindo Msola', 'Mary Msola'] });
ok(c.some((x) => x.status === 'flag' && /Mary Msola is an owner on title but is not a seller/.test(x.text)), 'flags an owner on title who is not on the contract');
const c2 = checkDeed({ ...tbe, contractSellers: ['Simshindo J. Msola'] });
ok(c2.some((x) => /Name differs/.test(x.text)), 'flags a name written differently');
const c3 = checkDeed(tbe);
ok(!c3.some((x) => x.status === 'flag' && /owner on title but|signed the contract as a seller|Name differs/.test(x.text)), 'no seller flag when contract and title match');
const c4 = checkDeed(pr);
ok(c4.some((x) => x.status === 'ok' && /personal representative signs/.test(x.text)), 'estate: personal representative recognized');
import { splitNames, compareNames } from '../js/data/deed-md.js';
ok(JSON.stringify(splitNames(['MADURO NOVIA SUNDAY ETAL & WEIDENHAFT JEFFREY BAYN'])) === JSON.stringify(['MADURO NOVIA SUNDAY', 'WEIDENHAFT JEFFREY BAYN']), 'splits an SDAT-style seller line');
const cm = compareNames(['Novia Sunday Maduro', 'Jeffrey Bayne Weidenhaft'], splitNames(['MADURO NOVIA SUNDAY ETAL & WEIDENHAFT JEFFREY BAYN']));
ok(!cm.missing.length && cm.spelled.length === 1 && /Bayne/.test(cm.spelled[0][0]), 'SDAT word order is not a difference; Bayne vs Bayn is');
const tr = compareNames(['John C. Gaughan, Trustee of the John C. Gaughan Revocable Trust'], ['John C Gaughan Revocable Trust']);
ok(!tr.missing.length, 'trust on contract matches the trustee on title');
ok(compareNames(['Mary Msola'], ['Simshindo Msola']).missing.length === 1, 'a different person does not match');
const trust = norm(deedText(buildDeed({ ...tbe, grantors: [{ name: 'John C. Gaughan, Trustee of the John C. Gaughan Revocable Trust', kind: 'trustee', trustName: 'John C. Gaughan Revocable Trust', signer: 'John C. Gaughan' }] })));
ok(trust.includes('between John C. Gaughan, Trustee of the John C. Gaughan Revocable Trust, party of the first part') && !trust.includes('Trust, Trustee of'), 'trustee named once');
const lead = norm(deedText(buildDeed({ ...tbe, legalDescription: "All that lot of ground situate in the County of Prince George's, State of Maryland and described as follows, that is to say:\n\nBeing known and designated as Lot numbered Seven (7)." })));
ok(!/that is to say: All that lot/i.test(lead) && lead.includes('Being known and designated as Lot numbered Seven (7).'), "record's lead-in removed from Exhibit A");
const js = compareNames(['Josefina A. Shakeshaft, Trustee of the Josefina A. Shakeshaft Revocable Trust'], ['Josephina A. Shakeshaft']);
ok(!js.missing.length && js.spelled.length === 1, 'Josephina vs Josefina: same person, flagged as spelled differently');
ok(checkDeed({ ...tbe, taxId: '06-000-06914600' }).some((x) => x.status === 'ok' && /Tax ID 06-000-06914600/.test(x.text)), 'Anne Arundel tax ID format accepted');
const tg = norm(deedText(buildDeed({ ...tbe, tenancy: 'entity', grantees: [{ name: 'DOOLITTLE SCALISE FAMILY TRUST', kind: 'entity', entityDesc: 'a trust (trustees to be named; see flags)' }] })));
ok(!/see flags|to be named/.test(tg), 'AI notes never printed in the deed');
ok(checkDeed({ ...tbe, tenancy: 'entity', grantees: [{ name: 'DOOLITTLE SCALISE FAMILY TRUST', kind: 'entity' }] }).some((x) => /takes title through its trustees/.test(x.text)), 'trust as grantee needs trustees');
const dv = norm(deedText(buildDeed({ ...tbe, grantors: [{ name: 'Novia Sunday Maduro', kind: 'individual', maritalStatus: 'divorced', gender: 'F' }, { name: 'Jeffrey Bayne Weidenhaft', kind: 'individual', maritalStatus: 'divorced', gender: 'M' }] })));
ok(dv.includes('by and between Novia Sunday Maduro, divorced, and Jeffrey Bayne Weidenhaft, divorced, parties of the first part'), "sellers' marital status in the first paragraph");
const hw = norm(deedText(buildDeed({ ...tbe, grantorsMarried: true, grantors: [{ name: 'John Doe', kind: 'individual', gender: 'M' }, { name: 'Jane Doe', kind: 'individual', gender: 'F' }] })));
ok(hw.includes('by and between John Doe and Jane Doe, husband and wife, parties of the first part'), 'married sellers: husband and wife in name order');
ok(checkDeed(tbe).some((x) => /Marital status of seller Simshindo Msola is not known/.test(x.text)), 'flags a seller with unknown marital status');
console.log(fail ? `\n${fail} failed` : '\nall passed'); process.exit(fail ? 1 : 0);
