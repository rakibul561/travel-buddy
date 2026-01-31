"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TravelButton as Button } from '@/components/ui/TravelButton';
import { TravelPlanCard } from '@/components/TravelPlanCard';
export default function TravelPlansPage() {
  const plans = [
    {
      id: '1',
      destination: 'Machu Picchu, Peru',
      image:
        'https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000&auto=format&fit=crop',
      startDate: 'May 15, 2024',
      endDate: 'May 28, 2024',
      budget: '$2,000 - $2,500',
      type: 'Friends' as const,
      hostName: 'Elena Rodriguez',
      hostImage:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: '2',
      destination: 'Kyoto, Japan',
      image:
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop',
      startDate: 'Oct 10, 2024',
      endDate: 'Oct 24, 2024',
      budget: '$3,000 - $4,000',
      type: 'Solo' as const,
      hostName: 'James Chen',
      hostImage:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop'
    },
    {
      id: '3',
      destination: 'Amalfi Coast, Italy',
      image:
        'https://images.unsplash.com/photo-1633321088355-d0f8c1eaad48?q=80&w=1000&auto=format&fit=crop',
      startDate: 'Jul 05, 2024',
      endDate: 'Jul 15, 2024',
      budget: '$2,500 - $3,500',
      type: 'Couple' as const,
      hostName: 'Sofia Andersson',
      hostImage:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop'
    }];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h1 className="text-4xl font-serif text-[#2C2C2C] mb-4">
                Travel Plans
              </h1>
              <p className="text-[#2C2C2C]/60 font-light max-w-xl">
                Browse upcoming trips or create your own to find companions.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <Button variant="primary" className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create New Plan
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan, index) =>
              <TravelPlanCard key={plan.id} {...plan} delay={index * 0.1} />
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>);

}