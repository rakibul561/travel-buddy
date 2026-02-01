"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Map, Trash2, Activity, Settings } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Sidebar } from '@/components/Sidebar';
import { userService } from '@/services/user.service';
import { travelService } from '@/services/travel.service';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function AdminDashboardPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
    const [travelPlans, setTravelPlans] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading) {
            if (!user || user.role !== 'ADMIN') {
                router.push('/login');
                return;
            }
            fetchData();
        }
    }, [user, authLoading, router]);

    const fetchData = async () => {
        try {
            const [usersRes, plansRes] = await Promise.all([
                userService.getAllUsers(),
                travelService.getAllTravelPlans()
            ]);
            setUsers(usersRes.data.data.data || []);
            setTravelPlans(plansRes.data.data.data || []);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await userService.deleteUser(id);
                setUsers(users.filter(u => u.id !== id));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    if (loading || authLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#FAF7F2]">
            {/* Mobile Navbar (visible only on mobile) */}
            <div className="md:hidden">
                <Navbar />
            </div>

            <Sidebar isAdmin={true} />

            <main className="md:pl-64 min-h-screen transition-all duration-300">
                <div className="p-6 md:p-12 max-w-7xl mx-auto pt-24 md:pt-12">
                    <div className="mb-12">
                        <h1 className="text-4xl font-serif text-[#2C2C2C] mb-4">
                            Admin Dashboard
                        </h1>
                        <p className="text-[#2C2C2C]/60 font-light">
                            Manage users, travel plans, and platform activities.
                        </p>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-white p-6 rounded-xl border border-[#E8DCC4] flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-[#2C2C2C]/60 text-sm font-medium uppercase tracking-wider mb-1">Total Users</p>
                                <p className="text-3xl font-serif font-bold text-[#2C2C2C]">{users.length}</p>
                            </div>
                            <div className="p-4 rounded-full bg-[#FAF7F2] text-[#8B9D83]">
                                <Users className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-[#E8DCC4] flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-[#2C2C2C]/60 text-sm font-medium uppercase tracking-wider mb-1">Active Plans</p>
                                <p className="text-3xl font-serif font-bold text-[#2C2C2C]">{travelPlans.length}</p>
                            </div>
                            <div className="p-4 rounded-full bg-[#FAF7F2] text-[#C17B5C]">
                                <Map className="w-6 h-6" />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl border border-[#E8DCC4] flex items-center justify-between shadow-sm">
                            <div>
                                <p className="text-[#2C2C2C]/60 text-sm font-medium uppercase tracking-wider mb-1">Activities</p>
                                <p className="text-3xl font-serif font-bold text-[#2C2C2C]">12</p>
                            </div>
                            <div className="p-4 rounded-full bg-[#FAF7F2] text-purple-500">
                                <Activity className="w-6 h-6" />
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Users Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-serif text-[#2C2C2C] flex items-center gap-2">
                                    <Users className="w-6 h-6 text-[#8B9D83]" /> User Management
                                </h2>
                                <button className="text-sm text-[#C17B5C] hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-[#E8DCC4]">
                                            <th className="pb-3 font-medium text-[#2C2C2C]/60 text-sm">Name</th>
                                            <th className="pb-3 font-medium text-[#2C2C2C]/60 text-sm">Role</th>
                                            <th className="pb-3 font-medium text-[#2C2C2C]/60 text-sm text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#E8DCC4]/50">
                                        {users.slice(0, 5).map(u => (
                                            <tr key={u.id}>
                                                <td className="py-3 px-1">
                                                    <div className="font-medium text-[#2C2C2C]">{u.name}</div>
                                                    <div className="text-xs text-[#2C2C2C]/50">{u.email}</div>
                                                </td>
                                                <td className="py-3 px-1">
                                                    <span className={`text-xs px-2 py-0.5 rounded ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-1 text-right">
                                                    <button onClick={() => handleDeleteUser(u.id)} className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded">
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Travel Plans Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-serif text-[#2C2C2C] flex items-center gap-2">
                                    <Map className="w-6 h-6 text-[#C17B5C]" /> Travel Plan Management
                                </h2>
                                <button className="text-sm text-[#C17B5C] hover:underline">View All</button>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-[#E8DCC4]">
                                            <th className="pb-3 font-medium text-[#2C2C2C]/60 text-sm">Destination</th>
                                            <th className="pb-3 font-medium text-[#2C2C2C]/60 text-sm">Dates</th>
                                            <th className="pb-3 font-medium text-[#2C2C2C]/60 text-sm">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#E8DCC4]/50">
                                        {travelPlans.slice(0, 5).map(plan => (
                                            <tr key={plan.id}>
                                                <td className="py-3 px-1 font-medium text-[#2C2C2C]">{plan.destination}</td>
                                                <td className="py-3 px-1 text-sm text-[#2C2C2C]/60">
                                                    {new Date(plan.startDate).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-1">
                                                    <span className="text-xs px-2 py-0.5 rounded bg-green-100 text-green-700">Active</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Activity Management (Placeholder as requested) */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] p-6 lg:col-span-2">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-serif text-[#2C2C2C] flex items-center gap-2">
                                    <Activity className="w-6 h-6 text-purple-500" /> Activity Management
                                </h2>
                                <button className="text-sm text-[#C17B5C] hover:underline">View Logs</button>
                            </div>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center gap-4 p-3 hover:bg-[#FAF7F2] rounded-lg border border-transparent hover:border-[#E8DCC4] transition-colors">
                                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                                        <div className="flex-1">
                                            <p className="text-sm text-[#2C2C2C]">User <strong>rakib</strong> created a new travel plan to <strong>Cox's Bazar</strong>.</p>
                                            <p className="text-xs text-[#2C2C2C]/50">2 hours ago</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
