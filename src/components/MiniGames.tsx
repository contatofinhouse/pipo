import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Award, Target, Heart, Star, Zap } from 'lucide-react';

interface MiniGameProps {
  onClose: (score: number) => void;
  englishLevel: number;
}

// Utility function for conditional classes
function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

// ============== COMPONENTE DE HUD (BARRA DE STATUS) ==============
const GameHUD = ({ score, level, title, onExit, lives }: { score: number; level: number; title: string; onExit: () => void, lives?: number }) => (
  <div className="flex justify-between items-center mb-4 bg-slate-900/90 p-2 border-2 border-blue-500/50 font-pixel shadow-[0_0_15px_rgba(59,130,246,0.5)]">
    <div className="flex flex-col">
      <span className="text-[7px] text-blue-300 uppercase tracking-tighter">Points</span>
      <span className="text-yellow-400 text-xs font-bold leading-none">{score.toString().padStart(5, '0')}</span>
    </div>
    <div className="text-center">
      <span className="text-white text-[10px] tracking-widest font-black uppercase">{title}</span>
      {lives !== undefined && (
        <div className="flex gap-1 justify-center mt-1">
          {[...Array(3)].map((_, i) => (
            <Heart key={i} size={10} fill={i < lives ? "#ef4444" : "transparent"} color={i < lives ? "#ef4444" : "#334155"} className={cn(i < lives && "drop-shadow-[0_0_5px_#ef4444]")} />
          ))}
        </div>
      )}
    </div>
    <div className="flex items-center gap-3">
        <div className="flex flex-col items-end">
            <span className="text-[7px] text-blue-300 uppercase font-bold">LVL</span>
            <span className="text-blue-400 text-xs font-black leading-none">{level}</span>
        </div>
        <button onClick={onExit} className="text-red-500 hover:scale-110 active:scale-95 transition-transform">
            <X size={20} />
        </button>
    </div>
  </div>
);

