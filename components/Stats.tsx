export default function Stats() {
  const stats = [
    { k: "Sessions weekly", v: "3+" },
    { k: "All levels", v: "Beginner → Advanced" },
    { k: "Structure", v: "Tempo · Track · Long" },
  ];

  return (
    <div className="grid gap-3 rounded-3xl border border-black/10 bg-black/[0.03] p-5 md:grid-cols-3">
      {stats.map((s) => (
        <div key={s.k} className="rounded-2xl border border-black/10 bg-black/5 p-4">
          <p className="text-xs text-black/60">{s.k}</p>
          <p className="mt-1 text-xl font-semibold text-black">{s.v}</p>
        </div>
      ))}
    </div>
  );
}