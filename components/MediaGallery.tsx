"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";

const media = [
  { type: "image", src: "/instagram-media-1.jpg", alt: "Running club community" },
  { type: "image", src: "/instagram-media-2.jpg", alt: "Group run session" },
  { type: "video", src: "/instagram-media-3.mp4", alt: "Community run" },
  { type: "video", src: "/instagram-media-4.mp4", alt: "Training session" },
  { type: "video", src: "/instagram-media-5.mp4", alt: "Group activity" },
  { type: "image", src: "/instagram-media-6.jpg", alt: "Club members" },
  { type: "image", src: "/instagram-media-7.jpg", alt: "Running together" },
  { type: "image", src: "/instagram-media-8.jpg", alt: "Community moment" },
  { type: "image", src: "/instagram-media-9.jpg", alt: "Strive members" },
  { type: "image", src: "/instagram-media-10.jpg", alt: "Group training" },
  { type: "image", src: "/instagram-media-11.jpg", alt: "Running community" },
];

export default function MediaGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onKey = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setSelectedIndex(null);
  }, []);

  useEffect(() => {
    if (selectedIndex !== null) {
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    return;
  }, [selectedIndex, onKey]);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
  };

  return (
    <div className="w-full">
      {/* Gallery Grid */}
      <motion.div
        className="grid gap-2 md:gap-3"
        style={{
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.1 }}
      >
        {media.map((item, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            className="group relative overflow-hidden rounded-2xl border border-blue-100 cursor-pointer"
            onClick={() => setSelectedIndex(index)}
          >
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-sky-200 to-blue-200 opacity-0 group-hover:opacity-100 transition duration-300 z-10" />

            {/* Media */}
            <div className="relative overflow-hidden bg-slate-100 aspect-square">
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={item.alt}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
              ) : (
                <>
                  <video
                    src={item.src}
                    muted
                    playsInline
                    preload="metadata"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  {/* Play Icon for Videos */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 backdrop-blur-sm">
                      <svg
                        className="h-5 w-5 text-blue-600"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Lightbox Modal */}
      {selectedIndex !== null && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedIndex(null)}
        >
          <motion.div
            className="relative max-h-[90vh] max-w-4xl w-full flex items-center justify-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Media */}
            {media[selectedIndex].type === "image" ? (
              <img
                src={media[selectedIndex].src}
                alt={media[selectedIndex].alt}
                className="max-h-[80vh] w-full rounded-xl object-contain"
              />
            ) : (
              <div className="flex w-full items-center justify-center">
                {/* Portrait container: width derived from viewport height to enforce vertical box */}
                <div style={{ height: '80vh', width: '45vh' }} className="rounded-xl overflow-hidden bg-black">
                  <video
                    src={media[selectedIndex].src}
                    controls
                    autoPlay
                    className="h-full w-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* Close Button (visible inside modal) */}
            <button
              onClick={() => setSelectedIndex(null)}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition"
              aria-label="Close gallery"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
              </svg>
            </button>

            {/* Navigation */}
            <button
              onClick={() =>
                setSelectedIndex(selectedIndex === 0 ? media.length - 1 : selectedIndex - 1)
              }
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-300 transition"
              aria-label="Previous"
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" />
              </svg>
            </button>

            <button
              onClick={() =>
                setSelectedIndex(selectedIndex === media.length - 1 ? 0 : selectedIndex + 1)
              }
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-blue-300 transition"
              aria-label="Next"
            >
              <svg className="h-8 w-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12 8.59 16.59 10 18l6-6z" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
