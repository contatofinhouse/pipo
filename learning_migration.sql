-- =============================================
-- SEED FINAL: Currículo Completo CEFR (A1, A2, B1)
-- =============================================

-- Limpar dados anteriores para evitar duplicatas (Opcional)
TRUNCATE public.learning_units, public.learning_lessons, public.learning_questions CASCADE;

DO $$
DECLARE
    unit1_id UUID; -- Basics & Daily Life (A1)
    unit2_id UUID; -- Experiences & Growth (A2)
    unit3_id UUID; -- Abstract & Future (B1)
    l_id UUID;
BEGIN
    -- =============================================
    -- UNIT 1: FUNDAMENTOS (A1 - NÍVEIS 1 A 5)
    -- =============================================
    INSERT INTO public.learning_units (order_index, title, description, icon_slug)
    VALUES (1, 'Fundamentos I', 'Dê seus primeiros passos no Inglês.', 'basics')
    RETURNING id INTO unit1_id;

    -- Lesson 1.1: Saudações
    INSERT INTO public.learning_lessons (unit_id, order_index, title, xp_reward)
    VALUES (unit1_id, 1, 'Hello & Goodbye', 20) RETURNING id INTO l_id;

    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation) VALUES
    (l_id, 'selection', 'A1', 1, '{"prompt": "Como se diz Olá?"}', '[{"text": "Hello", "is_correct": true}, {"text": "Bye", "is_correct": false}]', 'Hello é Olá!'),
    (l_id, 'matching', 'A1', 1, '{"prompt": "Combine as saudações", "items": [{"icon": "☀️", "word": "Morning"}, {"icon": "🌙", "word": "Night"}]}', '[]', 'Morning = Manhã, Night = Noite.'),
    (l_id, 'audio', 'A1', 2, '{"prompt": "Ouça e selecione", "audio_text": "Good morning"}', '[{"text": "Bom dia", "is_correct": true}, {"text": "Boa noite", "is_correct": false}]', 'Good morning = Bom dia.');

    -- Lesson 1.2: Cores e Objetos
    INSERT INTO public.learning_lessons (unit_id, order_index, title, xp_reward)
    VALUES (unit1_id, 2, 'Cores e Coisas', 20) RETURNING id INTO l_id;

    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation) VALUES
    (l_id, 'selection', 'A1', 2, '{"prompt": "The apple is...", "image": "🍎"}', '[{"text": "Red", "is_correct": true}, {"text": "Blue", "is_correct": false}]', 'Red é Vermelho.'),
    (l_id, 'matching', 'A1', 2, '{"prompt": "Combine a cor", "items": [{"icon": "🟦", "word": "Blue"}, {"icon": "🟩", "word": "Green"}, {"icon": "🟨", "word": "Yellow"}]}', '[]', 'Identifique as cores primárias.'),
    (l_id, 'tf', 'A1', 3, '{"prompt": "Blue significa Verde?"}', '[{"text": "False", "is_correct": true}, {"text": "True", "is_correct": false}]', 'Blue é Azul!');

    -- =============================================
    -- UNIT 2: VIDA DIÁRIA (A2 - NÍVEIS 6 A 11)
    -- =============================================
    INSERT INTO public.learning_units (order_index, title, description, icon_slug)
    VALUES (2, 'Minha Rotina', 'Fale sobre o que você faz no dia a dia.', 'routine')
    RETURNING id INTO unit2_id;

    -- Lesson 2.1: Ações Diárias (Verbos Básicos)
    INSERT INTO public.learning_lessons (unit_id, order_index, title, xp_reward)
    VALUES (unit2_id, 1, 'Eu faço...', 25) RETURNING id INTO l_id;

    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation) VALUES
    (l_id, 'selection', 'A2', 6, '{"prompt": "I ___ water every day."}', '[{"text": "drink", "is_correct": true}, {"text": "eat", "is_correct": false}]', 'Nós "drink" (beber) água.'),
    (l_id, 'matching', 'A2', 7, '{"prompt": "Combine a ação", "items": [{"icon": "📖", "word": "Read"}, {"icon": "🏃", "word": "Run"}, {"icon": "😴", "word": "Sleep"}]}', '[]', 'Verbos de ação do dia a dia.'),
    (l_id, 'selection', 'A2', 8, '{"prompt": "She ___ to school at 8:00 AM."}', '[{"text": "goes", "is_correct": true}, {"text": "go", "is_correct": false}]', 'No presente (He/She/It), usamos "goes".');

    -- Lesson 2.2: O Passado Simples (Yesterday)
    INSERT INTO public.learning_lessons (unit_id, order_index, title, xp_reward)
    VALUES (unit2_id, 2, 'Ontem eu fui', 30) RETURNING id INTO l_id;

    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation) VALUES
    (l_id, 'selection', 'A2', 10, '{"prompt": "Yesterday I ___ a movie."}', '[{"text": "watched", "is_correct": true}, {"text": "watch", "is_correct": false}]', 'Passado de watch é watched.'),
    (l_id, 'selection', 'A2', 11, '{"prompt": "Where ___ you last night?"}', '[{"text": "were", "is_correct": true}, {"text": "was", "is_correct": false}]', 'You usa "were" no passado.');

    -- =============================================
    -- UNIT 3: PENSANDO ALÉM (B1 - NÍVEIS 12 A 20)
    -- =============================================
    INSERT INTO public.learning_units (order_index, title, description, icon_slug)
    VALUES (3, 'Planos e Sonhos', 'Conecte ideias e fale do futuro.', 'future')
    RETURNING id INTO unit3_id;

    -- Lesson 3.1: O Futuro (Will vs Going to)
    INSERT INTO public.learning_lessons (unit_id, order_index, title, xp_reward)
    VALUES (unit3_id, 1, 'O Amanhã', 35) RETURNING id INTO l_id;

    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation) VALUES
    (l_id, 'selection', 'B1', 13, '{"prompt": "I think it ___ rain tomorrow."}', '[{"text": "will", "is_correct": true}, {"text": "going to", "is_correct": false}]', 'Usamos "will" para previsões.'),
    (l_id, 'selection', 'B1', 15, '{"prompt": "What are your plans? I ___ travel to London."}', '[{"text": "am going to", "is_correct": true}, {"text": "will", "is_correct": false}]', 'Planos decididos usam "going to".');

    -- Lesson 3.2: Condicionais (If)
    INSERT INTO public.learning_lessons (unit_id, order_index, title, xp_reward)
    VALUES (unit3_id, 2, 'E se...?', 40) RETURNING id INTO l_id;

    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation) VALUES
    (l_id, 'selection', 'B1', 18, '{"prompt": "If it rains, we ___ at home."}', '[{"text": "will stay", "is_correct": true}, {"text": "stayed", "is_correct": false}]', 'Primeira condicional: If + Presente, Future.'),
    (l_id, 'selection', 'B1', 20, '{"prompt": "If I ___ you, I would study more."}', '[{"text": "were", "is_correct": true}, {"text": "am", "is_correct": false}]', 'Segunda condicional (hipótese): "If I were".');

END $$;
