ALTER TABLE public.game_state 
ADD COLUMN IF NOT EXISTS equipped_items JSONB DEFAULT '[]'::jsonb NOT NULL,
ADD COLUMN IF NOT EXISTS placed_items JSONB DEFAULT '[]'::jsonb NOT NULL;
    