import api from '@/lib/api';

export const userService = {
    getAllUsers: async () => {
        return api.get('/users');
    },

    getMe: async () => {
        return api.get('/users/me');
    },

    getUserById: async (id: string) => {
        return api.get(`/users/${id}`);
    },


    updateProfile: async (formData: FormData) => {
        // Postman: PATCH /users/profile with FormData (file, data)
        return api.patch('/users/profile', formData);
    },

    deleteUser: async (id: string) => {
        return api.delete(`/users/${id}`);
    }
};
