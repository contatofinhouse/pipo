import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

interface GuitarOverlayProps {
  onClose: () => void;
}

// Musical note frequencies (standard tuning)
const NOTE_FREQS: Record<string, number> = {
  'C3': 130.81, 'D3': 146.83, 'E3': 164.81, 'F3': 174.61, 'G3': 196.00, 'A3': 220.00, 'B3': 246.94,
  'C4': 261.63, 'D4': 293.66, 'E4': 329.63, 'F4': 349.23, 'G4': 392.00, 'A4': 440.00, 'B4': 493.88,
  'C5': 523.25, 'D5': 587.33, 'E5': 659.25,
};

// 4 lanes: Green, Red, Yellow, Blue (like Guitar Hero)
const LANE_COLORS = ['bg-green-500', 'bg-red-500', 'bg-yellow-400', 'bg-blue-500'];
const LANE_BORDER = ['border-green-700', 'border-red-700', 'border-yellow-600', 'border-blue-700'];
const LANE_LABELS = ['G', 'R', 'Y', 'B'];

interface SongNote {
  lane: number;  // 0-3
  time: number;  // seconds from start
  freq: number;
}

interface Song {
  name: string;
  artist: string;
  bpm: number;
  notes: SongNote[];
}

// Songs with their note charts
const SONGS: Song[] = [
  {
    name: 'Smoke on the Water',
    artist: 'Deep Purple',
    bpm: 112,
    notes: [
      { lane: 0, time: 0.0, freq: NOTE_FREQS['G3'] },
      { lane: 1, time: 0.5, freq: NOTE_FREQS['B3'] },
      { lane: 2, time: 1.0, freq: NOTE_FREQS['C4'] },
      { lane: 0, time: 2.0, freq: NOTE_FREQS['G3'] },
      { lane: 1, time: 2.5, freq: NOTE_FREQS['B3'] },
      { lane: 3, time: 3.0, freq: NOTE_FREQS['D4'] },
      { lane: 2, time: 3.5, freq: NOTE_FREQS['C4'] },
      { lane: 0, time: 4.5, freq: NOTE_FREQS['G3'] },
      { lane: 1, time: 5.0, freq: NOTE_FREQS['B3'] },
      { lane: 2, time: 5.5, freq: NOTE_FREQS['C4'] },
      { lane: 1, time: 6.5, freq: NOTE_FREQS['B3'] },
      { lane: 0, time: 7.0, freq: NOTE_FREQS['G3'] },
      // Second verse
      { lane: 0, time: 8.5, freq: NOTE_FREQS['G3'] },
      { lane: 1, time: 9.0, freq: NOTE_FREQS['B3'] },
      { lane: 2, time: 9.5, freq: NOTE_FREQS['C4'] },
      { lane: 0, time: 10.5, freq: NOTE_FREQS['G3'] },
      { lane: 1, time: 11.0, freq: NOTE_FREQS['B3'] },
      { lane: 3, time: 11.5, freq: NOTE_FREQS['D4'] },
      { lane: 2, time: 12.0, freq: NOTE_FREQS['C4'] },
    ],
  },
  {
    name: 'Seven Nation Army',
    artist: 'The White Stripes',
    bpm: 124,
    notes: [
      { lane: 1, time: 0.0, freq: NOTE_FREQS['E3'] },
      { lane: 1, time: 0.5, freq: NOTE_FREQS['E3'] },
      { lane: 2, time: 1.0, freq: NOTE_FREQS['G3'] },
      { lane: 1, time: 1.7, freq: NOTE_FREQS['E3'] },
      { lane: 0, time: 2.2, freq: NOTE_FREQS['D3'] },
      { lane: 0, time: 2.9, freq: NOTE_FREQS['C3'] },
      { lane: 3, time: 3.6, freq: NOTE_FREQS['B3'] },
      // Repeat
      { lane: 1, time: 5.0, freq: NOTE_FREQS['E3'] },
      { lane: 1, time: 5.5, freq: NOTE_FREQS['E3'] },
      { lane: 2, time: 6.0, freq: NOTE_FREQS['G3'] },
      { lane: 1, time: 6.7, freq: NOTE_FREQS['E3'] },
      { lane: 0, time: 7.2, freq: NOTE_FREQS['D3'] },
      { lane: 0, time: 7.9, freq: NOTE_FREQS['C3'] },
      { lane: 3, time: 8.6, freq: NOTE_FREQS['B3'] },
    ],
  },
  {
    name: 'Back in Black',
    artist: 'AC/DC',
    bpm: 92,
    notes: [
      { lane: 3, time: 0.0, freq: NOTE_FREQS['E4'] },
      { lane: 2, time: 0.3, freq: NOTE_FREQS['D4'] },
      { lane: 1, time: 0.6, freq: NOTE_FREQS['C4'] },
      { lane: 3, time: 1.2, freq: NOTE_FREQS['E4'] },
      { lane: 2, time: 1.5, freq: NOTE_FREQS['D4'] },
      { lane: 1, time: 1.8, freq: NOTE_FREQS['C4'] },
      { lane: 0, time: 2.4, freq: NOTE_FREQS['B3'] },
      { lane: 0, time: 3.0, freq: NOTE_FREQS['A3'] },
      { lane: 3, time: 4.0, freq: NOTE_FREQS['E4'] },
      { lane: 2, time: 4.3, freq: NOTE_FREQS['D4'] },
      { lane: 1, time: 4.6, freq: NOTE_FREQS['C4'] },
      { lane: 3, time: 5.2, freq: NOTE_FREQS['E4'] },
      { lane: 2, time: 5.5, freq: NOTE_FREQS['D4'] },
      { lane: 1, time: 5.8, freq: NOTE_FREQS['C4'] },
      { lane: 0, time: 6.4, freq: NOTE_FREQS['B3'] },
      { lane: 0, time: 7.0, freq: NOTE_FREQS['A3'] },
    ],
  },
];

