-- Script SQL Completo para Adicionar Áudio em TODOS os exercícios atuais
-- Usando serviço de voz de alta qualidade (IA) via URL dinâmica

-- Unit 1: Saudações
UPDATE public.learning_questions SET content = content || '{"audio_url": "https://dict.youdao.com/dictvoice?type=2&audio=Hello"}'::jsonb WHERE content->>'prompt' ILIKE '%Olá%';
UPDATE public.learning_questions SET content = content || '{"audio_url": "https://dict.youdao.com/dictvoice?type=2&audio=Good+morning"}'::jsonb WHERE content->>'audio_text' = 'Good morning';

-- Unit 1: Cores (Usando o prompt como base para a fala)
UPDATE public.learning_questions SET content = content || '{"audio_url": "https://dict.youdao.com/dictvoice?type=2&audio=The+apple+is+red"}'::jsonb WHERE content->>'prompt' ILIKE '%apple%';
UPDATE public.learning_questions SET content = content || '{"audio_url": "https://dict.youdao.com/dictvoice?type=2&audio=Blue"}'::jsonb WHERE content->>'prompt' ILIKE '%Blue significa%';

-- Unit 2: Ações Diárias
UPDATE public.learning_questions SET content = content || '{"audio_url": "https://dict.youdao.com/dictvoice?type=2&audio=I+drink+water+every+day"}'::jsonb WHERE content->>'prompt' ILIKE '%water%';
UPDATE public.learning_questions SET content = content || '{"audio_url": "https://dict.youdao.com/dictvoice?type=2&audio=She+goes+to+school+at+eight+AM"}'::jsonb WHERE content->>'prompt' ILIKE '%school%';

-- Unit 2: Passado
UPDATE public.learning_questions SET content = content || '{"audio_url": "https://dict.youdao.com/dictvoice?type=2&audio=Yesterday+I+watched+a+movie"}'::jsonb WHERE content->>'prompt' ILIKE '%movie%';
UPDATE public.learning_questions SET content = content || '{"audio_url": "https://dict.youdao.com/dictvoice?type=2&audio=Where+were+you+last+night"}'::jsonb WHERE content->>'prompt' ILIKE '%last+night%';

-- Unit 3: Futuro
UPDATE public.learning_questions SET content = content || '{"audio_url": "https://dict.youdao.com/dictvoice?type=2&audio=I+think+it+will+rain+tomorrow"}'::jsonb WHERE content->>'prompt' ILIKE '%rain+tomorrow%';
UPDATE public.learning_questions SET content = content || '{"audio_url": "https://dict.youdao.com/dictvoice?type=2&audio=I+am+going+to+travel+to+London"}'::jsonb WHERE content->>'prompt' ILIKE '%travel%';

-- Unit 3: Condicionais
UPDATE public.learning_questions SET content = content || '{"audio_url": "https://dict.youdao.com/dictvoice?type=2&audio=If+it+rains+we+will+stay+at+home"}'::jsonb WHERE content->>'prompt' ILIKE '%stay+at+home%';
UPDATE public.learning_questions SET content = content || '{"audio_url": "https://dict.youdao.com/dictvoice?type=2&audio=If+I+were+you+I+would+study+more"}'::jsonb WHERE content->>'prompt' ILIKE '%study+more%';

-- Garante que o botão de áudio apareça em todas as questões relevantes transformando-as em tipo 'audio' onde necessário
-- ou apenas permitindo o clique se houver áudio_url no ExerciseEngine (que já fizemos).
