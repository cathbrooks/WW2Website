import type {
  IntroContent,
  TimelineEntry,
  TestimonialVideo,
  ResultStep,
  ResultsSummary,
} from "./types";

export const introContent: IntroContent = {
  title: "Forms War Room",
  whatWeDid:
    "We ran a 3-day Forms War Room: plan (BRDs, PRDs, tech specs), build in parallel, demo. Goal: launch a production-ready form in under 24 hours, with no engineering or QA in the critical path.",
  whyWeDidIt:
    "Today delivery takes 5–6 weeks per form. To scale Forms across use cases, we need to remove engineering from repetitive work and increase consistency.",
  whyThisWay:
    "Specs are truth. Deliver, don't debate. Raise blockers immediately. Done over perfect. Roles drive speed.",
};

export const timelineEntries: TimelineEntry[] = [
  {
    id: "tl01",
    day: "Tuesday",
    timeBlock: "9:00 AM – 12:00 PM",
    label: "Planning",
    description: "Build BRDs — 3 groups. Align on PRDs.",
  },
  {
    id: "tl02",
    day: "Tuesday",
    timeBlock: "12:00 PM – 2:00 PM",
    label: "Tech Specs",
    description: "Engineers define tech specs. Work plan phases defined (SF).",
  },
  {
    id: "tl03",
    day: "Tuesday",
    timeBlock: "2:00 PM – 6:00 PM",
    label: "Scaffolding",
    description:
      'Scaffolding "one shot" execution. Each builds/commits a work item.',
  },
  {
    id: "tl04",
    day: "Wednesday",
    timeBlock: "9:00 AM – 12:00 PM",
    label: "Aggressive Build",
    description: "Build from approved specs/work items. Parallel lane execution.",
  },
  {
    id: "tl05",
    day: "Wednesday",
    timeBlock: "12:00 PM – 2:00 PM",
    label: "Testing",
    description: "Thoughtful testing.",
  },
  {
    id: "tl06",
    day: "Wednesday",
    timeBlock: "2:00 PM – 6:00 PM",
    label: "Documentation",
    description: "Loom documentation. CI plan.",
  },
  {
    id: "tl07",
    day: "Thursday",
    timeBlock: "9:00 AM – 12:00 PM",
    label: "Build & Integration",
    description:
      "Continue build. Cross-suite end-to-end integration.",
  },
  {
    id: "tl08",
    day: "Thursday",
    timeBlock: "12:00 PM – 2:00 PM",
    label: "Loom Testimonials",
    description: "Loom video testimonial recording.",
  },
  {
    id: "tl09",
    day: "Thursday",
    timeBlock: "2:00 PM – 6:00 PM",
    label: "Demo Preparation & Final Demos",
    description: "Demo preparation. Final demos.",
  },
];

export const testimonialVideos: TestimonialVideo[] = [
  {
    id: "t01",
    title: "Celina",
    thumbnailUrl: "/thumbnails/thumb1.jpg",
    videoUrl: "/videos/CelineEnglish.mp4",
    languages: [
      { code: "en", label: "English", videoUrl: "https://youtu.be/OYmBJD1QHS8" },
      { code: "ma", label: "Mandarin", videoUrl: "https://youtu.be/eh1V5IyDjDw" },
      { code: "日本", label: "Japanese", videoUrl: "https://youtu.be/RsxhiuABj0s" },
    ],
  },
  {
    id: "t02",
    title: "Parker",
    thumbnailUrl: "/thumbnails/thumb2.jpg",
    videoUrl: "/videos/ParkerEnglish.mp4",
    languages: [
      { code: "en", label: "English", videoUrl: "/videos/ParkerEnglish.mp4" },
      { code: "ma", label: "Mandarin", videoUrl: "/videos/ParkerMandarin.mp4" },
      { code: "日本", label: "Japanese", videoUrl: "https://youtu.be/mw3MtfBS49k" },
    ],
  },
  {
    id: "t03",
    title: "Marshall",
    thumbnailUrl: "/thumbnails/thumb3.jpg",
    videoUrl: "/videos/MarshallEnglish.mp4",
    languages: [
      { code: "en", label: "English", videoUrl: "/videos/MarshallEnglish.mp4" },
      { code: "ma", label: "Mandarin", videoUrl: "https://youtu.be/UgyvY5IclQk" },
      { code: "日本", label: "Japanese", videoUrl: "https://youtu.be/TteEHnSeueM" },
    ],
  },
  {
    id: "t04",
    title: "Joseph",
    thumbnailUrl: "/thumbnails/thumb4.jpg",
    videoUrl: "/videos/JosephEnglish.mp4",
    languages: [
      { code: "en", label: "English", videoUrl: "https://youtu.be/hh6EzlrfPrE" },
      { code: "ma", label: "Mandarin", videoUrl: "https://youtu.be/90dVL4_K5qM" },
      { code: "日本", label: "Japanese", videoUrl: "/videos/JosephJapanese.mp4" },
    ],
  },
];

export const resultSteps: ResultStep[] = [
  { id: "r01", role: "Planning", task: "POD Writing", oldWay: "25 hrs / ~4.2 days", newWay: "2 hrs", speedup: "12.5x" },
  { id: "r02", role: "Planning", task: "BRD Slice Generation", oldWay: "40 hrs / ~6.7 days", newWay: "15–40 min", speedup: "~60–160x" },
  { id: "r04", role: "Planning", task: "BRD", oldWay: "10–15 hrs / ~1.7–2.5 days", newWay: "10 min", speedup: "~60–90x" },
  { id: "r03", role: "Planning", task: "Feature Requirements", oldWay: "22–35 hrs / ~3.7–5.8 days", newWay: "25 min", speedup: "~53–84x" },
  { id: "r05", role: "Planning", task: "Technical Specifications", oldWay: "396 hrs / ~66 days", newWay: "10.25 min", speedup: "~2,318x" },
  { id: "r06", role: "Planning", task: "Work Orders", oldWay: "85–90 hrs / ~14.2–15 days", newWay: "2–3 hrs", speedup: "~28–45x" },
  { id: "r07", role: "Planning", task: "Excel Import to Draft Blueprint", oldWay: "8–11 hrs / ~1.3–1.8 days", newWay: "10 min", speedup: "~48–66x" },
  { id: "r08", role: "Planning", task: "Single Complex Work Order", oldWay: "2.5–3.5 hrs / ~0.4–0.6 days", newWay: "2 min", speedup: "~75–105x" },
  { id: "r09", role: "Planning", task: "Confusion Resolution", oldWay: "12 hours (12 people x 1 hour) / 2 days", newWay: "30 sec", speedup: "~1,440x" },
  { id: "r10", role: "Development", task: "Backend Scaffolding", oldWay: "78 hrs / ~13 days", newWay: "30 min", speedup: "156x" },
];

export const resultsSummary: ResultsSummary = {
  oldWayWeeks: "~32 weeks",
  oldWayHours: "952 developer hours",
  newWayDays: "10 days",
  newWayHours: "60 developer hours",
  timeSavedHours: "~30 weeks",
  subtitle:
    "What would normally take a team of 10 over three months — we set out to build in three days.",
};
