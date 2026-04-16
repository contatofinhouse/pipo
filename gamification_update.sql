-- =============================================
-- ATUALIZAÇÃO DO MOTOR DE GAMIFICAÇÃO PIPO
-- Cole no SQL Editor do Supabase e aperte RUN
-- =============================================

-- Adicionar o rastreador de questões resolvidas (Memória da Lição)
ALTER TABLE public.user_lesson_progress
ADD COLUMN IF NOT EXISTS answered_questions JSONB DEFAULT '[]'::jsonb NOT NULL;

-- Criar tabela para armazenar conquistas dinamicamente, se ainda não existir
CREATE TABLE IF NOT EXISTS public.user_badges (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  badge_key TEXT NOT NULL,
  earned_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  PRIMARY KEY (user_id, badge_key)
);

ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "user_badges_all" ON public.user_badges;
CREATE POLICY "user_badges_all" ON public.user_badges FOR ALL USING (auth.uid() = user_id);

-- Para garantir que learning_progress esteja limpo no seu teste (Opcional):
-- DELETE FROM public.user_lesson_progress;
