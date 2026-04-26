export interface QuizQuestion {
  id: string;
  theme: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  options: string[];
  correctAnswer: number;
  hint: string;
  didYouKnow: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // ================= ANIMALS =================
  {
    id: 'a1',
    theme: 'Animals',
    level: 'beginner',
    question: 'Which animal says "meow"?',
    options: ['Dog', 'Cat', 'Bird'],
    correctAnswer: 1,
    hint: 'It is a popular pet that likes to chase mice.',
    didYouKnow: 'Cats sleep for 12 to 16 hours a day!'
  },
  {
    id: 'a2',
    theme: 'Animals',
    level: 'intermediate',
    question: 'Which animal is known as the "King of the Jungle"?',
    options: ['Tiger', 'Elephant', 'Lion', 'Bear'],
    correctAnswer: 2,
    hint: 'It has a big mane and roars loudly.',
    didYouKnow: 'Lions actually live in grasslands and plains, not jungles!'
  },
  {
    id: 'a3',
    theme: 'Animals',
    level: 'advanced',
    question: 'Which dog breed is widely considered to be the most intelligent?',
    options: ['Border Collie', 'Poodle', 'German Shepherd', 'Golden Retriever'],
    correctAnswer: 0,
    hint: 'This breed was originally developed for herding sheep.',
    didYouKnow: 'Border Collies can learn to understand over 1,000 words and commands.'
  },
  
  // ================= SPACE =================
  {
    id: 's1',
    theme: 'Space',
    level: 'beginner',
    question: 'Which planet do we live on?',
    options: ['Mars', 'Venus', 'Earth'],
    correctAnswer: 2,
    hint: 'It is the third planet from the sun.',
    didYouKnow: 'Earth is the only planet not named after a god.'
  },
  {
    id: 's2',
    theme: 'Space',
    level: 'intermediate',
    question: 'What is the largest planet in our solar system?',
    options: ['Saturn', 'Jupiter', 'Neptune', 'Uranus'],
    correctAnswer: 1,
    hint: 'It has a famous "Great Red Spot".',
    didYouKnow: 'Jupiter is so big that more than 1,300 Earths could fit inside it.'
  },
  {
    id: 's3',
    theme: 'Space',
    level: 'advanced',
    question: 'Which planet has the hottest surface temperature in our solar system?',
    options: ['Mercury', 'Venus', 'Mars', 'Jupiter'],
    correctAnswer: 1,
    hint: 'It is the second planet from the Sun, and it has a thick, toxic atmosphere.',
    didYouKnow: 'Even though Mercury is closer to the sun, Venus is hotter because its thick atmosphere traps heat.'
  },

  // ================= SPORTS =================
  {
    id: 'sp1',
    theme: 'Sports',
    level: 'beginner',
    question: 'In which sport do you use a round black and white ball?',
    options: ['Basketball', 'Soccer', 'Tennis'],
    correctAnswer: 1,
    hint: 'You cannot use your hands in this sport.',
    didYouKnow: 'Soccer is called "football" in most countries around the world.'
  },
  {
    id: 'sp2',
    theme: 'Sports',
    level: 'intermediate',
    question: 'How many players are on a standard basketball team on the court?',
    options: ['5', '6', '7', '11'],
    correctAnswer: 0,
    hint: 'Think of half of ten.',
    didYouKnow: 'Basketball was invented in 1891 using peach baskets as hoops.'
  },
  {
    id: 'sp3',
    theme: 'Sports',
    level: 'advanced',
    question: 'Which country has won the most FIFA World Cup titles in men\'s soccer?',
    options: ['Germany', 'Italy', 'Brazil', 'Argentina'],
    correctAnswer: 2,
    hint: 'This country is located in South America and speaks Portuguese.',
    didYouKnow: 'Brazil has won the FIFA World Cup 5 times!'
  },

  // ================= FOOD =================
  {
    id: 'f1',
    theme: 'Food',
    level: 'beginner',
    question: 'Which fruit is yellow and curved?',
    options: ['Apple', 'Banana', 'Grape'],
    correctAnswer: 1,
    hint: 'Monkeys love this fruit.',
    didYouKnow: 'Bananas actually grow pointing upwards!'
  },
  {
    id: 'f2',
    theme: 'Food',
    level: 'intermediate',
    question: 'Which country is credited with inventing pizza?',
    options: ['USA', 'France', 'Italy', 'Greece'],
    correctAnswer: 2,
    hint: 'Its flag is green, white, and red.',
    didYouKnow: 'The first pizza delivery was in 1889 to Queen Margherita of Italy.'
  },
  {
    id: 'f3',
    theme: 'Food',
    level: 'advanced',
    question: 'What is the main ingredient in traditional Japanese sushi?',
    options: ['Raw fish', 'Vinegared rice', 'Seaweed', 'Soy sauce'],
    correctAnswer: 1,
    hint: 'The word "sushi" actually refers to this ingredient, not the fish.',
    didYouKnow: '"Sushi" translates to "sour tasting", referring to the specially prepared rice.'
  },

  // ================= GEOGRAPHY =================
  {
    id: 'g1',
    theme: 'Geography',
    level: 'beginner',
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic', 'Indian', 'Pacific'],
    correctAnswer: 2,
    hint: 'It starts with the letter P.',
    didYouKnow: 'The Pacific Ocean covers more than 30% of the Earth\'s surface.'
  },
  {
    id: 'g2',
    theme: 'Geography',
    level: 'intermediate',
    question: 'Which is the longest river in the world?',
    options: ['Amazon', 'Nile', 'Yangtze', 'Mississippi'],
    correctAnswer: 1,
    hint: 'It flows through Egypt.',
    didYouKnow: 'The Nile river is over 6,600 kilometers long!'
  },
  {
    id: 'g3',
    theme: 'Geography',
    level: 'advanced',
    question: 'Which country has the most natural lakes in the world?',
    options: ['USA', 'Russia', 'Canada', 'Finland'],
    correctAnswer: 2,
    hint: 'This country is located in North America and its flag features a maple leaf.',
    didYouKnow: 'Canada has more lakes than the rest of the world combined.'
  },

  // ================= SCIENCE =================
  {
    id: 'sc1',
    theme: 'Science',
    level: 'beginner',
    question: 'What comes from clouds and makes things wet?',
    options: ['Sun', 'Wind', 'Rain'],
    correctAnswer: 2,
    hint: 'You might need an umbrella.',
    didYouKnow: 'Every drop of water on Earth has been around for billions of years.'
  },
  {
    id: 'sc2',
    theme: 'Science',
    level: 'intermediate',
    question: 'How many bones are in the adult human body?',
    options: ['150', '206', '250', '300'],
    correctAnswer: 1,
    hint: 'It is a number just above 200.',
    didYouKnow: 'Babies are born with about 300 bones, but some fuse together as they grow.'
  },
  {
    id: 'sc3',
    theme: 'Science',
    level: 'advanced',
    question: 'What is the chemical symbol for gold?',
    options: ['Ag', 'Au', 'Gd', 'Go'],
    correctAnswer: 1,
    hint: 'It comes from the Latin word "aurum".',
    didYouKnow: 'Gold is so malleable that a single ounce can be beaten out into a sheet measuring roughly 5 meters on a side.'
  }
];
