# 💎 Estratégia de Plano Freemium - Pipo

Este documento detalha a proposta de monetização e segmentação de recursos para transformar o Pipo em um produto sustentável (SaaS), equilibrando o acesso educacional gratuito com incentivos para conversão premium.

---

## 1. Visão Geral
O Pipo é, em sua essência, uma ferramenta de educação. O plano Freemium deve garantir que o aprendizado básico nunca seja bloqueado, mas que a "experiência de jogo" e a "velocidade de progresso" sejam os principais motores de venda.

---

## 2. Comparativo de Planos

| Recurso | Plano Gratuito (Free) | Plano Ultra-Pipo (Premium) |
| :--- | :--- | :--- |
| **Acesso a Lessons** | 5 lições por dia | **Ilimitado** |
| **Acesso a Units** | Todas as unidades básicas | **Units especiais/avançadas** |
| **IA do Pipo (Chat)** | 🚫 Bloqueado (Respostas fixas) | **Liberado (Gemini IA Ativa)** |
| **Explicações de Erros**| Estática (Simples) | **Explicador IA Personalizado** |
| **Evolução do Pet** | Até estágio "Adult" | **Acesso ao estágio "Legendary"** |
| **Itens de Loja** | Básicos e Comuns | **Itens Exclusivos e de Designer** |
| **Skins/Cores** | Cores primárias | **Texturas Especiais (Glitter, Neon, Galáxia)** |
| **IA do Pipo** | Respostas padrão | **IA Personalizada (Gemini Pro)** |
| **Mini-games** | Todos disponíveis | **Sem anúncios entre partidas** (se houver) |
| **Relatórios** | Progresso Simples | **Análise de Performance com IA** |

---

## 🗺️ Roadmap de Evolução (Simples e Gradual)

Atualmente estamos na **Fase 1**. O foco agora é deixar o Pipo 100% gratuito e viciante para ganhar tração.

### Passo 1: Fundação e Engajamento (Onde estamos)
-   **Ajuste de Terminologia:** Unificar os nomes para `Units` (Capítulos) e `Lessons` (Lições).
-   **Estabilidade:** Garantir que o XP nunca se perca (Sincronização Atômica).
-   **Visual da Coleção:** Álbum de figurinhas visível para gerar desejo de completar.

### Passo 2: Variedade e Vida
-   **Novos Tipos de Questões:** Áudio, tradução e múltipla escolha mais desafiadoras.
-   **Reação do Pipo:** Pipo comentar sobre o seu progresso nas `Units` através da IA.
-   **Sistema de Conquistas (Badges):** Medalhas visíveis por completar uma `Unit` inteira sem erros.

### Passo 3: Otimização e Social
-   **Ranking Dinâmico:** Ver os amigos que estão na mesma `Unit` que você.
-   **Backup em Nuvem Robusto:** Sincronização offline-first aprimorada.

### Passo 4: Estratégia Freemium (Futuro)
-   **Rewarded Ads:** Opcional para o usuário ganhar itens ou energia extra.
-   **Assinatura Ultra-Pipo:** Benefícios cosméticos e acesso a `Units` bônus/temáticas (ex: Business English).

---

## 4. Gatilhos de Conversão (Upsell)

Para incentivar o usuário a assinar futuramente, utilizaremos:

1.  **O Limite de Foco:**
    *   Após completar um certo número de `Lessons` seguidas, o Pipo avisa que está "cansado". No Pro, ele tem foco infinito.
---

## 🤖 O Valor da IA na Versão Premium

Para tornar a assinatura irresistível, a IA não será apenas um "chat", mas um tutor pessoal. Como cada chamada de IA (Gemini) tem um custo, faz sentido ser o grande diferencial do Pro:

### 1. Tutor de Conversação em Tempo Real
No modo Pro, o usuário pode clicar em um botão de microfone e conversar livremente com o Pipo. O Pipo não apenas responde, mas:
-   **Corrige a gramática** de forma gentil.
-   **Sugere palavras melhores** para o contexto.
-   **Pratica "Small Talk"** para tirar o medo de falar inglês.

### 2. Roleplay Situacional
O Pipo pode assumir "profissões" para treinar situações reais:
-   "Pipo, finja que eu estou em um restaurante em NY e você é o garçom."
-   "Pipo, vamos fingir que estou perdido no aeroporto de Londres."

### 3. Explicações Adaptativas (O "Porquê")
Na versão grátis, quando erra, o usuário vê a resposta certa. Na versão Pro, a IA explica o **porquê** do erro, baseando-se no histórico do usuário.
-   *Ex: "Notei que você costuma confundir 'do' com 'does'. Lembre-se que o Pipo é 'he', então usamos 'does'!"*

### 4. Gerador de Unidades Dinâmicas
O assinante pode pedir lições sobre seus interesses:
-   "Pipo, crie uma `Unit` sobre Minecraft para eu aprender os nomes dos blocos."
-   "Pipo, quero aprender inglês usando exemplos de receitas de cozinha."

### 5. Diário de Memórias (Storytelling)
A IA cria uma história de aventura semanal onde o Pipo e o usuário são os protagonistas, e o vocabulário da história é baseado no que o usuário estudou naquela semana.

---

## 4. Retenção de Usuários Free

É vital manter os usuários gratuitos engajados para que a comunidade cresça:
-   **Streaks Gratuitos:** Manter a ofensiva (dias seguidos) garante recompensas mesmo no plano free.
-   **Eventos Globais:** Fins de semana com "XP em Dobro" para todos.
-   **Social:** Ranking global onde usuários free podem competir com premium (o mérito do estudo é igual, o premium apenas tem itens mais bonitos).

---

## 5. Roadmap de Implementação

### Fase 1: Fundação (Atual)
-   Implementar sistema de login e persistência (Concluído).
-   Tabela de `profiles` diferenciando `plan_type` ('free' ou 'pro').

### Fase 2: Gating de Conteúdo
-   Bloqueio lógico no `App.tsx` para limite de lições diárias.
-   Adição da propriedade `is_premium_only` na lista de `COLLECTIBLES`.

### Fase 3: Checkout e Benefícios
-   Integração com Stripe/Mercado Pago para assinaturas.
-   Liberação automática da "Aura Premium" no visual do Pipo.
