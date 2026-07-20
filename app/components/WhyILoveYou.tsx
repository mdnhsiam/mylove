'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Eye, ArrowRight } from 'lucide-react';

const REASONS = [
  { id: 1, text: "Your smile makes my entire day better" },
  { id: 2, text: "The way you laugh at my terrible jokes" },
  { id: 3, text: "You always know exactly what I need" },
  { id: 4, text: "Your kindness to everyone around you" },
  { id: 5, text: "How you make even ordinary moments special" },
  { id: 6, text: "The way you look at me when I am not looking" },
  { id: 7, text: "Your strength and determination inspire me" },
  { id: 8, text: "You make me want to be a better person" },
  { id: 9, text: "The way you hold my hand when I am nervous" },
  { id: 10, text: "Your voice is my favourite sound in the world" },
  { id: 11, text: "You remember the little things I say" },
  { id: 12, text: "The way you dance when you think nobody is watching" },
  { id: 13, text: "Your patience when I am being difficult" },
  { id: 14, text: "How you make me feel safe and loved" },
  { id: 15, text: "Your beautiful eyes I could get lost in forever" },
  { id: 16, text: "The way you support my dreams" },
  { id: 17, text: "You are my best friend and my love" },
  { id: 18, text: "The way you make mundane tasks fun" },
  { id: 19, text: "Your courage to always be yourself" },
  { id: 20, text: "How you make every room brighter just by entering" },
  { id: 21, text: "Your messages that make me smile randomly" },
  { id: 22, text: "The way you care about my feelings" },
  { id: 23, text: "Your intelligence that constantly impresses me" },
  { id: 24, text: "How you make me feel like the luckiest person" },
  { id: 25, text: "Your hugs that feel exactly like home" },
  { id: 26, text: "The way you make me laugh when I am sad" },
  { id: 27, text: "Your beauty that takes my breath away" },
  { id: 28, text: "How you believe in me even when I do not" },
  { id: 29, text: "The way you make our future feel so exciting" },
  { id: 30, text: "You are simply the most wonderful person in my world" },
];

function ReasonCard({ reason, index, onFlip }: { reason: typeof REASONS[0]; index: number; onFlip: () => void }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) onFlip();
    setIsFlipped(!isFlipped);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay: index * 0.03 }}
      className="relative cursor-pointer select-none"
      style={{ perspective: '1000px' }}
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full aspect-square rounded-2xl"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl glassmorphism border border-gold/10 flex items-center justify-center"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="text-center p-3">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-2">
              <span className="text-gold text-sm font-display font-bold">{reason.id}</span>
            </div>
            <div className="flex items-center justify-center gap-1 text-white/30 mt-1">
              <Eye size={11} />
              <span className="text-xs font-display">tap</span>
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gold-500/10 to-gold-300/10 border border-gold/20 flex items-center justify-center p-3"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <div className="text-center">
            <Heart size={14} className="text-gold/60 fill-gold/30 mx-auto mb-2" />
            <p className="text-white font-display text-xs leading-relaxed">{reason.text}</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function WhyILoveYou() {
  const [flippedCount, setFlippedCount] = useState(0);

  return (
    <section className="relative min-h-screen py-20 overflow-hidden pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1045] via-[#1a0b2e] to-[#0a0a1a]" />

      <div className="relative z-10 px-4 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Heart size={20} className="text-gold fill-gold" />
            <span className="text-gold text-sm font-display tracking-widest uppercase">30 Reasons</span>
          </div>
          <h2 className="font-handwritten text-5xl md:text-6xl text-gold text-shadow-gold mb-4">
            Why I Love You
          </h2>
          <p className="font-display text-white/60 text-lg max-w-xl mx-auto mb-4">
            30 cards, 30 reasons — tap each one to reveal
          </p>

          {/* Progress bar */}
          <div className="max-w-xs mx-auto">
            <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-300 rounded-full"
                animate={{ width: `${(flippedCount / 30) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <p className="text-white/30 text-xs font-display mt-1 text-center">
              {flippedCount} / 30 revealed
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
          {REASONS.map((reason, index) => (
            <ReasonCard key={reason.id} reason={reason} index={index} onFlip={() => setFlippedCount(c => c + 1)} />
          ))}
        </div>

        {flippedCount === 30 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-10 text-center"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full glassmorphism border border-gold/30">
              <Sparkles size={16} className="text-gold" />
              <span className="font-handwritten text-gold text-xl">You found all 30 reasons!</span>
              <Sparkles size={16} className="text-gold" />
            </div>
          </motion.div>
        )}

        <div className="mt-12 pb-4 text-center">
          <Link href="/secret" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 text-[#1a0b2e] font-display text-lg font-semibold tracking-wider hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <span>A Secret for You</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}
