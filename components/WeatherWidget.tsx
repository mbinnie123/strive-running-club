// /Users/marcusbinnie/strive-running-club/components/WeatherWidget.tsx
"use client";

import { useEffect, useState } from "react";

export default function WeatherWidget() {
  const [weather, setWeather] = useState<{ temp: number; code: number } | null>(null);

  useEffect(() => {
    // Glasgow coordinates: 55.8642° N, 4.2518° W
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=55.8642&longitude=-4.2518&current=temperature_2m,weather_code"
    )
      .then((res) => res.json())
      .then((data) => {
        if (data.current) {
          setWeather({
            temp: Math.round(data.current.temperature_2m),
            code: data.current.weather_code,
          });
        }
      })
      .catch(() => null); // Fail silently if API is down
  }, []);

  if (!weather) return null;

  // Simple WMO code mapping
  const getIcon = (code: number) => {
    if (code <= 1) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "☁️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "❄️";
    return "🌧️";
  };

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/60 px-3 py-1 text-xs font-medium text-black/80 backdrop-blur-sm">
      <span>{getIcon(weather.code)}</span>
      <span>{weather.temp}°C in Glasgow</span>
    </span>
  );
}
