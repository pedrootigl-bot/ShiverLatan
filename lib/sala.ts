export const TRADE_ROOM_URL = "https://trade.shiverbroker.com/traderoom";

export const SALA_BOT_NAME = "Assistente Shiver";

export type SalaEbookTone = "cyan" | "green" | "amber" | "violet";

export type SalaEbookSection = {
  heading?: string;
  paragraphs: string[];
};

export type SalaEbook = {
  id: string;
  title: string;
  subtitle: string;
  kicker: string;
  coverLabel: string;
  coverTone: SalaEbookTone;
  coverSrc?: string;
  body: SalaEbookSection[];
};

export const SALA_EBOOKS: SalaEbook[] = [
  {
    id: "timing",
    title: "Timing de compra e venda",
    subtitle: "Quando entrar e quando sair, com tendência e momentum.",
    kicker: "E-book 01",
    coverLabel: "01",
    coverTone: "cyan",
    body: [
      {
        heading: "O que este texto cobre",
        paragraphs: [
          "Timing não é um botão mágico. É a leitura de tendência, momentum e volatilidade no mesmo painel, para você decidir se a hora de comprar ou vender faz sentido agora.",
          "A ferramenta da Shiver auxilia essa leitura. Quem opera é você, no traderoom da corretora. Nenhuma ordem sai sozinha.",
        ],
      },
      {
        heading: "Tendência primeiro",
        paragraphs: [
          "Antes de olhar o gatilho, veja a direção maior. Comprar contra a tendência exige mais margem de erro. Vender no meio de um movimento a favor também.",
          "Use o painel para marcar se o cenário está a favor, contra ou indefinido. Se estiver indefinido, esperar também é uma decisão.",
        ],
      },
      {
        heading: "Momentum e saída",
        paragraphs: [
          "Momentum diz se o movimento ainda tem força. Entrada sem força vira chase. Saída sem leitura vira corte cedo demais ou tarde demais.",
          "Defina entrada, alvo e stop antes de clicar no iframe. O assistente dispara a leitura. A ordem continua sendo sua.",
        ],
      },
    ],
  },
  {
    id: "risco",
    title: "Gestão de risco",
    subtitle: "Stop, alvo e tamanho da posição — quem opera é você.",
    kicker: "E-book 02",
    coverLabel: "02",
    coverTone: "green",
    body: [
      {
        heading: "Risco cabe na conta",
        paragraphs: [
          "Gestão de risco não é o sinal. É quanto você aceita perder se a leitura estiver errada. Sem esse número, qualquer card de compra ou venda vira aposta.",
          "Negociar envolve perda. A ferramenta auxilia a leitura e não garante resultado.",
        ],
      },
      {
        heading: "Stop, alvo e tamanho",
        paragraphs: [
          "Stop é o ponto em que a tese caiu. Alvo é onde a tese se confirma o bastante para realizar. Tamanho da posição é o que cabe entre os dois sem quebrar a conta.",
          "Se o stop precisa ser largo demais para o tamanho que você quer, reduza a posição. Não alargue o stop para caber o ego.",
        ],
      },
      {
        heading: "Na sala",
        paragraphs: [
          "O assistente mostra a leitura. O traderoom executa só o que você mandar. Não misture os dois papéis: informação à esquerda, ordem à direita.",
        ],
      },
    ],
  },
  {
    id: "painel",
    title: "Leitura do painel",
    subtitle: "Tendência, momentum e volatilidade no mesmo lugar.",
    kicker: "E-book 03",
    coverLabel: "03",
    coverTone: "amber",
    body: [
      {
        heading: "Três camadas, uma tela",
        paragraphs: [
          "Tendência responde à direção. Momentum responde à força. Volatilidade responde ao espaço que o preço pode percorrer — e ao ruído que pode te tirar da posição.",
          "Olhar só uma camada gera falsa precisão. As três juntas mostram se o cenário está limpo, esticado ou parado.",
        ],
      },
      {
        heading: "Como usar sem operar no automático",
        paragraphs: [
          "O painel não dispara ordem. Ele organiza o que você já deveria perguntar antes de clicar em comprar ou vender no traderoom.",
          "Se tendência e momentum discordam, a leitura é de espera. Se a volatilidade explode, o tamanho da posição precisa caber no stop mais largo.",
        ],
      },
    ],
  },
  {
    id: "sala",
    title: "Operar na sala",
    subtitle: "O disparo é leitura. A ordem sai no traderoom.",
    kicker: "E-book 04",
    coverLabel: "04",
    coverTone: "violet",
    body: [
      {
        heading: "Dois espaços, um trader",
        paragraphs: [
          "Na sala, o assistente entrega sinais e contexto. O iframe é o ambiente da corretora Shiver, onde você entra, sai e gerencia a posição.",
          "Nada do Telegram, do chat ou deste e-book deve clicar no gráfico por você. A arquitetura é proposital: informação de um lado, execução manual do outro.",
        ],
      },
      {
        heading: "Fluxo prático",
        paragraphs: [
          "Abra a sala, faça login na corretora, leia o disparo, confira tendência e risco, e só então opere no traderoom.",
          "Se o assistente estiver reconectando, não force a ordem. Sem leitura clara, a melhor ação pode ser não operar.",
        ],
      },
    ],
  },
];
