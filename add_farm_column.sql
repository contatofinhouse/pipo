-- ============================================
-- PIPO-FARM: Adicionar coluna farm_plots
-- ============================================
-- Armazena o estado do jardim como JSON (array de 12 canteiros)
-- Rodar no SQL Editor do Supabase

ALTER TABLE game_state 
ADD COLUMN IF NOT EXISTS farm_plots jsonb DEFAULT '[]'::jsonb;

-- Comentário descritivo
COMMENT ON COLUMN game_state.farm_plots IS 'Array JSON com os 12 canteiros do Pipo-Farm. Cada item contém: id, state, cropType, cropName, plantedAt, waterCount, growthTimeMs, foodEffect';
