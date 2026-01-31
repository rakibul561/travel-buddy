"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Map, Trash2, Shield } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import api from '@/lib/api';
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
                api.get('/users'),
                api.get('/travel-plans')
            ]);
            setUsers(usersRes.data.data.data); // Assuming pagination structure
            setTravelPlans(plansRes.data.data.data);
        } catch (error) {
            console.error('Error fetching admin data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (confirm('Are you sure you want to delete this user?')) {
            try {
                await api.delete(`/users/${id}`);
                setUsers(users.filter(u => u.id !== id));
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    };

    if (loading || authLoading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-[#FAF7F2]">
            <Navbar />

            <main className="pt-32 pb-24 px-6 md:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12">
                        <h1 className="text-4xl font-serif text-[#2C2C2C] mb-4">
                            Admin Dashboard
                        </h1>
                        <p className="text-[#2C2C2C]/60 font-light">
                            Manage users and travel plans.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Users Section */}
                        <div className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-serif text-[#2C2C2C] flex items-center gap-2">
                                    <Users className="w-6 h-6 text-[#8B9D83]" /> Users
                                </h2>
                                <span className="bg-[#FAF7F2] px-3 py-1 rounded-full text-sm font-medium text-[#2C2C2C]/60">
                                    Total: {users.length}
                                </span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-[#E8DCC4]">
                                            <th className="pb-3 font-medium text-[#2C2C2C]/60 text-sm">Name</th>
                                            <th className="pb-3 font-medium text-[#2C2C2C]/60 text-sm">Email</th>
                                            <th className="pb-3 font-medium text-[#2C2C2C]/60 text-sm">Role</th>
                                            <th className="pb-3 font-medium text-[#2C2C2C]/60 text-sm">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#E8DCC4]/50">
                                        {users.map(u => (
                                            <tr key={u.id}>
                                                <td className="py-3 px-1">{u.name}</td>
                                                <td className="py-3 px-1">{u.email}</td>
                                                <td className="py-3 px-1">
                                                    <span className={`text-xs px-2 py-0.5 rounded ${u.role === 'ADMIN' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-1">
                                                    <button onClick={() => handleDeleteUser(u.id)} className="text-red-500 hover:text-red-700">
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
                                    <Map className="w-6 h-6 text-[#C17B5C]" /> Travel Plans
                                </h2>
                                <span className="bg-[#FAF7F2] px-3 py-1 rounded-full text-sm font-medium text-[#2C2C2C]/60">
                                    Total: {travelPlans.length}
                                </span>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-[#E8DCC4]">
                                            <th className="pb-3 font-medium text-[#2C2C2C]/60 text-sm">Destination</th>
                                            <th className="pb-3 font-medium text-[#2C2C2C]/60 text-sm">Dates</th>
                                            <th className="pb-3 font-medium text-[#2C2C2C]/60 text-sm">Type</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-[#E8DCC4]/50">
                                        {travelPlans.map(plan => (
                                            <tr key={plan.id}>
                                                <td className="py-3 px-1">{plan.destination}</td>
                                                <td className="py-3 px-1 text-sm text-[#2C2C2C]/60">
                                                    {new Date(plan.startDate).toLocaleDateString()} - {new Date(plan.endDate).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-1">{plan.travelType}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
