import type { SalaEbookBlock } from "@/lib/salaEbook";

export const EBOOK_01_BODY: SalaEbookBlock[] = [
  {
    kind: "chapter",
    kicker: "Sobre este material",
    title: "Menos pressa, mais leitura.",
  },
  {
    kind: "prose",
    paragraphs: [
      'Este ebook ensina a operar o gráfico de 5 minutos com base em probabilidade, tendência e suporte/resistência. O "100%" do título quer dizer operar 100% por regras e 100% baseado em probabilidade, não acertar 100% das entradas. Ninguém acerta.',
      "O M5 nasceu pra quem está começando e ainda se atrapalha na velocidade do M1. Cada vela leva cinco minutos pra fechar, então você tem tempo de pensar antes de clicar. Mesma vantagem estatística, com o dedo mais calmo no gatilho.",
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Leia antes de começar",
    body: "Opções binárias e day trade de curto prazo envolvem risco elevado de perda do capital. Treine na conta demo até o setup virar reflexo. Só leve pra conta real o que você pode perder sem afetar sua vida. O aviso completo está na penúltima página.",
  },
  {
    kind: "meta",
    items: [
      { label: "Autor", value: "PH" },
      { label: "Edição", value: "2026 · v1" },
      { label: "Formato", value: "Guia de método" },
    ],
  },
  {
    kind: "toc",
    kicker: "Sumário",
    title: "O que você vai dominar",
    items: [
      { num: "01", label: 'A verdade sobre o "100%"', page: "04" },
      { num: "02", label: "Probabilidade e expectativa matemática", page: "05" },
      { num: "03", label: "Por que o M5 é melhor pra iniciante", page: "07" },
      { num: "04", label: "O setup: tendência + S/R + confirmação", page: "09" },
      { num: "05", label: "As regras de entrada (checklist de 6)", page: "11" },
      { num: "06", label: "Gestão de banca e o mito do martingale", page: "12" },
      { num: "07", label: "A rotina de operação em M5", page: "13" },
      { num: "08", label: "Os erros que zeram a conta", page: "14" },
      { num: "09", label: "Seu plano de 30 dias", page: "15" },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Princípio central",
    body: "No M5 você não precisa ser rápido, precisa ser certo. Menos entradas, mais confirmação, cada clique defendido por regras. O lucro é a soma paciente, não a aposta apressada.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 01 — Fundamento",
    title: 'A verdade sobre o "100%".',
    lead: 'Quem promete "100% de acerto" está te vendendo um conto. A boa notícia é que você não precisa disso. Precisa de uma vantagem pequena, repetida com paciência, e o M5 foi feito pra te dar exatamente esse tempo de paciência.',
  },
  {
    kind: "prose",
    kicker: "Cap 01 · O que \"100%\" significa de verdade",
    heading: "Cem por cento por regras, não por sorte.",
    paragraphs: [
      "Deixa eu ser direto com você, do jeito que gostaria que alguém tivesse sido comigo. Nenhum método, sinal ou robô acerta todas. Nenhum. Quem jura que acerta, ou está mentindo pra te vender curso, ou nunca operou dinheiro de verdade por tempo suficiente pra tomar a sequência de perdas que sempre vem.",
      'O "100%" deste ebook é outra coisa, e é uma coisa que você consegue sustentar todo dia:',
      "100% por regras. Toda entrada obedece um checklist. Se um item falha, não entra. Zero achismo.",
      "100% baseado em probabilidade. Você só aperta o gatilho quando a estatística está a seu favor.",
      "100% sistemático. Mesmo setup, mesmo tamanho, mesma rotina. O robô é você, disciplinado.",
      'E o "nunca perde" que você vê por aí? Traduza sempre assim: você nunca perde o controle e nunca perde a disciplina. Perder uma operação vai acontecer, é normal, está na conta. Perder a cabeça depois de perder uma operação é o que quebra a banca.',
      "Põe número nisso, pra parar de assustar. Um método que acerta 58 de cada 100 entradas ainda erra 42. E, dentro dessas 42, é estatisticamente esperado ver 4, 5, até 6 perdas em sequência em algum momento do mês. Isso não é o método quebrando: é o método funcionando como a matemática prevê. Quem não sabe disso surta na terceira perda seguida e joga o plano fora justo antes da virada. Quem sabe, respira e segue o checklist na entrada 61.",
    ],
  },
  {
    kind: "callout",
    tone: "gold",
    title: "A virada de chave",
    body: 'Pare de perguntar "esse candle vai subir?". Comece a perguntar "as minhas regras mandam entrar agora?". A primeira pergunta é adivinhação. A segunda é um método. Este ebook só responde a segunda.',
  },
  {
    kind: "chapter",
    kicker: "Capítulo 02 — Probabilidade e expectativa matemática",
    title: "Probabilidade vence previsão.",
    lead: "Um cassino não sabe se você vai ganhar na próxima rodada. E ele não precisa saber. Ele sabe que, na média de milhares de rodadas, a matemática está a favor dele. O seu trabalho no M5 é ser a casa: operar só quando a vantagem estatística estiver do seu lado e deixar a repetição trabalhar.",
  },
  {
    kind: "prose",
    paragraphs: [
      "A conta que decide tudo se chama expectativa matemática. Ela responde a única pergunta que importa: se eu repetir esta operação 1.000 vezes, eu termino no positivo?",
    ],
  },
  {
    kind: "formula",
    title: "A fórmula",
    formula: "Expectativa = (acerto × payout) − (erro × 1)",
    note: "Com payout de 87%, cada acerto paga 0,87 e cada erro custa 1,00 da sua entrada.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Repare no desequilíbrio: você ganha menos do que perde por operação. Por isso o ponto de equilíbrio (break even) não é 50%. Você precisa acertar mais do que isso só pra empatar. Veja os números:",
    ],
  },
  {
    kind: "stats",
    items: [
      { value: "53,5%", label: "Acerto de equilíbrio (payout 87%)" },
      { value: "58%", label: "Meta realista de um método M5" },
      { value: "+8,5%", label: "Expectativa por entrada a 58%" },
    ],
  },
  {
    kind: "prose",
    paragraphs: [
      "Parece pouco? Não é. Um método que entrega 58% de acerto com payout de 87% rende cerca de 8,5 centavos de lucro para cada real arriscado, na média. O M5 costuma bater um acerto um pouco maior que o M1 justo porque tem menos ruído e mais confirmação. Menos entradas, porém de qualidade melhor.",
      "Traduz isso pra um dia real. Você faz 10 entradas de R$ 20 com esse método. Na média, acerta 6 e erra 4. Os 6 acertos pagam 6 × R$ 17,40 = R$ 104,40. As 4 perdas tiram 4 × R$ 20 = R$ 80,00. Sobra +R$ 24,40 no dia sobre R$ 200 girados. Não é o print de Ferrari que vendem no Instagram, é o resultado chato e repetível de quem trata isto como negócio. Repita 20 pregões assim no mês e a conta fala sozinha.",
    ],
  },
  {
    kind: "callout",
    tone: "cyan",
    title: "Leitura honesta do número",
    body: "Essa conta é a média, não a promessa de todo dia. Vão existir dias de +3 e dias de -2. A expectativa positiva só aparece na soma de muitos dias, com tamanho fixo e o mesmo setup. Mudou o tamanho no calor da emoção, quebrou a matemática que estava trabalhando pra você.",
  },
  {
    kind: "prose",
    kicker: "Cap 02 · Visualizando a vantagem",
    heading: "Onde nasce o lucro.",
    paragraphs: [
      "O gráfico abaixo mostra a expectativa por entrada conforme sua taxa de acerto sobe, com payout de 87%. Abaixo da linha de equilíbrio, você paga pra operar. Acima dela, o mercado paga você. O objetivo do método inteiro é te manter, com folga, do lado direito.",
    ],
  },
  {
    kind: "figure",
    id: "expectancy",
    caption: "Fig 01 — Expectativa por entrada × taxa de acerto (payout 87%).",
  },
  {
    kind: "callout",
    tone: "gold",
    title: "Leitura de ouro",
    body: 'Poucos pontos percentuais de acerto acima do equilíbrio mudam tudo. Por isso o foco do método não é "acertar mais", é filtrar melhor: no M5 você tem tempo de sobra pra esperar só as entradas óbvias e ignorar o resto sem dó.',
  },
  {
    kind: "chapter",
    kicker: "Capítulo 03 — Por que M5 pra começar",
    title: "Menos ruído, mais tempo, menos erro.",
    lead: "O M1 é um carro de corrida: rápido e implacável com o iniciante. Cada vela fecha em 60 segundos e você precisa decidir na hora, sob pressão. O M5 é o mesmo motor, só que você tem cinco minutos por vela pra respirar, ler o contexto e conferir o checklist antes de agir.",
  },
  {
    kind: "table",
    headers: ["Aspecto", "M1 (1 minuto)", "M5 (5 minutos)"],
    rows: [
      ["Tempo pra decidir", "60 segundos", "5 minutos"],
      ["Ruído no gráfico", "Alto", "Menor, mais limpo"],
      ["Sinais falsos", "Frequentes", "Bem menos"],
      ["Entradas por hora", "Muitas", "Poucas, selecionadas"],
      ["Pressão emocional", "Intensa", "Administrável"],
      ["Ideal para", "Quem já tem reflexo", "Quem está começando"],
    ],
  },
  {
    kind: "prose",
    paragraphs: [
      "Cada vela de M5 é feita de cinco velas de M1. Isso significa que os pequenos trancos e mentiras de curtíssimo prazo se diluem dentro de uma vela só. O que sobra é um sinal mais honesto sobre pra onde o preço está indo de verdade. Menos armadilha pra sua leitura ainda em treino.",
    ],
  },
  {
    kind: "callout",
    tone: "cyan",
    title: "Recomendação do PH",
    body: "Se você ainda erra de nervoso no M1, comece pelo M5. Domine a leitura aqui, com calma, e o M1 fica muito mais fácil depois. Começar pelo M5 não é ser mais fraco: é ser mais esperto com a sua curva de aprendizado.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 04 — O setup",
    title: "Tendência, suporte/resistência e confirmação.",
    lead: "O setup do M5 tem três filtros que precisam concordar. Tendência te diz o lado certo de operar. Suporte/resistência te diz o ponto onde o preço tende a virar. Confirmação é a vela que prova que a virada aconteceu. Sem os três, não há entrada.",
  },
  {
    kind: "figure",
    id: "setup",
    caption: "Fig 02 — Tendência de alta, recuo ao suporte e vela de confirmação no M5.",
  },
  {
    kind: "prose",
    paragraphs: [
      "No exemplo: a tendência está de alta (velas azuis acima da média), o preço recua e testa o suporte sem perder ele, deixa um pavio de rejeição e volta com uma vela de força. Essa vela é a sua confirmação. Você entra de compra na abertura da vela seguinte.",
    ],
  },
  {
    kind: "prose",
    kicker: "Cap 04 · A confirmação",
    heading: "Como saber que a virada é de verdade.",
    paragraphs: [
      'Suporte e resistência são zonas onde o preço costuma parar e voltar. Mas nem todo teste segura, e entrar antes da confirmação é apostar em fé. A confirmação é o que transforma "acho que vai virar" em "as regras mandam entrar". Três sinais cobrem quase tudo no M5:',
    ],
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Vela de força a favor",
        text: "Depois de testar o suporte (ou a resistência), o preço devolve com um corpo grande na direção da tendência e pavio curto do lado oposto. O lado dominante retomou o controle.",
      },
      {
        num: "02",
        title: "Rejeição com pavio longo (pin)",
        text: "A vela encosta na zona, é empurrada de volta e fecha deixando um pavio longo apontando pra dentro dela. O mercado testou preço mais barato (ou mais caro) e recusou.",
      },
      {
        num: "03",
        title: "Engolfo na zona",
        text: "Uma vela a favor engole por completo o corpo da vela contrária anterior, bem em cima do suporte/resistência. Reversão de força clara, um dos sinais mais confiáveis do M5.",
      },
    ],
  },
  {
    kind: "traps",
    heading: "E saber o que não é confirmação vale tanto quanto saber o que é. Fuja destas três armadilhas que imitam um sinal bom e não são:",
    items: [
      {
        title: "Vela de força fraca",
        text: "Corpo pequeno e pavio grande dos dois lados. Isso é briga, não decisão. Espere um corpo que domine claramente a vela.",
      },
      {
        title: "Confirmação longe da zona",
        text: "A vela de força apareceu no meio do caminho, sem suporte ou resistência por perto. Sem zona, o sinal perde metade do valor.",
      },
      {
        title: "Contra a tendência",
        text: "Engolfo lindo, mas apontando contra a média. Você estaria remando contra a maré. No M5, tendência manda: não brigue com ela por um padrão bonito.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Regra inegociável",
    body: "A entrada é sempre na abertura da vela seguinte à confirmação, com expiração de 1 vela (5 minutos). Nunca entre no meio de uma vela de 5 minutos por ansiedade: espere ela fechar e confirmar. Ansiedade não é sinal.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 05 — O filtro",
    title: "O checklist de 6 pontos.",
    lead: "Antes de cada entrada, passe por esta lista. Se um único item falhar, a entrada não existe. No M5 você tem tempo de sobra pra conferir com calma, então não há desculpa pra pular etapa. Este filtro é o que mantém seu acerto acima do equilíbrio.",
  },
  {
    kind: "checklist",
    title: "Checklist de 6 · só entra se fechar todos",
    items: [
      "Tendência definida na direção da entrada (preço respeitando a média).",
      "Suporte ou resistência claro no ponto onde o preço está.",
      "Confirmação presente (força, pin ou engolfo na zona).",
      "Horário de liquidez, sem notícia bomba na hora.",
      "Payout do ativo acima de 80%.",
      "Você está calmo, dentro do stop do dia.",
    ],
  },
  {
    kind: "callout",
    tone: "gold",
    title: "A regra dos 5 minutos",
    body: "Você tem uma vela inteira, cinco minutos, pra marcar os 6 itens antes de a próxima abrir. Se não conseguir marcar todos com tranquilidade nesse tempo, o setup não está claro. Deixe passar. Vem outro, sem pressa.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Anote quantas entradas você deixou passar por causa do checklist. No começo vai doer ver o preço andar sem você. Depois você percebe que boa parte das que deixou passar teriam sido perdas, e o checklist vira seu melhor amigo.",
    ],
  },
  {
    kind: "chapter",
    kicker: "Capítulo 06 — Sobrevivência",
    title: "Gestão de banca e o mito do martingale.",
    lead: 'O melhor método do mundo quebra com gestão ruim. O pior erro do iniciante é o martingale: dobrar a entrada depois de cada perda pra "recuperar". A conta parece esperta e é o caminho mais rápido pra zerar a banca. Veja por que:',
  },
  {
    kind: "table",
    headers: ["Sequência de perdas", "Entrada (martingale)", "Acumulado no risco"],
    rows: [
      ["1ª perda", "R$ 10", "R$ 10"],
      ["2ª perda", "R$ 20", "R$ 30"],
      ["3ª perda", "R$ 40", "R$ 70"],
      ["4ª perda", "R$ 80", "R$ 150"],
      ["5ª perda", "R$ 160", "R$ 310"],
      ["6ª perda", "R$ 320", "R$ 630"],
    ],
  },
  {
    kind: "prose",
    paragraphs: [
      "Seis perdas seguidas acontecem com muito mais frequência do que você imagina, até num método bom. Ali você já arriscou 63× a entrada inicial pra tentar ganhar 10. Uma sequência ruim, que é normal e inevitável, te tira do jogo. Não use martingale.",
      "Agora compare com o tamanho fixo na mesma sequência de 6 perdas. Com entrada de R$ 10 travada, você perdeu R$ 60 e continua vivo, com banca quase inteira pra buscar a virada. No martingale, as mesmas 6 perdas custaram R$ 630, dez vezes mais, e provavelmente já estouraram sua banca inteira. Mesmo método, mesmas perdas: a gestão é o que decide se você continua no jogo.",
    ],
  },
  {
    kind: "stats",
    items: [
      { value: "R$ 60", label: "Perda em 6 seguidas com tamanho fixo" },
      { value: "R$ 630", label: "Perda em 6 seguidas com martingale" },
      { value: "1 a 2%", label: "Da banca por entrada, sempre" },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "O jeito certo",
    body: "Entrada de tamanho fixo, entre 1% e 2% da banca. Defina um stop win (para de ganhar) e um stop loss do dia (para de perder). Bateu qualquer um dos dois, acabou o dia. Sua consistência vem de sobreviver hoje pra operar amanhã.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 07 — Execução",
    title: "A rotina de operação em M5.",
    lead: "Método sem rotina vira aposta. Esta é a sequência que transforma as regras em hábito. No M5 o ritmo é mais calmo: dá tempo de fazer tudo direito. Rode ela igual, todo dia, até ficar automático.",
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Antes (3 min)",
        text: "Defina banca, entrada fixa, stop win e stop loss do dia. Escreva os números no papel. Sem número definido, não abre o gráfico.",
      },
      {
        num: "02",
        title: "Marque as zonas",
        text: "Antes de operar, desenhe os suportes e resistências mais claros do gráfico e identifique a tendência pela média. Esse mapa é o seu campo de jogo.",
      },
      {
        num: "03",
        title: "Escolha do ativo",
        text: "Um ativo com payout acima de 80% e tendência limpa. Um por vez. Fidelidade ao gráfico que você entende, sem pular de ativo.",
      },
      {
        num: "04",
        title: "Espera ativa",
        text: "Observe as velas fecharem sem operar. Só age quando o preço chega numa zona e o checklist de 6 pontos fecha. A espera é a maior parte do trabalho.",
      },
      {
        num: "05",
        title: "Execução",
        text: "Confirmação fechada, entra na abertura da próxima vela, expiração de 5 minutos, tamanho fixo. Sem hesitar, sem aumentar por empolgação.",
      },
      {
        num: "06",
        title: "Registro e parada",
        text: "Anote no diário: setup, zona, resultado e como você estava. Bateu stop win ou stop loss, fecha a plataforma. Parar no lugar certo vale mais que qualquer entrada extra.",
      },
    ],
  },
  {
    kind: "chapter",
    kicker: "Capítulo 08 — O que evitar",
    title: "Os erros que zeram a conta.",
    lead: "Não é o mercado que quebra o iniciante. São estes hábitos. Reconheça cada um em você, com honestidade.",
  },
  {
    kind: "traps",
    items: [
      {
        title: "Erro 01 · Revanche",
        text: "Perdeu e dobrou a entrada com raiva pra recuperar. Você parou de operar o método e começou a operar a emoção. Fim previsível: banca zerada.",
      },
      {
        title: "Erro 02 · Entrar sem confirmação",
        text: "Ver o preço chegar no suporte e entrar antes da vela confirmar, na pressa. Metade dos testes falha. Sem confirmação, é aposta cega.",
      },
      {
        title: "Erro 03 · Sem stop do dia",
        text: 'Continuar operando depois de um dia ruim, "só mais uma". O dia ruim vira semana perdida. O stop existe pra te salvar de você mesmo.',
      },
      {
        title: "Erro 04 · Pular o treino",
        text: "Levar pra conta real antes do setup virar reflexo. Você paga a curva de aprendizado com dinheiro de verdade. Treine na demo até cansar.",
      },
      {
        title: "Erro 05 · Banca emocional",
        text: "Operar com dinheiro que faz falta no mês. O medo distorce cada decisão e você sai cedo do certo e segura o errado. Opere só o que pode perder.",
      },
    ],
  },
  {
    kind: "chapter",
    kicker: "Capítulo 09 — Aplicação",
    title: "Seu plano de 30 dias.",
    lead: "Do papel pra prática. Este é o caminho pro método virar seu, sem queimar banca no processo. O M5 é paciente, e seu plano também tem que ser.",
  },
  {
    kind: "plan",
    items: [
      { days: "10d", text: "Só conta treino, marcando zonas e checklist" },
      { days: "10d", text: "Treino medindo acerto e expectativa" },
      { days: "10d", text: "Real mínimo, 1% por entrada" },
    ],
  },
  {
    kind: "checklist",
    title: "Metas do plano",
    items: [
      "Meta de acerto: passar de 56% no diário antes de ir pra conta real.",
      "Meta de disciplina: zero entradas fora do checklist por 3 dias seguidos.",
      "Meta de gestão: nenhum dia estourando o stop loss definido.",
      "Meta de registro: 100% das entradas anotadas no diário, com a zona marcada.",
    ],
  },
  {
    kind: "quote",
    text: "Consistência não é ganhar todo dia. É seguir o processo todo dia. O lucro é consequência.",
    cite: "PH",
  },
  {
    kind: "chapter",
    kicker: "Na prática — uma terça-feira comum",
    title: "Um trade do começo ao fim.",
    lead: "Chega de teoria: vamos operar um pregão junto. Banca de R$ 500, entrada fixa de R$ 10 (2%), stop win +R$ 30, stop loss −R$ 20, payout 87%. Acompanhe vela a vela.",
  },
  {
    kind: "figure",
    id: "trade",
    caption: "Fig 03 — O setup real da 4ª entrada do dia: recuo, rejeição no suporte e call na confirmação.",
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "09h05 · leio o contexto",
        text: "Média pra cima, topos e fundos mais altos: tendência de alta clara. Marco o suporte em 1,1042, resistência antiga que virou piso. Meu campo de jogo está desenhado.",
      },
      {
        num: "02",
        title: "09h20 · deixo a primeira passar",
        text: 'Preço sobe forte, mas longe de qualquer zona. Checklist não fecha, sem suporte por perto. Não entro. Anoto: "passei, sem zona". Doeu ver subir sem mim, mas regra é regra.',
      },
      {
        num: "03",
        title: "09h40 · o preço recua ao suporte",
        text: "Vela cinza de recuo, depois uma vela que encosta em 1,1042 e devolve com pavio longo pra baixo: rejeição. O suporte segurou. Agora é esperar a confirmação, sem antecipar.",
      },
      {
        num: "04",
        title: "09h45 · a confirmação aparece",
        text: "Vela de força azul, corpo grande, retomando a favor da tendência em cima da zona. Os 6 itens fecham. Entro call de R$ 10 na abertura da vela seguinte, expiração de 5 minutos.",
      },
    ],
  },
  {
    kind: "chapter",
    kicker: "Na prática — uma terça-feira comum (continuação)",
    title: "O trade fecha, o dia fecha.",
    lead: "A entrada está feita: call de R$ 10 na abertura da vela seguinte à confirmação, expiração de 5 minutos. Agora é deixar a vela fechar, ler o resultado sem torcida e saber a hora exata de parar.",
  },
  {
    kind: "steps",
    items: [
      {
        num: "05",
        title: "09h50 · resultado",
        text: 'A vela fecha acima da entrada. Acerto: +R$ 8,70, banca em R$ 508,70. Registro no diário: setup, zona, resultado e "estava calmo".',
      },
      {
        num: "06",
        title: "10h30 · bato o stop win",
        text: "Mais duas entradas boas e uma perda depois, o dia soma +R$ 30,10. Stop win batido. Fecho a plataforma na hora: não devolvo o que o mercado acabou de me dar.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "gold",
    title: "A lição do dia",
    body: "4 entradas, 3 acertos, 1 perda, e mais setups ignorados que operados. O lucro veio de filtrar bem, arriscar fixo e parar no lugar certo, não de acertar muito. Um dia chato de +6%. Chato é o que dá certo.",
  },
  {
    kind: "chapter",
    kicker: "Referência rápida — a cola do método",
    title: "Guarde esta página.",
    lead: "Tudo o que você precisa antes de clicar, em uma página só. Volte aqui todo dia até não precisar mais. Se só uma página deste ebook fosse pra ficar colada na sua tela, seria esta.",
  },
  {
    kind: "checklist",
    title: "Checklist de 6 · só entra se fechar todos",
    items: [
      "Tendência definida na direção da entrada.",
      "Suporte ou resistência claro no ponto do preço.",
      "Confirmação na zona (força, pin ou engolfo).",
      "Horário de liquidez, sem notícia bomba.",
      "Payout do ativo acima de 80%.",
      "Você calmo, dentro do stop do dia.",
    ],
  },
  {
    kind: "checklist",
    title: "As 4 regras de ouro",
    items: [
      "Entra na abertura da vela seguinte à confirmação.",
      "Tamanho fixo, 1 a 2% da banca, sempre. Zero martingale.",
      "Stop win e stop loss do dia. Bateu um, acabou.",
      "Registra tudo no diário, inclusive o que deixou passar.",
    ],
  },
  {
    kind: "split",
    doTitle: "Faça",
    doText:
      "Espere a vela fechar. Opere a favor da tendência. Entre só na zona com confirmação. Arrisque fixo. Pare no stop. Anote o resultado. Trate como negócio.",
    dontTitle: "Não faça",
    dontText:
      "Não entre no meio da vela. Não dobre pra recuperar. Não brigue com a tendência. Não opere sem zona. Não passe do stop. Não leve pra real sem treinar.",
  },
  {
    kind: "callout",
    tone: "principle",
    title: "O cartão de cola, em uma frase",
    body: "Tendência a favor, preço na zona, vela confirmou: entra fixo na próxima, expira em 5 minutos, para no stop. Repita o certo, ignore o resto.",
  },
  {
    kind: "callout",
    tone: "danger",
    title: "Aviso — leia com atenção",
    body: "Este material tem caráter exclusivamente educacional e não constitui recomendação de investimento, consultoria financeira ou promessa de retorno. Operar no mercado financeiro, em especial opções binárias e ativos de curtíssimo prazo, envolve risco elevado e pode resultar na perda total do capital investido. Rentabilidade passada não garante rentabilidade futura. Nenhuma estratégia, sinal ou método garante lucro, inclusive o descrito aqui. As decisões de operação e seus resultados são de responsabilidade exclusiva do leitor. Opere sempre na conta de treino até dominar o método e jamais utilize recursos que comprometam sua segurança financeira. Ao aplicar o conteúdo, você declara estar ciente e de acordo com estes termos.",
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Resumo honesto",
    body: "O método aumenta suas chances. Não elimina o risco. O tempo maior do M5 te ajuda a decidir melhor, não a acertar sempre. Trate cada operação como uma aposta de probabilidade favorável, controle o tamanho e deixe a matemática trabalhar. Quem respeita o risco continua no jogo. Quem desrespeita, sai dele.",
  },
];
