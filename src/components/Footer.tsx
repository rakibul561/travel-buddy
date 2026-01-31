import React from 'react';
import { Instagram, Twitter, Facebook, Globe } from 'lucide-react';
export function Footer() {
  return (
    <footer className="bg-[#FAF7F2] pt-20 pb-10 px-6 border-t border-[#E8DCC4]/30">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-serif text-[#2C2C2C] mb-6">Voyage.</h3>
            <p className="text-[#2C2C2C]/60 text-sm leading-relaxed">
              Curating exceptional journeys for the modern explorer. Discover
              the world with grace and intention.
            </p>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-[#2C2C2C]">
              Destinations
            </h4>
            <ul className="space-y-3 text-sm text-[#2C2C2C]/70">
              <li>
                <a href="#" className="hover:text-[#C17B5C] transition-colors">
                  Europe
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C17B5C] transition-colors">
                  Asia Pacific
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C17B5C] transition-colors">
                  Americas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C17B5C] transition-colors">
                  Africa
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-[#2C2C2C]">Company</h4>
            <ul className="space-y-3 text-sm text-[#2C2C2C]/70">
              <li>
                <a href="#" className="hover:text-[#C17B5C] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C17B5C] transition-colors">
                  Our Guides
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C17B5C] transition-colors">
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-[#C17B5C] transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-serif text-lg mb-6 text-[#2C2C2C]">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 border border-[#E8DCC4] rounded-full hover:border-[#C17B5C] hover:text-[#C17B5C] transition-all text-[#2C2C2C]/60">

                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 border border-[#E8DCC4] rounded-full hover:border-[#C17B5C] hover:text-[#C17B5C] transition-all text-[#2C2C2C]/60">

                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 border border-[#E8DCC4] rounded-full hover:border-[#C17B5C] hover:text-[#C17B5C] transition-all text-[#2C2C2C]/60">

                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="p-2 border border-[#E8DCC4] rounded-full hover:border-[#C17B5C] hover:text-[#C17B5C] transition-all text-[#2C2C2C]/60">

                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-[#E8DCC4]/30 flex flex-col md:flex-row justify-between items-center text-xs text-[#2C2C2C]/40">
          <p>&copy; 2024 Voyage Travel. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-[#2C2C2C]">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-[#2C2C2C]">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>);

}