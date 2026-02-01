
"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, User, Mail, Lock, Bell, Globe, Shield } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Sidebar } from '@/components/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { userService } from '@/services/user.service';
import { TravelButton as Button } from '@/components/ui/TravelButton';

export default function AdminSettingsPage() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Profile State
    const [profileForm, setProfileForm] = useState({
        name: '',
        fullName: '',
        email: '',
    });

    // Password State
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    // Site Config State (Visual Only)
    const [siteConfig, setSiteConfig] = useState({
        maintenanceMode: false,
        allowRegistration: true,
        emailNotifications: true,
        debugMode: false
    });

    useEffect(() => {
        if (!authLoading) {
            const role = user?.role?.toUpperCase();
            if (!user || role !== 'ADMIN') {
                router.push('/login');
            } else {
                setProfileForm({
                    name: user.name || '',
                    fullName: (user as any).fullName || '',
                    email: user.email || ''
                });
            }
        }
    }, [user, authLoading, router]);

    const handleProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('data', JSON.stringify({
                name: profileForm.name,
                fullName: profileForm.fullName,
                email: profileForm.email
            }));

            await userService.updateProfile(formData);
            alert('Profile updated successfully');
        } catch (error) {
            console.error('Update failed:', error);
            alert('Failed to update profile');
        } finally {
            setLoading(false);
        }
    };

    const handlePasswordUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            alert("New passwords don't match");
            return;
        }

        setLoading(true);
        try {
            // Re-using profile update endpoint which often accepts password change
            // Adjust payload based on strict API requirements. 
            // The postman collection showed update profile accepts oldPassword/newPassword.
            const formData = new FormData();
            formData.append('data', JSON.stringify({
                oldPassword: passwordForm.oldPassword,
                newPassword: passwordForm.newPassword
            }));

            await userService.updateProfile(formData);
            alert('Password updated successfully');
            setPasswordForm({ oldPassword: '', newPassword: '', confirmPassword: '' });
        } catch (error) {
            console.error('Password update failed:', error);
            alert('Failed to update password. Check your old password.');
        } finally {
            setLoading(false);
        }
    };

    if (authLoading) return null;

    return (
        <div className="min-h-screen bg-[#FAF7F2]">
            <div className="md:hidden">
                <Navbar />
            </div>

            <Sidebar isAdmin={true} />

            <main className="md:pl-64 min-h-screen transition-all duration-300">
                <div className="p-6 md:p-12 max-w-4xl mx-auto pt-24 md:pt-12">
                    <h1 className="text-3xl font-serif text-[#2C2C2C] mb-2">
                        Admin Settings
                    </h1>
                    <p className="text-[#2C2C2C]/60 font-light mb-8">
                        Manage your account and platform configuration
                    </p>

                    <div className="space-y-8">
                        {/* Profile Settings */}
                        <section className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] p-6 md:p-8">
                            <h2 className="text-xl font-serif text-[#2C2C2C] mb-6 flex items-center gap-2">
                                <User className="w-5 h-5 text-[#C17B5C]" /> Profile Information
                            </h2>
                            <form onSubmit={handleProfileUpdate} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#2C2C2C]/70">Display Name</label>
                                    <input
                                        type="text"
                                        value={profileForm.name}
                                        onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:outline-none focus:border-[#C17B5C]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#2C2C2C]/70">Full Name</label>
                                    <input
                                        type="text"
                                        value={profileForm.fullName}
                                        onChange={e => setProfileForm({ ...profileForm, fullName: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:outline-none focus:border-[#C17B5C]"
                                    />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium text-[#2C2C2C]/70">Email Address</label>
                                    <input
                                        type="email"
                                        value={profileForm.email}
                                        onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:outline-none focus:border-[#C17B5C]"
                                    />
                                </div>
                                <div className="md:col-span-2 flex justify-end">
                                    <Button variant="primary" disabled={loading}>
                                        <Save className="w-4 h-4 mr-2" /> Save Changes
                                    </Button>
                                </div>
                            </form>
                        </section>

                        {/* Password Settings */}
                        <section className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] p-6 md:p-8">
                            <h2 className="text-xl font-serif text-[#2C2C2C] mb-6 flex items-center gap-2">
                                <Lock className="w-5 h-5 text-[#C17B5C]" /> Security
                            </h2>
                            <form onSubmit={handlePasswordUpdate} className="space-y-4 max-w-md">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#2C2C2C]/70">Current Password</label>
                                    <input
                                        type="password"
                                        value={passwordForm.oldPassword}
                                        onChange={e => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:outline-none focus:border-[#C17B5C]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#2C2C2C]/70">New Password</label>
                                    <input
                                        type="password"
                                        value={passwordForm.newPassword}
                                        onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:outline-none focus:border-[#C17B5C]"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-[#2C2C2C]/70">Confirm New Password</label>
                                    <input
                                        type="password"
                                        value={passwordForm.confirmPassword}
                                        onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                                        className="w-full px-4 py-2 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:outline-none focus:border-[#C17B5C]"
                                    />
                                </div>
                                <div className="pt-2">
                                    <Button variant="outline" disabled={loading}>
                                        Update Password
                                    </Button>
                                </div>
                            </form>
                        </section>

                        {/* Platform Settings (Visual Only) */}
                        <section className="bg-white rounded-xl shadow-sm border border-[#E8DCC4] p-6 md:p-8">
                            <h2 className="text-xl font-serif text-[#2C2C2C] mb-6 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-[#C17B5C]" /> Platform Settings
                            </h2>
                            <div className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-[#2C2C2C]">Maintenance Mode</h3>
                                        <p className="text-sm text-[#2C2C2C]/60">Temporarily disable access to the platform</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={siteConfig.maintenanceMode} onChange={e => setSiteConfig({ ...siteConfig, maintenanceMode: e.target.checked })} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C17B5C]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C17B5C]"></div>
                                    </label>
                                </div>
                                <hr className="border-[#E8DCC4]" />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-[#2C2C2C]">Allow New Registrations</h3>
                                        <p className="text-sm text-[#2C2C2C]/60">Enable or disable new user signups</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={siteConfig.allowRegistration} onChange={e => setSiteConfig({ ...siteConfig, allowRegistration: e.target.checked })} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C17B5C]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C17B5C]"></div>
                                    </label>
                                </div>
                                <hr className="border-[#E8DCC4]" />
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h3 className="font-medium text-[#2C2C2C]">Email Notifications</h3>
                                        <p className="text-sm text-[#2C2C2C]/60">System-wide email alerts</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" checked={siteConfig.emailNotifications} onChange={e => setSiteConfig({ ...siteConfig, emailNotifications: e.target.checked })} className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#C17B5C]/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#C17B5C]"></div>
                                    </label>
                                </div>
                            </div>
                        </section>
                    </div>
                </div>
            </main>
        </div>
    );
}
