"use client";

import { timelineEntries } from "@/lib/mockData";
import type { TimelineEntry } from "@/lib/types";

function EntryCard({ entry }: { entry: TimelineEntry }) {
  return (
    <div className="rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-sm p-3">
      <div className="flex flex-wrap items-center gap-1 mb-1">
        <span className="text-xs text-[var(--color-text-muted)]">{entry.timeBlock}</span>
        <span className="text-xs font-semibold text-[var(--color-text)]">{entry.label}</span>
      </div>
      <p className="text-xs text-[var(--color-text)]">{entry.description}</p>
    </div>
  );
}

export function Timeline() {
  const byDay = timelineEntries.reduce<Record<string, TimelineEntry[]>>((acc, entry) => {
    if (!acc[entry.day]) acc[entry.day] = [];
    acc[entry.day].push(entry);
    return acc;
  }, {});
  const days = Object.keys(byDay);

  return (
    <section className="py-12 px-4 md:px-8 bg-[var(--color-bg-alt)]">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-8 flex items-baseline gap-3">
          <span className="text-sm font-mono font-normal text-[var(--color-text-muted)] opacity-50 select-none">02</span>
          Timeline
        </h2>
        <div className="space-y-8">
          {days.map((day) => (
            <div key={day}>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-lg font-bold text-[var(--color-primary)] uppercase tracking-wider">
                  {day}
                </span>
                <div className="flex-1 h-px bg-[var(--color-border)]" />
              </div>
              <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                {byDay[day].map((entry) => (
                  <EntryCard key={entry.id} entry={entry} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
