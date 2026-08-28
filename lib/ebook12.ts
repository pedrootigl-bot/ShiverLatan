import type { SalaEbookBlock } from "@/lib/salaEbook";

export const EBOOK_12_BODY: SalaEbookBlock[] = [
  {
    kind: "chapter",
    kicker: "Abertura",
    title: "Como o mercado financeiro surgiu?",
    lead: "Bora conferir? Você vai entender por que esse sistema existe, como nasceu da economia — e por que o mercado, na origem, não é cassino. É consequência da atividade humana. Operar no curto prazo, ainda assim, continua sendo risco.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Guia educativo para iniciantes: do escambo ao dinheiro, dos bancos ao crédito, das crises às bolsas e ao câmbio, até o papel de quem opera hoje. Entender a origem ajuda a ter mais respeito pelo sistema. Não substitui gestão de risco nem garante resultado.",
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Leia antes de começar",
    body: "Este e-book é história e contexto, não recomendação de investimento. Opções binárias e day trade envolvem risco elevado de perda. Conhecer a origem do mercado não torna a operação mais segura por magia. Treine na conta demo.",
  },
  {
    kind: "meta",
    items: [
      { label: "Autor", value: "PH" },
      { label: "Edição", value: "2026 · v1" },
      { label: "Formato", value: "Guia educativo" },
    ],
  },
  {
    kind: "toc",
    kicker: "Sumário",
    title: "O que você vai entender",
    items: [
      { num: "01", label: "Escambo e o dinheiro", page: "03" },
      { num: "02", label: "Bancos, crédito e o sistema", page: "04" },
      { num: "03", label: "Crises, bolsas e câmbio", page: "05" },
      { num: "04", label: "O mercado hoje e o trader", page: "06" },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Princípio central",
    body: "O mercado financeiro é consequência da economia. Quem trata o gráfico só como aposta ignora de onde veio o preço — e costuma pagar caro por isso.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 1",
    title: "Trocas primitivas e o surgimento do dinheiro.",
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Escambo",
        text: "Pessoas trocavam produtos direto: peixe por fruta, ferramenta por roupa. Simples — e limitado.",
      },
      {
        num: "02",
        title: "Necessidade de um meio de troca",
        text: "O escambo exigia coincidência de necessidades. Nem sempre quem tinha o que você queria queria o que você tinha.",
      },
      {
        num: "03",
        title: "Surgimento do dinheiro",
        text: "Moedas e objetos de valor passaram a representar riqueza. O dinheiro facilitou a troca e permitiu a economia crescer em escala.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "cyan",
    title: "Por que isso importa no gráfico",
    body: "Preço é linguagem de troca. Sem um meio comum, não existe mercado organizado. Com ele, surge também o risco de crédito, de confiança e de excesso.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 2",
    title: "Bancos, crédito e sistema financeiro.",
  },
  {
    kind: "traps",
    heading: "Três peças que estruturaram o fluxo",
    items: [
      {
        title: "O papel dos bancos",
        text: "Guardar valor com mais segurança e facilitar transações entre pessoas e comerciantes.",
      },
      {
        title: "O conceito de crédito",
        text: "Emprestar com promessa de pagamento futuro. Isso acelerou negócios — e criou o risco de não pagar.",
      },
      {
        title: "Estruturação do sistema",
        text: "Regras e instituições para organizar o fluxo de dinheiro e proteger transações. Confiança vira infraestrutura.",
      },
    ],
  },
  {
    kind: "stats",
    items: [
      { value: "Segurança", label: "Proteção do capital — nunca absoluta." },
      { value: "Confiança", label: "Base das transações." },
      { value: "Crescimento", label: "Expansão econômica — e ciclos." },
    ],
  },
  {
    kind: "callout",
    tone: "gold",
    title: "Crédito acelera os dois lados",
    body: "O mesmo mecanismo que financia o comércio financia o excesso. Por isso o capítulo seguinte existe: crise não é acidente isolado. É o sistema testando a confiança.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 3",
    title: "Crises, bolsas e mercado de câmbio.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Crises acontecem quando há desequilíbrio entre oferta, demanda, crédito ou confiança. Elas doeram — e mostraram a necessidade de mais organização, regra e transparência. Não eliminaram o risco. Tornaram o risco mais visível.",
      "As bolsas trouxeram preço público e regras de negociação. O mercado de câmbio nasceu da necessidade de trocar moedas entre países. Em volume, o Forex é citado como o maior mercado financeiro do mundo. Bolsas e câmbio são pilares do sistema moderno — cada um com seu risco.",
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Maior mercado ≠ mercado mais fácil",
    body: "Liquidez alta no câmbio não significa operação fácil para o varejo. Instituição e conta pequena não jogam o mesmo jogo, mesmo quando o par é o mesmo.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 4",
    title: "O mercado hoje e o papel do trader.",
    lead: "Grandes instituições movimentam volumes enormes. O varejo participa do mesmo preço — com menos capital, menos informação e mais atrito. Ferramenta parecida na tela não é igualdade de condição.",
  },
  {
    kind: "split",
    doTitle: "O que o ofício pede",
    doText: "Interpretar dado, ler tendência, decidir com critério e proteger capital. Análise no lugar da sorte. Gestão no lugar do all-in.",
    dontTitle: "O que o clique fácil finge",
    dontText: "Que o trader varejo “não aposta” só porque existe gráfico. Se não há plano, risco e contexto, o clique volta a ser aposta — mesmo em cima de um mercado que nasceu da economia real.",
  },
  {
    kind: "checklist",
    title: "Três lembretes para quem opera agora",
    items: [
      "Análise, não sorte: gráfico, indicador e fundamento só valem se entra no plano.",
      "Gestão de risco: profissional protege capital com regra e disciplina — sem garantia de lucro.",
      "Participação: cada ordem entra num fluxo enorme. A sua não “forma o preço global”. Ela decide a sua banca.",
    ],
  },
  {
    kind: "quote",
    text: "O mercado é consequência da economia. O seu resultado é consequência do seu processo — e do risco que você aceitou.",
    cite: "E-book 12 · Shiver",
  },
  {
    kind: "prose",
    paragraphs: [
      "Entender a origem ajuda a operar com mais consciência e respeito pelo sistema. Não transforma binária em investimento seguro. O mercado nasceu da troca. O loss nasceu do risco. Os dois continuam juntos.",
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Fechamento",
    body: "História para ter contexto. Plano para ter ofício. A ferramenta da Shiver auxilia a leitura. Quem opera é você.",
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
    body: "Este material tem caráter exclusivamente educacional e não constitui recomendação de investimento, consultoria nem promessa de retorno. Conhecer a história do mercado não elimina o risco de perda em opções binárias e day trade. As decisões e os resultados são de responsabilidade exclusiva do leitor.",
  },
];
