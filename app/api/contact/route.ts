import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/server/supabase";
import { sendMail } from "@/lib/server/mail";
import { emailLayout } from "@/lib/server/email-template";
import { site } from "@/lib/site";

const schema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(200),
  message: z.string().trim().min(1).max(3000),
  website: z.string().optional(), // honeypot
});

export async function POST(req: Request) {
  const parsed = schema.safeParse(await req.json().catch(() => null));
  if (!parsed.success) {
    return NextResponse.json({ error: "Please check your details and try again." }, { status: 400 });
  }
  const { name, email, message, website } = parsed.data;
  if (website) return NextResponse.json({ ok: true }); // bot

  const db = getSupabase();
  let saved = false;
  if (db) {
    const { error } = await db.from("contact_messages").insert({ name, email, message });
    if (error) console.error("contact insert failed", error);
    else saved = true;
  }

  const sent = await sendMail({
    subject: `New contact message from ${name}`,
    replyTo: email,
    html: emailLayout({
      heading: "New contact message",
      rows: [
        ["Name", name],
        ["Email", email],
      ],
      message: { label: "Message", text: message },
      footer: "Reply to this email to respond directly to the sender.",
    }),
  });

  if (!saved && !sent) {
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }

  await sendMail({
    to: [email],
    replyTo: "marcus@promodesigns.co.uk",
    subject: "Thanks for contacting Strive Running Club",
    html: emailLayout({
      heading: `Thanks for getting in touch, ${name}!`,
      intro: "We've received your message and someone will be in touch soon.",
      message: { label: "Your message", text: message },
      nextSteps: [
        "We read every message and reply personally.",
        "Expect to hear back from us soon.",
        "In the meantime, have a look at our weekly runs.",
      ],
      button: { label: "See our runs", href: `${site.url}/runs` },
      footer: "Strive Running Club Glasgow · striverunningclubglasgow.co.uk",
    }),
  });

  return NextResponse.json({ ok: true });
}
