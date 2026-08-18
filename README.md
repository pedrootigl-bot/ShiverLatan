# Shiver — landing da ferramenta

Landing em tela cheia da **corretora Shiver**. O site apresenta a ferramenta que auxilia o trader na **hora de compra e venda**, reunindo tendência, momentum e volatilidade no mesmo painel.

A ferramenta **não opera sozinha**: não é robô e não dispara ordem. Quem decide e quem opera é o trader.

## Como rodar

```bash
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # produção
npm run start   # servir o build
npm run lint
```

Node 20+ recomendado. Pacote gerenciador: npm.

## O que é este site

A home **não rola a página**. É um deck de 6 slides: roda, trackpad, swipe, setas ou o menu trocam a seção com transição GSAP. O botão voltar do navegador também troca o slide.

| Slide | Âncora | Conteúdo |
|---|---|---|
| 01 | `#inicio` | Mercado / Clareza — visual com celular |
| 02 | `#beneficios` | Três sinais (tendência, momentum, volatilidade) |
| 03 | `#como-funciona` | Caos × Clareza |
| 04 | `#ferramenta` | Painel da ferramenta |
| 05 | `#metodo` | Como lemos o mercado |
| 06 | `#faq` | FAQ, CTA e rodapé legal |

Páginas extras: `/termos` e `/privacidade`.

O CTA **Conheça a ferramenta** aponta para `#ferramenta` até existir URL de conta, demo ou produto da Shiver.

## Stack

- Next.js 16 (App Router) e React 19
- TypeScript
- Tailwind CSS 4
- GSAP (transição entre slides e menu mobile)
- Poppins (400 / 600 / 700 / 800)

## Estrutura

```
app/                 rotas, layout, metadata
components/deck/     slides e o Deck
components/          header, preloader, ambient, CardNav
lib/                 CTA, lista de slides, motions
public/              imagens
```

## Linha editorial

Dizer: auxilia o timing; tendência, momentum e volatilidade no mesmo painel; quem opera é você.

Não dizer: “Shiver não é corretora”; “robô opera por você”; garantia de lucro ou de timing perfeito.

Números e gráficos da landing são mock — não simular cota ao vivo.

Tese completa: `documents/tese-produto-shiver.md` (na pasta do workspace, um nível acima deste app).

## Acessibilidade e movimento

`prefers-reduced-motion` desliga transições do deck, idle e abertura do FAQ. Há skip link para o conteúdo.

## Documentação

Na pasta `documents/` do workspace:

- `tese-produto-shiver.md` — posicionamento fechado com o cliente
- `presentation-slider.md` — comportamento do deck
- `otimizacao-landing.md` — o que já foi otimizado e o que falta
