"use client";

import Container from "@/components/Container";
import Badge from "@/components/Badge";
import Button from "@/components/Button";
import Card from "@/components/Card";
import SectionHeading from "@/components/SectionHeading";
import Marquee from "@/components/Marquee";
import FAQ from "@/components/FAQ";
import Stats from "@/components/Stats";
import SectionDivider from "@/components/SectionDivider";
import NextRunCountdown from "@/components/NextRunCountdown";
import { useEffect, useState } from "react";
import { useScroll, useSpring, motion } from "framer-motion";
function weatherLabelFromCode(code: number): string {
  // Open-Meteo weather codes: https://open-meteo.com/en/docs
  if (code === 0) return "Clear";
  if (code === 1 || code === 2) return "Partly cloudy";
  if (code === 3) return "Overcast";
  if (code === 45 || code === 48) return "Fog";
  if (code === 51 || code === 53 || code === 55) return "Drizzle";
  if (code === 56 || code === 57) return "Freezing drizzle";
  if (code === 61 || code === 63 || code === 65) return "Rain";
  if (code === 66 || code === 67) return "Freezing rain";
  if (code === 71 || code === 73 || code === 75) return "Snow";
  if (code === 77) return "Snow grains";
  if (code === 80 || code === 81 || code === 82) return "Rain showers";
  if (code === 85 || code === 86) return "Snow showers";
  if (code === 95) return "Thunderstorm";
  if (code === 96 || code === 99) return "Thunderstorm + hail";
  return "Weather";
}

