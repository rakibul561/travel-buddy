"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    LayoutDashboard,
    Map,
    Users,
    Settings,
    LogOut,
    Activity,
    Compass,
    Heart
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface SidebarProps {
    isAdmin?: boolean;
}

export function Sidebar({ isAdmin = false }: SidebarProps) {
    const pathname = usePathname();
    const { logout } = useAuth();

    const userLinks = [
        { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
        { name: 'My Plans', href: '/travel-plans', icon: Map },
        { name: 'Find Buddies', href: '/explore', icon: Compass },
        { name: 'Saved', href: '/saved', icon: Heart },
        { name: 'Settings', href: '/settings', icon: Settings },
    ];

    const adminLinks = [
        { name: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
        { name: 'User Management', href: '/admin/users', icon: Users },
        { name: 'Travel Plans', href: '/admin/travel-plans', icon: Map },
        { name: 'Activity Logs', href: '/admin/activity', icon: Activity },
        { name: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    const links = isAdmin ? adminLinks : userLinks;

    return (
        <motion.div
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden md:flex flex-col w-64 bg-white border-r border-[#E8DCC4] min-h-screen fixed left-0 top-0 pt-24 pb-10 z-0"
        >
            <div className="flex-1 px-6 space-y-2">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group ${isActive
                                    ? 'bg-[#E8DCC4]/30 text-[#C17B5C]'
                                    : 'text-[#2C2C2C]/70 hover:bg-[#FAF7F2] hover:text-[#C17B5C]'
                                }`}
                        >
                            <link.icon className={`w-5 h-5 ${isActive ? 'text-[#C17B5C]' : 'group-hover:text-[#C17B5C]'}`} />
                            <span className="font-medium">{link.name}</span>
                        </Link>
                    );
                })}
            </div>

            <div className="px-6 mt-auto">
                <button
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-[#2C2C2C]/70 hover:bg-red-50 hover:text-red-500 transition-colors"
                >
                    <LogOut className="w-5 h-5" />
                    <span className="font-medium">Log Out</span>
                </button>
            </div>
        </motion.div>
    );
}
