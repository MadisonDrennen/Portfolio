---
name: portfolio-publisher
description: Add new work to Madison's portfolio (madisondrennen.com) and ship it live. Use whenever Madison says she uploaded, added or exported new images, posts, mockups, reels, emails, website screenshots or a new project, asks to put work on a case-study page (GYMRISE, Social Mulli, RekMed, Explorations), swap or remove gallery images, refresh covers or hero slides, or wants fresh full-page screenshots of the site. Covers finding the new files, sorting and de-duplicating them, privacy checks, compressing, placing them in lib/projects.ts, visual verification, build, deploy and live confirmation.
---

# Portfolio Publisher

Madison drops new work into folders inside `/Users/madisondrennen/Portfolio` (often the repo root, sometimes `public/work/redesigns/`) and asks for it to go on the site. This skill is the full loop, from the folder to the live site. Scripts live in `.claude/skills/portfolio-publisher/scripts/` (`S` below). Run JS scripts with `node`; they use Chrome via puppeteer-core (installed in `S/node_modules`).

## 1. Find what's new

Uploads rarely say where they went. Look for files newer than the most recent asset in `public/`:

```bash
cd /Users/madisondrennen/Portfolio
find . -maxdepth 3 -type f -newer "$(ls -t public/work/*/* | head -1)" \
  \( -iname '*.png' -o -iname '*.jpg' -o -iname '*.mp4' -o -iname '*.mov' -o -iname '*.html' \) \
  -not -path './node_modules/*' -not -path './.next/*' -not -path './Portfolio Screenshots/*'
ls -dt */ | head -3        # newest folders
```

Exports sometimes keep an old modified time; if nothing turns up, look in the newest folder or match by name.

Then run `bash S/inventory.sh <folder-or-files>` for sizes, dimensions, durations and exact duplicates.

## 2. Look before placing

Build a sheet and actually read it (`Read` the jpg):

```bash
bash S/contact-sheet.sh /tmp/sheet.jpg file1 file2 ...
```

Check:
- **Near-duplicates.** Same design with a different background or crop won't show as exact duplicates. Compare up close and use one copy. Tell Madison when two files are the same.
- **What each piece is**, so the alt text and placement are right.
- **Broken exports.** Placeholder Latin, empty image slots, or a `.html` file. For HTML exports run `node S/render-html-export.js file.html /tmp/out`; if it reports problems, ask her to re-export as PNG (posts) or MP4 (reels).

If the target page or project is unclear, ask. If it's clear from the request or the filename (`SocialMulli_*` goes on Social Mulli), just do it.

## 3. Privacy rules (real people and clients)

- **Mockup-approved exports** (her "Portfolio Mockups" sets, GYMRISE social mockups) use placeholder names already. No blurring needed.
- **Social Mulli originals** are fine as-is. Danelle (Social Mulli co-founder) has approved appearing.
- **Anything else showing client names, club names or member faces/names:** blur names and clubs, keep numbers visible. Use the per-item `redact` boxes in `lib/projects.ts` (percent coordinates). Look at each image to place the boxes; never use fixed zones.
- Never add GYMRISE company results as Madison's results. Many predate her (that section was removed on purpose).

## 4. Compress into `public/`

```bash
bash S/compress.sh image <src> public/work/<slug>/<name>.jpg [maxpx=1800] [q=80]   # posts, mockups, pins
bash S/compress.sh full  <src> public/work/redesigns/full-<site>.jpg               # tall full-page captures
bash S/compress.sh video <src> public/work/<slug>/reels/<name>.mp4 [width=720]     # reels: ~0.5–1MB each
```

Naming: lowercase-kebab, descriptive (`pin-office-hours.jpg`, `reels/we-do.mp4`). Folders in use:
- `public/work/<slug>/` for each project, with `social/`, `reels/`, `emails/` and `originals/` subfolders as needed.
- `public/work/redesigns/` for website screenshots used by the homepage carousel and the CTA laptop.
- `public/hero/` for homepage hero slides: `m2-*` for desktop, `m-*` for phone.

When a new file replaces an old one, delete the old file (`git rm`) once nothing references it (`grep -rn <name> lib components app`).

## 5. Place it (`lib/projects.ts`)

