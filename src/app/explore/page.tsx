"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MapPin } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TravelerCard } from '@/components/TravelerCard';
import { TravelButton as Button } from '@/components/ui/TravelButton';
import api from '@/lib/api';
import { TravelPlanCard } from '@/components/TravelPlanCard';

export default function ExplorePage() {
  const [activeTab, setActiveTab] = useState<'plans' | 'travelers'>('plans');
  const [travelPlans, setTravelPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'plans') {
        const res = await api.get(`/travel-plans?search=${searchTerm}`);
        setTravelPlans(res.data.data.data || []);
      } else {
        // Fetch travelers if endpoint exists
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchData();
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        {/* Header & Search */}
        <div className="max-w-7xl mx-auto mb-12 text-center">
          <motion.h1
            initial={{
              opacity: 0,
              y: 20
            }}
            animate={{
              opacity: 1,
              y: 0
            }}
            className="text-4xl md:text-5xl font-serif text-[#2C2C2C] mb-6">
            Find Your Next Adventure
          </motion.h1>

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
              delay: 0.1
            }}
            className="max-w-2xl mx-auto relative z-10">

            <div className="bg-white p-2 rounded-full shadow-lg flex items-center border border-[#E8DCC4]">
              <div className="pl-4 text-[#2C2C2C]/40">
                <Search className="w-5 h-5" />
              </div>
              <form onSubmit={handleSearch} className="flex-1">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search destination, activity, or date..."
                  className="w-full px-4 py-3 bg-transparent border-none focus:ring-0 text-[#2C2C2C] placeholder:text-[#2C2C2C]/40 outline-none"
                />
              </form>
              <Button variant="primary" className="rounded-full px-8" onClick={handleSearch}>
                Search
              </Button>
            </div>
            {/* Filters */}
            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => setActiveTab('plans')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'plans' ? 'bg-[#2C2C2C] text-[#FAF7F2]' : 'bg-white border border-[#E8DCC4] text-[#2C2C2C]/70 hover:bg-[#FAF7F2]'}`}>
                Travel Plans
              </button>
              <button
                onClick={() => setActiveTab('travelers')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'travelers' ? 'bg-[#2C2C2C] text-[#FAF7F2]' : 'bg-white border border-[#E8DCC4] text-[#2C2C2C]/70 hover:bg-[#FAF7F2]'}`}>
                Travelers
              </button>
              <button className="px-4 py-2 rounded-full bg-white border border-[#E8DCC4] text-[#2C2C2C]/70 hover:bg-[#FAF7F2] flex items-center gap-2 text-sm">
                <Filter className="w-4 h-4" /> Filters
              </button>
            </div>
          </motion.div>
        </div>

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">Loading...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {activeTab === 'plans' ?
                travelPlans.map((plan: any, i) => (
                  <TravelPlanCard
                    key={plan.id}
                    id={plan.id}
                    destination={plan.destination}
                    image={plan?.image || "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000&auto=format&fit=crop"} // Fallback image
                    startDate={plan.startDate ? new Date(plan.startDate).toLocaleDateString() : 'TBD'}
                    endDate={plan.endDate ? new Date(plan.endDate).toLocaleDateString() : 'TBD'}
                    budget={`$${plan.budgetMin || 0} - $${plan.budgetMax || 0}`}
                    type={plan.travelType || 'Friends'}
                    hostName={"Host"}
                    hostImage={undefined}
                    delay={i * 0.1}
                  />
                )) :
                <div className="col-span-3 text-center text-gray-500">Traveler search coming soon!</div>
              }
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>);
}