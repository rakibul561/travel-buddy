import React from 'react';
import { motion } from 'framer-motion';
import { ReviewCard } from './ReviewCard';
export function Testimonials() {
  const reviews = [
  {
    reviewerName: 'Sarah Jenkins',
    reviewerImage:
    'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    date: 'Oct 2023',
    text: "I was nervous about traveling solo to Japan, but finding a travel buddy through this platform changed everything. We're now planning our next trip to Korea!",
    tripDestination: 'Japan'
  },
  {
    reviewerName: 'David Miller',
    reviewerImage:
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    rating: 5,
    date: 'Dec 2023',
    text: 'Found an amazing group for a hiking trip in Patagonia. The matching system really works - we all had similar hiking paces and interests.',
    tripDestination: 'Patagonia'
  },
  {
    reviewerName: 'Emma Wilson',
    reviewerImage:
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop',
    rating: 4,
    date: 'Jan 2024',
    text: "Great way to meet locals and other travelers. I used the 'Find a Buddy' feature for day trips while I was working remotely in Lisbon.",
    tripDestination: 'Portugal'
  }];

  return (
    <section className="py-24 px-6 bg-white">
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
          className="mb-16">

          <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-4">
            Stories from the Road
          </h2>
          <p className="text-[#2C2C2C]/60 max-w-xl font-light">
            Real connections, real adventures. Hear from our community.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, index) =>
          <ReviewCard key={index} {...review} delay={index * 0.2} />
          )}
        </div>
      </div>
    </section>);

}