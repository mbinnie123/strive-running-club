import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import Card from "@/components/Card";
import SessionCard from "@/components/SessionCard";
import MediaGallery from "@/components/MediaGallery";

export default function RunningClubPage() {
  return (
    <div className="pb-24">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="Strive Running Club — Glasgow"
          desc="Community-focused coached runs for beginners and improvers. Structured sessions, friendly vibe, and clear progress plans."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <Card title="Who it's for" body="Runners who want structure, consistency and community — beginners welcome. We divide runners by effort groups so you train with similar-paced teammates." />
          <Card title="Where we run" body="Glasgow city centre, parks and local tracks. Meeting points vary by session — see the sessions page for exact locations and maps." />
          <Card title="How it works" body="Book a session, arrive a little early, warm up with the group and follow the coach-led session. We offer guidance for goal setting and progression." />
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-xl font-semibold">What to expect</h3>
            <ul className="mt-3 list-inside list-disc text-slate-700">
              <li>Structured warm-up, main set, and cooldown</li>
              <li>Effort-based groups so everyone trains safely together</li>
              <li>Coach feedback and progress tracking</li>
              <li>Post-run social meetups</li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold">Pricing & How to join</h3>
            <p className="mt-3 text-slate-700">We offer drop-in sessions, block bookings and monthly membership. Students and key workers may be eligible for discounts. To join, pick a plan and book sessions via the sessions page.</p>
            <div className="mt-4">
              <Button href="/membership" variant="primary">See membership & book</Button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold">Practical details (from Matthew)</h3>
          <ul className="mt-3 list-inside list-disc text-slate-700">
            <li>Typical session length is 40–60 minutes; many clients get a solid 40-minute workout when scheduling around calls.</li>
            <li>Free taster session often offered — then block bookings or membership packages are available.</li>
            <li>Meet: Axiom Building, Washington Street, G3 8AZ (coach usually meets clients outside and shows them in).</li>
            <li>After booking for a block, clients receive an invite to TrueCoach where programmes and weekly workouts are hosted.</li>
            <li>Recommended apps: Stridekick (social tracking), MyFitnessPal (calorie tracking) — coaches use these to monitor progress.</li>
            <li>Payments are often requested before the session or via an invoice for package bookings.</li>
          </ul>
        </div>

        <div className="mt-12">
          <h3 className="text-xl font-semibold">Community highlights</h3>
          <p className="mt-2 text-slate-700">Photos and videos from recent sessions.</p>
          <div className="mt-6">
            <MediaGallery />
          </div>
        </div>
      </Container>
    </div>
  );
}
