# Apresentação em slider (landing Shiver)

Referência: [Charts Addon Presentation Slider](https://www.sliderrevolution.com/templates/charts-addon-presentation-slider/).

A home **não rola a página**. É um slider em tela cheia: o scroll (roda, trackpad, swipe ou setas) troca o slide com transição GSAP — o slide atual sai e o próximo entra no lugar.

**Tese:** Shiver é a corretora. A landing divulga a ferramenta que auxilia o trader na hora de compra e venda. A ferramenta não opera sozinha. Ver `documents/tese-produto-shiver.md`.

## Slides (01 / 08)

1. Mercado — mão, celular e MagicRings atrás (sem orbe)
2. Benefícios
3. Como funciona
4. Ferramenta
5. Leitura em cenário real
6. Método
7. Planos (Grátis e VIP)
8. FAQ + Começar

## Visual do primeiro slide

A home abre em **Mercado / Clareza**: mão com o celular sobre MagicRings (React Bits + three), na paleta azul da Shiver. Sem orbe circular nem nébula de fundo. `#cta` redireciona para este slide.

## Motions por slide (entrada do destino)

Cada slide entra de um jeito. No mobile (`≤1023px`) tilt vira cover e zoom vira fade-scale; amplitudes menores e sem scale agressivo. Ao **voltar** com scroll/swipe, a seção anterior entra de baixo para cima e abre já no fim do conteúdo — para o layout não pular para o topo. Clique no menu ou nos dots continua abrindo no início da seção.

| Índice | Slide | Motion |
|---|---|---|
| 0 | Mercado | rise (sobe) |
| 1 | Benefícios | cover (horizontal) |
| 2 | Como funciona | fade + scale |
| 3 | Ferramenta | wipe (clip) |
| 4 | Cenário | fade + scale |
| 5 | Método | tilt |
| 6 | Planos | cover (horizontal) |
| 7 | FAQ | zoom suave |

Há também um idle distinto por seção no desktop (flutuação, deriva, pulso de painel). `prefers-reduced-motion`: troca instantânea, sem idle.

No slide **Benefícios (Três sinais)**, os cards de Tendência, Momentum e Volatilidade são levemente interativos: hover no desktop (elevação e glow), toque/clique para destacar um eixo, sparkline desenhada na entrada. Leituras e curvas são prévia ilustrativa.

## Layout e texto por seção

Os slides compartilham paleta e tipografia, mas não o mesmo miolo:

| Slide | Posição | Título |
|---|---|---|
| Mercado | texto à esquerda, anéis atrás do celular | Mercado entra da esquerda, Clareza da direita |
| Benefícios | cards à esquerda, texto à direita | Três em wipe, Sinais sobe |
| Como funciona | título central, Caos x Clareza lado a lado | as duas palavras se encontram |
| Ferramenta | texto compacto, painel maior | escala + recorte |
| Cenário | leitura à esquerda, painel à direita | três sinais convergem |
| Método | título em cima, três colunas | leve tilt |
| Planos | título central, dois cards (Grátis e VIP) | clip + rise |
| FAQ | texto compacto, FAQ largo | tracking + escala |

O primeiro slide espera o preloader antes de revelar os títulos.

## Comportamento

- `overflow: hidden` no documento; slides empilhados no viewport
- Wheel / swipe / PageDown avançam um slide por vez (com lock durante a animação)
- Links `#inicio`, `#beneficios`, dots e SCROLL disparam o slider, sem scroll nativo (`#cta` cai no Mercado)
- FAQ e conteúdo alto: o slide rola por dentro até a borda, depois avança
- Transição GSAP por dispositivo: desktop mais longa (0,9s); mobile mais curta (0,58s)
- Texto e cards entram em cascata; o primeiro slide espera o preloader
- Chrome: dots com scale, contador com fade, linha do SCROLL em pulso
- `prefers-reduced-motion`: troca instantânea

## Tipografia

- **Poppins** em títulos, logo, corpo e UI
- Eyebrows com tracking moderado; leads com `text-wrap: pretty` e medida ~34ch

## UX, responsividade e performance

A base é **mobile-first** (ver `documents/mobile-first.md`). Desktop só a partir de `1024px`.

- Menu compacto até `1023px`; barra completa só a partir de `1024px`
- Dots com área de toque de 32px; no mobile ficam na base, no desktop à esquerda
- Safe-area (notch/home indicator) no padding dos slides, meta e menu
- Slides ocultos usam `inert` + `content-visibility` para foco e custo de pintura
- Menu fecha com Escape, ao trocar de slide e ao tocar um link
- Glow do cursor só em desktop com pointer fino
