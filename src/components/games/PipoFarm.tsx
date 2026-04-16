import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Droplets } from 'lucide-react';
import { EvolutionStage } from '../../types';

// ─── Types ───────────────────────────────────────────────
export interface FarmPlot {
  id: number;
  state: 'EMPTY' | 'PLANTED' | 'SPROUT' | 'GROWING' | 'READY';
  cropType: string;
  cropName: string;
  plantedAt: number;
  waterCount: number;
  growthTimeMs: number;
  foodEffect: { hunger: number; health: number; energy: number };
}

interface SeedOption {
  emoji: string;
  name: string;
  growthTimeMs: number;
  effect: { hunger: number; health: number; energy: number };
}

interface PipoFarmProps {
  evolutionStage: EvolutionStage;
  farmPlots: FarmPlot[];
  onUpdatePlots: (plots: FarmPlot[]) => void;
  onHarvest: (cropName: string, cropEmoji: string, effect: { hunger: number; health: number; energy: number }) => void;
  onClose: () => void;
}

// ─── Seeds by Evolution Stage ────────────────────────────
const SEEDS_BY_STAGE: Record<string, SeedOption[]> = {
  BABY: [
    { emoji: '🥕', name: 'Cenoura', growthTimeMs: 60 * 60 * 1000, effect: { hunger: 15, health: 5, energy: 0 } },
    { emoji: '🍌', name: 'Banana', growthTimeMs: 45 * 60 * 1000, effect: { hunger: 20, health: 0, energy: 5 } },
    { emoji: '🥦', name: 'Brócolis', growthTimeMs: 50 * 60 * 1000, effect: { hunger: 10, health: 10, energy: 0 } },
  ],
  KIDS: [
    { emoji: '🍓', name: 'Morango', growthTimeMs: 2 * 60 * 60 * 1000, effect: { hunger: 20, health: 10, energy: 0 } },
    { emoji: '🍎', name: 'Maçã', growthTimeMs: 1.5 * 60 * 60 * 1000, effect: { hunger: 15, health: 5, energy: 5 } },
    { emoji: '🍑', name: 'Pêssego', growthTimeMs: 2 * 60 * 60 * 1000, effect: { hunger: 20, health: 5, energy: 5 } },
  ],
  TEEN: [
    { emoji: '🍅', name: 'Tomate', growthTimeMs: 3 * 60 * 60 * 1000, effect: { hunger: 25, health: 10, energy: 5 } },
    { emoji: '🌽', name: 'Milho', growthTimeMs: 2.5 * 60 * 60 * 1000, effect: { hunger: 30, health: 0, energy: 10 } },
    { emoji: '🥒', name: 'Pepino', growthTimeMs: 2 * 60 * 60 * 1000, effect: { hunger: 15, health: 15, energy: 0 } },
  ],
  MASTER_TEEN: [
    { emoji: '🥬', name: 'Alface', growthTimeMs: 4 * 60 * 60 * 1000, effect: { hunger: 20, health: 15, energy: 5 } },
    { emoji: '🫑', name: 'Pimentão', growthTimeMs: 3.5 * 60 * 60 * 1000, effect: { hunger: 25, health: 10, energy: 10 } },
    { emoji: '🍆', name: 'Berinjela', growthTimeMs: 4 * 60 * 60 * 1000, effect: { hunger: 30, health: 10, energy: 5 } },
  ],
  YOUNG_ADULT: [
    { emoji: '🍇', name: 'Uva', growthTimeMs: 5 * 60 * 60 * 1000, effect: { hunger: 35, health: 15, energy: 5 } },
    { emoji: '🫐', name: 'Mirtilo', growthTimeMs: 4.5 * 60 * 60 * 1000, effect: { hunger: 25, health: 20, energy: 5 } },
    { emoji: '🥑', name: 'Abacate', growthTimeMs: 5 * 60 * 60 * 1000, effect: { hunger: 30, health: 15, energy: 10 } },
  ],
  ADULT: [
    { emoji: '🌶️', name: 'Pimenta', growthTimeMs: 6 * 60 * 60 * 1000, effect: { hunger: 35, health: 15, energy: 15 } },
    { emoji: '🧄', name: 'Alho', growthTimeMs: 5 * 60 * 60 * 1000, effect: { hunger: 20, health: 25, energy: 10 } },
    { emoji: '🍠', name: 'Batata Doce', growthTimeMs: 5.5 * 60 * 60 * 1000, effect: { hunger: 40, health: 10, energy: 15 } },
  ],
  LEGENDARY: [
    { emoji: '🌻', name: 'Girassol Dourado', growthTimeMs: 8 * 60 * 60 * 1000, effect: { hunger: 25, health: 25, energy: 25 } },
    { emoji: '✨', name: 'Fruta Estelar', growthTimeMs: 10 * 60 * 60 * 1000, effect: { hunger: 30, health: 30, energy: 30 } },
    { emoji: '🍀', name: 'Trevo da Sorte', growthTimeMs: 6 * 60 * 60 * 1000, effect: { hunger: 20, health: 20, energy: 20 } },
  ],
};

