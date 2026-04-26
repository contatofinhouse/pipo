import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { WORD_BANK, WordEntry } from '../../constants/words';

interface PipoBalloonsProps {
  englishLevel: number;
  onClose: () => void;
  onReward: (score: number) => void;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const BALLOON_COLORS = ['bg-red-500', 'bg-yellow-400', 'bg-green-500', 'bg-blue-500', 'bg-purple-500', 'bg-orange-500'];

export function PipoBalloons({ englishLevel, onClose, onReward }: PipoBalloonsProps) {
  const [targetWord, setTargetWord] = useState<WordEntry | null>(null);
  const [guessedLetters, setGuessedLetters] = useState<Set<string>>(new Set());
  const [wrongGuesses, setWrongGuesses] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [totalScore, setTotalScore] = useState(0);
  const [wordsWon, setWordsWon] = useState(0);

  const maxWrong = 6;

  const initGame = useCallback(() => {
    let pool: WordEntry[];
    if (englishLevel <= 3) pool = WORD_BANK.beginner;
    else if (englishLevel <= 10) pool = WORD_BANK.intermediate;
    else pool = WORD_BANK.advanced;
    
    if (pool.length > 0) {
      const randomWord = pool[Math.floor(Math.random() * pool.length)];
      setTargetWord(randomWord);
    }
    setGuessedLetters(new Set());
    setWrongGuesses(0);
    setGameState('playing');
  }, [englishLevel]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const handleGuess = useCallback((letter: string) => {
    if (gameState !== 'playing' || guessedLetters.has(letter) || !targetWord) return;

    const newGuessed = new Set(guessedLetters);
    newGuessed.add(letter);
    setGuessedLetters(newGuessed);

    if (!targetWord.word.includes(letter)) {
      const newWrong = wrongGuesses + 1;
      setWrongGuesses(newWrong);
      if (newWrong >= maxWrong) {
        setGameState('lost');
        onReward(0);
      }
    } else {
      const allFound = targetWord.word.split('').every(char => newGuessed.has(char));
      if (allFound) {
        setGameState('won');
        const pts = wrongGuesses === 0 ? 30 : 15;
        setTotalScore(prev => prev + pts);
        setWordsWon(prev => prev + 1);
        // Auto-continue after brief celebration
        setTimeout(() => {
          // Pick next word
          let pool: WordEntry[];
          if (englishLevel <= 3) pool = WORD_BANK.beginner;
          else if (englishLevel <= 10) pool = WORD_BANK.intermediate;
          else pool = WORD_BANK.advanced;
          if (pool.length > 0) {
            const randomWord = pool[Math.floor(Math.random() * pool.length)];
            setTargetWord(randomWord);
          }
          setGuessedLetters(new Set());
          setWrongGuesses(0);
          setGameState('playing');
        }, 1500);
      }
    }
  }, [gameState, guessedLetters, targetWord, wrongGuesses, onReward]);

  // Physical keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        handleGuess(key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGuess]);

  if (!targetWord) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#87CEEB] flex flex-col font-pixel overflow-hidden">
      {/* Header */}
      <div className="bg-black text-white p-4 flex justify-between items-center shadow-[0_4px_0_0_rgba(0,0,0,0.2)] z-10">
        <h1 className="text-xl font-bold uppercase">PIPO-BALLOONS</h1>
        <div className="flex items-center gap-3">
          <span className="text-xs uppercase bg-white text-black px-2 py-1 border-2 border-black">Lvl {englishLevel}</span>
          <button 
            onClick={() => {
              onReward(totalScore);
              onClose();
            }}
            className="text-[10px] uppercase bg-red-600 text-white px-2 py-1 border-2 border-black hover:bg-red-700 active:translate-y-[2px] transition-all font-bold"
          >
            Sair
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center pt-8 pb-4 px-4 overflow-y-auto">
        
        {/* Balloons & Pipo Area */}
        <div className="relative h-64 w-full max-w-sm flex flex-col items-center mb-8">
          {/* Balloons */}
          <div className="flex justify-center gap-2 mb-16 h-24">
            {BALLOON_COLORS.map((color, i) => {
              const isPopped = i < wrongGuesses;
              return (
                <div key={i} className="relative w-8 h-full flex flex-col items-center">
                  <AnimatePresence>
                    {!isPopped && (
                      <motion.div
                        initial={{ scale: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        animate={{ y: [0, -5, 0] }}
                        style={{ animationDelay: `${i * 0.2}s` }}
                        className={cn("w-8 h-10 border-2 border-black absolute top-0 z-10", color)}
                      />
                    )}
                  </AnimatePresence>
                  {/* String */}
                  {!isPopped && (
                    <motion.div 
                      exit={{ opacity: 0 }} 
                      className="w-[2px] bg-black h-16 absolute top-10"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Pipo Visual (Simplified ASCII / CSS art) */}
          <motion.div 
            animate={gameState === 'won' ? { y: [0, -20, 0] } : {}}
            transition={{ repeat: gameState === 'won' ? Infinity : 0, duration: 0.5 }}
            className="w-16 h-16 bg-[#8B5E3C] border-4 border-black relative z-20 flex flex-col items-center justify-center mt-auto"
          >
            {/* Eyes */}
            <div className="flex gap-4 mb-2">
              <div className={cn("w-2 h-2 bg-black", gameState === 'lost' && "w-3 h-1 mt-1")} />
              <div className={cn("w-2 h-2 bg-black", gameState === 'lost' && "w-3 h-1 mt-1")} />
            </div>
            {/* Nose/Mouth */}
            <div className="w-4 h-2 bg-[#4D2A0A] border-b-2 border-black" />
          </motion.div>
        </div>

        {/* Word Display */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {targetWord.word.split('').map((letter, i) => {
            const isRevealed = guessedLetters.has(letter) || gameState === 'lost';
            const isMissed = gameState === 'lost' && !guessedLetters.has(letter);
            return (
              <div 
                key={i}
                className={cn(
                  "w-10 h-12 flex items-center justify-center text-2xl font-bold uppercase border-b-4 border-black",
                  isMissed ? "text-red-600" : "text-black"
                )}
              >
                {isRevealed ? letter : '_'}
              </div>
            );
          })}
        </div>

        {/* Hint */}
        <div className="mb-6 bg-white border-2 border-black px-4 py-2 text-[10px] font-bold uppercase text-center w-full max-w-sm shadow-[2px_2px_0_0_rgba(0,0,0,1)]">
          💡 Dica: {targetWord.hint}
        </div>

        {/* Keyboard or Game Over UI */}
        {gameState === 'playing' ? (
          <div className="flex flex-wrap justify-center gap-2 max-w-sm mt-auto">
            {ALPHABET.map(letter => {
              const isGuessed = guessedLetters.has(letter);
              const isCorrect = isGuessed && targetWord.word.includes(letter);
              const isWrong = isGuessed && !targetWord.word.includes(letter);
              
              return (
                <button
                  key={letter}
                  onClick={() => handleGuess(letter)}
                  disabled={isGuessed}
                  className={cn(
                    "w-10 h-10 border-2 border-black font-bold flex items-center justify-center text-sm transition-colors",
                    isGuessed && isCorrect ? "bg-green-500 text-white" : "",
                    isGuessed && isWrong ? "bg-red-400 text-white opacity-50" : "",
                    !isGuessed ? "bg-white text-black active:bg-gray-200" : ""
                  )}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        ) : (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="bg-white border-4 border-black p-4 text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] max-w-sm w-full mt-auto"
          >
            {gameState === 'won' ? (
              <>
                <h2 className="text-green-600 text-xl font-bold mb-2 uppercase">✅ Correct!</h2>
                <div className="text-4xl mb-2">🎉🎈✨</div>
                <p className="text-xs font-bold mb-2">Words: {wordsWon} | Score: {totalScore}</p>
                <p className="text-[10px] text-gray-500 font-bold animate-pulse">Next word coming...</p>
              </>
            ) : (
              <>
                <h2 className="text-red-600 text-xl font-bold mb-2 uppercase">Game Over</h2>
                <p className="text-xs font-bold mb-2">All balloons popped!</p>
                <p className="text-sm font-bold text-green-600 mb-4">Words guessed: {wordsWon} | Total: {totalScore} XP</p>
              </>
            )}
            {gameState === 'lost' && (
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setTotalScore(0);
                    setWordsWon(0);
                    initGame();
                  }}
                  className="flex-1 bg-white text-black border-4 border-black px-4 py-3 font-bold uppercase hover:bg-gray-100 active:translate-y-1"
                >
                  Play Again
                </button>
                <button 
                  onClick={() => {
                    onReward(totalScore);
                    onClose();
                  }}
                  className="flex-1 bg-black text-white border-4 border-black px-4 py-3 font-bold uppercase hover:bg-gray-800 active:translate-y-1"
                >
                  Back (+{totalScore} XP)
                </button>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
