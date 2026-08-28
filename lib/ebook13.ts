import type { SalaEbookBlock } from "@/lib/salaEbook";

export const EBOOK_13_BODY: SalaEbookBlock[] = [
  {
    kind: "chapter",
    kicker: "Abertura",
    title: "O que são pares de moedas e suas correlações?",
    lead: "Entenda a base do trade. Você nunca negocia “só o euro”. Negocia um par. E dois pares podem estar dizendo a mesma coisa — ou o contrário — sem você perceber.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Este e-book explica por que o Forex existe, o que é moeda base e moeda cotada, a diferença entre principal, cruzado e exótico, e por que correlação positiva ou negativa muda o risco real da banca. Conhecer o terreno reduz um tipo de erro. Não aumenta “chance de sucesso” por mágica.",
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Leia antes de começar",
    body: "Opções binárias e câmbio envolvem risco elevado de perda. Correlação não é regra eterna: pares “geralmente juntos” podem divergir no dia. Exemplos são ilustrativos. Treine na conta demo.",
  },
  {
    kind: "meta",
    items: [
      { label: "Autor", value: "PH" },
      { label: "Edição", value: "2026 · v1" },
      { label: "Formato", value: "Guia de pares" },
    ],
  },
  {
    kind: "toc",
    kicker: "Sumário",
    title: "O que você vai entender",
    items: [
      { num: "01", label: "O que é o Forex", page: "03" },
      { num: "02", label: "O que são pares", page: "04" },
      { num: "03", label: "Tipos de pares", page: "05" },
      { num: "04", label: "Correlações", page: "06" },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Princípio central",
    body: "Operar pares correlacionados sem saber é apostar duas vezes no mesmo resultado — e achar que diversificou.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 1",
    title: "O que é o Forex e por que ele existe.",
    lead: "Forex é o mercado global de câmbio: moedas compradas e vendidas. Nasceu da necessidade de trocar moeda para comércio internacional. Empresas, bancos e investidores convertem uma moeda em outra o tempo todo.",
  },
  {
    kind: "prose",
    paragraphs: [
      "É citado como o maior mercado financeiro do mundo em volume, com sessão praticamente contínua nos dias úteis. A função principal é facilitar o comércio global e a interação entre economias — não fornecer “renda extra” ao varejo.",
    ],
  },
  {
    kind: "callout",
    tone: "cyan",
    title: "Fato de contexto",
    body: "O câmbio movimenta, em volume diário, na casa dos trilhões de dólares. Volume enorme não torna a operação mais fácil para conta pequena. Liquidez alta também é risco alto se o clique não tem plano.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 2",
    title: "O que são pares de moedas.",
    lead: "No Forex você nunca compra só uma moeda. Sempre negocia um par: uma contra a outra. Comprar EUR/USD, no mercado à vista, é comprar euro e vender dólar ao mesmo tempo.",
  },
  {
    kind: "traps",
    heading: "Três peças do preço",
    items: [
      {
        title: "Moeda base",
        text: "A primeira do par. É a que você está comprando ou vendendo. Em EUR/USD, a base é o euro.",
      },
      {
        title: "Moeda cotada",
        text: "A segunda. Diz quanto dela é preciso para uma unidade da base. Em EUR/USD, o dólar cotado.",
      },
      {
        title: "Preço do par",
        text: "A relação de valor entre as duas, agora. Sobe: a base fortalece contra a cotada. Desce: o contrário.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "gold",
    title: "E na binária?",
    body: "Na opção binária você não entrega euro nem dólar. Especula a direção daquele par num vencimento. A leitura do par continua a mesma. O produto é outro — e o risco de perda também.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 3",
    title: "Tipos de pares de moedas.",
  },
  {
    kind: "table",
    headers: ["Tipo", "O que é", "Exemplos"],
    rows: [
      ["Principais", "Sempre o USD e outra moeda forte. Mais negociados, mais liquidez.", "EUR/USD, GBP/USD, USD/JPY"],
      ["Secundários / cruzados", "Sem o dólar, mas com moedas fortes.", "EUR/GBP, EUR/JPY, GBP/JPY"],
      ["Exóticos", "Moeda forte com economia emergente. Menos liquidez, mais volatilidade.", "USD/BRL, EUR/TRY"],
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Exótico não é atalho",
    body: "Mais volatilidade não é mais “oportunidade limpa”. Spread, gap e movimento violento quebram conta pequena mais rápido. Liquidez menor cobra caro o clique atrasado.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 4",
    title: "Correlações entre pares.",
    lead: "Correlação é a relação de movimento entre dois pares. Entender isso evita um erro grave: achar que duas entradas são duas ideias, quando são a mesma aposta.",
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Correlação positiva",
        text: "Dois pares tendem a andar na mesma direção. Exemplo clássico: EUR/USD e GBP/USD muitas vezes sobem ou descem juntos. Não é lei. É tendência estatística.",
      },
      {
        num: "02",
        title: "Correlação negativa",
        text: "Dois pares tendem a andar em direções opostas. Exemplo clássico: EUR/USD e USD/CHF costumam ser inversos. Também pode quebrar no dia.",
      },
    ],
  },
  {
    kind: "checklist",
    title: "Por que isso importa na banca",
    items: [
      "Evita abrir posição duplicada sem perceber — duas calls no mesmo movimento.",
      "Mostra a exposição real: dois pares “diferentes” podem ser um risco só.",
      "Ajuda a não chamar de diversificação o que é repetição.",
      "Não previne loss. Previne a ilusão de que você se protegeu.",
    ],
  },
  {
    kind: "quote",
    text: "Operar pares correlacionados sem saber é apostar duas vezes no mesmo resultado.",
    cite: "E-book 13 · Shiver",
  },
  {
    kind: "chapter",
    kicker: "Conclusão",
    title: "Conheça o terreno antes do clique.",
    lead: "Entender pares e correlações é base. Sem isso, você opera no escuro — às vezes duas vezes no escuro.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Conhecer o terreno reduz um tipo de risco: o risco invisível da correlação. Não aumenta garantia de acerto. Não substitui horário, stake e stop.",
      "Não opere sem esse básico. E não trate o básico como talismã. EUR/USD e GBP/USD podem divergir no mesmo candle. Por isso o plano manda, não o “sempre sobe junto”.",
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Fechamento",
    body: "Par, base, cotada, correlação. A ferramenta da Shiver auxilia a leitura. Quem escolhe o par — e quem não duplica o risco — é você.",
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
    body: "Este material tem caráter exclusivamente educacional e não constitui recomendação de investimento nem promessa de retorno. Correlações entre pares não são constantes e não eliminam o risco de perda em opções binárias e câmbio. As decisões e os resultados são de responsabilidade exclusiva do leitor. Opere na conta de treino até o par e a exposição estarem claros no plano.",
  },
];
