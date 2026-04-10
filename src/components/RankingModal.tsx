import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

interface RankingModalProps {
  rankings: any[];
  session: any;
  onClose: () => void;
}

export function RankingModal({ rankings, session, onClose }: RankingModalProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 20 }}
        className="bg-white border-8 border-black p-6 w-full max-w-sm shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold uppercase text-center mb-4">🏆 Ranking</h2>
        {rankings.length === 0 ? (
          <p className="text-[10px] text-center text-gray-500">Carregando...</p>
        ) : (
          <div className="flex flex-col gap-2">
            {rankings.map((r) => (
              <div 
                key={r.user_id}
                className={cn(
                  "flex items-center gap-3 p-2 border-2 border-black text-[10px]",
                  r.user_id === session?.user?.id ? "bg-yellow-100" : "bg-gray-50",
                  r.rank === 1 ? "border-yellow-500 bg-yellow-50" : ""
                )}
              >
                <span className="font-bold text-lg w-8 text-center">
                  {r.rank === 1 ? '🥇' : r.rank === 2 ? '🥈' : r.rank === 3 ? '🥉' : `#${r.rank}`}
                </span>
                <div className="flex-1">
                  <p className="font-bold uppercase">{r.name}</p>
                  <p className="text-gray-500">Nível {r.english_level} • {r.english_points} XP • 🔥{r.streak_days || 0}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <button 
          onClick={onClose}
          className="w-full mt-4 py-2 bg-gray-200 border-2 border-black text-[10px] font-bold uppercase"
        >
          Fechar
        </button>
      </motion.div>
    </motion.div>
  );
}
