-- QUIZ EXPANSION PACK (30+ Novas Perguntas)
-- Copie e cole este script no SQL Editor do Supabase para expandir as perguntas do PipoThemeQuiz

-- ANIMALS
INSERT INTO public.theme_quiz_questions (theme, level, question, options, correct_answer, hint, did_you_know) VALUES
('Animals', 'beginner', 'What do pandas mostly eat?', '["Meat", "Bamboo", "Fish"]', 1, 'It is a tall, green plant.', 'Pandas spend about 12 hours a day eating bamboo!'),
('Animals', 'beginner', 'How many legs does a spider have?', '["6", "8", "10"]', 1, 'It is more than an insect.', 'Spiders are not insects; they belong to a class called arachnids.'),
('Animals', 'intermediate', 'Which bird is a symbol of peace?', '["Eagle", "Crow", "Dove", "Parrot"]', 2, 'It is usually white.', 'Doves are closely related to pigeons.'),
('Animals', 'intermediate', 'What is the fastest land animal?', '["Cheetah", "Lion", "Horse", "Leopard"]', 0, 'It has black spots on its yellow fur.', 'A cheetah can go from 0 to 60 miles per hour in just 3 seconds!'),
('Animals', 'advanced', 'What is a group of crows called?', '["A flock", "A murder", "A school", "A pack"]', 1, 'It sounds like a crime.', 'Crows are incredibly smart and can recognize individual human faces.');

-- SPACE
INSERT INTO public.theme_quiz_questions (theme, level, question, options, correct_answer, hint, did_you_know) VALUES
('Space', 'beginner', 'What do we call the big bright object in the night sky that changes shape?', '["The Sun", "The Moon", "A Cloud"]', 1, 'Neil Armstrong walked on it.', 'The Moon does not make its own light; it reflects light from the Sun.'),
('Space', 'beginner', 'Is the Sun a planet or a star?', '["Planet", "Star", "Asteroid"]', 1, 'It provides light and heat.', 'The Sun is a yellow dwarf star, and it is the closest star to Earth.'),
('Space', 'intermediate', 'Which planet is known as the "Red Planet"?', '["Venus", "Mars", "Jupiter", "Saturn"]', 1, 'Elon Musk wants to send people there.', 'Mars is red because its surface is covered in iron oxide (rust).'),
('Space', 'intermediate', 'What is the name of our galaxy?', '["Andromeda", "The Milky Way", "Whirlpool", "Sombrero"]', 1, 'It shares its name with a chocolate bar.', 'The Milky Way contains over 100 billion stars!'),
('Space', 'advanced', 'Which astronaut was the first human to travel into space?', '["Neil Armstrong", "Buzz Aldrin", "Yuri Gagarin", "John Glenn"]', 2, 'He was a Soviet cosmonaut in 1961.', 'His spacecraft was named Vostok 1, and the flight lasted 108 minutes.');

-- SPORTS
INSERT INTO public.theme_quiz_questions (theme, level, question, options, correct_answer, hint, did_you_know) VALUES
('Sports', 'beginner', 'What color is a standard tennis ball?', '["Red", "Yellow/Green", "Blue"]', 1, 'It is very bright so players can see it.', 'The bright color is officially called "optic yellow".'),
('Sports', 'beginner', 'In which sport do players hit a ball over a net using a racket?', '["Soccer", "Tennis", "Basketball"]', 1, 'Serena Williams plays this sport.', 'The longest tennis match in history lasted 11 hours and 5 minutes!'),
('Sports', 'intermediate', 'How often are the Summer Olympic Games held?', '["Every year", "Every 2 years", "Every 4 years", "Every 5 years"]', 2, 'It takes place in the same cycle as the FIFA World Cup.', 'The first modern Olympics were held in Athens, Greece, in 1896.'),
('Sports', 'intermediate', 'In bowling, what is it called when you knock down all pins on the first roll?', '["A spare", "A strike", "A split", "A turkey"]', 1, 'In baseball, 3 of these mean you are out.', 'Three consecutive strikes in bowling is traditionally called a "turkey".'),
('Sports', 'advanced', 'In golf, what does the term "Birdie" mean?', '["1 stroke under par", "2 strokes under par", "1 stroke over par", "A hole in one"]', 0, 'It is better than par, but not as good as an eagle.', 'The term "birdie" comes from 19th-century American slang where "bird" meant something excellent.');

