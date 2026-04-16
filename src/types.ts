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

export type EvolutionStage = 'EGG' | 'BABY' | 'KIDS' | 'TEEN' | 'MASTER_TEEN' | 'YOUNG_ADULT' | 'ADULT' | 'LEGENDARY';

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
  lifetimeXP: number;
  badges: string[];
  evolutionStage: EvolutionStage;
  eggWarmth: number; // 0-100, when 100 the egg hatches
  fitness: number; // 0-100 (Exercise level)
  skinColor?: string; // Custom color for Pipo
  farmPlots?: any[]; // Pipo-Farm garden plots (persisted)
}

export type ActionType = 'FEED' | 'PLAY' | 'SLEEP' | 'CLEAN' | 'CHAT' | 'PET' | 'GYM';

export type FoodType = 
  | 'MILK' | 'PORRIDGE_BANANA' | 'CARROT_MASH' | 'MILK_COOKIE' // BABY
  | 'APPLE' | 'NATURAL_JUICE' | 'KIDS_PASTA' | 'ICE_CREAM' // KIDS
  | 'PIZZA' | 'BURGER' | 'GRAPE_JUICE' | 'ACAI_BOWL' // TEEN
  | 'NATURAL_SANDWICH' | 'SNACKS' | 'ENERGY_DRINK' | 'CHICKEN_SALAD' // MASTER_TEEN
  | 'CARBONARA' | 'COFFEE' | 'POKE_BOWL' | 'CAESAR_SALAD' // YOUNG_ADULT
  | 'STEAK' | 'QUINOA_SALAD' | 'CHAMOMILE_TEA' | 'VEGGIE_SOUP' // ADULT
  | 'NECTAR' | 'GOLDEN_APPLE' | 'ELVEN_BREAD' | 'SPRING_WATER'; // LEGENDARY
