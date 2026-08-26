import type { SalaEbookBlock } from "@/lib/salaEbook";

export const EBOOK_03_BODY: SalaEbookBlock[] = [
  {
    kind: "chapter",
    kicker: "Abertura",
    title: "Organização que sustenta a performance.",
    lead: "O diário não é burocracia. É o único jeito de ver o que você realmente fez, e não o que a memória inventou depois do win ou do loss.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Este e-book monta um hábito simples: registrar operação, emoção, resultado e erro. Cinco minutos por dia. Sem drama. Com dado.",
      "Quem não anota repete o mesmo gatilho e chama de azar. Quem anota vê o padrão e corrige.",
    ],
  },
  {
    kind: "stats",
    items: [
      { value: "Registrar", label: "Documente cada trade com estrutura" },
      { value: "Padrões", label: "Reconheça gatilhos e comportamentos" },
      { value: "Corrigir", label: "Transforme falha repetida em ajuste" },
      { value: "Dados", label: "Decida por fato, não por memória" },
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Leia antes de começar",
    body: "Negociar envolve risco de perda. Diário não garante resultado. Ele só torna o processo visível. Treine na conta demo. Só leve pra conta real o que você pode perder sem afetar sua vida.",
  },
  {
    kind: "meta",
    items: [
      { label: "Autor", value: "PH" },
      { label: "Edição", value: "2026 · v1" },
      { label: "Formato", value: "Guia de hábito" },
    ],
  },
  {
    kind: "toc",
    kicker: "Sumário",
    title: "Estrutura do conteúdo",
    items: [
      { num: "01", label: "Por que usar um diário", page: "03" },
      { num: "02", label: "Emoção", page: "04" },
      { num: "03", label: "Resultado", page: "05" },
      { num: "04", label: "Erro", page: "06" },
      { num: "05", label: "Modelo prático", page: "07" },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Princípio central",
    body: "O que não é registrado não pode ser melhorado. Memória falha. Emoção distorce. Profissionais medem.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 1 — Fundamentos",
    title: "Por que todo trader precisa de um diário.",
    lead: "A verdade sobre a memória: ela falha. Emoções distorcem a percepção do que realmente aconteceu.",
  },
  {
    kind: "prose",
    kicker: "Cap 01 · A verdade sobre a memória",
    heading: "Você não lembra do que acha que lembra.",
    paragraphs: [
      "Depois de um win, a entrada parece óbvia. Depois de um loss, o mercado parece injusto. Os dois relatos mentem um pouco. O diário segura o fato: ativo, horário, plano, emoção, resultado, erro.",
    ],
  },
  {
    kind: "stats",
    items: [
      { value: "Memória", label: "Você não lembra de todos os detalhes" },
      { value: "Emoção", label: "Sentimento altera a percepção dos fatos" },
      { value: "Registro", label: "Sem dado concreto, não há melhoria" },
      { value: "Profissionais", label: "Quem é consistente mede o desempenho" },
    ],
  },
  {
    kind: "chapter",
    kicker: "Capítulo 2 — O fator invisível",
    title: "Emoção.",
    lead: "A emoção influencia suas decisões mais do que qualquer estratégia técnica. Registrar o estado emocional é essencial para identificar padrões destrutivos.",
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Antes da entrada",
        text: "Como você estava se sentindo? Calmo, ansioso, confiante demais?",
      },
      {
        num: "02",
        title: "Durante a operação",
        text: "Operou com pressa? Sentiu medo ou ganância?",
      },
      {
        num: "03",
        title: "Após o resultado",
        text: "A perda foi por erro técnico ou emocional?",
      },
    ],
  },
  {
    kind: "callout",
    tone: "gold",
    title: "O que anotar",
    body: "Uma palavra basta: calmo, ansioso, pressa, revanche, confiança. O padrão aparece na revisão semanal, não na memória do candle.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 3 — Sem drama",
    title: "Resultado.",
    lead: "Registre wins e losses de forma objetiva e sem julgamento emocional. O foco está no processo, não em operações isoladas.",
  },
  {
    kind: "checklist",
    title: "Registro objetivo do dia",
    items: [
      "Anote win ou loss de cada operação.",
      "Calcule o percentual do dia.",
      "Verifique se respeitou o plano.",
      "Lembre-se: resultado isolado não define desempenho.",
    ],
  },
  {
    kind: "callout",
    tone: "cyan",
    title: "Processo acima do print",
    body: "Um loss dentro do plano é dado. Um win fora do plano é dívida. O diário mostra os dois sem teatro.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 4 — O que realmente importa",
    title: "Erro.",
    lead: "Identificar e corrigir erros recorrentes é o que separa traders consistentes de quem repete os mesmos padrões negativos. Registre cada falha com honestidade.",
  },
  {
    kind: "traps",
    heading: "Falhas que viram hábito se você não nomear",
    items: [
      {
        title: "Entrada antecipada",
        text: "Entrou antes do sinal confirmar.",
      },
      {
        title: "Ignorou tendência",
        text: "Operou contra o movimento principal.",
      },
      {
        title: "Não respeitou stop",
        text: "Moveu ou ignorou o stop loss.",
      },
      {
        title: "Fora do plano",
        text: "Operou sem seguir a estratégia.",
      },
      {
        title: "Overtrade",
        text: "Operou além do limite estabelecido.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "danger",
    title: "Atenção",
    body: "Erro repetido vira padrão negativo. Identifique e corrija antes que se torne hábito.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 5 — Modelo prático",
    title: "Comece hoje.",
    lead: "Comece com este modelo básico. Cinco minutos de registro por dia já fazem diferença na evolução.",
  },
  {
    kind: "table",
    headers: ["Data", "Ativo", "Timeframe", "Emoção", "Resultado", "Erro?"],
    rows: [
      ["15/01", "EUR/USD", "5min", "Ansioso", "Loss", "Entrada antecipada"],
      ["15/01", "GBP/USD", "15min", "Calmo", "Win", "—"],
      ["16/01", "USD/JPY", "5min", "Confiante", "Win", "—"],
      ["16/01", "EUR/USD", "15min", "Pressa", "Loss", "Não respeitou stop"],
    ],
  },
  {
    kind: "stats",
    items: [
      { value: "5 min", label: "Tempo suficiente para registrar o dia" },
      { value: "Semana", label: "Revise padrões e ajuste a estratégia" },
    ],
  },
  {
    kind: "chapter",
    kicker: "Conclusão",
    title: "Trader que registra evolui.",
    lead: "O hábito de documentar operações é o que diferencia amador de profissional consistente.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Emoção precisa ser medida. Seus sentimentos impactam as decisões. Reconheça e nomeie os gatilhos.",
      "Erro corrigido vira aprendizado. Cada falha registrada é chance de ajuste, não de vergonha.",
      "O mercado recompensa quem aprende. Traders que usam os próprios dados constroem consistência no tempo — sem garantia de resultado, com clareza de processo.",
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Comece hoje",
    body: "Não espere o formato perfeito. Comece o diário hoje, mesmo simples. Consistência no registro vale mais do que planilha bonita. Evolução acontece quando você transforma experiência em conhecimento. O diário é a ferramenta que torna isso possível.",
  },
  {
    kind: "plan",
    items: [
      { days: "Passo 1", text: "Crie sua primeira tabela." },
      { days: "Passo 2", text: "Registre as próximas 5 operações." },
      { days: "Passo 3", text: "Revise ao final da semana." },
      { days: "Passo 4", text: "Ajuste e continue." },
    ],
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
    body: "Este material tem caráter exclusivamente educacional e não constitui recomendação de investimento, consultoria financeira ou promessa de retorno. Diário e registro de operações não eliminam risco de perda. As decisões e os resultados são de responsabilidade exclusiva do leitor. Opere na conta de treino até o hábito estar firme e jamais utilize recursos que comprometam sua segurança financeira.",
  },
];
