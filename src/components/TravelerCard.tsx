
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Globe, UserPlus, UserCheck } from 'lucide-react';
import { TravelButton as Button } from './ui/TravelButton';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface TravelerCardProps {
  id: string;
  name: string;
  image: string;
  location: string;
  rating: number;
  reviewCount: number;
  interests: string[];
  countriesVisited: number;
  delay?: number;
  isFollowing?: boolean;
  onFollowToggle?: (id: string) => Promise<void>;
}

export function TravelerCard({
  id,
  name,
  image,
  location,
  rating,
  reviewCount,
  interests,
  countriesVisited,
  delay = 0,
  isFollowing = false,
  onFollowToggle
}: TravelerCardProps) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [followed, setFollowed] = useState(isFollowing);

  // Sync internal state if prop changes (optional, but good for reliable updates)
  React.useEffect(() => {
    setFollowed(isFollowing);
  }, [isFollowing]);

  const handleConnect = async () => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!onFollowToggle) return;

    try {
      setLoading(true);
      await onFollowToggle(id);
      setFollowed(!followed);
    } catch (error) {
      console.error('Error toggling follow:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
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
        duration: 0.5,
        delay,
        ease: 'easeOut'
      }}
      className="bg-white rounded-xl overflow-hidden shadow-sm border border-[#E8DCC4]/30 hover:shadow-md hover:border-[#C17B5C]/30 transition-all duration-300 group">

      <div className="relative h-48 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10" />
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />

        <div className="absolute bottom-4 left-4 z-20 text-white">
          <h3 className="text-xl font-serif font-semibold">{name}</h3>
          <div className="flex items-center text-xs opacity-90 mt-1">
            <MapPin size={12} className="mr-1" />
            {location}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="font-medium text-[#2C2C2C]">{rating}</span>
            <span className="text-xs text-[#2C2C2C]/50">({reviewCount})</span>
          </div>
          <div className="flex items-center text-[#8B9D83] text-sm font-medium">
            <Globe className="w-4 h-4 mr-1" />
            {countriesVisited} Countries
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {interests.slice(0, 3).map((interest) =>
            <span
              key={interest}
              className="px-2 py-1 bg-[#FAF7F2] text-[#2C2C2C]/70 text-xs rounded-md border border-[#E8DCC4]">

              {interest}
            </span>
          )}
          {interests.length > 3 &&
            <span className="px-2 py-1 bg-[#FAF7F2] text-[#2C2C2C]/50 text-xs rounded-md border border-[#E8DCC4]">
              +{interests.length - 3}
            </span>
          }
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Link href={`/profile/${id}`} className="w-full">
            <Button variant="outline" className="w-full text-xs py-2 px-0">
              View Profile
            </Button>
          </Link>
          <Button
            variant={followed ? 'outline' : 'primary'}
            className={`w-full text-xs py-2 px-0 flex items-center justify-center gap-1 ${followed ? 'bg-gray-100 text-gray-700 border-gray-300' : ''}`}
            onClick={handleConnect}
            disabled={loading}
          >
            {loading ? (
              <span className="w-3 h-3 border-2 border-current border-t-transparent rounded-full animate-spin" />
            ) : followed ? (
              <>
                <UserCheck size={14} /> Following
              </>
            ) : (
              <>
                <UserPlus size={14} /> Connect
              </>
            )}
          </Button>
        </div>
      </div>
    </motion.div>);
}