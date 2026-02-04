import Link from "next/link";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary";

type LinkButtonProps = {
  href: string;
  onClick?: never;
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
};

type ActionButtonProps = {
  href?: never;
  onClick: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"];
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>["type"];
};

type Props = LinkButtonProps | ActionButtonProps;

export default function Button(props: Props) {
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

  const className = cn(base, variants[props.variant ?? "primary"], props.className);

  // LINK BUTTON
  if ("href" in props) {
    return (
      <Link href={props.href} className={className}>
        {props.children}
        <span className="h-1.5 w-1.5 rounded-full bg-white/70 transition group-hover:scale-125" />
      </Link>
    );
  }

  // ACTION BUTTON
  return (
    <button onClick={props.onClick} type={props.type ?? "button"} className={className}>
      {props.children}
      <span className="h-1.5 w-1.5 rounded-full bg-white/70 transition group-hover:scale-125" />
    </button>
  );
}