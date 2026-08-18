# Shiver — Landing da Ferramenta

Landing page imersiva da **Shiver**, criada para apresentar uma ferramenta de apoio à tomada de decisão do trader.

A experiência reúne sinais de **tendência, momentum e volatilidade** em um único painel, ajudando o usuário a interpretar melhor o contexto do mercado antes de uma operação.

> A ferramenta é exclusivamente analítica. Ela **não opera automaticamente, não executa ordens e não funciona como robô**. A decisão e a execução continuam sendo sempre do trader.

---

## Sobre o projeto

A landing foi construída como uma experiência **fullscreen**, sem rolagem tradicional.

Em vez de uma página convencional, a navegação funciona como um deck interativo composto por **7 slides**, criando uma narrativa progressiva desde o problema até a apresentação prática da ferramenta.

O usuário pode navegar utilizando:

* Scroll do mouse
* Trackpad
* Swipe no mobile
* Setas do teclado
* Menu de navegação
* Botões voltar/avançar do navegador

As transições são controladas com **GSAP**, criando uma experiência mais próxima de uma apresentação interativa do que de uma landing page tradicional.

---

## Estrutura da experiência

| Slide | Âncora           | Conteúdo                                |
| ----- | ---------------- | --------------------------------------- |
| 01    | `#inicio`        | Mercado × Clareza — apresentação visual |
| 02    | `#beneficios`    | Tendência, momentum e volatilidade      |
| 03    | `#como-funciona` | Caos × Clareza                          |
| 04    | `#ferramenta`    | Preview do painel da ferramenta         |
| 05    | `#cenario`       | Leitura em cenário real                 |
| 06    | `#metodo`        | Como interpretamos o mercado            |
| 07    | `#faq`           | FAQ, CTA final e informações legais     |

Também existem as páginas:

```text
/termos
/privacidade
```

Atualmente, o CTA principal **“Conheça a ferramenta”** direciona para:

```text
#ferramenta
```

Esse destino poderá ser substituído futuramente por uma URL de cadastro, demo ou acesso ao produto.

---

## Leitura em cenário real

O quinto slide foi criado para demonstrar **como os sinais da ferramenta podem ser interpretados em conjunto**.

A intenção é responder à pergunta:

**“Como isso me ajuda na prática?”**

A section utiliza um cenário demonstrativo como:

```text
Tendência
Positiva

Momentum
Forte

Volatilidade
Moderada
```

Essas informações convergem visualmente para:

```text
Tendência positiva
+
Momentum forte
+
Volatilidade moderada
↓
Contexto mais claro para tomada de decisão
```

A mensagem principal da section é:

> **Não é sobre prever o próximo candle. É sobre entender o cenário antes de decidir.**

Essa etapa não deve apresentar recomendações de compra ou venda, sinais automáticos ou promessas de resultado.

Ela existe para demonstrar como a ferramenta **organiza informações de mercado e facilita a leitura do contexto**.

---

## Narrativa

A estrutura do deck segue a seguinte jornada:

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
Aplicação prática
↓
Método
↓
Conversão
```

A nova section de cenário real funciona como uma ponte entre:

```text
“Essa é a ferramenta”
```

e:

```text
“É assim que interpretamos o mercado”
```

---

## Stack

O projeto utiliza:

* **Next.js 16** — App Router
* **React 19**
* **TypeScript**
* **Tailwind CSS 4**
* **GSAP** — navegação e transições
* **Poppins** — pesos `400`, `600`, `700` e `800`
* **npm** — gerenciamento de dependências

Recomendado:

```text
Node.js 20+
```

---

## Como executar

Instale as dependências:

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

### Produção

```bash
npm run build
npm run start
```

### Lint

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
│   ├── slides/
│   └── Deck
│
├── Header
├── Preloader
├── Ambient
└── CardNav

lib/
├── config.ts
├── slides.ts
├── motions.ts
├── analytics.ts
└── mock-market-data.ts

public/
└── imagens e assets
```

### Diretórios principais

**`app/`**
Rotas, layouts, metadata e páginas.

**`components/deck/`**
Slides e estrutura principal da experiência fullscreen.

**`components/`**
Componentes reutilizáveis da interface.

**`lib/`**
Configurações, animações, dados mock, navegação e analytics.

**`public/`**
Assets públicos utilizados pela landing.

---

## Navegação do deck

Todas as formas de navegação devem compartilhar o mesmo estado:

