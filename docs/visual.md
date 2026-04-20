# 🎨 Planejamento Visual: Ambientes Evolutivos

Este documento descreve as variações de cenário para cada fase de evolução do Pipo. Cada fase terá 3 opções de ambiente que o usuário pode alternar usando o novo botão de cenário.

## 🥚 O Conceito
Os cenários agora são dinâmicos. Dependendo do estágio (`evolutionStage`), o botão de cenário alternará entre 3 variantes temáticas exclusivas para aquela fase.

---

## 🏗️ Estrutura das Variantes

### 👶 Estágio: BABY (Bebê)
1.  **Berçário Pastel (Atual):** Nuvens, estrelas e bloquinhos. Foco em tranquilidade.
2.  **Jardim de Infância:** Fundo verde suave com flores gigantes em pixel art e chocalhos.
3.  **Quarto Intergaláctico:** Fundo azul escuro com planetas caricatos e foguetes de brinquedo.

### 🧒 Estágio: KIDS (Criança)
1.  **Parque de Diversões (Atual):** Gramado, borboletas e árvore.
2.  **Praia das Capivaras:** Areia amarela, ondas do mar (animadas) e um castelo de areia.
3.  **Casa na Árvore:** Fundo de madeira com folhas caindo e uma escada de corda lateral.

### 🧑 Estágio: TEEN (Adolescente)
1.  **Quarto Geek (Atual):** Pôsteres, fones e fitas LED.
2.  **Garagem de Ensaio:** Paredes de tijolo, amplificadores de som e uma pichação do nome "PIPO".
3.  **Skate Park Noturno:** Grafites, holofotes e uma rampa ao fundo sob o luar.

### 🎮 Estágio: MASTER TEEN (Gamer)
1.  **Setup RGB (Atual):** Monitor, luzes neon e partículas de pixel.
2.  **Arena E-Sports:** Luzes de palco, troféus ao fundo e efeito de flash de câmera.
3.  **Cyberpunk City:** Janela para uma cidade futurista com neons piscando em rosa e ciano.

### 🎓 Estágio: YOUNG ADULT (Universitário)
1.  **Biblioteca Urbana (Atual):** Livros, café e luminária.
2.  **Cafeteria Co-working:** Mesas de madeira, plantas suspensas e balcão de café ao fundo.
3.  **Apartamento Studio:** Vista para a cidade, violão encostado e um quadro de anotações (Planning).

### 💼 Estágio: ADULT (Longevo)
1.  **Loft de Luxo (Atual):** Skyline, piso de madeira e planta moderna.
2.  **Jardim Zen:** Pedras decorativas, bambu e um pequeno lago com peixes pixelados.
3.  **Escritório Executivo:** Vidros fumê, cadeiras de couro e um mapa mundi estilizado.

### 👑 Estágio: LEGENDARY (Mitológico)
1.  **Templo de Ouro (Atual):** Aura dourada, pilares e tapete vermelho.
2.  **Nuvem do Olimpo:** Fundo de nuvens douradas, harpas e um brilho celestial constante.
3.  **Palácio de Cristal:** Estruturas transparentes com reflexos de arco-íris e estrelas cadentes.

---

## 🛠️ Implementação Técnica
-   **Estado:** Adicionar `bgVariant: number` (0, 1 ou 2) ao `PetState`.
-   **UI:** Novo botão 🖼️ fixado abaixo do seletor de cor (🎨).
-   **Renderização:** Componente `App.tsx` filtrará o cenário baseado em `stage` E `bgVariant`.

---

## 🧪 Próximos Passos
1.  Aprovação do usuário sobre as temáticas.
2.  Criação das camadas de CSS e Motion para cada nova variante.
3.  Inclusão do botão de toggle na interface principal.
