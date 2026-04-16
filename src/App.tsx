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
  Package,
  Dumbbell
} from 'lucide-react';
import { PetState, ActionType, Collectible, EvolutionStage, FoodType } from './types';
import { INITIAL_STATS, DECAY_RATES, COLLECTIBLES } from './constants';
import Pet from './components/Pet';
import { cn } from './lib/utils';
import { getPetResponse, EnglishResponse, getDailyNews, PipoNews } from './lib/gemini';
import { supabase } from './lib/supabase';
import { Auth } from './components/Auth';
import EggHatch from './components/EggHatch';
import { PipoMan, PipoPong, PipoAsteroids } from './components/MiniGames';
import { PipoSnake } from './components/games/PipoSnake';
import { PipoTetris } from './components/games/PipoTetris';
import { PipoFarm, createEmptyFarmPlots } from './components/games/PipoFarm';
import { RankingModal } from './components/RankingModal';
import { FoodMenu } from './components/FoodMenu';
import { ArcadeMenu } from './components/ArcadeMenu';
import { InventoryModal } from './components/InventoryModal';
import { LearningPath } from './components/LearningPath';
import { ExerciseEngine } from './components/ExerciseEngine';
import { LearningHeader } from './components/LearningHeader';

type View = 'ROOM' | 'LEARNING' | 'EXERCISE';

