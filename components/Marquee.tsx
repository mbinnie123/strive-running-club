"use client";

import { MotionDiv } from "@/components/Motion";

const items = ["Consistency", "Community", "Coaching", "Confidence", "Performance", "Glasgow"];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white/80 shadow-[0_14px_32px_rgba(14,59,122,0.07)]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-blue-50 via-transparent to-blue-50 opacity-95" />
      <MotionDiv
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="flex w-[200%] gap-6 py-4"
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-blue-100 bg-white/90 px-4 py-2 text-sm font-medium text-slate-700"
          >
            {t}
          </span>
        ))}
      </MotionDiv>
    </div>
  );
}