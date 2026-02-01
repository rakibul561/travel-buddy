"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '@/lib/api';
import { userService } from '@/services/user.service';
import { authService } from '@/services/auth.service';
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

                    // Then fetch full profile
                    const response = await userService.getMe();
                    if (response.data?.data) {
                        setUser(response.data.data);
                    } else if (decoded) {
                        setUser({
                            id: decoded.id || decoded._id,
                            name: decoded.name,
                            email: decoded.email,
                            role: decoded.role,
                        } as User)
                    }


                } catch (error) {
                    console.error('Failed to fetch user profile:', error);
                    // If API fails, try to survive with just the token
                    try {
                        const decoded: any = jwtDecode(token);
                        if (decoded) {
                            setUser({
                                id: decoded.id || decoded._id,
                                name: decoded.name,
                                email: decoded.email,
                                role: decoded.role,
                            } as User);
                        }
                    } catch (decodeErr) {
                        console.error("Token decode fallback failed", decodeErr);
                        // precise removal only if really garbage
                        Cookies.remove('accessToken');
                    }
                }
            }
            setLoading(false);
        };


        initAuth();
    }, []);


    const login = (token: string) => {
        // Explicitly set path to '/' to ensure it's available across the entire app
        Cookies.set('accessToken', token, { expires: 7, path: '/' });

        let decoded: any = null;
        try {
            decoded = jwtDecode(token);
        } catch (e) {
            console.error("Token decode failed", e);
        }

        // Optimistically set user from token if possible to avoid delay
        if (decoded) {
            setUser({
                id: decoded.id || decoded._id,
                name: decoded.name,
                email: decoded.email,
                role: decoded.role,
            });
        }

        // Fetch full profile for up-to-date info
        api.get('/users/me')
            .then(res => {
                if (res.data.data) {
                    setUser(res.data.data);

                    const role = res.data.data.role?.toUpperCase();
                    if (role === 'ADMIN') {
                        router.push('/');
                    } else {
                        router.push('/dashboard');
                    }
                }
            })
            .catch((err) => {
                console.error("Fetch user failed during login", err);
                // If fetching me fails but we have a token, we rely on the decoded token
                // logic above. We still redirect.
                if (decoded) {
                    const role = decoded.role?.toUpperCase();
                    if (role === 'ADMIN') {
                        router.push('/');
                    } else {
                        router.push('/dashboard');
                    }

                } else {
                    // Critical failure
                    console.error("Login failed: Invalid token data.");
                }
            });
    };

    const logout = async () => {
        try {
            await authService.logout();
        } catch (error) {
            console.error("Logout failed on server:", error);
        }
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
