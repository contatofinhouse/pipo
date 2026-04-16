-- =============================================
-- PIPO APP - LIMPEZA COMPLETA + Schema Final
-- Cole TUDO isso no SQL Editor do Supabase e aperte RUN
-- =============================================

-- PASSO 1: Remove triggers ANTIGOS na tabela auth.users (causa do erro 500)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- PASSO 2: Remove triggers e tabelas do Pipo
DROP TRIGGER IF EXISTS on_profile_created ON public.profiles;
DROP FUNCTION IF EXISTS public.handle_new_profile() CASCADE;
DROP TABLE IF EXISTS public.mistakes CASCADE;
DROP TABLE IF EXISTS public.game_state CASCADE;
DROP TABLE IF EXISTS public.profiles CASCADE;

-- =============================================
-- TABELA 1: profiles
-- =============================================
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  phone TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL DEFAULT '',
  age INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "profiles_select" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "profiles_insert" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);
CREATE POLICY "profiles_update" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- =============================================
-- TABELA 2: game_state
-- =============================================
CREATE TABLE public.game_state (
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE PRIMARY KEY,
  hunger INTEGER DEFAULT 50 NOT NULL,
  happiness INTEGER DEFAULT 50 NOT NULL,
  energy INTEGER DEFAULT 100 NOT NULL,
  health INTEGER DEFAULT 100 NOT NULL,
  evolution_stage INTEGER DEFAULT 0 NOT NULL,
  inventory JSONB DEFAULT '[]'::jsonb NOT NULL,
  equipped_items JSONB DEFAULT '[]'::jsonb NOT NULL,
  placed_items JSONB DEFAULT '[]'::jsonb NOT NULL,
  english_level INTEGER DEFAULT 1 NOT NULL,
  english_points INTEGER DEFAULT 0 NOT NULL,
  fitness INTEGER DEFAULT 50 NOT NULL,
  streak_days INTEGER DEFAULT 0 NOT NULL,
  birthday BIGINT,
  last_lesson_date TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.game_state ENABLE ROW LEVEL SECURITY;
CREATE POLICY "game_state_all" ON public.game_state FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- TABELA 3: mistakes
-- =============================================
CREATE TABLE public.mistakes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  concept TEXT NOT NULL,
  mistake_count INTEGER DEFAULT 1 NOT NULL,
  last_mistake_date TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);

ALTER TABLE public.mistakes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "mistakes_all" ON public.mistakes FOR ALL USING (auth.uid() = user_id);

-- =============================================
-- TABELA 4: questions (banco de perguntas por nível)
-- =============================================
DROP TABLE IF EXISTS public.questions CASCADE;
CREATE TABLE public.questions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  level INTEGER NOT NULL,
  category TEXT NOT NULL, -- 'vocabulary', 'grammar', 'phrases', 'listening'
  question TEXT NOT NULL,
  options JSONB NOT NULL, -- ["option A", "option B", "option C", "option D"]
  correct_index INTEGER NOT NULL, -- index da resposta certa (0-3)
  explanation TEXT NOT NULL DEFAULT '', -- explicação em PT-BR
  xp_reward INTEGER NOT NULL DEFAULT 10
);

ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;
-- Qualquer usuario logado pode ler as perguntas
CREATE POLICY "questions_read" ON public.questions FOR SELECT USING (auth.uid() IS NOT NULL);

