"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, LogOut, Settings } from 'lucide-react';
import { TravelButton as Button } from './ui/TravelButton';
import { useAuth } from '@/context/AuthContext';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    {
      name: 'Home',
      href: '/'
    },
    {
      name: 'Explore',
      href: '/explore'
    },
    {
      name: 'Travel Plans',
      href: '/travel-plans'
    },
    {
      name: 'About Us',
      href: '/about'
    }];

  return (
    <motion.nav
      initial={{
        y: -100
      }}
      animate={{
        y: 0
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-[#2C2C2C] rounded-full flex items-center justify-center text-white font-serif text-xl group-hover:bg-[#C17B5C] transition-colors">
            TB
          </div>
          <span className="font-serif text-xl font-bold text-[#2C2C2C]">
            TravelBuddy
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            <Link
              key={link.name}
              href={link.href}
              className={`text-sm font-medium transition-colors hover:text-[#C17B5C] ${pathname === link.href ? 'text-[#C17B5C]' : 'text-[#2C2C2C]'}`}>

              {link.name}
            </Link>
          )}
        </div>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link href={user?.role === 'ADMIN' ? '/admin/dashboard' : '/dashboard'}>
                <Button variant="outline" className="text-sm">
                  Dashboard
                </Button>
              </Link>
              <Button variant="primary" onClick={logout} className="text-sm">
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <button className="text-sm font-medium text-[#2C2C2C] hover:text-[#C17B5C] transition-colors">
                  Log In
                </button>
              </Link>
              <Link href="/register">
                <Button variant="primary" className="text-sm">
                  Sign Up
                </Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#2C2C2C]"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>

          <div className="space-y-1.5">
            <span
              className={`block w-6 h-0.5 bg-current transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />

            <span
              className={`block w-6 h-0.5 bg-current transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`} />

            <span
              className={`block w-6 h-0.5 bg-current transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />

          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen &&
          <motion.div
            initial={{
              opacity: 0,
              height: 0
            }}
            animate={{
              opacity: 1,
              height: 'auto'
            }}
            exit={{
              opacity: 0,
              height: 0
            }}
            className="md:hidden bg-white border-t border-[#E8DCC4] overflow-hidden">

            <div className="px-6 py-6 space-y-4">
              {navLinks.map((link) =>
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block text-[#2C2C2C] font-medium hover:text-[#C17B5C]">

                  {link.name}
                </Link>
              )}
              <hr className="border-[#E8DCC4]" />
              {isAuthenticated ? (
                <>
                  <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block text-[#2C2C2C] font-medium hover:text-[#C17B5C]">
                    Dashboard
                  </Link>
                  <button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="block w-full text-left text-[#C17B5C] font-medium">
                    Log Out
                  </button>
                </>
              ) : (
                <div className="flex flex-col gap-4">
                  <Link href="/login" onClick={() => setIsMobileMenuOpen(false)} className="text-center w-full py-3 border border-[#2C2C2C] rounded-lg font-medium">

                    Log In
                  </Link>
                  <Link href="/register" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="primary" className="w-full justify-center">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </motion.nav>);

}