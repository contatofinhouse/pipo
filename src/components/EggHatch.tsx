import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';

interface EggHatchProps {
  warmth: number; // 0-100
  onTap: () => void;
  onHatch: () => void;
}

export default function EggHatch({ warmth, onTap, onHatch }: EggHatchProps) {
  const [cracking, setCracking] = useState(false);
  const isHatching = warmth >= 100;

  // Trigger hatch animation
  if (isHatching && !cracking) {
    setCracking(true);
    setTimeout(() => onHatch(), 3000);
  }

  // Warmth determines glow color: cold blue → warm orange → hot red
  const getGlowColor = () => {
    if (warmth < 30) return 'rgba(100, 150, 255, 0.3)';
    if (warmth < 60) return 'rgba(255, 200, 50, 0.4)';
    if (warmth < 90) return 'rgba(255, 130, 30, 0.5)';
    return 'rgba(255, 60, 20, 0.6)';
  };

  const getLampIntensity = () => {
    if (warmth < 20) return '🕯️';
    if (warmth < 50) return '💡';
    if (warmth < 80) return '🔥';
    return '☀️';
  };

  return (
    <div className="min-h-screen bg-[#1a1a2e] flex flex-col items-center justify-center p-6 font-pixel text-white relative overflow-hidden">
      {/* Ambient glow background */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          background: `radial-gradient(circle at 50% 60%, ${getGlowColor()}, transparent 70%)`
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-lg font-bold uppercase mb-2 z-10"
      >
        Um ovo misterioso!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-[10px] text-gray-400 uppercase mb-8 z-10"
      >
        Toque para aquecer e chocar o ovo
      </motion.p>

      {/* Warmth Bar */}
      <div className="w-48 h-6 bg-gray-800 border-4 border-gray-600 mb-8 z-10 relative overflow-hidden">
        <motion.div
          className="h-full"
          animate={{ width: `${warmth}%` }}
          transition={{ duration: 0.3 }}
          style={{
            background: warmth < 30 ? '#4a90d9' : warmth < 60 ? '#f5a623' : warmth < 90 ? '#e74c3c' : '#ff6b6b'
          }}
        />
        <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold uppercase">
          Calor: {Math.round(warmth)}%
        </span>
      </div>

      {/* Lamp */}
      <motion.div
        className="text-5xl mb-4 z-10"
        animate={{
          scale: [1, 1.1 + warmth * 0.003, 1],
          filter: `brightness(${1 + warmth * 0.02})`
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {getLampIntensity()}
      </motion.div>

      {/* The Egg */}
      <AnimatePresence>
        {!cracking ? (
          <motion.div
            className="relative cursor-pointer z-10"
            onClick={onTap}
            whileTap={{ scale: 0.92 }}
            animate={{
              y: [0, -3, 0],
              rotate: warmth > 70 ? [-2, 2, -2] : [0, 0, 0]
            }}
            transition={{ 
              duration: warmth > 70 ? 0.3 : 3, 
              repeat: Infinity 
            }}
          >
            {/* Egg body */}
            <div 
              className="w-32 h-40 relative flex items-center justify-center"
              style={{
                background: 'linear-gradient(180deg, #f5f0e8 0%, #e8dccf 50%, #d4c4b0 100%)',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                boxShadow: `
                  inset -6px -6px 0px rgba(0,0,0,0.1),
                  6px 0px 0px 0px #8B7355,
                  -6px 0px 0px 0px #8B7355,
                  0px 6px 0px 0px #8B7355,
                  0px -6px 0px 0px #8B7355,
                  0 0 ${warmth}px ${getGlowColor()}
                `
              }}
            >
              {/* Crack marks appear as warmth increases */}
              {warmth > 40 && (
                <div className="absolute top-8 left-6 text-[10px] text-gray-500 opacity-60" style={{ transform: 'rotate(-20deg)' }}>
                  ╱
                </div>
              )}
              {warmth > 60 && (
                <div className="absolute top-12 right-7 text-[10px] text-gray-500 opacity-70" style={{ transform: 'rotate(15deg)' }}>
                  ╲╱
                </div>
              )}
              {warmth > 80 && (
                <>
                  <div className="absolute top-6 right-10 text-[10px] text-gray-400" style={{ transform: 'rotate(-30deg)' }}>
                    ╱╲
                  </div>
                  <div className="absolute bottom-12 left-8 text-[10px] text-gray-400" style={{ transform: 'rotate(10deg)' }}>
                    ╱
                  </div>
                </>
              )}
              
              {/* Pixel spots on egg */}
              <div className="absolute top-10 left-8 w-3 h-3 bg-[#c4a882] rounded-sm" />
              <div className="absolute top-16 right-9 w-4 h-3 bg-[#c4a882] rounded-sm" />
              <div className="absolute bottom-10 left-10 w-3 h-4 bg-[#c4a882] rounded-sm" />
              
              {/* Inner glow */}
              {warmth > 50 && (
                <motion.div
                  className="absolute inset-0 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%]"
                  animate={{ opacity: [0.1, 0.3, 0.1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{ background: `radial-gradient(circle, ${getGlowColor()}, transparent 60%)` }}
                />
              )}
            </div>

            {/* Tap ripple effect */}
            <motion.div
              key={warmth}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 rounded-full border-2 border-yellow-400 pointer-events-none"
            />
          </motion.div>
        ) : (
          /* Hatching animation */
          <motion.div
            className="relative z-10"
            initial={{ scale: 1 }}
            animate={{
              scale: [1, 1.1, 0.9, 1.2, 1.5, 0],
              rotate: [0, -10, 10, -15, 15, 0],
              filter: [
                'brightness(1)',
                'brightness(1.5)',
                'brightness(2)',
                'brightness(3)',
                'brightness(5)',
                'brightness(10)'
              ]
            }}
            transition={{ duration: 2.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] }}
          >
            <div
              className="w-32 h-40 flex items-center justify-center"
              style={{
                background: 'linear-gradient(180deg, #f5f0e8 0%, #e8dccf 50%, #d4c4b0 100%)',
                borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%',
                boxShadow: `0 0 60px rgba(255, 215, 0, 0.8)`
              }}
            >
              <span className="text-4xl">🐣</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Particles when tapping */}
      {warmth > 20 && (
        <div className="absolute inset-0 pointer-events-none z-0">
          {[...Array(Math.min(Math.floor(warmth / 10), 10))].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute text-sm"
              initial={{
                x: `${40 + Math.random() * 20}%`,
                y: `${50 + Math.random() * 20}%`,
                opacity: 0
              }}
              animate={{
                y: [`${50 + Math.random() * 20}%`, `${20 + Math.random() * 20}%`],
                opacity: [0, 0.8, 0],
              }}
              transition={{
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            >
              {['✨', '🔸', '💛', '⭐'][i % 4]}
            </motion.div>
          ))}
        </div>
      )}

      {/* Tap counter */}
      <motion.p
        className="text-[10px] text-gray-500 mt-8 uppercase z-10"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        {warmth < 100
          ? warmth < 30
            ? '👆 Toque no ovo para aquecê-lo...'
            : warmth < 70
              ? '🔥 Está esquentando! Continue tocando!'
              : '💥 Quase lá! O ovo está tremendo!'
          : '🐣 Pipo está nascendo!'
        }
      </motion.p>
    </div>
  );
}
