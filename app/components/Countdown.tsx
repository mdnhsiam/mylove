'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useInView } from 'framer-motion';
import { Heart, Clock, Calendar, Sunrise, Moon } from 'lucide-react';
import { useApp } from '../context/AppContext';
import Link from 'next/link';

interface TimeElapsed {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalSeconds: number;
  heartbeats: number;
  isFuture: boolean;
}

function calculateTimeElapsed(startDate: Date): TimeElapsed {
  const now = new Date();
  const isFuture = now < startDate;
  const base = isFuture ? startDate : now;
  const from = isFuture ? now : startDate;

  const diff = base.getTime() - from.getTime();
  const totalSeconds = Math.floor(diff / 1000);
  const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));

  // Proper date arithmetic for years/months/days
  const fromD = new Date(isFuture ? now : startDate);
  const toD = new Date(isFuture ? startDate : now);

  let years = toD.getFullYear() - fromD.getFullYear();
  let months = toD.getMonth() - fromD.getMonth();
  let days = toD.getDate() - fromD.getDate();
  let hours = toD.getHours() - fromD.getHours();
  let minutes = toD.getMinutes() - fromD.getMinutes();
  let seconds = toD.getSeconds() - fromD.getSeconds();

  if (seconds < 0) { seconds += 60; minutes--; }
  if (minutes < 0) { minutes += 60; hours--; }
  if (hours < 0) { hours += 24; days--; }
  if (days < 0) {
    const prevMonth = new Date(toD.getFullYear(), toD.getMonth(), 0);
    days += prevMonth.getDate();
    months--;
  }
  if (months < 0) { months += 12; years--; }

  return {
    years: Math.max(0, years),
    months: Math.max(0, months),
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
    totalDays,
    totalSeconds,
    heartbeats: Math.floor(totalSeconds * 1.2),
    isFuture,
  };
}

function seededRand(n: number) {
  return Math.abs(((n * 1664525 + 1013904223) | 0)) / 2147483647;
}

function TimeCard({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glassmorphism rounded-2xl p-4 md:p-6 text-center min-w-[90px]"
    >
      <div className="font-display text-3xl md:text-4xl font-bold text-gold text-shadow-gold tabular-nums">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-white/50 text-xs md:text-sm font-display mt-1 uppercase tracking-wider">
        {label}
      </div>
    </motion.div>
  );
}

function FunFact({ icon: Icon, label, value, delay }: { icon: React.ElementType; label: string; value: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="glassmorphism rounded-2xl p-4 flex items-center gap-3"
    >
      <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
        <Icon size={20} className="text-gold" />
      </div>
      <div>
        <div className="font-display text-lg text-white font-semibold tabular-nums">{value}</div>
        <div className="text-white/40 text-xs font-display">{label}</div>
      </div>
    </motion.div>
  );
}

export default function Countdown() {
  const { startDate } = useApp();
  const [time, setTime] = useState<TimeElapsed>(() => calculateTimeElapsed(startDate));
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setTime(calculateTimeElapsed(startDate));
    }, 1000);
    return () => clearInterval(interval);
  }, [isInView, startDate]);

  const dots = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: seededRand(i * 3 + 1) * 100,
      top: seededRand(i * 7 + 2) * 100,
      size: 2 + seededRand(i * 5 + 3) * 4,
      opacity: 0.1 + seededRand(i * 11 + 4) * 0.3,
      duration: 3 + seededRand(i * 13 + 5) * 3,
      delay: seededRand(i * 9 + 6) * 3,
    })), []
  );

  const dateLabel = startDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <section ref={sectionRef} className="relative min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a1a] via-[#1a0b2e] to-[#2a1045]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {dots.map((d) => (
          <motion.div
            key={d.id}
            className="absolute rounded-full bg-gold-300"
            style={{ left: `${d.left}%`, top: `${d.top}%`, width: `${d.size}px`, height: `${d.size}px`, opacity: d.opacity }}
            animate={{ y: [0, -20, 0], opacity: [d.opacity, d.opacity * 4, d.opacity] }}
            transition={{ duration: d.duration, repeat: Infinity, delay: d.delay }}
          />
        ))}
      </div>

      <div className="relative z-10 px-4 text-center w-full max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <div className="inline-flex items-center gap-2 mb-4">
            <Clock size={20} className="text-gold" />
            <span className="text-gold text-sm font-display tracking-widest uppercase">Our Story in Time</span>
          </div>

          {time.isFuture ? (
            <h2 className="font-handwritten text-4xl md:text-5xl text-gold text-shadow-gold mb-4">
              Our story begins on {dateLabel}
            </h2>
          ) : (
            <h2 className="font-handwritten text-5xl md:text-6xl text-gold text-shadow-gold mb-4">
              {time.totalDays.toLocaleString()} Days of Us
            </h2>
          )}

          <p className="font-display text-white/60 text-lg max-w-xl mx-auto">
            Every heartbeat, every laugh, every "I love you" is counted here
          </p>
        </motion.div>

        {/* Big days counter */}
        {!time.isFuture && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-10"
          >
            <div className="inline-flex items-center gap-4 px-8 py-6 rounded-3xl glassmorphism border border-gold/20">
              <Calendar size={32} className="text-gold" />
              <div className="text-left">
                <div className="font-display text-4xl md:text-5xl font-bold text-gold text-shadow-gold tabular-nums">
                  {time.totalDays.toLocaleString()}
                </div>
                <div className="text-white/50 text-sm font-display uppercase tracking-wider">Beautiful Days Together</div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Time grid */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-10">
          <TimeCard value={time.years} label="Years" delay={0} />
          <TimeCard value={time.months} label="Months" delay={0.1} />
          <TimeCard value={time.days} label="Days" delay={0.2} />
          <TimeCard value={time.hours} label="Hours" delay={0.3} />
          <TimeCard value={time.minutes} label="Minutes" delay={0.4} />
          <TimeCard value={time.seconds} label="Seconds" delay={0.5} />
        </div>

        {!time.isFuture && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto mb-12">
            <FunFact icon={Heart} label="Heartbeats spent loving you" value={time.heartbeats.toLocaleString()} delay={0.6} />
            <FunFact icon={Moon} label="Nights dreaming of you" value={time.totalDays.toLocaleString()} delay={0.7} />
            <FunFact icon={Sunrise} label="Mornings waking up grateful" value={time.totalDays.toLocaleString()} delay={0.8} />
            <FunFact icon={Heart} label="Moments I chose you" value={time.totalSeconds.toLocaleString()} delay={0.9} />
          </div>
        )}

        <motion.div
          className="mt-8"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glassmorphism">
            <Heart size={20} className="text-rose-400 fill-rose-400" />
            <span className="font-display text-white/80">Since {dateLabel}</span>
            <Heart size={20} className="text-rose-400 fill-rose-400" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
          className="mt-12"
        >
          <Link
            href="/proposal"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-300 text-[#1a0b2e] font-display text-lg font-semibold tracking-wider hover:scale-105 transition-transform"
          >
            <span>The Big Question</span>
            <Heart size={18} className="fill-current" />
          </Link>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}
