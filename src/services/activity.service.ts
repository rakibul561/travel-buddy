
import api from '@/lib/api';

export interface ActivityLog {
    id: string;
    user: string;
    action: string;
    details: string;
    ip: string;
    timestamp: string;
}

// Mock data generator
const generateMockActivities = (): ActivityLog[] => {
    const actions = ['Created a travel plan', 'Updated profile', 'Deleted a user', 'Joined a trip', 'Posted a review'];
    const users = ['Alice Johnson', 'Bob Smith', 'Charlie Brown', 'Diana Prince', 'Evan Wright', 'Rakib', 'Admin User'];

    return Array.from({ length: 25 }).map((_, i) => ({
        id: `act-${i}`,
        user: users[Math.floor(Math.random() * users.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        details: 'Performed operation successfully',
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
        timestamp: new Date(Date.now() - Math.floor(Math.random() * 1000000000)).toISOString()
    })).sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
};

export const activityService = {
    getActivities: async (): Promise<ActivityLog[]> => {
        // Simulate API delay
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(generateMockActivities());
            }, 500);
        });
    },

    getRecentActivities: async (limit: number = 5): Promise<ActivityLog[]> => {
        const activities = generateMockActivities();
        return activities.slice(0, limit);
    }
};
