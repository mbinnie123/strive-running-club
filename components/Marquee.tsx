"use client";

import { MotionDiv } from "@/components/Motion";

const items = ["Consistency", "Community", "Coaching", "Confidence", "Performance", "Glasgow"];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black via-transparent to-black opacity-80" />
      <MotionDiv
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="flex w-[200%] gap-6 py-4"
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70"
          >
            {t}
          </span>
        ))}
      </MotionDiv>
    </div>
  );
}