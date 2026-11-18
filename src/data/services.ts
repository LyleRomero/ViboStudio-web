export type ServiceLine = {
  number: string;
  title: string;
  english: string;
  description: string;
  /** Scope items, taken from the service description itself. */
  scope: string[];
};

export const serviceLines: ServiceLine[] = [
  {
    number: "01",
    title: "ESTRATEGIA Y CONSULTORÍA",
    english: "STRATEGY & CONSULTING",
    description:
      "Planeación empresarial, marketing y desarrollo comercial.",
    scope: ["Planeación empresarial", "Marketing", "Desarrollo comercial"],
  },
  {
    number: "02",
    title: "BRANDING Y DISEÑO",
    english: "BRANDING & DESIGN",
    description: "Identidad visual, dirección de arte y diseño gráfico.",
    scope: ["Identidad visual", "Dirección de arte", "Diseño gráfico"],
  },
  {
    number: "03",
    title: "CONTENIDO Y MARKETING",
    english: "CONTENT & MARKETING",
    description:
      "Producción audiovisual, contenido digital y campañas.",
    scope: ["Producción audiovisual", "Contenido digital", "Campañas"],
  },
  {
    number: "04",
    title: "DIGITAL Y TECNOLOGÍA",
    english: "DIGITAL & TECHNOLOGY",
    description: "Desarrollo web, e-commerce y automatización.",
    scope: ["Desarrollo web", "E-commerce", "Automatización"],
  },
  {
    number: "05",
    title: "PERSONAS Y CRECIMIENTO",
    english: "PEOPLE & GROWTH",
    description:
      "Mentorías, liderazgo, ventas y servicio al cliente.",
    scope: ["Mentorías", "Liderazgo", "Ventas y servicio al cliente"],
  },
];
