import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

type Props = {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;

  // Link mode
  href?: string;

  // Button mode
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

export default function Button({
  children,
  variant = "primary",
  className,
  href,
  onClick,
  type,
}: Props) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
    "active:scale-[0.98]";

  const variants: Record<Variant, string> = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 shadow-[0_10px_30px_rgba(37,99,235,0.25)]",
    secondary:
      "border border-blue-200 bg-white text-blue-700 hover:bg-blue-50",
  };

  const classes = cn(base, variants[variant], className);

  const dotColor = variant === "secondary" ? "bg-sky-400" : "bg-white/70";

  // LINK BUTTON
  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
        <span className={cn("h-1.5 w-1.5 rounded-full transition group-hover:scale-125", dotColor)} />
      </Link>
    );
  }

  // ACTION BUTTON
  return (
    <button type={type ?? "button"} onClick={onClick} className={classes}>
      {children}
      <span className={cn("h-1.5 w-1.5 rounded-full transition group-hover:scale-125", dotColor)} />
    </button>
  );
}