import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import Button from "@/components/Button";

export default function MembershipPage() {
  return (
    <div className="pb-24">
      <Container>
        <SectionHeading
          eyebrow="Membership"
          title="Join Strive — membership and pricing"
          desc="Flexible options: pay-as-you-go or monthly membership to access coached sessions and community benefits."
        />

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-blue-100 p-6">
            <h4 className="text-lg font-semibold">Pay-as-you-go</h4>
            <p className="mt-2 text-slate-700">Drop-in for individual sessions. Ideal for trying us out.</p>
            <ul className="mt-3 list-disc list-inside text-slate-700">
              <li>Single session booking</li>
              <li>Pay per session</li>
            </ul>
            <div className="mt-4">
              <Button href="/contact" variant="secondary">Book a session</Button>
            </div>
          </div>

          <div className="rounded-2xl border border-blue-100 p-6">
            <h4 className="text-lg font-semibold">Monthly membership</h4>
            <p className="mt-2 text-slate-700">Unlimited access to regular coached sessions, priority booking and community events.</p>
            <ul className="mt-3 list-disc list-inside text-slate-700">
              <li>Access to group sessions</li>
              <li>Member Slack/FB group</li>
              <li>Discounts on events</li>
            </ul>
            <div className="mt-4">
              <Button href="/membership/checkout" variant="primary">Join the club</Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
