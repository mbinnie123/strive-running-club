import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Strive Running Club Glasgow.",
};

export default function ContactPage() {
  return (
    <div className="flex-1 flex flex-col mt-16 md:mt-20 pb-24">
      <Container>
        <div className="mx-auto w-full max-w-xl text-center">
          <SectionHeading
            eyebrow="Contact"
            title="Get in touch"
            desc="Questions about runs or membership? Send us a message."
          />
          <ContactForm />
        </div>
      </Container>
    </div>
  );
}
