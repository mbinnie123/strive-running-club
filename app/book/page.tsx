import type { Metadata } from "next";
import Container from "@/components/Container";
import SectionHeading from "@/components/SectionHeading";
import BookingForm from "@/components/BookingForm";

export const metadata: Metadata = {
  title: "Book a session",
  description: "Book your place on a Strive Running Club session in Glasgow.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ session?: string }>;
}) {
  const { session } = await searchParams;
  return (
    <div className="flex-1 flex flex-col mt-16 md:mt-20 pb-24">
      <Container>
        <div className="mx-auto w-full max-w-xl text-center">
          <SectionHeading
            eyebrow="Book"
            title="Book your place"
            desc="Pick a session and date and we'll confirm by email."
          />
          <BookingForm initialSession={session} />
        </div>
      </Container>
    </div>
  );
}
