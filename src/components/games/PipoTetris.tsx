import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, ArrowLeft, ArrowDown, ArrowRight, RotateCw } from 'lucide-react';
import { cn } from '../../lib/utils';

interface PipoTetrisProps {
  onClose: (score: number) => void;
}

const BOARD_WIDTH = 10;
const BOARD_HEIGHT = 20;

// Colors mapping
const TETROMINOES = {
  I: { shape: [[1, 1, 1, 1]], color: 'bg-cyan-400' },
  J: { shape: [[1, 0, 0], [1, 1, 1]], color: 'bg-blue-500' },
  L: { shape: [[0, 0, 1], [1, 1, 1]], color: 'bg-orange-500' },
  O: { shape: [[1, 1], [1, 1]], color: 'bg-yellow-400' },
  S: { shape: [[0, 1, 1], [1, 1, 0]], color: 'bg-green-500' },
  T: { shape: [[0, 1, 0], [1, 1, 1]], color: 'bg-purple-500' },
  Z: { shape: [[1, 1, 0], [0, 1, 1]], color: 'bg-red-500' }
};

type TetrominoType = keyof typeof TETROMINOES;

// Helper to create empty board
const createEmptyBoard = () => Array.from({ length: BOARD_HEIGHT }, () => Array(BOARD_WIDTH).fill(null));

