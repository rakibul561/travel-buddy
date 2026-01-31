"use client";
import React from 'react';
import { motion } from 'framer-motion';
export function StatsSection() {
  const stats = [
    {
      label: 'Active Travelers',
      value: '12k+'
    },
    {
      label: 'Trips Completed',
      value: '8,500'
    },
    {
      label: 'Countries Visited',
      value: '142'
    },
    {
      label: 'Success Rate',
      value: '98%'
    }];

  return (
    <section className="py-20 px-6 bg-[#8B9D83] text-[#FAF7F2]">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) =>
            <motion.div
              key={index}
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
                delay: index * 0.1
              }}
              className="text-center">

              <div className="text-4xl md:text-5xl font-serif font-bold mb-2 text-white">
                {stat.value}
              </div>
              <div className="text-sm md:text-base font-medium tracking-wider uppercase text-[#E8DCC4]">
                {stat.label}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}