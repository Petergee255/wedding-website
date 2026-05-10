"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const text =
  "The vision for the night is simple: all of our most beloved people in one place that happens to have a gorgeous garden, flowing drinks, and an unforgettable dance floor.";
const characters = text.split("");

interface CharProps {
  char: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function AnimatedChar({ char, index, total, scrollYProgress }: CharProps) {
  const scrollRange = 0.6;
  const startScroll = 0.1 + (index / total) * scrollRange * 0.6;
  const endScroll = startScroll + scrollRange * 0.4;

  const opacity = useTransform(
    scrollYProgress,
    [startScroll, endScroll],
    [0.08, 1],
  );

  // Subtle upward drift as character comes in
  const y = useTransform(scrollYProgress, [startScroll, endScroll], [6, 0]);

  // Blur clears as character reveals
  const filter = useTransform(
    scrollYProgress,
    [startScroll, endScroll],
    ["blur(4px)", "blur(0px)"],
  );

  return (
    <motion.span
      style={{ opacity, y, filter, display: "inline-block" }}
      className="whitespace-pre"
    >
      {char}
    </motion.span>
  );
}

export function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section
      ref={containerRef}
      className="min-h-[40vh] flex items-center justify-center px-6 bg-[#fcf7ed]"
    >
      <div className="text-center max-w-5xl max-w-auto">
        <h2 className="text-[55px] font-serif-custom md:text-[75px] lg:text-[90px] font-bold tracking-tighter leading-tight text-foreground">
          {characters.map((char, i) => (
            <AnimatedChar
              key={i}
              char={char}
              index={i}
              total={characters.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </h2>
      </div>
    </section>
  );
}
