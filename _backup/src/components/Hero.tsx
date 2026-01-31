import React from 'react';
import { motion } from 'framer-motion';
import { Compass } from 'lucide-react';
import { Button } from './ui/Button';
export function Hero() {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-6 py-24">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-[#E8DCC4] blur-3xl" />
        <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-[#8B9D83] blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <motion.div
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
            ease: 'easeOut'
          }}
          className="flex justify-center mb-8">

          <div className="p-4 rounded-full border border-[#8B9D83]/30 bg-[#FAF7F2]/50 backdrop-blur-sm">
            <Compass className="w-8 h-8 text-[#8B9D83]" strokeWidth={1.5} />
          </div>
        </motion.div>

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
            delay: 0.2,
            ease: 'easeOut'
          }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#2C2C2C] leading-tight mb-8 tracking-tight">

          Discover the World <br />
          <span className="italic text-[#8B9D83]">with Grace</span>
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
            delay: 0.4,
            ease: 'easeOut'
          }}
          className="text-lg md:text-xl text-[#2C2C2C]/80 max-w-2xl mx-auto mb-12 font-light leading-relaxed">

          Curated journeys for the modern explorer. Experience the beauty of the
          globe through our refined, sustainable, and culturally immersive
          travel collections.
        </motion.p>

        <motion.div
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
            delay: 0.6,
            ease: 'easeOut'
          }}>

          <Button variant="primary" withIcon className="text-base px-10 py-4">
            Start Your Journey
          </Button>
        </motion.div>
      </div>
    </section>);

}