import type { SalaEbookBlock } from "@/lib/salaEbook";

export const EBOOK_10_BODY: SalaEbookBlock[] = [
  {
    kind: "chapter",
    kicker: "Abertura",
    title: "Gestão de banca para contas pequenas.",
    lead: "Conta pequena exige controle rigoroso. Sem disciplina, qualquer valor some rápido. O objetivo inicial não é lucro alto. É sobreviver, aprender e não tratar o gráfico como cassino.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Este e-book define stake por operação, stop e meta ilustrativos do dia, a regra das três perdas e um plano simples de evolução. Os reais da tabela são exemplo de cálculo — não meta, não recomendação de depósito.",
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Leia antes de começar",
    body: "Opções binárias envolvem risco elevado de perda, inclusive perda total. Percentuais (1% a 3%, stop −5% a −10%, meta +3% a +7%) são ilustrativos. Gestão de banca não garante crescimento. Treine na conta demo.",
  },
  {
    kind: "meta",
    items: [
      { label: "Autor", value: "PH" },
      { label: "Edição", value: "2026 · v1" },
      { label: "Formato", value: "Guia de banca" },
    ],
  },
  {
    kind: "toc",
    kicker: "Sumário",
    title: "O que você vai definir",
    items: [
      { num: "01", label: "O erro de quem começa pequeno", page: "03" },
      { num: "02", label: "Stake por operação", page: "04" },
      { num: "03", label: "Stop diário e meta realista", page: "05" },
      { num: "04", label: "Plano simples de evolução", page: "06" },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Princípio central",
    body: "Proteja o capital acima de tudo. Conta pequena sem gestão quebra. Com gestão, ela pode durar o suficiente para você aprender — sem promessa de saldo.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 1",
    title: "O erro de quem começa pequeno.",
    lead: "O tamanho da conta não perdoa o clique gordo. Quem começa pequeno e opera como se a banca fosse infinita zera mais rápido, não mais devagar.",
  },
  {
    kind: "traps",
    heading: "Quatro lições que a conta pequena cobra cedo",
    items: [
      {
        title: "Disciplina é tudo",
        text: "Conta pequena exige controle rigoroso. Sem disciplina, qualquer valor desaparece rápido.",
      },
      {
        title: "Objetivo real",
        text: "Sobreviver e aprender. O foco inicial não é lucro alto. É consistência de processo e experiência.",
      },
      {
        title: "Operação alta quebra",
        text: "Arriscar demais por entrada é o caminho mais curto para zerar. Stake gordo não “acelera o crescimento”. Acelera o fim.",
      },
      {
        title: "Não é cassino",
        text: "Mercado exige estratégia, planejamento e gestão. All-in não é coragem. É aposta — e aposta all-in acaba.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "danger",
    title: "All-in",
    body: "Nunca apostar tudo. All-in não é gestão. É o último clique da conta.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 2",
    title: "Stake por operação — a regra de ouro.",
  },
  {
    kind: "checklist",
    title: "Regras fundamentais (ilustrativas)",
    items: [
      "Risco de estudo: 1% a 3% por operação sobre a banca.",
      "Iniciante: comece em 1% ou 2%. O 3% é teto de exemplo, não convite.",
      "Nunca fazer all-in.",
      "Proteger o capital acima de qualquer pressa de “fazer o dia”.",
    ],
  },
  {
    kind: "prose",
    paragraphs: [
      "A tabela abaixo mostra quanto seria 1%, 2% e 3% em bancas de exemplo. Use como referência de cálculo. Não é valor mínimo de depósito nem previsão de resultado.",
    ],
  },
  {
    kind: "table",
    headers: ["Banca", "Stake 1%", "Stake 2%", "Stake 3%"],
    rows: [
      ["R$ 50", "R$ 0,50", "R$ 1,00", "R$ 1,50"],
      ["R$ 100", "R$ 1,00", "R$ 2,00", "R$ 3,00"],
      ["R$ 200", "R$ 2,00", "R$ 4,00", "R$ 6,00"],
    ],
  },
  {
    kind: "callout",
    tone: "gold",
    title: "Como ler a tabela",
    body: "Se a plataforma não aceita centavos, arredonde para baixo e trate o percentual como teto. Stake maior do que a tabela não “compensa” banca pequena. Só encurta a vida dela.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 3",
    title: "Stop diário e meta realista.",
    lead: "O dia também tem tamanho. Sem teto de perda e sem teto de ganho, a conta pequena vira sessão infinita.",
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Stop loss diário",
        text: "Limite ilustrativo de perda: −5% a −10% da banca no dia. Atingiu, parou. Sem “uma última”.",
      },
      {
        num: "02",
        title: "Meta diária",
        text: "Objetivo ilustrativo: +3% a +7%. Alcançou? Considere encerrar. Verde também vicia o clique.",
      },
      {
        num: "03",
        title: "Regra das 3 perdas",
        text: "Após 3 losses consecutivos, pare. Não tente recuperar no mesmo dia. Isso é o e-book 09 na prática.",
      },
    ],
  },
  {
    kind: "table",
    headers: ["Banca", "Stop (−5% / −10%)", "Meta (+3% / +7%)"],
    rows: [
      ["R$ 50", "−R$ 2,50 / −R$ 5,00", "+R$ 1,50 / +R$ 3,50"],
      ["R$ 100", "−R$ 5,00 / −R$ 10,00", "+R$ 3,00 / +R$ 7,00"],
      ["R$ 200", "−R$ 10,00 / −R$ 20,00", "+R$ 6,00 / +R$ 14,00"],
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Meta não é obrigação",
    body: "Bater +3% não é “o dia certo”. É um teto para não devolver no overtrade. Não bater a meta também não autoriza esticar o stop.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 4",
    title: "Plano simples de evolução.",
    lead: "Só aumente o stake depois de consistência de processo — não depois de um dia verde. Evolução sustentável, quando acontece, vem de paciência. Não de pressa.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Uma regra ilustrativa: uma semana inteira no positivo, com o plano obedecido, pode autorizar um aumento leve do risco. Uma semana verde não é evidência de edge eterno. É só o mínimo para não subir o stake no feeling.",
    ],
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Mercado com direção?",
        text: "Identifique a tendência antes de entrar. Banca pequena não paga leitura de lateral sem setup.",
      },
      {
        num: "02",
        title: "Suporte e resistência?",
        text: "Opere em níveis que o seu plano reconhece. Clique no vazio é stake jogado.",
      },
      {
        num: "03",
        title: "Entrada planejada?",
        text: "Nunca opere por impulso ou emoção. O percentual da tabela só funciona se o clique for o do plano.",
      },
    ],
  },
  {
    kind: "quote",
    text: "Conta pequena não cresce no milagre. Sem gestão, qualquer banca quebra. Com gestão, ela pode durar.",
    cite: "E-book 10 · Shiver",
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Fechamento",
    body: "Disciplina, paciência e foco no longo prazo. A ferramenta da Shiver auxilia a leitura. Quem define o 1% e quem para no stop é você.",
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
    body: "Este material tem caráter exclusivamente educacional e não constitui recomendação de investimento nem promessa de retorno. Tabelas de stake, stop e meta são exemplos ilustrativos em reais. Gestão de banca não elimina o risco de perda em opções binárias. As decisões e os resultados são de responsabilidade exclusiva do leitor. Opere na conta de treino até o percentual estar no reflexo.",
  },
];
