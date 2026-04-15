'use client';

import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import NavLinks from './NavLinks';
import Link from 'next/link';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Toggle Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-primary focus:outline-none z-[60] relative"
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Overlay Menu */}
      <div 
        className={`fixed inset-0 bg-white z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full pt-24 px-8">
          <div className="flex flex-col gap-6 text-2xl font-black text-primary mb-12">
             <NavLinks />
          </div>
          
          <div className="mt-auto pb-12 border-t border-outline-variant/10 pt-8">
            <Link href="/builder" onClick={() => setIsOpen(false)}>
              <button className="w-full bg-primary text-on-primary py-4 rounded-2xl font-black text-xl shadow-xl shadow-primary/20">
                Go to Builder
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
