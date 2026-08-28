# Sala de operação

Data: 26 de agosto de 2026

## O que é

Página `/sala`: dashboard no estilo da referência (painel escuro, chat à esquerda, operação à direita), com a marca Shiver.

- **Grid 1 — esquerda:** robô abre o chat de disparos; livros abre a biblioteca. Há o **E-book 01** (M5), o **02** (indicadores), o **03** (diário), o **04** (consistência e risco), o **05** (horários e sessões), o **06** (psicologia do trader), o **07** (golpes e promessas falsas), o **08** (plano de operações), o **09** (recuperação de loss), o **10** (gestão de banca), o **11** (M1, M5 e M15), o **12** (origem do mercado), o **13** (pares e correlações), o **14** (rotina com pouco tempo), o **15** (mindset de consistência), o **16** (suporte e resistência) e o **17** (linhas de tendência). Cada um abre com capa, texto e botão para baixar PDF. O PDF é gerado pelo conteúdo (texto branco em fundo `#0b0f16`), sem capturar a tela. Ao abrir um e-book no celular e no tablet, ele cobre a lista inteira (os outros livros somem por baixo). A barra de ferramentas some. Recolher volta a biblioteca. No desktop largo a lista continua visível embaixo do livro aberto.
- **Grid 2 — direita:** iframe de `https://trade.shiverbroker.com/traderoom`.
- **Régua:** card “em breve” para ferramenta futura.

## Mobile-first

No desktop (`1024px+`) o rail aparece também na tela de login. **Na tela de Entrar/cadastro os cadeados ficam visíveis** (IA, Métricas, E-books). Um único load do iframe — inclusive ao voltar de outra aba — não libera o menu. Recarregar rápido (logo, bounce) também não. Os cadeados saem quando o iframe navega de novo depois do login (intervalo de alguns segundos, típico do envio do formulário). Paleta `#05070d` / `#0b0f16` / `#38bdf8`. Navegação: **robô** chat, **livros** biblioteca, **régua** “em breve”. Em paisagem a barra do traderoom some.

## Regras do produto

O chat não dispara ordem e não recebe mensagem do trader. Os cards vêm de `publishSignal()` via SSE (`/api/signals/stream`). Quem opera é o trader, na sala da corretora.

Nos e-books, a marca é **Shiver**. Qualquer menção a Bullex ou “Fábrica de Traders” vira Shiver na sala e no PDF, inclusive nos livros que forem colados depois.

## Iframe

O traderoom abre com prefixo de idioma da corretora:

- Português: `https://trade.shiverbroker.com/pt/traderoom`
- Espanhol: `https://trade.shiverbroker.com/es/traderoom`

O idioma da landing (Pt/Es) define qual URL o iframe abre. Na sala o seletor da Shiver não aparece — a tela de login/cadastro e o traderoom já trazem o botão de idioma da corretora. Não acessamos o DOM do iframe (origem diferente). A sessão da sala é reiniciada se o idioma da landing mudar, porque a página da corretora carrega de novo.

Se o traderoom mandar `X-Frame-Options` / CSP `frame-ancestors`, o iframe fica em branco. O overlay de carregamento ainda oferece abrir em nova aba.

O botão **Conheça a ferramenta** da landing abre a tela de cadastro do backend (`NEXT_PUBLIC_REGISTER_URL`, em dev `http://localhost:3001/cadastro.html`). A integração com a sala/traderoom depois do cadastro fica para uma fase seguinte.

## SEO

`noindex` enquanto o Telegram não estiver ligado. Não entra no sitemap.

## Entrada

O botão **Conheça a ferramenta** da landing (`CTA`) abre a tela de cadastro do backend (`/cadastro.html`).
