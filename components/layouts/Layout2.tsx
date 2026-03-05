"use client";

import { useState, useEffect } from "react";
import {
  introContent,
  timelineEntries,
} from "@/lib/mockData";
import { Results } from "../sections/Results";
import { Testimonials } from "../sections/Testimonials";
import { ThemeToggle } from "../ThemeToggle";

const NAV_ITEMS = [
  { id: "l2-overview", label: "Overview", num: "01" },
  { id: "l2-timeline", label: "Timeline", num: "02" },
  { id: "l2-results", label: "Results", num: "03" },
  { id: "l2-testimonials", label: "Testimonials", num: "04" },
];

export function Layout2() {
  const [active, setActive] = useState("l2-overview");

  const byDay = timelineEntries.reduce<Record<string, typeof timelineEntries>>(
    (a, e) => { if (!a[e.day]) a[e.day] = []; a[e.day].push(e); return a; },
    {}
  );

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      // Trigger only when the top of a section enters a thin band at the top of the viewport
      { rootMargin: "-10px 0px -90% 0px", threshold: 0 }
    );
    NAV_ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)]">
      {/* Left sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 w-56 h-screen flex-col border-r border-[var(--color-border)] bg-[var(--color-surface)] z-40 px-6 py-8">
        <div className="mb-10">
          <h1 className="text-lg font-extrabold tracking-tight text-[var(--color-text)] leading-tight">
            WW2:<br />
            <span className="text-[var(--color-primary)]">Form Factory</span>
          </h1>
        </div>
        <nav className="flex-1 space-y-0.5">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                active === item.id
                  ? "bg-[var(--color-primary)] text-white shadow-sm"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]"
              }`}
            >
              <span className={`text-xs font-mono transition-opacity ${active === item.id ? "opacity-70" : "opacity-40"}`}>
                {item.num}
              </span>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="border-t border-[var(--color-border)] pt-4 flex items-center justify-between">
          <span className="text-xs text-[var(--color-text-muted)]">Mode</span>
          <ThemeToggle />
        </div>
      </aside>

      {/* Main scrollable content */}
      <main className="md:ml-56 flex-1">
        {/* Mobile header */}
        <div className="md:hidden flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)] bg-[var(--color-surface)] sticky top-0 z-30">
          <h1 className="text-base font-extrabold text-[var(--color-text)]">
            WW2: <span className="text-[var(--color-primary)]">Form Factory</span>
          </h1>
          <ThemeToggle />
        </div>

        {/* Hero title section (from Layout 8) */}
        <div id="l2-overview" className="scroll-mt-16">
          <section className="relative bg-[var(--color-primary)] px-8 py-20 overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white/10 transform translate-x-24 -translate-y-24" />
              <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-white/10 transform -translate-x-12 translate-y-12" />
              <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
            </div>
            <div className="relative max-w-[1100px] mx-auto">
              <h1 className="text-6xl md:text-8xl font-black text-white leading-none mb-8 max-w-2xl">
                WW2:<br />Form<br />Factory
              </h1>
              <div className="mt-10 max-w-2xl">
                <p className="text-white text-sm font-extrabold uppercase tracking-wider mb-2">What we did</p>
                <p className="text-white/60 text-base leading-relaxed">{introContent.whatWeDid}</p>
                <p className="text-white text-sm font-extrabold uppercase tracking-wider mt-8 mb-2">Why we did it</p>
                <p className="text-white/60 text-base leading-relaxed">{introContent.whyWeDidIt}</p>
                <p className="text-white text-sm font-extrabold uppercase tracking-wider mt-8 mb-2">Why we are doing it this way</p>
                <p className="text-white/60 text-base leading-relaxed">{introContent.whyThisWay}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Role Structuring section */}
        <div className="px-8 py-10 border-b border-[var(--color-border)]">
          <div className="max-w-[1100px] mx-auto">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-6">
              Role Structuring
            </h3>
            <div className="mb-8">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
                {["Three Product Suites.", "Three Lanes.", "Clear Ownership."].map((phrase, i) => (
                  <span
                    key={i}
                    className={
                      i === 2
                        ? "text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]"
                        : "text-sm font-semibold uppercase tracking-wider text-[var(--color-text)]"
                    }
                  >
                    {phrase}
                  </span>
                ))}
              </div>
              <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-lg">
                Clear ownership prevents diffusion of responsibility.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { letter: "A", name: "Style Design / QA" },
                { letter: "B", name: "Survey Builder" },
                { letter: "C", name: "Data Transformer" },
              ].map((lane) => (
                <div
                  key={lane.letter}
                  className="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-5 overflow-hidden"
                >
                  <span
                    className="absolute -bottom-4 -right-2 text-[7rem] font-black leading-none select-none pointer-events-none"
                    style={{ color: "var(--color-primary)", opacity: 0.06 }}
                  >
                    {lane.letter}
                  </span>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white text-sm font-bold shadow-sm">
                      {lane.letter}
                    </span>
                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                      Lane {lane.letter}
                    </span>
                  </div>
                  <p className="text-base font-bold text-[var(--color-text)] leading-snug">
                    {lane.name}
                  </p>
                </div>
              ))}
            </div>
            <h3 className="mt-10 mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">Building</h3>
            <p className="mb-6 text-[var(--color-text-muted)] italic text-sm">Engineers build from approved, highly detailed artifacts — not from meetings or ambiguous tickets.</p>
            <div className="overflow-x-auto">
              <svg
                viewBox="0 0 900 200"
                className="w-full min-w-[560px]"
                style={{ color: "var(--color-primary)" }}
                aria-label="Development workflow: BRD → PRD → Technical Spec → Scaffolding → Implementation"
              >
                <rect x="10" y="10" width="150" height="80" rx="12" fill="var(--color-bg-alt)" stroke="currentColor" strokeWidth="2"/>
                <text x="85" y="44" textAnchor="middle" fontWeight="800" fontSize="14" fill="var(--color-text)">BRD</text>
                <text x="85" y="62" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">Define business</text>
                <text x="85" y="76" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">goals</text>
                <path d="M85 90 L85 130 Q85 150 105 150 L245 150 Q265 150 265 130 L265 90" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#arrow2)"/>
                <rect x="190" y="110" width="150" height="80" rx="12" fill="var(--color-bg-alt)" stroke="currentColor" strokeWidth="2"/>
                <text x="265" y="144" textAnchor="middle" fontWeight="800" fontSize="14" fill="var(--color-text)">PRD</text>
                <text x="265" y="162" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">Specify product</text>
                <text x="265" y="176" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">outcomes</text>
                <path d="M265 110 L265 60 Q265 40 285 40 L435 40 Q455 40 455 60 L455 90" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#arrow2)"/>
                <rect x="380" y="10" width="150" height="80" rx="12" fill="var(--color-bg-alt)" stroke="currentColor" strokeWidth="2"/>
                <text x="455" y="40" textAnchor="middle" fontWeight="800" fontSize="14" fill="var(--color-text)">Technical Spec</text>
                <text x="455" y="58" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">Detail engineering</text>
                <text x="455" y="72" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">requirements</text>
                <path d="M455 90 L455 130 Q455 150 475 150 L615 150 Q635 150 635 130 L635 90" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#arrow2)"/>
                <rect x="560" y="110" width="150" height="80" rx="12" fill="var(--color-bg-alt)" stroke="currentColor" strokeWidth="2"/>
                <text x="635" y="144" textAnchor="middle" fontWeight="800" fontSize="14" fill="var(--color-text)">Scaffolding</text>
                <text x="635" y="162" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">Set up project</text>
                <text x="635" y="176" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">structure</text>
                <path d="M635 110 L635 60 Q635 40 655 40 L805 40 Q825 40 825 60 L825 90" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#arrow2)"/>
                <rect x="750" y="10" width="150" height="80" rx="12" fill="var(--color-bg-alt)" stroke="currentColor" strokeWidth="2"/>
                <text x="825" y="40" textAnchor="middle" fontWeight="800" fontSize="14" fill="var(--color-text)">Implementation</text>
                <text x="825" y="58" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">Develop approved</text>
                <text x="825" y="72" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">artifacts</text>
                <circle cx="10" cy="50" r="6" fill="currentColor"/>
                <circle cx="900" cy="50" r="6" fill="currentColor"/>
                <defs>
                  <marker id="arrow2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L0,6 L8,3 z" fill="currentColor"/>
                  </marker>
                </defs>
              </svg>
            </div>
          </div>
        </div>

        {/* Sprint Timeline section (from Layout 4) */}
        <div id="l2-timeline" className="scroll-mt-16 px-6 py-6">
          <div className="p-4 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
            <p className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-4">Timeline</p>
            <div className="grid grid-cols-3 gap-3">
              {["Tuesday", "Wednesday", "Thursday"].map((day) => (
                <div key={day}>
                  <h3 className="text-[10px] font-bold text-[var(--color-text)] uppercase tracking-wider mb-2 pb-1 border-b border-[var(--color-border)]">
                    {day}
                  </h3>
                  <div className="space-y-2">
                    {(byDay[day] || []).map((e) => (
                      <div
                        key={e.id}
                        className="p-2 rounded-lg bg-[var(--color-bg-alt)] border border-[var(--color-border)] hover:border-[var(--color-primary)] transition-colors"
                      >
                        <p className="text-xs font-semibold text-[var(--color-text)]">{e.label}</p>
                        <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{e.timeBlock}</p>
                        <p className="text-[10px] text-[var(--color-text-muted)] mt-0.5">{e.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div id="l2-results" className="scroll-mt-16">
          <Results />
        </div>
        <div id="l2-testimonials" className="scroll-mt-16">
          <Testimonials />
        </div>
      </main>
    </div>
  );
}
