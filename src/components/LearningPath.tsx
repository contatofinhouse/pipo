import React, { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Star, Lock, Play } from 'lucide-react';
import { cn } from '../lib/utils';

interface Unit {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Lesson {
  id: string;
  title: string;
  status: 'locked' | 'unlocked' | 'completed';
  mastery: number;
}

interface LearningPathProps {
  units: Unit[];
  isLoading?: boolean;
  currentUnitId?: string;
  onBack: () => void;
  onStartLesson: (lessonId: string) => void;
  stats?: {
    level: number;
    exp: number;
    streak: number;
  };
}

export function LearningPath({ units, isLoading, currentUnitId, onBack, onStartLesson, stats = { level: 1, exp: 0, streak: 0 } }: LearningPathProps) {
  const activeLessonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scroll to the active lesson when the component mounts
    if (activeLessonRef.current) {
      setTimeout(() => {
        activeLessonRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    }
  }, [units]);

  // Mock data positioning logic for the winding path
  const getPositionClass = (index: number) => {
    const positions = [
      'translate-x-0',        // Center
      'translate-x-12',       // Right
      'translate-x-20',       // Far Right
      'translate-x-8',        // Back Right
      'translate-x-0',        // Center
      '-translate-x-12',      // Left
      '-translate-x-20',      // Far Left
      '-translate-x-8',       // Back Left
    ];
    return positions[index % positions.length];
  };

  return (
    <div className="flex-1 flex flex-col font-pixel overflow-hidden relative">
      
      {/* Main Path Area */}
      <div className="flex-1 overflow-y-auto p-8 pb-32">
        <div className="max-w-xs mx-auto flex flex-col items-center relative">
          
          {/* SVG Path Connector (Winding line) */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" preserveAspectRatio="none">
             {/* We would dynamically calculate this in a real implementation */}
          </svg>

          {units.map((unit, uIdx) => (
            <div key={unit.id} className="w-full flex flex-col items-center mb-12">
              <div className="bg-white border-4 border-black p-4 w-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-8 text-center">
                <h3 className="text-[10px] font-black uppercase text-gray-400 mb-1">UNIT {uIdx + 1}</h3>
                <h4 className="text-sm font-bold uppercase">{unit.title}</h4>
                <p className="text-[8px] text-gray-500 mt-2">{unit.description}</p>
              </div>

              <div className="space-y-16 py-8 flex flex-col items-center w-full">
                {unit.lessons.map((lesson, lIdx) => {
                  const isFirstUnlocked = lesson.status === 'unlocked';
                  return (
                    <motion.div
                      key={lesson.id}
                      ref={isFirstUnlocked ? activeLessonRef : null}
                      className={cn(
                        "relative group",
                        getPositionClass(lIdx)
                      )}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                    >
                      {/* Lesson Node */}
                      <button
                        disabled={lesson.status === 'locked'}
                        onClick={() => onStartLesson(lesson.id)}
                        className={cn(
                          "w-16 h-16 rounded-full border-4 border-black flex items-center justify-center transition-all relative z-10",
                          lesson.status === 'locked' 
                            ? 'bg-gray-300 cursor-not-allowed grayscale' 
                            : 'bg-yellow-400 shadow-[0px_6px_0px_0px_rgba(0,0,0,0.2)] hover:scale-110 active:translate-y-1 active:shadow-none',
                          lesson.status === 'completed' && 'bg-green-400'
                        )}
                      >
                        {lesson.status === 'locked' ? (
                          <Lock size={24} className="text-gray-500" />
                        ) : lesson.status === 'completed' ? (
                          <Star size={24} className="text-white fill-white" />
                        ) : (
                          <Play size={24} className="text-black fill-black ml-1" />
                        )}

                        {/* Mastery Indicator Circle */}
                        {lesson.status !== 'locked' && (
                          <div className="absolute -top-1 -right-1 w-6 h-6 bg-white border-2 border-black rounded-full flex items-center justify-center text-[8px] font-bold">
                            {lesson.mastery}%
                          </div>
                        )}
                      </button>

                      {/* Tooltip Label */}
                      <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap">
                         <span className="text-[8px] font-bold uppercase bg-white border border-black px-2 py-0.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                           {lesson.title}
                         </span>
                      </div>

                      {/* Completion Ring (if unlocked) */}
                      {lesson.status === 'unlocked' && (
                        <div className="absolute inset-0 -m-2 border-4 border-dashed border-yellow-500/30 rounded-full animate-[spin_10s_linear_infinite] pointer-events-none" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))}

          {isLoading && units.length === 0 ? (
            <div className="w-full text-center py-20">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-black border-t-transparent mb-4"></div>
              <p className="text-[10px] font-black uppercase">Sincronizando Currículo...</p>
            </div>
          ) : (
            <div className="w-full text-center py-20 opacity-30">
              <span className="text-[10px] font-bold uppercase border-2 border-black px-4 py-2">
                {units.length === 0 ? "CARREGANDO LIÇÕES..." : "MORE LESSONS SOON..."}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="fixed bottom-4 right-4 text-4xl opacity-10 pointer-events-none grayscale">
        🏫 📚 📝
      </div>
    </div>
  );
}
