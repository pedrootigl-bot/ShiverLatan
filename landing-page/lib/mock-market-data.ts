export const MOCK_PAIR = "BTC / USD";
export const MOCK_PRICE = 67432.1;

export const MOCK_INTRO_CHIPS = [
  { label: "Tendência", value: "Alta" },
  { label: "Momentum", value: "Forte" },
] as const;

export const MOCK_SIGNALS = [
  {
    label: "Tendência",
    status: "Alta",
    tone: "blue" as const,
    hint: "Direção dominante do cenário — para apoiar o momento de compra ou venda.",
    points: "4,36 28,30 52,32 76,22 100,18 124,12 156,8",
  },
  {
    label: "Momentum",
    status: "Forte",
    tone: "purple" as const,
    hint: "Força do movimento em relação ao recorte recente — contexto para o timing.",
    points: "4,28 26,34 48,16 72,30 96,10 120,22 156,6",
  },
  {
    label: "Volatilidade",
    status: "Moderada",
    tone: "amber" as const,
    hint: "Amplitude das oscilações — contexto, não alarme.",
    points: "4,24 28,18 52,30 76,14 100,28 124,16 156,22",
  },
] as const;

export const MOCK_SCENARIO = [
  {
    label: "Tendência",
    value: "Positiva",
    meaning: "O mercado está subindo",
    phrase: "Tendência positiva",
    tone: "blue" as const,
    points: "4,36 28,30 52,32 76,22 100,18 124,12 156,8",
  },
  {
    label: "Momentum",
    value: "Forte",
    meaning: "O movimento está firme",
    phrase: "Momentum forte",
    tone: "purple" as const,
    points: "4,28 26,34 48,16 72,30 96,10 120,22 156,6",
  },
  {
    label: "Volatilidade",
    value: "Moderada",
    meaning: "O preço sobe e desce sem exagero",
    phrase: "Volatilidade moderada",
    tone: "amber" as const,
    points: "4,24 28,18 52,30 76,14 100,28 124,16 156,22",
  },
] as const;

export const MOCK_SCENARIO_OUT =
  "As três leituras juntas: uma visão mais clara do momento. Quem decide é você!";

export const MOCK_TOOL_METRICS = [
  { label: "Tendência", value: "Alta", detail: "+18.4%" },
  { label: "Momentum", value: "Forte", detail: "74%" },
  { label: "Volatilidade", value: "Moderada", detail: "42%" },
] as const;