function WeatherWidget() {
  const [loading, setLoading] = useState(true);
  const [temp, setTemp] = useState<number | null>(null);
  const [wind, setWind] = useState<number | null>(null);
  const [code, setCode] = useState<number | null>(null);

  useEffect(() => {
    let alive = true;

    const run = async () => {
      try {
        // Glasgow (city centre-ish)
        const lat = 55.8642;
        const lon = -4.2518;

        const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true&timezone=Europe%2FLondon`;
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error("Weather fetch failed");
        const data = await res.json();

        const cw = data?.current_weather;
        if (!cw) throw new Error("Missing weather payload");

        if (!alive) return;
        setTemp(typeof cw.temperature === "number" ? cw.temperature : null);
        setWind(typeof cw.windspeed === "number" ? cw.windspeed : null);
        setCode(typeof cw.weathercode === "number" ? cw.weathercode : null);
      } catch {
        if (!alive) return;
        setTemp(null);
        setWind(null);
        setCode(null);
      } finally {
        if (!alive) return;
        setLoading(false);
      }
    };

    run();
    const id = window.setInterval(run, 15 * 60 * 1000); // refresh every 15 mins

    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, []);

  if (loading) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm text-black/70">
        <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" />
        Glasgow weather…
      </span>
    );
  }

  if (temp == null || code == null) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm text-black/70">
        Glasgow weather unavailable
      </span>
    );
  }

  const label = weatherLabelFromCode(code);
  const roundedTemp = Math.round(temp);
  const roundedWind = wind == null ? null : Math.round(wind);

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-sm text-black/80">
      <span className="h-2 w-2 rounded-full bg-sky-400" />
      <span className="font-medium">Glasgow</span>
      <span aria-hidden="true">·</span>
      <span>{roundedTemp}°C</span>
      <span className="text-black/60">{label}</span>
      {roundedWind != null && (
        <>
          <span aria-hidden="true" className="text-black/30">
            ·
          </span>
          <span className="text-black/60">{roundedWind} km/h</span>
        </>
      )}
    </span>
  );
}

import { site } from "@/lib/site";
import { MotionDiv, MotionSection, fadeUp, stagger } from "@/components/Motion";

export default function HomeClient() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative overflow-x-clip text-black">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[100] h-1 bg-blue-600 origin-left"
        style={{ scaleX }}
      />

      {/* GLOBAL BACKGROUND (continuous, bleeding through all sections) */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
        {/* Base wash to keep the page cohesive */}
        <div className="absolute inset-0 bg-gradient-to-b from-sky-50 via-white to-emerald-50" />

        {/* Big soft blobs that overlap vertically so sections feel connected */}
        <div className="absolute -top-56 left-[-20%] h-[780px] w-[780px] rounded-full bg-gradient-to-br from-sky-300/70 via-sky-200/50 to-transparent blur-3xl opacity-70" />
        <div className="absolute top-[-120px] right-[-18%] h-[820px] w-[820px] rounded-full bg-gradient-to-bl from-cyan-300/65 via-sky-200/45 to-transparent blur-3xl opacity-70" />

        <div className="absolute top-[18%] left-[-12%] h-[900px] w-[900px] rounded-full bg-gradient-to-br from-sky-300/60 via-blue-200/45 to-transparent blur-3xl opacity-65" />
        <div className="absolute top-[36%] right-[-14%] h-[920px] w-[920px] rounded-full bg-gradient-to-br from-emerald-300/50 via-cyan-200/40 to-transparent blur-3xl opacity-60" />

        <div className="absolute top-[58%] left-[-16%] h-[980px] w-[980px] rounded-full bg-gradient-to-br from-cyan-300/55 via-sky-200/40 to-transparent blur-3xl opacity-60" />
        <div className="absolute top-[78%] right-[-18%] h-[980px] w-[980px] rounded-full bg-gradient-to-br from-emerald-300/45 via-sky-200/35 to-transparent blur-3xl opacity-55" />

        {/* A faint diagonal sheen to help everything blend */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-sky-100/25 to-white/0 mix-blend-multiply" />
      </div>

      <div className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <nav className="pointer-events-auto inline-flex gap-1 rounded-full border border-black/5 bg-white/90 p-1.5 shadow-sm backdrop-blur-md">
          <a href="#approach" className="rounded-full px-4 py-1.5 text-sm font-medium text-black/70 transition hover:bg-black/5 hover:text-black">Approach</a>
          <a href="#week" className="rounded-full px-4 py-1.5 text-sm font-medium text-black/70 transition hover:bg-black/5 hover:text-black">Schedule</a>
          <a href="#faq" className="rounded-full px-4 py-1.5 text-sm font-medium text-black/70 transition hover:bg-black/5 hover:text-black">FAQ</a>
        </nav>
      </div>

      {/* HERO */}
      <MotionSection initial="hidden" animate="show" variants={stagger} className="pt-24 relative">
          {/* Section tint (very light so global blobs stay continuous) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-100/15 via-transparent to-emerald-100/15"
          />
        <Container>
          <MotionDiv variants={fadeUp} className="flex flex-wrap gap-2">
            <Badge>Weekly group runs</Badge>
            <Badge>Structured sessions</Badge>
            <Badge>Glasgow community</Badge>
            <WeatherWidget />
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
                className="h-28 w-auto opacity-100 sm:h-16 md:h-24 lg:h-28"
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
              className="w-full opacity-25 mix-blend-multiply"
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
          id="approach"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="pb-6 relative scroll-mt-36"
        >
          {/* Section tint */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-100/12 via-transparent to-emerald-100/12"
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
           <SectionDivider />
        </Container>
      </MotionSection>

      {/* THIS WEEK */}
      <MotionSection
          id="week"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="relative scroll-mt-36"
        >
          {/* Section tint */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-tr from-emerald-100/12 via-transparent to-sky-100/12"
          />
        <Container>
          <MotionDiv variants={fadeUp} className="grid gap-4 md:grid-cols-2">
            <div className="noise rounded-3xl border border-blue-100 bg-white p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-blue-700">This week in Glasgow</p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-black">Three simple pillars</h3>

              <NextRunCountdown />

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
           <SectionDivider />
        </Container>
      </MotionSection>

      {/* FAQ */}
      <MotionSection
          id="faq"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="relative scroll-mt-36"
        >
          {/* Section tint */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-sky-100/10 via-transparent to-emerald-100/10"
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