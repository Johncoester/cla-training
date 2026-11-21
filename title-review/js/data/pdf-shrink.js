/* Make a big scanned PDF small enough to send (Caroline, Nov 20 2026: "Some search packages are very large"; the 25 MB limit stopped
 * her file). Each page is redrawn as a picture at about 150 dots per inch and saved as a compressed JPEG, then put back together as a
 * PDF with the same page sizes and order. Scanned packages are pictures already, so nothing the AI reads is lost; a typed PDF keeps
 * its look but its hidden text layer is dropped (the AI reads the page picture either way).
 * Browser only: uses pdf.js (window.pdfjsLib, already on the page) and pdf-lib. */
import { PDFDocument } from 'https://esm.sh/pdf-lib@1.17.1';

const TARGET_WIDTH = 1275;   // pixels across a letter page at 150 dpi
const QUALITY = 0.6;

function canvasToJpeg(canvas, quality) {
  return new Promise((resolve, reject) => canvas.toBlob((b) => (b ? b.arrayBuffer().then(resolve, reject) : reject(new Error("A page couldn't be redrawn."))), 'image/jpeg', quality));
}

/* file: a PDF File. onProgress(page, pages). Returns a new, smaller File (or the same file if redrawing would not make it smaller). */
export async function shrinkPdf(file, onProgress = () => {}) {
  if (!window.pdfjsLib) throw new Error("The PDF tools didn't load. Refresh the page and try again.");
  const src = await window.pdfjsLib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const out = await PDFDocument.create();
  const canvas = document.createElement('canvas'); const ctx = canvas.getContext('2d');
  for (let n = 1; n <= src.numPages; n++) {
    onProgress(n, src.numPages);
    const page = await src.getPage(n);
    const base = page.getViewport({ scale: 1 });   // size in points
    const vp = page.getViewport({ scale: Math.min(2, TARGET_WIDTH / Math.min(base.width, base.height)) });   // the short side about 1275 pixels
    canvas.width = Math.round(vp.width); canvas.height = Math.round(vp.height);
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    const jpg = await out.embedJpg(await canvasToJpeg(canvas, QUALITY));
    out.addPage([base.width, base.height]).drawImage(jpg, { x: 0, y: 0, width: base.width, height: base.height });
    page.cleanup();
  }
  await src.destroy();
  const bytes = await out.save();
  if (bytes.length >= file.size) return file;
  return new File([bytes], file.name.replace(/\.pdf$/i, '') + ' (smaller).pdf', { type: 'application/pdf' });
}

/* Shrink the biggest files first until the whole set fits. items: [{ f, kind }]. Returns the new list; throws if it still won't fit. */
export async function fitFiles(items, limitBytes, onProgress = () => {}) {
  const list = items.map((x) => ({ ...x }));
  const total = () => list.reduce((a, x) => a + x.f.size, 0);
  const order = [...list].sort((a, b) => b.f.size - a.f.size);
  for (const it of order) {
    if (total() <= limitBytes) break;
    if (it.f.size < 2 * 1048576) continue;   // small files hardly shrink
    const smaller = await shrinkPdf(it.f, (p, n) => onProgress(`Making "${it.f.name}" smaller: page ${p} of ${n}`));
    list.find((x) => x.f === it.f).f = smaller;
  }
  if (total() > limitBytes) throw new Error(`These files are still ${(total() / 1048576).toFixed(0)} MB after making them smaller (the limit is ${(limitBytes / 1048576).toFixed(0)} MB). Split the search package into two files and run the second part as Other documents, or leave out extras.`);
  return list;
}
