import Button from "@/components/Button";

export default function SessionCard({
  title,
  time,
  location,
  description,
  price,
}: {
  title: string;
  time: string;
  location?: string;
  description?: string;
  price?: string;
}) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.12em] text-blue-700">Session</p>
          <h4 className="mt-2 text-lg font-semibold text-slate-900">{title}</h4>
          <p className="mt-1 text-sm text-slate-600">{description}</p>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-slate-900">{time}</p>
          {price && <p className="mt-1 text-sm text-slate-500">{price}</p>}
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-slate-500">{location}</div>
        <Button href="/membership" variant="primary">Book</Button>
      </div>
    </div>
  );
}
