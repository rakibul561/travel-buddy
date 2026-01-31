import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Map, Compass, LogOut, Settings } from 'lucide-react';
import { Button } from './ui/Button';
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  // Mock auth state - in a real app this would come from context
  const [userRole, setUserRole] = useState<'guest' | 'user' | 'admin'>('guest');
  // Toggle role for demo purposes
  const toggleRole = () => {
    if (userRole === 'guest') setUserRole('user');else
    if (userRole === 'user') setUserRole('admin');else
    setUserRole('guest');
  };
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);
  const navLinks = {
    guest: [
    {
      name: 'Explore Travelers',
      path: '/explore'
    },
    {
      name: 'Find Travel Buddy',
      path: '/explore'
    }],

    user: [
    {
      name: 'Explore Travelers',
      path: '/explore'
    },
    {
      name: 'My Travel Plans',
      path: '/travel-plans'
    },
    {
      name: 'Dashboard',
      path: '/dashboard'
    }],

    admin: [
    {
      name: 'Dashboard',
      path: '/dashboard'
    },
    {
      name: 'Manage Users',
      path: '/admin/users'
    },
    {
      name: 'Travel Plans',
      path: '/admin/plans'
    }]

  };
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#FAF7F2]/90 backdrop-blur-md border-b border-[#E8DCC4]/50 py-4' : 'bg-transparent py-6'}`}>

      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="text-2xl font-serif font-bold text-[#2C2C2C]">
          TravelBuddy<span className="text-[#C17B5C]">.</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <div className="flex space-x-6 text-sm font-medium text-[#2C2C2C]/80">
            {navLinks[userRole].map((link) =>
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-[#C17B5C] transition-colors relative group">

                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#C17B5C] transition-all group-hover:w-full" />
              </Link>
            )}
          </div>

          <div className="flex items-center space-x-4">
            {userRole === 'guest' ?
            <>
                <Link
                to="/login"
                className="text-sm font-medium text-[#2C2C2C] hover:text-[#C17B5C] transition-colors">

                  Login
                </Link>
                <Link to="/register">
                  <Button variant="primary" className="px-6 py-2 text-xs">
                    Register
                  </Button>
                </Link>
              </> :

            <div className="flex items-center space-x-4">
                <Link
                to="/profile/me"
                className="flex items-center space-x-2 text-sm font-medium text-[#2C2C2C] hover:text-[#C17B5C] transition-colors">

                  <div className="w-8 h-8 rounded-full bg-[#E8DCC4] flex items-center justify-center text-[#C17B5C]">
                    <User size={16} />
                  </div>
                  <span>Profile</span>
                </Link>
                <button
                onClick={() => setUserRole('guest')}
                className="text-[#2C2C2C]/60 hover:text-[#C17B5C] transition-colors"
                title="Logout">

                  <LogOut size={20} />
                </button>
              </div>
            }

            {/* Demo role toggler - hidden in production */}
            <button
              onClick={toggleRole}
              className="ml-4 p-1 rounded-full bg-gray-100 text-xs text-gray-400 hover:bg-gray-200"
              title={`Current role: ${userRole} (Click to toggle)`}>

              <Settings size={12} />
            </button>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-[#2C2C2C]"
          onClick={() => setIsOpen(!isOpen)}>

          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen &&
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
          className="md:hidden bg-[#FAF7F2] border-b border-[#E8DCC4]">

            <div className="px-6 py-6 space-y-4 flex flex-col">
              {navLinks[userRole].map((link) =>
            <Link
              key={link.name}
              to={link.path}
              className="text-[#2C2C2C] font-medium hover:text-[#C17B5C] transition-colors">

                  {link.name}
                </Link>
            )}
              <div className="h-px bg-[#E8DCC4] my-2" />
              {userRole === 'guest' ?
            <>
                  <Link
                to="/login"
                className="text-[#2C2C2C] font-medium hover:text-[#C17B5C]">

                    Login
                  </Link>
                  <Link to="/register" className="text-[#C17B5C] font-medium">
                    Register Now
                  </Link>
                </> :

            <>
                  <Link
                to="/profile/me"
                className="text-[#2C2C2C] font-medium hover:text-[#C17B5C]">

                    My Profile
                  </Link>
                  <button
                onClick={() => setUserRole('guest')}
                className="text-left text-[#2C2C2C]/60 font-medium hover:text-[#C17B5C]">

                    Logout
                  </button>
                </>
            }
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </nav>);

}