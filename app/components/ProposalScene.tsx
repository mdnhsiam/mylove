'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Crown, ArrowUp } from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import confetti from 'canvas-confetti';
import { toast } from 'sonner';

function seededRand(n: number) {
  return Math.abs(((n * 1664525 + 1013904223) | 0)) / 2147483647;
}

const BEGGING_MESSAGES = [
  "You can't do this to me! I have a heart you know!",
  "Please be mine! I promise I'll make you chai every morning!",
  "My heart is literally breaking into a million pieces right now!",
  "Think about our future! Cute babies, matching kurtas, everything!",
  "You know you want to say yes! Your face is literally glowing right now!",
  "Don't leave me hanging! I will cry! Real tears! Lots of them!",
  "I am the best choice you will ever make! Ask my mom! She agrees!",
  "Say yes! I will buy you all the biryani in the world!",
  "You already have my heart! It's literally beating for you right now!",
  "Together forever! That's the plan! We already have the hashtag!",
  "Pretty please with rose petals on top? And gulab jamun?",
  "I will never stop asking! I have the patience of a saint!",
  "You are my only one! I deleted my contacts — okay just my ex's contacts!",
  "Can't you see how much I love you? I made a WHOLE WEBSITE for you!",
  "Say yes and let's start forever! I've already picked our song!",
  "I've been practising my 'I do' face! Look at me! Cute right?",
  "Your parents already love me! I'm practically family!",
  "I'll let you pick the web series! Even the slow romantic ones!",
  "I'll be your personal shoulder-massage service for life!",
  "If you say no, I'll turn into a sad potato!",
  "Our future kids are already demanding siblings! Don't disappoint them!",
  "I've already saved your name as 'My Queen' in my phone!",
  "You're the only one who laughs at my terrible puns! That's marriage material!",
  "I'll share my fries with you! That is the ULTIMATE sacrifice!",
  "I have a 10-year plan and you are in literally every single year!",
  "Without you, I'm just a guy with a website and no bride!",
  "Unlimited forehead kisses. That's my offer. Final!",
  "I'll never forget anniversaries! I set 47 reminders!",
  "You're the biryani to my rice! The chai to my samosa!",
  "I'll wake up at 3 AM to talk to you when you can't sleep!",
  "The YES buttons are getting bigger... the universe is trying to tell you something!",
  "Fine, be that way... *begins ugly crying in a corner*",
];

