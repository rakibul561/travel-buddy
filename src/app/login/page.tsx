"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { TravelButton as Button } from '@/components/ui/TravelButton';
import { Footer } from '@/components/Footer';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import Cookies from 'js-cookie';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Clear any existing token to prevent 401 due to stale/invalid Authorization header
      // This is important because our api interceptor adds the token if it exists
      Cookies.remove('accessToken');

      const response = await api.post('/auth/login', { email, password });

      console.log("Login Response:", response.data); // Debugging

      if (response.data.success || response.data.statusCode === 201 || response.data.statusCode === 200) {
        // Handle deeply nested response structure from Postman screenshot
        // Structure seems to be: response.data -> data -> data -> accessToken
        const token = response.data.data?.data?.accessToken || response.data.data?.accessToken || response.data.accessToken;

        if (token) {
          login(token);
        } else {
          console.error("Token not found in response", response.data);
          setError("Login successful but failed to retrieve token.");
        }
      } else {
        setError(response.data.message || 'Login failed.');
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      // Try to extract the most specific error message
      const errorMessage = err.response?.data?.message || err.response?.data?.data?.message || err.message || 'Login failed. Please check your credentials.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{
            opacity: 0,
            y: 20
          }}
          animate={{
            opacity: 1,
            y: 0
          }}
          transition={{
            duration: 0.6
          }}
          className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-[#8B9D83]/5 border border-[#E8DCC4]">

          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif text-[#2C2C2C] mb-2">
              Welcome Back
            </h1>
            <p className="text-[#2C2C2C]/60 font-light">
              Continue your journey with us
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C]/80 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:border-[#8B9D83] focus:ring-1 focus:ring-[#8B9D83] outline-none transition-all"
                placeholder="you@example.com" />

            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-[#2C2C2C]/80">
                  Password
                </label>
                <a href="#" className="text-xs text-[#C17B5C] hover:underline">
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:border-[#8B9D83] focus:ring-1 focus:ring-[#8B9D83] outline-none transition-all"
                placeholder="••••••••" />

            </div>

            <div>
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="h-4 w-4 text-[#8B9D83] focus:ring-[#8B9D83] border-[#E8DCC4] rounded" />

                <label
                  htmlFor="remember"
                  className="ml-2 block text-sm text-[#2C2C2C]/60">

                  Remember me
                </label>
              </div>
            </div>

            <Button disabled={loading} variant="primary" className="w-full py-3">
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E8DCC4]/30 text-center">
            <p className="text-sm text-[#2C2C2C]/60">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-[#C17B5C] font-medium hover:underline">

                Create one now
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>);

}