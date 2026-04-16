-- =============================================
-- FIX CRÍTICO: RLS para as novas tabelas de aprendizado
-- =============================================

-- 1. Habilitar RLS
ALTER TABLE public.learning_units ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_questions ENABLE ROW LEVEL SECURITY;

-- 2. Políticas de Leitura (Qualquer usuário logado pode ler)
DROP POLICY IF EXISTS "Public Learning Units Read" ON public.learning_units;
CREATE POLICY "Public Learning Units Read" ON public.learning_units 
FOR SELECT USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Public Learning Lessons Read" ON public.learning_lessons;
CREATE POLICY "Public Learning Lessons Read" ON public.learning_lessons 
FOR SELECT USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "Public Learning Questions Read" ON public.learning_questions;
CREATE POLICY "Public Learning Questions Read" ON public.learning_questions 
FOR SELECT USING (auth.uid() IS NOT NULL);

-- 3. Garantir que o usuário pode ver o progresso
ALTER TABLE public.user_lesson_progress ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Users can manage their own progress" ON public.user_lesson_progress;
CREATE POLICY "Users can manage their own progress" ON public.user_lesson_progress 
FOR ALL USING (auth.uid() = user_id);
