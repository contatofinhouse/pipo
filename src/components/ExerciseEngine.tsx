import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, AlertCircle, Volume2, ArrowRight, Mic, RotateCcw } from 'lucide-react';
import { cn } from '../lib/utils';

interface Question {
  id: string;
  type: 'selection' | 'matching' | 'audio' | 'ordering' | 'tf' | 'speaking';
  content: {
    prompt: string;
    audio_text?: string;
    audio_url?: string;
    image?: string;
    items?: { icon: string; word: string }[];
    sentence?: string;
  };
  options: {
    text: string;
    icon?: string;
    is_correct: boolean;
  }[];
  explanation?: string;
}

interface ExerciseEngineProps {
  lessonId: string;
  questions: Question[];
  answeredQuestionIds?: string[];
  onComplete: (stats: { score: number; xp: number }) => void;
  onClose: () => void;
  onProgressUpdate?: (progress: number, isReview: boolean) => void;
  onAnswerCorrect?: (questionId: string) => void;
  onComboReached?: () => void;
}

export function ExerciseEngine({ 
  lessonId, 
  questions: initialQuestions, 
  answeredQuestionIds = [],
  onComplete, 
  onClose,
  onProgressUpdate,
  onAnswerCorrect,
  onComboReached
}: ExerciseEngineProps) {
  // Remove questions that were already answered in previous unfinished sessions
  const initialUnanswered = initialQuestions.filter(q => !answeredQuestionIds.includes(q.id));
  
  // Fila dinâmica de questões para permitir reforço de erros
  const [sessionQuestions, setSessionQuestions] = useState<Question[]>(initialUnanswered.length > 0 ? [...initialUnanswered] : [...initialQuestions]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [combo, setCombo] = useState(0);

  // Estados específicos para Matching
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [matches, setMatches] = useState<Record<string, string>>({});
  const [shuffledIcons, setShuffledIcons] = useState<string[]>([]);
  const [shuffledWords, setShuffledWords] = useState<string[]>([]);

  // Estados específicos para Ordering
  const [orderingWords, setOrderingWords] = useState<string[]>([]);
  const [selectedOrderingWords, setSelectedOrderingWords] = useState<string[]>([]);

  // Estados específicos para Speaking
  const [isListening, setIsListening] = useState(false);
  const [spokenText, setSpokenText] = useState('');

  const currentQuestion = sessionQuestions[currentIndex];

  // Detecta se estamos na fase de reforço (re-respondendo o que errou)
  const totalQuestions = initialUnanswered.length > 0 ? initialUnanswered.length : initialQuestions.length;
  const isReviewPhase = currentIndex >= totalQuestions;

  useEffect(() => {
    if (onProgressUpdate) {
      const progress = ((currentIndex) / sessionQuestions.length) * 100;
      onProgressUpdate(progress, isReviewPhase);
    }
  }, [currentIndex, sessionQuestions.length, isReviewPhase, onProgressUpdate]);

  useEffect(() => {
    if (currentQuestion?.type === 'matching' && currentQuestion.content.items) {
      setShuffledIcons([...currentQuestion.content.items.map(i => i.icon)].sort(() => Math.random() - 0.5));
      setShuffledWords([...currentQuestion.content.items.map(i => i.word)].sort(() => Math.random() - 0.5));
      setMatches({});
      setSelectedIcon(null);
    }

    if (currentQuestion?.type === 'ordering' && currentQuestion.content.sentence) {
      const words = currentQuestion.content.sentence.trim().split(/\s+/).sort(() => Math.random() - 0.5);
      setOrderingWords(words);
      setSelectedOrderingWords([]);
    }

    if (currentQuestion?.type === 'speaking') {
      setSpokenText('');
      setIsListening(false);
    }
  }, [currentIndex, currentQuestion]);

  const handleOrderingClick = (word: string, index: number) => {
    if (isChecked) return;
    setSelectedOrderingWords(prev => [...prev, word]);
    setOrderingWords(prev => prev.filter((_, i) => i !== index));
  };

  const handleOrderingReset = () => {
    if (isChecked || !currentQuestion.content.sentence) return;
    const words = currentQuestion.content.sentence.trim().split(/\s+/).sort(() => Math.random() - 0.5);
    setOrderingWords(words);
    setSelectedOrderingWords([]);
  };

  const handleStartSpeaking = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Seu navegador não suporta reconhecimento de voz.");
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event: any) => {
      const result = event.results[0][0].transcript;
      setSpokenText(result);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  const handleMatchIcon = (icon: string) => {
    if (isChecked) return;
    setSelectedIcon(icon);
  };

  const handleMatchWord = (word: string) => {
    if (!selectedIcon || isChecked) return;
    
    // Garantir 1-para-1: Se o ícone já estava casado, ou se a palavra já estava casada, limpa os antigos
    const existingIconForWord = Object.keys(matches).find(key => matches[key] === word);
    
    setMatches(prev => {
      const newMatches = { ...prev };
      // Se a palavra já tinha um dono, remove o dono antigo
      if (existingIconForWord) delete newMatches[existingIconForWord];
      // Define o novo match
      newMatches[selectedIcon] = word;
      return newMatches;
    });
    
    setSelectedIcon(null);
  };

  const handleCheck = () => {
    let correct = false;

    if (currentQuestion.type === 'matching') {
      correct = currentQuestion.content.items?.every(item => matches[item.icon] === item.word) || false;
    } else if (currentQuestion.type === 'ordering') {
      correct = selectedOrderingWords.join(' ') === currentQuestion.content.sentence;
    } else if (currentQuestion.type === 'speaking') {
      // Comparação flexível (tirando pontuação e case)
      const target = currentQuestion.content.audio_text?.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"") || "";
      const result = spokenText.toLowerCase().replace(/[.,/#!$%^&*;:{}=\-_`~()]/g,"") || "";
      correct = target === result || result.includes(target);
    } else {
      if (selectedOption === null) return;
      correct = currentQuestion.options[selectedOption].is_correct;
    }

    setIsCorrect(correct);
    setIsChecked(true);
    
    if (correct) {
      // XP and Combos
      setScore(prev => prev + 1);
      const newCombo = combo + 1;
      setCombo(newCombo);
      
      const firstTimeAnswering = currentIndex < totalQuestions;
      if (firstTimeAnswering) {
        setXp(prev => prev + 10);
        if (onAnswerCorrect) onAnswerCorrect(currentQuestion.id);
      } else {
        setXp(prev => prev + 5); 
      }
      
      if (newCombo === 7 && onComboReached) {
        onComboReached();
      }
      
      playSuccessSound();
    } else {
      // QUEBRA O COMBO E REFORÇA
      setCombo(0);
      setSessionQuestions(prev => [...prev, { ...currentQuestion, isReview: true }]);
      playErrorSound();
    }
  };

  const handleNext = () => {
    if (currentIndex < sessionQuestions.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsChecked(false);
      setIsCorrect(null);
    } else {
      // Completou todas, incluindo os reforços
      // Score = Quantas ele acertou de primeira (se errou alguma, ele repetiu no final, mas o maximo eh 100)
      const finalScore = Math.round((score / totalQuestions) * 100);
      setCombo(0);
      onComplete({ score: Math.min(100, finalScore), xp });
    }
  };

  const playSuccessSound = () => {
    // Simple browser-based feedback
  };

  const playErrorSound = () => {
    // Simple browser-based feedback
  };

  const handleSpeak = (text: string, url?: string) => {
    if (url) {
      const audio = new Audio(url);
      audio.volume = 1.0;
      audio.play().catch(e => {
        console.error("Error playing recorded audio:", e);
        // Fallback to TTS if URL fails
        if (text && 'speechSynthesis' in window) {
          const utterance = new SpeechSynthesisUtterance(text);
          utterance.lang = 'en-US';
          window.speechSynthesis.speak(utterance);
        }
      });
      return;
    }

    if (text && 'speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 pipo-pattern-bg z-0" />
        <div className="z-10 bg-white p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <AlertCircle size={48} className="text-red-500 mx-auto mb-4" />
          <h2 className="text-sm font-bold uppercase mb-4">Erro de Carregamento</h2>
          <p className="text-[10px] text-gray-500 mb-6">Não foi possível encontrar questões para esta lição.</p>
          <button onClick={onClose} className="px-6 py-2 bg-yellow-400 border-2 border-black font-bold uppercase text-[10px]">
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col font-pixel relative z-10">
      
      {/* Lesson Progress handled by LearningHeader */}

      {/* Question Content */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center relative z-20">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -50, opacity: 0 }}
            className="w-full max-w-sm flex flex-col items-center relative z-30"
          >
            <h2 className="text-lg font-bold mb-8 uppercase leading-tight">
              {currentQuestion.content.prompt}
            </h2>

            {currentQuestion.type === 'audio' && (
              <button 
                onClick={() => handleSpeak(currentQuestion.content.audio_text || '', currentQuestion.content.audio_url)}
                className="w-24 h-24 bg-blue-100 border-4 border-black rounded-xl flex items-center justify-center mb-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-blue-200"
              >
                <Volume2 size={40} className="text-blue-500" />
              </button>
            )}

            {currentQuestion.content.image ? (
              <motion.div 
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.1, opacity: 1 }}
                whileHover={{ scale: 1.2 }}
                className="text-7xl mb-10 border-4 border-black p-6 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] relative group cursor-default"
              >
                <div className="absolute inset-0 bg-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                {currentQuestion.content.image}
              </motion.div>
            ) : (
              currentQuestion.type === 'selection' && (
                <div className="text-gray-300 text-[10px] mb-8 uppercase font-bold border-2 border-dashed border-gray-200 p-4">
                  (Sem imagem para esta questão)
                </div>
              )
            )}

            {currentQuestion.type === 'speaking' && (
              <div className="flex flex-col items-center gap-6">
                <button 
                  onClick={handleStartSpeaking}
                  disabled={isChecked || isListening}
                  className={cn(
                    "w-24 h-24 rounded-full border-4 border-black flex items-center justify-center transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]",
                    isListening ? "bg-red-400 animate-pulse" : "bg-white hover:bg-gray-50",
                    isChecked && "opacity-50"
                  )}
                >
                  <Mic size={40} className={isListening ? "text-white" : "text-black"} />
                </button>
                <div className="min-h-[40px] flex flex-col items-center">
                   <p className="text-[10px] text-gray-400 uppercase font-black mb-1">Você disse:</p>
                   <p className="text-sm font-bold uppercase tracking-wider">
                     {spokenText || (isListening ? "Ouvindo..." : "Clique para falar")}
                   </p>
                </div>
              </div>
            )}

            {currentQuestion.type === 'ordering' && (
              <div className="w-full flex flex-col gap-8 mt-4">
                {/* Alvos (Caixas) */}
                <div className="flex flex-wrap justify-center gap-2 p-4 min-h-[100px] border-4 border-dashed border-gray-200 rounded-xl bg-gray-50/50">
                  {selectedOrderingWords.map((word, idx) => (
                    <motion.div
                      key={idx}
                      layoutId={`word-${idx}`}
                      className="px-4 py-2 bg-white border-2 border-black font-bold text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    >
                      {word}
                    </motion.div>
                  ))}
                </div>

                {/* Opções (Bagunçadas) */}
                <div className="flex flex-wrap justify-center gap-2">
                  {orderingWords.map((word, idx) => (
                    <button
                      key={idx}
                      disabled={isChecked}
                      onClick={() => handleOrderingClick(word, idx)}
                      className="px-4 py-2 bg-blue-50 border-2 border-black font-bold text-xs hover:bg-blue-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-0.5 active:shadow-none transition-all"
                    >
                      {word}
                    </button>
                  ))}
                </div>
                
                {!isChecked && selectedOrderingWords.length > 0 && (
                  <button 
                    onClick={handleOrderingReset}
                    className="flex items-center gap-2 mx-auto text-[10px] font-black uppercase text-gray-400 hover:text-black transition-colors"
                  >
                    <RotateCcw size={12} /> Limpar Tudo
                  </button>
                )}
              </div>
            )}

            {currentQuestion.type === 'matching' && (
              <div className="w-full grid grid-cols-2 gap-8 mt-4">
                {/* Coluna Ícones */}
                <div className="flex flex-col gap-3">
                  {shuffledIcons.map(icon => (
                    <button
                      key={icon}
                      disabled={isChecked}
                      onClick={() => handleMatchIcon(icon)}
                      className={cn(
                        "h-20 border-4 border-black flex items-center justify-center text-4xl bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
                        selectedIcon === icon && "bg-blue-100 translate-x-1 translate-y-1 shadow-none",
                        matches[icon] && "bg-gray-100 border-dashed opacity-50 shadow-none scale-90"
                      )}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
                {/* Coluna Palavras */}
                <div className="flex flex-col gap-3">
                  {shuffledWords.map(word => {
                    const matchedIcon = Object.keys(matches).find(k => matches[k] === word);
                    return (
                      <button
                        key={word}
                        disabled={isChecked}
                        onClick={() => handleMatchWord(word)}
                        className={cn(
                          "h-20 border-4 border-black flex items-center justify-center text-xs font-bold bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all",
                          matchedIcon && "bg-gray-100 border-dashed opacity-50 shadow-none scale-90",
                          !matchedIcon && selectedIcon && "border-blue-400 border-dashed"
                        )}
                      >
                        {word}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <div className="w-full grid grid-cols-1 gap-3">
              {(currentQuestion.type === 'selection' || currentQuestion.type === 'audio' || currentQuestion.type === 'tf') && 
                currentQuestion.options.map((option, idx) => (
                <button
                  key={idx}
                  disabled={isChecked}
                  onClick={() => setSelectedOption(idx)}
                  className={cn(
                    "p-4 border-4 border-black font-bold text-sm transition-all text-left flex items-center justify-between",
                    selectedOption === idx ? "bg-blue-100 translate-x-1 translate-y-1 shadow-none" : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50",
                    isChecked && option.is_correct && "bg-green-100 border-green-600",
                    isChecked && selectedOption === idx && !option.is_correct && "bg-red-100 border-red-600"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-400 text-[10px]">{idx + 1}</span>
                    <span>{option.text}</span>
                  </div>
                  {isChecked && option.is_correct && <CheckCircle2 size={16} className="text-green-600" />}
                  {isChecked && selectedOption === idx && !option.is_correct && <AlertCircle size={16} className="text-red-600" />}
                </button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer / Feedback Section */}
      <footer className={cn(
        "p-6 h-32 flex items-center justify-between border-t-4 border-black transition-colors duration-300",
        !isChecked ? "bg-white" : isCorrect ? "bg-green-100" : "bg-red-100"
      )}>
        <div className="flex flex-col flex-1 gap-1">
          {isChecked && (
            <div className={cn(
              "flex flex-col",
              isCorrect ? "text-green-800" : "text-red-800"
            )}>
              <span className="text-sm font-black uppercase mb-1">
                {isCorrect ? "Excelente!" : "Ops, Quase lá!"}
              </span>
              <p className="text-[10px] font-bold leading-tight">
                {currentQuestion.explanation || (isCorrect ? "Você acertou!" : "Essa não era a resposta certa.")}
              </p>
            </div>
          )}
        </div>

        {!isChecked ? (
          <button
            onClick={handleCheck}
            disabled={
              currentQuestion.type === 'matching' 
                ? Object.keys(matches).length < (currentQuestion.content.items?.length || 0)
                : currentQuestion.type === 'ordering'
                ? orderingWords.length > 0 || selectedOrderingWords.length === 0
                : currentQuestion.type === 'speaking'
                ? !spokenText
                : selectedOption === null
            }
            className={cn(
               "px-10 py-4 font-black uppercase text-xs border-4 border-black transition-all",
               (() => {
                 const isReady = 
                   (currentQuestion.type === 'matching' && Object.keys(matches).length >= (currentQuestion.content.items?.length || 0)) ||
                   (currentQuestion.type === 'ordering' && orderingWords.length === 0 && selectedOrderingWords.length > 0) ||
                   (currentQuestion.type === 'speaking' && !!spokenText) ||
                   (currentQuestion.type !== 'matching' && currentQuestion.type !== 'ordering' && currentQuestion.type !== 'speaking' && selectedOption !== null);
                 return isReady
                   ? "bg-green-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1" 
                   : "bg-gray-200 text-gray-400 cursor-not-allowed";
               })()
            )}
          >
            Verificar
          </button>
        ) : (
          <button
            onClick={handleNext}
            className={cn(
              "px-10 py-4 font-black uppercase text-xs border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-2",
              isCorrect ? "bg-green-500 text-white" : "bg-red-500 text-white"
            )}
          >
            Próximo <ArrowRight size={16} />
          </button>
        )}
      </footer>
    </div>
  );
}
