export default function SectionHeading({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <div className="mb-8">
      <p className="inline-flex rounded-full border border-blue-200/70 bg-white/70 px-3 py-1 text-xs uppercase tracking-[0.18em] text-blue-700">
        {eyebrow}
      </p>
      <h2 className="mt-4 text-2xl font-semibold tracking-tight text-slate-900 md:text-4xl">
        {title}
      </h2>
      {desc ? <p className="mt-3 max-w-2xl text-slate-600 md:text-lg">{desc}</p> : null}
    </div>
  );
}