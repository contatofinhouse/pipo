import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ArrowLeft, ArrowUp, ArrowDown, ArrowRight } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PipoSnakeProps {
  onClose: (score: number) => void;
}

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 15;
const INITIAL_SNAKE: Point[] = [
  { x: 7, y: 7 },
  { x: 7, y: 8 },
  { x: 7, y: 9 },
];
const INITIAL_DIRECTION: Direction = 'UP';
const BASE_SPEED = 200;

export function PipoSnake({ onClose }: PipoSnakeProps) {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [direction, setDirection] = useState<Direction>(INITIAL_DIRECTION);
  const [food, setFood] = useState<Point>({ x: 3, y: 3 });
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const directionRef = useRef(direction);
  // Track last executed direction to prevent rapid double-turns (e.g. going opposite direction accidentally)
  const lastMovedDirectionRef = useRef(direction);

  useEffect(() => {
    directionRef.current = direction;
  }, [direction]);

  const generateFood = useCallback((currentSnake: Point[]) => {
    let newFood;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      // eslint-disable-next-line no-loop-func
      const isOnSnake = currentSnake.some(segment => segment.x === newFood.x && segment.y === newFood.y);
      if (!isOnSnake) break;
    }
    return newFood;
  }, []);

  const moveSnake = useCallback(() => {
    if (gameOver || !hasStarted) return;

    setSnake((prev) => {
      const head = { ...prev[0] };
      const currentDir = directionRef.current;
      lastMovedDirectionRef.current = currentDir;

      switch (currentDir) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Check collision with walls
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true);
        return prev;
      }

      // Check collision with self
      if (prev.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true);
        return prev;
      }

      const newSnake = [head, ...prev];

      // Check food (apple)
      if (head.x === food.x && head.y === food.y) {
        setScore(s => s + 10);
        setFood(generateFood(newSnake));
      } else {
        newSnake.pop(); // Remove tail
      }

      return newSnake;
    });
  }, [food, generateFood, gameOver, hasStarted]);

  useEffect(() => {
    // Speed increases maxing out at 60ms delay
    const speed = Math.max(60, BASE_SPEED - Math.floor(score / 50) * 15);
    const interval = setInterval(moveSnake, speed);
    return () => clearInterval(interval);
  }, [moveSnake, score]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const lastMove = lastMovedDirectionRef.current;
      setHasStarted(true);
      
      switch (e.key) {
        case 'ArrowUp': 
        case 'w':
          if (lastMove !== 'DOWN') setDirection('UP'); break;
        case 'ArrowDown': 
        case 's':
          if (lastMove !== 'UP') setDirection('DOWN'); break;
        case 'ArrowLeft': 
        case 'a':
          if (lastMove !== 'RIGHT') setDirection('LEFT'); break;
        case 'ArrowRight': 
        case 'd':
          if (lastMove !== 'LEFT') setDirection('RIGHT'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleControlClick = (dir: Direction) => {
    setHasStarted(true);
    const lastMove = lastMovedDirectionRef.current;
    if (dir === 'UP' && lastMove !== 'DOWN') setDirection('UP');
    if (dir === 'DOWN' && lastMove !== 'UP') setDirection('DOWN');
    if (dir === 'LEFT' && lastMove !== 'RIGHT') setDirection('LEFT');
    if (dir === 'RIGHT' && lastMove !== 'LEFT') setDirection('RIGHT');
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[100] bg-[#1a1a2e] flex flex-col items-center justify-center font-pixel p-4 touch-none"
    >
      <div className="w-full max-w-sm flex justify-between items-center mb-4 text-white">
        <button onClick={() => onClose(score)} className="p-2 border-2 border-white/20 hover:bg-white/10 rounded-lg active:scale-95 transition-transform">
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-lg">SNAKE</h2>
        </div>
        <div className="flex items-center gap-2 text-xl text-yellow-400 bg-black/40 px-3 py-1 rounded-full border border-yellow-400/30">
          <Trophy size={16} />
          <span className="text-sm font-bold">{score}</span>
        </div>
      </div>

      {/* Game Boy Screen Frame */}
      <div className="bg-[#8b9bb4] p-4 rounded-t-xl rounded-bl-xl rounded-br-[40px] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] border-t-8 border-l-8 border-[#a9b9d1] relative w-full max-w-sm">
        
        {/* Game Area */}
        <div className="bg-[#9bbc0f] w-full aspect-square border-4 border-black/40 relative shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] overflow-hidden">
          
          <AnimatePresence>
            {!hasStarted && !gameOver && (
              <motion.div 
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/40 z-20 flex flex-col items-center justify-center text-center backdrop-blur-[2px]"
              >
                <div className="text-5xl mb-4 animate-bounce">🍎</div>
                <h2 className="text-white text-md font-bold uppercase drop-shadow-md">Use as setas<br/>para começar</h2>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {gameOver && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/80 z-20 flex flex-col items-center justify-center text-center p-4 backdrop-blur-sm"
              >
                <h2 className="text-red-500 text-3xl font-bold mb-2 drop-shadow-md uppercase tracking-wider">Game Over</h2>
                <div className="text-yellow-400 mb-8 border-y-2 border-yellow-400 py-2 w-full text-center">
                  Score final: {score}
                </div>
                <button
                  onClick={() => {
                    setSnake(INITIAL_SNAKE);
                    setDirection(INITIAL_DIRECTION);
                    lastMovedDirectionRef.current = INITIAL_DIRECTION;
                    setScore(0);
                    setGameOver(false);
                    setHasStarted(false);
                    setFood(generateFood(INITIAL_SNAKE));
                  }}
                  className="w-full bg-white text-black py-4 font-bold uppercase active:scale-95 border-b-4 border-gray-400 active:border-b-0 active:translate-y-1 mb-4"
                >
                  Tentar Novamente
                </button>
                <button
                   onClick={() => onClose(score)}
                   className="text-[9px] text-gray-400 hover:text-white transition-colors"
                >
                   Finalizar e Receber XP
                </button>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Render Grid */}
          <div 
            className="w-full h-full grid"
            style={{ 
              gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
              gridTemplateRows: `repeat(${GRID_SIZE}, 1fr)` 
            }}
          >
            {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
              const x = i % GRID_SIZE;
              const y = Math.floor(i / GRID_SIZE);
              
              const isHead = snake[0].x === x && snake[0].y === y;
              
              // We check if it is part of body but NOT the head
              const isBody = !isHead && snake.some(s => s.x === x && s.y === y);
              
              const isFood = food.x === x && food.y === y;

              return (
                <div
                  key={i}
                  className={cn(
                    "w-full h-full border-[0.5px] border-[#8bac0f]/20 flex items-center justify-center",
                    isHead ? "bg-[#0f380f] rounded-sm scale-90" : 
                    isBody ? "bg-[#306230] rounded-sm scale-90" : 
                    isFood ? "" : ""
                  )}
                >
                  {isFood && <div className="text-[12px] md:text-[18px] leading-none select-none drop-shadow-md">🍎</div>}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Controls (D-Pad) */}
      <div className="mt-8 flex flex-col items-center gap-2 select-none">
        <button 
          onPointerDown={(e) => { e.preventDefault(); handleControlClick('UP'); }} 
          className="w-16 h-16 bg-white/10 active:bg-white/30 rounded-t-xl rounded-b-md border-b-4 border-white/20 active:border-b-0 active:translate-y-1 flex items-center justify-center touch-manipulation shadow-lg backdrop-blur-sm"
        >
          <ArrowUp className="text-white" size={32} />
        </button>
        <div className="flex gap-16">
          <button 
            onPointerDown={(e) => { e.preventDefault(); handleControlClick('LEFT'); }} 
            className="w-16 h-16 bg-white/10 active:bg-white/30 rounded-l-xl rounded-r-md border-b-4 border-white/20 active:border-b-0 active:translate-y-1 flex items-center justify-center touch-manipulation shadow-lg backdrop-blur-sm"
          >
            <ArrowLeft className="text-white" size={32} />
          </button>
          <button 
             onPointerDown={(e) => { e.preventDefault(); handleControlClick('RIGHT'); }} 
             className="w-16 h-16 bg-white/10 active:bg-white/30 rounded-r-xl rounded-l-md border-b-4 border-white/20 active:border-b-0 active:translate-y-1 flex items-center justify-center touch-manipulation shadow-lg backdrop-blur-sm"
          >
            <ArrowRight className="text-white" size={32} />
          </button>
        </div>
        <button 
          onPointerDown={(e) => { e.preventDefault(); handleControlClick('DOWN'); }} 
          className="w-16 h-16 bg-white/10 active:bg-white/30 rounded-b-xl rounded-t-md border-b-4 border-white/20 active:border-b-0 active:translate-y-1 flex items-center justify-center touch-manipulation shadow-lg backdrop-blur-sm -mt-2"
        >
          <ArrowDown className="text-white" size={32} />
        </button>
      </div>
    </motion.div>
  );
}
