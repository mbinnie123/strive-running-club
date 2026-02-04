import { cn } from "@/lib/utils";

export default function Card({
  title,
  body,
  className,
}: {
  title: string;
  body: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-[0_1px_0_rgba(255,255,255,0.06)]",
        "transition hover:bg-white/[0.06]",
        className
      )}
    >
      <p className="text-sm text-white/60">{title}</p>
      <p className="mt-2 text-lg font-medium text-white">{body}</p>
    </div>
  );
}