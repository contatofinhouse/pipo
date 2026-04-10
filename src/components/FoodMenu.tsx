import React from 'react';
import { motion } from 'motion/react';
import { EvolutionStage, FoodType } from '../types';

interface FoodMenuProps {
  evolutionStage: EvolutionStage;
  onFeed: (food: FoodType) => void;
  onClose: () => void;
}

export function FoodMenu({ evolutionStage, onFeed, onClose }: FoodMenuProps) {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
    >
      <div className="bg-white p-6 border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full">
        <h2 className="text-sm font-bold mb-6 uppercase text-center">O que o Pipo vai comer?</h2>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onFeed('APPLE')}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-red-100 hover:bg-red-200 transition-colors"
          >
            <span className="text-3xl">🍎</span>
            <span className="text-[10px] font-bold uppercase">Maçã</span>
            <span className="text-[8px] text-gray-500">Fome +15</span>
          </button>
          <button 
            onClick={() => onFeed('PASTA')}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-yellow-100 hover:bg-yellow-200 transition-colors"
          >
            <span className="text-3xl">🍝</span>
            <span className="text-[10px] font-bold uppercase">Macarrão</span>
            <span className="text-[8px] text-gray-500">Fome +30, NRG +15</span>
          </button>
          <button 
            onClick={() => onFeed('PIZZA')}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-orange-100 hover:bg-orange-200 transition-colors"
          >
            <span className="text-3xl">🍕</span>
            <span className="text-[10px] font-bold uppercase">Pizza</span>
            <span className="text-[8px] text-gray-500">Fome +40, NRG -10</span>
          </button>
          <button 
            onClick={() => onFeed('VEGGIES')}
            className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-green-100 hover:bg-green-200 transition-colors"
          >
            <span className="text-3xl">🥗</span>
            <span className="text-[10px] font-bold uppercase">Legumes</span>
            <span className="text-[8px] text-gray-500">Fome +20, HP +5</span>
          </button>
          {(evolutionStage === 'ADULT' || evolutionStage === 'LEGENDARY') && (
            <button 
              onClick={() => onFeed('COFFEE')}
              className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-stone-100 hover:bg-stone-200 transition-colors"
            >
              <span className="text-3xl">☕</span>
              <span className="text-[10px] font-bold uppercase">Café</span>
              <span className="text-[8px] text-gray-500">Energia +40</span>
            </button>
          )}
        </div>
        <button 
          onClick={onClose}
          className="w-full mt-6 py-3 border-4 border-black font-bold uppercase text-[10px]"
        >
          Cancelar
        </button>
      </div>
    </motion.div>
  );
}
