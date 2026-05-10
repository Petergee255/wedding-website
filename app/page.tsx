import { HeroSection } from "@/components/hero-section";
import { InvitationSection } from "@/components/invitation-section";
import { CountdownSection } from "@/components/countdown-section";
import { VenueSection } from "@/components/venue-section";
import { AdditionalDetailsSection } from "@/components/additional-details-section";
import { VisionSection } from "@/components/vision-section";
import { FaqSection } from "@/components/faq-section";
import { FooterSection } from "@/components/footer-section";
import  PhotoStackSection  from "@/components/photostack-section";

export default function WeddingPage() {
  return (
    <main className="bg-[#fcf7ed]">
      <HeroSection />
      <InvitationSection />
      <PhotoStackSection />
      <CountdownSection />
      <VenueSection />
      <AdditionalDetailsSection />
      <VisionSection />
      <FaqSection />
      <FooterSection />
    </main>
  );
}
