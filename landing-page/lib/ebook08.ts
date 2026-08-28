import type { SalaEbookBlock } from "@/lib/salaEbook";

export const EBOOK_08_BODY: SalaEbookBlock[] = [
  {
    kind: "chapter",
    kicker: "Abertura",
    title: "Plano de operações nas binárias.",
    lead: "Trader consistente opera com regra, não com impulso. O plano não garante lucro. Ele evita o caos: horário, ativo, entrada, limite e risco definidos antes do clique.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Este e-book monta os pilares de um plano simples, divide o ofício em antes, durante e depois da operação, e deixa um modelo para você copiar, testar e ajustar. Simplicidade gera consistência. Promessa de resultado, não.",
    ],
  },
  {
    kind: "callout",
    tone: "warn",
    title: "Leia antes de começar",
    body: "Opções binárias envolvem risco elevado de perda. Ter um plano escrito não garante lucro nem elimina o risco. Os números do exemplo (horário, máximo de trades, stop) são ilustrativos, não meta. Treine na conta demo.",
  },
  {
    kind: "meta",
    items: [
      { label: "Autor", value: "PH" },
      { label: "Edição", value: "2026 · v1" },
      { label: "Formato", value: "Guia de processo" },
    ],
  },
  {
    kind: "toc",
    kicker: "Sumário",
    title: "O que você vai montar",
    items: [
      { num: "01", label: "O que o plano precisa ter", page: "03" },
      { num: "02", label: "Antes, durante e depois", page: "04" },
      { num: "03", label: "Exemplo simples de plano", page: "05" },
      { num: "04", label: "Próximos passos", page: "06" },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Princípio central",
    body: "Plano não garante lucro, mas evita o caos. Método e consistência superam sorte e improviso — sem transformar isso em promessa de saldo.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 1",
    title: "O que um plano de operações precisa ter.",
    lead: "Pilares básicos. Pouca regra, bem obedecida, vale mais do que um PDF de 40 páginas que você abandona no segundo loss.",
  },
  {
    kind: "traps",
    heading: "Cinco pilares — escreva os seus",
    items: [
      {
        title: "Horários definidos",
        text: "Estabeleça janelas específicas para operar. Fora da janela, a regra é não clicar.",
      },
      {
        title: "Ativos específicos",
        text: "Não opere tudo. Foque em poucos pares que você realmente lê.",
      },
      {
        title: "Tipo de entrada",
        text: "Rompimento, pullback ou continuação — escolha o que o seu setup cobre. Improviso no meio do candle não é plano.",
      },
      {
        title: "Limite de operações",
        text: "Defina o máximo diário de trades. Quantidade demais é overtrade com desculpa.",
      },
      {
        title: "Gestão de risco",
        text: "Limite de perda e de ganho no dia. Quando bater, para. O plano manda mais do que o ego.",
      },
    ],
  },
  {
    kind: "callout",
    tone: "cyan",
    title: "Simplicidade gera consistência",
    body: "Se você não consegue recitar o plano em 20 segundos, ele é grande demais para o calor da operação. Corte até caber na cabeça.",
  },
  {
    kind: "chapter",
    kicker: "Capítulo 2",
    title: "Antes, durante e depois da operação.",
    lead: "Divida o plano em três momentos. Controle não é feeling. É checklist.",
  },
  {
    kind: "steps",
    items: [
      {
        num: "01",
        title: "Antes de operar",
        text: "Conferir o horário planejado. Verificar o padrão do ativo. Confirmar o estado emocional. Se um dos três falhar, não entra.",
      },
      {
        num: "02",
        title: "Durante a operação",
        text: "Seguir a entrada planejada. Não alterar a decisão no meio. Manter disciplina total — o plano já foi escrito fora da adrenalina.",
      },
      {
        num: "03",
        title: "Depois da operação",
        text: "Registrar o resultado. Evitar sequência impulsiva. Saber a hora de parar: máximo do dia, stop ou meta de processo batidos.",
      },
    ],
  },
  {
    kind: "checklist",
    title: "Checklist rápido — três momentos",
    items: [
      "Antes: horário, padrão, cabeça.",
      "Durante: entrada do plano, sem mudar no meio.",
      "Depois: registro, sem streak emocional, pare quando a regra mandar.",
    ],
  },
  {
    kind: "chapter",
    kicker: "Capítulo 3",
    title: "Exemplo simples de plano de operações.",
    lead: "Modelo para copiar e adaptar. Não é receita de lucro. É esqueleto. Troque horário, par e limites pelo que cabe na sua rotina.",
  },
  {
    kind: "table",
    headers: ["Campo", "Exemplo ilustrativo"],
    rows: [
      ["Horário", "9h às 11h"],
      ["Ativos", "EUR/USD e GBP/USD"],
      ["Máximo diário", "5 operações por dia"],
      ["Stop diário", "2 perdas consecutivas"],
      ["Meta", "Foco no processo, não no valor"],
    ],
  },
  {
    kind: "callout",
    tone: "gold",
    title: "Como usar o exemplo",
    body: "Copie a estrutura, não o número. Seu horário pode ser outro. Seu par pode ser outro. O que não muda: escrever antes, obedecer durante, registrar depois.",
  },
  {
    kind: "quote",
    text: "Plano não garante lucro, mas evita o caos.",
    cite: "E-book 08 · Shiver",
  },
  {
    kind: "chapter",
    kicker: "Mensagem final",
    title: "Regra no lugar do impulso.",
    lead: "A disciplina de seguir um plano estruturado é o que separa ofício de aposta emocional. Ainda assim, plano bem seguido pode perder. O que ele corta é o clique sem critério.",
  },
  {
    kind: "prose",
    paragraphs: [
      "Construa o plano, teste com disciplina e ajuste o que a evidência mostrar. Repetição consciente de processo bem definido é o ofício. Resultado no saldo não é garantia — nem com o melhor papel da mesa.",
      "Método e consistência superam sorte e improviso. Superar improviso não significa lucro todo mês. Significa você saber por que entrou, por que parou e o que vai mudar amanhã.",
    ],
  },
  {
    kind: "plan",
    items: [
      { days: "Passo 1", text: "Crie seu plano escrito — os cinco pilares numa folha só." },
      { days: "Passo 2", text: "Teste por 30 dias na demo, sem mudar a regra no meio da semana." },
      { days: "Passo 3", text: "Registre todos os resultados: horário, par, tipo, motivo, emoção, saldo do dia." },
      { days: "Passo 4", text: "Ajuste o que não funciona — uma variável por vez, com base no diário." },
    ],
  },
  {
    kind: "callout",
    tone: "principle",
    title: "Fechamento",
    body: "Antes, durante e depois da operação. A ferramenta da Shiver auxilia a leitura. Quem escreve o plano, e quem obedece, é você.",
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
    body: "Este material tem caráter exclusivamente educacional e não constitui recomendação de investimento nem promessa de retorno. Horários, pares e limites citados são exemplos ilustrativos. Plano de operações não elimina o risco de perda em opções binárias. As decisões e os resultados são de responsabilidade exclusiva do leitor. Opere na conta de treino até o plano estar no reflexo.",
  },
];
