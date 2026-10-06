export const site = {
  name: "Strive Running Club",
  city: "Glasgow",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000"),
  tagline: "Run together. Get faster. Stay consistent.",
  description:
    "Weekly group runs, structured sessions, and a proper community in Glasgow — from beginners to competitive runners.",
  nav: [
    { label: "Runs", href: "/runs" },
    { label: "Membership", href: "/membership" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};