// Karplus-Strong string synthesis
function playGuitarNote(audioCtx: AudioContext, frequency: number, duration: number = 0.5) {
  const sampleRate = audioCtx.sampleRate;
  const totalSamples = Math.ceil(sampleRate * (duration + 1.0));
  const buffer = audioCtx.createBuffer(1, totalSamples, sampleRate);
  const data = buffer.getChannelData(0);
  const delayLength = Math.round(sampleRate / frequency);
  const delayLine = new Float32Array(delayLength);

  for (let i = 0; i < delayLength; i++) {
    delayLine[i] = Math.random() * 2 - 1;
  }

  let readIndex = 0;
  for (let i = 0; i < totalSamples; i++) {
    const current = delayLine[readIndex];
    const nextIndex = (readIndex + 1) % delayLength;
    const filtered = 0.496 * current + 0.496 * delayLine[nextIndex];
    delayLine[readIndex] = filtered;
    const t = i / sampleRate;
    let env = 1.0;
    if (t > duration) env = Math.max(0, 1.0 - (t - duration) * 4);
    data[i] = filtered * env * 0.7;
    readIndex = nextIndex;
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;
  const gain = audioCtx.createGain();
  gain.gain.value = 0.6;
  const filter = audioCtx.createBiquadFilter();
  filter.type = 'lowpass';
  filter.frequency.value = 4000;
  source.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);
  source.start(audioCtx.currentTime);
  source.stop(audioCtx.currentTime + duration + 1.0);
}

// How long notes take to fall from top to hit zone (seconds)
const FALL_DURATION = 4.0;
const HIT_TOLERANCE = 0.4; // seconds window

