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

export default function HomePage() {
  return (
    <div>
      {/* HERO */}
      <Container>
        <MotionSection
          initial="hidden"
          animate="show"
          variants={stagger}
          className="pt-14"
        >
          <MotionDiv variants={fadeUp} className="flex flex-wrap gap-2">
            <Badge>Weekly group runs</Badge>
            <Badge>Structured sessions</Badge>
            <Badge>Glasgow community</Badge>
          </MotionDiv>

          <MotionDiv variants={fadeUp} className="mt-6">
            <h1 className="text-4xl font-semibold tracking-tight md:text-6xl">
              {site.tagline}
            </h1>
            <p className="mt-5 max-w-2xl text-white/70 md:text-lg">
              A modern running club built on structure and support — show up, follow the plan,
              and watch the progress stack up.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button href="/membership" variant="primary">
                Join the club
              </Button>
              <Button href="/runs" variant="secondary">
                View weekly runs
              </Button>
            </div>

            <div className="mt-10">
              <Stats />
            </div>
          </MotionDiv>

          {/* HERO PANEL */}
          <MotionDiv
            variants={fadeUp}
            className="noise mt-10 overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.03]"
          >
            <div className="grid gap-4 p-6 md:grid-cols-3 md:p-8">
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-white/60">Session types</p>
                <p className="mt-2 text-lg font-medium">
                  Track · Tempo · Long runs
                </p>
                <p className="mt-2 text-sm text-white/60">
                  Effort-based options so everyone trains together.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-white/60">Coached structure</p>
                <p className="mt-2 text-lg font-medium">
                  Warm-up → Work → Cooldown
                </p>
                <p className="mt-2 text-sm text-white/60">
                  No guesswork. Just show up and run.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-black/30 p-5">
                <p className="text-sm text-white/60">Community</p>
                <p className="mt-2 text-lg font-medium">
                  Support + accountability
                </p>
                <p className="mt-2 text-sm text-white/60">
                  Consistency feels easier when you’re not doing it alone.
                </p>
              </div>
            </div>
          </MotionDiv>
        </MotionSection>
      </Container>

      {/* MARQUEE */}
      <Container>
        <div className="py-10">
          <Marquee />
        </div>
      </Container>

      {/* WHAT YOU GET */}
      <Container>
        <MotionSection
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
          className="pb-6"
        >
          <MotionDiv variants={fadeUp}>
            <SectionHeading
              eyebrow="The Strive approach"
              title="A club that feels modern — and actually keeps you consistent"
              desc="Simple, repeatable sessions with a community that makes it easier to stick to the plan."
            />
          </MotionDiv>

          <div className="grid gap-4 md:grid-cols-3">
            <MotionDiv variants={fadeUp}>
              <Card
                title="Weekly structure"
                body="A clear schedule you can build your week around."
              />
            </MotionDiv>
            <MotionDiv variants={fadeUp}>
              <Card
                title="Progress you can feel"
                body="Sessions designed to improve fitness without frying you."
              />
            </MotionDiv>
            <MotionDiv variants={fadeUp}>
              <Card
                title="Good vibes, no ego"
                body="Supportive culture — we train hard and enjoy it."
              />
            </MotionDiv>
          </div>
        </MotionSection>
      </Container>

      {/* THIS WEEK */}
      <Container>
        <MotionSection
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="py-14"
        >
          <MotionDiv variants={fadeUp} className="grid gap-4 md:grid-cols-2">
            <div className="noise rounded-3xl border border-white/10 bg-white/[0.03] p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                This week in Glasgow
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Three simple pillars
              </h3>

              <ul className="mt-5 space-y-3 text-white/75">
                <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  <span>Mon · Easy social</span>
                  <span className="text-white/55">45 mins</span>
                </li>
                <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  <span>Wed · Session night</span>
                  <span className="text-white/55">Intervals</span>
                </li>
                <li className="flex items-center justify-between rounded-2xl border border-white/10 bg-black/30 px-4 py-3">
                  <span>Sat · Long run + coffee</span>
                  <span className="text-white/55">Social</span>
                </li>
              </ul>

              <p className="mt-4 text-sm text-white/60">
                Later we can wire this to a Google Sheet / CMS so you can update it in 30 seconds.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-white/10 to-white/[0.03] p-7">
              <p className="text-xs uppercase tracking-[0.18em] text-white/50">
                Join
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                Ready to start?
              </h3>
              <p className="mt-4 text-white/70">
                Pick a plan, get the schedule, and turn up. We’ll do the rest.
              </p>

              <div className="mt-7 grid gap-3">
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="text-sm font-medium">Club Membership</p>
                  <p className="mt-1 text-sm text-white/60">
                    Group sessions + community access.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-black/25 p-4">
                  <p className="text-sm font-medium">Coached Plan</p>
                  <p className="mt-1 text-sm text-white/60">
                    Extra structure and accountability.
                  </p>
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/membership" variant="primary">
                  See membership
                </Button>
                <Button href="/contact" variant="secondary">
                  Ask a question
                </Button>
              </div>
            </div>
          </MotionDiv>
        </MotionSection>
      </Container>

      {/* FAQ */}
      <Container>
        <MotionSection
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={stagger}
          className="pb-20"
        >
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
        </MotionSection>
      </Container>
    </div>
  );
}
