export type Member = {
  number: string;
  name: string;
  role: string;
  /** Discipline this person anchors, matching chapter 02. */
  discipline: string;
};

export const team: Member[] = [
  {
    number: "01",
    name: "LYLE ROMERO",
    role: "Tecnología e innovación.",
    discipline: "TECNOLOGÍA",
  },
  {
    number: "02",
    name: "JUAN MONROY",
    role: "Creatividad y comunicación.",
    discipline: "CREATIVIDAD",
  },
  {
    number: "03",
    name: "YEIMI GAVIRIA",
    role: "Estrategia y desarrollo empresarial.",
    discipline: "ESTRATEGIA",
  },
];
