"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqData: FAQItem[] = [
  {
    question: "Is there a dress code?",
    answer:
      "We recommend cocktail attire for the evening celebration. Think elegant but comfortable - you'll be dancing!",
  },
  {
    question: "Is the wedding outdoors?",
    answer:
      "The ceremony will take place in the gorgeous garden, weather permitting. The reception will be in a covered pavilion.",
  },
  {
    question: "What will the weather be like? What happens if it rains?",
    answer:
      "We're hoping for perfect weather! In case of rain, we have a beautiful indoor backup space that's just as lovely.",
  },
  {
    question: "Can I bring a plus one or my kids?",
    answer:
      "Due to venue capacity, we've had to keep the guest list intimate. Please check your invitation for specific details about plus ones and children.",
  },
  {
    question: "What time should I arrive at the ceremony?",
    answer:
      "Please arrive 15-20 minutes before the ceremony start time. This will give you time to find parking and get settled.",
  },
  {
    question: "I have a food allergy, can I make a special request?",
    answer:
      "Absolutely! Please let us know about any dietary restrictions or allergies at least two weeks before the wedding.",
  },
  {
    question: "Is there parking at the venue?",
    answer:
      "Yes, there's ample parking available on-site. We recommend carpooling if possible to be more eco-friendly.",
  },
  {
    question: "Help! I have other questions!",
    answer:
      "We're here to help! Don't hesitate to reach out to us directly with any other questions you might have.",
  },
];

interface FAQAccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}

function FAQAccordionItem({ item, isOpen, onClick }: FAQAccordionItemProps) {
  return (
    <div className="border-b  border-b-[1px] border-gray-300 last:border-b-1">
      <button
        onClick={onClick}
        className="w-full py-6 px-6 text-left flex items-center justify-between"
      >
        <span className="text-xl font-sans-custom font-semibold text-gray-900">
          {item.question}
        </span>
        <div className="w-5 h-5 flex-shrink-0 ml-4 flex items-center bg-red justify-center">
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ transformOrigin: "50% 50%" }}
          >
            <ChevronDown className="w-5 h-5 text-gray-500 " />
          </motion.div>
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-4">
              <p className="font-sans-custom text-gray-600 leading-relaxed">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FaqSection() {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenItem((prev) => (prev === index ? null : index));
  };

  return (
    <section className="min-h-screen bg-[#fcf7ed]">
      <div className="max-w-6xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16">
          {/* Left Column - Sticky */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 lg:h-fit">
            <div className="lg:pr-8">
              <h2 className="font-serif-custom text-4xl lg:text-5xl text-gray-900 mb-6 leading-tight">
                Questions and answers
              </h2>
              <p className="font-sans-custom text-lg text-gray-600 mb-4">
                Can't find the answer here?
              </p>
              <a
                href="#"
                className="font-sans-custom text-lg text-gray-900 underline hover:text-gray-700 transition-colors duration-200"
              >
                Reach out to Jim or Pam
              </a>
            </div>
          </div>

          {/* Right Column - Scrollable */}
          <div className="lg:col-span-8 space-y-0">
            {faqData.map((item, index) => (
              <FAQAccordionItem
                key={index}
                item={item}
                isOpen={openItem === index}
                onClick={() => toggleItem(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
