"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Map, Users } from 'lucide-react';
export function HowItWorks() {
  const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Profile',
      description:
        'Share your interests, travel style, and past adventures to help others get to know you.'
    },
    {
      icon: Map,
      title: 'Share Travel Plans',
      description:
        'Post your upcoming trips or browse destinations where others are heading.'
    },
    {
      icon: Users,
      title: 'Connect & Explore',
      description:
        'Match with compatible travelers, chat, and embark on shared journeys together.'
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
          className="text-center mb-16">

          <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-4">
            How It Works
          </h2>
          <p className="text-[#2C2C2C]/60 max-w-xl mx-auto font-light">
            Three simple steps to finding your perfect travel companion and
            starting your next adventure.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step, index) =>
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 30
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
                delay: index * 0.2
              }}
              className="text-center relative group">

              {index < steps.length - 1 &&
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-px bg-gradient-to-r from-[#E8DCC4] to-transparent z-0" />
              }

              <div className="relative z-10 inline-flex items-center justify-center w-24 h-24 rounded-full bg-[#FAF7F2] border border-[#E8DCC4] mb-8 group-hover:border-[#C17B5C] group-hover:scale-110 transition-all duration-500">
                <step.icon
                  className="w-10 h-10 text-[#8B9D83] group-hover:text-[#C17B5C] transition-colors duration-500"
                  strokeWidth={1.5} />

                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-[#C17B5C] text-[#FAF7F2] flex items-center justify-center font-serif font-bold text-lg shadow-lg">
                  {index + 1}
                </div>
              </div>

              <h3 className="text-xl font-serif text-[#2C2C2C] mb-4">
                {step.title}
              </h3>
              <p className="text-[#2C2C2C]/60 leading-relaxed font-light px-4">
                {step.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}