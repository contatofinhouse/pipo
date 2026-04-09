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

export default function App() {
  const [state, setState] = useState<PetState>(() => {
    const saved = localStorage.getItem('neo_pet_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      // Calculate decay since last visit
      const now = Date.now();
      const diff = now - parsed.lastUpdate;
      
      return {
        ...parsed,
        inventory: Array.isArray(parsed.inventory) ? parsed.inventory : [],
        evolutionStage: parsed.evolutionStage || 'BABY',
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
  const [showFoodMenu, setShowFoodMenu] = useState(false);
  const [activeFood, setActiveFood] = useState<FoodType | null>(null);
  const [lastFood, setLastFood] = useState<FoodType>('APPLE');
  const [activeGame, setActiveGame] = useState<'NONE' | 'TENNIS' | 'BOUNCE' | 'BALL_PIT'>('NONE');
  const [newlyFoundItem, setNewlyFoundItem] = useState<Collectible | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>("What is your name?");
  const [quizOptions, setQuizOptions] = useState<string[] | null>(null);

  // Save state to localStorage
  useEffect(() => {
    localStorage.setItem('neo_pet_state', JSON.stringify(state));
  }, [state]);

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
        if (newHunger > 50 && newEnergy > 50 && newPoopCount === 0) healthChange += 0.01;

        let newHealth = Math.max(0, Math.min(100, prev.health + healthChange));

        // Angry/Critical messages
        if (Math.random() < 0.05) { // 5% chance every second to complain if stats are bad
          if (newHunger < 20) setMessage("Pipo está com MUITA fome! 💢");
          else if (newHappiness < 20) setMessage("Pipo está entediado... 😤");
          else if (newEnergy < 10 && !prev.isSleeping) setMessage("Pipo quer dormir AGORA! 😡");
          else if (newPoopCount > 1) setMessage("Está sujo aqui! Limpe logo! 💩");
        }

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

  const useItem = (item: Collectible, index: number) => {
    if (state.health <= 0) return;
    
    setState(prev => {
      const newInventory = [...prev.inventory];
      newInventory.splice(index, 1);
      
      return {
        ...prev,
        hunger: Math.min(100, Math.max(0, prev.hunger + (item.effect?.hunger || 0))),
        happiness: Math.min(100, Math.max(0, prev.happiness + (item.effect?.happiness || 0))),
        energy: Math.min(100, Math.max(0, prev.energy + (item.effect?.energy || 0))),
        health: Math.min(100, Math.max(0, prev.health + (item.effect?.health || 0))),
        inventory: newInventory
      };
    });
    
    setMessage(`Pipo usou ${item.name}!`);
    setSelectedItem(null);
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
        case 'APPLE':
        default:
          hungerGain = 15;
          break;
      }

      return {
        ...prev,
        hunger: Math.min(100, prev.hunger + hungerGain),
        energy: Math.min(100, Math.max(0, prev.energy + energyGain)),
        health: Math.min(100, prev.health + healthGain)
      };
    });

    const foodNames = {
      APPLE: 'uma maçã',
      PASTA: 'um macarrão delicioso',
      PIZZA: 'uma pizza (hmmm!)',
      VEGGIES: 'legumes saudáveis'
    };

    setMessage(`Pipo está comendo ${foodNames[food]}!`);
    playSound('FEED');
    
    // Play gulp sound after a short delay (when he "catches" it)
    setTimeout(() => playSound('GULP'), 800);

    const resp = await getPetResponse(state.name, state);
    setMessage(typeof resp === 'string' ? resp : "Miau!");

    setTimeout(() => {
      setIsActionActive(null);
      setActiveFood(null);
    }, 2000);
  };

  const handleAction = async (type: ActionType) => {
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
              "Não me acorde sem um bom motivo, ok? Zzz."
            ];
            setMessage(sleepMsgs[Math.floor(Math.random() * sleepMsgs.length)]);
          } else {
            const wakeMsgs = [
              "Bom dia! Pipo está pronto para a aventura!",
              "Ahhh... que sono bom. O que vamos fazer?",
              "Acordei! Estava sonhando com uma piscina de bolinhas.",
              "Pipo está de volta e com energia total!"
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

    // Get AI response for the action (except for SLEEP and PET which have local messages)
    if (type === 'CLEAN') {
      const resp = await getPetResponse(state.name, state);
      setMessage(typeof resp === 'string' ? resp : "Miau!");
      
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

  const handleChat = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isTyping || state.health <= 0) return;

    setIsTyping(true);
    const userMsg = userInput;
    setUserInput("");
    
    try {
      const resp = await getPetResponse(state.name, state, userMsg, currentQuestion);
      
      if (typeof resp === 'object' && 'feedback' in resp) {
        const englishResp = resp as EnglishResponse;
        
        setMessage(englishResp.feedback);
        setCurrentQuestion(englishResp.nextQuestion);
        setQuizOptions(englishResp.options || null);

        setState(prev => {
          let newExp = prev.englishExp + englishResp.xpGained;
          let newLevel = prev.englishLevel;
          let newInventory = [...prev.inventory];
          let newHappiness = Math.min(100, prev.happiness + (englishResp.isCorrect ? 10 : 2));

          // Level up logic (100 XP per level)
          if (newExp >= 100) {
            newExp -= 100;
            newLevel += 1;
            setIsLevelUp(true);
            playSound('LEVEL_UP');
            setTimeout(() => setIsLevelUp(false), 3000);
            
            // Evolution logic
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
            
            // Reward: Random item on level up
            const randomItem = COLLECTIBLES[Math.floor(Math.random() * COLLECTIBLES.length)];
            const newItem: Collectible = { ...randomItem, foundAt: Date.now() };
            newInventory.push(newItem);
            setNewlyFoundItem(newItem);
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
      } else {
        setMessage(resp as string);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessage("Pipo se distraiu com uma borboleta... Pode repetir?");
    } finally {
      setIsTyping(false);
    }
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
            onClick={resetGame}
            className="p-2 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
          >
            <RefreshCw size={16} />
          </button>
        </div>
      </header>

      {/* Food Menu Modal */}
      <AnimatePresence>
        {showFoodMenu && (
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
                  onClick={() => handleFeedAction('APPLE')}
                  className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-red-100 hover:bg-red-200 transition-colors"
                >
                  <span className="text-3xl">🍎</span>
                  <span className="text-[10px] font-bold uppercase">Maçã</span>
                  <span className="text-[8px] text-gray-500">Fome +15</span>
                </button>
                <button 
                  onClick={() => handleFeedAction('PASTA')}
                  className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-yellow-100 hover:bg-yellow-200 transition-colors"
                >
                  <span className="text-3xl">🍝</span>
                  <span className="text-[10px] font-bold uppercase">Macarrão</span>
                  <span className="text-[8px] text-gray-500">Fome +30, NRG +15</span>
                </button>
                <button 
                  onClick={() => handleFeedAction('PIZZA')}
                  className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-orange-100 hover:bg-orange-200 transition-colors"
                >
                  <span className="text-3xl">🍕</span>
                  <span className="text-[10px] font-bold uppercase">Pizza</span>
                  <span className="text-[8px] text-gray-500">Fome +40, NRG -10</span>
                </button>
                <button 
                  onClick={() => handleFeedAction('VEGGIES')}
                  className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-green-100 hover:bg-green-200 transition-colors"
                >
                  <span className="text-3xl">🥗</span>
                  <span className="text-[10px] font-bold uppercase">Legumes</span>
                  <span className="text-[8px] text-gray-500">Fome +20, HP +5</span>
                </button>
              </div>
              <button 
                onClick={() => setShowFoodMenu(false)}
                className="w-full mt-6 py-3 border-4 border-black font-bold uppercase text-[10px]"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Play Menu Modal (Swipe-up style) */}
      <AnimatePresence>
        {showPlayMenu && (
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
                  onClick={() => {
                    setActiveGame('TENNIS');
                    setShowPlayMenu(false);
                    handleAction('PLAY'); // Trigger animation state
                    setState(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 20), energy: Math.max(0, prev.energy - 10) }));
                    setMessage("Pipo adora correr atrás da bolinha!");
                    setTimeout(() => setActiveGame('NONE'), 10000);
                  }}
                  className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-yellow-100 hover:bg-yellow-200 transition-colors"
                >
                  <span className="text-3xl">🎾</span>
                  <span className="text-[10px] font-bold uppercase">Bola de Tênis</span>
                </button>
                <button 
                  onClick={() => {
                    setShowPlayMenu(false);
                    handleAction('PLAY');
                    setState(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 15), energy: Math.max(0, prev.energy - 5) }));
                    setMessage("Pipo está se sentindo um astro do rock!");
                  }}
                  className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-purple-100 hover:bg-purple-200 transition-colors"
                >
                  <span className="text-3xl">🎸</span>
                  <span className="text-[10px] font-bold uppercase">Mini Guitarra</span>
                </button>
                <button 
                  onClick={() => {
                    setActiveGame('BOUNCE');
                    setShowPlayMenu(false);
                    handleAction('PLAY');
                    setState(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 25), energy: Math.max(0, prev.energy - 15) }));
                    setMessage("Olha a bola, Pipo! Pula, pula!");
                    setTimeout(() => setActiveGame('NONE'), 15000);
                  }}
                  className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-green-100 hover:bg-green-200 transition-colors"
                >
                  <span className="text-3xl">⚽</span>
                  <span className="text-[10px] font-bold uppercase">Bola Saltitante</span>
                </button>
                <button 
                  onClick={() => {
                    setActiveGame('BALL_PIT');
                    setShowPlayMenu(false);
                    handleAction('PLAY');
                    setState(prev => ({ ...prev, happiness: Math.min(100, prev.happiness + 30), energy: Math.max(0, prev.energy - 20) }));
                    setMessage("Pipo está mergulhando na diversão!");
                    setTimeout(() => setActiveGame('NONE'), 20000);
                  }}
                  className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-blue-100 hover:bg-blue-200 transition-colors"
                >
                  <span className="text-3xl">🎈</span>
                  <span className="text-[10px] font-bold uppercase">Piscina de Bolinhas</span>
                </button>
              </div>
              <button 
                onClick={() => setShowPlayMenu(false)}
                className="w-full mt-6 py-3 border-4 border-black font-bold uppercase text-[10px]"
              >
                Cancelar
              </button>
            </div>
          </motion.div>
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
          <div className="fixed inset-0 z-[40] pointer-events-none overflow-hidden">
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
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showInventory && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
            onClick={() => {
              setShowInventory(false);
              setSelectedItem(null);
            }}
          >
            <motion.div 
              layout
              className="bg-white p-6 border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full" 
              onClick={e => e.stopPropagation()}
            >
              <h2 className="text-sm font-bold mb-6 uppercase">Coleção do Pipo</h2>
              
              <AnimatePresence mode="wait">
                {selectedItem ? (
                  <motion.div 
                    key="details"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex flex-col items-center text-center py-4"
                  >
                    <div className={cn(
                      "w-24 h-24 border-4 border-black flex items-center justify-center text-5xl mb-4",
                      selectedItem.item.rarity === 'common' ? 'bg-gray-100' : 
                      selectedItem.item.rarity === 'rare' ? 'bg-blue-100' : 'bg-yellow-100'
                    )}>
                      {selectedItem.item.icon}
                    </div>
                    <h3 className="font-bold uppercase text-xs mb-2">{selectedItem.item.name}</h3>
                    <p className="text-[10px] text-gray-600 mb-6 leading-relaxed">
                      {selectedItem.item.description}
                    </p>
                    
                    <div className="flex gap-4 w-full">
                      <button 
                        onClick={() => setSelectedItem(null)}
                        className="flex-1 py-3 border-4 border-black font-bold uppercase text-[10px] hover:bg-gray-100"
                      >
                        Voltar
                      </button>
                      <button 
                        onClick={() => useItem(selectedItem.item, selectedItem.index)}
                        className="flex-1 py-3 bg-green-400 border-4 border-black font-bold uppercase text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                      >
                        Usar Item
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div 
                    key="list"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    {(!state.inventory || state.inventory.length === 0) ? (
                      <p className="text-[10px] text-gray-400 text-center py-8">Pipo ainda não encontrou nada...</p>
                    ) : (
                      <div className="grid grid-cols-3 gap-4 max-h-64 overflow-y-auto p-2">
                        {state.inventory.map((item, idx) => (
                          <button 
                            key={`${item.id}-${idx}`}
                            onClick={() => setSelectedItem({ item, index: idx })}
                            className={cn(
                              "aspect-square border-4 border-black flex flex-col items-center justify-center p-2 relative transition-transform hover:scale-105 active:scale-95",
                              item.rarity === 'common' ? 'bg-gray-100' : 
                              item.rarity === 'rare' ? 'bg-blue-100' : 'bg-yellow-100'
                            )}
                          >
                            <span className="text-2xl">{item.icon}</span>
                            <span className="text-[6px] font-bold mt-1 text-center">{item.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                    <button 
                      onClick={() => setShowInventory(false)}
                      className="w-full mt-8 py-4 bg-blue-400 border-4 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                    >
                      Fechar
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
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


        {/* Pet Display */}
        <div className="relative flex-1 flex items-center justify-center w-full">
          <Pet 
            state={state} 
            isActionActive={isActionActive} 
            onPet={() => handleAction('PET')}
            isLevelUp={isLevelUp}
            isEvolving={isEvolving}
            foodType={activeFood}
          />
          
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
                <div className="bg-white w-full max-w-[280px] border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[8px] font-bold uppercase text-blue-600">English Lesson</span>
                    <button onClick={() => setShowLearning(false)} className="text-[8px] font-bold uppercase hover:text-red-500">Close</button>
                  </div>
                  
                  <p className="text-[10px] font-bold mb-4 leading-relaxed text-center">
                    {message.includes('UAU!') || message.includes('Olha só!') ? message : currentQuestion}
                  </p>

                  {quizOptions && quizOptions.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2">
                      {quizOptions.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => {
                            setUserInput(opt);
                            const fakeEvent = { preventDefault: () => {} } as React.FormEvent;
                            handleChat(fakeEvent);
                          }}
                          disabled={isTyping}
                          className="w-full py-2 px-3 bg-gray-50 border-2 border-black text-[9px] font-bold text-left hover:bg-blue-50 active:translate-y-0.5 transition-all"
                        >
                          {String.fromCharCode(65 + i)}. {opt}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <form onSubmit={handleChat} className="flex gap-2">
                      <input 
                        type="text" 
                        value={userInput}
                        onChange={e => setUserInput(e.target.value)}
                        placeholder="Type here..."
                        autoFocus
                        disabled={isTyping}
                        className="flex-1 bg-gray-50 border-2 border-black px-2 py-2 text-[10px] focus:outline-none font-pixel"
                      />
                      <button 
                        type="submit"
                        disabled={isTyping || !userInput.trim()}
                        className="bg-blue-400 border-2 border-black px-3 py-1 text-[8px] font-bold uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5"
                      >
                        OK
                      </button>
                    </form>
                  )}
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-4 border-b-4 border-black rotate-45" />
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
