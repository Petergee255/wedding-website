"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // ── Detach state: once scroll crosses 0.68, float the nav outside ──
  const [navDetached, setNavDetached] = useState(false);

  const isNavFloating = useTransform(scrollYProgress, (v) => v >= 0.68);

  useEffect(() => {
    return isNavFloating.on("change", (v) => {
      setNavDetached(v as boolean);
    });
  }, [isNavFloating]);

  // Center hero image
  const heroWidth = useTransform(scrollYProgress, [0, 0.68], ["100%", "45%"]);
  const heroRadius = useTransform(scrollYProgress, [0, 0.4], [24, 24]);
  const heroMarginTop = useTransform(scrollYProgress, [0, 0.6], [0, 20]);

  // Side images
  const leftTopX = useTransform(scrollYProgress, [0.05, 0.55], [-400, 0]);
  const leftTopY = useTransform(scrollYProgress, [0.05, 0.55], [300, 0]);
  const leftBottomX = useTransform(scrollYProgress, [0.1, 0.6], [-450, 0]);
  const leftBottomY = useTransform(scrollYProgress, [0.1, 0.6], [450, 0]);
  const rightTopX = useTransform(scrollYProgress, [0.05, 0.55], [450, 0]);
  const rightTopY = useTransform(scrollYProgress, [0.05, 0.55], [300, 0]);
  const rightBottomX = useTransform(scrollYProgress, [0.1, 0.6], [450, 0]);
  const rightBottomY = useTransform(scrollYProgress, [0.1, 0.6], [450, 0]);

  // Names/overlay fade
  const namesOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const namesScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);
  const namesVisibility = useTransform(scrollYProgress, (v) =>
    v > 0.2 ? "hidden" : "visible",
  );

  // ── Navbar animated styles (only used while NOT detached) ──
  const navPaddingX = useTransform(scrollYProgress, [0, 0.68], [24, 20]);
  const navPaddingY = useTransform(scrollYProgress, [0, 0.68], [20, 10]);
  const navRadius = useTransform(scrollYProgress, [0.1, 0.68], [0, 999]);
  const navBg = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.55],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.2)", "rgba(255,255,255,1)"],
  );
  const navBlur = useTransform(
    scrollYProgress,
    [0.15, 0.3, 0.55],
    ["blur(0px)", "blur(8px)", "blur(0px)"],
  );
  const navShadow = useTransform(
    scrollYProgress,
    [0.15, 0.55],
    ["0px 0px 0px rgba(0,0,0,0)", "0px 4px 24px rgba(0,0,0,0.12)"],
  );
  const navTextColor = useTransform(
    scrollYProgress,
    [0.15, 0.55],
    ["rgba(255,255,255,1)", "rgba(0,0,0,1)"],
  );
  const rsvpBorder = useTransform(
    scrollYProgress,
    [0.15, 0.55],
    ["1px solid rgba(255,255,255,1)", "1px solid rgba(0,0,0,0)"],
  );
  const navMarginTop = useTransform(scrollYProgress, [0, 0.68], [0, 8]);
  const navMarginX = useTransform(scrollYProgress, [0, 0.68], [0, 12]);

  const sideImages = {
    leftTop: "/Tems.jfif",
    leftBottom: "/sem.jfif",
    rightTop: "/d6.jfif",
    rightBottom: "/mama.jfif",
    center: "/dave.jfif",
  };

  const navLinks = ["Travel Logistics", "Registry", "FAQ"];

  return (
    <section ref={containerRef} className="relative min-h-[550vh] mb-30">
      {/* ── FIXED pill navbar — appears only after hero animation completes ── */}
      {navDetached && (
        <div className="fixed top-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
          <nav
            className="pointer-events-auto flex items-center justify-between gap-6 lg:gap-10
                       bg-white rounded-full shadow-[0px_4px_24px_rgba(0,0,0,0.12)]
                       px-5 py-2.5 transition-all"
          >
            {/* Logo */}
            <span className="font-sans-custom text-xl tracking-tight text-black">
              D&amp;T
            </span>

            {/* Nav links */}
            <div className="flex items-center gap-6 lg:gap-10">
              {navLinks.map((item) => (
                <a
                  key={item}
                  href="#"
                  className="font-sans-custom text-base font-medium text-black whitespace-nowrap
                             hover:opacity-60 transition-opacity"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* RSVP Button */}
            <button
              className="font-sans-custom px-5 py-1 rounded-full text-base font-medium
                         bg-black text-white whitespace-nowrap hover:bg-neutral-800
                         transition-colors"
            >
              Submit RSVP
            </button>
          </nav>
        </div>
      )}

      <div className="sticky top-0 h-screen overflow-hidden bg-[#fcf7ed]">
        {/* ── BENTO GRID ── */}
        <div className="relative w-full h-full flex items-start justify-center px-2 pt-5">
          {/* LEFT COLUMN */}
          <div className="absolute left-4 lg:left-12 top-2 flex flex-col items-end gap-3 z-30">
            <motion.div
              className="relative w-[140px] h-[120px] md:w-[180px] md:h-[160px] lg:w-[220px] lg:h-[200px] xl:w-[290px] xl:h-[270px] rounded-3xl overflow-hidden shadow-xl"
              style={{ x: leftTopX, y: leftTopY }}
            >
              <Image
                src={sideImages.leftTop}
                alt="Beach cliff at sunset"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              className="relative w-[100px] h-[100px] md:w-[140px] md:h-[140px] lg:w-[180px] lg:h-[180px] xl:w-[220px] xl:h-[150px] rounded-3xl overflow-hidden shadow-xl"
              style={{ x: leftBottomX, y: leftBottomY }}
            >
              <Image
                src={sideImages.leftBottom}
                alt="Couple dancing at beach"
                fill
                className="object-cover grayscale"
              />
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="absolute right-4 lg:right-12 top-37 flex flex-col gap-2 z-30 items-start">
            <motion.div
              className="relative w-[140px] h-[120px] md:w-[180px] md:h-[160px] lg:w-[220px] lg:h-[200px] xl:w-[220px] xl:h-[150px] rounded-3xl overflow-hidden shadow-xl"
              style={{ x: rightTopX, y: rightTopY }}
            >
              <Image
                src={sideImages.rightTop}
                alt="Cliffs and ocean"
                fill
                className="object-cover"
              />
            </motion.div>

            <motion.div
              className="relative w-[120px] h-[140px] md:w-[160px] md:h-[200px] lg:w-[200px] lg:h-[240px] xl:w-[290px] xl:h-[270px] rounded-3xl overflow-hidden shadow-xl"
              style={{ x: rightBottomX, y: rightBottomY }}
            >
              <Image
                src={sideImages.rightBottom}
                alt="Hiking feet on terrain"
                fill
                className="object-cover"
              />
            </motion.div>
          </div>

          {/* CENTER - Main Hero Image with navbar INSIDE */}
          <motion.div
            className="relative z-10 h-[92vh] overflow-hidden"
            style={{
              width: heroWidth,
              borderRadius: heroRadius,
              marginTop: heroMarginTop,
            }}
          >
            <Image
              src={sideImages.center}
              alt="Jim & Pam proposal in mountains"
              fill
              className="object-cover"
              priority
            />

            {/* ── ANIMATED navbar inside hero (hidden once detached) ── */}
            {!navDetached && (
              <motion.nav
                className={`flex items-center justify-between ${navDetached ? "fixed top-0 left-0 right-0 z-50" : "absolute top-0 left-0 right-0 z-20"}`}
                style={{
                  paddingLeft: navDetached ? 24 : navPaddingX,
                  paddingRight: navDetached ? 24 : navPaddingX,
                  paddingTop: navDetached ? 16 : navPaddingY,
                  paddingBottom: navDetached ? 16 : navPaddingY,
                  borderRadius: navDetached ? 999 : navRadius,
                  backgroundColor: navDetached ? "rgba(255,255,255,1)" : navBg,
                  backdropFilter: navDetached ? "blur(0px)" : navBlur,
                  boxShadow: navDetached
                    ? "0px 4px 24px rgba(0,0,0,0.12)"
                    : navShadow,
                  margin: navDetached ? "16px auto" : navMarginTop,
                  marginLeft: navDetached ? "auto" : navMarginX,
                  marginRight: navDetached ? "auto" : navMarginX,
                  maxWidth: navDetached ? "1200px" : "none",
                }}
              >
                {/* Logo */}
                <motion.span
                  className="font-sans-custom text-3xl tracking-tight"
                  style={{ color: navTextColor }}
                >
                  D&amp;T
                </motion.span>

                {/* Nav links */}
                <div className="flex items-center gap-6 lg:gap-10">
                  {navLinks.map((item) => (
                    <motion.a
                      key={item}
                      href="#"
                      className="font-sans-custom text-base font-medium whitespace-nowrap"
                      style={{ color: navTextColor }}
                    >
                      {item}
                    </motion.a>
                  ))}
                </div>

                {/* RSVP Button */}
                <motion.button
                  className="font-sans-custom px-5 py-2 rounded-full text-base font-semibold bg-black text-white "
                >
                  Submit RSVP
                </motion.button>
              </motion.nav>
            )}

            {/* Names overlay */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: namesOpacity,
                scale: namesScale,
                visibility: namesVisibility,
              }}
            >
              <h1 className="font-serif-custom text-white text-5xl md:text-7xl lg:text-8xl xl:text-[10rem] tracking-wide drop-shadow-2xl select-none">
                Dave & Tems
              </h1>
            </motion.div>

            {/* Horizontal decorative line */}
            <motion.div
              className="absolute bottom-28 left-8 right-8 h-px bg-white/50"
              style={{ opacity: namesOpacity, visibility: namesVisibility }}
            />

            {/* Scroll indicator - left side */}
            <motion.div
              className="absolute bottom-8 left-8 flex items-center gap-2 text-white/80"
              style={{ opacity: namesOpacity, visibility: namesVisibility }}
            >
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.5,
                  ease: "easeInOut",
                }}
                className="text-xl"
              >
                ↓
              </motion.span>
            </motion.div>

            {/* Scroll to explore - right side */}
            <motion.div
              className="absolute bottom-8 right-8 text-white/80 text-xs tracking-[0.3em] uppercase font-sans-custom"
              style={{ opacity: namesOpacity, visibility: namesVisibility }}
            >
              Scroll to explore
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