export function PipoTetris({ onClose }: PipoTetrisProps) {
  const [board, setBoard] = useState<(string | null)[][]>(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState<{
    shape: number[][];
    color: string;
    pos: { x: number; y: number };
  } | null>(null);
  
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [dropTime, setDropTime] = useState<number | null>(null);
  const [hasStarted, setHasStarted] = useState(false);

  // Check collision
  const checkCollision = (
    piece: number[][],
    targetPos: { x: number; y: number },
    currentBoard: (string | null)[][]
  ) => {
    for (let y = 0; y < piece.length; y++) {
      for (let x = 0; x < piece[y].length; x++) {
        if (piece[y][x]) {
          const boardY = y + targetPos.y;
          const boardX = x + targetPos.x;
          if (
            boardY >= BOARD_HEIGHT ||
            boardX < 0 ||
            boardX >= BOARD_WIDTH ||
            (boardY >= 0 && currentBoard[boardY][boardX] !== null)
          ) {
            return true;
          }
        }
      }
    }
    return false;
  };

  const spawnPiece = useCallback(() => {
    const types = Object.keys(TETROMINOES) as TetrominoType[];
    const randType = types[Math.floor(Math.random() * types.length)];
    const piece = TETROMINOES[randType];
    
    const newPiece = {
      shape: piece.shape,
      color: piece.color,
      pos: { x: Math.floor(BOARD_WIDTH / 2) - Math.floor(piece.shape[0].length / 2), y: 0 }
    };

    if (checkCollision(newPiece.shape, newPiece.pos, board)) {
      setGameOver(true);
      setDropTime(null);
    } else {
      setCurrentPiece(newPiece);
    }
  }, [board]);

  const mergeBoardAndClear = useCallback(() => {
    if (!currentPiece) return;
    const newBoard = board.map(row => [...row]);
    
    // Merge
    for (let y = 0; y < currentPiece.shape.length; y++) {
      for (let x = 0; x < currentPiece.shape[y].length; x++) {
        if (currentPiece.shape[y][x]) {
          const boardY = y + currentPiece.pos.y;
          if (boardY >= 0) {
            newBoard[boardY][x + currentPiece.pos.x] = currentPiece.color;
          }
        }
      }
    }

    // Clear lines
    let linesCleared = 0;
    const sweptBoard = newBoard.reduce((acc, row) => {
      if (row.every(cell => cell !== null)) {
        linesCleared++;
        acc.unshift(Array(BOARD_WIDTH).fill(null));
      } else {
        acc.push(row);
      }
      return acc;
    }, [] as (string | null)[][]);

    if (linesCleared > 0) {
      const points = [0, 100, 300, 500, 800];
      setScore(s => s + points[linesCleared]);
      // Speed up drop time slightly
      setDropTime(prev => prev ? Math.max(100, prev - 20) : null);
    }

    setBoard(sweptBoard);
    setCurrentPiece(null);
  }, [board, currentPiece]);

  const drop = useCallback(() => {
    if (!currentPiece) return;
    
    if (!checkCollision(currentPiece.shape, { x: currentPiece.pos.x, y: currentPiece.pos.y + 1 }, board)) {
      setCurrentPiece(prev => prev ? { ...prev, pos: { x: prev.pos.x, y: prev.pos.y + 1 } } : null);
    } else {
      mergeBoardAndClear();
    }
  }, [currentPiece, board, mergeBoardAndClear]);

  // UseInterval Custom Hook equivalent
  const savedCallback = useRef<() => void>();
  useEffect(() => {
    savedCallback.current = drop;
  }, [drop]);

  useEffect(() => {
    if (dropTime !== null && !gameOver) {
      const id = setInterval(() => savedCallback.current?.(), dropTime);
      return () => clearInterval(id);
    }
  }, [dropTime, gameOver]);

  // Main Loop ensures piece exists
  useEffect(() => {
    if (hasStarted && !gameOver && !currentPiece) {
      spawnPiece();
    }
  }, [hasStarted, gameOver, currentPiece, spawnPiece]);

  // Controls
  const rotate = () => {
    if (!currentPiece || gameOver) return;
    const rotatedShape = currentPiece.shape[0].map((_, index) => currentPiece.shape.map(row => row[index]).reverse());
    if (!checkCollision(rotatedShape, currentPiece.pos, board)) {
      setCurrentPiece({ ...currentPiece, shape: rotatedShape });
    }
  };

  const move = (dir: number) => {
    if (!currentPiece || gameOver) return;
    if (!checkCollision(currentPiece.shape, { x: currentPiece.pos.x + dir, y: currentPiece.pos.y }, board)) {
      setCurrentPiece({ ...currentPiece, pos: { x: currentPiece.pos.x + dir, y: currentPiece.pos.y } });
    }
  };

  const startGame = () => {
    setBoard(createEmptyBoard());
    setScore(0);
    setGameOver(false);
    setHasStarted(true);
    setCurrentPiece(null);
    setDropTime(800);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!hasStarted) {
      if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '].includes(e.key)) {
        startGame();
      }
      return;
    }
    
    switch (e.key) {
      case 'ArrowLeft': move(-1); break;
      case 'ArrowRight': move(1); break;
      case 'ArrowDown': drop(); break;
      case 'ArrowUp': rotate(); break;
    }
  }, [hasStarted, currentPiece, board]); // eslint-disable-line

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Rendering
  const renderBoard = () => {
    const finalBoard = board.map(row => [...row]);
    
    if (currentPiece) {
      for (let y = 0; y < currentPiece.shape.length; y++) {
        for (let x = 0; x < currentPiece.shape[y].length; x++) {
          if (currentPiece.shape[y][x]) {
            const boardY = y + currentPiece.pos.y;
            if (boardY >= 0 && boardY < BOARD_HEIGHT) {
              finalBoard[boardY][x + currentPiece.pos.x] = currentPiece.color;
            }
          }
        }
      }
    }
    return finalBoard;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="fixed inset-0 z-[100] bg-[#1d1f21] flex flex-col items-center justify-center font-pixel p-4 touch-none"
    >
      <div className="w-full max-w-xs flex justify-between items-center mb-4 text-white">
        <button onClick={() => onClose(score)} className="p-2 border-2 border-white/20 hover:bg-white/10 rounded-lg active:scale-95 transition-transform">
          <ArrowLeft size={24} />
        </button>
        <div className="flex flex-col items-center">
          <h2 className="text-blue-400 font-bold uppercase tracking-widest text-lg">TETRIS</h2>
        </div>
        <div className="flex items-center gap-2 text-xl text-yellow-400 bg-black/40 px-3 py-1 rounded-full border border-yellow-400/30">
          <Trophy size={16} />
          <span className="text-sm font-bold">{score}</span>
        </div>
      </div>

      {/* Tetris Board */}
      <div className="bg-[#111111] border-4 border-gray-600 rounded-lg p-2 w-[240px] shadow-[0_0_20px_rgba(0,100,255,0.1)] relative mx-auto">
        <div 
          className="grid gap-[1px] bg-gray-800"
          style={{ 
            gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
            gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)` 
          }}
        >
          {renderBoard().map((row, y) => 
            row.map((cellColor, x) => (
              <div
                key={`${y}-${x}`}
                className={cn(
                  "w-full aspect-square relative",
                  cellColor ? cellColor : "bg-[#1a1a1a]"
                )}
              >
                {cellColor && (
                  <div className="absolute inset-0 border-t-2 border-l-2 border-white/30 border-b-2 border-r-2 border-black/30" />
                )}
              </div>
            ))
          )}
        </div>

        {/* Overlays */}
        <AnimatePresence>
          {!hasStarted && !gameOver && (
            <motion.div 
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/70 z-20 flex flex-col items-center justify-center text-center p-4"
              onClick={startGame}
            >
              <div className="text-4xl mb-4 animate-bounce">🧱</div>
              <p className="text-white text-[10px] font-bold uppercase drop-shadow-md leading-relaxed animate-pulse">Toque para<br/>Iniciar</p>
            </motion.div>
          )}

          {gameOver && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-black/80 z-20 flex flex-col items-center justify-center text-center p-4 backdrop-blur-sm"
            >
              <h2 className="text-red-500 text-xl font-bold mb-2 drop-shadow-md uppercase">Game Over</h2>
              <div className="text-yellow-400 mb-6 border-y-2 border-yellow-400 py-2 w-full text-center text-sm">
                Score: {score}
              </div>
              <button
                onClick={startGame}
                className="w-full bg-white text-black py-4 text-[10px] font-bold uppercase active:scale-95 border-b-4 border-gray-400 active:border-b-0 active:translate-y-1 mb-4"
              >
                De Novo!
              </button>
              <button
                onClick={() => onClose(score)}
                className="text-[8px] text-gray-400 hover:text-white transition-colors"
              >
                Sair com XP
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Controls */}
      <div className="w-full max-w-xs mt-6 flex justify-between gap-4 select-none px-4">
        <div className="flex gap-2">
          <button 
            onPointerDown={(e) => { e.preventDefault(); move(-1); }} 
            className="w-14 h-14 bg-white/10 active:bg-white/30 rounded-full border-b-4 border-white/20 active:border-b-0 active:translate-y-1 flex items-center justify-center touch-manipulation"
          >
            <ArrowLeft className="text-white" size={24} />
          </button>
          <button 
            onPointerDown={(e) => { e.preventDefault(); move(1); }} 
            className="w-14 h-14 bg-white/10 active:bg-white/30 rounded-full border-b-4 border-white/20 active:border-b-0 active:translate-y-1 flex items-center justify-center touch-manipulation"
          >
            <ArrowRight className="text-white" size={24} />
          </button>
        </div>
        <div className="flex gap-2">
          <button 
            onPointerDown={(e) => { e.preventDefault(); drop(); }} 
            className="w-14 h-14 bg-white/10 active:bg-white/30 rounded-full border-b-4 border-white/20 active:border-b-0 active:translate-y-1 flex items-center justify-center touch-manipulation text-white"
          >
             <ArrowDown size={24} />
          </button>
          <button 
            onPointerDown={(e) => { e.preventDefault(); rotate(); }} 
            className="w-16 h-16 bg-blue-500 active:bg-blue-600 rounded-full border-b-4 border-blue-700 active:border-b-0 active:translate-y-1 flex items-center justify-center touch-manipulation"
          >
            <RotateCw className="text-white" size={28} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
