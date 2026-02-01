"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TravelButton as Button } from '@/components/ui/TravelButton';
import { Users, Globe, Shield, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    const values = [
        {
            icon: Users,
            title: "Community First",
            description: "We believe in the power of connection. Our platform is built to foster meaningful friendships that last beyond the trip."
        },
        {
            icon: Globe,
            title: "Global Adventure",
            description: "From hidden local gems to world-renowned landmarks, we help you discover and explore every corner of the planet."
        },
        {
            icon: Shield,
            title: "Safe & Secure",
            description: "Your safety is paramount. Verified profiles, secure communication, and community guidelines ensure a worry-free experience."
        },
        {
            icon: Heart,
            title: "Shared Passion",
            description: "Connect with people who share your travel style, budget, and interests. No more compromising on your dream vacation."
        }
    ];

    return (
        <div className="min-h-screen bg-[#FAF7F2]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-[#E8DCC4]/20 -skew-x-12 transform translate-x-1/4" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <span className="text-[#C17B5C] font-medium tracking-wider uppercase text-sm mb-4 block">Our Story</span>
                        <h1 className="text-5xl md:text-6xl font-serif text-[#2C2C2C] mb-6 leading-tight">
                            We're changing the way <br /> the world travels.
                        </h1>
                        <p className="text-xl text-[#2C2C2C]/70 font-light leading-relaxed mb-8">
                            TravelBuddy was born from a simple idea: no one should have to explore the world alone. We connect like-minded travelers to create unforgettable shared experiences.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Image Grid */}
            <section className="px-6 mb-24">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[500px]">
                        <motion.div
                            {...fadeIn}
                            className="md:col-span-8 h-full rounded-2xl overflow-hidden relative group"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop"
                                alt="Friends traveling"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                        </motion.div>
                        <div className="md:col-span-4 flex flex-col gap-6 h-full">
                            <motion.div
                                {...fadeIn}
                                transition={{ delay: 0.2 }}
                                className="flex-1 rounded-2xl overflow-hidden relative group"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=2064&auto=format&fit=crop"
                                    alt="Solo traveler"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </motion.div>
                            <motion.div
                                {...fadeIn}
                                transition={{ delay: 0.4 }}
                                className="flex-1 rounded-2xl overflow-hidden relative group"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2021&auto=format&fit=crop"
                                    alt="Adventure"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats/Mission */}
            <section className="bg-[#2C2C2C] text-[#FAF7F2] py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                        <motion.div {...fadeIn}>
                            <h2 className="text-3xl md:text-4xl font-serif mb-6">Building a global community of explorers</h2>
                            <p className="text-[#FAF7F2]/70 text-lg font-light leading-relaxed mb-8">
                                We believe that travel is the best education. By bringing people together from different cultures and backgrounds, we're not just facilitating trips; we're fostering understanding and global citizenship.
                            </p>
                            <div className="grid grid-cols-2 gap-8">
                                <div>
                                    <h3 className="text-4xl font-serif text-[#C17B5C] mb-2">50k+</h3>
                                    <p className="text-sm text-[#FAF7F2]/50 uppercase tracking-widest">Active Travelers</p>
                                </div>
                                <div>
                                    <h3 className="text-4xl font-serif text-[#C17B5C] mb-2">120+</h3>
                                    <p className="text-sm text-[#FAF7F2]/50 uppercase tracking-widest">Countries Explored</p>
                                </div>
                            </div>
                        </motion.div>
                        <motion.div
                            {...fadeIn}
                            transition={{ delay: 0.2 }}
                            className="relative"
                        >
                            <div className="aspect-square rounded-full border border-[#FAF7F2]/10 p-12 relative flex items-center justify-center">
                                <div className="absolute inset-0 border border-[#FAF7F2]/5 rounded-full animate-[spin_10s_linear_infinite]" />
                                <Globe className="w-32 h-32 text-[#FAF7F2]/20" />
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                                    <span className="block text-2xl font-serif">Boundless</span>
                                    <span className="text-xs uppercase tracking-widest text-[#FAF7F2]/50">Adventures</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Grid */}
            <section className="py-24 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-serif text-[#2C2C2C] mb-4">Why Travel With Us?</h2>
                        <p className="text-[#2C2C2C]/60 text-lg font-light max-w-2xl mx-auto">
                            We're dedicated to making your journey as seamless and enriching as possible.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <motion.div
                                key={value.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white p-8 rounded-2xl border border-[#E8DCC4] hover:border-[#C17B5C] transition-colors group"
                            >
                                <div className="w-12 h-12 bg-[#FAF7F2] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#C17B5C] transition-colors">
                                    <value.icon className="w-6 h-6 text-[#C17B5C] group-hover:text-white transition-colors" />
                                </div>
                                <h3 className="text-xl font-serif text-[#2C2C2C] mb-3">{value.title}</h3>
                                <p className="text-[#2C2C2C]/60 font-light leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-[#E8DCC4]/20">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-6">Ready to start your journey?</h2>
                    <p className="text-xl text-[#2C2C2C]/60 font-light mb-10 max-w-2xl mx-auto">
                        Join thousands of other travelers who have found their perfect travel buddies.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/register">
                            <Button variant="primary" className="px-8 py-4 text-base">Join Now - It's Free</Button>
                        </Link>
                        <Link href="/explore">
                            <Button variant="outline" className="px-8 py-4 text-base bg-white">Explore Plans</Button>
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}
