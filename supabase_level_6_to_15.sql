-- =============================================
-- PIPO APP - Perguntas Adicionais (Níveis 6 ao 15)
-- Adicione estas perguntas no SQL Editor do Supabase
-- =============================================

INSERT INTO public.questions (level, category, question, options, correct_index, explanation, xp_reward) VALUES
-- Nível 6: Viagens e Tecnologia
(6, 'vocabulary', 'What do you call the document needed to travel to another country?', '["ID Card", "Passport", "Ticket", "License"]', 1, 'Para viajar internacionalmente, você precisa de um "Passport" (passaporte)!', 25),
(6, 'vocabulary', 'What is the person who flies an airplane called?', '["Driver", "Captain", "Pilot", "Engineer"]', 2, 'Quem pilota aviões é o "Pilot"!', 25),
(6, 'phrases', 'What does "Check-in" mean at an airport?', '["Sair do avião", "Registrar-se para o voo", "Comprar comida", "Perder o voo"]', 1, '"Check-in" é o processo de registro antes de embarcar.', 25),
(6, 'grammar', 'Complete: "I have ___ this movie three times."', '["see", "saw", "seen", "seeing"]', 2, 'Present Perfect: have + seen (particípio de see)!', 25),
(6, 'technology', 'What does "Wireless" mean?', '["Sem fio", "Com fio", "Quebrado", "Lento"]', 0, '"Wireless" significa sem fios (usando ondas de rádio).', 25),

-- Nível 7: Saúde e Meio Ambiente
(7, 'vocabulary', 'What do you call a person who treats your teeth?', '["Doctor", "Nurse", "Dentist", "Pharmacist"]', 2, 'O profissional que cuida dos dentes é o "Dentist"!', 30),
(7, 'vocabulary', 'Which of these is a vegetable?', '["Apple", "Chicken", "Carrot", "Bread"]', 2, '"Carrot" (cenoura) é um vegetal!', 30),
(7, 'environment', 'What does "Global Warming" mean?', '["Inverno rigoroso", "Aquecimento Global", "Chuva ácida", "Vento solar"]', 1, 'Global Warming = Aquecimento Global.', 30),
(7, 'grammar', 'Complete: "If it rains, we ___ stay home."', '["would", "will", "did", "was"]', 1, 'Primeira condicional: If + Presente, Will + Base!', 30),
(7, 'phrases', 'What does "Take care" mean?', '["Tome conta", "Se cuide", "Tenha pressa", "Olhe para trás"]', 1, '"Take care" é uma forma comum de dizer "se cuide".', 30),

-- Nível 8: Trabalho e Negócios
(8, 'vocabulary', 'What is a "Meeting"?', '["Festa", "Reunião", "Viagem", "Descanso"]', 1, '"Meeting" é uma reunião de trabalho ou encontro.', 35),
(8, 'vocabulary', 'What do you call the money you receive for your work?', '["Gift", "Tax", "Salary", "Loan"]', 2, '"Salary" é o salário recebido pelo trabalho.', 35),
(8, 'business', 'What does "CEO" stand for?', '["Chief Energy Officer", "Chief Executive Officer", "Central Executive Office", "Chief Every Officer"]', 1, '"CEO" é o Diretor Executivo (Chief Executive Officer).', 35),
(8, 'grammar', 'Which sentence is in the Passive Voice?', '["The cat ate the fish", "The fish was eaten by the cat", "The cat is eating fish", "The fish eats"]', 1, '"The fish was eaten" está na voz passiva (sofre a ação).', 35),
(8, 'phrases', 'What does "ASAP" mean?', '["As Soon As Possible", "Always Say Always Please", "All Systems Are Perfect", "As Simple As Possible"]', 0, 'ASAP = O mais rápido possível!', 35),

