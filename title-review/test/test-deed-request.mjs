// Deed only (no contract) intake form (John, Nov 20 2026). Run: node test/test-deed-request.mjs
import { cleanDeedRequest, requestLines, deedTypeFor, REQUEST_TYPES } from '../js/data/deed-request.js';
let fail = 0;
const ok = (c, m) => { if (c) console.log('ok  ', m); else { fail++; console.log('FAIL', m); } };
const err = (input) => { try { cleanDeedRequest(input); return ''; } catch (e) { return e.message; } };

// Cris's file: parents adding their daughter, no money, a mortgage with RoundPoint
const cris = { type: 'add_owner', newOwners: 'Hamid Reza Ali Khani\nElaheh Bidgoli\nHadiseh Alikhani', tenancy: 'jt', consideration: 'none',
  relationship: 'Parents to their daughter', mortgage: 'yes', lender: 'RoundPoint', residence: 'yes', requestedBy: 'Hamid R. Ali Khani' };
const r = cleanDeedRequest(cris);
ok(r.deedType === 'gift' && r.newOwners.length === 3 && r.tenancy === 'jt' && r.amount === 0 && r.lender === 'RoundPoint', "Cris's request: a gift to three joint tenants");
ok(requestLines(r).some(([k, v]) => k === 'Money changing hands' && /None/.test(v)) && requestLines(r).some(([k, v]) => k === 'Relationship' && v === 'Parents to their daughter'), 'the request reads in plain lines');

// what each box asks for
ok(/what the deed is for/.test(err({ ...cris, type: '' })), 'no deed type');
ok(/who will own the property/.test(err({ ...cris, newOwners: '' })), 'no new owners');
ok(/full legal name/.test(err({ ...cris, newOwners: 'Hadiseh' })), 'a first name only is not a legal name');
ok(/how the new owners will hold title/.test(err({ ...cris, tenancy: '' })), 'two or more owners need a tenancy');
ok(cleanDeedRequest({ ...cris, newOwners: 'Hadiseh Alikhani', tenancy: '' }).tenancy === 'sole', 'one new owner is a sole owner (no question)');
ok(/only for two people married/.test(err({ ...cris, tenancy: 'tbe' })), 'tenants by the entirety needs exactly two people');
ok(/who is coming off the title/.test(err({ ...cris, type: 'remove_owner' })), 'taking someone off needs their name');
ok(/full name of the trust/.test(err({ ...cris, type: 'into_trust', newOwners: 'The Ali Khani Family Trust' })), 'a trust needs its name');
ok(/trustee or trustees/.test(err({ ...cris, type: 'into_trust', newOwners: 'The Ali Khani Family Trust', entityName: 'Ali Khani Family Trust dated 1/2/2020' })), 'a trust needs its trustees');
ok(cleanDeedRequest({ ...cris, type: 'into_llc', newOwners: 'Smallwood Holdings LLC', entityName: 'Smallwood Holdings LLC' }).tenancy === 'entity', 'into an LLC: held by the LLC');
ok(/Type the amount/.test(err({ ...cris, consideration: 'paid', amount: '' })), 'money paid needs an amount');
ok(cleanDeedRequest({ ...cris, consideration: 'paid', amount: '$12,500', relationship: '' }).amount === 12500, 'an amount with $ and commas; the relationship is optional when money is paid');
ok(/how the people are related/.test(err({ ...cris, relationship: '' })), 'a gift needs the relationship (tax exemption)');
ok(/mortgage/.test(err({ ...cris, mortgage: '' })) && /main home/.test(err({ ...cris, residence: '' })), 'mortgage and main-home questions are required');
ok(REQUEST_TYPES.every(([v]) => ['gift', 'quitclaim', 'into_llc'].includes(deedTypeFor(v))), 'every request maps to a deed type the checklist knows');

// the deed service repeats the checks with the same type list
const fn = (await import('node:fs')).readFileSync(new URL('../supabase/functions/deed-prep/index.ts', import.meta.url), 'utf8');
ok(REQUEST_TYPES.every(([v, , t]) => fn.includes(`${v}: "${t}"`)), 'the deed service maps each request to the same deed type');
console.log(fail ? `\n${fail} failed` : '\nall passed'); process.exit(fail ? 1 : 0);
