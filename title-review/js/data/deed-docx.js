/* deed-docx.js : lays out buildDeed() blocks as a Word file (letter size, Times New Roman 12, 1" margins, CLA's recorded layout:
 * file/property header and return-to address at the top, Exhibit A on its own page). Works in the browser and in Node:
 * pass the docx library in (the page loads it from a CDN, the portal can bundle it), so this module imports nothing. */
export function deedToDocx(docx, blocks, { draftLabel = 'DRAFT - FOR ATTORNEY REVIEW' } = {}) {
  const { Document, Paragraph, TextRun, AlignmentType, PageBreak, Header, Footer, PageNumber, TabStopType } = docx;
  const font = 'Times New Roman', size = 24;
  const run = (text, o = {}) => new TextRun({ text, font, size, ...o });
  const para = (children, o = {}) => new Paragraph({ children: Array.isArray(children) ? children : [children], spacing: { after: 200, line: 276 }, ...o });
  const kids = [];
  const sigLine = (name, by) => [
    para([run(`${by ? 'By: ' : ''}______________________________(SEAL)`)], { indent: { left: 4320 }, spacing: { before: 480, after: 0 } }),
    para([run(name)], { indent: { left: 4320 + (by ? 500 : 0) }, spacing: { after: 240 } })];
  for (const b of blocks) {
    if (b.kind === 'header' || b.kind === 'returnTo') { for (const [i, l] of b.lines.entries()) kids.push(para([run(l, { bold: b.kind === 'returnTo' && i === 0 })], { spacing: { after: 0 } })); kids.push(para([run('')])); }
    else if (b.kind === 'notice') kids.push(para([run(b.text, { bold: true, italics: true })], { alignment: AlignmentType.JUSTIFIED }));
    else if (b.kind === 'title') kids.push(para([run(b.text, { bold: true })], { alignment: AlignmentType.CENTER }));
    else if (b.kind === 'center') kids.push(para([run(b.text)], { alignment: AlignmentType.CENTER }));
    else if (b.kind === 'legal') kids.push(para([run(b.text)], { alignment: AlignmentType.JUSTIFIED, indent: { left: 360, right: 360 } }));
    else if (b.kind === 'p') kids.push(para([run(b.text)], { alignment: AlignmentType.JUSTIFIED, indent: { firstLine: 720 } }));
    else if (b.kind === 'signature') for (const s of b.blocks) { if (s.heading) kids.push(para([run(s.heading)], { indent: { left: 4320 }, spacing: { before: 240, after: 0 } })); for (const n of s.signers) kids.push(...sigLine(n, s.by)); }
    else if (b.kind === 'notary') kids.push(
      para([run('STATE OF MARYLAND')], { spacing: { before: 240, after: 0 } }), para([run('COUNTY OF ____________________________, to wit:')]),
      para([run(b.text)], { alignment: AlignmentType.JUSTIFIED, indent: { firstLine: 720 } }), para([run('As witness, my hand and notarial seal.')]),
      para([run('______________________________')], { spacing: { before: 360, after: 0 } }), para([run('Signature of Notary Public')], { spacing: { after: 0 } }), para([run('My Commission Expires:')]));
    else if (b.kind === 'cert') kids.push(para([run(b.text)], { alignment: AlignmentType.JUSTIFIED, indent: { firstLine: 720 }, spacing: { before: 360, after: 200 } }), ...sigLine(b.signer, false));
    else if (b.kind === 'pagebreak') kids.push(new Paragraph({ children: [new PageBreak()] }));
  }
  return new Document({
    creator: 'CLA Title & Escrow', title: 'Deed',
    sections: [{
      properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
      headers: { default: new Header({ children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({ text: draftLabel, font, size: 18, bold: true, color: 'C00000' })] })] }) },
      footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ font, size: 18, children: ['Page ', PageNumber.CURRENT, ' of ', PageNumber.TOTAL_PAGES] })] })] }) },
      children: kids,
    }],
  });
}
