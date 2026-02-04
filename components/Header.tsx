import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/60 backdrop-blur">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="group inline-flex items-center gap-3">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/70 transition group-hover:scale-110" />
            </span>
            <div className="leading-tight">
              <div className="font-semibold tracking-tight">{site.name}</div>
              <div className="text-xs text-white/60">{site.city}</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-white/75 transition hover:text-white"
              >
                {item.label}
              </Link>
            ))}
            <Button href="/membership" variant="primary" className="py-2.5">
              Join
            </Button>
          </nav>

          <div className="md:hidden">
            <Button href="/membership" variant="secondary" className="py-2.5">
              Join
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}