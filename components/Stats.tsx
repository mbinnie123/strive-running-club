"use client";

import { useRef, useEffect } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

function AnimatedNumber({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, { stiffness: 50, damping: 20 });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  // Check if value starts with a number (e.g. "3+")
  const match = value.match(/^(\d+)(.*)$/);
  const number = match ? parseInt(match[1]) : 0;
  const suffix = match ? match[2] : "";
  const isNumber = match !== null;

  useEffect(() => {
    if (isInView && isNumber) {
      motionValue.set(number);
    }
  }, [isInView, number, motionValue, isNumber]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current && isNumber) {
        ref.current.textContent = Math.round(latest).toString() + suffix;
      }
    });
  }, [springValue, suffix, isNumber]);

  if (!isNumber) {
    return <span>{value}</span>;
  }

  return <span ref={ref}>{0 + suffix}</span>;
}

export default function Stats() {
  const stats = [
    { k: "Sessions weekly", v: "3+" },
    { k: "All levels", v: "Beginner → Advanced" },
    { k: "Structure", v: "Tempo · Track · Long" },
  ];

  return (
    <div className="grid gap-3 rounded-3xl border border-black/10 bg-black/[0.03] p-5 md:grid-cols-3">
      {stats.map((s) => (
        <div key={s.k} className="rounded-2xl border border-black/10 bg-black/5 p-4">
          <p className="text-xs text-black/60">{s.k}</p>
          <p className="mt-1 text-xl font-semibold text-black">
            <AnimatedNumber value={s.v} />
          </p>
        </div>
      ))}
    </div>
  );
}