import { resultSteps, resultsSummary } from "@/lib/mockData";

export function Results() {
  return (
    <section className="py-12 px-4 md:px-8">
      <div className="max-w-[1200px] mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] mb-8 flex items-baseline gap-3">
          <span className="text-sm font-mono font-normal text-[var(--color-text-muted)] opacity-50 select-none">03</span>
          Results
        </h2>

        {/* Table - theme-adaptive via CSS vars */}
        <div className="overflow-x-auto rounded-xl border border-[var(--color-border)] mb-12">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="bg-[var(--color-bg-alt)] border-b-2 border-[var(--color-primary)]">
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--color-text)]">
                  ROLE
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--color-text)]">
                  TASK
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--color-text)]">
                  OLD WAY
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--color-text)]">
                  NEW WAY
                </th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-[var(--color-text)]">
                  SPEEDUP
                </th>
              </tr>
            </thead>
            <tbody>
              {resultSteps.map((row) => (
                <tr
                  key={row.id}
                  className="border-b border-[var(--color-border)] hover:bg-[var(--color-bg-alt)]/50 transition-colors"
                >
                  <td className="py-3 px-4 text-sm text-[var(--color-text)]">
                    {row.role}
                  </td>
                  <td className="py-3 px-4 text-sm text-[var(--color-text)]">
                    {row.task}
                  </td>
                  <td className="py-3 px-4 text-sm text-[var(--color-text)]">
                    {row.oldWay}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-[var(--color-results-accent)]">
                    {row.newWay}
                  </td>
                  <td className="py-3 px-4 text-sm font-medium text-[var(--color-results-accent)]">
                    {row.speedup}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-[var(--color-bg-alt)] border-t-2 border-[var(--color-primary)]">
                <td colSpan={2} className="py-3 px-4 text-sm font-bold uppercase tracking-wide text-[var(--color-text)]">
                  Total (est.)
                </td>
                <td className="py-3 px-4 text-sm font-bold text-[var(--color-text)]">
                  ~1,800 hrs
                  <span className="block text-xs font-normal text-[var(--color-text-muted)]">~300 days</span>
                </td>
                <td className="py-3 px-4 text-sm font-bold text-[var(--color-results-accent)]">
                  ~72 hrs
                  <span className="block text-xs font-normal text-[var(--color-text-muted)]">~12 days</span>
                </td>
                <td className="py-3 px-4 text-sm font-bold text-[var(--color-results-accent)]">
                  ~25x
                </td>
              </tr>
            </tfoot>
          </table>
          <p className="text-xs text-[var(--color-text-muted)] opacity-60 mt-2 px-1">
            * 1 day = 6-hour work day
          </p>
        </div>

        {/* Summary cards */}
        <div className="text-center mb-8">

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                OLD WAY (EST.)
              </p>
              <p className="text-2xl font-bold text-[var(--color-text)]">
                {resultsSummary.oldWayWeeks}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                {resultsSummary.oldWayHours}
              </p>
            </div>
            <div className="p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)]">
              <p className="text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-1">
                NEW WAY
              </p>
              <p className="text-2xl font-bold text-[var(--color-results-accent)]">
                {resultsSummary.newWayDays}
              </p>
              <p className="text-sm text-[var(--color-text-muted)]">
                {resultsSummary.newWayHours}
              </p>
            </div>
            <div className="relative p-6 rounded-xl bg-[var(--color-surface)] border-2 border-[var(--color-results-accent)] flex flex-col items-center justify-center text-center min-h-full overflow-hidden">
              {/* Firework particles */}
              {["🎉","✨","🎊","⭐","💥","🎇","✨","🎉"].map((emoji, i) => (
                <span
                  key={i}
                  className="pointer-events-none select-none absolute text-base"
                  style={{
                    top: `${[8,5,15,75,80,70,45,55][i]}%`,
                    left: `${[10,85,50,5,88,60,20,75][i]}%`,
                    animation: `fw-float ${1.8 + i * 0.3}s ease-in-out ${i * 0.25}s infinite alternate`,
                    opacity: 0.7,
                  }}
                >
                  {emoji}
                </span>
              ))}
              <style>{`
                @keyframes fw-float {
                  0%   { transform: translateY(0px) rotate(0deg) scale(1);   opacity: 0.5; }
                  50%  { transform: translateY(-6px) rotate(15deg) scale(1.2); opacity: 0.9; }
                  100% { transform: translateY(3px) rotate(-10deg) scale(0.9); opacity: 0.6; }
                }
              `}</style>
              <p className="relative text-xs font-semibold uppercase tracking-wider text-[var(--color-text-muted)] mb-2">
                Time Saved
              </p>
              <p className="relative text-3xl font-bold text-[var(--color-results-accent)] leading-tight">
                {resultsSummary.timeSavedHours}
              </p>
              <p className="relative text-sm text-[var(--color-text-muted)] mt-2">
                ~1,728 developer hours
              </p>
            </div>
          </div>
        </div>

        {/* Lines of code stat */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex flex-col items-center justify-center px-8 py-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm w-72 h-40">
            <p className="text-3xl font-black tracking-tight text-[var(--color-text)] text-center">~81,000</p>
            <p className="text-3xl font-black tracking-tight text-[var(--color-results-accent)] text-center">lines</p>
            <p className="text-sm text-[var(--color-text-muted)] text-center">of productive code written (est)</p>
          </div>
          <div className="flex flex-col items-center justify-center px-8 py-5 rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-sm w-72 h-40">
            <p className="text-3xl font-black tracking-tight text-[var(--color-text)] text-center">~26,000</p>
            <p className="text-3xl font-black tracking-tight text-[var(--color-results-accent)] text-center">lines</p>
            <p className="text-sm text-[var(--color-text-muted)] text-center">of test code written (est)</p>
          </div>
        </div>

      </div>
    </section>
  );
}
