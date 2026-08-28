# Landing mobile-first

Data: 24 de agosto de 2026

## Premissa

A landing é **mobile-first**: o CSS base é o celular. Desktop entra só com `min-width: 1024px` (e um degrau de cenário em `640px`).

Não há mais um bloco grande de `max-width: 1023px` copiando o layout. A única exceção `max-width` é telefone baixo (`≤1023px` e `≤700px` de altura), para caber o slide Mercado.

## O que muda no celular

- Tipo menor (`clamp` até ~2,6rem); CTA, Mercado e Planos têm teto próprio
- Slides empilhados (copy → visual → botão), com padding de safe-area e dots na base
- Mercado: mão e anéis no mesmo centro; o visual ocupa o espaço que sobra
- Menu compacto (CardNav) é o padrão; a barra completa só a partir de `1024px`
- WebGL leve (`lite`) começa ligado e só sobe a versão cheia no desktop
- Páginas legais com padding e título menores no telefone

## Viewport

`width=device-width`, `initial-scale=1`, `viewport-fit=cover`. Zoom do usuário não é travado.
