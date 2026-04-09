export interface Collectible {
  id: string;
  name: string;
  icon: string;
  description: string;
  rarity: 'common' | 'rare' | 'epic';
  foundAt: number;
  effect?: {
    hunger?: number;
    happiness?: number;
    energy?: number;
    health?: number;
  };
}

export type EvolutionStage = 'BABY' | 'TEEN' | 'ADULT' | 'LEGENDARY';

export interface PetState {
  name: string;
  hunger: number; // 0-100 (100 is full)
  happiness: number; // 0-100
  energy: number; // 0-100
  health: number; // 0-100
  lastUpdate: number; // timestamp
  birthday: number; // timestamp
  isSleeping: boolean;
  poopCount: number;
  inventory: Collectible[];
  englishLevel: number;
  englishExp: number;
  evolutionStage: EvolutionStage;
}

export type ActionType = 'FEED' | 'PLAY' | 'SLEEP' | 'CLEAN' | 'CHAT' | 'PET';

export type FoodType = 'APPLE' | 'PASTA' | 'PIZZA' | 'VEGGIES';
