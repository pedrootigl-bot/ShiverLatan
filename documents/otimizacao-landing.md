# Otimização da landing Shiver

Data: 18 de agosto de 2026

## O que mudou

| Área | Antes | Depois |
|---|---|---|
| Preloader | 4,7s no `layout` (todas as páginas) | ~1,7s só na home; quem já viu na sessão não vê o splash |
| LCP | `<img>` PNG com cache buster | `next/image` com `priority`, AVIF/WebP |
| Fonte | Poppins 400–800 (5 pesos) | 400, 600, 700, 800 |
| Histórico | `replaceState` — voltar saía do site | `pushState` + `popstate` |
| LiveValue | Animava com o slide ainda oculto | Só quando `#ferramenta` está visível |
| Menu mobile | CardNav+GSAP no bundle desktop | Carrega só em `≤1023px` |
| Código morto | 14 componentes da landing antiga | Removidos |
| Resiliência | Sem 404/erro | `not-found.tsx` e `error.tsx` |

## O que não entrou (ainda)

- Destino real do CTA (URL de conta/demo da Shiver)
- `metadataBase` / sitemap com domínio de produção
- Testes automatizados do Deck
