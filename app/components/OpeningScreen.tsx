'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { ChevronDown, Heart } from 'lucide-react';
import { useAudio } from '../context/AudioContext';

// Deterministic pseudo-random from seed (avoids SSR hydration mismatch)
function seededRand(n: number): number {
  return Math.abs(((n * 1664525 + 1013904223) | 0)) / 2147483647;
}

export default function OpeningScreen() {
  const router = useRouter();
  const { play } = useAudio();
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowContent(true), 800);
    const t2 = setTimeout(() => setShowButton(true), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleOpen = () => {
    play();
    router.push('/lock');
  };

  const particles = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: seededRand(i * 3 + 1) * 100,
      top: seededRand(i * 7 + 2) * 100,
      size: 3 + seededRand(i * 11 + 3) * 6,
      duration: 4 + seededRand(i * 5 + 4) * 4,
      delay: seededRand(i * 13 + 5) * 4,
      yMove: -(30 + seededRand(i * 9 + 6) * 70),
    })), []
  );

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pb-24">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a0b2e] to-[#2a1045]" />

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full bg-gold-300"
            style={{ left: `${p.left}%`, top: `${p.top}%`, width: `${p.size}px`, height: `${p.size}px` }}
            animate={{ y: [0, p.yMove, 0], opacity: [0, 0.8, 0], scale: [0, 1, 0] }}
            transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4">
        <AnimatePresence>
          {showContent && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            >
              <motion.h1
                className="font-handwritten text-6xl md:text-8xl text-gold text-shadow-gold mb-4"
                animate={{ opacity: [0.8, 1, 0.8] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Meri Jaan
              </motion.h1>

              <motion.p
                className="font-display text-lg md:text-xl text-white/70 tracking-widest uppercase mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 1 }}
              >
                For Someone Who Changed My Life
              </motion.p>

              <motion.div
                className="text-rose-400 mb-8"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart fill="currentColor" size={32} className="mx-auto" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <motion.button
                onClick={handleOpen}
                className="relative group px-10 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 text-[#1a0b2e] font-display text-lg font-semibold tracking-wider overflow-hidden"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(212, 175, 55, 0.3)',
                    '0 0 40px rgba(212, 175, 55, 0.6)',
                    '0 0 20px rgba(212, 175, 55, 0.3)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Open My Heart</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </motion.button>

              <motion.div
                className="mt-12 text-white/40"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <ChevronDown size={24} className="mx-auto" />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}
