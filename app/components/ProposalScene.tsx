'use client';

import { useState, useRef, useCallback, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, Star, Crown, ArrowUp, Diamond, Infinity as InfinityIcon, Gem } from 'lucide-react';
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

// Headline messages that grow in intensity as she keeps dodging
const DODGE_HEADLINES = [
  { title: "Wait... really?", sub: "I promise I'm worth it. Ask anyone. Even my cat." },
  { title: "Ouch. My heart.", sub: "That one actually hurt. But I forgive you. Because I'm in love." },
  { title: "Still no?!", sub: "I have 47 backup proposals ready. This is just #1." },
  { title: "Okay you're just being stubborn now", sub: "Admit it — you're enjoying watching me beg." },
  { title: "The YES buttons are literally GROWING", sub: "Science can't explain this. Love can." },
  { title: "I will NOT give up", sub: "I have snacks. I have time. I have forever." },
  { title: "Even the No button is shrinking", sub: "It's embarrassed to exist at this point." },
  { title: "Last chance to say yes nicely", sub: "After this I'm sending the flash mob." },
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
    <div className="relative w-40 h-40 sm:w-48 sm:h-48 md:w-64 md:h-64 mx-auto">
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
            <Gem size={36} className="text-gold sm:hidden" />
            <Sparkles size={48} className="text-gold hidden sm:block" />
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
  const [isMobile, setIsMobile] = useState(false);
  const dodgeCountRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile for touch-friendly dodge behavior
  useEffect(() => {
    const check = () => setIsMobile(window.matchMedia('(max-width: 768px)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

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

    // Compute safe random position relative to container, tighter on mobile
    const rect = container.getBoundingClientRect();
    const maxOffsetX = Math.min(rect.width * (isMobile ? 0.28 : 0.35), isMobile ? 120 : 200);
    const maxOffsetY = Math.min(rect.height * 0.2, 100);
    const angle = seededRand(newCount * 7) * Math.PI * 2;
    const radius = (isMobile ? 60 : 80) + seededRand(newCount * 11) * (isMobile ? 50 : 80);
    const nx = Math.cos(angle) * radius;
    const ny = Math.sin(angle) * (maxOffsetY / Math.max(maxOffsetX, 1)) * radius;
    setNoButtonPos({
      x: Math.max(-maxOffsetX, Math.min(maxOffsetX, nx)),
      y: Math.max(-maxOffsetY, Math.min(maxOffsetY, ny)),
    });

    // Grow YES buttons faster on mobile so they dominate sooner
    const growStep = isMobile ? 0.06 : 0.04;
    setYesScale((s) => Math.min(s + growStep, 1.5));
    setYesGlow((g) => Math.min(g + 8, 80));

    // Show sad face
    setShowSadFace(true);
    setTimeout(() => setShowSadFace(false), 600);

    // Toast from 3rd dodge
    if (newCount >= 3) {
      const msg = BEGGING_MESSAGES[newCount % BEGGING_MESSAGES.length];
      toast(msg, { duration: 3500, icon: '😢' });
    }

    // Shrink No button sooner on mobile
    const shrinkThreshold = isMobile ? 4 : 5;
    if (newCount >= shrinkThreshold) {
      setNoButtonScale((s) => Math.max(s - 0.18, 0.01));
    }
    if (newCount >= 8) {
      setTimeout(() => setNoButtonVisible(false), 400);
    }
  }, [noButtonVisible, isMobile]);

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

  const currentHeadline = DODGE_HEADLINES[Math.min(dodgeCount - 1, DODGE_HEADLINES.length - 1)];

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden py-16 pb-32">
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
                className="mb-4 sm:mb-6"
              >
                <Crown size={36} className="text-gold mx-auto sm:hidden" />
                <Crown size={40} className="text-gold mx-auto hidden sm:block" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="mb-8 sm:mb-10"
              >
                <GlowingRing />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.8 }}
                className="mb-8 sm:mb-10"
              >
                <p className="font-display text-white/70 text-base sm:text-lg md:text-xl mb-3 sm:mb-4 tracking-wide">
                  Out of billions of people...
                </p>
                <h2 className="font-handwritten text-3xl sm:text-4xl md:text-6xl text-gold text-shadow-gold mb-3 sm:mb-4 leading-tight">
                  I found my forever in you
                </h2>
                <p className="font-display text-white/50 text-sm sm:text-base md:text-lg italic max-w-2xl mx-auto px-2">
                  Every moment with you has been a gift. Now I want to give you the rest of my life.
                </p>
                <div className="mt-4 sm:mt-6 flex items-center justify-center gap-2 text-rose-400">
                  <Star size={14} fill="currentColor" className="flex-shrink-0" />
                  <span className="font-handwritten text-base sm:text-xl text-center">
                    You are the most special person in the world
                  </span>
                  <Star size={14} fill="currentColor" className="flex-shrink-0" />
                </div>
              </motion.div>

              {/* Dynamic dodge headline — appears after first dodge */}
              <AnimatePresence>
                {dodgeCount > 0 && (
                  <motion.div
                    key={`headline-${dodgeCount}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-4 sm:mb-6 px-4"
                  >
                    <h3 className="font-handwritten text-2xl sm:text-3xl text-rose-300 mb-1">
                      {currentHeadline.title}
                    </h3>
                    <p className="font-display text-white/60 text-sm sm:text-base italic">
                      {currentHeadline.sub}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.8 }}
                className="flex flex-col items-center gap-4"
              >
                <motion.h3
                  className="font-handwritten text-2xl sm:text-3xl md:text-4xl text-white mb-4 sm:mb-6 text-center px-4"
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  Will You Marry Me?
                </motion.h3>

                {/* Buttons — stack on mobile, row on desktop */}
                <div className="relative flex flex-col sm:flex-row flex-wrap justify-center items-center gap-3 sm:gap-4 py-6 sm:py-8 px-2 min-h-[120px] sm:min-h-[100px] w-full max-w-xl">
                  <motion.button
                    onClick={handleYes}
                    className="relative group px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 text-[#1a0b2e] font-display text-base sm:text-lg font-semibold tracking-wider flex items-center gap-2 overflow-hidden w-full sm:w-auto justify-center"
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
                    <Heart size={18} className="fill-current flex-shrink-0" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </motion.button>

                  <motion.button
                    onClick={handleYes}
                    className="relative px-6 sm:px-8 py-3 sm:py-4 rounded-full bg-gradient-to-r from-rose-600 via-rose-400 to-rose-600 text-white font-display text-base sm:text-lg font-semibold tracking-wider flex items-center gap-2 w-full sm:w-auto justify-center"
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
                    <Heart size={18} className="fill-current flex-shrink-0" />
                  </motion.button>

                  {/* No button — constrained escape using Framer translate */}
                  <AnimatePresence>
                    {noButtonVisible && (
                      <motion.button
                        onClick={handleNoDodge}
                        onMouseEnter={isMobile ? undefined : handleNoDodge}
                        onTouchStart={isMobile ? handleNoDodge : undefined}
                        className="px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/10 border border-white/20 text-white/60 font-display text-xs sm:text-sm hover:bg-white/20 transition-colors cursor-not-allowed flex-shrink-0 self-center"
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
                      className="text-3xl sm:text-4xl"
                    >
                      &#128557;
                    </motion.div>
                  )}
                </AnimatePresence>

                {dodgeCount > 0 && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-white/40 text-xs sm:text-sm font-display text-center px-4"
                  >
                    Dodge #{dodgeCount}... but I will keep loving you forever
                  </motion.p>
                )}

                {dodgeCount >= 3 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center justify-center gap-2 text-gold/60 text-xs sm:text-sm font-display text-center px-4"
                  >
                    <ArrowUp size={14} className="flex-shrink-0" />
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
              className="text-center px-2"
            >
              <motion.div
                className="mb-6 sm:mb-8"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-r from-gold-400 to-gold-300 flex items-center justify-center mx-auto shadow-[0_0_60px_rgba(212,175,55,0.5)]">
                  <Heart size={40} className="text-[#1a0b2e] fill-current sm:hidden" />
                  <Heart size={56} className="text-[#1a0b2e] fill-current hidden sm:block" />
                </div>
              </motion.div>

              <motion.h2
                className="font-handwritten text-4xl sm:text-5xl md:text-7xl text-gold text-shadow-gold mb-4 sm:mb-6 leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                You Said Yes!
              </motion.h2>

              <motion.p
                className="font-display text-xl sm:text-2xl md:text-3xl text-white mb-3 sm:mb-4 px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                You just made me the happiest man alive!
              </motion.p>

              <motion.p
                className="font-display text-white/60 text-base sm:text-lg px-2 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                I promise to love you, cherish you, and annoy you for the rest of my life.
              </motion.p>

              <motion.div
                className="mt-6 sm:mt-8 flex justify-center gap-3 sm:gap-4 text-2xl sm:text-3xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <Heart size={28} className="text-rose-400 fill-rose-400 sm:hidden" />
                <Heart size={32} className="text-rose-400 fill-rose-400 hidden sm:block" />
                <Heart size={28} className="text-gold fill-gold sm:hidden" />
                <Heart size={32} className="text-gold fill-gold hidden sm:block" />
                <Heart size={28} className="text-rose-400 fill-rose-400 sm:hidden" />
                <Heart size={32} className="text-rose-400 fill-rose-400 hidden sm:block" />
              </motion.div>

              <motion.div
                className="mt-6 sm:mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
              >
                <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2.5 sm:py-3 rounded-full glassmorphism border border-gold/20">
                  <Star size={14} className="text-gold fill-gold flex-shrink-0 sm:hidden" />
                  <Star size={16} className="text-gold fill-gold flex-shrink-0 hidden sm:block" />
                  <span className="font-handwritten text-gold text-lg sm:text-xl">Our forever begins now</span>
                  <Star size={14} className="text-gold fill-gold flex-shrink-0 sm:hidden" />
                  <Star size={16} className="text-gold fill-gold flex-shrink-0 hidden sm:block" />
                </div>
              </motion.div>

              <motion.div
                className="mt-8 sm:mt-10 flex flex-col items-center gap-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.8 }}
              >
                <div className="flex items-center gap-2 text-white/40 font-display text-xs sm:text-sm">
                  <InfinityIcon size={14} className="text-gold/60" />
                  <span>From this moment, until the end of time</span>
                  <InfinityIcon size={14} className="text-gold/60" />
                </div>
                <div className="flex items-center gap-2 text-white/30 font-display text-[10px] sm:text-xs">
                  <Diamond size={12} className="text-gold/40" />
                  <span>Made with infinite love, just for you</span>
                  <Diamond size={12} className="text-gold/40" />
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
