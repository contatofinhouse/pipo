import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Collectible } from '../types';
import { cn } from '../lib/utils';
import { COLLECTIBLES } from '../constants';

interface InventoryModalProps {
  inventory: Collectible[];
  onClose: () => void;
  onUseItem: (item: Collectible, index: number) => void;
  onRemoveItem: (index: number) => void;
  onGrantAll?: () => void;
}

export function InventoryModal({ inventory, onClose, onUseItem, onRemoveItem, onGrantAll }: InventoryModalProps) {
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
        className="bg-white p-6 border-8 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full max-h-[90vh] flex flex-col" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <div className="flex flex-col">
            <h2 className="text-sm font-bold uppercase">Coleção do Pipo</h2>
            <p className="text-[8px] text-gray-500 uppercase font-black">
              {inventory.length} / {COLLECTIBLES.length} Encontrados
            </p>
          </div>
          {/* Botão CHEAT removido para testes de limpeza */}
        </div>
        
        <AnimatePresence mode="wait">
          {selectedItem ? (
            <motion.div 
              key="details"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center text-center py-4"
            >
              <div className={cn(
                "w-24 h-24 border-4 border-black flex items-center justify-center text-5xl mb-4 relative",
                selectedItem.item.rarity === 'common' ? 'bg-gray-100' : 
                selectedItem.item.rarity === 'rare' ? 'bg-blue-100' : 'bg-yellow-100',
                !inventory.some(i => i.id === selectedItem.item.id) && "grayscale opacity-30"
              )}>
                {selectedItem.item.icon}
                {inventory.filter(i => i.id === selectedItem.item.id).length > 1 && (
                  <div className="absolute -bottom-2 -right-2 bg-black text-white text-[10px] px-1.5 py-0.5 font-bold">
                    x{inventory.filter(i => i.id === selectedItem.item.id).length}
                  </div>
                )}
              </div>
              <h3 className="font-bold uppercase text-xs mb-1">{selectedItem.item.name}</h3>
              <div className={cn(
                "text-[7px] font-black uppercase mb-3 px-2 py-0.5 border-2 border-black",
                selectedItem.item.rarity === 'common' ? 'bg-gray-200' : 
                selectedItem.item.rarity === 'rare' ? 'bg-blue-300' : 'bg-yellow-300'
              )}>
                {selectedItem.item.rarity}
              </div>
              <p className="text-[10px] text-gray-600 mb-6 leading-relaxed">
                {selectedItem.item.description}
              </p>
              
              <div className="flex gap-4 w-full">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="flex-1 py-3 border-4 border-black font-bold uppercase text-[10px] hover:bg-gray-100 active:translate-y-0.5"
                >
                  Voltar
                </button>
                {inventory.some(i => i.id === selectedItem.item.id) && (
                  <button 
                    onClick={() => {
                      onUseItem(selectedItem.item, selectedItem.index);
                      setSelectedItem(null);
                    }}
                    className="flex-1 py-3 bg-green-400 border-4 border-black font-bold uppercase text-[10px] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
                  >
                    Usar Item
                  </button>
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col flex-1 overflow-hidden"
            >
              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-6">
                {(['food', 'clothing', 'toy', 'scenery', 'special'] as const).map(cat => (
                  <div key={cat} className="animate-in fade-in slide-in-from-top-1 duration-500">
                    <h3 className="text-[9px] font-black uppercase text-gray-400 mb-3 ml-1 flex items-center gap-2">
                       <span className="w-8 h-[2px] bg-gray-200"></span>
                       {cat === 'food' ? '🍔 Comidas' : 
                        cat === 'clothing' ? '🧢 Roupas' : 
                        cat === 'toy' ? '⚽ Brinquedos' : 
                        cat === 'scenery' ? '🌿 Cenário' : '✨ Especiais'}
                       <span className="flex-1 h-[2px] bg-gray-200"></span>
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      {COLLECTIBLES.filter(c => c.category === cat).map((item) => {
                        const ownedInstances = inventory.filter(i => i.id === item.id);
                        const isOwned = ownedInstances.length > 0;
                        const firstIdx = inventory.findIndex(i => i.id === item.id);
                        
                        return (
                          <div key={item.id} className="relative group">
                            <button 
                              onClick={() => setSelectedItem({ item, index: firstIdx })}
                              disabled={!isOwned && false} // Permite ver detalhes mesmo se não tiver
                              className={cn(
                                "w-full aspect-square border-4 border-black flex flex-col items-center justify-center p-2 transition-all duration-300 relative overflow-hidden",
                                item.rarity === 'common' ? 'bg-gray-50' : 
                                item.rarity === 'rare' ? 'bg-blue-50' : 'bg-yellow-50',
                                !isOwned && "opacity-25 grayscale border-gray-300",
                                isOwned && "hover:scale-105 active:scale-95 hover:bg-white active:shadow-inner"
                              )}
                            >
                              <span className="text-2xl">{item.icon}</span>
                              <span className="text-[6px] font-bold mt-1 text-center truncate w-full">{item.name}</span>
                              
                              {isOwned && ownedInstances.length > 1 && (
                                <div className="absolute top-0 right-0 bg-black text-white text-[8px] px-1 font-bold">
                                  {ownedInstances.length}
                                </div>
                              )}
                            </button>
                            
                            {isOwned && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onRemoveItem(firstIdx);
                                }}
                                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-black rounded-full flex items-center justify-center text-[7px] text-white font-bold opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-red-600 shadow-sm"
                                title="Remover uma unidade"
                              >
                                ✕
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={onClose}
                className="w-full mt-6 py-4 bg-blue-400 border-4 border-black font-bold uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1 transition-all"
              >
                Voltar ao Quarto
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

    </motion.div>
  );
}
