import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../components/Navbar';
import { Button } from '../components/ui/Button';
import { Footer } from '../components/Footer';
export function RegisterPage() {
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

          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-[#2C2C2C]/80 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:border-[#8B9D83] focus:ring-1 focus:ring-[#8B9D83] outline-none transition-all"
                placeholder="John Doe" />

            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2C2C]/80 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:border-[#8B9D83] focus:ring-1 focus:ring-[#8B9D83] outline-none transition-all"
                placeholder="you@example.com" />

            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2C2C]/80 mb-2">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:border-[#8B9D83] focus:ring-1 focus:ring-[#8B9D83] outline-none transition-all"
                placeholder="••••••••" />

            </div>

            <div>
              <label className="block text-sm font-medium text-[#2C2C2C]/80 mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 rounded-lg bg-[#FAF7F2] border border-[#E8DCC4] focus:border-[#8B9D83] focus:ring-1 focus:ring-[#8B9D83] outline-none transition-all"
                placeholder="••••••••" />

            </div>

            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
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

            <Button variant="primary" className="w-full py-3">
              Create Account
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-[#E8DCC4]/30 text-center">
            <p className="text-sm text-[#2C2C2C]/60">
              Already have an account?{' '}
              <Link
                to="/login"
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