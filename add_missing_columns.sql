-- =============================================
-- MIGRATION: Adiciona colunas faltantes na game_state
-- Cole este código no SQL Editor do Supabase e aperte RUN
-- =============================================

ALTER TABLE public.game_state 
ADD COLUMN IF NOT EXISTS equipped_items JSONB DEFAULT '[]'::jsonb NOT NULL,
ADD COLUMN IF NOT EXISTS placed_items JSONB DEFAULT '[]'::jsonb NOT NULL,
ADD COLUMN IF NOT EXISTS fitness INTEGER DEFAULT 50 NOT NULL,
ADD COLUMN IF NOT EXISTS birthday BIGINT;

-- Comentário para expor no dashboard o que cada coluna faz
COMMENT ON COLUMN public.game_state.equipped_items IS 'Lista de itens vestidos pelo pet';
COMMENT ON COLUMN public.game_state.placed_items IS 'Lista de itens decorativos colocados no quarto';
COMMENT ON COLUMN public.game_state.fitness IS 'Nível de musculação/atleta do pet';
COMMENT ON COLUMN public.game_state.birthday IS 'Data de nascimento em milissegundos (Date.now())';
