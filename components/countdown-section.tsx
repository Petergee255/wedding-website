"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const WEDDING_DATE = new Date("2027-06-18T00:00:00");

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center min-w-[60px] md:min-w-[100px]">
      <motion.span
        key={value}
        initial={{ opacity: 0.8, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="text-[49px] sm:text-[55px] md:text-[65px] lg:text-[70px]  font-serif-custom  font-bold text-foreground tabular-nums"
      >
        {value.toString().padStart(2, "0")}
      </motion.span>
      <span className="text-[10px] font-sans-custom md:text-[13px] tracking-[0.25em] text-muted-foreground uppercase mt-2">
        {label}
      </span>
    </div>
  );
}

export function CountdownSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const timeLeft = useCountdown(WEDDING_DATE);

  const titleOpacity = useTransform(scrollYProgress, [0, 0.15], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.15], [40, 0]);

  const dateOpacity = useTransform(scrollYProgress, [0.08, 0.25], [0, 1]);
  const dateY = useTransform(scrollYProgress, [0.08, 0.25], [40, 0]);

  const countdownOpacity = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const countdownY = useTransform(scrollYProgress, [0.15, 0.35], [40, 0]);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 pb-8 lg:pb-13 bg-[#fcf7ed]"
    >
      {/* Join us text */}
      <h2
        className="font-serif-custom font-bold text-4xl md:text-5xl lg:text-6xl text-center text-foreground  mb-14 md:mb-18 lg:mb-20"
      >
        so please join us...
      </h2>

      {/* Date */}
      <motion.p
        className="font-serif-custom text-[80px] sm:text-[90px] md:text-[100px] lg:text-[140px]  text-center text-foreground mb-16 md:mb-20 lg:mb-22"
        style={{ opacity: dateOpacity, y: dateY }}
      >
        june 18, 2027
      </motion.p>

      {/* Countdown */}
      <motion.div
        className="flex items-center gap-2 md:gap-4 lg:gap-6"
        style={{ opacity: countdownOpacity, y: countdownY }}
      >
        <CountdownUnit value={timeLeft.days} label="Days" />
        <span className="text-3xl md:text-5xl lg:text-6xl text-muted-foreground/50 font-serif self-start mt-2 md:mt-4">
          :
        </span>
        <CountdownUnit value={timeLeft.hours} label="Hours" />
        <span className="text-3xl md:text-5xl lg:text-6xl text-muted-foreground/50 font-serif self-start mt-2 md:mt-4">
          :
        </span>
        <CountdownUnit value={timeLeft.minutes} label="Minutes" />
        <span className="text-3xl md:text-5xl lg:text-6xl text-muted-foreground/50 font-serif self-start mt-2 md:mt-4">
          :
        </span>
        <CountdownUnit value={timeLeft.seconds} label="Seconds" />
      </motion.div>
    </section>
  );
}
