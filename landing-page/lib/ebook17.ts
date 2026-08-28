import type { SalaEbookBlock } from "@/lib/salaEbook";

export const EBOOK_17_BODY: SalaEbookBlock[] = [
  {
    kind: "chapter",
    kicker: "Abertura",
    title: "Como usar linhas de tendência corretamente?",
    lead: "Entenda na prática agora. Tendência é direção predominante — não linha mágica. Identifique para onde o mercado está indo antes de decidir o clique. Forçar diagonal no gráfico poluído não é análise.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Este e-book define tendência, os três estados do mercado (alta, baixa, lateral), como traçar e validar a linha, a diferença entre correção e reversão, e quando simplesmente não desenhar nada.",
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Leia antes de começar",
    body: "Opções binárias envolvem risco elevado de perda. Operar a favor da tendência reduz um tipo de erro — não garante acerto. Mais toques na linha também não são contrato de continuidade. Treine na conta demo.",
  },
  {
    kind: "meta",
    items: [
      { label: "Autor", value: "PH" },
      { label: "Edição", value: "2026 · v1" },
      { label: "Formato", value: "Guia de tendência" },
    ],
  },
  {
    kind: "toc",
    kicker: "Sumário",
    title: "O que você vai traçar com menos invenção",
    items: [
      { num: "01", label: "O que é tendência", page: "03" },
      { num: "02", label: "Alta, baixa e lateral", page: "04" },
      { num: "03", label: "Como traçar e validar", page: "05" },
      { num: "04", label: "Correção, reversão e quando não usar", page: "06" },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Princípio central",
    body: "Contexto primeiro. Direção importa. Ir contra o fluxo aumenta o risco — não prova coragem.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 1",
    title: "O que é tendência.",
    lead: "Tendência é a direção predominante do preço num período. O mercado no curto prazo pode parecer ruído. Ainda assim forma padrões que dá para acompanhar — sem garantir o próximo candle.",
  },
  {
    kind: "stats",
    items: [
      { value: "Direção", label: "Seguir o fluxo reduz um tipo de erro." },
      { value: "Contexto", label: "Analise antes de agir." },
      { value: "Contra", label: "Contrato de risco maior, não de genialidade." },
    ],
  },
  {
    kind: "prose",
    paragraphs: [
      "Entender a direção pesa mais do que acertar o pip da entrada. Operar contra a tendência é ir contra o fluxo visível. Isso aumenta o risco de perda. Não torna a favor da tendência “fácil”.",
    ],
  },
  {
    kind: "chapter",
    kicker: "Capítulo 2",
    title: "Tendência de alta, baixa e lateral.",
    lead: "Três estados. Cada um pede abordagem diferente. Errar o estado é escolher o setup errado com confiança.",
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Tendência de alta",
        text: "Topos e fundos cada vez mais altos. Padrão ascendente. O plano, se existir, busca compra no fluxo — não “catching falling knife” invertido.",
      },
      {
        num: "02",
        title: "Tendência de baixa",
        text: "Topos e fundos cada vez mais baixos. Padrão descendente. O plano busca venda no fluxo. Comprar fundo em queda livre não é coragem.",
      },
      {
        num: "03",
        title: "Mercado lateral",
        text: "Preço oscila entre dois níveis sem direção clara. Sem força dominante. Evite forçar linha. Aguarde definição — ou opere só o que o plano de range autorizar.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "cyan",
    title: "Identificar o estado é o primeiro passo",
    body: "Decisão consistente começa no diagnóstico. Linha de tendência em lateral é desenho, não leitura.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 3",
    title: "Como traçar linhas de tendência.",
    lead: "A linha conecta pontos relevantes para visualizar a direção. Não force onde não há clareza. Deixe o preço desenhar. Você só evidência.",
  },
  {
    kind: "checklist",
    title: "Princípios básicos",
    items: [
      "Em alta: conecte os fundos ascendentes.",
      "Em baixa: conecte os topos descendentes.",
      "Gráfico limpo. Sem poluição. Uma linha boa vale mais que cinco tortas.",
      "Não puxe a diagonal até ela “servir” o que você quer operar.",
    ],
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Dois toques criam a linha",
        text: "Mínimo para traçar. Ainda não é confirmação forte. É hipótese no gráfico.",
      },
      {
        num: "02",
        title: "Três ou mais toques validam melhor",
        text: "A partir do terceiro, a linha ganha relevância. Continua podendo romper no quarto.",
      },
      {
        num: "03",
        title: "Mais toques ≠ garantia",
        text: "Quanto mais o preço respeita, mais o mercado “vê” aquele nível — e mais gente está do mesmo lado. Continuidade é possível. Exaustão também. Toque extra não é contrato.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "gold",
    title: "Menos é mais",
    body: "Uma linha bem traçada vale mais que várias mal posicionadas. Se você precisa de seis diagonais para “achar setup”, o setup não está no gráfico. Está na sua pressa.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 4",
    title: "Correção vs reversão — e quando não traçar.",
  },
  {
    kind: "split",
    doTitle: "Correção",
    doText: "Movimento temporário contra a tendência principal. O preço volta, mas a direção maior segue. É esperado. Exemplo: alta forte, pequena queda, retomada da subida — se os fundos continuam ascendentes.",
    dontTitle: "Reversão",
    dontText: "Mudança efetiva de direção. A tendência anterior perde força e uma nova se estabelece com clareza: rompimento de zona importante e topos/fundos no sentido novo. Não é um pavio. É estrutura.",
  },
  {
    kind: "callout",
    tone: "danger",
    title: "Erro comum",
    body: "Tratar correção como reversão total e operar na direção errada. Aguarde confirmação estrutural antes de virar o viés. Um candle contra não basta.",
  },
  {
    kind: "traps",
    heading: "Quando NÃO usar linha de tendência",
    items: [
      {
        title: "Lateral sem direção",
        text: "Não há diagonal honesta. Há range. Marque zona, não hipotenusa.",
      },
      {
        title: "Gráfico poluído",
        text: "Confusão visual. Apague e recomece com pouco.",
      },
      {
        title: "Poucos toques, pouca história",
        text: "Dois pontos e imaginação. Espere o mercado oferecer o terceiro — ou não opere a linha.",
      },
      {
        title: "Sem contexto ou volatilidade excessiva",
        text: "Notícia, gap, candle fora do padrão. A linha de ontem pode ser lixo hoje.",
      },
    ],
  },
  {
    kind: "prose",
    paragraphs: [
      "Saber quando não traçar é tão importante quanto saber traçar. Tendência dá o contexto da direção. Suporte e resistência (e-book 16) dão a zona de reação. A confluência entre linha e zona de S/R é leitura mais rica — não “probabilidade de acerto significativamente maior”. É menos invenção, não garantia.",
    ],
  },
  {
    kind: "quote",
    text: "Operar a favor do gráfico reduz um tipo de erro. Ir contra o fluxo é ir contra o que está visível — não contra um oráculo.",
    cite: "E-book 17 · Shiver",
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Fechamento",
    body: "Direção, toques, correção versus reversão. A ferramenta da Shiver auxilia a leitura. Quem traça a linha — e quem recusa a linha forçada — é você.",
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
    body: "Este material tem caráter exclusivamente educacional e não constitui recomendação de investimento nem promessa de retorno. Linha de tendência e confluência com suporte/resistência não garantem continuidade nem acerto. Operar envolve risco elevado de perda. As decisões e os resultados são de responsabilidade exclusiva do leitor. Opere na conta de treino até a linha ser hipótese, não fé.",
  },
];
