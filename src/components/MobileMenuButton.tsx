'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Menu, Home, CreditCard, PenSquare, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const links = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'Pricing', href: '/pricing', icon: CreditCard },
  { name: 'Builder', href: '/builder', icon: PenSquare },
];

export default function MobileMenuButton({ siteName }: { siteName: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Required for createPortal SSR safety
  useEffect(() => { setMounted(true); }, []);

  // Close menu on route change
  useEffect(() => { setIsOpen(false); }, [pathname]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const drawer = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Full-screen backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{ position: 'fixed', inset: 0, zIndex: 9998, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(4px)' }}
            onClick={() => setIsOpen(false)}
          />

          {/* Slide-in Drawer */}
          <motion.div
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100%',
              width: '80vw',
              maxWidth: '320px',
              zIndex: 9999,
              background: '#ffffff',
              boxShadow: '-8px 0 40px rgba(31,26,111,0.18)',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Drawer Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 24px', borderBottom: '1px solid rgba(199,197,212,0.3)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Sparkles size={20} style={{ color: '#1f1a6f' }} />
                <span style={{ fontSize: '18px', fontWeight: 900, color: '#1f1a6f', letterSpacing: '-0.5px' }}>{siteName}</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                style={{ padding: '8px', borderRadius: '12px', border: 'none', background: 'transparent', cursor: 'pointer', color: '#464652', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Close menu"
              >
                <X size={22} />
              </button>
            </div>

            {/* Nav Links */}
            <nav style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {links.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '16px',
                      padding: '14px 16px',
                      borderRadius: '16px',
                      fontWeight: 600,
                      fontSize: '16px',
                      textDecoration: 'none',
                      transition: 'all 0.15s',
                      background: isActive ? 'rgba(31,26,111,0.08)' : 'transparent',
                      color: isActive ? '#1f1a6f' : '#464652',
                    }}
                  >
                    <Icon size={20} />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* CTA at bottom */}
            <div style={{ padding: '20px 24px', borderTop: '1px solid rgba(199,197,212,0.3)' }}>
              <Link href="/builder" onClick={() => setIsOpen(false)} style={{ display: 'block' }}>
                <button style={{
                  width: '100%',
                  background: 'linear-gradient(135deg, #1f1a6f, #363386)',
                  color: '#ffffff',
                  padding: '16px',
                  borderRadius: '16px',
                  fontWeight: 700,
                  fontSize: '16px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 8px 24px rgba(31,26,111,0.25)',
                }}>
                  Start Building →
                </button>
              </Link>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="md:hidden">
      {/* Hamburger / Close toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-primary rounded-xl hover:bg-primary/5 transition-colors"
        aria-label="Toggle menu"
        style={{ zIndex: 10000 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isOpen ? 'close' : 'open'}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Render drawer at document.body to escape stacking contexts */}
      {mounted && createPortal(drawer, document.body)}
    </div>
  );
}
