import { NextResponse } from "next/server";
import { z } from "zod";
import { getSupabase } from "@/lib/server/supabase";
import { escapeHtml, sendMail } from "@/lib/server/mail";
import { membershipTypes } from "@/lib/membership-types";

const schema = z.object({
  type: z.enum(membershipTypes.map((t) => t.id) as [string, ...string[]]),
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

  const label = membershipTypes.find((t) => t.id === d.type)!.label;

  const db = getSupabase();
  let saved = false;
  if (db) {
    const { error } = await db.from("membership_signups").insert({
      type: d.type,
      name: d.name,
      email: d.email,
      phone: d.phone || null,
      notes: d.notes || null,
    });
    if (error) console.error("signup insert failed", error);
    else saved = true;
  }

  const sent = await sendMail({
    subject: `New membership sign-up: ${d.name} (${label})`,
    replyTo: d.email,
    html: `<p><strong>Type:</strong> ${escapeHtml(label)}</p>
<p><strong>Name:</strong> ${escapeHtml(d.name)}</p>
<p><strong>Email:</strong> ${escapeHtml(d.email)}</p>
<p><strong>Phone:</strong> ${escapeHtml(d.phone || "-")}</p>
<p><strong>Notes:</strong> ${escapeHtml(d.notes || "-")}</p>`,
  });

  if (!saved && !sent) {
    return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
  }

  await sendMail({
    to: [d.email],
    subject: "Welcome to Strive Running Club",
    html: `<p>Hi ${escapeHtml(d.name)},</p>
<p>Thanks for signing up for <strong>${escapeHtml(label)}</strong>. We'll be in touch shortly with next steps.</p>
<p>Strive Running Club Glasgow</p>`,
  });

  return NextResponse.json({ ok: true });
}
