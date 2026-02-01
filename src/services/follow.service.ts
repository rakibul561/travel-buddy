
import api from '@/lib/api';

export const followService = {
    followUser: async (targetUserId: string) => {
        return api.post('/follow', { targetUserId });
    },

    unfollowUser: async (targetUserId: string) => {
        return api.delete(`/follow/${targetUserId}`);
    },

    getFollowers: async () => {
        return api.get('/follow/followers');
    },

    getFollowing: async () => {
        return api.get('/follow/following');
    },

    // Get another user's profile with follow stats (admin/public view)
    getUserProfile: async (userId: string) => {
        // Since there is no specific endpoint for "profile stats", we might reuse get-all or similar
        // Or assume there is a specific endpoint. 
        // Based on Postman: GET /users/:id exists.
        // We will fetch user details.
        // For follow stats, usually the backend includes them or we count them from the lists if available publicly.
        // Postman does not show a "Get User Stats" endpoint.
        // We will infer stats from what we have.
        return api.get(`/users/${userId}`);
    }
};
