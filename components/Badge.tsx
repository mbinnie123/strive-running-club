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
        "inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-[0_6px_16px_rgba(17,58,124,0.07)] backdrop-blur-sm",
        className
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-cyan-500/80" />
      {children}
    </span>
  );
}