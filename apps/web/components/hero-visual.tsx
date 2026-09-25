import { Activity, ArrowUpRight, MapPinned, ShieldCheck } from "lucide-react";

type HeroVisualProps = Readonly<{
  label: string;
  status: string;
  statusValue: string;
  statOne: string;
  statTwo: string;
  statThree: string;
}>;

export function HeroVisual({
  label,
  status,
  statusValue,
  statOne,
  statTwo,
  statThree,
}: HeroVisualProps) {
  return (
    <div className="relative mx-auto w-full max-w-[500px]">
      <div className="absolute -inset-10 rounded-full bg-[var(--dso-red)]/10 blur-3xl" />
      <div className="glass-panel relative overflow-hidden rounded-[24px] p-5 sm:p-7">
        <div className="flex items-center justify-between border-b border-white/10 pb-5">
          <div>
            <p className="text-[10px] font-bold tracking-[0.2em] text-white/70">{label}</p>
            <p className="mt-2 font-display text-lg font-bold text-white">Operations overview</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[var(--dso-red)] text-white">
            <ArrowUpRight size={17} aria-hidden="true" />
          </div>
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-black/15 p-5">
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-2 text-xs text-white/50">
              <Activity size={14} className="text-[#ff6d6d]" aria-hidden="true" />
              {status}
            </span>
            <span className="h-2 w-2 rounded-full bg-[#4ee39a] shadow-[0_0_14px_#4ee39a]" />
          </div>
          <p className="mt-3 text-2xl font-bold text-white">{statusValue}</p>
          <div className="mt-6 flex h-20 items-end gap-1.5">
            {[32, 48, 40, 62, 52, 74, 65, 83, 70, 91, 78, 96, 88, 100].map((height, index) => (
              <span
                key={`${height}-${index}`}
                className="chart-bar flex-1 rounded-t-sm bg-gradient-to-t from-[var(--dso-red-deep)] to-[var(--dso-red-bright)]"
                style={{ height: `${height}%`, "--chart-delay": `${index * 55}ms` } as React.CSSProperties}
              />
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {[statOne, statTwo, statThree].map((labelText, index) => (
            <div key={labelText} className="rounded-xl border border-white/10 bg-white/5 p-3">
              <p className="font-display text-xl font-bold text-white">{index === 0 ? "04" : index === 1 ? "02" : "ID/EN"}</p>
              <p className="mt-1 text-[10px] leading-4 text-white/70">{labelText}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl bg-white/5 px-4 py-3">
          <span className="flex items-center gap-2 text-xs text-white/50">
            <MapPinned size={15} className="text-[#ff6d6d]" aria-hidden="true" />
            Field data capture
          </span>
          <ShieldCheck size={17} className="text-[#4ee39a]" aria-hidden="true" />
        </div>
      </div>
    </div>
  );
}
