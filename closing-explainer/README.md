# CLA Closing Package Explainer

A tool for staff at **https://training.clatitle.com/closing-explainer/**. You upload a closing package PDF and Claude explains every page in plain English, so anyone (including the Philippines team) can walk a buyer or seller through what they're signing. It has no sign-in, the same as the Title Review.

It is **not a QC check**. It treats the documents as correct and only explains what is on them (John, Nov 25 2026).

## What it does
- Splits the package into its documents (CD, settlement statement, deed, affidavits and so on) and skips shipping labels.
- Split screen: the real page on the left and the explanation on the right. Tap any line, such as a settlement fee, a proration or cash to close, to see what it is, who pays it, and a sentence to say on the phone.
- **Buyer side / Seller side / Both** switch.
- Caller question box.
- Buyer and seller summary emails, with Copy and PDF download.

## How it works
- `index.html` reads the PDF in the browser with pdf.js. The PDF is never uploaded or saved.
- For each page, the page sends that page's text (or an image of a scanned page) to the Supabase edge function `closing-explainer` in project **CLA Training** (`upkrpewcsvfltqwmxmjs`).
- The function adds CLA's instructions and calls the Claude API using the same `ANTHROPIC_API_KEY` secret as the Title Review (or the same relay if that key isn't set). Nothing is stored; there are no tables.
- Function code: `supabase/functions/closing-explainer/index.ts`. Self test (made-up data): POST `{"action":"selftest","token":"cla-ce-selftest-7k3p"}`.

## Putting it in the CLA portal
It is built so it can drop into the portal without changes:
1. **Link or frame it as it is.** Open `https://training.clatitle.com/closing-explainer/?embed=1`, which hides the page's own title so it sits under the portal's header. It works in an iframe on the portal's Closing tab or as a menu link.
2. **Or copy it in.** Copy this folder into the portal repo and deploy the `closing-explainer` function to the portal's Supabase project. Then change the one `CFG` line in `index.html` (Supabase URL and publishable key) to the portal's. No database changes are needed.
3. **Later:** when it moves into the portal, the order's closing package can open in it directly from Documents, without a separate upload.
