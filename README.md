# Shiver — Landing Page & Sala de Operação

Aplicação web da **Shiver Broker** para apresentação de uma ferramenta de apoio à leitura de mercado e acesso à sala de operação da corretora.

A proposta da plataforma é ajudar o trader a interpretar sinais como **tendência, momentum e volatilidade**, oferecendo contexto para decisões de compra e venda.

> **A ferramenta não executa operações automaticamente.**
> A decisão e a execução da ordem são sempre realizadas pelo próprio trader no ambiente da Shiver.

---

## Visão geral

Este projeto reúne:

* Landing page institucional da ferramenta;
* Experiência interativa em formato de slides;
* Apresentação dos benefícios e funcionamento;
* Planos Grátis e VIP;
* Sala de operação integrada ao traderoom da Shiver;
* Assistente de apoio ao trader;
* Biblioteca de materiais;
* Estrutura preparada para métricas;
* SEO técnico;
* Termos, Privacidade e avisos de risco.

---

## Stack

O projeto utiliza:

* **Next.js 16**
* **React 19**
* **TypeScript**
* **Tailwind CSS**
* **GSAP**
* **Three.js**

---

## Repositório

```text
https://github.com/pedrootigl-bot/ShiverLatan
```

No ambiente local de desenvolvimento, a aplicação pode estar dentro de:

```text
landing-page/
```

No GitHub, os arquivos da aplicação ficam diretamente na raiz do repositório.

---

# Executando o projeto

## Requisitos

Tenha instalado:

```text
Node.js
npm
```

## Desenvolvimento

Entre na pasta da aplicação:

```bash
cd landing-page
```

Instale as dependências:

```bash
npm install
```

Inicie o ambiente de desenvolvimento:

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

---

## Produção

Gere a build:

```bash
npm run build
```

Depois inicie:

```bash
npm start
```

Fluxo:

```text
npm install
      ↓
npm run build
      ↓
npm start
```

> `npm start` depende de uma build válida gerada anteriormente por `npm run build`.

---

# Variáveis de ambiente

Em produção, configure:

```env
NEXT_PUBLIC_SITE_URL=https://seudominio.com
```

A URL deve ser informada **sem barra no final**.

### Correto

```env
NEXT_PUBLIC_SITE_URL=https://shiverbroker.com
```

### Evite

```env
NEXT_PUBLIC_SITE_URL=https://shiverbroker.com/
```

Essa variável é utilizada para geração de URLs absolutas em recursos como:

* Sitemap;
* Open Graph;
* Metadados;
* Compartilhamento social.

Caso não esteja configurada corretamente, algumas URLs podem continuar apontando para `localhost`.

---

# Estrutura da experiência

## Home

A home funciona como um deck interativo de **oito telas em fullscreen**, com abordagem mobile-first.

### Sequência

1. Mercado
2. Benefícios
3. Como funciona
4. Ferramenta
5. Cenário
6. Método
7. Planos
8. FAQ

O visitante passa inicialmente por um preloader e pode navegar pela experiência até encontrar o CTA:

```text
Conheça a ferramenta
```

que direciona para:

```text
/sala
```

---

# Sala de operação

A rota:

```text
/sala
```

reúne o assistente da Shiver e o ambiente real de negociação da corretora.

Traderoom utilizado:

```text
https://trade.shiverbroker.com/traderoom
```

A plataforma é incorporada por `iframe`.

---

## Arquitetura da sala

### Desktop

Após o login:

```text
┌───────────────────────────────────────────────────────┐
│ Menu │ Assistente │       Traderoom Shiver           │
│      │            │                                  │
│      │            │                                  │
└───────────────────────────────────────────────────────┘
```

O traderoom permanece como elemento principal da experiência.

O menu lateral é disponibilizado somente depois que o usuário entra na corretora.

---

## Antes do login

Enquanto o traderoom estiver exibindo a tela de entrada:

* o iframe utiliza toda a largura;
* o menu lateral permanece oculto;
* o chat permanece fechado;
* a biblioteca permanece fechada;
* as métricas permanecem ocultas.

A interface de apoio só deve aparecer depois do acesso ao ambiente da corretora.

---

# Ferramentas da sala

## Assistente

Representado pelo ícone de IA.

O assistente exibe sinais e informações de apoio à leitura de mercado.

A versão atual pode apresentar cards ilustrativos como:

```text
COMPRA
VENDA
```

### O assistente não:

* recebe ordens do trader;
* clica na plataforma;
* controla o iframe;
* executa trades automaticamente;
* substitui a decisão do usuário.

O fluxo correto é:

```text
Mercado
   ↓
Ferramenta analisa
   ↓
Informação é apresentada
   ↓
Trader avalia
   ↓
Trader decide
   ↓
Trader executa a operação
```

---

## Métricas

Área destinada a indicadores adicionais da ferramenta.

Status atual:

```text
Em breve
```

---

## Biblioteca

Área destinada aos materiais educacionais e e-books.

Os documentos são disponibilizados quando houver um `pdfUrl` associado ao conteúdo.

Exemplo:

```ts
pdfUrl: "/ebooks/material.pdf"
```

---

# Mobile

No celular, o traderoom recebe prioridade máxima de espaço.

A navegação da sala utiliza uma barra de ícones e os conteúdos auxiliares são apresentados como gavetas ou painéis sobrepostos.

Estrutura conceitual:

