"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'next/navigation';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'USER' | 'ADMIN';
    profilePicture?: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (token: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const initAuth = async () => {
            const token = Cookies.get('accessToken');
            if (token) {
                try {
                    // First try to decode the token to get basic info immediately
                    const decoded: any = jwtDecode(token);
                    // Ensure decoded has necessary fields or fallback

                    // Then fetch full profile
                    const response = await api.get('/users/me');
                    if (response.data?.data) {
                        setUser(response.data.data);
                    } else if (decoded) {
                        // Fallback if /me fails but token is valid ?? 
                        // Ideally we want fresh data.
                        setUser({
                            id: decoded.id || decoded._id,
                            name: decoded.name,
                            email: decoded.email,
                            role: decoded.role,
                        } as User)
                    }

                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                    Cookies.remove('accessToken');
                    setUser(null);
                }
            }
            setLoading(false);
        };

        initAuth();
    }, []);

    const login = (token: string) => {
        Cookies.set('accessToken', token, { expires: 7 }); // Expires in 7 days
        const decoded: any = jwtDecode(token);
        // You might want to fetch the full user object here too
        api.get('/users/me')
            .then(res => {
                setUser(res.data.data);
                if (res.data.data.role === 'ADMIN') {
                    router.push('/admin/dashboard');
                } else {
                    router.push('/dashboard');
                }
            })
            .catch(() => {
                // Fallback
                setUser({
                    id: decoded.id || decoded._id,
                    name: decoded.name,
                    email: decoded.email,
                    role: decoded.role,
                } as User);
                router.push('/dashboard');
            })
    };

    const logout = () => {
        Cookies.remove('accessToken');
        setUser(null);
        router.push('/login');
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, isAuthenticated: !!user }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
