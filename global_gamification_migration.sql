-- =============================================
-- MIGRATION: Lifetime XP & Badge System
-- =============================================

-- 1. Adicionar Lifetime XP ao game_state
ALTER TABLE public.game_state 
ADD COLUMN IF NOT EXISTS lifetime_xp INTEGER DEFAULT 0 NOT NULL;

-- 2. Tabela de Badges (Conquistas)
CREATE TABLE IF NOT EXISTS public.user_badges (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  badge_key TEXT NOT NULL, -- 'first_step', 'streak_3', 'a2_unlocked', etc.
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  PRIMARY KEY (user_id, badge_key)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own badges" ON public.user_badges FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Service can insert badges" ON public.user_badges FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 3. Atualizar learning_questions para suportar CEFR
ALTER TABLE public.learning_questions
ADD COLUMN IF NOT EXISTS cefr_level TEXT DEFAULT 'A1' NOT NULL,
ADD COLUMN IF NOT EXISTS difficulty_score INTEGER DEFAULT 1 NOT NULL, -- 1 a 20
ADD COLUMN IF NOT EXISTS skill_tag TEXT DEFAULT 'vocabulary'; -- 'grammar', 'listening', 'reading'
