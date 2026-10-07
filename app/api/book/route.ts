import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/server/supabase";
import { sendMail } from "@/lib/server/mail";
import { emailLayout } from "@/lib/server/email-template";
import { site } from "@/lib/site";
import { bookableSessions } from "@/lib/booking-sessions";

const schema = z.object({
  sessionId: z.string(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(30).optional(),
  notes: z.string().trim().max(1000).optional(),
  website: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  }
  const d = parsed.data;
  if (d.website) return NextResponse.json({ ok: true }); // bot

  const session = bookableSessions.find((s) => s.id === d.sessionId);
  if (!session) return NextResponse.json({ error: "Unknown session." }, { status: 400 });

  const date = new Date(`${d.date}T00:00:00Z`);
  const today = new Date(new Date().toISOString().slice(0, 10) + "T00:00:00Z");
  if (Number.isNaN(date.getTime()) || date < today) {
    return NextResponse.json({ error: "Please choose a future date." }, { status: 400 });
  }

  const db = getSupabase();
  if (!db) {
    return NextResponse.json({ error: "Booking is not available right now." }, { status: 503 });
  }

  const { count, error: countErr } = await db
    .from("bookings")
    .select("id", { count: "exact", head: true })
    .eq("session_id", session.id)
    .eq("session_date", d.date);
  if (countErr) {
    console.error("booking count failed", countErr);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
  if ((count ?? 0) >= session.capacity) {
    return NextResponse.json({ error: "Sorry, this session is full." }, { status: 409 });
  }

  const { error } = await db.from("bookings").insert({
    session_id: session.id,
    session_date: d.date,
    name: d.name,
    email: d.email,
    phone: d.phone || null,
    notes: d.notes || null,
  });
  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ error: "You're already booked on this session." }, { status: 409 });
    }
    console.error("booking insert failed", error);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  const when = `${session.title} - ${session.time}, ${d.date} (${session.location})`;
  const rows: [string, string][] = [
    ["Session", session.title],
    ["Date", d.date],
    ["Time", session.time],
    ["Location", session.location],
  ];
  await Promise.all([
    sendMail({
      subject: `New booking: ${session.title} on ${d.date}`,
      replyTo: d.email,
      html: emailLayout({
        heading: "New session booking",
        rows: [
          ...rows,
          ["Name", d.name],
          ["Email", d.email],
          ["Phone", d.phone || "-"],
          ["Notes", d.notes || "-"],
        ],
      }),
    }),
    sendMail({
      to: [d.email],
      replyTo: "matthewdouglaspt@outlook.com",
      subject: "Your Strive Running Club booking",
      html: emailLayout({
        heading: `You're booked, ${d.name}!`,
        intro: `We've reserved your place on ${session.title}. See you there!`,
        rows,
        nextSteps: [
          "Arrive 10 minutes early to meet the coach.",
          "Bring water and wear suitable running kit.",
          "Can't make it? Just reply to this email and let us know.",
        ],
        button: { label: "View all runs", href: `${site.url}/runs` },
      }),
    }),
  ]);

  return NextResponse.json({ ok: true });
}
