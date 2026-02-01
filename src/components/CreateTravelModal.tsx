"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, MapPin, DollarSign, Users, Image as ImageIcon } from 'lucide-react';
import { TravelButton as Button } from '@/components/ui/TravelButton';
import api from '@/lib/api';
import { travelService } from '@/services/travel.service';

interface CreateTravelModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

export function CreateTravelModal({ isOpen, onClose, onSuccess }: CreateTravelModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        destination: '',
        country: '',
        city: '',
        startDate: '',
        endDate: '',
        budgetMin: '',
        budgetMax: '',
        travelType: 'Solo',
        description: '',
        activities: [] as string[],
        currentActivity: ''
    });
    const [file, setFile] = useState<File | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleAddActivity = () => {
        if (formData.currentActivity.trim()) {
            setFormData(prev => ({
                ...prev,
                activities: [...prev.activities, prev.currentActivity.trim()],
                currentActivity: ''
            }));
        }
    };

    const removeActivity = (index: number) => {
        setFormData(prev => ({
            ...prev,
            activities: prev.activities.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const dataPayload = {
                destination: formData.destination,
                country: formData.country,
                city: formData.city,
                startDate: new Date(formData.startDate).toISOString(),
                endDate: new Date(formData.endDate).toISOString(),
                budgetMin: Number(formData.budgetMin),
                budgetMax: Number(formData.budgetMax),
                travelType: formData.travelType.toUpperCase(),
                description: formData.description,
                activities: formData.activities
            };

            const submitData = new FormData();
            if (file) {
                submitData.append('file', file);
            }
            // Postman collection sends data as a stringified JSON in 'data' field
            submitData.append('data', JSON.stringify(dataPayload));

            // Axios handles multipart/form-data boundary generation automatically when passed FormData
            await travelService.createTravelPlan(submitData);

            onSuccess();
            onClose();
        } catch (error) {
            console.error("Failed to create travel plan", error);
            // Ideally show error toast
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed inset-0 m-auto max-w-2xl w-full h-fit max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-8 z-50 shadow-2xl"
                    >
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-serif text-[#2C2C2C]">Plan a New Adventure</h2>
                            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-[#2C2C2C]/50" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-4">

                                {/* Destination, Country, City */}
                                <div>
                                    <label className="block text-sm font-medium text-[#2C2C2C]/70 mb-1">Trip Name / Destination</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/30" />
                                        <input
                                            type="text"
                                            name="destination"
                                            required
                                            placeholder="e.g. Summer in Thailand"
                                            value={formData.destination}
                                            onChange={handleChange}
                                            className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C]"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2C2C]/70 mb-1">Country</label>
                                        <input
                                            type="text"
                                            name="country"
                                            required
                                            placeholder="Country"
                                            value={formData.country}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2C2C]/70 mb-1">City</label>
                                        <input
                                            type="text"
                                            name="city"
                                            required
                                            placeholder="City"
                                            value={formData.city}
                                            onChange={handleChange}
                                            className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C]"
                                        />
                                    </div>
                                </div>

                                {/* Dates */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2C2C]/70 mb-1">Start Date</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                name="startDate"
                                                required
                                                value={formData.startDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2C2C]/70 mb-1">End Date</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                name="endDate"
                                                required
                                                value={formData.endDate}
                                                onChange={handleChange}
                                                className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Budget */}
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2C2C]/70 mb-1">Min Budget ($)</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2C2C]/30" />
                                            <input
                                                type="number"
                                                name="budgetMin"
                                                required
                                                placeholder="0"
                                                value={formData.budgetMin}
                                                onChange={handleChange}
                                                className="w-full pl-9 pr-4 py-3 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C]"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2C2C]/70 mb-1">Max Budget ($)</label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2C2C2C]/30" />
                                            <input
                                                type="number"
                                                name="budgetMax"
                                                required
                                                placeholder="1000"
                                                value={formData.budgetMax}
                                                onChange={handleChange}
                                                className="w-full pl-9 pr-4 py-3 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C]"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Travel Type & Image */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2C2C]/70 mb-1">Travel Type</label>
                                        <div className="relative">
                                            <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/30" />
                                            <select
                                                name="travelType"
                                                value={formData.travelType}
                                                onChange={handleChange}
                                                className="w-full pl-10 pr-4 py-3 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C] appearance-none"
                                            >
                                                <option value="Solo">Solo</option>
                                                <option value="Couple">Couple</option>
                                                <option value="Friends">Friends</option>
                                                <option value="Family">Family</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-[#2C2C2C]/70 mb-1">Cover Image</label>
                                        <div className="relative">
                                            <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#2C2C2C]/30" />
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="w-full pl-10 pr-4 py-2 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C] text-sm"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Description */}
                                <div>
                                    <label className="block text-sm font-medium text-[#2C2C2C]/70 mb-1">Description</label>
                                    <textarea
                                        name="description"
                                        rows={3}
                                        placeholder="Tell us more about your trip..."
                                        value={formData.description}
                                        onChange={handleChange}
                                        className="w-full px-4 py-3 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C]"
                                    />
                                </div>

                                {/* Activities */}
                                <div>
                                    <label className="block text-sm font-medium text-[#2C2C2C]/70 mb-1">Activities</label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            name="currentActivity"
                                            value={formData.currentActivity}
                                            onChange={handleChange}
                                            placeholder="Add an activity (e.g. Hiking)"
                                            className="flex-1 px-4 py-2 bg-[#FAF7F2] border border-[#E8DCC4] rounded-lg focus:outline-none focus:border-[#C17B5C]"
                                        />
                                        <button type="button" onClick={handleAddActivity} className="px-4 py-2 bg-[#E8DCC4] rounded-lg hover:bg-[#C17B5C] hover:text-white transition-colors">
                                            Add
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.activities.map((act, idx) => (
                                            <span key={idx} className="px-3 py-1 bg-[#8B9D83]/10 text-[#8B9D83] text-sm rounded-full flex items-center gap-1">
                                                {act}
                                                <button type="button" onClick={() => removeActivity(idx)} className="hover:text-red-500">
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                            </div>

                            <div className="flex justify-end gap-3 pt-4 border-t border-[#E8DCC4]">
                                <Button variant="outline" type="button" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button variant="primary" type="submit" disabled={loading}>
                                    {loading ? 'Creating...' : 'Create Plan'}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
