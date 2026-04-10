import React from 'react';
import { motion, AnimatePresence } from "motion/react";
import { PetState, FoodType } from "../types";
import { cn } from "../lib/utils";
import { COLLECTIBLES } from "../constants";

interface PetProps {
  state: PetState;
  isActionActive: string | null;
  onPet: () => void;
  onRemoveItem?: (id: string) => void;
  isLevelUp?: boolean;
  isEvolving?: boolean;
  foodType?: FoodType | null;
  weather?: 'SUNNY' | 'RAINY';
  isSick?: boolean;
  message?: string;
}

export default function Pet({ state, isActionActive, onPet, onRemoveItem, isLevelUp, isEvolving, foodType, weather, isSick, message }: PetProps) {
  const [removingItemId, setRemovingItemId] = React.useState<string | null>(null);

  const isHappy = state.happiness > 60 && state.hunger > 40;
  const isSad = state.happiness < 30 || state.hunger < 20;
  const isWeak = state.health < 40;
  const isDead = state.health <= 0;
  const isVeryHappy = state.health > 70 && state.hunger > 70 && state.happiness > 70 && state.energy > 70;

  const stage = state.evolutionStage || 'BABY';

  const getEquipmentStyle = (id: string) => {
    switch (id) {
      case 'red_hat': return "top-[-25px] right-2 text-5xl z-30";
      case 'sunglasses': return "top-4 right-[-4px] text-5xl z-20";
      case 'top_hat': return "top-[-45px] right-2 text-6xl z-30";
      case 'crown': return "top-[-35px] right-2 text-6xl z-30 animate-pulse";
      case 'wizard_hat': return "top-[-60px] right-[-10px] text-7xl z-30";
      case 'scarf': return "bottom-4 right-2 text-5xl z-20";
      case 'bow_tie': return "bottom-6 right-8 text-4xl z-20";
      case 'cape': return "bottom-0 left-[-40px] text-7xl scale-x-[-1] z-0 opacity-80";
      default: return "top-0 right-0 text-3xl";
    }
  };

  const equipped = state.equippedItems?.map(id => {
    const baseId = id.split('-')[0];
    const collectible = COLLECTIBLES.find(c => c.id === baseId);
    return collectible ? { ...collectible, instanceId: id } : null;
  }).filter(Boolean) as any[] || [];

  // Determine color based on state and evolution
  const getBodyColor = () => {
    if (isDead) return "bg-stone-400";
    if (isWeak || isSick) return "bg-emerald-200";
    if (isSad) return "bg-stone-500";
    
    if (stage === 'BABY') return "bg-[#A67C52]"; // Lighter brown
    if (stage === 'ADULT') return "bg-[#5D3A1A]"; // Darker brown
    if (stage === 'LEGENDARY') return "bg-[#FFD700]"; // Golden (or keep brown with aura)
    return "bg-[#8B5E3C]"; // Capybara brown
  };

  const getScale = () => {
    if (stage === 'BABY') return 0.75;
    if (stage === 'TEEN') return 1;
    if (stage === 'ADULT') return 1.25;
    if (stage === 'LEGENDARY') return 1.4;
    return 1;
  };

  return (
    <div className="relative flex flex-col items-center justify-center w-64 h-64">
      {/* Evolution Effect Overlay */}
      <AnimatePresence>
        {isEvolving && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 1, 1, 0],
              backgroundColor: ["rgba(255,255,255,0)", "rgba(255,255,255,1)", "rgba(255,255,255,1)", "rgba(255,255,255,0)"]
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 2, times: [0, 0.4, 0.6, 1] }}
            className="absolute inset-0 z-50 pointer-events-none flex items-center justify-center"
          >
            <motion.div
              animate={{ 
                scale: [0, 5, 10],
                rotate: [0, 90, 180]
              }}
              transition={{ duration: 1.5 }}
              className="text-6xl"
            >
              ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Evolution Particles */}
      <AnimatePresence>
        {isEvolving && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={`evolve-particle-${i}`}
                initial={{ x: 0, y: 0, opacity: 0, scale: 0 }}
                animate={{ 
                  x: (Math.random() - 0.5) * 300,
                  y: (Math.random() - 0.5) * 300,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 1.5, delay: 0.5 + Math.random() * 0.5 }}
                className="absolute left-1/2 top-1/2 text-xl"
              >
                {['⭐', '✨', '💎', '🌟'][Math.floor(Math.random() * 4)]}
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Weather: Rain */}
      {weather === 'RAINY' && (
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`rain-${i}`}
              initial={{ y: -50, x: Math.random() * 250 }}
              animate={{ y: 350, x: (Math.random() - 0.5) * 50 + (i * 15) }}
              transition={{ duration: 0.8 + Math.random(), repeat: Infinity, ease: "linear" }}
              className="absolute w-[2px] h-4 bg-blue-400/50"
            />
          ))}
        </div>
      )}

      {/* Speech Bubble */}
      <AnimatePresence>
        {message && !state.isSleeping && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="absolute -top-32 left-1/2 -translate-x-1/2 z-[60] w-48"
          >
            <div className="bg-white border-4 border-black p-2 relative shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="text-[8px] font-bold uppercase text-center leading-tight">{message}</p>
              {/* Triangle Tail */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[12px] border-t-black"></div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Shadow - Pixelated */}
      <motion.div 
        className="absolute bottom-4 w-32 h-4 bg-black/10"
        animate={{
          scale: state.isSleeping ? [1, 1.05, 1] : [1, 1.08, 1],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Main Body - Pixelated */}
      <motion.div
        drag
        dragConstraints={{ left: -100, right: 100, top: -100, bottom: 50 }}
        dragElastic={0.1}
        onTap={onPet}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "relative w-44 h-40 flex flex-col items-center justify-center z-10 cursor-grab active:cursor-grabbing",
          getBodyColor(),
          stage === 'LEGENDARY' && "shadow-[0_0_30px_rgba(255,215,0,0.5)]"
        )}
        style={{
          scale: getScale(),
          boxShadow: `
            inset -8px -8px 0px 0px rgba(0,0,0,0.1),
            8px 0px 0px 0px #000,
            -8px 0px 0px 0px #000,
            0px 8px 0px 0px #000,
            0px -8px 0px 0px #000
            ${stage === 'LEGENDARY' ? ', 0px 0px 20px 5px rgba(255,215,0,0.4)' : ''}
          `
        }}
        animate={isEvolving ? {
          scale: [getScale(), getScale() * 1.8, 0, getScale() * 1.2, getScale()],
          rotate: [0, 0, 720, 720, 0],
          filter: [
            "brightness(1) contrast(1) grayscale(0)",
            "brightness(0) contrast(10) grayscale(1)",
            "brightness(10) contrast(10) grayscale(0)",
            "brightness(1) contrast(1) grayscale(0)",
            "brightness(1) contrast(1) grayscale(0)"
          ],
        } : state.isSleeping ? {
          scaleY: [1, 0.92, 1],
          y: [0, 10, 0],
          scaleX: [1, 1.02, 1]
        } : isActionActive === 'PLAY' ? {
          y: [0, -60, 0, -60, 0],
          x: [0, 40, -40, 40, 0],
          rotate: [0, 360, 720, 360, 0], // Cambalhota!
          scale: [1, 1.2, 0.8, 1.2, 1],
          transition: { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
        } : isActionActive === 'FEED' ? {
          y: [0, -50, 0, 0, 0],
          scaleY: [1, 1.2, 0.8, 1.05, 1],
          scaleX: [1, 0.8, 1.2, 0.95, 1],
          transition: { 
            duration: 1.5, 
            times: [0, 0.3, 0.6, 0.8, 1],
            ease: "easeInOut" 
          }
        } : isActionActive === 'PET' ? {
          scale: [1, 1.12, 1],
          rotate: [0, 5, -5, 5, 0],
          y: [0, -10, 0],
          filter: ["brightness(1)", "brightness(1.2)", "brightness(1)"],
          transition: { duration: 0.3, repeat: 1, ease: "easeInOut" }
        } : isActionActive === 'CLEAN' ? {
          scale: [1, 1.05, 1],
          rotate: [0, 2, -2, 0],
          transition: { duration: 0.5, repeat: 2 }
        } : {
          scaleY: [1, 1.02, 1],
          y: [0, -2, 0]
        }}
        transition={{ 
          duration: isEvolving ? 2 : state.isSleeping ? 4 : isActionActive === 'PLAY' ? 0.5 : 4, 
          repeat: isEvolving ? 0 : isActionActive === 'FEED' ? 0 : Infinity,
          ease: isEvolving ? "easeInOut" : "easeInOut"
        }}
      >
        {/* Ears - Pixelated (Now inside body for sync) */}
        <div className="absolute -top-8 flex justify-between w-32 z-0">
          <motion.div 
            className="w-8 h-8 bg-[#6F4A30] border-4 border-black/20"
            animate={state.isSleeping ? { 
              rotate: [0, -8, -5, -8, 0],
              y: [0, 2, 0]
            } : isActionActive === 'PET' ? {
              rotate: [0, -15, 0],
              scale: [1, 1.1, 1]
            } : { rotate: [0, 5, 0] }}
            transition={{ 
              duration: state.isSleeping ? 4 : 0.3, 
              repeat: state.isSleeping ? Infinity : 1, 
              ease: (v) => Math.floor(v * 4) / 4,
              times: state.isSleeping ? [0, 0.1, 0.2, 0.3, 1] : undefined
            }}
          />
          <motion.div 
            className="w-8 h-8 bg-[#6F4A30] border-4 border-black/20"
            animate={state.isSleeping ? { 
              rotate: [0, 8, 5, 8, 0],
              y: [0, 2, 0]
            } : isActionActive === 'PET' ? {
              rotate: [0, 15, 0],
              scale: [1, 1.1, 1]
            } : { rotate: [0, -5, 0] }}
            transition={{ 
              duration: state.isSleeping ? 4 : 0.3, 
              repeat: state.isSleeping ? Infinity : 1, 
              ease: (v) => Math.floor(v * 4) / 4,
              times: state.isSleeping ? [0, 0.1, 0.2, 0.3, 1] : undefined
            }}
          />
        </div>

        {/* Equipped Clothing */}
        {equipped.map((item: any) => (
          <div 
            key={item.instanceId} 
            className={cn("absolute cursor-pointer pointer-events-auto transition-transform hover:brightness-110 active:scale-95 group", getEquipmentStyle(item.id))}
            onClick={(e) => {
               e.stopPropagation();
               setRemovingItemId(removingItemId === item.instanceId ? null : item.instanceId);
            }}
          >
            {item.icon}
            
            <AnimatePresence>
               {removingItemId === item.instanceId && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    onClick={(e) => {
                       e.stopPropagation();
                       onRemoveItem?.(item.instanceId);
                       setRemovingItemId(null);
                    }}
                    className="absolute -top-4 -right-4 w-6 h-6 bg-red-500 border-2 border-white rounded-full flex items-center justify-center text-[10px] text-white font-bold shadow-lg z-50 hover:bg-red-600"
                  >
                    X
                  </motion.button>
               )}
            </AnimatePresence>
          </div>
        ))}

        {/* Glow effect for feeding */}
        <AnimatePresence>
          {isActionActive === 'FEED' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.3, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, repeat: 2, ease: (v) => Math.floor(v * 2) / 2 }}
              className="absolute inset-0 bg-white/30"
            />
          )}
        </AnimatePresence>

        {/* Shine effect for cleaning */}
        <AnimatePresence>
          {isActionActive === 'CLEAN' && (
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: '200%' }}
              transition={{ duration: 0.8, ease: (v) => Math.floor(v * 8) / 8 }}
              className="absolute inset-0 w-1/2 bg-white/20 z-10"
            />
          )}
        </AnimatePresence>

        {/* Petting Pulse Effect */}
        <AnimatePresence>
          {isActionActive === 'PET' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.2, 1.5] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, repeat: 2 }}
              className="absolute inset-0 border-8 border-white/40 z-0"
            />
          )}
        </AnimatePresence>

        {/* Eyes - Pixelated */}
        <div className="flex gap-12 mb-2 z-20 relative">
          {state.isSleeping ? (
            <>
              <div className="w-4 h-1 bg-black/40" />
              <div className="w-4 h-1 bg-black/40" />
            </>
          ) : isDead ? (
            <>
              <div className="text-2xl font-bold text-black/40 font-display">X</div>
              <div className="text-2xl font-bold text-black/40 font-display">X</div>
            </>
          ) : (
            <>
              <div className="relative">
                <motion.div 
                  className="w-4 h-4 bg-black"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, ease: (v) => Math.floor(v * 2) / 2 }}
                />
              </div>
              <div className="relative">
                <motion.div 
                  className="w-4 h-4 bg-black"
                  animate={{ scaleY: [1, 0.1, 1] }}
                  transition={{ duration: 5, repeat: Infinity, repeatDelay: 3, ease: (v) => Math.floor(v * 2) / 2 }}
                />
              </div>
            </>
          )}
        </div>

        {/* Snout Area - Pixelated */}
        <div className={cn(
          "relative w-24 h-16 flex flex-col items-center justify-center mt-1 border-b-4 border-black/10",
          stage === 'BABY' ? "bg-[#966B47]" : stage === 'ADULT' ? "bg-[#4D2A0A]" : "bg-[#7A5235]"
        )}>
          {/* Nose */}
          <motion.div 
            className="flex gap-2 mb-2"
            animate={state.isSleeping ? { y: [0, 1, 0] } : {}}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-2 h-2 bg-black/40" />
            <div className="w-2 h-2 bg-black/40" />
          </motion.div>
          
          {/* Mouth */}
          {!state.isSleeping && !isDead && (
            <motion.div 
              className={cn(
                "bg-black/40 transition-all duration-500",
                isVeryHappy 
                  ? "w-10 h-2 rounded-b-lg mt-1" 
                  : isHappy 
                    ? "w-8 h-1 mt-1" 
                    : "w-8 h-1 mb-2"
              )}
              animate={isActionActive === 'FEED' ? {
                scaleY: [1, 2.5, 1],
                y: [0, 2, 0]
              } : {}}
              transition={isActionActive === 'FEED' ? {
                duration: 0.2,
                repeat: 7,
                delay: 0.6,
                ease: "easeInOut"
              } : {}}
            />
          )}
          {isDead && <div className="w-8 h-1 bg-black/40 mt-1" />}
        </div>

        {/* Umbrella (if raining) */}
        {weather === 'RAINY' && !state.isSleeping && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-16 -right-8 text-6xl z-30"
          >
            ⛱️
          </motion.div>
        )}

        {/* Sick Visual (Thermometer) */}
        {isSick && (
          <motion.div 
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration: 1 }}
            className="absolute -top-4 -left-4 text-3xl z-40"
          >
            🤒
          </motion.div>
        )}

        {/* Blush - Pixelated */}
        {isHappy && !state.isSleeping && (
          <div className="absolute flex justify-between w-full px-8 top-16">
            <div className="w-6 h-3 bg-pink-500/30" />
            <div className="w-6 h-3 bg-pink-500/30" />
          </div>
        )}

        {/* Evolution Accessories */}
        {stage === 'TEEN' && (
          <div className="absolute top-0 left-0 w-full h-4 bg-red-500/80 border-b-2 border-black/20" title="Bandana" />
        )}
        {stage === 'LEGENDARY' && (
          <div className="absolute -top-10 text-4xl animate-bounce">👑</div>
        )}
      </motion.div>

      {/* Poop */}
      <div className="absolute bottom-0 flex gap-2">
        {Array.from({ length: state.poopCount }).map((_, i) => (
          <motion.div
            key={`poop-${i}-${state.lastUpdate}`}
            initial={{ scale: 0 }}
            animate={isActionActive === 'CLEAN' ? {
              x: [0, 400],
              y: [0, -100],
              opacity: [1, 0],
              scale: [1, 0.5],
              rotate: [0, 720]
            } : { scale: 1 }}
            transition={isActionActive === 'CLEAN' ? {
              duration: 1.5,
              delay: i * 0.2,
              ease: "easeIn"
            } : {}}
            className="text-2xl"
          >
            💩
          </motion.div>
        ))}
      </div>

      {/* Action Effects */}
      <AnimatePresence>
        {isActionActive === 'FEED' && (
          <>
            {/* Catch Effect Burst */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 2, 0], opacity: [0, 1, 0] }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="absolute top-0 text-3xl z-40"
            >
              💥
            </motion.div>

            <motion.div
              initial={{ y: -150, opacity: 0, scale: 0 }}
              animate={{ 
                y: [ -150, -40, 10 ],
                opacity: [ 0, 1, 1, 0 ],
                scale: [ 0, 1.5, 1, 0.5 ]
              }}
              transition={{ duration: 1.2, times: [0, 0.5, 0.8, 1], ease: "easeIn" }}
              className="absolute -top-16 text-5xl z-30"
            >
              {foodType === 'PASTA' ? '🍝' : foodType === 'PIZZA' ? '🍕' : foodType === 'VEGGIES' ? '🥗' : '🍎'}
            </motion.div>
            {/* Bite particles and sparkles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`feed-particle-${i}`}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0.5, 1.2, 0],
                  x: (Math.random() - 0.5) * 120,
                  y: (Math.random() - 0.5) * 60 - 20,
                  rotate: Math.random() * 360
                }}
                transition={{ duration: 0.8, delay: 0.8 + Math.random() * 0.4 }}
                className={cn(
                  "absolute z-20",
                  i % 3 === 0 ? "w-2 h-2 bg-red-500" : 
                  i % 3 === 1 ? "w-1.5 h-1.5 bg-green-500" : 
                  "text-xs"
                )}
              >
                {i % 3 === 2 ? '✨' : ''}
              </motion.div>
            ))}
          </>
        )}
        {isActionActive === 'PLAY' && (
          <>
            <motion.div
              initial={{ scale: 0, rotate: -180, y: -40 }}
              animate={{ scale: 1.2, rotate: 0, y: -20 }}
              exit={{ scale: 0, rotate: 180, y: 20 }}
              className="absolute -top-16 text-5xl z-30"
            >
              ⚽
            </motion.div>
            {/* Fun confetti particles */}
            {[...Array(24)].map((_, i) => (
              <motion.div
                key={`play-particle-${i}`}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0.5, 1.5, 0.5],
                  x: (Math.random() - 0.5) * 250,
                  y: -Math.random() * 200 - 50,
                  rotate: Math.random() * 720
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
                className={cn(
                  "absolute z-20",
                  i % 6 === 0 ? "text-2xl" : "w-2 h-4"
                )}
                style={i % 6 !== 0 ? {
                  backgroundColor: ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'][i % 6]
                } : {}}
              >
                {i % 6 === 0 ? ['✨', '⭐', '🎈', '🎊', '🎉', '🌈'][Math.floor(i / 4) % 6] : ''}
              </motion.div>
            ))}
          </>
        )}
        {isActionActive === 'CLEAN' && (
          <>
            {/* Broom Animation */}
            <motion.div
              initial={{ x: -200, y: 40, rotate: -45 }}
              animate={{ 
                x: [ -200, 200 ],
                rotate: [ -45, -15, -45, -15, -45 ]
              }}
              transition={{ duration: 2, ease: "linear" }}
              className="absolute bottom-4 text-5xl z-40"
            >
              🧹
            </motion.div>

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
              {[...Array(20)].map((_, i) => (
              <motion.div
                key={`clean-particle-${i}`}
                initial={{ opacity: 0, scale: 0, y: 60, x: (Math.random() - 0.5) * 120 }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  scale: [0.5, 1.3, 1.6, 0],
                  y: -150 - Math.random() * 80,
                  x: (Math.random() - 0.5) * 200,
                  rotate: Math.random() * 360
                }}
                transition={{ 
                  duration: 2.5, 
                  delay: i * 0.1,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
                className="absolute text-2xl"
              >
                {i % 4 === 0 ? '🫧' : i % 4 === 1 ? '✨' : i % 4 === 2 ? '🧼' : '💎'}
              </motion.div>
            ))}
          </div>
          </>
        )}
        {isActionActive === 'PET' && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={`pet-particle-${i}`}
                initial={{ opacity: 0, scale: 0, y: 0, x: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0.5, 1.8, 0.5],
                  y: -100 - Math.random() * 80,
                  x: (Math.random() - 0.5) * 180,
                  rotate: [0, 15, -15, 0]
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.15,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute text-3xl"
              >
                {['💖', '🥰', '💕', '💗'][i % 4]}
              </motion.div>
            ))}
          </div>
        )}
        {(isActionActive === 'FEED' || isActionActive === 'PLAY' || isActionActive === 'PET') && (
          <motion.div
            key={`heart-${Date.now()}`}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{ opacity: [0, 1, 0], scale: [1, 1.5, 1], y: -80 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute text-3xl text-red-500"
          >
            ❤️
          </motion.div>
        )}
        {state.isSleeping && (
          <div className="absolute top-0 right-0">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={`sleep-particle-${i}-${Date.now()}`}
                initial={{ opacity: 0, y: 0, x: 0, scale: 0.5 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  y: -100,
                  x: [0, 20, -20, 0],
                  scale: [0.5, 1.5, 1]
                }}
                transition={{ 
                  duration: 3, 
                  delay: i * 1,
                  repeat: Infinity,
                  ease: "linear"
                }}
                className="absolute text-2xl font-bold text-blue-400/60 font-display"
              >
                {['Z', 'z', 'Z'][i % 3]}
              </motion.div>
            ))}
          </div>
        )}

        {/* Level Up Celebration */}
        {isLevelUp && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-[100]">
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={`levelup-particle-${i}`}
                initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                animate={{ 
                  opacity: [0, 1, 1, 0], 
                  scale: [0.5, 2, 1, 0],
                  x: (Math.random() - 0.5) * 400,
                  y: -Math.random() * 300 - 50,
                  rotate: Math.random() * 1080
                }}
                transition={{ 
                  duration: 2, 
                  delay: i * 0.05,
                  ease: "easeOut"
                }}
                className="absolute text-3xl"
              >
                {['✨', '⭐', '🎊', '🎉', '👑', '💎', '🔥'][i % 7]}
              </motion.div>
            ))}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.2, 1], opacity: 1 }}
              className="bg-yellow-400 border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <span className="text-xs font-bold uppercase">Level Up!</span>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
