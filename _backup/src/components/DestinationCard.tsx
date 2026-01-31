import React from 'react';
import { motion } from 'framer-motion';
import { MapPin } from 'lucide-react';
interface DestinationCardProps {
  image: string;
  location: string;
  description: string;
  delay?: number;
}
export function DestinationCard({
  image,
  location,
  description,
  delay = 0
}: DestinationCardProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30
      }}
      whileInView={{
        opacity: 1,
        y: 0
      }}
      viewport={{
        once: true,
        margin: '-50px'
      }}
      transition={{
        duration: 0.6,
        delay,
        ease: 'easeOut'
      }}
      className="group cursor-pointer">

      <div className="relative overflow-hidden mb-6 aspect-[4/5] bg-[#E8DCC4]">
        <div className="absolute inset-0 bg-[#2C2C2C]/10 group-hover:bg-transparent transition-colors duration-500 z-10" />
        <motion.img
          whileHover={{
            scale: 1.05
          }}
          transition={{
            duration: 0.7,
            ease: 'easeOut'
          }}
          src={image}
          alt={location}
          className="w-full h-full object-cover" />

      </div>

      <div className="pr-4">
        <div className="flex items-center space-x-2 mb-3 text-[#8B9D83]">
          <MapPin className="w-4 h-4" />
          <span className="text-xs font-medium tracking-widest uppercase">
            Destination
          </span>
        </div>
        <h3 className="text-3xl font-serif text-[#2C2C2C] mb-3 group-hover:text-[#C17B5C] transition-colors duration-300">
          {location}
        </h3>
        <p className="text-[#2C2C2C]/70 leading-relaxed font-light">
          {description}
        </p>
      </div>
    </motion.div>);

}