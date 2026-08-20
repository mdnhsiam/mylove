'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Images, Heart, Eye, Pen, MapPin, Clock, Diamond, Home, Lock, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

const PAGES = [
  { path: '/', label: 'Home', icon: Home },
  { path: '/lock', label: 'Unlock', icon: Lock },
  { path: '/gallery', label: 'Gallery', icon: Images },
  { path: '/reasons', label: 'Reasons', icon: Heart },
  { path: '/secret', label: 'Secret', icon: Eye },
  { path: '/letter', label: 'Letter', icon: Pen },
  { path: '/dreams', label: 'Dreams', icon: MapPin },
  { path: '/countdown', label: 'Us', icon: Clock },
  { path: '/proposal', label: 'Proposal', icon: Diamond },
];

const LOCKED_PATHS = ['/gallery', '/reasons', '/secret', '/letter', '/dreams', '/countdown', '/proposal'];

export default function NavBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { unlocked } = useApp();
  const currentIndex = PAGES.findIndex(p => p.path === pathname);
  const progressPct = currentIndex >= 0 ? ((currentIndex + 1) / PAGES.length) * 100 : 0;

  // Kick out anyone who lands on a locked page without unlocking first
  useEffect(() => {
    if (!unlocked && LOCKED_PATHS.includes(pathname)) {
      router.replace('/lock');
    }
  }, [unlocked, pathname, router]);

  // Hide the nav entirely on the lock screen and until unlocked
  if (pathname === '/lock' || !unlocked) return null;

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-white/5">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-500 to-gold-300"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Floating nav pill */}
      <motion.nav
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 px-2 py-2 rounded-full glassmorphism"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        {PAGES.map((page) => {
          const isActive = pathname === page.path;
          const Icon = page.icon;
          return (
            <Link key={page.path} href={page.path} className="relative group">
              <div
                className={`relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-r from-gold-500 to-gold-300 text-[#1a0b2e] shadow-[0_0_12px_rgba(212,175,55,0.4)]'
                    : 'text-white/50 hover:text-white/80 hover:bg-white/10'
                }`}
              >
                <Icon size={18} />
              </div>
              {/* Tooltip */}
              <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg bg-[#1a0b2e] border border-gold/20 text-white/80 text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none font-display">
                {page.label}
              </span>
            </Link>
          );
        })}
      </motion.nav>

      {/* Chapter indicator - only show on known pages */}
      {currentIndex >= 0 && (
        <motion.div
          className="fixed top-4 left-4 z-50 flex items-center gap-2 px-3 py-1.5 rounded-full glassmorphism text-xs"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <Sparkles size={12} className="text-gold" />
          <span className="text-white/60 font-display">
            {currentIndex + 1} / {PAGES.length}
          </span>
        </motion.div>
      )}
    </>
  );
}
