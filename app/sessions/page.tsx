import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import SessionCard from "@/components/SessionCard";

export default function SessionsPage() {
  return (
    <div className="pb-24">
      <Container>
        <SectionHeading
          eyebrow="Sessions"
          title="Current running sessions"
          desc="Bookable coached and group runs. Select a session to view details and book."
        />
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <SessionCard
            title="Monday · Easy Social"
            time="Mon 18:30"
            location="Kelvingrove Park"
            description="Easy paced social run. All paces welcome."
            price="Free / donation"
          />

          <SessionCard
            title="Wednesday · Track Intervals"
            time="Wed 19:00"
            location="Bellahouston Track"
            description="Structured intervals to build speed and fitness. Coach-led groups."
            price="£8 drop-in"
          />

          <SessionCard
            title="Saturday · Long Run"
            time="Sat 09:00"
            location="Pollok Park"
            description="Long run with paced groups; coffee meetup after."
            price="Membership"
          />

          <SessionCard
            title="Sunday · Recovery Run"
            time="Sun 09:30"
            location="Glasgow Green"
            description="Easy recovery run for members."
            price="Membership"
          />
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold">Booking & session notes</h3>
          <ul className="mt-3 list-inside list-disc text-slate-700">
            <li>Sessions are bookable — the coach prefers bookings rather than walk-ins so attendance is known ahead of time.</li>
            <li>Typical session length is 40–60 minutes; some sessions may finish early for coach availability.</li>
            <li>Meeting point for gym-based sessions: Axiom Building, Washington Street, G3 8AZ (coach meets outside).</li>
            <li>Block bookings include online programming via TrueCoach.</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
