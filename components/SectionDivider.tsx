export default function SectionDivider() {
  return (
    <div aria-hidden="true" className="relative my-10">
      {/* gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />

      {/* soft glow behind centre */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-sky-200/70 via-emerald-200/60 to-blue-200/70 blur-xl opacity-80" />

      {/* brand-colour centre dots */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-sky-500/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
        <span className="h-2 w-2 rounded-full bg-blue-500/70" />
      </div>
    </div>
  );
}