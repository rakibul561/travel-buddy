"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar,
  Wallet,
  Users,
  MapPin,
  Share2,
  ArrowLeft
} from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TravelButton as Button } from '@/components/ui/TravelButton';
import api from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function TravelPlanDetailPage() {
  const params = useParams();
  const id = params?.id;
  const router = useRouter();
  const { user } = useAuth();

  const [plan, setPlan] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sendingRequest, setSendingRequest] = useState(false);
  const [requestSent, setRequestSent] = useState(false);

  useEffect(() => {
    if (id) {
      fetchPlanDetails();
    }
  }, [id]);

  const fetchPlanDetails = async () => {
    try {
      const res = await api.get(`/travel-plans/${id}`);
      setPlan(res.data.data);
    } catch (error) {
      console.error("Error fetching plan:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRequest = async () => {
    if (!user) {
      router.push('/login');
      return;
    }
    setSendingRequest(true);
    try {
      // Check backend endpoint for join request
      await api.post('/join-requests', { travelPlanId: id });
      setRequestSent(true);
    } catch (error) {
      console.error("Error sending join request:", error);
      alert("Failed to send join request. You might have already sent one.");
    } finally {
      setSendingRequest(false);
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!plan) return <div className="min-h-screen flex items-center justify-center">Plan not found</div>;

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main className="pt-24 pb-24">
        {/* Hero Image */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-10" />
          <img
            src={plan.image || "https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000&auto=format&fit=crop"}
            alt={plan.destination}
            className="w-full h-full object-cover" />

          <div className="absolute top-8 left-6 z-20">
            <Link
              href="/travel-plans"
              className="inline-flex items-center text-white hover:text-[#E8DCC4] transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">

              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Plans
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 bg-gradient-to-t from-black/80 to-transparent">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block px-3 py-1 bg-[#C17B5C] text-white text-xs font-medium rounded-full uppercase tracking-wider mb-4">
                {plan.travelType} Trip
              </span>
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
                Trip to {plan.destination}
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <span className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" /> {plan.destination}
                </span>
                <span className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" /> {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              <section>
                <h2 className="text-2xl font-serif text-[#2C2C2C] mb-6">
                  About the Trip
                </h2>
                <p className="text-[#2C2C2C]/70 leading-relaxed font-light mb-6 text-lg">
                  {plan.description || "No description provided."}
                </p>
              </section>

              {/* Itinerary Section - Assuming dynamic or fallback */}
              {/* If plan has itinerary, map it. Otherwise static or hidden */}

            </div>

            <div className="space-y-8">
              {/* Host Card */}
              <div className="bg-white p-6 rounded-xl border border-[#E8DCC4] shadow-sm">
                <h3 className="text-sm font-medium uppercase tracking-wider text-[#2C2C2C]/50 mb-4">
                  Trip Host
                </h3>
                <div className="flex items-center space-x-4 mb-6">
                  {/* Host info might need to be fetched deeply or is in plan object */}
                  {/* Assuming plan.user or plan.host exists */}
                  <img
                    src={plan.user?.profilePicture || "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"}
                    alt={plan.user?.name || "Host"}
                    className="w-16 h-16 rounded-full object-cover border border-[#E8DCC4]" />

                  <div>
                    <h4 className="font-serif text-lg text-[#2C2C2C]">
                      {plan.user?.name || "Host"}
                    </h4>
                    {/* <p className="text-sm text-[#2C2C2C]/60">Location</p> */}
                  </div>
                </div>
                {/* <Link href={`/profile/${plan.userId}`}>
                  <Button variant="outline" className="w-full text-xs">
                    View Profile
                  </Button>
                </Link> */}
              </div>

              {/* Trip Details Card */}
              <div className="bg-[#FAF7F2] p-6 rounded-xl border border-[#E8DCC4]">
                <h3 className="text-sm font-medium uppercase tracking-wider text-[#2C2C2C]/50 mb-4">
                  Trip Details
                </h3>
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center pb-3 border-b border-[#E8DCC4]/50">
                    <div className="flex items-center text-[#2C2C2C]/70">
                      <Wallet className="w-4 h-4 mr-3" /> Budget
                    </div>
                    <span className="font-medium text-[#2C2C2C]">
                      ${plan.budgetMin} - ${plan.budgetMax}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#E8DCC4]/50">
                    <div className="flex items-center text-[#2C2C2C]/70">
                      <Users className="w-4 h-4 mr-3" /> Companions
                    </div>
                    <span className="font-medium text-[#2C2C2C]">
                      Looking for travel buddies
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#E8DCC4]/50">
                    <div className="flex items-center text-[#2C2C2C]/70">
                      <Calendar className="w-4 h-4 mr-3" /> Duration
                    </div>
                    <span className="font-medium text-[#2C2C2C]">
                      {Math.ceil((new Date(plan.endDate).getTime() - new Date(plan.startDate).getTime()) / (1000 * 60 * 60 * 24))} Days
                    </span>
                  </div>
                </div>

                {!requestSent ? (
                  <Button
                    variant="primary"
                    className="w-full mb-3"
                    onClick={handleJoinRequest}
                    disabled={sendingRequest || (user && user.id === plan.userId) || false}
                  >
                    {sendingRequest ? 'Sending...' : (user && user.id === plan.userId) ? 'Your Plan' : 'Request to Join'}
                  </Button>
                ) : (
                  <div className="w-full mb-3 p-3 bg-green-100 text-green-700 text-center rounded-lg">
                    Request Sent!
                  </div>
                )}

                <button className="w-full py-3 flex items-center justify-center text-sm font-medium text-[#2C2C2C]/60 hover:text-[#C17B5C] transition-colors">
                  <Share2 className="w-4 h-4 mr-2" /> Share Trip
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>);

}