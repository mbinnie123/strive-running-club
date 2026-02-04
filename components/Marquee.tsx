"use client";

import { MotionDiv } from "@/components/Motion";

const items = ["Consistency", "Community", "Coaching", "Confidence", "Performance", "Glasgow"];

export default function Marquee() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-black/[0.03]">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white via-transparent to-white opacity-80" />
      <MotionDiv
        initial={{ x: 0 }}
        animate={{ x: "-50%" }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        className="flex w-[200%] gap-6 py-4"
      >
        {[...items, ...items, ...items, ...items].map((t, i) => (
          <span
            key={i}
            className="whitespace-nowrap rounded-full border border-black/10 bg-black/5 px-4 py-2 text-sm text-black/70"
          >
            {t}
          </span>
        ))}
      </MotionDiv>
    </div>
  );
}