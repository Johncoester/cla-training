# CLA Title & Escrow — Team Training

Training site for CLA Title staff: study lessons, practice questions and timed certification exams, with email sign-in and an admin page for invites and results.

- **Live site:** https://training.clatitle.com (also https://johncoester.github.io/cla-training/)
- **Hosting:** GitHub Pages (this repo, `main` branch)
- **Database & sign-in:** Supabase project **CLA Training** (`upkrpewcsvfltqwmxmjs`)

## How it works
- Team members sign in by typing their email; Supabase emails them a one-click sign-in link. No passwords.
- Only emails on the invite list can sign in. Admins invite people from the **Admin** page.
- Lesson progress and exam attempts are saved to Supabase; admins see everyone's progress.

## Files
| Path | What it is |
|---|---|
| `index.html` | The page |
| `css/app.css` | Styles |
| `js/config.js` | Supabase URL and publishable key (safe to be public) |
| `js/backend.js` | Data layer (Supabase, or demo mode if config is blank) |
| `js/app.js` | The app: courses, lessons, exams, admin |
| `courses/md-prelicense/course.js` | Course content: sections, 17 lessons, 89 questions |
| `supabase/schema.sql` | Database tables, sign-in rules and security policies |

## Adding a course
1. Copy `courses/md-prelicense/` to `courses/<new-id>/` and edit `course.js` (id, title, sections, lessons, questions, exam settings).
2. Add `<script src="courses/<new-id>/course.js"></script>` in `index.html` next to the existing one.
Progress and results are stored per `course_id`, so no database changes are needed.

## Merging into the CLA portal later
Everything is plain HTML/JS on Supabase. To move it into the portal, copy the course files and the four tables in `supabase/schema.sql` (`invites`, `profiles`, `attempts`, `lesson_progress`), and swap the invite/profile tables for the portal's own user table.

## Content source
Lessons and questions summarize the MLTA Title Insurance Pre-Licensing Course book (2013 edition). Federal items changed since then (HUD-1/GFE → TRID, FIRPTA rates) are intentionally left out.

## Title Review tool (`/title-review/`)
A separate tool for the title team at **https://training.clatitle.com/title-review/**. No sign-in (owner's choice for testing).
- The page uploads PDFs to the private Supabase bucket `title-review` and calls the edge function `title-review` (project CLA Training).
- The edge function sends the PDFs to the Claude API (key stored as the Supabase secret `ANTHROPIC_API_KEY`) with CLA's rule pack from `title_review.rules`, and saves results and team feedback in schema `title_review` (not reachable from the browser).
- No client documents are stored in this repo.

## Closing Package Explainer (`/closing-explainer/`)
A separate tool at **https://training.clatitle.com/closing-explainer/** that explains every page of a closing package in plain English for buyer or seller calls. The PDF stays in the browser; page text goes to the edge function `closing-explainer` (project CLA Training), which calls Claude. Nothing is stored. It can go in the portal as is (`?embed=1`). See `closing-explainer/README.md`.
