"use client";

import { useState } from "react";
import { bookableSessions } from "@/lib/booking-sessions";

const input =
  "w-full rounded-xl border border-blue-100 bg-white px-4 py-3 text-sm text-slate-900 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-500/20";
const submit =
  "inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_34px_rgba(23,104,245,0.28)] transition hover:-translate-y-0.5 disabled:opacity-60";

export default function BookingForm({ initialSession }: { initialSession?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done">("idle");
  const [error, setError] = useState("");
  const today = new Date().toLocaleDateString("en-CA"); // YYYY-MM-DD, local

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    setError("");
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json.error || "Something went wrong.");
      form.reset();
      setStatus("done");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
      setStatus("idle");
    }
  }

  if (status === "done") {
    return (
      <div className="rounded-2xl border border-blue-100 bg-white p-6 text-center">
        <p className="text-lg font-semibold text-slate-900">You're booked!</p>
        <p className="mt-2 text-sm text-slate-600">A confirmation email is on its way.</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-2xl border border-blue-100 bg-white p-6 text-left">
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div>
        <label htmlFor="sessionId" className="mb-1 block text-sm font-medium text-slate-700">Session</label>
        <select id="sessionId" name="sessionId" required defaultValue={initialSession ?? ""} className={input}>
          <option value="" disabled>Choose a session</option>
          {bookableSessions.map((s) => (
            <option key={s.id} value={s.id}>
              {s.title} - {s.time} ({s.location})
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="date" className="mb-1 block text-sm font-medium text-slate-700">Date</label>
        <input id="date" name="date" type="date" required min={today} className={input} />
      </div>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-medium text-slate-700">Name</label>
        <input id="name" name="name" required maxLength={100} className={input} />
      </div>
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-slate-700">Email</label>
        <input id="email" name="email" type="email" required maxLength={200} className={input} />
      </div>
      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-medium text-slate-700">Phone (optional)</label>
        <input id="phone" name="phone" type="tel" maxLength={30} className={input} />
      </div>
      <div>
        <label htmlFor="notes" className="mb-1 block text-sm font-medium text-slate-700">Notes (optional)</label>
        <textarea id="notes" name="notes" rows={3} maxLength={1000} className={input} />
      </div>
      {error && <p className="text-sm text-red-600" role="alert">{error}</p>}
      <button type="submit" disabled={status === "sending"} className={submit}>
        {status === "sending" ? "Booking..." : "Book my place"}
      </button>
    </form>
  );
}
