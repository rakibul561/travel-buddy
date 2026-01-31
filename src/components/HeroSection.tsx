"use client";
import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, MapPin, Users } from 'lucide-react';
import { TravelButton as Button } from './ui/TravelButton';
export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-6 pt-32 pb-20 bg-[#FAF7F2]">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-[#E8DCC4]/40 blur-3xl" />

        <motion.div
          animate={{
            y: [0, 30, 0],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1
          }}
          className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[#8B9D83]/20 blur-3xl" />

      </div>

      <div className="relative z-10 max-w-5xl mx-auto w-full">
        <div className="text-center mb-12">
          <motion.span
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.6
            }}
            className="inline-block py-1 px-3 rounded-full bg-[#C17B5C]/10 text-[#C17B5C] text-xs font-medium tracking-widest uppercase mb-6">

            Connect • Explore • Experience
          </motion.span>

          <motion.h1
            initial={{
              opacity: 0,
              y: 30
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.2
            }}
            className="text-5xl md:text-7xl font-serif text-[#2C2C2C] leading-tight mb-6">

            Find Your Perfect <br />
            <span className="italic text-[#8B9D83]">Travel Companion</span>
          </motion.h1>

          <motion.p
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            transition={{
              duration: 0.8,
              delay: 0.4
            }}
            className="text-lg md:text-xl text-[#2C2C2C]/60 max-w-2xl mx-auto font-light leading-relaxed">

            Don't let solo travel mean traveling alone. Connect with like-minded
            explorers, share expenses, and create unforgettable memories
            together.
          </motion.p>
        </div>

        {/* Search Box */}
        <motion.div
          initial={{
            opacity: 0,
            y: 40
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.8,
            delay: 0.6
          }}
          className="bg-white p-4 rounded-2xl shadow-xl shadow-[#8B9D83]/10 border border-[#E8DCC4]/50 max-w-4xl mx-auto">

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-[#8B9D83]" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border-none rounded-xl bg-[#FAF7F2] text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:ring-2 focus:ring-[#C17B5C]/20 transition-all"
                placeholder="Where to?" />

            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar className="h-5 w-5 text-[#8B9D83]" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border-none rounded-xl bg-[#FAF7F2] text-[#2C2C2C] placeholder-[#2C2C2C]/40 focus:ring-2 focus:ring-[#C17B5C]/20 transition-all"
                placeholder="When?" />

            </div>

            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Users className="h-5 w-5 text-[#8B9D83]" />
              </div>
              <select className="block w-full pl-10 pr-3 py-4 border-none rounded-xl bg-[#FAF7F2] text-[#2C2C2C] focus:ring-2 focus:ring-[#C17B5C]/20 transition-all appearance-none cursor-pointer">
                <option value="" disabled selected>
                  Travel Style
                </option>
                <option value="solo">Solo Adventure</option>
                <option value="friends">Group Trip</option>
                <option value="family">Family Friendly</option>
              </select>
            </div>

            <Button
              variant="secondary"
              className="w-full h-full py-4 text-base shadow-lg shadow-[#C17B5C]/20">

              Search
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 1,
            delay: 1
          }}
          className="mt-12 flex justify-center space-x-8 text-sm text-[#2C2C2C]/50">

          <span>Popular: Bali</span>
          <span>•</span>
          <span>Iceland</span>
          <span>•</span>
          <span>Kyoto</span>
          <span>•</span>
          <span>Patagonia</span>
        </motion.div>
      </div>
    </section>);

}