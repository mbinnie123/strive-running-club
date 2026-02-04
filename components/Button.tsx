import Link from "next/link";
import { cn } from "@/lib/utils";

type Props =
  | {
      href: string;
      children: React.ReactNode;
      variant?: "primary" | "secondary";
      className?: string;
    }
  | {
      href?: never;
      children: React.ReactNode;
      onClick: () => void;
      variant?: "primary" | "secondary";
      className?: string;
    };

export default function Button(props: Props) {
  const base =
    "group inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition " +
    "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-black " +
    "active:scale-[0.98]";

  const variants = {
    primary:
      "bg-white text-black hover:bg-white/90 shadow-[0_10px_30px_rgba(255,255,255,0.10)]",
    secondary:
      "border border-white/15 bg-white/5 text-white hover:bg-white/10",
  };

  const className = cn(base, variants[props.variant ?? "primary"], props.className);

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={className}>
        {props.children}
        <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-black/60 transition group-hover:scale-125" />
      </Link>
    );
  }

  return (
    <button onClick={props.onClick} className={className}>
      {props.children}
      <span className="relative inline-block h-1.5 w-1.5 rounded-full bg-black/60 transition group-hover:scale-125" />
    </button>
  );
}