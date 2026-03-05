---
name: WW2 Form Factory Final Plan
overview: Complete plan for the internal War Room showcase site. One layout, 10 visual themes. Pill selector toggles themes. Site-wide password, Drips branding, social-feed style.
todos: []
isProject: false
---

# WW2 Form Factory — Final Plan

---

## 1. Requirements

### Core

| Item | Spec |
|------|------|
| Themes | **10 themes** — same layout structure, different visual treatment (colors, typography, card styles). Not 10 different layout structures. |
| Layout | **One layout** — social feed style. Intro → Timeline → Results → Testimonials. Single column, stacked cards. |
| Password | **Site-wide** — blocks all content until authenticated. `XYZ`. No DB. sessionStorage. |
| Default theme | Theme 1 |
| Pill selector | Fixed bottom-right. Toggle themes 1–10. Instant swap. |
| Style | Social feed / Instagram-like. Clean, minimal, modern. Drips Brand Guide. |

### Content Sections (order)

1. **Intro** — What we did, Why we did it, Why this way
2. **Timeline** — Week (Tue–Thu), from War Room document, no evenings
3. **Results** — Table + summary cards, reference design
4. **Testimonials** — ~12 video tiles, modal + autoplay, flag icons for languages

### Decisions

- Auth: sessionStorage (persists until tab closed)
- Language selector: flag icons above video
- Responsive: mobile, tablet, desktop
- Results data: reference image examples
- Implementation: one layout + 10 theme variants

---

## 2. Tech Stack

- Next.js App Router
- TypeScript
- TailwindCSS
- No external database

---

## 3. Drips Brand Guide

| Element | Spec |
|---------|------|
| Font | Poppins (Google Fonts). Weights: 400, 500, 600, 700. |
| Primary colors | drips-blue `#1672FD`, drips-dark `#353535`, drips-ice `#E8F1FF`, drips-navy `#1E59AF` |
| Success/positive | accent-mint `#6EE0AA` (Results NEW WAY, SPEEDUP) |
| Layout | 4px base, 1200px max. Alternate white / drips-ice sections. |
| Components | Buttons 8px radius, cards 12px radius. Table header `#E8F1FF`. |
| Results table | **Adapts per theme.** Each theme defines its own table treatment (light/dark, accent color for NEW WAY/SPEEDUP). Base: Drips dark mode + accent-mint for default theme. |

---

## 4. Site Architecture

- **PasswordGate** — Full-screen until correct password. `NEXT_PUBLIC_SITE_PASSWORD=XYZ`. sessionStorage.
- **ThemeContext** — `currentThemeId` (default `"1"`), `setTheme(id)`. Applies theme via CSS variables or data attribute.
- **Single layout** — One layout component. Social feed structure: single column, stacked cards. Order: Intro → Timeline → Results → Testimonials.
- **Section components** — Intro, Timeline, Results, Testimonials. Same arrangement in all themes.

---

## 5. Types & Interfaces

```typescript
// lib/types.ts

interface IntroContent {
  title: string;
  whatWeDid: string;
  whyWeDidIt: string;
  whyThisWay: string;
}

interface TimelineEntry {
  id: string;
  day: string;
  timeBlock: string;
  label: string;
  description: string;
}

interface TestimonialVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  languages: LanguageOption[];
}

interface LanguageOption {
  code: string;
  label: string;
  videoUrl: string;
}

interface ResultStep {
  id: string;
  ticket: string;
  task: string;
  day: string;
  oldWay: string;
  newWay: string;
  speedup: string;
}

interface ResultsSummary {
  oldWayWeeks: string;
  oldWayHours: string;
  newWayDays: string;
  newWayHours: string;
  timeSavedHours: string;
  subtitle: string;
}
```

---

## 6. Mock Data (Complete)

### Intro

```typescript
const introContent: IntroContent = {
  title: "Forms War Room",
  whatWeDid: "We ran a 3-day Forms War Room: plan (BRDs, PRDs, tech specs), build in parallel, demo. Goal: launch a production-ready form in under 24 hours, with no engineering or QA in the critical path.",
  whyWeDidIt: "Today delivery takes 5–6 weeks per form. To scale Forms across use cases, we need to remove engineering from repetitive work and increase consistency.",
  whyThisWay: "Specs are truth. Deliver, don't debate. Raise blockers immediately. Done over perfect. Roles drive speed.",
};
```

### Timeline (9 entries, from War Room doc, no evenings)

