import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import SessionCard from "@/components/SessionCard";

const sessions = [
  { title: "Monday · Easy Social", time: "Mon 18:30", location: "Kelvingrove Park", description: "Easy paced social run. All welcome.", price: "Free / donation" },
  { title: "Wednesday · Track Intervals", time: "Wed 19:00", location: "Bellahouston Track", description: "Structured intervals for speed and fitness.", price: "£8 drop-in" },
  { title: "Saturday · Long Run", time: "Sat 09:00", location: "Pollok Park", description: "Long run with paced groups and coffee after.", price: "Membership" },
];

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
          {sessions.map((s) => (
            <SessionCard
              key={s.title}
              title={s.title}
              time={s.time}
              location={s.location}
              description={s.description}
              price={s.price}
            />
          ))}
        </div>
      </Container>
    </div>
  );
}
