'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, Heart, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';

const CUTE_RESPONSES = [
  "Hmm... try again, jaaneman!",
  "Nope, but cute attempt!",
  "Almost there! Think of what I call you...",
  "Wrong! But I love you even more for trying!",
  "That is not it! Let me give you a hint...",
  "Try again! The key to my heart has a special name!",
  "Hmm... think of the name that makes my heart skip a beat!",
  "Wrong answer! But I forgive you because you are my everything!",
  "That is not correct! But you are adorable!",
  "Try the nickname I call you with!",
];

export default function LockScreen() {
  const router = useRouter();
  const { herNickname, setUnlocked } = useApp();
  const { play } = useAudio();
  const [input, setInput] = useState('');
  const [error, setError] = useState('');
  const [errorIndex, setErrorIndex] = useState(1);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHearts, setShowHearts] = useState(false);

  // Generate heart positions client-side only to avoid hydration mismatch
  const hearts = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: (((i * 37 + 13) * 179) % 100),
      size: 20 + ((i * 13) % 30),
      duration: 3 + ((i * 7) % 2),
      delay: ((i * 11) % 15) / 10,
    })),
    []
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = input.trim().toLowerCase().replace(/\s+/g, ' ');
    const normalizedNickname = herNickname.toLowerCase().replace(/\s+/g, ' ');
    if (clean === normalizedNickname || clean === 'meri jaan') {
      setIsCorrect(true);
      setShowHearts(true);
      play();
      setTimeout(() => {
        setUnlocked(true);
        router.push('/gallery');
      }, 2500);
    } else {
      setError(CUTE_RESPONSES[errorIndex % CUTE_RESPONSES.length]);
      setErrorIndex(errorIndex + 1);
      setInput('');
    }
  };

  useEffect(() => {
    if (error) {
      const t = setTimeout(() => setError(''), 3000);
      return () => clearTimeout(t);
    }
  }, [error]);

  return (
    <section id="lock" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1045] via-[#1a0b2e] to-[#0a0a1a]" />

      <div className="relative z-10 w-full max-w-md px-6">
        <AnimatePresence mode="wait">
          {!isCorrect ? (
            <motion.div
              key="lock"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="text-center"
            >
              <motion.div
                className="mb-8 inline-block"
                animate={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-24 h-24 rounded-full glassmorphism flex items-center justify-center mx-auto">
                  <Lock size={40} className="text-gold" />
                </div>
              </motion.div>

              <h2 className="font-display text-3xl md:text-4xl text-white mb-2">
                This Heart is Protected
              </h2>
              <p className="text-white/60 mb-8 font-display text-lg">
                What do I call you?
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Enter the name..."
                  className="w-full px-6 py-4 rounded-full bg-white/5 border border-gold/20 text-white placeholder-white/40 focus:outline-none focus:border-gold/50 transition-colors text-center font-display text-lg"
                  autoComplete="off"
                  autoFocus
                />

                <motion.button
                  type="submit"
                  className="w-full px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-300 text-[#1a0b2e] font-display font-semibold tracking-wider flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  animate={{
                    boxShadow: [
                      '0 0 15px rgba(212, 175, 55, 0.2)',
                      '0 0 30px rgba(212, 175, 55, 0.4)',
                      '0 0 15px rgba(212, 175, 55, 0.2)',
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <span>Unlock My Heart</span>
                  <ArrowRight size={18} />
                </motion.button>
              </form>

              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.9 }}
                    className="mt-6 p-4 rounded-2xl glassmorphism border border-rose-400/30"
                  >
                    <div className="flex items-center gap-2 text-rose-300">
                      <Sparkles size={16} />
                      <span className="font-display">{error}</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.div
                className="mb-6 inline-block"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-gold-400 to-gold-300 flex items-center justify-center mx-auto">
                  <Heart size={48} className="text-[#1a0b2e] fill-current" />
                </div>
              </motion.div>

              <motion.h2
                className="font-handwritten text-5xl md:text-6xl text-gold text-shadow-gold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                Welcome, Meri Jaan
              </motion.h2>

              <motion.p
                className="text-3xl text-white/80"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <span>&#10084;</span>
              </motion.p>

              <motion.p
                className="text-white/60 mt-6 font-display text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                Opening your heart...
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Heart burst on unlock - uses stable positions (no Math.random in render) */}
      {showHearts && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {hearts.map((h) => (
            <motion.div
              key={h.id}
              className="absolute text-rose-400"
              style={{ left: `${h.left}%`, fontSize: `${h.size}px` }}
              initial={{ y: '100%', opacity: 0, scale: 0.5 }}
              animate={{ y: '-20%', opacity: 1, scale: 1 }}
              transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}
            >
              <Heart fill="currentColor" size={h.size} />
            </motion.div>
          ))}
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}