```typescript
const timelineEntries: TimelineEntry[] = [
  { id: "tl01", day: "Tuesday", timeBlock: "9:00 AM – 12:00 PM", label: "Planning", description: "Build BRDs — 3 groups. Align on PRDs." },
  { id: "tl02", day: "Tuesday", timeBlock: "12:00 PM – 2:00 PM", label: "Tech Specs", description: "Engineers define tech specs. Work plan phases defined (SF)." },
  { id: "tl03", day: "Tuesday", timeBlock: "2:00 PM – 6:00 PM", label: "Scaffolding", description: "Scaffolding \"one shot\" execution. Each builds/commits a work item." },
  { id: "tl04", day: "Wednesday", timeBlock: "9:00 AM – 12:00 PM", label: "Aggressive Build", description: "Build from approved specs/work items. Parallel lane execution." },
  { id: "tl05", day: "Wednesday", timeBlock: "12:00 PM – 2:00 PM", label: "Testing", description: "Thoughtful testing." },
  { id: "tl06", day: "Wednesday", timeBlock: "2:00 PM – 6:00 PM", label: "Documentation", description: "Loom documentation. CI plan." },
  { id: "tl07", day: "Thursday", timeBlock: "9:00 AM – 12:00 PM", label: "Build & Integration", description: "Continue build. Cross-suite end-to-end integration." },
  { id: "tl08", day: "Thursday", timeBlock: "12:00 PM – 2:00 PM", label: "Loom Testimonials", description: "Loom video testimonial recording." },
  { id: "tl09", day: "Thursday", timeBlock: "2:00 PM – 6:00 PM", label: "Demo Preparation & Final Demos", description: "Demo preparation. Final demos." },
];
```

### Testimonials (12 tiles)

- 3–4 videos with 2–3 languages each (`languages` array populated)
- 8–9 English-only (`languages: []`)
- Placeholder `videoUrl` and `thumbnailUrl` until real videos provided
- Tiles with `languages.length > 0` show flag icons

### Results — Steps (10–15 rows, reference examples)

| ticket | task | day | oldWay | newWay | speedup |
|--------|------|-----|--------|--------|---------|
| A-001 | Backend scaffolding (API, EF Core, project structure) | Day 1 | 24 hrs | 15 min | 96x |
| A-002 | Test spec schema + JSON validation | Day 1 | 48 hrs | 1 hr | 48x |
| B-001 | Full /app product website UI/UX (18 design variants) | Day 1 | 400 hrs | 1 hr | 400x |
| C-001 | Enterprise hardening (8 phases: security, ally, perf, compliance, error handling, SEO, code quality, CI/CD) | Day 1 | 80 hrs | 2 hrs | 40x |
| A-003 | Scaffolding Launch | Day 1 | 10–13 hrs | 28 min | ~24x |
| D-001 | AI-powered test generation pipeline | Day 2 | - | 45 min | - |
| E-001 | End-to-end integration test suite | Day 3 | - | - | - |
| … | (fill to 10–15) | … | … | … | … |

### Results — Summary

```typescript
const resultsSummary: ResultsSummary = {
  oldWayWeeks: "~15 weeks",
  oldWayHours: "6,000 developer hours",
  newWayDays: "3 days",
  newWayHours: "240 developer hours",
  timeSavedHours: "5,760 hrs",
  subtitle: "What would normally take a team of 10 over three months — we set out to build in three days.",
};
```

### Results — Table Design (reference image)

- Columns: TICKET, TASK, DAY, OLD WAY, NEW WAY, SPEEDUP
- **Theme-adaptive:** Background, text, and accent (NEW WAY, SPEEDUP) vary per theme. Light themes use light table; dark themes use dark table; accent color matches theme.
- Thin row separators. Summary below: "Our Goal" title, subtitle, three metric cards (OLD WAY, NEW WAY, TIME SAVED).

---

## 7. How to Provide Testimonial Videos

**After build:** Edit `lib/mockData.ts`, replace placeholder URLs in `testimonialVideos` array.

**Per video:** `videoUrl`, optional `thumbnailUrl`, `languages` array if multi-language.

**Hosted (Loom/YouTube/Vimeo):** Provide URLs. Loom: `https://www.loom.com/share/xxxx`. YouTube: `https://www.youtube.com/embed/VIDEO_ID`.

**Local files:** Add to `public/videos/`, reference as `/videos/filename.mp4`.

---

## 8. Password Gate

