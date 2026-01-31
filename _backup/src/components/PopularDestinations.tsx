import React from 'react';
import { motion } from 'framer-motion';
import { DestinationCard } from './DestinationCard';
import { Button } from './ui/Button';
export function PopularDestinations() {
  const destinations = [
  {
    id: 1,
    location: 'Kyoto, Japan',
    description: 'Ancient traditions and serene temples.',
    image:
    'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 2,
    location: 'Santorini, Greece',
    description: 'Stunning sunsets and white-washed architecture.',
    image:
    'https://images.unsplash.com/photo-1613395877344-13d4c79e4284?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 3,
    location: 'Marrakech, Morocco',
    description: 'Vibrant colors, spices, and historic Medina.',
    image:
    'https://images.unsplash.com/photo-1597212618439-4f2f9537d87b?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 4,
    location: 'Reykjavik, Iceland',
    description: 'Northern lights and dramatic landscapes.',
    image:
    'https://images.unsplash.com/photo-1476610182048-b716b8518aae?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 5,
    location: 'Bali, Indonesia',
    description: 'Tropical paradise with rich culture.',
    image:
    'https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=1000&auto=format&fit=crop'
  },
  {
    id: 6,
    location: 'Patagonia, Chile',
    description: 'Untamed wilderness for true adventurers.',
    image:
    'https://images.unsplash.com/photo-1518182170546-0766bc6f9213?q=80&w=1000&auto=format&fit=crop'
  }];

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

          <Button variant="outline" withIcon>
            View All
          </Button>
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
        <Button variant="outline" withIcon>
          View All Destinations
        </Button>
      </div>
    </section>);

}