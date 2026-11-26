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
- `index.html` reads the PDF in the browser with pdf.js. **Social Security numbers are blacked out right there**: in the page text (XXX-XX-XXXX) and painted black on the page image. Scanned pages have no text to check, so they are not blacked out.
- Saving (John, Nov 25 2026): only the blacked-out page images and text are saved, in the private bucket `closing-explainer` and schema `closing_explainer` (project **CLA Training**, `upkrpewcsvfltqwmxmjs`). The original PDF is never uploaded. **Past packages** on the upload screen reopens a package with its explanations, so nothing is paid twice.
- Each page's text goes to the edge function `closing-explainer`, which calls the Claude API with the same `ANTHROPIC_API_KEY` secret as the Title Review (or the same relay if that key isn't set).
- Cost: every Claude call adds its estimated cost to the package (`cost_usd`), shown in the viewer and in Past packages. Prices are estimates in the function (`PRICE`).
- Function code: `supabase/functions/closing-explainer/index.ts`. Self test (made-up data): POST `{"action":"selftest","token":"cla-ce-selftest-7k3p"}`.

## Putting it in the CLA portal
It is built so it can drop into the portal without changes:
1. **Link or frame it as it is.** Open `https://training.clatitle.com/closing-explainer/?embed=1`, which hides the page's own title so it sits under the portal's header. It works in an iframe on the portal's Closing tab or as a menu link.
2. **Or copy it in.** Copy this folder into the portal repo, apply `supabase/migrations/` and deploy the `closing-explainer` function to the portal's Supabase project. Then change the one `CFG` line in `index.html` (Supabase URL and publishable key) to the portal's.
3. **Later:** when it moves into the portal, the order's closing package can open in it directly from Documents, without a separate upload.