```text
┌─────────────────────┐
│                     │
│      Traderoom      │
│                     │
│                     │
├─────────────────────┤
│   Navegação mobile  │
└─────────────────────┘
```

Ao abrir o assistente ou biblioteca, o conteúdo aparece sobre a interface sem substituir permanentemente o traderoom.

---

# Identidade visual

A sala utiliza principalmente:

```text
#05070d
#0b0f16
#38bdf8
```

Direção visual:

* Dark;
* Premium;
* Tecnológica;
* Minimalista;
* Financeira;
* Alto contraste;
* Azul como destaque principal.

---

# Integração via iframe

A plataforma de operação é incorporada através de um `iframe`.

A disponibilidade dessa integração depende das configurações de segurança do próprio traderoom.

Políticas como:

```text
X-Frame-Options: DENY
```

ou:

```text
Content-Security-Policy:
frame-ancestors ...
```

podem impedir que a plataforma seja aberta dentro de outro domínio.

Caso isso aconteça, o traderoom pode aparecer vazio ou ser bloqueado pelo navegador.

A interface mantém uma opção alternativa para:

```text
Abrir em nova aba
```

---

# Importante sobre execução de operações

Este projeto **não é um sistema de execução automática de ordens**.

O objetivo é:

```text
Informação
    ↓
Contexto
    ↓
Decisão do trader
    ↓
Operação na Shiver
```

e não:

```text
Sinal
    ↓
Execução automática
```

A ferramenta deve sempre ser apresentada como um recurso de **apoio à leitura e tomada de decisão**.

---

# Planos

Atualmente existem duas modalidades apresentadas na landing.

## Grátis

```text
R$ 0
```

## VIP

Preço ainda não definido nesta versão da landing.

A diferença entre os planos deve estar relacionada à:

* profundidade das análises;
* quantidade de informações;
* recursos disponibilizados;
* experiência da ferramenta.

Nunca à existência de um robô que opere automaticamente.

---

# SEO

O projeto possui estrutura de SEO técnico com:

* `<title>`;
* meta description;
* Open Graph;
* robots;
* sitemap;
* JSON-LD.

A comunicação deve manter o posicionamento de que a **Shiver é uma corretora** e oferece uma ferramenta de auxílio ao trader.

---

## Sitemap

São indexáveis:

```text
/
Termos
Privacidade
```

A rota:

```text
/sala
```

não faz parte do sitemap atualmente.

---

## Noindex da sala

Enquanto a integração completa do assistente não estiver ativa, `/sala` permanece com:

```text
noindex
```

Isso evita indexação prematura de uma área ainda em desenvolvimento.

---

# Google Search Console

A configuração de produção inclui posteriormente:

* domínio definitivo;
* Google Search Console;
* validação da propriedade;
* envio do sitemap;
* `GOOGLE_SITE_VERIFICATION`.

Essas etapas dependem do ambiente de produção e do domínio final.

---

# Diretrizes de comunicação

Toda nova copy adicionada ao projeto deve respeitar algumas regras.

## Pode comunicar

* leitura de mercado;
* tendência;
* momentum;
* volatilidade;
* apoio à tomada de decisão;
* identificação de cenários;
* análise de possíveis momentos de compra e venda;
* acesso ao ambiente de negociação da Shiver;
* ferramentas de apoio ao trader.

## Não deve comunicar

* lucro garantido;
* rentabilidade garantida;
* renda garantida;
* operações automáticas inexistentes;
* robô operando sozinho;
* promessa de ganho;
* resultado garantido;
* que a ferramenta substitui o trader;
* que a Shiver não é corretora.

---

# Aviso de risco

Negociações no mercado financeiro envolvem risco e podem resultar em perdas.

A ferramenta apresentada neste projeto:

* não garante resultados;
* não elimina riscos;
* não executa operações automaticamente;
* não substitui a análise e decisão do trader.

O usuário permanece responsável por suas próprias decisões e operações.

---

# Arquitetura conceitual

```text
                         SHIVER
                           │
               ┌───────────┴───────────┐
               │                       │
            LANDING                  /SALA
               │                       │
       apresenta ferramenta     ┌──────┴──────┐
               │                │             │
               │           Assistente     Traderoom
               │                │             │
               │          leitura/sinais   corretora
               │                │             │
               └──────────────► TRADER ◄──────┘
                                    │
                              decide e opera
```

---

# Estrutura resumida

```text
Shiver
│
├── Home
│   ├── Mercado
│   ├── Benefícios
│   ├── Como funciona
│   ├── Ferramenta
│   ├── Cenário
│   ├── Método
│   ├── Planos
│   └── FAQ
│
├── Sala
│   ├── Assistente
│   ├── Métricas
│   ├── Biblioteca
│   └── Traderoom
│
├── Termos
├── Privacidade
└── SEO
```

---

# Status do projeto

### Implementado

* Landing;
* Navegação em slides;
* Responsividade;
* Sala;
* Integração visual com traderoom;
* Assistente visual;
* Biblioteca;
* Termos;
* Privacidade;
* SEO base.

### Em evolução

* Integração definitiva do assistente;
* Métricas;
* Conteúdo completo da biblioteca;
* Definição comercial do plano VIP;
* Configuração final de produção;
* Search Console.

---

## Regra principal do produto

> **A Shiver fornece o ambiente de negociação e uma ferramenta de apoio à leitura do mercado. A ferramenta apresenta informações; o trader toma a decisão e executa a operação.**

