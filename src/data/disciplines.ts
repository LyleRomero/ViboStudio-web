export type Discipline = {
  number: string;
  title: string;
  english: string;
  description: string;
  /** The brochure gives the middle column the acid treatment. */
  accent?: boolean;
};

export const disciplines: Discipline[] = [
  {
    number: "01",
    title: "ESTRATEGIA",
    english: "BUSINESS",
    description:
      "Convertimos objetivos empresariales en decisiones y planes de acción.",
  },
  {
    number: "02",
    title: "CREATIVIDAD",
    english: "CREATIVE",
    description:
      "Construimos identidades y contenidos que conectan con las personas.",
    accent: true,
  },
  {
    number: "03",
    title: "TECNOLOGÍA",
    english: "TECHNOLOGY",
    description:
      "Desarrollamos herramientas y experiencias digitales que impulsan el crecimiento.",
  },
];
