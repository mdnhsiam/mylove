'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { X, Heart, ZoomIn, ArrowRight, Calendar } from 'lucide-react';

interface MemoryItem {
  id: number;
  image: string;
  caption: string;
  date: string;
  dateLabel: string;
  rotation: number;
  size: 'small' | 'medium' | 'large';
}

// Photos ordered chronologically by date extracted from filename.
// PXL_YYYYMMDD_HHMMSSxxx and IMG-YYYYMMDD-WAxxxx patterns.
const MEMORIES: MemoryItem[] = [
  { id: 1,  image: '/images/PXL_20250910_094816488.jpg', caption: 'The very beginning', date: '2025-09-10', dateLabel: '10 Sep 2025', rotation: -3, size: 'medium' },
  { id: 2,  image: '/images/IMG-20250911-WA0066.jpg', caption: 'Our first hello', date: '2025-09-10', dateLabel: '10 Sep 2025', rotation: 2, size: 'small' },
  { id: 3,  image: '/images/IMG-20250911-WA0084.jpg', caption: 'Getting to know you', date: '2025-09-10', dateLabel: '10 Sep 2025', rotation: -2, size: 'medium' },
  { id: 4,  image: '/images/IMG-20250911-WA0089.jpg', caption: 'The day everything changed', date: '2025-09-10', dateLabel: '10 Sep 2025', rotation: 3, size: 'large' },
  { id: 5,  image: '/images/PXL_20250926_150815839.jpg', caption: 'An ordinary beautiful day', date: '2025-09-26', dateLabel: '26 Sep 2025', rotation: -4, size: 'small' },
  { id: 6,  image: '/images/IMG-20250929-WA0038.jpg', caption: 'You, being wonderful', date: '2025-09-29', dateLabel: '29 Sep 2025', rotation: 1, size: 'large' },
  { id: 7,  image: '/images/PXL_20251005_120815533.jpg', caption: 'That golden afternoon', date: '2025-10-05', dateLabel: '5 Oct 2025', rotation: -1, size: 'medium' },
  { id: 8,  image: '/images/PXL_20251012_155955580.jpg', caption: 'Lost in your eyes', date: '2025-10-12', dateLabel: '12 Oct 2025', rotation: 2, size: 'large' },
  { id: 9,  image: '/images/IMG-20251030-WA0020.jpg', caption: 'A quiet moment together', date: '2025-10-30', dateLabel: '30 Oct 2025', rotation: -3, size: 'small' },
  { id: 10, image: '/images/PXL_20251107_134226409.jpg', caption: 'My favourite view', date: '2025-11-07', dateLabel: '7 Nov 2025', rotation: 1, size: 'medium' },
  { id: 11, image: '/images/PXL_20251111_132203001.jpg', caption: 'You make my world brighter', date: '2025-11-11', dateLabel: '11 Nov 2025', rotation: -2, size: 'large' },
  { id: 12, image: '/images/IMG-20251123-WA0069.jpg', caption: 'Together, always', date: '2025-11-23', dateLabel: '23 Nov 2025', rotation: 3, size: 'medium' },
  { id: 13, image: '/images/IMG-20251123-WA0074.jpg', caption: 'My happy place', date: '2025-11-23', dateLabel: '23 Nov 2025', rotation: -1, size: 'small' },
  { id: 14, image: '/images/IMG-20251217-WA0062.jpg', caption: 'Growing closer every day', date: '2025-12-17', dateLabel: '17 Dec 2025', rotation: 2, size: 'large' },
  { id: 15, image: '/images/Messenger_creation_AF3B74A6-DD4C-4A03-8EA8-E31F4A2886F5.jpeg', caption: 'A memory I will always treasure', date: '2025-12-31', dateLabel: 'A treasured moment', rotation: -3, size: 'medium' },
  { id: 16, image: '/images/20260801_160329.jpg', caption: 'A new chapter begins', date: '2026-08-01', dateLabel: '1 Aug 2026', rotation: 2, size: 'medium' },
  { id: 17, image: '/images/20260801_161022.jpg', caption: 'Every moment with you is magic', date: '2026-08-01', dateLabel: '1 Aug 2026', rotation: -2, size: 'large' },
  { id: 18, image: '/images/20260801_161519.jpg', caption: 'You are my sunshine', date: '2026-08-01', dateLabel: '1 Aug 2026', rotation: 3, size: 'small' },
  { id: 19, image: '/images/20260801_162251.jpg', caption: 'Forever and always', date: '2026-08-01', dateLabel: '1 Aug 2026', rotation: -1, size: 'medium' },
  { id: 20, image: '/images/20260801_164944.jpg', caption: 'My heart is yours, completely', date: '2026-08-01', dateLabel: '1 Aug 2026', rotation: 2, size: 'large' },
  { id: 21, image: '/images/image.png', caption: 'A moment worth a thousand words', date: '2026-08-01', dateLabel: '1 Aug 2026', rotation: -2, size: 'medium' },
  { id: 22, image: '/images/image copy.png', caption: 'The one I want to spend forever with', date: '2026-08-01', dateLabel: '1 Aug 2026', rotation: 3, size: 'large' },
];

