import type { SalaEbookBlock } from "@/lib/salaEbook";

export const EBOOK_02_BODY: SalaEbookBlock[] = [
  {
    kind: "chapter",
    kicker: "Abertura",
    title: "Entenda na prática agora.",
    lead: "Indicador não é bola de cristal. Ele traduz o que o preço já fez. Se você tratar linha como previsão, opera atrasado. Se tratar como confirmação, o gráfico fica mais limpo e a decisão mais clara.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Este e-book responde uma pergunta que o iniciante faz cedo demais: para que servem os indicadores de trade? A resposta curta é: para confirmar a leitura do preço, não para decidir no lugar dele.",
      "Você vai sair daqui sabendo o que um indicador é, por que ele sempre chega depois, quais tipos existem e como usar um ou dois no máximo — sem poluir a tela e sem achar que mais linha vira mais certeza.",
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Leia antes de começar",
    body: "Negociar envolve risco de perda. Indicador não elimina atraso, não garante resultado e não substitui o trader. Treine na conta demo. Só leve pra conta real o que você pode perder sem afetar sua vida.",
  },
  {
    kind: "meta",
    items: [
      { label: "Autor", value: "PH" },
      { label: "Edição", value: "2026 · v1" },
      { label: "Formato", value: "Guia de leitura" },
    ],
  },
  {
    kind: "toc",
    kicker: "Sumário",
    title: "O que você vai dominar",
    items: [
      { num: "01", label: "O que são indicadores", page: "03" },
      { num: "02", label: "Por que eles não funcionam sozinhos", page: "04" },
      { num: "03", label: "Tendência, força e volatilidade", page: "05" },
      { num: "04", label: "Confirmação, não decisão", page: "07" },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Princípio central",
    body: "O preço se move primeiro. O indicador calcula depois. O sinal que você vê já é história. Quem decide é você, lendo estrutura. O indicador só confirma.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 1 — Fundamentos",
    title: "O que são indicadores.",
    lead: "Indicadores são cálculos matemáticos baseados no preço de um ativo. Eles processam dados históricos e transformam isso em linhas, barras ou números no gráfico.",
  },
  {
    kind: "prose",
    kicker: "Cap 01 · Informação derivada",
    heading: "É o passado, desenhado de outro jeito.",
    paragraphs: [
      "É informação derivada, não antecipada. O indicador reage ao que já aconteceu. Ele não prevê o futuro; ele confirma padrões passados. Entender isso é o primeiro passo para usar indicadores com inteligência.",
      "Se o preço não andou, o indicador não tem o que calcular. Ele não cria dado novo. Só reorganiza o que o mercado já mostrou.",
    ],
  },
  {
    kind: "stats",
    items: [
      { value: "Preço", label: "Usam dados históricos do ativo" },
      { value: "Derivada", label: "Não criam informação nova" },
      { value: "Atraso", label: "Reagem e confirmam, não antecipam" },
    ],
  },
  {
    kind: "chapter",
    kicker: "Capítulo 2 — Alerta",
    title: "Por que eles não funcionam sozinhos.",
    lead: "Indicadores dependem do movimento do preço. Eles chegam depois, sempre com atraso. Usar um indicador isoladamente é como dirigir olhando apenas pelo retrovisor.",
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Preço se move",
        text: "O mercado reage primeiro. A vela, o suporte e a quebra acontecem no preço.",
      },
      {
        num: "02",
        title: "Indicador calcula",
        text: "A fórmula processa o movimento que já ocorreu. Isso leva tempo — mesmo que seja pouco.",
      },
      {
        num: "03",
        title: "Sinal aparece",
        text: "Você vê a linha cruzar, o histograma pintar, o número mudar. Isso já é depois.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "danger",
    title: "Importante",
    body: "Decisões baseadas apenas em indicadores geram atraso e erros. O contexto do preço sempre vem primeiro.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 3 — Tipos principais",
    title: "Tendência, força e volatilidade.",
    lead: "Existem três categorias principais de indicadores. Cada uma mede aspectos diferentes do mercado e serve para confirmar leituras específicas.",
  },
  {
    kind: "prose",
    kicker: "Tendência",
    heading: "Direção predominante do preço.",
    paragraphs: [
      "Servem para confirmar se o mercado está subindo, caindo ou lateral. Médias e faixas de tendência tentam responder: o fluxo ainda está do mesmo lado?",
      "Limitação: atrasam em reversões rápidas. Quando o preço vira no susto, a linha ainda aponta o caminho antigo.",
    ],
  },
  {
    kind: "prose",
    kicker: "Força",
    heading: "Intensidade do movimento.",
    paragraphs: [
      "Ajudam quando você quer confirmar se a pressão compradora ou vendedora está forte. Osciladores e leitores de momentum tentam medir o quanto o movimento tem combustível.",
      "Atrapalham quando usados sem contexto de preço. Força alta contra uma resistência óbvia não é convite automático para entrar.",
    ],
  },
  {
    kind: "prose",
    kicker: "Volatilidade",
    heading: "Variação e amplitude dos preços.",
    paragraphs: [
      "Úteis para identificar momentos de mercado mais ou menos ativo. Amplitude larga e amplitude estreita pedem tamanhos de risco diferentes.",
      "Volatilidade muda o risco da operação. O mesmo setup, com stop que não cabe na conta, deixa de ser setup.",
    ],
  },
  {
    kind: "table",
    headers: ["Tipo", "O que mostra", "Para que serve", "Onde falha"],
    rows: [
      ["Tendência", "Direção", "Confirmar alta, baixa ou lateral", "Reversão rápida"],
      ["Força", "Intensidade", "Ver se a pressão está viva", "Sem contexto de preço"],
      ["Volatilidade", "Amplitude", "Ajustar risco e expectativa", "Tratar ruído como sinal"],
    ],
  },
  {
    kind: "chapter",
    kicker: "Capítulo 4 — Uso correto",
    title: "Confirmação, não decisão.",
    lead: "O preço sempre vem primeiro. Você lê o gráfico, identifica estrutura, suportes, resistências. Só então o indicador entra para confirmar sua leitura.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Indicador nunca decide sozinho. Ele apoia, valida, complementa, mas não substitui a análise do preço.",
    ],
  },
  {
    kind: "traps",
    heading: "Erros clássicos: excesso de indicadores",
    items: [
      {
        title: "Gráfico poluído",
        text: "Tela cheia de linha vira ruído. Você para de ver o preço.",
      },
      {
        title: "Informações conflitantes",
        text: "Um indicador compra, o outro vende. A decisão trava.",
      },
      {
        title: "Paralisação",
        text: "Mais confirmação vira desculpa para não clicar — ou para clicar tarde.",
      },
      {
        title: "Falsa segurança técnica",
        text: "Muita ferramenta parece método. Sem estrutura, é só atraso enfeitado.",
      },
    ],
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Leia o preço",
        text: "Identifique estrutura e contexto. Tendência, zona, o que o mercado já mostrou.",
      },
      {
        num: "02",
        title: "Escolha 1 ou 2 indicadores",
        text: "Apenas para confirmar. Um de tendência ou um de força costuma bastar.",
      },
      {
        num: "03",
        title: "Compare com o preço",
        text: "O indicador valida a sua leitura? Se discorda, a leitura manda. Não inverta a hierarquia.",
      },
      {
        num: "04",
        title: "Decida com clareza",
        text: "Menos elementos, mais foco. Entra, espera ou passa — com uma tese só.",
      },
    ],
  },
  {
    kind: "quote",
    text: "Menos é mais. Gráfico limpo gera decisões melhores.",
    cite: "E-book 02 · Shiver",
  },
  {
    kind: "split",
    doTitle: "Faça",
    doText:
      "Leia o preço primeiro. Use um ou dois indicadores só para confirmar. Aceite o atraso. Se a linha contradizer a estrutura, fique com a estrutura.",
    dontTitle: "Não faça",
    dontText:
      "Não empilhe sete indicadores. Não entre só porque a linha cruzou. Não trate oscilador como ordem. Não ignore suporte e resistência.",
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
    body: "Este material tem caráter exclusivamente educacional e não constitui recomendação de investimento, consultoria financeira ou promessa de retorno. Indicadores não predizem o mercado e não eliminam risco de perda. As decisões de operação e seus resultados são de responsabilidade exclusiva do leitor. Opere sempre na conta de treino até dominar a leitura e jamais utilize recursos que comprometam sua segurança financeira.",
  },
];