1. On load: check sessionStorage for auth. If not authenticated → full-screen password input.
2. User submits. Compare to `NEXT_PUBLIC_SITE_PASSWORD` (= `XYZ`).
3. If match: set sessionStorage, reveal site. If no match: show error.
4. Auth persists until tab/browser closed.

---

## 9. Pill Selector (Theme Switcher)

- **Position:** Fixed bottom-right corner of the viewport.
- **Purpose:** Toggle through 10 visual themes. Layout structure does not change.
- **UI:** Pills/buttons labeled "1" through "10". Active theme highlighted.
- **Behavior:** On click → `setTheme(id)`. Instant swap. Theme applied via CSS variables or `data-theme` attribute on root.
- **Implementation:** `ThemeContext` stores `currentThemeId`. `ThemeSwitcher` renders 10 pills bottom-right. Root wrapper has `data-theme={currentThemeId}`.

---

## 10. Ten Themes (Visual Variations, Same Layout)

One layout: single column, stacked cards, social feed style. Themes change colors, typography feel, card treatment, and Results table treatment — not structure. Each theme has a creative name that captures its essence.

| # | ID | Name | Essence |
|---|-----|------|---------|
| 1 | theme-1 | **Horizon** | Clear skies, open water. White/ice, Drips blue. Calm, expansive. |
| 2 | theme-2 | **Midnight** | Deep, sleek. Dark backgrounds, light text. Professional night mode. |
| 3 | theme-3 | **Command** | Mission control, tactical. Dark + green accents. War Room energy. |
| 4 | theme-4 | **Breath** | Negative space, quiet. Minimal borders, lots of white. Zen-like calm. |
| 5 | theme-5 | **Punch** | Bold, confident. Strong colors, heavier typography. High impact. |
| 6 | theme-6 | **Mist** | Soft, gentle. Pastels, muted contrast. Easy on the eyes. |
| 7 | theme-7 | **Monochrome** | Stark clarity. Black/white with one accent. Editorial contrast. |
| 8 | theme-8 | **Ember** | Warm, inviting. Gold/coral tints. Cozy, approachable. |
| 9 | theme-9 | **Reef** | Cool, fresh. Teal/mint dominant. Ocean clarity. |
| 10 | theme-10 | **Broadsheet** | Newspaper elegance. Magazine typography, column rhythm. |

**Theme config:** Each theme defines `--color-primary`, `--color-bg`, `--color-surface`, `--color-text`, `--color-accent`, `--color-results-bg`, `--color-results-accent`, `--font-weight-heading`, etc. Results table adapts: light themes (Horizon, Breath, Mist, Ember, Reef, Broadsheet) use light table + theme accent; dark themes (Midnight, Command) use dark table + accent; Punch/Monochrome use high-contrast variants.

---

## 11. File Structure

```
WW2Website/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   └── globals.css
├── components/
│   ├── sections/
│   │   ├── Intro.tsx
│   │   ├── Timeline.tsx
│   │   ├── Testimonials.tsx
│   │   └── Results.tsx
│   ├── MainLayout.tsx          # Single layout: stacked cards, social feed
│   ├── ThemeSwitcher.tsx       # Pill selector bottom-right
│   ├── PasswordGate.tsx
│   └── VideoModal.tsx
├── lib/
│   ├── types.ts
│   ├── mockData.ts
│   ├── themes.ts               # Theme config (colors, etc.) for 1–10
│   └── ThemeContext.tsx
├── public/
│   └── videos/
│       └── thumbnails/
├── styles/
│   ├── drips-tokens.css
│   └── themes.css              # [data-theme="1"] { ... } for each theme
├── .env.local                  # NEXT_PUBLIC_SITE_PASSWORD=XYZ
├── tailwind.config.ts
├── package.json
└── tsconfig.json
```

---

## 12. Acceptance Criteria

- [ ] Site-wide password (XYZ); sessionStorage
- [ ] One layout (social feed, stacked cards); 10 themes (visual variations only)
- [ ] Pill selector fixed bottom-right; toggles themes 1–10
- [ ] Intro, Timeline, Results, Testimonials (order: Intro → Timeline → Results → Testimonials)
- [ ] Timeline: 9 entries from War Room doc, no evenings
- [ ] Testimonials: ~12 tiles; flag icons for multi-language; modal + autoplay
- [ ] Results: table + summary; reference design; styling adapts per theme (light/dark table, theme accent for NEW WAY/SPEEDUP)
- [ ] Drips branding (Poppins); theme variants build on Drips
- [ ] Theme switch instant; no page reload
- [ ] Fully responsive (mobile, tablet, desktop)
