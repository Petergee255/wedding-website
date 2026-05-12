"use client";

import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

const text =
  "The vision for the night is simple: all of our most beloved people in one place that happens to have a gorgeous garden, flowing drinks, and an unforgettable dance floor.";
const words = text.split(" ");

interface WordProps {
  word: string;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
}

function AnimatedWord({ word, index, total, scrollYProgress }: WordProps) {
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
      className="whitespace-nowrap mr-[0.25em]"
    >
      {word}
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
          {words.map((word, i) => (
            <AnimatedWord
              key={i}
              word={word}
              index={i}
              total={words.length}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </h2>
      </div>
    </section>
  );
}
