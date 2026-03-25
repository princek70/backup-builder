'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Pricing', href: '/pricing' },
];

export default function NavLinks() {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8 relative w-full md:w-auto">
      {links.map((link) => {
        // Synchronize active states using usePathname as requested
        const isActive = pathname === link.href;

        return (
          <Link
            key={link.name}
            href={link.href}
            onMouseEnter={() => setHoveredPath(link.href)}
            onMouseLeave={() => setHoveredPath(null)}
            className="relative px-4 py-2 text-sm font-semibold tracking-tight transition-colors w-full md:w-auto text-center md:text-left rounded-xl md:rounded-none group"
          >
            {/* Mobile Background Highlight (Hidden on Desktop) */}
            <div className="absolute inset-0 bg-indigo-600/10 rounded-xl opacity-0 hover:opacity-100 md:hidden transition-opacity" />

            <span className={`relative z-10 ${isActive ? 'text-primary dark:text-white' : 'text-on-surface-variant hover:text-primary dark:hover:text-white'}`}>
              {link.name}
            </span>
            
            {/* Active Underline (Shared Layout Animation - Hidden on Mobile) */}
            {isActive && (
              <motion.div
                layoutId="underline"
                className="absolute left-0 right-0 -bottom-1 h-[2px] bg-indigo-600 rounded-full hidden md:block"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* Ghost Underline Hover Effect (Hidden on Mobile) */}
            <AnimatePresence>
              {!isActive && hoveredPath === link.href && (
                <motion.div
                  layoutId="ghost-underline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 right-0 -bottom-1 h-[2px] bg-indigo-600 rounded-full hidden md:block"
                />
              )}
            </AnimatePresence>
          </Link>
        )
      })}
    </div>
  )
}
