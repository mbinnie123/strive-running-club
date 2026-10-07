const items = ["Consistency", "Community", "Coaching", "Confidence", "Performance", "Glasgow"];

function Group({ hidden = false }: { hidden?: boolean }) {
  return (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-6 pr-6"
    >
      {/* Repeat the list so a single group is always wider than the viewport */}
      {[...items, ...items].map((t, i) => (
        <li
          key={i}
          className="whitespace-nowrap rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

export default function Marquee() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white/80 shadow-[0_14px_32px_rgba(14,59,122,0.07)]">
      <div className="pointer-events-none absolute inset-0 z-10 bg-gradient-to-r from-blue-50 via-transparent to-blue-50 opacity-95" />
      {/* Two identical groups; translating by exactly -100% of one group loops seamlessly */}
      <div className="marquee-track flex w-max py-4">
        <Group />
        <Group hidden />
      </div>
    </div>
  );
}
