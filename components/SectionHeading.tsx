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
      <p className="text-xs uppercase tracking-[0.18em] text-white/50">{eyebrow}</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
        {title}
      </h2>
      {desc ? <p className="mt-3 max-w-2xl text-white/70">{desc}</p> : null}
    </div>
  );
}