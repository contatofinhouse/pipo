-- Adiciona a coluna skin_color na tabela game_state se ela ainda não existir
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'game_state' AND COLUMN_NAME = 'skin_color') THEN
        ALTER TABLE public.game_state ADD COLUMN skin_color TEXT;
    END IF;
END $$;
