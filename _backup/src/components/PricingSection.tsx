import React from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from './ui/Button';
export function PricingSection() {
  const plans = [
  {
    name: 'Explorer',
    price: 'Free',
    description: 'Perfect for getting started',
    features: [
    'Create travel profile',
    'View public trips',
    'Basic search filters',
    '1 active trip plan'],

    cta: 'Get Started',
    variant: 'outline' as const
  },
  {
    name: 'Nomad',
    price: '$9.99',
    period: '/month',
    description: 'For frequent travelers',
    features: [
    'Unlimited trip plans',
    'Advanced matching',
    'Direct messaging',
    'Verified badge',
    'See who viewed you'],

    cta: 'Start Free Trial',
    variant: 'primary' as const,
    popular: true
  },
  {
    name: 'Global Citizen',
    price: '$19.99',
    period: '/month',
    description: 'Ultimate connection tools',
    features: [
    'Everything in Nomad',
    'Priority support',
    'Featured profile',
    'Travel deals & perks',
    'Offline mode'],

    cta: 'Go Pro',
    variant: 'outline' as const
  }];

  return (
    <section className="py-24 px-6 bg-[#FAF7F2]">
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
            Simple, Transparent Pricing
          </h2>
          <p className="text-[#2C2C2C]/60 max-w-xl mx-auto font-light">
            Choose the plan that fits your travel style. Cancel anytime.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, index) =>
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
            className={`relative p-8 rounded-2xl bg-white border ${plan.popular ? 'border-[#C17B5C] shadow-xl shadow-[#C17B5C]/10 scale-105 z-10' : 'border-[#E8DCC4] shadow-sm'}`}>

              {plan.popular &&
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-[#C17B5C] text-[#FAF7F2] px-4 py-1 rounded-full text-xs font-medium uppercase tracking-wider">
                  Most Popular
                </div>
            }

              <h3 className="text-xl font-serif text-[#2C2C2C] mb-2">
                {plan.name}
              </h3>
              <div className="flex items-baseline mb-4">
                <span className="text-4xl font-bold text-[#2C2C2C]">
                  {plan.price}
                </span>
                {plan.period &&
              <span className="text-[#2C2C2C]/50 ml-1">{plan.period}</span>
              }
              </div>
              <p className="text-[#2C2C2C]/60 text-sm mb-8">
                {plan.description}
              </p>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, i) =>
              <li
                key={i}
                className="flex items-start text-sm text-[#2C2C2C]/80">

                    <Check className="w-4 h-4 text-[#8B9D83] mr-3 mt-0.5 shrink-0" />
                    {feature}
                  </li>
              )}
              </ul>

              <Button variant={plan.variant} className="w-full">
                {plan.cta}
              </Button>
            </motion.div>
          )}
        </div>
      </div>
    </section>);

}