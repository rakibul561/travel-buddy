"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Wallet, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';
interface TravelPlanCardProps {
  id: string;
  destination: string;
  image: string;
  startDate: string;
  endDate: string;
  budget: string;
  type: 'Solo' | 'Family' | 'Friends' | 'Couple';
  hostName: string;
  hostImage: string | undefined;
  delay?: number;
}
export function TravelPlanCard({
  id,
  destination,
  image,
  startDate,
  endDate,
  budget,
  type,
  hostName,
  hostImage,
  delay = 0
}: TravelPlanCardProps) {
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
        duration: 0.5,
        delay,
        ease: 'easeOut'
      }}
      className="bg-white rounded-xl overflow-hidden border border-[#E8DCC4]/30 hover:border-[#C17B5C]/30 transition-all duration-300 group flex flex-col h-full">

      <div className="relative h-48 overflow-hidden">
        <div className="absolute top-4 left-4 z-20">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#2C2C2C] text-xs font-medium rounded-full uppercase tracking-wider">
            {type} Trip
          </span>
        </div>
        <img
          src={image}
          alt={destination}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center space-x-3 mb-4">
          <img
            src={hostImage}
            alt={hostName}
            className="w-8 h-8 rounded-full object-cover border border-[#E8DCC4]" />

          <div className="text-xs">
            <span className="text-[#2C2C2C]/50 block">Hosted by</span>
            <span className="font-medium text-[#2C2C2C]">{hostName}</span>
          </div>
        </div>

        <h3 className="text-2xl font-serif text-[#2C2C2C] mb-4 group-hover:text-[#C17B5C] transition-colors">
          {destination}
        </h3>

        <div className="space-y-3 mb-6 flex-1">
          <div className="flex items-center text-sm text-[#2C2C2C]/70">
            <Calendar className="w-4 h-4 mr-3 text-[#8B9D83]" />
            {startDate} - {endDate}
          </div>
          <div className="flex items-center text-sm text-[#2C2C2C]/70">
            <Wallet className="w-4 h-4 mr-3 text-[#8B9D83]" />
            {budget}
          </div>
          <div className="flex items-center text-sm text-[#2C2C2C]/70">
            <Users className="w-4 h-4 mr-3 text-[#8B9D83]" />
            Looking for 2-3 companions
          </div>
        </div>

        <Link href={`/travel-plans/${id}`} className="mt-auto">
          <button className="w-full py-3 flex items-center justify-center text-sm font-medium text-[#C17B5C] border border-[#C17B5C]/20 rounded-lg hover:bg-[#C17B5C] hover:text-[#FAF7F2] transition-all duration-300">
            View Details <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </Link>
      </div>
    </motion.div>);

}