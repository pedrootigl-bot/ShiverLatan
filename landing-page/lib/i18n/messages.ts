import type { Locale } from "@/lib/i18n/locale";

export type NavSection = {
  id: string;
  label: string;
  href: string;
  ariaLabel: string;
};

export type PlanCopy = {
  name: string;
  cadence: string;
  cta: string;
  badge?: string;
  features: string[];
};

export type FaqCopy = {
  question: string;
  answer: string;
};

export type Messages = {
  skip: string;
  cta: string;
  ctaAria: string;
  secondary: string;
  risk: string;
  nav: {
    sectionsLabel: string;
    homeAria: string;
    openMenu: string;
    closeMenu: string;
    sections: NavSection[];
  };
  deck: {
    dots: string;
    start: string;
    next: string;
    top: string;
    scroll: string;
    slides: Record<string, string>;
  };
  splash: {
    aria: string;
    eyebrow: string;
    outline: string;
    lead: string;
    kicker: string;
    axes: [string, string, string];
  };
  intro: {
    eyebrow: string;
    sr: string;
    fill: string;
    outline: string;
    lead: string;
    chips: [{ label: string; value: string }, { label: string; value: string }];
  };
  pillars: {
    eyebrow: string;
    sr: string;
    fill: string;
    outline: string;
    lead: string;
    boardAria: string;
    signals: Array<{ label: string; status: string; hint: string }>;
  };
  how: {
    eyebrow: string;
    sr: string;
    chaos: string;
    clarity: string;
    lead: string;
    chaosPoints: string[];
    clarityPoints: string[];
  };
  tool: {
    eyebrow: string;
    sr: string;
    fill: string;
    outline: string;
    lead: string;
    metrics: Array<{ label: string; value: string }>;
  };
  scenario: {
    eyebrow: string;
    sr: string;
    fill: string;
    outline: string;
    kicker: string;
    boardAria: string;
    example: string;
    legend: string;
    caption: string;
    lead: string;
    note: string;
    out: string;
    axes: Array<{ label: string; value: string; meaning: string }>;
  };
  method: {
    eyebrow: string;
    sr: string;
    fill: string;
    outline: string;
    lead: string;
    principles: Array<{ index: string; title: string; description: string }>;
  };
  plans: {
    eyebrow: string;
    sr: string;
    fill: string;
    outline: string;
    lead: string;
    items: {
      gratis: PlanCopy;
      vip: PlanCopy;
    };
  };
  closer: {
    eyebrow: string;
    sr: string;
    fill: string;
    outline: string;
    lead: string;
    footer: string;
    terms: string;
    privacy: string;
    faq: string;
  };
  faq: FaqCopy[];
  legal: {
    back: string;
    home: string;
    crumb: string;
    updated: (date: string) => string;
    termsTitle: string;
    termsDate: string;
    terms: string[];
    privacyTitle: string;
    privacyDate: string;
    privacy: string[];
  };
  errors: {
    notFoundKicker: string;
    notFoundTitle: string;
    notFoundText: string;
    notFoundCta: string;
    loadKicker: string;
    loadTitle: string;
    loadText: string;
    retry: string;
  };
  sala: {
    railAria: string;
    toolsAria: string;
    homeAria: string;
    closePanel: string;
    chat: string;
    chatLocked: string;
    ruler: string;
    rulerLocked: string;
    books: string;
    booksLocked: string;
    blockedKicker: string;
    blockedTitle: string;
    blockedText: string;
    soonKicker: string;
    soonTitle: string;
    soonText: string;
    understood: string;
    botName: string;
    chatAria: string;
    closeChat: string;
    buy: string;
    sell: string;
    newRead: string;
    expiration: string;
    timeframe: string;
    entry: string;
    minute: string;
    minutes: (amount: number) => string;
    connecting: string;
    online: string;
    reconnecting: string;
    onlySignals: string;
    waiting: string;
    libraryAria: string;
    libraryTitle: string;
    libraryStatus: string;
    libraryOthers: string;
    closeLibrary: string;
    download: string;
    generating: string;
    collapse: string;
    downloadFail: string;
    loadKicker: string;
    loadTitle: string;
    loadOverall: string;
    loadPages: string;
    loadFile: string;
    loadHint: string;
    preparingPdf: string;
    pagePdf: (index: number, total: number) => string;
    generatingPdf: string;
    donePdf: string;
    roomAria: string;
    roomTitle: string;
    roomSubtitle: string;
    opening: string;
    openTab: string;
    authConnect: string;
    authLoginOpen: string;
    authBackToLogin: string;
    authAlreadyDone: string;
    authPopupBlocked: string;
    authChecking: string;
    authUpdated: string;
    authUpdating: string;
    authWaitingClose: string;
    authWaitingAuto: string;
    authCookieHint: string;
    authTryAgain: string;
  };
  language: {
    group: string;
    pt: string;
    es: string;
  };
};

