
"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Globe, Star, Edit2, Share2, UserPlus, UserCheck, Users } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TravelButton as Button } from '@/components/ui/TravelButton';
import { ReviewCard } from '@/components/ReviewCard';
import { followService } from '@/services/follow.service';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/user.service';

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { user, isAuthenticated } = useAuth();

  const [profileData, setProfileData] = useState<any>(null);
  const [followStats, setFollowStats] = useState({ followers: 0, following: 0 });
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(false);

  const isOwnProfile = isAuthenticated && (id === 'me' || id === user?.id);
  const profileId = isOwnProfile ? user?.id : id;

  useEffect(() => {

    const fetchProfileData = async () => {
      if (!profileId) return;

      try {
        setLoading(true);

        // 1. Fetch User Data
        const userRes = await userService.getUserById(profileId);
        const userData = userRes.data.data?.data || userRes.data.data || userRes.data;
        setProfileData(userData);

        // 2. Fetch Follow Status (if logged in and not own profile)
        if (isAuthenticated && user && !isOwnProfile) {
          try {
            const followingRes = await followService.getFollowing();
            const followingList = followingRes.data.data || [];
            // Check if this profileId is in my following list
            // API response structure: [ { id: "...", followingId: "targetId", ... } ]
            const isF = followingList.some((f: any) => f.followingId === profileId);
            setIsFollowing(isF);
          } catch (err) {
            console.error("Failed to check follow status", err);
          }
        }

        // Mock stats for now as backend doesn't provide them
        setFollowStats({ followers: 12, following: 34 });

      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [profileId, user]);

  const handleConnect = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!profileId) return;

    try {
      setActionLoading(true);
      if (isFollowing) {
        await followService.unfollowUser(profileId);
        setIsFollowing(false);
        setFollowStats(prev => ({ ...prev, followers: Math.max(0, prev.followers - 1) }));
      } else {
        await followService.followUser(profileId);
        setIsFollowing(true);
        setFollowStats(prev => ({ ...prev, followers: prev.followers + 1 }));
      }
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    } finally {
      setActionLoading(false);
    }
  };

  // Fallback for display
  const displayName = profileData?.name || 'Traveler';
  const displayImage = profileData?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(displayName)}&background=random`;
  const displayLocation = profileData?.address || 'Global Citizen';

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
                  src={displayImage}
                  alt="Profile"
                  className="w-full h-full object-cover" />
              </div>

              <div className="flex-1 pt-2 w-full">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h1 className="text-3xl font-serif text-[#2C2C2C] mb-2">
                      {displayName}
                    </h1>
                    <div className="flex flex-wrap gap-4 text-sm text-[#2C2C2C]/60 mb-2">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" /> {displayLocation}
                      </span>
                      <span className="flex items-center">
                        <Globe className="w-4 h-4 mr-1" /> 12 Countries Visited
                      </span>
                    </div>
                    {/* Follower Stats */}
                    <div className="flex items-center gap-4 text-sm font-medium">
                      <span className="flex items-center text-[#2C2C2C]">
                        <Users className="w-4 h-4 mr-1 text-[#C17B5C]" />
                        <strong>{followStats.followers}</strong>&nbsp;Followers
                      </span>
                      <span className="text-[#2C2C2C]">
                        <strong>{followStats.following}</strong>&nbsp;Following
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
                      <Button
                        variant={isFollowing ? 'outline' : 'primary'}
                        onClick={handleConnect}
                        disabled={actionLoading}
                        className="min-w-[120px]"
                      >
                        {actionLoading ? (
                          <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto" />
                        ) : isFollowing ? (
                          <>
                            <UserCheck className="w-4 h-4 mr-2" /> Following
                          </>
                        ) : (
                          <>
                            <UserPlus className="w-4 h-4 mr-2" /> Connect
                          </>
                        )}
                      </Button>
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
                    {profileData?.bio || "Hi! I'm an avid traveler. I love exploring new places and meeting new people."}
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