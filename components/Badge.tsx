import { cn } from "@/lib/utils";

export default function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-black/10 bg-black/5 px-3 py-1 text-xs text-black/70",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-black/40" />
      {children}
    </span>
  );
}