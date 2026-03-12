import Container from "@/components/Container";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-blue-100/80 bg-white/95">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-blue-50/70 to-transparent" />
      <Container>
        <div className="relative flex flex-col gap-2 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="text-slate-400">Built for consistency · Glasgow</p>
        </div>
      </Container>
    </footer>
  );
}