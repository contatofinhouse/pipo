-- Drop the table if it exists
DROP TABLE IF EXISTS public.theme_quiz_questions;

-- Create the table
CREATE TABLE public.theme_quiz_questions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    theme TEXT NOT NULL,
    level TEXT NOT NULL,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer INTEGER NOT NULL,
    hint TEXT NOT NULL,
    did_you_know TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- RLS Policies
ALTER TABLE public.theme_quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous read access" ON public.theme_quiz_questions
    FOR SELECT USING (true);

-- Insert Initial Questions

-- ANIMALS
INSERT INTO public.theme_quiz_questions (theme, level, question, options, correct_answer, hint, did_you_know) VALUES
('Animals', 'beginner', 'Which animal says "meow"?', '["Dog", "Cat", "Bird"]', 1, 'It is a popular pet that likes to chase mice.', 'Cats sleep for 12 to 16 hours a day!'),
('Animals', 'intermediate', 'Which animal is known as the "King of the Jungle"?', '["Tiger", "Elephant", "Lion", "Bear"]', 2, 'It has a big mane and roars loudly.', 'Lions actually live in grasslands and plains, not jungles!'),
('Animals', 'advanced', 'Which dog breed is widely considered to be the most intelligent?', '["Border Collie", "Poodle", "German Shepherd", "Golden Retriever"]', 0, 'This breed was originally developed for herding sheep.', 'Border Collies can learn to understand over 1,000 words and commands.');

-- SPACE
INSERT INTO public.theme_quiz_questions (theme, level, question, options, correct_answer, hint, did_you_know) VALUES
('Space', 'beginner', 'Which planet do we live on?', '["Mars", "Venus", "Earth"]', 2, 'It is the third planet from the sun.', 'Earth is the only planet not named after a god.'),
('Space', 'intermediate', 'What is the largest planet in our solar system?', '["Saturn", "Jupiter", "Neptune", "Uranus"]', 1, 'It has a famous "Great Red Spot".', 'Jupiter is so big that more than 1,300 Earths could fit inside it.'),
('Space', 'advanced', 'Which planet has the hottest surface temperature in our solar system?', '["Mercury", "Venus", "Mars", "Jupiter"]', 1, 'It is the second planet from the Sun, and it has a thick, toxic atmosphere.', 'Even though Mercury is closer to the sun, Venus is hotter because its thick atmosphere traps heat.');

-- SPORTS
INSERT INTO public.theme_quiz_questions (theme, level, question, options, correct_answer, hint, did_you_know) VALUES
('Sports', 'beginner', 'In which sport do you use a round black and white ball?', '["Basketball", "Soccer", "Tennis"]', 1, 'You cannot use your hands in this sport.', 'Soccer is called "football" in most countries around the world.'),
('Sports', 'intermediate', 'How many players are on a standard basketball team on the court?', '["5", "6", "7", "11"]', 0, 'Think of half of ten.', 'Basketball was invented in 1891 using peach baskets as hoops.'),
('Sports', 'advanced', 'Which country has won the most FIFA World Cup titles in men''s soccer?', '["Germany", "Italy", "Brazil", "Argentina"]', 2, 'This country is located in South America and speaks Portuguese.', 'Brazil has won the FIFA World Cup 5 times!');

-- FOOD
INSERT INTO public.theme_quiz_questions (theme, level, question, options, correct_answer, hint, did_you_know) VALUES
('Food', 'beginner', 'Which fruit is yellow and curved?', '["Apple", "Banana", "Grape"]', 1, 'Monkeys love this fruit.', 'Bananas actually grow pointing upwards!'),
('Food', 'intermediate', 'Which country is credited with inventing pizza?', '["USA", "France", "Italy", "Greece"]', 2, 'Its flag is green, white, and red.', 'The first pizza delivery was in 1889 to Queen Margherita of Italy.'),
('Food', 'advanced', 'What is the main ingredient in traditional Japanese sushi?', '["Raw fish", "Vinegared rice", "Seaweed", "Soy sauce"]', 1, 'The word "sushi" actually refers to this ingredient, not the fish.', '"Sushi" translates to "sour tasting", referring to the specially prepared rice.');

-- GEOGRAPHY
INSERT INTO public.theme_quiz_questions (theme, level, question, options, correct_answer, hint, did_you_know) VALUES
('Geography', 'beginner', 'What is the largest ocean on Earth?', '["Atlantic", "Indian", "Pacific"]', 2, 'It starts with the letter P.', 'The Pacific Ocean covers more than 30% of the Earth''s surface.'),
('Geography', 'intermediate', 'Which is the longest river in the world?', '["Amazon", "Nile", "Yangtze", "Mississippi"]', 1, 'It flows through Egypt.', 'The Nile river is over 6,600 kilometers long!'),
('Geography', 'advanced', 'Which country has the most natural lakes in the world?', '["USA", "Russia", "Canada", "Finland"]', 2, 'This country is located in North America and its flag features a maple leaf.', 'Canada has more lakes than the rest of the world combined.');

-- SCIENCE
INSERT INTO public.theme_quiz_questions (theme, level, question, options, correct_answer, hint, did_you_know) VALUES
('Science', 'beginner', 'What comes from clouds and makes things wet?', '["Sun", "Wind", "Rain"]', 2, 'You might need an umbrella.', 'Every drop of water on Earth has been around for billions of years.'),
('Science', 'intermediate', 'How many bones are in the adult human body?', '["150", "206", "250", "300"]', 1, 'It is a number just above 200.', 'Babies are born with about 300 bones, but some fuse together as they grow.'),
('Science', 'advanced', 'What is the chemical symbol for gold?', '["Ag", "Au", "Gd", "Go"]', 1, 'It comes from the Latin word "aurum".', 'Gold is so malleable that a single ounce can be beaten out into a sheet measuring roughly 5 meters on a side.');