const pt: Messages = {
  skip: "Ir para o conteúdo",
  cta: "Conheça a ferramenta",
  ctaAria:
    "Abrir o traderoom da corretora numa aba nova e entrar na sala. Depois do login, volte a esta aba para carregar os gráficos.",
  secondary: "Como funciona",
  risk: "Negociar envolve risco de perda. A ferramenta auxilia a leitura e não garante resultado.",
  nav: {
    sectionsLabel: "Seções",
    homeAria: "Shiver — início",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    sections: [
      { id: "beneficios", label: "Benefícios", href: "#beneficios", ariaLabel: "Ver benefícios" },
      { id: "como-funciona", label: "Como funciona", href: "#como-funciona", ariaLabel: "Ver como funciona" },
      { id: "ferramenta", label: "Ferramenta", href: "#ferramenta", ariaLabel: "Conhecer a ferramenta" },
      { id: "cenario", label: "Cenário", href: "#cenario", ariaLabel: "Ver leitura em cenário real" },
      { id: "metodo", label: "Método", href: "#metodo", ariaLabel: "Ver o método" },
      { id: "planos", label: "Planos", href: "#planos", ariaLabel: "Ver planos Grátis e VIP" },
      { id: "faq", label: "FAQ", href: "#faq", ariaLabel: "Ver perguntas frequentes" },
    ],
  },
  deck: {
    dots: "Slides da apresentação",
    start: "Início",
    next: "Ir para o próximo slide",
    top: "Voltar ao início",
    scroll: "Scroll",
    slides: {
      inicio: "Mercado",
      beneficios: "Benefícios",
      "como-funciona": "Como funciona",
      ferramenta: "Ferramenta",
      cenario: "Cenário",
      metodo: "Método",
      planos: "Planos",
      faq: "FAQ",
    },
  },
  splash: {
    aria: "Preparando o painel",
    eyebrow: "Ferramenta",
    outline: "clareza",
    lead: "Tendência, momentum e volatilidade no mesmo painel.",
    kicker: "A ferramenta mostra o cenário. Quem opera é você.",
    axes: ["Tendência", "Momentum", "Volatilidade"],
  },
  intro: {
    eyebrow: "Corretora Shiver",
    sr: "Mercado com clareza: tendência, momentum e volatilidade no mesmo painel.",
    fill: "Mercado",
    outline: "Clareza",
    lead: "Tendência, momentum e volatilidade em um só painel. A ferramenta auxilia a hora de compra e venda — quem opera é você.",
    chips: [
      { label: "Tendência", value: "Alta" },
      { label: "Momentum", value: "Forte" },
    ],
  },
  pillars: {
    eyebrow: "Três eixos",
    sr: "Três sinais para o trader: tendência, momentum e volatilidade.",
    fill: "Três",
    outline: "Sinais",
    lead: "Direção, força e amplitude no mesmo lugar — para decidir o momento com mais contexto, sem espalhar o olhar em várias telas.",
    boardAria: "Três sinais. Clique para destacar.",
    signals: [
      {
        label: "Tendência",
        status: "Alta",
        hint: "Direção dominante do cenário — para apoiar o momento de compra ou venda.",
      },
      {
        label: "Momentum",
        status: "Forte",
        hint: "Força do movimento em relação ao recorte recente — contexto para o timing.",
      },
      {
        label: "Volatilidade",
        status: "Moderada",
        hint: "Amplitude das oscilações — contexto, não alarme.",
      },
    ],
  },
  how: {
    eyebrow: "Como funciona",
    sr: "Como a ferramenta da Shiver organiza o timing de compra e venda.",
    chaos: "Caos",
    clarity: "Clareza",
    lead: "Dados brutos viram uma leitura só. A ferramenta organiza o cenário. Quem compra e vende é você.",
    chaosPoints: ["Gráficos desconectados", "Indicadores em conflito", "Decisão no impulso"],
    clarityPoints: ["Leitura integrada", "Sinais objetivos", "Timing com contexto"],
  },
  tool: {
    eyebrow: "A ferramenta",
    sr: "Painel da ferramenta Shiver com tendência, momentum e volatilidade.",
    fill: "Uma",
    outline: "Visão",
    lead: "O painel reúne tendência, momentum e volatilidade para o timing. A ferramenta auxilia; quem opera é você.",
    metrics: [
      { label: "Tendência", value: "Alta" },
      { label: "Momentum", value: "Forte" },
      { label: "Volatilidade", value: "Moderada" },
    ],
  },
  scenario: {
    eyebrow: "Na prática",
    sr: "Entenda o cenário de mercado antes de decidir a compra ou a venda.",
    fill: "Entenda",
    outline: "o cenário",
    kicker: "antes de decidir",
    boardAria: "Exemplo: três leituras do mercado se juntam em uma visão do momento",
    example: "Exemplo",
    legend: "Três leituras do mesmo recorte",
    caption: "Embaixo, o preço. Em cima, o que a ferramenta destaca nesse momento.",
    lead: "A ferramenta mostra três coisas sobre o mercado, no mesmo lugar: para onde o preço está indo, com quanta força, e o quanto ele está oscilando. Assim você vê a situação agora — e decide se opera.",
    note: "Ela não prevê o futuro e não diz o que comprar ou vender. Só organiza o que está acontecendo. Quem decide e quem opera é você.",
    out: "As três leituras juntas: uma visão mais clara do momento. Quem decide é você!",
    axes: [
      { label: "Tendência", value: "Positiva", meaning: "O mercado está subindo" },
      { label: "Momentum", value: "Forte", meaning: "O movimento está firme" },
      { label: "Volatilidade", value: "Moderada", meaning: "O preço sobe e desce sem exagero" },
    ],
  },
  method: {
    eyebrow: "Método",
    sr: "Método da ferramenta Shiver: menos ruído, mais contexto, decisão do trader.",
    fill: "Como",
    outline: "Lemos",
    lead: "O painel descreve o cenário para auxiliar o momento. A decisão, o risco e a ordem continuam sendo seus.",
    principles: [
      {
        index: "01",
        title: "Menos ruído",
        description: "Um painel só, para reduzir a troca de telas na hora de operar.",
      },
      {
        index: "02",
        title: "Mais contexto",
        description: "Sinais juntos para auxiliar a hora de compra e venda — não para substituir o trader.",
      },
      {
        index: "03",
        title: "Decisão sua",
        description: "A ferramenta não opera sozinha. Quem decide e quem opera é você.",
      },
    ],
  },
  plans: {
    eyebrow: "Planos",
    sr: "Planos Grátis e VIP da ferramenta Shiver para traders.",
    fill: "Dois",
    outline: "Acessos",
    lead: "Grátis para entrar no painel. VIP para ler o cenário com mais contexto. Nos dois, a ferramenta auxilia — quem opera é você.",
    items: {
      gratis: {
        name: "Grátis",
        cadence: "para começar",
        cta: "Começar grátis",
        features: [
          "Painel com tendência, momentum e volatilidade",
          "Auxílio no timing de compra e venda",
          "Insights do que o painel está lendo",
          "Sem robô: quem opera é você",
        ],
      },
      vip: {
        name: "VIP",
        cadence: "acesso completo",
        cta: "Quero o VIP",
        badge: "Popular",
        features: [
          "Tudo do plano Grátis",
          "Leitura mais profunda do mesmo cenário",
          "Mais contexto na hora de decidir",
          "Recortes extras do momento de mercado",
          "Prioridade quando novos recursos abrirem",
        ],
      },
    },
  },
  closer: {
    eyebrow: "Começar",
    sr: "Perguntas frequentes sobre a corretora Shiver e a ferramenta para traders.",
    fill: "À frente",
    outline: "do mercado",
    lead: "Ferramenta da corretora Shiver para auxiliar o timing — sem robô e sem promessa de resultado. Quem opera é você.",
    footer: "A ferramenta auxilia o trader.",
    terms: "Termos",
    privacy: "Privacidade",
    faq: "FAQ",
  },
  faq: [
    {
      question: "O que é a Shiver?",
      answer:
        "Shiver é a corretora. Esta página apresenta a ferramenta que auxilia o trader na hora de compra e venda, com tendência, momentum e volatilidade no mesmo painel.",
    },
    {
      question: "A ferramenta opera sozinha?",
      answer: "Não. Ela não é robô e não dispara ordens. Auxilia a sua leitura; quem decide e quem opera é você.",
    },
    {
      question: "De onde vêm os dados?",
      answer: "A prévia desta landing usa números ilustrativos. No produto, as fontes serão documentadas na interface.",
    },
    {
      question: "A inteligência artificial opera por mim?",
      answer:
        "Não. Os insights descrevem o que o painel está lendo. Não são ordem automática nem garantia de resultado.",
    },
    {
      question: "Quanto vai custar?",
      answer:
        "Há o plano Grátis, para começar no painel, e o VIP, com leitura mais completa do cenário. O valor do VIP ainda não foi definido. Conhecer a prévia não gera cobrança.",
    },
    {
      question: "Quando estará disponível?",
      answer: "Ainda não há data. Mais informações sobre acesso serão divulgadas nesta página.",
    },
  ],
  legal: {
    back: "Voltar ao início",
    home: "Início",
    crumb: "Navegação estrutural",
    updated: (date) => `Atualizado em ${date}.`,
    termsTitle: "Termos de uso",
    termsDate: "24 de agosto de 2026",
    terms: [
      "A Shiver é uma corretora. Estes termos descrevem o uso desta landing e da ferramenta apresentada aqui: um painel que auxilia o trader na hora de compra e venda.",
      "A ferramenta não opera sozinha, não dispara ordens e não substitui o trader. Quem decide e quem opera é você. A prévia não promete resultado financeiro nem timing perfeito.",
      "Os painéis, preços e indicadores exibidos nesta página são prévias ilustrativas para apresentar o produto. Não constituem recomendação automática de compra ou venda.",
      "Quando o acesso à conta e à ferramenta estiver liberado, valerão também os termos da operação na Shiver, publicados pela corretora. Podemos atualizar este texto quando o produto avançar. O uso continuado da página após a publicação implica ciência da versão vigente.",
    ],
    privacyTitle: "Privacidade",
    privacyDate: "24 de agosto de 2026",
    privacy: [
      "Tratamos dados com o mínimo necessário para apresentar a corretora Shiver e a ferramenta de auxílio ao trader nesta landing.",
      "Esta versão da landing não coleta e-mail e não usa armazenamento local para lembrar visitas. Não vendemos dados e não usamos informações de visita para garantir lucro nem para oferecer operação automática.",
      "Quando o acesso à conta e à ferramenta abrir, atualizaremos esta página com finalidade, destino e prazo de retenção de qualquer dado que passarmos a tratar.",
    ],
  },
  errors: {
    notFoundKicker: "404",
    notFoundTitle: "Página não encontrada",
    notFoundText: "Esse endereço não existe nesta landing. Volte ao início para conhecer a ferramenta da Shiver.",
    notFoundCta: "Ir ao início",
    loadKicker: "Erro",
    loadTitle: "Não foi possível carregar",
    loadText: "Recarregue a página. Se o problema continuar, volte ao início.",
    retry: "Tentar de novo",
  },
  sala: {
    railAria: "Navegação da sala",
    toolsAria: "Ferramentas da sala",
    homeAria: "Shiver — início",
    closePanel: "Fechar painel",
    chat: "IA — Sala de Sinais",
    chatLocked: "IA — Sala de Sinais, bloqueada. Faça login.",
    ruler: "Métricas",
    rulerLocked: "Métricas, bloqueada. Faça login.",
    books: "E-books",
    booksLocked: "E-books, bloqueados. Faça login.",
    blockedKicker: "Bloqueado",
    blockedTitle: "Faça login na plataforma",
    blockedText: "Entre pelo traderoom para liberar o menu. Enquanto isso, cada item permanece com cadeado.",
    soonKicker: "Em breve",
    soonTitle: "Ferramenta em atualização",
    soonText: "Com novas atualizações essa ferramenta estará disponível.",
    understood: "Entendi",
    botName: "Assistente Shiver",
    chatAria: "Disparos do assistente",
    closeChat: "Fechar chat",
    buy: "Compra",
    sell: "Venda",
    newRead: "Nova leitura",
    expiration: "Expiração",
    timeframe: "Tempo",
    entry: "Entrada",
    minute: "1 minuto",
    minutes: (amount) => `${amount} minutos`,
    connecting: "Conectando ao assistente...",
    online: "Assistente online",
    reconnecting: "Reconectando ao assistente...",
    onlySignals: " · só disparos",
    waiting: "Aguardando uma nova leitura de mercado...",
    libraryAria: "Biblioteca de e-books",
    libraryTitle: "Biblioteca",
    libraryStatus: "E-books · leitura na sala",
    libraryOthers: "Outros e-books",
    closeLibrary: "Fechar biblioteca",
    download: "Baixar e-book",
    generating: "Gerando PDF…",
    collapse: "Recolher",
    downloadFail: "Não foi possível gerar o PDF. Tente de novo.",
    loadKicker: "Download",
    loadTitle: "Gerando o e-book",
    loadOverall: "Progresso geral",
    loadPages: "Montagem das páginas",
    loadFile: "Arquivo PDF",
    loadHint: "O modal fecha sozinho quando o download terminar.",
    preparingPdf: "Preparando o e-book…",
    pagePdf: (index, total) => `Montando páginas · ${index} de ${total}`,
    generatingPdf: "Gerando o arquivo PDF…",
    donePdf: "Download concluído",
    roomAria: "Sala de operação da corretora",
    roomTitle: "Traderoom Shiver",
    roomSubtitle: "Ambiente da corretora · quem opera é você",
    opening: "Abrindo a sala da corretora…",
    openTab: "Se não carregar, abra em nova aba",
    authConnect: "Conectar conta",
    authLoginOpen: "Login aberto",
    authBackToLogin: "Voltar para o login",
    authAlreadyDone: "Já fiz login",
    authPopupBlocked:
      "Seu navegador bloqueou a janela de login. Permita pop-ups para continuar.",
    authChecking: "Verificando sua sessão…",
    authUpdated: "Plataforma atualizada.",
    authUpdating: "Atualizando plataforma…",
    authWaitingClose:
      "Depois de entrar na Shiver, volte para esta aba ou clique em Já fiz login.",
    authWaitingAuto:
      "Faça login na janela da corretora. Ao concluir, validamos e fechamos o popup automaticamente.",
    authCookieHint:
      "Seu navegador pode estar bloqueando os cookies necessários para manter a sessão da corretora dentro da plataforma.",
    authTryAgain: "Tentar novamente",
  },
  language: {
    group: "Idioma do site",
    pt: "Português",
    es: "Español",
  },
};