function getSizeClass(size: string) {
  switch (size) {
    case 'small': return 'h-44 md:h-48';
    case 'large': return 'h-64 md:h-72';
    default: return 'h-52 md:h-60';
  }
}

function seededRand(n: number) {
  return Math.abs(((n * 1664525 + 1013904223) | 0)) / 2147483647;
}

export default function MemoryGallery() {
  const [selectedImage, setSelectedImage] = useState<MemoryItem | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const floatingHearts = useMemo(() =>
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: seededRand(i * 3 + 1) * 100,
      top: seededRand(i * 7 + 2) * 100,
      size: 8 + seededRand(i * 11 + 3) * 8,
      duration: 4 + seededRand(i * 5 + 4) * 3,
      delay: seededRand(i * 13 + 5) * 3,
    })), []
  );

  return (
    <section className="relative min-h-screen py-20 overflow-hidden pb-32">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1045] via-[#1a0b2e] to-[#0a0a1a]" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingHearts.map((h) => (
          <motion.div
            key={h.id}
            className="absolute text-gold/20"
            style={{ left: `${h.left}%`, top: `${h.top}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: h.duration, repeat: Infinity, delay: h.delay }}
          >
            <Heart size={h.size} fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <div className="relative z-10 px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-handwritten text-5xl md:text-6xl text-gold text-shadow-gold mb-4">
            Memory Gallery
          </h2>
          <p className="font-display text-white/60 text-lg max-w-xl mx-auto">
            Moments frozen in time, forever cherished in my heart
          </p>
          <div className="inline-flex items-center gap-2 mt-3 px-4 py-1.5 rounded-full glassmorphism">
            <Calendar size={14} className="text-gold" />
            <span className="font-display text-white/50 text-sm">
              {MEMORIES.length} memories · Sep 2025 onwards
            </span>
          </div>
        </motion.div>

        {/* Masonry Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {MEMORIES.map((memory, index) => (
              <motion.div
                key={memory.id}
                initial={{ opacity: 0, y: 50, rotate: 0 }}
                whileInView={{ opacity: 1, y: 0, rotate: memory.rotation }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
                whileHover={{ rotate: 0, scale: 1.05, zIndex: 10, transition: { duration: 0.3 } }}
                onHoverStart={() => setHoveredId(memory.id)}
                onHoverEnd={() => setHoveredId(null)}
                className="cursor-pointer group"
                onClick={() => setSelectedImage(memory)}
                style={{ transformOrigin: 'center center' }}
              >
                <div className={`relative bg-white p-2 pb-10 rounded-lg shadow-lg transition-shadow duration-300 ${hoveredId === memory.id ? 'shadow-2xl shadow-gold/20' : ''}`}>
                  <div className={`relative overflow-hidden rounded ${getSizeClass(memory.size)}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={memory.image}
                      alt={memory.caption}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                      <ZoomIn className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={24} />
                    </div>
                  </div>
                  <div className="absolute bottom-2 left-2 right-2 text-center">
                    <p className="text-gray-700 text-xs font-display italic leading-tight">{memory.caption}</p>
                    <p className="text-gray-400 text-[10px] font-display mt-0.5">{memory.dateLabel}</p>
                  </div>
                  {/* Tape effect */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-white/70 shadow-sm rotate-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="relative max-w-4xl max-h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 text-white/70 hover:text-white transition-colors"
                aria-label="Close"
              >
                <X size={28} />
              </button>
              <div className="relative rounded-2xl overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selectedImage.image}
                  alt={selectedImage.caption}
                  className="w-full max-h-[70vh] md:max-h-[80vh] object-contain bg-black"
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="font-handwritten text-white text-xl">{selectedImage.caption}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Calendar size={14} className="text-gold" />
                    <span className="text-white/60 font-display text-sm">{selectedImage.dateLabel}</span>
                    <Heart size={14} className="text-rose-400 fill-rose-400 ml-2" />
                    <span className="text-white/60 font-display text-sm">A cherished memory</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />

      <div className="relative z-10 px-4 pb-4 text-center mt-12">
        <Link href="/reasons" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 text-[#1a0b2e] font-display text-lg font-semibold tracking-wider hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.3)]">
          <span>Why I Love You</span>
          <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}
