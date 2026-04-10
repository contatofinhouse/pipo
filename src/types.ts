export interface Collectible {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic';
  category?: 'food' | 'clothing' | 'toy' | 'special' | 'scenery';
  foundAt: number;
  effect?: {
    hunger?: number;
    happiness?: number;
    energy?: number;
    health?: number;
  };
}

export type EvolutionStage = 'EGG' | 'BABY' | 'TEEN' | 'ADULT' | 'LEGENDARY';

export interface PetState {
  name: string; // Pet name
  userName?: string; // Player name
  userAge?: number; // Player age
  userStreak?: number; // Learning streak
  hunger: number; // 0-100 (100 is full)
  happiness: number; // 0-100
  energy: number; // 0-100
  health: number; // 0-100
  lastUpdate: number; // timestamp
  birthday: number; // timestamp
  isSleeping: boolean;
  poopCount: number;
  inventory: Collectible[];
  equippedItems: string[]; // IDs of items currently equipped on Pipo
  placedItems: { id: string, icon: string, x: number, y: number }[]; // Items placed in the world
  englishLevel: number;
  englishExp: number;
  evolutionStage: EvolutionStage;
  eggWarmth: number; // 0-100, when 100 the egg hatches
}

export type ActionType = 'FEED' | 'PLAY' | 'SLEEP' | 'CLEAN' | 'CHAT' | 'PET';

export type FoodType = 'APPLE' | 'PASTA' | 'PIZZA' | 'VEGGIES' | 'COFFEE';
