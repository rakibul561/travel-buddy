"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Calendar, MessageSquare, Heart } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { TravelButton as Button } from '@/components/ui/TravelButton';
import { TravelPlanCard } from '@/components/TravelPlanCard';
import { Sidebar } from '@/components/Sidebar';
import { CreateTravelModal } from '@/components/CreateTravelModal';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import { travelService } from '@/services/travel.service';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [myTrips, setMyTrips] = useState<any[]>([]);
  const [matchedTravelers, setMatchedTravelers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

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
      const tripsRes = await travelService.getMyTravelPlans();
      setMyTrips(tripsRes.data.data || []);

      // Mock matched travelers for now as endpoint might not exist
      setMatchedTravelers([
        { id: '1', name: 'Sarah J.', destination: 'Bali', matchPercent: 95 },
        { id: '2', name: 'Mike T.', destination: 'Japan', matchPercent: 88 }
      ]);

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
      {/* Mobile Navbar (visible only on mobile) */}
      <div className="md:hidden">
        <Navbar />
      </div>

      <Sidebar />

      <main className="md:pl-64 min-h-screen transition-all duration-300">
        <div className="p-6 md:p-12 max-w-7xl mx-auto pt-24 md:pt-12">

          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl font-serif text-[#2C2C2C] mb-2">
                Hello, {user?.name}
              </h1>
              <p className="text-[#2C2C2C]/60 font-light">
                Ready for your next adventure?
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex gap-4 mt-6 md:mt-0"
            >
              <Button variant="outline">Find Buddies</Button>
              <Button
                variant="primary"
                className="flex items-center gap-2"
                onClick={() => setIsCreateModalOpen(true)}
              >
                <Plus className="w-4 h-4" /> Create Plan
              </Button>
            </motion.div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {[
              { icon: Calendar, label: 'Upcoming Trips', value: myTrips.length.toString(), color: 'text-[#8B9D83]' },
              { icon: MessageSquare, label: 'New Messages', value: '3', color: 'text-[#C17B5C]' },
              { icon: Heart, label: 'Saved Plans', value: '5', color: 'text-red-400' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="bg-white p-6 rounded-xl border border-[#E8DCC4] flex items-center justify-between shadow-sm hover:shadow-md transition-shadow"
              >
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
            ))}
          </div>

          {/* Content Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">

            {/* Travel Plans Column (Takes up 2/3) */}
            <div className="lg:col-span-2 space-y-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-[#2C2C2C]">Your Travel Plans</h2>
                <a href="/travel-plans" className="text-[#C17B5C] text-sm font-medium hover:underline">View All</a>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {myTrips.length > 0 ? (
                  myTrips.map((plan: any) => (
                    <TravelPlanCard
                      key={plan.id}
                      id={plan.id}
                      destination={plan.destination}
                      image={plan.image || "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop"} // Better default
                      startDate={new Date(plan.startDate).toLocaleDateString()}
                      endDate={new Date(plan.endDate).toLocaleDateString()}
                      budget={`$${plan.budgetMin} - $${plan.budgetMax}`}
                      type={plan.travelType}
                      hostName={user?.name || "Me"}
                      hostImage={user?.profilePicture || ""}
                    />
                  ))
                ) : null}

                {/* Create New Card */}
                <div
                  onClick={() => setIsCreateModalOpen(true)}
                  className="border-2 border-dashed border-[#E8DCC4] rounded-xl flex flex-col items-center justify-center p-8 text-center bg-[#FAF7F2]/50 hover:bg-[#FAF7F2] transition-colors cursor-pointer min-h-[300px] h-full"
                >
                  <div className="w-16 h-16 rounded-full bg-[#E8DCC4]/30 flex items-center justify-center mb-4 text-[#8B9D83]">
                    <Plus className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-serif text-[#2C2C2C] mb-2">Plan a New Trip</h3>
                  <p className="text-[#2C2C2C]/50 text-sm max-w-xs">
                    Start planning your next adventure and invite others to join.
                  </p>
                </div>
              </div>
            </div>

            {/* Matched Travelers Column (Takes up 1/3) */}
            <div className="space-y-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-serif text-[#2C2C2C]">Matched Travelers</h2>
                <a href="/explore" className="text-[#C17B5C] text-sm font-medium hover:underline">Explore</a>
              </div>

              <div className="space-y-4">
                {matchedTravelers.map((match, i) => (
                  <div key={i} className="bg-white p-4 rounded-xl border border-[#E8DCC4] flex items-center gap-4 hover:shadow-md transition-all">
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex-shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-medium text-[#2C2C2C]">{match.name}</h4>
                      <p className="text-xs text-[#2C2C2C]/60">Going to {match.destination}</p>
                    </div>
                    <span className="text-xs font-bold text-[#8B9D83] bg-[#8B9D83]/10 px-2 py-1 rounded-full">
                      {match.matchPercent}% Match
                    </span>
                  </div>
                ))}

                {matchedTravelers.length === 0 && (
                  <div className="text-center py-8 text-[#2C2C2C]/50 italic">
                    No matches found yet.
                  </div>
                )}
              </div>

              <div className="bg-[#C17B5C]/10 p-6 rounded-xl border border-[#C17B5C]/20 mt-6">
                <h3 className="font-serif text-lg text-[#C17B5C] mb-2">Complete your profile</h3>
                <p className="text-sm text-[#2C2C2C]/70 mb-4">Add more details to get better matches.</p>
                <Button variant="outline" className="w-full text-xs py-2 h-auto border-[#C17B5C] text-[#C17B5C] hover:bg-[#C17B5C] hover:text-white">
                  Edit Profile
                </Button>
              </div>
            </div>

          </div>
        </div>
      </main>

      <CreateTravelModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchDashboardData}
      />
    </div>
  );
}