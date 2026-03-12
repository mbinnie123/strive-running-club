"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

export const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6 } },
};

export const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const MotionDiv = ({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) => (
  <motion.div className={`relative ${className ?? ""}`} {...props}>
    {children}
  </motion.div>
);

export const MotionSection = ({
  children,
  className,
  ...props
}: HTMLMotionProps<"section">) => (
  <motion.section className={`relative ${className ?? ""}`} {...props}>
    {children}
  </motion.section>
);