import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  Utensils, 
  Gamepad2, 
  Moon, 
  Sun, 
  Trash2, 
  MessageCircle, 
  RefreshCw,
  Info,
  Package
} from 'lucide-react';
import { PetState, ActionType, Collectible, EvolutionStage, FoodType } from './types';
import { INITIAL_STATS, DECAY_RATES, COLLECTIBLES } from './constants';
import Pet from './components/Pet';
import { cn } from './lib/utils';
import { getPetResponse, EnglishResponse } from './lib/gemini';
import { supabase } from './lib/supabase';
import { Auth } from './components/Auth';
import EggHatch from './components/EggHatch';
import { PipoMan, PipoPong, PipoAsteroids } from './components/MiniGames';
import { RankingModal } from './components/RankingModal';
import { FoodMenu } from './components/FoodMenu';
import { ArcadeMenu } from './components/ArcadeMenu';
import { InventoryModal } from './components/InventoryModal';

function Game({ session, profile, initialGameState, onLogout }: { session: any, profile: any, initialGameState?: any, onLogout: () => void }) {
  const [state, setState] = useState<PetState>(() => {
    const now = Date.now();
    
    if (initialGameState) {
      // Calcular quanto tempo passou desde a última atualização no banco
      const lastUpdate = initialGameState.updated_at ? new Date(initialGameState.updated_at).getTime() : now;
      const diff = now - lastUpdate;

      // Aplicar decaimento baseado no tempo offline
      const hungerDecay = diff * DECAY_RATES.hunger;
      const happinessDecay = diff * DECAY_RATES.happiness;
      const energyDecay = diff * DECAY_RATES.energy;

      return {
        name: 'Pipo',
        userName: profile?.name,
        userAge: profile?.age,
        hunger: Math.max(0, (initialGameState.hunger ?? 50) - hungerDecay),
        happiness: Math.max(0, (initialGameState.happiness ?? 50) - happinessDecay),
        energy: Math.max(0, (initialGameState.energy ?? 100) - energyDecay),
        health: initialGameState.health ?? 100,
        evolutionStage: initialGameState.evolution_stage === 0 ? 'EGG' : initialGameState.evolution_stage === 4 ? 'LEGENDARY' : initialGameState.evolution_stage === 3 ? 'ADULT' : initialGameState.evolution_stage === 2 ? 'TEEN' : 'BABY',
        eggWarmth: initialGameState.evolution_stage === 0 ? 0 : 100,
        englishLevel: initialGameState.english_level ?? 1,
        englishExp: initialGameState.english_points ?? 0,
        inventory: Array.isArray(initialGameState.inventory) ? initialGameState.inventory : [],
        equippedItems: Array.isArray(initialGameState.equipped_items) ? initialGameState.equipped_items : [],
        placedItems: Array.isArray(initialGameState.placed_items) ? initialGameState.placed_items : [],
        lastUpdate: now,
        birthday: Date.now(),
        isSleeping: false,
        poopCount: 0,
        userStreak: initialGameState.streak_days ?? 0
      };
    }
    const saved = localStorage.getItem('neo_pet_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      parsed.userName = profile?.name;
      parsed.userAge = profile?.age;
      // Calculate decay since last visit
      const diff = now - parsed.lastUpdate;
      
      return {
        ...parsed,
        inventory: Array.isArray(parsed.inventory) ? parsed.inventory : [],
        equippedItems: Array.isArray(parsed.equippedItems) ? parsed.equippedItems : [],
        placedItems: Array.isArray(parsed.placedItems) ? parsed.placedItems : [],
        evolutionStage: parsed.evolutionStage || 'EGG',
        eggWarmth: parsed.eggWarmth ?? 0,
        hunger: Math.max(0, parsed.hunger - diff * DECAY_RATES.hunger),
        happiness: Math.max(0, parsed.happiness - diff * DECAY_RATES.happiness),
        energy: parsed.isSleeping 
          ? Math.min(100, parsed.energy + diff * DECAY_RATES.energySleep)
          : Math.max(0, parsed.energy - diff * DECAY_RATES.energy),
        lastUpdate: now,
      };
    }
    return INITIAL_STATS;
  });

  const [isActionActive, setIsActionActive] = useState<ActionType | null>(null);
  const [isLevelUp, setIsLevelUp] = useState(false);
  const [isEvolving, setIsEvolving] = useState(false);
  const [message, setMessage] = useState<string>("Olá! Eu sou o Pipo. Vamos brincar?");
  const [userInput, setUserInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ item: Collectible; index: number } | null>(null);
  const [showLearning, setShowLearning] = useState(false);
  const [showPlayMenu, setShowPlayMenu] = useState(false);
  const [showRanking, setShowRanking] = useState(false);
  const [rankings, setRankings] = useState<any[]>([]);
  const [showFoodMenu, setShowFoodMenu] = useState(false);
  const [activeFood, setActiveFood] = useState<FoodType | null>(null);
  const [lastFood, setLastFood] = useState<FoodType>('APPLE');
  const [activeGame, setActiveGame] = useState<'NONE' | 'TENNIS' | 'BOUNCE' | 'BALL_PIT' | 'PIPOMAN' | 'PONG' | 'ASTEROIDS'>('NONE');
  const [weather, setWeather] = useState<'SUNNY' | 'RAINY' | 'CLOUDY'>('SUNNY');
  const [isSick, setIsSick] = useState(false);
  const [dailyUpdate, setDailyUpdate] = useState<{ weather: string, btc: string, trend: string } | null>(null);
  const [showDailyUpdate, setShowDailyUpdate] = useState(false);
  const [worldEvent, setWorldEvent] = useState<string | null>(null);
  const [newlyFoundItem, setNewlyFoundItem] = useState<Collectible | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [quizOptions, setQuizOptions] = useState<string[] | null>(null);
  const [questionBank, setQuestionBank] = useState<any[]>([]);
  const [currentQuestionData, setCurrentQuestionData] = useState<any>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | 'combo' | null>(null);

  // Load questions from Supabase when learning opens or level changes
  useEffect(() => {
    if (showLearning && session?.user?.id) {
      loadQuestions(state.englishLevel);
    }
  }, [showLearning, state.englishLevel]);

  const loadQuestions = async (level: number) => {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .eq('level', level)
      .order('id');
    
    if (data && data.length > 0) {
      // Embaralha as perguntas
      const shuffled = data.sort(() => Math.random() - 0.5);
      setQuestionBank(shuffled);
      showNextQuestion(shuffled, 0);
    } else {
      setCurrentQuestion('Carregando perguntas...');
      setQuizOptions(null);
    }
  };

  const showNextQuestion = (bank: any[], index: number) => {
    if (bank.length === 0) return;
    const q = bank[index % bank.length];
    setCurrentQuestionData(q);
    setCurrentQuestion(q.question);
    setQuizOptions(typeof q.options === 'string' ? JSON.parse(q.options) : q.options);
  };

  // Save state to localStorage and Supabase
  useEffect(() => {
    localStorage.setItem('neo_pet_state', JSON.stringify(state));
    if (session?.user?.id) {
      supabase.from('game_state').upsert({
        user_id: session.user.id,
        hunger: Math.round(state.hunger),
        happiness: Math.round(state.happiness),
        energy: Math.round(state.energy),
        health: Math.round(state.health),
        evolution_stage: state.evolutionStage === 'EGG' ? 0 : state.evolutionStage === 'BABY' ? 1 : state.evolutionStage === 'TEEN' ? 2 : state.evolutionStage === 'ADULT' ? 3 : 4,
        inventory: Array.isArray(state.inventory) ? state.inventory : [],
        equipped_items: Array.isArray(state.equippedItems) ? state.equippedItems : [],
        placed_items: Array.isArray(state.placedItems) ? state.placedItems : [],
        english_level: Number(state.englishLevel) || 1,
        english_points: Math.round(Number(state.englishExp) || 0),
        updated_at: new Date().toISOString()
      }, { onConflict: 'user_id' }).then(({error}) => { if(error) console.error("Error syncing state", error); });
    }
  }, [state, session]);

  // Game Loop
  useEffect(() => {
    const interval = setInterval(() => {
      setState(prev => {
        if (prev.health <= 0) return prev;

        const now = Date.now();
        const diff = now - prev.lastUpdate;
        
        let newHunger = prev.isSleeping
          ? prev.hunger - diff * (DECAY_RATES.hunger * 0.3) // 70% less hunger decay while sleeping
          : prev.hunger - diff * DECAY_RATES.hunger;
        let newHappiness = prev.happiness - diff * DECAY_RATES.happiness;
        let newEnergy = prev.isSleeping 
          ? prev.energy + diff * DECAY_RATES.energySleep
          : prev.energy - diff * DECAY_RATES.energy;
        
        // Clamp values
        newHunger = Math.max(0, Math.min(100, newHunger));
        newHappiness = Math.max(0, Math.min(100, newHappiness));
        newEnergy = Math.max(0, Math.min(100, newEnergy));

        // Finding items logic: 0.1% chance every second if happy and awake
        let newInventory = Array.isArray(prev.inventory) ? [...prev.inventory] : [];
        if (!prev.isSleeping && prev.happiness > 70 && Math.random() < 0.001) {
          const randomItem = COLLECTIBLES[Math.floor(Math.random() * COLLECTIBLES.length)];
          const newItem: Collectible = { ...randomItem, foundAt: Date.now() };
          newInventory.push(newItem);
          setNewlyFoundItem(newItem);
          setMessage(`Olha só! Pipo encontrou um(a) ${newItem.name}!`);
        }

        // Logic for weather changes (0.1% chance every second)
        if (Math.random() < 0.001) {
          setWeather(prev => {
            const weights: ('SUNNY' | 'RAINY' | 'CLOUDY')[] = ['SUNNY', 'SUNNY', 'CLOUDY', 'RAINY'];
            const newWeather = weights[Math.floor(Math.random() * weights.length)];
            if (newWeather === 'RAINY') setMessage("Opa, começou a chover! 🌧️");
            else if (newWeather === 'CLOUDY') setMessage("O céu ficou nublado... ☁️");
            else setMessage("O sol apareceu! Que dia lindo! ☀️");
            return newWeather;
          });
        }

        // Periodic Daily Update logic (once per session/day)
        if (!dailyUpdate && Math.random() < 0.005) {
          setDailyUpdate({
            weather: weather === 'SUNNY' ? 'Sol radiante' : weather === 'RAINY' ? 'Chuva de pixel' : 'Céu nublado',
            btc: `U$ ${(65000 + Math.random() * 5000).toLocaleString('pt-BR')}`,
            trend: ['Capivaraverso', 'Pixel Art', 'Web3', 'Retro Gaming'][Math.floor(Math.random() * 4)]
          });
          setShowDailyUpdate(true);
        }

        // Logic for sickness (higher risk if hungry, unhappy or in rain without sleep)
        let newHealth = prev.health;
        if (!prev.isSleeping && Math.random() < 0.0001) {
          let sickChance = 0.01;
          if (prev.hunger < 30) sickChance += 0.1;
          if (prev.happiness < 30) sickChance += 0.1;
          if (weather === 'RAINY') sickChance += 0.2;
          
          if (Math.random() < sickChance) {
             setIsSick(true);
             setMessage("Pipo não está se sentindo bem... Acho que ele pegou um resfriado. 🤒");
          }
        }
        
        if (isSick) {
          newHealth = Math.max(0, prev.health - 0.01);
          if (prev.isSleeping) newHealth = Math.min(100, prev.health + 0.02);
        }

        // Poop logic: chance to poop if full
        let newPoopCount = prev.poopCount;
        if (newHunger > 50 && Math.random() < 0.0001 * (diff / 16)) {
          newPoopCount = Math.min(3, newPoopCount + 1);
        }

        // Health logic
        let healthChange = 0;
        if (newHunger < 10) healthChange -= 0.01;
        if (newEnergy < 10) healthChange -= 0.005;
        if (newPoopCount > 0) healthChange -= 0.005 * newPoopCount;
        if (newHunger > 50 && newEnergy > 50 && newPoopCount === 0 && !isSick) healthChange += 0.01;

        newHealth = Math.max(0, Math.min(100, newHealth + healthChange));

        return {
          ...prev,
          hunger: newHunger,
          happiness: newHappiness,
          energy: newEnergy,
          health: newHealth,
          poopCount: newPoopCount,
          inventory: newInventory,
          lastUpdate: now,
        };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Streak check: penalidade se não fez lição ontem
  useEffect(() => {
    if (!session?.user?.id || state.evolutionStage === 'EGG') return;
    
    const checkStreak = async () => {
      const { data } = await supabase
        .from('game_state')
        .select('last_lesson_date, streak_days')
        .eq('user_id', session.user.id)
        .single();
      
      if (data?.last_lesson_date) {
        const lastLesson = new Date(data.last_lesson_date);
        const now = new Date();
        const diffHours = (now.getTime() - lastLesson.getTime()) / (1000 * 60 * 60);
        
        if (diffHours > 48) {
          // Mais de 2 dias sem lição: perde XP e streak
          const penalty = Math.min(state.englishExp, 20);
          setState(prev => ({
            ...prev,
            englishExp: Math.max(0, prev.englishExp - penalty),
            happiness: Math.max(0, prev.happiness - 15),
            userStreak: 0
          }));
          setMessage(`😢 Pipo ficou triste... Você não estudou por ${Math.floor(diffHours / 24)} dias! Perdeu ${penalty} XP.`);
          
          // Atualiza streak no banco
          supabase.from('game_state').update({ streak_days: 0 }).eq('user_id', session.user.id).then();
        } else if (diffHours > 24) {
          // Entre 24h e 48h: aviso
          setMessage("📚 Ei! Faz tempo que o Pipo não aprende inglês. Vamos estudar?");
        }
      }
    };
    
    checkStreak();
  }, [session]);

  const useItem = (item: Collectible, index: number) => {
    if (state.health <= 0) return;
    
    setState(prev => {
      const isEquippable = item.category === 'clothing';
      const isPlaceable = item.category === 'scenery';
      const isConsumable = item.category === 'food' || item.category === 'special';
      
      let newInventory = [...prev.inventory];
      let newEquipped = [...prev.equippedItems];
      let newPlaced = [...prev.placedItems];

      if (isEquippable) {
        // Toggle equipment
        if (newEquipped.includes(item.id)) {
          newEquipped = newEquipped.filter(id => id !== item.id);
          setMessage(`Pipo tirou o(a) ${item.name}!`);
        } else {
          newEquipped.push(item.id);
          setMessage(`Pipo colocou o(a) ${item.name}! Ficou lindo ✨`);
        }
        // Don't remove from inventory
      } else if (isPlaceable) {
        // Add to world at random centerish position
        newPlaced.push({
          id: `${item.id}-${Date.now()}`,
          icon: item.icon,
          x: 40 + Math.random() * 20,
          y: 70 + Math.random() * 10
        });
        setMessage(`Você colocou o(a) ${item.name} no cenário! Arraste para mover.`);
        // Don't remove from inventory (scenery can be reused)
      } else if (isConsumable) {
        // Use and consume (food, special)
        newInventory.splice(index, 1);
        setMessage(`Pipo usou ${item.name}! Yummy! 🍽️`);
      } else {
        // Toys: use but don't consume
        setMessage(`Pipo brincou com ${item.name}! 🎉`);
      }
      
      return {
        ...prev,
        hunger: Math.min(100, Math.max(0, prev.hunger + (item.effect?.hunger || 0))),
        happiness: Math.min(100, Math.max(0, prev.happiness + (item.effect?.happiness || 0))),
        energy: Math.min(100, Math.max(0, prev.energy + (item.effect?.energy || 0))),
        health: Math.min(100, Math.max(0, prev.health + (item.effect?.health || 0))),
        inventory: newInventory,
        equippedItems: newEquipped,
        placedItems: newPlaced
      };
    });
    
    // Close inventory so user sees the result
    setShowInventory(false);
  };

  const playSound = (type: 'CLEAN' | 'FEED' | 'LEVEL_UP' | 'PLAY' | 'PET' | 'GULP' | 'EVOLVE') => {
    const sounds = {
      CLEAN: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3', // Sweep
      FEED: 'https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3', // Sparkle/Bite
      LEVEL_UP: 'https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3', // Celebration
      PLAY: 'https://assets.mixkit.co/active_storage/sfx/2017/2017-preview.mp3', // Pop/Fun
      PET: 'https://assets.mixkit.co/active_storage/sfx/2014/2014-preview.mp3', // Soft sparkle
      GULP: 'https://assets.mixkit.co/active_storage/sfx/2015/2015-preview.mp3', // Gulp/Eat
      EVOLVE: 'https://assets.mixkit.co/active_storage/sfx/2020/2020-preview.mp3' // Epic evolution
    };
    
    try {
      const audio = new Audio(sounds[type]);
      audio.volume = 0.4;
      audio.play().catch(e => console.log("Audio play blocked by browser:", e));
    } catch (e) {
      console.error("Error playing sound:", e);
    }
  };

  const handleFeedAction = async (food: FoodType) => {
    if (state.health <= 0) return;
    
    setActiveFood(food);
    setLastFood(food);
    setIsActionActive('FEED');
    setShowFoodMenu(false);

    setState(prev => {
      let hungerGain = 20;
      let energyGain = 0;
      let healthGain = 2;

      switch (food) {
        case 'PASTA':
          hungerGain = 30;
          energyGain = 15;
          break;
        case 'PIZZA':
          hungerGain = 40;
          energyGain = -10;
          break;
        case 'VEGGIES':
          hungerGain = 20;
          healthGain = 5;
          break;
        case 'COFFEE':
          hungerGain = 5;
          energyGain = 40;
          break;
        case 'APPLE':
        default:
          hungerGain = 15;
          break;
      }

      return {
        ...prev,
        hunger: Math.min(100, prev.hunger + hungerGain),
        happiness: Math.min(100, prev.happiness + hungerGain),
        energy: Math.min(100, Math.max(0, prev.energy + energyGain)),
        health: Math.min(100, prev.health + healthGain)
      };
    });

    const foodNames = {
      APPLE: 'uma maçã',
      PASTA: 'um macarrão delicioso',
      PIZZA: 'uma pizza (hmmm!)',
      VEGGIES: 'legumes saudáveis',
      COFFEE: 'um café super forte (Eita!)'
    };

    setMessage(`Pipo está comendo ${foodNames[food]}!`);
    playSound('FEED');
    
    // Play gulp sound after a short delay (when he "catches" it)
    setTimeout(() => playSound('GULP'), 800);

    // Mensagens locais instantâneas (sem IA)
    const feedMsgs = [
      `Hmmm! ${foodNames[food]} é a favorita do Pipo! 🍽️`,
      `Pipo comeu ${foodNames[food]} e ficou feliz! 😋`,
      `Que delícia! Pipo adora ${foodNames[food]}! ✨`,
      `Nhac nhac! ${foodNames[food]} deu energia pro Pipo! 💪`,
      `UAU! Pipo amou ${foodNames[food]}! 🚀`
    ];
    setTimeout(() => setMessage(feedMsgs[Math.floor(Math.random() * feedMsgs.length)]), 1000);

    setTimeout(() => {
      setIsActionActive(null);
      setActiveFood(null);
    }, 2000);
  };

  const handleArcadeSelect = (gameId: 'NONE' | 'TENNIS' | 'BOUNCE' | 'BALL_PIT' | 'PONG' | 'ASTEROIDS', isToy?: boolean) => {
    setActiveGame(gameId);
    setShowPlayMenu(false);
    
    if (gameId === 'TENNIS') {
      handleAction('PLAY_MINI'); // Using an internal string to avoid opening menu again
      setState(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 20), energy: Math.max(0, prev.energy - 10) }));
      setMessage("Pipo adora correr atrás da bolinha!");
      setTimeout(() => setActiveGame('NONE'), 10000);
    } else if (gameId === 'NONE' && isToy) { 
      handleAction('PLAY_MINI');
      setState(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 15), energy: Math.max(0, prev.energy - 5) }));
      setMessage("Pipo está se sentindo um astro do rock!");
    } else if (gameId === 'BOUNCE') {
      handleAction('PLAY_MINI');
      setState(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 25), energy: Math.max(0, prev.energy - 15) }));
      setMessage("Olha a bola, Pipo! Pula, pula!");
      setTimeout(() => setActiveGame('NONE'), 15000);
    } else if (gameId === 'BALL_PIT') {
      handleAction('PLAY_MINI');
      setState(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 30), energy: Math.max(0, prev.energy - 20) }));
      setMessage("Pipo está mergulhando na diversão!");
      setTimeout(() => setActiveGame('NONE'), 20000);
    }
  };

  const handleAction = async (type: ActionType | 'PLAY_MINI') => {
    if (state.health <= 0) return;
    if (state.isSleeping && type !== 'SLEEP') {
      setMessage("Zzz... Pipo está dormindo profundamente.");
      return;
    }

    if (type === 'FEED') {
      handleFeedAction(lastFood);
      return;
    }

    if (type === 'PLAY') {
      playSound('PLAY');
      setShowPlayMenu(true);
      return;
    }

    if (type === 'PET') {
      playSound('PET');
    }

    setIsActionActive(type);
    
    setState(prev => {
      switch (type) {
        case 'SLEEP':
          const willSleep = !prev.isSleeping;
          if (willSleep) {
            const sleepMsgs = [
              "Zzz... Pipo vai sonhar com capins dourados.",
              "Hora de recarregar os pixels! Boa noite.",
              "Pipo está exausto... Até amanhã!",
              "Não me acorde sem um bom motivo, ok? Zzz.",
              "Desligando os motores... Fui!",
              "Bateria fraca... Pipo precisa repousar.",
              "Vou ali contar ovelhinhas e já volto (daqui a umas horas)."
            ];
            setMessage(sleepMsgs[Math.floor(Math.random() * sleepMsgs.length)]);
          } else {
            const wakeMsgs = [
              "Bom dia! Pipo está pronto para a aventura!",
              "Ahhh... que sono bom. O que vamos fazer?",
              "Acordei! Estava sonhando com uma piscina de bolinhas.",
              "Pipo está de volta e com energia total!",
              "Quem é a capiva-astro que acabou de acordar? SOU EU!",
              "Bom dia mundo! O café já está pronto?",
              "Dormi tanto que acho que evoluí um milímetro!"
            ];
            setMessage(wakeMsgs[Math.floor(Math.random() * wakeMsgs.length)]);
          }
          return { ...prev, isSleeping: willSleep };
        case 'CLEAN':
          return { ...prev, happiness: Math.min(100, prev.happiness + 10) };
        case 'PET':
          return { ...prev, happiness: Math.min(100, prev.happiness + 5) };
        default:
          return prev;
      }
    });

    // Resposta local instantânea (sem IA)
    if (type === 'CLEAN') {
      const cleanMsgs = [
        "Pipo agradece a limpeza! ✨", 
        "Tudo limpo! Pipo está feliz! 🧹", 
        "Que alívio! Ambiente limpo! 💎",
        "Faxina nota 10! Agora sim dá pra relaxar.",
        "Xô sujeira! O Pipo está brilhando!",
        "Cheirinho de pixels novos! Obrigado!"
      ];
      setMessage(cleanMsgs[Math.floor(Math.random() * cleanMsgs.length)]);
      
      playSound('CLEAN');
      setTimeout(() => {
        setState(prev => ({ ...prev, poopCount: 0 }));
      }, 2000);
    }

    if (type === 'PET') {
      const isLegendary = state.evolutionStage === 'LEGENDARY';
      const petMsgs = isLegendary ? [
        "Sinto a energia cósmica em suas mãos! ✨",
        "Seu carinho é digno de um rei!",
        "O universo vibra com nossa amizade! 💎",
        "Você é o escolhido das capivaras!",
        "Minha aura brilha mais forte com você!"
      ] : [
        "Isso é tão bom! 🥰",
        "Pipo adora carinho!",
        "Mais um pouquinho, por favor?",
        "Purrr... (se capivaras ronronassem)",
        "Você é meu melhor amigo!"
      ];
      setMessage(petMsgs[Math.floor(Math.random() * petMsgs.length)]);
      
      if (isLegendary) {
        // Legendary bonus: small chance to gain XP just by petting
        if (Math.random() < 0.2) {
          setState(prev => ({ ...prev, englishExp: prev.englishExp + 5 }));
          setMessage(prev => prev + " (+5 XP Místico!)");
        }
      }
    }

    setTimeout(() => setIsActionActive(null), 2000);
  };

  const handleQuizAnswer = (answer: string) => {
    if (!answer.trim() || state.health <= 0 || !currentQuestionData) return;

    // Verificação INSTANTÂNEA
    const options = typeof currentQuestionData.options === 'string' 
      ? JSON.parse(currentQuestionData.options) 
      : currentQuestionData.options;
    const correctAnswer = options[currentQuestionData.correct_index];
    const isCorrect = answer === correctAnswer;
    const xpGained = isCorrect ? (currentQuestionData.xp_reward || 10) : 2;

    // Streak tracking
    const newStreak = isCorrect ? correctStreak + 1 : 0;
    setCorrectStreak(newStreak);

    // Feedback instantâneo + animação
    if (isCorrect) {
      // Combo de 5!
      if (newStreak > 0 && newStreak % 5 === 0) {
        setQuizFeedback('combo');
        setMessage(`🔥🔥🔥 COMBO x${newStreak}! INCRÍVEL! ${currentQuestionData.explanation}`);
        playSound('EVOLVE');
      } else {
        setQuizFeedback('correct');
        const correctMsgs = [
          `✅ Certoooo! ${currentQuestionData.explanation}`,
          `✅ Perfeito! ${currentQuestionData.explanation}`,
          `✅ Mandou bem! ${currentQuestionData.explanation}`,
          `✅ Arrasou! ${currentQuestionData.explanation}`
        ];
        setMessage(correctMsgs[Math.floor(Math.random() * correctMsgs.length)]);
        playSound('LEVEL_UP');
      }
    } else {
      setQuizFeedback('wrong');
      // Feedback detalhado: aponta a errada e explica a certa
      setMessage(
        `❌ Você respondeu "${answer}", mas a resposta certa é "${correctAnswer}".\n\n` +
        `💡 ${currentQuestionData.explanation}`
      );

      // Registra erro no Supabase (background, não bloqueia)
      if (session?.user?.id) {
        supabase.from('mistakes').insert({
          user_id: session.user.id,
          concept: currentQuestionData.category + ": " + currentQuestionData.question.substring(0, 40)
        }).then();
      }
    }

    // Limpa animação após delay
    setTimeout(() => setQuizFeedback(null), isCorrect && newStreak % 5 === 0 ? 1500 : 800);

    // Atualiza estado
    const nextIndex = questionsAnswered + 1;
    setQuestionsAnswered(nextIndex);
    setUserInput("");

    setState(prev => {
      let newExp = prev.englishExp + xpGained;
      let newLevel = prev.englishLevel;
      let newInventory = [...prev.inventory];
      let newHappiness = Math.min(100, prev.happiness + (isCorrect ? 10 : 2));

      if (newExp >= 100) {
        newExp -= 100;
        newLevel += 1;
        setIsLevelUp(true);
        playSound('LEVEL_UP');
        setTimeout(() => setIsLevelUp(false), 3000);
        
        let newStage = prev.evolutionStage;
        if (newLevel >= 15) newStage = 'LEGENDARY';
        else if (newLevel >= 10) newStage = 'ADULT';
        else if (newLevel >= 5) newStage = 'TEEN';

        if (newStage !== prev.evolutionStage) {
          setMessage(`UAU! Pipo evoluiu para a fase ${newStage}! ✨`);
          setIsEvolving(true);
          playSound('EVOLVE');
          setTimeout(() => setIsEvolving(false), 3000);
        }
        
        const randomItem = COLLECTIBLES[Math.floor(Math.random() * COLLECTIBLES.length)];
        const newItem: Collectible = { ...randomItem, foundAt: Date.now() };
        newInventory.push(newItem);
        setNewlyFoundItem(newItem);
        loadQuestions(newLevel);
      }

      return {
        ...prev,
        englishExp: newExp,
        englishLevel: newLevel,
        inventory: newInventory,
        happiness: newHappiness,
        evolutionStage: (newLevel >= 15 ? 'LEGENDARY' : newLevel >= 10 ? 'ADULT' : newLevel >= 5 ? 'TEEN' : 'BABY') as EvolutionStage
      };
    });

    // Próxima pergunta instantânea
    setTimeout(() => {
      showNextQuestion(questionBank, nextIndex);
    }, 1500);

    // Atualiza data da última lição e streak no Supabase (background)
    if (session?.user?.id) {
      supabase.from('game_state').update({
        last_lesson_date: new Date().toISOString(),
        streak_days: (state.userStreak || 0) + (questionsAnswered === 0 ? 1 : 0)
      }).eq('user_id', session.user.id).then();
    }
  };

  const handleChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim()) return;
    handleQuizAnswer(userInput.trim());
  };

  const resetGame = () => {
    if (confirm("Tem certeza que deseja recomeçar? Seu amigo atual será perdido.")) {
      setState(INITIAL_STATS);
      setMessage("Olá! Eu sou o Pipo. Vamos brincar?");
    }
  };

  const StatBar = ({ label, value, icon: Icon, color }: any) => (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center text-[8px] font-bold text-gray-600 uppercase tracking-wider">
        <div className="flex items-center gap-1">
          <Icon size={10} />
          {label}
        </div>
        <span>{Math.round(value)}</span>
      </div>
      <div className="h-4 bg-gray-200 border-2 border-black overflow-hidden">
        <div 
          className={cn("h-full", color)}
          style={{
            width: `${value}%`,
            boxShadow: 'inset -4px 0px 0px 0px rgba(0,0,0,0.2)'
          }}
        />
      </div>
    </div>
  );

  // Egg Phase: Show egg hatching screen
  if (state.evolutionStage === 'EGG') {
    return (
      <EggHatch
        warmth={state.eggWarmth}
        onTap={() => {
          setState(prev => ({
            ...prev,
            eggWarmth: Math.min(100, prev.eggWarmth + 3)
          }));
          playSound('PET');
        }}
        onHatch={() => {
          setState(prev => ({
            ...prev,
            evolutionStage: 'BABY',
            eggWarmth: 100,
            birthday: Date.now()
          }));
          playSound('EVOLVE');
        }}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center p-4 font-pixel text-gray-900">
      {/* Header */}
      <header className="w-full max-w-md flex justify-between items-center mb-8">
        <div className="flex flex-col">
          <h1 className="text-lg font-bold tracking-tight">My Friend Pipo</h1>
          <p className="text-[8px] text-gray-500 font-medium uppercase tracking-widest mt-1">Pipo v8-bit</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => setShowInventory(!showInventory)}
            className="p-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            <Package size={16} />
          </button>
          <button 
            onClick={() => setShowInfo(!showInfo)}
            className="p-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            <Info size={16} />
          </button>
          <button 
            onClick={async () => {
              setShowRanking(!showRanking);
              if (!showRanking) {
                const { data } = await supabase
                  .from('game_state')
                  .select('user_id, english_level, english_points, streak_days')
                  .order('english_level', { ascending: false })
                  .order('english_points', { ascending: false })
                  .limit(10);
                if (data) {
                  // Busca nomes dos perfis
                  const userIds = data.map(d => d.user_id);
                  const { data: profiles } = await supabase.from('profiles').select('id, name').in('id', userIds);
                  const merged = data.map((d, i) => ({
                    ...d,
                    rank: i + 1,
                    name: profiles?.find(p => p.id === d.user_id)?.name || 'Jogador'
                  }));
                  setRankings(merged);
                }
              }
            }}
            className="p-2 bg-yellow-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            title="Ranking"
          >
            🏆
          </button>
          <button 
            onClick={resetGame}
            className="p-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            <RefreshCw size={16} />
          </button>
          <button 
            onClick={onLogout}
            className="p-2 bg-red-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
            title="Sair"
          >
            🚪
          </button>
        </div>
      </header>

      {/* Ranking Modal */}
      <AnimatePresence>
        {showRanking && (
          <RankingModal 
            rankings={rankings} 
            session={session} 
            onClose={() => setShowRanking(false)} 
          />
        )}
      </AnimatePresence>

      {/* Food Menu Modal */}
      {/* Food Menu Modal */}
      <AnimatePresence>
        {showFoodMenu && (
          <FoodMenu 
            evolutionStage={state.evolutionStage} 
            onFeed={handleFeedAction} 
            onClose={() => setShowFoodMenu(false)} 
          />
        )}
      </AnimatePresence>

      {/* Play Menu Modal (Swipe-up style) */}
      <AnimatePresence>
        {showPlayMenu && (
          <ArcadeMenu 
            onGameSelect={handleArcadeSelect} 
            onClose={() => setShowPlayMenu(false)} 
          />
        )}
      </AnimatePresence>

      {/* Tennis Ball Animation Overlay */}
      <AnimatePresence>
        {activeGame === 'TENNIS' && (
          <motion.div 
            initial={{ x: -100, y: -100 }}
            animate={{ 
              x: [0, 200, 50, 250, 0],
              y: [0, 150, 300, 100, 0],
              rotate: 360
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="fixed z-[40] text-4xl pointer-events-none"
            style={{ top: '30%', left: '20%' }}
          >
            🎾
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouncing Ball Animation Overlay */}
      <AnimatePresence>
        {activeGame === 'BOUNCE' && (
          <motion.div 
            initial={{ y: 0, x: 0 }}
            animate={{ 
              y: [0, 400, 50, 400, 100, 400, 0],
              x: [0, 100, 200, 100, 0, -100, 0],
              scaleY: [1, 0.8, 1.2, 1, 0.8, 1.2, 1],
            }}
            transition={{ 
              duration: 5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
            className="fixed z-[40] text-5xl pointer-events-none"
            style={{ top: '10%', left: '50%' }}
          >
            ⚽
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ball Pit Animation Overlay */}
      <AnimatePresence>
        {activeGame === 'BALL_PIT' && (
          <div className="fixed inset-0 z-[40] overflow-hidden flex flex-col items-center justify-end pb-20 pointer-events-none">
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(30)].map((_, i) => (
                <motion.div
                  key={`ball-${i}`}
                  initial={{ 
                    y: 600, 
                    x: Math.random() * window.innerWidth,
                    scale: 0.5 + Math.random()
                  }}
                  animate={{ 
                    y: [600, -100, 600],
                    x: (Math.random() - 0.5) * 200 + (window.innerWidth / 2)
                  }}
                  transition={{ 
                    duration: 2 + Math.random() * 3, 
                    repeat: Infinity,
                    delay: i * 0.1,
                    ease: "easeOut"
                  }}
                  className="absolute text-3xl"
                >
                  {['🔴', '🔵', '🟡', '🟢', '🟣', '🟠'][i % 6]}
                </motion.div>
              ))}
            </div>
            <button 
              onClick={() => setActiveGame('NONE')}
              className="px-8 py-4 bg-white border-4 border-black font-bold uppercase text-xs shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-100 transition-colors pointer-events-auto z-50 relative"
            >
              Parar Brincadeira
            </button>
          </div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showInventory && (
          <InventoryModal 
            inventory={state.inventory} 
            onClose={() => setShowInventory(false)} 
            onUseItem={useItem} 
            onGrantAll={() => {
              setState(prev => ({
                ...prev,
                inventory: COLLECTIBLES.map(c => ({ ...c, foundAt: Date.now() }))
              }));
              setMessage("Coleção completa liberada! 🎉");
            }}
          />
        )}
      </AnimatePresence>

      {/* Item Found Modal */}
      <AnimatePresence>
        {newlyFoundItem && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-6 bg-black/60"
          >
            <div className="bg-white p-8 border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-center max-w-xs">
              <div className="text-6xl mb-6 animate-bounce">{newlyFoundItem.icon}</div>
              <h3 className="text-sm font-bold mb-2 uppercase">Item Encontrado!</h3>
              <p className="text-[10px] text-gray-600 mb-6">Pipo encontrou um(a) <strong>{newlyFoundItem.name}</strong> enquanto explorava!</p>
              <div className={cn(
                "inline-block px-3 py-1 text-[8px] font-bold uppercase border-2 border-black mb-8",
                newlyFoundItem.rarity === 'common' ? 'bg-gray-200' : 
                newlyFoundItem.rarity === 'rare' ? 'bg-blue-300' : 'bg-yellow-300'
              )}>
                {newlyFoundItem.rarity}
              </div>
              <button 
                onClick={() => setNewlyFoundItem(null)}
                className="w-full py-4 bg-yellow-400 border-4 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                Incrível!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showInfo && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
            onClick={() => setShowInfo(false)}
          >
            <div className="bg-white p-6 border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-xs w-full" onClick={e => e.stopPropagation()}>
              <h2 className="text-sm font-bold mb-6 uppercase">Status do Pipo</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center border-b-2 border-black pb-2">
                  <span className="text-[10px] uppercase font-bold text-gray-500">Estágio</span>
                  <span className="text-[10px] uppercase font-bold text-blue-600">{state.evolutionStage}</span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-black pb-2">
                  <span className="text-[10px] uppercase font-bold text-gray-500">Nível</span>
                  <span className="text-[10px] uppercase font-bold text-green-600">{state.englishLevel}</span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-black pb-2">
                  <span className="text-[10px] uppercase font-bold text-gray-500">Idade</span>
                  <span className="text-[10px] uppercase font-bold">{Math.floor((Date.now() - state.birthday) / (1000 * 60 * 60 * 24))} dias</span>
                </div>
              </div>
              
              <h2 className="text-sm font-bold mb-6 uppercase">Como cuidar</h2>
              <ul className="space-y-4 text-[10px] text-gray-600 leading-relaxed">
                <li className="flex gap-2">🍎 <strong>Comer:</strong> Escolha entre Maçã, Macarrão, Pizza ou Legumes!</li>
                <li className="flex gap-2">⚽ <strong>Brincar:</strong> Humor +25</li>
                <li className="flex gap-2">🌙 <strong>Dormir:</strong> Energia +</li>
                <li className="flex gap-2">🧹 <strong>Limpar:</strong> Saúde +</li>
              </ul>
              <button 
                onClick={() => setShowInfo(false)}
                className="w-full mt-8 py-4 bg-yellow-400 border-4 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                OK!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Game Area */}
      <main className="w-full max-w-md flex flex-col items-center gap-8 flex-1">
        {/* Stats Card */}
        <div className="w-full bg-white border-4 border-black p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-4">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase text-gray-400">Nível {state.englishLevel}</span>
              <div className="h-2 w-24 bg-gray-100 border border-black overflow-hidden">
                <div className="h-full bg-green-400" style={{ width: `${state.englishExp}%` }} />
              </div>
            </div>
            <div className={cn(
              "px-2 py-0.5 text-[8px] font-bold uppercase border-2 border-black",
              state.evolutionStage === 'BABY' ? 'bg-gray-200' : 
              state.evolutionStage === 'TEEN' ? 'bg-blue-200' : 
              state.evolutionStage === 'ADULT' ? 'bg-purple-200' : 'bg-yellow-300 animate-pulse'
            )}>
              {state.evolutionStage}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatBar label="HP" value={state.health} icon={Heart} color="bg-red-500" />
            <StatBar label="Fome" value={state.hunger} icon={Utensils} color="bg-orange-500" />
            <StatBar label="Humor" value={state.happiness} icon={Gamepad2} color="bg-blue-500" />
            <StatBar label="NRG" value={state.energy} icon={Sun} color="bg-yellow-500" />
          </div>
        </div>


        {/* Weather Effects Layer */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <AnimatePresence>
            {weather === 'RAINY' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={`drop-${i}`}
                    className="absolute w-0.5 h-4 bg-blue-400 opacity-60"
                    initial={{ y: -20, x: Math.random() * 100 + "%" }}
                    animate={{ y: 800 }}
                    transition={{ 
                      duration: 0.8 + Math.random() * 0.5, 
                      repeat: Infinity, 
                      delay: Math.random() * 2,
                      ease: "linear"
                    }}
                  />
                ))}
              </motion.div>
            )}
            {weather === 'CLOUDY' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`cloud-${i}`}
                    className="absolute text-6xl opacity-20"
                    initial={{ x: -100, y: 50 + i * 80 }}
                    animate={{ x: 500 }}
                    transition={{ 
                      duration: 20 + Math.random() * 10, 
                      repeat: Infinity,
                      ease: "linear"
                    }}
                  >
                    ☁️
                  </motion.div>
                ))}
              </motion.div>
            )}
            {weather === 'SUNNY' && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-[500px] h-[500px] bg-yellow-200 rounded-full blur-[100px]" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pet Display */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          {/* Placed Scenery Items */}
          {state.placedItems?.map((placed) => (
            <motion.div
              key={placed.id}
              drag
              dragMomentum={false}
              onDragEnd={(e, info) => {
                setState(prev => ({
                  ...prev,
                  placedItems: prev.placedItems.map(p => 
                    p.id === placed.id 
                      ? { ...p, x: p.x + info.offset.x, y: p.y + info.offset.y } 
                      : p
                  )
                }));
              }}
              animate={{ x: placed.x, y: placed.y }}
              className="absolute text-5xl cursor-grab active:cursor-grabbing z-[5] hover:scale-110 active:scale-95 transition-transform drop-shadow-md"
              title="Arraste para mover"
              onDoubleClick={() => {
                // Remove do cenário
                setState(prev => ({
                  ...prev,
                  placedItems: prev.placedItems.filter(p => p.id !== placed.id)
                }));
              }}
            >
              {placed.icon}
            </motion.div>
          ))}

          <Pet 
            state={state} 
            isActionActive={isActionActive} 
            onPet={() => handleAction('PET')}
            onRemoveItem={(instanceId) => {
              setState(prev => ({
                ...prev,
                equippedItems: prev.equippedItems.filter(id => id !== instanceId)
              }));
              setMessage("Roupinha guardada!");
            }}
            isLevelUp={isLevelUp}
            isEvolving={isEvolving}
            foodType={activeFood}
            weather={weather}
            isSick={isSick}
          />

          {/* Daily Info Balloon */}
          <AnimatePresence>
            {showDailyUpdate && dailyUpdate && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5, x: 80, y: -80 }}
                animate={{ opacity: 1, scale: 1, x: 100, y: -100 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute bg-white border-2 border-black p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-40 w-40"
              >
                <button 
                  onClick={() => setShowDailyUpdate(false)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white w-4 h-4 text-[8px] flex items-center justify-center border-2 border-black"
                >
                  X
                </button>
                <h4 className="text-[7px] font-bold uppercase mb-2 border-b border-black">📰 Pipo News</h4>
                <div className="space-y-1">
                  <p className="text-[6px]"><strong>SOLAR:</strong> {dailyUpdate.weather}</p>
                  <p className="text-[6px]"><strong>BTC:</strong> {dailyUpdate.btc}</p>
                  <p className="text-[6px]"><strong>TREND:</strong> #{dailyUpdate.trend}</p>
                </div>
                <div className="absolute top-1/2 -left-2 w-2 h-2 bg-white border-l-2 border-b-2 border-black -translate-y-1/2 -rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Speech Bubble / Learning Interface */}
          <AnimatePresence mode="wait">
            {message && !showLearning && (
              <motion.div 
                key="message-bubble"
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                className="absolute -top-16 left-1/2 -translate-x-1/2 bg-white px-4 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[180px] text-center z-20"
              >
                <p className="text-[10px] font-bold leading-relaxed">{message}</p>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-4 border-b-4 border-black rotate-45" />
              </motion.div>
            )}

            {showLearning && (
              <motion.div 
                key="learning-bubble"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className="absolute inset-x-0 -top-24 flex flex-col items-center z-30 px-4"
              >
                <div className={cn(
                  "bg-white w-full max-w-[280px] border-4 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative transition-colors duration-300",
                  quizFeedback === 'correct' ? 'border-green-500 bg-green-50' :
                  quizFeedback === 'combo' ? 'border-yellow-500 bg-yellow-50' :
                  quizFeedback === 'wrong' ? 'border-red-500 bg-red-50' :
                  'border-black'
                )}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-[8px] font-bold uppercase text-blue-600">English Lesson</span>
                      {correctStreak > 0 && (
                        <span className="text-[8px] font-bold bg-orange-100 border border-orange-400 px-1.5 py-0.5 text-orange-600">
                          🔥 {correctStreak}
                        </span>
                      )}
                    </div>
                    <button onClick={() => setShowLearning(false)} className="text-[8px] font-bold uppercase hover:text-red-500">Close</button>
                  </div>
                  
                  {/* Tick / X / Combo Animation Overlay */}
                  <AnimatePresence>
                    {quizFeedback === 'correct' && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                      >
                        <div className="text-6xl text-green-500 drop-shadow-lg">✓</div>
                      </motion.div>
                    )}
                    {quizFeedback === 'wrong' && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                      >
                        <div className="text-6xl text-red-500 drop-shadow-lg">✗</div>
                      </motion.div>
                    )}
                    {quizFeedback === 'combo' && (
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: [0, 1.3, 1], rotate: [20, -5, 0] }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.5, type: "spring" }}
                        className="absolute inset-0 flex items-center justify-center z-20 pointer-events-none"
                      >
                        <div className="text-5xl">🔥</div>
                        <div className="absolute text-2xl font-black text-yellow-600 mt-16 uppercase" style={{ textShadow: '2px 2px 0px black' }}>
                          COMBO x{correctStreak}!
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Pergunta ou Feedback */}
                  {quizFeedback ? (
                    <div className={cn(
                      "text-[10px] font-bold mb-4 leading-relaxed text-center p-2 border-2",
                      quizFeedback === 'wrong' ? 'bg-red-100 border-red-300 text-red-800' :
                      quizFeedback === 'combo' ? 'bg-yellow-100 border-yellow-300 text-yellow-800' :
                      'bg-green-100 border-green-300 text-green-800'
                    )}>
                      {message}
                    </div>
                  ) : (
                    <p className="text-[10px] font-bold mb-4 leading-relaxed text-center">
                      {currentQuestion || 'Carregando perguntas...'}
                    </p>
                  )}

                  {!quizFeedback && quizOptions && quizOptions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      {quizOptions.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleQuizAnswer(opt)}
                          className="w-full py-2 px-3 bg-gray-50 border-2 border-black text-[9px] font-bold text-left hover:bg-blue-50 active:translate-y-0.5 transition-all"
                        >
                          {String.fromCharCode(65 + i)}. {opt}
                        </button>
                      ))}
                    </div>
                  ) : !quizFeedback ? (
                    <form onSubmit={handleChat} className="flex gap-2">
                      <input 
                        type="text" 
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                        placeholder="Type here..."
                        autoFocus
                        className="flex-1 bg-gray-50 border-2 border-black px-2 py-2 text-[10px] focus:outline-none font-pixel"
                      />
                      <button 
                        type="submit"
                        disabled={!userInput.trim()}
                        className="bg-blue-400 border-2 border-black px-3 py-1 text-[8px] font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                      >
                        OK
                      </button>
                    </form>
                  ) : null}
                  <div className={cn(
                    "absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 border-r-4 border-b-4 rotate-45 transition-colors duration-300",
                    quizFeedback === 'correct' ? 'bg-green-50 border-green-500' :
                    quizFeedback === 'combo' ? 'bg-yellow-50 border-yellow-500' :
                    quizFeedback === 'wrong' ? 'bg-red-50 border-red-500' :
                    'bg-white border-black'
                  )} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
        </div>

        {/* Controls */}
        <div className="w-full grid grid-cols-5 gap-2">
          <div className="relative group">
            <ActionButton 
              onClick={() => handleAction('FEED')} 
              icon={
                <div className="relative">
                  <Utensils size={20} />
                  <span className="absolute -top-2 -right-2 text-[10px] bg-white rounded-full w-4 h-4 flex items-center justify-center border border-black">
                    {lastFood === 'PASTA' ? '🍝' : lastFood === 'PIZZA' ? '🍕' : lastFood === 'VEGGIES' ? '🥗' : '🍎'}
                  </span>
                </div>
              } 
              label="Comer" 
              color="bg-orange-400"
              disabled={state.health <= 0}
            />
            <button 
              onClick={(e) => {
                e.stopPropagation();
                setShowFoodMenu(true);
              }}
              className="absolute -top-2 -right-2 bg-black text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] border border-white hover:scale-110 transition-transform z-10"
              title="Trocar comida"
            >
              +
            </button>
          </div>
          <ActionButton 
            onClick={() => handleAction('PLAY')} 
            icon={<Gamepad2 size={20} />} 
            label="Jogar" 
            color="bg-blue-400"
            disabled={state.health <= 0}
          />
          <ActionButton 
            onClick={() => handleAction('SLEEP')} 
            icon={state.isSleeping ? <Sun size={20} /> : <Moon size={20} />} 
            label={state.isSleeping ? "Acordar" : "Dormir"} 
            color="bg-purple-400"
            disabled={state.health <= 0}
          />
          <ActionButton 
            onClick={() => handleAction('CLEAN')} 
            icon={<Trash2 size={20} />} 
            label="Limpar" 
            color="bg-green-400"
            disabled={state.health <= 0 || state.poopCount === 0}
          />
          <ActionButton 
            onClick={() => setShowLearning(!showLearning)} 
            icon={<MessageCircle size={20} />} 
            label="Aprender" 
            color="bg-yellow-400"
            disabled={state.health <= 0}
          />
        </div>
      </main>

      {/* Death Overlay */}
      <AnimatePresence>
        {state.health <= 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 z-[100] flex flex-col items-center justify-center p-6 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-6 uppercase">Game Over</h2>
            <p className="text-[10px] text-gray-300 mb-10 max-w-xs leading-loose">Pipo partiu para o pixel-céu.</p>
            <button 
              onClick={resetGame}
              className="px-8 py-4 bg-white border-4 border-black font-bold uppercase text-xs shadow-[8px_8px_0px_0px_rgba(255,255,255,0.2)] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              Novo Amigo
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Evolution Flash Overlay */}
      <AnimatePresence>
        {isEvolving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, times: [0, 0.5, 1] }}
            className="fixed inset-0 bg-white z-[100] pointer-events-none"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGame === 'PIPOMAN' && (
          <PipoMan 
            englishLevel={state.englishLevel}
            onClose={(score) => {
              setActiveGame('NONE');
              const xpGained = Math.floor(score / 5);
              setState(prev => ({
                ...prev,
                englishExp: prev.englishExp + xpGained,
                happiness: Math.min(100, prev.happiness + 30),
                energy: Math.max(0, prev.energy - 15)
              }));
              setMessage(`Fim de jogo! Você marcou ${score} e Pipo ganhou ${xpGained} XP!`);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGame === 'PONG' && (
          <PipoPong 
            onClose={(score) => {
              setActiveGame('NONE');
              const xpGained = score;
              setState(prev => ({
                ...prev,
                englishExp: prev.englishExp + xpGained,
                happiness: Math.min(100, prev.happiness + 20),
                energy: Math.max(0, prev.energy - 10)
              }));
              setMessage(`Fim de jogo! Você marcou ${score/5} pontos e ganhou ${xpGained} XP!`);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGame === 'ASTEROIDS' && (
          <PipoAsteroids 
            onClose={(score) => {
              setActiveGame('NONE');
              const xpGained = Math.floor(score / 2);
              setState(prev => ({
                ...prev,
                englishExp: prev.englishExp + xpGained,
                happiness: Math.min(100, prev.happiness + 40),
                energy: Math.max(0, prev.energy - 20)
              }));
              setMessage(`Nave detonada! Você fez ${score} pontos e Pipo ganhou ${xpGained} XP!`);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionButton({ onClick, icon, label, color, disabled }: any) {
  return (
    <button 
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "flex flex-col items-center justify-center gap-2 p-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-30 transition-all",
        color
      )}
    >
      {icon}
      <span className="text-[7px] font-bold uppercase leading-tight">{label}</span>
    </button>
  );
}

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [gameState, setGameState] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [profileError, setProfileError] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
      else setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) fetchProfile(session.user.id);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string) => {
    const [{ data: profileData, error: profileErr }, { data: gameStateData }] = await Promise.all([
      supabase.from('profiles').select('*').eq('id', userId).single(),
      supabase.from('game_state').select('*').eq('user_id', userId).single()
    ]);
    if (profileData) {
      setProfile(profileData);
      if (gameStateData) setGameState(gameStateData);
    } else if (profileErr && profileErr.code !== 'PGRST116') {
      console.error("Profile fetch error:", profileErr);
    }
    setLoading(false);
  };

  const createProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setProfileError('');
    if (!session) return;
    
    // Use the phone field or email fallback
    const userPhone = session.user.email?.split('@')[0] || 'sem_telefone';
    
    const { data: newProfile, error } = await supabase.from('profiles').upsert([
      { id: session.user.id, name, age: parseInt(age), phone: userPhone }
    ], { onConflict: 'id' }).select().single();
    
    if (error) {
      console.error("DB ERROR SAVING NEW USER:", error);
      setProfileError(`${error.message || JSON.stringify(error)}`);
      return;
    }
    // O Trigger criará o game_state automaticamente, vamos buscar
    if (newProfile) {
       await fetchProfile(session.user.id);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setProfile(null);
    setGameState(null);
  };

  if (loading) return <div className="min-h-screen bg-[#f5f5f0] flex items-center justify-center"><p className="font-pixel">Carregando...</p></div>;
  if (!session) return <Auth onLogin={setSession} />;
  
  if (!profile) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center p-6 font-pixel text-gray-900">
        <div className="w-full max-w-sm bg-white p-8 border-8 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-xl font-bold uppercase text-center mb-6">Criar Perfil</h1>
          {profileError && (
            <div className="mb-4 bg-red-100 border-2 border-red-500 p-2 text-[10px] text-red-600 font-bold uppercase text-center">
              {profileError}
            </div>
          )}
          <form onSubmit={createProfile} className="flex flex-col gap-4">
            <input type="text" placeholder="Seu Nome" value={name} onChange={e => setName(e.target.value)} required className="p-3 bg-gray-50 border-4 border-black text-xs focus:outline-none" />
            <input type="number" placeholder="Sua Idade" value={age} onChange={e => setAge(e.target.value)} required className="p-3 bg-gray-50 border-4 border-black text-xs focus:outline-none" />
            <button type="submit" className="w-full py-4 mt-4 bg-blue-400 border-4 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1">Salvar e Começar!</button>
          </form>
        </div>
      </div>
    );
  }

  return <Game session={session} profile={profile} initialGameState={gameState} onLogout={handleLogout} />;
}
