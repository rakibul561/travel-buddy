import React from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Calendar,
  Wallet,
  Users,
  MapPin,
  Share2,
  ArrowLeft } from
'lucide-react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
export function TravelPlanDetailPage() {
  const { id } = useParams();
  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main className="pt-24 pb-24">
        {/* Hero Image */}
        <div className="relative h-[60vh] w-full overflow-hidden">
          <div className="absolute inset-0 bg-black/20 z-10" />
          <img
            src="https://images.unsplash.com/photo-1526392060635-9d6019884377?q=80&w=1000&auto=format&fit=crop"
            alt="Machu Picchu"
            className="w-full h-full object-cover" />

          <div className="absolute top-8 left-6 z-20">
            <Link
              to="/travel-plans"
              className="inline-flex items-center text-white hover:text-[#E8DCC4] transition-colors bg-black/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">

              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Plans
            </Link>
          </div>
          <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 z-20 bg-gradient-to-t from-black/80 to-transparent">
            <div className="max-w-7xl mx-auto">
              <span className="inline-block px-3 py-1 bg-[#C17B5C] text-white text-xs font-medium rounded-full uppercase tracking-wider mb-4">
                Friends Trip
              </span>
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-4">
                Machu Picchu Expedition
              </h1>
              <div className="flex flex-wrap gap-6 text-white/90">
                <span className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2" /> Cusco, Peru
                </span>
                <span className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2" /> May 15 - May 28, 2024
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
                  I'm planning a 2-week trip to Peru with the main goal of
                  hiking the Inca Trail to Machu Picchu. I've already booked the
                  permits for the 4-day trek. The rest of the time will be spent
                  exploring Cusco, the Sacred Valley, and maybe a quick trip to
                  the Amazon rainforest if time permits.
                </p>
                <p className="text-[#2C2C2C]/70 leading-relaxed font-light text-lg">
                  Looking for 2-3 fun, adventurous companions who enjoy hiking
                  and don't mind early mornings. We'll be staying in a mix of
                  hostels and mid-range hotels.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-serif text-[#2C2C2C] mb-6">
                  Itinerary Highlights
                </h2>
                <div className="space-y-6 border-l border-[#E8DCC4] pl-8 ml-4">
                  {[
                  {
                    day: 'Day 1-3',
                    title: 'Acclimatization in Cusco',
                    desc: 'Exploring the city, local markets, and nearby ruins.'
                  },
                  {
                    day: 'Day 4',
                    title: 'Sacred Valley Tour',
                    desc: 'Pisac market and Ollantaytambo fortress.'
                  },
                  {
                    day: 'Day 5-8',
                    title: 'Inca Trail Trek',
                    desc: 'The main event! 4 days of hiking to Machu Picchu.'
                  },
                  {
                    day: 'Day 9-10',
                    title: 'Recovery & Relaxation',
                    desc: 'Hot springs and leisure time.'
                  },
                  {
                    day: 'Day 11-14',
                    title: 'Amazon Jungle (Optional)',
                    desc: 'Wildlife spotting and lodge stay.'
                  }].
                  map((item, i) =>
                  <div key={i} className="relative">
                      <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-[#8B9D83] border-4 border-[#FAF7F2]" />
                      <h3 className="font-serif text-lg text-[#2C2C2C] mb-1">
                        {item.title}{' '}
                        <span className="text-sm font-sans text-[#2C2C2C]/50 ml-2">
                          {item.day}
                        </span>
                      </h3>
                      <p className="text-[#2C2C2C]/60 font-light">
                        {item.desc}
                      </p>
                    </div>
                  )}
                </div>
              </section>
            </div>

            <div className="space-y-8">
              {/* Host Card */}
              <div className="bg-white p-6 rounded-xl border border-[#E8DCC4] shadow-sm">
                <h3 className="text-sm font-medium uppercase tracking-wider text-[#2C2C2C]/50 mb-4">
                  Trip Host
                </h3>
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=400&auto=format&fit=crop"
                    alt="Elena"
                    className="w-16 h-16 rounded-full object-cover border border-[#E8DCC4]" />

                  <div>
                    <h4 className="font-serif text-lg text-[#2C2C2C]">
                      Elena Rodriguez
                    </h4>
                    <p className="text-sm text-[#2C2C2C]/60">Madrid, Spain</p>
                  </div>
                </div>
                <Link to="/profile/1">
                  <Button variant="outline" className="w-full text-xs">
                    View Profile
                  </Button>
                </Link>
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
                      $2,000 - $2,500
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#E8DCC4]/50">
                    <div className="flex items-center text-[#2C2C2C]/70">
                      <Users className="w-4 h-4 mr-3" /> Companions
                    </div>
                    <span className="font-medium text-[#2C2C2C]">
                      Looking for 2-3
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-[#E8DCC4]/50">
                    <div className="flex items-center text-[#2C2C2C]/70">
                      <Calendar className="w-4 h-4 mr-3" /> Duration
                    </div>
                    <span className="font-medium text-[#2C2C2C]">14 Days</span>
                  </div>
                </div>

                <Button variant="primary" className="w-full mb-3">
                  Request to Join
                </Button>
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