const es: Messages = {
  skip: "Ir al contenido",
  cta: "Conoce la herramienta",
  ctaAria:
    "Abrir el traderoom del bróker en una pestaña nueva y entrar a la sala. Después del login, vuelve a esta pestaña para cargar los gráficos.",
  secondary: "Cómo funciona",
  risk: "Operar implica riesgo de pérdida. La herramienta ayuda a la lectura y no garantiza resultados.",
  nav: {
    sectionsLabel: "Secciones",
    homeAria: "Shiver — inicio",
    openMenu: "Abrir menú",
    closeMenu: "Cerrar menú",
    sections: [
      { id: "beneficios", label: "Beneficios", href: "#beneficios", ariaLabel: "Ver beneficios" },
      { id: "como-funciona", label: "Cómo funciona", href: "#como-funciona", ariaLabel: "Ver cómo funciona" },
      { id: "ferramenta", label: "Herramienta", href: "#ferramenta", ariaLabel: "Conocer la herramienta" },
      { id: "cenario", label: "Escenario", href: "#cenario", ariaLabel: "Ver lectura en un escenario real" },
      { id: "metodo", label: "Método", href: "#metodo", ariaLabel: "Ver el método" },
      { id: "planos", label: "Planes", href: "#planos", ariaLabel: "Ver planes Gratis y VIP" },
      { id: "faq", label: "FAQ", href: "#faq", ariaLabel: "Ver preguntas frecuentes" },
    ],
  },
  deck: {
    dots: "Diapositivas de la presentación",
    start: "Inicio",
    next: "Ir a la siguiente diapositiva",
    top: "Volver al inicio",
    scroll: "Scroll",
    slides: {
      inicio: "Mercado",
      beneficios: "Beneficios",
      "como-funciona": "Cómo funciona",
      ferramenta: "Herramienta",
      cenario: "Escenario",
      metodo: "Método",
      planos: "Planes",
      faq: "FAQ",
    },
  },
  splash: {
    aria: "Preparando el panel",
    eyebrow: "Herramienta",
    outline: "claridad",
    lead: "Tendencia, momentum y volatilidad en el mismo panel.",
    kicker: "La herramienta muestra el escenario. Quien opera eres tú.",
    axes: ["Tendencia", "Momentum", "Volatilidad"],
  },
  intro: {
    eyebrow: "Bróker Shiver",
    sr: "Mercado con claridad: tendencia, momentum y volatilidad en el mismo panel.",
    fill: "Mercado",
    outline: "Claridad",
    lead: "Tendencia, momentum y volatilidad en un solo panel. La herramienta ayuda en el momento de compra y venta — quien opera eres tú.",
    chips: [
      { label: "Tendencia", value: "Alta" },
      { label: "Momentum", value: "Fuerte" },
    ],
  },
  pillars: {
    eyebrow: "Tres ejes",
    sr: "Tres señales para el trader: tendencia, momentum y volatilidad.",
    fill: "Tres",
    outline: "Señales",
    lead: "Dirección, fuerza y amplitud en el mismo lugar — para decidir el momento con más contexto, sin dispersar la mirada en varias pantallas.",
    boardAria: "Tres señales. Haz clic para destacar.",
    signals: [
      {
        label: "Tendencia",
        status: "Alta",
        hint: "Dirección dominante del escenario — para apoyar el momento de compra o venta.",
      },
      {
        label: "Momentum",
        status: "Fuerte",
        hint: "Fuerza del movimiento respecto al recorte reciente — contexto para el timing.",
      },
      {
        label: "Volatilidad",
        status: "Moderada",
        hint: "Amplitud de las oscilaciones — contexto, no alarma.",
      },
    ],
  },
  how: {
    eyebrow: "Cómo funciona",
    sr: "Cómo la herramienta de Shiver organiza el timing de compra y venta.",
    chaos: "Caos",
    clarity: "Claridad",
    lead: "Los datos brutos se convierten en una sola lectura. La herramienta organiza el escenario. Quien compra y vende eres tú.",
    chaosPoints: ["Gráficos desconectados", "Indicadores en conflicto", "Decisión por impulso"],
    clarityPoints: ["Lectura integrada", "Señales objetivas", "Timing con contexto"],
  },
  tool: {
    eyebrow: "La herramienta",
    sr: "Panel de la herramienta Shiver con tendencia, momentum y volatilidad.",
    fill: "Una",
    outline: "Visión",
    lead: "El panel reúne tendencia, momentum y volatilidad para el timing. La herramienta ayuda; quien opera eres tú.",
    metrics: [
      { label: "Tendencia", value: "Alta" },
      { label: "Momentum", value: "Fuerte" },
      { label: "Volatilidad", value: "Moderada" },
    ],
  },
  scenario: {
    eyebrow: "En la práctica",
    sr: "Entiende el escenario de mercado antes de decidir la compra o la venta.",
    fill: "Entiende",
    outline: "el escenario",
    kicker: "antes de decidir",
    boardAria: "Ejemplo: tres lecturas del mercado se unen en una visión del momento",
    example: "Ejemplo",
    legend: "Tres lecturas del mismo recorte",
    caption: "Abajo, el precio. Arriba, lo que la herramienta destaca en este momento.",
    lead: "La herramienta muestra tres cosas sobre el mercado, en el mismo lugar: hacia dónde va el precio, con cuánta fuerza, y cuánto está oscilando. Así ves la situación ahora — y decides si operas.",
    note: "No predice el futuro ni dice qué comprar o vender. Solo organiza lo que está ocurriendo. Quien decide y quien opera eres tú.",
    out: "Las tres lecturas juntas: una visión más clara del momento. ¡Quien decide eres tú!",
    axes: [
      { label: "Tendencia", value: "Positiva", meaning: "El mercado está subiendo" },
      { label: "Momentum", value: "Fuerte", meaning: "El movimiento está firme" },
      { label: "Volatilidad", value: "Moderada", meaning: "El precio sube y baja sin exceso" },
    ],
  },
  method: {
    eyebrow: "Método",
    sr: "Método de la herramienta Shiver: menos ruido, más contexto, decisión del trader.",
    fill: "Cómo",
    outline: "Leemos",
    lead: "El panel describe el escenario para ayudar en el momento. La decisión, el riesgo y la orden siguen siendo tuyos.",
    principles: [
      {
        index: "01",
        title: "Menos ruido",
        description: "Un solo panel, para reducir el cambio de pantallas a la hora de operar.",
      },
      {
        index: "02",
        title: "Más contexto",
        description: "Señales juntas para ayudar en el momento de compra y venta — no para sustituir al trader.",
      },
      {
        index: "03",
        title: "Tu decisión",
        description: "La herramienta no opera sola. Quien decide y quien opera eres tú.",
      },
    ],
  },
  plans: {
    eyebrow: "Planes",
    sr: "Planes Gratis y VIP de la herramienta Shiver para traders.",
    fill: "Dos",
    outline: "Accesos",
    lead: "Gratis para entrar al panel. VIP para leer el escenario con más contexto. En ambos, la herramienta ayuda — quien opera eres tú.",
    items: {
      gratis: {
        name: "Gratis",
        cadence: "para empezar",
        cta: "Empezar gratis",
        features: [
          "Panel con tendencia, momentum y volatilidad",
          "Ayuda en el timing de compra y venta",
          "Insights de lo que el panel está leyendo",
          "Sin robot: quien opera eres tú",
        ],
      },
      vip: {
        name: "VIP",
        cadence: "acceso completo",
        cta: "Quiero el VIP",
        badge: "Popular",
        features: [
          "Todo del plan Gratis",
          "Lectura más profunda del mismo escenario",
          "Más contexto a la hora de decidir",
          "Recortes extra del momento de mercado",
          "Prioridad cuando se abran nuevas funciones",
        ],
      },
    },
  },
  closer: {
    eyebrow: "Empezar",
    sr: "Preguntas frecuentes sobre el bróker Shiver y la herramienta para traders.",
    fill: "Por delante",
    outline: "del mercado",
    lead: "Herramienta del bróker Shiver para ayudar en el timing — sin robot y sin promesa de resultado. Quien opera eres tú.",
    footer: "La herramienta ayuda al trader.",
    terms: "Términos",
    privacy: "Privacidad",
    faq: "FAQ",
  },
  faq: [
    {
      question: "¿Qué es Shiver?",
      answer:
        "Shiver es el bróker. Esta página presenta la herramienta que ayuda al trader en el momento de compra y venta, con tendencia, momentum y volatilidad en el mismo panel.",
    },
    {
      question: "¿La herramienta opera sola?",
      answer: "No. No es un robot y no dispara órdenes. Ayuda a tu lectura; quien decide y quien opera eres tú.",
    },
    {
      question: "¿De dónde salen los datos?",
      answer: "La previa de esta landing usa números ilustrativos. En el producto, las fuentes se documentarán en la interfaz.",
    },
    {
      question: "¿La inteligencia artificial opera por mí?",
      answer:
        "No. Los insights describen lo que el panel está leyendo. No son una orden automática ni una garantía de resultado.",
    },
    {
      question: "¿Cuánto va a costar?",
      answer:
        "Hay el plan Gratis, para empezar en el panel, y el VIP, con una lectura más completa del escenario. El valor del VIP aún no está definido. Conocer la previa no genera cobro.",
    },
    {
      question: "¿Cuándo estará disponible?",
      answer: "Todavía no hay fecha. Más información sobre el acceso se publicará en esta página.",
    },
  ],
  legal: {
    back: "Volver al inicio",
    home: "Inicio",
    crumb: "Navegación estructural",
    updated: (date) => `Actualizado el ${date}.`,
    termsTitle: "Términos de uso",
    termsDate: "24 de agosto de 2026",
    terms: [
      "Shiver es un bróker. Estos términos describen el uso de esta landing y de la herramienta presentada aquí: un panel que ayuda al trader en el momento de compra y venta.",
      "La herramienta no opera sola, no dispara órdenes y no sustituye al trader. Quien decide y quien opera eres tú. La previa no promete resultado financiero ni un timing perfecto.",
      "Los paneles, precios e indicadores de esta página son previas ilustrativas para presentar el producto. No constituyen recomendación automática de compra o venta.",
      "Cuando se libere el acceso a la cuenta y a la herramienta, también valdrán los términos de la operación en Shiver, publicados por el bróker. Podemos actualizar este texto cuando el producto avance. El uso continuado de la página tras la publicación implica conocimiento de la versión vigente.",
    ],
    privacyTitle: "Privacidad",
    privacyDate: "24 de agosto de 2026",
    privacy: [
      "Tratamos datos con el mínimo necesario para presentar el bróker Shiver y la herramienta de ayuda al trader en esta landing.",
      "Esta versión de la landing no recoge e-mail y no usa almacenamiento local para recordar visitas. No vendemos datos y no usamos información de visita para garantizar lucro ni para ofrecer operación automática.",
      "Cuando se abra el acceso a la cuenta y a la herramienta, actualizaremos esta página con finalidad, destino y plazo de retención de cualquier dato que pasemos a tratar.",
    ],
  },
  errors: {
    notFoundKicker: "404",
    notFoundTitle: "Página no encontrada",
    notFoundText: "Esa dirección no existe en esta landing. Vuelve al inicio para conocer la herramienta de Shiver.",
    notFoundCta: "Ir al inicio",
    loadKicker: "Error",
    loadTitle: "No se pudo cargar",
    loadText: "Recarga la página. Si el problema continúa, vuelve al inicio.",
    retry: "Intentar de nuevo",
  },
  sala: {
    railAria: "Navegación de la sala",
    toolsAria: "Herramientas de la sala",
    homeAria: "Shiver — inicio",
    closePanel: "Cerrar panel",
    chat: "IA — Sala de señales",
    chatLocked: "IA — Sala de señales, bloqueada. Inicia sesión.",
    ruler: "Métricas",
    rulerLocked: "Métricas, bloqueada. Inicia sesión.",
    books: "E-books",
    booksLocked: "E-books, bloqueados. Inicia sesión.",
    blockedKicker: "Bloqueado",
    blockedTitle: "Inicia sesión en la plataforma",
    blockedText: "Entra por el traderoom para liberar el menú. Mientras tanto, cada ítem permanece con candado.",
    soonKicker: "Próximamente",
    soonTitle: "Herramienta en actualización",
    soonText: "Con nuevas actualizaciones esta herramienta estará disponible.",
    understood: "Entendido",
    botName: "Asistente Shiver",
    chatAria: "Disparos del asistente",
    closeChat: "Cerrar chat",
    buy: "Compra",
    sell: "Venta",
    newRead: "Nueva lectura",
    expiration: "Expiración",
    timeframe: "Tiempo",
    entry: "Entrada",
    minute: "1 minuto",
    minutes: (amount) => `${amount} minutos`,
    connecting: "Conectando al asistente...",
    online: "Asistente en línea",
    reconnecting: "Reconectando al asistente...",
    onlySignals: " · solo disparos",
    waiting: "Esperando una nueva lectura de mercado...",
    libraryAria: "Biblioteca de e-books",
    libraryTitle: "Biblioteca",
    libraryStatus: "E-books · lectura en la sala",
    libraryOthers: "Otros e-books",
    closeLibrary: "Cerrar biblioteca",
    download: "Descargar e-book",
    generating: "Generando PDF…",
    collapse: "Recoger",
    downloadFail: "No se pudo generar el PDF. Inténtalo de nuevo.",
    loadKicker: "Descarga",
    loadTitle: "Generando el e-book",
    loadOverall: "Progreso general",
    loadPages: "Montaje de las páginas",
    loadFile: "Archivo PDF",
    loadHint: "El modal se cierra solo cuando termine la descarga.",
    preparingPdf: "Preparando el e-book…",
    pagePdf: (index, total) => `Montando páginas · ${index} de ${total}`,
    generatingPdf: "Generando el archivo PDF…",
    donePdf: "Descarga concluida",
    roomAria: "Sala de operación del bróker",
    roomTitle: "Traderoom Shiver",
    roomSubtitle: "Entorno del bróker · quien opera eres tú",
    opening: "Abriendo la sala del bróker…",
    openTab: "Si no carga, ábrelo en una pestaña nueva",
    authConnect: "Conectar cuenta",
    authLoginOpen: "Login abierto",
    authBackToLogin: "Volver al login",
    authAlreadyDone: "Ya inicié sesión",
    authPopupBlocked:
      "Tu navegador bloqueó la ventana de login. Permite pop-ups para continuar.",
    authChecking: "Verificando tu sesión…",
    authUpdated: "Plataforma actualizada.",
    authUpdating: "Actualizando plataforma…",
    authWaitingClose:
      "Después de entrar en Shiver, vuelve a esta pestaña o pulsa Ya inicié sesión.",
    authWaitingAuto:
      "Inicia sesión en la ventana de la corretora. Al terminar, validamos y cerramos el popup automáticamente.",
    authCookieHint:
      "Tu navegador puede estar bloqueando las cookies necesarias para mantener la sesión del bróker dentro de la plataforma.",
    authTryAgain: "Intentar de nuevo",
  },
  language: {
    group: "Idioma del sitio",
    pt: "Portugués",
    es: "Español",
  },
};

export const messages: Record<Locale, Messages> = { pt, es };
