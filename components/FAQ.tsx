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
    <div className="space-y-3 min-h-[220px] mb-16 [contain:layout_paint]">
      {faqs.map((f, idx) => {
        const isOpen = open === idx;
        return (
          <button
            key={f.q}
            onClick={() => setOpen(isOpen ? null : idx)}
            className={cn(
              "w-full rounded-3xl border border-white/10 bg-white/[0.03] text-left transition",
              "hover:bg-white/[0.05]"
            )}
          >
            <div className="flex items-center justify-between gap-4 px-5 py-5">
              <p className="font-medium text-white">{f.q}</p>
              <span
                className={cn(
                  "inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-black/30 text-white/70 transition",
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
                <p className="text-sm text-white/70">{f.a}</p>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}