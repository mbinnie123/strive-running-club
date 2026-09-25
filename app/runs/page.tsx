import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import SessionCard from "@/components/SessionCard";

export default function RunsPage() {
  return (
    <div className="mt-16 md:mt-20 pb-24">
      <Container>
        <div className="mx-auto w-full max-w-3xl text-center">
          <SectionHeading
          eyebrow="Runs"
          title="All sessions & runs"
          desc="Browse and book upcoming coached sessions and group runs." 
        />

        </div>

        <div className="mx-auto w-full max-w-3xl text-center">
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
      </Container>
    </div>
  );
}
