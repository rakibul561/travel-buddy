"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
interface ReviewCardProps {
  reviewerName: string;
  reviewerImage: string;
  rating: number;
  date: string;
  text: string;
  tripDestination: string;
  delay?: number;
}
export function ReviewCard({
  reviewerName,
  reviewerImage,
  rating,
  date,
  text,
  tripDestination,
  delay = 0
}: ReviewCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95
      }}
      whileInView={{
        opacity: 1,
        scale: 1
      }}
      viewport={{
        once: true
      }}
      transition={{
        duration: 0.5,
        delay,
        ease: 'easeOut'
      }}
      className="bg-[#FAF7F2] p-6 rounded-xl border border-[#E8DCC4]/50 relative">

      <Quote className="absolute top-6 right-6 text-[#E8DCC4] w-8 h-8 opacity-50" />

      <div className="flex items-center space-x-4 mb-4">
        <img
          src={reviewerImage}
          alt={reviewerName}
          className="w-12 h-12 rounded-full object-cover border border-[#E8DCC4]" />

        <div>
          <h4 className="font-serif font-medium text-[#2C2C2C]">
            {reviewerName}
          </h4>
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, i) =>
                <Star
                  key={i}
                  className={`w-3 h-3 ${i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />

              )}
            </div>
            <span className="text-xs text-[#2C2C2C]/40">{date}</span>
          </div>
        </div>
      </div>

      <p className="text-[#2C2C2C]/70 text-sm leading-relaxed mb-4 italic">
        "{text}"
      </p>

      <div className="text-xs font-medium text-[#8B9D83] uppercase tracking-wider">
        Trip: {tripDestination}
      </div>
    </motion.div>);

}