"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
export function Newsletter() {
  return (
    <section className="py-24 px-6 bg-[#E8DCC4]/20">
      <div className="max-w-4xl mx-auto text-center">
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
          }}>

          <h2 className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-6">
            The Journal
          </h2>
          <p className="text-[#2C2C2C]/70 mb-10 max-w-xl mx-auto font-light">
            Subscribe to our curated newsletter for travel inspiration, hidden
            gems, and exclusive offers delivered to your inbox.
          </p>

          <form
            className="flex flex-col md:flex-row gap-4 max-w-md mx-auto"
            onSubmit={(e) => e.preventDefault()}>

            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-6 py-4 bg-white border border-[#E8DCC4] focus:border-[#8B9D83] focus:ring-1 focus:ring-[#8B9D83] outline-none transition-all placeholder:text-[#2C2C2C]/40 font-light" />

            <button
              type="submit"
              className="px-8 py-4 bg-[#C17B5C] text-[#FAF7F2] font-medium hover:bg-[#B06A4B] transition-colors flex items-center justify-center">

              Subscribe <Send className="w-4 h-4 ml-2" />
            </button>
          </form>

          <p className="mt-6 text-xs text-[#2C2C2C]/50">
            Join 10,000+ travelers. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>);

}