-- =============================================
-- PIPO - SQL INCREMENTAL (só mudanças novas)
-- Cole no SQL Editor do Supabase e aperte RUN
-- NÃO destrói nada que já existe
-- =============================================

-- 1. Mudar default do evolution_stage para 0 (EGG) em novos usuários
ALTER TABLE public.game_state ALTER COLUMN evolution_stage SET DEFAULT 0;

-- 2. Criar tabela de perguntas (se não existir)
CREATE TABLE IF NOT EXISTS public.questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  level INTEGER NOT NULL,
  category TEXT NOT NULL,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct_index INTEGER NOT NULL,
  explanation TEXT NOT NULL DEFAULT '',
  xp_reward INTEGER NOT NULL DEFAULT 10
);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "questions_read" ON public.questions;
CREATE POLICY "questions_read" ON public.questions FOR SELECT USING (auth.uid() IS NOT NULL);

-- 3. Inserir perguntas (só se a tabela estiver vazia)
INSERT INTO public.questions (level, category, question, options, correct_index, explanation, xp_reward)
SELECT * FROM (VALUES
-- NÍVEL 1: Cores, Números, Saudações, Animais
(1, 'vocabulary', 'What color is the sky?', '["Red", "Blue", "Green", "Yellow"]'::jsonb, 1, 'O céu é "blue" (azul)!', 10),
(1, 'vocabulary', 'What color is a banana?', '["Blue", "Red", "Yellow", "Purple"]'::jsonb, 2, 'A banana é "yellow" (amarela)!', 10),
(1, 'vocabulary', 'What color is grass?', '["Green", "Blue", "Red", "White"]'::jsonb, 0, 'A grama é "green" (verde)!', 10),
(1, 'vocabulary', 'What color is snow?', '["Black", "Gray", "White", "Brown"]'::jsonb, 2, '"Snow" (neve) é "white" (branca)!', 10),
(1, 'vocabulary', 'What color is a tomato?', '["Yellow", "Green", "Blue", "Red"]'::jsonb, 3, 'O tomate é "red" (vermelho)!', 10),
(1, 'vocabulary', 'What color is chocolate?', '["White", "Brown", "Pink", "Orange"]'::jsonb, 1, 'Chocolate é "brown" (marrom)!', 10),
(1, 'vocabulary', 'What color is the sun?', '["Blue", "Green", "Yellow", "Purple"]'::jsonb, 2, 'O sol é "yellow" (amarelo)!', 10),
(1, 'vocabulary', 'How do you say "três" in English?', '["Two", "Three", "Four", "Five"]'::jsonb, 1, '"Três" em inglês é "three"!', 10),
(1, 'vocabulary', 'How do you say "dez" in English?', '["Nine", "Eleven", "Ten", "Eight"]'::jsonb, 2, '"Dez" em inglês é "ten"!', 10),
(1, 'vocabulary', 'What number comes after seven?', '["Six", "Nine", "Eight", "Five"]'::jsonb, 2, 'Depois do "seven" vem o "eight" (oito)!', 10),
(1, 'vocabulary', 'What is 2 + 3 in English?', '["Four", "Six", "Five", "Three"]'::jsonb, 2, '2 + 3 = 5, que é "five"!', 10),
(1, 'vocabulary', 'How do you say "um" in English?', '["One", "Two", "Won", "On"]'::jsonb, 0, '"Um" em inglês é "one"!', 10),
(1, 'phrases', 'How do you say "Bom dia" in English?', '["Good night", "Good morning", "Good evening", "Goodbye"]'::jsonb, 1, '"Bom dia" é "Good morning"!', 10),
(1, 'phrases', 'How do you say "Obrigado" in English?', '["Please", "Sorry", "Thank you", "Excuse me"]'::jsonb, 2, '"Obrigado" é "Thank you"!', 10),
(1, 'phrases', 'What does "Hello" mean?', '["Tchau", "Olá", "Por favor", "Desculpa"]'::jsonb, 1, '"Hello" significa "Olá"!', 10),
(1, 'phrases', 'What does "Goodbye" mean?', '["Bom dia", "Olá", "Tchau", "Obrigado"]'::jsonb, 2, '"Goodbye" significa "Tchau"!', 10),
(1, 'phrases', 'How do you say "Por favor" in English?', '["Sorry", "Thanks", "Please", "Hello"]'::jsonb, 2, '"Por favor" é "Please"!', 10),
(1, 'phrases', 'What does "How are you?" mean?', '["Qual seu nome?", "Como você está?", "Onde você mora?", "Quantos anos?"]'::jsonb, 1, '"How are you?" = Como você está?', 10),
(1, 'phrases', 'How do you answer "How are you?"', '["I am fine", "I am name", "I am here", "I am go"]'::jsonb, 0, 'Resposta: "I am fine" (Eu estou bem)!', 10),
(1, 'vocabulary', 'What is "gato" in English?', '["Dog", "Bird", "Cat", "Fish"]'::jsonb, 2, '"Gato" é "cat"!', 10),
(1, 'vocabulary', 'What is "cachorro" in English?', '["Cat", "Dog", "Duck", "Cow"]'::jsonb, 1, '"Cachorro" é "dog"!', 10),
(1, 'vocabulary', 'What is "pássaro" in English?', '["Fish", "Bear", "Snake", "Bird"]'::jsonb, 3, '"Pássaro" é "bird"!', 10),
(1, 'vocabulary', 'What animal says "moo"?', '["Dog", "Cat", "Cow", "Duck"]'::jsonb, 2, 'A "cow" (vaca) faz "moo"!', 10),
(1, 'vocabulary', 'What is "peixe" in English?', '["Bird", "Fish", "Frog", "Fox"]'::jsonb, 1, '"Peixe" é "fish"!', 10),

-- NÍVEL 2: Família, Corpo, Dias da Semana
(2, 'vocabulary', 'What is "mãe" in English?', '["Father", "Sister", "Mother", "Brother"]'::jsonb, 2, '"Mãe" é "mother"!', 12),
(2, 'vocabulary', 'What is "pai" in English?', '["Mother", "Father", "Uncle", "Son"]'::jsonb, 1, '"Pai" é "father"!', 12),
(2, 'vocabulary', 'What is "irmão" in English?', '["Sister", "Brother", "Cousin", "Friend"]'::jsonb, 1, '"Irmão" é "brother"!', 12),
(2, 'vocabulary', 'What is "irmã" in English?', '["Brother", "Mother", "Sister", "Aunt"]'::jsonb, 2, '"Irmã" é "sister"!', 12),
(2, 'vocabulary', 'What is "olho" in English?', '["Ear", "Nose", "Eye", "Mouth"]'::jsonb, 2, '"Olho" é "eye"!', 12),
(2, 'vocabulary', 'What is "mão" in English?', '["Foot", "Hand", "Arm", "Leg"]'::jsonb, 1, '"Mão" é "hand"!', 12),
(2, 'vocabulary', 'What is "cabeça" in English?', '["Head", "Hair", "Heart", "Hat"]'::jsonb, 0, '"Cabeça" é "head"!', 12),
(2, 'vocabulary', 'What day comes after Monday?', '["Wednesday", "Sunday", "Tuesday", "Friday"]'::jsonb, 2, 'Depois de "Monday" vem "Tuesday" (terça)!', 12),
(2, 'vocabulary', 'What is "comida" in English?', '["Drink", "Food", "Fruit", "Fork"]'::jsonb, 1, '"Comida" é "food"!', 12),
(2, 'vocabulary', 'What is "água" in English?', '["Juice", "Milk", "Water", "Soda"]'::jsonb, 2, '"Água" é "water"!', 12),
(2, 'phrases', 'What does "I am hungry" mean?', '["Estou cansado", "Estou feliz", "Estou com fome", "Estou com sede"]'::jsonb, 2, '"I am hungry" = Estou com fome!', 12),
(2, 'phrases', 'How do you say "Meu nome é..." in English?', '["I am...", "My name is...", "You are...", "He is..."]'::jsonb, 1, '"Meu nome é" = "My name is..."!', 12),
(2, 'grammar', 'Complete: "She ___ a student."', '["am", "are", "is", "be"]'::jsonb, 2, 'She/He/It usa "is"!', 15),
(2, 'grammar', 'Complete: "They ___ happy."', '["is", "am", "be", "are"]'::jsonb, 3, 'They/We/You usa "are"!', 15),
(2, 'grammar', 'Complete: "I ___ Brazilian."', '["is", "am", "are", "be"]'::jsonb, 1, 'I sempre usa "am"!', 15),
(2, 'vocabulary', 'What is "escola" in English?', '["House", "Church", "School", "Store"]'::jsonb, 2, '"Escola" é "school"!', 12),
(2, 'vocabulary', 'What is "livro" in English?', '["Book", "Cook", "Look", "Hook"]'::jsonb, 0, '"Livro" é "book"!', 12),
(2, 'phrases', 'What does "I like pizza" mean?', '["Eu faço pizza", "Eu gosto de pizza", "Eu quero pizza", "Eu tenho pizza"]'::jsonb, 1, '"I like" = "Eu gosto de"!', 12),

-- NÍVEL 3: Verbos, Presente Simples, Roupas
(3, 'grammar', 'Complete: "She ___ to school every day."', '["go", "goes", "going", "gone"]'::jsonb, 1, 'He/She/It no presente simples: verbo + s/es!', 15),
(3, 'grammar', 'Complete: "I ___ breakfast at 7 AM."', '["has", "have", "having", "had"]'::jsonb, 1, 'I/You/We/They usa "have"!', 15),
(3, 'grammar', 'Complete: "He ___ English very well."', '["speak", "speaks", "speaking", "spoken"]'::jsonb, 1, 'He/She/It + verbo com "s" no presente simples!', 15),
(3, 'grammar', 'Which is correct?', '["She dont like", "She does not like", "She not like", "She no like"]'::jsonb, 1, 'Negativa: She does not like!', 15),
(3, 'grammar', 'Complete: "Do you ___ soccer?"', '["plays", "playing", "play", "played"]'::jsonb, 2, 'Depois de "do/does" o verbo fica na forma base!', 15),
(3, 'vocabulary', 'What is "camisa" in English?', '["Pants", "Shoes", "Shirt", "Hat"]'::jsonb, 2, '"Camisa" é "shirt"!', 12),
(3, 'vocabulary', 'What is "sapato" in English?', '["Sock", "Shoe", "Shirt", "Short"]'::jsonb, 1, '"Sapato" é "shoe"!', 12),
(3, 'vocabulary', 'What is "chuva" in English?', '["Sun", "Wind", "Rain", "Snow"]'::jsonb, 2, '"Chuva" é "rain"!', 12),
(3, 'vocabulary', 'What is the opposite of "hot"?', '["Warm", "Cool", "Cold", "Wet"]'::jsonb, 2, 'Oposto de "hot" é "cold" (frio)!', 12),
(3, 'vocabulary', 'What is the opposite of "big"?', '["Tall", "Large", "Small", "Wide"]'::jsonb, 2, 'Oposto de "big" é "small" (pequeno)!', 12),
(3, 'phrases', 'How do you say "Eu preciso de ajuda"?', '["I want help", "I need help", "I like help", "I have help"]'::jsonb, 1, '"Eu preciso de ajuda" = "I need help"!', 12),
(3, 'vocabulary', 'What is "dinheiro" in English?', '["Gold", "Money", "Price", "Coin"]'::jsonb, 1, '"Dinheiro" é "money"!', 12),

-- NÍVEL 4: Passado Simples, Profissões, Preposições
(4, 'grammar', 'What is the past of "go"?', '["Goed", "Gone", "Went", "Going"]'::jsonb, 2, '"Go" no passado é "went" (irregular)!', 18),
(4, 'grammar', 'What is the past of "eat"?', '["Eated", "Ate", "Eaten", "Eating"]'::jsonb, 1, '"Eat" no passado é "ate" (irregular)!', 18),
(4, 'grammar', 'What is the past of "see"?', '["Seed", "Seen", "Seeing", "Saw"]'::jsonb, 3, '"See" no passado é "saw"!', 18),
(4, 'grammar', 'Complete: "I ___ to the park yesterday."', '["go", "goes", "went", "going"]'::jsonb, 2, '"Yesterday" indica passado → "went"!', 18),
(4, 'grammar', 'Which is correct?', '["I didnt went", "I didnt go", "I not went", "I no go"]'::jsonb, 1, 'Negativa no passado: didnt + verbo base!', 18),
(4, 'vocabulary', 'What is a "doctor"?', '["Professor", "Médico", "Advogado", "Engenheiro"]'::jsonb, 1, '"Doctor" = médico!', 15),
(4, 'vocabulary', 'What is a "teacher"?', '["Médico", "Motorista", "Professor", "Cozinheiro"]'::jsonb, 2, '"Teacher" = professor!', 15),
(4, 'grammar', 'Complete: "The book is ___ the table."', '["in", "on", "at", "to"]'::jsonb, 1, '"On" = em cima de (superfície)!', 18),
(4, 'grammar', 'Complete: "The cat is ___ the box."', '["on", "at", "in", "to"]'::jsonb, 2, '"In" = dentro de!', 18),
(4, 'grammar', 'What is the past of "buy"?', '["Buyed", "Buying", "Bought", "Buys"]'::jsonb, 2, '"Buy" → "bought" (irregular)!', 18),
(4, 'vocabulary', 'What does "expensive" mean?', '["Barato", "Caro", "Grátis", "Bonito"]'::jsonb, 1, '"Expensive" = caro!', 15),

-- NÍVEL 5: Futuro, Comparativos, Expressões
(5, 'grammar', 'Complete: "I ___ travel next year."', '["will", "am", "was", "did"]'::jsonb, 0, '"Will" indica futuro!', 20),
(5, 'grammar', 'Complete: "She is ___ than her sister."', '["tall", "more tall", "taller", "tallest"]'::jsonb, 2, 'Comparativo de "tall" = "taller" (+ er)!', 20),
(5, 'grammar', 'Complete: "This is the ___ movie ever."', '["good", "better", "more good", "best"]'::jsonb, 3, 'Superlativo de "good" = "best"!', 20),
(5, 'grammar', 'Which is correct?', '["More better", "More good", "Better", "Gooder"]'::jsonb, 2, '"Good → better → best" (irregular)!', 20),
(5, 'grammar', 'Complete: "I have ___ to Paris twice."', '["go", "went", "going", "been"]'::jsonb, 3, 'Present Perfect: have/has + particípio → "been"!', 20),
(5, 'phrases', 'What does "break a leg" mean?', '["Quebre a perna", "Boa sorte", "Cuidado", "Pare agora"]'::jsonb, 1, '"Break a leg" = Boa sorte!', 20),
(5, 'phrases', 'What does "Its raining cats and dogs" mean?', '["Gatos caindo", "Chovendo muito forte", "Tempo bom", "Nublado"]'::jsonb, 1, 'Expressão idiomática = Chovendo muito forte!', 20),
(5, 'vocabulary', 'What does "deadline" mean?', '["Linha morta", "Prazo final", "Horário", "Começo"]'::jsonb, 1, '"Deadline" = prazo final!', 18),
(5, 'grammar', 'Which uses "much" correctly?', '["Much books", "Much people", "Much water", "Much friends"]'::jsonb, 2, '"Much" para incontáveis (water, money)!', 20),
(5, 'grammar', 'Which uses "many" correctly?', '["Many water", "Many money", "Many time", "Many books"]'::jsonb, 3, '"Many" para contáveis (books, people)!', 20)
) AS v(level, category, question, options, correct_index, explanation, xp_reward)
WHERE NOT EXISTS (SELECT 1 FROM public.questions LIMIT 1);

-- 4. RLS para Ranking: permitir leitura de game_state e profiles de todos os usuarios logados
DROP POLICY IF EXISTS "game_state_read_ranking" ON public.game_state;
CREATE POLICY "game_state_read_ranking" ON public.game_state FOR SELECT USING (auth.uid() IS NOT NULL);

DROP POLICY IF EXISTS "profiles_read_ranking" ON public.profiles;
CREATE POLICY "profiles_read_ranking" ON public.profiles FOR SELECT USING (auth.uid() IS NOT NULL);