function FireflyField() {
  const fireflies = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      width: 2 + seededRand(i * 3) * 3,
      left: seededRand(i * 7 + 1) * 100,
      top: seededRand(i * 11 + 2) * 100,
      x1: seededRand(i * 5 + 3) * 100 - 50,
      x2: seededRand(i * 13 + 4) * 100 - 50,
      x3: seededRand(i * 17 + 5) * 100 - 50,
      y1: seededRand(i * 19 + 6) * -80,
      y2: seededRand(i * 23 + 7) * -40,
      duration: 5 + seededRand(i * 29 + 8) * 8,
      delay: seededRand(i * 31 + 9) * 5,
      alpha: 0.3 + seededRand(i * 37 + 10) * 0.7,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {fireflies.map((f) => (
        <motion.div
          key={f.id}
          className="absolute rounded-full"
          style={{
            width: `${f.width}px`,
            height: `${f.width}px`,
            left: `${f.left}%`,
            top: `${f.top}%`,
            background: `rgba(255, 215, 0, ${f.alpha})`,
            boxShadow: `0 0 6px rgba(255, 215, 0, 0.6)`,
          }}
          animate={{ x: [0, f.x1, f.x2, f.x3, 0], y: [0, f.y1, f.y2, 0], opacity: [0.2, 1, 0.3, 0.8, 0.2] }}
          transition={{ duration: f.duration, repeat: Infinity, delay: f.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

function FloatingLanterns() {
  const lanterns = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      left: 5 + seededRand(i * 7 + 1) * 90,
      xDrift1: seededRand(i * 11 + 2) * 30 - 15,
      xDrift2: 0,
      duration: 14 + seededRand(i * 13 + 3) * 8,
      delay: seededRand(i * 17 + 4) * 12,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {lanterns.map((l) => (
        <motion.div
          key={l.id}
          className="absolute"
          style={{ left: `${l.left}%`, bottom: '-10%' }}
          animate={{ y: [0, '-110vh'], x: [0, l.xDrift1, l.xDrift2], opacity: [0, 1, 1, 0] }}
          transition={{ duration: l.duration, delay: l.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <div className="relative w-8">
            <div className="w-8 h-10 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-100 rounded-t-lg rounded-b-sm opacity-85" />
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-6 h-1 bg-orange-700 rounded-sm" />
            <div className="absolute inset-0 top-1 bg-white/20 rounded-t-lg rounded-b-sm" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function GlowingRing() {
  const orbs = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      angle: i * (Math.PI / 3),
      x: Math.cos(i * (Math.PI / 3)),
      y: Math.sin(i * (Math.PI / 3)),
    })), []
  );

  return (
    <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-gold/30"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity }}
      />
      <motion.div
        className="absolute inset-4 rounded-full bg-gradient-to-br from-gold-300 via-gold-500 to-gold-300 flex items-center justify-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ boxShadow: '0 0 60px rgba(212, 175, 55, 0.5), inset 0 0 30px rgba(255, 255, 255, 0.3)' }}
      >
        <div className="absolute inset-2 rounded-full bg-gradient-to-br from-[#0a0a1a] to-[#1a0b2e] flex items-center justify-center">
          <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}>
            <Sparkles size={48} className="text-gold" />
          </motion.div>
        </div>
      </motion.div>
      {/* Diamond top */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2"
        animate={{ scale: [1, 1.3, 1], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]" />
      </motion.div>
      {/* Orbiting particles */}
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 w-2 h-2 rounded-full bg-gold"
          animate={{ x: [0, orb.x * 110, orb.x * 80, 0], y: [0, orb.y * 110, orb.y * 80, 0], opacity: [0, 1, 0.5, 0] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 0.6 }}
        />
      ))}
    </div>
  );
}

export default function ProposalScene() {
  const { play } = useAudio();
  const [saidYes, setSaidYes] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noButtonScale, setNoButtonScale] = useState(1);
  const [noButtonVisible, setNoButtonVisible] = useState(true);
  const [yesScale, setYesScale] = useState(1);
  const [yesGlow, setYesGlow] = useState(20);
  const [dodgeCount, setDodgeCount] = useState(0);
  const [showSadFace, setShowSadFace] = useState(false);
  const [heartsBurst, setHeartsBurst] = useState(false);
  const dodgeCountRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const triggerFireworks = useCallback(() => {
    const fire = (origin: { x: number; y: number }) =>
      confetti({
        particleCount: 60,
        spread: 360,
        startVelocity: 30,
        origin,
        colors: ['#d4af37', '#ecc825', '#e11d48', '#ffffff', '#ff6b6b'],
        zIndex: 100,
      });

    let count = 0;
    const interval = setInterval(() => {
      fire({ x: 0.15 + Math.random() * 0.2, y: Math.random() * 0.3 });
      fire({ x: 0.65 + Math.random() * 0.2, y: Math.random() * 0.3 });
      count++;
      if (count > 12) clearInterval(interval);
    }, 300);
  }, []);

  const handleYes = useCallback(() => {
    setSaidYes(true);
    setHeartsBurst(true);
    play();
    triggerFireworks();
  }, [play, triggerFireworks]);

  const handleNoDodge = useCallback(() => {
    const container = containerRef.current;
    if (!container || !noButtonVisible) return;

    const newCount = dodgeCountRef.current + 1;
    dodgeCountRef.current = newCount;
    setDodgeCount(newCount);

    // Compute safe random position relative to container
    const rect = container.getBoundingClientRect();
    const maxOffsetX = Math.min(rect.width * 0.35, 200);
    const maxOffsetY = Math.min(rect.height * 0.25, 120);
    const angle = seededRand(newCount * 7) * Math.PI * 2;
    const radius = 80 + seededRand(newCount * 11) * 80;
    const nx = Math.cos(angle) * radius;
    const ny = Math.sin(angle) * (maxOffsetY / maxOffsetX) * radius;
    setNoButtonPos({ x: Math.max(-maxOffsetX, Math.min(maxOffsetX, nx)), y: Math.max(-maxOffsetY, Math.min(maxOffsetY, ny)) });

    // Grow YES buttons
    setYesScale((s) => Math.min(s + 0.04, 1.5));
    setYesGlow((g) => Math.min(g + 8, 80));

    // Show sad face
    setShowSadFace(true);
    setTimeout(() => setShowSadFace(false), 600);

    // Toast from 3rd dodge
    if (newCount >= 3) {
      const msg = BEGGING_MESSAGES[newCount % BEGGING_MESSAGES.length];
      toast(msg, { duration: 3500, icon: '😢' });
    }

    // Shrink No button
    if (newCount >= 5) {
      setNoButtonScale((s) => Math.max(s - 0.18, 0.01));
    }
    if (newCount >= 8) {
      setTimeout(() => setNoButtonVisible(false), 400);
    }
  }, [noButtonVisible]);

  // Stable hearts for Yes celebration
  const yesHearts = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: seededRand(i * 5 + 1) * 100,
      size: 20 + seededRand(i * 9 + 2) * 30,
      duration: 3 + seededRand(i * 7 + 3) * 2,
      delay: seededRand(i * 11 + 4) * 2,
    })), []
  );

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-10 pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#050510] via-[#0a0a1a] to-[#1a0b2e]" />
      <FireflyField />
      <FloatingLanterns />

      <div ref={containerRef} className="relative z-10 text-center px-4 w-full max-w-4xl">
        <AnimatePresence mode="wait">
          {!saidYes ? (
            <motion.div
              key="proposal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="mb-6"
              >
                <Crown size={40} className="text-gold mx-auto" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mb-10"
              >
                <GlowingRing />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mb-10"
              >
                <p className="font-display text-white/70 text-lg md:text-xl mb-4 tracking-wide">
                  Out of billions of people...
                </p>
                <h2 className="font-handwritten text-4xl md:text-6xl text-gold text-shadow-gold mb-4">
                  I found my forever in you
                </h2>
                <p className="font-display text-white/50 text-base md:text-lg italic max-w-2xl mx-auto">
                  Every moment with you has been a gift. Now I want to give you the rest of my life.
                </p>
                <div className="mt-6 flex items-center justify-center gap-2 text-rose-400">
                  <Star size={16} fill="currentColor" />
                  <span className="font-handwritten text-xl">You are the most special person in the world</span>
                  <Star size={16} fill="currentColor" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="flex flex-col items-center gap-4"
              >
                <motion.h3
                  className="font-handwritten text-3xl md:text-4xl text-white mb-6"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Will You Marry Me?
                </motion.h3>

                {/* Buttons row — contained in a relative div with overflow visible */}
                <div className="relative flex flex-wrap justify-center gap-4 py-8 px-4 min-h-[100px] w-full max-w-xl">
                  <motion.button
                    onClick={handleYes}
                    className="relative group px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 text-[#1a0b2e] font-display text-lg font-semibold tracking-wider flex items-center gap-2 overflow-hidden"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: yesScale,
                      boxShadow: [
                        `0 0 ${yesGlow}px rgba(212, 175, 55, 0.3)`,
                        `0 0 ${yesGlow * 2}px rgba(212, 175, 55, 0.6)`,
                        `0 0 ${yesGlow}px rgba(212, 175, 55, 0.3)`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span className="relative z-10">YES</span>
                    <Heart size={18} className="fill-current" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </motion.button>

                  <motion.button
                    onClick={handleYes}
                    className="relative px-8 py-4 rounded-full bg-gradient-to-r from-rose-600 via-rose-400 to-rose-600 text-white font-display text-lg font-semibold tracking-wider flex items-center gap-2"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{
                      scale: yesScale,
                      boxShadow: [
                        `0 0 ${yesGlow}px rgba(225, 29, 72, 0.3)`,
                        `0 0 ${yesGlow * 2}px rgba(225, 29, 72, 0.5)`,
                        `0 0 ${yesGlow}px rgba(225, 29, 72, 0.3)`,
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <span>ABSOLUTELY YES</span>
                    <Heart size={18} className="fill-current" />
                  </motion.button>

                  {/* No button — constrained escape using Framer translate, not absolute position */}
                  <AnimatePresence>
                    {noButtonVisible && (
                      <motion.button
                        onClick={handleNoDodge}
                        onMouseEnter={handleNoDodge}
                        className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white/60 font-display text-sm hover:bg-white/20 transition-colors cursor-not-allowed flex-shrink-0"
                        animate={{
                          x: noButtonPos.x,
                          y: noButtonPos.y,
                          scale: noButtonScale,
                          opacity: noButtonScale < 0.3 ? noButtonScale * 3 : 1,
                        }}
                        exit={{ opacity: 0, scale: 0, transition: { duration: 0.3 } }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                      >
                        {dodgeCount >= 5 ? "Please don't..." : dodgeCount >= 3 ? "Ugh fine, but..." : "No..."}
                      </motion.button>
                    )}
                  </AnimatePresence>
                </div>

                {/* Sad face */}
                <AnimatePresence>
                  {showSadFace && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className="text-4xl"
                    >
                      &#128557;
                    </motion.div>
                  )}
                </AnimatePresence>

                {dodgeCount > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white/40 text-sm font-display"
                  >
                    Dodge #{dodgeCount}... but I will keep loving you forever
                  </motion.p>
                )}

                {dodgeCount >= 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-gold/60 text-sm font-display"
                  >
                    <ArrowUp size={14} />
                    <span>The YES buttons are getting bigger... the universe is voting!</span>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="text-center"
            >
              <motion.div
                className="mb-8"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-gold-400 to-gold-300 flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(212,175,55,0.5)]">
                  <Heart size={56} className="text-[#1a0b2e] fill-current" />
                </div>
              </motion.div>

              <motion.h2
                className="font-handwritten text-5xl md:text-7xl text-gold text-shadow-gold mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                You Said Yes!
              </motion.h2>

              <motion.p
                className="font-display text-2xl md:text-3xl text-white mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                You just made me the happiest man alive!
              </motion.p>

              <motion.p
                className="font-display text-white/60 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                I promise to love you, cherish you, and annoy you for the rest of my life.
              </motion.p>

              <motion.div
                className="mt-8 flex justify-center gap-4 text-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Heart size={32} className="text-rose-400 fill-rose-400" />
                <Heart size={32} className="text-gold fill-gold" />
                <Heart size={32} className="text-rose-400 fill-rose-400" />
              </motion.div>

              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glassmorphism border border-gold/20">
                  <Star size={16} className="text-gold fill-gold" />
                  <span className="font-handwritten text-gold text-xl">Our forever begins now</span>
                  <Star size={16} className="text-gold fill-gold" />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating hearts burst — outside container, properly in AnimatePresence */}
      <AnimatePresence>
        {heartsBurst && (
          <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 60 }}>
            {yesHearts.map((h) => (
              <motion.div
                key={h.id}
                className="absolute text-rose-400"
                style={{ left: `${h.left}%`, bottom: '0' }}
                initial={{ y: 0, opacity: 0, scale: 0.5 }}
                animate={{ y: '-110vh', opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 1] }}
                transition={{ duration: h.duration, delay: h.delay, ease: 'easeOut' }}
              >
                <Heart fill="currentColor" size={h.size} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
