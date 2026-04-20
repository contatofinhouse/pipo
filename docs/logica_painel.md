# 📊 Manual da Lógica do Painel (Stats) - Pipo

Este documento explica o que cada barra de status no painel do Pipo representa e como a "biologia" do sistema reage ao tempo e às suas ações.

## 1. As Barras de Status

### ❤️ Saúde (Antigo HP)
A barra mais crítica. Se chegar a zero, o Pipo fica incapacitado.
-   **Como diminui:** Quando a **Fome** ou **Energia** estão abaixo de 10%, quando há sujeira (**Poop**) no quarto, ou quando o Pipo está **Doente** (🤒).
-   **Como aumenta:** Mantendo o Pipo bem alimentado, descansado e com o quarto limpo. Dormir enquanto está doente também recupera Vida progressivamente.

### 🍎 Fome
Representa a necessidade de alimentação. 
-   **Lógica:** Diminui constantemente (`0.00004` pts/ms - Taxa lenta). Diminui mais devagar (70% menos) enquanto o Pipo dorme.
-   **Impacto:** Se estiver muito baixa, começa a drenar a **Saúde**. Se estiver alta (>50%), há uma chance do Pipo fazer "sujeira" no quarto.

### 😊 Humor
Representa a felicidade do Pipo.
-   **Lógica:** Diminui naturalmente com o tempo (`0.00003` pts/ms - Taxa ultra lenta).
-   **Como aumenta:** Brincando (Mini-games), usando itens da coleção (`toy` ou `special`), ou acertando questões de inglês.
-   **Impacto:** Pipo feliz tem menos chance de ficar doente e aprende melhor.

### ⚡ Energia
O fôlego do Pipo para atividades.
-   **Lógica:** Diminui gradualmente enquanto ele está acordado (`0.0002` pts/ms). Diminui drasticamente ao praticar esportes ou mini-games intensos.
-   **Recuperação:** Aumenta rapidamente apenas quando o Pipo está **Dormindo** (Modo Soneca 🌙).

### 💪 Músculo
Introduzido para incentivar o movimento.
-   **Lógica:** Diminui muito lentamente com o sedentarismo (`0.00004` pts/ms).
-   **Como aumenta:** Através da ação `GYM` (Academia) ou mini-games ativos.

---

## 2. Reações e Eventos do Sistema

### 🤒 Doenças (Sickness)
O Pipo pode ficar doente aleatoriamente, mas as chances aumentam se:
-   A Fome ou Felicidade estiverem abaixo de 30%.
-   Estiver **chovendo** (Rainy) e o Pipo não estiver dormindo.
-   **Efeito:** O HP começa a cair continuamente até ele ser curado (geralmente por sono ou itens especiais).

### 💩 Sujeira (Poop)
-   O Pipo faz sujeira periodicamente se estiver com a Fome acima de 50%.
-   Cada sujeira acumula um "debuff" de saúde. Se houver 3 sujeiras no quarto, o HP cai muito rápido por falta de higiene.

### 🌧️ Clima (Weather)
O jogo possui ciclos de clima (Sol, Chuva, Nublado) que mudam aleatoriamente.
-   **Sol:** Padrão.
-   **Chuva:** Aumenta o risco de resfriado se o Pipo estiver acordado.

### 🎓 Nível Escolar vs. Evolução
-   **Nível Escolar:** Sobe apenas ao completar `Units` de inglês.
-   **Evolução Visual:** O Pipo muda de aparência (EGG -> BABY -> KIDS -> TEEN, etc.) baseado apenas no seu **Nível Escolar**, refletindo que o conhecimento o faz crescer.

---

## 3. Guia Rápido de Emergência

-   **Saúde piscando ou vermelha?** Alimente-o imediatamente e coloque-o para dormir.
-   **Pipo não quer estudar?** Verifique se o quarto está limpo (limpar sujeira dá um bônus de felicidade imediato).
-   **Energia em 0?** Ative o modo soneca. Jogar mini-games com energia baixa pode drenar a Saúde.
