"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { TravelerCard } from './TravelerCard';
export function TopTravelers() {
  const travelers = [
    {
      id: '1',
      name: 'Elena Rodriguez',
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
      location: 'Madrid, Spain',
      rating: 4.9,
      reviewCount: 24,
      interests: ['Photography', 'Hiking', 'Food'],
      countriesVisited: 12
    },
    {
      id: '2',
      name: 'James Chen',
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
      location: 'Vancouver, Canada',
      rating: 4.8,
      reviewCount: 18,
      interests: ['Adventure', 'Skiing', 'Nature'],
      countriesVisited: 8
    },
    {
      id: '3',
      name: 'Sofia Andersson',
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
      location: 'Stockholm, Sweden',
      rating: 5.0,
      reviewCount: 32,
      interests: ['Art', 'History', 'Museums'],
      countriesVisited: 25
    },
    {
      id: '4',
      name: 'Marcus Johnson',
      image:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
      location: 'Cape Town, SA',
      rating: 4.7,
      reviewCount: 15,
      interests: ['Surfing', 'Music', 'Road Trips'],
      countriesVisited: 6
    }];

  return (
    <section className="py-24 px-6 bg-[#E8DCC4]/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          whileInView={{
            opacity: 1,
            y: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6
          }}
          className="text-center mb-16">

          <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-4">
            Meet Top Travelers
          </h2>
          <p className="text-[#2C2C2C]/60 max-w-xl mx-auto font-light">
            Connect with experienced explorers who are ready for their next
            adventure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelers.map((traveler, index) =>
            <TravelerCard key={traveler.id} {...traveler} delay={index * 0.1} />
          )}
        </div>
      </div>
    </section>);

}