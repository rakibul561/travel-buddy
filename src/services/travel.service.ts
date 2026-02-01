import api from '@/lib/api';

export const travelService = {

    createTravelPlan: async (formData: FormData) => {
        return api.post('/travel-plans', formData);
    },

    getAllTravelPlans: async (query?: { search?: string; travelType?: string; page?: number; limit?: number; sortBy?: string; sortOrder?: string }) => {
        return api.get('/travel-plans', { params: query });
    },

    getTravelPlanById: async (id: string) => {
        return api.get(`/travel-plans/${id}`);
    },

    getMyTravelPlans: async () => {
        return api.get('/travel-plans/my');
    },

    getMatchedTravelPlans: async (id: string) => {
        // Postman: GET /travel-plans/match with body { id }
        // GET with body is non-standard but supported by some clients. Axios supports 'data' in config for GET.
        return api.get('/travel-plans/match', {
            data: { id }
        });
    },


    markAsComplete: async () => {
        return api.get('/travel-plans/complete');
    },

    deleteTravelPlan: async (id: string) => {
        return api.delete(`/travel-plans/${id}`);
    }
};
