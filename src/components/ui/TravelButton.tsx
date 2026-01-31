"use client";
import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: 'primary' | 'secondary' | 'outline';
  children: React.ReactNode;
  withIcon?: boolean;
}
export function TravelButton({
  variant = 'primary',
  children,
  className = '',
  withIcon = false,
  ...props
}: ButtonProps) {
  const baseStyles =
    'inline-flex items-center justify-center px-8 py-3 text-sm font-medium transition-all duration-300 ease-out focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  const variants = {
    primary:
      'bg-[#8B9D83] text-[#FAF7F2] hover:bg-[#7A8C72] focus:ring-[#8B9D83]',
    secondary:
      'bg-[#C17B5C] text-[#FAF7F2] hover:bg-[#B06A4B] focus:ring-[#C17B5C]',
    outline:
      'border border-[#2C2C2C] text-[#2C2C2C] hover:bg-[#2C2C2C] hover:text-[#FAF7F2] focus:ring-[#2C2C2C]'
  };
  return (
    <motion.button
      whileHover={{
        y: -2
      }}
      whileTap={{
        scale: 0.98
      }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}>

      {children}
      {withIcon && <ArrowRight className="ml-2 h-4 w-4" />}
    </motion.button>);

}