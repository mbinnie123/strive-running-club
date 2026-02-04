import Container from "@/components/Container";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-white">
      <Container>
        <div className="flex flex-col gap-2 py-10 text-sm text-black/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <p className="text-black/40">Built for consistency · Glasgow</p>
        </div>
      </Container>
    </footer>
  );
}