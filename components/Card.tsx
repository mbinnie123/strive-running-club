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
          "rounded-3xl border border-black/10 bg-black/[0.04] p-6 shadow-[0_1px_0_rgba(0,0,0,0.06)]",
          "transition hover:bg-black/[0.06]",
          className
        )}
      >
        <div style={{ transform: "translateZ(20px)" }}>
          <p className="text-sm text-black/60">{title}</p>
          <p className="mt-2 text-lg font-medium text-black">{body}</p>
        </div>
      </motion.div>
    </div>
  );
}