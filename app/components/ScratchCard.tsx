'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScratched, setIsScratched] = useState(false);
  const [scratchPercent, setScratchPercent] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const isScratchedRef = useRef(false);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);

  const initCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctxRef.current = ctx;

    const rect = container.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;

    ctx.fillStyle = '#1a0b2e';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#2a1045';
    for (let i = 0; i < 100; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3 + 1;
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.fillStyle = '#d4af37';
    ctx.font = 'bold 24px serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('Scratch to reveal', canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = '16px serif';
    ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
    ctx.fillText('a secret from my heart', canvas.width / 2, canvas.height / 2 + 15);

    ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 60, canvas.height / 2 - 50);
    ctx.lineTo(canvas.width / 2 + 60, canvas.height / 2 - 50);
    ctx.moveTo(canvas.width / 2 - 60, canvas.height / 2 + 40);
    ctx.lineTo(canvas.width / 2 + 60, canvas.height / 2 + 40);
    ctx.stroke();
  }, []);

  useEffect(() => {
    initCanvas();
    window.addEventListener('resize', initCanvas);
    return () => window.removeEventListener('resize', initCanvas);
  }, [initCanvas]);

  const getPos = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    return {
      x: clientX - rect.left,
      y: clientY - rect.top,
    };
  };

  const scratch = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if (!canvas || !ctx) return;

    const { x, y } = getPos(e);
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const pixels = imageData.data;
    let transparent = 0;
    for (let i = 3; i < pixels.length; i += 4) {
      if (pixels[i] === 0) transparent++;
    }
    const percent = (transparent / (pixels.length / 4)) * 100;
    setScratchPercent(percent);

    if (percent > 60 && !isScratchedRef.current) {
      isScratchedRef.current = true;
      setIsScratched(true);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <section id="scratch" className="relative min-h-screen py-20 flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a1045] via-[#1a0b2e] to-[#0a0a1a]" />

      <div className="relative z-10 px-4 w-full max-w-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-handwritten text-5xl md:text-6xl text-gold text-shadow-gold mb-4">
            A Secret For You
          </h2>
          <p className="font-display text-white/60 text-lg">
            Scratch the card to reveal what my heart is whispering
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl shadow-gold/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#2a1045] via-[#1a0b2e] to-[#0a0a1a] flex flex-col items-center justify-center p-8 text-center">
            <Sparkles size={32} className="text-gold mb-4" />
            <h3 className="font-handwritten text-3xl md:text-4xl text-gold text-shadow-gold mb-4">
              The Best Chapter
            </h3>
            <p className="font-display text-white/90 text-lg leading-relaxed">
              is still waiting to be written...
            </p>
            <p className="font-display text-white/70 text-base mt-4 italic">
              with you, forever.
            </p>
            <div className="mt-6 text-rose-400 text-2xl">
              <span className="inline-block">&#10084;&#65039;</span>
            </div>
          </div>

          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-pointer touch-none"
            onMouseDown={() => setIsDrawing(true)}
            onMouseUp={() => setIsDrawing(false)}
            onMouseLeave={() => setIsDrawing(false)}
            onMouseMove={scratch}
            onTouchStart={(e) => {
              e.preventDefault();
              setIsDrawing(true);
            }}
            onTouchEnd={() => setIsDrawing(false)}
            onTouchMove={(e) => {
              e.preventDefault();
              scratch(e);
            }}
          />
        </motion.div>

        {scratchPercent > 0 && scratchPercent < 60 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 text-center"
          >
            <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-gold-500 to-gold-300"
                style={{ width: `${(scratchPercent / 60) * 100}%` }}
              />
            </div>
            <p className="text-white/40 text-sm mt-2 font-display">Keep scratching...</p>
          </motion.div>
        )}

        {isScratched && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-8 text-center"
          >
            <p className="font-handwritten text-2xl text-gold text-shadow-gold">
              You have unlocked my heart's secret
            </p>
          </motion.div>
        )}

        <div className="relative z-10 mt-16 pb-20 text-center">
          <Link href="/letter" className="inline-flex items-center gap-3 px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 text-[#1a0b2e] font-display text-lg font-semibold tracking-wider hover:scale-105 transition-transform shadow-[0_0_30px_rgba(212,175,55,0.3)]">
            <span>My Letter to You</span>
            <ArrowRight size={18} />
          </Link>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0a1a] to-transparent" />
    </section>
  );
}
