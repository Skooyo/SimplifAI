import Hero from "@/components/landing-sections/Hero";
import LandingHeader from "@/components/landing-sections/LandingHeader";
import Features from "@/components/landing-sections/Features";
import HowToUse from "@/components/landing-sections/HowToUse";
import Sponsors from "@/components/landing-sections/Sponsors";
import Footer from "@/components/landing-sections/Footer";

export default function Home() {
  return (
    <main className="overflow-hidden flex flex-col">
      <LandingHeader />
      <Hero />
      <Features />
      <HowToUse />
      <Sponsors />
      <Footer />
    </main>
  );
}