// ─── Growth Phase Calculator ─────────────────────────────
function getPlotPhase(plot: FarmPlot): FarmPlot['state'] {
  if (plot.state === 'EMPTY' || plot.state === 'READY') return plot.state;
  
  const elapsed = Date.now() - plot.plantedAt;
  const waterBonus = plot.waterCount * 15 * 60 * 1000; // 15 min per water
  const effectiveElapsed = elapsed + waterBonus;
  const totalTime = plot.growthTimeMs;

  const progress = effectiveElapsed / totalTime;

  if (progress >= 1) return 'READY';
  if (progress >= 0.66) return 'GROWING';
  if (progress >= 0.33) return 'SPROUT';
  return 'PLANTED';
}

function getProgress(plot: FarmPlot): number {
  if (plot.state === 'EMPTY') return 0;
  if (plot.state === 'READY') return 1;
  
  const elapsed = Date.now() - plot.plantedAt;
  const waterBonus = plot.waterCount * 15 * 60 * 1000;
  const effectiveElapsed = elapsed + waterBonus;
  return Math.min(1, effectiveElapsed / plot.growthTimeMs);
}

function getTimeRemaining(plot: FarmPlot): string {
  if (plot.state === 'EMPTY' || plot.state === 'READY') return '';
  
  const elapsed = Date.now() - plot.plantedAt;
  const waterBonus = plot.waterCount * 15 * 60 * 1000;
  const remaining = Math.max(0, plot.growthTimeMs - elapsed - waterBonus);
  
  if (remaining <= 0) return 'Pronto!';
  
  const hours = Math.floor(remaining / (1000 * 60 * 60));
  const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));

  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
}

// ─── Emoji for Phase ─────────────────────────────────────
function getPhaseEmoji(plot: FarmPlot): string {
  const phase = getPlotPhase(plot);
  switch (phase) {
    case 'EMPTY': return '';
    case 'PLANTED': return '🌰';
    case 'SPROUT': return '🌱';
    case 'GROWING': return '🌿';
    case 'READY': return plot.cropType;
    default: return '';
  }
}

