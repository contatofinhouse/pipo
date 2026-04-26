import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Star, Flame, X } from 'lucide-react';
import { cn } from '../lib/utils';

interface LearningHeaderProps {
  level: number;
  exp: number;
  streak: number;
  onExit: () => void;
  title?: string;
  showProgress?: boolean;
  lessonProgress?: number; // 0 to 100
  isReviewMode?: boolean;
}

export function LearningHeader({ 
  level, 
  exp, 
  streak, 
  onExit, 
  title, 
  showProgress = true,
  lessonProgress,
  isReviewMode
}: LearningHeaderProps) {
  return (
    <header className="pipo-hud-glass border-b-4 border-black p-4 flex items-center justify-between sticky top-0 z-[100] h-20 pt-8 sm:pt-4">
      <div className="flex items-center gap-3">
        <button 
          onClick={onExit}
          className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 bg-white"
        >
          <X size={24} />
        </button>
        
        {title && (
          <div className="flex flex-col">
            <h2 className="text-[10px] font-bold uppercase tracking-tight hidden sm:block">{title}</h2>
            {isReviewMode && (
              <span className="text-[7px] text-white bg-red-500 font-bold uppercase px-1.5 py-0.5 rounded-sm">🔄 Reforço</span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center gap-4 flex-1 justify-center max-w-sm px-4">
        {/* Level & XP HUD */}
        <div className="flex flex-col flex-1 gap-1">
          <div className="flex justify-between items-center mb-0.5">
            <div className="flex items-center gap-1">
              <div className="w-5 h-5 pipo-icon-avatar border border-black rounded-sm" />
              <span className="text-[8px] font-black uppercase">Lv.{level}</span>
            </div>
            {lessonProgress !== undefined ? (
              <span className="text-[7px] font-bold text-blue-600">Mastery: {Math.round(lessonProgress)}%</span>
            ) : (
              <span className="text-[7px] font-bold text-gray-500">{exp}/100 XP</span>
            )}
          </div>
          
          {/* Lesson Progress (Top Bar - only during exercises) */}
          {lessonProgress !== undefined && (
            <div className="h-1.5 w-full bg-blue-100 border border-black relative overflow-hidden rounded-full mb-0.5">
              <motion.div 
                className="h-full bg-blue-400"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(100, Math.max(0, lessonProgress))}%` }}
                transition={{ type: 'spring', stiffness: 40 }}
              />
            </div>
          )}

          <div className="h-2.5 w-full bg-gray-200 border-2 border-black relative overflow-hidden rounded-full">
            <motion.div 
              className="h-full bg-green-500"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.max(0, exp))}%` }}
              transition={{ type: 'spring', stiffness: 50 }}
            />
            {/* Glossy Overlay */}
            <div className="absolute inset-0 bg-white/20 h-1" />
          </div>
        </div>

        {/* Streak HUD */}
        <div className="flex items-center gap-1 bg-orange-50 border-2 border-orange-200 px-2 py-1 rounded-lg">
          <Flame size={14} className={cn("text-orange-500", streak > 0 && "fill-orange-500 animate-pulse")} />
          <span className="text-[10px] font-black text-orange-700">{streak}</span>
        </div>
      </div>

      <div className="w-8" /> {/* Balance spacer */}
    </header>
  );
}
