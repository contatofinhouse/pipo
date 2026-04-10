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
  const [ball, setBall] = useState({ x: 150, y: 150, dx: 2, dy: 2 });
  const [playerY, setPlayerY] = useState(120), [cpuY, setCpuY] = useState(120);
  const [score, setScore] = useState(0), [level, setLevel] = useState(1), [gameOver, setGameOver] = useState(false);
  const boardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (gameOver) return;
    const interval = setInterval(() => {
      setBall(prev => {
        let { x, y, dx, dy } = prev;
        x += dx; y += dy;
        if (y <= 0 || y >= 290) dy *= -1;
        if (x <= 15 && y >= playerY && y <= playerY + 60) {
          const speedBoost = 0.3;
          dx = Math.sign(dx) * (Math.abs(dx) + speedBoost);
          dx = Math.abs(dx); dy += (y - (playerY + 30)) * 0.1;
          setScore(s => s + 1); x = 16;
        }
        if (x >= 275 && y >= cpuY && y <= cpuY + 60) { dx = -Math.abs(dx); x = 274; }
        if (x < 0) { setGameOver(true); return prev; }
        if (x > 310) return { x: 150, y: 150, dx: -2 - (level * 0.5), dy: 2 + (level * 0.5) };
        return { x, y, dx, dy };
      });
      setCpuY(prev => {
        const target = ball.y - 30, cpuSpeed = 0.05 + (level * 0.02);
        return prev + (target - prev) * Math.min(1, cpuSpeed);
      });
    }, 16);
    return () => clearInterval(interval);
  }, [ball, playerY, cpuY, gameOver, level]);
  useEffect(() => { const nl = Math.floor(score / 5) + 1; if (nl > level) setLevel(nl); }, [score, level]);
  const handleMove = (e: any) => {
    if (!boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect(), cy = 'touches' in e ? e.touches[0].clientY : e.clientY;
    setPlayerY(Math.min(240, Math.max(0, cy - rect.top - 30)));
  };
  return (
    <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center p-4">
       <div className="w-full max-w-sm border-8 border-white p-3"><GameHUD score={score} level={level} title="PIPO-PONG" onExit={() => onClose(0)} />
          <div ref={boardRef} onMouseMove={handleMove} onTouchMove={handleMove} className="w-full h-[300px] bg-black border-2 border-white relative cursor-none">
             <div className="absolute left-1/2 top-0 bottom-0 w-1 border-l-2 border-white/10 border-dashed" />
             <div className="absolute left-2 w-3 h-16 bg-[#8B5E3C] shadow-[0_0_15px_#8B5E3C]" style={{ top: playerY }} />
             <div className="absolute right-2 w-3 h-16 bg-white" style={{ top: cpuY }} />
             <div className="absolute w-4 h-4 bg-yellow-400 shadow-[0_0_8px_yellow]" style={{ left: ball.x, top: ball.y }} />
          </div>
       </div>
    </div>
  );
}

