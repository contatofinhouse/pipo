import React from 'react';
import { motion } from 'motion/react';
import { EvolutionStage, FoodType } from '../types';

interface FoodMenuProps {
  evolutionStage: EvolutionStage;
  onFeed: (food: FoodType) => void;
  onClose: () => void;
}

const FOODS_BY_STAGE: Record<string, Array<{id: FoodType; icon: string; name: string; effect: string; styles: string}>> = {
  BABY: [
    { id: 'MILK', icon: '🍼', name: 'Mamadeira', effect: 'Fome +30, NRG +10', styles: 'bg-sky-100 hover:bg-sky-200' },
    { id: 'PORRIDGE_BANANA', icon: '🥣', name: 'Papinha', effect: 'Fome +25', styles: 'bg-yellow-100 hover:bg-yellow-200' },
    { id: 'CARROT_MASH', icon: '🥕', name: 'Purê Saudável', effect: 'Fome +15, Saúde +10', styles: 'bg-orange-100 hover:bg-orange-200' },
    { id: 'MILK_COOKIE', icon: '🍪', name: 'Biscoito', effect: 'Fome +20, Saúde -5', styles: 'bg-stone-100 hover:bg-stone-200' },
  ],
  KIDS: [
    { id: 'APPLE', icon: '🍎', name: 'Maçã', effect: 'Fome +15, Saúde +5', styles: 'bg-red-100 hover:bg-red-200' },
    { id: 'NATURAL_JUICE', icon: '🧃', name: 'Suco Natural', effect: 'Fome +10, NRG +15', styles: 'bg-orange-100 hover:bg-orange-200' },
    { id: 'KIDS_PASTA', icon: '🍝', name: 'Macarrão', effect: 'Fome +30, Feliz +10', styles: 'bg-yellow-100 hover:bg-yellow-200' },
    { id: 'ICE_CREAM', icon: '🍦', name: 'Sorvete', effect: 'Feliz +20, Saúde -10', styles: 'bg-pink-100 hover:bg-pink-200' },
  ],
  TEEN: [
    { id: 'PIZZA', icon: '🍕', name: 'Pizza', effect: 'Fome +40, NRG -10', styles: 'bg-orange-100 hover:bg-orange-200' },
    { id: 'BURGER', icon: '🍔', name: 'Hambúrguer', effect: 'Fome +45, Saúde -10', styles: 'bg-amber-100 hover:bg-amber-200' },
    { id: 'GRAPE_JUICE', icon: '🍇', name: 'Suco Uva Int.', effect: 'Saúde +15, NRG +10', styles: 'bg-purple-100 hover:bg-purple-200' },
    { id: 'ACAI_BOWL', icon: '🫐', name: 'Açaí', effect: 'Fome +20, Saudável', styles: 'bg-fuchsia-100 hover:bg-fuchsia-200' },
  ],
  MASTER_TEEN: [
    { id: 'NATURAL_SANDWICH', icon: '🥪', name: 'Sanduíche Nat.', effect: 'Fome +30, Saúde +10', styles: 'bg-green-100 hover:bg-green-200' },
    { id: 'SNACKS', icon: '🍿', name: 'Salgadinho', effect: 'Feliz +15, Saúde -10', styles: 'bg-red-100 hover:bg-red-200' },
    { id: 'ENERGY_DRINK', icon: '🥫', name: 'Energético', effect: 'NRG +50, Saúde -15', styles: 'bg-cyan-100 hover:bg-cyan-200' },
    { id: 'CHICKEN_SALAD', icon: '🥗', name: 'Salada+Frango', effect: 'Fome +35, Saudável', styles: 'bg-emerald-100 hover:bg-emerald-200' },
  ],
  YOUNG_ADULT: [
    { id: 'CARBONARA', icon: '🍝', name: 'Carbonara', effect: 'Fome +50, NRG -15', styles: 'bg-yellow-100 hover:bg-yellow-200' },
    { id: 'COFFEE', icon: '☕', name: 'Expresso', effect: 'NRG +40', styles: 'bg-stone-100 hover:bg-stone-200' },
    { id: 'POKE_BOWL', icon: '🍣', name: 'Poke Salmão', effect: 'Fome +30, Saúde +15', styles: 'bg-red-100 hover:bg-red-200' },
    { id: 'CAESAR_SALAD', icon: '🥗', name: 'Caesar Salad', effect: 'Fome +20, Saudável', styles: 'bg-green-100 hover:bg-green-200' },
  ],
  ADULT: [
    { id: 'STEAK', icon: '🥩', name: 'Bife Angus', effect: 'Fome +60', styles: 'bg-red-200 hover:bg-red-300' },
    { id: 'QUINOA_SALAD', icon: '🥙', name: 'Salada Vegana', effect: 'Fome +25, Saúde +20', styles: 'bg-emerald-100 hover:bg-emerald-200' },
    { id: 'CHAMOMILE_TEA', icon: '🍵', name: 'Chá Relax', effect: 'Feliz +20, NRG +10', styles: 'bg-tea-100 hover:bg-lime-200' },
    { id: 'VEGGIE_SOUP', icon: '🍲', name: 'Sopa Legumes', effect: 'Fome +30, Saudável', styles: 'bg-orange-100 hover:bg-orange-200' },
  ],
  LEGENDARY: [
    { id: 'NECTAR', icon: '🍯', name: 'Manjar', effect: 'Restaura Tudo', styles: 'bg-yellow-200 hover:bg-yellow-300' },
    { id: 'GOLDEN_APPLE', icon: '🌟', name: 'Fruta Ouro', effect: 'Saúde Máxima', styles: 'bg-amber-100 hover:bg-amber-200' },
    { id: 'ELVEN_BREAD', icon: '🥖', name: 'Pão Élfico', effect: 'Fome Máxima', styles: 'bg-stone-200 hover:bg-stone-300' },
    { id: 'SPRING_WATER', icon: '💧', name: 'Água da Fonte', effect: 'NRG + Saúde', styles: 'bg-cyan-100 hover:bg-cyan-200' },
  ]
};

export function FoodMenu({ evolutionStage, onFeed, onClose }: FoodMenuProps) {
  const currentFoods = FOODS_BY_STAGE[evolutionStage] || FOODS_BY_STAGE['BABY'];

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
          {currentFoods.map((food) => (
            <button 
              key={food.id}
              onClick={() => onFeed(food.id)}
              className={`flex flex-col items-center gap-2 p-3 border-4 border-black transition-colors ${food.styles}`}
            >
              <span className="text-3xl">{food.icon}</span>
              <span className="text-[10px] font-bold uppercase text-center leading-tight">{food.name}</span>
              <span className="text-[8px] text-gray-600 text-center">{food.effect}</span>
            </button>
          ))}
        </div>
        <button 
          onClick={onClose}
          className="w-full mt-6 py-3 border-4 border-black font-bold uppercase text-[10px] bg-gray-100 hover:bg-gray-200 active:translate-y-1 active:translate-x-1"
        >
          Cancelar
        </button>
      </div>
    </motion.div>
  );
}
