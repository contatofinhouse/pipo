import { PetState } from "./types";

export const INITIAL_STATS: PetState = {
  name: "Pipo",
  hunger: 80,
  happiness: 80,
  energy: 100,
  health: 100,
  lastUpdate: Date.now(),
  birthday: Date.now(),
  isSleeping: false,
  poopCount: 0,
  inventory: [],
  englishLevel: 1,
  englishExp: 0,
  evolutionStage: 'BABY',
};

export const COLLECTIBLES: { id: string; name: string; icon: string; description: string; rarity: 'common' | 'rare' | 'epic'; effect?: any }[] = [
  { 
    id: 'toy_ball', 
    name: 'Bola de Pixel', 
    icon: '⚽', 
    description: 'Uma bola clássica para exercícios divertidos.',
    rarity: 'common',
    effect: { happiness: 15, energy: -5 }
  },
  { 
    id: 'special_grass', 
    name: 'Grama Especial', 
    icon: '🌿', 
    description: 'Grama fresca e suculenta, o lanche favorito.',
    rarity: 'common',
    effect: { hunger: 20, health: 5 }
  },
  { 
    id: 'rubber_duck', 
    name: 'Patinho de Borracha', 
    icon: '🐤', 
    description: 'Um amigo para a hora do banho (ou qualquer hora).',
    rarity: 'rare',
    effect: { happiness: 25 }
  },
  { 
    id: 'golden_apple', 
    name: 'Maçã Dourada', 
    icon: '🍎', 
    description: 'Uma fruta lendária que restaura muita saúde.',
    rarity: 'rare',
    effect: { hunger: 30, health: 40 }
  },
  { 
    id: 'crown', 
    name: 'Coroa de Rei', 
    icon: '👑', 
    description: 'Pipo se sente a realeza das capivaras.',
    rarity: 'epic',
    effect: { happiness: 50, health: 10 }
  },
  { 
    id: 'crystal', 
    name: 'Cristal Místico', 
    icon: '💎', 
    description: 'Um cristal que emana energia pura.',
    rarity: 'epic',
    effect: { energy: 60, happiness: 20 }
  },
];

export const DECAY_RATES = {
  hunger: 0.001, // per ms
  happiness: 0.0008,
  energy: 0.0005,
  energySleep: 0.005, // gain per ms
};

export const THRESHOLDS = {
  CRITICAL: 20,
  LOW: 40,
};
