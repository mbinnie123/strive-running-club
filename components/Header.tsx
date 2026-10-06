"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Container from "@/components/Container";
import Button from "@/components/Button";
import { site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-blue-100/80 bg-white/80 backdrop-blur-xl">
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

          <div className="flex items-center gap-2 md:hidden">
            <Button href="/membership" variant="secondary" className="py-2.5">
              Join
            </Button>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-white"
            >
              <span className="relative flex h-4 w-5 flex-col justify-between">
                <motion.span
                  className="block h-0.5 w-full origin-center rounded-full bg-slate-900"
                  animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
                <motion.span
                  className="block h-0.5 w-full rounded-full bg-slate-900"
                  animate={open ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.15, ease: "easeInOut" }}
                />
                <motion.span
                  className="block h-0.5 w-full origin-center rounded-full bg-slate-900"
                  animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                />
              </span>
            </button>
          </div>
        </div>
      </Container>

        <AnimatePresence>
          {open && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden border-t border-blue-100/80 bg-white/95 backdrop-blur-xl md:hidden"
            >
              <Container>
                <div className="flex flex-col gap-1 py-3">
                  {site.nav.map((item, i) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2, delay: i * 0.05 }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className="block rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-blue-50 hover:text-slate-900"
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </Container>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* mobile-only spacer to offset fixed header so content (hero) isn't covered */}
      <div className="md:hidden h-12" aria-hidden="true" />
    </>
  );
}