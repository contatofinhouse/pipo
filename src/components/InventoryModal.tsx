import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Collectible } from '../types';
import { cn } from '../lib/utils';

interface InventoryModalProps {
  inventory: Collectible[];
  onClose: () => void;
  onUseItem: (item: Collectible, index: number) => void;
  onGrantAll?: () => void;
}

export function InventoryModal({ inventory, onClose, onUseItem, onGrantAll }: InventoryModalProps) {
  const [selectedItem, setSelectedItem] = useState<{ item: Collectible; index: number } | null>(null);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
      onClick={() => {
        onClose();
        setSelectedItem(null);
      }}
    >
      <motion.div 
        layout
        className="bg-white p-6 border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-sm font-bold uppercase">Coleção do Pipo</h2>
          {onGrantAll && (
            <button 
                onClick={onGrantAll} 
                className="text-[8px] bg-yellow-400 border-2 border-black px-2 py-1 font-bold active:translate-y-0.5"
            >
                🎁 TUDO
            </button>
          )}
        </div>
        
        <AnimatePresence mode="wait">
          {selectedItem ? (
            <motion.div 
              key="details"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center text-center py-4"
            >
              <div className={cn(
                "w-24 h-24 border-4 border-black flex items-center justify-center text-5xl mb-4",
                selectedItem.item.rarity === 'common' ? 'bg-gray-100' : 
                selectedItem.item.rarity === 'rare' ? 'bg-blue-100' : 'bg-yellow-100'
              )}>
                {selectedItem.item.icon}
              </div>
              <h3 className="font-bold uppercase text-xs mb-2">{selectedItem.item.name}</h3>
              <p className="text-[10px] text-gray-600 mb-6 leading-relaxed">
                {selectedItem.item.description}
              </p>
              
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 py-3 border-4 border-black font-bold uppercase text-[10px] hover:bg-gray-100"
                >
                  Voltar
                </button>
                <button 
                  onClick={() => {
                    onUseItem(selectedItem.item, selectedItem.index);
                    setSelectedItem(null);
                  }}
                  className="flex-1 py-3 bg-green-400 border-4 border-black font-bold uppercase text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                >
                  Usar Item
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {(!inventory || inventory.length === 0) ? (
                <p className="text-[10px] text-gray-400 text-center py-8">Pipo ainda não encontrou nada...</p>
              ) : (
                <div className="grid grid-cols-3 gap-4 max-h-64 overflow-y-auto p-2">
                  {inventory.map((item, idx) => (
                    <button 
                      key={`${item.id}-${idx}`}
                      onClick={() => setSelectedItem({ item, index: idx })}
                      className={cn(
                        "aspect-square border-4 border-black flex flex-col items-center justify-center p-2 relative transition-transform hover:scale-105 active:scale-95",
                        item.rarity === 'common' ? 'bg-gray-100' : 
                        item.rarity === 'rare' ? 'bg-blue-100' : 'bg-yellow-100'
                      )}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span className="text-[6px] font-bold mt-1 text-center">{item.name}</span>
                    </button>
                  ))}
                </div>
              )}
              <button 
                onClick={onClose}
                className="w-full mt-8 py-4 bg-blue-400 border-4 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
              >
                Fechar
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
