import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin } from 'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { TravelerCard } from '../components/TravelerCard';
import { Button } from '../components/ui/Button';
export function ExplorePage() {
  const [activeTab, setActiveTab] = useState<'travelers' | 'plans'>('travelers');
  const travelers = [
  {
    id: '1',
    name: 'Elena Rodriguez',
    image:
    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop',
    location: 'Madrid, Spain',
    rating: 4.9,
    reviewCount: 24,
    interests: ['Photography', 'Hiking', 'Food'],
    countriesVisited: 12
  },
  {
    id: '2',
    name: 'James Chen',
    image:
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    location: 'Vancouver, Canada',
    rating: 4.8,
    reviewCount: 18,
    interests: ['Adventure', 'Skiing', 'Nature'],
    countriesVisited: 8
  },
  {
    id: '3',
    name: 'Sofia Andersson',
    image:
    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
    location: 'Stockholm, Sweden',
    rating: 5.0,
    reviewCount: 32,
    interests: ['Art', 'History', 'Museums'],
    countriesVisited: 25
  },
  {
    id: '4',
    name: 'Marcus Johnson',
    image:
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    location: 'Cape Town, SA',
    rating: 4.7,
    reviewCount: 15,
    interests: ['Surfing', 'Music', 'Road Trips'],
    countriesVisited: 6
  },
  {
    id: '5',
    name: 'Amara Okafor',
    image:
    'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=400&auto=format&fit=crop',
    location: 'Lagos, Nigeria',
    rating: 4.9,
    reviewCount: 21,
    interests: ['Culture', 'Fashion', 'Food'],
    countriesVisited: 14
  },
  {
    id: '6',
    name: "Liam O'Connor",
    image:
    'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=400&auto=format&fit=crop',
    location: 'Dublin, Ireland',
    rating: 4.6,
    reviewCount: 12,
    interests: ['Pubs', 'History', 'Hiking'],
    countriesVisited: 9
  }];

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <h1 className="text-4xl font-serif text-[#2C2C2C] mb-4">
                Explore
              </h1>
              <p className="text-[#2C2C2C]/60 font-light max-w-xl">
                Find compatible travel buddies or join existing travel plans.
              </p>
            </div>

            <div className="flex space-x-4 mt-6 md:mt-0">
              <button
                onClick={() => setActiveTab('travelers')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'travelers' ? 'bg-[#8B9D83] text-white shadow-md' : 'bg-white text-[#2C2C2C]/60 hover:bg-[#E8DCC4]/30'}`}>

                Travelers
              </button>
              <button
                onClick={() => setActiveTab('plans')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'plans' ? 'bg-[#8B9D83] text-white shadow-md' : 'bg-white text-[#2C2C2C]/60 hover:bg-[#E8DCC4]/30'}`}>

                Travel Plans
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8DCC4] mb-12 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2C2C2C]/40 w-5 h-5" />
              <input
                type="text"
                placeholder="Search by destination or interest..."
                className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] rounded-lg border-none focus:ring-1 focus:ring-[#8B9D83] outline-none" />

            </div>
            <div className="flex gap-4">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#2C2C2C]/40 w-4 h-4" />
                <select className="pl-9 pr-8 py-2 bg-[#FAF7F2] rounded-lg border-none focus:ring-1 focus:ring-[#8B9D83] outline-none appearance-none cursor-pointer text-sm text-[#2C2C2C]/80">
                  <option>Any Location</option>
                  <option>Europe</option>
                  <option>Asia</option>
                  <option>Americas</option>
                </select>
              </div>
              <Button
                variant="outline"
                className="px-4 py-2 h-full flex items-center gap-2">

                <Filter className="w-4 h-4" /> Filters
              </Button>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {travelers.map((traveler, index) =>
            <TravelerCard
              key={traveler.id}
              {...traveler}
              delay={index * 0.05} />

            )}
          </div>

          <div className="mt-12 flex justify-center">
            <Button variant="outline">Load More Results</Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>);

}