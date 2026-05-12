"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export function VenueSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const imageOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const imageY = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  const titleOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0.15, 0.35], [40, 0]);

  const addressOpacity = useTransform(scrollYProgress, [0.25, 0.45], [0, 1]);
  const addressY = useTransform(scrollYProgress, [0.25, 0.45], [40, 0]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 py-24 lg:py-32 bg-[#fcf7ed]"
    >
      {/* Venue Image */}
      <motion.div
        className="w-full max-w-5xl mb-12 lg:mb-16"
        style={{ opacity: imageOpacity, y: imageY }}
      >
        <div className="relative aspect-[4/3] md:aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src="/venue1.png"
            alt="Cecil Green Park House"
            fill
            className="object-cover"
            priority
          />
        </div>
      </motion.div>

      {/* Venue Name */}
      <motion.h2
        className="font-serif-custom text-5xl text-center tracking-wider text-foreground mb-6 "
        style={{ opacity: titleOpacity, y: titleY }}
      >
        Crescent Grove Manor
      </motion.h2>

      {/* Venue Address */}
      <motion.p
        className="font-sans-custom text-lg text-center text-muted-foreground tracking-wide"
        style={{ opacity: addressOpacity, y: addressY }}
      >
       6251 CRESCENT GROVE DR, VANCOUVER, BC
      </motion.p>

      {/* RSVP Button */}
      <motion.div
        className="flex flex-col items-center mt-12 lg:mt-23"
        style={{ opacity: addressOpacity, y: addressY }}
      >
        <motion.button
          className="bg-[#8B5E3C] text-white font-sans-custom text-lg px-12 py-2 rounded-full shadow-lg mb-6"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          SUBMIT RSVP
        </motion.button>
        <motion.p className="font-sans-custom text-base text-muted-foreground tracking-widest">
          RSVP BY AUGUST 20, 2027
        </motion.p>
      </motion.div>
    </section>
  );
}
