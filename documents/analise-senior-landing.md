# Análise sênior — landing Shiver

Data: 18 de agosto de 2026 (tese de produto atualizada no mesmo dia)  
Escopo: `landing-page/` no estado atual (slider de 6 slides, Next 16, React 19, GSAP, Poppins).

**Tese vigente:** Shiver é a **corretora**. Esta landing divulga a **ferramenta** que auxilia o trader na hora de compra e venda. A ferramenta **não opera sozinha**. Prestação de serviço para a marca. Detalhe em `documents/tese-produto-shiver.md`.

## Veredito

O artesanato visual está à frente do funil. A página convence o olho e não fecha uma ação. Um programador sênior **manteria** a identidade do deck e o recorte Buy/Sell do mock; **reescreveria** o copy que hoje nega execução (tese antiga); **mudaria** destino do CTA, preloader, histórico do slider e LCP.

Sem CTA de corretora (conta, demo ou produto), polir animação não divulga a ferramenta.

## O que já está no nível certo

- Identidade visual dark premium alinhada a finanças.
- Mock do celular com Buy/Sell — coerente com corretora + timing, não com a tese antiga.
- A11y de base: skip-link, `lang="pt-BR"`, `inert` nos slides ocultos, `aria-live`, `prefers-reduced-motion`.
- Motion por slide coerente com uma apresentação.

## Achados

Prioridade: **P0** bloqueia confiança ou conversão. **P1** um sênior faria no próximo ciclo. **P2** higiene. Esforço: P horas, M 1–3 dias, G ~1 semana.

### P0

| Área | O que mudar | Por quê | Esforço |
|---|---|---|---|
| Conversão | Tirar o CTA do loop `#ferramenta` e apontar para waitlist, demo ou cadastro | “Conheça a ferramenta” só troca de slide. Sem lead, a landing não mede demanda. | M |
| Confiança | Reescrever o copy: Shiver é corretora; a ferramenta auxilia o timing | Metadata, intro, método, FAQ, rodapé e termos dizem “não executa”. Isso contradiz a tese. Buy/Sell no mock **fica**. | M |
| Confiança | Parar de animar preço e % como cotação ao vivo | `LiveValue` conta até 67.432; o painel mostra +18,4% / 74%. O selo “Prévia ilustrativa” perde para o ticker. | P |
| UX | Encurtar o preloader e tirá-lo do layout global | 4,7s na primeira visita. O mesmo splash envolve `/termos` e `/privacidade`. | P |
| UX | Devolver o botão voltar; reduzir o sequestro do scroll | `replaceState` no hash sem `popstate`: voltar sai do site. `wheel` com `preventDefault` no `window` captura o gesto da home inteira. | M |

### P1

| Área | O que mudar | Por quê | Esforço |
|---|---|---|---|
| Performance | PNG da intro via `next/image` (AVIF/WebP) com prioridade de LCP | Herói usa `<img src="...?v=3">`. Sem srcset, formato moderno ou preload. | P |
| SEO | `metadataBase`, canonical, sitemap, robots, JSON-LD; H1 com a proposta | OG/Twitter relativos. H1 “Mercado / Clareza” é fraco para busca. Hash não indexa seção. | P |
| Produto | Cortar repetição dos três sinais | Intro, Benefícios e Ferramenta repetem Tendência / Momentum / Volatilidade. Método e FAQ reiteram o disclaimer. | M |
| Código | Apagar a landing antiga | `Hero`, `Footer`, `FAQ`, `Benefits`, `Testimonials`, `HowItWorks`, `ProductPreview`, `StickyCTA`, `MarketTicker`, `Reveal` e outros não entram em `page.tsx`. | P |
| Observabilidade | Analytics de funil + `error.tsx` / `not-found.tsx` | Sem evento de slide/CTA, não dá para priorizar. Falha de JS vira tela morta. | P |
| A11y | Focus trap no menu, contraste da microcopy, não esconder o herói inteiro | CardNav sem prender foco. 11px + tracking + zinc-500 falha WCAG. `intro-visual` está `aria-hidden`. | M |
| UI | Um sistema de navegação, não três | Header, dots e o botão “Scroll” competem. “Scroll” não rola a página. | M |
| Performance | Menos pesos de fonte; GSAP só no deck; slides fora da tela de verdade | Poppins 400–800 + latin-ext. Seis slides `position:absolute` no viewport: o `IntersectionObserver` do `LiveValue` dispara cedo. | M |

### P2

| Área | O que mudar | Por quê | Esforço |
|---|---|---|---|
| Engenharia | Headers, cache, README real | `next.config` vazio. README ainda é Create Next App. | P |
| Consistência | Paleta das páginas legais e ícone OG | Termos/Privacidade ainda usam `#536dfe` / `#8b5cf6`. | P |
| Qualidade | Teste do Deck (hash, reduced-motion, voltar, FAQ) | O slider é o maior risco de regressão e não tem teste. | G |

## Leitura por camada

### Funil e conteúdo

Depois do herói, o visitante vê os mesmos três eixos, um painel BTC de demonstração e três princípios que o FAQ já cobre. Não há para quem é, o que entra no painel, preço, data ou próximo passo. O FAQ admite que preço e disponibilidade não existem — e o CTA pede ação agora.

### Slider como modelo de navegação

Full-viewport sem scroll de página é escolha de marca, não default. Custa: wheel não-passivo, swipe vs FAQ interno, hash sem histórico, seis seções no DOM, pouca profundidade de conteúdo. No desktop funciona como keynote. No mobile disputa com o menu blob, os dots e a safe-area.

Alternativa que um sênior testaria: home com scroll nativo e deck só no herói — ou manter o deck e tratar hash/voltar/FAQ como produto.

### Performance

Caminho crítico: splash + fonte + PNG da mão + GSAP. Cinco pesos de Poppins são excesso. Preloader e Header são client. Componentes mortos não entram no bundle se não são importados; o custo é humano.

### Risco de UI em finanças

Números que pulsam, % de alta e botões Buy/Sell num mock comunicam execução mesmo com disclaimer. Tratar como bug de produto, não como polish.

## Sequência sugerida

1. Definir a ação do CTA (waitlist, demo ou cadastro) e o disclaimer visível no herói.
2. Corrigir mock Buy/Sell e métricas com cara de cota ao vivo.
3. Preloader ≤ 1,2s só na home; nunca em páginas legais.
4. `pushState` + `popstate` no Deck; LCP com `next/image`.
5. SEO mínimo e analytics de funil.
6. Enxugar slides repetidos e apagar componentes órfãos.

## Arquivos-chave

- `app/layout.tsx` — metadata, fonte, Preloader global
- `components/Preloader.tsx` — 4,2s + 0,5s de saída
- `components/deck/Deck.tsx` — wheel, hash, `replaceState`
- `components/Header.tsx` / `CardNav.tsx` — dois menus
- `components/deck/IntroVisual.tsx` — LCP em `<img>`
- `components/deck/SlideTool.tsx` + `LiveValue.tsx` — ticker ilustrativo
- `lib/cta.ts` — `CTA_HREF = "#ferramenta"`
