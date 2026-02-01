import React from 'react';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { HowItWorks } from '../components/HowItWorks';
import { PopularDestinations } from '../components/PopularDestinations';
import { StatsSection } from '../components/StatsSection';
import { Testimonials } from '../components/Testimonials';
import { PricingSection } from '../components/PricingSection';
import { Newsletter } from '../components/Newsletter';
import { Footer } from '../components/Footer';
export function HomePage() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <HowItWorks />
      <PopularDestinations />
      <StatsSection />

      <Testimonials />
      <PricingSection />
      <Newsletter />
      <Footer />
    </div>);

}