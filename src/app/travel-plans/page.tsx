"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, SortDesc } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { TravelButton as Button } from '@/components/ui/TravelButton';
import { TravelPlanCard } from '@/components/TravelPlanCard';
import { travelService } from '@/services/travel.service';
import { CreateTravelModal } from '@/components/CreateTravelModal';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function TravelPlansPage() {
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Filter States
  const [filters, setFilters] = useState({
    search: '',
    travelType: '',
    page: 1,
    limit: 9,
    sortBy: 'startDate',
    sortOrder: 'asc'
  });

  const { isAuthenticated } = useAuth();
  const router = useRouter();

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const query: any = {
        ...filters,
      };

      // Clean empty strings
      if (query.search === '') delete query.search;
      if (query.travelType === '') delete query.travelType;

      const response = await travelService.getAllTravelPlans(query);

      const fetchedPlans = response.data.data?.data || response.data.data || [];
      const meta = response.data.data?.meta || {};

      setPlans(fetchedPlans);
      setTotal(meta.total || fetchedPlans.length);
    } catch (error) {
      console.error("Failed to fetch travel plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, [filters.page, filters.travelType, filters.sortBy, filters.sortOrder]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters(prev => ({ ...prev, page: 1 }));
    fetchPlans();
  };

  const handleCreateClick = () => {
    if (!isAuthenticated) {
      router.push('/login');
    } else {
      setIsCreateModalOpen(true);
    }
  };

  // Helper to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  // Helper to format budget
  const formatBudget = (min: number, max: number) => {
    return `$${min} - $${max}`;
  };

  // Helper to capitalize type
  const formatType = (type: string) => {
    if (!type) return 'Solo';
    return type.charAt(0).toUpperCase() + type.slice(1).toLowerCase();
  };

  const totalPages = Math.ceil(total / filters.limit);

  return (
    <div className="min-h-screen bg-[#FAF7F2]">
      <Navbar />

      <main className="pt-32 pb-24 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-8">
            <div>
              <h1 className="text-4xl font-serif text-[#2C2C2C] mb-4">
                Travel Plans
              </h1>
              <p className="text-[#2C2C2C]/60 font-light max-w-xl">
                Browse upcoming trips or create your own to find companions.
              </p>
            </div>

            <div className="mt-6 md:mt-0">
              <Button
                variant="primary"
                className="flex items-center gap-2"
                onClick={handleCreateClick}
              >
                <Plus className="w-4 h-4" /> Create New Plan
              </Button>
            </div>
          </div>

          {/* Filters Bar */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-[#E8DCC4] mb-8">
            <div className="flex flex-col lg:flex-row gap-4 justify-between items-center">

              {/* Search */}
              <form onSubmit={handleSearch} className="w-full lg:w-auto flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destination..."
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C]"
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                />
              </form>

              <div className="flex flex-wrap gap-3 w-full lg:w-auto items-center">
                {/* Travel Type Filter */}
                <div className="relative min-w-[140px]">
                  <select
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C] appearance-none"
                    value={filters.travelType}
                    onChange={(e) => setFilters(prev => ({ ...prev, travelType: e.target.value, page: 1 }))}
                  >
                    <option value="">All Types</option>
                    <option value="SOLO">Solo</option>
                    <option value="COUPLE">Couple</option>
                    <option value="FRIENDS">Friends</option>
                    <option value="FAMILY">Family</option>
                  </select>
                  <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>

                {/* Sort By */}
                <div className="relative min-w-[160px]">
                  <select
                    className="w-full px-4 py-2.5 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C] appearance-none"
                    value={`${filters.sortBy}-${filters.sortOrder}`}
                    onChange={(e) => {
                      const [sortBy, sortOrder] = e.target.value.split('-');
                      setFilters(prev => ({ ...prev, sortBy, sortOrder, page: 1 }));
                    }}
                  >
                    <option value="startDate-asc">Date: Soonest</option>
                    <option value="startDate-desc">Date: Latest</option>
                    <option value="budgetMin-asc">Budget: Low to High</option>
                    <option value="budgetMin-desc">Budget: High to Low</option>
                  </select>
                  <SortDesc className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C17B5C]"></div>
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-20 text-[#2C2C2C]/60">
              <p className="text-lg mb-2">No travel plans found matching your criteria.</p>
              <button
                onClick={() => setFilters({ search: '', travelType: '', page: 1, limit: 9, sortBy: 'startDate', sortOrder: 'asc' })}
                className="text-[#C17B5C] hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {plans.map((plan, index) => (
                  <TravelPlanCard
                    key={plan.id}
                    id={plan.id}
                    destination={plan.destination}
                    image={plan.image || 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2070&auto=format&fit=crop'}
                    startDate={formatDate(plan.startDate)}
                    endDate={formatDate(plan.endDate)}
                    budget={formatBudget(plan.budgetMin, plan.budgetMax)}
                    type={formatType(plan.travelType) as any}
                    hostName={plan.user?.name || 'Unknown Host'}
                    hostImage={plan.user?.profilePicture}
                    delay={index * 0.05}
                  />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2">
                  <button
                    disabled={filters.page === 1}
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page - 1 }))}
                    className="px-4 py-2 rounded-lg border border-[#E8DCC4] disabled:opacity-50 hover:bg-[#FAF7F2] transition-colors"
                  >
                    Previous
                  </button>
                  <span className="px-4 py-2 text-[#2C2C2C]/60">
                    Page {filters.page} of {totalPages}
                  </span>
                  <button
                    disabled={filters.page === totalPages}
                    onClick={() => setFilters(prev => ({ ...prev, page: prev.page + 1 }))}
                    className="px-4 py-2 rounded-lg border border-[#E8DCC4] disabled:opacity-50 hover:bg-[#FAF7F2] transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      <Footer />

      <CreateTravelModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchPlans}
      />
    </div>
  );
}