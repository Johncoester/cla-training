/* deed-page.js : the Deed Prep screen (John, Nov 19 2026). Wires js/data/deed-md.js (CLA's deed wording + checklist) and
 * js/data/deed-docx.js (Word file) to the deed-prep service. Open as deed.html?id=<deed id>, or deed.html?review=<review id>
 * to start a deed from a finished title review. In the portal, the same two data modules take a file's facts instead. */
import { buildDeed, checkDeed, deedText, DEED_SETTINGS, DEED_TYPES } from '../data/deed-md.js?v=202611211200';
import { deedToDocx } from '../data/deed-docx.js?v=202611192300';
import { requestLines } from '../data/deed-request.js?v=202611202300';

const CFG = { url: 'https://upkrpewcsvfltqwmxmjs.supabase.co', key: 'sb_publishable_L1f8ADmFXkPqsSGvLMibDA_6uah2q6v' };
const FN = CFG.url + '/functions/v1/deed-prep';
const $ = (s, el = document) => el.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const reviewer = () => { try { return localStorage.getItem('clatr_name') || ''; } catch (e) { return ''; } };

async function api(action, data = {}) {
  const r = await fetch(FN, { method: 'POST', headers: { 'Content-Type': 'application/json', apikey: CFG.key }, body: JSON.stringify({ action, ...data }) });
  let out = {}; try { out = await r.json(); } catch (e) { /* */ }
  if (!r.ok || out.error) throw new Error(out.error || "The deed service didn't answer. Wait a moment and refresh.");
  return out;
}

let deed = null, facts = null, feedback = [];
const params = new URLSearchParams(location.search);

async function start() {
  try {
    let id = params.get('id');
    if (!id && params.get('review')) {
      $('#status').textContent = 'Starting the deed…';
      ({ id } = await api('from_review', { review_id: params.get('review'), reviewer_name: reviewer() }));
      history.replaceState(null, '', `?id=${id}`);
    }
    if (!id) { $('#status').textContent = 'No deed was picked. Open a deed from the Title Review page.'; return; }
    for (let i = 0; i < 120; i++) {
      const { deeds } = await api('status', { ids: [id] });
      const d = deeds && deeds[0];
      if (!d) throw new Error('Deed not found.');
      if (d.status === 'done') break;
      if (d.status === 'error') { $('#status').innerHTML = `<span class="st-issue">Problem:</span> ${esc(d.error)} <button class="btn ghost" id="retry" type="button">Retry</button>`; $('#retry').onclick = async () => { await api('start', { id }); location.reload(); }; return; }
      $('#status').textContent = d.progress || 'Working…';
      await sleep(4000);
    }
    const got = await api('get', { id });
    deed = got.deed; feedback = got.feedback || [];
    facts = { ...deed.facts, ...(deed.edits || {}), request: deed.request || null };   // the deed request (deed only) feeds the checklist
    render();
  } catch (e) { $('#status').innerHTML = `<span class="st-issue">Problem:</span> ${esc(e.message)}`; }
}

function render() {
  $('#status').textContent = '';
  $('#app').classList.remove('hidden');
  $('#fileNo').textContent = deed.file_no || '(no file number)';
  $('#cost').textContent = deed.usage && deed.usage.est_cost_usd != null ? `$${Number(deed.usage.est_cost_usd).toFixed(2)}` : '';
  // Deed only (no contract): the deed request form the deed was prepared from (John, Nov 20)
  const rq = deed.request ? requestLines(deed.request) : [];
  $('#request').classList.toggle('hidden', !rq.length);
  $('#request').innerHTML = rq.length ? `<h3>Deed request (no contract)</h3><dl class="rq">${rq.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join('')}</dl>` : '';
  renderFacts(); renderChecklist(); renderDeed();
  $('#approved').textContent = deed.approved_by ? `Approved by ${deed.approved_by} on ${new Date(deed.approved_at).toLocaleString()}` : 'Not approved yet.';
}