export function GuitarOverlay({ onClose }: GuitarOverlayProps) {
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'results'>('menu');
  const [selectedSong, setSelectedSong] = useState<Song | null>(null);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [hits, setHits] = useState(0);
  const [misses, setMisses] = useState(0);
  const [hitEffects, setHitEffects] = useState<{id: number; lane: number; result: 'perfect' | 'good' | 'miss'}[]>([]);
  const [activeNotes, setActiveNotes] = useState<(SongNote & {id: number; hit: boolean})[]>([]);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gameStartRef = useRef<number>(0);
  const animFrameRef = useRef<number>(0);
  const effectIdRef = useRef(0);
  const processedNotesRef = useRef<Set<number>>(new Set());

  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current || audioCtxRef.current.state === 'closed') {
      audioCtxRef.current = new AudioContext();
    }
    if (audioCtxRef.current.state === 'suspended') audioCtxRef.current.resume();
    return audioCtxRef.current;
  }, []);

  const startSong = useCallback((song: Song) => {
    setSelectedSong(song);
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setHits(0);
    setMisses(0);
    setHitEffects([]);
    processedNotesRef.current = new Set();
    
    // Prepare notes with IDs
    const notes = song.notes.map((n, i) => ({ ...n, id: i, hit: false }));
    setActiveNotes(notes);
    
    gameStartRef.current = performance.now() / 1000 + 1; // 1 second lead-in
    setGameState('playing');
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing' || !selectedSong) return;

    const loop = () => {
      const now = performance.now() / 1000;
      const elapsed = now - gameStartRef.current;

      // Check for missed notes (passed the hit zone)
      setActiveNotes(prev => {
        let missedAny = false;
        const updated = prev.map(note => {
          if (!note.hit && !processedNotesRef.current.has(note.id) && elapsed > note.time + HIT_TOLERANCE) {
            processedNotesRef.current.add(note.id);
            missedAny = true;
            return { ...note, hit: true }; // mark as processed
          }
          return note;
        });
        if (missedAny) {
          setMisses(m => m + 1);
          setCombo(0);
        }
        return updated;
      });

      // Check if song is over
      const lastNoteTime = selectedSong.notes[selectedSong.notes.length - 1].time;
      if (elapsed > lastNoteTime + 2) {
        setGameState('results');
        return;
      }

      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(animFrameRef.current);
  }, [gameState, selectedSong]);

  // Handle lane press
  const handleLanePress = useCallback((lane: number) => {
    if (gameState !== 'playing') return;
    
    const now = performance.now() / 1000;
    const elapsed = now - gameStartRef.current;
    const ctx = getAudioCtx();

    // Find the closest unhit note in this lane within tolerance
    let bestNote: (SongNote & {id: number; hit: boolean}) | null = null;
    let bestDiff = Infinity;

    for (const note of activeNotes) {
      if (note.lane !== lane || note.hit || processedNotesRef.current.has(note.id)) continue;
      const diff = Math.abs(elapsed - note.time);
      if (diff < HIT_TOLERANCE && diff < bestDiff) {
        bestNote = note;
        bestDiff = diff;
      }
    }

    if (bestNote) {
      processedNotesRef.current.add(bestNote.id);
      setActiveNotes(prev => prev.map(n => n.id === bestNote!.id ? { ...n, hit: true } : n));
      
      // Play the note
      playGuitarNote(ctx, bestNote.freq, 0.5);

      const isPerfect = bestDiff < 0.1;
      const points = isPerfect ? 100 : 50;
      
      setScore(s => s + points);
      setHits(h => h + 1);
      setCombo(c => {
        const newCombo = c + 1;
        setMaxCombo(m => Math.max(m, newCombo));
        return newCombo;
      });

      // Visual effect
      const effId = effectIdRef.current++;
      setHitEffects(prev => [...prev, { id: effId, lane, result: isPerfect ? 'perfect' : 'good' }]);
      setTimeout(() => setHitEffects(prev => prev.filter(e => e.id !== effId)), 600);
    } else {
      // Wrong timing or wrong lane - play a muted note
      setCombo(0);
      const effId = effectIdRef.current++;
      setHitEffects(prev => [...prev, { id: effId, lane, result: 'miss' }]);
      setTimeout(() => setHitEffects(prev => prev.filter(e => e.id !== effId)), 600);
    }
  }, [gameState, activeNotes, getAudioCtx]);

  // Calculate note positions
  const now = performance.now() / 1000;
  const elapsed = now - gameStartRef.current;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[40] flex flex-col overflow-hidden font-pixel"
      style={{ background: 'linear-gradient(180deg, #0a0018 0%, #1a0533 50%, #2a1050 100%)' }}
    >
      {/* Song Select Menu */}
      {gameState === 'menu' && (
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <h1 className="text-2xl font-bold text-yellow-400 uppercase mb-2">🎸 PIPO GUITAR</h1>
          <p className="text-gray-400 text-[10px] font-bold uppercase mb-8">Choose a song to play</p>
          
          <div className="w-full max-w-sm space-y-3">
            {SONGS.map((song, i) => (
              <button
                key={i}
                onClick={() => startSong(song)}
                className="w-full bg-[#1a1a5c] border-4 border-yellow-400 p-4 flex items-center gap-4 hover:bg-[#2a2a7c] active:translate-y-[2px] transition-all text-left"
              >
                <span className="text-3xl">🎵</span>
                <div>
                  <p className="text-yellow-400 text-xs font-bold uppercase">{song.name}</p>
                  <p className="text-gray-400 text-[8px] font-bold uppercase">{song.artist}</p>
                </div>
              </button>
            ))}
          </div>

          <button
            onClick={onClose}
            className="mt-8 px-8 py-3 bg-white border-4 border-black font-bold uppercase text-xs text-black"
          >
            Voltar
          </button>
        </div>
      )}

      {/* Playing */}
      {gameState === 'playing' && selectedSong && (
        <div className="flex-1 flex flex-col relative">
          {/* Header */}
          <div className="bg-black/80 p-3 flex justify-between items-center z-10 border-b-2 border-yellow-400/50">
            <div>
              <p className="text-yellow-400 text-[10px] font-bold uppercase">{selectedSong.name}</p>
              <p className="text-gray-500 text-[8px] font-bold">{selectedSong.artist}</p>
            </div>
            <div className="text-right">
              <p className="text-white text-sm font-bold">{score}</p>
              {combo > 2 && <p className="text-yellow-400 text-[8px] font-bold animate-pulse">🔥 x{combo}</p>}
            </div>
          </div>

          {/* Note highway */}
          <div className="flex-1 relative overflow-hidden">
            {/* Lane lines */}
            <div className="absolute inset-0 flex">
              {[0, 1, 2, 3].map(lane => (
                <div key={lane} className="flex-1 border-r border-white/10" />
              ))}
            </div>

            {/* Falling notes */}
            {activeNotes.map(note => {
              if (note.hit) return null;
              const noteElapsed = elapsed - note.time;
              // Note falls for FALL_DURATION seconds. At noteElapsed=0, it's at hit zone.
              // So at noteElapsed = -FALL_DURATION, it's at top
              const progress = (noteElapsed + FALL_DURATION) / FALL_DURATION;
              if (progress < 0 || progress > 1.2) return null;

              const topPercent = progress * 85; // 85% = hit zone position

              return (
                <motion.div
                  key={note.id}
                  className={cn(
                    "absolute w-1/4 flex items-center justify-center pointer-events-none",
                  )}
                  style={{
                    left: `${note.lane * 25}%`,
                    top: `${topPercent}%`,
                  }}
                >
                  <div className={cn(
                    "w-14 h-8 rounded-lg border-4 shadow-lg flex items-center justify-center",
                    LANE_COLORS[note.lane],
                    LANE_BORDER[note.lane],
                  )}>
                    <span className="text-[10px] font-bold text-white drop-shadow">{LANE_LABELS[note.lane]}</span>
                  </div>
                </motion.div>
              );
            })}

            {/* Hit effects */}
            <AnimatePresence>
              {hitEffects.map(eff => (
                <motion.div
                  key={eff.id}
                  initial={{ scale: 0.5, opacity: 1 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute flex items-center justify-center pointer-events-none"
                  style={{
                    left: `${eff.lane * 25}%`,
                    top: '80%',
                    width: '25%',
                  }}
                >
                  <span className={cn(
                    "text-sm font-bold uppercase",
                    eff.result === 'perfect' ? 'text-yellow-400' : 
                    eff.result === 'good' ? 'text-green-400' : 'text-red-400'
                  )}>
                    {eff.result === 'perfect' ? '✨ PERFECT!' : 
                     eff.result === 'good' ? '✓ GOOD' : '✗ MISS'}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Hit zone / Buttons */}
          <div className="h-[15%] bg-black/60 border-t-4 border-yellow-400/50 flex relative">
            {/* Hit line glow */}
            <div className="absolute -top-1 left-0 right-0 h-1 bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]" />
            
            {[0, 1, 2, 3].map(lane => (
              <button
                key={lane}
                onPointerDown={() => handleLanePress(lane)}
                className={cn(
                  "flex-1 flex items-center justify-center border-r-2 border-white/10 active:brightness-150 transition-all",
                  `${LANE_COLORS[lane]}/30`
                )}
                style={{ background: `${['rgba(34,197,94,0.2)', 'rgba(239,68,68,0.2)', 'rgba(234,179,8,0.2)', 'rgba(59,130,246,0.2)'][lane]}` }}
              >
                <div className={cn(
                  "w-16 h-10 rounded-xl border-4 flex items-center justify-center opacity-60",
                  LANE_COLORS[lane],
                  LANE_BORDER[lane],
                )}>
                  <span className="text-xs font-bold text-white">{LANE_LABELS[lane]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results */}
      {gameState === 'results' && selectedSong && (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white text-black border-4 border-black p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] max-w-sm w-full text-center">
            <h2 className="text-xl font-bold uppercase mb-2">🎸 Song Complete!</h2>
            <p className="text-[10px] font-bold text-gray-500 uppercase mb-4">{selectedSong.name} — {selectedSong.artist}</p>

            <div className="text-4xl font-bold text-yellow-600 mb-4">{score}</div>

            <div className="grid grid-cols-3 gap-2 mb-6 text-center">
              <div className="bg-green-100 border-2 border-black p-2">
                <p className="text-lg font-bold text-green-600">{hits}</p>
                <p className="text-[8px] font-bold uppercase">Hits</p>
              </div>
              <div className="bg-red-100 border-2 border-black p-2">
                <p className="text-lg font-bold text-red-600">{misses}</p>
                <p className="text-[8px] font-bold uppercase">Misses</p>
              </div>
              <div className="bg-yellow-100 border-2 border-black p-2">
                <p className="text-lg font-bold text-yellow-600">🔥 {maxCombo}</p>
                <p className="text-[8px] font-bold uppercase">Max Combo</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => startSong(selectedSong)}
                className="flex-1 bg-yellow-400 border-4 border-black py-3 font-bold uppercase text-[10px] active:translate-y-1"
              >
                Replay
              </button>
              <button
                onClick={() => setGameState('menu')}
                className="flex-1 bg-white border-4 border-black py-3 font-bold uppercase text-[10px] active:translate-y-1"
              >
                Songs
              </button>
              <button
                onClick={() => {
                  if (audioCtxRef.current) audioCtxRef.current.close();
                  onClose();
                }}
                className="flex-1 bg-black text-white border-4 border-black py-3 font-bold uppercase text-[10px] active:translate-y-1"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