-- FOOD
INSERT INTO public.theme_quiz_questions (theme, level, question, options, correct_answer, hint, did_you_know) VALUES
('Food', 'beginner', 'Which sweet substance is made by bees?', '["Sugar", "Honey", "Syrup"]', 1, 'It is sticky, golden, and delicious.', 'Honey is the only food that never spoils. Edible honey has been found in ancient Egyptian tombs!'),
('Food', 'beginner', 'What is the main ingredient of bread?', '["Meat", "Flour", "Fruit"]', 1, 'It is a powder usually made from wheat.', 'Bread has been a staple food around the world for over 10,000 years.'),
('Food', 'intermediate', 'Which vegetable is famously known to make people cry when cut?', '["Carrot", "Potato", "Onion", "Garlic"]', 2, 'It has many layers.', 'Onions release a gas called syn-propanethial-S-oxide which irritates your eyes.'),
('Food', 'intermediate', 'Which country is famous for inventing tacos and guacamole?', '["Spain", "Brazil", "Mexico", "Italy"]', 2, 'Its capital is Mexico City.', 'Traditional Mexican tacos are usually made with soft corn tortillas, not hard shells.'),
('Food', 'advanced', 'What is the primary ingredient of the Middle Eastern dish hummus?', '["Lentils", "Black beans", "Chickpeas", "Kidney beans"]', 2, 'They are also known as garbanzo beans.', 'Hummus is usually blended with tahini, olive oil, lemon juice, and garlic.');

-- GEOGRAPHY
INSERT INTO public.theme_quiz_questions (theme, level, question, options, correct_answer, hint, did_you_know) VALUES
('Geography', 'beginner', 'Which country has a big red circle on its flag?', '["China", "Japan", "USA"]', 1, 'It is known for anime and sushi.', 'The red circle on Japan''s flag represents the sun.'),
('Geography', 'beginner', 'What is the capital city of France?', '["London", "Berlin", "Paris"]', 2, 'It has the Eiffel Tower.', 'Paris is often called the "City of Light".'),
('Geography', 'intermediate', 'Which continent is entirely covered in ice?', '["Europe", "Antarctica", "Asia", "Australia"]', 1, 'Penguins live there, but polar bears do not.', 'Antarctica is considered a desert because it receives very little precipitation.'),
('Geography', 'intermediate', 'What is the smallest country in the world?', '["Monaco", "Vatican City", "Malta", "San Marino"]', 1, 'The Pope lives there.', 'Vatican City is an independent city-state enclaved within Rome, Italy.'),
('Geography', 'advanced', 'Which mountain range separates Europe from Asia?', '["The Alps", "The Andes", "The Himalayas", "The Ural Mountains"]', 3, 'They run through western Russia.', 'The Ural Mountains are among the world''s oldest remaining mountain ranges.');

-- SCIENCE
INSERT INTO public.theme_quiz_questions (theme, level, question, options, correct_answer, hint, did_you_know) VALUES
('Science', 'beginner', 'What is H2O?', '["Air", "Water", "Fire"]', 1, 'You drink it every day.', 'About 60% of the adult human body is made of water.'),
('Science', 'beginner', 'What do plants need to grow, besides water and soil?', '["Coffee", "Sunlight", "Music"]', 1, 'It comes from the sky during the day.', 'Plants use sunlight to make their own food through a process called photosynthesis.'),
('Science', 'intermediate', 'Which force keeps us from floating into space?', '["Magnetism", "Friction", "Gravity", "Electricity"]', 2, 'Isaac Newton discovered it when an apple fell.', 'Gravity on the Moon is only about 16% as strong as gravity on Earth.'),
('Science', 'intermediate', 'What part of the plant conducts photosynthesis?', '["Roots", "Stem", "Leaves", "Flowers"]', 2, 'They are usually green.', 'Leaves contain chlorophyll, which absorbs light energy from the sun.'),
('Science', 'advanced', 'What is the most abundant gas in the Earth''s atmosphere?', '["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"]', 2, 'It makes up about 78% of the air we breathe.', 'Although we need oxygen to survive, too much oxygen can actually be toxic!');
