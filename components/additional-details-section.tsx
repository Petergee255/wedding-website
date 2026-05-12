"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { DetailModal } from "./detail-modal";

interface DetailCardProps {
  title: string;
  description: string;
  imagePath: string;
  index: number;
  onClick: () => void;
}

function DetailCard({
  title,
  description,
  imagePath,
  index,
  onClick,
}: DetailCardProps) {
  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-3xl shadow-lg hover:shadow-xl transition-shadow duration-300"
    >
      {/* Image Background */}
      <div className="relative aspect-[6/4] overflow-hidden">
        <Image
          src={imagePath}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/70 to-transparent">
        <h3 className="font-sans-custom text-xl md:text-2xl text-white mb-2 font-bold">
          {title}
        </h3>
        <p className="font-sans-custom text-sm md:text-lg text-white/90 mb-4">
          {description}
        </p>
        {/* Plus Icon Button */}
        <button className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center group-hover:bg-white transition-colors duration-300">
          <Plus className="w-5 h-5 text-gray-800" />
        </button>
      </div>
    </div>
  );
}

export function AdditionalDetailsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetail, setSelectedDetail] = useState("");

  const openModal = (detailTitle: string) => {
    setSelectedDetail(detailTitle);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDetail("");
  };

  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.2], [40, 0]);

  const subtitleOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const subtitleY = useTransform(scrollYProgress, [0.1, 0.3], [40, 0]);

  const details = [
    {
      title: "Wedding Parties",
      description: "Meet our favorite people.",
      imagePath: "/a1.jfif",
    },
    {
      title: "Travel Logistics",
      description: "Plan your trip and stay.",
      imagePath: "/a5.jfif",
    },
    {
      title: "Registry",
      description: "Your presence is enough, but if you insist...",
      imagePath: "/a2.jfif",
    },
    {
      title: "Dress Code",
      description: "What to wear for the celebration.",
      imagePath: "/a.jfif",
    },
    {
      title: "Music",
      description: "The soundtrack to our celebration.",
      imagePath: "/d5.jfif",
    },
    {
      title: "Dining",
      description: "Culinary delights await.",
      imagePath: "/a3.jfif",
    },
  ];

  // Get image path for selected detail
  const getDetailImagePath = (detailTitle: string) => {
    const detail = details.find((d) => d.title === detailTitle);
    return detail?.imagePath;
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen px-4 py-24 lg:py-32 bg-[#fcf7ed]"
    >
      <div className="max-w-9xl mx-auto">
        {/* Section Title */}
        <motion.h2
          className="font-serif-custom font-semibold text-3xl md:text-4xl lg:text-5xl text-center text-foreground mb-6 tracking-wide"
          style={{ opacity: titleOpacity, y: titleY }}
        >
          and now some additional details...
        </motion.h2>

        {/* Section Subtitle */}
        <motion.p
          className="font-sans-custom text-lg md:text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-16 lg:mb-24 "
          style={{ opacity: subtitleOpacity, y: subtitleY }}
        >
          The people, places, and practical details that will make the weekend
          feel effortless.
        </motion.p>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl  mx-auto">
          {details.map((detail, index) => (
            <DetailCard
              key={detail.title}
              title={detail.title}
              description={detail.description}
              imagePath={detail.imagePath}
              index={index}
              onClick={() => openModal(detail.title)}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <DetailModal
        isOpen={isModalOpen}
        onClose={closeModal}
        detailType={selectedDetail}
        imagePath={getDetailImagePath(selectedDetail)}
      />
    </section>
  );
}
