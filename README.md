# Shiver — Landing da Ferramenta

Landing page imersiva da **Shiver**, criada para apresentar uma ferramenta de apoio à tomada de decisão do trader.

A experiência reúne sinais de **tendência, momentum e volatilidade** em um único painel, ajudando o usuário a interpretar melhor o mercado antes de uma operação.

> A ferramenta é exclusivamente analítica. Ela **não opera automaticamente, não executa ordens e não funciona como robô**. A decisão final continua sendo sempre do trader.

---

## Sobre o projeto

A landing foi construída como uma experiência em **tela cheia**, sem rolagem tradicional.

Em vez de uma página convencional, a navegação funciona como um deck interativo composto por **6 seções**, com transições animadas entre cada etapa da apresentação.

O usuário pode navegar utilizando:

* Scroll do mouse
* Trackpad
* Swipe no mobile
* Setas do teclado
* Menu de navegação
* Botão voltar/avançar do navegador

As transições são controladas com **GSAP**, criando uma experiência mais próxima de uma apresentação interativa do que de uma landing page tradicional.

---

## Estrutura da experiência

| Slide | Âncora           | Conteúdo                                            |
| ----- | ---------------- | --------------------------------------------------- |
| 01    | `#inicio`        | Mercado × Clareza — apresentação visual com celular |
| 02    | `#beneficios`    | Tendência, momentum e volatilidade                  |
| 03    | `#como-funciona` | Caos × Clareza                                      |
| 04    | `#ferramenta`    | Preview do painel da ferramenta                     |
| 05    | `#metodo`        | Como interpretamos o mercado                        |
| 06    | `#faq`           | FAQ, CTA final e informações legais                 |

Também existem as páginas:

```text
/termos
/privacidade
```

Atualmente, o CTA principal **“Conheça a ferramenta”** direciona para:

```text
#ferramenta
```

Esse destino é temporário até existir uma URL definitiva para conta, demo ou acesso ao produto.

---

## Stack

O projeto utiliza:

* **Next.js 16** — App Router
* **React 19**
* **TypeScript**
* **Tailwind CSS 4**
* **GSAP** — transições do deck e interações mobile
* **Poppins** — pesos `400`, `600`, `700` e `800`
* **npm** — gerenciamento de dependências

Recomendado:

```text
Node.js 20+
```

---

## Como executar

Clone o projeto e instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

A aplicação estará disponível em:

```text
http://localhost:3000
```

### Outros comandos

Gerar build de produção:

```bash
npm run build
```

Executar o build:

```bash
npm run start
```

Verificar problemas de lint:

```bash
npm run lint
```

---

## Estrutura do projeto

```text
app/
├── rotas
├── layout
└── metadata

components/
├── deck/
│   ├── slides
│   └── Deck
│
├── Header
├── Preloader
├── Ambient
└── CardNav

lib/
├── CTA
├── configuração dos slides
└── motions

public/
└── imagens e assets
```

### Diretórios principais

**`app/`**
Responsável pelas rotas, layouts, metadata e páginas da aplicação.

**`components/deck/`**
Contém a estrutura principal da experiência em slides.

**`components/`**
Componentes reutilizáveis de interface e navegação.

**`lib/`**
Configurações, animações, CTA e dados compartilhados.

**`public/`**
Assets públicos utilizados pela landing.

---

## Posicionamento do produto

A comunicação da landing deve reforçar que a ferramenta **auxilia a leitura do mercado**, mas não substitui a decisão do trader.

### Comunicação recomendada

Utilizar conceitos como:

* Auxilia na leitura do timing
* Tendência, momentum e volatilidade no mesmo painel
* Mais clareza para interpretar o mercado
* Informações centralizadas para apoiar decisões
* Quem decide e executa a operação é o trader

### Evitar

Não utilizar mensagens como:

* “Robô que opera por você”
* “Operações automáticas”
* “Lucro garantido”
* “Timing perfeito”
* “Sinais infalíveis”
* Garantias de resultado financeiro

Também não comunicar que a **Shiver não é corretora**, pois isso entra em conflito com o posicionamento definido para o projeto.

---

## Dados e gráficos

Os valores, indicadores e gráficos apresentados na landing são **mockups demonstrativos**.

Eles existem apenas para ilustrar a experiência da ferramenta.

A landing não deve simular:

* Cotações em tempo real
* Resultados reais de operações
* Rentabilidade garantida
* Performance fictícia apresentada como real

---

## Acessibilidade

O projeto respeita:

```css
prefers-reduced-motion
```

Quando essa preferência está habilitada no sistema operacional, são reduzidas ou desativadas animações como:

* Transições entre slides
* Idle animations
* Animações do FAQ

Também existe um **skip link** para permitir acesso direto ao conteúdo principal por teclado.

---

## Documentação complementar

A documentação estratégica e técnica está localizada em:

```text
documents/
```

Arquivos principais:

```text
tese-produto-shiver.md
```

Posicionamento e tese do produto definidos para a landing.

```text
presentation-slider.md
```

Documentação sobre o comportamento e navegação do deck.

```text
otimizacao-landing.md
```

Registro das otimizações já realizadas e pontos ainda pendentes.

A tese completa do produto também pode ser encontrada em:

```text
documents/tese-produto-shiver.md
```

no workspace acima da aplicação.

---

## Objetivo

O projeto busca apresentar a ferramenta de forma **premium, direta e visual**, fugindo da estrutura tradicional de landing pages composta apenas por header, hero, cards, testimonials e footer.

A experiência foi pensada para conduzir o usuário por uma narrativa:

```text
Mercado
↓
Problema
↓
Sinais
↓
Clareza
↓
Ferramenta
↓
Método
↓
Conversão
```

O objetivo final é transformar uma ferramenta analítica complexa em uma apresentação simples, moderna e fácil de compreender.
