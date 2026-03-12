"use client";

import { useRef, useState, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export default function Card({
  title,
  body,
  className,
}: {
  title: string;
  body: string;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / rect.width - 0.5;
    const yPct = mouseY / rect.height - 0.5;

    setRotation({ x: yPct * 10, y: xPct * 10 });
  };

  const handleMouseLeave = () => setRotation({ x: 0, y: 0 });

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateX: rotation.x, rotateY: rotation.y }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={cn(
          "rounded-3xl border border-blue-100 bg-white/90 p-6 shadow-[0_20px_44px_rgba(14,59,122,0.08)]",
          "transition duration-200 hover:-translate-y-0.5 hover:bg-white",
          className
        )}
      >
        <div aria-hidden="true" className="absolute inset-x-0 top-0 h-16 rounded-t-3xl bg-gradient-to-b from-cyan-50/90 to-transparent" />
        <div style={{ transform: "translateZ(20px)" }}>
          <p className="text-sm font-medium text-blue-700">{title}</p>
          <p className="mt-2 text-lg font-medium text-slate-900">{body}</p>
        </div>
      </motion.div>
    </div>
  );
}