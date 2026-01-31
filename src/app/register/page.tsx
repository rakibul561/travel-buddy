"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { TravelButton as Button } from '@/components/ui/TravelButton';
import { Footer } from '@/components/Footer';
import api from '@/lib/api';
import { useRouter } from 'next/navigation';
export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    fullName: '',
    email: '',
    password: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Backend expects Multipart form data
      const data = new FormData();
      if (file) {
        data.append('file', file);
      }
      // "data" field with JSON string as per Postman
      data.append('data', JSON.stringify({
        name: formData.name,
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
        role: 'USER' // Default role
      }));

      const response = await api.post('/users/register', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });

      if (response.data.success) {
        // Redirect to login or auto-login
        // Let's redirect to login for now
        router.push('/login');
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
              Join the Community
            </h1>
            <p className="text-[#2C2C2C]/60 font-light">
              Start your adventure today
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-50 text-red-500 p-3 rounded-lg text-sm text-center">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C]/80 mb-2">
                User Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:border-[#8B9D83] focus:ring-1 focus:ring-[#8B9D83] outline-none transition-all"
                placeholder="johndoe" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2C2C]/80 mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:border-[#8B9D83] focus:ring-1 focus:ring-[#8B9D83] outline-none transition-all"
                placeholder="John Doe" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2C2C]/80 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:border-[#8B9D83] focus:ring-1 focus:ring-[#8B9D83] outline-none transition-all"
                placeholder="you@example.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2C2C]/80 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:border-[#8B9D83] focus:ring-1 focus:ring-[#8B9D83] outline-none transition-all"
                placeholder="••••••••" />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2C2C]/80 mb-2">
                Profile Picture (Optional)
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:border-[#8B9D83] focus:ring-1 focus:ring-[#8B9D83] outline-none transition-all"
              />
            </div>

            <div>
              <div className="flex items-start">
                <input
                  id="terms"
                  type="checkbox"
                  required
                  className="mt-1 h-4 w-4 text-[#8B9D83] focus:ring-[#8B9D83] border-[#E8DCC4] rounded" />

                <label
                  htmlFor="terms"
                  className="ml-2 block text-sm text-[#2C2C2C]/60">

                  I agree to the{' '}
                  <a href="#" className="text-[#C17B5C] hover:underline">
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="#" className="text-[#C17B5C] hover:underline">
                    Privacy Policy
                  </a>
                </label>
              </div>
            </div>

            <Button disabled={loading} variant="primary" className="w-full py-3">
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E8DCC4]/30 text-center">
            <p className="text-sm text-[#2C2C2C]/60">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#C17B5C] font-medium hover:underline">

                Sign in
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>);

}