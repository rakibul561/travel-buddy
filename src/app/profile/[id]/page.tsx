"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Globe, Star, Edit2, Share2 } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TravelButton as Button } from '@/components/ui/TravelButton';
import { ReviewCard } from '@/components/ReviewCard';
export default function ProfilePage() {
  const params = useParams();
  const id = params?.id;
  const isOwnProfile = !id || id === 'me';
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-5xl mx-auto">
          {/* Profile Header */}
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
              duration: 0.6
            }}
            className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-[#E8DCC4] mb-8 relative overflow-hidden">

            <div className="absolute top-0 left-0 w-full h-32 bg-[#E8DCC4]/30" />

            <div className="relative flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
              <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-200 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
                  alt="Profile"
                  className="w-full h-full object-cover" />

              </div>

              <div className="flex-1 pt-2">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-serif text-[#2C2C2C] mb-2">
                      Elena Rodriguez
                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm text-[#2C2C2C]/60">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" /> Madrid, Spain
                      </span>
                      <span className="flex items-center">
                        <Globe className="w-4 h-4 mr-1" /> 12 Countries Visited
                      </span>
                      <span className="flex items-center text-[#C17B5C] font-medium">
                        <Star className="w-4 h-4 mr-1 fill-current" /> 4.9 (24
                        Reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    {isOwnProfile ?
                      <Button
                        variant="outline"
                        className="flex items-center gap-2">

                        <Edit2 className="w-4 h-4" /> Edit Profile
                      </Button> :

                      <Button variant="primary">Connect</Button>
                    }
                    <button className="p-3 rounded-full border border-[#E8DCC4] hover:bg-[#FAF7F2] transition-colors text-[#2C2C2C]/60">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="md:col-span-2 space-y-8">
                <section>
                  <h2 className="text-xl font-serif text-[#2C2C2C] mb-4">
                    About Me
                  </h2>
                  <p className="text-[#2C2C2C]/70 leading-relaxed font-light">
                    Hi! I'm an art historian and avid traveler. I love exploring
                    ancient ruins, trying local street food, and capturing
                    moments through my camera lens. Looking for travel buddies
                    who enjoy a mix of cultural exploration and relaxation. I
                    speak English, Spanish, and a bit of French.
                  </p>
                </section>

                <section>
                  <h2 className="text-xl font-serif text-[#2C2C2C] mb-4">
                    Travel Interests
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {[
                      'Photography',
                      'Hiking',
                      'Food Tours',
                      'Museums',
                      'Architecture',
                      'Nature'].
                      map((tag) =>
                        <span
                          key={tag}
                          className="px-3 py-1 bg-[#FAF7F2] border border-[#E8DCC4] rounded-full text-sm text-[#2C2C2C]/70">

                          {tag}
                        </span>
                      )}
                  </div>
                </section>

                <section>
                  <h2 className="text-xl font-serif text-[#2C2C2C] mb-4">
                    Reviews
                  </h2>
                  <div className="space-y-4">
                    <ReviewCard
                      reviewerName="Sarah Jenkins"
                      reviewerImage="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop"
                      rating={5}
                      date="Oct 2023"
                      text="Elena was the perfect travel companion! We had so much fun exploring Kyoto together."
                      tripDestination="Japan" />

                  </div>
                </section>
              </div>

              <div className="space-y-8">
                <section className="bg-[#FAF7F2] p-6 rounded-xl border border-[#E8DCC4]/50">
                  <h3 className="font-serif text-lg mb-4">Upcoming Plans</h3>
                  <div className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-[#E8DCC4]/50 hover:border-[#C17B5C]/50 transition-colors cursor-pointer group">
                      <div className="flex justify-between items-start mb-2">
                        <span className="font-medium text-[#2C2C2C] group-hover:text-[#C17B5C] transition-colors">
                          Peru Expedition
                        </span>
                        <span className="text-xs bg-[#8B9D83]/10 text-[#8B9D83] px-2 py-0.5 rounded">
                          Upcoming
                        </span>
                      </div>
                      <div className="flex items-center text-xs text-[#2C2C2C]/60 mb-1">
                        <Calendar className="w-3 h-3 mr-1" /> May 15 - May 28
                      </div>
                      <div className="flex items-center text-xs text-[#2C2C2C]/60">
                        <MapPin className="w-3 h-3 mr-1" /> Cusco, Peru
                      </div>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-4 text-xs">
                    View All Plans
                  </Button>
                </section>

                <section>
                  <h3 className="font-serif text-lg mb-4">Visited Countries</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {[...Array(8)].map((_, i) =>
                      <div
                        key={i}
                        className="aspect-square bg-[#E8DCC4] rounded-md overflow-hidden relative group cursor-help">

                        <img
                          src={`https://flagcdn.com/w80/${['es', 'fr', 'it', 'jp', 'ma', 'gr', 'th', 'vn'][i]}.png`}
                          alt="Flag"
                          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />

                      </div>
                    )}
                    <div className="aspect-square bg-[#FAF7F2] border border-[#E8DCC4] rounded-md flex items-center justify-center text-xs text-[#2C2C2C]/50">
                      +4
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>);

}