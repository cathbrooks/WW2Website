export interface IntroContent {
  title: string;
  whatWeDid: string;
  whyWeDidIt: string;
  whyThisWay: string;
}

export interface TimelineEntry {
  id: string;
  day: string;
  timeBlock: string;
  label: string;
  description: string;
}

export interface LanguageOption {
  code: string;
  label: string;
  videoUrl: string;
}

export interface TestimonialVideo {
  id: string;
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
  languages: LanguageOption[];
}

export interface ResultStep {
  id: string;
  role: string;
  task: string;
  oldWay: string;
  newWay: string;
  speedup: string;
}

export interface ResultsSummary {
  oldWayWeeks: string;
  oldWayHours: string;
  newWayDays: string;
  newWayHours: string;
  timeSavedHours: string;
  subtitle: string;
}
