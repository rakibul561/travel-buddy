"use client";
import React from 'react';
import { motion } from 'framer-motion';
interface GuideProfileProps {
  name: string;
  specialty: string;
  bio: string;
  image: string;
  delay?: number;
}
export function GuideProfile({
  name,
  specialty,
  bio,
  image,
  delay = 0
}: GuideProfileProps) {
  return (
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
        duration: 0.6,
        delay,
        ease: 'easeOut'
      }}
      className="text-center p-8 border border-[#E8DCC4]/50 bg-white/50 backdrop-blur-sm hover:bg-white transition-colors duration-500">

      <div className="relative w-32 h-32 mx-auto mb-6">
        <div className="absolute inset-0 rounded-full border border-[#E8DCC4] scale-110" />
        <img
          src={image}
          alt={name}
          className="w-full h-full rounded-full object-cover" />

      </div>

      <h3 className="text-2xl font-serif text-[#2C2C2C] mb-2">{name}</h3>
      <p className="text-[#8B9D83] text-sm font-medium uppercase tracking-wider mb-4">
        {specialty}
      </p>
      <p className="text-[#2C2C2C]/70 font-light leading-relaxed text-sm">
        {bio}
      </p>
    </motion.div>);

}