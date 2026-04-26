import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { supabase } from '../../lib/supabase';
import { QUIZ_QUESTIONS } from '../../constants/quiz_questions'; // Fallback

interface PipoThemeQuizProps {
  englishLevel: number;
  onClose: () => void;
  onReward: (score: number) => void;
}

const THEMES = [
  { id: 'Animals', icon: '🐶', label: 'Animals' },
  { id: 'Space', icon: '🚀', label: 'Space' },
  { id: 'Sports', icon: '⚽', label: 'Sports' },
  { id: 'Food', icon: '🍕', label: 'Food' },
  { id: 'Geography', icon: '🌍', label: 'Geography' },
  { id: 'Science', icon: '🧪', label: 'Science' }
];

const XP_LADDER = [5, 10, 20, 50, 100, 250, 500, 1000, 2500, 5000];

export function PipoThemeQuiz({ englishLevel, onClose, onReward }: PipoThemeQuizProps) {
  const [gameState, setGameState] = useState<'theme_select' | 'loading' | 'playing' | 'confirming' | 'did_you_know' | 'game_over'>('theme_select');
  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  const [lifelines, setLifelines] = useState({
    fiftyFifty: true,
    askAudience: true,
    skip: true
  });
  
  const [eliminatedOptions, setEliminatedOptions] = useState<number[]>([]);
  const [audienceVotes, setAudienceVotes] = useState<number[] | null>(null);
  
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [winStatus, setWinStatus] = useState<'win' | 'lose' | 'stopped' | null>(null);

  const initGame = useCallback(() => {
    setGameState('theme_select');
    setSelectedTheme(null);
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setLifelines({ fiftyFifty: true, askAudience: true, skip: true });
    setEliminatedOptions([]);
    setAudienceVotes(null);
    setSelectedOption(null);
    setWinStatus(null);
  }, []);

  const handleThemeSelect = async (themeId: string) => {
    setSelectedTheme(themeId);
    setGameState('loading');
    
    try {
      const { data, error } = await supabase
        .from('theme_quiz_questions')
        .select('*')
        .eq('theme', themeId);
        
      let loadedQuestions = [];
      if (error || !data || data.length === 0) {
        // Fallback
        loadedQuestions = QUIZ_QUESTIONS.filter(q => q.theme === themeId);
      } else {
        loadedQuestions = data.map(q => ({
          ...q,
          correctAnswer: q.correct_answer,
          didYouKnow: q.did_you_know
        }));
      }

      // Filter out previously seen questions
      const seenKey = `pipo_quiz_seen_${themeId}`;
      let seenIds: number[] = [];
      try {
        seenIds = JSON.parse(localStorage.getItem(seenKey) || '[]');
      } catch(e) { seenIds = []; }
      
      let freshQuestions = loadedQuestions.filter(q => !seenIds.includes(q.id));
      
      // If all questions have been seen, reset and start fresh
      if (freshQuestions.length < 5) {
        localStorage.setItem(seenKey, '[]');
        freshQuestions = loadedQuestions;
      }

      // Shuffle by level: beginner -> intermediate -> advanced
      const beginner = freshQuestions.filter(q => q.level === 'beginner').sort(() => 0.5 - Math.random());
      const int = freshQuestions.filter(q => q.level === 'intermediate').sort(() => 0.5 - Math.random());
      const adv = freshQuestions.filter(q => q.level === 'advanced').sort(() => 0.5 - Math.random());
      
      const combined = [...beginner, ...int, ...adv];
      if (combined.length > 10) combined.length = 10; // Max 10 questions
      
      // Mark these as seen
      const newSeenIds = [...seenIds, ...combined.map(q => q.id)];
      localStorage.setItem(seenKey, JSON.stringify(newSeenIds));
      
      if (combined.length > 0) {
        setQuestions(combined);
        setGameState('playing');
      } else {
        setGameState('theme_select');
      }
    } catch (e) {
      console.error(e);
      setGameState('theme_select');
    }
  };

  const currentReward = currentQuestionIndex > 0 ? XP_LADDER[Math.min(currentQuestionIndex - 1, XP_LADDER.length - 1)] : 0;
  const nextReward = XP_LADDER[Math.min(currentQuestionIndex, XP_LADDER.length - 1)];

  const handleOptionSelect = (optionIndex: number) => {
    if (selectedOption !== null || gameState !== 'playing') return;
    
    setSelectedOption(optionIndex);
    setGameState('confirming');

    // Suspense delay
    setTimeout(() => {
      const currentQ = questions[currentQuestionIndex];
      const isCorrect = optionIndex === currentQ.correctAnswer;
      
      setGameState('did_you_know');
      
      if (!isCorrect) {
        setWinStatus('lose');
      } else if (currentQuestionIndex === questions.length - 1) {
        setWinStatus('win');
      }
    }, 2000);
  };

  const handleNextAction = () => {
    if (winStatus === 'lose') {
      onReward(0);
      setGameState('game_over');
    } else if (winStatus === 'win') {
      onReward(nextReward);
      setGameState('game_over');
    } else {
      // Continue to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setGameState('playing');
      setSelectedOption(null);
      setEliminatedOptions([]);
      setAudienceVotes(null);
    }
  };

  const handleStop = () => {
    setWinStatus('stopped');
    onReward(currentReward);
    setGameState('game_over');
  };

  const useFiftyFifty = () => {
    if (!lifelines.fiftyFifty) return;
    setLifelines(prev => ({ ...prev, fiftyFifty: false }));
    const currentQ = questions[currentQuestionIndex];
    const wrongIndices = currentQ.options
      .map((_: any, i: number) => i)
      .filter((i: number) => i !== currentQ.correctAnswer);
    const toEliminate = wrongIndices.sort(() => 0.5 - Math.random()).slice(0, 2);
    setEliminatedOptions(toEliminate);
  };

  const useAskAudience = () => {
    if (!lifelines.askAudience) return;
    setLifelines(prev => ({ ...prev, askAudience: false }));
    const currentQ = questions[currentQuestionIndex];
    const votes = new Array(currentQ.options.length).fill(0);
    let remaining = 100;
    
    // Give majority to correct answer (usually)
    const correctVote = Math.floor(Math.random() * 30) + 40; // 40-70%
    votes[currentQ.correctAnswer] = correctVote;
    remaining -= correctVote;
    
    // Distribute rest
    const wrongIndices = currentQ.options
      .map((_: any, i: number) => i)
      .filter((i: number) => i !== currentQ.correctAnswer);
      
    wrongIndices.forEach((idx: number, i: number) => {
      if (i === wrongIndices.length - 1) {
        votes[idx] = remaining;
      } else {
        const v = Math.floor(Math.random() * remaining);
        votes[idx] = v;
        remaining -= v;
      }
    });
    
    setAudienceVotes(votes);
  };

  const useSkip = () => {
    if (!lifelines.skip) return;
    setLifelines(prev => ({ ...prev, skip: false }));
    // Just move to next without giving XP for this one, but staying at same XP tier
    // For simplicity, we just remove this question and keep currentQuestionIndex
    setQuestions(prev => {
      const newQ = [...prev];
      newQ.splice(currentQuestionIndex, 1);
      return newQ;
    });
    setEliminatedOptions([]);
    setAudienceVotes(null);
    
    if (questions.length <= 1) {
      // If no more questions, end game safely
      handleStop();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#2b2b8a] flex flex-col font-pixel overflow-hidden text-white">
      {/* Header */}
      <div className="bg-black text-white p-4 flex justify-between items-center shadow-[0_4px_0_0_rgba(0,0,0,0.5)] z-10 border-b-4 border-yellow-400">
        <h1 className="text-xl font-bold uppercase text-yellow-400">PIPO MILLIONAIRE</h1>
        <span className="text-xs uppercase bg-white text-black px-2 py-1 border-2 border-black">Lvl {englishLevel}</span>
      </div>

      <div className="flex-1 overflow-y-auto p-4 flex flex-col">
        {gameState === 'theme_select' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center max-w-md mx-auto w-full">
            <h2 className="text-xl font-bold mb-6 uppercase text-center bg-yellow-400 text-black border-4 border-black p-2 inline-block">Pick a Topic</h2>
            <div className="grid grid-cols-2 gap-4 w-full">
              {THEMES.map(theme => (
                <button
                  key={theme.id}
                  onClick={() => handleThemeSelect(theme.id)}
                  className="bg-[#1a1a5c] border-4 border-yellow-400 p-6 flex flex-col items-center justify-center gap-2 hover:bg-[#2a2a7c] active:translate-y-[2px] transition-all"
                >
                  <span className="text-4xl">{theme.icon}</span>
                  <span className="text-xs font-bold uppercase text-yellow-200">{theme.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {gameState === 'loading' && (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-xl animate-pulse text-yellow-400">Loading...</p>
          </div>
        )}

        {(gameState === 'playing' || gameState === 'confirming' || gameState === 'did_you_know') && questions.length > 0 && (
          <motion.div initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="flex flex-col max-w-md mx-auto w-full flex-1">
            
            {/* Top Bar: Lifelines & Reward */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-2">
                <button disabled={!lifelines.fiftyFifty || gameState !== 'playing'} onClick={useFiftyFifty} className={cn("px-2 py-1 border-2 font-bold text-[10px]", lifelines.fiftyFifty ? "bg-yellow-400 text-black border-yellow-600" : "bg-gray-600 text-gray-400 border-gray-800")}>50:50</button>
                <button disabled={!lifelines.askAudience || gameState !== 'playing'} onClick={useAskAudience} className={cn("px-2 py-1 border-2 font-bold text-[10px]", lifelines.askAudience ? "bg-yellow-400 text-black border-yellow-600" : "bg-gray-600 text-gray-400 border-gray-800")}>👥 ASK</button>
                <button disabled={!lifelines.skip || gameState !== 'playing'} onClick={useSkip} className={cn("px-2 py-1 border-2 font-bold text-[10px]", lifelines.skip ? "bg-yellow-400 text-black border-yellow-600" : "bg-gray-600 text-gray-400 border-gray-800")}>⏭️ SKIP</button>
              </div>
              <div className="text-right">
                <div className="text-[10px] text-gray-300">Q: {currentQuestionIndex + 1}/{questions.length}</div>
                <div className="text-sm font-bold text-yellow-400">{nextReward} XP</div>
              </div>
            </div>

            {/* Audience Votes Popup */}
            <AnimatePresence>
              {audienceVotes && gameState === 'playing' && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="bg-white text-black p-4 border-4 border-black mb-4 flex items-end justify-center gap-4 h-32">
                  {audienceVotes.map((v, i) => (
                    <div key={i} className="flex flex-col items-center gap-1 w-8">
                      <span className="text-[8px] font-bold">{v}%</span>
                      <div className="w-full bg-blue-500 border-2 border-black" style={{ height: `${v}%` }}></div>
                      <span className="text-[10px] font-bold">{['A', 'B', 'C', 'D'][i]}</span>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Question */}
            <div className="bg-[#0a0a3a] border-4 border-yellow-400 p-6 mb-6 w-full text-center min-h-[120px] flex items-center justify-center">
              <h2 className="text-sm font-bold leading-relaxed">{questions[currentQuestionIndex].question}</h2>
            </div>

            {/* Options */}
            <div className="w-full grid grid-cols-1 gap-3 mb-6">
              {questions[currentQuestionIndex].options.map((option: string, idx: number) => {
                const isSelected = selectedOption === idx;
                const isCorrect = idx === questions[currentQuestionIndex].correctAnswer;
                const isEliminated = eliminatedOptions.includes(idx);
                
                let btnClass = "bg-[#1a1a5c] border-yellow-400 hover:bg-[#2a2a7c] text-white";
                
                if (gameState === 'confirming' && isSelected) {
                  btnClass = "bg-orange-500 border-orange-200 animate-pulse text-white";
                } else if (gameState === 'did_you_know') {
                  if (isCorrect) btnClass = "bg-green-500 border-green-300 text-white";
                  else if (isSelected) btnClass = "bg-red-500 border-red-300 text-white";
                  else btnClass = "bg-[#1a1a5c] border-gray-600 text-gray-400";
                }

                if (isEliminated) {
                  return (
                    <div key={idx} className="bg-transparent border-4 border-gray-600 p-4 opacity-30 text-xs font-bold flex items-center">
                      <span className="text-yellow-400 mr-2">{['A', 'B', 'C', 'D'][idx]}:</span>
                      <span className="line-through">{option}</span>
                    </div>
                  );
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(idx)}
                    disabled={gameState !== 'playing'}
                    className={cn(
                      "border-4 p-4 text-left text-xs font-bold flex items-center transition-colors active:translate-y-[2px]",
                      btnClass
                    )}
                  >
                    <span className="text-yellow-400 mr-2">{['A', 'B', 'C', 'D'][idx]}:</span>
                    <span>{option}</span>
                  </button>
                );
              })}
            </div>

            {/* Did you know section */}
            <AnimatePresence>
              {gameState === 'did_you_know' && (
                <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white text-black border-4 border-black p-4 mb-4 relative">
                  <div className="absolute -top-3 left-4 bg-yellow-400 border-2 border-black px-2 py-0.5 text-[8px] font-bold uppercase flex items-center gap-1">
                    <span>💡</span> Did you know?
                  </div>
                  <p className="text-[10px] font-bold mt-2">
                    {questions[currentQuestionIndex].didYouKnow}
                  </p>
                  <button 
                    onClick={handleNextAction}
                    className="mt-4 w-full bg-black text-white p-3 font-bold uppercase hover:bg-gray-800 text-[10px]"
                  >
                    {winStatus === 'lose' ? 'Continue' : 'Next Question →'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Stop Button */}
            {gameState === 'playing' && (
              <button 
                onClick={handleStop}
                className="mt-auto bg-red-600 border-4 border-red-800 text-white p-3 font-bold uppercase text-xs hover:bg-red-700"
              >
                🛑 STOP (Take {currentReward} XP)
              </button>
            )}
          </motion.div>
        )}

        {gameState === 'game_over' && (
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="flex flex-col items-center justify-center max-w-md mx-auto w-full h-full">
             <div className="bg-white text-black border-4 border-black p-6 text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] w-full">
                <h2 className="text-2xl font-bold mb-4 uppercase">
                  {winStatus === 'win' ? 'MILLIONAIRE!' : winStatus === 'stopped' ? 'SMART CHOICE!' : 'GAME OVER'}
                </h2>
                <div className="text-5xl mb-4">
                  {winStatus === 'lose' ? '😢' : '💸'}
                </div>
                <p className="text-xs font-bold mb-2 uppercase">Questions Answered: {currentQuestionIndex}</p>
                <p className={cn("text-lg font-bold mb-6 uppercase", winStatus === 'lose' ? "text-red-600" : "text-green-600")}>
                  Final Prize: {winStatus === 'lose' ? 0 : winStatus === 'stopped' ? currentReward : nextReward} XP
                </p>
                
                <div className="flex gap-2 w-full">
                  <button 
                    onClick={initGame}
                    className="flex-1 bg-yellow-400 text-black border-4 border-black px-4 py-4 font-bold uppercase hover:bg-yellow-500 active:translate-y-1 text-xs"
                  >
                    Play Again
                  </button>
                  <button 
                    onClick={onClose}
                    className="flex-1 bg-black text-white border-4 border-black px-4 py-4 font-bold uppercase hover:bg-gray-800 active:translate-y-1 text-xs"
                  >
                    Back to Room
                  </button>
                </div>
             </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
