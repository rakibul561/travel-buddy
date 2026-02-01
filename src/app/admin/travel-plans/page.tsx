
"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Map, Trash2, Search, Calendar, DollarSign, Eye } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { travelService } from '@/services/travel.service';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function TravelPlanManagementPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [travelPlans, setTravelPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!authLoading) {
            const role = user?.role?.toUpperCase();
            if (!user || role !== 'ADMIN') {
                router.push('/login');
                return;
            }
            fetchTravelPlans();
        }
    }, [user, authLoading, router]);

    const fetchTravelPlans = async () => {
        try {
            const response = await travelService.getAllTravelPlans();
            setTravelPlans(response.data.data?.data || response.data.data || []);
        } catch (error) {
            console.error('Failed to fetch travel plans:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeletePlan = async (id: string) => {
        if (confirm('Are you sure you want to delete this travel plan? This usually also deletes related join requests.')) {
            try {
                await travelService.deleteTravelPlan(id);
                setTravelPlans(travelPlans.filter(p => p.id !== id));
            } catch (error) {
                console.error('Failed to delete travel plan:', error);
                alert('Failed to delete travel plan');
            }
        }
    };

    const filteredPlans = travelPlans.filter(p =>
        p.destination?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.user?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading || authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#FAF7F2]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#C17B5C]"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FAF7F2]">
            <div className="md:hidden">
                <Navbar />
            </div>

            <Sidebar isAdmin={true} />

            <main className="md:pl-64 min-h-screen transition-all duration-300">
                <div className="p-6 md:p-12 max-w-7xl mx-auto pt-24 md:pt-12">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                        <div>
                            <h1 className="text-3xl font-serif text-[#2C2C2C] mb-2">
                                Travel Plans
                            </h1>
                            <p className="text-[#2C2C2C]/60 font-light">
                                Manage all travel plans posted by users
                            </p>
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2C2C]/40" />
                            <input
                                type="text"
                                placeholder="Search by destination or user..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 bg-white border border-[#E8DCC4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C17B5C] w-full md:w-80"
                            />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#FAF7F2]">
                                    <tr>
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm">Destination</th>
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm">Created By</th>
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm">Dates</th>
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm">Budget</th>
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E8DCC4]/50">
                                    {filteredPlans.length > 0 ? (
                                        filteredPlans.map((plan) => (
                                            <tr key={plan.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#E8DCC4] flex items-center justify-center`}>
                                                            <Map className="w-5 h-5 text-[#C17B5C]" />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-[#2C2C2C]">{plan.destination}</div>
                                                            <div className="text-xs text-[#2C2C2C]/50 capitalize">
                                                                {plan.travelType?.toLowerCase()} Trip
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 rounded-full bg-gray-200 overflow-hidden">
                                                            <img
                                                                src={plan.user?.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(plan.user?.name || 'U')}&background=random`}
                                                                alt={plan.user?.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium text-[#2C2C2C]">{plan.user?.name}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-[#2C2C2C]/70">
                                                    <div className="flex flex-col gap-1">
                                                        <span className="flex items-center gap-1">
                                                            <Calendar className="w-3 h-3 text-[#C17B5C]" />
                                                            {new Date(plan.startDate).toLocaleDateString()}
                                                        </span>
                                                        <span className="text-xs opacity-70 ml-4">
                                                            to {new Date(plan.endDate).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-[#2C2C2C]/70">
                                                    <div className="flex items-center gap-1">
                                                        <DollarSign className="w-3 h-3 text-green-600" />
                                                        {plan.budgetMin} - {plan.budgetMax}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link href={`/travel-plans/${plan.id}`} className="p-2 text-[#C17B5C] hover:bg-[#FAF7F2] rounded-lg transition-colors" title="View Details">
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDeletePlan(plan.id)}
                                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                            title="Delete Plan"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-[#2C2C2C]/50">
                                                No travel plans found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
