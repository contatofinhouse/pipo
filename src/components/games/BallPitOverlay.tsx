import React, { useState, useEffect, useCallback, useRef } from 'react';

interface BallPitOverlayProps {
  onClose: () => void;
  onTap: () => void;
  onPipoHit?: (forceX: number) => void;
  onLookAt?: (pos: { x: number, y: number } | null) => void;
}

interface Ball {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  emoji: string;
}

const BALL_EMOJIS = ['🔴', '🔵', '🟡', '🟢', '🟣', '🟠', '💖', '⭐'];
const GRAVITY = 0.18;
const FRICTION = 0.985;
const BOUNCE = 0.6;

export function BallPitOverlay({ onClose, onTap, onPipoHit, onLookAt }: BallPitOverlayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ballsRef = useRef<Ball[]>([]);
  const requestRef = useRef<number>(0);
  const sizeRef = useRef({ w: window.innerWidth, h: window.innerHeight });
  const timeRef = useRef(0);
  const lastLookAtUpdateRef = useRef(0);
  const lastHitUpdateRef = useRef(0);
  const lastLookAtVal = useRef({x: 0, y: 0});

  // Initialize
  useEffect(() => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    sizeRef.current = { w, h };

    // DRASTICALLY reduced ball count to 8 for extreme performance on huge App.tsx
    ballsRef.current = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: Math.random() * w,
      y: Math.random() * (h * 0.4),
      vx: (Math.random() - 0.5) * 4,
      vy: (Math.random() - 0.5) * 2,
      radius: 15 + Math.random() * 5,
      emoji: BALL_EMOJIS[i % BALL_EMOJIS.length],
    }));

    const handleResize = () => {
      sizeRef.current = { w: window.innerWidth, h: window.innerHeight };
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(requestRef.current);
      if (onLookAt) onLookAt(null);
    };
  }, []);

  const updatePhysics = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const { w, h } = sizeRef.current;
    timeRef.current += 0.015; 
    const now = Date.now();

    ctx.clearRect(0, 0, w, h);

    const airOsc = (Math.sin(timeRef.current * 1.1) + 1) / 2; 
    const breezeX = Math.sin(timeRef.current * 0.5) * 0.15 * airOsc;
    const breezeY = -0.35 * airOsc; 

    const balls = ballsRef.current;
    const pipoX = w / 2;
    const pipoY = h * 0.56; 
    const pipoW = 150; 
    const pipoH = 130;

    let closestBall: Ball | null = null;
    let minD = 9999;

    for (const b of balls) {
      b.vy += GRAVITY;
      b.vx += breezeX;
      if (b.y > h * 0.6) b.vy += breezeY;

      b.vx *= FRICTION;
      b.vy *= FRICTION;
      b.x += b.vx;
      b.y += b.vy;

      // Bounds
      if (b.x < b.radius) { b.x = b.radius; b.vx = Math.abs(b.vx) * BOUNCE; }
      else if (b.x > w - b.radius) { b.x = w - b.radius; b.vx = -Math.abs(b.vx) * BOUNCE; }
      if (b.y < b.radius) { b.y = b.radius; b.vy = Math.abs(b.vy) * BOUNCE; }
      if (b.y > h - 60) { b.y = h - 60; b.vy = -Math.abs(b.vy) * BOUNCE - 1; }

      const dxP = b.x - pipoX;
      const dyP = b.y - pipoY;
      const distP = Math.sqrt(dxP*dxP + dyP*dyP);

      // Pipo Collision
      if (Math.abs(dxP) < pipoW / 2 && Math.abs(dyP) < pipoH / 2) {
        if (onPipoHit && now - lastHitUpdateRef.current > 150) {
          onPipoHit(b.vx * 0.5);
          lastHitUpdateRef.current = now;
        }
        const angle = Math.atan2(dyP, dxP);
        b.vx = Math.cos(angle) * 3;
        b.vy = Math.sin(angle) * 3 - 1;
      }

      // Ball to Ball
      for (const other of balls) {
        if (other.id <= b.id) continue;
        const dx = other.x - b.x;
        const dy = other.y - b.y;
        const d2 = dx*dx + dy*dy;
        const min = b.radius + other.radius;
        if (d2 < min*min) {
          const d = Math.sqrt(d2);
          const nx = dx/d; const ny = dy/d;
          const overlap = min - d;
          b.x -= nx * overlap * 0.5; b.y -= ny * overlap * 0.5;
          other.x += nx * overlap * 0.5; other.y += ny * overlap * 0.5;
          if ((b.vx - other.vx)*nx + (b.vy - other.vy)*ny > 0) {
            const imp = ((b.vx - other.vx)*nx + (b.vy - other.vy)*ny) * 0.8;
            b.vx -= imp*nx; b.vy -= imp*ny;
            other.vx += imp*nx; other.vy += imp*ny;
          }
        }
      }

      ctx.font = `${b.radius * 2}px serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(b.emoji, b.x, b.y);

      if (distP < minD) { minD = distP; closestBall = b; }
    }

    // ULTRA THROTTELED LOOK AT (Update only every 150ms and only if moved significantly)
    if (onLookAt && closestBall && now - lastLookAtUpdateRef.current > 150) {
      const dx = (closestBall.x - pipoX) / (w / 2);
      const dy = (closestBall.y - pipoY) / (h / 2);
      
      const movedDist = Math.sqrt((dx - lastLookAtVal.current.x)**2 + (dy - lastLookAtVal.current.y)**2);
      if (movedDist > 0.1) {
        onLookAt({ x: dx, y: dy });
        lastLookAtVal.current = { x: dx, y: dy };
        lastLookAtUpdateRef.current = now;
      }
    }

    requestRef.current = requestAnimationFrame(updatePhysics);
  }, [onPipoHit, onTap, onLookAt]);

  useEffect(() => {
    requestRef.current = requestAnimationFrame(updatePhysics);
    return () => cancelAnimationFrame(requestRef.current);
  }, [updatePhysics]);

  const handleInteraction = (clientX: number, clientY: number) => {
    for (const b of ballsRef.current) {
      const dx = b.x - clientX;
      const dy = b.y - clientY;
      const d = Math.sqrt(dx*dx + dy*dy);
      if (d < 160) {
        const f = (1 - d/160) * 18;
        b.vx += (dx/d) * f;
        b.vy += (dy/d) * f - 6;
      }
    }
    onTap();
  };

  return (
    <div 
      className="fixed inset-0 z-[40] pointer-events-auto overflow-hidden bg-transparent cursor-crosshair"
      onMouseDown={(e) => handleInteraction(e.clientX, e.clientY)}
      onTouchStart={(e) => handleInteraction(e.touches[0].clientX, e.touches[0].clientY)}
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
      
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <div className="bg-black/70 text-white px-5 py-1.5 border-2 border-white rounded-full font-pixel text-[10px] uppercase shadow-lg">
          Brinque com o Pipo! 🐹
        </div>
      </div>

      <button
        onClick={(e) => { e.stopPropagation(); onClose(); }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 px-10 py-3 bg-white border-4 border-black font-pixel font-bold uppercase text-xs shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 active:translate-y-1 active:shadow-none transition-all"
      >
        Encerrar
      </button>
    </div>
  );
}