// The few facts a processor most often needs to change (tenancy, marriage, order of names, price). Everything else comes from the record.
function renderFacts() {
  const f = facts;
  const MS = { '': '(not known)', married: 'Married', unmarried: 'Unmarried', divorced: 'Divorced', widowed: 'Widowed' };
  const gr = (f.grantors || []).map((g, i) => g.kind !== 'individual' ? '' : `<div class="row"><label>Seller ${i + 1}<input value="${esc(g.name)}" disabled></label>
    <label>Marital status<select data-s="${i}">${Object.entries(MS).map(([k, v]) => `<option value="${k}"${(g.maritalStatus || '') === k ? ' selected' : ''}>${v}</option>`).join('')}</select></label></div>`).join('');
  const ge = (f.grantees || []).map((g, i) => `<div class="row"><label>Grantee ${i + 1}<input data-g="${i}" data-k="name" value="${esc(g.name)}"></label>
    <label>Is<select data-g="${i}" data-k="gender"><option value="">(not needed)</option><option value="F"${g.gender === 'F' ? ' selected' : ''}>a woman</option><option value="M"${g.gender === 'M' ? ' selected' : ''}>a man</option></select></label></div>`).join('');
  $('#facts').innerHTML = `
    <div class="row"><label>Deed type<select id="fType">${Object.entries(DEED_TYPES).map(([k, v]) => `<option value="${k}"${(f.deedType || 'sale') === k ? ' selected' : ''}>${esc(v.label)}</option>`).join('')}</select></label>
    <label>Sale price<input id="fPrice" inputmode="decimal" value="${esc(f.consideration)}"></label></div>
    ${gr}
    ${(f.grantors || []).filter((g) => g.kind === 'individual').length === 2 ? `<div class="row"><label class="check"><input type="checkbox" id="fGMar"${f.grantorsMarried ? ' checked' : ''}> The two sellers are married to each other</label></div>` : ''}
    ${ge}
    <div class="row"><label>Buyers take title as<select id="fTen">${Object.entries({ sole: 'Sole owner', tbe: 'Tenants by the entirety', jt: 'Joint tenants', tic: 'Tenants in common', entity: 'Company (LLC / corporation)' }).map(([k, v]) => `<option value="${k}"${f.tenancy === k ? ' selected' : ''}>${v}</option>`).join('')}</select></label>
    <label class="check"><input type="checkbox" id="fMar"${f.granteesMarried ? ' checked' : ''}> The two buyers are married to each other</label>
    <label class="check"><input type="checkbox" id="fConf"${f.tenancySource === 'stated' ? ' checked' : ''}> Buyers confirmed how they take title</label></div>
    <div class="row"><label>Reviewing attorney (goes on the preparation certificate)<input id="fAtty" value="${esc(f.attorney || '')}" placeholder="Name, Esq."></label></div>
    <p class="note">Change these only after checking with the buyers or the contract. Names, legal description and the vesting deed come from the record and are not edited here.</p>
    <button class="btn ghost" type="button" id="saveFacts">Save changes and redraw</button> <span class="note" id="saveNote"></span>`;
  $('#saveFacts').onclick = async () => {
    const edits = { ...(deed.edits || {}) };
    edits.deedType = $('#fType').value;
    const price = Number(String($('#fPrice').value).replace(/[$,\s]/g, ''));
    if (!(price >= 0) || Number.isNaN(price)) { $('#saveNote').textContent = 'Type the price as a number, like 549000.'; return; }
    edits.consideration = price; edits.tenancy = $('#fTen').value; edits.granteesMarried = $('#fMar').checked; edits.tenancySource = $('#fConf').checked ? 'stated' : 'assumed';
    edits.grantors = (facts.grantors || []).map((g, i) => { const el = $(`[data-s="${i}"]`); return el ? { ...g, maritalStatus: el.value } : g; });
    edits.grantorsMarried = !!($('#fGMar') && $('#fGMar').checked);
    edits.attorney = $('#fAtty').value.trim();
    edits.grantees = (facts.grantees || []).map((g, i) => ({ ...g, name: $(`[data-g="${i}"][data-k="name"]`).value.trim() || g.name, gender: $(`[data-g="${i}"][data-k="gender"]`).value, genderBasis: $(`[data-g="${i}"][data-k="gender"]`).value ? 'stated' : '' }));
    try { await api('save_edits', { id: deed.id, edits }); deed.edits = edits; facts = { ...deed.facts, ...edits, request: deed.request || null }; $('#saveNote').textContent = 'Saved.'; renderChecklist(); renderDeed(); }
    catch (e) { $('#saveNote').textContent = e.message + ' Your changes are still on the screen.'; }
  };
}