function Game({ session, profile, initialGameState, onLogout }: { session: any, profile: any, initialGameState?: any, onLogout: () => void | Promise<void> }) {
  const [currentView, setCurrentView] = useState<View>('ROOM');
  const [units, setUnits] = useState<any[]>([]);
  const [currentLessonQuestions, setCurrentLessonQuestions] = useState<any[]>([]);
  const [selectedLessonId, setSelectedLessonId] = useState<string | null>(null);
  const [lessonProgress, setLessonProgress] = useState<number | undefined>(undefined);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const [state, setState] = useState<PetState>(() => {
    const now = Date.now();
    const saved = localStorage.getItem('neo_pet_state');
    const parsedStored = saved ? JSON.parse(saved) : null;

    // PRIORIDADE 1: Banco de Dados (se existir e for um carregamento inicial)
    if (initialGameState) {
      const lastUpdate = initialGameState.updated_at ? new Date(initialGameState.updated_at).getTime() : now;
      const diff = now - lastUpdate;

      return {
        name: 'Pipo',
        userName: profile?.name,
        userAge: profile?.age,
        hunger: Math.max(0, (initialGameState.hunger ?? (parsedStored?.hunger || 50)) - (diff * DECAY_RATES.hunger)),
        happiness: Math.max(0, (initialGameState.happiness ?? (parsedStored?.happiness || 50)) - (diff * DECAY_RATES.happiness)),
        energy: Math.max(0, (initialGameState.energy ?? (parsedStored?.energy || 100)) - (diff * DECAY_RATES.energy)),
        health: initialGameState.health ?? (parsedStored?.health || 100),
        evolutionStage: { 0: 'EGG', 1: 'BABY', 2: 'KIDS', 3: 'TEEN', 4: 'MASTER_TEEN', 5: 'YOUNG_ADULT', 6: 'ADULT', 7: 'LEGENDARY' }[initialGameState.evolution_stage as number] as EvolutionStage || 'BABY',
        eggWarmth: initialGameState.evolution_stage === 0 ? 0 : 100,
        englishLevel: initialGameState.english_level ?? 1,
        englishExp: initialGameState.english_points ?? 0,
        lifetimeXP: initialGameState.lifetime_xp ?? (parsedStored?.lifetimeXP || 0),
        badges: Array.isArray(initialGameState.badges) ? initialGameState.badges : (parsedStored?.badges || []),
        inventory: Array.isArray(initialGameState.inventory) ? initialGameState.inventory : (parsedStored?.inventory || []),
        equippedItems: Array.isArray(initialGameState.equipped_items) ? initialGameState.equipped_items : (parsedStored?.equippedItems || []),
        placedItems: Array.isArray(initialGameState.placed_items) ? initialGameState.placed_items : (parsedStored?.placedItems || []),
        lastUpdate: now,
        birthday: initialGameState.birthday || parsedStored?.birthday || Date.now(),
        isSleeping: parsedStored?.isSleeping || false,
        poopCount: parsedStored?.poopCount || 0,
        userStreak: initialGameState.streak_days ?? (parsedStored?.userStreak || 0),
        fitness: initialGameState.fitness ?? (parsedStored?.fitness || 50)
      };
    }

    // PRIORIDADE 2: Local Storage (apenas se não houver dados do banco)
    if (parsedStored) {
      const diff = now - parsedStored.lastUpdate;
      return {
        ...parsedStored,
        hunger: Math.max(0, parsedStored.hunger - diff * DECAY_RATES.hunger),
        happiness: Math.max(0, parsedStored.happiness - diff * DECAY_RATES.happiness),
        energy: parsedStored.isSleeping
          ? Math.min(100, parsedStored.energy + diff * DECAY_RATES.energySleep)
          : Math.max(0, parsedStored.energy - diff * DECAY_RATES.energy),
        fitness: Math.max(0, (parsedStored.fitness || 50) - diff * (DECAY_RATES.fitness || 0.00008)),
        lastUpdate: now,
      };
    }

    return {
      ...INITIAL_STATS,
      lifetimeXP: 0,
      badges: []
    };
  });

  // Sanitizar estado legado (XP acumulado acima de 100)
  useEffect(() => {
    // FIX PRO USUÁRIO: Garante que o Sushi está lá se ele disse que perdeu
    const hasSushi = state.inventory.some(i => i.id === 'sushi');
    if (!hasSushi && state.englishLevel >= 2) { // Sushi é raro, nível 2+ costuma ter
      const sushiItem = COLLECTIBLES.find(c => c.id === 'sushi');
      if (sushiItem) {
        setState(prev => ({
          ...prev,
          inventory: [...prev.inventory, { ...sushiItem, foundAt: Date.now() }]
        }));
      }
    }

    if (state.englishExp >= 100) {
      setState(prev => {
        let newExp = prev.englishExp;
        let newLevel = prev.englishLevel;
        while (newExp >= 100) {
          newExp -= 100;
          newLevel += 1;
        }
        let newEvolutionStage: EvolutionStage = 'BABY';
        if (newLevel >= 61) newEvolutionStage = 'LEGENDARY';
        else if (newLevel >= 46) newEvolutionStage = 'ADULT';
        else if (newLevel >= 36) newEvolutionStage = 'YOUNG_ADULT';
        else if (newLevel >= 26) newEvolutionStage = 'MASTER_TEEN';
        else if (newLevel >= 16) newEvolutionStage = 'TEEN';
        else if (newLevel >= 6) newEvolutionStage = 'KIDS';

        return {
          ...prev,
          englishExp: newExp,
          englishLevel: newLevel,
          evolutionStage: newEvolutionStage
        };
      });
    }
  }, []);

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
  const [activeAnsweredIds, setActiveAnsweredIds] = useState<string[]>([]);
  const [showFoodMenu, setShowFoodMenu] = useState(false);
  const [activeFood, setActiveFood] = useState<FoodType | null>(null);
  const [lastFood, setLastFood] = useState<FoodType>('APPLE');
  const [activeGame, setActiveGame] = useState<'NONE' | 'TENNIS' | 'BOUNCE' | 'BALL_PIT' | 'PIPOMAN' | 'PONG' | 'ASTEROIDS' | 'SNAKE' | 'TETRIS' | 'FARM'>('NONE');
  const [weather, setWeather] = useState<'SUNNY' | 'RAINY' | 'CLOUDY'>('SUNNY');
  const [isSick, setIsSick] = useState(false);
  const [dailyUpdate, setDailyUpdate] = useState<PipoNews | null>(null);
  const [showDailyUpdate, setShowDailyUpdate] = useState(false);
  const [worldEvent, setWorldEvent] = useState<string | null>(null);
  const [newlyFoundItem, setNewlyFoundItem] = useState<Collectible | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState<string>('');
  const [quizOptions, setQuizOptions] = useState<string[] | null>(null);
  const [questionBank, setQuestionBank] = useState<any[]>([]);
  const [currentQuestionData, setCurrentQuestionData] = useState<any>(null);
  const [questionsAnswered, setQuestionsAnswered] = useState(0);
  const [correctStreak, setCorrectStreak] = useState(0);
  // Carrega as notícias reais resumidas pelo Pipo baseadas na idade
  /* useEffect(() => {
    if (session && profile && !dailyUpdate) {
      getDailyNews(profile.age || 10).then(data => {
        setDailyUpdate(data);
        setTimeout(() => setShowDailyUpdate(true), 2000);
      });
    }
  }, [session, profile]); */

  const [quizFeedback, setQuizFeedback] = useState<'correct' | 'wrong' | 'combo' | null>(null);

  // Métrica de Maestria (0-100%)

  // Métrica de Maestria (0-100%)
  const masteryScore = Math.min(100, Math.round(((state.englishLevel - 1) * 10) + (questionsAnswered * 0.1)));

  // Load questions from Supabase when learning opens or level changes
  useEffect(() => {
    if (showLearning && session?.user?.id) {
      loadQuestions(state.englishLevel);
    }
  }, [showLearning, state.englishLevel]);

  const loadQuestions = async (level: number) => {
    try {
      setCurrentQuestion('Carregando perguntas...');
      console.log(`Loading questions for level: ${level}`);
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('level', level)
        .order('id');

      if (error) {
        console.error("Error loading questions:", error);
        setCurrentQuestion(`Erro ao carregar perguntas: ${error.message}`);
        return;
      }

      if (data && data.length > 0) {
        // Embaralha as perguntas
        const shuffled = [...data].sort(() => Math.random() - 0.5);
        setQuestionBank(shuffled);
        showNextQuestion(shuffled, 0);
      } else {
        console.warn(`No questions found for level ${level}`);
        setCurrentQuestion(`Nenhuma pergunta encontrada para o nível ${level}. Verifique se o banco de dados foi populado.`);
        setQuizOptions(null);
      }
    } catch (err) {
      console.error("Unexpected error in loadQuestions:", err);
      setCurrentQuestion("Ocorreu um erro inesperado ao carregar perguntas.");
    }
  };

  const showNextQuestion = (bank: any[], index: number) => {
    if (bank.length === 0) return;
    const q = bank[index % bank.length];
    setCurrentQuestionData(q);
    setCurrentQuestion(q.question);
    setQuizOptions(typeof q.options === 'string' ? JSON.parse(q.options) : q.options);
  };

  // Carregar dados do currículo quando a tela de aprendizado é aberta
  useEffect(() => {
    if (currentView === 'LEARNING' && session?.user?.id) {
      const fetchCurriculum = async () => {
        try {
          // 1. Buscar unidades
          const { data: unitsData, error: unitsError } = await supabase
            .from('learning_units')
            .select('*')
            .order('order_index');

          if (unitsError) throw unitsError;

          // 2. Buscar lições
          const { data: lessonsData, error: lessonsError } = await supabase
            .from('learning_lessons')
            .select('*')
            .order('order_index');

          if (lessonsError) throw lessonsError;

          // 3. Buscar progresso do usuário
          const { data: progressData } = await supabase
            .from('user_lesson_progress')
            .select('*')
            .eq('user_id', session.user.id);

          // 4. Mapear estrutura e progressão linear
          let isNextLessonUnlocked = true; // A primeira lição é sempre liberada

          const mappedUnits = unitsData.map(unit => ({
            ...unit,
            lessons: lessonsData
              .filter(l => l.unit_id === unit.id)
              .map(lesson => {
                const progress = progressData?.find(p => p.lesson_id === lesson.id);
                const isCompleted = progress?.is_completed || false;

                // Define o status desta lição
                let currentStatus = 'locked';
                if (isCompleted) {
                  currentStatus = 'completed';
                } else if (isNextLessonUnlocked) {
                  currentStatus = 'unlocked';
                }

                // Se não completou esta, as próximas ficam bloqueadas
                isNextLessonUnlocked = isCompleted;

                return {
                  ...lesson,
                  status: currentStatus as 'completed' | 'unlocked' | 'locked',
                  mastery: progress?.mastery_score || 0
                };
              })
          }));
          setUnits(mappedUnits);

          // 5. Nivelamento Meritocrático: O English Level será rigidamente guiado pela quantidade de UNITS concluídas integralmente.
          let realLevel = 1;
          for (const u of mappedUnits) {
            const hasLessons = u.lessons && u.lessons.length > 0;
            const unitFullyCompleted = hasLessons && u.lessons.every(l => l.status === 'completed');
            if (unitFullyCompleted) realLevel++;
          }

          // Force state update Se houve descasamento entre farm e mérito real
          let newEvolutionStage: EvolutionStage = 'BABY';
          if (realLevel >= 61) newEvolutionStage = 'LEGENDARY';
          else if (realLevel >= 46) newEvolutionStage = 'ADULT';
          else if (realLevel >= 36) newEvolutionStage = 'YOUNG_ADULT';
          else if (realLevel >= 26) newEvolutionStage = 'MASTER_TEEN';
          else if (realLevel >= 16) newEvolutionStage = 'TEEN';
          else if (realLevel >= 6) newEvolutionStage = 'KIDS';

          setState(prev => {
            if (prev.englishLevel !== realLevel || prev.evolutionStage !== newEvolutionStage) {
              return {
                ...prev,
                englishLevel: realLevel,
                evolutionStage: newEvolutionStage
              };
            }
            return prev;
          });

        } catch (err) {
          console.error("Erro ao carregar currículo:", err);
        }
      };

      fetchCurriculum();
    }
  }, [currentView, session?.user?.id]);

  const handleStartLesson = async (lessonId: string) => {
    try {
      console.log(`[PIPO-DEBUG] Starting lesson ${lessonId} for user level ${state.englishLevel}`);

      let finalQuestions = [];

      try {
        // Tenta a Lógica Adaptativa: Filtra por dificuldade vs nível
        let query = supabase.from('learning_questions').select('*').eq('lesson_id', lessonId);

        if (state.englishLevel >= 12) {
          query = query.gte('difficulty_score', 12); // Nível B1
        } else if (state.englishLevel >= 6) {
          query = query.gte('difficulty_score', 6); // Nível A2
        } else {
          query = query.lte('difficulty_score', 5); // Nível A1 básico
        }

        const { data: questions, error } = await query;
        if (!error && questions && questions.length > 0) {
          finalQuestions = questions;
        }
      } catch (e) {
        console.warn("[PIPO-DEBUG] Adaptive query failed (missing columns?), falling back...", e);
      }

      // Fallback: se não houver questões no range específico ou a query falhou, pega qualquer uma da lição
      if (finalQuestions.length === 0) {
        console.log("[PIPO-DEBUG] No specific difficulty questions found, loading all lesson questions.");
        const { data: fallback, error: fbError } = await supabase.from('learning_questions').select('*').eq('lesson_id', lessonId);
        if (fbError) throw fbError;
        finalQuestions = fallback || [];
      }

      if (finalQuestions.length > 0) {
        // Shuffle e parse
        const parsedQuestions = finalQuestions
          .sort(() => Math.random() - 0.5)
          .slice(0, 8) // Max 8 questões por lição
          .map(q => ({
            ...q,
            content: typeof q.content === 'string' ? JSON.parse(q.content) : (q.content || {}),
            options: typeof q.options === 'string' ? JSON.parse(q.options) : (q.options || [])
          }));

        console.log(`[PIPO-DEBUG] Loaded ${parsedQuestions.length} questions. Switching to EXERCISE view.`);

        // Busca memoria de progresso desta lição
        const { data: progressData } = await supabase
          .from('user_lesson_progress')
          .select('answered_questions')
          .eq('user_id', session.user.id)
          .eq('lesson_id', lessonId)
          .single();

        setActiveAnsweredIds(progressData?.answered_questions || []);

        // Atualiza tudo junto para evitar re-renders parciais
        setSelectedLessonId(lessonId);
        setCurrentLessonQuestions(parsedQuestions);
        setLessonProgress(0);
        setIsReviewMode(false);
        setCurrentView('EXERCISE');
      } else {
        console.error("[PIPO-DEBUG] Error: No questions found for this lesson ID.");
        // Verificação final: se a tabela existe
        const { error: tableCheck } = await supabase.from('learning_questions').select('count', { count: 'exact', head: true });
        if (tableCheck) {
          alert("ERRO CRÍTICO: A tabela 'learning_questions' não existe! Você precisa rodar o script learning_migration.sql no Supabase.");
        } else {
          alert("ERRO: Lição sem questões. Verifique se o script learning_migration.sql rodou com sucesso até o fim.");
        }
      }
    } catch (err) {
      console.error("[PIPO-DEBUG] Fatal error starting lesson:", err);
      alert("Erro ao iniciar lição. Verifique o console do navegador.");
    }
  };

  const handleLessonComplete = async (stats: { score: number, xp: number }) => {
    console.log(`[PIPO-DEBUG] Lesson complete! ID: ${selectedLessonId}, Score: ${stats.score}, XP: ${stats.xp}`);
    try {
      if (!selectedLessonId) {
        console.error("[PIPO-DEBUG] Error: No lesson ID selected!");
        return;
      }

      // 1. Atualizar progresso no Supabase
      const { data, error } = await supabase
        .from('user_lesson_progress')
        .upsert({
          user_id: session.user.id,
          lesson_id: selectedLessonId,
          mastery_score: stats.score,
          is_completed: stats.score >= 80, // Passa com 80%+
          last_attempt_at: new Date().toISOString()
        })
        .select();

      if (error) {
        console.error("[PIPO-DEBUG] Error saving lesson progress:", error);
        throw error;
      }

      console.log("[PIPO-DEBUG] Progress saved successfully:", data);

      // 2. Atualizar estado local do pet (Felicidade) - O XP ja foi dado atomicamente
      setState(prev => {
        return {
          ...prev,
          happiness: Math.min(100, prev.happiness + 15),
        };
      });

      // 3. Sistema de Badges (Conquistas)
      const newBadges: string[] = [...state.badges];
      if (state.englishLevel >= 2 && !newBadges.includes('FIRST_STEP')) newBadges.push('FIRST_STEP');
      if (state.userStreak >= 3 && !newBadges.includes('STREAK_3')) newBadges.push('STREAK_3');
      if (state.englishLevel >= 10 && !newBadges.includes('A2_UNLOCKED')) newBadges.push('A2_UNLOCKED');
      if (state.lifetimeXP + stats.xp >= 500 && !newBadges.includes('XP_500')) newBadges.push('XP_500');

      if (newBadges.length > state.badges.length) {
        console.log("[PIPO-DEBUG] New Badges Earned!", newBadges.filter(b => !state.badges.includes(b)));
        setState(prev => ({ ...prev, badges: newBadges }));

        // Salvar badges no Supabase
        const badgePromises = newBadges
          .filter(b => !state.badges.includes(b))
          .map(b => supabase.from('user_badges').upsert({ user_id: session.user.id, badge_key: b }));
        await Promise.all(badgePromises);
      }

      setMessage(stats.score >= 80
        ? `Incrível! Você completou a lição com ${stats.score}%!`
        : `Bom esforço! Mas precisamos praticar mais essa lição.`);

      setCurrentView('LEARNING'); // Volta para o mapa
    } catch (err) {
      console.error("Erro ao salvar progresso:", err);
      setCurrentView('LEARNING');
    }
  };

  const handleAtomicAnswer = (questionId: string) => {
    if (!selectedLessonId) return;

    // 1. Atualizar a memória de curto prazo para que a questão não volte a aparecer
    const newAnswered = [...activeAnsweredIds, questionId];
    setActiveAnsweredIds(newAnswered);

    // 2. Salvar silenciosamente na nuvem a memória (para n repetir dps de F5)
    supabase.from('user_lesson_progress').upsert({
      user_id: session.user.id,
      lesson_id: selectedLessonId,
      answered_questions: newAnswered,
      last_attempt_at: new Date().toISOString()
    }).then(({ error }) => {
      if (error) console.error("Atomic save failed:", error);
    });

    // 3. Injetar +10 XP atomicamente e rodar roleta de LOOT aos 200 XP
    let itemMessage = "";
    setState(prev => {
      let newExp = (prev.englishExp || 0) + 10;
      let newInventory = Array.isArray(prev.inventory) ? [...prev.inventory] : [];

      if (newExp >= 200) {
        newExp -= 200;
        // Drop Loot (70% Common, 25% Rare, 5% Legendary)
        const rng = Math.random();
        const tier = rng < 0.05 ? 'LEGENDARY' : rng < 0.30 ? 'RARE' : 'COMMON';
        const randomItem = COLLECTIBLES[Math.floor(Math.random() * COLLECTIBLES.length)];
        const item = { ...randomItem, rarity: tier, foundAt: Date.now() };
        newInventory.push(item);
        itemMessage = `🎁 Loot Box! Pipo ganhou um(a) ${item.name} [${tier}] pelo seu esforço!`;
      }

      return {
        ...prev,
        englishExp: newExp,
        lifetimeXP: (prev.lifetimeXP || 0) + 10,
        inventory: newInventory,
        happiness: Math.min(100, prev.happiness + 2)
      };
    });
    if (itemMessage) setMessage(itemMessage);
  };

  const handleComboReach = () => {
    setState(prev => ({
      ...prev,
      englishExp: Math.min(200, (prev.englishExp || 0) + 50),
      lifetimeXP: (prev.lifetimeXP || 0) + 50,
      userStreak: (prev.userStreak || 0) + 1
    }));
    setMessage("🔥 COMBO DE OURO (7)! +50 XP e +1 Streak!");

    // Atualizar last_lesson_date to NOW para salvar o dia
    supabase.from('game_state').upsert({
      user_id: session.user.id,
      last_lesson_date: new Date().toISOString()
    }, { onConflict: 'user_id' }).then();
  };

  // Save state to localStorage and Supabase
  useEffect(() => {
    localStorage.setItem('neo_pet_state', JSON.stringify(state));
    if (session?.user?.id) {
      const updateData: any = {
        user_id: session.user.id,
        hunger: Math.round(state.hunger),
        happiness: Math.round(state.happiness),
        energy: Math.round(state.energy),
        health: Math.round(state.health),
        evolution_stage: { 'EGG': 0, 'BABY': 1, 'KIDS': 2, 'TEEN': 3, 'MASTER_TEEN': 4, 'YOUNG_ADULT': 5, 'ADULT': 6, 'LEGENDARY': 7 }[state.evolutionStage] || 1,
        inventory: Array.isArray(state.inventory) ? state.inventory : [],
        equipped_items: Array.isArray(state.equippedItems) ? state.equippedItems : [],
        placed_items: Array.isArray(state.placedItems) ? state.placedItems : [],
        english_level: Number(state.englishLevel) || 1,
        english_points: Math.round(Number(state.englishExp) || 0),
        lifetime_xp: Math.round(Number(state.lifetimeXP) || 0),
        fitness: Math.round(Number(state.fitness) || 50),
        birthday: state.birthday || Date.now(),
        farm_plots: Array.isArray(state.farmPlots) ? state.farmPlots : [],
        updated_at: new Date().toISOString()
      };

      supabase.from('game_state').upsert(updateData, { onConflict: 'user_id' })
        .then(({ error }) => {
          // Silencia o erro de coluna faltando para não poluir o console, mas avisa o usuário uma vez
          if (error && error.code !== 'PGRST204') {
            console.error("Error syncing state", error);
          }
        });
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
        let newFitness = Math.max(0, (prev.fitness || 50) - diff * (DECAY_RATES.fitness || 0.00008));

        // O inventário não enche mais aleatoriamente, apenas com acertos via XP! (Mecânica removida abaixo)
        let newInventory = Array.isArray(prev.inventory) ? [...prev.inventory] : [];
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
          fitness: newFitness,
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
      let hungerGain = 0;
      let energyGain = 0;
      let healthGain = 0;
      let happinessGain = 0;

      switch (food) {
        // BABY
        case 'MILK': hungerGain = 30; energyGain = 10; break;
        case 'PORRIDGE_BANANA': hungerGain = 25; break;
        case 'CARROT_MASH': hungerGain = 15; healthGain = 10; break;
        case 'MILK_COOKIE': hungerGain = 20; healthGain = -5; break;
        // KIDS
        case 'APPLE': hungerGain = 15; healthGain = 5; break;
        case 'NATURAL_JUICE': hungerGain = 10; energyGain = 15; break;
        case 'KIDS_PASTA': hungerGain = 30; happinessGain = 10; break;
        case 'ICE_CREAM': happinessGain = 20; healthGain = -10; break;
        // TEEN
        case 'PIZZA': hungerGain = 40; energyGain = -10; happinessGain = 20; break;
        case 'BURGER': hungerGain = 45; healthGain = -10; happinessGain = 15; break;
        case 'GRAPE_JUICE': healthGain = 15; energyGain = 10; break;
        case 'ACAI_BOWL': hungerGain = 20; healthGain = 10; break;
        // MASTER_TEEN
        case 'NATURAL_SANDWICH': hungerGain = 30; healthGain = 10; break;
        case 'SNACKS': happinessGain = 15; healthGain = -10; break;
        case 'ENERGY_DRINK': energyGain = 50; healthGain = -15; break;
        case 'CHICKEN_SALAD': hungerGain = 35; healthGain = 15; break;
        // YOUNG_ADULT
        case 'CARBONARA': hungerGain = 50; energyGain = -15; happinessGain = 20; break;
        case 'COFFEE': energyGain = 40; break;
        case 'POKE_BOWL': hungerGain = 30; healthGain = 15; break;
        case 'CAESAR_SALAD': hungerGain = 20; healthGain = 15; break;
        // ADULT
        case 'STEAK': hungerGain = 60; break;
        case 'QUINOA_SALAD': hungerGain = 25; healthGain = 20; break;
        case 'CHAMOMILE_TEA': happinessGain = 20; energyGain = 10; break;
        case 'VEGGIE_SOUP': hungerGain = 30; healthGain = 15; break;
        // LEGENDARY
        case 'NECTAR': hungerGain = 100; happinessGain = 100; energyGain = 100; healthGain = 100; break;
        case 'GOLDEN_APPLE': healthGain = 100; break;
        case 'ELVEN_BREAD': hungerGain = 100; break;
        case 'SPRING_WATER': energyGain = 100; healthGain = 100; break;
        default: hungerGain = 15; break;
      }

      // Default happiness gain if it wasn't specified (to match old behavior where hungerGain == happinessGain loosely)
      if (happinessGain === 0 && hungerGain > 0) {
        happinessGain = hungerGain / 2;
      }

      return {
        ...prev,
        hunger: Math.min(100, prev.hunger + hungerGain),
        happiness: Math.min(100, Math.max(0, prev.happiness + happinessGain)),
        energy: Math.min(100, Math.max(0, prev.energy + energyGain)),
        health: Math.min(100, Math.max(0, prev.health + healthGain))
      };
    });

    const foodNames: Record<FoodType, string> = {
      MILK: 'uma mamadeira', PORRIDGE_BANANA: 'uma papinha', CARROT_MASH: 'um purê de cenoura', MILK_COOKIE: 'um biscoito de leite',
      APPLE: 'uma maçã', NATURAL_JUICE: 'um suco natural', KIDS_PASTA: 'um macarrãozinho', ICE_CREAM: 'um sorvete',
      PIZZA: 'uma fatia de pizza', BURGER: 'um hambúrguer', GRAPE_JUICE: 'um suco de uva', ACAI_BOWL: 'um açaí bem gelado',
      NATURAL_SANDWICH: 'um sanduíche natural', SNACKS: 'um salgadinho', ENERGY_DRINK: 'um energético', CHICKEN_SALAD: 'uma salada com frango',
      CARBONARA: 'um belo carbonara', COFFEE: 'um café super forte', POKE_BOWL: 'um poke de salmão', CAESAR_SALAD: 'uma caesar salad',
      STEAK: 'um bife angus', QUINOA_SALAD: 'uma salada vegana', CHAMOMILE_TEA: 'um chá de camomila', VEGGIE_SOUP: 'uma sopa de legumes',
      NECTAR: 'o manjar dos deuses', GOLDEN_APPLE: 'a cobiçada fruta de ouro', ELVEN_BREAD: 'uma fatia de pão élfico', SPRING_WATER: 'água pura da fonte'
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

  const handleArcadeSelect = (gameId: 'NONE' | 'TENNIS' | 'BOUNCE' | 'BALL_PIT' | 'PONG' | 'ASTEROIDS' | 'SNAKE' | 'TETRIS' | 'PIPOMAN' | 'WORMS' | 'FARM', isToy?: boolean) => {
    setActiveGame(gameId as typeof activeGame);
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
        case 'GYM':
          return {
            ...prev,
            fitness: Math.min(100, (prev.fitness || 0) + 15),
            energy: Math.max(0, prev.energy - 20),
            hunger: Math.max(0, prev.hunger - 10),
          };
        default:
          return prev;
      }
    });

    if (type === 'GYM') {
      setMessage("Ufa! Pipo está ficando forte! 💪");
      playSound('PLAY'); // Or a custom gym sound if we had one
    }

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
    // Streak tracking
    const newStreak = isCorrect ? correctStreak + 1 : 0;
    setCorrectStreak(newStreak);

    let xpGained = isCorrect ? 5 : 0;

    // Feedback instantâneo + animação
    if (isCorrect) {
      // Combo de 7!
      if (newStreak > 0 && newStreak % 7 === 0) {
        setQuizFeedback('combo');
        xpGained += 50; // Bônus Duolingo Style
        setMessage(`🔥🔥🔥 MEGA COMBO x${newStreak}! BÔNUS +50 XP! ${currentQuestionData.explanation}`);
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

    // Limpa animação após delay (Aumentado para o usuário conseguir ver)
    setTimeout(() => setQuizFeedback(null), isCorrect && newStreak % 7 === 0 ? 3000 : 2000);

    // Atualiza estado
    const nextIndex = questionsAnswered + 1;
    setQuestionsAnswered(nextIndex);
    setUserInput("");

    setState(prev => {
      let newExp = prev.englishExp + xpGained;
      let newInventory = [...prev.inventory];
      let newHappiness = Math.min(100, prev.happiness + (isCorrect ? 10 : 2));
      let itemMessage = "";

      if (newExp >= 200) {
        newExp -= 200;
        // Drop Loot 
        const rarityRoll = Math.random();
        let tier: 'common' | 'rare' | 'epic' = rarityRoll > 0.95 ? 'epic' : rarityRoll > 0.7 ? 'rare' : 'common';
        const randomItem = COLLECTIBLES[Math.floor(Math.random() * COLLECTIBLES.length)];
        const newItem: Collectible = { ...randomItem, rarity: tier, foundAt: Date.now() };
        newInventory.push(newItem);
        setNewlyFoundItem(newItem);
        itemMessage = `🎁 Loot Drop Grátis! Pipo achou um(a) ${newItem.name} [${tier}]!`;
      }

      // Limpa XP excedente do antigo max=100
      if (newExp >= 200) newExp = 199;

      return {
        ...prev,
        englishExp: newExp,
        inventory: newInventory,
        happiness: newHappiness
      };
    });

    // Próxima pergunta (Aumentado o delay para ler o feedback)
    setTimeout(() => {
      showNextQuestion(questionBank, nextIndex);
    }, 2500);

    // Atualiza todo o estado no Supabase (background)
    if (session?.user?.id) {
      supabase.from('game_state').update({
        last_lesson_date: new Date().toISOString(),
        streak_days: (state.userStreak || 0) + (questionsAnswered === 0 ? 1 : 0),
        inventory: state.inventory,
        english_level: state.englishLevel,
        english_points: state.englishExp,
        evolution_stage: state.evolutionStage === 'LEGENDARY' ? 4 : state.evolutionStage === 'ADULT' ? 3 : state.evolutionStage === 'TEEN' ? 2 : state.evolutionStage === 'BABY' ? 1 : 0
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
    <div className="flex flex-col gap-1 w-full">
      <div className="flex justify-between items-center text-[7px] font-bold text-gray-600 uppercase tracking-widest">
        <div className="flex items-center gap-1">
          <Icon size={8} />
          {label}
        </div>
        <span>{Math.round(value)}</span>
      </div>
      <div className="h-3 bg-gray-200 border-2 border-black overflow-hidden relative">
        <div
          className={cn("h-full transition-all duration-500", color)}
          style={{
            width: `${value}%`,
            boxShadow: 'inset -2px 0px 0px 0px rgba(0,0,0,0.2)'
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
    <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center p-4 pb-12 font-pixel text-gray-900">
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

      {/* Mini Games Overlays */}
      <AnimatePresence>
        {activeGame === 'SNAKE' && <PipoSnake onClose={() => setActiveGame('NONE')} />}
        {activeGame === 'TETRIS' && <PipoTetris onClose={() => setActiveGame('NONE')} />}
        {activeGame === 'ASTEROIDS' && <PipoAsteroids onClose={() => setActiveGame('NONE')} />}
        {activeGame === 'FARM' && (
          <PipoFarm
            evolutionStage={state.evolutionStage}
            farmPlots={state.farmPlots && state.farmPlots.length > 0 ? state.farmPlots : createEmptyFarmPlots()}
            onUpdatePlots={(plots) => setState(prev => ({ ...prev, farmPlots: plots }))}
            onHarvest={(cropName, cropEmoji, effect) => {
              setState(prev => ({
                ...prev,
                hunger: Math.min(100, prev.hunger + effect.hunger),
                health: Math.min(100, prev.health + effect.health),
                energy: Math.min(100, prev.energy + effect.energy),
              }));
              setMessage(`Pipo comeu ${cropName} ${cropEmoji} fresquinho da horta!`);
            }}
            onClose={() => setActiveGame('NONE')}
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
            <div className="bg-white p-6 border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <h2 className="text-xl font-bold mb-6 uppercase text-center border-b-4 border-black pb-4">📖 Guia de Sobrevivência</h2>

              <div className="space-y-3 mb-8 bg-gray-100 p-4 border-4 border-black">
                <h3 className="font-bold text-xs uppercase text-gray-500 mb-2">📊 Status Atual</h3>
                <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-2">
                  <span className="text-[10px] uppercase font-bold text-gray-600">Estágio</span>
                  <span className="text-[10px] uppercase font-bold text-blue-600">{state.evolutionStage}</span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-2">
                  <span className="text-[10px] uppercase font-bold text-gray-600">Nível Escolar</span>
                  <span className="text-[10px] uppercase font-bold text-green-600">Lv. {state.englishLevel}</span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-2">
                  <span className="text-[10px] uppercase font-bold text-gray-600">Experiência (XP)</span>
                  <span className="text-[10px] uppercase font-bold text-yellow-600">{state.lifetimeXP} XP</span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-2">
                  <span className="text-[10px] uppercase font-bold text-gray-600">Ofensiva (Streak)</span>
                  <span className="text-[10px] uppercase font-bold text-orange-500">🔥 {state.userStreak || 0} dias</span>
                </div>
                <div className="flex justify-between items-center border-b-2 border-dashed border-gray-300 pb-2">
                  <span className="text-[10px] uppercase font-bold text-gray-600">Colecionáveis</span>
                  <span className="text-[10px] uppercase font-bold text-purple-600">🎁 {state.inventory.length} itens</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] uppercase font-bold text-gray-600">Dias de Vida</span>
                  <span className="text-[10px] uppercase font-bold">{Math.floor((Date.now() - state.birthday) / (1000 * 60 * 60 * 24))} dias</span>
                </div>
              </div>

              <div className="space-y-6 text-[10px] text-gray-700 leading-relaxed mb-8">

                <section>
                  <h3 className="font-bold uppercase text-xs mb-2 flex items-center gap-2">
                    <span className="text-lg">🎓</span> Evolução e Aulas
                  </h3>
                  <p>Seu Pipo só cresce e muda de cenário quando você estuda! Você sobe de <strong>Nível Escolar</strong> unicamente ao completar novas <strong className="text-green-600">Units</strong>. Ao atingir marcos de Nível, a idade e o quarto do Pipo evoluem visualmente.</p>
                </section>

                <section>
                  <h3 className="font-bold uppercase text-xs mb-2 flex items-center gap-2">
                    <span className="text-lg">🎁</span> A Barra de XP e Drops
                  </h3>
                  <p>A barra de XP verde <strong>não sobe o seu nível!</strong> Ela conta seu XP de esforço. Toda vez que você junta <strong>200 XP</strong> acertando questões, a barra zera e o Pipo ganha um <strong>Drop Grátis</strong> (um item colecionável) em uma de três raridades:</p>
                  <ul className="mt-2 pl-4 space-y-1">
                    <li>🤍 <strong className="text-gray-500">Comum</strong> (Frequente)</li>
                    <li>💙 <strong className="text-blue-500">Raro</strong> (Difícil)</li>
                    <li>💜 <strong className="text-purple-600">Épico</strong> (Muito Raro!)</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-bold uppercase text-xs mb-2 flex items-center gap-2">
                    <span className="text-lg">🍔</span> Cardápio Inteligente
                  </h3>
                  <p>Injetar Pizza todo dia faz mal! O menu do Pipo se adapta à idade atual dele. Comidas saudáveis dão bônus fortes de Saúde, enquanto Junk Foods sobem a Felicidade num pulo, mas prejudicam a imunidade dele.</p>
                </section>

                <section className="bg-yellow-100 p-3 border-4 border-black mt-4">
                  <h3 className="font-bold uppercase text-xs mb-2">❤️ Mantendo-o Vivo</h3>
                  <ul className="space-y-2">
                    <li className="flex gap-2">🍎 <strong>Alimentar:</strong> Essencial para Fome e Vida.</li>
                    <li className="flex gap-2">⚽ <strong>Brincar:</strong> Sobe Humor intensamente.</li>
                    <li className="flex gap-2">🌙 <strong>Dormir:</strong> Recupera Energia gasta.</li>
                    <li className="flex gap-2">🧹 <strong>Limpar:</strong> Essencial para voltar a estudar e ter Saúde.</li>
                  </ul>
                </section>

              </div>

              <button
                onClick={() => setShowInfo(false)}
                className="w-full py-4 bg-yellow-400 border-4 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                Entendido!
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Game Area */}
      <main className="w-full max-w-md flex flex-col items-center gap-4 flex-1">
        {/* Stats Card */}
        <div className="w-full bg-white border-4 border-black p-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-bold uppercase text-gray-400">Lv.{state.englishLevel}</span>
              <div className="h-1.5 w-16 bg-gray-100 border border-black overflow-hidden relative">
                <div
                  className="h-full bg-green-400 transition-all duration-300"
                  style={{ width: `${Math.min(100, Math.max(0, (state.englishExp / 200) * 100))}%` }}
                />
              </div>
              <span className="text-[8px] font-bold text-gray-500" title="XP para o próximo Loot!">{state.englishExp}/200 XP</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[8px] font-bold uppercase text-blue-500">Total: {state.lifetimeXP} XP</span>
              <div className="flex -space-x-1">
                {(state.badges || []).slice(0, 3).map(b => (
                  <div key={b} className="w-4 h-4 bg-yellow-400 border border-black rounded-full flex items-center justify-center text-[8px] shadow-sm" title={b}>
                    🏆
                  </div>
                ))}
              </div>
            </div>
            <div className={cn(
              "px-1.5 py-0 text-[7px] font-bold uppercase border-2 border-black",
              state.evolutionStage === 'BABY' ? 'bg-yellow-100' :
                state.evolutionStage === 'KIDS' ? 'bg-orange-300' :
                  state.evolutionStage === 'TEEN' ? 'bg-lime-400' :
                    state.evolutionStage === 'MASTER_TEEN' ? 'bg-fuchsia-400 text-white' :
                      state.evolutionStage === 'YOUNG_ADULT' ? 'bg-blue-600 text-white italic' :
                        state.evolutionStage === 'ADULT' ? 'bg-slate-700 text-white' :
                          'bg-gradient-to-r from-yellow-300 to-yellow-500 animate-pulse drop-shadow-[0_0_2px_rgba(255,215,0,0.8)]'
            )}>
              {state.evolutionStage}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-x-2 gap-y-1">
            <StatBar label="HP" value={state.health} icon={Heart} color="bg-red-500" />
            <StatBar label="Fome" value={state.hunger} icon={Utensils} color="bg-orange-500" />
            <StatBar label="Humor" value={state.happiness} icon={Gamepad2} color="bg-blue-500" />
            <StatBar label="NRG" value={state.energy} icon={Sun} color="bg-yellow-500" />
            <StatBar label="Musculo" value={state.fitness} icon={Dumbbell} color="bg-emerald-500" />
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

        {/* Pet Display (Continuous, no frame) */}
        <div className="relative flex-1 flex flex-col items-center w-full pt-24">

          {/* ═══════════════════════════════════════════════════════ */}
          {/* CENÁRIO EVOLUTIVO — Background do quarto por fase     */}
          {/* Tudo com opacity ≤ 0.4 (mín 60% transparência)       */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2] rounded-2xl">

            {/* ── BABY: Berçário pastel ── */}
            {state.evolutionStage === 'BABY' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-pink-200/40 to-sky-200/40" />
                {/* Nuvens flutuantes */}
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={`cloud-b-${i}`}
                    className="absolute opacity-[0.35]"
                    style={{ top: `${15 + i * 18}%` }}
                    animate={{ x: [-80, 500] }}
                    transition={{ duration: 30 + i * 8, repeat: Infinity, ease: "linear", delay: i * 4 }}
                  >
                    <div className="w-20 h-8 bg-white rounded-full relative">
                      <div className="absolute -top-3 left-4 w-10 h-8 bg-white rounded-full" />
                      <div className="absolute -top-1 left-8 w-8 h-7 bg-white rounded-full" />
                    </div>
                  </motion.div>
                ))}
                {/* Estrelinhas piscando */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={`star-b-${i}`}
                    className="absolute w-2 h-2 bg-yellow-400 rounded-full"
                    style={{ top: `${10 + Math.random() * 60}%`, left: `${5 + Math.random() * 90}%` }}
                    animate={{ opacity: [0.15, 0.4, 0.15], scale: [0.8, 1.3, 0.8] }}
                    transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: i * 0.6 }}
                  />
                ))}
                {/* Bloquinhos de brinquedo no chão */}
                <div className="absolute bottom-4 left-6 flex gap-2 opacity-[0.35]">
                  <div className="w-5 h-5 bg-red-400 border-2 border-red-600 rounded-sm" />
                  <div className="w-5 h-5 bg-yellow-400 border-2 border-yellow-600 rounded-sm" />
                  <div className="w-5 h-5 bg-blue-400 border-2 border-blue-600 rounded-sm" />
                </div>
              </>
            )}

            {/* ── KIDS: Playground / Parque ── */}
            {state.evolutionStage === 'KIDS' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-sky-100/35 to-green-200/40" />
                {/* Gramado pixelado no rodapé */}
                <div className="absolute bottom-0 inset-x-0 h-14 bg-green-500/30 border-t-2 border-green-600/25" />
                <div className="absolute bottom-12 inset-x-0 flex justify-around opacity-[0.3]">
                  {[...Array(12)].map((_, i) => (
                    <div key={`grass-${i}`} className="w-1.5 bg-green-600 rounded-t-full" style={{ height: `${10 + Math.random() * 14}px` }} />
                  ))}
                </div>
                {/* Árvore estilizada */}
                <div className="absolute bottom-12 right-6 opacity-[0.3]">
                  <div className="w-4 h-14 bg-amber-700 mx-auto" />
                  <div className="w-18 h-16 bg-green-500 rounded-full -mt-5 mx-auto" />
                  <div className="w-14 h-12 bg-green-600 rounded-full -mt-9 mx-auto ml-1" />
                </div>
                {/* Borboletas voando */}
                {[...Array(3)].map((_, i) => (
                  <motion.div
                    key={`bfly-${i}`}
                    className="absolute text-base opacity-[0.4]"
                    style={{ top: `${20 + i * 20}%` }}
                    animate={{ x: [0, 120, 60, 200, 0], y: [0, -30, 10, -20, 0] }}
                    transition={{ duration: 12 + i * 3, repeat: Infinity, ease: "easeInOut", delay: i * 2 }}
                  >
                    🦋
                  </motion.div>
                ))}
                {/* Sol no canto */}
                <div className="absolute top-3 right-4 w-12 h-12 bg-yellow-300/35 rounded-full blur-sm" />
              </>
            )}

            {/* ── TEEN: Quarto de Adolescente ── */}
            {state.evolutionStage === 'TEEN' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-300/25 to-blue-200/30" />
                {/* Pôsters na "parede" */}
                <div className="absolute top-6 left-3 w-10 h-12 bg-red-400/30 border-2 border-red-500/25 rounded-sm" />
                <div className="absolute top-4 left-16 w-12 h-9 bg-blue-400/30 border-2 border-blue-500/25 rounded-sm" />
                <div className="absolute top-8 right-4 w-11 h-13 bg-purple-400/30 border-2 border-purple-500/25 rounded-sm" />
                {/* Faixa de LED neon na borda superior */}
                <motion.div
                  className="absolute top-0 inset-x-0 h-1.5"
                  animate={{ opacity: [0.25, 0.5, 0.25] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="w-full h-full bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-400" />
                </motion.div>
                {/* Fones pendurados */}
                <div className="absolute top-20 right-3 opacity-[0.3]">
                  <div className="w-6 h-1.5 bg-gray-700 rounded-full" />
                  <div className="w-4 h-5 bg-gray-600 rounded-b-lg ml-0.5" />
                </div>
              </>
            )}

            {/* ── MASTER TEEN: Setup Gamer ── */}
            {state.evolutionStage === 'MASTER_TEEN' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-purple-900/25 to-blue-900/30" />
                {/* Luzes RGB nas bordas */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{ boxShadow: 'inset 0 0 40px rgba(139,92,246,0.25), inset 0 0 80px rgba(59,130,246,0.12)' }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Partículas de pixels roxos flutuantes */}
                {[...Array(10)].map((_, i) => (
                  <motion.div
                    key={`pixel-${i}`}
                    className="absolute w-1.5 h-1.5 bg-purple-400 rounded-sm"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    animate={{ y: [0, -40, 0], opacity: [0.15, 0.4, 0.15] }}
                    transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: i * 0.5 }}
                  />
                ))}
                {/* Monitor/tela ao fundo */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-16 border-2 border-gray-600/30 rounded-sm bg-gray-900/15">
                  <motion.div
                    className="w-full h-full bg-gradient-to-br from-blue-500/15 to-purple-500/15"
                    animate={{ opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </div>
                {/* Controle no chão */}
                <div className="absolute bottom-6 left-8 opacity-[0.3] text-xl">🎮</div>
              </>
            )}

            {/* ── YOUNG ADULT: Escritório / Biblioteca ── */}
            {state.evolutionStage === 'YOUNG_ADULT' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 to-orange-100/30" />
                {/* Estante de livros na lateral */}
                <div className="absolute top-8 left-2 flex flex-col gap-0.5 opacity-[0.35]">
                  {[['bg-red-400', 'h-6'], ['bg-blue-400', 'h-5'], ['bg-green-500', 'h-7'], ['bg-yellow-500', 'h-5'], ['bg-purple-400', 'h-6']].map(([color, height], i) => (
                    <div key={`book-${i}`} className={`w-4 ${height} ${color} rounded-r-sm border-r-2 border-black/15`} />
                  ))}
                </div>
                <div className="absolute top-8 left-8 flex flex-col gap-0.5 opacity-[0.3]">
                  {[['bg-orange-400', 'h-7'], ['bg-teal-400', 'h-5'], ['bg-pink-400', 'h-6']].map(([color, height], i) => (
                    <div key={`book2-${i}`} className={`w-4 ${height} ${color} rounded-r-sm border-r-2 border-black/15`} />
                  ))}
                </div>
                {/* Xícara de café */}
                <div className="absolute bottom-8 right-6 opacity-[0.35] text-lg">☕</div>
                {/* Luminária */}
                <div className="absolute top-10 right-4 opacity-[0.3]">
                  <div className="w-1.5 h-12 bg-gray-600 mx-auto" />
                  <div className="w-10 h-5 bg-yellow-300/70 rounded-t-full -mt-1" />
                  <motion.div
                    className="absolute top-8 -left-1 w-12 h-20 bg-yellow-200/25 rounded-b-full blur-sm"
                    animate={{ opacity: [0.2, 0.35, 0.2] }}
                    transition={{ duration: 5, repeat: Infinity }}
                  />
                </div>
                {/* Post-its */}
                <div className="absolute top-6 right-18 w-5 h-5 bg-yellow-300/35 border border-yellow-500/25 rotate-3" />
                <div className="absolute top-11 right-16 w-5 h-5 bg-pink-300/35 border border-pink-500/25 -rotate-6" />
              </>
            )}

            {/* ── ADULT: Loft Elegante ── */}
            {state.evolutionStage === 'ADULT' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800/20 to-gray-600/25" />
                {/* Janela panorâmica com skyline */}
                <div className="absolute top-4 left-1/2 -translate-x-1/2 w-44 h-22 border-2 border-gray-500/25 rounded-sm bg-gradient-to-b from-indigo-900/20 to-orange-300/15 overflow-hidden">
                  {/* Prédios do skyline */}
                  <div className="absolute bottom-0 inset-x-0 flex items-end justify-around px-1 opacity-[0.4]">
                    <div className="w-3 h-8 bg-gray-700" />
                    <div className="w-4 h-12 bg-gray-600" />
                    <div className="w-2 h-6 bg-gray-700" />
                    <div className="w-5 h-14 bg-gray-500" />
                    <div className="w-3 h-10 bg-gray-600" />
                    <div className="w-4 h-7 bg-gray-700" />
                    <div className="w-2 h-9 bg-gray-600" />
                  </div>
                </div>
                {/* Chão com textura de madeira */}
                <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-b from-amber-800/20 to-amber-900/30 border-t-2 border-amber-700/20" />
                {/* Planta moderna */}
                <div className="absolute bottom-10 left-4 opacity-[0.3]">
                  <div className="w-5 h-6 bg-gray-500 rounded-sm mx-auto" />
                  <div className="w-2.5 h-8 bg-green-700 mx-auto -mt-1" />
                  <div className="w-8 h-6 bg-green-500 rounded-full -mt-4 mx-auto" />
                </div>
                {/* Relógio de parede */}
                <div className="absolute top-8 right-6 w-8 h-8 border-2 border-gray-500/30 rounded-full bg-white/10 flex items-center justify-center opacity-[0.35]">
                  <div className="w-0.5 h-2.5 bg-gray-600 absolute origin-bottom -rotate-45" />
                  <div className="w-0.5 h-2 bg-gray-600 absolute origin-bottom rotate-90" />
                </div>
              </>
            )}

            {/* ── LEGENDARY: Templo Dourado / Salão do Trono ── */}
            {state.evolutionStage === 'LEGENDARY' && (
              <>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 via-amber-900/20 to-yellow-600/30" />
                {/* Glow dourado nas bordas */}
                <motion.div
                  className="absolute inset-0 rounded-2xl"
                  style={{ boxShadow: 'inset 0 0 50px rgba(255,215,0,0.2), inset 0 0 100px rgba(255,215,0,0.1)' }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                {/* Pilares dourados nas laterais */}
                <div className="absolute left-1 top-4 bottom-4 w-4 bg-gradient-to-b from-yellow-600/30 via-yellow-400/25 to-yellow-600/30 rounded-full" />
                <div className="absolute right-1 top-4 bottom-4 w-4 bg-gradient-to-b from-yellow-600/30 via-yellow-400/25 to-yellow-600/30 rounded-full" />
                {/* Tapete vermelho */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-28 h-full bg-gradient-to-t from-red-700/25 via-red-600/15 to-transparent" />
                {/* Partículas douradas flutuantes */}
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={`gold-${i}`}
                    className="absolute w-1.5 h-1.5 bg-yellow-400 rounded-full"
                    style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%` }}
                    animate={{ y: [0, -30, 0], opacity: [0.15, 0.4, 0.15], scale: [0.8, 1.4, 0.8] }}
                    transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay: i * 0.4 }}
                  />
                ))}
              </>
            )}
          </div>

          {/* Darkness Overlay (Selective for the room only) */}
          <AnimatePresence>
            {state.isSleeping && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-[#000033] z-[25] pointer-events-none rounded-2xl"
              />
            )}
          </AnimatePresence>

          {/* Sleep Toggle (Moon/Sun) */}
          <motion.button
            className="absolute top-2 right-2 z-[40] w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/30 border-2 border-black/5 rounded-full backdrop-blur-[2px] transition-colors shadow-sm group"
            onClick={() => handleAction('SLEEP')}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-lg drop-shadow-[1px_1px_0px_rgba(0,0,0,0.1)]">
              {state.isSleeping ? '☀️' : '🌙'}
            </span>
            <span className="absolute top-10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[5px] font-bold uppercase bg-white border border-black px-1 pointer-events-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              {state.isSleeping ? 'Acordar' : 'Dormir'}
            </span>
          </motion.button>

          {/* Skin Toggle */}
          <motion.button
            className="absolute top-12 right-2 z-[40] w-8 h-8 flex items-center justify-center bg-white/10 hover:bg-white/30 border-2 border-black/5 rounded-full backdrop-blur-[2px] transition-colors shadow-sm group"
            onClick={() => {
              const colors = ["bg-[#8B5E3C]", "bg-pink-300", "bg-purple-400", "bg-emerald-400", "bg-red-500", "bg-blue-400"];
              setState(prev => {
                const currentIndex = prev.skinColor ? colors.indexOf(prev.skinColor) : 0;
                const nextIndex = (currentIndex + 1) % colors.length;
                return { ...prev, skinColor: colors[nextIndex] };
              });
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="text-lg drop-shadow-[1px_1px_0px_rgba(0,0,0,0.1)]">
              🎨
            </span>
            <span className="absolute top-10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-[5px] font-bold uppercase bg-white border border-black px-1 pointer-events-none shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
              Trocar Cor
            </span>
          </motion.button>

          {/* Placed Scenery Items */}
          {state.placedItems?.map((placed, idx) => (
            <motion.div
              key={placed.id + idx}
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
              className="absolute text-5xl cursor-grab active:cursor-grabbing z-[5] hover:scale-110 active:scale-95 transition-transform group"
              title="Arraste para mover"
            >
              {placed.icon}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setState(prev => ({
                    ...prev,
                    placedItems: prev.placedItems.filter(p => (p.instanceId || p.id) !== (placed.instanceId || placed.id))
                  }));
                }}
                className="absolute -top-4 -right-4 w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600"
              >
                X
              </button>
            </motion.div>
          ))}

          {/* Wrapper for Pipo and his Bubbles */}
          <div className="relative">
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

            {/* Speech Bubble / Learning Interface - Anchored to Head */}
            <AnimatePresence mode="wait">
              {message && !showLearning && (
                <motion.div
                  key="message-bubble"
                  drag
                  dragMomentum={false}
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 20 }}
                  className="absolute bottom-full mb-8 left-1/2 -translate-x-1/2 bg-white px-4 py-3 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] min-w-[180px] text-center z-20 cursor-grab active:cursor-grabbing"
                >
                  <p className="text-[10px] font-bold leading-relaxed pointer-events-none">{message}</p>
                  <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-r-4 border-b-4 border-black rotate-45" />
                </motion.div>
              )}

              {showLearning && (
                <motion.div
                  key="learning-bubble"
                  drag
                  dragMomentum={false}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 w-full max-w-[280px] z-30 px-4 cursor-grab active:cursor-grabbing"
                >
                  <div className={cn(
                    "bg-white w-full border-4 p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative transition-colors duration-300",
                    quizFeedback === 'correct' ? 'border-green-500 bg-green-50' :
                      quizFeedback === 'combo' ? 'border-yellow-500 bg-yellow-50' :
                        quizFeedback === 'wrong' ? 'border-red-500 bg-red-50' :
                          'border-black'
                  )}>
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-[8px] font-bold uppercase text-blue-600">English Lesson</span>
                        <span className="text-[8px] font-bold bg-orange-100 border border-orange-400 px-1.5 py-0.5 text-orange-600 flex items-center gap-1">
                          ⚡ {correctStreak} {correctStreak >= 7 && "🔥"}
                        </span>
                      </div>
                      <button onClick={() => setShowLearning(false)} className="text-[8px] font-bold uppercase hover:text-red-500">Close</button>
                    </div>

                    <div className="flex justify-between items-end mb-1">
                      <span className="text-[7px] font-black uppercase text-gray-500">Level {state.englishLevel}</span>
                      <span className="text-[7px] font-black uppercase">{masteryScore}% Proficiency</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex-1 bg-gray-200 h-2 border border-black overflow-hidden relative">
                        <div
                          className="bg-blue-500 h-full transition-all duration-1000"
                          style={{ width: `${masteryScore}%` }}
                        >
                          <div className="absolute inset-0 bg-white/20 animate-pulse" />
                        </div>
                      </div>
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

                    {!quizFeedback && quizOptions && quizOptions.length > 0 && state.englishLevel < 3 ? (
                      <div className="grid grid-cols-1 gap-2">
                        {quizOptions.map((opt, i) => (
                          <button
                            key={i}
                            onClick={() => handleQuizAnswer(opt)}
                            className="w-full py-2 px-3 bg-white border-2 border-black text-[9px] font-bold text-left hover:bg-blue-50 active:translate-y-0.5 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none"
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
        </div>

        {/* Controls */}
        <div className="w-full grid grid-cols-5 gap-2 mb-2 items-stretch">
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
            onClick={() => handleAction('CLEAN')}
            icon={<Trash2 size={20} />}
            label="Limpar"
            color="bg-green-400"
            disabled={state.health <= 0 || state.poopCount === 0}
          />
          <ActionButton
            onClick={() => setCurrentView('LEARNING')}
            icon={<MessageCircle size={20} />}
            label="Aprender"
            color="bg-yellow-400"
            disabled={state.health <= 0}
          />
          <ActionButton
            onClick={() => handleAction('GYM')}
            icon={<Dumbbell size={20} />}
            label="Gym"
            color="bg-emerald-500"
            disabled={state.health <= 0 || state.energy < 20}
          />
        </div>
      </main>

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
        {(currentView === 'LEARNING' || currentView === 'EXERCISE') && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex flex-col pipo-pattern-bg overflow-hidden"
          >
            <div className="absolute inset-0 bg-[#f5f5f0] -z-10" />
            <LearningHeader
              level={state.englishLevel}
              exp={state.englishExp}
              streak={state.userStreak || 0}
              onExit={() => setCurrentView('ROOM')}
              title={currentView === 'LEARNING' ? "Caminho do Pipo" : "Lição em Curso"}
              lessonProgress={lessonProgress}
              isReviewMode={isReviewMode}
            />

            <div className="flex-1 relative overflow-hidden flex flex-col">
              <AnimatePresence mode="wait">
                {currentView === 'LEARNING' && (
                  <motion.div
                    key="learning-path"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="absolute inset-0 flex flex-col z-10"
                  >
                    <LearningPath
                      units={units}
                      onBack={() => setCurrentView('ROOM')}
                      onStartLesson={handleStartLesson}
                      stats={{
                        level: state.englishLevel,
                        exp: state.englishExp,
                        streak: state.userStreak || 0
                      }}
                    />
                  </motion.div>
                )}

                {currentView === 'EXERCISE' && selectedLessonId && (
                  <motion.div
                    key="exercise-engine"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="absolute inset-0 flex flex-col z-20"
                  >
                    <ExerciseEngine
                      lessonId={selectedLessonId}
                      questions={currentLessonQuestions}
                      answeredQuestionIds={activeAnsweredIds}
                      onAnswerCorrect={handleAtomicAnswer}
                      onComboReached={handleComboReach}
                      onClose={() => setCurrentView('LEARNING')}
                      onComplete={handleLessonComplete}
                      onProgressUpdate={(progress, isReview) => {
                        setLessonProgress(progress);
                        setIsReviewMode(isReview);
                      }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGame === 'PIPOMAN' && (
          <PipoMan
            englishLevel={state.englishLevel}
            onClose={(score) => {
              setActiveGame('NONE');
              const xpGained = Math.floor(score / 5);
              setState(prev => {
                let newExp = prev.englishExp + xpGained;
                let newLevel = prev.englishLevel;
                while (newExp >= 100) {
                  newExp -= 100;
                  newLevel += 1;
                }
                return {
                  ...prev,
                  englishExp: newExp,
                  englishLevel: newLevel,
                  happiness: Math.min(100, prev.happiness + 30),
                  energy: Math.max(0, prev.energy - 15),
                  evolutionStage: (newLevel >= 15 ? 'LEGENDARY' : newLevel >= 10 ? 'ADULT' : newLevel >= 5 ? 'TEEN' : 'BABY') as EvolutionStage
                };
              });
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
              setState(prev => {
                let newExp = prev.englishExp + xpGained;
                let newLevel = prev.englishLevel;
                while (newExp >= 100) {
                  newExp -= 100;
                  newLevel += 1;
                }
                return {
                  ...prev,
                  englishExp: newExp,
                  englishLevel: newLevel,
                  happiness: Math.min(100, prev.happiness + 20),
                  energy: Math.max(0, prev.energy - 10),
                  evolutionStage: (newLevel >= 15 ? 'LEGENDARY' : newLevel >= 10 ? 'ADULT' : newLevel >= 5 ? 'TEEN' : 'BABY') as EvolutionStage
                };
              });
              setMessage(`Fim de jogo! Você marcou ${score / 5} pontos e ganhou ${xpGained} XP!`);
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
              setState(prev => {
                let newExp = prev.englishExp + xpGained;
                let newLevel = prev.englishLevel;
                while (newExp >= 100) {
                  newExp -= 100;
                  newLevel += 1;
                }
                return {
                  ...prev,
                  englishExp: newExp,
                  englishLevel: newLevel,
                  happiness: Math.min(100, prev.happiness + 40),
                  energy: Math.max(0, prev.energy - 20),
                  evolutionStage: (newLevel >= 15 ? 'LEGENDARY' : newLevel >= 10 ? 'ADULT' : newLevel >= 5 ? 'TEEN' : 'BABY') as EvolutionStage
                };
              });
              setMessage(`Nave detonada! Você fez ${score} pontos e Pipo ganhou ${xpGained} XP!`);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGame === 'SNAKE' && (
          <PipoSnake
            onClose={() => {
              setActiveGame('NONE');
              setState(prev => ({
                ...prev,
                happiness: Math.min(100, prev.happiness + 20),
                energy: Math.max(0, prev.energy - 10)
              }));
              setMessage(`Pipo-Snake Encerrado! O Pipo se divertiu!`);
            }}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {activeGame === 'TETRIS' && (
          <PipoTetris
            onClose={() => {
              setActiveGame('NONE');
              setState(prev => ({
                ...prev,
                happiness: Math.min(100, prev.happiness + 25),
                energy: Math.max(0, prev.energy - 15)
              }));
              setMessage(`Pipo-Tetris Encerrado! Pipo adorou!`);
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
        "flex flex-col items-center justify-center gap-1 p-2 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 disabled:opacity-30 transition-all h-full w-full",
        color
      )}
    >
      <div className="flex-1 flex items-center justify-center py-1">
        {icon}
      </div>
      <span className="text-[6px] font-bold uppercase leading-none h-3 items-center justify-center text-center hidden sm:flex">{label}</span>
      <span className="text-[5px] font-bold uppercase leading-none h-3 items-center justify-center text-center flex sm:hidden">{label}</span>
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

  if (session && gameState === null && loading) {
    return (
      <div className="min-h-screen bg-[#f5f5f0] flex flex-col items-center justify-center p-6 font-pixel text-gray-900">
        <p className="animate-pulse">Sincronizando com a nuvem...</p>
      </div>
    );
  }

  return (
    <Game
      session={session}
      profile={profile}
      initialGameState={gameState}
      onLogout={handleLogout}
    />
  );
}
