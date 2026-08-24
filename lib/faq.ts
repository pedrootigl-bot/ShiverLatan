export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "O que é a Shiver?",
    answer:
      "Shiver é a corretora. Esta página apresenta a ferramenta que auxilia o trader na hora de compra e venda, com tendência, momentum e volatilidade no mesmo painel.",
  },
  {
    question: "A ferramenta opera sozinha?",
    answer:
      "Não. Ela não é robô e não dispara ordens. Auxilia a sua leitura; quem decide e quem opera é você.",
  },
  {
    question: "De onde vêm os dados?",
    answer:
      "A prévia desta landing usa números ilustrativos. No produto, as fontes serão documentadas na interface.",
  },
  {
    question: "A inteligência artificial opera por mim?",
    answer:
      "Não. Os insights descrevem o que o painel está lendo. Não são ordem automática nem garantia de resultado.",
  },
  {
    question: "Quanto vai custar?",
    answer:
      "O preço ainda não foi definido. Conhecer a prévia não gera cobrança.",
  },
  {
    question: "Quando estará disponível?",
    answer:
      "Ainda não há data. Mais informações sobre acesso serão divulgadas nesta página.",
  },
];
