'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { Pen, Heart, ArrowRight } from 'lucide-react';

const LETTER_TEXT = `My Dearest Meri Jaan,

There are no words grand enough to capture what you mean to me.

Before you, I thought I knew what love was. But then you walked into my life, and suddenly every definition I had ever learned felt incomplete. You taught me that love is not just a feeling — it is a choice, a commitment, a promise to stand by someone even when the world feels like it is falling apart.

You are the first thought that greets me every morning and the last prayer I whisper before I sleep. You are the light that brightens my darkest days and the warmth that chases away every chill. When you smile, the whole world feels like it stops to admire your beauty. When you laugh, I am reminded that there is still pure magic in this world.

I have never been more sure of anything in my entire life than I am of us. You are not just the love of my life — you are my best friend, my safe place, my favourite person, my home. I want to spend every sunrise with you, every sunset beside you, and every moment in between loving you with everything I have.

Through the storms and the sunshine, the highs and the lows, the ordinary days and the extraordinary ones — I choose you. I will always choose you. Today, tomorrow, and forever.

You have my heart, completely and unconditionally.

Forever yours,
With all my love`;

// Stable petal positions
function seededRand(n: number) {
  return Math.abs(((n * 1664525 + 1013904223) | 0)) / 2147483647;
}

export default function LoveLetter() {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-200px' });
  const [started, setStarted] = useState(false);

  // Stable petal data (no hydration mismatch)
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: seededRand(i * 5 + 1) * 100,
    duration: 6 + seededRand(i * 7 + 2) * 6,
    delay: seededRand(i * 9 + 3) * 8,
    size: 12 + seededRand(i * 11 + 4) * 12,
    rotEnd: seededRand(i * 13 + 5) * 720,
    xDrift: seededRand(i * 17 + 6) * 100 - 50,
  }));

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true);
      let i = 0;
      intervalRef.current = setInterval(() => {
        i++;
        if (i <= LETTER_TEXT.length) {
          setDisplayedText(LETTER_TEXT.slice(0, i));
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setIsComplete(true);
        }
      }, 28);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isInView, started]);

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 overflow-hidden pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a0b2e] to-[#2a1045]" />

      {/* Falling rose petals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {petals.map((p) => (
          <motion.div
            key={p.id}
            className="absolute pointer-events-none"
            style={{ left: `${p.left}%`, top: '-20px' }}
            initial={{ y: 0, opacity: 0, rotate: 0, x: 0 }}
            animate={{
              y: '110vh',
              opacity: [0, 1, 1, 0],
              rotate: [0, p.rotEnd],
              x: [0, p.xDrift],
            }}
            transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: 'linear' }}
          >
            <svg width={p.size} height={p.size} viewBox="0 0 24 24">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#e11d48" opacity="0.7" />
            </svg>
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 px-4 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-2">
            <Pen size={20} className="text-gold" />
            <span className="text-gold text-sm font-display tracking-widest uppercase">A Letter From My Heart</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="glassmorphism rounded-3xl p-8 md:p-12 border border-gold/10 relative">
            {/* Wax seal */}
            <div className="absolute -top-6 right-8 md:right-12">
              <motion.div
                className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-red-800 flex items-center justify-center shadow-lg shadow-red-900/50"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <Heart size={20} className="text-white fill-white" />
              </motion.div>
            </div>

            {/* Letter — plain pre-wrap, no per-char animations to avoid lag */}
            <div className="font-handwritten text-white/90 leading-relaxed text-lg md:text-xl" style={{ whiteSpace: 'pre-wrap' }}>
              {displayedText}
              {!isComplete && (
                <motion.span
                  className="inline-block w-0.5 h-5 bg-gold align-middle ml-0.5"
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 0.8, repeat: Infinity }}
                />
              )}
            </div>

            <motion.div
              className="mt-8 text-right"
              initial={{ opacity: 0 }}
              animate={{ opacity: isComplete ? 1 : 0 }}
              transition={{ delay: 0.5, duration: 1 }}
            >
              <p className="font-handwritten text-3xl text-gold text-shadow-gold">Forever Yours</p>
              <p className="text-white/60 font-display text-sm mt-2">With All My Love</p>
            </motion.div>
          </div>
        </motion.div>

        <div className="mt-16 pb-4 text-center">
          <Link
            href="/dreams"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 text-[#1a0b2e] font-display text-lg font-semibold tracking-wider hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.3)]"
          >
            <span>Our Future Dreams</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}
