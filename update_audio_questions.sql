-- Atualiza a questão de áudio "Good morning" com um link funcional para teste
-- Este link usa um serviço de TTS público para que você possa testar o funcionamento agora mesmo.
UPDATE public.learning_questions
SET content = content || '{"audio_url": "https://api.dictionaryapi.dev/media/pronunciations/en/good-morning-us.mp3"}'::jsonb
WHERE content->>'audio_text' = 'Good morning';

-- Caso queira adicionar áudio para outras palavras de seleção (opcional):
UPDATE public.learning_questions
SET content = content || '{"audio_url": "https://api.dictionaryapi.dev/media/pronunciations/en/hello-us.mp3"}'::jsonb
WHERE content->>'prompt' ILIKE '%Olá%';

-- Exemplos para outras lições (você pode gerar os áudios por IA e substituir os links aqui)
UPDATE public.learning_questions
SET content = content || '{"audio_url": "https://api.dictionaryapi.dev/media/pronunciations/en/red-us.mp3"}'::jsonb
WHERE content->>'prompt' ILIKE '%apple%';

UPDATE public.learning_questions
SET content = content || '{"audio_url": "https://api.dictionaryapi.dev/media/pronunciations/en/drink-us.mp3"}'::jsonb
WHERE content->>'prompt' ILIKE '%water%';
