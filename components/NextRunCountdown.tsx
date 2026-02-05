"use client";

import { useEffect, useState } from "react";

export default function NextRunCountdown() {
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      
      // Target run times: Mon 18:30, Wed 18:30, Sat 09:00
      const targets = [
        { day: 1, hour: 18, min: 30 }, // Mon
        { day: 3, hour: 18, min: 30 }, // Wed
        { day: 6, hour: 9, min: 0 },   // Sat
      ];

      let nextRun = null;

      // Check next 8 days to ensure we find a slot
      for (let i = 0; i < 8; i++) {
        const checkDate = new Date(now);
        checkDate.setDate(now.getDate() + i);
        const dayOfWeek = checkDate.getDay();

        const potentialTarget = targets.find((t) => t.day === dayOfWeek);

        if (potentialTarget) {
          const targetDate = new Date(checkDate);
          targetDate.setHours(potentialTarget.hour, potentialTarget.min, 0, 0);

          if (targetDate > now) {
            nextRun = targetDate;
            break;
          }
        }
      }

      if (!nextRun) return;

      const diff = nextRun.getTime() - now.getTime();
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

      if (days > 0) {
        setTimeLeft(`${days}d ${hours}h`);
      } else if (hours > 0) {
        setTimeLeft(`${hours}h ${minutes}m`);
      } else {
        setTimeLeft(`${minutes}m`);
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 30000); // Update every 30s
    return () => clearInterval(timer);
  }, []);

  if (!timeLeft) return null;

  return (
    <div className="mt-4 inline-flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
      </span>
      Next run in: {timeLeft}
    </div>
  );
}
