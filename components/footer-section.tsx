"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export function FooterSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#fcf7ed] m-6 rounded-3xl"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/footer (1).png"
          alt="J&P"
          fill
          className="object-cover"
          priority
        />
        {/* Overlay for better text readability if needed */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <div className="max-w-4xl mx-auto">
            <p className="font-serif-custom text-4xl md:text-6xl text-white mb-8 drop-shadow-lg">
              you're my favourite person to do anything with for the rest of my
              life
            </p>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/20 to-transparent" />
    </section>
  );
}
