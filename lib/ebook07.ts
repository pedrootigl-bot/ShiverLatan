import type { SalaEbookBlock } from "@/lib/salaEbook";

export const EBOOK_07_BODY: SalaEbookBlock[] = [
  {
    kind: "chapter",
    kicker: "Abertura",
    title: "Como evitar golpes e promessas falsas.",
    lead: "Conhecimento para operar com mais segurança. O mercado já é difícil. Quem promete atalho, renda fixa ou certeza absoluta está vendendo outra coisa.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Este guia cobre seis módulos: por que existem golpes, sinais de promessa falsa, o mito da renda fácil, falsos mentores, como se proteger e a mentalidade anti-golpe. Não é manual de enriquecimento. É filtro.",
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Leia antes de começar",
    body: "Opções binárias e day trade envolvem risco elevado de perda. Estudar golpes não elimina o risco de mercado. Este material é educacional: não é recomendação de investimento nem garantia de proteção total. Treine na conta demo.",
  },
  {
    kind: "meta",
    items: [
      { label: "Autor", value: "PH" },
      { label: "Edição", value: "2026 · v1" },
      { label: "Formato", value: "Guia de defesa" },
    ],
  },
  {
    kind: "toc",
    kicker: "Sumário",
    title: "O que você vai aprender",
    items: [
      { num: "01", label: "Por que existem golpes", page: "03" },
      { num: "02", label: "Sinais de promessas falsas", page: "04" },
      { num: "03", label: "O golpe da renda fácil", page: "05" },
      { num: "04", label: "Falsos mentores", page: "06" },
      { num: "05", label: "Como se proteger", page: "07" },
      { num: "06", label: "Mentalidade anti-golpe", page: "08" },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Princípio central",
    body: "Se parece fácil demais, desconfie. Mercado é negócio, não milagre. Informação protege mais do que pressa.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 1",
    title: "Por que existem tantos golpes no mercado.",
    lead: "O terreno é fértil: desejo de ganho imediato, pouca educação financeira e apelo emocional vendem mais do que a realidade do gráfico.",
  },
  {
    kind: "traps",
    heading: "Três condições que o golpista explora",
    items: [
      {
        title: "Busca por dinheiro rápido",
        text: "Quem quer resultado imediato baixa a guarda. Urgência é o isco.",
      },
      {
        title: "Falta de conhecimento",
        text: "Sem base, qualquer print, jargão ou “método secreto” parece credencial.",
      },
      {
        title: "Promessas emocionais",
        text: "Apelo de liberdade, luxo e virada de vida vende mais do que risco, perda e processo.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "danger",
    title: "O que isso significa na prática",
    body: "Golpe não precisa parecer crime óbvio. Muitas vezes vem embalado como mentoria, sinal, grupo VIP ou “renda extra garantida”. O produto é a esperança. O custo é a sua banca — e às vezes bem mais.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 2",
    title: "Sinais claros de promessas falsas.",
    lead: "Não precisa ser perito. Alguns sinais se repetem. Aprenda a nomeá-los antes de depositar.",
  },
  {
    kind: "traps",
    heading: "Bandeira vermelha — saia ou nem entre",
    items: [
      {
        title: "Prints apenas de ganhos",
        text: "Mostrar só vitória esconde a realidade. Perda faz parte do ofício. Recorte seletivo é marketing, não prova.",
      },
      {
        title: "“100% de assertividade”",
        text: "Impossível acertar todas as operações. Essa promessa é matematicamente falsa.",
      },
      {
        title: "“Lucro garantido”",
        text: "Nenhum investimento oferece certeza absoluta de lucro. Quem promete certeza está mentindo ou omitindo o risco.",
      },
      {
        title: "Pressa para depositar",
        text: "Pressão por decisão rápida é tática. Tempo para pensar é seu direito. Oferta que “acaba em 15 minutos” não é oportunidade. É funil.",
      },
      {
        title: "Falta de transparência",
        text: "Sumiço de risco, metodologia, taxa e histórico real é alerta vermelho. Se não dá para perguntar, não dê dinheiro.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "gold",
    title: "Regra simples",
    body: "Quem precisa esconder perda, inventar certeza e empurrar depósito não está te ensinando a operar. Está te vendendo.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 3",
    title: "O golpe da renda fácil.",
    lead: "O mercado financeiro não funciona como salário fixo. Resultado varia. Quem promete valor certo todo mês está descrevendo outra atividade — ou nenhuma.",
  },
  {
    kind: "split",
    doTitle: "O que o mercado de fato é",
    doText: "Negócio com risco, variação e períodos ruins. Renda possível no longo prazo exige estudo, prática e gestão — e ainda assim não é garantida.",
    dontTitle: "O que o golpe vende",
    dontText: "Ganho fixo mensal, “trocar o CLT pelo gráfico” em semanas, valor específico na conta todo dia 5. Isso não existe em trading legítimo.",
  },
  {
    kind: "callout",
    tone: "danger",
    title: "Importante",
    body: "Quem promete ganho fixo mensal está mentindo. O mercado é dinâmico e imprevisível por natureza. Desconfie de oferta que garante valor específico. Em operação real, isso não se sustenta.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 4",
    title: "Falsos mentores e sinais milagrosos.",
    lead: "Luxo na bio não é comprovante de edge. Grupo pago não é atalho. Sinal sem gestão de risco é convite a quebrar a conta.",
  },
  {
    kind: "traps",
    heading: "Quatro disfarces comuns",
    items: [
      {
        title: "Venda de vida perfeita",
        text: "Carro, relógio e resort usados como “prova” de que o método funciona. Lifestyle é anúncio, não extrato.",
      },
      {
        title: "Sem gestão de risco",
        text: "Só ensina entrada. Nunca stop, tamanho de posição ou limite diário. Capital desprotegido é o produto.",
      },
      {
        title: "Incentivo ao all-in",
        text: "Pressão para colocar todo o capital de uma vez. Quem se importa com você pede o contrário: começar pequeno.",
      },
      {
        title: "Grupo pago milagroso",
        text: "Promessa de enriquecimento rápido via sinais. Você paga a mensalidade. O risco, o clique e o prejuízo ficam com você.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "cyan",
    title: "Mentor de verdade ensina o ofício",
    body: "Processo, risco, diário, paciência e conta demo. Não vende certeza. Não empurra depósito. Não precisa de palco de luxo para justificar a aula.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 5",
    title: "Como se proteger.",
    lead: "Defesa não é paranoia. É rotina: estudar antes, treinar sem dinheiro real, recusar exagero e nunca arriscar o que sustenta a sua vida.",
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Estudar antes de investir",
        text: "Dedique tempo aos fundamentos — risco, sessão, setup, psicologia — antes de colocar dinheiro real.",
      },
      {
        num: "02",
        title: "Usar conta demo",
        text: "Pratique com dinheiro virtual até o processo estar no reflexo. Demo não paga conta. Também não quebra a sua.",
      },
      {
        num: "03",
        title: "Desconfiar de exageros",
        text: "Se a oferta parece boa demais para ser verdade, trate como falsa até prova ordinária — e prova ordinária inclui perda, não só print verde.",
      },
      {
        num: "04",
        title: "Escolher ambientes sérios",
        text: "Prefira corretoras com regras claras, suporte e transparência. Desconfie de quem some com o dinheiro, muda de nome ou impede saque.",
      },
      {
        num: "05",
        title: "Investir com responsabilidade",
        text: "Nunca arrisque dinheiro que você não pode perder sem comprometer aluguel, comida, saúde ou família.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Ambiente sério não é garantia de lucro",
    body: "Plataforma confiável reduz risco operacional e de golpe. Não reduz o risco de perder no gráfico. São coisas diferentes. Trate as duas.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 6",
    title: "Mentalidade anti-golpe.",
    lead: "O melhor escudo é o hábito de perguntar. Crítica calma vale mais do que fé no guru.",
  },
  {
    kind: "checklist",
    title: "Princípios de proteção",
    items: [
      "Se parece fácil demais, desconfie. Simplicidade exagerada esconde a complexidade real.",
      "Mercado é negócio, não milagre. Resultado possível vem de trabalho, estudo e gestão — nunca de fórmula mágica.",
      "Disciplina supera atalho. Consistência e método vencem a propaganda de ganho rápido.",
      "Quem se apressa para você depositar não está do seu lado.",
      "Se não puder explicar o risco em uma frase, você não está pronto para clicar.",
    ],
  },
  {
    kind: "quote",
    text: "Informação protege mais do que pressa.",
    cite: "E-book 07 · Shiver",
  },
  {
    kind: "chapter",
    kicker: "Conclusão",
    title: "Não existe dinheiro fácil sustentável.",
    lead: "Ganho consistente — quando acontece — exige conhecimento, prática e gestão de risco. Mesmo assim, perda faz parte. Quem vende o contrário está mentindo.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Decisão informada é defesa. Pressa é o funil do golpe. Estude, treine, recuse certeza absoluta.",
      "Conhecimento não torna ninguém imune. Ele reduz a chance de você ser o alvo fácil. Educação financeira sólida deixa a propaganda mais óbvia — e o clique mais lento.",
      "O mercado não recompensa milagre. Recompensa, no melhor dos casos, quem estuda, pratica e age com disciplina. Ainda assim, sem garantia. Proteja-se pelo processo, não pela fé.",
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Fechamento",
    body: "Desconfie do fácil. Opere o que você entende. A ferramenta da Shiver auxilia a leitura. Quem decide, e quem segura o depósito, é você.",
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
    body: "Este material tem caráter exclusivamente educacional e não constitui recomendação de investimento, consultoria nem promessa de retorno. Reconhecer golpes não elimina o risco de perda em opções binárias e day trade. As decisões e os resultados são de responsabilidade exclusiva do leitor. Nunca utilize recursos que comprometam sua segurança financeira. Opere na conta de treino até o critério estar claro.",
  },
];
