/* DEED ONLY (no contract) intake form (John, Nov 20 2026: "Ok we can but we need a intake form").
 * For deeds with no sale: adding or removing someone, a gift to family, a transfer after a divorce, into a trust or an LLC.
 * Cris's file (Nov 20): parents adding their daughter, with only the clients' email. The form replaces the contract as the source for
 * who gets title, how, why (the relationship drives the tax exemption) and for how much. The current owners still come from the
 * vesting deed in the search. Pure: no DOM, no adapter, so the portal can use it on a file's Deed tab later.
 * Mirrored (checks only) in supabase/functions/deed-prep/index.ts. */

// value, label on the form, deed type for the checklist (js/data/deed-md.js DEED_TYPES)
export const REQUEST_TYPES = [
  ['add_owner', 'Add someone to the title (for example a spouse or child)', 'gift'],
  ['remove_owner', 'Take someone off the title', 'quitclaim'],
  ['gift', 'Gift the property to a family member', 'gift'],
  ['divorce', 'Transfer after a divorce', 'quitclaim'],
  ['into_trust', 'Put the property into a trust', 'gift'],
  ['into_llc', 'Put the property into an LLC', 'into_llc'],
  ['other', 'Other (explain in the notes)', 'quitclaim'],
];
export const REQUEST_TENANCIES = [['sole', 'Sole owner'], ['tbe', 'Tenants by the entirety (a married couple)'], ['jt', 'Joint tenants (with survivorship)'],
  ['tic', 'Tenants in common'], ['entity', 'The trust or LLC']];
export const requestTypeOf = (v) => REQUEST_TYPES.find(([k]) => k === v) || null;
export const deedTypeFor = (v) => (requestTypeOf(v) || [null, null, 'quitclaim'])[2];

const txt = (v, n) => String(v == null ? '' : v).replace(/\s+/g, ' ').trim().slice(0, n);
const lines = (v) => String(v == null ? '' : v).split(/\n|;/).map((x) => txt(x, 120)).filter(Boolean);
const money = (v) => { const n = Number(String(v == null ? '' : v).replace(/[$,\s]/g, '')); return Number.isFinite(n) ? Math.round(n * 100) / 100 : NaN; };

/* Check the form. Throws plain words naming the box; returns the cleaned request. */
export function cleanDeedRequest(input = {}) {
  const type = requestTypeOf(input.type);
  if (!type) throw new Error('Choose what the deed is for.');
  const newOwners = lines(input.newOwners).slice(0, 6);
  if (!newOwners.length) throw new Error('Type who will own the property after the deed, one full legal name per line.');
  if (newOwners.some((n) => !/\s/.test(n) && !/\b(trust|llc|inc|corp)\b/i.test(n))) throw new Error('Type each new owner\'s full legal name (first and last), one per line.');
  const isEntity = type[0] === 'into_trust' || type[0] === 'into_llc';
  const tenancy = isEntity ? 'entity' : newOwners.length === 1 ? 'sole' : String(input.tenancy || '');
  if (!REQUEST_TENANCIES.some(([k]) => k === tenancy)) throw new Error('Choose how the new owners will hold title.');
  if (tenancy === 'tbe' && newOwners.length !== 2) throw new Error('Tenants by the entirety is only for two people married to each other.');
  const leaving = lines(input.leaving).slice(0, 6);
  if (type[0] === 'remove_owner' && !leaving.length) throw new Error('Type who is coming off the title.');
  const entityName = txt(input.entityName, 160);
  if (isEntity && entityName.length < 3) throw new Error(type[0] === 'into_trust' ? 'Type the full name of the trust (and its date if you have it).' : 'Type the full name of the LLC.');
  const trustees = type[0] === 'into_trust' ? lines(input.trustees).slice(0, 4) : [];
  if (type[0] === 'into_trust' && !trustees.length) throw new Error('Type the trustee or trustees of the trust, one per line.');
  const paid = input.consideration === 'paid';
  const amount = paid ? money(input.amount) : 0;
  if (paid && !(amount > 0)) throw new Error('Type the amount being paid, or choose "No money is changing hands".');
  const relationship = txt(input.relationship, 160);
  if (!paid && relationship.length < 3) throw new Error('Say how the people are related (for example "parents to their daughter"). The clerk needs it for the tax exemption.');
  const mortgage = ['yes', 'no', 'unknown'].includes(input.mortgage) ? input.mortgage : '';
  if (!mortgage) throw new Error('Say whether there is a mortgage on the property.');
  const residence = ['yes', 'no', 'unknown'].includes(input.residence) ? input.residence : '';
  if (!residence) throw new Error('Say whether the owners live in the property as their main home.');
  return { type: type[0], deedType: type[2], newOwners, tenancy, leaving, entityName, trustees, consideration: paid ? 'paid' : 'none', amount,
    relationship, mortgage, lender: mortgage === 'yes' ? txt(input.lender, 120) : '', residence, requestedBy: txt(input.requestedBy, 160), notes: txt(input.notes, 1500) };
}

const YN = { yes: 'Yes', no: 'No', unknown: "Don't know" };
/* The request in plain lines: shown on the deed page and given to the AI instead of a contract. */
export function requestLines(r) {
  if (!r) return [];
  const t = requestTypeOf(r.type);
  return [
    ['What the deed is for', t ? t[1] : r.type],
    ['New owners', r.newOwners.join('; ')],
    ['How they hold title', (REQUEST_TENANCIES.find(([k]) => k === r.tenancy) || [r.tenancy, r.tenancy])[1]],
    r.leaving.length ? ['Coming off the title', r.leaving.join('; ')] : null,
    r.entityName ? [r.type === 'into_trust' ? 'Trust' : 'LLC', r.entityName] : null,
    r.trustees.length ? ['Trustees', r.trustees.join('; ')] : null,
    ['Money changing hands', r.consideration === 'paid' ? `$${Number(r.amount).toLocaleString('en-US', { minimumFractionDigits: 2 })}` : 'None (gift / no consideration)'],
    r.relationship ? ['Relationship', r.relationship] : null,
    ['Mortgage on the property', `${YN[r.mortgage] || ''}${r.lender ? ` (${r.lender})` : ''}`],
    ["Owners' main home", YN[r.residence] || ''],
    r.requestedBy ? ['Requested by', r.requestedBy] : null,
    r.notes ? ['Notes', r.notes] : null,
  ].filter(Boolean);
}
export const requestText = (r) => requestLines(r).map(([k, v]) => `${k}: ${v}`).join('\n');
