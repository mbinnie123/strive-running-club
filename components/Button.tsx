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
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition duration-200 " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white " +
    "active:scale-[0.98]";

  const variants: Record<Variant, string> = {
    primary:
      "bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white shadow-[0_16px_34px_rgba(23,104,245,0.28)] hover:shadow-[0_20px_44px_rgba(23,104,245,0.34)] hover:-translate-y-0.5",
    secondary:
      "border border-blue-200/90 bg-white/90 text-blue-700 shadow-[0_8px_20px_rgba(17,58,124,0.08)] hover:bg-blue-50/90 hover:text-blue-800 hover:-translate-y-0.5",
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