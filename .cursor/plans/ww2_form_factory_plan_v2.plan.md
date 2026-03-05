---
name: WW2 Form Factory Plan v2
overview: Consolidated plan for the internal War Room showcase site. 10 layouts, same content, Drips branding, site-wide password, social-feed style. Includes video provision guide.
todos: []
isProject: false
---

# WW2 Form Factory — Plan v2 (Consolidated)

---

## 1. Requirements Summary

### Core

- **10 layouts** — same content (Intro, Timeline, Testimonials, Results), different UI/design only. All revolve around War Room.
- **Site-wide password** — `XYZ`, no DB. Blocks all content until authenticated. sessionStorage for persistence.
- **Layout switcher** — fixed bottom-right pill. Default: Social Feed.
- **Style** — Social feed / Instagram-like. Clean, minimal, modern. Drips Brand Guide.

### Content Sections (order: 1 Intro → 2 Timeline → 3 Testimonials → 4 Results)

| Section | Content |
|---------|---------|
| **Intro** | What we did, Why we did it, Why this way. Condensed War Room content. |
| **Timeline** | Week (Tue start). Planning, build, late-night, problem-solving. Mock entries, structured for interview notes. |
| **Testimonials** | ~12 video tiles. Click → modal, autoplay. 3–4 with 2–3 languages (flag icons); rest English-only. |
| **Results** | Table: TICKET, TASK, DAY, OLD WAY, NEW WAY, SPEEDUP. Summary cards. Use reference image examples. |

### Decisions

- Auth: sessionStorage
- Language selector: flag icons above video
- Responsive: mobile, tablet, desktop
- Default layout: Social Feed
- Results data: reference image examples

---

## 2. How to Provide Testimonial Videos

### Option A: Edit `lib/mockData.ts` (Recommended)

After the site is built, edit the `testimonialVideos` array in `lib/mockData.ts`. Replace placeholder URLs with real ones:

```typescript
{
  id: "t01",
  title: "Jamie on Planning",
  thumbnailUrl: "/videos/thumbnails/t01.jpg",  // or full URL
  videoUrl: "https://www.loom.com/share/abc123",  // your video URL
  languages: [
    { code: "en", label: "English", videoUrl: "https://..." },
    { code: "es", label: "Spanish", videoUrl: "https://..." },
  ],
},
```

**What to provide per video:**
- `videoUrl` — primary (English) playback URL
- `thumbnailUrl` — optional; we can fallback to a generic placeholder
- `languages` — only if the video has translations; each needs its own `videoUrl`

### Option B: Add Files to the Project

1. Create `public/videos/` in the project.
2. Add video files: `testimonial-01.mp4`, `testimonial-02.mp4`, etc.
3. Optionally add thumbnails: `public/videos/thumbnails/01.jpg`.
4. Send a list (or paste here): `[ { id, title, filename, hasTranslations, languageUrls? } ]`.
5. We wire `mockData.ts` to use `/videos/testimonial-01.mp4`, etc.

### Option C: Hosted URLs (Loom, YouTube, Vimeo)

If videos live on Loom, YouTube, or Vimeo:

- **Loom:** Use the share link (e.g. `https://www.loom.com/share/xxxxx`). Loom supports embed; we can use an iframe or the direct URL.
- **YouTube:** Use embed URL: `https://www.youtube.com/embed/VIDEO_ID`.
- **Vimeo:** Use embed URL: `https://player.vimeo.com/video/VIDEO_ID`.

Send a manifest:

| id | title | videoUrl | languages (comma-separated codes if translated) |
|----|-------|----------|------------------------------------------------|
| t01 | Jamie on Planning | https://loom.com/share/abc | en, es |
| t02 | Parker on Build | https://loom.com/share/def | en |

We’ll convert this into `mockData.ts`.

### Option D: Shared Document

Create a Google Sheet or similar with columns: `id`, `title`, `videoUrl`, `thumbnailUrl`, `languages` (e.g. `en|es` or JSON). Share the sheet or export as CSV. We’ll map it into the app.

### Thumbnails

- If you have custom thumbnails: provide URLs or add files to `public/videos/thumbnails/`.
- If not: we’ll use placeholder images or Loom/YouTube auto thumbnails where possible.

---

## 3. Drips Brand Guide

- **Font:** Poppins (Google Fonts). Weights: 400, 500, 600, 700.
- **Colors:** drips-blue `#1672FD`, drips-dark `#353535`, drips-ice `#E8F1FF`; accent-mint `#6EE0AA` for Results green.
- **Layout:** 4px base, 1200px max, alternating white / drips-ice sections.
- **Components:** 8px button radius, 12px card radius; table header `#E8F1FF`.
- **Results table:** Drips dark mode tokens; accent-mint for NEW WAY / SPEEDUP.

---

## 4. Site Architecture

