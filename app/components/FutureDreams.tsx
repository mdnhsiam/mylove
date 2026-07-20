'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MapPin, GraduationCap, Briefcase, Sparkles, Diamond, Infinity as InfinityIcon, Calendar, ChevronDown, ArrowRight } from 'lucide-react';

interface Milestone {
  id: number;
  title: string;
  description: string;
  expanded: string;
  icon: React.ElementType;
  status: 'completed' | 'current' | 'future';
  date: string;
}

const MILESTONES: Milestone[] = [
  { id: 1, title: 'How We Met', description: 'The beginning of our beautiful journey', expanded: 'The universe conspired to bring us together. One ordinary moment that changed everything forever. I knew right then that you were different — special in a way I could not explain.', icon: Calendar, status: 'completed', date: '2025' },
  { id: 2, title: 'Travel Together', description: 'Exploring the world, hand in hand', expanded: 'I want to see every corner of this world with you by my side. New cities, new food, new memories — all of them better because you are in them.', icon: MapPin, status: 'completed', date: '2026' },
  { id: 3, title: 'Graduation', description: 'Celebrating our achievements together', expanded: 'Watching you succeed and grow is one of my greatest joys. I want to be there cheering the loudest at every milestone you achieve.', icon: GraduationCap, status: 'current', date: '2027' },
  { id: 4, title: 'Building Together', description: 'Our home, our life, our future', expanded: 'A home filled with laughter, love, and warmth. A place that is truly ours. Where we cook together, argue about small things, and make up immediately.', icon: Briefcase, status: 'future', date: '2028' },
  { id: 5, title: 'Engagement', description: 'The promise of forever', expanded: 'This very moment — where I ask you the biggest question of my life. And you say yes. (You better say yes.)', icon: Diamond, status: 'future', date: '2029' },
  { id: 6, title: 'Our Wedding', description: 'Becoming one, officially and forever', expanded: 'The day we stand before everyone we love and promise each other forever. I already know it will be the best day of my life.', icon: Sparkles, status: 'future', date: '2030' },
  { id: 7, title: 'Forever & Always', description: 'A lifetime of love and happiness', expanded: 'Growing old together, embarrassing our children with stories of how much we love each other, and still holding hands when we are 90.', icon: InfinityIcon, status: 'future', date: '∞' },
];

export default function FutureDreams() {
  const [activeId, setActiveId] = useState<number | null>(null);

  return (
    <section className="relative min-h-screen py-20 overflow-hidden pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1045] via-[#1a0b2e] to-[#0a0a1a]" />

      <div className="relative z-10 px-4 max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-handwritten text-5xl md:text-6xl text-gold text-shadow-gold mb-4">
            Our Future Dreams
          </h2>
          <p className="font-display text-white/60 text-lg max-w-xl mx-auto">
            A roadmap of the beautiful life I want to build with you
          </p>
        </motion.div>

        {/* Vertical timeline — single column, no overlap */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

          <div className="space-y-4">
            {MILESTONES.map((milestone, index) => {
              const Icon = milestone.icon;
              const isActive = activeId === milestone.id;

              const dotColor =
                milestone.status === 'completed' ? 'bg-gold' :
                milestone.status === 'current' ? 'bg-rose-500' :
                'bg-white/20';

              const iconColor =
                milestone.status === 'completed' ? 'text-gold' :
                milestone.status === 'current' ? 'text-rose-400' :
                'text-white/40';

              const titleColor =
                milestone.status === 'completed' ? 'text-gold' :
                milestone.status === 'current' ? 'text-rose-400' :
                'text-white/60';

              return (
                <motion.div
                  key={milestone.id}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="flex gap-4 items-start"
                >
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0 mt-4">
                    <motion.div
                      className={`w-4 h-4 rounded-full ${dotColor} flex items-center justify-center relative z-10`}
                      animate={milestone.status === 'current' ? { scale: [1, 1.3, 1], boxShadow: ['0 0 0 0 rgba(225,29,72,0.4)', '0 0 0 8px rgba(225,29,72,0)', '0 0 0 0 rgba(225,29,72,0)'] } : {}}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>

                  {/* Card */}
                  <div className="flex-1 pb-4">
                    <button
                      onClick={() => setActiveId(isActive ? null : milestone.id)}
                      className="w-full text-left"
                    >
                      <div className={`glassmorphism rounded-2xl p-5 transition-all duration-300 ${isActive ? 'border-gold/40 shadow-lg shadow-gold/10' : 'hover:border-white/20'}`}>
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${milestone.status === 'completed' ? 'bg-gold/20' : milestone.status === 'current' ? 'bg-rose-500/20' : 'bg-white/5'}`}>
                              <Icon size={18} className={iconColor} />
                            </div>
                            <div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className={`font-display font-semibold text-base ${titleColor}`}>{milestone.title}</span>
                                <span className="text-white/30 text-xs font-display">{milestone.date}</span>
                                {milestone.status === 'current' && (
                                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-xs font-display">Now</span>
                                )}
                              </div>
                              <p className="text-white/50 font-display text-sm mt-0.5">{milestone.description}</p>
                            </div>
                          </div>
                          <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.3 }} className="flex-shrink-0 mt-1">
                            <ChevronDown size={16} className="text-white/40" />
                          </motion.div>
                        </div>

                        <AnimatePresence>
                          {isActive && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <div className="mt-4 pt-4 border-t border-white/10">
                                <p className="font-display text-white/70 text-sm leading-relaxed italic">
                                  {milestone.expanded}
                                </p>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="mt-12 pb-4 text-center">
          <Link href="/countdown" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 text-[#1a0b2e] font-display text-lg font-semibold tracking-wider hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <span>Our Story in Time</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}
