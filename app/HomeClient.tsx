"use client";

import Container from "@/components/Container";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import Marquee from "@/components/Marquee";
import FAQ from "@/components/FAQ";
import Stats from "@/components/Stats";

import { site } from "@/lib/site";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/Motion";

// Modern section divider component
function SectionDivider() {
  return (
    <div aria-hidden="true" className="relative my-10">
      {/* gradient line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-sky-400/60 to-transparent" />

      {/* soft glow behind centre */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-10 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-sky-200/70 via-emerald-200/60 to-blue-200/70 blur-xl opacity-80" />

      {/* brand-colour centre dots */}
      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center gap-2">
        <span className="h-2 w-2 rounded-full bg-sky-500/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/60" />
        <span className="h-2 w-2 rounded-full bg-blue-500/70" />
      </div>
    </div>
  );
}

export default function HomeClient() {
  return (
    <div className="relative overflow-hidden text-black">
      {/* SUBTLE BACKGROUND BLOBS (global) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Top / Hero */}
        <div className="absolute -top-20 left-0 h-[600px] w-full rounded-full bg-gradient-to-br from-sky-200/80 via-sky-100/60 to-transparent blur-3xl opacity-60 md:h-[800px]" />
        <div className="absolute -top-20 right-0 h-[600px] w-full rounded-full bg-gradient-to-bl from-sky-200/70 via-cyan-100/50 to-transparent blur-3xl opacity-60 md:h-[800px]" />

        {/* Mid sections */}
        <div className="absolute top-[25%] left-0 h-[600px] w-full rounded-full bg-gradient-to-br from-sky-200/70 via-blue-100/60 to-transparent blur-3xl opacity-50 md:h-[800px]" />
        <div className="absolute top-[45%] right-0 h-[600px] w-full rounded-full bg-gradient-to-br from-sky-200/60 via-cyan-100/50 to-transparent blur-3xl opacity-50 md:h-[800px]" />

        {/* Lower sections */}
        <div className="absolute top-[65%] left-0 h-[600px] w-full rounded-full bg-gradient-to-br from-sky-200/60 via-blue-100/50 to-transparent blur-3xl opacity-40 md:h-[800px]" />
        <div className="absolute top-[85%] right-0 h-[600px] w-full rounded-full bg-gradient-to-br from-sky-200/50 via-cyan-100/40 to-transparent blur-3xl opacity-40 md:h-[800px]" />
      </div>
      {/* HERO */}
      <MotionSection initial="hidden" animate="show" variants={stagger} className="pt-14 relative overflow-hidden">
          {/* Section gradient */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 min-h-screen -z-10 bg-gradient-to-br from-sky-100/40 via-white to-emerald-100/30"
          />
        <Container>
          <MotionDiv variants={fadeUp} className="flex flex-wrap gap-2">
            <Badge>Weekly group runs</Badge>
            <Badge>Structured sessions</Badge>
            <Badge>Glasgow community</Badge>
          </MotionDiv>

          <MotionDiv variants={fadeUp} className="mt-6">
            <h1 className="text-4xl font-semibold tracking-tight text-black md:text-6xl">
              <span className="relative inline-block">
                {site.tagline}
                <span
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-gradient-to-r from-sky-300/70 via-blue-300/60 to-transparent"
                />
              </span>
            </h1>

            {/* NOTE: your copy still uses dark-theme classes below.
               If you’ve moved to white/blue theme, swap text colours later. */}
            <p className="mt-5 max-w-2xl text-black md:text-lg">
              A modern running club built on structure and support — show up, follow the plan,
              and watch the progress stack up.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/membership" variant="primary">Join the club</Button>
              <Button href="/runs" variant="secondary">View weekly runs</Button>
            </div>
            <div className="mt-6 flex justify-center">
              <img
                src="/strive-running-club-glasgow-logo.svg"
                alt="Strive Running Club Glasgow"
                className="h-12 w-auto opacity-100 sm:h-16 md:h-24 lg:h-28"
              />
            </div>

            <div className="mt-10 text-black">
              <Stats />
            </div>
          </MotionDiv>

          {/* HERO PANEL */}
          <MotionDiv
            variants={fadeUp}
            className="noise mt-10 overflow-hidden rounded-[28px] border border-black/5 bg-white/80 backdrop-blur-md shadow-[0_22px_60px_rgba(0,0,0,0.10)]"
          >
            <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
              <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
                <p className="text-sm text-blue-700">Session types</p>
                <p className="mt-2 text-lg font-medium text-black">Track · Tempo · Long runs</p>
                <p className="mt-2 text-sm text-black/70">
                  Effort-based options so everyone trains together.
                </p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
                <p className="text-sm text-blue-700">Coached structure</p>
                <p className="mt-2 text-lg font-medium text-black">Warm-up → Work → Cooldown</p>
                <p className="mt-2 text-sm text-black/70">
                  No guesswork. Just show up and run.
                </p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-5">
                <p className="text-sm text-blue-700">Community</p>
                <p className="mt-2 text-lg font-medium text-black">Support + accountability</p>
                <p className="mt-2 text-sm text-black/70">
                  Consistency feels easier when you’re not doing it alone.
                </p>
              </div>
            </div>
          </MotionDiv>

          {/* HERO BACKGROUND DECOR */}
          <div className="pointer-events-none absolute top-0 right-0 -z-10 w-[420px] max-w-[60%] md:w-[520px]">
            <img
              src="/strive-running-club-park.svg"
              alt=""
              aria-hidden="true"
              className="w-full opacity-20 mix-blend-multiply"
            />
          </div>
        </Container>
      </MotionSection>
      <SectionDivider />

      {/* MARQUEE */}
      <Container>
        <div className="py-10">
          <Marquee />
        </div>
      </Container>

      {/* WHAT YOU GET */}
      <MotionSection
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="pb-6 relative overflow-hidden"
        >
          {/* Section gradient */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 min-h-screen -z-10 bg-gradient-to-br from-sky-100/35 via-white to-emerald-100/25"
          />
        <Container>
          <MotionDiv variants={fadeUp}>
            <SectionHeading
              eyebrow="The Strive approach"
              title="A club that feels modern — and actually keeps you consistent"
              desc="Simple, repeatable sessions with a community that makes it easier to stick to the plan."
            />
          </MotionDiv>

          <div className="grid gap-4 md:grid-cols-3">
            <MotionDiv variants={fadeUp}>
              <Card title="Weekly structure" body="A clear schedule you can build your week around." />
            </MotionDiv>
            <MotionDiv variants={fadeUp}>
              <Card title="Progress you can feel" body="Sessions designed to improve fitness without frying you." />
            </MotionDiv>
            <MotionDiv variants={fadeUp}>
              <Card title="Good vibes, no ego" body="Supportive culture — we train hard and enjoy it." />
            </MotionDiv>
          </div>
        </Container>
      </MotionSection>
      <SectionDivider />

      {/* THIS WEEK */}
      <MotionSection
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="py-14 relative overflow-hidden"
        >
          {/* Section gradient */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 min-h-screen -z-10 bg-gradient-to-tr from-emerald-100/35 via-white to-sky-100/35"
          />
        <Container>
          <MotionDiv variants={fadeUp} className="grid gap-4 md:grid-cols-2">
            <div className="noise rounded-3xl border border-blue-100 bg-white p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-blue-700">This week in Glasgow</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-black">Three simple pillars</h3>

              <ul className="mt-5 space-y-3 text-black">
                <li className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50/40 px-4 py-3">
                  <span>Mon · Easy social</span><span className="text-black/70">45 mins</span>
                </li>
                <li className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50/40 px-4 py-3">
                  <span>Wed · Session night</span><span className="text-black/70">Intervals</span>
                </li>
                <li className="flex items-center justify-between rounded-2xl border border-blue-100 bg-blue-50/40 px-4 py-3">
                  <span>Sat · Long run + coffee</span><span className="text-black/70">Social</span>
                </li>
              </ul>

              <p className="mt-4 text-sm text-black/70">
                Later we can wire this to a Google Sheet / CMS so you can update it quickly.
              </p>
            </div>

            <div className="rounded-3xl border border-blue-100 bg-white p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-blue-700">Join</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-black">Ready to start?</h3>
              <p className="mt-4 text-black">Pick a plan, get the schedule, and turn up. We’ll do the rest.</p>

              <div className="mt-7 grid gap-3">
                <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4">
                  <p className="text-sm font-medium text-black">Club Membership</p>
                  <p className="mt-1 text-sm text-black/70">Group sessions + community access.</p>
                </div>
                <div className="rounded-2xl border border-blue-100 bg-blue-50/40 p-4">
                  <p className="text-sm font-medium text-black">Coached Plan</p>
                  <p className="mt-1 text-sm text-black/70">Extra structure and accountability.</p>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/membership" variant="primary">See membership</Button>
                <Button href="/contact" variant="secondary">Ask a question</Button>
              </div>
            </div>
          </MotionDiv>
        </Container>
      </MotionSection>
      <SectionDivider />

      {/* FAQ */}
      <MotionSection
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="relative overflow-hidden"
        >
          {/* Section gradient */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 min-h-screen -z-10 bg-gradient-to-br from-sky-100/30 via-white to-emerald-100/30"
          />
        <Container>
          <MotionDiv variants={fadeUp}>
            <SectionHeading
              eyebrow="FAQ"
              title="Quick answers"
              desc="Everything you need to know before you turn up."
            />
          </MotionDiv>

          <MotionDiv variants={fadeUp}>
            <FAQ />
          </MotionDiv>
        </Container>
      </MotionSection>
    </div>
  );
}