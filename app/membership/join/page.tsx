import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import JoinForm from "@/components/JoinForm";

export const metadata: Metadata = {
  title: "Join the club",
  description: "Sign up to Strive Running Club Glasgow.",
};

export default function JoinPage() {
  return (
    <div className="flex-1 flex flex-col mt-16 md:mt-20 pb-24">
      <Container>
        <div className="mx-auto w-full max-w-xl text-center">
          <SectionHeading
            eyebrow="Membership"
            title="Join the club"
            desc="Tell us a bit about yourself and we'll be in touch with next steps."
          />
          <JoinForm />
        </div>
      </Container>
    </div>
  );
}
