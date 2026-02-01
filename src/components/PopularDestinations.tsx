"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DestinationCard } from './DestinationCard';
import { TravelButton as Button } from './ui/TravelButton';
import { travelService } from '@/services/travel.service';
import Link from 'next/link';

export function PopularDestinations() {
  const [destinations, setDestinations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const response = await travelService.getAllTravelPlans({
          limit: 6,
          // Assuming we want the latest or trending. 
          // If backend supports 'trending', use that. Otherwise specific sort.
          sortBy: 'startDate',
          sortOrder: 'asc'
        });
        const plans = response.data.data?.data || response.data.data || [];

        // Map plans to destination format
        // We use destination as location, description as description, image as image
        const mappedDestinations = plans.map((plan: any) => ({
          id: plan.id,
          location: `${plan.destination}, ${plan.country}`,
          description: plan.description ? plan.description.substring(0, 60) + "..." : "Explore this amazing destination.",
          image: plan.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop'
        }));
        setDestinations(mappedDestinations);
      } catch (error) {
        console.error("Failed to fetch popular destinations", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <section className="py-24 px-6 max-w-7xl mx-auto flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C17B5C]"></div>
      </section>
    );
  }

  // If no data, maybe show static or nothing? Let's show nothing or a message.
  if (destinations.length === 0) return null;

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12">
        <motion.div
          initial={{
            opacity: 0,
            x: -20
          }}
          whileInView={{
            opacity: 1,
            x: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6
          }}>

          <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-2">
            Trending Destinations
          </h2>
          <p className="text-[#2C2C2C]/60 font-light">
            Where our community is traveling this season.
          </p>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            x: 20
          }}
          whileInView={{
            opacity: 1,
            x: 0
          }}
          viewport={{
            once: true
          }}
          transition={{
            duration: 0.6
          }}
          className="hidden md:block">

          <Link href="/travel-plans">
            <Button variant="outline" withIcon>
              View All
            </Button>
          </Link>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {destinations.map((dest, index) =>
          <DestinationCard
            key={dest.id}
            image={dest.image}
            location={dest.location}
            description={dest.description}
            delay={index * 0.1} />
        )}
      </div>

      <div className="mt-12 text-center md:hidden">
        <Link href="/travel-plans">
          <Button variant="outline" withIcon>
            View All Destinations
          </Button>
        </Link>
      </div>
    </section>);
}