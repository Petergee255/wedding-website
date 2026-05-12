"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  MotionValue,
  useSpring,
  useMotionValue,
} from "framer-motion";
import { PhotoModal } from "./photo-modal";

export interface Photo {
  src?: string;
  caption?: string;
  bgClass?: string;
  width?: number;
  height?: number;
}

interface PhotoStackSectionProps {
  photos?: Photo[];
}

const CARD_WIDTH = 289.68;
const CARD_HEIGHT = 200;

const DEFAULT_PHOTOS: Photo[] = [
  {
    src: "/d7.jfif",
    bgClass: "bg-orange-300",
    caption: "",
    width: 233.4,
    height: 133.26,
  },
  {
    src: "/d1.jfif",
    bgClass: "bg-amber-200",
    caption: "",
    width: 240,
    height: 173,
  },
  {
    src: "/d2.jfif",
    bgClass: "bg-teal-300",
    caption: "",
    width: 240,
    height: 170,
  },
  {
    src: "/d4.jfif",
    bgClass: "bg-violet-300",
    caption: "",
    width: 237,
    height: 170,
  },
  {
    src: "/d5.jfif",
    bgClass: "bg-rose-300",
    caption: "",
    width: 255,
    height: 130,
  },
  {
    src: "/d6.jfif",
    bgClass: "bg-orange-300",
    caption: "",
    width: 253.4,
    height: 125,
  },
  {
    src: "/sem.jfif",
    bgClass: "bg-amber-200",
    caption: "",
    width: 269,
    height: 153,
  },
  {
    src: "/d8.jfif",
    bgClass: "bg-teal-300",
    caption: "",
    width: 269,
    height: 150,
  },
  {
    src: "/d10.jfif",
    bgClass: "bg-teal-300",
    caption: "",
    width: 265,
    height: 150,
  },
];

const FAN_OFFSETS = [
  { rotate: -1.5, tx: -2, ty: -98 },
  { rotate: 1.5, tx: -6, ty: -42 },
  { rotate: -2, tx: -2, ty: -29 },
  { rotate: 1, tx: -6, ty: -9 },
  { rotate: -1, tx: -5, ty: -28 },
  { rotate: -3.5, tx: -2, ty: -12 },
  { rotate: 1.5, tx: -6, ty: 30 },
  { rotate: 4, tx: -13, ty: 50 },
  { rotate: -1.5, tx: -9, ty: 62 },
];

// CARD

function AnimatedCard({
  photo,
  index,
  total,
  scrollYProgress,
  onClick,
}: {
  photo: Photo;
  index: number;
  total: number;
  scrollYProgress: MotionValue<number>;
  onClick: (photo: Photo) => void;
}) {
  const fan = FAN_OFFSETS[Math.min(index, FAN_OFFSETS.length - 1)];

  const pause = 0.08;

  const segmentSize = (1 - pause) / (total - 1);

  const start = pause + (index - 1) * segmentSize;
  const end = start + segmentSize;

  /**
   * RAW TRANSFORMS
   */

  const rawY =
    index === 0
      ? useMotionValue(fan.ty)
      : useTransform(scrollYProgress, [start, end], [420, fan.ty]);

  const rawRotate =
    index === 0
      ? useMotionValue(fan.rotate)
      : useTransform(scrollYProgress, [start, end], [1.5, fan.rotate]);

  /**
   * SPRING SMOOTHING
   */

  const translateY = useSpring(rawY, {
    stiffness: 120,
    damping: 20,
    mass: 0.7,
  });

  const rotate = useSpring(rawRotate, {
    stiffness: 120,
    damping: 20,
    mass: 0.7,
  });

  const cardWidth = photo.width ?? CARD_WIDTH;
  const cardHeight = photo.height ?? CARD_HEIGHT;

  return (
    <motion.div
      className="absolute bottom-35 left-1/2 pointer-events-auto cursor-pointer"
      whileHover={{ y: -15, transition: { duration: 0.3, ease: "easeOut" } }}
      onClick={() => onClick(photo)}
      style={{
        width: cardWidth,
        height: cardHeight,
        marginLeft: -cardWidth / 2,
        zIndex: index,
        translateX: fan.tx,
        translateY,
        rotate,
        opacity: 1,
        transformOrigin: "bottom center",
        willChange: "transform",
      }}
    >
      {/* Polaroid */}
      <div className="bg-white rounded-xl p-2.5 pb-4 shadow-[0_0px_50px_rgba(0,0,0,0.20),0_1px_2px_rgba(0,0,0,0.10)]">
        {/* Photo */}
        <div
          className={`w-full rounded-lg overflow-hidden ${
            photo.bgClass ?? "bg-stone-300"
          }`}
          style={{ aspectRatio: "4/3" }}
        >
          {photo.src && (
            <img
              src={photo.src}
              alt={photo.caption ?? ""}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Caption */}
        {photo.caption && (
          <p className="mt-2.5 text-center font-medium text-base text-stone-500 font-sans-custom tracking-normal">
            {photo.caption}
          </p>
        )}
      </div>
    </motion.div>
  );
}

export default function PhotoStackSection({
  photos = DEFAULT_PHOTOS,
}: PhotoStackSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  const totalVh = photos.length + 2;

  const handleCardClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPhoto(null);
  };

  return (
    <section
      ref={containerRef}
      className="relative bg-[#fcf7ed]"
      style={{
        height: `${totalVh * 130}vh`,
      }}
    >
      {/* Sticky Scene */}
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center relative">
        <h3 className="absolute top-14 md:top-10 lg:top-7 xl:top-15 left-1/2 transform -translate-x-1/2 text-center font-serif-custom text-5xl md:text-7xl lg:text-8xl z-10 font-bold">
          Our Story
        </h3>
        {/* Stack Container */}
        <div
          className="relative flex-none"
          style={{
            width: 340,
            height: 520,
          }}
        >
          {photos.map((photo, i) => (
            <AnimatedCard
              key={i}
              photo={photo}
              index={i}
              total={photos.length}
              scrollYProgress={scrollYProgress}
              onClick={handleCardClick}
            />
          ))}
        </div>
      </div>

      {/* Photo Modal */}
      <PhotoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        photo={selectedPhoto}
      />
    </section>
  );
}
