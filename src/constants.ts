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
  equippedItems: [],
  placedItems: [],
  englishLevel: 1,
  englishExp: 0,
  evolutionStage: 'EGG',
  eggWarmth: 0,
  fitness: 50,
};

export const COLLECTIBLES: { id: string; name: string; icon: string; description: string; rarity: 'common' | 'rare' | 'epic'; category: 'food' | 'clothing' | 'toy' | 'special' | 'scenery'; effect?: any }[] = [
  // ========== COMIDAS ==========
  { id: 'apple', name: 'Maçã', icon: '🍎', description: 'Uma maçã fresquinha.', rarity: 'common', category: 'food', effect: { hunger: 15, health: 5 } },
  { id: 'banana', name: 'Banana', icon: '🍌', description: 'Banana madura e doce.', rarity: 'common', category: 'food', effect: { hunger: 12, energy: 10 } },
  { id: 'cookie', name: 'Cookie', icon: '🍪', description: 'Cookie quentinho!', rarity: 'common', category: 'food', effect: { hunger: 10, happiness: 15 } },
  { id: 'pizza_slice', name: 'Fatia de Pizza', icon: '🍕', description: 'A comida favorita do Pipo!', rarity: 'common', category: 'food', effect: { hunger: 25, happiness: 10 } },
  { id: 'sushi', name: 'Sushi', icon: '🍣', description: 'Sushi premium de salmão.', rarity: 'rare', category: 'food', effect: { hunger: 30, health: 15 } },
  { id: 'cake', name: 'Bolo de Aniversário', icon: '🎂', description: 'Um bolo especial para datas importantes!', rarity: 'rare', category: 'food', effect: { hunger: 35, happiness: 30 } },
  { id: 'golden_apple', name: 'Maçã Dourada', icon: '✨🍎', description: 'Fruta lendária que restaura muita saúde.', rarity: 'epic', category: 'food', effect: { hunger: 50, health: 50 } },
  { id: 'rainbow_candy', name: 'Doce Arco-Íris', icon: '🌈🍬', description: 'Doce mágico com todas as cores!', rarity: 'epic', category: 'food', effect: { happiness: 60, energy: 30 } },
  
  // ========== ROUPAS / ACESSÓRIOS ==========
  { id: 'red_hat', name: 'Boné Vermelho', icon: '🧢', description: 'Um boné estiloso para dias de sol.', rarity: 'common', category: 'clothing', effect: { happiness: 10 } },
  { id: 'scarf', name: 'Cachecol', icon: '🧣', description: 'Cachecol quentinho e fofo.', rarity: 'common', category: 'clothing', effect: { health: 10 } },
  { id: 'sunglasses', name: 'Óculos de Sol', icon: '🕶️', description: 'Pipo fica muito estiloso!', rarity: 'common', category: 'clothing', effect: { happiness: 15 } },
  { id: 'bow_tie', name: 'Gravata Borboleta', icon: '🎀', description: 'Elegância de capivara puro.', rarity: 'rare', category: 'clothing', effect: { happiness: 20 } },
  { id: 'top_hat', name: 'Cartola', icon: '🎩', description: 'Senhor Pipo, gentleman capivara.', rarity: 'rare', category: 'clothing', effect: { happiness: 25 } },
  { id: 'cape', name: 'Capa de Herói', icon: '🦸', description: 'Pipo vira super-herói!', rarity: 'rare', category: 'clothing', effect: { happiness: 30, energy: 15 } },
  { id: 'crown', name: 'Coroa de Rei', icon: '👑', description: 'Pipo é a realeza das capivaras.', rarity: 'epic', category: 'clothing', effect: { happiness: 50, health: 10 } },
  { id: 'wizard_hat', name: 'Chapéu de Mago', icon: '🧙', description: 'Poderes mágicos ativados!', rarity: 'epic', category: 'clothing', effect: { happiness: 40, energy: 40 } },
  
  // ========== CENÁRIO / DECORAÇÃO ==========
  { id: 'special_grass', name: 'Grama Especial', icon: '🌿', description: 'Um tufo de grama fofinho para o chão.', rarity: 'common', category: 'scenery', effect: { happiness: 5 } },
  { id: 'flower_pot', name: 'Vaso de Flores', icon: '🪴', description: 'Uma planta bonita para decorar.', rarity: 'common', category: 'scenery', effect: { happiness: 10 } },
  { id: 'lamp', name: 'Luminária Pixel', icon: '🏮', description: 'Ilumina o ambiente à noite.', rarity: 'rare', category: 'scenery', effect: { happiness: 15 } },
  { id: 'carpet', name: 'Tapete Vermelho', icon: '🧧', description: 'Conforto para as patas do Pipo.', rarity: 'rare', category: 'scenery', effect: { happiness: 20 } },
  { id: 'statue', name: 'Estátua de Capivara', icon: '🗿', description: 'Uma homenagem à espécie.', rarity: 'epic', category: 'scenery', effect: { happiness: 40 } },
  { id: 'fountain', name: 'Fonte de Água', icon: '⛲', description: 'Som relaxante de água.', rarity: 'epic', category: 'scenery', effect: { happiness: 50 } },

  // ========== BRINQUEDOS ==========
  { id: 'toy_ball', name: 'Bola de Pixel', icon: '⚽', description: 'Uma bola clássica para brincar.', rarity: 'common', category: 'toy', effect: { happiness: 15, energy: -5 } },
  { id: 'rubber_duck', name: 'Patinho de Borracha', icon: '🐤', description: 'Amigo de banho e de qualquer hora.', rarity: 'common', category: 'toy', effect: { happiness: 20 } },
  { id: 'teddy_bear', name: 'Ursinho de Pelúcia', icon: '🧸', description: 'Companheiro de soneca.', rarity: 'common', category: 'toy', effect: { happiness: 15, energy: 10 } },
  { id: 'skateboard', name: 'Skate', icon: '🛹', description: 'Pipo radical faz manobras!', rarity: 'rare', category: 'toy', effect: { happiness: 30, energy: -10 } },
  { id: 'guitar', name: 'Guitarra', icon: '🎸', description: 'Pipo rockstar!', rarity: 'rare', category: 'toy', effect: { happiness: 35 } },
  { id: 'telescope', name: 'Telescópio', icon: '🔭', description: 'Explorar as estrelas!', rarity: 'rare', category: 'toy', effect: { happiness: 25, energy: 15 } },
  { id: 'magic_wand', name: 'Varinha Mágica', icon: '🪄', description: 'Abracadabra! Uma varinha encantada.', rarity: 'epic', category: 'toy', effect: { happiness: 50, energy: 20 } },
  { id: 'rocket', name: 'Foguete de Brinquedo', icon: '🚀', description: 'Pipo astronauta explora o universo!', rarity: 'epic', category: 'toy', effect: { happiness: 60, energy: 30 } },
  
  // ========== ESPECIAIS ==========
  { id: 'lucky_clover', name: 'Trevo de 4 Folhas', icon: '🍀', description: 'Dá sorte na próxima lição!', rarity: 'rare', category: 'special', effect: { happiness: 20, health: 20 } },
  { id: 'crystal', name: 'Cristal Místico', icon: '💎', description: 'Emana energia pura.', rarity: 'epic', category: 'special', effect: { energy: 60, happiness: 20 } },
  { id: 'shooting_star', name: 'Estrela Cadente', icon: '🌠', description: 'Faça um desejo! Item ultra raro.', rarity: 'epic', category: 'special', effect: { happiness: 80, health: 30, energy: 30 } },
];

export const DECAY_RATES = {
  hunger: 0.0001,
  happiness: 0.0001,
  energy: 0.0005,
  energySleep: 0.005,
  fitness: 0.00008,
};

export const THRESHOLDS = {
  CRITICAL: 20,
  LOW: 40,
};
