"use client";

import Link from "next/link";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { site } from "@/lib/site";

export default function Header() {
  return (
    <header className="sticky top-0 z-[100] border-b border-blue-100/80 bg-white/80 backdrop-blur-xl">
      <Container>
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="group inline-flex items-center gap-3">
            <img
              src="/strive-running-club-glasgow-logo.svg"
              alt="Strive Running Club Glasgow"
              className="h-11 w-11 rounded-2xl border border-blue-100 bg-white object-contain p-1 shadow-[0_10px_26px_rgba(23,104,245,0.12)]"
            />
            <div className="leading-tight">
              <div className="font-semibold tracking-tight text-slate-900">{site.name}</div>
              <div className="text-xs text-slate-500">{site.city}</div>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {site.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-1.5 text-sm text-slate-600 transition hover:bg-blue-50 hover:text-slate-900"
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