-- =============================================
-- TRIGGER: Cria game_state quando perfil é criado
-- (NÃO no auth.users, somente no profiles)
-- =============================================
CREATE OR REPLACE FUNCTION public.handle_new_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.game_state (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_profile_created
  AFTER INSERT ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_profile();

-- =============================================
-- SEED: Perguntas Nível 1 (Básico - Cores, Números, Saudações)
-- =============================================
INSERT INTO public.questions (level, category, question, options, correct_index, explanation, xp_reward) VALUES
-- Cores
(1, 'vocabulary', 'What color is the sky?', '["Red", "Blue", "Green", "Yellow"]', 1, 'O céu é "blue" (azul)!', 10),
(1, 'vocabulary', 'What color is a banana?', '["Blue", "Red", "Yellow", "Purple"]', 2, 'A banana é "yellow" (amarela)!', 10),
(1, 'vocabulary', 'What color is grass?', '["Green", "Blue", "Red", "White"]', 0, 'A grama é "green" (verde)!', 10),
(1, 'vocabulary', 'What color is snow?', '["Black", "Gray", "White", "Brown"]', 2, '"Snow" (neve) é "white" (branca)!', 10),
(1, 'vocabulary', 'What color is a tomato?', '["Yellow", "Green", "Blue", "Red"]', 3, 'O tomate é "red" (vermelho)!', 10),
(1, 'vocabulary', 'What color is chocolate?', '["White", "Brown", "Pink", "Orange"]', 1, 'Chocolate é "brown" (marrom)!', 10),
(1, 'vocabulary', 'What color is the sun?', '["Blue", "Green", "Yellow", "Purple"]', 2, 'O sol é "yellow" (amarelo)!', 10),
-- Números
(1, 'vocabulary', 'How do you say "três" in English?', '["Two", "Three", "Four", "Five"]', 1, '"Três" em inglês é "three"!', 10),
(1, 'vocabulary', 'How do you say "dez" in English?', '["Nine", "Eleven", "Ten", "Eight"]', 2, '"Dez" em inglês é "ten"!', 10),
(1, 'vocabulary', 'What number comes after seven?', '["Six", "Nine", "Eight", "Five"]', 2, 'Depois do "seven" vem o "eight" (oito)!', 10),
(1, 'vocabulary', 'What is 2 + 3 in English?', '["Four", "Six", "Five", "Three"]', 2, '2 + 3 = 5, que é "five"!', 10),
(1, 'vocabulary', 'How do you say "um" in English?', '["One", "Two", "Won", "On"]', 0, '"Um" em inglês é "one"!', 10),
-- Saudações
(1, 'phrases', 'How do you say "Bom dia" in English?', '["Good night", "Good morning", "Good evening", "Goodbye"]', 1, '"Bom dia" é "Good morning"!', 10),
(1, 'phrases', 'How do you say "Obrigado" in English?', '["Please", "Sorry", "Thank you", "Excuse me"]', 2, '"Obrigado" é "Thank you"!', 10),
(1, 'phrases', 'What does "Hello" mean?', '["Tchau", "Olá", "Por favor", "Desculpa"]', 1, '"Hello" significa "Olá"!', 10),
(1, 'phrases', 'What does "Goodbye" mean?', '["Bom dia", "Olá", "Tchau", "Obrigado"]', 2, '"Goodbye" significa "Tchau"!', 10),
(1, 'phrases', 'How do you say "Por favor" in English?', '["Sorry", "Thanks", "Please", "Hello"]', 2, '"Por favor" é "Please"!', 10),
(1, 'phrases', 'What does "How are you?" mean?', '["Qual seu nome?", "Como você está?", "Onde você mora?", "Quantos anos?"]', 1, '"How are you?" = Como você está?', 10),
(1, 'phrases', 'How do you answer "How are you?"', '["I am fine", "I am name", "I am here", "I am go"]', 0, 'Resposta: "I am fine" (Eu estou bem)!', 10),
-- Animais
(1, 'vocabulary', 'What is "gato" in English?', '["Dog", "Bird", "Cat", "Fish"]', 2, '"Gato" é "cat"!', 10),
(1, 'vocabulary', 'What is "cachorro" in English?', '["Cat", "Dog", "Duck", "Cow"]', 1, '"Cachorro" é "dog"!', 10),
(1, 'vocabulary', 'What is "pássaro" in English?', '["Fish", "Bear", "Snake", "Bird"]', 3, '"Pássaro" é "bird"!', 10),
(1, 'vocabulary', 'What animal says "moo"?', '["Dog", "Cat", "Cow", "Duck"]', 2, 'A "cow" (vaca) faz "moo"!', 10),
(1, 'vocabulary', 'What is "peixe" in English?', '["Bird", "Fish", "Frog", "Fox"]', 1, '"Peixe" é "fish"!', 10);

-- =============================================
-- SEED: Perguntas Nível 2 (Família, Corpo, Dias da Semana)
-- =============================================
INSERT INTO public.questions (level, category, question, options, correct_index, explanation, xp_reward) VALUES
(2, 'vocabulary', 'What is "mãe" in English?', '["Father", "Sister", "Mother", "Brother"]', 2, '"Mãe" é "mother"!', 12),
(2, 'vocabulary', 'What is "pai" in English?', '["Mother", "Father", "Uncle", "Son"]', 1, '"Pai" é "father"!', 12),
(2, 'vocabulary', 'What is "irmão" in English?', '["Sister", "Brother", "Cousin", "Friend"]', 1, '"Irmão" é "brother"!', 12),
(2, 'vocabulary', 'What is "irmã" in English?', '["Brother", "Mother", "Sister", "Aunt"]', 2, '"Irmã" é "sister"!', 12),
(2, 'vocabulary', 'What is "olho" in English?', '["Ear", "Nose", "Eye", "Mouth"]', 2, '"Olho" é "eye"!', 12),
(2, 'vocabulary', 'What is "mão" in English?', '["Foot", "Hand", "Arm", "Leg"]', 1, '"Mão" é "hand"!', 12),
(2, 'vocabulary', 'What is "cabeça" in English?', '["Head", "Hair", "Heart", "Hat"]', 0, '"Cabeça" é "head"!', 12),
(2, 'vocabulary', 'What day comes after Monday?', '["Wednesday", "Sunday", "Tuesday", "Friday"]', 2, 'Depois de "Monday" vem "Tuesday" (terça)!', 12),
(2, 'vocabulary', 'What is the first day of the week in English?', '["Monday", "Saturday", "Sunday", "Friday"]', 2, 'O primeiro dia é "Sunday" (domingo)!', 12),
(2, 'vocabulary', 'What is "comida" in English?', '["Drink", "Food", "Fruit", "Fork"]', 1, '"Comida" é "food"!', 12),
(2, 'vocabulary', 'What is "água" in English?', '["Juice", "Milk", "Water", "Soda"]', 2, '"Água" é "water"!', 12),
(2, 'phrases', 'What does "I am hungry" mean?', '["Estou cansado", "Estou feliz", "Estou com fome", "Estou com sede"]', 2, '"I am hungry" = Estou com fome!', 12),
(2, 'phrases', 'How do you say "Meu nome é..." in English?', '["I am...", "My name is...", "You are...", "He is..."]', 1, '"Meu nome é" = "My name is..."!', 12),
(2, 'grammar', 'Complete: "She ___ a student."', '["am", "are", "is", "be"]', 2, 'She/He/It usa "is"!', 15),
(2, 'grammar', 'Complete: "They ___ happy."', '["is", "am", "be", "are"]', 3, 'They/We/You usa "are"!', 15),
(2, 'grammar', 'Complete: "I ___ Brazilian."', '["is", "am", "are", "be"]', 1, 'I sempre usa "am"!', 15),
(2, 'vocabulary', 'What is "escola" in English?', '["House", "Church", "School", "Store"]', 2, '"Escola" é "school"!', 12),
(2, 'vocabulary', 'What is "casa" in English?', '["Home", "Horse", "Hotel", "Hospital"]', 0, '"Casa" é "home" ou "house"!', 12),
(2, 'vocabulary', 'What is "livro" in English?', '["Book", "Cook", "Look", "Hook"]', 0, '"Livro" é "book"!', 12),
(2, 'phrases', 'What does "I like pizza" mean?', '["Eu faço pizza", "Eu gosto de pizza", "Eu quero pizza", "Eu tenho pizza"]', 1, '"I like" = "Eu gosto de"!', 12);

-- =============================================
-- SEED: Perguntas Nível 3 (Verbos, Presente Simples, Roupas)
-- =============================================
INSERT INTO public.questions (level, category, question, options, correct_index, explanation, xp_reward) VALUES
(3, 'grammar', 'Complete: "She ___ to school every day."', '["go", "goes", "going", "gone"]', 1, 'He/She/It no presente simples: verbo + s/es → "goes"!', 15),
(3, 'grammar', 'Complete: "I ___ breakfast at 7 AM."', '["has", "have", "having", "had"]', 1, 'I/You/We/They usa "have"!', 15),
(3, 'grammar', 'Complete: "He ___ English very well."', '["speak", "speaks", "speaking", "spoken"]', 1, 'He/She/It + verbo com "s" no presente simples!', 15),
(3, 'grammar', 'Which is correct?', '["She dont like", "She does not like", "She not like", "She no like"]', 1, 'Negativa: She does not (doesn''t) like!', 15),
(3, 'grammar', 'Complete: "Do you ___ soccer?"', '["plays", "playing", "play", "played"]', 2, 'Depois de "do/does" o verbo fica na forma base!', 15),
(3, 'vocabulary', 'What is "camisa" in English?', '["Pants", "Shoes", "Shirt", "Hat"]', 2, '"Camisa" é "shirt"!', 12),
(3, 'vocabulary', 'What is "sapato" in English?', '["Sock", "Shoe", "Shirt", "Short"]', 1, '"Sapato" é "shoe"!', 12),
(3, 'vocabulary', 'What is "calça" in English?', '["Pants", "Shirt", "Skirt", "Dress"]', 0, '"Calça" é "pants"!', 12),
(3, 'vocabulary', 'What does "weather" mean?', '["Água", "Tempo (clima)", "Vento", "Chuva"]', 1, '"Weather" = tempo/clima!', 12),
(3, 'vocabulary', 'What is "chuva" in English?', '["Sun", "Wind", "Rain", "Snow"]', 2, '"Chuva" é "rain"!', 12),
(3, 'phrases', 'What does "What time is it?" mean?', '["Que dia é hoje?", "Que horas são?", "Onde estamos?", "Como está o tempo?"]', 1, '"What time is it?" = Que horas são?', 12),
(3, 'phrases', 'How do you say "Eu preciso de ajuda" in English?', '["I want help", "I need help", "I like help", "I have help"]', 1, '"Eu preciso de ajuda" = "I need help"!', 12),
(3, 'vocabulary', 'What is the opposite of "hot"?', '["Warm", "Cool", "Cold", "Wet"]', 2, 'O oposto de "hot" (quente) é "cold" (frio)!', 12),
(3, 'vocabulary', 'What is the opposite of "big"?', '["Tall", "Large", "Small", "Wide"]', 2, 'O oposto de "big" (grande) é "small" (pequeno)!', 12),
(3, 'vocabulary', 'What does "fast" mean?', '["Lento", "Rápido", "Forte", "Fraco"]', 1, '"Fast" = rápido!', 12),
(3, 'phrases', 'How do you say "Onde fica o banheiro?" in English?', '["Where is the bedroom?", "Where is the bathroom?", "Where is the kitchen?", "Where is the door?"]', 1, '"Onde fica o banheiro?" = "Where is the bathroom?"', 12),
(3, 'grammar', 'Which sentence is correct?', '["He don''t like coffee", "He doesn''t likes coffee", "He doesn''t like coffee", "He not like coffee"]', 2, 'Correto: He doesn''t like (sem "s" no verbo após doesn''t)!', 15),
(3, 'vocabulary', 'What is "dinheiro" in English?', '["Gold", "Money", "Price", "Coin"]', 1, '"Dinheiro" é "money"!', 12),
(3, 'vocabulary', 'What meal do you eat in the morning?', '["Dinner", "Lunch", "Breakfast", "Snack"]', 2, 'De manhã: "breakfast" (café da manhã)!', 12);

-- =============================================
-- SEED: Perguntas Nível 4 (Passado Simples, Profissões, Preposições)
-- =============================================
INSERT INTO public.questions (level, category, question, options, correct_index, explanation, xp_reward) VALUES
(4, 'grammar', 'What is the past of "go"?', '["Goed", "Gone", "Went", "Going"]', 2, '"Go" no passado é "went" (verbo irregular)!', 18),
(4, 'grammar', 'What is the past of "eat"?', '["Eated", "Ate", "Eaten", "Eating"]', 1, '"Eat" no passado é "ate" (verbo irregular)!', 18),
(4, 'grammar', 'What is the past of "see"?', '["Seed", "Seen", "Seeing", "Saw"]', 3, '"See" no passado é "saw"!', 18),
(4, 'grammar', 'Complete: "I ___ to the park yesterday."', '["go", "goes", "went", "going"]', 2, '"Yesterday" indica passado → "went"!', 18),
(4, 'grammar', 'Complete: "She ___ a cake last night."', '["make", "makes", "making", "made"]', 3, '"Last night" = passado → "made"!', 18),
(4, 'grammar', 'Which is correct?', '["I didn''t went", "I didn''t go", "I not went", "I no go"]', 1, 'Negativa no passado: didn''t + verbo base!', 18),
(4, 'vocabulary', 'What is a "doctor"?', '["Professor", "Médico", "Advogado", "Engenheiro"]', 1, '"Doctor" = médico!', 15),
(4, 'vocabulary', 'What is a "teacher"?', '["Médico", "Motorista", "Professor", "Cozinheiro"]', 2, '"Teacher" = professor!', 15),
(4, 'vocabulary', 'What does "lawyer" mean?', '["Médico", "Professor", "Engenheiro", "Advogado"]', 3, '"Lawyer" = advogado!', 15),
(4, 'grammar', 'Complete: "The book is ___ the table."', '["in", "on", "at", "to"]', 1, '"On" = em cima de (superfície)!', 18),
(4, 'grammar', 'Complete: "The cat is ___ the box."', '["on", "at", "in", "to"]', 2, '"In" = dentro de!', 18),
(4, 'grammar', 'Complete: "I arrive ___ school at 8."', '["in", "on", "at", "to"]', 2, '"At" para lugares específicos (school, home, work)!', 18),
(4, 'phrases', 'What does "I used to play soccer" mean?', '["Eu jogo futebol", "Eu costumava jogar futebol", "Eu vou jogar futebol", "Eu estou jogando futebol"]', 1, '"Used to" = costumava (hábito no passado)!', 15),
(4, 'vocabulary', 'What is "aeroporto" in English?', '["Station", "Airport", "Airplane", "Harbor"]', 1, '"Aeroporto" = "airport"!', 15),
(4, 'grammar', 'What is the past of "buy"?', '["Buyed", "Buying", "Bought", "Buys"]', 2, '"Buy" → "bought" (irregular)!', 18),
(4, 'grammar', 'Complete: "Did she ___ the movie?"', '["liked", "likes", "liking", "like"]', 3, 'Após "did" o verbo fica na forma base!', 18),
(4, 'vocabulary', 'What does "expensive" mean?', '["Barato", "Caro", "Grátis", "Bonito"]', 1, '"Expensive" = caro!', 15),
(4, 'vocabulary', 'What is the opposite of "expensive"?', '["Rich", "Free", "Cheap", "Poor"]', 2, 'Oposto de "expensive" é "cheap" (barato)!', 15);

-- =============================================
-- SEED: Perguntas Nível 5 (Futuro, Comparativos, Frases complexas)
-- =============================================
INSERT INTO public.questions (level, category, question, options, correct_index, explanation, xp_reward) VALUES
(5, 'grammar', 'Complete: "I ___ travel next year."', '["will", "am", "was", "did"]', 0, '"Will" indica futuro!', 20),
(5, 'grammar', 'Complete: "She is ___ than her sister."', '["tall", "more tall", "taller", "tallest"]', 2, 'Comparativo de "tall" = "taller" (+ er)!', 20),
(5, 'grammar', 'Complete: "This is the ___ movie ever."', '["good", "better", "more good", "best"]', 3, 'Superlativo de "good" = "best"!', 20),
(5, 'grammar', 'Which is correct?', '["More better", "More good", "Better", "Gooder"]', 2, '"Good → better → best" (irregular)!', 20),
(5, 'grammar', 'Complete: "If I ___ rich, I would travel."', '["am", "was", "were", "will be"]', 2, 'Condicional: "If I were..." (subjuntivo)!', 20),
(5, 'grammar', 'Complete: "I have ___ to Paris twice."', '["go", "went", "going", "been"]', 3, 'Present Perfect: have/has + particípio → "been"!', 20),
(5, 'grammar', 'What is the difference between "since" and "for"?', '["Since = duração, For = ponto", "Since = ponto no tempo, For = duração", "São iguais", "Nenhuma diferença"]', 1, '"Since" = desde (ponto). "For" = durante (duração)!', 20),
(5, 'phrases', 'What does "I have been studying for 2 hours" mean?', '["Estudei 2 horas", "Estou estudando há 2 horas", "Vou estudar 2 horas", "Estudava 2 horas"]', 1, 'Present Perfect Continuous: ação que começou e continua!', 20),
(5, 'grammar', 'Complete: "She ___ here since 2020."', '["is living", "has lived", "lived", "will live"]', 1, 'Since + Present Perfect: "has lived"!', 20),
(5, 'vocabulary', 'What does "although" mean?', '["Porque", "Embora", "Portanto", "Enquanto"]', 1, '"Although" = embora/apesar de!', 18),
(5, 'vocabulary', 'What does "therefore" mean?', '["Embora", "Enquanto", "Portanto", "Porque"]', 2, '"Therefore" = portanto!', 18),
(5, 'phrases', 'What does "I would rather stay home" mean?', '["Eu preciso ficar em casa", "Eu prefiro ficar em casa", "Eu vou ficar em casa", "Eu fico em casa"]', 1, '"Would rather" = preferiria!', 20),
(5, 'grammar', 'Which sentence uses "much" correctly?', '["Much books", "Much people", "Much water", "Much friends"]', 2, '"Much" para incontáveis (water, money, time)!', 20),
(5, 'grammar', 'Which sentence uses "many" correctly?', '["Many water", "Many money", "Many time", "Many books"]', 3, '"Many" para contáveis (books, people, cars)!', 20),
(5, 'grammar', 'Complete: "The house ___ built in 1990."', '["is", "was", "were", "has"]', 1, 'Voz passiva no passado: "was built"!', 20),
(5, 'phrases', 'What does "break a leg" mean?', '["Quebre a perna", "Boa sorte", "Cuidado", "Pare agora"]', 1, '"Break a leg" é expressão idiomática = Boa sorte!', 20),
(5, 'phrases', 'What does "It''s raining cats and dogs" mean?', '["Gatos e cachorros estão caindo", "Está chovendo muito forte", "O tempo está bom", "Está nublado"]', 1, 'Expressão idiomática = Chovendo muito forte!', 20),
(5, 'vocabulary', 'What does "deadline" mean?', '["Linha morta", "Prazo final", "Horário", "Começo"]', 1, '"Deadline" = prazo final!', 18);
