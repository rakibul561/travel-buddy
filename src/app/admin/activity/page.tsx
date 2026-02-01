
"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Activity, Search, Filter, Download } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

import { activityService, ActivityLog } from '@/services/activity.service';

export default function ActivityLogsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [searchTerm, setSearchTerm] = useState('');
    const [activities, setActivities] = useState<ActivityLog[]>([]);

    React.useEffect(() => {
        if (!authLoading) {
            const role = user?.role?.toUpperCase();
            if (!user || role !== 'ADMIN') {
                router.push('/login');
            } else {
                fetchActivities();
            }
        }
    }, [user, authLoading, router]);

    const fetchActivities = async () => {
        try {
            const data = await activityService.getActivities();
            setActivities(data);
        } catch (error) {
            console.error("Failed to fetch activities", error);
        }
    };

    const filteredActivities = activities.filter(act =>
        act.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
        act.action.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (authLoading) return null;

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
                                Activity Logs
                            </h1>
                            <p className="text-[#2C2C2C]/60 font-light">
                                Monitor system events and user actions
                            </p>
                        </div>

                        <div className="flex gap-3">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2C2C]/40" />
                                <input
                                    type="text"
                                    placeholder="Search logs..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10 pr-4 py-2 bg-white border border-[#E8DCC4] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#C17B5C] w-full md:w-64"
                                />
                            </div>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8DCC4] rounded-lg text-[#2C2C2C]/70 hover:bg-[#FAF7F2] transition-colors">
                                <Filter className="w-4 h-4" /> <span className="hidden md:inline">Filter</span>
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E8DCC4] rounded-lg text-[#2C2C2C]/70 hover:bg-[#FAF7F2] transition-colors">
                                <Download className="w-4 h-4" /> <span className="hidden md:inline">Export</span>
                            </button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-[#FAF7F2]">
                                    <tr>
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm">User</th>
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm">Action</th>
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm">IP Address</th>
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm">Date & Time</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E8DCC4]/50">
                                    {filteredActivities.map((act) => (
                                        <tr key={act.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                                            <td className="px-6 py-4 font-medium text-[#2C2C2C]">
                                                {act.user}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-medium">
                                                    <Activity className="w-3 h-3" />
                                                    {act.action}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#2C2C2C]/60 font-mono">
                                                {act.ip}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-[#2C2C2C]/60">
                                                {new Date(act.timestamp).toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