- **PasswordGate** — full-screen until correct password. sessionStorage. `NEXT_PUBLIC_SITE_PASSWORD=XYZ`.
- **ThemeContext** — `currentLayoutId`, default `"social-feed"`. `setLayout(id)`.
- **10 layout wrappers** — each composes Intro, Timeline, Testimonials, Results differently.
- **Section components** — Intro, Timeline, Testimonials, Results. Reused across layouts.

---

## 5. Mock Data

### Intro

```typescript
{
  title: "Forms War Room",
  whatWeDid: "We ran a 3-day Forms War Room: plan (BRDs, PRDs, tech specs), build in parallel, demo. Goal: launch a production-ready form in under 24 hours, with no engineering or QA in the critical path.",
  whyWeDidIt: "Today delivery takes 5–6 weeks per form. To scale Forms across use cases, we need to remove engineering from repetitive work and increase consistency.",
  whyThisWay: "Specs are truth. Deliver, don't debate. Raise blockers immediately. Done over perfect. Roles drive speed.",
}
```

### Timeline (from War Room document, excluding evenings)

```typescript
const timelineEntries: TimelineEntry[] = [
  // Tuesday — CLARITY / STRUCTURE
  { id: "tl01", day: "Tuesday", timeBlock: "9:00 AM – 12:00 PM", label: "Planning", description: "Build BRDs — 3 groups. Align on PRDs." },
  { id: "tl02", day: "Tuesday", timeBlock: "12:00 PM – 2:00 PM", label: "Tech Specs", description: "Engineers define tech specs. Work plan phases defined (SF)." },
  { id: "tl03", day: "Tuesday", timeBlock: "2:00 PM – 6:00 PM", label: "Scaffolding", description: "Scaffolding \"one shot\" execution. Each builds/commits a work item." },
  // Wednesday — BUILD
  { id: "tl04", day: "Wednesday", timeBlock: "9:00 AM – 12:00 PM", label: "Aggressive Build", description: "Build from approved specs/work items. Parallel lane execution." },
  { id: "tl05", day: "Wednesday", timeBlock: "12:00 PM – 2:00 PM", label: "Testing", description: "Thoughtful testing." },
  { id: "tl06", day: "Wednesday", timeBlock: "2:00 PM – 6:00 PM", label: "Documentation", description: "Loom documentation. CI plan." },
  // Thursday — DEMO
  { id: "tl07", day: "Thursday", timeBlock: "9:00 AM – 12:00 PM", label: "Build & Integration", description: "Continue build. Cross-suite end-to-end integration." },
  { id: "tl08", day: "Thursday", timeBlock: "12:00 PM – 2:00 PM", label: "Loom Testimonials", description: "Loom video testimonial recording." },
  { id: "tl09", day: "Thursday", timeBlock: "2:00 PM – 6:00 PM", label: "Demo Preparation & Final Demos", description: "Demo preparation. Final demos." },
];
```

**Structure:** CLARITY → STRUCTURE → BUILD → DEMO across Tue–Thu.

### Results (reference examples)

- Backend scaffolding (API, EF Core) — Old: 24 hrs, New: 15 min, 96x
- Test spec schema + JSON validation
- Full /app product website UI/UX (18 variants)
- Enterprise hardening (8 phases)
- AI-powered test generation pipeline
- End-to-end integration test suite
- … 10–15 total steps. Summary: OLD WAY ~15 weeks, NEW WAY 3 days, TIME SAVED 5,760 hrs.

---

## 6. File Structure

```
WW2Website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/ (Intro, Timeline, Testimonials, Results)
│   ├── layouts/ (10 layout wrappers)
│   ├── ThemeSwitcher.tsx
│   ├── PasswordGate.tsx
│   └── VideoModal.tsx
├── lib/
│   ├── types.ts
│   ├── mockData.ts
│   └── ThemeContext.tsx
├── public/
│   └── videos/           # Optional: add video files here
│       └── thumbnails/
├── styles/
│   └── drips-tokens.css
├── .env.local            # NEXT_PUBLIC_SITE_PASSWORD=XYZ
├── tailwind.config.ts
└── package.json
```

---

## 7. Ten Layouts

1. **Social Feed** — single column, stacked cards (default)
2. **Dashboard** — multi-column, metrics
3. **Timeline-First** — vertical timeline spine
4. **Results-First** — table prominent, others below
5. **Magazine** — editorial, asymmetric
6. **Split-Pane** — nav left, content right
7. **Card Grid** — 2–3 column cards
8. **War Room** — mission-control aesthetic
9. **Bento Box** — varied card sizes
10. **Carousel/Stepper** — one section per slide

---

## 8. Acceptance Criteria

- [ ] Site-wide password (XYZ); sessionStorage
- [ ] 10 layouts; default Social Feed
- [ ] Intro, Timeline, Testimonials, Results (same content)
- [ ] Testimonials: ~12 tiles; flag icons for multi-language; modal + autoplay
- [ ] Results: table + summary cards; reference design; Drips dark + green
- [ ] Drips branding (Poppins, colors, components)
- [ ] Layout switcher bottom-right; instant swap
- [ ] Fully responsive
