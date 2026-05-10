"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";
import { Photo } from "./photostack-section";

interface PhotoModalProps {
  isOpen: boolean;
  onClose: () => void;
  photo: Photo | null;
}

export function PhotoModal({ isOpen, onClose, photo }: PhotoModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!photo) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div
              className="relative bg-[#fcf7ed] rounded-2xl shadow-2xl max-w-2xl w-full max-h-[95vh] overflow-hidden p-7"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/80 hover:bg-white flex items-center justify-center transition-colors z-10 shadow-md"
              >
                <X className="w-5 h-5 text-gray-700" />
              </button>

              {/* Image Container */}
              <div className="relative w-full h-[70vh] max-h-[600px] bg-gray-100">
                {photo.src ? (
                  <img
                    src={photo.src}
                    alt={photo.caption || ""}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div
                    className={`w-full h-full ${photo.bgClass || "bg-stone-300"}`}
                  />
                )}
              </div>

              {/* Caption */}
              {photo.caption && (
                <div className="p-6 text-center">
                  <p className="font-sans-custom text-lg text-gray-700">
                    {photo.caption}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
