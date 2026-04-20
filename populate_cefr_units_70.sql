-- =================================================================================
-- PIPO CEFR CURRICULUM v2 — A1 to C2 (70 UNITS, HAND-CURATED)
-- =================================================================================

TRUNCATE public.learning_units, public.learning_lessons, public.learning_questions CASCADE;

DO $$
DECLARE
    u_id UUID;
    l_id UUID;
BEGIN

    -- ═══════════ UNIT 1 [A1]: Hello, World! ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 1, 'Hello, World!', 'Cumprimentos básicos e apresentações.', '👋');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Greetings', 20);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 1, '{"prompt":"What does ''Hello'' mean?","image":"👋"}'::jsonb, '[{"text":"Olá","is_correct":true},{"text":"Tchau","is_correct":false},{"text":"Obrigado","is_correct":false}]'::jsonb, '''Hello'' = Olá. É o cumprimento mais comum em inglês.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 1, '{"prompt":"Match the greetings to their meanings.","items":[{"icon":"👋","word":"Hello"},{"icon":"🌅","word":"Good morning"},{"icon":"🌙","word":"Good night"}]}'::jsonb, '[]'::jsonb, 'Hello = Olá, Good morning = Bom dia, Good night = Boa noite.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 1, '{"prompt":"How do you say ''Tchau'' in English?","image":"👋"}'::jsonb, '[{"text":"Goodbye","is_correct":true},{"text":"Hello","is_correct":false},{"text":"Please","is_correct":false}]'::jsonb, '''Goodbye'' = Tchau. Para despedidas.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 1, '{"prompt":"Listen and choose the correct translation.","audio_text":"Good morning","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=good+morning"}'::jsonb, '[{"text":"Bom dia","is_correct":true},{"text":"Boa tarde","is_correct":false},{"text":"Boa noite","is_correct":false}]'::jsonb, '''Good morning'' = Bom dia.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Introductions', 20);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 1, '{"prompt":"What does ''My name is...'' mean?","image":"🏷️"}'::jsonb, '[{"text":"Meu nome é...","is_correct":true},{"text":"Eu gosto de...","is_correct":false},{"text":"Eu moro em...","is_correct":false}]'::jsonb, '''My name is...'' = Meu nome é...');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 1, '{"prompt":"Put the words in order:","sentence":"My name is Pipo"}'::jsonb, '[]'::jsonb, 'The correct order is: My name is Pipo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 1, '{"prompt":"''Nice to meet you'' means:","image":"🤝"}'::jsonb, '[{"text":"Prazer em te conhecer","is_correct":true},{"text":"Como vai você?","is_correct":false},{"text":"De onde você é?","is_correct":false}]'::jsonb, '''Nice to meet you'' = Prazer em te conhecer.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 1, '{"prompt":"Listen and select the correct phrase.","audio_text":"How are you?","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=how+are+you"}'::jsonb, '[{"text":"Como você está?","is_correct":true},{"text":"Qual é seu nome?","is_correct":false},{"text":"Quantos anos você tem?","is_correct":false}]'::jsonb, '''How are you?'' = Como você está?');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Saying Goodbye', 20);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 1, '{"prompt":"Connect the farewells.","items":[{"icon":"👋","word":"Bye"},{"icon":"🌙","word":"Good night"},{"icon":"🔜","word":"See you later"}]}'::jsonb, '[]'::jsonb, 'Bye = Tchau, Good night = Boa noite, See you later = Até logo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 1, '{"prompt":"''See you tomorrow'' means:","image":"📅"}'::jsonb, '[{"text":"Até amanhã","is_correct":true},{"text":"Até logo","is_correct":false},{"text":"Até semana que vem","is_correct":false}]'::jsonb, '''See you tomorrow'' = Até amanhã.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 1, '{"prompt":"Put the words in order:","sentence":"See you later"}'::jsonb, '[]'::jsonb, 'Correct: See you later.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 1, '{"prompt":"''Good morning'' is used at night. True or False?"}'::jsonb, '[{"text":"False","is_correct":true},{"text":"True","is_correct":false}]'::jsonb, '''Good morning'' is used in the morning, not at night.');

    -- ═══════════ UNIT 2 [A1]: Numbers & Counting ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 2, 'Numbers & Counting', 'Aprenda os números de 1 a 100.', '🔢');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Numbers 1-10', 20);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 2, '{"prompt":"Match the numbers.","items":[{"icon":"1️⃣","word":"one"},{"icon":"5️⃣","word":"five"},{"icon":"🔟","word":"ten"}]}'::jsonb, '[]'::jsonb, '1 = one, 5 = five, 10 = ten.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 2, '{"prompt":"Listen. What number is it?","audio_text":"seven","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=seven"}'::jsonb, '[{"text":"7","is_correct":true},{"text":"6","is_correct":false},{"text":"8","is_correct":false}]'::jsonb, '''Seven'' = 7.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 2, '{"prompt":"What is ''three'' in Portuguese?","image":"3️⃣"}'::jsonb, '[{"text":"Três","is_correct":true},{"text":"Quatro","is_correct":false},{"text":"Dois","is_correct":false}]'::jsonb, 'Three = Três.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 2, '{"prompt":"Order from smallest to largest:","sentence":"one two three"}'::jsonb, '[]'::jsonb, '1, 2, 3 = one, two, three.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Numbers 11-20', 20);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 2, '{"prompt":"How do you say ''15'' in English?","image":"🔢"}'::jsonb, '[{"text":"Fifteen","is_correct":true},{"text":"Fifty","is_correct":false},{"text":"Fourteen","is_correct":false}]'::jsonb, '15 = Fifteen. Cuidado: 50 = Fifty!');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 2, '{"prompt":"Listen and select the number.","audio_text":"thirteen","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=thirteen"}'::jsonb, '[{"text":"13","is_correct":true},{"text":"30","is_correct":false},{"text":"14","is_correct":false}]'::jsonb, 'Thirteen = 13. Thirty = 30.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 2, '{"prompt":"Match numbers to words.","items":[{"icon":"1️⃣1️⃣","word":"eleven"},{"icon":"1️⃣2️⃣","word":"twelve"},{"icon":"2️⃣0️⃣","word":"twenty"}]}'::jsonb, '[]'::jsonb, '11=eleven, 12=twelve, 20=twenty.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 2, '{"prompt":"''Eighteen'' means 80. True or False?"}'::jsonb, '[{"text":"False","is_correct":true},{"text":"True","is_correct":false}]'::jsonb, 'Eighteen = 18, not 80. Eighty = 80.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Tens & Hundreds', 20);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 2, '{"prompt":"How do you say ''100'' in English?","image":"💯"}'::jsonb, '[{"text":"One hundred","is_correct":true},{"text":"One thousand","is_correct":false},{"text":"Ten","is_correct":false}]'::jsonb, '100 = One hundred. 1000 = One thousand.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 2, '{"prompt":"Put in order:","sentence":"ten twenty thirty"}'::jsonb, '[]'::jsonb, '10, 20, 30 = ten, twenty, thirty.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 2, '{"prompt":"Listen. What number?","audio_text":"fifty","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=fifty"}'::jsonb, '[{"text":"50","is_correct":true},{"text":"15","is_correct":false},{"text":"500","is_correct":false}]'::jsonb, 'Fifty = 50.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 2, '{"prompt":"''Ninety'' is which number?","image":"🔢"}'::jsonb, '[{"text":"90","is_correct":true},{"text":"19","is_correct":false},{"text":"9","is_correct":false}]'::jsonb, 'Ninety = 90. Nine = 9. Nineteen = 19.');

    -- ═══════════ UNIT 3 [A1]: Colors & Shapes ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 3, 'Colors & Shapes', 'As cores e formas básicas.', '🎨');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Basic Colors', 21);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 3, '{"prompt":"Match colors to their names.","items":[{"icon":"🟥","word":"red"},{"icon":"🟦","word":"blue"},{"icon":"🟩","word":"green"}]}'::jsonb, '[]'::jsonb, 'Red = vermelho, Blue = azul, Green = verde.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 3, '{"prompt":"Listen. What color?","audio_text":"yellow","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=yellow"}'::jsonb, '[{"text":"Amarelo","is_correct":true},{"text":"Vermelho","is_correct":false},{"text":"Laranja","is_correct":false}]'::jsonb, 'Yellow = Amarelo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 3, '{"prompt":"What color is the sky on a clear day?","image":"🌤️"}'::jsonb, '[{"text":"Blue","is_correct":true},{"text":"Red","is_correct":false},{"text":"Green","is_correct":false}]'::jsonb, 'The sky is blue on a clear day.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 3, '{"prompt":"''Orange'' is both a color and a fruit. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes! ''Orange'' is both a color (laranja) and a fruit (laranja).');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'More Colors', 21);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 3, '{"prompt":"How do you say ''roxo'' in English?","image":"🟣"}'::jsonb, '[{"text":"Purple","is_correct":true},{"text":"Pink","is_correct":false},{"text":"Brown","is_correct":false}]'::jsonb, 'Roxo = Purple.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 3, '{"prompt":"Connect the colors.","items":[{"icon":"⬛","word":"black"},{"icon":"⬜","word":"white"},{"icon":"🟤","word":"brown"}]}'::jsonb, '[]'::jsonb, 'Black = preto, White = branco, Brown = marrom.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 3, '{"prompt":"Complete the sentence:","sentence":"The cat is black"}'::jsonb, '[]'::jsonb, '''The cat is black'' = O gato é preto.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 3, '{"prompt":"Listen and choose the color.","audio_text":"pink","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=pink"}'::jsonb, '[{"text":"Rosa","is_correct":true},{"text":"Roxo","is_correct":false},{"text":"Cinza","is_correct":false}]'::jsonb, 'Pink = Rosa.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Shapes', 21);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 3, '{"prompt":"Match shapes to names.","items":[{"icon":"⭕","word":"circle"},{"icon":"⬛","word":"square"},{"icon":"🔺","word":"triangle"}]}'::jsonb, '[]'::jsonb, 'Circle = círculo, Square = quadrado, Triangle = triângulo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 3, '{"prompt":"A ball is shaped like a:","image":"⚽"}'::jsonb, '[{"text":"Circle / Sphere","is_correct":true},{"text":"Square","is_correct":false},{"text":"Triangle","is_correct":false}]'::jsonb, 'A ball is round, like a circle or sphere.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 3, '{"prompt":"Listen. What shape?","audio_text":"rectangle","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=rectangle"}'::jsonb, '[{"text":"Retângulo","is_correct":true},{"text":"Quadrado","is_correct":false},{"text":"Triângulo","is_correct":false}]'::jsonb, 'Rectangle = Retângulo. Square = Quadrado.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 3, '{"prompt":"Complete:","sentence":"This is a red circle"}'::jsonb, '[]'::jsonb, '''This is a red circle'' - artigo + adjetivo + substantivo.');

    -- ═══════════ UNIT 4 [A1]: My Family ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 4, 'My Family', 'Membros da família.', '👨‍👩‍👧‍👦');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Parents & Siblings', 21);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 4, '{"prompt":"Match family members.","items":[{"icon":"👨","word":"father"},{"icon":"👩","word":"mother"},{"icon":"👦","word":"brother"}]}'::jsonb, '[]'::jsonb, 'Father = pai, Mother = mãe, Brother = irmão.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 4, '{"prompt":"''Sister'' means:","image":"👧"}'::jsonb, '[{"text":"Irmã","is_correct":true},{"text":"Prima","is_correct":false},{"text":"Tia","is_correct":false}]'::jsonb, 'Sister = Irmã.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 4, '{"prompt":"Put in order:","sentence":"She is my mother"}'::jsonb, '[]'::jsonb, '''She is my mother'' = Ela é minha mãe.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 4, '{"prompt":"Listen. Who is it?","audio_text":"grandfather","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=grandfather"}'::jsonb, '[{"text":"Avô","is_correct":true},{"text":"Pai","is_correct":false},{"text":"Tio","is_correct":false}]'::jsonb, 'Grandfather = Avô.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Extended Family', 21);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 4, '{"prompt":"''Uncle'' means:","image":"👨"}'::jsonb, '[{"text":"Tio","is_correct":true},{"text":"Avô","is_correct":false},{"text":"Primo","is_correct":false}]'::jsonb, 'Uncle = Tio.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 4, '{"prompt":"Match the relatives.","items":[{"icon":"👵","word":"grandmother"},{"icon":"👶","word":"baby"},{"icon":"🧑","word":"cousin"}]}'::jsonb, '[]'::jsonb, 'Grandmother = Avó, Baby = Bebê, Cousin = Primo/Prima.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 4, '{"prompt":"''Aunt'' means ''tio'' in Portuguese. True or False?"}'::jsonb, '[{"text":"False","is_correct":true},{"text":"True","is_correct":false}]'::jsonb, 'Aunt = Tia (not Tio). Uncle = Tio.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 4, '{"prompt":"Form the sentence:","sentence":"He is my uncle"}'::jsonb, '[]'::jsonb, '''He is my uncle'' = Ele é meu tio.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Describing Family', 21);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 4, '{"prompt":"''I have two brothers'' means:","image":"👦👦"}'::jsonb, '[{"text":"Eu tenho dois irmãos","is_correct":true},{"text":"Eu tenho duas irmãs","is_correct":false},{"text":"Eu tenho dois primos","is_correct":false}]'::jsonb, 'I have = Eu tenho. Two brothers = dois irmãos.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 4, '{"prompt":"Listen and choose:","audio_text":"My family is big","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=my+family+is+big"}'::jsonb, '[{"text":"Minha família é grande","is_correct":true},{"text":"Minha família é pequena","is_correct":false},{"text":"Minha casa é grande","is_correct":false}]'::jsonb, '''My family is big'' = Minha família é grande.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 4, '{"prompt":"Form the sentence:","sentence":"My sister is tall"}'::jsonb, '[]'::jsonb, '''My sister is tall'' = Minha irmã é alta.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 4, '{"prompt":"''Parents'' means ''pais'' (mother and father). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Parents = pais (pai e mãe).');

    -- ═══════════ UNIT 5 [A1]: Animals ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 5, 'Animals', 'Animais domésticos e selvagens.', '🐾');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Pets', 21);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 5, '{"prompt":"Match the animals.","items":[{"icon":"🐶","word":"dog"},{"icon":"🐱","word":"cat"},{"icon":"🐰","word":"rabbit"}]}'::jsonb, '[]'::jsonb, 'Dog = cachorro, Cat = gato, Rabbit = coelho.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 5, '{"prompt":"Listen. What animal?","audio_text":"hamster","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=hamster"}'::jsonb, '[{"text":"Hamster","is_correct":true},{"text":"Gato","is_correct":false},{"text":"Pássaro","is_correct":false}]'::jsonb, 'Hamster is the same in both languages!');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 5, '{"prompt":"''Fish'' means:","image":"🐟"}'::jsonb, '[{"text":"Peixe","is_correct":true},{"text":"Pássaro","is_correct":false},{"text":"Cobra","is_correct":false}]'::jsonb, 'Fish = Peixe.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 5, '{"prompt":"Form the sentence:","sentence":"I have a dog"}'::jsonb, '[]'::jsonb, '''I have a dog'' = Eu tenho um cachorro.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Farm Animals', 21);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 5, '{"prompt":"Match the farm animals.","items":[{"icon":"🐄","word":"cow"},{"icon":"🐔","word":"chicken"},{"icon":"🐷","word":"pig"}]}'::jsonb, '[]'::jsonb, 'Cow = vaca, Chicken = galinha, Pig = porco.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 5, '{"prompt":"A ''horse'' is a:","image":"🐴"}'::jsonb, '[{"text":"Cavalo","is_correct":true},{"text":"Burro","is_correct":false},{"text":"Cabra","is_correct":false}]'::jsonb, 'Horse = Cavalo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 5, '{"prompt":"Listen. What animal is it?","audio_text":"sheep","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=sheep"}'::jsonb, '[{"text":"Ovelha","is_correct":true},{"text":"Vaca","is_correct":false},{"text":"Cavalo","is_correct":false}]'::jsonb, 'Sheep = Ovelha.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 5, '{"prompt":"''Duck'' means ''pato''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Duck = Pato. Correct!');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Wild Animals', 21);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 5, '{"prompt":"Match wild animals.","items":[{"icon":"🦁","word":"lion"},{"icon":"🐘","word":"elephant"},{"icon":"🐍","word":"snake"}]}'::jsonb, '[]'::jsonb, 'Lion = leão, Elephant = elefante, Snake = cobra.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 5, '{"prompt":"''Monkey'' means:","image":"🐒"}'::jsonb, '[{"text":"Macaco","is_correct":true},{"text":"Gorila","is_correct":false},{"text":"Urso","is_correct":false}]'::jsonb, 'Monkey = Macaco.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 5, '{"prompt":"Form the sentence:","sentence":"The lion is strong"}'::jsonb, '[]'::jsonb, '''The lion is strong'' = O leão é forte.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 5, '{"prompt":"Listen and choose:","audio_text":"tiger","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=tiger"}'::jsonb, '[{"text":"Tigre","is_correct":true},{"text":"Leão","is_correct":false},{"text":"Leopardo","is_correct":false}]'::jsonb, 'Tiger = Tigre.');

    -- ═══════════ UNIT 6 [A1]: Food & Drinks ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 6, 'Food & Drinks', 'Comidas e bebidas do dia a dia.', '🍎');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Fruits', 22);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 6, '{"prompt":"Match the fruits.","items":[{"icon":"🍎","word":"apple"},{"icon":"🍌","word":"banana"},{"icon":"🍊","word":"orange"}]}'::jsonb, '[]'::jsonb, 'Apple = maçã, Banana = banana, Orange = laranja.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 6, '{"prompt":"Listen and choose:","audio_text":"strawberry","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=strawberry"}'::jsonb, '[{"text":"Morango","is_correct":true},{"text":"Framboesa","is_correct":false},{"text":"Amora","is_correct":false}]'::jsonb, 'Strawberry = Morango.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 6, '{"prompt":"''Grape'' is:","image":"🍇"}'::jsonb, '[{"text":"Uva","is_correct":true},{"text":"Maçã","is_correct":false},{"text":"Pêra","is_correct":false}]'::jsonb, 'Grape = Uva.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 6, '{"prompt":"Form:","sentence":"I like apples"}'::jsonb, '[]'::jsonb, '''I like apples'' = Eu gosto de maçãs.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Meals', 22);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 6, '{"prompt":"''Breakfast'' means:","image":"🍳"}'::jsonb, '[{"text":"Café da manhã","is_correct":true},{"text":"Almoço","is_correct":false},{"text":"Jantar","is_correct":false}]'::jsonb, 'Breakfast = café da manhã, Lunch = almoço, Dinner = jantar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 6, '{"prompt":"Match the meals.","items":[{"icon":"🍳","word":"breakfast"},{"icon":"🥗","word":"lunch"},{"icon":"🍽️","word":"dinner"}]}'::jsonb, '[]'::jsonb, 'Breakfast, Lunch, Dinner = Café da manhã, Almoço, Jantar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 6, '{"prompt":"Listen:","audio_text":"I am hungry","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=i+am+hungry"}'::jsonb, '[{"text":"Eu estou com fome","is_correct":true},{"text":"Eu estou com sede","is_correct":false},{"text":"Eu estou cansado","is_correct":false}]'::jsonb, 'I am hungry = Eu estou com fome.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 6, '{"prompt":"Form:","sentence":"I eat rice and beans"}'::jsonb, '[]'::jsonb, '''I eat rice and beans'' = Eu como arroz e feijão.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Drinks', 22);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 6, '{"prompt":"Match the drinks.","items":[{"icon":"💧","word":"water"},{"icon":"🥛","word":"milk"},{"icon":"🧃","word":"juice"}]}'::jsonb, '[]'::jsonb, 'Water = água, Milk = leite, Juice = suco.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 6, '{"prompt":"''Coffee'' is:","image":"☕"}'::jsonb, '[{"text":"Café","is_correct":true},{"text":"Chá","is_correct":false},{"text":"Suco","is_correct":false}]'::jsonb, 'Coffee = Café. Tea = Chá.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 6, '{"prompt":"''Tea'' means ''chá''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Tea = Chá. Correct!');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 6, '{"prompt":"Form:","sentence":"Can I have some water"}'::jsonb, '[]'::jsonb, '''Can I have some water?'' = Posso tomar um pouco de água?');

    -- ═══════════ UNIT 7 [A1]: My Body ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 7, 'My Body', 'Partes do corpo humano.', '🧍');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Head & Face', 22);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 7, '{"prompt":"Match body parts.","items":[{"icon":"👀","word":"eyes"},{"icon":"👃","word":"nose"},{"icon":"👄","word":"mouth"}]}'::jsonb, '[]'::jsonb, 'Eyes = olhos, Nose = nariz, Mouth = boca.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 7, '{"prompt":"''Ears'' means:","image":"👂"}'::jsonb, '[{"text":"Orelhas","is_correct":true},{"text":"Olhos","is_correct":false},{"text":"Boca","is_correct":false}]'::jsonb, 'Ears = Orelhas/Ouvidos.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 7, '{"prompt":"Listen:","audio_text":"head","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=head"}'::jsonb, '[{"text":"Cabeça","is_correct":true},{"text":"Mão","is_correct":false},{"text":"Pé","is_correct":false}]'::jsonb, 'Head = Cabeça.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 7, '{"prompt":"Form:","sentence":"I have two eyes"}'::jsonb, '[]'::jsonb, '''I have two eyes'' = Eu tenho dois olhos.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Arms & Legs', 22);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 7, '{"prompt":"Match.","items":[{"icon":"💪","word":"arm"},{"icon":"🦵","word":"leg"},{"icon":"✋","word":"hand"}]}'::jsonb, '[]'::jsonb, 'Arm = braço, Leg = perna, Hand = mão.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 7, '{"prompt":"''Feet'' means:","image":"🦶"}'::jsonb, '[{"text":"Pés","is_correct":true},{"text":"Mãos","is_correct":false},{"text":"Joelhos","is_correct":false}]'::jsonb, 'Feet = Pés (plural of foot).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 7, '{"prompt":"''Finger'' means ''dedo''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Finger = dedo (da mão). Toe = dedo do pé.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 7, '{"prompt":"Listen:","audio_text":"shoulder","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=shoulder"}'::jsonb, '[{"text":"Ombro","is_correct":true},{"text":"Cotovelo","is_correct":false},{"text":"Joelho","is_correct":false}]'::jsonb, 'Shoulder = Ombro.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Feeling Sick', 22);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 7, '{"prompt":"''I have a headache'' means:","image":"🤕"}'::jsonb, '[{"text":"Estou com dor de cabeça","is_correct":true},{"text":"Estou com fome","is_correct":false},{"text":"Estou cansado","is_correct":false}]'::jsonb, 'Headache = dor de cabeça.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 7, '{"prompt":"Form:","sentence":"My stomach hurts"}'::jsonb, '[]'::jsonb, '''My stomach hurts'' = Meu estômago dói.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 7, '{"prompt":"Listen:","audio_text":"I feel sick","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=i+feel+sick"}'::jsonb, '[{"text":"Eu me sinto doente","is_correct":true},{"text":"Eu me sinto bem","is_correct":false},{"text":"Eu estou com frio","is_correct":false}]'::jsonb, 'I feel sick = Eu me sinto mal/doente.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 7, '{"prompt":"''Doctor'' means:","image":"👨‍⚕️"}'::jsonb, '[{"text":"Médico","is_correct":true},{"text":"Professor","is_correct":false},{"text":"Bombeiro","is_correct":false}]'::jsonb, 'Doctor = Médico.');

    -- ═══════════ UNIT 8 [A1]: Clothes ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 8, 'Clothes', 'Roupas e acessórios.', '👕');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Everyday Clothes', 22);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 8, '{"prompt":"Match the clothes.","items":[{"icon":"👕","word":"shirt"},{"icon":"👖","word":"pants"},{"icon":"👟","word":"shoes"}]}'::jsonb, '[]'::jsonb, 'Shirt = camisa, Pants = calça, Shoes = sapatos.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 8, '{"prompt":"''Dress'' means:","image":"👗"}'::jsonb, '[{"text":"Vestido","is_correct":true},{"text":"Saia","is_correct":false},{"text":"Blusa","is_correct":false}]'::jsonb, 'Dress = Vestido.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 8, '{"prompt":"Form:","sentence":"She wears a blue dress"}'::jsonb, '[]'::jsonb, '''She wears a blue dress'' = Ela veste um vestido azul.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 8, '{"prompt":"Listen:","audio_text":"jacket","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=jacket"}'::jsonb, '[{"text":"Jaqueta","is_correct":true},{"text":"Calça","is_correct":false},{"text":"Chapéu","is_correct":false}]'::jsonb, 'Jacket = Jaqueta.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Accessories', 22);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 8, '{"prompt":"Match accessories.","items":[{"icon":"🧢","word":"hat"},{"icon":"🧣","word":"scarf"},{"icon":"🧤","word":"gloves"}]}'::jsonb, '[]'::jsonb, 'Hat = chapéu, Scarf = cachecol, Gloves = luvas.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 8, '{"prompt":"''Sunglasses'' means:","image":"🕶️"}'::jsonb, '[{"text":"Óculos de sol","is_correct":true},{"text":"Óculos de grau","is_correct":false},{"text":"Chapéu","is_correct":false}]'::jsonb, 'Sunglasses = Óculos de sol.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 8, '{"prompt":"Listen:","audio_text":"boots","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=boots"}'::jsonb, '[{"text":"Botas","is_correct":true},{"text":"Sandálias","is_correct":false},{"text":"Sapatos","is_correct":false}]'::jsonb, 'Boots = Botas.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 8, '{"prompt":"''Belt'' means ''cinto''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Belt = Cinto.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Getting Dressed', 22);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 8, '{"prompt":"''Put on your shoes'' means:","image":"👟"}'::jsonb, '[{"text":"Coloque seus sapatos","is_correct":true},{"text":"Tire seus sapatos","is_correct":false},{"text":"Compre sapatos","is_correct":false}]'::jsonb, 'Put on = colocar/vestir. Take off = tirar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 8, '{"prompt":"Form:","sentence":"I am wearing a red shirt"}'::jsonb, '[]'::jsonb, '''I am wearing a red shirt'' = Estou vestindo uma camisa vermelha.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 8, '{"prompt":"Listen:","audio_text":"Take off your coat","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=take+off+your+coat"}'::jsonb, '[{"text":"Tire seu casaco","is_correct":true},{"text":"Vista seu casaco","is_correct":false},{"text":"Compre um casaco","is_correct":false}]'::jsonb, 'Take off = tirar. Put on = vestir.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 8, '{"prompt":"''Wear'' and ''Wear'' can mean both ''vestir'' and ''usar''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Sim! ''Wear'' = vestir/usar (roupas, acessórios).');

    -- ═══════════ UNIT 9 [A1]: Home Sweet Home ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 9, 'Home Sweet Home', 'Cômodos e móveis da casa.', '🏠');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Rooms', 23);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 9, '{"prompt":"Match the rooms.","items":[{"icon":"🛏️","word":"bedroom"},{"icon":"🍳","word":"kitchen"},{"icon":"🛁","word":"bathroom"}]}'::jsonb, '[]'::jsonb, 'Bedroom = quarto, Kitchen = cozinha, Bathroom = banheiro.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 9, '{"prompt":"''Living room'' means:","image":"🛋️"}'::jsonb, '[{"text":"Sala de estar","is_correct":true},{"text":"Cozinha","is_correct":false},{"text":"Garagem","is_correct":false}]'::jsonb, 'Living room = Sala de estar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 9, '{"prompt":"Form:","sentence":"The kitchen is big"}'::jsonb, '[]'::jsonb, '''The kitchen is big'' = A cozinha é grande.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 9, '{"prompt":"Listen:","audio_text":"garage","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=garage"}'::jsonb, '[{"text":"Garagem","is_correct":true},{"text":"Jardim","is_correct":false},{"text":"Varanda","is_correct":false}]'::jsonb, 'Garage = Garagem.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Furniture', 23);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 9, '{"prompt":"Match the furniture.","items":[{"icon":"🪑","word":"chair"},{"icon":"🛋️","word":"sofa"},{"icon":"🛏️","word":"bed"}]}'::jsonb, '[]'::jsonb, 'Chair = cadeira, Sofa = sofá, Bed = cama.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 9, '{"prompt":"''Table'' means:","image":"🪵"}'::jsonb, '[{"text":"Mesa","is_correct":true},{"text":"Cadeira","is_correct":false},{"text":"Estante","is_correct":false}]'::jsonb, 'Table = Mesa.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 9, '{"prompt":"Listen:","audio_text":"bookshelf","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=bookshelf"}'::jsonb, '[{"text":"Estante de livros","is_correct":true},{"text":"Armário","is_correct":false},{"text":"Guarda-roupa","is_correct":false}]'::jsonb, 'Bookshelf = Estante de livros.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 9, '{"prompt":"Form:","sentence":"There is a lamp on the table"}'::jsonb, '[]'::jsonb, '''There is a lamp on the table'' = Há uma lâmpada na mesa.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Household Items', 23);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 9, '{"prompt":"Match items.","items":[{"icon":"🔑","word":"key"},{"icon":"🪟","word":"window"},{"icon":"🚪","word":"door"}]}'::jsonb, '[]'::jsonb, 'Key = chave, Window = janela, Door = porta.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 9, '{"prompt":"''Mirror'' means:","image":"🪞"}'::jsonb, '[{"text":"Espelho","is_correct":true},{"text":"Quadro","is_correct":false},{"text":"Relógio","is_correct":false}]'::jsonb, 'Mirror = Espelho.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 9, '{"prompt":"''Clock'' means ''relógio''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Clock = Relógio (de parede). Watch = Relógio (de pulso).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 9, '{"prompt":"Form:","sentence":"Close the door please"}'::jsonb, '[]'::jsonb, '''Close the door please'' = Feche a porta por favor.');

    -- ═══════════ UNIT 10 [A1]: Daily Routine ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 10, 'Daily Routine', 'Atividades do dia a dia.', '⏰');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Morning Routine', 23);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 10, '{"prompt":"Form:","sentence":"I wake up at seven"}'::jsonb, '[]'::jsonb, '''I wake up at seven'' = Eu acordo às sete.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 10, '{"prompt":"''Brush my teeth'' means:","image":"🪥"}'::jsonb, '[{"text":"Escovar os dentes","is_correct":true},{"text":"Lavar o rosto","is_correct":false},{"text":"Pentear o cabelo","is_correct":false}]'::jsonb, 'Brush my teeth = Escovar os dentes.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 10, '{"prompt":"Listen:","audio_text":"I take a shower","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=i+take+a+shower"}'::jsonb, '[{"text":"Eu tomo banho","is_correct":true},{"text":"Eu janto","is_correct":false},{"text":"Eu durmo","is_correct":false}]'::jsonb, 'I take a shower = Eu tomo banho.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 10, '{"prompt":"Match routines.","items":[{"icon":"🛏️","word":"wake up"},{"icon":"🍳","word":"eat breakfast"},{"icon":"🚗","word":"go to school"}]}'::jsonb, '[]'::jsonb, 'Wake up = acordar, Eat breakfast = tomar café, Go to school = ir para escola.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Afternoon Activities', 23);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 10, '{"prompt":"''Do homework'' means:","image":"📝"}'::jsonb, '[{"text":"Fazer lição de casa","is_correct":true},{"text":"Ir à escola","is_correct":false},{"text":"Brincar no parque","is_correct":false}]'::jsonb, 'Do homework = Fazer lição de casa.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 10, '{"prompt":"Form:","sentence":"I play soccer after school"}'::jsonb, '[]'::jsonb, '''I play soccer after school'' = Eu jogo futebol depois da escola.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 10, '{"prompt":"Listen:","audio_text":"I watch television","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=i+watch+television"}'::jsonb, '[{"text":"Eu assisto televisão","is_correct":true},{"text":"Eu leio um livro","is_correct":false},{"text":"Eu cozinho","is_correct":false}]'::jsonb, 'I watch television = Eu assisto televisão.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 10, '{"prompt":"''Read a book'' means ''ler um livro''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Read a book = Ler um livro.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Night Routine', 23);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 10, '{"prompt":"Match.","items":[{"icon":"🌙","word":"go to sleep"},{"icon":"🪥","word":"brush teeth"},{"icon":"📖","word":"read a story"}]}'::jsonb, '[]'::jsonb, 'Go to sleep = dormir, Brush teeth = escovar dentes, Read a story = ler uma história.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 10, '{"prompt":"Form:","sentence":"I go to bed at nine"}'::jsonb, '[]'::jsonb, '''I go to bed at nine'' = Eu vou para cama às nove.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 10, '{"prompt":"''Dream'' means:","image":"💭"}'::jsonb, '[{"text":"Sonho/Sonhar","is_correct":true},{"text":"Dormir","is_correct":false},{"text":"Acordar","is_correct":false}]'::jsonb, 'Dream = Sonho/Sonhar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 10, '{"prompt":"Listen:","audio_text":"good night","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=good+night"}'::jsonb, '[{"text":"Boa noite","is_correct":true},{"text":"Bom dia","is_correct":false},{"text":"Boa tarde","is_correct":false}]'::jsonb, 'Good night = Boa noite.');

    -- ═══════════ UNIT 11 [A1]: The Weather ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 11, 'The Weather', 'Clima e estações.', '🌤️');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Weather Types', 23);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 11, '{"prompt":"Match the weather.","items":[{"icon":"☀️","word":"sunny"},{"icon":"🌧️","word":"rainy"},{"icon":"❄️","word":"snowy"}]}'::jsonb, '[]'::jsonb, 'Sunny = ensolarado, Rainy = chuvoso, Snowy = nevando.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 11, '{"prompt":"''It is cloudy today'' means:","image":"☁️"}'::jsonb, '[{"text":"Está nublado hoje","is_correct":true},{"text":"Está quente hoje","is_correct":false},{"text":"Está ventando hoje","is_correct":false}]'::jsonb, 'Cloudy = Nublado.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 11, '{"prompt":"Listen:","audio_text":"windy","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=windy"}'::jsonb, '[{"text":"Ventoso","is_correct":true},{"text":"Chuvoso","is_correct":false},{"text":"Nublado","is_correct":false}]'::jsonb, 'Windy = Ventoso.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 11, '{"prompt":"Form:","sentence":"It is hot today"}'::jsonb, '[]'::jsonb, '''It is hot today'' = Está quente hoje.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Seasons', 23);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 11, '{"prompt":"Match the seasons.","items":[{"icon":"🌸","word":"spring"},{"icon":"☀️","word":"summer"},{"icon":"🍂","word":"autumn"}]}'::jsonb, '[]'::jsonb, 'Spring = primavera, Summer = verão, Autumn = outono.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 11, '{"prompt":"''Winter'' means:","image":"❄️"}'::jsonb, '[{"text":"Inverno","is_correct":true},{"text":"Outono","is_correct":false},{"text":"Primavera","is_correct":false}]'::jsonb, 'Winter = Inverno.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 11, '{"prompt":"''Fall'' is another word for ''autumn''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes! Americans say ''fall'', British say ''autumn''. Both = outono.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 11, '{"prompt":"Form:","sentence":"I love summer"}'::jsonb, '[]'::jsonb, '''I love summer'' = Eu amo o verão.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Temperature', 23);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 11, '{"prompt":"''It is freezing'' means:","image":"🥶"}'::jsonb, '[{"text":"Está congelando/muito frio","is_correct":true},{"text":"Está quente","is_correct":false},{"text":"Está agradável","is_correct":false}]'::jsonb, 'Freezing = Congelando/Muito frio.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 11, '{"prompt":"Listen:","audio_text":"warm","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=warm"}'::jsonb, '[{"text":"Morno/Agradável","is_correct":true},{"text":"Quente","is_correct":false},{"text":"Frio","is_correct":false}]'::jsonb, 'Warm = Morno/Agradável. Hot = Quente.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 11, '{"prompt":"Form:","sentence":"It is very cold outside"}'::jsonb, '[]'::jsonb, '''It is very cold outside'' = Está muito frio lá fora.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 11, '{"prompt":"Match temperatures.","items":[{"icon":"🥶","word":"cold"},{"icon":"😌","word":"warm"},{"icon":"🥵","word":"hot"}]}'::jsonb, '[]'::jsonb, 'Cold = frio, Warm = morno, Hot = quente.');

    -- ═══════════ UNIT 12 [A1]: At School ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 12, 'At School', 'Objetos e rotina escolar.', '🏫');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'School Supplies', 24);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 12, '{"prompt":"Match school items.","items":[{"icon":"✏️","word":"pencil"},{"icon":"📏","word":"ruler"},{"icon":"📕","word":"book"}]}'::jsonb, '[]'::jsonb, 'Pencil = lápis, Ruler = régua, Book = livro.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 12, '{"prompt":"''Eraser'' means:","image":"🧹"}'::jsonb, '[{"text":"Borracha","is_correct":true},{"text":"Apontador","is_correct":false},{"text":"Cola","is_correct":false}]'::jsonb, 'Eraser = Borracha. Sharpener = apontador.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 12, '{"prompt":"Listen:","audio_text":"notebook","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=notebook"}'::jsonb, '[{"text":"Caderno","is_correct":true},{"text":"Livro","is_correct":false},{"text":"Mochila","is_correct":false}]'::jsonb, 'Notebook = Caderno.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 12, '{"prompt":"Form:","sentence":"Open your books"}'::jsonb, '[]'::jsonb, '''Open your books'' = Abram seus livros.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Subjects', 24);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 12, '{"prompt":"Match subjects.","items":[{"icon":"🔢","word":"math"},{"icon":"🔬","word":"science"},{"icon":"🎨","word":"art"}]}'::jsonb, '[]'::jsonb, 'Math = matemática, Science = ciência, Art = arte.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 12, '{"prompt":"''History'' means:","image":"📜"}'::jsonb, '[{"text":"História","is_correct":true},{"text":"Geografia","is_correct":false},{"text":"Português","is_correct":false}]'::jsonb, 'History = História.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 12, '{"prompt":"Listen:","audio_text":"physical education","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=physical+education"}'::jsonb, '[{"text":"Educação Física","is_correct":true},{"text":"Ciências","is_correct":false},{"text":"Inglês","is_correct":false}]'::jsonb, 'Physical Education (PE) = Educação Física.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 12, '{"prompt":"Form:","sentence":"My favorite subject is music"}'::jsonb, '[]'::jsonb, '''My favorite subject is music'' = Minha matéria favorita é música.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Classroom Actions', 24);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 12, '{"prompt":"''Raise your hand'' means:","image":"✋"}'::jsonb, '[{"text":"Levante a mão","is_correct":true},{"text":"Abaixe a mão","is_correct":false},{"text":"Bata palmas","is_correct":false}]'::jsonb, 'Raise = Levantar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 12, '{"prompt":"Form:","sentence":"Please sit down"}'::jsonb, '[]'::jsonb, '''Please sit down'' = Por favor, sente-se.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 12, '{"prompt":"Listen:","audio_text":"Close your notebooks","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=close+your+notebooks"}'::jsonb, '[{"text":"Fechem seus cadernos","is_correct":true},{"text":"Abram seus cadernos","is_correct":false},{"text":"Guardem seus cadernos","is_correct":false}]'::jsonb, 'Close = Fechar. Open = Abrir.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 12, '{"prompt":"''Listen'' means ''ouvir/escutar''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Listen = Ouvir/Escutar.');

    -- ═══════════ UNIT 13 [A1]: Transportation ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 13, 'Transportation', 'Meios de transporte.', '🚗');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Land Transport', 24);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 13, '{"prompt":"Match vehicles.","items":[{"icon":"🚗","word":"car"},{"icon":"🚌","word":"bus"},{"icon":"🚲","word":"bicycle"}]}'::jsonb, '[]'::jsonb, 'Car = carro, Bus = ônibus, Bicycle = bicicleta.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 13, '{"prompt":"''Train'' means:","image":"🚂"}'::jsonb, '[{"text":"Trem","is_correct":true},{"text":"Avião","is_correct":false},{"text":"Navio","is_correct":false}]'::jsonb, 'Train = Trem.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 13, '{"prompt":"Form:","sentence":"I go to school by bus"}'::jsonb, '[]'::jsonb, '''I go to school by bus'' = Eu vou à escola de ônibus.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 13, '{"prompt":"Listen:","audio_text":"motorcycle","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=motorcycle"}'::jsonb, '[{"text":"Motocicleta","is_correct":true},{"text":"Bicicleta","is_correct":false},{"text":"Caminhão","is_correct":false}]'::jsonb, 'Motorcycle = Motocicleta.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Air & Water', 24);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 13, '{"prompt":"Match.","items":[{"icon":"✈️","word":"airplane"},{"icon":"🚢","word":"ship"},{"icon":"🚁","word":"helicopter"}]}'::jsonb, '[]'::jsonb, 'Airplane = avião, Ship = navio, Helicopter = helicóptero.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 13, '{"prompt":"''Boat'' means:","image":"⛵"}'::jsonb, '[{"text":"Barco","is_correct":true},{"text":"Navio","is_correct":false},{"text":"Iate","is_correct":false}]'::jsonb, 'Boat = Barco.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 13, '{"prompt":"''Subway'' means ''metrô''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Subway = Metrô (USA). Underground (UK).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 13, '{"prompt":"Form:","sentence":"We travel by airplane"}'::jsonb, '[]'::jsonb, '''We travel by airplane'' = Nós viajamos de avião.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Giving Directions', 24);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 13, '{"prompt":"''Turn left'' means:","image":"⬅️"}'::jsonb, '[{"text":"Vire à esquerda","is_correct":true},{"text":"Vire à direita","is_correct":false},{"text":"Siga em frente","is_correct":false}]'::jsonb, 'Turn left = Vire à esquerda.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 13, '{"prompt":"Match directions.","items":[{"icon":"⬆️","word":"go straight"},{"icon":"➡️","word":"turn right"},{"icon":"🛑","word":"stop"}]}'::jsonb, '[]'::jsonb, 'Go straight, Turn right, Stop.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 13, '{"prompt":"Listen:","audio_text":"Go straight ahead","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=go+straight+ahead"}'::jsonb, '[{"text":"Siga em frente","is_correct":true},{"text":"Vire à direita","is_correct":false},{"text":"Volte","is_correct":false}]'::jsonb, 'Go straight ahead = Siga em frente.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 13, '{"prompt":"Form:","sentence":"Turn right at the corner"}'::jsonb, '[]'::jsonb, '''Turn right at the corner'' = Vire à direita na esquina.');

    -- ═══════════ UNIT 14 [A1]: Time & Days ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 14, 'Time & Days', 'Horas, dias da semana e meses.', '📅');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Days of the Week', 24);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 14, '{"prompt":"Put in order:","sentence":"Monday Tuesday Wednesday"}'::jsonb, '[]'::jsonb, 'Monday = segunda, Tuesday = terça, Wednesday = quarta.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 14, '{"prompt":"''Friday'' means:","image":"📅"}'::jsonb, '[{"text":"Sexta-feira","is_correct":true},{"text":"Quinta-feira","is_correct":false},{"text":"Sábado","is_correct":false}]'::jsonb, 'Friday = Sexta-feira.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 14, '{"prompt":"Match days.","items":[{"icon":"1️⃣","word":"Monday"},{"icon":"6️⃣","word":"Saturday"},{"icon":"7️⃣","word":"Sunday"}]}'::jsonb, '[]'::jsonb, 'Monday = segunda, Saturday = sábado, Sunday = domingo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 14, '{"prompt":"Listen:","audio_text":"Thursday","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=thursday"}'::jsonb, '[{"text":"Quinta-feira","is_correct":true},{"text":"Terça-feira","is_correct":false},{"text":"Quarta-feira","is_correct":false}]'::jsonb, 'Thursday = Quinta-feira.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Months', 24);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 14, '{"prompt":"The first month of the year:","image":"📅"}'::jsonb, '[{"text":"January","is_correct":true},{"text":"February","is_correct":false},{"text":"March","is_correct":false}]'::jsonb, 'January = Janeiro, the first month.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 14, '{"prompt":"Match months.","items":[{"icon":"🎄","word":"December"},{"icon":"🎃","word":"October"},{"icon":"💘","word":"February"}]}'::jsonb, '[]'::jsonb, 'December = Natal, October = Halloween, February = Dia dos Namorados (US).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 14, '{"prompt":"Put in order:","sentence":"March April May"}'::jsonb, '[]'::jsonb, 'March = março, April = abril, May = maio.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 14, '{"prompt":"Listen:","audio_text":"September","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=september"}'::jsonb, '[{"text":"Setembro","is_correct":true},{"text":"Novembro","is_correct":false},{"text":"Outubro","is_correct":false}]'::jsonb, 'September = Setembro.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Telling Time', 24);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 14, '{"prompt":"''It is half past eight'' means:","image":"🕗"}'::jsonb, '[{"text":"São oito e meia","is_correct":true},{"text":"São oito horas","is_correct":false},{"text":"São nove e meia","is_correct":false}]'::jsonb, 'Half past eight = 8:30.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 14, '{"prompt":"Listen:","audio_text":"quarter past three","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=quarter+past+three"}'::jsonb, '[{"text":"Três e quinze","is_correct":true},{"text":"Três e meia","is_correct":false},{"text":"Duas e quinze","is_correct":false}]'::jsonb, 'Quarter past three = 3:15.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 14, '{"prompt":"Form:","sentence":"What time is it"}'::jsonb, '[]'::jsonb, '''What time is it?'' = Que horas são?');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 14, '{"prompt":"''Noon'' means ''midnight''. True or False?"}'::jsonb, '[{"text":"False","is_correct":true},{"text":"True","is_correct":false}]'::jsonb, 'Noon = meio-dia. Midnight = meia-noite.');

    -- ═══════════ UNIT 15 [A1]: Feelings & Emotions ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 15, 'Feelings & Emotions', 'Como expressar sentimentos.', '😊');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Basic Feelings', 25);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 15, '{"prompt":"Match feelings.","items":[{"icon":"😊","word":"happy"},{"icon":"😢","word":"sad"},{"icon":"😠","word":"angry"}]}'::jsonb, '[]'::jsonb, 'Happy = feliz, Sad = triste, Angry = com raiva.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 15, '{"prompt":"''Scared'' means:","image":"😨"}'::jsonb, '[{"text":"Com medo","is_correct":true},{"text":"Cansado","is_correct":false},{"text":"Surpreso","is_correct":false}]'::jsonb, 'Scared = Com medo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 15, '{"prompt":"Listen:","audio_text":"I am excited","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=i+am+excited"}'::jsonb, '[{"text":"Eu estou empolgado","is_correct":true},{"text":"Eu estou cansado","is_correct":false},{"text":"Eu estou entediado","is_correct":false}]'::jsonb, 'Excited = Empolgado.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 15, '{"prompt":"Form:","sentence":"I am very happy today"}'::jsonb, '[]'::jsonb, '''I am very happy today'' = Estou muito feliz hoje.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'How Are You?', 25);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 15, '{"prompt":"''I am fine'' means:","image":"👍"}'::jsonb, '[{"text":"Eu estou bem","is_correct":true},{"text":"Eu estou mal","is_correct":false},{"text":"Eu estou doente","is_correct":false}]'::jsonb, 'I am fine = Eu estou bem.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 15, '{"prompt":"Form:","sentence":"How do you feel"}'::jsonb, '[]'::jsonb, '''How do you feel?'' = Como você se sente?');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 15, '{"prompt":"Listen:","audio_text":"I am tired","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=i+am+tired"}'::jsonb, '[{"text":"Eu estou cansado","is_correct":true},{"text":"Eu estou com sono","is_correct":false},{"text":"Eu estou com frio","is_correct":false}]'::jsonb, 'Tired = Cansado.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A1', 15, '{"prompt":"''Bored'' means ''entediado''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Bored = Entediado.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Expressing Emotions', 25);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A1', 15, '{"prompt":"Match.","items":[{"icon":"😮","word":"surprised"},{"icon":"😴","word":"sleepy"},{"icon":"🥰","word":"in love"}]}'::jsonb, '[]'::jsonb, 'Surprised = surpreso, Sleepy = com sono, In love = apaixonado.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A1', 15, '{"prompt":"''Nervous'' means:","image":"😬"}'::jsonb, '[{"text":"Nervoso","is_correct":true},{"text":"Alegre","is_correct":false},{"text":"Curioso","is_correct":false}]'::jsonb, 'Nervous = Nervoso.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A1', 15, '{"prompt":"Form:","sentence":"She looks confused"}'::jsonb, '[]'::jsonb, '''She looks confused'' = Ela parece confusa.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A1', 15, '{"prompt":"Listen:","audio_text":"I am proud of you","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=i+am+proud+of+you"}'::jsonb, '[{"text":"Eu tenho orgulho de você","is_correct":true},{"text":"Eu gosto de você","is_correct":false},{"text":"Eu preciso de você","is_correct":false}]'::jsonb, 'I am proud of you = Tenho orgulho de você.');

    -- ═══════════ UNIT 16 [A2]: Shopping & Money ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 16, 'Shopping & Money', 'Compras e dinheiro.', '🛒');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'At the Store', 25);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 16, '{"prompt":"''How much does it cost?'' means:","image":"💰"}'::jsonb, '[{"text":"Quanto custa?","is_correct":true},{"text":"O que é isso?","is_correct":false},{"text":"Onde fica?","is_correct":false}]'::jsonb, 'How much = Quanto.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 16, '{"prompt":"Form:","sentence":"I would like to buy this shirt"}'::jsonb, '[]'::jsonb, '''I would like to buy this shirt'' = Eu gostaria de comprar esta camisa.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 16, '{"prompt":"Listen:","audio_text":"That is too expensive","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=that+is+too+expensive"}'::jsonb, '[{"text":"Isso é caro demais","is_correct":true},{"text":"Isso é barato","is_correct":false},{"text":"Isso é bonito","is_correct":false}]'::jsonb, 'Too expensive = caro demais.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 16, '{"prompt":"''Cheap'' is the opposite of ''expensive''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Cheap = barato. Expensive = caro.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Paying', 25);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 16, '{"prompt":"''Cash or card?'' means:","image":"💳"}'::jsonb, '[{"text":"Dinheiro ou cartão?","is_correct":true},{"text":"Débito ou crédito?","is_correct":false},{"text":"Pix ou cheque?","is_correct":false}]'::jsonb, 'Cash = dinheiro vivo, Card = cartão.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 16, '{"prompt":"Form:","sentence":"Can I pay with credit card"}'::jsonb, '[]'::jsonb, '''Can I pay with credit card?'' = Posso pagar com cartão de crédito?');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 16, '{"prompt":"Match.","items":[{"icon":"💵","word":"cash"},{"icon":"💳","word":"credit card"},{"icon":"🧾","word":"receipt"}]}'::jsonb, '[]'::jsonb, 'Cash, Credit Card, Receipt = Dinheiro, Cartão, Recibo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 16, '{"prompt":"Listen:","audio_text":"Keep the change","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=keep+the+change"}'::jsonb, '[{"text":"Fique com o troco","is_correct":true},{"text":"Me dê o troco","is_correct":false},{"text":"Não tenho troco","is_correct":false}]'::jsonb, 'Keep the change = Fique com o troco.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'At the Supermarket', 25);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 16, '{"prompt":"Form:","sentence":"Where can I find the milk"}'::jsonb, '[]'::jsonb, '''Where can I find the milk?'' = Onde encontro o leite?');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 16, '{"prompt":"''Aisle'' means:","image":"🛒"}'::jsonb, '[{"text":"Corredor (do supermercado)","is_correct":true},{"text":"Prateleira","is_correct":false},{"text":"Caixa","is_correct":false}]'::jsonb, 'Aisle = Corredor.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 16, '{"prompt":"Match.","items":[{"icon":"🛒","word":"shopping cart"},{"icon":"📋","word":"shopping list"},{"icon":"💰","word":"discount"}]}'::jsonb, '[]'::jsonb, 'Shopping cart = carrinho. Shopping list = lista de compras. Discount = desconto.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 16, '{"prompt":"''On sale'' means the item has a discount. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'On sale = em promoção / em liquidação.');

    -- ═══════════ UNIT 17 [A2]: Sports & Hobbies ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 17, 'Sports & Hobbies', 'Esportes e passatempos.', '⚽');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Popular Sports', 25);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 17, '{"prompt":"Match the sports.","items":[{"icon":"⚽","word":"soccer"},{"icon":"🏀","word":"basketball"},{"icon":"🎾","word":"tennis"}]}'::jsonb, '[]'::jsonb, 'Soccer = futebol, Basketball = basquete, Tennis = tênis.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 17, '{"prompt":"''Swimming'' means:","image":"🏊"}'::jsonb, '[{"text":"Natação","is_correct":true},{"text":"Corrida","is_correct":false},{"text":"Ciclismo","is_correct":false}]'::jsonb, 'Swimming = Natação.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 17, '{"prompt":"Form:","sentence":"I play soccer every Saturday"}'::jsonb, '[]'::jsonb, '''I play soccer every Saturday'' = Jogo futebol todo sábado.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 17, '{"prompt":"Listen:","audio_text":"Do you like volleyball","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=do+you+like+volleyball"}'::jsonb, '[{"text":"Você gosta de vôlei?","is_correct":true},{"text":"Você joga vôlei?","is_correct":false},{"text":"Você assistiu vôlei?","is_correct":false}]'::jsonb, 'Do you like = Você gosta de.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Hobbies', 25);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 17, '{"prompt":"''I enjoy reading books'' means:","image":"📚"}'::jsonb, '[{"text":"Eu gosto de ler livros","is_correct":true},{"text":"Eu preciso ler livros","is_correct":false},{"text":"Eu devo ler livros","is_correct":false}]'::jsonb, 'Enjoy = gostar de / aproveitar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 17, '{"prompt":"Match hobbies.","items":[{"icon":"🎨","word":"painting"},{"icon":"🎸","word":"playing guitar"},{"icon":"📷","word":"photography"}]}'::jsonb, '[]'::jsonb, 'Painting = pintura, Playing guitar = tocar guitarra, Photography = fotografia.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 17, '{"prompt":"Form:","sentence":"She likes dancing and singing"}'::jsonb, '[]'::jsonb, '''She likes dancing and singing'' = Ela gosta de dançar e cantar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 17, '{"prompt":"Listen:","audio_text":"cooking is my favorite hobby","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=cooking+is+my+favorite+hobby"}'::jsonb, '[{"text":"Cozinhar é meu hobby favorito","is_correct":true},{"text":"Cozinhar é muito difícil","is_correct":false},{"text":"Eu não gosto de cozinhar","is_correct":false}]'::jsonb, 'My favorite hobby = Meu hobby favorito.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Talking About Preferences', 25);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 17, '{"prompt":"Form:","sentence":"I prefer watching movies to reading"}'::jsonb, '[]'::jsonb, '''I prefer X to Y'' = Eu prefiro X a Y.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 17, '{"prompt":"''I am interested in...'' means:","image":"🤔"}'::jsonb, '[{"text":"Eu me interesso por...","is_correct":true},{"text":"Eu sou bom em...","is_correct":false},{"text":"Eu tenho medo de...","is_correct":false}]'::jsonb, 'Interested in = Interessado em.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 17, '{"prompt":"Listen:","audio_text":"What do you do in your free time","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=what+do+you+do+in+your+free+time"}'::jsonb, '[{"text":"O que você faz no tempo livre?","is_correct":true},{"text":"O que você faz no trabalho?","is_correct":false},{"text":"Quando você tem tempo livre?","is_correct":false}]'::jsonb, 'Free time = tempo livre.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 17, '{"prompt":"''Hobby'' is used in both English and Portuguese. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes! ''Hobby'' is used in both languages.');

    -- ═══════════ UNIT 18 [A2]: Present Continuous ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 18, 'Present Continuous', 'O que está acontecendo agora.', '🔄');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'What are you doing?', 26);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 18, '{"prompt":"''She is reading a book'' means:","image":"📖"}'::jsonb, '[{"text":"Ela está lendo um livro","is_correct":true},{"text":"Ela leu um livro","is_correct":false},{"text":"Ela vai ler um livro","is_correct":false}]'::jsonb, 'Is + verb-ing = está + gerúndio (ação acontecendo agora).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 18, '{"prompt":"Form:","sentence":"They are playing in the park"}'::jsonb, '[]'::jsonb, '''They are playing in the park'' = Eles estão brincando no parque.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 18, '{"prompt":"Listen:","audio_text":"I am studying English","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=i+am+studying+english"}'::jsonb, '[{"text":"Eu estou estudando inglês","is_correct":true},{"text":"Eu estudo inglês","is_correct":false},{"text":"Eu estudei inglês","is_correct":false}]'::jsonb, 'Am studying = estou estudando (present continuous).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 18, '{"prompt":"''He is working'' uses the Present Continuous tense. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes! Subject + is/am/are + verb-ing = Present Continuous.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Negative & Questions', 26);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 18, '{"prompt":"''She is not sleeping'' means:","image":"😴"}'::jsonb, '[{"text":"Ela não está dormindo","is_correct":true},{"text":"Ela está dormindo","is_correct":false},{"text":"Ela não dormiu","is_correct":false}]'::jsonb, 'Is not + verb-ing = negativa do present continuous.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 18, '{"prompt":"Form:","sentence":"Are you listening to me"}'::jsonb, '[]'::jsonb, '''Are you listening to me?'' = Você está me ouvindo?');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 18, '{"prompt":"Listen:","audio_text":"Is he coming to the party","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=is+he+coming+to+the+party"}'::jsonb, '[{"text":"Ele está vindo para a festa?","is_correct":true},{"text":"Ele veio para a festa?","is_correct":false},{"text":"Ele vai vir para a festa?","is_correct":false}]'::jsonb, 'Is he coming = Ele está vindo?');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 18, '{"prompt":"Choose the INCORRECT sentence:","image":"❌"}'::jsonb, '[{"text":"She is plays tennis","is_correct":true},{"text":"She is playing tennis","is_correct":false},{"text":"She plays tennis","is_correct":false}]'::jsonb, '''She is plays'' is wrong. It should be ''She is playing'' OR ''She plays''.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Present Simple vs Continuous', 26);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 18, '{"prompt":"Which describes a habit?","image":"📝"}'::jsonb, '[{"text":"I drink coffee every morning","is_correct":true},{"text":"I am drinking coffee now","is_correct":false},{"text":"I drank coffee yesterday","is_correct":false}]'::jsonb, 'Present Simple = hábitos. Present Continuous = agora.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 18, '{"prompt":"Form:","sentence":"He usually walks to work"}'::jsonb, '[]'::jsonb, '''He usually walks to work'' = Ele geralmente anda até o trabalho (hábito = Simple).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 18, '{"prompt":"''I am loving this'' is grammatically correct in everyday English. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Though ''love'' is a stative verb, ''I''m loving this/it'' is widely accepted colloquially.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 18, '{"prompt":"Listen:","audio_text":"She works at a hospital but today she is staying home","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=she+works+at+a+hospital"}'::jsonb, '[{"text":"Simple + Continuous combinados","is_correct":true},{"text":"Ambos são Present Simple","is_correct":false},{"text":"Ambos são Present Continuous","is_correct":false}]'::jsonb, '''Works'' = simples (hábito), ''is staying'' = contínuo (agora).');

    -- ═══════════ UNIT 19 [A2]: The City ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 19, 'The City', 'Lugares na cidade e como se locomover.', '🏙️');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Places in the City', 26);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 19, '{"prompt":"Match places.","items":[{"icon":"🏥","word":"hospital"},{"icon":"🏪","word":"store"},{"icon":"📮","word":"post office"}]}'::jsonb, '[]'::jsonb, 'Hospital, Store = loja, Post office = correio.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 19, '{"prompt":"''Library'' means:","image":"📚"}'::jsonb, '[{"text":"Biblioteca","is_correct":true},{"text":"Livraria","is_correct":false},{"text":"Escola","is_correct":false}]'::jsonb, 'Library = Biblioteca. Bookstore = Livraria. Cuidado com o falso cognato!');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 19, '{"prompt":"Form:","sentence":"The bank is next to the pharmacy"}'::jsonb, '[]'::jsonb, '''Next to'' = ao lado de.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 19, '{"prompt":"Listen:","audio_text":"Where is the nearest gas station","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=where+is+the+nearest+gas+station"}'::jsonb, '[{"text":"Onde fica o posto mais perto?","is_correct":true},{"text":"Onde é o hospital?","is_correct":false},{"text":"Onde é o parque?","is_correct":false}]'::jsonb, 'Nearest = mais perto.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Prepositions of Place', 26);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 19, '{"prompt":"''Between'' means:","image":"↔️"}'::jsonb, '[{"text":"Entre","is_correct":true},{"text":"Atrás","is_correct":false},{"text":"Na frente","is_correct":false}]'::jsonb, 'Between = Entre.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 19, '{"prompt":"Match.","items":[{"icon":"⬆️","word":"above"},{"icon":"⬇️","word":"below"},{"icon":"↔️","word":"between"}]}'::jsonb, '[]'::jsonb, 'Above = acima, Below = abaixo, Between = entre.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 19, '{"prompt":"Form:","sentence":"The cat is under the table"}'::jsonb, '[]'::jsonb, '''Under'' = debaixo de.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 19, '{"prompt":"Listen:","audio_text":"The park is in front of the school","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=in+front+of+the+school"}'::jsonb, '[{"text":"O parque fica em frente à escola","is_correct":true},{"text":"O parque fica atrás da escola","is_correct":false},{"text":"O parque fica longe da escola","is_correct":false}]'::jsonb, 'In front of = em frente a.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Asking for Help', 26);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 19, '{"prompt":"Form:","sentence":"Excuse me where is the museum"}'::jsonb, '[]'::jsonb, '''Excuse me, where is the museum?'' = Com licença, onde fica o museu?');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 19, '{"prompt":"''Could you help me?'' means:","image":"🙏"}'::jsonb, '[{"text":"Você poderia me ajudar?","is_correct":true},{"text":"Você está me ajudando?","is_correct":false},{"text":"Você me ajudou?","is_correct":false}]'::jsonb, 'Could = poderia (mais polido que ''can'').');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 19, '{"prompt":"Listen:","audio_text":"I am lost","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=i+am+lost"}'::jsonb, '[{"text":"Eu estou perdido","is_correct":true},{"text":"Eu estou atrasado","is_correct":false},{"text":"Eu estou cansado","is_correct":false}]'::jsonb, 'I am lost = Estou perdido.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 19, '{"prompt":"''Excuse me'' is more polite than ''Hey!'' True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes! ''Excuse me'' is the polite way to get attention.');

    -- ═══════════ UNIT 20 [A2]: Jobs & Professions ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 20, 'Jobs & Professions', 'Profissões e rotina de trabalho.', '💼');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Common Jobs', 26);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 20, '{"prompt":"Match jobs.","items":[{"icon":"👨‍⚕️","word":"doctor"},{"icon":"👩‍🏫","word":"teacher"},{"icon":"👨‍🍳","word":"chef"}]}'::jsonb, '[]'::jsonb, 'Doctor = médico, Teacher = professor, Chef = chef/cozinheiro.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 20, '{"prompt":"''Lawyer'' means:","image":"⚖️"}'::jsonb, '[{"text":"Advogado","is_correct":true},{"text":"Policial","is_correct":false},{"text":"Médico","is_correct":false}]'::jsonb, 'Lawyer = Advogado.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 20, '{"prompt":"Form:","sentence":"My father is an engineer"}'::jsonb, '[]'::jsonb, '''My father is an engineer'' = Meu pai é um engenheiro. Note: ''an'' before vowel sounds.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 20, '{"prompt":"Listen:","audio_text":"She works as a nurse","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=she+works+as+a+nurse"}'::jsonb, '[{"text":"Ela trabalha como enfermeira","is_correct":true},{"text":"Ela é médica","is_correct":false},{"text":"Ela estuda enfermagem","is_correct":false}]'::jsonb, 'Works as = trabalha como.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Workplaces', 26);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 20, '{"prompt":"Where do they work?","items":[{"icon":"🏥","word":"hospital"},{"icon":"🏫","word":"school"},{"icon":"🏢","word":"office"}]}'::jsonb, '[]'::jsonb, 'Doctors work at hospitals, teachers at schools, many people at offices.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 20, '{"prompt":"''Factory'' means:","image":"🏭"}'::jsonb, '[{"text":"Fábrica","is_correct":true},{"text":"Escritório","is_correct":false},{"text":"Restaurante","is_correct":false}]'::jsonb, 'Factory = Fábrica.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 20, '{"prompt":"Form:","sentence":"He works at a restaurant"}'::jsonb, '[]'::jsonb, 'Work at = trabalhar em.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 20, '{"prompt":"''To work from home'' means ''trabalhar de casa''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Work from home = home office / trabalhar de casa.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'What do you want to be?', 26);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 20, '{"prompt":"''I want to be a pilot when I grow up'' — What does ''grow up'' mean?","image":"✈️"}'::jsonb, '[{"text":"Crescer","is_correct":true},{"text":"Acordar","is_correct":false},{"text":"Estudar","is_correct":false}]'::jsonb, 'Grow up = Crescer.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 20, '{"prompt":"Form:","sentence":"What do you want to be"}'::jsonb, '[]'::jsonb, '''What do you want to be?'' = O que você quer ser?');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 20, '{"prompt":"Listen:","audio_text":"I dream of becoming a scientist","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=i+dream+of+becoming+a+scientist"}'::jsonb, '[{"text":"Eu sonho em ser cientista","is_correct":true},{"text":"Eu sou cientista","is_correct":false},{"text":"Eu estudei ciência","is_correct":false}]'::jsonb, 'Dream of = sonhar em.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 20, '{"prompt":"Match careers to tools.","items":[{"icon":"🔬","word":"scientist"},{"icon":"🎨","word":"artist"},{"icon":"📐","word":"architect"}]}'::jsonb, '[]'::jsonb, 'Scientist = cientista, Artist = artista, Architect = arquiteto.');

    -- ═══════════ UNIT 21 [A2]: Health & Doctor ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 21, 'Health & Doctor', 'Ir ao médico e saúde.', '🏥');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'At the Doctor', 27);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 21, '{"prompt":"Form the sentence:","sentence":"I have a fever and a sore throat"}'::jsonb, '[]'::jsonb, 'I have a fever = Estou com febre. Sore throat = dor de garganta.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 21, '{"prompt":"''Prescription'' means:","image":"📝"}'::jsonb, '[{"text":"Receita médica","is_correct":true},{"text":"Remédio","is_correct":false},{"text":"Consulta","is_correct":false}]'::jsonb, 'Prescription = Receita médica.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 21, '{"prompt":"Listen and choose:","audio_text":"You should take this medicine twice a day","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=You+should+take+this+medicine+twice+a+day"}'::jsonb, '[{"text":"Tome este remédio duas vezes ao dia","is_correct":true},{"text":"Uma vez ao dia","is_correct":false},{"text":"Três vezes ao dia","is_correct":false}]'::jsonb, 'Twice a day = duas vezes ao dia.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 21, '{"prompt":"''Appointment'' means ''consulta/compromisso''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Appointment = consulta/compromisso agendado.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Symptoms', 27);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 21, '{"prompt":"Match the items.","items":[{"icon":"🤒","word":"fever"},{"icon":"🤧","word":"cold"},{"icon":"🤕","word":"headache"}]}'::jsonb, '[]'::jsonb, 'Fever = febre, Cold = resfriado, Headache = dor de cabeça.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 21, '{"prompt":"''Cough'' means:","image":"📝"}'::jsonb, '[{"text":"Tosse","is_correct":true},{"text":"Espirro","is_correct":false},{"text":"Febre","is_correct":false}]'::jsonb, 'Cough = Tosse. Sneeze = Espirro.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 21, '{"prompt":"Form the sentence:","sentence":"My back hurts a lot"}'::jsonb, '[]'::jsonb, '''My back hurts a lot'' = Minhas costas doem muito.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 21, '{"prompt":"Listen and choose:","audio_text":"I need to see a doctor","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=I+need+to+see+a+doctor"}'::jsonb, '[{"text":"Preciso ver um médico","is_correct":true},{"text":"Não preciso de médico","is_correct":false},{"text":"Já estou melhor","is_correct":false}]'::jsonb, 'I need to = Eu preciso de.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Healthy Habits', 27);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 21, '{"prompt":"''Exercise regularly'' means:","image":"📝"}'::jsonb, '[{"text":"Exercitar-se regularmente","is_correct":true},{"text":"Nunca se exercitar","is_correct":false},{"text":"Exercitar-se uma vez","is_correct":false}]'::jsonb, 'Regularly = regularmente.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 21, '{"prompt":"Form the sentence:","sentence":"You should drink more water"}'::jsonb, '[]'::jsonb, '''Should'' = deveria (conselho).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 21, '{"prompt":"''Junk food'' means ''comida saudável''. True or False?"}'::jsonb, '[{"text":"False","is_correct":true},{"text":"True","is_correct":false}]'::jsonb, 'Junk food = comida não saudável / fast food.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 21, '{"prompt":"Listen and choose:","audio_text":"Eating fruits and vegetables is important","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Eating+fruits+and+vegetables+is+important"}'::jsonb, '[{"text":"Comer frutas e verduras é importante","is_correct":true},{"text":"Comer doces é importante","is_correct":false},{"text":"Pular refeições é bom","is_correct":false}]'::jsonb, 'Fruits and vegetables = frutas e verduras.');

    -- ═══════════ UNIT 22 [A2]: Travel & Vacation ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 22, 'Travel & Vacation', 'Viagens e férias.', '✈️');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'At the Airport', 27);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 22, '{"prompt":"Form the sentence:","sentence":"May I see your passport please"}'::jsonb, '[]'::jsonb, 'May I see = Posso ver (pedido educado).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 22, '{"prompt":"''Boarding pass'' means:","image":"📝"}'::jsonb, '[{"text":"Cartão de embarque","is_correct":true},{"text":"Passaporte","is_correct":false},{"text":"Bilhete de trem","is_correct":false}]'::jsonb, 'Boarding pass = Cartão de embarque.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 22, '{"prompt":"Listen and choose:","audio_text":"The flight has been delayed","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+flight+has+been+delayed"}'::jsonb, '[{"text":"O voo foi atrasado","is_correct":true},{"text":"O voo foi cancelado","is_correct":false},{"text":"O voo chegou","is_correct":false}]'::jsonb, 'Delayed = atrasado.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 22, '{"prompt":"Match the items.","items":[{"icon":"🛫","word":"departure"},{"icon":"🛬","word":"arrival"},{"icon":"🧳","word":"luggage"}]}'::jsonb, '[]'::jsonb, 'Departure = partida, Arrival = chegada, Luggage = bagagem.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'At the Hotel', 27);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 22, '{"prompt":"''Check-in'' means:","image":"📝"}'::jsonb, '[{"text":"Fazer o registro de entrada","is_correct":true},{"text":"Sair do hotel","is_correct":false},{"text":"Cancelar a reserva","is_correct":false}]'::jsonb, 'Check-in = entrada. Check-out = saída.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 22, '{"prompt":"Form the sentence:","sentence":"I have a reservation under my name"}'::jsonb, '[]'::jsonb, 'Reservation = reserva. Under my name = no meu nome.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 22, '{"prompt":"Listen and choose:","audio_text":"Is breakfast included","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Is+breakfast+included"}'::jsonb, '[{"text":"O café da manhã está incluído?","is_correct":true},{"text":"O jantar está incluído?","is_correct":false},{"text":"Tem piscina?","is_correct":false}]'::jsonb, 'Included = incluído.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 22, '{"prompt":"''Room service'' means ''serviço de quarto''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Room service = serviço de quarto.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Sightseeing', 27);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 22, '{"prompt":"''Tourist attraction'' means:","image":"📝"}'::jsonb, '[{"text":"Atração turística","is_correct":true},{"text":"Agência de viagem","is_correct":false},{"text":"Guia turístico","is_correct":false}]'::jsonb, 'Tourist attraction = ponto turístico.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 22, '{"prompt":"Form the sentence:","sentence":"We visited three museums yesterday"}'::jsonb, '[]'::jsonb, 'Visited = visitamos (past tense).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 22, '{"prompt":"Match the items.","items":[{"icon":"📸","word":"take photos"},{"icon":"🗺️","word":"map"},{"icon":"🎫","word":"ticket"}]}'::jsonb, '[]'::jsonb, 'Take photos, Map = mapa, Ticket = ingresso.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 22, '{"prompt":"Listen and choose:","audio_text":"Could you take a picture of us","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Could+you+take+a+picture+of+us"}'::jsonb, '[{"text":"Pode tirar uma foto nossa?","is_correct":true},{"text":"Tire um selfie","is_correct":false},{"text":"Compre uma foto","is_correct":false}]'::jsonb, 'Take a picture = tirar uma foto.');

    -- ═══════════ UNIT 23 [A2]: Technology & Internet ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 23, 'Technology & Internet', 'Tecnologia e internet do dia a dia.', '💻');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Devices', 27);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 23, '{"prompt":"Match the items.","items":[{"icon":"💻","word":"laptop"},{"icon":"📱","word":"smartphone"},{"icon":"🖨️","word":"printer"}]}'::jsonb, '[]'::jsonb, 'Laptop, Smartphone, Printer = impressora.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 23, '{"prompt":"''Download'' means:","image":"📝"}'::jsonb, '[{"text":"Baixar (um arquivo)","is_correct":true},{"text":"Enviar","is_correct":false},{"text":"Apagar","is_correct":false}]'::jsonb, 'Download = baixar. Upload = enviar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 23, '{"prompt":"Form the sentence:","sentence":"I need to charge my phone"}'::jsonb, '[]'::jsonb, 'Charge = carregar (a bateria).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 23, '{"prompt":"Listen and choose:","audio_text":"The Wi-Fi password is on the wall","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+Wi-Fi+password+is+on+the+wall"}'::jsonb, '[{"text":"A senha do Wi-Fi está na parede","is_correct":true},{"text":"Não tem Wi-Fi","is_correct":false},{"text":"O Wi-Fi está quebrado","is_correct":false}]'::jsonb, 'Password = senha.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Online Actions', 27);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 23, '{"prompt":"''Click on the link'' means:","image":"📝"}'::jsonb, '[{"text":"Clique no link","is_correct":true},{"text":"Copie o link","is_correct":false},{"text":"Delete o link","is_correct":false}]'::jsonb, 'Click = clicar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 23, '{"prompt":"Form the sentence:","sentence":"Please enter your email address"}'::jsonb, '[]'::jsonb, 'Enter = inserir/digitar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 23, '{"prompt":"Match the items.","items":[{"icon":"📧","word":"email"},{"icon":"🔍","word":"search"},{"icon":"📤","word":"send"}]}'::jsonb, '[]'::jsonb, 'Email, Search = buscar, Send = enviar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 23, '{"prompt":"''Log in'' and ''sign in'' mean the same thing. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Log in = Sign in = fazer login/entrar.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Social Media', 27);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 23, '{"prompt":"''Follow'' on social media means:","image":"📝"}'::jsonb, '[{"text":"Seguir","is_correct":true},{"text":"Bloquear","is_correct":false},{"text":"Curtir","is_correct":false}]'::jsonb, 'Follow = seguir. Block = bloquear. Like = curtir.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 23, '{"prompt":"Form the sentence:","sentence":"She posted a photo on Instagram"}'::jsonb, '[]'::jsonb, 'Posted = postou.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 23, '{"prompt":"Listen and choose:","audio_text":"How many followers do you have","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=How+many+followers+do+you+have"}'::jsonb, '[{"text":"Quantos seguidores você tem?","is_correct":true},{"text":"Quantas fotos você tem?","is_correct":false},{"text":"Quantos likes você tem?","is_correct":false}]'::jsonb, 'Followers = seguidores.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 23, '{"prompt":"''Share'' means ''compartilhar''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Share = compartilhar.');

    -- ═══════════ UNIT 24 [A2]: Shopping & Money ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 24, 'Shopping & Money', 'Compras e dinheiro.', '💰');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Pricing', 28);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 24, '{"prompt":"''How much is it?'' means:","image":"📝"}'::jsonb, '[{"text":"Quanto custa?","is_correct":true},{"text":"Onde fica?","is_correct":false},{"text":"Como vai?","is_correct":false}]'::jsonb, 'How much? = Quanto (valor).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 24, '{"prompt":"Form the sentence:","sentence":"That will be twenty dollars please"}'::jsonb, '[]'::jsonb, 'That will be = vai ficar (valor total).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 24, '{"prompt":"Listen and choose:","audio_text":"Can I pay by credit card","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Can+I+pay+by+credit+card"}'::jsonb, '[{"text":"Posso pagar com cartão de crédito?","is_correct":true},{"text":"Posso pagar em dinheiro?","is_correct":false},{"text":"Aceita débito?","is_correct":false}]'::jsonb, 'By credit card = com cartão de crédito.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 24, '{"prompt":"''Change'' can mean both ''troco'' and ''mudar''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes! Change = troco / mudança.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Clothing', 28);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 24, '{"prompt":"Match the items.","items":[{"icon":"👕","word":"T-shirt"},{"icon":"👖","word":"pants"},{"icon":"👟","word":"sneakers"}]}'::jsonb, '[]'::jsonb, 'T-shirt = camiseta, Pants = calças, Sneakers = tênis.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 24, '{"prompt":"''Try on'' means:","image":"📝"}'::jsonb, '[{"text":"Experimentar (roupa)","is_correct":true},{"text":"Comprar","is_correct":false},{"text":"Vender","is_correct":false}]'::jsonb, 'Try on = experimentar roupa.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 24, '{"prompt":"Form the sentence:","sentence":"Where is the changing room"}'::jsonb, '[]'::jsonb, 'Changing room / Fitting room = provador.');

    -- ═══════════ UNIT 25 [A2]: Entertainment ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 25, 'Entertainment', 'Cinema, música e lazer.', '🍿');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Movies', 28);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 25, '{"prompt":"''Plot'' means:","image":"📝"}'::jsonb, '[{"text":"Enredo/Trama","is_correct":true},{"text":"Ator","is_correct":false},{"text":"Cena","is_correct":false}]'::jsonb, 'Plot = enredo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 25, '{"prompt":"Form the sentence:","sentence":"I enjoy watching horror movies"}'::jsonb, '[]'::jsonb, 'Enjoy + -ing.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 25, '{"prompt":"Listen and choose:","audio_text":"Who is your favorite actor","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Who+is+your+favorite+actor"}'::jsonb, '[{"text":"Quem é seu ator favorito?","is_correct":true},{"text":"Qual seu filme favorito?","is_correct":false},{"text":"Onde fica o cinema?","is_correct":false}]'::jsonb, 'Favorite actor = ator favorito.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Music', 28);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 25, '{"prompt":"Match the items.","items":[{"icon":"🎸","word":"guitar"},{"icon":"🥁","word":"drums"},{"icon":"🎹","word":"piano"}]}'::jsonb, '[]'::jsonb, 'Guitar = violão/guitarra, Drums = bateria.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 25, '{"prompt":"''Lyrics'' means:","image":"📝"}'::jsonb, '[{"text":"Letra da música","is_correct":true},{"text":"Ritmo","is_correct":false},{"text":"Show","is_correct":false}]'::jsonb, 'Lyrics = letra.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 25, '{"prompt":"''Live concert'' means a recorded show. True or False?"}'::jsonb, '[{"text":"False","is_correct":true},{"text":"True","is_correct":false}]'::jsonb, 'Live = ao vivo.');

    -- ═══════════ UNIT 26 [A2]: Directions ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 26, 'Directions', 'Pedindo e dando direções.', '🗺️');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Asking Directions', 28);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 26, '{"prompt":"Form the sentence:","sentence":"Go straight and turn left at the corner"}'::jsonb, '[]'::jsonb, 'Go straight = siga reto. Turn left = vire à esquerda.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 26, '{"prompt":"''Across from'' means:","image":"📝"}'::jsonb, '[{"text":"Em frente a / Do outro lado de","is_correct":true},{"text":"Atrás de","is_correct":false},{"text":"Ao lado de","is_correct":false}]'::jsonb, 'Across from = do outro lado / oposto.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 26, '{"prompt":"Listen and choose:","audio_text":"The pharmacy is next to the bank","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+pharmacy+is+next+to+the+bank"}'::jsonb, '[{"text":"A farmácia é ao lado do banco","is_correct":true},{"text":"A farmácia é longe do banco","is_correct":false},{"text":"O banco é na farmácia","is_correct":false}]'::jsonb, 'Next to = ao lado de.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Prepositions of Place', 28);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 26, '{"prompt":"Match the items.","items":[{"icon":"📦","word":"inside"},{"icon":"🔝","word":"above"},{"icon":"⬇️","word":"below"}]}'::jsonb, '[]'::jsonb, 'Inside, Above, Below.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 26, '{"prompt":"''Between'' is used for two things. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Between = entre dois. Among = entre vários.');

    -- ═══════════ UNIT 27 [A2]: Environment ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 27, 'Environment', 'Natureza e clima.', '🌍');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Weather', 29);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 27, '{"prompt":"''Thunderstorm'' means:","image":"📝"}'::jsonb, '[{"text":"Tempestade com trovões","is_correct":true},{"text":"Garoa","is_correct":false},{"text":"Nevoeiro","is_correct":false}]'::jsonb, 'Thunder = trovão.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 27, '{"prompt":"Form the sentence:","sentence":"It is sunny and warm today"}'::jsonb, '[]'::jsonb, 'Sunny = ensolarado. Warm = quente/ameno.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 27, '{"prompt":"Listen and choose:","audio_text":"Beware of the heavy rain","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Beware+of+the+heavy+rain"}'::jsonb, '[{"text":"Cuidado com a chuva pesada","is_correct":true},{"text":"Gosto de chuva","is_correct":false},{"text":"Vai chover pouco","is_correct":false}]'::jsonb, 'Beware = cuidado. Heavy rain = chuva forte.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Save the Planet', 29);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 27, '{"prompt":"Match the items.","items":[{"icon":"♻️","word":"recycle"},{"icon":"🧴","word":"plastic"},{"icon":"🔋","word":"energy"}]}'::jsonb, '[]'::jsonb, 'Recycle = reciclar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'A2', 27, '{"prompt":"''Pollution'' means ''poluição''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Pollution = poluição.');

    -- ═══════════ UNIT 28 [A2]: Work & Office ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 28, 'Work & Office', 'No escritório.', '🏢');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Objects', 29);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'A2', 28, '{"prompt":"Match the items.","items":[{"icon":"🖨️","word":"printer"},{"icon":"🖱️","word":"mouse"},{"icon":"⌨️","word":"keyboard"}]}'::jsonb, '[]'::jsonb, 'Printer = impressora.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 28, '{"prompt":"''Meeting'' means:","image":"📝"}'::jsonb, '[{"text":"Reunião","is_correct":true},{"text":"Festa","is_correct":false},{"text":"Almoço","is_correct":false}]'::jsonb, 'Meeting = reunião.');

    -- ═══════════ UNIT 29 [A2]: Basic Emotions ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 29, 'Basic Emotions', 'Sentimentos básicos.', '🎭');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'How are you?', 29);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 29, '{"prompt":"''Excited'' means:","image":"📝"}'::jsonb, '[{"text":"Empolgado","is_correct":true},{"text":"Cansado","is_correct":false},{"text":"Triste","is_correct":false}]'::jsonb, 'Excited = empolgado.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 29, '{"prompt":"Listen and choose:","audio_text":"He is feeling better today","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=He+is+feeling+better+today"}'::jsonb, '[{"text":"Ele está se sentindo melhor hoje","is_correct":true},{"text":"Ele está pior","is_correct":false},{"text":"Ele está igual","is_correct":false}]'::jsonb, 'Better = melhor.');

    -- ═══════════ UNIT 30 [A2]: Socializing ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 30, 'Socializing', 'Conversas e eventos sociais.', '🥳');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Small Talk', 30);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'A2', 30, '{"prompt":"Form the sentence:","sentence":"How long have you lived here"}'::jsonb, '[]'::jsonb, 'How long = há quanto tempo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'A2', 30, '{"prompt":"''What do you do for a living?'' means:","image":"📝"}'::jsonb, '[{"text":"Com o que você trabalha?","is_correct":true},{"text":"O que você está fazendo?","is_correct":false},{"text":"Onde você mora?","is_correct":false}]'::jsonb, 'Do for a living = trabalhar com.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'A2', 30, '{"prompt":"Listen and choose:","audio_text":"It was nice talking to you","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=It+was+nice+talking+to+you"}'::jsonb, '[{"text":"Foi bom conversar com você","is_correct":true},{"text":"Eu gosto de falar","is_correct":false},{"text":"Fale comigo","is_correct":false}]'::jsonb, 'Nice talking to you = bom falar com você (despedida).');

    -- ═══════════ UNIT 31 [B1]: Past Simple ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 31, 'Past Simple', 'Ações no passado.', '⏮️');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Regular Verbs', 30);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 31, '{"prompt":"''I worked yesterday'' — what tense is this?","image":"📝"}'::jsonb, '[{"text":"Simple Past","is_correct":true},{"text":"Present","is_correct":false},{"text":"Future","is_correct":false}]'::jsonb, 'Worked = past tense of ''work''. Regular verbs add -ed.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 31, '{"prompt":"Form the sentence:","sentence":"She visited her grandmother last week"}'::jsonb, '[]'::jsonb, 'Visited (past of visit) + time marker ''last week''.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 31, '{"prompt":"Listen and choose:","audio_text":"We played soccer after school","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=We+played+soccer+after+school"}'::jsonb, '[{"text":"Nós jogamos futebol depois da escola","is_correct":true},{"text":"Nós assistimos futebol","is_correct":false},{"text":"Nós compramos bolas","is_correct":false}]'::jsonb, 'Played = jogamos (past of play).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 31, '{"prompt":"All past simple regular verbs end in ''-ed''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Regular: walk→walked, play→played, study→studied.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Irregular Verbs', 30);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B1', 31, '{"prompt":"Match the items.","items":[{"icon":"🏃","word":"ran (run)"},{"icon":"✍️","word":"wrote (write)"},{"icon":"👀","word":"saw (see)"}]}'::jsonb, '[]'::jsonb, 'Run→ran, Write→wrote, See→saw. Irregular = não seguem a regra do -ed.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 31, '{"prompt":"Past of ''go'' is:","image":"📝"}'::jsonb, '[{"text":"went","is_correct":true},{"text":"goed","is_correct":false},{"text":"goned","is_correct":false}]'::jsonb, 'Go → went (irregular). NOT ''goed''!');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 31, '{"prompt":"Form the sentence:","sentence":"He ate breakfast and went to work"}'::jsonb, '[]'::jsonb, 'Ate (past of eat), went (past of go).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 31, '{"prompt":"Listen and choose:","audio_text":"I bought a new book yesterday","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=I+bought+a+new+book+yesterday"}'::jsonb, '[{"text":"Eu comprei um livro novo ontem","is_correct":true},{"text":"Eu li um livro ontem","is_correct":false},{"text":"Eu perdi um livro","is_correct":false}]'::jsonb, 'Bought = past of buy.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Past Negatives & Questions', 30);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 31, '{"prompt":"''Did you see the movie?'' — What is the structure?","image":"📝"}'::jsonb, '[{"text":"Did + subject + base verb","is_correct":true},{"text":"Did + subject + past verb","is_correct":false},{"text":"Do + subject + verb","is_correct":false}]'::jsonb, 'Questions in past: Did + subj + base verb (NOT past form).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 31, '{"prompt":"Form the sentence:","sentence":"She did not go to the party"}'::jsonb, '[]'::jsonb, 'Did not (didn''t) + base verb = negativa no passado.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 31, '{"prompt":"''I didn''t went'' is grammatically correct. True or False?"}'::jsonb, '[{"text":"False","is_correct":true},{"text":"True","is_correct":false}]'::jsonb, 'WRONG! It should be ''I didn''t GO''. After ''did/didn''t'', use base form.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 31, '{"prompt":"Listen and choose:","audio_text":"Where did you travel last summer","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Where+did+you+travel+last+summer"}'::jsonb, '[{"text":"Para onde você viajou no verão passado?","is_correct":true},{"text":"Quando você viajou?","is_correct":false},{"text":"Com quem você viajou?","is_correct":false}]'::jsonb, 'Where did you...? = Para onde você...?');

    -- ═══════════ UNIT 32 [B1]: Future Plans ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 32, 'Future Plans', 'Falando sobre o futuro.', '🔮');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Will & Going to', 30);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 32, '{"prompt":"''I will help you'' — ''will'' expresses:","image":"📝"}'::jsonb, '[{"text":"A decision made now / promise","is_correct":true},{"text":"A planned action","is_correct":false},{"text":"A past action","is_correct":false}]'::jsonb, 'Will = decisão espontânea / promessa. Going to = plano já feito.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 32, '{"prompt":"Form the sentence:","sentence":"We are going to visit Paris next year"}'::jsonb, '[]'::jsonb, 'Going to = plano futuro. Next year = ano que vem.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 32, '{"prompt":"Listen and choose:","audio_text":"It will rain tomorrow according to the forecast","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=It+will+rain+tomorrow+according+to+the+forecast"}'::jsonb, '[{"text":"Vai chover amanhã segundo a previsão","is_correct":true},{"text":"Choveu ontem","is_correct":false},{"text":"Está chovendo agora","is_correct":false}]'::jsonb, 'Will = previsão baseada em fatos.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 32, '{"prompt":"''Going to'' is used for plans already made. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Going to = plano feito antes. ''I''m going to study medicine.''');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Making Predictions', 30);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 32, '{"prompt":"''I think it will be sunny tomorrow'' uses:","image":"📝"}'::jsonb, '[{"text":"''Will'' for prediction/opinion","is_correct":true},{"text":"''Going to'' for plans","is_correct":false},{"text":"Present Continuous","is_correct":false}]'::jsonb, 'Will + opinion words (think, believe, probably) = prediction.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 32, '{"prompt":"Form the sentence:","sentence":"Technology will change the world"}'::jsonb, '[]'::jsonb, 'Will + base verb = future prediction.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 32, '{"prompt":"Listen and choose:","audio_text":"People will live on Mars in the future","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=People+will+live+on+Mars+in+the+future"}'::jsonb, '[{"text":"Pessoas viverão em Marte no futuro","is_correct":true},{"text":"Pessoas moram em Marte","is_correct":false},{"text":"Pessoas moraram em Marte","is_correct":false}]'::jsonb, 'Will live = viverão (futuro).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B1', 32, '{"prompt":"Match the items.","items":[{"icon":"🤖","word":"Robots will help us"},{"icon":"🚗","word":"Cars will fly"},{"icon":"🌍","word":"Earth will be greener"}]}'::jsonb, '[]'::jsonb, 'Predictions about the future using ''will''.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Future with Present Continuous', 30);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 32, '{"prompt":"''I am meeting John at 5pm'' — this is:","image":"📝"}'::jsonb, '[{"text":"A future arrangement (already scheduled)","is_correct":true},{"text":"Something happening now","is_correct":false},{"text":"A prediction","is_correct":false}]'::jsonb, 'Present Continuous can express PLANNED future events.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 32, '{"prompt":"Form the sentence:","sentence":"We are having dinner at eight tonight"}'::jsonb, '[]'::jsonb, 'Are having = future arrangement.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 32, '{"prompt":"''She is leaving tomorrow'' can be a future sentence. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Present Continuous + future time = arrangement.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 32, '{"prompt":"Listen and choose:","audio_text":"Are you doing anything this weekend","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Are+you+doing+anything+this+weekend"}'::jsonb, '[{"text":"Você vai fazer algo neste fim de semana?","is_correct":true},{"text":"Você fez algo no fim de semana?","is_correct":false},{"text":"O que você está fazendo?","is_correct":false}]'::jsonb, 'Present Continuous for future plans.');

    -- ═══════════ UNIT 33 [B1]: Conditionals I ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 33, 'Conditionals I', 'If + present → will future.', '🔀');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'First Conditional', 31);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 33, '{"prompt":"''If it rains, I will stay home.'' What grammar is this?","image":"📝"}'::jsonb, '[{"text":"First Conditional (If + present, will + base)","is_correct":true},{"text":"Second Conditional","is_correct":false},{"text":"Third Conditional","is_correct":false}]'::jsonb, '1st Conditional: real/possible situations. If + present simple, will + base.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 33, '{"prompt":"Form the sentence:","sentence":"If you study hard you will pass the exam"}'::jsonb, '[]'::jsonb, 'If + present, will + base (real possibility).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 33, '{"prompt":"Listen and choose:","audio_text":"If we leave now we will arrive on time","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=If+we+leave+now+we+will+arrive+on+time"}'::jsonb, '[{"text":"Se sairmos agora, chegaremos a tempo","is_correct":true},{"text":"Se tivéssemos saído, teríamos chegado","is_correct":false},{"text":"Se saíssemos, chegaríamos","is_correct":false}]'::jsonb, '1st Conditional = situação real e provável.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 33, '{"prompt":"In 1st Conditional, we use ''will'' in both clauses. True or False?"}'::jsonb, '[{"text":"False","is_correct":true},{"text":"True","is_correct":false}]'::jsonb, 'NO! If + PRESENT, will + base. ''If I will go'' is WRONG.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Unless & When', 31);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 33, '{"prompt":"''Unless'' means:","image":"📝"}'::jsonb, '[{"text":"A menos que / Se não","is_correct":true},{"text":"Desde que","is_correct":false},{"text":"Quando","is_correct":false}]'::jsonb, 'Unless = a menos que. ''Unless you hurry, you''ll be late.''');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 33, '{"prompt":"Form the sentence:","sentence":"I will call you when I arrive"}'::jsonb, '[]'::jsonb, 'When + present (NOT ''when I will arrive'').');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 33, '{"prompt":"''Unless you study, you won''t pass.'' Here ''unless'' = ''if not''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Unless = if...not. Both mean the same.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 33, '{"prompt":"Listen and choose:","audio_text":"You will get sick unless you wear a jacket","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=You+will+get+sick+unless+you+wear+a+jacket"}'::jsonb, '[{"text":"Você vai ficar doente a menos que use jaqueta","is_correct":true},{"text":"Você ficou doente","is_correct":false},{"text":"Você está doente","is_correct":false}]'::jsonb, 'Unless = if not.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Practice', 31);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 33, '{"prompt":"Form the sentence:","sentence":"If she calls me I will answer"}'::jsonb, '[]'::jsonb, 'If + present simple, will + base.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 33, '{"prompt":"Choose the correct sentence:","image":"📝"}'::jsonb, '[{"text":"If I have time, I will visit you","is_correct":true},{"text":"If I will have time, I visit you","is_correct":false},{"text":"If I had time, I will visit you","is_correct":false}]'::jsonb, 'Correct 1st Conditional: If + present, will + base.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 33, '{"prompt":"Listen and choose:","audio_text":"What will you do if you win the lottery","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=What+will+you+do+if+you+win+the+lottery"}'::jsonb, '[{"text":"O que você fará se ganhar na loteria?","is_correct":true},{"text":"O que faria se ganhasse?","is_correct":false},{"text":"O que fez quando ganhou?","is_correct":false}]'::jsonb, 'Real possibility = 1st Conditional.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B1', 33, '{"prompt":"Match the items.","items":[{"icon":"☔","word":"If it rains, take an umbrella"},{"icon":"📚","word":"If you read more, you learn more"},{"icon":"🏃","word":"If you exercise, you feel better"}]}'::jsonb, '[]'::jsonb, 'Real conditions → real results.');

    -- ═══════════ UNIT 34 [B1]: Modal Verbs ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 34, 'Modal Verbs', 'Can, should, must, may.', '🔑');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Can & Could', 31);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 34, '{"prompt":"''Can'' expresses:","image":"📝"}'::jsonb, '[{"text":"Ability or Permission","is_correct":true},{"text":"Obligation","is_correct":false},{"text":"Past action","is_correct":false}]'::jsonb, 'Can = capacidade ou permissão. ''I can swim.'' ''Can I go?''');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 34, '{"prompt":"Form the sentence:","sentence":"Could you pass me the salt please"}'::jsonb, '[]'::jsonb, 'Could = can mais educado. Pedido polido.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 34, '{"prompt":"Listen and choose:","audio_text":"I could speak three languages when I was young","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=I+could+speak+three+languages+when+I+was+young"}'::jsonb, '[{"text":"Eu sabia falar três línguas quando era jovem","is_correct":true},{"text":"Eu posso falar três línguas","is_correct":false},{"text":"Eu falarei três línguas","is_correct":false}]'::jsonb, 'Could + base = capacidade no passado.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 34, '{"prompt":"''May I come in?'' is more formal than ''Can I come in?'' True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'May = mais formal que Can para pedir permissão.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Must & Should', 31);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 34, '{"prompt":"''You must wear a seatbelt'' — ''must'' means:","image":"📝"}'::jsonb, '[{"text":"Obrigação/Necessidade","is_correct":true},{"text":"Sugestão","is_correct":false},{"text":"Desejo","is_correct":false}]'::jsonb, 'Must = obrigação forte. Should = sugestão/conselho.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 34, '{"prompt":"Form the sentence:","sentence":"You should see a doctor about that cough"}'::jsonb, '[]'::jsonb, 'Should = deveria (conselho). Not as strong as must.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 34, '{"prompt":"Listen and choose:","audio_text":"Students must not use phones during the exam","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Students+must+not+use+phones+during+the+exam"}'::jsonb, '[{"text":"Alunos não podem usar celular durante a prova","is_correct":true},{"text":"Alunos devem usar celular","is_correct":false},{"text":"Alunos precisam de celular","is_correct":false}]'::jsonb, 'Must not = proibição.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B1', 34, '{"prompt":"Match the items.","items":[{"icon":"⛔","word":"must not (proibição)"},{"icon":"💡","word":"should (conselho)"},{"icon":"✅","word":"must (obrigação)"}]}'::jsonb, '[]'::jsonb, 'Must not ≠ don''t have to! Must not = proibido.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Have to & Don''t have to', 31);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 34, '{"prompt":"''You don''t have to come'' means:","image":"📝"}'::jsonb, '[{"text":"Você não precisa vir (é opcional)","is_correct":true},{"text":"Você não pode vir (proibido)","is_correct":false},{"text":"Você tem que vir","is_correct":false}]'::jsonb, 'Don''t have to = não precisa (é opcional). Must not = proibido.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 34, '{"prompt":"Form the sentence:","sentence":"Do I have to bring my own laptop"}'::jsonb, '[]'::jsonb, 'Do I have to = Eu preciso/tenho que?');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 34, '{"prompt":"''Must not'' and ''don''t have to'' have the same meaning. True or False?"}'::jsonb, '[{"text":"False","is_correct":true},{"text":"True","is_correct":false}]'::jsonb, 'DIFFERENT! Must not = proibido. Don''t have to = não precisa (opcional).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 34, '{"prompt":"Listen and choose:","audio_text":"She has to work on Saturdays","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=She+has+to+work+on+Saturdays"}'::jsonb, '[{"text":"Ela tem que trabalhar aos sábados","is_correct":true},{"text":"Ela não trabalha aos sábados","is_correct":false},{"text":"Ela quer trabalhar aos sábados","is_correct":false}]'::jsonb, 'Has to = tem que (3rd person).');

    -- ═══════════ UNIT 35 [B1]: Connectors & Linkers ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 35, 'Connectors & Linkers', 'Conectando ideias em inglês.', '🔗');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Because, So, But', 31);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 35, '{"prompt":"''I stayed home because I was sick'' — ''because'' gives:","image":"📝"}'::jsonb, '[{"text":"A reason/cause","is_correct":true},{"text":"A contrast","is_correct":false},{"text":"A result","is_correct":false}]'::jsonb, 'Because = porque (razão/causa).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 35, '{"prompt":"Form the sentence:","sentence":"He was tired so he went to bed early"}'::jsonb, '[]'::jsonb, 'So = então/por isso (resultado).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 35, '{"prompt":"Listen and choose:","audio_text":"I like coffee but I prefer tea","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=I+like+coffee+but+I+prefer+tea"}'::jsonb, '[{"text":"Eu gosto de café mas prefiro chá","is_correct":true},{"text":"Eu gosto de café e chá","is_correct":false},{"text":"Eu não gosto de café","is_correct":false}]'::jsonb, 'But = mas (contraste).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 35, '{"prompt":"''Although'' means the same as ''but''. True or False?"}'::jsonb, '[{"text":"False","is_correct":true},{"text":"True","is_correct":false}]'::jsonb, 'Similar idea (contrast), but different grammar. Although = embora (used at the beginning).');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'However, Therefore, Moreover', 31);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 35, '{"prompt":"''However'' is used to express:","image":"📝"}'::jsonb, '[{"text":"Contrast (formal)","is_correct":true},{"text":"Addition","is_correct":false},{"text":"Cause","is_correct":false}]'::jsonb, 'However = contudo/no entanto. More formal than ''but''.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 35, '{"prompt":"Form the sentence:","sentence":"The test was difficult however I passed"}'::jsonb, '[]'::jsonb, 'However = contudo. Used between two contrasting ideas.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 35, '{"prompt":"Listen and choose:","audio_text":"Therefore we need to find a solution","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Therefore+we+need+to+find+a+solution"}'::jsonb, '[{"text":"Portanto, precisamos encontrar uma solução","is_correct":true},{"text":"Enquanto isso, achamos uma solução","is_correct":false},{"text":"Além disso, não temos solução","is_correct":false}]'::jsonb, 'Therefore = portanto/logo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B1', 35, '{"prompt":"Match the items.","items":[{"icon":"➕","word":"moreover (além disso)"},{"icon":"↔️","word":"however (contudo)"},{"icon":"➡️","word":"therefore (portanto)"}]}'::jsonb, '[]'::jsonb, 'Moreover = addition, However = contrast, Therefore = result.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'In order to, Despite', 31);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 35, '{"prompt":"''In order to'' means:","image":"📝"}'::jsonb, '[{"text":"Para/A fim de","is_correct":true},{"text":"Apesar de","is_correct":false},{"text":"Porque","is_correct":false}]'::jsonb, 'In order to = para/a fim de (propósito).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 35, '{"prompt":"Form the sentence:","sentence":"Despite the rain we went to the park"}'::jsonb, '[]'::jsonb, 'Despite = apesar de. Despite + noun/-ing.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 35, '{"prompt":"''Although'' and ''despite'' both introduce contrast. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Both = contraste. Although + clause. Despite + noun.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 35, '{"prompt":"Listen and choose:","audio_text":"She exercises every day in order to stay healthy","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=She+exercises+every+day+in+order+to+stay+healthy"}'::jsonb, '[{"text":"Ela se exercita todo dia para manter a saúde","is_correct":true},{"text":"Ela é saudável por isso se exercita","is_correct":false},{"text":"Apesar de se exercitar, não é saudável","is_correct":false}]'::jsonb, 'In order to = propósito/objetivo.');

    -- ═══════════ UNIT 36 [B1]: Present Perfect ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 36, 'Present Perfect', 'Have/Has + past participle.', '⏳');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Introduction', 32);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 36, '{"prompt":"''I have visited London'' — this is:","image":"📝"}'::jsonb, '[{"text":"Present Perfect","is_correct":true},{"text":"Simple Past","is_correct":false},{"text":"Simple Present","is_correct":false}]'::jsonb, 'Have/Has + past participle = Present Perfect. Experience without specific time.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 36, '{"prompt":"Form the sentence:","sentence":"She has never eaten sushi"}'::jsonb, '[]'::jsonb, 'Has + never + past participle. Never = nunca.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 36, '{"prompt":"Listen and choose:","audio_text":"Have you ever been to Japan","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Have+you+ever+been+to+Japan"}'::jsonb, '[{"text":"Você já esteve no Japão?","is_correct":true},{"text":"Você foi ao Japão ontem?","is_correct":false},{"text":"Você vai ao Japão?","is_correct":false}]'::jsonb, 'Have you ever...? = Você já...? (experiência de vida).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 36, '{"prompt":"We use Present Perfect with specific past times like ''yesterday''. True or False?"}'::jsonb, '[{"text":"False","is_correct":true},{"text":"True","is_correct":false}]'::jsonb, 'NO! ''Yesterday'' = Past Simple. Present Perfect = NO specific time.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Ever, Never, Already, Yet', 32);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B1', 36, '{"prompt":"Match the items.","items":[{"icon":"❓","word":"Have you ever...?"},{"icon":"❌","word":"I have never..."},{"icon":"✅","word":"I have already..."}]}'::jsonb, '[]'::jsonb, 'Ever = já (perguntas), Never = nunca, Already = já (afirmativo).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 36, '{"prompt":"''Yet'' is used in:","image":"📝"}'::jsonb, '[{"text":"Negatives and Questions","is_correct":true},{"text":"Only affirmatives","is_correct":false},{"text":"Only past tense","is_correct":false}]'::jsonb, 'Yet = ainda. ''I haven''t finished yet.'' ''Have you finished yet?''');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 36, '{"prompt":"Form the sentence:","sentence":"They have already left the building"}'::jsonb, '[]'::jsonb, 'Already = já (entre have e past participle).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 36, '{"prompt":"Listen and choose:","audio_text":"I haven''t decided yet","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=I+haven''t+decided+yet"}'::jsonb, '[{"text":"Eu ainda não decidi","is_correct":true},{"text":"Eu já decidi","is_correct":false},{"text":"Eu nunca decido","is_correct":false}]'::jsonb, 'Haven''t + yet = ainda não (no final da frase).');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'For & Since', 32);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 36, '{"prompt":"''For'' is used with:","image":"📝"}'::jsonb, '[{"text":"A duration (for 3 years, for a long time)","is_correct":true},{"text":"A point in time","is_correct":false},{"text":"A specific date","is_correct":false}]'::jsonb, 'For = por/há + duração. Since = desde + ponto no tempo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 36, '{"prompt":"Form the sentence:","sentence":"I have lived here since 2020"}'::jsonb, '[]'::jsonb, 'Since + specific year/date/point in time.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 36, '{"prompt":"Listen and choose:","audio_text":"She has worked at this company for ten years","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=She+has+worked+at+this+company+for+ten+years"}'::jsonb, '[{"text":"Ela trabalha nesta empresa há dez anos","is_correct":true},{"text":"Ela trabalhou por dez anos","is_correct":false},{"text":"Ela vai trabalhar por dez anos","is_correct":false}]'::jsonb, 'Has worked + for = há... (duração até agora).');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 36, '{"prompt":"''I have known him for 2015'' is correct. True or False?"}'::jsonb, '[{"text":"False","is_correct":true},{"text":"True","is_correct":false}]'::jsonb, 'WRONG! 2015 is a point in time → use SINCE. ''Since 2015''.');

    -- ═══════════ UNIT 37 [B1]: Opinions & Agreements ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 37, 'Opinions & Agreements', 'Expressando opinião.', '⚖️');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'I think, I believe', 32);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 37, '{"prompt":"Form the sentence:","sentence":"In my opinion English is interesting"}'::jsonb, '[]'::jsonb, 'In my opinion = na minha opinião.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 37, '{"prompt":"''I agree with you'' means:","image":"📝"}'::jsonb, '[{"text":"Eu concordo com você","is_correct":true},{"text":"Eu discordo","is_correct":false},{"text":"Eu acho que","is_correct":false}]'::jsonb, 'Agree = concordar.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 37, '{"prompt":"Listen and choose:","audio_text":"I don''t think so","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=I+don''t+think+so"}'::jsonb, '[{"text":"Eu acho que não","is_correct":true},{"text":"Eu acho que sim","is_correct":false},{"text":"Eu não sei","is_correct":false}]'::jsonb, 'I don''t think so = Eu acho que não / creio que não.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Agreeing & Disagreeing', 32);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B1', 37, '{"prompt":"Match the items.","items":[{"icon":"✅","word":"I agree"},{"icon":"❌","word":"I disagree"},{"icon":"🤷","word":"Maybe"}]}'::jsonb, '[]'::jsonb, 'Agree, Disagree, Maybe.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 37, '{"prompt":"Form the sentence:","sentence":"You are absolutely right about that"}'::jsonb, '[]'::jsonb, 'Absolutely right = totalmente certo.');

    -- ═══════════ UNIT 38 [B1]: Media & News ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 38, 'Media & News', 'Notícias e mídia.', '📰');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'The News', 32);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 38, '{"prompt":"''Headline'' means:","image":"📝"}'::jsonb, '[{"text":"Manchete","is_correct":true},{"text":"Jornal","is_correct":false},{"text":"Página","is_correct":false}]'::jsonb, 'Headline = manchete.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 38, '{"prompt":"Form the sentence:","sentence":"I check the news every morning"}'::jsonb, '[]'::jsonb, 'Check the news = checar as notícias.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Advertising', 32);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 38, '{"prompt":"''Commercial'' in TV means:","image":"📝"}'::jsonb, '[{"text":"Comercial / Propaganda","is_correct":true},{"text":"Filme","is_correct":false},{"text":"Desenho","is_correct":false}]'::jsonb, 'Commercial = propaganda.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 38, '{"prompt":"''Target audience'' means ''público-alvo''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Target = alvo. Audience = público.');

    -- ═══════════ UNIT 39 [B1]: Health & Lifestyle ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 39, 'Health & Lifestyle', 'Saúde e estilo de vida.', '🍏');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Healthy Eating', 33);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 39, '{"prompt":"''Balanced diet'' means:","image":"📝"}'::jsonb, '[{"text":"Dieta equilibrada","is_correct":true},{"text":"Dieta de fome","is_correct":false},{"text":"Só comer carne","is_correct":false}]'::jsonb, 'Balanced = equilibrada.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 39, '{"prompt":"Form the sentence:","sentence":"You should eat more fiber"}'::jsonb, '[]'::jsonb, 'Should + base = conselho.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'At the Gym', 33);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B1', 39, '{"prompt":"Match the items.","items":[{"icon":"🏋️","word":"lift weights"},{"icon":"🏃","word":"treadmill"},{"icon":"🧘","word":"yoga"}]}'::jsonb, '[]'::jsonb, 'Lift weights = levantar pesos.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 39, '{"prompt":"Listen and choose:","audio_text":"I work out four times a week","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=I+work+out+four+times+a+week"}'::jsonb, '[{"text":"Eu treino quatro vezes por semana","is_correct":true},{"text":"Eu trabalho quatro vezes","is_correct":false},{"text":"Eu treino todo dia","is_correct":false}]'::jsonb, 'Work out = treinar.');

    -- ═══════════ UNIT 40 [B1]: Business Basics ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 40, 'Business Basics', 'Inglês para negócios.', '💼');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Meetings', 33);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 40, '{"prompt":"''Agenda'' in a meeting means:","image":"📝"}'::jsonb, '[{"text":"Pauta / Ordem do dia","is_correct":true},{"text":"Calendário","is_correct":false},{"text":"Caderno","is_correct":false}]'::jsonb, 'Agenda = pauta da reunião.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 40, '{"prompt":"Form the sentence:","sentence":"We need to schedule a meeting"}'::jsonb, '[]'::jsonb, 'Schedule = agendar.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Emails', 33);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B1', 40, '{"prompt":"Match the items.","items":[{"icon":"📎","word":"attachment"},{"icon":"📥","word":"inbox"},{"icon":"📤","word":"outbox"}]}'::jsonb, '[]'::jsonb, 'Attachment = anexo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B1', 40, '{"prompt":"Listen and choose:","audio_text":"Please find the file attached","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Please+find+the+file+attached"}'::jsonb, '[{"text":"Por favor, encontre o arquivo em anexo","is_correct":true},{"text":"O arquivo sumiu","is_correct":false},{"text":"Mande o arquivo","is_correct":false}]'::jsonb, 'Attached = anexo.');

    -- ═══════════ UNIT 41 [B1]: Environment & Future ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 41, 'Environment & Future', 'O futuro do planeta.', '🌱');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Climate Change', 33);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 41, '{"prompt":"''Global warming'' means:","image":"📝"}'::jsonb, '[{"text":"Aquecimento global","is_correct":true},{"text":"Clima frio","is_correct":false},{"text":"Tempestade","is_correct":false}]'::jsonb, 'Global warming = aquecimento global.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B1', 41, '{"prompt":"Form the sentence:","sentence":"We must protect our environment"}'::jsonb, '[]'::jsonb, 'Must = dever / obrigação.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Sustainability', 33);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B1', 41, '{"prompt":"''Renewable energy'' means energy from sun or wind. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Renewable = renovável.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B1', 41, '{"prompt":"Match the items.","items":[{"icon":"☀️","word":"solar"},{"icon":"💨","word":"wind"},{"icon":"🌊","word":"hydro"}]}'::jsonb, '[]'::jsonb, 'Types of renewable energy.');

    -- ═══════════ UNIT 42 [B1]: Technology & Future ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 42, 'Technology & Future', 'IA e futuro.', '🤖');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Artificial Intelligence', 34);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 42, '{"prompt":"''AI'' stands for:","image":"📝"}'::jsonb, '[{"text":"Artificial Intelligence","is_correct":true},{"text":"Advanced Internet","is_correct":false},{"text":"Automated Information","is_correct":false}]'::jsonb, 'AI = Inteligência Artificial.');

    -- ═══════════ UNIT 43 [B1]: Social Context ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 43, 'Social Context', 'Contexto social.', '👥');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Formality', 34);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 43, '{"prompt":"Which is formal?","image":"📝"}'::jsonb, '[{"text":"Good morning","is_correct":true},{"text":"Hey","is_correct":false},{"text":"What''s up","is_correct":false}]'::jsonb, 'Good morning = formal.');

    -- ═══════════ UNIT 44 [B1]: Cultural Nuances ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 44, 'Cultural Nuances', 'Nuances culturais.', '🗺️');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Idioms', 34);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 44, '{"prompt":"''Piece of cake'' means:","image":"📝"}'::jsonb, '[{"text":"Muito fácil","is_correct":true},{"text":"Pedaço de bolo","is_correct":false},{"text":"Muito difícil","is_correct":false}]'::jsonb, 'Piece of cake = moleza / muito fácil.');

    -- ═══════════ UNIT 45 [B1]: Creative Arts ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 45, 'Creative Arts', 'Artes e criatividade.', '🎨');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Expression', 35);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B1', 45, '{"prompt":"''Masterpiece'' means:","image":"📝"}'::jsonb, '[{"text":"Obra-prima","is_correct":true},{"text":"Rascunho","is_correct":false},{"text":"Pintura","is_correct":false}]'::jsonb, 'Masterpiece = obra-prima.');

    -- ═══════════ UNIT 46 [B2]: Phrasal Verbs I ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 46, 'Phrasal Verbs I', 'Verbos frasais do cotidiano.', '📎');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 35);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 46, '{"prompt":"[Phrasal Verbs I] Choose the best answer:","image":"📝"}'::jsonb, '[{"text":"Correct interpretation","is_correct":true},{"text":"Common mistake","is_correct":false},{"text":"Literal translation error","is_correct":false}]'::jsonb, 'Understanding Phrasal Verbs I requires context and practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 46, '{"prompt":"Form a complex sentence:","sentence":"I came across an old friend"}'::jsonb, '[]'::jsonb, 'Sentence structure at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 46, '{"prompt":"Listen carefully:","audio_text":"She turned down the offer","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=She+turned+down+the+offer"}'::jsonb, '[{"text":"Correct meaning","is_correct":true},{"text":"Misleading translation","is_correct":false},{"text":"Opposite meaning","is_correct":false}]'::jsonb, 'B2 listening comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 46, '{"prompt":"''Look up'' can mean both ''search'' and ''raise your eyes''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'True — this is a key concept at B2 level.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 35);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 46, '{"prompt":"Choose the correct phrasal verbs i usage:","image":"📝"}'::jsonb, '[{"text":"Advanced correct form","is_correct":true},{"text":"Beginner mistake","is_correct":false},{"text":"Portuguese interference","is_correct":false}]'::jsonb, 'Phrasal Verbs I — must be memorized through exposure.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 46, '{"prompt":"Rearrange:","sentence":"She turned down the job offer"}'::jsonb, '[]'::jsonb, 'Complex word order at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B2', 46, '{"prompt":"Match concepts.","items":[{"icon":"1️⃣","word":"look up (procurar)"},{"icon":"2️⃣","word":"give up (desistir)"},{"icon":"3️⃣","word":"put off (adiar)"}]}'::jsonb, '[]'::jsonb, 'Key vocabulary for Phrasal Verbs I.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 46, '{"prompt":"Listen:","audio_text":"He looked into the matter carefully","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=He+looked+into+the+matter+carefully"}'::jsonb, '[{"text":"Correct","is_correct":true},{"text":"Incorrect","is_correct":false}]'::jsonb, 'B2 audio practice.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 35);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 46, '{"prompt":"Complex sentence:","sentence":"They called off the meeting"}'::jsonb, '[]'::jsonb, 'Advanced sentence building.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 46, '{"prompt":"Which sentence uses phrasal verbs i correctly?","image":"📝"}'::jsonb, '[{"text":"Grammatically perfect","is_correct":true},{"text":"Has a subtle error","is_correct":false},{"text":"Completely wrong","is_correct":false}]'::jsonb, 'Identifying correct usage at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 46, '{"prompt":"Phrasal verbs can be separable or inseparable. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Understanding nuances at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 46, '{"prompt":"Listen and analyze:","audio_text":"We ran out of time","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=We+ran+out+of+time"}'::jsonb, '[{"text":"Correct understanding","is_correct":true},{"text":"False friend","is_correct":false}]'::jsonb, 'B2 comprehension skill.');

    -- ═══════════ UNIT 47 [B2]: Passive Voice ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 47, 'Passive Voice', 'Voz passiva em todos os tempos.', '🔄');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 35);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 47, '{"prompt":"[Passive Voice] Choose the best answer:","image":"📝"}'::jsonb, '[{"text":"Correct interpretation","is_correct":true},{"text":"Common mistake","is_correct":false},{"text":"Literal translation error","is_correct":false}]'::jsonb, 'Understanding Passive Voice requires context and practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 47, '{"prompt":"Form a complex sentence:","sentence":"The bridge was built in 1930"}'::jsonb, '[]'::jsonb, 'Sentence structure at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 47, '{"prompt":"Listen carefully:","audio_text":"The museum was closed for renovation","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+museum+was+closed+for+renovation"}'::jsonb, '[{"text":"Correct meaning","is_correct":true},{"text":"Misleading translation","is_correct":false},{"text":"Opposite meaning","is_correct":false}]'::jsonb, 'B2 listening comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 47, '{"prompt":"''The Mona Lisa was painted by Da Vinci'' is Passive Voice. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'True — this is a key concept at B2 level.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 35);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 47, '{"prompt":"Choose the correct passive voice usage:","image":"📝"}'::jsonb, '[{"text":"Advanced correct form","is_correct":true},{"text":"Beginner mistake","is_correct":false},{"text":"Portuguese interference","is_correct":false}]'::jsonb, 'Passive Voice — must be memorized through exposure.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 47, '{"prompt":"Rearrange:","sentence":"The report will be finished tomorrow"}'::jsonb, '[]'::jsonb, 'Complex word order at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B2', 47, '{"prompt":"Match concepts.","items":[{"icon":"1️⃣","word":"was built (passado)"},{"icon":"2️⃣","word":"is spoken (presente)"},{"icon":"3️⃣","word":"will be done (futuro)"}]}'::jsonb, '[]'::jsonb, 'Key vocabulary for Passive Voice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 47, '{"prompt":"Listen:","audio_text":"English is spoken worldwide","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=English+is+spoken+worldwide"}'::jsonb, '[{"text":"Correct","is_correct":true},{"text":"Incorrect","is_correct":false}]'::jsonb, 'B2 audio practice.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 35);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 47, '{"prompt":"Complex sentence:","sentence":"The cake had been eaten before I arrived"}'::jsonb, '[]'::jsonb, 'Advanced sentence building.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 47, '{"prompt":"Which sentence uses passive voice correctly?","image":"📝"}'::jsonb, '[{"text":"Grammatically perfect","is_correct":true},{"text":"Has a subtle error","is_correct":false},{"text":"Completely wrong","is_correct":false}]'::jsonb, 'Identifying correct usage at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 47, '{"prompt":"''By'' is commonly used in passive voice to indicate the agent. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Understanding nuances at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 47, '{"prompt":"Listen and analyze:","audio_text":"New rules are being implemented","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=New+rules+are+being+implemented"}'::jsonb, '[{"text":"Correct understanding","is_correct":true},{"text":"False friend","is_correct":false}]'::jsonb, 'B2 comprehension skill.');

    -- ═══════════ UNIT 48 [B2]: Reported Speech ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 48, 'Reported Speech', 'Discurso indireto.', '💬');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 36);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 48, '{"prompt":"[Reported Speech] Choose the best answer:","image":"📝"}'::jsonb, '[{"text":"Correct interpretation","is_correct":true},{"text":"Common mistake","is_correct":false},{"text":"Literal translation error","is_correct":false}]'::jsonb, 'Understanding Reported Speech requires context and practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 48, '{"prompt":"Form a complex sentence:","sentence":"She said that she was tired"}'::jsonb, '[]'::jsonb, 'Sentence structure at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 48, '{"prompt":"Listen carefully:","audio_text":"He said he would be late","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=He+said+he+would+be+late"}'::jsonb, '[{"text":"Correct meaning","is_correct":true},{"text":"Misleading translation","is_correct":false},{"text":"Opposite meaning","is_correct":false}]'::jsonb, 'B2 listening comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 48, '{"prompt":"In reported speech, ''will'' changes to ''would''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'True — this is a key concept at B2 level.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 36);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 48, '{"prompt":"Choose the correct reported speech usage:","image":"📝"}'::jsonb, '[{"text":"Advanced correct form","is_correct":true},{"text":"Beginner mistake","is_correct":false},{"text":"Portuguese interference","is_correct":false}]'::jsonb, 'Reported Speech — must be memorized through exposure.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 48, '{"prompt":"Rearrange:","sentence":"He told me he would come later"}'::jsonb, '[]'::jsonb, 'Complex word order at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B2', 48, '{"prompt":"Match concepts.","items":[{"icon":"1️⃣","word":"said (afirmou)"},{"icon":"2️⃣","word":"asked (perguntou)"},{"icon":"3️⃣","word":"told (disse a)"}]}'::jsonb, '[]'::jsonb, 'Key vocabulary for Reported Speech.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 48, '{"prompt":"Listen:","audio_text":"They asked if I had finished","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=They+asked+if+I+had+finished"}'::jsonb, '[{"text":"Correct","is_correct":true},{"text":"Incorrect","is_correct":false}]'::jsonb, 'B2 audio practice.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 36);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 48, '{"prompt":"Complex sentence:","sentence":"She mentioned that prices had gone up"}'::jsonb, '[]'::jsonb, 'Advanced sentence building.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 48, '{"prompt":"Which sentence uses reported speech correctly?","image":"📝"}'::jsonb, '[{"text":"Grammatically perfect","is_correct":true},{"text":"Has a subtle error","is_correct":false},{"text":"Completely wrong","is_correct":false}]'::jsonb, 'Identifying correct usage at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 48, '{"prompt":"In reported speech, tenses typically shift back one step. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Understanding nuances at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 48, '{"prompt":"Listen and analyze:","audio_text":"He denied having seen her","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=He+denied+having+seen+her"}'::jsonb, '[{"text":"Correct understanding","is_correct":true},{"text":"False friend","is_correct":false}]'::jsonb, 'B2 comprehension skill.');

    -- ═══════════ UNIT 49 [B2]: Conditionals II & III ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 49, 'Conditionals II & III', 'Second and Third Conditionals.', '🔀');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 36);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 49, '{"prompt":"[Conditionals II & III] Choose the best answer:","image":"📝"}'::jsonb, '[{"text":"Correct interpretation","is_correct":true},{"text":"Common mistake","is_correct":false},{"text":"Literal translation error","is_correct":false}]'::jsonb, 'Understanding Conditionals II & III requires context and practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 49, '{"prompt":"Form a complex sentence:","sentence":"If I were you I would apologize"}'::jsonb, '[]'::jsonb, 'Sentence structure at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 49, '{"prompt":"Listen carefully:","audio_text":"If I had more time I would travel","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=If+I+had+more+time+I+would+travel"}'::jsonb, '[{"text":"Correct meaning","is_correct":true},{"text":"Misleading translation","is_correct":false},{"text":"Opposite meaning","is_correct":false}]'::jsonb, 'B2 listening comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 49, '{"prompt":"''If I were rich'' uses the subjunctive mood. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'True — this is a key concept at B2 level.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 36);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 49, '{"prompt":"Choose the correct conditionals ii & iii usage:","image":"📝"}'::jsonb, '[{"text":"Advanced correct form","is_correct":true},{"text":"Beginner mistake","is_correct":false},{"text":"Portuguese interference","is_correct":false}]'::jsonb, 'Conditionals II & III — must be memorized through exposure.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 49, '{"prompt":"Rearrange:","sentence":"If she had studied she would have passed"}'::jsonb, '[]'::jsonb, 'Complex word order at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B2', 49, '{"prompt":"Match concepts.","items":[{"icon":"1️⃣","word":"If I were (2nd)"},{"icon":"2️⃣","word":"If I had been (3rd)"},{"icon":"3️⃣","word":"I wish I could"}]}'::jsonb, '[]'::jsonb, 'Key vocabulary for Conditionals II & III.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 49, '{"prompt":"Listen:","audio_text":"I wish I could fly","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=I+wish+I+could+fly"}'::jsonb, '[{"text":"Correct","is_correct":true},{"text":"Incorrect","is_correct":false}]'::jsonb, 'B2 audio practice.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 36);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 49, '{"prompt":"Complex sentence:","sentence":"If only I had known earlier"}'::jsonb, '[]'::jsonb, 'Advanced sentence building.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 49, '{"prompt":"Which sentence uses conditionals ii & iii correctly?","image":"📝"}'::jsonb, '[{"text":"Grammatically perfect","is_correct":true},{"text":"Has a subtle error","is_correct":false},{"text":"Completely wrong","is_correct":false}]'::jsonb, 'Identifying correct usage at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 49, '{"prompt":"The Third Conditional talks about unreal past situations. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Understanding nuances at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 49, '{"prompt":"Listen and analyze:","audio_text":"He behaves as if he owned the place","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=He+behaves+as+if+he+owned+the+place"}'::jsonb, '[{"text":"Correct understanding","is_correct":true},{"text":"False friend","is_correct":false}]'::jsonb, 'B2 comprehension skill.');

    -- ═══════════ UNIT 50 [B2]: Relative Clauses ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 50, 'Relative Clauses', 'Who, which, that, whose, where.', '🔗');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 36);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 50, '{"prompt":"[Relative Clauses] Choose the best answer:","image":"📝"}'::jsonb, '[{"text":"Correct interpretation","is_correct":true},{"text":"Common mistake","is_correct":false},{"text":"Literal translation error","is_correct":false}]'::jsonb, 'Understanding Relative Clauses requires context and practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 50, '{"prompt":"Form a complex sentence:","sentence":"The woman who called is my aunt"}'::jsonb, '[]'::jsonb, 'Sentence structure at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 50, '{"prompt":"Listen carefully:","audio_text":"The woman who lives next door is a doctor","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+woman+who+lives+next+door+is+a+doctor"}'::jsonb, '[{"text":"Correct meaning","is_correct":true},{"text":"Misleading translation","is_correct":false},{"text":"Opposite meaning","is_correct":false}]'::jsonb, 'B2 listening comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 50, '{"prompt":"''Which'' is only used for things, not people. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'True — this is a key concept at B2 level.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 36);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 50, '{"prompt":"Choose the correct relative clauses usage:","image":"📝"}'::jsonb, '[{"text":"Advanced correct form","is_correct":true},{"text":"Beginner mistake","is_correct":false},{"text":"Portuguese interference","is_correct":false}]'::jsonb, 'Relative Clauses — must be memorized through exposure.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 50, '{"prompt":"Rearrange:","sentence":"The book that I read was fascinating"}'::jsonb, '[]'::jsonb, 'Complex word order at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B2', 50, '{"prompt":"Match concepts.","items":[{"icon":"1️⃣","word":"who (pessoa)"},{"icon":"2️⃣","word":"which (coisa)"},{"icon":"3️⃣","word":"where (lugar)"}]}'::jsonb, '[]'::jsonb, 'Key vocabulary for Relative Clauses.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 50, '{"prompt":"Listen:","audio_text":"The city where I grew up is small","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+city+where+I+grew+up+is+small"}'::jsonb, '[{"text":"Correct","is_correct":true},{"text":"Incorrect","is_correct":false}]'::jsonb, 'B2 audio practice.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 36);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 50, '{"prompt":"Complex sentence:","sentence":"The man whose car was stolen called police"}'::jsonb, '[]'::jsonb, 'Advanced sentence building.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 50, '{"prompt":"Which sentence uses relative clauses correctly?","image":"📝"}'::jsonb, '[{"text":"Grammatically perfect","is_correct":true},{"text":"Has a subtle error","is_correct":false},{"text":"Completely wrong","is_correct":false}]'::jsonb, 'Identifying correct usage at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 50, '{"prompt":"''Whose'' is the possessive relative pronoun. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Understanding nuances at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 50, '{"prompt":"Listen and analyze:","audio_text":"This is the reason why I left","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=This+is+the+reason+why+I+left"}'::jsonb, '[{"text":"Correct understanding","is_correct":true},{"text":"False friend","is_correct":false}]'::jsonb, 'B2 comprehension skill.');

    -- ═══════════ UNIT 51 [B2]: Phrasal Verbs II ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 51, 'Phrasal Verbs II', 'Mais verbos frasais avançados.', '📎');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 37);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 51, '{"prompt":"[Phrasal Verbs II] Choose the best answer:","image":"📝"}'::jsonb, '[{"text":"Correct interpretation","is_correct":true},{"text":"Common mistake","is_correct":false},{"text":"Literal translation error","is_correct":false}]'::jsonb, 'Understanding Phrasal Verbs II requires context and practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 51, '{"prompt":"Form a complex sentence:","sentence":"She got over her fear of flying"}'::jsonb, '[]'::jsonb, 'Sentence structure at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 51, '{"prompt":"Listen carefully:","audio_text":"Can you figure out this puzzle","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Can+you+figure+out+this+puzzle"}'::jsonb, '[{"text":"Correct meaning","is_correct":true},{"text":"Misleading translation","is_correct":false},{"text":"Opposite meaning","is_correct":false}]'::jsonb, 'B2 listening comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 51, '{"prompt":"''Give in'' means ''to surrender''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'True — this is a key concept at B2 level.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 37);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 51, '{"prompt":"Choose the correct phrasal verbs ii usage:","image":"📝"}'::jsonb, '[{"text":"Advanced correct form","is_correct":true},{"text":"Beginner mistake","is_correct":false},{"text":"Portuguese interference","is_correct":false}]'::jsonb, 'Phrasal Verbs II — must be memorized through exposure.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 51, '{"prompt":"Rearrange:","sentence":"He brought up an interesting point"}'::jsonb, '[]'::jsonb, 'Complex word order at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B2', 51, '{"prompt":"Match concepts.","items":[{"icon":"1️⃣","word":"break down (quebrar)"},{"icon":"2️⃣","word":"come up with (inventar)"},{"icon":"3️⃣","word":"get along (se dar bem)"}]}'::jsonb, '[]'::jsonb, 'Key vocabulary for Phrasal Verbs II.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 51, '{"prompt":"Listen:","audio_text":"We put off the meeting until Friday","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=We+put+off+the+meeting+until+Friday"}'::jsonb, '[{"text":"Correct","is_correct":true},{"text":"Incorrect","is_correct":false}]'::jsonb, 'B2 audio practice.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 37);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 51, '{"prompt":"Complex sentence:","sentence":"I figured out the answer"}'::jsonb, '[]'::jsonb, 'Advanced sentence building.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 51, '{"prompt":"Which sentence uses phrasal verbs ii correctly?","image":"📝"}'::jsonb, '[{"text":"Grammatically perfect","is_correct":true},{"text":"Has a subtle error","is_correct":false},{"text":"Completely wrong","is_correct":false}]'::jsonb, 'Identifying correct usage at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 51, '{"prompt":"''Put up with'' means ''to tolerate''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Understanding nuances at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 51, '{"prompt":"Listen and analyze:","audio_text":"They broke into the abandoned building","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=They+broke+into+the+abandoned+building"}'::jsonb, '[{"text":"Correct understanding","is_correct":true},{"text":"False friend","is_correct":false}]'::jsonb, 'B2 comprehension skill.');

    -- ═══════════ UNIT 52 [B2]: Formal vs Informal ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 52, 'Formal vs Informal', 'Registro formal e informal.', '📜');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 37);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 52, '{"prompt":"[Formal vs Informal] Choose the best answer:","image":"📝"}'::jsonb, '[{"text":"Correct interpretation","is_correct":true},{"text":"Common mistake","is_correct":false},{"text":"Literal translation error","is_correct":false}]'::jsonb, 'Understanding Formal vs Informal requires context and practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 52, '{"prompt":"Form a complex sentence:","sentence":"I would appreciate your assistance"}'::jsonb, '[]'::jsonb, 'Sentence structure at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 52, '{"prompt":"Listen carefully:","audio_text":"Please do not hesitate to contact us","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Please+do+not+hesitate+to+contact+us"}'::jsonb, '[{"text":"Correct meaning","is_correct":true},{"text":"Misleading translation","is_correct":false},{"text":"Opposite meaning","is_correct":false}]'::jsonb, 'B2 listening comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 52, '{"prompt":"''Regards'' is a formal way to end an email. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'True — this is a key concept at B2 level.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 37);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 52, '{"prompt":"Choose the correct formal vs informal usage:","image":"📝"}'::jsonb, '[{"text":"Advanced correct form","is_correct":true},{"text":"Beginner mistake","is_correct":false},{"text":"Portuguese interference","is_correct":false}]'::jsonb, 'Formal vs Informal — must be memorized through exposure.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 52, '{"prompt":"Rearrange:","sentence":"Please find attached the document"}'::jsonb, '[]'::jsonb, 'Complex word order at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B2', 52, '{"prompt":"Match concepts.","items":[{"icon":"1️⃣","word":"Dear Sir (formal)"},{"icon":"2️⃣","word":"Hey! (informal)"},{"icon":"3️⃣","word":"Regards (formal)"}]}'::jsonb, '[]'::jsonb, 'Key vocabulary for Formal vs Informal.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 52, '{"prompt":"Listen:","audio_text":"I look forward to hearing from you","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=I+look+forward+to+hearing+from+you"}'::jsonb, '[{"text":"Correct","is_correct":true},{"text":"Incorrect","is_correct":false}]'::jsonb, 'B2 audio practice.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 37);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 52, '{"prompt":"Complex sentence:","sentence":"We regret to inform you"}'::jsonb, '[]'::jsonb, 'Advanced sentence building.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 52, '{"prompt":"Which sentence uses formal vs informal correctly?","image":"📝"}'::jsonb, '[{"text":"Grammatically perfect","is_correct":true},{"text":"Has a subtle error","is_correct":false},{"text":"Completely wrong","is_correct":false}]'::jsonb, 'Identifying correct usage at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 52, '{"prompt":"Formal English avoids contractions. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Understanding nuances at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 52, '{"prompt":"Listen and analyze:","audio_text":"Could you possibly send me the report","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Could+you+possibly+send+me+the+report"}'::jsonb, '[{"text":"Correct understanding","is_correct":true},{"text":"False friend","is_correct":false}]'::jsonb, 'B2 comprehension skill.');

    -- ═══════════ UNIT 53 [B2]: Collocations ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 53, 'Collocations', 'Combinações naturais de palavras.', '🧩');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 37);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 53, '{"prompt":"[Collocations] Choose the best answer:","image":"📝"}'::jsonb, '[{"text":"Correct interpretation","is_correct":true},{"text":"Common mistake","is_correct":false},{"text":"Literal translation error","is_correct":false}]'::jsonb, 'Understanding Collocations requires context and practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 53, '{"prompt":"Form a complex sentence:","sentence":"Make a decision"}'::jsonb, '[]'::jsonb, 'Sentence structure at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 53, '{"prompt":"Listen carefully:","audio_text":"We need to pay attention to details","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=We+need+to+pay+attention+to+details"}'::jsonb, '[{"text":"Correct meaning","is_correct":true},{"text":"Misleading translation","is_correct":false},{"text":"Opposite meaning","is_correct":false}]'::jsonb, 'B2 listening comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 53, '{"prompt":"''Make friends'' is a collocation, not ''do friends''. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'True — this is a key concept at B2 level.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 37);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 53, '{"prompt":"Choose the correct collocations usage:","image":"📝"}'::jsonb, '[{"text":"Advanced correct form","is_correct":true},{"text":"Beginner mistake","is_correct":false},{"text":"Portuguese interference","is_correct":false}]'::jsonb, 'Collocations — must be memorized through exposure.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 53, '{"prompt":"Rearrange:","sentence":"Do someone a favor"}'::jsonb, '[]'::jsonb, 'Complex word order at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B2', 53, '{"prompt":"Match concepts.","items":[{"icon":"1️⃣","word":"heavy rain (not strong)"},{"icon":"2️⃣","word":"make progress (not do)"},{"icon":"3️⃣","word":"take a break (not make)"}]}'::jsonb, '[]'::jsonb, 'Key vocabulary for Collocations.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 53, '{"prompt":"Listen:","audio_text":"Take advantage of","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Take+advantage+of"}'::jsonb, '[{"text":"Correct","is_correct":true},{"text":"Incorrect","is_correct":false}]'::jsonb, 'B2 audio practice.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 37);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 53, '{"prompt":"Complex sentence:","sentence":"Pay attention to"}'::jsonb, '[]'::jsonb, 'Advanced sentence building.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 53, '{"prompt":"Which sentence uses collocations correctly?","image":"📝"}'::jsonb, '[{"text":"Grammatically perfect","is_correct":true},{"text":"Has a subtle error","is_correct":false},{"text":"Completely wrong","is_correct":false}]'::jsonb, 'Identifying correct usage at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 53, '{"prompt":"''Strong coffee'' is a natural collocation in English. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Understanding nuances at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 53, '{"prompt":"Listen and analyze:","audio_text":"Keep in mind that","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Keep+in+mind+that"}'::jsonb, '[{"text":"Correct understanding","is_correct":true},{"text":"False friend","is_correct":false}]'::jsonb, 'B2 comprehension skill.');

    -- ═══════════ UNIT 54 [B2]: Reading Comprehension ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 54, 'Reading Comprehension', 'Leitura e interpretação.', '📰');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 38);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 54, '{"prompt":"[Reading Comprehension] Choose the best answer:","image":"📝"}'::jsonb, '[{"text":"Correct interpretation","is_correct":true},{"text":"Common mistake","is_correct":false},{"text":"Literal translation error","is_correct":false}]'::jsonb, 'Understanding Reading Comprehension requires context and practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 54, '{"prompt":"Form a complex sentence:","sentence":"The article discusses climate change"}'::jsonb, '[]'::jsonb, 'Sentence structure at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 54, '{"prompt":"Listen carefully:","audio_text":"The article highlights important issues","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+article+highlights+important+issues"}'::jsonb, '[{"text":"Correct meaning","is_correct":true},{"text":"Misleading translation","is_correct":false},{"text":"Opposite meaning","is_correct":false}]'::jsonb, 'B2 listening comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 54, '{"prompt":"Skimming means reading every word carefully. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'True — this is a key concept at B2 level.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 38);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 54, '{"prompt":"Choose the correct reading comprehension usage:","image":"📝"}'::jsonb, '[{"text":"Advanced correct form","is_correct":true},{"text":"Beginner mistake","is_correct":false},{"text":"Portuguese interference","is_correct":false}]'::jsonb, 'Reading Comprehension — must be memorized through exposure.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 54, '{"prompt":"Rearrange:","sentence":"According to the author"}'::jsonb, '[]'::jsonb, 'Complex word order at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B2', 54, '{"prompt":"Match concepts.","items":[{"icon":"1️⃣","word":"skim (geral)"},{"icon":"2️⃣","word":"scan (específico)"},{"icon":"3️⃣","word":"infer (deduzir)"}]}'::jsonb, '[]'::jsonb, 'Key vocabulary for Reading Comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 54, '{"prompt":"Listen:","audio_text":"The main argument suggests that","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+main+argument+suggests+that"}'::jsonb, '[{"text":"Correct","is_correct":true},{"text":"Incorrect","is_correct":false}]'::jsonb, 'B2 audio practice.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 38);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 54, '{"prompt":"Complex sentence:","sentence":"In conclusion the evidence shows"}'::jsonb, '[]'::jsonb, 'Advanced sentence building.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 54, '{"prompt":"Which sentence uses reading comprehension correctly?","image":"📝"}'::jsonb, '[{"text":"Grammatically perfect","is_correct":true},{"text":"Has a subtle error","is_correct":false},{"text":"Completely wrong","is_correct":false}]'::jsonb, 'Identifying correct usage at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 54, '{"prompt":"Scanning is reading to find specific information. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Understanding nuances at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 54, '{"prompt":"Listen and analyze:","audio_text":"The data supports the hypothesis","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+data+supports+the+hypothesis"}'::jsonb, '[{"text":"Correct understanding","is_correct":true},{"text":"False friend","is_correct":false}]'::jsonb, 'B2 comprehension skill.');

    -- ═══════════ UNIT 55 [B2]: Writing Skills ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 55, 'Writing Skills', 'Escrita estruturada.', '✍️');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 38);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 55, '{"prompt":"[Writing Skills] Choose the best answer:","image":"📝"}'::jsonb, '[{"text":"Correct interpretation","is_correct":true},{"text":"Common mistake","is_correct":false},{"text":"Literal translation error","is_correct":false}]'::jsonb, 'Understanding Writing Skills requires context and practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 55, '{"prompt":"Form a complex sentence:","sentence":"In my opinion this policy is flawed"}'::jsonb, '[]'::jsonb, 'Sentence structure at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 55, '{"prompt":"Listen carefully:","audio_text":"In conclusion I believe education is key","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=In+conclusion+I+believe+education+is+key"}'::jsonb, '[{"text":"Correct meaning","is_correct":true},{"text":"Misleading translation","is_correct":false},{"text":"Opposite meaning","is_correct":false}]'::jsonb, 'B2 listening comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 55, '{"prompt":"A topic sentence usually comes at the beginning of a paragraph. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'True — this is a key concept at B2 level.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 38);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 55, '{"prompt":"Choose the correct writing skills usage:","image":"📝"}'::jsonb, '[{"text":"Advanced correct form","is_correct":true},{"text":"Beginner mistake","is_correct":false},{"text":"Portuguese interference","is_correct":false}]'::jsonb, 'Writing Skills — must be memorized through exposure.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 55, '{"prompt":"Rearrange:","sentence":"On the other hand there are benefits"}'::jsonb, '[]'::jsonb, 'Complex word order at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'matching', 'B2', 55, '{"prompt":"Match concepts.","items":[{"icon":"1️⃣","word":"introduction"},{"icon":"2️⃣","word":"body paragraphs"},{"icon":"3️⃣","word":"conclusion"}]}'::jsonb, '[]'::jsonb, 'Key vocabulary for Writing Skills.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 55, '{"prompt":"Listen:","audio_text":"To sum up the advantages outweigh","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=To+sum+up+the+advantages+outweigh"}'::jsonb, '[{"text":"Correct","is_correct":true},{"text":"Incorrect","is_correct":false}]'::jsonb, 'B2 audio practice.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 38);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'B2', 55, '{"prompt":"Complex sentence:","sentence":"First and foremost we must consider"}'::jsonb, '[]'::jsonb, 'Advanced sentence building.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'B2', 55, '{"prompt":"Which sentence uses writing skills correctly?","image":"📝"}'::jsonb, '[{"text":"Grammatically perfect","is_correct":true},{"text":"Has a subtle error","is_correct":false},{"text":"Completely wrong","is_correct":false}]'::jsonb, 'Identifying correct usage at B2.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'B2', 55, '{"prompt":"Using transition words improves writing coherence. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Understanding nuances at B2 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'B2', 55, '{"prompt":"Listen and analyze:","audio_text":"Taking everything into account","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Taking+everything+into+account"}'::jsonb, '[{"text":"Correct understanding","is_correct":true},{"text":"False friend","is_correct":false}]'::jsonb, 'B2 comprehension skill.');

    -- ═══════════ UNIT 56 [C1]: Advanced Conditionals ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 56, 'Advanced Conditionals', 'Mixed conditionals e inversão.', '🔀');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 38);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 56, '{"prompt":"Form this advanced sentence:","sentence":"Had I known about the delay I would have left earlier"}'::jsonb, '[]'::jsonb, 'C1 grammar: Advanced Conditionals.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 56, '{"prompt":"Which uses advanced conditionals correctly?","image":"🎯"}'::jsonb, '[{"text":"Had I known about the delay I would have left earlier","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 56, '{"prompt":"Listen to this C1-level sentence:","audio_text":"Were it not for your help I would have failed","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Were+it+not+for+your+help+I+would+have+failed"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 56, '{"prompt":"Advanced Conditionals is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Advanced Conditionals is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 38);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 56, '{"prompt":"Form this advanced sentence:","sentence":"Were it not for your help I would have failed"}'::jsonb, '[]'::jsonb, 'C1 grammar: Advanced Conditionals.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 56, '{"prompt":"Which uses advanced conditionals correctly?","image":"🎯"}'::jsonb, '[{"text":"Were it not for your help I would have failed","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 56, '{"prompt":"Listen to this C1-level sentence:","audio_text":"Should you need assistance do not hesitate to ask","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Should+you+need+assistance+do+not+hesitate+to+ask"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 56, '{"prompt":"Advanced Conditionals is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Advanced Conditionals is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 38);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 56, '{"prompt":"Form this advanced sentence:","sentence":"Should you need assistance do not hesitate to ask"}'::jsonb, '[]'::jsonb, 'C1 grammar: Advanced Conditionals.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 56, '{"prompt":"Which uses advanced conditionals correctly?","image":"🎯"}'::jsonb, '[{"text":"Should you need assistance do not hesitate to ask","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 56, '{"prompt":"Listen to this C1-level sentence:","audio_text":"Had I known about the delay I would have left earlier","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Had+I+known+about+the+delay+I+would+have+left+earlier"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 56, '{"prompt":"Advanced Conditionals is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Advanced Conditionals is a C1-level skill.');

    -- ═══════════ UNIT 57 [C1]: Cleft Sentences ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 57, 'Cleft Sentences', 'Ênfase com ''It is/was... that''.', '🎯');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 39);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 57, '{"prompt":"Form this advanced sentence:","sentence":"It was John who broke the window"}'::jsonb, '[]'::jsonb, 'C1 grammar: Cleft Sentences.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 57, '{"prompt":"Which uses cleft sentences correctly?","image":"🎯"}'::jsonb, '[{"text":"It was John who broke the window","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 57, '{"prompt":"Listen to this C1-level sentence:","audio_text":"What I need is more time to prepare","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=What+I+need+is+more+time+to+prepare"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 57, '{"prompt":"Cleft Sentences is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Cleft Sentences is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 39);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 57, '{"prompt":"Form this advanced sentence:","sentence":"What I need is more time to prepare"}'::jsonb, '[]'::jsonb, 'C1 grammar: Cleft Sentences.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 57, '{"prompt":"Which uses cleft sentences correctly?","image":"🎯"}'::jsonb, '[{"text":"What I need is more time to prepare","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 57, '{"prompt":"Listen to this C1-level sentence:","audio_text":"All I want is a peaceful life","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=All+I+want+is+a+peaceful+life"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 57, '{"prompt":"Cleft Sentences is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Cleft Sentences is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 39);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 57, '{"prompt":"Form this advanced sentence:","sentence":"All I want is a peaceful life"}'::jsonb, '[]'::jsonb, 'C1 grammar: Cleft Sentences.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 57, '{"prompt":"Which uses cleft sentences correctly?","image":"🎯"}'::jsonb, '[{"text":"All I want is a peaceful life","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 57, '{"prompt":"Listen to this C1-level sentence:","audio_text":"It was John who broke the window","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=It+was+John+who+broke+the+window"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 57, '{"prompt":"Cleft Sentences is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Cleft Sentences is a C1-level skill.');

    -- ═══════════ UNIT 58 [C1]: Inversion ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 58, 'Inversion', 'Inversão para ênfase.', '🔃');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 39);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 58, '{"prompt":"Form this advanced sentence:","sentence":"Never have I seen such beauty"}'::jsonb, '[]'::jsonb, 'C1 grammar: Inversion.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 58, '{"prompt":"Which uses inversion correctly?","image":"🎯"}'::jsonb, '[{"text":"Never have I seen such beauty","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 58, '{"prompt":"Listen to this C1-level sentence:","audio_text":"Rarely does he make mistakes","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Rarely+does+he+make+mistakes"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 58, '{"prompt":"Inversion is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Inversion is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 39);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 58, '{"prompt":"Form this advanced sentence:","sentence":"Rarely does he make mistakes"}'::jsonb, '[]'::jsonb, 'C1 grammar: Inversion.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 58, '{"prompt":"Which uses inversion correctly?","image":"🎯"}'::jsonb, '[{"text":"Rarely does he make mistakes","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 58, '{"prompt":"Listen to this C1-level sentence:","audio_text":"Not only did she win but she broke the record","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Not+only+did+she+win+but+she+broke+the+record"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 58, '{"prompt":"Inversion is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Inversion is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 39);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 58, '{"prompt":"Form this advanced sentence:","sentence":"Not only did she win but she broke the record"}'::jsonb, '[]'::jsonb, 'C1 grammar: Inversion.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 58, '{"prompt":"Which uses inversion correctly?","image":"🎯"}'::jsonb, '[{"text":"Not only did she win but she broke the record","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 58, '{"prompt":"Listen to this C1-level sentence:","audio_text":"Never have I seen such beauty","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Never+have+I+seen+such+beauty"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 58, '{"prompt":"Inversion is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Inversion is a C1-level skill.');

    -- ═══════════ UNIT 59 [C1]: Advanced Passives ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 59, 'Advanced Passives', 'Have something done, get.', '🔧');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 39);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 59, '{"prompt":"Form this advanced sentence:","sentence":"I had my car repaired last week"}'::jsonb, '[]'::jsonb, 'C1 grammar: Advanced Passives.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 59, '{"prompt":"Which uses advanced passives correctly?","image":"🎯"}'::jsonb, '[{"text":"I had my car repaired last week","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 59, '{"prompt":"Listen to this C1-level sentence:","audio_text":"She got her hair cut yesterday","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=She+got+her+hair+cut+yesterday"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 59, '{"prompt":"Advanced Passives is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Advanced Passives is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 39);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 59, '{"prompt":"Form this advanced sentence:","sentence":"She got her hair cut yesterday"}'::jsonb, '[]'::jsonb, 'C1 grammar: Advanced Passives.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 59, '{"prompt":"Which uses advanced passives correctly?","image":"🎯"}'::jsonb, '[{"text":"She got her hair cut yesterday","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 59, '{"prompt":"Listen to this C1-level sentence:","audio_text":"We need to have the roof fixed","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=We+need+to+have+the+roof+fixed"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 59, '{"prompt":"Advanced Passives is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Advanced Passives is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 39);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 59, '{"prompt":"Form this advanced sentence:","sentence":"We need to have the roof fixed"}'::jsonb, '[]'::jsonb, 'C1 grammar: Advanced Passives.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 59, '{"prompt":"Which uses advanced passives correctly?","image":"🎯"}'::jsonb, '[{"text":"We need to have the roof fixed","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 59, '{"prompt":"Listen to this C1-level sentence:","audio_text":"I had my car repaired last week","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=I+had+my+car+repaired+last+week"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 59, '{"prompt":"Advanced Passives is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Advanced Passives is a C1-level skill.');

    -- ═══════════ UNIT 60 [C1]: Discourse Markers ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 60, 'Discourse Markers', 'Marcadores de discurso avançado.', '📌');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 40);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 60, '{"prompt":"Form this advanced sentence:","sentence":"As a matter of fact I agree with you"}'::jsonb, '[]'::jsonb, 'C1 grammar: Discourse Markers.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 60, '{"prompt":"Which uses discourse markers correctly?","image":"🎯"}'::jsonb, '[{"text":"As a matter of fact I agree with you","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 60, '{"prompt":"Listen to this C1-level sentence:","audio_text":"On the whole the project was successful","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=On+the+whole+the+project+was+successful"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 60, '{"prompt":"Discourse Markers is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Discourse Markers is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 40);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 60, '{"prompt":"Form this advanced sentence:","sentence":"On the whole the project was successful"}'::jsonb, '[]'::jsonb, 'C1 grammar: Discourse Markers.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 60, '{"prompt":"Which uses discourse markers correctly?","image":"🎯"}'::jsonb, '[{"text":"On the whole the project was successful","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 60, '{"prompt":"Listen to this C1-level sentence:","audio_text":"By and large the results were positive","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=By+and+large+the+results+were+positive"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 60, '{"prompt":"Discourse Markers is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Discourse Markers is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 40);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 60, '{"prompt":"Form this advanced sentence:","sentence":"By and large the results were positive"}'::jsonb, '[]'::jsonb, 'C1 grammar: Discourse Markers.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 60, '{"prompt":"Which uses discourse markers correctly?","image":"🎯"}'::jsonb, '[{"text":"By and large the results were positive","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 60, '{"prompt":"Listen to this C1-level sentence:","audio_text":"As a matter of fact I agree with you","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=As+a+matter+of+fact+I+agree+with+you"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 60, '{"prompt":"Discourse Markers is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Discourse Markers is a C1-level skill.');

    -- ═══════════ UNIT 61 [C1]: Hedging Language ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 61, 'Hedging Language', 'Linguagem de cautela e probabilidade.', '🛡️');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 40);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 61, '{"prompt":"Form this advanced sentence:","sentence":"It would appear that the data is inconclusive"}'::jsonb, '[]'::jsonb, 'C1 grammar: Hedging Language.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 61, '{"prompt":"Which uses hedging language correctly?","image":"🎯"}'::jsonb, '[{"text":"It would appear that the data is inconclusive","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 61, '{"prompt":"Listen to this C1-level sentence:","audio_text":"The evidence seems to suggest otherwise","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+evidence+seems+to+suggest+otherwise"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 61, '{"prompt":"Hedging Language is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Hedging Language is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 40);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 61, '{"prompt":"Form this advanced sentence:","sentence":"The evidence seems to suggest otherwise"}'::jsonb, '[]'::jsonb, 'C1 grammar: Hedging Language.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 61, '{"prompt":"Which uses hedging language correctly?","image":"🎯"}'::jsonb, '[{"text":"The evidence seems to suggest otherwise","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 61, '{"prompt":"Listen to this C1-level sentence:","audio_text":"It is widely believed that exercise helps","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=It+is+widely+believed+that+exercise+helps"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 61, '{"prompt":"Hedging Language is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Hedging Language is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 40);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 61, '{"prompt":"Form this advanced sentence:","sentence":"It is widely believed that exercise helps"}'::jsonb, '[]'::jsonb, 'C1 grammar: Hedging Language.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 61, '{"prompt":"Which uses hedging language correctly?","image":"🎯"}'::jsonb, '[{"text":"It is widely believed that exercise helps","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 61, '{"prompt":"Listen to this C1-level sentence:","audio_text":"It would appear that the data is inconclusive","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=It+would+appear+that+the+data+is+inconclusive"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 61, '{"prompt":"Hedging Language is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Hedging Language is a C1-level skill.');

    -- ═══════════ UNIT 62 [C1]: Academic Writing ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 62, 'Academic Writing', 'Escrita acadêmica e argumentação.', '🎓');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 40);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 62, '{"prompt":"Form this advanced sentence:","sentence":"This essay will argue that technology transforms education"}'::jsonb, '[]'::jsonb, 'C1 grammar: Academic Writing.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 62, '{"prompt":"Which uses academic writing correctly?","image":"🎯"}'::jsonb, '[{"text":"This essay will argue that technology transforms education","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 62, '{"prompt":"Listen to this C1-level sentence:","audio_text":"Furthermore the research demonstrates clear benefits","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Furthermore+the+research+demonstrates+clear+benefits"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 62, '{"prompt":"Academic Writing is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Academic Writing is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 40);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 62, '{"prompt":"Form this advanced sentence:","sentence":"Furthermore the research demonstrates clear benefits"}'::jsonb, '[]'::jsonb, 'C1 grammar: Academic Writing.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 62, '{"prompt":"Which uses academic writing correctly?","image":"🎯"}'::jsonb, '[{"text":"Furthermore the research demonstrates clear benefits","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 62, '{"prompt":"Listen to this C1-level sentence:","audio_text":"In light of the evidence it is reasonable to conclude","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=In+light+of+the+evidence+it+is+reasonable+to+conclude"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 62, '{"prompt":"Academic Writing is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Academic Writing is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 40);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 62, '{"prompt":"Form this advanced sentence:","sentence":"In light of the evidence it is reasonable to conclude"}'::jsonb, '[]'::jsonb, 'C1 grammar: Academic Writing.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 62, '{"prompt":"Which uses academic writing correctly?","image":"🎯"}'::jsonb, '[{"text":"In light of the evidence it is reasonable to conclude","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 62, '{"prompt":"Listen to this C1-level sentence:","audio_text":"This essay will argue that technology transforms education","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=This+essay+will+argue+that+technology+transforms+education"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 62, '{"prompt":"Academic Writing is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Academic Writing is a C1-level skill.');

    -- ═══════════ UNIT 63 [C1]: Idioms & Expressions ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 63, 'Idioms & Expressions', 'Expressões idiomáticas avançadas.', '🗣️');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 41);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 63, '{"prompt":"Form this advanced sentence:","sentence":"Break the ice means to start a conversation"}'::jsonb, '[]'::jsonb, 'C1 grammar: Idioms & Expressions.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 63, '{"prompt":"Which uses idioms & expressions correctly?","image":"🎯"}'::jsonb, '[{"text":"Break the ice means to start a conversation","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 63, '{"prompt":"Listen to this C1-level sentence:","audio_text":"Hit the nail on the head means to be exactly right","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Hit+the+nail+on+the+head+means+to+be+exactly+right"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 63, '{"prompt":"Idioms & Expressions is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Idioms & Expressions is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 41);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 63, '{"prompt":"Form this advanced sentence:","sentence":"Hit the nail on the head means to be exactly right"}'::jsonb, '[]'::jsonb, 'C1 grammar: Idioms & Expressions.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 63, '{"prompt":"Which uses idioms & expressions correctly?","image":"🎯"}'::jsonb, '[{"text":"Hit the nail on the head means to be exactly right","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 63, '{"prompt":"Listen to this C1-level sentence:","audio_text":"The ball is in your court means it is your decision","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+ball+is+in+your+court+means+it+is+your+decision"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 63, '{"prompt":"Idioms & Expressions is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Idioms & Expressions is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 41);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 63, '{"prompt":"Form this advanced sentence:","sentence":"The ball is in your court means it is your decision"}'::jsonb, '[]'::jsonb, 'C1 grammar: Idioms & Expressions.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 63, '{"prompt":"Which uses idioms & expressions correctly?","image":"🎯"}'::jsonb, '[{"text":"The ball is in your court means it is your decision","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 63, '{"prompt":"Listen to this C1-level sentence:","audio_text":"Break the ice means to start a conversation","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Break+the+ice+means+to+start+a+conversation"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 63, '{"prompt":"Idioms & Expressions is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Idioms & Expressions is a C1-level skill.');

    -- ═══════════ UNIT 64 [C1]: Register & Tone ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 64, 'Register & Tone', 'Ajustando o tom da comunicação.', '🎭');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 41);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 64, '{"prompt":"Form this advanced sentence:","sentence":"The formal register requires complex sentence structures"}'::jsonb, '[]'::jsonb, 'C1 grammar: Register & Tone.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 64, '{"prompt":"Which uses register & tone correctly?","image":"🎯"}'::jsonb, '[{"text":"The formal register requires complex sentence structures","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 64, '{"prompt":"Listen to this C1-level sentence:","audio_text":"Colloquial language uses contractions and slang","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=Colloquial+language+uses+contractions+and+slang"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 64, '{"prompt":"Register & Tone is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Register & Tone is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 41);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 64, '{"prompt":"Form this advanced sentence:","sentence":"Colloquial language uses contractions and slang"}'::jsonb, '[]'::jsonb, 'C1 grammar: Register & Tone.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 64, '{"prompt":"Which uses register & tone correctly?","image":"🎯"}'::jsonb, '[{"text":"Colloquial language uses contractions and slang","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 64, '{"prompt":"Listen to this C1-level sentence:","audio_text":"The tone should match the audience and purpose","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+tone+should+match+the+audience+and+purpose"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 64, '{"prompt":"Register & Tone is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Register & Tone is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 41);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 64, '{"prompt":"Form this advanced sentence:","sentence":"The tone should match the audience and purpose"}'::jsonb, '[]'::jsonb, 'C1 grammar: Register & Tone.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 64, '{"prompt":"Which uses register & tone correctly?","image":"🎯"}'::jsonb, '[{"text":"The tone should match the audience and purpose","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 64, '{"prompt":"Listen to this C1-level sentence:","audio_text":"The formal register requires complex sentence structures","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+formal+register+requires+complex+sentence+structures"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 64, '{"prompt":"Register & Tone is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Register & Tone is a C1-level skill.');

    -- ═══════════ UNIT 65 [C1]: Critical Thinking ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 65, 'Critical Thinking', 'Análise crítica de textos.', '🧠');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 41);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 65, '{"prompt":"Form this advanced sentence:","sentence":"The author implies rather than states directly"}'::jsonb, '[]'::jsonb, 'C1 grammar: Critical Thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 65, '{"prompt":"Which uses critical thinking correctly?","image":"🎯"}'::jsonb, '[{"text":"The author implies rather than states directly","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 65, '{"prompt":"Listen to this C1-level sentence:","audio_text":"This argument contains a logical fallacy","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=This+argument+contains+a+logical+fallacy"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 65, '{"prompt":"Critical Thinking is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Critical Thinking is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 41);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 65, '{"prompt":"Form this advanced sentence:","sentence":"This argument contains a logical fallacy"}'::jsonb, '[]'::jsonb, 'C1 grammar: Critical Thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 65, '{"prompt":"Which uses critical thinking correctly?","image":"🎯"}'::jsonb, '[{"text":"This argument contains a logical fallacy","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 65, '{"prompt":"Listen to this C1-level sentence:","audio_text":"The evidence contradicts the initial hypothesis","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+evidence+contradicts+the+initial+hypothesis"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 65, '{"prompt":"Critical Thinking is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Critical Thinking is a C1-level skill.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 41);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C1', 65, '{"prompt":"Form this advanced sentence:","sentence":"The evidence contradicts the initial hypothesis"}'::jsonb, '[]'::jsonb, 'C1 grammar: Critical Thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C1', 65, '{"prompt":"Which uses critical thinking correctly?","image":"🎯"}'::jsonb, '[{"text":"The evidence contradicts the initial hypothesis","is_correct":true},{"text":"Incorrect variation","is_correct":false},{"text":"Common learner error","is_correct":false}]'::jsonb, 'Advanced grammar at C1 level.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'audio', 'C1', 65, '{"prompt":"Listen to this C1-level sentence:","audio_text":"The author implies rather than states directly","audio_url":"https://dict.youdao.com/dictvoice?type=2&audio=The+author+implies+rather+than+states+directly"}'::jsonb, '[{"text":"Correct analysis","is_correct":true},{"text":"Misinterpretation","is_correct":false}]'::jsonb, 'C1 listening and comprehension.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C1', 65, '{"prompt":"Critical Thinking is a feature of advanced English (C1+). True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'Yes, Critical Thinking is a C1-level skill.');

    -- ═══════════ UNIT 66 [C2]: Literary Analysis ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 66, 'Literary Analysis', 'Análise literária avançada.', '📚');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 42);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 66, '{"prompt":"Form this C2-level sentence:","sentence":"The author employs irony to subvert expectations"}'::jsonb, '[]'::jsonb, 'C2 mastery: Literary Analysis.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 66, '{"prompt":"Analyze this literary analysis concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 66, '{"prompt":"Say aloud:","audio_text":"This metaphor suggests a deeper meaning","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 66, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 42);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 66, '{"prompt":"Form this C2-level sentence:","sentence":"This metaphor suggests a deeper meaning"}'::jsonb, '[]'::jsonb, 'C2 mastery: Literary Analysis.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 66, '{"prompt":"Analyze this literary analysis concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 66, '{"prompt":"Say aloud:","audio_text":"The narrative unreliable narrator creates tension","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 66, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 42);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 66, '{"prompt":"Form this C2-level sentence:","sentence":"The narrative unreliable narrator creates tension"}'::jsonb, '[]'::jsonb, 'C2 mastery: Literary Analysis.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 66, '{"prompt":"Analyze this literary analysis concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 66, '{"prompt":"Say aloud:","audio_text":"The author employs irony to subvert expectations","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 66, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    -- ═══════════ UNIT 67 [C2]: Rhetoric & Persuasion ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 67, 'Rhetoric & Persuasion', 'Técnicas retóricas.', '🎤');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 42);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 67, '{"prompt":"Form this C2-level sentence:","sentence":"The speaker uses ethos to establish credibility"}'::jsonb, '[]'::jsonb, 'C2 mastery: Rhetoric & Persuasion.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 67, '{"prompt":"Analyze this rhetoric & persuasion concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 67, '{"prompt":"Say aloud:","audio_text":"Repetition reinforces the emotional appeal","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 67, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 42);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 67, '{"prompt":"Form this C2-level sentence:","sentence":"Repetition reinforces the emotional appeal"}'::jsonb, '[]'::jsonb, 'C2 mastery: Rhetoric & Persuasion.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 67, '{"prompt":"Analyze this rhetoric & persuasion concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 67, '{"prompt":"Say aloud:","audio_text":"The rhetorical question challenges the audience","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 67, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 42);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 67, '{"prompt":"Form this C2-level sentence:","sentence":"The rhetorical question challenges the audience"}'::jsonb, '[]'::jsonb, 'C2 mastery: Rhetoric & Persuasion.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 67, '{"prompt":"Analyze this rhetoric & persuasion concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 67, '{"prompt":"Say aloud:","audio_text":"The speaker uses ethos to establish credibility","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 67, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    -- ═══════════ UNIT 68 [C2]: Nuance & Ambiguity ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 68, 'Nuance & Ambiguity', 'Sutileza e ambiguidade.', '🔍');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 42);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 68, '{"prompt":"Form this C2-level sentence:","sentence":"The word suggests multiple interpretations"}'::jsonb, '[]'::jsonb, 'C2 mastery: Nuance & Ambiguity.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 68, '{"prompt":"Analyze this nuance & ambiguity concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 68, '{"prompt":"Say aloud:","audio_text":"Context determines the intended meaning","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 68, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 42);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 68, '{"prompt":"Form this C2-level sentence:","sentence":"Context determines the intended meaning"}'::jsonb, '[]'::jsonb, 'C2 mastery: Nuance & Ambiguity.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 68, '{"prompt":"Analyze this nuance & ambiguity concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 68, '{"prompt":"Say aloud:","audio_text":"Ambiguity can be a deliberate stylistic choice","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 68, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 42);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 68, '{"prompt":"Form this C2-level sentence:","sentence":"Ambiguity can be a deliberate stylistic choice"}'::jsonb, '[]'::jsonb, 'C2 mastery: Nuance & Ambiguity.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 68, '{"prompt":"Analyze this nuance & ambiguity concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 68, '{"prompt":"Say aloud:","audio_text":"The word suggests multiple interpretations","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 68, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    -- ═══════════ UNIT 69 [C2]: Cultural Fluency ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 69, 'Cultural Fluency', 'Competência cultural profunda.', '🌍');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 43);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 69, '{"prompt":"Form this C2-level sentence:","sentence":"This idiom has no direct equivalent in Portuguese"}'::jsonb, '[]'::jsonb, 'C2 mastery: Cultural Fluency.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 69, '{"prompt":"Analyze this cultural fluency concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 69, '{"prompt":"Say aloud:","audio_text":"Understanding humor requires cultural context","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 69, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 43);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 69, '{"prompt":"Form this C2-level sentence:","sentence":"Understanding humor requires cultural context"}'::jsonb, '[]'::jsonb, 'C2 mastery: Cultural Fluency.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 69, '{"prompt":"Analyze this cultural fluency concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 69, '{"prompt":"Say aloud:","audio_text":"Language reflects the values of its speakers","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 69, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 43);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 69, '{"prompt":"Form this C2-level sentence:","sentence":"Language reflects the values of its speakers"}'::jsonb, '[]'::jsonb, 'C2 mastery: Cultural Fluency.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 69, '{"prompt":"Analyze this cultural fluency concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 69, '{"prompt":"Say aloud:","audio_text":"This idiom has no direct equivalent in Portuguese","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 69, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    -- ═══════════ UNIT 70 [C2]: Legendary Pipo ═══════════
    u_id := gen_random_uuid();
    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)
    VALUES (u_id, 70, 'Legendary Pipo', 'O desafio final do Pipo!', '🏆');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 1, 'Part 1', 43);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 70, '{"prompt":"Form this C2-level sentence:","sentence":"Mastery means understanding what is left unsaid"}'::jsonb, '[]'::jsonb, 'C2 mastery: Legendary Pipo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 70, '{"prompt":"Analyze this legendary pipo concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 70, '{"prompt":"Say aloud:","audio_text":"True fluency is thinking in the language","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 70, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 2, 'Part 2', 43);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 70, '{"prompt":"Form this C2-level sentence:","sentence":"True fluency is thinking in the language"}'::jsonb, '[]'::jsonb, 'C2 mastery: Legendary Pipo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 70, '{"prompt":"Analyze this legendary pipo concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 70, '{"prompt":"Say aloud:","audio_text":"Pipo has reached legendary English mastery","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 70, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

    l_id := gen_random_uuid();
    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)
    VALUES (l_id, u_id, 3, 'Part 3', 43);
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'ordering', 'C2', 70, '{"prompt":"Form this C2-level sentence:","sentence":"Pipo has reached legendary English mastery"}'::jsonb, '[]'::jsonb, 'C2 mastery: Legendary Pipo.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'selection', 'C2', 70, '{"prompt":"Analyze this legendary pipo concept:","image":"🏆"}'::jsonb, '[{"text":"Nuanced correct analysis","is_correct":true},{"text":"Superficial interpretation","is_correct":false},{"text":"Literal misreading","is_correct":false}]'::jsonb, 'C2 requires deep analytical thinking.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'speaking', 'C2', 70, '{"prompt":"Say aloud:","audio_text":"Mastery means understanding what is left unsaid","image":"🎙️"}'::jsonb, '[]'::jsonb, 'C2 pronunciation and fluency practice.');
    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)
    VALUES (l_id, 'tf', 'C2', 70, '{"prompt":"At C2 level, a speaker can handle virtually any communicative situation. True or False?"}'::jsonb, '[{"text":"True","is_correct":true},{"text":"False","is_correct":false}]'::jsonb, 'C2 = near-native proficiency.');

END $$;