-- Nível 9: Mídia Social e Comunicação
(9, 'vocabulary', 'What does "To upload" mean?', '["Baixar um arquivo", "Enviar um arquivo para a internet", "Deletar um arquivo", "Editar um arquivo"]', 1, 'Upload = Enviar/Subir um arquivo.', 40),
(9, 'vocabulary', 'What is a "Follower"?', '["Líder", "Seguidor", "Amigo", "Inimigo"]', 1, 'Nas redes sociais, "Follower" é um seguidor.', 40),
(9, 'phrases', 'What does "To tag someone" mean?', '["Morder alguém", "Mencionar/Marcar alguém", "Empurrar alguém", "Seguir alguém"]', 1, 'Tagging = Marcar ou mencionar alguém em um post.', 40),
(9, 'grammar', 'Complete: "I wish I ___ more money."', '["have", "has", "had", "am having"]', 2, 'Para desejos irreais no presente, usamos o passado: I wish I had.', 40),
(9, 'idioms', 'What does "Piece of cake" mean?', '["Um pedaço de bolo", "Algo muito fácil", "Algo muito gostoso", "Algo caro"]', 1, 'Piece of cake = "Moleza" ou algo muito fácil.', 40),

-- Nível 10: Phrasal Verbs (Básico)
(10, 'phrasal_verbs', 'What does "Wake up" mean?', '["Levantar-se", "Acordar", "Dormir", "Comer"]', 1, '"Wake up" é o ato de acordar. (Levantar é "get up").', 45),
(10, 'phrasal_verbs', 'What does "Give up" mean?', '["Dar algo para cima", "Desistir", "Continuar", "Subir"]', 1, '"Give up" significa desistir.', 45),
(10, 'phrasal_verbs', 'Complete: "Please, ___ the lights before leaving."', '["turn on", "turn off", "turn up", "turn down"]', 1, '"Turn off" = desligar (as luzes).', 45),
(10, 'grammar', 'Complete: "By this time tomorrow, I ___ finished my work."', '["will", "will have", "have", "going to"]', 1, 'Future Perfect: Will have + Particípio!', 45),
(10, 'vocabulary', 'What is an "Intern"?', '["Chefe", "Estagiário", "Cliente", "Sócio"]', 1, '"Intern" é um estagiário.', 45),

-- Nível 11: Idioms e Frases Feitas
(11, 'idioms', 'What does "Under the weather" mean?', '["Embaixo da chuva", "Sentindo-se mal/doente", "Feliz com o sol", "Viajando"]', 1, 'Estar "under the weather" significa estar indisposto ou doentinho.', 50),
(11, 'idioms', 'What does "Break the ice" mean?', '["Quebrar o gelo (iniciar conversa)", "Destruir algo", "Esfriar a bebida", "Gritar"]', 0, '"Break the ice" = Iniciar uma conversa em um clima tenso.', 50),
(11, 'vocabulary', 'What is a "Scholarship"?', '["Uma escola em um navio", "Uma bolsa de estudos", "Um livro antigo", "Um professor"]', 1, '"Scholarship" é uma bolsa de estudos.', 50),
(11, 'grammar', 'Which is a Third Conditional sentence?', '["If I win, I buy it", "If I won, I would buy it", "If I had won, I would have bought it", "If I win, I bought it"]', 2, 'Third Conditional: If + Past Perfect, Would have + Particípio.', 50),
(11, 'phrasal_verbs', 'What does "Look after" mean?', '["Olhar para trás", "Cuidar de algo/alguém", "Procurar algo", "Ignorar"]', 1, '"Look after" = Cuidar.', 50),

-- Nível 12: Inglês Acadêmico e Ciência
(12, 'vocabulary', 'What is a "Hypothesis"?', '["Uma verdade absoluta", "Uma suposição/teoria inicial", "Um resultado final", "Um livro de ciências"]', 1, '"Hypothesis" é uma hipótese ou teoria a ser testada.', 55),
(12, 'vocabulary', 'What does "Analysis" mean?', '["Análise", "Anular", "Analogia", "Anoitecer"]', 0, '"Analysis" = Análise detalhada.', 55),
(12, 'science', 'What is "Gravity"?', '["Velocidade", "Gravidade", "Peso", "Espaço"]', 1, '"Gravity" = Gravidade.', 55),
(12, 'grammar', 'Complete: "Hardly ___ I entered when the phone rang."', '["I had", "had I", "did I", "I did"]', 1, 'Inversão para ênfase: Hardly + auxiliar + sujeito!', 35),
(12, 'phrasal_verbs', 'What does "Carry out" mean?', '["Carregar para fora", "Executar/Realizar", "Cancelar", "Atrasar"]', 1, '"Carry out" = Executar (ex: um experimento).', 55),

