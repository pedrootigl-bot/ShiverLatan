# SEO da landing Shiver

Data: 24 de agosto de 2026

## Objetivo

Deixar a landing mais fácil de o Google rastrear, entender e exibir — título, descrição, dados estruturados e conteúdo dos slides. Isso **não substitui** Search Console, domínio de produção, conteúdo contínuo nem links de outros sites.

## O que entrou no código

| Área | O que passou a valer |
|---|---|
| Título e descrição | Foco em corretora Shiver, ferramenta para traders e hora de compra e venda |
| Canonical, Open Graph e Twitter | Imagem 1200×630, locale `pt-BR`, `metadataBase` a partir de `NEXT_PUBLIC_SITE_URL` |
| `sitemap.xml` e `robots.txt` | Home, termos e privacidade; Googlebot liberado |
| JSON-LD | Organization, WebSite, SoftwareApplication, WebPage, FAQPage na home; WebPage + BreadcrumbList nas páginas legais |
| FAQ | O mesmo texto do slide alimenta o schema (fonte única em `lib/faq.ts`) |
| Crawlers | Splash não bloqueia bots; o deck deixa todos os slides no fluxo do documento |
| 404 | `noindex` |
| Manifest | Nome e descrição alinhados ao produto |

## O que o time precisa fazer no ar

1. Definir `NEXT_PUBLIC_SITE_URL` no ambiente de produção **sem barra no final** (ex.: `https://www.dominio.com`). Sem isso, sitemap e Open Graph saem com `http://localhost:3000`.
2. Colar o código do Google Search Console em `GOOGLE_SITE_VERIFICATION`.
3. No Search Console: enviar o sitemap (`/sitemap.xml`), inspecionar a URL da home e pedir indexação.
4. Validar o JSON-LD no [Rich Results Test](https://search.google.com/test/rich-results) depois do deploy.
5. Quando existirem redes oficiais da Shiver, incluir `sameAs` no Organization (hoje omitido de propósito).

## O que o schema não inventa

- Preço da ferramenta ainda não existe: a oferta no JSON-LD está como pré-venda (`PreOrder`) com preço `0`. Trocar quando o preço for definido.
- Não há avaliação agregada nem caixa de busca: não foram marcadas, para não gerar rich result falso.

## Limite honesto

O Google não “escala” um site só com meta tags. O código agora descreve o produto com clareza e, para crawlers, entrega o HTML dos oito slides sem splash. Ranking depende de domínio no ar, consistência da tese (corretora + ferramenta que **não** opera sozinha) e autoridade fora da página.
