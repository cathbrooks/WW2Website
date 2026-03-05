import { introContent } from "@/lib/mockData";

const lanes = [
  {
    letter: "A",
    name: "Style Design / QA",
    owner: "Parker",
    members: "",
  },
  {
    letter: "B",
    name: "Survey Builder",
    owner: "Jamie",
    members: "",
  },
  {
    letter: "C",
    name: "Data Transformer",
    owner: "Ant",
    members: "",
  },
];

export function Intro() {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-8 flex items-baseline gap-3">
          <span className="text-sm font-mono font-normal text-[var(--color-text-muted)] opacity-50 select-none">01</span>
          Overview
        </h2>
        <div className="space-y-6 text-[var(--color-text)]">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-2">
              What we did
            </h3>
            <p className="text-base leading-relaxed">{introContent.whatWeDid}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-2">
              Why we did it
            </h3>
            <p className="text-base leading-relaxed">{introContent.whyWeDidIt}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-2">
              Why we are doing it this way
            </h3>
            <p className="text-base leading-relaxed">{introContent.whyThisWay}</p>
          </div>
        </div>

        {/* Lanes Section */}
        <div className="mt-12 pt-10 border-t border-[var(--color-border)]">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)] mb-6">
            Role Structuring
          </h3>
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 mb-3">
              {["Three Product Suites.", "Three Lanes.", "Clear Ownership."].map(
                (phrase, i) => (
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
                )
              )}
            </div>
            <p className="text-sm text-[var(--color-text-muted)] leading-relaxed max-w-lg">
              Clear ownership prevents diffusion of responsibility.
            </p>
          </div>

          {/* Lane Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {lanes.map((lane) => (
              <div
                key={lane.letter}
                className="relative rounded-xl border border-[var(--color-border)] bg-[var(--color-bg-alt)] p-5 overflow-hidden"
              >
                {/* Background letter watermark */}
                <span
                  className="absolute -bottom-4 -right-2 text-[7rem] font-black leading-none select-none pointer-events-none"
                  style={{ color: "var(--color-primary)", opacity: 0.06 }}
                >
                  {lane.letter}
                </span>

                {/* Lane badge */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[var(--color-primary)] text-white text-sm font-bold shadow-sm">
                    {lane.letter}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-widest text-[var(--color-text-muted)]">
                    Lane {lane.letter}
                  </span>
                </div>

                {/* Lane name */}
                <p className="text-base font-bold text-[var(--color-text)] mb-4 leading-snug">
                  {lane.name}
                </p>

                {/* Owner & Members */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)]">
                      Owner
                    </span>
                    <span className="text-sm font-semibold text-[var(--color-text)]">
                      {lane.owner}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[var(--color-primary)] pt-0.5">
                      Members
                    </span>
                    <span className="text-sm text-[var(--color-text-muted)] italic">
                      {lane.members || "TBD"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <h3 className="mt-10 mb-3 text-sm font-semibold uppercase tracking-wider text-[var(--color-primary)]">Building</h3>
          <p className="mb-6 text-[var(--color-text-secondary)] italic">Engineers build from approved, highly detailed artifacts — not from meetings or ambiguous tickets.</p>
          {/* Workflow Diagram */}
          <div className="overflow-x-auto">
            <svg
              viewBox="0 0 900 200"
              className="w-full min-w-[560px]"
              style={{ color: "var(--color-primary)" }}
              aria-label="Development workflow: BRD → PRD → Technical Spec → Scaffolding → Implementation"
            >
              {/* BRD box — top row */}
              <rect x="10" y="10" width="150" height="80" rx="12" fill="var(--color-bg-alt)" stroke="currentColor" strokeWidth="2"/>
              <text x="85" y="44" textAnchor="middle" fontWeight="800" fontSize="14" fill="var(--color-text)">BRD</text>
              <text x="85" y="62" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">Define business</text>
              <text x="85" y="76" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">goals</text>

              {/* Connector: BRD down → right → up to PRD */}
              <path d="M85 90 L85 130 Q85 150 105 150 L245 150 Q265 150 265 130 L265 90" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>

              {/* PRD box — bottom row */}
              <rect x="190" y="110" width="150" height="80" rx="12" fill="var(--color-bg-alt)" stroke="currentColor" strokeWidth="2"/>
              <text x="265" y="144" textAnchor="middle" fontWeight="800" fontSize="14" fill="var(--color-text)">PRD</text>
              <text x="265" y="162" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">Specify product</text>
              <text x="265" y="176" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">outcomes</text>

              {/* Connector: PRD up → right → down to Technical Spec */}
              <path d="M265 110 L265 60 Q265 40 285 40 L435 40 Q455 40 455 60 L455 90" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>

              {/* Technical Spec box — top row */}
              <rect x="380" y="10" width="150" height="80" rx="12" fill="var(--color-bg-alt)" stroke="currentColor" strokeWidth="2"/>
              <text x="455" y="40" textAnchor="middle" fontWeight="800" fontSize="14" fill="var(--color-text)">Technical Spec</text>
              <text x="455" y="58" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">Detail engineering</text>
              <text x="455" y="72" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">requirements</text>

              {/* Connector: Technical Spec down → right → up to Scaffolding */}
              <path d="M455 90 L455 130 Q455 150 475 150 L615 150 Q635 150 635 130 L635 90" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>

              {/* Scaffolding box — bottom row */}
              <rect x="560" y="110" width="150" height="80" rx="12" fill="var(--color-bg-alt)" stroke="currentColor" strokeWidth="2"/>
              <text x="635" y="144" textAnchor="middle" fontWeight="800" fontSize="14" fill="var(--color-text)">Scaffolding</text>
              <text x="635" y="162" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">Set up project</text>
              <text x="635" y="176" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">structure</text>

              {/* Connector: Scaffolding up → right → down to Implementation */}
              <path d="M635 110 L635 60 Q635 40 655 40 L805 40 Q825 40 825 60 L825 90" stroke="currentColor" strokeWidth="2" fill="none" markerEnd="url(#arrow)"/>

              {/* Implementation box — top row */}
              <rect x="750" y="10" width="150" height="80" rx="12" fill="var(--color-bg-alt)" stroke="currentColor" strokeWidth="2"/>
              <text x="825" y="40" textAnchor="middle" fontWeight="800" fontSize="14" fill="var(--color-text)">Implementation</text>
              <text x="825" y="58" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">Develop approved</text>
              <text x="825" y="72" textAnchor="middle" fontSize="11" fill="var(--color-text-muted)">artifacts</text>

              {/* Start dot */}
              <circle cx="10" cy="50" r="6" fill="currentColor"/>
              {/* End dot */}
              <circle cx="900" cy="50" r="6" fill="currentColor"/>

              <defs>
                <marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L8,3 z" fill="currentColor"/>
                </marker>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
