"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

interface DetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  detailType: string;
  imagePath?: string;
}

const detailContent: Record<string, any> = {
  "Travel Logistics": {
    title: "Travel & Accommodations",
    description:
      "Use this page to help guests plan their trip, book a stay, and navigate the weekend with less guesswork.",
    sections: [
      {
        heading: "Getting There",
        subheading: "Flight",
        content:
          "Add the closest airport, train station, or driving instructions guests should use when planning their trip.",
        note: "Travel Note",
      },
      {
        heading: "Staying",
        content:
          "Share your preferred hotel block, neighborhood, or rental guidance here so guests know where to stay.",
        note: "Travel Note",
      },
      {
        heading: "Getting to & from the Venue",
        content:
          "Explain parking, shuttles, rideshare availability, or any arrival instructions guests should know before the event.",
      },
      {
        heading: "Things to Do Nearby",
        content:
          "List a few restaurants, coffee shops, sights, or weekend activities for out-of-town guests who want recommendations.",
      },
    ],
  },
  Registry: {
    title: "Registry",
    description:
      "Your presence at our wedding is the greatest gift of all. If you would like to honor us with a gift, a contribution towards our future together would mean a lot.",
    sections: [
      {
        heading: "For Canadian Guests",
        subheading: "Interac e-Transfer",
        content:
          "We gratefully accept e-Transfers sent to [Your Email Address].",
      },
      {
        heading: "For American Guests",
        subheading: "Venmo",
        content:
          "We gratefully accept contributions via Venmo at @[Your Venmo Handle].",
      },
      {
        heading: "A Note on Gifts",
        content: "Thank You",
        subcontent:
          "We are incredibly thankful for your love and support. Having you there matters most.",
      },
    ],
  },
  "Dress Code": {
    title: "Dress Code",
    description: "Think summer garden party.",
    sections: [
      {
        heading: "For the Ladies",
        subheading: "Elegant, colorful, and comfortable",
        content:
          "Tea or floor-length dresses are welcome. Bright colors and florals are encouraged.",
        subcontent: "Wear comfortable shoes for wandering and dancing.",
      },
      {
        heading: "For the Gentlemen",
        subheading: "Classic with a summer touch",
        content:
          "Dress shirts and suits are perfect. Linen and lighter colors are encouraged.",
        subcontent:
          "Keep things polished but breathable for a warm summer evening.",
      },
    ],
  },
  Dining: {
    title: "Dinner Menu",
    description:
      "We are working with our caterer to finalize a delicious multi-course meal for everyone.",
    sections: [
      {
        heading: "Cocktail Hour",
        subheading: "Passed Canapes",
        content:
          "Seasonal tartlet with whipped goat cheese and herbs.\n\nCrispy prawn skewer with citrus aioli.\n\nTruffle arancini with parmesan.",
      },
      {
        heading: "Main Course",
        subheading: "Plated Dinner",
        content:
          "Herb-roasted chicken with garlic mashed potatoes and market vegetables.\n\nMiso-glazed salmon with jasmine rice and bok choy.\n\nWild mushroom risotto with roasted asparagus.",
      },
      {
        heading: "Dietary Restrictions",
        subheading: "We can accommodate",
        content:
          "Please include allergies and dietary restrictions with your RSVP.\n\nVegetarian, gluten-free, and dairy-free options will be available.",
      },
    ],
  },
  Music: {
    title: "Music",
    description:
      "Set the tone for the weekend with a playlist that feels like you.",
    sections: [
      {
        heading: "Wedding Playlist",
        content:
          "We've put together a playlist for our celebration. Save it on Spotify and get ready to dance!",
        spotifyPlaylistId: "2rEHQL86tmmmH3MDVSIs5w",
      },
    ],
  },
  "Wedding Parties": {
    title: "Wedding Parties",
    description: "Meet our favorite people.",
    sections: [
      {
        heading: "Coming Soon",
        content:
          "We're excited to introduce you to the amazing people who will be standing by our side.",
      },
    ],
  },
};

export function DetailModal({
  isOpen,
  onClose,
  detailType,
  imagePath,
}: DetailModalProps) {
  const content = detailContent[detailType];

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

  if (!content) return null;

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
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-55"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[45px] shadow-2xl z-58 max-h-[95vh] overflow-hidden"
          >
            {/* Header */}
            <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between z-10">
              <div>
                <h2 className="font-sans-custom font-bold text-2xl md:text-2xl text-gray-900">
                  {detailType}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Scrollable content wrapper */}
            <div className="overflow-y-auto max-h-[calc(95vh-73px)]">
              {/* Content */}
              <div className="p-6 md:p-8 max-w-4xl mx-auto">
                {/* Image */}
                {imagePath && (
                  <div className="relative w-full h-48 md:h-84 mb-6 rounded-lg overflow-hidden shadow-md">
                    <Image
                      src={imagePath}
                      alt={detailType}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <h3 className="font-serif-custom text-4xl md:text-6xl text-gray-900 mb-4">
                  {content.title}
                </h3>
                <p className="font-sans-custom text-lg text-gray-600 mb-8">
                  {content.description}
                </p>

                {/* Sections */}
                <div className="space-y-8 text-left">
                  {content.sections.map((section: any, index: number) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 pb-8 last:border-0"
                    >
                      <h4 className="font-sans-custom text-xl md:text-2xl text-gray-900 mb-2">
                        {section.heading}
                      </h4>
                      {section.subheading && (
                        <h5 className="font-sans-custom text-lg font-medium text-gray-700 mb-3">
                          {section.subheading}
                        </h5>
                      )}
                      <p className="font-sans-custom text-gray-600 whitespace-pre-line">
                        {section.content}
                      </p>

                      {/* ── Spotify Embed ── */}
                      {section.spotifyPlaylistId && (
                        <div className="mt-5 rounded-2xl overflow-hidden shadow-md">
                          <iframe
                            src={`https://open.spotify.com/embed/playlist/${section.spotifyPlaylistId}?utm_source=generator&theme=0`}
                            width="100%"
                            height="380"
                            frameBorder="0"
                            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                            loading="lazy"
                            title="Wedding Playlist"
                          />
                        </div>
                      )}

                      {section.subcontent && (
                        <p className="font-sans-custom text-gray-600 mt-3">
                          {section.subcontent}
                        </p>
                      )}
                      {section.note && (
                        <div className="mt-4 inline-block px-3 py-1 bg-gray-100 rounded-full">
                          <span className="font-sans-custom text-sm text-gray-500">
                            {section.note}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
