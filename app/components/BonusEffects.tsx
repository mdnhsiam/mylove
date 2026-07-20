'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Moon, Sun, ArrowUp, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { useAudio } from '../context/AudioContext';

interface CursorHeart {
  id: number;
  x: number;
  y: number;
}

function MouseGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed pointer-events-none hidden md:block"
      style={{
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)',
        transform: 'translate(-50%, -50%)',
        zIndex: 9998,
        top: '-999px',
        left: '-999px',
      }}
    />
  );
}

function FloatingCursorHearts() {
  const [hearts, setHearts] = useState<CursorHeart[]>([]);
  const heartIdRef = useRef(0);
  const lastTime = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - lastTime.current < 120) return; // throttle
      if (Math.random() > 0.4) return;
      lastTime.current = now;
      const id = heartIdRef.current++;
      setHearts((prev) => [...prev.slice(-15), { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setHearts((prev) => prev.filter((h) => h.id !== id)), 2000);
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9997] hidden md:block">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ opacity: 0.8, y: 0, scale: 0.5 }}
            animate={{ opacity: 0, y: -60, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, ease: 'easeOut' }}
            className="absolute text-rose-400 pointer-events-none"
            style={{ left: heart.x - 8, top: heart.y - 8 }}
          >
            <Heart size={16} fill="currentColor" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-24 right-4 z-50 p-3 rounded-full glassmorphism text-gold hover:bg-white/10 transition-colors"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

function MusicPlayer() {
  const { isPlaying, isMuted, play, pause, toggleMute } = useAudio();
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2 }}
      className="fixed bottom-24 left-4 z-50 flex flex-col items-start gap-2"
    >
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="glassmorphism rounded-xl px-4 py-2 flex items-center gap-3"
          >
            <button
              onClick={() => (isPlaying ? pause() : play())}
              className="text-gold hover:text-gold-300 transition-colors"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button onClick={toggleMute} className="text-white/60 hover:text-white transition-colors">
              {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </button>
            <span className="text-white/50 text-xs font-display">Music</span>
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setExpanded((p) => !p)}
        className="p-3 rounded-full glassmorphism text-gold hover:bg-white/10 transition-colors"
      >
        {isPlaying ? (
          <motion.div animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
            <Play size={18} fill="currentColor" />
          </motion.div>
        ) : (
          <Play size={18} />
        )}
      </button>
    </motion.div>
  );
}

function EasterEgg() {
  const [showEgg, setShowEgg] = useState(false);
  const keySequence = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keySequence.current.push(e.key);
      keySequence.current = keySequence.current.slice(-10);
      if (keySequence.current.join('') === 'lovelove') {
        setShowEgg(true);
        setTimeout(() => setShowEgg(false), 5000);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <AnimatePresence>
      {showEgg && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowEgg(false)}
        >
          <div className="glassmorphism rounded-3xl p-12 text-center max-w-md mx-4">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            >
              <Heart size={64} className="text-gold mx-auto mb-4" />
            </motion.div>
            <h2 className="font-handwritten text-4xl text-gold text-shadow-gold mb-4">
              Secret Found!
            </h2>
            <p className="font-display text-white/80 text-lg">
              You found the secret code! You are truly my soulmate.
            </p>
            <p className="font-display text-white/50 text-sm mt-4">
              (Hint: type 'lovelove' anywhere)
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function BonusEffects() {
  const { lightMode, setLightMode } = useApp();

  return (
    <>
      <MouseGlow />
      <FloatingCursorHearts />
      <ScrollToTop />
      <MusicPlayer />
      <EasterEgg />

      {/* Theme toggle */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => setLightMode(!lightMode)}
        className="fixed top-6 right-20 z-50 p-3 rounded-full glassmorphism text-gold hover:bg-white/10 transition-colors"
        title={lightMode ? 'Switch to Midnight' : 'Switch to Dawn'}
      >
        {lightMode ? <Sun size={18} /> : <Moon size={18} />}
      </motion.button>
    </>
  );
}
