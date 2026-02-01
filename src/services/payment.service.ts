import api from '@/lib/api';

export const paymentService = {
    createSubscription: async (plan: 'MONTHLY' | 'YEARLY' = 'MONTHLY') => {
        return api.post('/payment/subscription', { plan });
    },

    verifySubscription: async () => {
        return api.get('/payment/subscription'); // Verify endpoint based on Postman structure (though it had empty URL in one place, verify-subscriptio GET)
    },

    getAllPayments: async () => {
        return api.get('/payment');
    }
};
