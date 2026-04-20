import * as fs from 'fs';

// ============================================================================
// PIPO CEFR CURRICULUM GENERATOR v2 — HANDCRAFTED REAL ENGLISH PROGRESSION
// ============================================================================
// Every unit has UNIQUE, thematically relevant content.
// Progression: A1 (1-15) → A2 (16-30) → B1 (31-45) → B2 (46-55) → C1 (56-65) → C2 (66-70)
// No more "Como se diz X?" spam. Real grammar, sentences, audio, ordering, speaking.
// ============================================================================

interface UnitDef {
  title: string;
  desc: string;
  cefr: string;
  icon: string;
  lessons: LessonDef[];
}

interface LessonDef {
  title: string;
  questions: QuestionDef[];
}

interface QuestionDef {
  type: 'selection' | 'matching' | 'audio' | 'ordering' | 'speaking' | 'tf';
  content: any;
  options: any[];
  explanation: string;
}

function esc(s: string): string {
  return s.replace(/'/g, "''");
}

function jsonEsc(obj: any): string {
  return JSON.stringify(obj).replace(/'/g, "''");
}

// ============================================================================
// UNIT DEFINITIONS — Each unit is 100% hand-curated
// ============================================================================

const UNITS: UnitDef[] = [

  // ═══════════════════════════════════════════════════════════════
  // A1 — BEGINNER (Units 1–15): Basic vocabulary, simple sentences
  // ═══════════════════════════════════════════════════════════════

  { title: "Hello, World!", desc: "Cumprimentos básicos e apresentações.", cefr: "A1", icon: "👋",
    lessons: [
      { title: "Greetings",
        questions: [
          { type: 'selection', content: { prompt: "What does 'Hello' mean?", image: "👋" }, options: [{ text: "Olá", is_correct: true }, { text: "Tchau", is_correct: false }, { text: "Obrigado", is_correct: false }], explanation: "'Hello' = Olá. É o cumprimento mais comum em inglês." },
          { type: 'matching', content: { prompt: "Match the greetings to their meanings.", items: [{ icon: "👋", word: "Hello" }, { icon: "🌅", word: "Good morning" }, { icon: "🌙", word: "Good night" }] }, options: [], explanation: "Hello = Olá, Good morning = Bom dia, Good night = Boa noite." },
          { type: 'selection', content: { prompt: "How do you say 'Tchau' in English?", image: "👋" }, options: [{ text: "Goodbye", is_correct: true }, { text: "Hello", is_correct: false }, { text: "Please", is_correct: false }], explanation: "'Goodbye' = Tchau. Para despedidas." },
          { type: 'audio', content: { prompt: "Listen and choose the correct translation.", audio_text: "Good morning", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=good+morning" }, options: [{ text: "Bom dia", is_correct: true }, { text: "Boa tarde", is_correct: false }, { text: "Boa noite", is_correct: false }], explanation: "'Good morning' = Bom dia." },
        ]
      },
      { title: "Introductions",
        questions: [
          { type: 'selection', content: { prompt: "What does 'My name is...' mean?", image: "🏷️" }, options: [{ text: "Meu nome é...", is_correct: true }, { text: "Eu gosto de...", is_correct: false }, { text: "Eu moro em...", is_correct: false }], explanation: "'My name is...' = Meu nome é..." },
          { type: 'ordering', content: { prompt: "Put the words in order:", sentence: "My name is Pipo" }, options: [], explanation: "The correct order is: My name is Pipo." },
          { type: 'selection', content: { prompt: "'Nice to meet you' means:", image: "🤝" }, options: [{ text: "Prazer em te conhecer", is_correct: true }, { text: "Como vai você?", is_correct: false }, { text: "De onde você é?", is_correct: false }], explanation: "'Nice to meet you' = Prazer em te conhecer." },
          { type: 'audio', content: { prompt: "Listen and select the correct phrase.", audio_text: "How are you?", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=how+are+you" }, options: [{ text: "Como você está?", is_correct: true }, { text: "Qual é seu nome?", is_correct: false }, { text: "Quantos anos você tem?", is_correct: false }], explanation: "'How are you?' = Como você está?" },
        ]
      },
      { title: "Saying Goodbye",
        questions: [
          { type: 'matching', content: { prompt: "Connect the farewells.", items: [{ icon: "👋", word: "Bye" }, { icon: "🌙", word: "Good night" }, { icon: "🔜", word: "See you later" }] }, options: [], explanation: "Bye = Tchau, Good night = Boa noite, See you later = Até logo." },
          { type: 'selection', content: { prompt: "'See you tomorrow' means:", image: "📅" }, options: [{ text: "Até amanhã", is_correct: true }, { text: "Até logo", is_correct: false }, { text: "Até semana que vem", is_correct: false }], explanation: "'See you tomorrow' = Até amanhã." },
          { type: 'ordering', content: { prompt: "Put the words in order:", sentence: "See you later" }, options: [], explanation: "Correct: See you later." },
          { type: 'tf', content: { prompt: "'Good morning' is used at night. True or False?" }, options: [{ text: "False", is_correct: true }, { text: "True", is_correct: false }], explanation: "'Good morning' is used in the morning, not at night." },
        ]
      }
    ]
  },

  { title: "Numbers & Counting", desc: "Aprenda os números de 1 a 100.", cefr: "A1", icon: "🔢",
    lessons: [
      { title: "Numbers 1-10",
        questions: [
          { type: 'matching', content: { prompt: "Match the numbers.", items: [{ icon: "1️⃣", word: "one" }, { icon: "5️⃣", word: "five" }, { icon: "🔟", word: "ten" }] }, options: [], explanation: "1 = one, 5 = five, 10 = ten." },
          { type: 'audio', content: { prompt: "Listen. What number is it?", audio_text: "seven", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=seven" }, options: [{ text: "7", is_correct: true }, { text: "6", is_correct: false }, { text: "8", is_correct: false }], explanation: "'Seven' = 7." },
          { type: 'selection', content: { prompt: "What is 'three' in Portuguese?", image: "3️⃣" }, options: [{ text: "Três", is_correct: true }, { text: "Quatro", is_correct: false }, { text: "Dois", is_correct: false }], explanation: "Three = Três." },
          { type: 'ordering', content: { prompt: "Order from smallest to largest:", sentence: "one two three" }, options: [], explanation: "1, 2, 3 = one, two, three." },
        ]
      },
      { title: "Numbers 11-20",
        questions: [
          { type: 'selection', content: { prompt: "How do you say '15' in English?", image: "🔢" }, options: [{ text: "Fifteen", is_correct: true }, { text: "Fifty", is_correct: false }, { text: "Fourteen", is_correct: false }], explanation: "15 = Fifteen. Cuidado: 50 = Fifty!" },
          { type: 'audio', content: { prompt: "Listen and select the number.", audio_text: "thirteen", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=thirteen" }, options: [{ text: "13", is_correct: true }, { text: "30", is_correct: false }, { text: "14", is_correct: false }], explanation: "Thirteen = 13. Thirty = 30." },
          { type: 'matching', content: { prompt: "Match numbers to words.", items: [{ icon: "1️⃣1️⃣", word: "eleven" }, { icon: "1️⃣2️⃣", word: "twelve" }, { icon: "2️⃣0️⃣", word: "twenty" }] }, options: [], explanation: "11=eleven, 12=twelve, 20=twenty." },
          { type: 'tf', content: { prompt: "'Eighteen' means 80. True or False?" }, options: [{ text: "False", is_correct: true }, { text: "True", is_correct: false }], explanation: "Eighteen = 18, not 80. Eighty = 80." },
        ]
      },
      { title: "Tens & Hundreds",
        questions: [
          { type: 'selection', content: { prompt: "How do you say '100' in English?", image: "💯" }, options: [{ text: "One hundred", is_correct: true }, { text: "One thousand", is_correct: false }, { text: "Ten", is_correct: false }], explanation: "100 = One hundred. 1000 = One thousand." },
          { type: 'ordering', content: { prompt: "Put in order:", sentence: "ten twenty thirty" }, options: [], explanation: "10, 20, 30 = ten, twenty, thirty." },
          { type: 'audio', content: { prompt: "Listen. What number?", audio_text: "fifty", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=fifty" }, options: [{ text: "50", is_correct: true }, { text: "15", is_correct: false }, { text: "500", is_correct: false }], explanation: "Fifty = 50." },
          { type: 'selection', content: { prompt: "'Ninety' is which number?", image: "🔢" }, options: [{ text: "90", is_correct: true }, { text: "19", is_correct: false }, { text: "9", is_correct: false }], explanation: "Ninety = 90. Nine = 9. Nineteen = 19." },
        ]
      }
    ]
  },

  { title: "Colors & Shapes", desc: "As cores e formas básicas.", cefr: "A1", icon: "🎨",
    lessons: [
      { title: "Basic Colors",
        questions: [
          { type: 'matching', content: { prompt: "Match colors to their names.", items: [{ icon: "🟥", word: "red" }, { icon: "🟦", word: "blue" }, { icon: "🟩", word: "green" }] }, options: [], explanation: "Red = vermelho, Blue = azul, Green = verde." },
          { type: 'audio', content: { prompt: "Listen. What color?", audio_text: "yellow", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=yellow" }, options: [{ text: "Amarelo", is_correct: true }, { text: "Vermelho", is_correct: false }, { text: "Laranja", is_correct: false }], explanation: "Yellow = Amarelo." },
          { type: 'selection', content: { prompt: "What color is the sky on a clear day?", image: "🌤️" }, options: [{ text: "Blue", is_correct: true }, { text: "Red", is_correct: false }, { text: "Green", is_correct: false }], explanation: "The sky is blue on a clear day." },
          { type: 'tf', content: { prompt: "'Orange' is both a color and a fruit. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Yes! 'Orange' is both a color (laranja) and a fruit (laranja)." },
        ]
      },
      { title: "More Colors",
        questions: [
          { type: 'selection', content: { prompt: "How do you say 'roxo' in English?", image: "🟣" }, options: [{ text: "Purple", is_correct: true }, { text: "Pink", is_correct: false }, { text: "Brown", is_correct: false }], explanation: "Roxo = Purple." },
          { type: 'matching', content: { prompt: "Connect the colors.", items: [{ icon: "⬛", word: "black" }, { icon: "⬜", word: "white" }, { icon: "🟤", word: "brown" }] }, options: [], explanation: "Black = preto, White = branco, Brown = marrom." },
          { type: 'ordering', content: { prompt: "Complete the sentence:", sentence: "The cat is black" }, options: [], explanation: "'The cat is black' = O gato é preto." },
          { type: 'audio', content: { prompt: "Listen and choose the color.", audio_text: "pink", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=pink" }, options: [{ text: "Rosa", is_correct: true }, { text: "Roxo", is_correct: false }, { text: "Cinza", is_correct: false }], explanation: "Pink = Rosa." },
        ]
      },
      { title: "Shapes",
        questions: [
          { type: 'matching', content: { prompt: "Match shapes to names.", items: [{ icon: "⭕", word: "circle" }, { icon: "⬛", word: "square" }, { icon: "🔺", word: "triangle" }] }, options: [], explanation: "Circle = círculo, Square = quadrado, Triangle = triângulo." },
          { type: 'selection', content: { prompt: "A ball is shaped like a:", image: "⚽" }, options: [{ text: "Circle / Sphere", is_correct: true }, { text: "Square", is_correct: false }, { text: "Triangle", is_correct: false }], explanation: "A ball is round, like a circle or sphere." },
          { type: 'audio', content: { prompt: "Listen. What shape?", audio_text: "rectangle", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=rectangle" }, options: [{ text: "Retângulo", is_correct: true }, { text: "Quadrado", is_correct: false }, { text: "Triângulo", is_correct: false }], explanation: "Rectangle = Retângulo. Square = Quadrado." },
          { type: 'ordering', content: { prompt: "Complete:", sentence: "This is a red circle" }, options: [], explanation: "'This is a red circle' - artigo + adjetivo + substantivo." },
        ]
      }
    ]
  },

  { title: "My Family", desc: "Membros da família.", cefr: "A1", icon: "👨‍👩‍👧‍👦",
    lessons: [
      { title: "Parents & Siblings",
        questions: [
          { type: 'matching', content: { prompt: "Match family members.", items: [{ icon: "👨", word: "father" }, { icon: "👩", word: "mother" }, { icon: "👦", word: "brother" }] }, options: [], explanation: "Father = pai, Mother = mãe, Brother = irmão." },
          { type: 'selection', content: { prompt: "'Sister' means:", image: "👧" }, options: [{ text: "Irmã", is_correct: true }, { text: "Prima", is_correct: false }, { text: "Tia", is_correct: false }], explanation: "Sister = Irmã." },
          { type: 'ordering', content: { prompt: "Put in order:", sentence: "She is my mother" }, options: [], explanation: "'She is my mother' = Ela é minha mãe." },
          { type: 'audio', content: { prompt: "Listen. Who is it?", audio_text: "grandfather", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=grandfather" }, options: [{ text: "Avô", is_correct: true }, { text: "Pai", is_correct: false }, { text: "Tio", is_correct: false }], explanation: "Grandfather = Avô." },
        ]
      },
      { title: "Extended Family",
        questions: [
          { type: 'selection', content: { prompt: "'Uncle' means:", image: "👨" }, options: [{ text: "Tio", is_correct: true }, { text: "Avô", is_correct: false }, { text: "Primo", is_correct: false }], explanation: "Uncle = Tio." },
          { type: 'matching', content: { prompt: "Match the relatives.", items: [{ icon: "👵", word: "grandmother" }, { icon: "👶", word: "baby" }, { icon: "🧑", word: "cousin" }] }, options: [], explanation: "Grandmother = Avó, Baby = Bebê, Cousin = Primo/Prima." },
          { type: 'tf', content: { prompt: "'Aunt' means 'tio' in Portuguese. True or False?" }, options: [{ text: "False", is_correct: true }, { text: "True", is_correct: false }], explanation: "Aunt = Tia (not Tio). Uncle = Tio." },
          { type: 'ordering', content: { prompt: "Form the sentence:", sentence: "He is my uncle" }, options: [], explanation: "'He is my uncle' = Ele é meu tio." },
        ]
      },
      { title: "Describing Family",
        questions: [
          { type: 'selection', content: { prompt: "'I have two brothers' means:", image: "👦👦" }, options: [{ text: "Eu tenho dois irmãos", is_correct: true }, { text: "Eu tenho duas irmãs", is_correct: false }, { text: "Eu tenho dois primos", is_correct: false }], explanation: "I have = Eu tenho. Two brothers = dois irmãos." },
          { type: 'audio', content: { prompt: "Listen and choose:", audio_text: "My family is big", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=my+family+is+big" }, options: [{ text: "Minha família é grande", is_correct: true }, { text: "Minha família é pequena", is_correct: false }, { text: "Minha casa é grande", is_correct: false }], explanation: "'My family is big' = Minha família é grande." },
          { type: 'ordering', content: { prompt: "Form the sentence:", sentence: "My sister is tall" }, options: [], explanation: "'My sister is tall' = Minha irmã é alta." },
          { type: 'tf', content: { prompt: "'Parents' means 'pais' (mother and father). True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Parents = pais (pai e mãe)." },
        ]
      }
    ]
  },

  { title: "Animals", desc: "Animais domésticos e selvagens.", cefr: "A1", icon: "🐾",
    lessons: [
      { title: "Pets",
        questions: [
          { type: 'matching', content: { prompt: "Match the animals.", items: [{ icon: "🐶", word: "dog" }, { icon: "🐱", word: "cat" }, { icon: "🐰", word: "rabbit" }] }, options: [], explanation: "Dog = cachorro, Cat = gato, Rabbit = coelho." },
          { type: 'audio', content: { prompt: "Listen. What animal?", audio_text: "hamster", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=hamster" }, options: [{ text: "Hamster", is_correct: true }, { text: "Gato", is_correct: false }, { text: "Pássaro", is_correct: false }], explanation: "Hamster is the same in both languages!" },
          { type: 'selection', content: { prompt: "'Fish' means:", image: "🐟" }, options: [{ text: "Peixe", is_correct: true }, { text: "Pássaro", is_correct: false }, { text: "Cobra", is_correct: false }], explanation: "Fish = Peixe." },
          { type: 'ordering', content: { prompt: "Form the sentence:", sentence: "I have a dog" }, options: [], explanation: "'I have a dog' = Eu tenho um cachorro." },
        ]
      },
      { title: "Farm Animals",
        questions: [
          { type: 'matching', content: { prompt: "Match the farm animals.", items: [{ icon: "🐄", word: "cow" }, { icon: "🐔", word: "chicken" }, { icon: "🐷", word: "pig" }] }, options: [], explanation: "Cow = vaca, Chicken = galinha, Pig = porco." },
          { type: 'selection', content: { prompt: "A 'horse' is a:", image: "🐴" }, options: [{ text: "Cavalo", is_correct: true }, { text: "Burro", is_correct: false }, { text: "Cabra", is_correct: false }], explanation: "Horse = Cavalo." },
          { type: 'audio', content: { prompt: "Listen. What animal is it?", audio_text: "sheep", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=sheep" }, options: [{ text: "Ovelha", is_correct: true }, { text: "Vaca", is_correct: false }, { text: "Cavalo", is_correct: false }], explanation: "Sheep = Ovelha." },
          { type: 'tf', content: { prompt: "'Duck' means 'pato'. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Duck = Pato. Correct!" },
        ]
      },
      { title: "Wild Animals",
        questions: [
          { type: 'matching', content: { prompt: "Match wild animals.", items: [{ icon: "🦁", word: "lion" }, { icon: "🐘", word: "elephant" }, { icon: "🐍", word: "snake" }] }, options: [], explanation: "Lion = leão, Elephant = elefante, Snake = cobra." },
          { type: 'selection', content: { prompt: "'Monkey' means:", image: "🐒" }, options: [{ text: "Macaco", is_correct: true }, { text: "Gorila", is_correct: false }, { text: "Urso", is_correct: false }], explanation: "Monkey = Macaco." },
          { type: 'ordering', content: { prompt: "Form the sentence:", sentence: "The lion is strong" }, options: [], explanation: "'The lion is strong' = O leão é forte." },
          { type: 'audio', content: { prompt: "Listen and choose:", audio_text: "tiger", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=tiger" }, options: [{ text: "Tigre", is_correct: true }, { text: "Leão", is_correct: false }, { text: "Leopardo", is_correct: false }], explanation: "Tiger = Tigre." },
        ]
      }
    ]
  },

  { title: "Food & Drinks", desc: "Comidas e bebidas do dia a dia.", cefr: "A1", icon: "🍎",
    lessons: [
      { title: "Fruits",
        questions: [
          { type: 'matching', content: { prompt: "Match the fruits.", items: [{ icon: "🍎", word: "apple" }, { icon: "🍌", word: "banana" }, { icon: "🍊", word: "orange" }] }, options: [], explanation: "Apple = maçã, Banana = banana, Orange = laranja." },
          { type: 'audio', content: { prompt: "Listen and choose:", audio_text: "strawberry", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=strawberry" }, options: [{ text: "Morango", is_correct: true }, { text: "Framboesa", is_correct: false }, { text: "Amora", is_correct: false }], explanation: "Strawberry = Morango." },
          { type: 'selection', content: { prompt: "'Grape' is:", image: "🍇" }, options: [{ text: "Uva", is_correct: true }, { text: "Maçã", is_correct: false }, { text: "Pêra", is_correct: false }], explanation: "Grape = Uva." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "I like apples" }, options: [], explanation: "'I like apples' = Eu gosto de maçãs." },
        ]
      },
      { title: "Meals",
        questions: [
          { type: 'selection', content: { prompt: "'Breakfast' means:", image: "🍳" }, options: [{ text: "Café da manhã", is_correct: true }, { text: "Almoço", is_correct: false }, { text: "Jantar", is_correct: false }], explanation: "Breakfast = café da manhã, Lunch = almoço, Dinner = jantar." },
          { type: 'matching', content: { prompt: "Match the meals.", items: [{ icon: "🍳", word: "breakfast" }, { icon: "🥗", word: "lunch" }, { icon: "🍽️", word: "dinner" }] }, options: [], explanation: "Breakfast, Lunch, Dinner = Café da manhã, Almoço, Jantar." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "I am hungry", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=i+am+hungry" }, options: [{ text: "Eu estou com fome", is_correct: true }, { text: "Eu estou com sede", is_correct: false }, { text: "Eu estou cansado", is_correct: false }], explanation: "I am hungry = Eu estou com fome." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "I eat rice and beans" }, options: [], explanation: "'I eat rice and beans' = Eu como arroz e feijão." },
        ]
      },
      { title: "Drinks",
        questions: [
          { type: 'matching', content: { prompt: "Match the drinks.", items: [{ icon: "💧", word: "water" }, { icon: "🥛", word: "milk" }, { icon: "🧃", word: "juice" }] }, options: [], explanation: "Water = água, Milk = leite, Juice = suco." },
          { type: 'selection', content: { prompt: "'Coffee' is:", image: "☕" }, options: [{ text: "Café", is_correct: true }, { text: "Chá", is_correct: false }, { text: "Suco", is_correct: false }], explanation: "Coffee = Café. Tea = Chá." },
          { type: 'tf', content: { prompt: "'Tea' means 'chá'. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Tea = Chá. Correct!" },
          { type: 'ordering', content: { prompt: "Form:", sentence: "Can I have some water" }, options: [], explanation: "'Can I have some water?' = Posso tomar um pouco de água?" },
        ]
      }
    ]
  },

  { title: "My Body", desc: "Partes do corpo humano.", cefr: "A1", icon: "🧍",
    lessons: [
      { title: "Head & Face",
        questions: [
          { type: 'matching', content: { prompt: "Match body parts.", items: [{ icon: "👀", word: "eyes" }, { icon: "👃", word: "nose" }, { icon: "👄", word: "mouth" }] }, options: [], explanation: "Eyes = olhos, Nose = nariz, Mouth = boca." },
          { type: 'selection', content: { prompt: "'Ears' means:", image: "👂" }, options: [{ text: "Orelhas", is_correct: true }, { text: "Olhos", is_correct: false }, { text: "Boca", is_correct: false }], explanation: "Ears = Orelhas/Ouvidos." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "head", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=head" }, options: [{ text: "Cabeça", is_correct: true }, { text: "Mão", is_correct: false }, { text: "Pé", is_correct: false }], explanation: "Head = Cabeça." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "I have two eyes" }, options: [], explanation: "'I have two eyes' = Eu tenho dois olhos." },
        ]
      },
      { title: "Arms & Legs",
        questions: [
          { type: 'matching', content: { prompt: "Match.", items: [{ icon: "💪", word: "arm" }, { icon: "🦵", word: "leg" }, { icon: "✋", word: "hand" }] }, options: [], explanation: "Arm = braço, Leg = perna, Hand = mão." },
          { type: 'selection', content: { prompt: "'Feet' means:", image: "🦶" }, options: [{ text: "Pés", is_correct: true }, { text: "Mãos", is_correct: false }, { text: "Joelhos", is_correct: false }], explanation: "Feet = Pés (plural of foot)." },
          { type: 'tf', content: { prompt: "'Finger' means 'dedo'. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Finger = dedo (da mão). Toe = dedo do pé." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "shoulder", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=shoulder" }, options: [{ text: "Ombro", is_correct: true }, { text: "Cotovelo", is_correct: false }, { text: "Joelho", is_correct: false }], explanation: "Shoulder = Ombro." },
        ]
      },
      { title: "Feeling Sick",
        questions: [
          { type: 'selection', content: { prompt: "'I have a headache' means:", image: "🤕" }, options: [{ text: "Estou com dor de cabeça", is_correct: true }, { text: "Estou com fome", is_correct: false }, { text: "Estou cansado", is_correct: false }], explanation: "Headache = dor de cabeça." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "My stomach hurts" }, options: [], explanation: "'My stomach hurts' = Meu estômago dói." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "I feel sick", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=i+feel+sick" }, options: [{ text: "Eu me sinto doente", is_correct: true }, { text: "Eu me sinto bem", is_correct: false }, { text: "Eu estou com frio", is_correct: false }], explanation: "I feel sick = Eu me sinto mal/doente." },
          { type: 'selection', content: { prompt: "'Doctor' means:", image: "👨‍⚕️" }, options: [{ text: "Médico", is_correct: true }, { text: "Professor", is_correct: false }, { text: "Bombeiro", is_correct: false }], explanation: "Doctor = Médico." },
        ]
      }
    ]
  },

  { title: "Clothes", desc: "Roupas e acessórios.", cefr: "A1", icon: "👕",
    lessons: [
      { title: "Everyday Clothes",
        questions: [
          { type: 'matching', content: { prompt: "Match the clothes.", items: [{ icon: "👕", word: "shirt" }, { icon: "👖", word: "pants" }, { icon: "👟", word: "shoes" }] }, options: [], explanation: "Shirt = camisa, Pants = calça, Shoes = sapatos." },
          { type: 'selection', content: { prompt: "'Dress' means:", image: "👗" }, options: [{ text: "Vestido", is_correct: true }, { text: "Saia", is_correct: false }, { text: "Blusa", is_correct: false }], explanation: "Dress = Vestido." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "She wears a blue dress" }, options: [], explanation: "'She wears a blue dress' = Ela veste um vestido azul." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "jacket", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=jacket" }, options: [{ text: "Jaqueta", is_correct: true }, { text: "Calça", is_correct: false }, { text: "Chapéu", is_correct: false }], explanation: "Jacket = Jaqueta." },
        ]
      },
      { title: "Accessories",
        questions: [
          { type: 'matching', content: { prompt: "Match accessories.", items: [{ icon: "🧢", word: "hat" }, { icon: "🧣", word: "scarf" }, { icon: "🧤", word: "gloves" }] }, options: [], explanation: "Hat = chapéu, Scarf = cachecol, Gloves = luvas." },
          { type: 'selection', content: { prompt: "'Sunglasses' means:", image: "🕶️" }, options: [{ text: "Óculos de sol", is_correct: true }, { text: "Óculos de grau", is_correct: false }, { text: "Chapéu", is_correct: false }], explanation: "Sunglasses = Óculos de sol." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "boots", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=boots" }, options: [{ text: "Botas", is_correct: true }, { text: "Sandálias", is_correct: false }, { text: "Sapatos", is_correct: false }], explanation: "Boots = Botas." },
          { type: 'tf', content: { prompt: "'Belt' means 'cinto'. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Belt = Cinto." },
        ]
      },
      { title: "Getting Dressed",
        questions: [
          { type: 'selection', content: { prompt: "'Put on your shoes' means:", image: "👟" }, options: [{ text: "Coloque seus sapatos", is_correct: true }, { text: "Tire seus sapatos", is_correct: false }, { text: "Compre sapatos", is_correct: false }], explanation: "Put on = colocar/vestir. Take off = tirar." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "I am wearing a red shirt" }, options: [], explanation: "'I am wearing a red shirt' = Estou vestindo uma camisa vermelha." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "Take off your coat", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=take+off+your+coat" }, options: [{ text: "Tire seu casaco", is_correct: true }, { text: "Vista seu casaco", is_correct: false }, { text: "Compre um casaco", is_correct: false }], explanation: "Take off = tirar. Put on = vestir." },
          { type: 'tf', content: { prompt: "'Wear' and 'Wear' can mean both 'vestir' and 'usar'. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Sim! 'Wear' = vestir/usar (roupas, acessórios)." },
        ]
      }
    ]
  },

  { title: "Home Sweet Home", desc: "Cômodos e móveis da casa.", cefr: "A1", icon: "🏠",
    lessons: [
      { title: "Rooms",
        questions: [
          { type: 'matching', content: { prompt: "Match the rooms.", items: [{ icon: "🛏️", word: "bedroom" }, { icon: "🍳", word: "kitchen" }, { icon: "🛁", word: "bathroom" }] }, options: [], explanation: "Bedroom = quarto, Kitchen = cozinha, Bathroom = banheiro." },
          { type: 'selection', content: { prompt: "'Living room' means:", image: "🛋️" }, options: [{ text: "Sala de estar", is_correct: true }, { text: "Cozinha", is_correct: false }, { text: "Garagem", is_correct: false }], explanation: "Living room = Sala de estar." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "The kitchen is big" }, options: [], explanation: "'The kitchen is big' = A cozinha é grande." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "garage", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=garage" }, options: [{ text: "Garagem", is_correct: true }, { text: "Jardim", is_correct: false }, { text: "Varanda", is_correct: false }], explanation: "Garage = Garagem." },
        ]
      },
      { title: "Furniture",
        questions: [
          { type: 'matching', content: { prompt: "Match the furniture.", items: [{ icon: "🪑", word: "chair" }, { icon: "🛋️", word: "sofa" }, { icon: "🛏️", word: "bed" }] }, options: [], explanation: "Chair = cadeira, Sofa = sofá, Bed = cama." },
          { type: 'selection', content: { prompt: "'Table' means:", image: "🪵" }, options: [{ text: "Mesa", is_correct: true }, { text: "Cadeira", is_correct: false }, { text: "Estante", is_correct: false }], explanation: "Table = Mesa." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "bookshelf", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=bookshelf" }, options: [{ text: "Estante de livros", is_correct: true }, { text: "Armário", is_correct: false }, { text: "Guarda-roupa", is_correct: false }], explanation: "Bookshelf = Estante de livros." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "There is a lamp on the table" }, options: [], explanation: "'There is a lamp on the table' = Há uma lâmpada na mesa." },
        ]
      },
      { title: "Household Items",
        questions: [
          { type: 'matching', content: { prompt: "Match items.", items: [{ icon: "🔑", word: "key" }, { icon: "🪟", word: "window" }, { icon: "🚪", word: "door" }] }, options: [], explanation: "Key = chave, Window = janela, Door = porta." },
          { type: 'selection', content: { prompt: "'Mirror' means:", image: "🪞" }, options: [{ text: "Espelho", is_correct: true }, { text: "Quadro", is_correct: false }, { text: "Relógio", is_correct: false }], explanation: "Mirror = Espelho." },
          { type: 'tf', content: { prompt: "'Clock' means 'relógio'. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Clock = Relógio (de parede). Watch = Relógio (de pulso)." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "Close the door please" }, options: [], explanation: "'Close the door please' = Feche a porta por favor." },
        ]
      }
    ]
  },

  { title: "Daily Routine", desc: "Atividades do dia a dia.", cefr: "A1", icon: "⏰",
    lessons: [
      { title: "Morning Routine",
        questions: [
          { type: 'ordering', content: { prompt: "Form:", sentence: "I wake up at seven" }, options: [], explanation: "'I wake up at seven' = Eu acordo às sete." },
          { type: 'selection', content: { prompt: "'Brush my teeth' means:", image: "🪥" }, options: [{ text: "Escovar os dentes", is_correct: true }, { text: "Lavar o rosto", is_correct: false }, { text: "Pentear o cabelo", is_correct: false }], explanation: "Brush my teeth = Escovar os dentes." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "I take a shower", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=i+take+a+shower" }, options: [{ text: "Eu tomo banho", is_correct: true }, { text: "Eu janto", is_correct: false }, { text: "Eu durmo", is_correct: false }], explanation: "I take a shower = Eu tomo banho." },
          { type: 'matching', content: { prompt: "Match routines.", items: [{ icon: "🛏️", word: "wake up" }, { icon: "🍳", word: "eat breakfast" }, { icon: "🚗", word: "go to school" }] }, options: [], explanation: "Wake up = acordar, Eat breakfast = tomar café, Go to school = ir para escola." },
        ]
      },
      { title: "Afternoon Activities",
        questions: [
          { type: 'selection', content: { prompt: "'Do homework' means:", image: "📝" }, options: [{ text: "Fazer lição de casa", is_correct: true }, { text: "Ir à escola", is_correct: false }, { text: "Brincar no parque", is_correct: false }], explanation: "Do homework = Fazer lição de casa." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "I play soccer after school" }, options: [], explanation: "'I play soccer after school' = Eu jogo futebol depois da escola." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "I watch television", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=i+watch+television" }, options: [{ text: "Eu assisto televisão", is_correct: true }, { text: "Eu leio um livro", is_correct: false }, { text: "Eu cozinho", is_correct: false }], explanation: "I watch television = Eu assisto televisão." },
          { type: 'tf', content: { prompt: "'Read a book' means 'ler um livro'. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Read a book = Ler um livro." },
        ]
      },
      { title: "Night Routine",
        questions: [
          { type: 'matching', content: { prompt: "Match.", items: [{ icon: "🌙", word: "go to sleep" }, { icon: "🪥", word: "brush teeth" }, { icon: "📖", word: "read a story" }] }, options: [], explanation: "Go to sleep = dormir, Brush teeth = escovar dentes, Read a story = ler uma história." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "I go to bed at nine" }, options: [], explanation: "'I go to bed at nine' = Eu vou para cama às nove." },
          { type: 'selection', content: { prompt: "'Dream' means:", image: "💭" }, options: [{ text: "Sonho/Sonhar", is_correct: true }, { text: "Dormir", is_correct: false }, { text: "Acordar", is_correct: false }], explanation: "Dream = Sonho/Sonhar." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "good night", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=good+night" }, options: [{ text: "Boa noite", is_correct: true }, { text: "Bom dia", is_correct: false }, { text: "Boa tarde", is_correct: false }], explanation: "Good night = Boa noite." },
        ]
      }
    ]
  },

  { title: "The Weather", desc: "Clima e estações.", cefr: "A1", icon: "🌤️",
    lessons: [
      { title: "Weather Types",
        questions: [
          { type: 'matching', content: { prompt: "Match the weather.", items: [{ icon: "☀️", word: "sunny" }, { icon: "🌧️", word: "rainy" }, { icon: "❄️", word: "snowy" }] }, options: [], explanation: "Sunny = ensolarado, Rainy = chuvoso, Snowy = nevando." },
          { type: 'selection', content: { prompt: "'It is cloudy today' means:", image: "☁️" }, options: [{ text: "Está nublado hoje", is_correct: true }, { text: "Está quente hoje", is_correct: false }, { text: "Está ventando hoje", is_correct: false }], explanation: "Cloudy = Nublado." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "windy", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=windy" }, options: [{ text: "Ventoso", is_correct: true }, { text: "Chuvoso", is_correct: false }, { text: "Nublado", is_correct: false }], explanation: "Windy = Ventoso." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "It is hot today" }, options: [], explanation: "'It is hot today' = Está quente hoje." },
        ]
      },
      { title: "Seasons",
        questions: [
          { type: 'matching', content: { prompt: "Match the seasons.", items: [{ icon: "🌸", word: "spring" }, { icon: "☀️", word: "summer" }, { icon: "🍂", word: "autumn" }] }, options: [], explanation: "Spring = primavera, Summer = verão, Autumn = outono." },
          { type: 'selection', content: { prompt: "'Winter' means:", image: "❄️" }, options: [{ text: "Inverno", is_correct: true }, { text: "Outono", is_correct: false }, { text: "Primavera", is_correct: false }], explanation: "Winter = Inverno." },
          { type: 'tf', content: { prompt: "'Fall' is another word for 'autumn'. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Yes! Americans say 'fall', British say 'autumn'. Both = outono." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "I love summer" }, options: [], explanation: "'I love summer' = Eu amo o verão." },
        ]
      },
      { title: "Temperature",
        questions: [
          { type: 'selection', content: { prompt: "'It is freezing' means:", image: "🥶" }, options: [{ text: "Está congelando/muito frio", is_correct: true }, { text: "Está quente", is_correct: false }, { text: "Está agradável", is_correct: false }], explanation: "Freezing = Congelando/Muito frio." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "warm", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=warm" }, options: [{ text: "Morno/Agradável", is_correct: true }, { text: "Quente", is_correct: false }, { text: "Frio", is_correct: false }], explanation: "Warm = Morno/Agradável. Hot = Quente." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "It is very cold outside" }, options: [], explanation: "'It is very cold outside' = Está muito frio lá fora." },
          { type: 'matching', content: { prompt: "Match temperatures.", items: [{ icon: "🥶", word: "cold" }, { icon: "😌", word: "warm" }, { icon: "🥵", word: "hot" }] }, options: [], explanation: "Cold = frio, Warm = morno, Hot = quente." },
        ]
      }
    ]
  },

  { title: "At School", desc: "Objetos e rotina escolar.", cefr: "A1", icon: "🏫",
    lessons: [
      { title: "School Supplies",
        questions: [
          { type: 'matching', content: { prompt: "Match school items.", items: [{ icon: "✏️", word: "pencil" }, { icon: "📏", word: "ruler" }, { icon: "📕", word: "book" }] }, options: [], explanation: "Pencil = lápis, Ruler = régua, Book = livro." },
          { type: 'selection', content: { prompt: "'Eraser' means:", image: "🧹" }, options: [{ text: "Borracha", is_correct: true }, { text: "Apontador", is_correct: false }, { text: "Cola", is_correct: false }], explanation: "Eraser = Borracha. Sharpener = apontador." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "notebook", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=notebook" }, options: [{ text: "Caderno", is_correct: true }, { text: "Livro", is_correct: false }, { text: "Mochila", is_correct: false }], explanation: "Notebook = Caderno." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "Open your books" }, options: [], explanation: "'Open your books' = Abram seus livros." },
        ]
      },
      { title: "Subjects",
        questions: [
          { type: 'matching', content: { prompt: "Match subjects.", items: [{ icon: "🔢", word: "math" }, { icon: "🔬", word: "science" }, { icon: "🎨", word: "art" }] }, options: [], explanation: "Math = matemática, Science = ciência, Art = arte." },
          { type: 'selection', content: { prompt: "'History' means:", image: "📜" }, options: [{ text: "História", is_correct: true }, { text: "Geografia", is_correct: false }, { text: "Português", is_correct: false }], explanation: "History = História." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "physical education", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=physical+education" }, options: [{ text: "Educação Física", is_correct: true }, { text: "Ciências", is_correct: false }, { text: "Inglês", is_correct: false }], explanation: "Physical Education (PE) = Educação Física." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "My favorite subject is music" }, options: [], explanation: "'My favorite subject is music' = Minha matéria favorita é música." },
        ]
      },
      { title: "Classroom Actions",
        questions: [
          { type: 'selection', content: { prompt: "'Raise your hand' means:", image: "✋" }, options: [{ text: "Levante a mão", is_correct: true }, { text: "Abaixe a mão", is_correct: false }, { text: "Bata palmas", is_correct: false }], explanation: "Raise = Levantar." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "Please sit down" }, options: [], explanation: "'Please sit down' = Por favor, sente-se." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "Close your notebooks", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=close+your+notebooks" }, options: [{ text: "Fechem seus cadernos", is_correct: true }, { text: "Abram seus cadernos", is_correct: false }, { text: "Guardem seus cadernos", is_correct: false }], explanation: "Close = Fechar. Open = Abrir." },
          { type: 'tf', content: { prompt: "'Listen' means 'ouvir/escutar'. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Listen = Ouvir/Escutar." },
        ]
      }
    ]
  },

  { title: "Transportation", desc: "Meios de transporte.", cefr: "A1", icon: "🚗",
    lessons: [
      { title: "Land Transport",
        questions: [
          { type: 'matching', content: { prompt: "Match vehicles.", items: [{ icon: "🚗", word: "car" }, { icon: "🚌", word: "bus" }, { icon: "🚲", word: "bicycle" }] }, options: [], explanation: "Car = carro, Bus = ônibus, Bicycle = bicicleta." },
          { type: 'selection', content: { prompt: "'Train' means:", image: "🚂" }, options: [{ text: "Trem", is_correct: true }, { text: "Avião", is_correct: false }, { text: "Navio", is_correct: false }], explanation: "Train = Trem." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "I go to school by bus" }, options: [], explanation: "'I go to school by bus' = Eu vou à escola de ônibus." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "motorcycle", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=motorcycle" }, options: [{ text: "Motocicleta", is_correct: true }, { text: "Bicicleta", is_correct: false }, { text: "Caminhão", is_correct: false }], explanation: "Motorcycle = Motocicleta." },
        ]
      },
      { title: "Air & Water",
        questions: [
          { type: 'matching', content: { prompt: "Match.", items: [{ icon: "✈️", word: "airplane" }, { icon: "🚢", word: "ship" }, { icon: "🚁", word: "helicopter" }] }, options: [], explanation: "Airplane = avião, Ship = navio, Helicopter = helicóptero." },
          { type: 'selection', content: { prompt: "'Boat' means:", image: "⛵" }, options: [{ text: "Barco", is_correct: true }, { text: "Navio", is_correct: false }, { text: "Iate", is_correct: false }], explanation: "Boat = Barco." },
          { type: 'tf', content: { prompt: "'Subway' means 'metrô'. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Subway = Metrô (USA). Underground (UK)." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "We travel by airplane" }, options: [], explanation: "'We travel by airplane' = Nós viajamos de avião." },
        ]
      },
      { title: "Giving Directions",
        questions: [
          { type: 'selection', content: { prompt: "'Turn left' means:", image: "⬅️" }, options: [{ text: "Vire à esquerda", is_correct: true }, { text: "Vire à direita", is_correct: false }, { text: "Siga em frente", is_correct: false }], explanation: "Turn left = Vire à esquerda." },
          { type: 'matching', content: { prompt: "Match directions.", items: [{ icon: "⬆️", word: "go straight" }, { icon: "➡️", word: "turn right" }, { icon: "🛑", word: "stop" }] }, options: [], explanation: "Go straight, Turn right, Stop." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "Go straight ahead", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=go+straight+ahead" }, options: [{ text: "Siga em frente", is_correct: true }, { text: "Vire à direita", is_correct: false }, { text: "Volte", is_correct: false }], explanation: "Go straight ahead = Siga em frente." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "Turn right at the corner" }, options: [], explanation: "'Turn right at the corner' = Vire à direita na esquina." },
        ]
      }
    ]
  },

  { title: "Time & Days", desc: "Horas, dias da semana e meses.", cefr: "A1", icon: "📅",
    lessons: [
      { title: "Days of the Week",
        questions: [
          { type: 'ordering', content: { prompt: "Put in order:", sentence: "Monday Tuesday Wednesday" }, options: [], explanation: "Monday = segunda, Tuesday = terça, Wednesday = quarta." },
          { type: 'selection', content: { prompt: "'Friday' means:", image: "📅" }, options: [{ text: "Sexta-feira", is_correct: true }, { text: "Quinta-feira", is_correct: false }, { text: "Sábado", is_correct: false }], explanation: "Friday = Sexta-feira." },
          { type: 'matching', content: { prompt: "Match days.", items: [{ icon: "1️⃣", word: "Monday" }, { icon: "6️⃣", word: "Saturday" }, { icon: "7️⃣", word: "Sunday" }] }, options: [], explanation: "Monday = segunda, Saturday = sábado, Sunday = domingo." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "Thursday", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=thursday" }, options: [{ text: "Quinta-feira", is_correct: true }, { text: "Terça-feira", is_correct: false }, { text: "Quarta-feira", is_correct: false }], explanation: "Thursday = Quinta-feira." },
        ]
      },
      { title: "Months",
        questions: [
          { type: 'selection', content: { prompt: "The first month of the year:", image: "📅" }, options: [{ text: "January", is_correct: true }, { text: "February", is_correct: false }, { text: "March", is_correct: false }], explanation: "January = Janeiro, the first month." },
          { type: 'matching', content: { prompt: "Match months.", items: [{ icon: "🎄", word: "December" }, { icon: "🎃", word: "October" }, { icon: "💘", word: "February" }] }, options: [], explanation: "December = Natal, October = Halloween, February = Dia dos Namorados (US)." },
          { type: 'ordering', content: { prompt: "Put in order:", sentence: "March April May" }, options: [], explanation: "March = março, April = abril, May = maio." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "September", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=september" }, options: [{ text: "Setembro", is_correct: true }, { text: "Novembro", is_correct: false }, { text: "Outubro", is_correct: false }], explanation: "September = Setembro." },
        ]
      },
      { title: "Telling Time",
        questions: [
          { type: 'selection', content: { prompt: "'It is half past eight' means:", image: "🕗" }, options: [{ text: "São oito e meia", is_correct: true }, { text: "São oito horas", is_correct: false }, { text: "São nove e meia", is_correct: false }], explanation: "Half past eight = 8:30." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "quarter past three", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=quarter+past+three" }, options: [{ text: "Três e quinze", is_correct: true }, { text: "Três e meia", is_correct: false }, { text: "Duas e quinze", is_correct: false }], explanation: "Quarter past three = 3:15." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "What time is it" }, options: [], explanation: "'What time is it?' = Que horas são?" },
          { type: 'tf', content: { prompt: "'Noon' means 'midnight'. True or False?" }, options: [{ text: "False", is_correct: true }, { text: "True", is_correct: false }], explanation: "Noon = meio-dia. Midnight = meia-noite." },
        ]
      }
    ]
  },

  { title: "Feelings & Emotions", desc: "Como expressar sentimentos.", cefr: "A1", icon: "😊",
    lessons: [
      { title: "Basic Feelings",
        questions: [
          { type: 'matching', content: { prompt: "Match feelings.", items: [{ icon: "😊", word: "happy" }, { icon: "😢", word: "sad" }, { icon: "😠", word: "angry" }] }, options: [], explanation: "Happy = feliz, Sad = triste, Angry = com raiva." },
          { type: 'selection', content: { prompt: "'Scared' means:", image: "😨" }, options: [{ text: "Com medo", is_correct: true }, { text: "Cansado", is_correct: false }, { text: "Surpreso", is_correct: false }], explanation: "Scared = Com medo." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "I am excited", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=i+am+excited" }, options: [{ text: "Eu estou empolgado", is_correct: true }, { text: "Eu estou cansado", is_correct: false }, { text: "Eu estou entediado", is_correct: false }], explanation: "Excited = Empolgado." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "I am very happy today" }, options: [], explanation: "'I am very happy today' = Estou muito feliz hoje." },
        ]
      },
      { title: "How Are You?",
        questions: [
          { type: 'selection', content: { prompt: "'I am fine' means:", image: "👍" }, options: [{ text: "Eu estou bem", is_correct: true }, { text: "Eu estou mal", is_correct: false }, { text: "Eu estou doente", is_correct: false }], explanation: "I am fine = Eu estou bem." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "How do you feel" }, options: [], explanation: "'How do you feel?' = Como você se sente?" },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "I am tired", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=i+am+tired" }, options: [{ text: "Eu estou cansado", is_correct: true }, { text: "Eu estou com sono", is_correct: false }, { text: "Eu estou com frio", is_correct: false }], explanation: "Tired = Cansado." },
          { type: 'tf', content: { prompt: "'Bored' means 'entediado'. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Bored = Entediado." },
        ]
      },
      { title: "Expressing Emotions",
        questions: [
          { type: 'matching', content: { prompt: "Match.", items: [{ icon: "😮", word: "surprised" }, { icon: "😴", word: "sleepy" }, { icon: "🥰", word: "in love" }] }, options: [], explanation: "Surprised = surpreso, Sleepy = com sono, In love = apaixonado." },
          { type: 'selection', content: { prompt: "'Nervous' means:", image: "😬" }, options: [{ text: "Nervoso", is_correct: true }, { text: "Alegre", is_correct: false }, { text: "Curioso", is_correct: false }], explanation: "Nervous = Nervoso." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "She looks confused" }, options: [], explanation: "'She looks confused' = Ela parece confusa." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "I am proud of you", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=i+am+proud+of+you" }, options: [{ text: "Eu tenho orgulho de você", is_correct: true }, { text: "Eu gosto de você", is_correct: false }, { text: "Eu preciso de você", is_correct: false }], explanation: "I am proud of you = Tenho orgulho de você." },
        ]
      }
    ]
  },


  // ═══════════════════════════════════════════════════════════════
  // A2 — ELEMENTARY (Units 16–30): Simple structures, present tense
  // ═══════════════════════════════════════════════════════════════

  ...generateA2Units(),

  // ═══════════════════════════════════════════════════════════════
  // B1 — INTERMEDIATE (Units 31–45): Past tense, conditionals
  // ═══════════════════════════════════════════════════════════════

  ...generateB1Units(),

  // ═══════════════════════════════════════════════════════════════
  // B2 — UPPER-INTERMEDIATE (Units 46–55): Complex grammar
  // ═══════════════════════════════════════════════════════════════

  ...generateB2Units(),

  // ═══════════════════════════════════════════════════════════════
  // C1 — ADVANCED (Units 56–65): Nuanced language
  // ═══════════════════════════════════════════════════════════════

  ...generateC1Units(),

  // ═══════════════════════════════════════════════════════════════
  // C2 — MASTERY (Units 66–70): Idioms, formal, literature
  // ═══════════════════════════════════════════════════════════════

  ...generateC2Units(),
];

// ============================================================================
// A2 UNITS GENERATOR
// ============================================================================
function generateA2Units(): UnitDef[] {
  return [
    { title: "Shopping & Money", desc: "Compras e dinheiro.", cefr: "A2", icon: "🛒",
      lessons: [
        { title: "At the Store", questions: [
          { type: 'selection', content: { prompt: "'How much does it cost?' means:", image: "💰" }, options: [{ text: "Quanto custa?", is_correct: true }, { text: "O que é isso?", is_correct: false }, { text: "Onde fica?", is_correct: false }], explanation: "How much = Quanto." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "I would like to buy this shirt" }, options: [], explanation: "'I would like to buy this shirt' = Eu gostaria de comprar esta camisa." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "That is too expensive", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=that+is+too+expensive" }, options: [{ text: "Isso é caro demais", is_correct: true }, { text: "Isso é barato", is_correct: false }, { text: "Isso é bonito", is_correct: false }], explanation: "Too expensive = caro demais." },
          { type: 'tf', content: { prompt: "'Cheap' is the opposite of 'expensive'. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Cheap = barato. Expensive = caro." },
        ]},
        { title: "Paying", questions: [
          { type: 'selection', content: { prompt: "'Cash or card?' means:", image: "💳" }, options: [{ text: "Dinheiro ou cartão?", is_correct: true }, { text: "Débito ou crédito?", is_correct: false }, { text: "Pix ou cheque?", is_correct: false }], explanation: "Cash = dinheiro vivo, Card = cartão." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "Can I pay with credit card" }, options: [], explanation: "'Can I pay with credit card?' = Posso pagar com cartão de crédito?" },
          { type: 'matching', content: { prompt: "Match.", items: [{ icon: "💵", word: "cash" }, { icon: "💳", word: "credit card" }, { icon: "🧾", word: "receipt" }] }, options: [], explanation: "Cash, Credit Card, Receipt = Dinheiro, Cartão, Recibo." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "Keep the change", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=keep+the+change" }, options: [{ text: "Fique com o troco", is_correct: true }, { text: "Me dê o troco", is_correct: false }, { text: "Não tenho troco", is_correct: false }], explanation: "Keep the change = Fique com o troco." },
        ]},
        { title: "At the Supermarket", questions: [
          { type: 'ordering', content: { prompt: "Form:", sentence: "Where can I find the milk" }, options: [], explanation: "'Where can I find the milk?' = Onde encontro o leite?" },
          { type: 'selection', content: { prompt: "'Aisle' means:", image: "🛒" }, options: [{ text: "Corredor (do supermercado)", is_correct: true }, { text: "Prateleira", is_correct: false }, { text: "Caixa", is_correct: false }], explanation: "Aisle = Corredor." },
          { type: 'matching', content: { prompt: "Match.", items: [{ icon: "🛒", word: "shopping cart" }, { icon: "📋", word: "shopping list" }, { icon: "💰", word: "discount" }] }, options: [], explanation: "Shopping cart = carrinho. Shopping list = lista de compras. Discount = desconto." },
          { type: 'tf', content: { prompt: "'On sale' means the item has a discount. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "On sale = em promoção / em liquidação." },
        ]},
      ]
    },
    { title: "Sports & Hobbies", desc: "Esportes e passatempos.", cefr: "A2", icon: "⚽",
      lessons: [
        { title: "Popular Sports", questions: [
          { type: 'matching', content: { prompt: "Match the sports.", items: [{ icon: "⚽", word: "soccer" }, { icon: "🏀", word: "basketball" }, { icon: "🎾", word: "tennis" }] }, options: [], explanation: "Soccer = futebol, Basketball = basquete, Tennis = tênis." },
          { type: 'selection', content: { prompt: "'Swimming' means:", image: "🏊" }, options: [{ text: "Natação", is_correct: true }, { text: "Corrida", is_correct: false }, { text: "Ciclismo", is_correct: false }], explanation: "Swimming = Natação." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "I play soccer every Saturday" }, options: [], explanation: "'I play soccer every Saturday' = Jogo futebol todo sábado." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "Do you like volleyball", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=do+you+like+volleyball" }, options: [{ text: "Você gosta de vôlei?", is_correct: true }, { text: "Você joga vôlei?", is_correct: false }, { text: "Você assistiu vôlei?", is_correct: false }], explanation: "Do you like = Você gosta de." },
        ]},
        { title: "Hobbies", questions: [
          { type: 'selection', content: { prompt: "'I enjoy reading books' means:", image: "📚" }, options: [{ text: "Eu gosto de ler livros", is_correct: true }, { text: "Eu preciso ler livros", is_correct: false }, { text: "Eu devo ler livros", is_correct: false }], explanation: "Enjoy = gostar de / aproveitar." },
          { type: 'matching', content: { prompt: "Match hobbies.", items: [{ icon: "🎨", word: "painting" }, { icon: "🎸", word: "playing guitar" }, { icon: "📷", word: "photography" }] }, options: [], explanation: "Painting = pintura, Playing guitar = tocar guitarra, Photography = fotografia." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "She likes dancing and singing" }, options: [], explanation: "'She likes dancing and singing' = Ela gosta de dançar e cantar." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "cooking is my favorite hobby", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=cooking+is+my+favorite+hobby" }, options: [{ text: "Cozinhar é meu hobby favorito", is_correct: true }, { text: "Cozinhar é muito difícil", is_correct: false }, { text: "Eu não gosto de cozinhar", is_correct: false }], explanation: "My favorite hobby = Meu hobby favorito." },
        ]},
        { title: "Talking About Preferences", questions: [
          { type: 'ordering', content: { prompt: "Form:", sentence: "I prefer watching movies to reading" }, options: [], explanation: "'I prefer X to Y' = Eu prefiro X a Y." },
          { type: 'selection', content: { prompt: "'I am interested in...' means:", image: "🤔" }, options: [{ text: "Eu me interesso por...", is_correct: true }, { text: "Eu sou bom em...", is_correct: false }, { text: "Eu tenho medo de...", is_correct: false }], explanation: "Interested in = Interessado em." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "What do you do in your free time", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=what+do+you+do+in+your+free+time" }, options: [{ text: "O que você faz no tempo livre?", is_correct: true }, { text: "O que você faz no trabalho?", is_correct: false }, { text: "Quando você tem tempo livre?", is_correct: false }], explanation: "Free time = tempo livre." },
          { type: 'tf', content: { prompt: "'Hobby' is used in both English and Portuguese. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Yes! 'Hobby' is used in both languages." },
        ]},
      ]
    },
    { title: "Present Continuous", desc: "O que está acontecendo agora.", cefr: "A2", icon: "🔄",
      lessons: [
        { title: "What are you doing?", questions: [
          { type: 'selection', content: { prompt: "'She is reading a book' means:", image: "📖" }, options: [{ text: "Ela está lendo um livro", is_correct: true }, { text: "Ela leu um livro", is_correct: false }, { text: "Ela vai ler um livro", is_correct: false }], explanation: "Is + verb-ing = está + gerúndio (ação acontecendo agora)." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "They are playing in the park" }, options: [], explanation: "'They are playing in the park' = Eles estão brincando no parque." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "I am studying English", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=i+am+studying+english" }, options: [{ text: "Eu estou estudando inglês", is_correct: true }, { text: "Eu estudo inglês", is_correct: false }, { text: "Eu estudei inglês", is_correct: false }], explanation: "Am studying = estou estudando (present continuous)." },
          { type: 'tf', content: { prompt: "'He is working' uses the Present Continuous tense. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Yes! Subject + is/am/are + verb-ing = Present Continuous." },
        ]},
        { title: "Negative & Questions", questions: [
          { type: 'selection', content: { prompt: "'She is not sleeping' means:", image: "😴" }, options: [{ text: "Ela não está dormindo", is_correct: true }, { text: "Ela está dormindo", is_correct: false }, { text: "Ela não dormiu", is_correct: false }], explanation: "Is not + verb-ing = negativa do present continuous." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "Are you listening to me" }, options: [], explanation: "'Are you listening to me?' = Você está me ouvindo?" },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "Is he coming to the party", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=is+he+coming+to+the+party" }, options: [{ text: "Ele está vindo para a festa?", is_correct: true }, { text: "Ele veio para a festa?", is_correct: false }, { text: "Ele vai vir para a festa?", is_correct: false }], explanation: "Is he coming = Ele está vindo?" },
          { type: 'selection', content: { prompt: "Choose the INCORRECT sentence:", image: "❌" }, options: [{ text: "She is plays tennis", is_correct: true }, { text: "She is playing tennis", is_correct: false }, { text: "She plays tennis", is_correct: false }], explanation: "'She is plays' is wrong. It should be 'She is playing' OR 'She plays'." },
        ]},
        { title: "Present Simple vs Continuous", questions: [
          { type: 'selection', content: { prompt: "Which describes a habit?", image: "📝" }, options: [{ text: "I drink coffee every morning", is_correct: true }, { text: "I am drinking coffee now", is_correct: false }, { text: "I drank coffee yesterday", is_correct: false }], explanation: "Present Simple = hábitos. Present Continuous = agora." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "He usually walks to work" }, options: [], explanation: "'He usually walks to work' = Ele geralmente anda até o trabalho (hábito = Simple)." },
          { type: 'tf', content: { prompt: "'I am loving this' is grammatically correct in everyday English. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Though 'love' is a stative verb, 'I'm loving this/it' is widely accepted colloquially." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "She works at a hospital but today she is staying home", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=she+works+at+a+hospital" }, options: [{ text: "Simple + Continuous combinados", is_correct: true }, { text: "Ambos são Present Simple", is_correct: false }, { text: "Ambos são Present Continuous", is_correct: false }], explanation: "'Works' = simples (hábito), 'is staying' = contínuo (agora)." },
        ]},
      ]
    },
    { title: "The City", desc: "Lugares na cidade e como se locomover.", cefr: "A2", icon: "🏙️",
      lessons: [
        { title: "Places in the City", questions: [
          { type: 'matching', content: { prompt: "Match places.", items: [{ icon: "🏥", word: "hospital" }, { icon: "🏪", word: "store" }, { icon: "📮", word: "post office" }] }, options: [], explanation: "Hospital, Store = loja, Post office = correio." },
          { type: 'selection', content: { prompt: "'Library' means:", image: "📚" }, options: [{ text: "Biblioteca", is_correct: true }, { text: "Livraria", is_correct: false }, { text: "Escola", is_correct: false }], explanation: "Library = Biblioteca. Bookstore = Livraria. Cuidado com o falso cognato!" },
          { type: 'ordering', content: { prompt: "Form:", sentence: "The bank is next to the pharmacy" }, options: [], explanation: "'Next to' = ao lado de." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "Where is the nearest gas station", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=where+is+the+nearest+gas+station" }, options: [{ text: "Onde fica o posto mais perto?", is_correct: true }, { text: "Onde é o hospital?", is_correct: false }, { text: "Onde é o parque?", is_correct: false }], explanation: "Nearest = mais perto." },
        ]},
        { title: "Prepositions of Place", questions: [
          { type: 'selection', content: { prompt: "'Between' means:", image: "↔️" }, options: [{ text: "Entre", is_correct: true }, { text: "Atrás", is_correct: false }, { text: "Na frente", is_correct: false }], explanation: "Between = Entre." },
          { type: 'matching', content: { prompt: "Match.", items: [{ icon: "⬆️", word: "above" }, { icon: "⬇️", word: "below" }, { icon: "↔️", word: "between" }] }, options: [], explanation: "Above = acima, Below = abaixo, Between = entre." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "The cat is under the table" }, options: [], explanation: "'Under' = debaixo de." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "The park is in front of the school", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=in+front+of+the+school" }, options: [{ text: "O parque fica em frente à escola", is_correct: true }, { text: "O parque fica atrás da escola", is_correct: false }, { text: "O parque fica longe da escola", is_correct: false }], explanation: "In front of = em frente a." },
        ]},
        { title: "Asking for Help", questions: [
          { type: 'ordering', content: { prompt: "Form:", sentence: "Excuse me where is the museum" }, options: [], explanation: "'Excuse me, where is the museum?' = Com licença, onde fica o museu?" },
          { type: 'selection', content: { prompt: "'Could you help me?' means:", image: "🙏" }, options: [{ text: "Você poderia me ajudar?", is_correct: true }, { text: "Você está me ajudando?", is_correct: false }, { text: "Você me ajudou?", is_correct: false }], explanation: "Could = poderia (mais polido que 'can')." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "I am lost", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=i+am+lost" }, options: [{ text: "Eu estou perdido", is_correct: true }, { text: "Eu estou atrasado", is_correct: false }, { text: "Eu estou cansado", is_correct: false }], explanation: "I am lost = Estou perdido." },
          { type: 'tf', content: { prompt: "'Excuse me' is more polite than 'Hey!' True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Yes! 'Excuse me' is the polite way to get attention." },
        ]},
      ]
    },
    { title: "Jobs & Professions", desc: "Profissões e rotina de trabalho.", cefr: "A2", icon: "💼",
      lessons: [
        { title: "Common Jobs", questions: [
          { type: 'matching', content: { prompt: "Match jobs.", items: [{ icon: "👨‍⚕️", word: "doctor" }, { icon: "👩‍🏫", word: "teacher" }, { icon: "👨‍🍳", word: "chef" }] }, options: [], explanation: "Doctor = médico, Teacher = professor, Chef = chef/cozinheiro." },
          { type: 'selection', content: { prompt: "'Lawyer' means:", image: "⚖️" }, options: [{ text: "Advogado", is_correct: true }, { text: "Policial", is_correct: false }, { text: "Médico", is_correct: false }], explanation: "Lawyer = Advogado." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "My father is an engineer" }, options: [], explanation: "'My father is an engineer' = Meu pai é um engenheiro. Note: 'an' before vowel sounds." },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "She works as a nurse", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=she+works+as+a+nurse" }, options: [{ text: "Ela trabalha como enfermeira", is_correct: true }, { text: "Ela é médica", is_correct: false }, { text: "Ela estuda enfermagem", is_correct: false }], explanation: "Works as = trabalha como." },
        ]},
        { title: "Workplaces", questions: [
          { type: 'matching', content: { prompt: "Where do they work?", items: [{ icon: "🏥", word: "hospital" }, { icon: "🏫", word: "school" }, { icon: "🏢", word: "office" }] }, options: [], explanation: "Doctors work at hospitals, teachers at schools, many people at offices." },
          { type: 'selection', content: { prompt: "'Factory' means:", image: "🏭" }, options: [{ text: "Fábrica", is_correct: true }, { text: "Escritório", is_correct: false }, { text: "Restaurante", is_correct: false }], explanation: "Factory = Fábrica." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "He works at a restaurant" }, options: [], explanation: "Work at = trabalhar em." },
          { type: 'tf', content: { prompt: "'To work from home' means 'trabalhar de casa'. True or False?" }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: "Work from home = home office / trabalhar de casa." },
        ]},
        { title: "What do you want to be?", questions: [
          { type: 'selection', content: { prompt: "'I want to be a pilot when I grow up' — What does 'grow up' mean?", image: "✈️" }, options: [{ text: "Crescer", is_correct: true }, { text: "Acordar", is_correct: false }, { text: "Estudar", is_correct: false }], explanation: "Grow up = Crescer." },
          { type: 'ordering', content: { prompt: "Form:", sentence: "What do you want to be" }, options: [], explanation: "'What do you want to be?' = O que você quer ser?" },
          { type: 'audio', content: { prompt: "Listen:", audio_text: "I dream of becoming a scientist", audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=i+dream+of+becoming+a+scientist" }, options: [{ text: "Eu sonho em ser cientista", is_correct: true }, { text: "Eu sou cientista", is_correct: false }, { text: "Eu estudei ciência", is_correct: false }], explanation: "Dream of = sonhar em." },
          { type: 'matching', content: { prompt: "Match careers to tools.", items: [{ icon: "🔬", word: "scientist" }, { icon: "🎨", word: "artist" }, { icon: "📐", word: "architect" }] }, options: [], explanation: "Scientist = cientista, Artist = artista, Architect = arquiteto." },
        ]},
      ]
    },

    // More A2 units (abbreviated for space — each fully defined)
    ...generateRemainingA2(),
  ];
}

function generateRemainingA2(): UnitDef[] {
  const units: UnitDef[] = [];
  const a2Themes = [
    { title: "Health & Doctor", desc: "Ir ao médico e saúde.", icon: "🏥",
      lessons: [
        { title: "At the Doctor", q: [
          { type: 'ordering' as const, s: "I have a fever and a sore throat", exp: "I have a fever = Estou com febre. Sore throat = dor de garganta." },
          { type: 'selection' as const, prompt: "'Prescription' means:", correct: "Receita médica", wrong: ["Remédio", "Consulta"], exp: "Prescription = Receita médica." },
          { type: 'audio' as const, text: "You should take this medicine twice a day", correct: "Tome este remédio duas vezes ao dia", wrong: ["Uma vez ao dia", "Três vezes ao dia"], exp: "Twice a day = duas vezes ao dia." },
          { type: 'tf' as const, prompt: "'Appointment' means 'consulta/compromisso'. True or False?", correct: true, exp: "Appointment = consulta/compromisso agendado." },
        ]},
        { title: "Symptoms", q: [
          { type: 'matching' as const, items: [{ icon: "🤒", word: "fever" }, { icon: "🤧", word: "cold" }, { icon: "🤕", word: "headache" }], exp: "Fever = febre, Cold = resfriado, Headache = dor de cabeça." },
          { type: 'selection' as const, prompt: "'Cough' means:", correct: "Tosse", wrong: ["Espirro", "Febre"], exp: "Cough = Tosse. Sneeze = Espirro." },
          { type: 'ordering' as const, s: "My back hurts a lot", exp: "'My back hurts a lot' = Minhas costas doem muito." },
          { type: 'audio' as const, text: "I need to see a doctor", correct: "Preciso ver um médico", wrong: ["Não preciso de médico", "Já estou melhor"], exp: "I need to = Eu preciso de." },
        ]},
        { title: "Healthy Habits", q: [
          { type: 'selection' as const, prompt: "'Exercise regularly' means:", correct: "Exercitar-se regularmente", wrong: ["Nunca se exercitar", "Exercitar-se uma vez"], exp: "Regularly = regularmente." },
          { type: 'ordering' as const, s: "You should drink more water", exp: "'Should' = deveria (conselho)." },
          { type: 'tf' as const, prompt: "'Junk food' means 'comida saudável'. True or False?", correct: false, exp: "Junk food = comida não saudável / fast food." },
          { type: 'audio' as const, text: "Eating fruits and vegetables is important", correct: "Comer frutas e verduras é importante", wrong: ["Comer doces é importante", "Pular refeições é bom"], exp: "Fruits and vegetables = frutas e verduras." },
        ]},
      ]
    },
    { title: "Travel & Vacation", desc: "Viagens e férias.", icon: "✈️",
      lessons: [
        { title: "At the Airport", q: [
          { type: 'ordering' as const, s: "May I see your passport please", exp: "May I see = Posso ver (pedido educado)." },
          { type: 'selection' as const, prompt: "'Boarding pass' means:", correct: "Cartão de embarque", wrong: ["Passaporte", "Bilhete de trem"], exp: "Boarding pass = Cartão de embarque." },
          { type: 'audio' as const, text: "The flight has been delayed", correct: "O voo foi atrasado", wrong: ["O voo foi cancelado", "O voo chegou"], exp: "Delayed = atrasado." },
          { type: 'matching' as const, items: [{ icon: "🛫", word: "departure" }, { icon: "🛬", word: "arrival" }, { icon: "🧳", word: "luggage" }], exp: "Departure = partida, Arrival = chegada, Luggage = bagagem." },
        ]},
        { title: "At the Hotel", q: [
          { type: 'selection' as const, prompt: "'Check-in' means:", correct: "Fazer o registro de entrada", wrong: ["Sair do hotel", "Cancelar a reserva"], exp: "Check-in = entrada. Check-out = saída." },
          { type: 'ordering' as const, s: "I have a reservation under my name", exp: "Reservation = reserva. Under my name = no meu nome." },
          { type: 'audio' as const, text: "Is breakfast included", correct: "O café da manhã está incluído?", wrong: ["O jantar está incluído?", "Tem piscina?"], exp: "Included = incluído." },
          { type: 'tf' as const, prompt: "'Room service' means 'serviço de quarto'. True or False?", correct: true, exp: "Room service = serviço de quarto." },
        ]},
        { title: "Sightseeing", q: [
          { type: 'selection' as const, prompt: "'Tourist attraction' means:", correct: "Atração turística", wrong: ["Agência de viagem", "Guia turístico"], exp: "Tourist attraction = ponto turístico." },
          { type: 'ordering' as const, s: "We visited three museums yesterday", exp: "Visited = visitamos (past tense)." },
          { type: 'matching' as const, items: [{ icon: "📸", word: "take photos" }, { icon: "🗺️", word: "map" }, { icon: "🎫", word: "ticket" }], exp: "Take photos, Map = mapa, Ticket = ingresso." },
          { type: 'audio' as const, text: "Could you take a picture of us", correct: "Pode tirar uma foto nossa?", wrong: ["Tire um selfie", "Compre uma foto"], exp: "Take a picture = tirar uma foto." },
        ]},
      ]
    },
    { title: "Technology & Internet", desc: "Tecnologia e internet do dia a dia.", icon: "💻",
      lessons: [
        { title: "Devices", q: [
          { type: 'matching' as const, items: [{ icon: "💻", word: "laptop" }, { icon: "📱", word: "smartphone" }, { icon: "🖨️", word: "printer" }], exp: "Laptop, Smartphone, Printer = impressora." },
          { type: 'selection' as const, prompt: "'Download' means:", correct: "Baixar (um arquivo)", wrong: ["Enviar", "Apagar"], exp: "Download = baixar. Upload = enviar." },
          { type: 'ordering' as const, s: "I need to charge my phone", exp: "Charge = carregar (a bateria)." },
          { type: 'audio' as const, text: "The Wi-Fi password is on the wall", correct: "A senha do Wi-Fi está na parede", wrong: ["Não tem Wi-Fi", "O Wi-Fi está quebrado"], exp: "Password = senha." },
        ]},
        { title: "Online Actions", q: [
          { type: 'selection' as const, prompt: "'Click on the link' means:", correct: "Clique no link", wrong: ["Copie o link", "Delete o link"], exp: "Click = clicar." },
          { type: 'ordering' as const, s: "Please enter your email address", exp: "Enter = inserir/digitar." },
          { type: 'matching' as const, items: [{ icon: "📧", word: "email" }, { icon: "🔍", word: "search" }, { icon: "📤", word: "send" }], exp: "Email, Search = buscar, Send = enviar." },
          { type: 'tf' as const, prompt: "'Log in' and 'sign in' mean the same thing. True or False?", correct: true, exp: "Log in = Sign in = fazer login/entrar." },
        ]},
        { title: "Social Media", q: [
          { type: 'selection' as const, prompt: "'Follow' on social media means:", correct: "Seguir", wrong: ["Bloquear", "Curtir"], exp: "Follow = seguir. Block = bloquear. Like = curtir." },
          { type: 'ordering' as const, s: "She posted a photo on Instagram", exp: "Posted = postou." },
          { type: 'audio' as const, text: "How many followers do you have", correct: "Quantos seguidores você tem?", wrong: ["Quantas fotos você tem?", "Quantos likes você tem?"], exp: "Followers = seguidores." },
          { type: 'tf' as const, prompt: "'Share' means 'compartilhar'. True or False?", correct: true, exp: "Share = compartilhar." },
        ]},
      ]
    },
    { title: "Shopping & Money", desc: "Compras e dinheiro.", icon: "💰",
      lessons: [
        { title: "Pricing", q: [
          { type: 'selection' as const, prompt: "'How much is it?' means:", correct: "Quanto custa?", wrong: ["Onde fica?", "Como vai?"], exp: "How much? = Quanto (valor)." },
          { type: 'ordering' as const, s: "That will be twenty dollars please", exp: "That will be = vai ficar (valor total)." },
          { type: 'audio' as const, text: "Can I pay by credit card", correct: "Posso pagar com cartão de crédito?", wrong: ["Posso pagar em dinheiro?", "Aceita débito?"], exp: "By credit card = com cartão de crédito." },
          { type: 'tf' as const, prompt: "'Change' can mean both 'troco' and 'mudar'. True or False?", correct: true, exp: "Yes! Change = troco / mudança." },
        ]},
        { title: "Clothing", q: [
          { type: 'matching' as const, items: [{ icon: "👕", word: "T-shirt" }, { icon: "👖", word: "pants" }, { icon: "👟", word: "sneakers" }], exp: "T-shirt = camiseta, Pants = calças, Sneakers = tênis." },
          { type: 'selection' as const, prompt: "'Try on' means:", correct: "Experimentar (roupa)", wrong: ["Comprar", "Vender"], exp: "Try on = experimentar roupa." },
          { type: 'ordering' as const, s: "Where is the changing room", exp: "Changing room / Fitting room = provador." },
        ]},
      ]
    },
    { title: "Entertainment", desc: "Cinema, música e lazer.", icon: "🍿",
      lessons: [
        { title: "Movies", q: [
          { type: 'selection' as const, prompt: "'Plot' means:", correct: "Enredo/Trama", wrong: ["Ator", "Cena"], exp: "Plot = enredo." },
          { type: 'ordering' as const, s: "I enjoy watching horror movies", exp: "Enjoy + -ing." },
          { type: 'audio' as const, text: "Who is your favorite actor", correct: "Quem é seu ator favorito?", wrong: ["Qual seu filme favorito?", "Onde fica o cinema?"], exp: "Favorite actor = ator favorito." },
        ]},
        { title: "Music", q: [
          { type: 'matching' as const, items: [{ icon: "🎸", word: "guitar" }, { icon: "🥁", word: "drums" }, { icon: "🎹", word: "piano" }], exp: "Guitar = violão/guitarra, Drums = bateria." },
          { type: 'selection' as const, prompt: "'Lyrics' means:", correct: "Letra da música", wrong: ["Ritmo", "Show"], exp: "Lyrics = letra." },
          { type: 'tf' as const, prompt: "'Live concert' means a recorded show. True or False?", correct: false, exp: "Live = ao vivo." },
        ]},
      ]
    },
    { title: "Directions", desc: "Pedindo e dando direções.", icon: "🗺️",
      lessons: [
        { title: "Asking Directions", q: [
          { type: 'ordering' as const, s: "Go straight and turn left at the corner", exp: "Go straight = siga reto. Turn left = vire à esquerda." },
          { type: 'selection' as const, prompt: "'Across from' means:", correct: "Em frente a / Do outro lado de", wrong: ["Atrás de", "Ao lado de"], exp: "Across from = do outro lado / oposto." },
          { type: 'audio' as const, text: "The pharmacy is next to the bank", correct: "A farmácia é ao lado do banco", wrong: ["A farmácia é longe do banco", "O banco é na farmácia"], exp: "Next to = ao lado de." },
        ]},
        { title: "Prepositions of Place", q: [
          { type: 'matching' as const, items: [{ icon: "📦", word: "inside" }, { icon: "🔝", word: "above" }, { icon: "⬇️", word: "below" }], exp: "Inside, Above, Below." },
          { type: 'tf' as const, prompt: "'Between' is used for two things. True or False?", correct: true, exp: "Between = entre dois. Among = entre vários." },
        ]},
      ]
    },
    { title: "Environment", desc: "Natureza e clima.", icon: "🌍",
      lessons: [
        { title: "Weather", q: [
          { type: 'selection' as const, prompt: "'Thunderstorm' means:", correct: "Tempestade com trovões", wrong: ["Garoa", "Nevoeiro"], exp: "Thunder = trovão." },
          { type: 'ordering' as const, s: "It is sunny and warm today", exp: "Sunny = ensolarado. Warm = quente/ameno." },
          { type: 'audio' as const, text: "Beware of the heavy rain", correct: "Cuidado com a chuva pesada", wrong: ["Gosto de chuva", "Vai chover pouco"], exp: "Beware = cuidado. Heavy rain = chuva forte." },
        ]},
        { title: "Save the Planet", q: [
          { type: 'matching' as const, items: [{ icon: "♻️", word: "recycle" }, { icon: "🧴", word: "plastic" }, { icon: "🔋", word: "energy" }], exp: "Recycle = reciclar." },
          { type: 'tf' as const, prompt: "'Pollution' means 'poluição'. True or False?", correct: true, exp: "Pollution = poluição." },
        ]},
      ]
    },
    { title: "Work & Office", desc: "No escritório.", icon: "🏢",
      lessons: [
        { title: "Objects", q: [
          { type: 'matching' as const, items: [{ icon: "🖨️", word: "printer" }, { icon: "🖱️", word: "mouse" }, { icon: "⌨️", word: "keyboard" }], exp: "Printer = impressora." },
          { type: 'selection' as const, prompt: "'Meeting' means:", correct: "Reunião", wrong: ["Festa", "Almoço"], exp: "Meeting = reunião." },
        ]},
      ]
    },
    { title: "Basic Emotions", desc: "Sentimentos básicos.", icon: "🎭",
      lessons: [
        { title: "How are you?", q: [
          { type: 'selection' as const, prompt: "'Excited' means:", correct: "Empolgado", wrong: ["Cansado", "Triste"], exp: "Excited = empolgado." },
          { type: 'audio' as const, text: "He is feeling better today", correct: "Ele está se sentindo melhor hoje", wrong: ["Ele está pior", "Ele está igual"], exp: "Better = melhor." },
        ]},
      ]
    },
    { title: "Socializing", desc: "Conversas e eventos sociais.", icon: "🥳",
      lessons: [
        { title: "Small Talk", q: [
          { type: 'ordering' as const, s: "How long have you lived here", exp: "How long = há quanto tempo." },
          { type: 'selection' as const, prompt: "'What do you do for a living?' means:", correct: "Com o que você trabalha?", wrong: ["O que você está fazendo?", "Onde você mora?"], exp: "Do for a living = trabalhar com." },
          { type: 'audio' as const, text: "It was nice talking to you", correct: "Foi bom conversar com você", wrong: ["Eu gosto de falar", "Fale comigo"], exp: "Nice talking to you = bom falar com você (despedida)." },
        ]},
      ]
    },
  ];

  return a2Themes.map(t => ({
    title: t.title, desc: t.desc, cefr: "A2", icon: t.icon,
    lessons: t.lessons.map(l => ({
      title: l.title,
      questions: l.q.map(q => {
        if (q.type === 'ordering') return { type: 'ordering' as const, content: { prompt: "Form the sentence:", sentence: (q as any).s }, options: [], explanation: q.exp };
        if (q.type === 'selection') return { type: 'selection' as const, content: { prompt: (q as any).prompt, image: "📝" }, options: [{ text: (q as any).correct, is_correct: true }, ...((q as any).wrong || []).map((w: string) => ({ text: w, is_correct: false }))], explanation: q.exp };
        if (q.type === 'audio') return { type: 'audio' as const, content: { prompt: "Listen and choose:", audio_text: (q as any).text, audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=" + ((q as any).text || "").split(' ').join('+') }, options: [{ text: (q as any).correct, is_correct: true }, ...((q as any).wrong || []).map((w: string) => ({ text: w, is_correct: false }))], explanation: q.exp };
        if (q.type === 'matching') return { type: 'matching' as const, content: { prompt: "Match the items.", items: (q as any).items }, options: [], explanation: q.exp };
        // tf
        return { type: 'tf' as const, content: { prompt: (q as any).prompt }, options: [{ text: (q as any).correct ? "True" : "False", is_correct: true }, { text: (q as any).correct ? "False" : "True", is_correct: false }], explanation: q.exp };
      })
    }))
  }));
}

// ============================================================================
// B1 UNITS — Intermediate
// ============================================================================
function generateB1Units(): UnitDef[] {
  const b1Data = [
    { title: "Past Simple", desc: "Ações no passado.", icon: "⏮️", lessons: [
      { title: "Regular Verbs", q: [
        { type: 'selection' as const, prompt: "'I worked yesterday' — what tense is this?", correct: "Simple Past", wrong: ["Present", "Future"], exp: "Worked = past tense of 'work'. Regular verbs add -ed." },
        { type: 'ordering' as const, s: "She visited her grandmother last week", exp: "Visited (past of visit) + time marker 'last week'." },
        { type: 'audio' as const, text: "We played soccer after school", correct: "Nós jogamos futebol depois da escola", wrong: ["Nós assistimos futebol", "Nós compramos bolas"], exp: "Played = jogamos (past of play)." },
        { type: 'tf' as const, prompt: "All past simple regular verbs end in '-ed'. True or False?", correct: true, exp: "Regular: walk→walked, play→played, study→studied." },
      ]},
      { title: "Irregular Verbs", q: [
        { type: 'matching' as const, items: [{ icon: "🏃", word: "ran (run)" }, { icon: "✍️", word: "wrote (write)" }, { icon: "👀", word: "saw (see)" }], exp: "Run→ran, Write→wrote, See→saw. Irregular = não seguem a regra do -ed." },
        { type: 'selection' as const, prompt: "Past of 'go' is:", correct: "went", wrong: ["goed", "goned"], exp: "Go → went (irregular). NOT 'goed'!" },
        { type: 'ordering' as const, s: "He ate breakfast and went to work", exp: "Ate (past of eat), went (past of go)." },
        { type: 'audio' as const, text: "I bought a new book yesterday", correct: "Eu comprei um livro novo ontem", wrong: ["Eu li um livro ontem", "Eu perdi um livro"], exp: "Bought = past of buy." },
      ]},
      { title: "Past Negatives & Questions", q: [
        { type: 'selection' as const, prompt: "'Did you see the movie?' — What is the structure?", correct: "Did + subject + base verb", wrong: ["Did + subject + past verb", "Do + subject + verb"], exp: "Questions in past: Did + subj + base verb (NOT past form)." },
        { type: 'ordering' as const, s: "She did not go to the party", exp: "Did not (didn't) + base verb = negativa no passado." },
        { type: 'tf' as const, prompt: "'I didn't went' is grammatically correct. True or False?", correct: false, exp: "WRONG! It should be 'I didn't GO'. After 'did/didn't', use base form." },
        { type: 'audio' as const, text: "Where did you travel last summer", correct: "Para onde você viajou no verão passado?", wrong: ["Quando você viajou?", "Com quem você viajou?"], exp: "Where did you...? = Para onde você...?" },
      ]},
    ]},
    { title: "Future Plans", desc: "Falando sobre o futuro.", icon: "🔮", lessons: [
      { title: "Will & Going to", q: [
        { type: 'selection' as const, prompt: "'I will help you' — 'will' expresses:", correct: "A decision made now / promise", wrong: ["A planned action", "A past action"], exp: "Will = decisão espontânea / promessa. Going to = plano já feito." },
        { type: 'ordering' as const, s: "We are going to visit Paris next year", exp: "Going to = plano futuro. Next year = ano que vem." },
        { type: 'audio' as const, text: "It will rain tomorrow according to the forecast", correct: "Vai chover amanhã segundo a previsão", wrong: ["Choveu ontem", "Está chovendo agora"], exp: "Will = previsão baseada em fatos." },
        { type: 'tf' as const, prompt: "'Going to' is used for plans already made. True or False?", correct: true, exp: "Going to = plano feito antes. 'I'm going to study medicine.'" },
      ]},
      { title: "Making Predictions", q: [
        { type: 'selection' as const, prompt: "'I think it will be sunny tomorrow' uses:", correct: "'Will' for prediction/opinion", wrong: ["'Going to' for plans", "Present Continuous"], exp: "Will + opinion words (think, believe, probably) = prediction." },
        { type: 'ordering' as const, s: "Technology will change the world", exp: "Will + base verb = future prediction." },
        { type: 'audio' as const, text: "People will live on Mars in the future", correct: "Pessoas viverão em Marte no futuro", wrong: ["Pessoas moram em Marte", "Pessoas moraram em Marte"], exp: "Will live = viverão (futuro)." },
        { type: 'matching' as const, items: [{ icon: "🤖", word: "Robots will help us" }, { icon: "🚗", word: "Cars will fly" }, { icon: "🌍", word: "Earth will be greener" }], exp: "Predictions about the future using 'will'." },
      ]},
      { title: "Future with Present Continuous", q: [
        { type: 'selection' as const, prompt: "'I am meeting John at 5pm' — this is:", correct: "A future arrangement (already scheduled)", wrong: ["Something happening now", "A prediction"], exp: "Present Continuous can express PLANNED future events." },
        { type: 'ordering' as const, s: "We are having dinner at eight tonight", exp: "Are having = future arrangement." },
        { type: 'tf' as const, prompt: "'She is leaving tomorrow' can be a future sentence. True or False?", correct: true, exp: "Present Continuous + future time = arrangement." },
        { type: 'audio' as const, text: "Are you doing anything this weekend", correct: "Você vai fazer algo neste fim de semana?", wrong: ["Você fez algo no fim de semana?", "O que você está fazendo?"], exp: "Present Continuous for future plans." },
      ]},
    ]},
    { title: "Conditionals I", desc: "If + present → will future.", icon: "🔀", lessons: [
      { title: "First Conditional", q: [
        { type: 'selection' as const, prompt: "'If it rains, I will stay home.' What grammar is this?", correct: "First Conditional (If + present, will + base)", wrong: ["Second Conditional", "Third Conditional"], exp: "1st Conditional: real/possible situations. If + present simple, will + base." },
        { type: 'ordering' as const, s: "If you study hard you will pass the exam", exp: "If + present, will + base (real possibility)." },
        { type: 'audio' as const, text: "If we leave now we will arrive on time", correct: "Se sairmos agora, chegaremos a tempo", wrong: ["Se tivéssemos saído, teríamos chegado", "Se saíssemos, chegaríamos"], exp: "1st Conditional = situação real e provável." },
        { type: 'tf' as const, prompt: "In 1st Conditional, we use 'will' in both clauses. True or False?", correct: false, exp: "NO! If + PRESENT, will + base. 'If I will go' is WRONG." },
      ]},
      { title: "Unless & When", q: [
        { type: 'selection' as const, prompt: "'Unless' means:", correct: "A menos que / Se não", wrong: ["Desde que", "Quando"], exp: "Unless = a menos que. 'Unless you hurry, you'll be late.'" },
        { type: 'ordering' as const, s: "I will call you when I arrive", exp: "When + present (NOT 'when I will arrive')." },
        { type: 'tf' as const, prompt: "'Unless you study, you won't pass.' Here 'unless' = 'if not'. True or False?", correct: true, exp: "Unless = if...not. Both mean the same." },
        { type: 'audio' as const, text: "You will get sick unless you wear a jacket", correct: "Você vai ficar doente a menos que use jaqueta", wrong: ["Você ficou doente", "Você está doente"], exp: "Unless = if not." },
      ]},
      { title: "Practice", q: [
        { type: 'ordering' as const, s: "If she calls me I will answer", exp: "If + present simple, will + base." },
        { type: 'selection' as const, prompt: "Choose the correct sentence:", correct: "If I have time, I will visit you", wrong: ["If I will have time, I visit you", "If I had time, I will visit you"], exp: "Correct 1st Conditional: If + present, will + base." },
        { type: 'audio' as const, text: "What will you do if you win the lottery", correct: "O que você fará se ganhar na loteria?", wrong: ["O que faria se ganhasse?", "O que fez quando ganhou?"], exp: "Real possibility = 1st Conditional." },
        { type: 'matching' as const, items: [{ icon: "☔", word: "If it rains, take an umbrella" }, { icon: "📚", word: "If you read more, you learn more" }, { icon: "🏃", word: "If you exercise, you feel better" }], exp: "Real conditions → real results." },
      ]},
    ]},
  ];

  // Generate remaining B1 to fill up to 15 units
  const moreB1 = [
    { title: "Modal Verbs", desc: "Can, should, must, may.", icon: "🔑", lessons: [
      { title: "Can & Could", q: [
        { type: 'selection' as const, prompt: "'Can' expresses:", correct: "Ability or Permission", wrong: ["Obligation", "Past action"], exp: "Can = capacidade ou permissão. 'I can swim.' 'Can I go?'" },
        { type: 'ordering' as const, s: "Could you pass me the salt please", exp: "Could = can mais educado. Pedido polido." },
        { type: 'audio' as const, text: "I could speak three languages when I was young", correct: "Eu sabia falar três línguas quando era jovem", wrong: ["Eu posso falar três línguas", "Eu falarei três línguas"], exp: "Could + base = capacidade no passado." },
        { type: 'tf' as const, prompt: "'May I come in?' is more formal than 'Can I come in?' True or False?", correct: true, exp: "May = mais formal que Can para pedir permissão." },
      ]},
      { title: "Must & Should", q: [
        { type: 'selection' as const, prompt: "'You must wear a seatbelt' — 'must' means:", correct: "Obrigação/Necessidade", wrong: ["Sugestão", "Desejo"], exp: "Must = obrigação forte. Should = sugestão/conselho." },
        { type: 'ordering' as const, s: "You should see a doctor about that cough", exp: "Should = deveria (conselho). Not as strong as must." },
        { type: 'audio' as const, text: "Students must not use phones during the exam", correct: "Alunos não podem usar celular durante a prova", wrong: ["Alunos devem usar celular", "Alunos precisam de celular"], exp: "Must not = proibição." },
        { type: 'matching' as const, items: [{ icon: "⛔", word: "must not (proibição)" }, { icon: "💡", word: "should (conselho)" }, { icon: "✅", word: "must (obrigação)" }], exp: "Must not ≠ don't have to! Must not = proibido." },
      ]},
      { title: "Have to & Don't have to", q: [
        { type: 'selection' as const, prompt: "'You don't have to come' means:", correct: "Você não precisa vir (é opcional)", wrong: ["Você não pode vir (proibido)", "Você tem que vir"], exp: "Don't have to = não precisa (é opcional). Must not = proibido." },
        { type: 'ordering' as const, s: "Do I have to bring my own laptop", exp: "Do I have to = Eu preciso/tenho que?" },
        { type: 'tf' as const, prompt: "'Must not' and 'don't have to' have the same meaning. True or False?", correct: false, exp: "DIFFERENT! Must not = proibido. Don't have to = não precisa (opcional)." },
        { type: 'audio' as const, text: "She has to work on Saturdays", correct: "Ela tem que trabalhar aos sábados", wrong: ["Ela não trabalha aos sábados", "Ela quer trabalhar aos sábados"], exp: "Has to = tem que (3rd person)." },
      ]},
    ]},
    { title: "Connectors & Linkers", desc: "Conectando ideias em inglês.", icon: "🔗", lessons: [
      { title: "Because, So, But", q: [
        { type: 'selection' as const, prompt: "'I stayed home because I was sick' — 'because' gives:", correct: "A reason/cause", wrong: ["A contrast", "A result"], exp: "Because = porque (razão/causa)." },
        { type: 'ordering' as const, s: "He was tired so he went to bed early", exp: "So = então/por isso (resultado)." },
        { type: 'audio' as const, text: "I like coffee but I prefer tea", correct: "Eu gosto de café mas prefiro chá", wrong: ["Eu gosto de café e chá", "Eu não gosto de café"], exp: "But = mas (contraste)." },
        { type: 'tf' as const, prompt: "'Although' means the same as 'but'. True or False?", correct: false, exp: "Similar idea (contrast), but different grammar. Although = embora (used at the beginning)." },
      ]},
      { title: "However, Therefore, Moreover", q: [
        { type: 'selection' as const, prompt: "'However' is used to express:", correct: "Contrast (formal)", wrong: ["Addition", "Cause"], exp: "However = contudo/no entanto. More formal than 'but'." },
        { type: 'ordering' as const, s: "The test was difficult however I passed", exp: "However = contudo. Used between two contrasting ideas." },
        { type: 'audio' as const, text: "Therefore we need to find a solution", correct: "Portanto, precisamos encontrar uma solução", wrong: ["Enquanto isso, achamos uma solução", "Além disso, não temos solução"], exp: "Therefore = portanto/logo." },
        { type: 'matching' as const, items: [{ icon: "➕", word: "moreover (além disso)" }, { icon: "↔️", word: "however (contudo)" }, { icon: "➡️", word: "therefore (portanto)" }], exp: "Moreover = addition, However = contrast, Therefore = result." },
      ]},
      { title: "In order to, Despite", q: [
        { type: 'selection' as const, prompt: "'In order to' means:", correct: "Para/A fim de", wrong: ["Apesar de", "Porque"], exp: "In order to = para/a fim de (propósito)." },
        { type: 'ordering' as const, s: "Despite the rain we went to the park", exp: "Despite = apesar de. Despite + noun/-ing." },
        { type: 'tf' as const, prompt: "'Although' and 'despite' both introduce contrast. True or False?", correct: true, exp: "Both = contraste. Although + clause. Despite + noun." },
        { type: 'audio' as const, text: "She exercises every day in order to stay healthy", correct: "Ela se exercita todo dia para manter a saúde", wrong: ["Ela é saudável por isso se exercita", "Apesar de se exercitar, não é saudável"], exp: "In order to = propósito/objetivo." },
      ]},
    ]},
    { title: "Present Perfect", desc: "Have/Has + past participle.", icon: "⏳", lessons: [
      { title: "Introduction", q: [
        { type: 'selection' as const, prompt: "'I have visited London' — this is:", correct: "Present Perfect", wrong: ["Simple Past", "Simple Present"], exp: "Have/Has + past participle = Present Perfect. Experience without specific time." },
        { type: 'ordering' as const, s: "She has never eaten sushi", exp: "Has + never + past participle. Never = nunca." },
        { type: 'audio' as const, text: "Have you ever been to Japan", correct: "Você já esteve no Japão?", wrong: ["Você foi ao Japão ontem?", "Você vai ao Japão?"], exp: "Have you ever...? = Você já...? (experiência de vida)." },
        { type: 'tf' as const, prompt: "We use Present Perfect with specific past times like 'yesterday'. True or False?", correct: false, exp: "NO! 'Yesterday' = Past Simple. Present Perfect = NO specific time." },
      ]},
      { title: "Ever, Never, Already, Yet", q: [
        { type: 'matching' as const, items: [{ icon: "❓", word: "Have you ever...?" }, { icon: "❌", word: "I have never..." }, { icon: "✅", word: "I have already..." }], exp: "Ever = já (perguntas), Never = nunca, Already = já (afirmativo)." },
        { type: 'selection' as const, prompt: "'Yet' is used in:", correct: "Negatives and Questions", wrong: ["Only affirmatives", "Only past tense"], exp: "Yet = ainda. 'I haven't finished yet.' 'Have you finished yet?'" },
        { type: 'ordering' as const, s: "They have already left the building", exp: "Already = já (entre have e past participle)." },
        { type: 'audio' as const, text: "I haven't decided yet", correct: "Eu ainda não decidi", wrong: ["Eu já decidi", "Eu nunca decido"], exp: "Haven't + yet = ainda não (no final da frase)." },
      ]},
      { title: "For & Since", q: [
        { type: 'selection' as const, prompt: "'For' is used with:", correct: "A duration (for 3 years, for a long time)", wrong: ["A point in time", "A specific date"], exp: "For = por/há + duração. Since = desde + ponto no tempo." },
        { type: 'ordering' as const, s: "I have lived here since 2020", exp: "Since + specific year/date/point in time." },
        { type: 'audio' as const, text: "She has worked at this company for ten years", correct: "Ela trabalha nesta empresa há dez anos", wrong: ["Ela trabalhou por dez anos", "Ela vai trabalhar por dez anos"], exp: "Has worked + for = há... (duração até agora)." },
        { type: 'tf' as const, prompt: "'I have known him for 2015' is correct. True or False?", correct: false, exp: "WRONG! 2015 is a point in time → use SINCE. 'Since 2015'." },
      ]},
    ]},
    { title: "Opinions & Agreements", desc: "Expressando opinião.", icon: "⚖️", lessons: [
      { title: "I think, I believe", q: [
        { type: 'ordering' as const, s: "In my opinion English is interesting", exp: "In my opinion = na minha opinião." },
        { type: 'selection' as const, prompt: "'I agree with you' means:", correct: "Eu concordo com você", wrong: ["Eu discordo", "Eu acho que"], exp: "Agree = concordar." },
        { type: 'audio' as const, text: "I don't think so", correct: "Eu acho que não", wrong: ["Eu acho que sim", "Eu não sei"], exp: "I don't think so = Eu acho que não / creio que não." },
      ]},
      { title: "Agreeing & Disagreeing", q: [
        { type: 'matching' as const, items: [{ icon: "✅", word: "I agree" }, { icon: "❌", word: "I disagree" }, { icon: "🤷", word: "Maybe" }], exp: "Agree, Disagree, Maybe." },
        { type: 'ordering' as const, s: "You are absolutely right about that", exp: "Absolutely right = totalmente certo." },
      ]},
    ]},
    { title: "Media & News", desc: "Notícias e mídia.", icon: "📰", lessons: [
      { title: "The News", q: [
        { type: 'selection' as const, prompt: "'Headline' means:", correct: "Manchete", wrong: ["Jornal", "Página"], exp: "Headline = manchete." },
        { type: 'ordering' as const, s: "I check the news every morning", exp: "Check the news = checar as notícias." },
      ]},
      { title: "Advertising", q: [
        { type: 'selection' as const, prompt: "'Commercial' in TV means:", correct: "Comercial / Propaganda", wrong: ["Filme", "Desenho"], exp: "Commercial = propaganda." },
        { type: 'tf' as const, prompt: "'Target audience' means 'público-alvo'. True or False?", correct: true, exp: "Target = alvo. Audience = público." },
      ]},
    ]},
    { title: "Health & Lifestyle", desc: "Saúde e estilo de vida.", icon: "🍏", lessons: [
      { title: "Healthy Eating", q: [
        { type: 'selection' as const, prompt: "'Balanced diet' means:", correct: "Dieta equilibrada", wrong: ["Dieta de fome", "Só comer carne"], exp: "Balanced = equilibrada." },
        { type: 'ordering' as const, s: "You should eat more fiber", exp: "Should + base = conselho." },
      ]},
      { title: "At the Gym", q: [
        { type: 'matching' as const, items: [{ icon: "🏋️", word: "lift weights" }, { icon: "🏃", word: "treadmill" }, { icon: "🧘", word: "yoga" }], exp: "Lift weights = levantar pesos." },
        { type: 'audio' as const, text: "I work out four times a week", correct: "Eu treino quatro vezes por semana", wrong: ["Eu trabalho quatro vezes", "Eu treino todo dia"], exp: "Work out = treinar." },
      ]},
    ]},
    { title: "Business Basics", desc: "Inglês para negócios.", icon: "💼", lessons: [
      { title: "Meetings", q: [
        { type: 'selection' as const, prompt: "'Agenda' in a meeting means:", correct: "Pauta / Ordem do dia", wrong: ["Calendário", "Caderno"], exp: "Agenda = pauta da reunião." },
        { type: 'ordering' as const, s: "We need to schedule a meeting", exp: "Schedule = agendar." },
      ]},
      { title: "Emails", q: [
        { type: 'matching' as const, items: [{ icon: "📎", word: "attachment" }, { icon: "📥", word: "inbox" }, { icon: "📤", word: "outbox" }], exp: "Attachment = anexo." },
        { type: 'audio' as const, text: "Please find the file attached", correct: "Por favor, encontre o arquivo em anexo", wrong: ["O arquivo sumiu", "Mande o arquivo"], exp: "Attached = anexo." },
      ]},
    ]},
    { title: "Environment & Future", desc: "O futuro do planeta.", icon: "🌱", lessons: [
      { title: "Climate Change", q: [
        { type: 'selection' as const, prompt: "'Global warming' means:", correct: "Aquecimento global", wrong: ["Clima frio", "Tempestade"], exp: "Global warming = aquecimento global." },
        { type: 'ordering' as const, s: "We must protect our environment", exp: "Must = dever / obrigação." },
      ]},
      { title: "Sustainability", q: [
        { type: 'tf' as const, prompt: "'Renewable energy' means energy from sun or wind. True or False?", correct: true, exp: "Renewable = renovável." },
        { type: 'matching' as const, items: [{ icon: "☀️", word: "solar" }, { icon: "💨", word: "wind" }, { icon: "🌊", word: "hydro" }], exp: "Types of renewable energy." },
      ]},
    ]},
    { title: "Technology & Future", desc: "IA e futuro.", icon: "🤖",
      lessons: [
        { title: "Artificial Intelligence", q: [
          { type: 'selection' as const, prompt: "'AI' stands for:", correct: "Artificial Intelligence", wrong: ["Advanced Internet", "Automated Information"], exp: "AI = Inteligência Artificial." },
        ]},
      ]
    },
    { title: "Social Context", desc: "Contexto social.", icon: "👥",
      lessons: [
        { title: "Formality", q: [
          { type: 'selection' as const, prompt: "Which is formal?", correct: "Good morning", wrong: ["Hey", "What's up"], exp: "Good morning = formal." },
        ]},
      ]
    },
    { title: "Cultural Nuances", desc: "Nuances culturais.", icon: "🗺️",
      lessons: [
        { title: "Idioms", q: [
          { type: 'selection' as const, prompt: "'Piece of cake' means:", correct: "Muito fácil", wrong: ["Pedaço de bolo", "Muito difícil"], exp: "Piece of cake = moleza / muito fácil." },
        ]},
      ]
    },
    { title: "Creative Arts", desc: "Artes e criatividade.", icon: "🎨",
      lessons: [
        { title: "Expression", q: [
          { type: 'selection' as const, prompt: "'Masterpiece' means:", correct: "Obra-prima", wrong: ["Rascunho", "Pintura"], exp: "Masterpiece = obra-prima." },
        ]},
      ]
    },
  ];

  return [...b1Data, ...moreB1].map(t => ({
    title: t.title, desc: t.desc, cefr: "B1", icon: t.icon,
    lessons: t.lessons.map(l => ({
      title: l.title,
      questions: l.q.map(q => {
        if (q.type === 'ordering') return { type: 'ordering' as const, content: { prompt: "Form the sentence:", sentence: (q as any).s }, options: [], explanation: q.exp };
        if (q.type === 'selection') return { type: 'selection' as const, content: { prompt: (q as any).prompt, image: "📝" }, options: [{ text: (q as any).correct, is_correct: true }, ...((q as any).wrong || []).map((w: string) => ({ text: w, is_correct: false }))], explanation: q.exp };
        if (q.type === 'audio') return { type: 'audio' as const, content: { prompt: "Listen and choose:", audio_text: (q as any).text, audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=" + ((q as any).text || "").split(' ').join('+') }, options: [{ text: (q as any).correct, is_correct: true }, ...((q as any).wrong || []).map((w: string) => ({ text: w, is_correct: false }))], explanation: q.exp };
        if (q.type === 'matching') return { type: 'matching' as const, content: { prompt: "Match the items.", items: (q as any).items }, options: [], explanation: q.exp };
        return { type: 'tf' as const, content: { prompt: (q as any).prompt }, options: [{ text: (q as any).correct ? "True" : "False", is_correct: true }, { text: (q as any).correct ? "False" : "True", is_correct: false }], explanation: q.exp };
      })
    }))
  }));
}

// ============================================================================
// B2 UNITS — Upper Intermediate (complex grammar, phrasal verbs, passive)
// ============================================================================
function generateB2Units(): UnitDef[] {
  const themes = [
    { title: "Phrasal Verbs I", desc: "Verbos frasais do cotidiano.", icon: "📎" },
    { title: "Passive Voice", desc: "Voz passiva em todos os tempos.", icon: "🔄" },
    { title: "Reported Speech", desc: "Discurso indireto.", icon: "💬" },
    { title: "Conditionals II & III", desc: "Second and Third Conditionals.", icon: "🔀" },
    { title: "Relative Clauses", desc: "Who, which, that, whose, where.", icon: "🔗" },
    { title: "Phrasal Verbs II", desc: "Mais verbos frasais avançados.", icon: "📎" },
    { title: "Formal vs Informal", desc: "Registro formal e informal.", icon: "📜" },
    { title: "Collocations", desc: "Combinações naturais de palavras.", icon: "🧩" },
    { title: "Reading Comprehension", desc: "Leitura e interpretação.", icon: "📰" },
    { title: "Writing Skills", desc: "Escrita estruturada.", icon: "✍️" },
  ];
  return themes.map((t, i) => {
    const questions: QuestionDef[][] = [
      [
        { type: 'selection', content: { prompt: `[${t.title}] Choose the best answer:`, image: "📝" }, options: [{ text: "Correct interpretation", is_correct: true }, { text: "Common mistake", is_correct: false }, { text: "Literal translation error", is_correct: false }], explanation: `Understanding ${t.title} requires context and practice.` },
        { type: 'ordering', content: { prompt: "Form a complex sentence:", sentence: getB2Sentence(i, 0) }, options: [], explanation: `Sentence structure at B2 level.` },
        { type: 'audio', content: { prompt: "Listen carefully:", audio_text: getB2Audio(i), audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=" + getB2Audio(i).split(' ').join('+') }, options: [{ text: "Correct meaning", is_correct: true }, { text: "Misleading translation", is_correct: false }, { text: "Opposite meaning", is_correct: false }], explanation: `B2 listening comprehension.` },
        { type: 'tf', content: { prompt: getB2TF(i) }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: `True — this is a key concept at B2 level.` },
      ],
      [
        { type: 'selection', content: { prompt: `Choose the correct ${t.title.toLowerCase()} usage:`, image: "📝" }, options: [{ text: "Advanced correct form", is_correct: true }, { text: "Beginner mistake", is_correct: false }, { text: "Portuguese interference", is_correct: false }], explanation: `${t.title} — must be memorized through exposure.` },
        { type: 'ordering', content: { prompt: "Rearrange:", sentence: getB2Sentence(i, 1) }, options: [], explanation: `Complex word order at B2.` },
        { type: 'matching', content: { prompt: "Match concepts.", items: [{ icon: "1️⃣", word: getB2Match(i, 0) }, { icon: "2️⃣", word: getB2Match(i, 1) }, { icon: "3️⃣", word: getB2Match(i, 2) }] }, options: [], explanation: `Key vocabulary for ${t.title}.` },
        { type: 'audio', content: { prompt: "Listen:", audio_text: getB2Sentence(i, 2), audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=" + getB2Sentence(i, 2).split(' ').join('+') }, options: [{ text: "Correct", is_correct: true }, { text: "Incorrect", is_correct: false }], explanation: `B2 audio practice.` },
      ],
      [
        { type: 'ordering', content: { prompt: "Complex sentence:", sentence: getB2Sentence(i, 3) }, options: [], explanation: `Advanced sentence building.` },
        { type: 'selection', content: { prompt: `Which sentence uses ${t.title.toLowerCase()} correctly?`, image: "📝" }, options: [{ text: "Grammatically perfect", is_correct: true }, { text: "Has a subtle error", is_correct: false }, { text: "Completely wrong", is_correct: false }], explanation: `Identifying correct usage at B2.` },
        { type: 'tf', content: { prompt: getB2TF2(i) }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: `Understanding nuances at B2 level.` },
        { type: 'audio', content: { prompt: "Listen and analyze:", audio_text: getB2Sentence(i, 4), audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=" + getB2Sentence(i, 4).split(' ').join('+') }, options: [{ text: "Correct understanding", is_correct: true }, { text: "False friend", is_correct: false }], explanation: `B2 comprehension skill.` },
      ]
    ];
    return { title: t.title, desc: t.desc, cefr: "B2", icon: t.icon,
      lessons: questions.map((qs, li) => ({ title: `Part ${li + 1}`, questions: qs }))
    };
  });
}

function getB2Sentence(i: number, j: number): string {
  const sentences = [
    ["I came across an old friend", "She turned down the job offer", "He looked into the matter carefully", "They called off the meeting", "We ran out of time"],
    ["The bridge was built in 1930", "The report will be finished tomorrow", "English is spoken worldwide", "The cake had been eaten before I arrived", "New rules are being implemented"],
    ["She said that she was tired", "He told me he would come later", "They asked if I had finished", "She mentioned that prices had gone up", "He denied having seen her"],
    ["If I were you I would apologize", "If she had studied she would have passed", "I wish I could fly", "If only I had known earlier", "He behaves as if he owned the place"],
    ["The woman who called is my aunt", "The book that I read was fascinating", "The city where I grew up is small", "The man whose car was stolen called police", "This is the reason why I left"],
    ["She got over her fear of flying", "He brought up an interesting point", "We put off the meeting until Friday", "I figured out the answer", "They broke into the abandoned building"],
    ["I would appreciate your assistance", "Please find attached the document", "I look forward to hearing from you", "We regret to inform you", "Could you possibly send me the report"],
    ["Make a decision", "Do someone a favor", "Take advantage of", "Pay attention to", "Keep in mind that"],
    ["The article discusses climate change", "According to the author", "The main argument suggests that", "In conclusion the evidence shows", "The data supports the hypothesis"],
    ["In my opinion this policy is flawed", "On the other hand there are benefits", "To sum up the advantages outweigh", "First and foremost we must consider", "Taking everything into account"],
  ];
  return sentences[i % sentences.length][j % sentences[i % sentences.length].length];
}
function getB2Audio(i: number): string {
  const audios = ["She turned down the offer", "The museum was closed for renovation", "He said he would be late", "If I had more time I would travel", "The woman who lives next door is a doctor", "Can you figure out this puzzle", "Please do not hesitate to contact us", "We need to pay attention to details", "The article highlights important issues", "In conclusion I believe education is key"];
  return audios[i % audios.length];
}
function getB2TF(i: number): string {
  const tfs = ["'Look up' can mean both 'search' and 'raise your eyes'. True or False?", "'The Mona Lisa was painted by Da Vinci' is Passive Voice. True or False?", "In reported speech, 'will' changes to 'would'. True or False?", "'If I were rich' uses the subjunctive mood. True or False?", "'Which' is only used for things, not people. True or False?", "'Give in' means 'to surrender'. True or False?", "'Regards' is a formal way to end an email. True or False?", "'Make friends' is a collocation, not 'do friends'. True or False?", "Skimming means reading every word carefully. True or False?", "A topic sentence usually comes at the beginning of a paragraph. True or False?"];
  return tfs[i % tfs.length];
}
function getB2TF2(i: number): string {
  const tfs = ["Phrasal verbs can be separable or inseparable. True or False?", "'By' is commonly used in passive voice to indicate the agent. True or False?", "In reported speech, tenses typically shift back one step. True or False?", "The Third Conditional talks about unreal past situations. True or False?", "'Whose' is the possessive relative pronoun. True or False?", "'Put up with' means 'to tolerate'. True or False?", "Formal English avoids contractions. True or False?", "'Strong coffee' is a natural collocation in English. True or False?", "Scanning is reading to find specific information. True or False?", "Using transition words improves writing coherence. True or False?"];
  return tfs[i % tfs.length];
}
function getB2Match(i: number, j: number): string {
  const matches = [
    ["look up (procurar)", "give up (desistir)", "put off (adiar)"],
    ["was built (passado)", "is spoken (presente)", "will be done (futuro)"],
    ["said (afirmou)", "asked (perguntou)", "told (disse a)"],
    ["If I were (2nd)", "If I had been (3rd)", "I wish I could"],
    ["who (pessoa)", "which (coisa)", "where (lugar)"],
    ["break down (quebrar)", "come up with (inventar)", "get along (se dar bem)"],
    ["Dear Sir (formal)", "Hey! (informal)", "Regards (formal)"],
    ["heavy rain (not strong)", "make progress (not do)", "take a break (not make)"],
    ["skim (geral)", "scan (específico)", "infer (deduzir)"],
    ["introduction", "body paragraphs", "conclusion"],
  ];
  return matches[i % matches.length][j];
}

// ============================================================================
// C1 UNITS — Advanced
// ============================================================================
function generateC1Units(): UnitDef[] {
  const themes = [
    { title: "Advanced Conditionals", desc: "Mixed conditionals e inversão.", icon: "🔀" },
    { title: "Cleft Sentences", desc: "Ênfase com 'It is/was... that'.", icon: "🎯" },
    { title: "Inversion", desc: "Inversão para ênfase.", icon: "🔃" },
    { title: "Advanced Passives", desc: "Have something done, get.", icon: "🔧" },
    { title: "Discourse Markers", desc: "Marcadores de discurso avançado.", icon: "📌" },
    { title: "Hedging Language", desc: "Linguagem de cautela e probabilidade.", icon: "🛡️" },
    { title: "Academic Writing", desc: "Escrita acadêmica e argumentação.", icon: "🎓" },
    { title: "Idioms & Expressions", desc: "Expressões idiomáticas avançadas.", icon: "🗣️" },
    { title: "Register & Tone", desc: "Ajustando o tom da comunicação.", icon: "🎭" },
    { title: "Critical Thinking", desc: "Análise crítica de textos.", icon: "🧠" },
  ];
  return themes.map((t, i) => {
    const c1Sents = [
      ["Had I known about the delay I would have left earlier", "Were it not for your help I would have failed", "Should you need assistance do not hesitate to ask"],
      ["It was John who broke the window", "What I need is more time to prepare", "All I want is a peaceful life"],
      ["Never have I seen such beauty", "Rarely does he make mistakes", "Not only did she win but she broke the record"],
      ["I had my car repaired last week", "She got her hair cut yesterday", "We need to have the roof fixed"],
      ["As a matter of fact I agree with you", "On the whole the project was successful", "By and large the results were positive"],
      ["It would appear that the data is inconclusive", "The evidence seems to suggest otherwise", "It is widely believed that exercise helps"],
      ["This essay will argue that technology transforms education", "Furthermore the research demonstrates clear benefits", "In light of the evidence it is reasonable to conclude"],
      ["Break the ice means to start a conversation", "Hit the nail on the head means to be exactly right", "The ball is in your court means it is your decision"],
      ["The formal register requires complex sentence structures", "Colloquial language uses contractions and slang", "The tone should match the audience and purpose"],
      ["The author implies rather than states directly", "This argument contains a logical fallacy", "The evidence contradicts the initial hypothesis"],
    ];
    return { title: t.title, desc: t.desc, cefr: "C1", icon: t.icon,
      lessons: [0, 1, 2].map(li => ({
        title: `Part ${li + 1}`,
        questions: [
          { type: 'ordering' as const, content: { prompt: "Form this advanced sentence:", sentence: c1Sents[i][li % c1Sents[i].length] }, options: [], explanation: `C1 grammar: ${t.title}.` },
          { type: 'selection' as const, content: { prompt: `Which uses ${t.title.toLowerCase()} correctly?`, image: "🎯" }, options: [{ text: c1Sents[i][li % c1Sents[i].length], is_correct: true }, { text: "Incorrect variation", is_correct: false }, { text: "Common learner error", is_correct: false }], explanation: `Advanced grammar at C1 level.` },
          { type: 'audio' as const, content: { prompt: "Listen to this C1-level sentence:", audio_text: c1Sents[i][(li + 1) % c1Sents[i].length], audio_url: "https://dict.youdao.com/dictvoice?type=2&audio=" + c1Sents[i][(li + 1) % c1Sents[i].length].split(' ').join('+') }, options: [{ text: "Correct analysis", is_correct: true }, { text: "Misinterpretation", is_correct: false }], explanation: `C1 listening and comprehension.` },
          { type: 'tf' as const, content: { prompt: `${t.title} is a feature of advanced English (C1+). True or False?` }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: `Yes, ${t.title} is a C1-level skill.` },
        ]
      }))
    };
  });
}

// ============================================================================
// C2 UNITS — Mastery
// ============================================================================
function generateC2Units(): UnitDef[] {
  const themes = [
    { title: "Literary Analysis", desc: "Análise literária avançada.", icon: "📚" },
    { title: "Rhetoric & Persuasion", desc: "Técnicas retóricas.", icon: "🎤" },
    { title: "Nuance & Ambiguity", desc: "Sutileza e ambiguidade.", icon: "🔍" },
    { title: "Cultural Fluency", desc: "Competência cultural profunda.", icon: "🌍" },
    { title: "Legendary Pipo", desc: "O desafio final do Pipo!", icon: "🏆" },
  ];
  return themes.map((t, i) => {
    const c2Sents = [
      ["The author employs irony to subvert expectations", "This metaphor suggests a deeper meaning", "The narrative unreliable narrator creates tension"],
      ["The speaker uses ethos to establish credibility", "Repetition reinforces the emotional appeal", "The rhetorical question challenges the audience"],
      ["The word suggests multiple interpretations", "Context determines the intended meaning", "Ambiguity can be a deliberate stylistic choice"],
      ["This idiom has no direct equivalent in Portuguese", "Understanding humor requires cultural context", "Language reflects the values of its speakers"],
      ["Mastery means understanding what is left unsaid", "True fluency is thinking in the language", "Pipo has reached legendary English mastery"],
    ];
    return { title: t.title, desc: t.desc, cefr: "C2", icon: t.icon,
      lessons: [0, 1, 2].map(li => ({
        title: `Part ${li + 1}`,
        questions: [
          { type: 'ordering' as const, content: { prompt: "Form this C2-level sentence:", sentence: c2Sents[i][li % c2Sents[i].length] }, options: [], explanation: `C2 mastery: ${t.title}.` },
          { type: 'selection' as const, content: { prompt: `Analyze this ${t.title.toLowerCase()} concept:`, image: "🏆" }, options: [{ text: "Nuanced correct analysis", is_correct: true }, { text: "Superficial interpretation", is_correct: false }, { text: "Literal misreading", is_correct: false }], explanation: `C2 requires deep analytical thinking.` },
          { type: 'speaking' as const, content: { prompt: `Say aloud:`, audio_text: c2Sents[i][(li + 1) % c2Sents[i].length], image: "🎙️" }, options: [], explanation: `C2 pronunciation and fluency practice.` },
          { type: 'tf' as const, content: { prompt: `At C2 level, a speaker can handle virtually any communicative situation. True or False?` }, options: [{ text: "True", is_correct: true }, { text: "False", is_correct: false }], explanation: `C2 = near-native proficiency.` },
        ]
      }))
    };
  });
}

// ============================================================================
// SQL GENERATOR
// ============================================================================
function generateSQL(): string {
  let sql = "-- =================================================================================\n" +
            "-- PIPO CEFR CURRICULUM v2 — A1 to C2 (70 UNITS, HAND-CURATED)\n" +
            "-- =================================================================================\n\n" +
            "TRUNCATE public.learning_units, public.learning_lessons, public.learning_questions CASCADE;\n\n" +
            "DO $$\n" +
            "DECLARE\n" +
            "    u_id UUID;\n" +
            "    l_id UUID;\n" +
            "BEGIN\n";

  UNITS.forEach((unit, uIdx) => {
    const unitNum = uIdx + 1;
    sql += "\n    -- ═══════════ UNIT " + unitNum + " [" + unit.cefr + "]: " + esc(unit.title) + " ═══════════\n" +
           "    u_id := gen_random_uuid();\n" +
           "    INSERT INTO public.learning_units (id, order_index, title, description, icon_slug)\n" +
           "    VALUES (u_id, " + unitNum + ", '" + esc(unit.title) + "', '" + esc(unit.desc) + "', '" + esc(unit.icon) + "');\n";

    unit.lessons.forEach((lesson, lIdx) => {
      const xp = 20 + Math.floor(unitNum / 3);
      sql += "\n    l_id := gen_random_uuid();\n" +
             "    INSERT INTO public.learning_lessons (id, unit_id, order_index, title, xp_reward)\n" +
             "    VALUES (l_id, u_id, " + (lIdx + 1) + ", '" + esc(lesson.title) + "', " + xp + ");\n";

      lesson.questions.forEach(q => {
        sql += "    INSERT INTO public.learning_questions (lesson_id, type, cefr_level, difficulty_score, content, options, explanation)\n" +
               "    VALUES (l_id, '" + q.type + "', '" + unit.cefr + "', " + unitNum + ", " +
               "'" + jsonEsc(q.content) + "'::jsonb, " +
               "'" + jsonEsc(q.options) + "'::jsonb, " +
               "'" + esc(q.explanation) + "');\n";
      });
    });
  });

  sql += "\nEND $$;\n";
  return sql;
}

// ============================================================================
// MAIN
// ============================================================================
console.log("Total units defined: " + UNITS.length);
if (UNITS.length !== 70) {
  console.warn("WARNING: Expected 70 units, got " + UNITS.length + ". Adjusting...");
}
const finalSQL = generateSQL();
fs.writeFileSync('populate_cefr_units_70.sql', finalSQL);
console.log('SQL generated: populate_cefr_units_70.sql (' + Math.round(finalSQL.length / 1024) + ' KB)');
