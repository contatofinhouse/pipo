import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ArcadeMenuProps {
  onGameSelect: (game: 'NONE' | 'TENNIS' | 'BOUNCE' | 'BALL_PIT' | 'PIPOMAN' | 'PONG' | 'ASTEROIDS' | 'TETRIS' | 'SNAKE' | 'WORMS' | 'FARM', actionUpdate?: boolean) => void;
  onClose: () => void;
}

export function ArcadeMenu({ onGameSelect, onClose }: ArcadeMenuProps) {
  return (
    <motion.div 
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-x-0 bottom-0 z-50 bg-white border-t-8 border-black p-6 shadow-[0_-8px_0_0_rgba(0,0,0,1)]"
    >
      <div className="max-w-md mx-auto">
        <div className="w-12 h-2 bg-gray-300 rounded-full mx-auto mb-6" />
        <h2 className="text-sm font-bold mb-6 uppercase text-center">Escolha uma brincadeira</h2>
        <div className="grid grid-cols-3 gap-4">
          <button 
            onClick={() => onGameSelect('TENNIS', true)}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-yellow-100 hover:bg-yellow-200 transition-colors"
          >
            <span className="text-3xl">🎾</span>
            <span className="text-[10px] font-bold uppercase">Bola de Tênis</span>
          </button>
          <button 
            onClick={() => onGameSelect('PONG')}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-stone-800 hover:bg-black transition-colors text-white"
          >
            <span className="text-3xl">🏓</span>
            <span className="text-[10px] font-bold uppercase">Pipo Pong</span>
          </button>
          <button 
            onClick={() => onGameSelect('ASTEROIDS')}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-stone-900 hover:bg-black transition-colors text-white"
          >
            <span className="text-3xl">🚀</span>
            <span className="text-[10px] font-bold uppercase">Asteroids</span>
          </button>
          <button 
            onClick={() => onGameSelect('NONE', true)}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-purple-100 hover:bg-purple-200 transition-colors"
          >
            <span className="text-3xl">🎸</span>
            <span className="text-[10px] font-bold uppercase">Mini Guitarra</span>
          </button>
          <button 
            onClick={() => onGameSelect('BOUNCE', true)}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-green-100 hover:bg-green-200 transition-colors"
          >
            <span className="text-3xl">⚽</span>
            <span className="text-[10px] font-bold uppercase">Bola Saltitante</span>
          </button>
          <button 
            onClick={() => onGameSelect('PIPOMAN')}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-yellow-300 hover:bg-yellow-400 transition-colors"
          >
            <span className="text-3xl">👻</span>
            <span className="text-[10px] font-bold uppercase">Pipo-Man</span>
          </button>
          <button 
            onClick={() => onGameSelect('TETRIS')}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-blue-100 hover:bg-blue-200 transition-colors"
          >
            <span className="text-3xl">🧱</span>
            <span className="text-[10px] font-bold uppercase">Pipo-Tetris</span>
          </button>
          <button 
            onClick={() => onGameSelect('SNAKE')}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-emerald-200 hover:bg-emerald-300 transition-colors"
          >
            <span className="text-3xl">🐍</span>
            <span className="text-[10px] font-bold uppercase">Pipo-Snake</span>
          </button>
          <button 
            onClick={() => onGameSelect('WORMS')}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-rose-200 hover:bg-rose-300 transition-colors"
          >
            <span className="text-3xl">🐛</span>
            <span className="text-[10px] font-bold uppercase">Pipo-Worms</span>
          </button>
          <button 
            onClick={() => onGameSelect('FARM')}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-lime-200 hover:bg-lime-300 transition-colors"
          >
            <span className="text-3xl">🌱</span>
            <span className="text-[10px] font-bold uppercase">Pipo-Farm</span>
          </button>
          <button 
            onClick={() => onGameSelect('BALL_PIT', true)}
            className="flex flex-col items-center justify-center p-4 border-4 border-black bg-red-100 hover:bg-red-200 col-span-3 transition-colors"
          >
            <span className="text-3xl mb-2">🔴🔵🟡</span>
            <span className="text-[10px] font-bold uppercase">Piscina de Bolinhas</span>
          </button>
        </div>
        <button 
          onClick={onClose}
          className="w-full mt-6 py-3 border-4 border-black font-bold uppercase text-[10px]"
        >
          Fechar
        </button>
      </div>
    </motion.div>
  );
}
