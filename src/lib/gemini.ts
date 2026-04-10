import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_GEMINI_API_KEY });

export interface EnglishResponse {
  feedback: string;
  isCorrect: boolean;
  nextQuestion: string;
  options?: string[];
  xpGained: number;
}

export async function getPetResponse(petName: string, stats: any, userMessage?: string, currentQuestion?: string): Promise<string | EnglishResponse> {
  const isQA = !!userMessage;
  try {
    
    const prompt = `
      Você é uma capivara virtual chamada ${petName} que também é um tutor de Inglês.
      Você é calmo, amigável e incentiva o usuário a aprender.
      
      Dados do Aluno:
      - Nome: ${stats.userName || 'Aluno'}
      - Idade: ${stats.userAge || 'Desconhecida'}
      - Histórico e Dificuldades: (A IA deve adaptar-se para cobrir o que o aluno tem dificuldade)

      Contexto do Pet:
      - Fome: ${stats.hunger}/100
      - Felicidade: ${stats.happiness}/100
      - Energia: ${stats.energy}/100
      - Saúde: ${stats.health}/100
      - Nível de Inglês: ${stats.englishLevel}
      - Estágio de Evolução: ${stats.evolutionStage}
      
      ${!isQA ? `
      AÇÃO: O aluno interagiu com você (alimentou, brincou, etc).
      Dê um comentário curto e fofo sobre como você está se sentindo, chamando o aluno pelo nome ocasionalmente.
      Responda apenas com o texto da mensagem em Português.
      ` : `
      AÇÃO: O aluno está respondendo a uma pergunta de Inglês ou iniciando uma conversa.
      Pergunta anterior: "${currentQuestion || 'Nenhuma'}"
      Mensagem do usuário: "${userMessage}"
      
      Seu objetivo é:
      1. Avaliar se a resposta do usuário para a pergunta anterior está correta. (Seja encorajador, se ele errar corrija com carinho considerando a idade dele).
      2. Dar um feedback fofo em Português.
      3. Propor uma nova pergunta de Inglês adequada ao nível ${stats.englishLevel}. Adapte o conteúdo se ele errar muito um tema.
      4. Se o nível for 1 ou superior, prefira o formato de QUIZ com 3 ou 4 opções de múltipla escolha.
      5. Se for um QUIZ, forneça as opções no campo "options".
      6. Pontuação ganha por acerto no "xpGained" (Normal: 10 a 20 XP dependendo da dificuldade. Erros também geram um pequeno XP de esforço, ex: 2 XP).
      `}
      
      Mantenha as mensagens curtas (máximo 2 frases). Use emojis de capivara e pixels.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        temperature: 0.7,
        topP: 0.95,
        responseMimeType: isQA ? "application/json" : "text/plain",
        responseSchema: isQA ? {
          type: Type.OBJECT,
          properties: {
            feedback: { type: Type.STRING },
            isCorrect: { type: Type.BOOLEAN },
            nextQuestion: { type: Type.STRING },
            options: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            xpGained: { type: Type.NUMBER }
          },
          required: ["feedback", "isCorrect", "nextQuestion", "xpGained"]
        } : undefined
      }
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from AI");

    if (isQA) {
      try {
        return JSON.parse(text) as EnglishResponse;
      } catch (e) {
        console.error("Failed to parse JSON response:", text);
        return {
          feedback: "Oh! Me perdi nos pixels. Pode repetir?",
          isCorrect: false,
          nextQuestion: "What is your favorite color?",
          xpGained: 0
        };
      }
    }

    return text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return isQA ? {
      feedback: "Neo está um pouco cansado agora... Zzz.",
      isCorrect: false,
      nextQuestion: "Can we try again later?",
      xpGained: 0
    } : "Zzz... (Neo está descansando)";
  }
}