function renderChecklist() {
  const items = checkDeed(facts);
  const order = ['1. File review', '2. Parties', '3. Deed type', '4. Supporting documents', '5. Taxes', '6. Drafting', '7. Quality control', '8. Legal review'];
  const flags = items.filter((x) => x.status === 'flag').length;
  $('#flagCount').textContent = flags ? `${flags} item${flags > 1 ? 's' : ''} to fix before the deed goes out` : 'Nothing flagged';
  $('#checklist').innerHTML = order.map((step) => {
    const rows = items.filter((x) => x.step === step);
    if (!rows.length) return '';
    return `<h3>${esc(step)}</h3><ul class="chk">${rows.map((x, i) => {
      const fid = `${step}#${i}`;
      // match a saved click by its text, not only its place: related flags are now combined (Nov 20), so places moved
      const fb = feedback.find((y) => y.finding_title && y.verdict !== 'missed' && (x.text.slice(0, 280) === y.finding_title || x.text.includes(String(y.finding_title).replace(/\s+\S*$/, '').slice(0, 120))))
        || feedback.find((y) => y.finding_id === fid && !y.finding_title);
      return `<li class="${x.status}"><span class="mark">${x.status === 'ok' ? '✓' : x.status === 'flag' ? '!' : '☐'}</span><span>${esc(x.text)}</span>
        ${x.status === 'flag' ? `<span class="fbk">${fb ? `<em>${esc(fb.verdict.replace('_', ' '))}</em>` : `<button type="button" data-fb="correct" data-id="${esc(fid)}" data-t="${esc(x.text.slice(0, 280))}">Correct</button><button type="button" data-fb="wrong" data-id="${esc(fid)}" data-t="${esc(x.text.slice(0, 280))}">Wrong</button>`}</span>` : ''}</li>`;
    }).join('')}</ul>`;
  }).join('');
  $('#checklist').querySelectorAll('[data-fb]').forEach((b) => b.addEventListener('click', async () => {
    const verdict = b.dataset.fb; let note = '';
    if (verdict === 'wrong') { note = prompt("What's wrong with this item? (This teaches the deed AI.)") || ''; if (!note.trim()) return; }
    try { await api('feedback', { deed_id: deed.id, finding_id: b.dataset.id, finding_title: b.dataset.t, verdict, note, reviewer_name: reviewer() }); feedback.push({ finding_id: b.dataset.id, finding_title: b.dataset.t, verdict }); renderChecklist(); }
    catch (e) { alert(e.message); }
  }));
}

function renderDeed() {
  const type = DEED_TYPES[facts.deedType || 'sale'];
  if (!type || !type.auto) { $('#deedText').textContent = `${type ? type.label : 'This deed type'} is drafted by the attorney from the sample "${type ? type.sample : ''}". No automatic draft for this type.`; $('#dl').disabled = true; return; }
  $('#dl').disabled = false;
  $('#deedText').textContent = deedText(buildDeed(facts));
}

$('#dl').onclick = async () => {
  try {
    const docx = await import('https://esm.sh/docx@9.0.2');
    const doc = deedToDocx(docx, buildDeed(facts), { draftLabel: deed.approved_by ? `Approved by ${deed.approved_by}` : 'DRAFT - FOR ATTORNEY REVIEW' });
    const blob = await docx.Packer.toBlob(doc);
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = `Deed ${deed.file_no || ''}.docx`.trim(); a.click();
  } catch (e) { alert("The Word file couldn't be made: " + e.message + ' Refresh the page and try again.'); }
};
$('#approve').onclick = async () => {
  const name = prompt("Approving attorney's name", facts.attorney || DEED_SETTINGS.attorney || '');
  if (!name || !name.trim()) return;
  try { await api('approve', { id: deed.id, approved_by: name.trim() }); deed.approved_by = name.trim(); deed.approved_at = new Date().toISOString(); render(); }
  catch (e) { alert(e.message); }
};
$('#missed').onclick = async () => {
  const note = $('#missedNote').value.trim();
  if (!note) { $('#missedMsg').textContent = 'Describe what was missed first.'; return; }
  try { await api('feedback', { deed_id: deed.id, finding_id: 'missed-' + Date.now(), finding_title: 'Deed: missed', verdict: 'missed', note, reviewer_name: reviewer() }); $('#missedNote').value = ''; $('#missedMsg').textContent = 'Saved. Thank you.'; }
  catch (e) { $('#missedMsg').textContent = e.message; }
};
start();
