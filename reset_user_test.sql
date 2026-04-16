-- =============================================
-- RESETAR USUÁRIO ESPECÍFICO PARA NÍVEL 1
-- Digite o telefone abaixo para resetar
-- =============================================

UPDATE public.game_state
SET 
  english_level = 1,
  english_points = 0,
  evolution_stage = 1, -- BABY
  hunger = 80,
  happiness = 80,
  energy = 100,
  health = 100,
  updated_at = now()
WHERE user_id = (
  SELECT id FROM public.profiles WHERE phone = '11983600707' OR phone = '11 98360-0707'
);

-- Opcional: Limpar inventário para teste limpo
-- UPDATE public.game_state SET inventory = '[]'::jsonb WHERE user_id = (SELECT id FROM public.profiles WHERE phone = '11983600707');

-- Apagar o histórico de aprendizado da trilha de inglês
DELETE FROM public.user_lesson_progress 
WHERE user_id = (
  SELECT id FROM public.profiles WHERE phone = '11983600707' OR phone = '11 98360-0707'
);
