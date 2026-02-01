import api from '@/lib/api';

export const authService = {
    login: async (credentials: any) => {
        return api.post('/auth/login', credentials);
    },

    register: async (userData: any) => {
        // Expects FormData for file upload or JSON if no file
        // But based on Postman, it sends FormData with 'file' and 'data' (JSON string)
        return api.post('/users/register', userData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    },

    logout: async () => {
        return api.post('/auth/logout');
    },

    sendOtp: async (data: { email: string; name: string }) => {
        return api.post('/otp/send', data);
    },

    verifyOtp: async (data: { email: string; otp: string }) => {
        return api.post('/otp/verify', data);
    }
};
