import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/HeroSection';
import { HowItWorks } from '@/components/HowItWorks';
import { PopularDestinations } from '@/components/PopularDestinations';
import { TopTravelers } from '@/components/TopTravelers';
import { StatsSection } from '@/components/StatsSection';
import { Testimonials } from '@/components/Testimonials';
import { PricingSection } from '@/components/PricingSection';
import { Newsletter } from '@/components/Newsletter';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <PopularDestinations />
      <StatsSection />
      <TopTravelers />
      <Testimonials />
      <PricingSection />
      <Newsletter />
      <Footer />
    </div>
  );
}
