"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "Do I need to be fast to join?",
    a: "Not at all. Sessions are coached with effort-based pacing and options for different abilities.",
  },
  {
    q: "Where do runs start?",
    a: "Glasgow meet-ups vary by session. We’ll publish locations on the Runs page and send them to members.",
  },
  {
    q: "Is coaching included?",
    a: "Group session coaching is included. 1–1 coaching can be added depending on your plan.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="space-y-3 min-h-[220px] mb-16">
      {faqs.map((f, idx) => {
        const isOpen = open === idx;
        return (
          <button
            key={f.q}
            onClick={() => setOpen(isOpen ? null : idx)}
            className={cn(
              "w-full rounded-3xl border border-blue-100 bg-white/85 text-left shadow-[0_10px_24px_rgba(14,59,122,0.06)] transition",
              "hover:-translate-y-0.5 hover:bg-white"
            )}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-5">
              <p className="font-medium text-slate-900">{f.q}</p>
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-700 transition",
                  isOpen && "rotate-45"
                )}
              >
                +
              </span>
            </div>
            <div
              className={cn(
                "grid transform-gpu transition-[grid-template-rows,opacity] duration-300",
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden px-5">
                <p className="pb-5 text-sm text-slate-600">{f.a}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}