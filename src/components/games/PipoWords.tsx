import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';
import { WORD_BANK, WordEntry } from '../../constants/words';

interface PipoWordsProps {
  englishLevel: number;
  onClose: () => void;
  onReward: (score: number) => void;
}

const KEYBOARD_ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'DEL']
];

export function PipoWords({ englishLevel, onClose, onReward }: PipoWordsProps) {
  const [targetWord, setTargetWord] = useState<WordEntry | null>(null);
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [showHint, setShowHint] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);
  const [revealedRows, setRevealedRows] = useState<number[]>([]);

  const initGame = useCallback(() => {
    let pool: WordEntry[];
    if (englishLevel <= 3) pool = WORD_BANK.beginner;
    else if (englishLevel <= 10) pool = WORD_BANK.intermediate;
    else pool = WORD_BANK.advanced;
    
    if (pool.length > 0) {
      const randomWord = pool[Math.floor(Math.random() * pool.length)];
      setTargetWord(randomWord);
    }
    setGuesses([]);
    setCurrentGuess('');
    setGameState('playing');
    setShowHint(false);
    setRevealedRows([]);
    setIsRevealing(false);
  }, [englishLevel]);

  useEffect(() => {
    initGame();
  }, [initGame]);

  const wordLength = targetWord?.word.length || 5;
  const maxGuesses = 6;

  const handleKeyPress = useCallback((key: string) => {
    if (gameState !== 'playing' || isRevealing) return;

    if (key === 'ENTER') {
      if (currentGuess.length !== wordLength) {
        // Shake animation could be triggered here
        return;
      }
      
      setIsRevealing(true);
      const newGuesses = [...guesses, currentGuess];
      setGuesses(newGuesses);
      const currentRow = guesses.length;
      setCurrentGuess('');

      // Simulando o delay do Wordle para revelar
      setTimeout(() => {
        setRevealedRows(prev => [...prev, currentRow]);
        setIsRevealing(false);

        if (currentGuess === targetWord?.word) {
          setGameState('won');
          const attempts = newGuesses.length;
          onReward(Math.max(10, 60 - attempts * 10));
        } else if (newGuesses.length >= maxGuesses) {
          setGameState('lost');
          onReward(0);
        }
      }, wordLength * 300); // 300ms per letter
      
    } else if (key === 'DEL' || key === 'BACKSPACE') {
      setCurrentGuess(prev => prev.slice(0, -1));
    } else if (/^[A-Z]$/.test(key)) {
      if (currentGuess.length < wordLength) {
        setCurrentGuess(prev => prev + key);
      }
    }
  }, [currentGuess, gameState, guesses, targetWord, wordLength, isRevealing, onReward]);

  // Handle physical keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleKeyPress('ENTER');
      else if (e.key === 'Backspace') handleKeyPress('DEL');
      else {
        const key = e.key.toUpperCase();
        if (/^[A-Z]$/.test(key)) handleKeyPress(key);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  // Calculate used keys colors based on REVEALED rows only
  const keyColors: Record<string, string> = {};
  if (targetWord) {
    guesses.forEach((guess, rowIndex) => {
      if (!revealedRows.includes(rowIndex)) return;
      
      for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        if (targetWord.word[i] === letter) {
          keyColors[letter] = 'bg-green-500 text-white';
        } else if (targetWord.word.includes(letter) && keyColors[letter] !== 'bg-green-500 text-white') {
          keyColors[letter] = 'bg-yellow-400 text-black';
        } else if (!keyColors[letter]) {
          keyColors[letter] = 'bg-gray-400 text-white';
        }
      }
    });
  }

  if (!targetWord) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#f5f5f0] flex flex-col font-pixel overflow-hidden">
      <div className="bg-black text-white p-4 flex justify-between items-center shadow-[0_4px_0_0_rgba(0,0,0,0.2)] z-10">
        <h1 className="text-xl font-bold uppercase">PIPO-WORDS</h1>
        <span className="text-xs uppercase bg-white text-black px-2 py-1 border-2 border-black">Lvl {englishLevel}</span>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start pt-8 pb-4 px-2 overflow-y-auto">
        {/* Game Grid */}
        <div className="grid gap-2 mb-6">
          {Array.from({ length: maxGuesses }).map((_, rowIndex) => {
            const guess = guesses[rowIndex] || (rowIndex === guesses.length ? currentGuess : '');
            const isCompleted = rowIndex < guesses.length;

            return (
              <div key={rowIndex} className="flex gap-2 justify-center">
                {Array.from({ length: wordLength }).map((_, colIndex) => {
                  const letter = guess[colIndex] || '';
                  
                  let bgColor = 'bg-white';
                  let borderColor = 'border-black';
                  let textColor = 'text-black';

                  const isRevealed = revealedRows.includes(rowIndex);

                  if (isRevealed) {
                    if (targetWord.word[colIndex] === letter) {
                      bgColor = 'bg-green-500';
                      borderColor = 'border-green-700';
                      textColor = 'text-white';
                    } else if (targetWord.word.includes(letter)) {
                      bgColor = 'bg-yellow-400';
                      borderColor = 'border-yellow-600';
                    } else {
                      bgColor = 'bg-gray-400';
                      borderColor = 'border-gray-600';
                      textColor = 'text-white';
                    }
                  } else if (letter) {
                    borderColor = 'border-gray-500';
                  }

                  return (
                    <motion.div
                      key={colIndex}
                      initial={isCompleted && !isRevealed ? { rotateX: 0 } : false}
                      animate={isCompleted && !isRevealed ? { rotateX: [0, 90, 0] } : false}
                      transition={{ duration: 0.3, delay: colIndex * 0.3 }}
                      onAnimationComplete={() => {
                        // Opcional: sincronizar a cor com o meio da animação
                      }}
                      className={cn(
                        "w-12 h-12 flex items-center justify-center text-xl font-bold uppercase border-4",
                        bgColor, borderColor, textColor
                      )}
                    >
                      {letter}
                    </motion.div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Game Over UI */}
        {gameState !== 'playing' && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="mb-6 bg-white border-4 border-black p-4 text-center shadow-[4px_4px_0_0_rgba(0,0,0,1)] max-w-sm w-full"
          >
            {gameState === 'won' ? (
              <>
                <h2 className="text-green-600 text-xl font-bold mb-2 uppercase">You Win!</h2>
                <div className="text-4xl mb-2">🎉🐹✨</div>
                <p className="text-xs font-bold mb-4">Pipo loved it! +{Math.max(10, 60 - guesses.length * 10)} XP</p>
              </>
            ) : (
              <>
                <h2 className="text-red-600 text-xl font-bold mb-2 uppercase">Game Over</h2>
                <p className="text-xs font-bold mb-2">The word was:</p>
                <p className="text-lg font-bold text-red-600 tracking-widest mb-4">{targetWord.word}</p>
              </>
            )}
            <div className="flex gap-2">
              <button 
                onClick={initGame}
                className="flex-1 bg-white text-black border-4 border-black px-4 py-3 font-bold uppercase hover:bg-gray-100 active:translate-y-1"
              >
                Play Again
              </button>
              <button 
                onClick={onClose}
                className="flex-1 bg-black text-white border-4 border-black px-4 py-3 font-bold uppercase hover:bg-gray-800 active:translate-y-1"
              >
                Back
              </button>
            </div>
          </motion.div>
        )}

        {/* Hint System */}
        {gameState === 'playing' && (
          <div className="mb-6 w-full max-w-sm flex flex-col items-center">
            {showHint ? (
              <div className="bg-blue-100 border-2 border-blue-400 p-2 text-center text-[10px] font-bold text-blue-800 w-full uppercase">
                Hint: {targetWord.hint}
              </div>
            ) : (
              <button 
                onClick={() => setShowHint(true)}
                className="bg-white border-2 border-black px-4 py-2 text-[10px] font-bold uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none"
              >
                💡 Get Hint (-10 Energy)
              </button>
            )}
          </div>
        )}

        {/* Virtual Keyboard */}
        <div className="w-full max-w-md px-2 mt-auto pb-4">
          {KEYBOARD_ROWS.map((row, i) => (
            <div key={i} className="flex justify-center gap-1 mb-1">
              {row.map(key => {
                const isSpecial = key === 'ENTER' || key === 'DEL';
                const bgColor = keyColors[key] || 'bg-white text-black';
                
                return (
                  <button
                    key={key}
                    onClick={() => handleKeyPress(key)}
                    disabled={gameState !== 'playing'}
                    className={cn(
                      "h-12 border-2 border-black font-bold flex items-center justify-center active:bg-gray-200 transition-colors",
                      isSpecial ? "px-3 text-[10px] w-auto flex-1" : "w-8 text-xs",
                      bgColor
                    )}
                  >
                    {key === 'DEL' ? '⌫' : key}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
