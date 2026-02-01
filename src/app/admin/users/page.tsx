
"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Trash2, Search, Mail, Shield, CheckCircle, XCircle } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { userService } from '@/services/user.service';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

export default function UserManagementPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (!authLoading) {
            const role = user?.role?.toUpperCase();
            if (!user || role !== 'ADMIN') {
                router.push('/login');
                return;
            }
            fetchUsers();
        }
    }, [user, authLoading, router]);

    const fetchUsers = async () => {
        try {
            const response = await userService.getAllUsers();
            setUsers(response.data.data?.data || response.data.data || []);
        } catch (error) {
            console.error('Failed to fetch users:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id: string) => {
        if (confirm('Are you sure you want to delete this user? Action cannot be undone.')) {
            try {
                await userService.deleteUser(id);
                setUsers(users.filter(u => u.id !== id));
            } catch (error) {
                console.error('Failed to delete user:', error);
                alert('Failed to delete user');
            }
        }
    };

    const filteredUsers = users.filter(u =>
        u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
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
                                User Management
                            </h1>
                            <p className="text-[#2C2C2C]/60 font-light">
                                View and manage all registered users
                            </p>
                        </div>

                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2C2C]/40" />
                            <input
                                type="text"
                                placeholder="Search users by name or email..."
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
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm">User</th>
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm">Role</th>
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm">Status</th>
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm">Joined Date</th>
                                        <th className="px-6 py-4 font-medium text-[#2C2C2C]/60 text-sm text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#E8DCC4]/50">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((u) => (
                                            <tr key={u.id} className="hover:bg-[#FAF7F2]/50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                                                            <img
                                                                src={u.profilePicture || `https://ui-avatars.com/api/?name=${encodeURIComponent(u.name)}&background=random`}
                                                                alt={u.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </div>
                                                        <div>
                                                            <div className="font-medium text-[#2C2C2C]">{u.name}</div>
                                                            <div className="text-xs text-[#2C2C2C]/50 flex items-center">
                                                                <Mail className="w-3 h-3 mr-1" />
                                                                {u.email}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${u.role === 'ADMIN'
                                                            ? 'bg-purple-100 text-purple-700'
                                                            : 'bg-blue-50 text-blue-600'
                                                        }`}>
                                                        <Shield className="w-3 h-3" />
                                                        {u.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {u.isVerified ? (
                                                        <span className="inline-flex items-center gap-1 text-green-600 text-xs font-medium">
                                                            <CheckCircle className="w-3 h-3" /> Verified
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1 text-gray-500 text-xs">
                                                            <XCircle className="w-3 h-3" /> Unverified
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-[#2C2C2C]/70">
                                                    {new Date(u.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDeleteUser(u.id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-12 text-center text-[#2C2C2C]/50">
                                                No users found matching your search.
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