All four case studies use the **chapter layout** (`components/case-study/CaseStudyV2.tsx`). Each gallery row has a `chapter` id, and rows render inside chapters in the order of `project.chapters`.

Current chapters:
- `gymrise`: website, reels, social, mockups
- `social-mulli`: website, reels, social, email, mockups
- `rekmed`: photo, video, stills
- `explorations`: web, campaign, email, concept

`GalleryRow` fields:
- `aspect`: `"4/5"` for posts, `"9/16"` for reels, `"2/3"` for pins and tall mockups, `"16/9"` for device mockups, `"3/4"` for site captures.
- `fit`: `"cover"`, or `"contain"` with `bg` (for example, a 4:5 reel in a 9:16 row on a dark background).
- `label`: shows only when a chapter has more than one row.
- `items[]`: `{ src, alt, type?: "video", redact? }`. Rows of `9/16` videos render in phone frames automatically.
- `carousel: true`: swipeable row, used for website builds.
- `narrow: true`: half width, centered, for short rows or a single portrait image.
- `scrollOnHover: true`: tall emails or pages show the top and scroll down on hover.

Layout habits Madison likes:
- Lead with the website build, social in the middle, website mockups after.
- Rows of 3 stay three across on phones.
- Pair two 2:3 images in one row instead of one huge narrow image.
- Add a new chapter (an entry in `chapters` with `tone` light or dark, alternating) when a new kind of work arrives, such as "Email Marketing".

Covers (`heroImage`) are 16:9 device mockups. Update `HERO_ASPECT` in `components/sections/FeaturedWork.tsx` to match a new cover's shape. Homepage hero slides live in the `DESKTOP` and `MOBILE` arrays in `components/sections/Hero.tsx`.

## 6. Verify visually

Start the dev server with `preview_start {name: "Portfolio Dev"}`, then:

```bash
node S/render.js /work/<slug> /tmp/desk.png --section "<Chapter Title>"
node S/render.js /work/<slug> /tmp/phone.png --mobile
```

`Read` the images. The script prints `viewport` and `pageWidth`, which must be equal; otherwise there's horizontal overflow on phones.

The built-in browser pane is often hidden, which freezes animations, so prefer these headless renders.

## 7. Build, deploy, confirm

1. **Stop the dev server first** (`preview_stop`). Running `npm run build` while it runs corrupts `.next`.
2. `rm -rf .next && npm run build`. Must end with "Compiled successfully". A lint error fails the build, for example an `eslint-disable` comment naming a rule this project doesn't have.
3. `git add` only the files you changed or created; never `git add -A` at the repo root (upload folders are untracked on purpose). Commit with a HEREDOC message ending in the attribution line from the system reminder. `git push origin main`.
4. `bash S/verify-live.sh /work/<slug> "<new-filename-or-text>" ["<removed-text>"]`. This waits for Vercel's GitHub status, then checks the live HTML. `vercel ls` lags, so don't trust it.
5. `rm -rf .next`, then `preview_start` again.

## 8. Report

Tell Madison in plain language:
- what went where, page by page and chapter by chapter;
- anything skipped, and why (duplicates, broken export, privacy);
- that it's live and confirmed.

Leave her upload folders in place unless she asks to tidy them.

## Screenshots of the whole site

```bash
node S/capture-site.js "/Users/madisondrennen/Portfolio/Portfolio Screenshots"            # live, desktop
node S/capture-site.js "/Users/madisondrennen/Portfolio/Portfolio Screenshots/mobile" --mobile
```

The About page is captured when **"Social Media"** is framed in the hero (her preference). Send results with `SendUserFile`.

## Brand rules (apply to any copy you write: alt text, captions, labels)

- No em dashes.
- No italics.
- Palette: Mahogany #250209, Raspberry #89235B, Berry #BA006D, Petal #FFCAE4, Snow #FFF3F2, Icy Blue #D9EAFE.
- Type: Instrument Sans, plus IBM Plex Mono for labels.
- Only two calls to action site-wide: **"Start a Redesign"** and **"Let's Talk"**.
- Her email is madisoninmarketing@gmail.com.
- The homepage hero layout is approved; don't change it unless asked.
