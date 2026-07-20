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

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
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

    const starCount = 200;
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.02 + 0.005,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
      });
    }
    starsRef.current = stars;

    const shootingStars: ShootingStar[] = [];
    for (let i = 0; i < 3; i++) {
      shootingStars.push({
        x: -100,
        y: -100,
        length: 100 + Math.random() * 100,
        speed: 8 + Math.random() * 4,
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

      // Draw stars
      for (const star of starsRef.current) {
        star.twinklePhase += star.twinkleSpeed;
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        const opacity = star.opacity * (0.5 + twinkle * 0.5);
        
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();

        // Glow effect for larger stars
        if (star.size > 1.5) {
          const glow = ctx.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.size * 3);
          glow.addColorStop(0, `rgba(212, 175, 55, ${opacity * 0.3})`);
          glow.addColorStop(1, 'rgba(212, 175, 55, 0)');
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 3, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }
      }

      // Draw shooting stars
      for (const ss of shootingStarsRef.current) {
        if (!ss.active && Math.random() < 0.002) {
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

      // Draw subtle nebula
      const nebula = ctx.createRadialGradient(
        canvas.width * 0.3, canvas.height * 0.4, 0,
        canvas.width * 0.3, canvas.height * 0.4, canvas.width * 0.5
      );
      nebula.addColorStop(0, `rgba(138, 43, 226, ${0.03 + Math.sin(time * 0.3) * 0.01})`);
      nebula.addColorStop(0.5, `rgba(74, 20, 140, ${0.02 + Math.sin(time * 0.5) * 0.01})`);
      nebula.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Second nebula
      const nebula2 = ctx.createRadialGradient(
        canvas.width * 0.7, canvas.height * 0.6, 0,
        canvas.width * 0.7, canvas.height * 0.6, canvas.width * 0.4
      );
      nebula2.addColorStop(0, `rgba(212, 175, 55, ${0.02 + Math.sin(time * 0.4) * 0.01})`);
      nebula2.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

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