```text
activeSlide
goNext()
goPrevious()
goToSlide()
```

Isso inclui:

```text
Wheel
Trackpad
Swipe
Teclado
Menu
Hash da URL
Histórico do navegador
```

Durante uma transição, novas mudanças de slide devem ser temporariamente bloqueadas para impedir múltiplos avanços causados por wheel ou trackpad.

---

## URLs e acesso direto

Cada slide possui um hash próprio.

Exemplos:

```text
/#inicio
/#ferramenta
/#cenario
/#metodo
```

Isso permite:

* compartilhar uma seção específica;
* utilizar voltar/avançar do navegador;
* acessar diretamente determinado slide;
* medir visualizações individuais.

---

## Analytics

Como a landing não utiliza scroll tradicional, a navegação entre slides deve ser tratada como eventos individuais.

Eventos previstos:

```text
slide_view
cta_click
faq_open
```

Exemplo:

```text
slide_view
slide: "cenario"
index: 5
```

Isso permite identificar pontos de abandono da experiência.

Exemplo:

```text
100% → Início
82%  → Benefícios
68%  → Como funciona
56%  → Ferramenta
48%  → Cenário real
40%  → Método
31%  → CTA
```

A camada de analytics deve permanecer independente da plataforma utilizada, permitindo integração posterior com GA4, Meta Pixel ou outras ferramentas.

---

## Linha editorial

A comunicação deve reforçar:

* auxílio na leitura do timing;
* tendência, momentum e volatilidade no mesmo painel;
* organização das informações de mercado;
* maior clareza para interpretação do cenário;
* decisão e execução feitas pelo trader.

### Evitar

Não utilizar:

* “robô que opera por você”;
* “sinais infalíveis”;
* “compra agora” ou “venda agora”;
* “lucro garantido”;
* “timing perfeito”;
* promessas de rentabilidade;
* previsão garantida do mercado.

Também não comunicar que a **Shiver não é corretora**, pois isso entra em conflito com o posicionamento definido para o projeto.

---

## Dados e gráficos

Os indicadores, números e gráficos apresentados na landing são **mockups demonstrativos**.

Os dados devem permanecer centralizados em:

```text
lib/mock-market-data.ts
```

Eles existem exclusivamente para demonstrar a experiência da ferramenta.

Não utilizar mocks que possam ser interpretados como:

* cotação ao vivo;
* operação real;
* rentabilidade real;
* resultado financeiro garantido.

---

## CTA e configurações

URLs e configurações globais devem permanecer centralizadas em:

```text
lib/config.ts
```

Isso permite alterar futuramente o destino do CTA sem modificar vários componentes.

Exemplo:

```text
Conheça a ferramenta
↓
#ferramenta
```

Futuramente:

```text
Conheça a ferramenta
↓
https://produto.shiver...
```

---

## Acessibilidade

O projeto respeita:

```css
prefers-reduced-motion
```

Quando essa preferência está ativada, animações e transições são reduzidas ou desativadas.

Isso inclui:

* transições do deck;
* animações idle;
* FAQ;
* efeitos não essenciais.

Também existe um **skip link** para permitir acesso direto ao conteúdo principal por teclado.

---

## Preloader

O preloader nunca deve bloquear permanentemente o acesso à landing.

Mesmo que algum asset falhe ao carregar, deve existir um tempo limite que libere a experiência automaticamente.

---

## Documentação

A documentação estratégica e técnica está localizada em:

```text
documents/
```

Principais arquivos:

```text
tese-produto-shiver.md
```

Posicionamento e tese do produto.

```text
presentation-slider.md
```

Comportamento do deck e navegação.

```text
otimizacao-landing.md
```

Registro das otimizações realizadas e pendentes.

---

## Objetivo

O projeto busca apresentar uma ferramenta analítica de forma **premium, direta, visual e interativa**, evitando a estrutura tradicional de landing pages baseada apenas em hero, cards, testimonials e footer.

A experiência deve fazer o usuário compreender progressivamente:

```text
O mercado pode parecer confuso.
↓
Existem sinais que ajudam a interpretar esse cenário.
↓
Esses sinais podem ser organizados.
↓
A ferramenta reúne essas informações.
↓
Veja como elas funcionam juntas em um cenário.
↓
Entenda o método.
↓
Conheça a ferramenta.
```

O objetivo final não é prometer previsibilidade, mas transformar informações complexas do mercado em uma experiência mais clara e compreensível para o trader.
