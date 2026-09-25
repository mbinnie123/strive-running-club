import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

export default function MembershipPage() {
  return (
    <div className="mt-16 md:mt-20 pb-24">
      <Container>
        <SectionHeading
          eyebrow="Membership"
          title="Join Strive — membership and pricing"
          desc="Flexible options: pay-as-you-go or monthly membership to access coached sessions and community benefits."
        />

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-blue-100 p-6 bg-white">
            <h4 className="text-lg font-semibold">Pay-as-you-go</h4>
            <p className="mt-2 text-slate-700">Drop-in for individual sessions. Ideal for trying us out.</p>
            <ul className="mt-3 list-disc list-inside text-slate-700">
              <li>Book per session</li>
              <li>No commitment</li>
            </ul>
            <div className="mt-4">
              <Button href="/sessions" variant="secondary">View sessions</Button>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 p-6 bg-white">
            <h4 className="text-lg font-semibold">Monthly membership</h4>
            <p className="mt-2 text-slate-700">Unlimited access to regular coached sessions, priority booking and community events.</p>
            <ul className="mt-3 list-disc list-inside text-slate-700">
              <li>Unlimited coached sessions</li>
              <li>Member chat group</li>
              <li>Priority event booking</li>
            </ul>
            <div className="mt-4">
              <Button href="/membership/checkout" variant="primary">Join the club</Button>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 p-6 bg-white">
            <h4 className="text-lg font-semibold">What's included</h4>
            <ul className="mt-3 list-disc list-inside text-slate-700">
              <li>Coach-led sessions</li>
              <li>Structured training plans</li>
              <li>Community socials & support</li>
            </ul>
            <div className="mt-4">
              <Button href="/contact" variant="secondary">Ask a question</Button>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold">Pricing</h3>
            <p className="mt-2 text-slate-700">
              Memberships start from a competitive monthly price — we offer discounts for students and NHS staff. Drop-in sessions are priced individually.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold">How to join</h3>
            <ol className="mt-2 list-decimal list-inside text-slate-700">
              <li>Choose membership or a drop-in</li>
              <li>Book a session on the sessions page</li>
              <li>Turn up 10 minutes early; meet the coach</li>
            </ol>
            <div className="mt-4">
              <Button href="/membership/checkout" variant="primary">Get started</Button>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h3 className="text-lg font-semibold">What happens after you book</h3>
          <p className="mt-2 text-slate-700">After booking a block or membership the coach will usually:</p>
          <ul className="mt-3 list-inside list-disc text-slate-700">
            <li>Send an invoice or request payment (many clients transfer payment ahead of sessions).</li>
            <li>Invite you to TrueCoach where your workouts, progress photos and calorie targets are shared.</li>
            <li>Ask for baseline info (weight, height, age) and request a weekly progress update.</li>
          </ul>
        </div>
      </Container>
    </div>
  );
}
