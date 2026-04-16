-- =================================================================================
-- EXPANSÃO MASSIVA DO CURRÍCULO PIPO (70 UNIDADES, 600+ QUESTÕES)
-- =================================================================================

-- 1. Traduzir os títulos originais (1 ao 3) para Inglês
UPDATE public.learning_units
SET title = 'First Steps'
WHERE order_index = 1;

UPDATE public.learning_units
SET title = 'Daily Life'
WHERE order_index = 2;

UPDATE public.learning_units
SET title = 'Plans and Dreams'
WHERE order_index = 3;

-- 2. Loop de Geração Procedural (Unidades 4 a 70)
DO $$
DECLARE
    u_id UUID;
    l_id UUID;
    
    unit_prefixes TEXT[] := ARRAY['Grammar', 'Vocabulary', 'Expressions', 'Exploration', 'Journey', 'Mastery', 'Discovery', 'Adventure'];
    unit_themes TEXT[] := ARRAY['Basics', 'Phrases', 'Travel', 'Food', 'Animals', 'People', 'Colors', 'Clothing', 'Family', 'Jobs', 'Home', 'Nature', 'School', 'Sports', 'Health', 'Time', 'Weather', 'Emotions', 'Directions', 'Shopping', 'City', 'Country', 'Hobbies', 'Transport', 'Art', 'Music', 'Tech', 'Science', 'Math', 'Space', 'Future', 'Past', 'Present'];
    lesson_titles TEXT[] := ARRAY['Listening', 'Reading', 'Grammar Check', 'Vocab Boost', 'Practice Time', 'Review', 'Challenge', 'Dialogue'];
    pt_desc TEXT[] := ARRAY['Aprenda vocabulário novo sobre o tema.', 'Desafie sua mente.', 'Pratique sua gramática.', 'Melhore sua escuta!', 'Vamos ler e entender.', 'Revisão essencial do conteúdo.', 'Prática intensa de inglês.', 'Para testar sua memória.'];
    
    vocab_eng TEXT[] := ARRAY['apple', 'house', 'water', 'sun', 'moon', 'car', 'dog', 'cat', 'book', 'pen', 'friend', 'time', 'love', 'work', 'money', 'happy', 'sad', 'fast', 'slow', 'big', 'small', 'hot', 'cold', 'food', 'day', 'night', 'morning', 'evening', 'hello', 'goodbye'];
    vocab_pt TEXT[] := ARRAY['maçã', 'casa', 'água', 'sol', 'lua', 'carro', 'cachorro', 'gato', 'livro', 'caneta', 'amigo', 'tempo', 'amor', 'trabalho', 'dinheiro', 'feliz', 'triste', 'rápido', 'devagar', 'grande', 'pequeno', 'quente', 'frio', 'comida', 'dia', 'noite', 'manhã', 'tarde', 'olá', 'tchau'];
    
    i INT;
    j INT;
    k INT;
    
    v_idx1 INT;
    v_idx2 INT;
    v_idx3 INT;
    diff INT;
    
    final_title TEXT;
    final_desc TEXT;
BEGIN
    FOR i IN 4..70 LOOP
        -- Criar Unidade
        u_id := gen_random_uuid();
        final_title := unit_prefixes[((i-1) % array_length(unit_prefixes, 1)) + 1] || ': ' || unit_themes[((i-1) % array_length(unit_themes, 1)) + 1];
        final_desc := pt_desc[((i-1) % array_length(pt_desc, 1)) + 1];
        
        INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
        VALUES (u_id, i, final_title, final_desc, 'basics');
        
        diff := 5 + (i / 5); -- Dificuldade sobe devagar
        
        -- Criar 3 Lições por Unidade (Total: ~200 lições)
        FOR j IN 1..3 LOOP
            l_id := gen_random_uuid();
            INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
            VALUES (l_id, u_id, j, lesson_titles[((i+j) % array_length(lesson_titles, 1)) + 1], 20 + diff);
            
            -- Criar 3 Questões por Lição (Total: ~600 questões)
            FOR k IN 1..3 LOOP
                v_idx1 := ((i * j * k) % array_length(vocab_eng, 1)) + 1;
                v_idx2 := ((i * j * k + 1) % array_length(vocab_eng, 1)) + 1;
                v_idx3 := ((i * j * k + 2) % array_length(vocab_eng, 1)) + 1;
                
                INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
                VALUES (
                    l_id,
                    'selection',
                    'B1', -- placeholder
                    diff,
                    jsonb_build_object('prompt', 'Qual a melhor tradução para: ' || vocab_pt[v_idx1] || '?'),
                    jsonb_build_array(
                        jsonb_build_object('text', vocab_eng[v_idx1], 'is_correct', true),
                        jsonb_build_object('text', vocab_eng[v_idx2], 'is_correct', false),
                        jsonb_build_object('text', vocab_eng[v_idx3], 'is_correct', false)
                    ),
                    'Essa é uma palavra de vocabulário básico. Guarde na memória!'
                );
            END LOOP;
        END LOOP;
    END LOOP;
END $$;