// ================= PIPO-MAN (VERSÃO PREMIUM / INSTANTÂNEA) =================
export function PipoMan({ onClose }: MiniGameProps) {
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [dots, setDots] = useState<{ id: number; x: number; y: number }[]>([]);
  const [ghosts, setGhosts] = useState<{ id: number; x: number; y: number; vx: number; vy: number }[]>([]);
  const [pipoPos, setPipoPos] = useState({ x: 150, y: 150 });
  
  const containerRef = useRef<HTMLDivElement>(null);
  const gameLoopRef = useRef<number | null>(null);
  const dotRef = useRef(dots);

  const initLevel = (lvl: number) => {
    const newDots = [];
    const count = 12 + lvl * 2;
    for (let i = 0; i < count; i++) {
      newDots.push({ id: Math.random(), x: 40 + Math.random() * 220, y: 40 + Math.random() * 220 });
    }
    dotRef.current = newDots;
    setDots(newDots);

    // Dificuldade balanceada
    const newGhosts = [];
    const ghostCount = Math.min(6, 2 + Math.floor(lvl / 2.5));
    for (let i = 0; i < ghostCount; i++) {
        // Nasce longe do Pipo (centro)
        const side = Math.floor(Math.random() * 4);
        let gx = 20, gy = 20;
        if (side === 1) gx = 280;
        if (side === 2) gy = 280;
        if (side === 3) { gx = 280; gy = 280; }

        newGhosts.push({
            id: Math.random(),
            x: gx, y: gy,
            vx: (Math.random() - 0.5) * (4 + lvl * 0.5),
            vy: (Math.random() - 0.5) * (4 + lvl * 0.5)
        });
    }
    setGhosts(newGhosts);
  };

  useEffect(() => {
    initLevel(1);
    return () => { if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current); };
  }, []);

  // Frame loop PREMIUM (Sem delay de batida)
  useEffect(() => {
    if (gameOver) return;

    const frame = () => {
      let collided = false;
      const currentPos = { ...pipoPos };

      setGhosts(prev => {
        const next = prev.map(g => {
          let nx = g.x + g.vx, ny = g.y + g.vy, nvx = g.vx, nvy = g.vy;
          if (nx < 15 || nx > 285) nvx *= -1;
          if (ny < 15 || ny > 285) nvy *= -1;

          // Colisão rápida e precisa
          const d = Math.sqrt(Math.pow(nx - currentPos.x, 2) + Math.pow(ny - currentPos.y, 2));
          if (d < 24) collided = true;

          return { ...g, x: nx, y: ny, vx: nvx, vy: nvy };
        });

        if (collided) {
          // TELEPORTE IMEDIATO dos fantasmas para o canto oposto ao player
          return next.map(g => ({
            ...g,
            x: currentPos.x > 150 ? 30 : 270,
            y: currentPos.y > 150 ? 30 : 270,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6
          }));
        }
        return next;
      });

      if (collided) {
        setLives(l => {
          if (l <= 1) { setGameOver(true); return 0; }
          return l - 1;
        });
      }

      gameLoopRef.current = requestAnimationFrame(frame);
    };

    gameLoopRef.current = requestAnimationFrame(frame);
    return () => { if (gameLoopRef.current) cancelAnimationFrame(gameLoopRef.current); };
  }, [pipoPos.x, pipoPos.y, gameOver]);

  // Interação e Coleta
  const handleInteraction = (e: React.MouseEvent | React.TouchEvent) => {
    if (gameOver || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const cy = 'touches' in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const x = Math.max(15, Math.min(285, cx - rect.left));
    const y = Math.max(15, Math.min(285, cy - rect.top));
    setPipoPos({ x, y });

    const remaining = dotRef.current.filter(d => {
      if (Math.sqrt(Math.pow(d.x - x, 2) + Math.pow(d.y - y, 2)) < 24) {
        setScore(s => s + 10);
        return false;
      }
      return true;
    });

    if (remaining.length !== dotRef.current.length) {
      dotRef.current = remaining;
      setDots(remaining);
      if (remaining.length === 0) {
        setLevel(l => {
          const nl = l + 1;
          initLevel(nl);
          return nl;
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center p-4 font-pixel">
      <div className="w-full max-w-sm bg-slate-900 border-[6px] border-blue-600 p-4 relative shadow-[0_0_40px_rgba(37,99,235,0.4)] overflow-hidden">
        {/* Glow Effects Background */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-pulse" />
        
        <GameHUD score={score} level={level} title="Pipo-Man Arcade" onExit={() => onClose(score)} lives={lives} />
        
        <div 
          ref={containerRef}
          onMouseMove={handleInteraction}
          onTouchMove={handleInteraction}
          className="w-full aspect-square bg-[#050515] border-4 border-blue-900/50 relative cursor-none overflow-hidden rounded-lg shadow-inner"
        >
          {/* Cyber Grid */}
          <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 opacity-20 pointer-events-none">
            {[...Array(36)].map((_, i) => <div key={i} className="border-[0.5px] border-blue-500/30" />)}
          </div>

          <AnimatePresence>
            {dots.map(d => (
              <motion.div 
                key={d.id} 
                className="absolute w-4 h-4 bg-yellow-400 rounded-full shadow-[0_0_15px_#facc15]"
                style={{ left: d.x - 8, top: d.y - 8 }}
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.2, 1] }}
                exit={{ scale: 0, scaleY: 2, opacity: 0 }}
                transition={{ repeat: Infinity, duration: 2 }}
              />
            ))}
          </AnimatePresence>

          {ghosts.map(g => (
            <div key={g.id} className="absolute text-3xl z-10 filter drop-shadow-[0_0_12px_#fff] animate-bounce" style={{ left: g.x - 15, top: g.y - 15 }}>
               👾
            </div>
          ))}

          <motion.div 
            className="absolute z-20 pointer-events-none"
            animate={{ x: pipoPos.x - 20, y: pipoPos.y - 20 }}
            transition={{ type: "spring", stiffness: 600, damping: 25 }}
          >
            {/* MINI PIPO ARCADE */}
            <div className="w-10 h-10 bg-[#8B5E3C] border-2 border-white rounded-lg flex flex-col items-center justify-center shadow-[0_0_15px_rgba(139,94,60,0.8)]">
                <div className="flex gap-1.5 mb-1.5">
                    <div className="w-2 h-2 bg-white rounded-full border border-black" />
                    <div className="w-2 h-2 bg-white rounded-full border border-black" />
                </div>
                <div className="w-5 h-2.5 bg-black rounded-b-full border-t border-white/20" />
            </div>
          </motion.div>

          <AnimatePresence>
            {gameOver && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }} 
                animate={{ opacity: 1, scale: 1 }} 
                className="absolute inset-0 bg-black/90 flex flex-col items-center justify-center z-50 text-center p-8 backdrop-blur-sm"
              >
                <Award className="text-yellow-500 mb-6 drop-shadow-[0_0_15px_#eab308]" size={64} />
                <h2 className="text-3xl text-red-500 font-black mb-2 uppercase tracking-tighter">GAME OVER</h2>
                <div className="h-1 w-20 bg-red-500 mb-6" />
                <p className="text-white text-sm mb-10 font-bold uppercase">SCORE: <span className="text-yellow-400 text-xl">{score}</span></p>
                <button 
                    onClick={() => onClose(score)}
                    className="w-full py-5 bg-blue-600 text-white border-b-4 border-blue-800 font-extrabold uppercase text-xs hover:bg-blue-500 active:translate-y-1 active:border-b-0 transition-all"
                >
                    Finalizar Missão
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

// ================= PIPO-PONG =================
export function PipoPong({ onClose }: { onClose: (score: number) => void }) {
  const [gameState, setGameState] = useState({ score: 0, level: 1, gameOver: false });
  
  // Physics Refs
  const ballRef = useRef({ x: 150, y: 150, dx: 1.8, dy: 1.8 });
  const playerYRef = useRef(120);
  const cpuYRef = useRef(120);
  const scoreRef = useRef(0);
  const levelRef = useRef(1);
  const gameOverRef = useRef(false);

  // DOM Refs for Direct Manipulation (Zero-Lag)
  const ballElemRef = useRef<HTMLDivElement>(null);
  const playerElemRef = useRef<HTMLDivElement>(null);
  const cpuElemRef = useRef<HTMLDivElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);

  const update = () => {
    if (gameOverRef.current) return;

    // 1. Physics Calculation
    const b = ballRef.current;
    b.x += b.dx;
    b.y += b.dy;

    // Wall bounce
    if (b.y <= 0) { b.y = 0; b.dy *= -1; }
    if (b.y >= 284) { b.y = 284; b.dy *= -1; }

    // Player collision
    if (b.x <= 20 && b.x >= 10 && b.y + 8 >= playerYRef.current && b.y <= playerYRef.current + 64) {
      if (b.dx < 0) {
        b.dx = Math.abs(b.dx) + 0.15; // Smooth speedup
        b.dy += (b.y - (playerYRef.current + 32)) * 0.12;
        b.x = 21;
        scoreRef.current += 1;
        
        // Update meta-state (Level Up check)
        const oldLevel = levelRef.current;
        levelRef.current = Math.floor(scoreRef.current / 5) + 1;
        setGameState({ 
          score: scoreRef.current, 
          level: levelRef.current, 
          gameOver: false 
        });
      }
    }

    // CPU collision
    if (b.x >= 270 && b.x <= 280 && b.y + 8 >= cpuYRef.current && b.y <= cpuYRef.current + 64) {
      if (b.dx > 0) {
        b.dx = -Math.abs(b.dx);
        b.x = 269;
      }
    }

    // CPU AI
    const target = b.y - 24;
    const cpuSpeed = 1.2 + (levelRef.current * 0.4);
    if (cpuYRef.current < target) cpuYRef.current += cpuSpeed;
    else if (cpuYRef.current > target) cpuYRef.current -= cpuSpeed;
    cpuYRef.current = Math.min(236, Math.max(0, cpuYRef.current));

    // Goal conditions
    if (b.x < 0) {
      gameOverRef.current = true;
      setGameState(prev => ({ ...prev, gameOver: true }));
      return;
    }
    if (b.x > 300) {
      b.x = 150; b.y = 150;
      b.dx = -1.8 - (levelRef.current * 0.4);
      b.dy = (Math.random() - 0.5) * 4;
    }

    // 2. DIRECT DOM UPDATES (Bypasses React Render)
    if (ballElemRef.current) ballElemRef.current.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
    if (playerElemRef.current) playerElemRef.current.style.transform = `translate3d(0, ${playerYRef.current}px, 0)`;
    if (cpuElemRef.current) cpuElemRef.current.style.transform = `translate3d(0, ${cpuYRef.current}px, 0)`;

    requestRef.current = requestAnimationFrame(update);
  };

  useEffect(() => {
    // Single Loop Entry
    gameOverRef.current = false;
    requestRef.current = requestAnimationFrame(update);
    return () => { if (requestRef.current) cancelAnimationFrame(requestRef.current); };
  }, []);

  const handleMove = (e: any) => {
    if (!boardRef.current || gameOverRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const cy = 'touches' in e ? e.touches[0].clientY : e.clientY;
    playerYRef.current = Math.min(236, Math.max(0, cy - rect.top - 32));
    // Immediate visual feedback
    if (playerElemRef.current) playerElemRef.current.style.transform = `translate3d(0, ${playerYRef.current}px, 0)`;
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm border-8 border-white p-3 shadow-[0_0_50px_rgba(255,255,255,0.2)]">
        <GameHUD score={gameState.score} level={gameState.level} title="PIPO-PONG" onExit={() => onClose(0)} />
        <div 
          ref={boardRef} 
          onMouseMove={handleMove} 
          onTouchMove={handleMove} 
          className="w-full h-[300px] bg-black border-2 border-white/20 relative cursor-none overflow-hidden"
        >
          <div className="absolute left-1/2 top-0 bottom-0 w-0 border-l-2 border-white/10 border-dashed -translate-x-1/2" />
          
          <div 
            ref={playerElemRef}
            className="absolute left-2 w-3 h-16 bg-[#8B5E3C] shadow-[0_0_15px_#8B5E3C] border border-white/20" 
            style={{ transform: `translate3d(0, 120px, 0)`, willChange: 'transform' }} 
          />
          
          <div 
            ref={cpuElemRef}
            className="absolute right-2 w-3 h-16 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)]" 
            style={{ transform: `translate3d(0, 120px, 0)`, willChange: 'transform' }} 
          />
          
          <div 
            ref={ballElemRef}
            className="absolute w-4 h-4 bg-yellow-400 shadow-[0_0_15px_yellow] rounded-sm" 
            style={{ transform: `translate3d(150px, 150px, 0)`, willChange: 'transform' }} 
          />

          {gameState.gameOver && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center z-50 text-center">
              <h2 className="text-white text-3xl font-black mb-4 uppercase">GAME OVER</h2>
              <p className="text-yellow-400 mb-8 font-bold">FINAL SCORE: {gameState.score}</p>
              <button onClick={() => onClose(gameState.score)} className="px-8 py-3 bg-white text-black font-black uppercase">Sair</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ================= PIPO-ASTEROIDS =================
export function PipoAsteroids({ onClose }: { onClose: (score: number) => void }) {
  const [gameState, setGameState] = useState({ score: 0, level: 1, gameOver: false, lives: 3 });
  const [renderShip, setRenderShip] = useState({ x: 150, y: 150, r: 0 });
  const [renderAsteroids, setRenderAsteroids] = useState<any[]>([]);
  const [renderBullets, setRenderBullets] = useState<any[]>([]);
  const [invincible, setInvincible] = useState(false);
  
  const shipRef = useRef({ x: 150, y: 150, r: 0, vx: 0, vy: 0 });
  const asteroidsRef = useRef<any[]>([]);
  const bulletsRef = useRef<any[]>([]);
  const keysRef = useRef<{[key: string]: boolean}>({});
  const boardSize = 300;
  const boardRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number | null>(null);
  const invincibleRef = useRef(false);

  const initLevel = (lvl: number) => {
    const nextA = [];
    for (let i = 0; i < 3 + lvl; i++) {
      nextA.push({
        id: Math.random(), 
        x: Math.random() * boardSize, 
        y: Math.random() * boardSize, 
        r: Math.random() * 360,
        vx: (Math.random() - 0.5) * (0.8 + lvl * 0.2), 
        vy: (Math.random() - 0.5) * (0.8 + lvl * 0.2), 
        size: 40, 
        rv: (Math.random() - 0.5) * 4
      });
    }
    asteroidsRef.current = nextA;
    setRenderAsteroids(nextA);
  };

  const shoot = () => {
    if (gameState.gameOver) return;
    const s = shipRef.current;
    // Rocket emoji points 45deg up-right by default. 
    // We adjust by -45 to get the "front" vector.
    const angleRad = (s.r - 45) * Math.PI / 180;
    const offsetX = Math.cos(angleRad) * 22;
    const offsetY = Math.sin(angleRad) * 22;

    bulletsRef.current.push({
      id: Math.random(),
      x: s.x + offsetX,
      y: s.y + offsetY,
      vx: Math.cos(angleRad) * 8,
      vy: Math.sin(angleRad) * 8,
      life: 40
    });
  };

  const update = () => {
    if (gameState.gameOver) return;

    // Ship Physics
    const s = shipRef.current;
    const keys = keysRef.current;
    
    if (keys['ArrowLeft']) s.r -= 6;
    if (keys['ArrowRight']) s.r += 6;
    if (keys['ArrowUp']) {
      const angleRad = (s.r - 45) * Math.PI / 180;
      s.vx += Math.cos(angleRad) * 0.28;
      s.vy += Math.sin(angleRad) * 0.28;
    }
    s.vx *= 0.98;
    s.vy *= 0.98;
    s.x = (s.x + s.vx + boardSize) % boardSize;
    s.y = (s.y + s.vy + boardSize) % boardSize;

    // Bullets
    bulletsRef.current = bulletsRef.current
      .map(b => ({ ...b, x: (b.x + b.vx + boardSize) % boardSize, y: (b.y + b.vy + boardSize) % boardSize, life: b.life - 1 }))
      .filter(b => b.life > 0);

    // Asteroids
    let hitPlayer = false;
    let scoreGained = 0;
    const nextAsteroids: any[] = [];

    asteroidsRef.current.forEach(a => {
      let destroyed = false;
      bulletsRef.current.forEach((b, bi) => {
        const d = Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
        if (d < a.size / 2 + 5) {
          destroyed = true;
          bulletsRef.current.splice(bi, 1);
        }
      });

      if (destroyed) {
        scoreGained += 50;
        if (a.size > 20) {
          for (let i = 0; i < 2; i++) {
            nextAsteroids.push({
              id: Math.random(),
              x: a.x, y: a.y,
              vx: (Math.random() - 0.5) * 4,
              vy: (Math.random() - 0.5) * 4,
              size: a.size / 2,
              r: Math.random() * 360,
              rv: (Math.random() - 0.5) * 8
            });
          }
        }
      } else {
        a.x = (a.x + a.vx + boardSize) % boardSize;
        a.y = (a.y + a.vy + boardSize) % boardSize;
        a.r += a.rv;
        nextAsteroids.push(a);
        
        if (!invincibleRef.current) {
          const distToPlayer = Math.sqrt(Math.pow(a.x - s.x, 2) + Math.pow(a.y - s.y, 2));
          if (distToPlayer < a.size / 2 + 10) hitPlayer = true;
        }
      }
    });

    asteroidsRef.current = nextAsteroids;
    if (scoreGained > 0) setGameState(prev => ({ ...prev, score: prev.score + scoreGained }));
    
    if (hitPlayer) {
      if (gameState.lives > 1) {
        setGameState(prev => ({ ...prev, lives: prev.lives - 1 }));
        s.x = 150; s.y = 150; s.vx = 0; s.vy = 0;
        invincibleRef.current = true;
        setInvincible(true);
        setTimeout(() => {
          invincibleRef.current = false;
          setInvincible(false);
        }, 2000);
      } else {
        setGameState(prev => ({ ...prev, lives: 0, gameOver: true }));
      }
    }

    if (nextAsteroids.length === 0) {
        setGameState(prev => {
            const nl = prev.level + 1;
            initLevel(nl);
            return { ...prev, level: nl };
        });
    }

    setRenderShip({ x: s.x, y: s.y, r: s.r });
    setRenderAsteroids([...asteroidsRef.current]);
    setRenderBullets([...bulletsRef.current]);

    requestRef.current = requestAnimationFrame(update);
  };

  const handleInteraction = (e: any) => {
    if (gameState.gameOver || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const cx = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const cy = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = cx - rect.left;
    const y = cy - rect.top;
    
    // Rotate ship to face cursor/finger
    // The +45 is because the 🚀 is tilted ↗️ by default (+45 deg)
    const angle = Math.atan2(y - shipRef.current.y, x - shipRef.current.x) * 180 / Math.PI;
    shipRef.current.r = angle + 45; 
  };

  useEffect(() => {
    initLevel(gameState.level);
    requestRef.current = requestAnimationFrame(update);
    
    const d = (e: any) => { keysRef.current[e.key] = true; if (e.key === ' ' || e.key === 'Control') shoot(); };
    const u = (e: any) => keysRef.current[e.key] = false;
    window.addEventListener('keydown', d);
    window.addEventListener('keyup', u);
    
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
      window.removeEventListener('keydown', d);
      window.removeEventListener('keyup', u);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex flex-col items-center justify-center p-4 font-pixel">
      <div className="w-full max-w-sm border-4 border-slate-700 p-3 bg-slate-900 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <GameHUD score={gameState.score} level={gameState.level} title="PIPO-ASTEROIDS" onExit={() => onClose(0)} lives={gameState.lives} />
        <div 
          ref={boardRef}
          onMouseMove={handleInteraction}
          onTouchMove={handleInteraction}
          onMouseDown={() => keysRef.current['ArrowUp'] = true}
          onMouseUp={() => keysRef.current['ArrowUp'] = false}
          onTouchStart={() => keysRef.current['ArrowUp'] = true}
          onTouchEnd={() => keysRef.current['ArrowUp'] = false}
          className="relative w-full aspect-square bg-[#050510] border-2 border-white/5 overflow-hidden rounded-sm cursor-crosshair"
        >
          {/* Ship */}
          <div 
            className={`absolute z-20 ${invincible ? 'animate-pulse opacity-50' : ''}`} 
            style={{ transform: `translate3d(${renderShip.x}px, ${renderShip.y}px, 0) rotate(${renderShip.r}deg) translate(-50%, -50%)` }}
          >
            <span className="text-3xl drop-shadow-[0_0_8px_white]">🚀</span>
          </div>
          
          {/* Asteroids */}
          {renderAsteroids.map(a => (
            <div 
              key={a.id} 
              className="absolute bg-slate-700 border-2 border-slate-500 rounded-sm" 
              style={{ 
                width: a.size, 
                height: a.size, 
                transform: `translate3d(${a.x}px, ${a.y}px, 0) rotate(${a.r}deg) translate(-50%, -50%)` 
              }} 
            />
          ))}
          
          {/* Bullets */}
          {renderBullets.map(b => (
            <div 
              key={b.id} 
              className="absolute w-1 h-3 bg-yellow-400 shadow-[0_0_8px_yellow]" 
              style={{ transform: `translate3d(${b.x}px, ${b.y}px, 0) translate(-50%, -50%)` }} 
            />
          ))}
        </div>
        
        {/* Controls */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <button 
            className="bg-blue-900/40 p-4 border-2 border-blue-500 text-white text-xs font-bold uppercase active:bg-blue-600 transition-colors shadow-[0_0_10px_rgba(59,130,246,0.3)]"
            onTouchStart={(e) => { e.stopPropagation(); keysRef.current['ArrowUp'] = true; }}
            onTouchEnd={(e) => { e.stopPropagation(); keysRef.current['ArrowUp'] = false; }}
            onMouseDown={(e) => { e.stopPropagation(); keysRef.current['ArrowUp'] = true; }}
            onMouseUp={(e) => { e.stopPropagation(); keysRef.current['ArrowUp'] = false; }}
          >
            ⏬ PULSO
          </button>
          <button 
            className="bg-red-900/40 p-4 border-2 border-red-500 text-white text-xs font-bold uppercase active:bg-red-600 transition-colors shadow-[0_0_10px_rgba(239,68,68,0.3)]"
            onClick={(e) => { e.stopPropagation(); shoot(); }}
          >
            🔥 FOGO
          </button>
        </div>
      </div>
      
      {gameState.gameOver && (
        <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="absolute inset-0 bg-slate-950/95 flex flex-col items-center justify-center z-50 p-6 text-center"
        >
            < Award className="text-yellow-500 mb-4" size={48} />
            <h2 className="text-white text-3xl font-black mb-1 uppercase tracking-tighter">MISSÃO FALHOU</h2>
            <p className="text-slate-400 text-xs mb-8 uppercase">SCORE FINAL: {gameState.score}</p>
            <button 
                onClick={() => onClose(gameState.score)} 
                className="w-full py-4 bg-white text-slate-950 font-black uppercase text-xs"
            >
                Voltar ao Pipo
            </button>
        </motion.div>
      )}
    </div>
  );
}
