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
        "rounded-3xl border border-black/10 bg-black/[0.04] p-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]",
        "transition hover:bg-black/[0.06]",
        className
      )}
    >
      <p className="text-sm text-black/60">{title}</p>
      <p className="mt-2 text-lg font-medium text-black">{body}</p>
    </div>
  );
}