// ─── Component ───────────────────────────────────────────
export function PipoFarm({ evolutionStage, farmPlots, onUpdatePlots, onHarvest, onClose }: PipoFarmProps) {
  const [plots, setPlots] = useState<FarmPlot[]>(() => {
    // Initial sync on mount: catch up growth phases after being offline
    return farmPlots.map(p => {
      if (p.state === 'EMPTY' || p.state === 'READY') return p;
      const newPhase = getPlotPhase(p);
      return { ...p, state: newPhase };
    });
  });
  const [seedPicker, setSeedPicker] = useState<number | null>(null);
  const [waterEffect, setWaterEffect] = useState<number | null>(null);
  const [harvestEffect, setHarvestEffect] = useState<{ id: number; emoji: string } | null>(null);
  const pendingSync = React.useRef(false);

  const seeds = SEEDS_BY_STAGE[evolutionStage] || SEEDS_BY_STAGE['BABY'];

  // Flush pending changes to parent OUTSIDE of render cycle
  useEffect(() => {
    if (pendingSync.current) {
      pendingSync.current = false;
      onUpdatePlots(plots);
    }
  });

  // Sync phases on a tick every 5 seconds
  useEffect(() => {
    const tick = setInterval(() => {
      setPlots(prev => {
        let changed = false;
        const updated = prev.map(p => {
          if (p.state === 'EMPTY' || p.state === 'READY') return p;
          const newPhase = getPlotPhase(p);
          if (newPhase !== p.state) {
            changed = true;
            return { ...p, state: newPhase };
          }
          return p;
        });
        if (changed) {
          pendingSync.current = true;
          return updated;
        }
        return prev;
      });
    }, 5000);
    return () => clearInterval(tick);
  }, []);

  const handlePlotClick = useCallback((plotId: number) => {
    const plot = plots.find(p => p.id === plotId);
    if (!plot) return;

    const phase = getPlotPhase(plot);

    if (phase === 'EMPTY') {
      setSeedPicker(plotId);
      return;
    }

    if (phase === 'READY') {
      // Harvest!
      setHarvestEffect({ id: plotId, emoji: plot.cropType });
      onHarvest(plot.cropName, plot.cropType, plot.foodEffect);
      
      setTimeout(() => {
        setPlots(prev => {
          const updated = prev.map(p =>
            p.id === plotId
              ? { ...p, state: 'EMPTY' as const, cropType: '', cropName: '', plantedAt: 0, waterCount: 0, growthTimeMs: 0, foodEffect: { hunger: 0, health: 0, energy: 0 } }
              : p
          );
          pendingSync.current = true;
          return updated;
        });
        setHarvestEffect(null);
      }, 800);
      return;
    }

    // Water if still growing (max 3)
    if (plot.waterCount < 3) {
      setWaterEffect(plotId);
      setTimeout(() => setWaterEffect(null), 600);
      
      setPlots(prev => {
        const updated = prev.map(p => {
          if (p.id !== plotId) return p;
          const watered = { ...p, waterCount: p.waterCount + 1 };
          const newPhase = getPlotPhase(watered);
          return { ...watered, state: newPhase };
        });
        pendingSync.current = true;
        return updated;
      });
    }
  }, [plots, onHarvest]);

  const handlePlant = useCallback((plotId: number, seed: SeedOption) => {
    setSeedPicker(null);
    setPlots(prev => {
      const updated = prev.map(p =>
        p.id === plotId
          ? {
              ...p,
              state: 'PLANTED' as const,
              cropType: seed.emoji,
              cropName: seed.name,
              plantedAt: Date.now(),
              waterCount: 0,
              growthTimeMs: seed.growthTimeMs,
              foodEffect: seed.effect,
            }
          : p
      );
      pendingSync.current = true;
      return updated;
    });
  }, []);

  const readyCount = plots.filter(p => getPlotPhase(p) === 'READY').length;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col font-pixel overflow-hidden">
      {/* Sky */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-sky-200 to-green-200" />
      
      {/* Clouds */}
      <motion.div className="absolute top-8 left-[10%] text-4xl opacity-40 pointer-events-none"
        animate={{ x: [0, 80, 0] }} transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}>☁️</motion.div>
      <motion.div className="absolute top-16 right-[15%] text-3xl opacity-30 pointer-events-none"
        animate={{ x: [0, -60, 0] }} transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}>☁️</motion.div>
      <motion.div className="absolute top-6 left-[55%] text-2xl opacity-25 pointer-events-none"
        animate={{ x: [0, 50, 0] }} transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}>☁️</motion.div>

      {/* Sun */}
      <motion.div className="absolute top-4 right-8 text-5xl pointer-events-none"
        animate={{ rotate: 360 }} transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}>☀️</motion.div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between p-4 pt-6">
        <button
          onClick={onClose}
          className="flex items-center gap-2 px-3 py-2 bg-white/80 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          <ArrowLeft size={16} />
          <span className="text-[10px] font-bold uppercase">Voltar</span>
        </button>
        <div className="bg-white/80 border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-xs font-bold uppercase">🌱 Jardim do Pipo</span>
        </div>
        {readyCount > 0 && (
          <div className="bg-yellow-300 border-4 border-black px-3 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-pulse">
            <span className="text-[10px] font-bold">🧺 {readyCount} prontos!</span>
          </div>
        )}
      </div>

      {/* Farm Grid */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-8">
        {/* Fence */}
        <div className="bg-amber-800/20 border-8 border-amber-900/40 rounded-lg p-3 shadow-inner">
          <div className="grid grid-cols-4 gap-2">
            {plots.map(plot => {
              const phase = getPlotPhase(plot);
              const progress = getProgress(plot);
              const timeLeft = getTimeRemaining(plot);
              const emoji = getPhaseEmoji(plot);
              const isReady = phase === 'READY';
              const isWatering = waterEffect === plot.id;
              const isHarvesting = harvestEffect?.id === plot.id;
              
              return (
                <motion.button
                  key={plot.id}
                  onClick={() => handlePlotClick(plot.id)}
                  whileTap={{ scale: 0.92 }}
                  className={`
                    relative w-[72px] h-[72px] border-4 rounded-md flex flex-col items-center justify-center
                    transition-colors duration-300
                    ${phase === 'EMPTY'
                      ? 'bg-amber-700/60 border-amber-900/50 hover:bg-amber-600/70'
                      : isReady
                        ? 'bg-green-300/80 border-yellow-500 shadow-[0_0_12px_rgba(234,179,8,0.5)]'
                        : 'bg-amber-600/50 border-amber-800/50'
                    }
                  `}
                >
                  {/* Dirt texture lines */}
                  {phase === 'EMPTY' && (
                    <div className="absolute inset-0 flex flex-col justify-center items-center gap-1 opacity-30 pointer-events-none">
                      <div className="w-10 h-0.5 bg-amber-900 rounded" />
                      <div className="w-8 h-0.5 bg-amber-900 rounded" />
                      <div className="w-10 h-0.5 bg-amber-900 rounded" />
                    </div>
                  )}

                  {/* Plant Emoji */}
                  <AnimatePresence mode="wait">
                    {emoji && (
                      <motion.span
                        key={`${plot.id}-${phase}`}
                        initial={{ scale: 0, y: 10 }}
                        animate={{ 
                          scale: isReady ? [1, 1.1, 1] : 1, 
                          y: 0 
                        }}
                        exit={{ scale: 0, y: -20, opacity: 0 }}
                        transition={isReady ? { scale: { duration: 1.5, repeat: Infinity } } : { type: 'spring' }}
                        className={`text-2xl ${isReady ? 'drop-shadow-[0_0_8px_rgba(234,179,8,0.6)]' : ''}`}
                      >
                        {emoji}
                      </motion.span>
                    )}
                  </AnimatePresence>

                  {/* Empty plot icon */}
                  {phase === 'EMPTY' && (
                    <span className="text-xl opacity-30">➕</span>
                  )}

                  {/* Water drops animation */}
                  <AnimatePresence>
                    {isWatering && (
                      <>
                        {[0, 1, 2].map(i => (
                          <motion.span
                            key={`water-${i}`}
                            className="absolute text-sm pointer-events-none"
                            initial={{ y: -10, x: -10 + i * 10, opacity: 1 }}
                            animate={{ y: 15, opacity: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                          >
                            💧
                          </motion.span>
                        ))}
                      </>
                    )}
                  </AnimatePresence>

                  {/* Harvest float animation */}
                  <AnimatePresence>
                    {isHarvesting && (
                      <motion.div
                        className="absolute inset-0 flex items-center justify-center pointer-events-none"
                        initial={{ y: 0, opacity: 1 }}
                        animate={{ y: -40, opacity: 0 }}
                        transition={{ duration: 0.8 }}
                      >
                        <span className="text-3xl">{harvestEffect.emoji}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Progress bar */}
                  {phase !== 'EMPTY' && phase !== 'READY' && (
                    <div className="absolute bottom-1 left-1 right-1 h-1.5 bg-black/20 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-green-400 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress * 100}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}

                  {/* Time remaining */}
                  {timeLeft && phase !== 'READY' && (
                    <span className="absolute -bottom-5 text-[8px] font-bold text-amber-900/70 whitespace-nowrap">
                      {timeLeft}
                    </span>
                  )}

                  {/* Water count indicator */}
                  {phase !== 'EMPTY' && phase !== 'READY' && (
                    <div className="absolute top-0.5 right-0.5 flex gap-0.5">
                      {[0, 1, 2].map(i => (
                        <div
                          key={i}
                          className={`w-1.5 h-1.5 rounded-full ${
                            i < plot.waterCount ? 'bg-blue-400' : 'bg-black/10'
                          }`}
                        />
                      ))}
                    </div>
                  )}

                  {/* Ready sparkle */}
                  {isReady && (
                    <motion.span 
                      className="absolute -top-1 -right-1 text-xs pointer-events-none"
                      animate={{ rotate: [0, 20, -20, 0], scale: [1, 1.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      ✨
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Info bar */}
        <div className="mt-8 bg-white/80 border-4 border-black px-4 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
          <Droplets size={14} className="text-blue-500" />
          <span className="text-[9px] font-bold text-gray-600 uppercase">
            Toque na terra para plantar • Toque no broto para regar • Toque no vegetal para colher
          </span>
        </div>
      </div>

      {/* Seed Picker Modal */}
      <AnimatePresence>
        {seedPicker !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-end justify-center bg-black/40 backdrop-blur-sm"
            onClick={() => setSeedPicker(null)}
          >
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="w-full max-w-md bg-white border-t-8 border-black p-6"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-4" />
              <h3 className="text-sm font-bold uppercase text-center mb-6">🌰 Escolha uma semente</h3>
              <div className="grid grid-cols-3 gap-3">
                {seeds.map(seed => (
                  <button
                    key={seed.name}
                    onClick={() => handlePlant(seedPicker, seed)}
                    className="flex flex-col items-center gap-2 p-4 border-4 border-black bg-green-100 hover:bg-green-200 active:translate-y-0.5 transition-all"
                  >
                    <span className="text-3xl">{seed.emoji}</span>
                    <span className="text-[10px] font-bold uppercase text-center leading-tight">{seed.name}</span>
                    <div className="text-[8px] text-gray-500 text-center space-y-0.5">
                      <div>Fome +{seed.effect.hunger}</div>
                      {seed.effect.health > 0 && <div>Saúde +{seed.effect.health}</div>}
                      {seed.effect.energy > 0 && <div>NRG +{seed.effect.energy}</div>}
                      <div className="text-amber-600 font-bold mt-1">
                        ⏱️ {seed.growthTimeMs >= 60 * 60 * 1000
                          ? `${(seed.growthTimeMs / (60 * 60 * 1000)).toFixed(1)}h`
                          : `${seed.growthTimeMs / (60 * 1000)}m`}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <button
                onClick={() => setSeedPicker(null)}
                className="w-full mt-4 py-3 border-4 border-black font-bold uppercase text-[10px] bg-gray-100 hover:bg-gray-200"
              >
                Cancelar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Grass at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-green-600/30 pointer-events-none" />
    </div>
  );
}

// ─── Helper: Create empty plots ──────────────────────────
export function createEmptyFarmPlots(): FarmPlot[] {
  return Array.from({ length: 12 }, (_, i) => ({
    id: i,
    state: 'EMPTY' as const,
    cropType: '',
    cropName: '',
    plantedAt: 0,
    waterCount: 0,
    growthTimeMs: 0,
    foodEffect: { hunger: 0, health: 0, energy: 0 },
  }));
}
