import api from '@/lib/api';

export const requestService = {
    sendJoinRequest: async (travelPlanId: string) => {
        return api.post('/join-requests', { travelPlanId });
    },

    getMyTripRequests: async (travelPlanId?: string) => {
        // Postman: GET /join-requests/my-trips with body { travelPlanId } logic? 
        // Or maybe it filters by query param? Postman showed body.
        // If it's GET with body, use data property.
        const config = travelPlanId ? { data: { travelPlanId } } : {};
        return api.get('/join-requests/my-trips', config);
    },

    updateRequestStatus: async (requestId: string, status: 'ACCEPTED' | 'REJECTED') => {
        return api.patch(`/join-requests/${requestId}`, { status });
    }
};