// ================= PIPO-ASTEROIDS =================
export function PipoAsteroids({ onClose }: { onClose: (score: number) => void }) {
  const [ship, setShip] = useState({ x: 150, y: 150, r: 0, vx: 0, vy: 0 });
  const [asteroids, setAsteroids] = useState<{id: number, x: number, y: number, r: number, vx: number, vy: number, size: number, shape: string}[]>([]);
  const [bullets, setBullets] = useState<{x: number, y: number, vx: number, vy: number, life: number}[]>([]);
  const [score, setScore] = useState(0), [level, setLevel] = useState(1), [gameOver, setGameOver] = useState(false), [keys, setKeys] = useState<{[key: string]: boolean}>({});
  const boardSize = 300;
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const initial = [];
    for (let i = 0; i < 3 + level; i++) {
      initial.push({
        id: Math.random(), x: Math.random() * boardSize, y: Math.random() * boardSize, r: Math.random() * 360,
        vx: (Math.random() - 0.5) * (1 + level * 0.2), vy: (Math.random() - 0.5) * (1 + level * 0.2), size: 40, shape: `polygon(10% 10%, 90% 10%, 90% 90%, 10% 90%)`
      });
    }
    setAsteroids(initial);
  }, [level]);

  useEffect(() => {
    if (gameOver) return;
    const interval = setTimeout(() => {
      let { x: sx, y: sy, r: sr, vx: svx, vy: svy } = ship;
      if (keys['ArrowLeft']) sr -= 5; if (keys['ArrowRight']) sr += 5;
      if (keys['ArrowUp']) { svx += Math.cos((sr - 90) * Math.PI / 180) * 0.2; svy += Math.sin((sr - 90) * Math.PI / 180) * 0.2; }
      svx *= 0.98; svy *= 0.98; sx = (sx + svx + boardSize) % boardSize; sy = (sy + svy + boardSize) % boardSize;

      let nextB = bullets.map(b => ({ ...b, x: (b.x + b.vx + boardSize) % boardSize, y: (b.y + b.vy + boardSize) % boardSize, life: b.life - 1 })).filter(b => b.life > 0);
      let nextA: any[] = [];
      let scoreAdd = 0;
      let hitPlayer = false;

      asteroids.forEach(a => {
         const hitBulletIndex = nextB.findIndex(b => Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2)) < a.size / 2 + 5);
         if (hitBulletIndex !== -1) {
            nextB.splice(hitBulletIndex, 1);
            scoreAdd += 20;
            if (a.size > 20) {
               for (let i = 0; i < 2; i++) nextA.push({ id: Math.random(), x: a.x, y: a.y, r: Math.random() * 360, vx: (Math.random() - 0.5) * 3, vy: (Math.random() - 0.5) * 3, size: a.size / 2, shape: a.shape });
            }
         } else {
            nextA.push({ ...a, x: (a.x + a.vx + boardSize) % boardSize, y: (a.y + a.vx + boardSize) % boardSize, r: a.r + 1 });
         }
         if (Math.sqrt(Math.pow(a.x - sx, 2) + Math.pow(a.y - sy, 2)) < a.size / 2 + 10) hitPlayer = true;
      });

      setShip({ x: sx, y: sy, r: sr, vx: svx, vy: svy }); setBullets(nextB); setAsteroids(nextA);
      if (scoreAdd > 0) setScore(s => s + scoreAdd);
      if (hitPlayer) setGameOver(true);
      if (nextA.length === 0 && !gameOver) setLevel(l => l + 1);
    }, 16);
    return () => clearTimeout(interval);
  }, [keys, gameOver, ship, asteroids, bullets, level]);

  const shoot = () => { if (!gameOver) setBullets(p => [...p, { x: ship.x, y: ship.y, vx: Math.cos((ship.r - 90) * Math.PI / 180) * 6, vy: Math.sin((ship.r - 90) * Math.PI / 180) * 6, life: 50 }]); };
  const handlePointer = (e: any) => { if (gameOver || !boardRef.current) return; const rect = boardRef.current.getBoundingClientRect(); const cx = 'touches' in e ? e.touches[0].clientX : e.clientX, cy = 'touches' in e ? e.touches[0].clientY : e.clientY; setShip(p => ({ ...p, r: Math.atan2(cy - rect.top - ship.y, cx - rect.left - ship.x) * (180 / Math.PI) + 90 })); };

  useEffect(() => {
    const d = (e: any) => { setKeys(p => ({ ...p, [e.key]: true })); if (e.key === ' ' || e.key === 'Control') shoot(); };
    const u = (e: any) => setKeys(p => ({ ...p, [e.key]: false }));
    window.addEventListener('keydown', d); window.addEventListener('keyup', u);
    return () => { window.removeEventListener('keydown', d); window.removeEventListener('keyup', u); };
  }, [ship]);

  return (
    <div className="fixed inset-0 z-[110] bg-black flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-sm border-4 border-gray-700 p-3 bg-black">
        <GameHUD score={score} level={level} title="PIPO-ASTEROIDS" onExit={() => onClose(0)} />
        <div ref={boardRef} onMouseMove={handlePointer} onTouchMove={handlePointer} className="relative w-full aspect-square bg-black border-2 border-white/10 overflow-hidden">
          <div className="absolute z-20" style={{ left: ship.x, top: ship.y, transform: `translate(-50%, -50%) rotate(${ship.r}deg)` }}><span className="text-3xl">🚀</span></div>
          {asteroids.map(a => ( <div key={a.id} className="absolute bg-[#555] border border-white/20" style={{ left: a.x, top: a.y, width: a.size, height: a.size, transform: `translate(-50%, -50%) rotate(${a.r}deg)` }} /> ))}
          {bullets.map((b, i) => ( <div key={i} className="absolute w-1 h-2 bg-yellow-400" style={{ left: b.x, top: b.y, transform: 'translate(-50%, -50%)' }} /> ))}
        </div>
        <div className="grid grid-cols-2 gap-2 mt-4"><button className="bg-orange-800 p-3 border-2 border-white text-xl active:bg-orange-700" onTouchStart={() => setKeys(p => ({...p, ArrowUp: true}))} onTouchEnd={() => setKeys(p => ({...p, ArrowUp: false}))}>⏫ THRUST</button><button className="bg-red-800 p-3 border-2 border-white text-xl active:bg-red-700" onClick={shoot} onTouchStart={shoot}>🔥 FIRE</button></div>
      </div>
      {gameOver && ( <div className="absolute inset-0 bg-red-950/90 flex flex-col items-center justify-center z-50 p-6 text-center"><h2 className="text-white text-3xl font-black mb-4 uppercase">GAME OVER</h2><button onClick={() => onClose(score)} className="w-full py-5 bg-white text-red-950 font-black">SAIR</button></div> )}
    </div>
  );
}
