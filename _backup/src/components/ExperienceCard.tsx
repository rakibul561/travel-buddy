import React from 'react';
import { motion } from 'framer-motion';
import { Clock, ArrowUpRight } from 'lucide-react';
interface ExperienceCardProps {
  title: string;
  duration: string;
  price: string;
  image: string;
  category: string;
  delay?: number;
}
export function ExperienceCard({
  title,
  duration,
  price,
  image,
  category,
  delay = 0
}: ExperienceCardProps) {
  return (
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
        duration: 0.6,
        delay,
        ease: 'easeOut'
      }}
      className="group flex flex-col md:flex-row items-stretch bg-white border border-[#E8DCC4]/30 hover:border-[#C17B5C]/30 transition-colors duration-300">

      <div className="w-full md:w-2/5 aspect-video md:aspect-auto overflow-hidden">
        <motion.img
          whileHover={{
            scale: 1.05
          }}
          transition={{
            duration: 0.6
          }}
          src={image}
          alt={title}
          className="w-full h-full object-cover" />

      </div>

      <div className="flex-1 p-8 md:p-10 flex flex-col justify-between">
        <div>
          <span className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-[#8B9D83] bg-[#8B9D83]/10 rounded-full uppercase">
            {category}
          </span>
          <h3 className="text-2xl md:text-3xl font-serif text-[#2C2C2C] mb-4 group-hover:text-[#C17B5C] transition-colors">
            {title}
          </h3>
          <div className="flex items-center text-[#2C2C2C]/60 mb-6">
            <Clock className="w-4 h-4 mr-2" />
            <span className="text-sm">{duration}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-[#E8DCC4]/30">
          <span className="text-xl font-serif text-[#2C2C2C]">{price}</span>
          <button className="flex items-center text-sm font-medium text-[#C17B5C] group-hover:translate-x-1 transition-transform duration-300">
            View Details <ArrowUpRight className="w-4 h-4 ml-1" />
          </button>
        </div>
      </div>
    </motion.div>);

}