'use client';

import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  twinkleSpeed: number;
  twinklePhase: number;
  hue: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  active: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  hue: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const particlesRef = useRef<Particle[]>([]);
  const frameRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const starCount = 260;
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.2 + 0.4,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        hue: Math.random() < 0.3 ? 45 : (Math.random() < 0.5 ? 210 : 0),
      });
    }
    starsRef.current = stars;

    const shootingStars: ShootingStar[] = [];
    for (let i = 0; i < 4; i++) {
      shootingStars.push({
        x: -100,
        y: -100,
        length: 100 + Math.random() * 120,
        speed: 8 + Math.random() * 6,
        angle: Math.PI / 4,
        opacity: 0,
        active: false,
      });
    }
    shootingStarsRef.current = shootingStars;

    let time = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      time += 0.016;

      // Subtle nebula clouds
      const nebula = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.4, 0,
        canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.5
      );
      nebula.addColorStop(0, `rgba(138, 43, 226, ${0.04 + Math.sin(time * 0.3) * 0.015})`);
      nebula.addColorStop(0.5, `rgba(74, 20, 140, ${0.025 + Math.sin(time * 0.5) * 0.01})`);
      nebula.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const nebula2 = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.6, 0,
        canvas.width * 0.7, canvas.height * 0.6, canvas.width * 0.4
      );
      nebula2.addColorStop(0, `rgba(212, 175, 55, ${0.03 + Math.sin(time * 0.4) * 0.012})`);
      nebula2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Drifting golden dust particles
      if (particlesRef.current.length < 40 && Math.random() < 0.3) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 10,
          vx: (Math.random() - 0.5) * 0.3,
          vy: -(0.2 + Math.random() * 0.5),
          size: 0.8 + Math.random() * 1.6,
          life: 0,
          maxLife: 400 + Math.random() * 400,
          hue: 45,
        });
      }
      particlesRef.current = particlesRef.current.filter((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.life > p.maxLife || p.y < -20) return false;
        const fade = Math.sin((p.life / p.maxLife) * Math.PI);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 175, 55, ${0.5 * fade})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.6)';
        ctx.fill();
        ctx.shadowBlur = 0;
        return true;
      });

      // Draw stars with twinkle and colored glow
      for (const star of starsRef.current) {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        const opacity = star.opacity * (0.5 + twinkle * 0.5);

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        const color = star.hue === 45
          ? `rgba(212, 175, 55, ${opacity})`
          : star.hue === 210
          ? `rgba(180, 200, 255, ${opacity})`
          : `rgba(255, 255, 255, ${opacity})`;
        ctx.fillStyle = color;
        ctx.fill();

        if (star.size > 1.4) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3.5);
          const glowColor = star.hue === 45 ? '212, 175, 55' : star.hue === 210 ? '180, 200, 255' : '255, 255, 255';
          glow.addColorStop(0, `rgba(${glowColor}, ${opacity * 0.35})`);
          glow.addColorStop(1, `rgba(${glowColor}, 0)`);
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3.5, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }

      // Shooting stars with trailing gradient
      for (const ss of shootingStarsRef.current) {
        if (!ss.active && Math.random() < 0.003) {
          ss.active = true;
          ss.x = Math.random() * canvas.width * 0.5;
          ss.y = Math.random() * canvas.height * 0.3;
          ss.opacity = 1;
        }

        if (ss.active) {
          const endX = ss.x + Math.cos(ss.angle) * ss.length;
          const endY = ss.y + Math.sin(ss.angle) * ss.length;

          const gradient = ctx.createLinearGradient(ss.x, ss.y, endX, endY);
          gradient.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
          gradient.addColorStop(0.5, `rgba(212, 175, 55, ${ss.opacity * 0.8})`);
          gradient.addColorStop(1, 'rgba(212, 175, 55, 0)');

          ctx.beginPath();
          ctx.moveTo(ss.x, ss.y);
          ctx.lineTo(endX, endY);
          ctx.strokeStyle = gradient;
          ctx.lineWidth = 2;
          ctx.stroke();

          ss.x += Math.cos(ss.angle) * ss.speed;
          ss.y += Math.sin(ss.angle) * ss.speed;
          ss.opacity -= 0.02;

          if (ss.opacity <= 0 || ss.x > canvas.width + 100 || ss.y > canvas.height + 100) {
            ss.active = false;
            ss.opacity = 0;
          }
        }
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
