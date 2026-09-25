import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";
import MediaGallery from "@/components/MediaGallery";

export default function AboutPage() {
  return (
    <div className="pb-24">
      <Container>
        <SectionHeading
          eyebrow="About"
          title="About Strive Running Club"
          desc="Community-focused coached runs in Glasgow — beginners welcome, with structured sessions and support."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 p-6 bg-white">
            <h4 className="text-lg font-semibold">Who it's for</h4>
            <p className="mt-2 text-slate-700">Runners looking for structure, consistency and a friendly community. We run in effort groups so everyone is supported.</p>
          </div>

          <div className="rounded-2xl border border-blue-100 p-6 bg-white">
            <h4 className="text-lg font-semibold">Where we run</h4>
            <p className="mt-2 text-slate-700">Across Glasgow city centre, parks and tracks — meeting points are listed on the sessions page.</p>
          </div>

          <div className="rounded-2xl border border-blue-100 p-6 bg-white">
            <h4 className="text-lg font-semibold">How it works</h4>
            <p className="mt-2 text-slate-700">Book a session, arrive a little early, warm up with the group and follow the coach-led session. Optional online programming is provided for block bookings.</p>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-xl font-semibold">Community highlights</h3>
          <p className="mt-2 text-slate-700">Photos and videos from recent sessions.</p>
          <div className="mt-6">
            <MediaGallery />
          </div>
        </div>

        <div className="mt-10">
          <Button href="/membership" variant="primary">Join the club</Button>
          <Button href="/runs" variant="secondary" className="ml-3">See sessions</Button>
        </div>
      </Container>
    </div>
  );
}
