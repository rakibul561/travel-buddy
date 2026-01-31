"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, MessageSquare, Heart } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TravelButton as Button } from '@/components/ui/TravelButton';
import { TravelPlanCard } from '@/components/TravelPlanCard';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [myTrips, setMyTrips] = useState<any[]>([]);
  const [joinRequests, setJoinRequests] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/login');
        return;
      }
      fetchDashboardData();
    }
  }, [authLoading, user, router]);

  const fetchDashboardData = async () => {
    try {
      // Fetch my travel plans
      const tripsRes = await api.get('/travel-plans/my');
      // Fetch requests (assuming an endpoint or we can skip for now if not ready)
      // const requestsRes = await api.get('/join-requests/my-requests'); 

      setMyTrips(tripsRes.data.data || []);
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || authLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <motion.div
              initial={{
                opacity: 0,
                x: -20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.6
              }}>

              <h1 className="text-4xl font-serif text-[#2C2C2C] mb-2">
                Hello, {user?.name}
              </h1>
              <p className="text-[#2C2C2C]/60 font-light">
                Ready for your next adventure?
              </p>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 20
              }}
              animate={{
                opacity: 1,
                x: 0
              }}
              transition={{
                duration: 0.6
              }}
              className="flex gap-4 mt-6 md:mt-0">

              <Button variant="outline">Find Buddies</Button>
              <Button variant="primary" className="flex items-center gap-2">
                <Plus className="w-4 h-4" /> Create Plan
              </Button>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Calendar,
                label: 'Upcoming Trips',
                value: myTrips.length.toString(),
                color: 'text-[#8B9D83]'
              },
              {
                icon: MessageSquare,
                label: 'New Messages',
                value: '0', // Placeholder
                color: 'text-[#C17B5C]'
              },
              {
                icon: Heart,
                label: 'Saved Plans',
                value: '0', // Placeholder
                color: 'text-red-400'
              }].
              map((stat, i) =>
                <motion.div
                  key={i}
                  initial={{
                    opacity: 0,
                    y: 20
                  }}
                  animate={{
                    opacity: 1,
                    y: 0
                  }}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.1
                  }}
                  className="bg-white p-6 rounded-xl border border-[#E8DCC4] flex items-center justify-between">

                  <div>
                    <p className="text-[#2C2C2C]/60 text-sm font-medium uppercase tracking-wider mb-1">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-serif font-bold text-[#2C2C2C]">
                      {stat.value}
                    </p>
                  </div>
                  <div className={`p-4 rounded-full bg-[#FAF7F2] ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </motion.div>
              )}
          </div>

          <div className="mb-12">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-[#2C2C2C]">
                Your Travel Plans
              </h2>
              <a
                href="#"
                className="text-[#C17B5C] text-sm font-medium hover:underline">

                View All
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myTrips.length > 0 ? (
                myTrips.map((plan: any, i: number) => (
                  <TravelPlanCard
                    key={plan.id}
                    id={plan.id}
                    destination={plan.destination}
                    image={plan.image || "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000&auto=format&fit=crop"} // Fallback image
                    startDate={new Date(plan.startDate).toLocaleDateString()}
                    endDate={new Date(plan.endDate).toLocaleDateString()}
                    budget={`$${plan.budgetMin} - $${plan.budgetMax}`}
                    type={plan.travelType}
                    hostName={user?.name || "Me"}
                    hostImage={user?.profilePicture || ""}
                  />
                ))
              ) : null}

              {/* Add placeholder for empty state or more cards */}
              <div className="border-2 border-dashed border-[#E8DCC4] rounded-xl flex flex-col items-center justify-center p-8 text-center bg-[#FAF7F2]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer min-h-[400px]">
                <div className="w-16 h-16 rounded-full bg-[#E8DCC4]/30 flex items-center justify-center mb-4 text-[#8B9D83]">
                  <Plus className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-serif text-[#2C2C2C] mb-2">
                  Plan a New Trip
                </h3>
                <p className="text-[#2C2C2C]/50 text-sm max-w-xs">
                  Start planning your next adventure and invite others to join
                  you.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>);

}