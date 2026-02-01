"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { TravelerCard } from './TravelerCard';
import { travelService } from '@/services/travel.service';
import { userService } from '@/services/user.service';
import { followService } from '@/services/follow.service';
import { useAuth } from '@/context/AuthContext';

export function TopTravelers() {
  const [travelers, setTravelers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [followingIds, setFollowingIds] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  useEffect(() => {

    const fetchData = async () => {
      try {
        setLoading(true);
        // 1. Fetch all users directly
        const usersResponse = await userService.getAllUsers();
        // data.data.data based on typical response structure seen in other files
        const allUsers = usersResponse.data.data?.data || usersResponse.data.data || [];

        // Filter out myself
        const uniqueUsers = allUsers.filter((u: any) => u.id !== user?.id);

        // 2. Fetch my following list if logged in
        if (user) {
          try {
            const followingResponse = await followService.getFollowing(); // Fixed method name from getMyFollowing
            const followingData = followingResponse.data.data || followingResponse.data || [];

            const ids = new Set<string>();
            followingData.forEach((item: any) => {
              if (item.followingId) ids.add(item.followingId);
            });
            setFollowingIds(ids);
          } catch (err) {
            console.error("Failed to fetch following list", err);
          }
        }


        const mappedTravelers = uniqueUsers.slice(0, 4).map((user: any) => ({
          id: user.id || user._id,
          name: user.name || 'Traveler',
          // Handle both profilePicture (from DB) and image (from some APIs)
          image: user.profilePicture || user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name || 'T')}&background=random`,
          // Handle various location fields
          location: user.country || user.city || user.address || 'Global Citizen',
          rating: 5.0,
          reviewCount: 1,
          interests: user.interests || ['Travel', 'Adventure'],
          countriesVisited: 1 // Default
        }));

        setTravelers(mappedTravelers);
      } catch (error) {
        console.error("Failed to fetch top travelers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  const handleFollowToggle = async (targetId: string) => {
    // This function is passed to the card. The card handles the UI state.
    // But we should update our local state too ideally, though not strictly required if card manages its own state.
    // Getting the current state from the set:
    const isFollowing = followingIds.has(targetId);
    try {
      if (isFollowing) {
        await followService.unfollowUser(targetId);
        const newSet = new Set(followingIds);
        newSet.delete(targetId);
        setFollowingIds(newSet);
      } else {
        await followService.followUser(targetId);
        const newSet = new Set(followingIds);
        newSet.add(targetId);
        setFollowingIds(newSet);
      }
    } catch (error) {
      console.error("Follow toggle failed", error);
      throw error; // Let card handle error display if needed
    }
  };


  if (loading) {
    return (
      <section className="py-24 px-6 bg-[#E8DCC4]/10 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C17B5C]"></div>
      </section>
    )
  }

  // If no travelers found, return null (hide section)
  if (travelers.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-[#E8DCC4]/10">
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
            Meet Top Travelers
          </h2>
          <p className="text-[#2C2C2C]/60 max-w-xl mx-auto font-light">
            Connect with experienced explorers who are ready for their next
            adventure.
          </p>
        </motion.div>


        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {travelers.map((traveler, index) =>
            <TravelerCard
              key={traveler.id}
              {...traveler}
              delay={index * 0.1}
              isFollowing={followingIds.has(traveler.id)}
              onFollowToggle={handleFollowToggle}
            />
          )}
        </div>
      </div>
    </section>);
}