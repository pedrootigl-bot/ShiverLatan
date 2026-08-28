import type { SalaEbookBlock } from "@/lib/salaEbook";

export const EBOOK_05_BODY: SalaEbookBlock[] = [
  {
    kind: "chapter",
    kicker: "Abertura",
    title: "Melhores horários para investir e operar.",
    lead: "O mercado pode estar aberto quase o tempo todo. Isso não significa que todo horário presta para operar. Volume, volatilidade e a sua cabeça mudam conforme a sessão.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Este e-book organiza as sessões, mostra quando o mercado aquece de verdade, o que a manhã oferece, o que evitar na madrugada e como escolher um horário fixo — qualidade acima de quantidade.",
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Leia antes de começar",
    body: "Mais liquidez também é mais risco. Horário de pico não é convite automático para entrar. Negociar envolve perda. Treine na conta demo. Só leve pra conta real o que você pode perder sem afetar sua vida.",
  },
  {
    kind: "meta",
    items: [
      { label: "Autor", value: "PH" },
      { label: "Edição", value: "2026 · v1" },
      { label: "Formato", value: "Guia de sessão" },
    ],
  },
  {
    kind: "toc",
    kicker: "Sumário",
    title: "O que você vai dominar",
    items: [
      { num: "01", label: "O mercado funciona 24h?", page: "03" },
      { num: "02", label: "As principais sessões", page: "04" },
      { num: "03", label: "Quando o mercado aquece", page: "05" },
      { num: "04", label: "Volatilidade pela manhã", page: "06" },
      { num: "05", label: "Horários para evitar", page: "07" },
      { num: "06", label: "Como escolher o seu horário", page: "08" },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Princípio central",
    body: "Analise os horários com maior atividade e eficiência operacional. Sessão certa, liquidez certa. Fora disso, é improviso.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 1",
    title: "O mercado funciona 24h?",
    lead: "O Forex opera 24 horas, de segunda a sexta, ao redor do globo. Operação contínua não é o mesmo que movimento útil o tempo todo.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Nem todos os horários têm a mesma intensidade. Existem sessões com volatilidade e volume distintos. Operar porque “está aberto” é o atalho para spread ruim, lateral e decisão cansada.",
    ],
  },
  {
    kind: "stats",
    items: [
      { value: "24h", label: "Forex de segunda a sexta, sem pausa global" },
      { value: "Sessão", label: "Cada bloco tem volume e ritmo próprios" },
    ],
  },
  {
    kind: "chapter",
    kicker: "Capítulo 2",
    title: "As principais sessões do mercado.",
    lead: "Ásia, Europa e Estados Unidos não são o mesmo mercado em horários diferentes. São climas diferentes.",
  },
  {
    kind: "prose",
    kicker: "Sessão asiática",
    heading: "Menor volatilidade, ritmo mais lento.",
    paragraphs: [
      "Movimentos costumam ser mais contidos. Dá para ler, mas sobra menos impulso. Quem precisa de tendência clara muitas vezes espera a Europa.",
    ],
  },
  {
    kind: "prose",
    kicker: "Sessão europeia",
    heading: "Volume sobe, o gráfico ganha corpo.",
    paragraphs: [
      "Aumento significativo de volume, mais movimentação e mais oportunidade — e mais ruído do que a madrugada quieta.",
    ],
  },
  {
    kind: "prose",
    kicker: "Sessão americana",
    heading: "Alta volatilidade no dólar e nos pares principais.",
    paragraphs: [
      "Forte movimentação. A sobreposição entre Europa e EUA é, em geral, o trecho de maior liquidez do dia. Melhor oportunidade e maior risco andam juntos.",
    ],
  },
  {
    kind: "callout",
    tone: "cyan",
    title: "A sobreposição",
    body: "Europa + EUA no mesmo relógio: mais movimento, mais liquidez, mais stop que precisa caber. Não é horário mágico. É horário denso.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 3",
    title: "Horário em que o mercado realmente aquece.",
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Abertura da Europa",
        text: "Manhã no Brasil: primeiro pico de atividade, volume sobe.",
      },
      {
        num: "02",
        title: "Abertura dos EUA",
        text: "Sobreposição de sessões: máxima liquidez e volatilidade típicas.",
      },
      {
        num: "03",
        title: "Divulgação de notícias",
        text: "Eventos econômicos programados geram movimento forte. Operar no sneak da notícia sem plano é roleta.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "gold",
    title: "Oportunidade e risco",
    body: "Nesses horários há mais oportunidade de leitura — e maior risco. Prepare o tamanho da posição antes. Pico não autoriza overtrade.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 4",
    title: "Volatilidade pela manhã.",
  },
  {
    kind: "split",
    doTitle: "Período matinal",
    doText:
      "Maior movimentação e liquidez. Movimentos mais definidos. Tendências mais legíveis. Volume mais consistente — ainda assim, sem garantia de acerto.",
    dontTitle: "Período da madrugada",
    dontText:
      "Menor volume. Mais lateral. Movimento mais imprevisível. Spreads mais amplos. O gráfico “barato” de madrugada costuma sair caro no custo e no erro.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 5",
    title: "Horários para evitar.",
  },
  {
    kind: "traps",
    heading: "Quatro jeitos de operar fora de posição",
    items: [
      {
        title: "Madrugada",
        text: "Pouco volume e liquidez reduzida tornam a operação mais arriscada e menos previsível.",
      },
      {
        title: "Horários aleatórios",
        text: "Operar sem janela definida aumenta erro e reduz consistência.",
      },
      {
        title: "Estado de cansaço",
        text: "Fadiga compromete análise e decisão. Loss evitável vira “foi o mercado”.",
      },
      {
        title: "Fora da rotina",
        text: "Quebrar o horário combinado quebra a disciplina. A sessão certa também é a que você consegue repetir.",
      },
    ],
  },
  {
    kind: "chapter",
    kicker: "Capítulo 6",
    title: "Como escolher o seu melhor horário.",
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Defina um horário fixo",
        text: "Escolha um período específico do dia e repita. Consistência de relógio gera consistência de leitura.",
      },
      {
        num: "02",
        title: "Teste e registre",
        text: "Monitore o desempenho em janelas diferentes e anote no diário. Dado, não feeling.",
      },
      {
        num: "03",
        title: "Opere com planejamento",
        text: "Execute só na janela combinada, com o plano já escrito.",
      },
      {
        num: "04",
        title: "Priorize qualidade",
        text: "Poucas operações boas na sessão certa vencem dezenas na sessão errada.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Fechamento conceitual",
    body: "Analise os horários com maior atividade e eficiência operacional. A consistência no horário é disciplina. Sem isso, você só está acordado na frente do gráfico.",
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Encerramento",
    body: "Fico muito feliz em ver que você chegou até aqui. Continue acompanhando a comunidade Shiver e vamos evoluir cada vez mais. Compartilhe este e-book com seus amigos.",
  },
  {
    kind: "callout",
    tone: "cyan",
    title: "Comunidade",
    body: "Entre na comunidade Shiver. A ferramenta auxilia a leitura. Quem opera é você.",
  },
  {
    kind: "meta",
    items: [
      { label: "Marca", value: "Shiver" },
      { label: "Comunidade", value: "Shiver" },
      { label: "Uso", value: "Educacional" },
    ],
  },
  {
    kind: "callout",
    tone: "danger",
    title: "Aviso — leia com atenção",
    body: "Este material tem caráter exclusivamente educacional e não constitui recomendação de investimento. Horários e sessões descritos são contexto operacional, não sinal de compra ou venda. Operar em pico de liquidez aumenta oportunidade e risco. As decisões e os resultados são de responsabilidade exclusiva do leitor. Opere na conta de treino até a rotina estar firme.",
  },
];
