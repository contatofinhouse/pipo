import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Volume2, VolumeX, Bell, BellOff, RefreshCw, X } from 'lucide-react';
import { PetState } from '../types';

interface SettingsModalProps {
  state: PetState;
  onUpdateSettings: (settings: PetState['settings']) => void;
  onReset: () => void;
  onClose: () => void;
}

export function SettingsModal({ state, onUpdateSettings, onReset, onClose }: SettingsModalProps) {
  const settings = state.settings || {
    soundEnabled: true,
    notifyHunger: true,
    notifyEnergy: true,
    notifyInactivity: true,
  };

  const toggleSound = () => {
    onUpdateSettings({ ...settings, soundEnabled: !settings.soundEnabled });
  };

  const toggleNotify = (key: keyof typeof settings) => {
    if (key === 'soundEnabled') return;
    onUpdateSettings({ ...settings, [key]: !settings[key] });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="bg-white border-8 border-black w-full max-w-md overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]"
      >
        {/* Header */}
        <div className="bg-black p-4 flex justify-between items-center">
          <h2 className="text-white font-pixel text-xs uppercase tracking-widest">Configurações</h2>
          <button onClick={onClose} className="text-white hover:scale-110 transition-transform">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Audio Section */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase text-gray-500 border-b-2 border-gray-100 pb-1">Áudio</h3>
            <div className="flex items-center justify-between p-4 bg-gray-50 border-4 border-black/5">
              <div className="flex items-center gap-3">
                {settings.soundEnabled ? <Volume2 className="w-5 h-5 text-blue-500" /> : <VolumeX className="w-5 h-5 text-gray-400" />}
                <div>
                  <p className="font-bold text-xs">Sons de Jogos/Avisos</p>
                  <p className="text-[8px] text-gray-500 italic">(Não afeta lições de Inglês)</p>
                </div>
              </div>
              <button
                onClick={toggleSound}
                className={`w-12 h-6 border-4 border-black relative transition-colors ${settings.soundEnabled ? 'bg-green-400' : 'bg-gray-300'}`}
              >
                <motion.div
                  animate={{ x: settings.soundEnabled ? 24 : 0 }}
                  className="absolute top-0 left-0 w-4 h-full bg-white border-r-4 border-black"
                />
              </button>
            </div>
          </section>

          {/* Notifications Section */}
          <section className="space-y-4">
            <h3 className="text-[10px] font-bold uppercase text-gray-500 border-b-2 border-gray-100 pb-1">Notificações Android</h3>
            
            {/* Hunger */}
            <div className="flex items-center justify-between p-3 border-2 border-black/10 rounded-sm">
              <div className="flex items-center gap-3">
                <Bell className={`w-4 h-4 ${settings.notifyHunger ? 'text-orange-500' : 'text-gray-300'}`} />
                <span className="text-[10px] font-bold uppercase">Pipo com Fome</span>
              </div>
              <input 
                type="checkbox" 
                checked={settings.notifyHunger}
                onChange={() => toggleNotify('notifyHunger')}
                className="w-5 h-5 accent-black cursor-pointer"
              />
            </div>

            {/* Energy */}
            <div className="flex items-center justify-between p-3 border-2 border-black/10 rounded-sm">
              <div className="flex items-center gap-3">
                <Bell className={`w-4 h-4 ${settings.notifyEnergy ? 'text-blue-500' : 'text-gray-300'}`} />
                <span className="text-[10px] font-bold uppercase">Sem Energia</span>
              </div>
              <input 
                type="checkbox" 
                checked={settings.notifyEnergy}
                onChange={() => toggleNotify('notifyEnergy')}
                className="w-5 h-5 accent-black cursor-pointer"
              />
            </div>

            {/* Inactivity */}
            <div className="flex items-center justify-between p-3 border-2 border-black/10 rounded-sm">
              <div className="flex items-center gap-3">
                <Bell className={`w-4 h-4 ${settings.notifyInactivity ? 'text-purple-500' : 'text-gray-300'}`} />
                <span className="text-[10px] font-bold uppercase">Meta Diária de Inglês</span>
              </div>
              <input 
                type="checkbox" 
                checked={settings.notifyInactivity}
                onChange={() => toggleNotify('notifyInactivity')}
                className="w-5 h-5 accent-black cursor-pointer"
              />
            </div>
          </section>

          {/* Reset Section */}
          <section className="pt-4 mt-4 border-t-4 border-dashed border-gray-200">
            <button
              onClick={() => {
                if (confirm("Deseja mesmo recomeçar sua jornada com o Pipo? Isso resetará todos os pontos e evolução.")) {
                  onReset();
                  onClose();
                }
              }}
              className="w-full flex items-center justify-center gap-3 p-4 bg-red-50 hover:bg-red-100 border-4 border-red-500 text-red-600 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              <span className="font-pixel text-[10px] uppercase">Recomeçar Jornada</span>
            </button>
          </section>
        </div>

        {/* Footer */}
        <div className="p-4 bg-gray-50 flex justify-center border-t-4 border-black">
          <p className="text-[8px] text-gray-400 uppercase font-bold tracking-widest">Pipo v2.5.0 • Settings</p>
        </div>
      </motion.div>
    </div>
  );
}
