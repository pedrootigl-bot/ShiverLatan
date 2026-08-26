import type { SalaEbookBlock } from "@/lib/salaEbook";

export const EBOOK_11_BODY: SalaEbookBlock[] = [
  {
    kind: "chapter",
    kicker: "Abertura",
    title: "Estratégias de M1, M5 e M15.",
    lead: "Timeframe é a lente. A mesma estratégia, no tempo errado, vira ruído. Este e-book ajuda a escolher o tempo — não promete resultado previsível.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Você vai entender o que muda entre M1, M5 e M15, quando cada um faz sentido, quais erros se repetem e como comparar velocidade, clareza e contexto. Consistência aqui é processo e paciência, não previsão de saldo.",
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Leia antes de começar",
    body: "Opções binárias e day trade de curto prazo envolvem risco elevado de perda. Não existe timeframe “melhor” nem tempo que elimine loss. M1, M5 e M15 mudam a leitura — não o risco do mercado. Treine na conta demo.",
  },
  {
    kind: "meta",
    items: [
      { label: "Autor", value: "PH" },
      { label: "Edição", value: "2026 · v1" },
      { label: "Formato", value: "Guia de tempo" },
    ],
  },
  {
    kind: "stats",
    items: [
      { value: "M1", label: "Velocidade e ruído." },
      { value: "M5", label: "Equilíbrio e estrutura." },
      { value: "M15", label: "Contexto e calma." },
    ],
  },
  {
    kind: "toc",
    kicker: "Sumário",
    title: "O que você vai escolher",
    items: [
      { num: "01", label: "O que é timeframe", page: "03" },
      { num: "02", label: "Quando usar M1", page: "04" },
      { num: "03", label: "Quando usar M5", page: "05" },
      { num: "04", label: "Quando usar M15", page: "06" },
      { num: "05", label: "Comparação dos tempos", page: "07" },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Princípio central",
    body: "Não existe tempo melhor. Existe o adequado ao seu perfil, ao setup e ao momento. Estratégia boa no tempo errado vira prejuízo com cara de método.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 1",
    title: "O que é timeframe — e por que ele muda tudo.",
    lead: "Timeframe é a lente pela qual você vê o mercado. Cada tempo mostra uma camada. Trocar a lente sem trocar a regra é o erro mais comum.",
  },
  {
    kind: "traps",
    heading: "O que cada lente mostra",
    items: [
      {
        title: "M1",
        text: "Ruído e micromovimento. Muita informação, pouco tempo para pensar.",
      },
      {
        title: "M5",
        text: "Estrutura mais clara. Equilíbrio entre velocidade e leitura.",
      },
      {
        title: "M15",
        text: "Contexto e tendência. Menos clique, mais espera.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "danger",
    title: "Erro comum",
    body: "Usar a mesma estratégia em todos os tempos sem adaptar a abordagem. O setup do M5 no M1 vira overtrade. O gatilho do M1 no M15 vira ansiedade.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 2",
    title: "Quando usar M1 (1 minuto).",
  },
  {
    kind: "split",
    doTitle: "Quando o M1 faz sentido",
    doText: "Operação rápida e precisa, com volatilidade que você já lê, e entrada só com confirmação forte do seu plano — não com cada tick.",
    dontTitle: "Erros comuns no M1",
    dontText: "Impulso sem análise. Overtrade (entrar o tempo todo). Confundir ruído com sinal. Stake alta em tempo rápido — a conta pequena não aguenta o ritmo do M1 gordo.",
  },
  {
    kind: "callout",
    tone: "warn",
    title: "M1 cobra a cabeça",
    body: "Se você não aguenta esperar o M5, o M1 não vai te acalmar. Vai te multiplicar o clique. Comece no tempo em que você ainda consegue pensar.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 3",
    title: "Quando usar M5 (5 minutos).",
    lead: "Equilíbrio entre velocidade e clareza. Leitura melhor de suporte e resistência. Tempo em que muita gente deveria começar — inclusive quem já quebrou no M1.",
  },
  {
    kind: "traps",
    heading: "Erros comuns no M5",
    items: [
      {
        title: "Antecipar a entrada",
        text: "Clicar antes do sinal do plano. “Quase formou” não formou.",
      },
      {
        title: "Ignorar o M15",
        text: "Operar M5 contra o contexto maior. A lente menor não cancela a maior.",
      },
      {
        title: "Não esperar o fechamento",
        text: "Entrar no meio do candle. O M5 mente enquanto está aberto.",
      },
      {
        title: "Uma vela não é volta",
        text: "Achar que “voltou” só por 1 candle. Estrutura pede mais do que um pavio.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "cyan",
    title: "Por que o M5 aparece tanto nestes e-books",
    body: "Não porque seja mágico. Porque dá tempo de aplicar regra — zona, fechamento, checklist — sem o ruído do M1 nem a espera que quebra o impaciente no M15.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 4",
    title: "Quando usar M15 (15 minutos).",
    lead: "Identificar direção e contexto. Operar com mais calma. Reduzir a ansiedade de decidir a cada minuto — se você aceitar esperar o gatilho.",
  },
  {
    kind: "traps",
    heading: "Erros comuns no M15",
    items: [
      {
        title: "Querer operar o tempo todo",
        text: "M15 não entrega a frequência do M1. Quem exige clique a cada três minutos abandona o tempo certo.",
      },
      {
        title: "Impaciência no gatilho",
        text: "Entrar sem o gatilho do plano porque “já esperou demais”.",
      },
      {
        title: "Stop emocional por demora",
        text: "Sair porque demorou, não porque a regra mandou. Tempo maior exige estômago maior.",
      },
      {
        title: "Mudar o plano no meio",
        text: "Trocar M15 por M1 no meio da operação para “acelerar”. Isso não é adaptação. É fuga.",
      },
    ],
  },
  {
    kind: "chapter",
    kicker: "Capítulo 5",
    title: "Comparação dos timeframes.",
  },
  {
    kind: "table",
    headers: ["Tempo", "O que oferece", "Risco típico da leitura"],
    rows: [
      ["M1", "Velocidade, ruído", "Alto — pouco tempo para pensar"],
      ["M5", "Equilíbrio, clareza", "Médio — estrutura com ritmo"],
      ["M15", "Contexto, calma", "Mais controlado na decisão — não no mercado"],
    ],
  },
  {
    kind: "prose",
    paragraphs: [
      "Cada timeframe oferece vantagens específicas. A escolha certa depende do perfil, da estratégia e do momento. Não existe tempo “melhor”. Existe o adequado — e o inadequado que você insiste em usar por pressa.",
    ],
  },
  {
    kind: "callout",
    tone: "gold",
    title: "Risco controlado não é lucro controlado",
    body: "M15 reduz a pressa da decisão. Não reduz o risco de perder. M1 aumenta a velocidade. Não aumenta a precisão por magia. A lente muda. O mercado, não.",
  },
  {
    kind: "chapter",
    kicker: "Conclusão",
    title: "Consistência através do tempo certo.",
    lead: "Timeframe adequado reduz um tipo de erro: aplicar o setup na lente errada. Não elimina loss. Não torna o resultado previsível.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Estratégia boa no tempo errado vira prejuízo com cara de método. Mesmo um setup que você já viu funcionar falha quando a lente não combina com a regra.",
      "Consistência de processo vem de contexto + paciência: respeitar o tempo, esperar confirmação, não trocar de lente no meio do loss. Resultado no saldo continua sem garantia.",
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Fechamento",
    body: "Gerenciamento de risco na prática começa na escolha do tempo. A ferramenta da Shiver auxilia a leitura. Quem escolhe M1, M5 ou M15 — e quem obedece — é você.",
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
    body: "Este material tem caráter exclusivamente educacional e não constitui recomendação de investimento nem promessa de retorno. Escolher M1, M5 ou M15 não elimina o risco de perda em opções binárias e day trade. As decisões e os resultados são de responsabilidade exclusiva do leitor. Opere na conta de treino até o tempo escolhido estar no reflexo do plano.",
  },
];