-- Nível 13: Literatura e Cultura
(13, 'vocabulary', 'What is a "Protagonist"?', '["O vilão", "O personagem principal", "O autor", "O leitor"]', 1, '"Protagonist" = Protagonista/Personagem principal.', 60),
(13, 'vocabulary', 'What does "Metaphor" mean?', '["Metáfora", "Metas", "Metade", "Meteoro"]', 0, '"Metaphor" = Metáfora (comparação implícita).', 60),
(13, 'idioms', 'What does "Beat around the bush" mean?', '["Bater no arbusto", "Enrolar/Evitar o assunto", "Limpar o jardim", "Falar a verdade"]', 1, '"Beat around the bush" = Falar rodeios, enrolar.', 60),
(13, 'grammar', 'Which usage of "Had better" is correct?', '["You had better to go", "You had better go", "You better had go", "You have better go"]', 1, 'Had better + verbo na forma base (sem "to")!', 60),
(13, 'phrasal_verbs', 'What does "Bring up" mean in a conversation?', '["Levantar um objeto", "Mencionar um assunto", "Calar a boca", "Gritar"]', 1, '"Bring up" = Trazer um assunto à tona.', 60),

-- Nível 14: Filosofia e Pensamento Crítico
(14, 'vocabulary', 'What is "Ethics"?', '["Estética", "Ética", "Etiqueta", "Etnia"]', 1, '"Ethics" = Ética (estudo da moral).', 65),
(14, 'vocabulary', 'What does "Paradox" mean?', '["Paraquedas", "Paradoxo", "Paralelo", "Parada"]', 1, '"Paradox" = Paradoxo (contradição aparente).', 65),
(14, 'grammar', 'Complete: "Should you need help, ___ me."', '["call", "calling", "to call", "called"]', 0, 'Inversão formal de "If you should need": "Should you need... call me".', 65),
(14, 'idioms', 'What does "The elephant in the room" mean?', '["Um elefante real", "Um problema óbvio que ninguém quer discutir", "Um animal de estimação", "Uma sala grande"]', 1, '"The elephant in the room" é aquele problema óbvio que todos ignoram.', 65),
(14, 'vocabulary', 'What does "Ambiguous" mean?', '["Ambidestro", "Ambíguo (duplo sentido)", "Amigável", "Amplo"]', 1, '"Ambiguous" = Ambíguo, incerto.', 65),

-- Nível 15: Maestria e Nuances
(15, 'vocabulary', 'What does "Ubiquitous" mean?', '["Estrangeiro", "Presente em toda parte", "Único", "Escondido"]', 1, '"Ubiquitous" = Onipresente/Onipresente.', 70),
(15, 'vocabulary', 'What is an "Oxymoron"?', '["Um tipo de gás", "Uma contradição de termos (ex: silêncio ensurdecedor)", "Um animal raro", "Um insulto"]', 1, '"Oxymoron" = Oximoro (ex: "Jumboshrimp").', 70),
(15, 'idioms', 'What does "To play devil''s advocate" mean?', '["Defender o diabo", "Apresentar um argumento contrário para testar uma ideia", "Ser mau", "Gritar com os outros"]', 1, '"Devil’s advocate" = Advogado do diabo (testar argumentos).', 70),
(15, 'grammar', 'Which is a correct use of the Subjunctive mood?', '["I suggest that he goes", "I suggest that he go", "I suggest him to go", "I suggest he going"]', 1, 'Subjuntivo mandativo: "I suggest that he go" (forma base)!', 70),
(15, 'vocabulary', 'What does "Ephemeral" mean?', '["Eterno", "Efêmero/Passageiro", "Bonito", "Forte"]', 1, '"Ephemeral" = Algo que dura muito pouco tempo.', 70);
