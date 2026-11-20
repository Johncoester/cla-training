// Bug guard (John, Nov 20 2026: "lets try not to have bugs"). Loads each page's script with a fake browser, including a saved
// In-progress list with finished, failed and deed rows, and fails if anything throws while the page starts up.
// Catches the Nov 20 bug ("Cannot access 'OVERALL' before initialization"). Run: node test/test-pages-load.mjs
import { readFileSync } from 'node:fs';
let fail = 0;
const el = () => new Proxy(function () {}, { get: (t, k) => k === 'classList' ? { toggle() {}, add() {}, remove() {} } : k === 'querySelectorAll' ? () => [] : k === 'value' ? '' : k === 'checked' ? false : k === 'dataset' ? {} : el(), set: () => true, apply: () => el() });
const queue = [
  { id: 'a', file_no: 'MD-1', status: 'done', overall: 'escalate', cost: 0.5, startedAt: 1, doneAt: 2 },
  { id: 'b', file_no: 'MD-2', status: 'error', error: 'x', startedAt: 1 },
  { id: 'c', type: 'deed', file_no: 'MD-3', status: 'done', startedAt: 1, doneAt: 2 },
  { id: 'd', file_no: 'MD-4', status: 'running', startedAt: 1 },
  { id: null, file_no: 'MD-5', status: 'uploading', startedAt: 1 }];
for (const q of [[], queue]) {
  globalThis.document = { querySelector: () => el(), querySelectorAll: () => [], createElement: () => el(), addEventListener() {} };
  globalThis.localStorage = { getItem: (k) => (k === 'clatr_queue' ? JSON.stringify(q) : ''), setItem() {} };
  globalThis.window = { supabase: { createClient: () => el() } };
  globalThis.fetch = async () => ({ ok: true, json: async () => ({ reviews: [], deeds: [] }) });
  globalThis.setInterval = () => 0;
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const src = [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]).pop();
  try { new Function(src)(); console.log(`ok   index.html starts with ${q.length} saved rows`); }
  catch (e) { fail++; console.log(`FAIL index.html with ${q.length} saved rows: ${e.message}`); }
}
await new Promise((r) => setTimeout(r, 50));
console.log(fail ? `\n${fail} failed` : '\nall passed'); process.exit(fail ? 1 : 0);
