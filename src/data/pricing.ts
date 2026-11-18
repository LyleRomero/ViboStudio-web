/**
 * Monthly content production plans.
 *
 * Prices are the figures supplied for the web edition. They differ from the
 * printed ISSUE 001 brochure, so this file is the single place to reconcile
 * them if the printed table is the one that should win.
 */

export type Modality = {
  key: "social" | "pro";
  name: string;
  description: string;
};

export const modalities: Modality[] = [
  {
    key: "social",
    name: "VIBO SOCIAL",
    description:
      "Producción con smartphone, iluminación profesional, sonido y edición.",
  },
  {
    key: "pro",
    name: "VIBO PRO",
    description:
      "Producción con cámara profesional, dirección audiovisual y edición avanzada.",
  },
];

export type Plan = {
  name: string;
  volume: string;
  social: string;
  pro: string;
  recommended?: boolean;
  includes: string[];
};

export const plans: Plan[] = [
  {
    name: "START",
    volume: "4 videos / mes",
    social: "$780.000",
    pro: "$1.150.000",
    includes: [
      "4 guiones y 4 reels.",
      "Producción de hasta 2 horas.",
      "1 ronda de ajustes.",
    ],
  },
  {
    name: "GROW",
    volume: "8 videos / mes",
    social: "$1.200.000",
    pro: "$1.950.000",
    recommended: true,
    includes: [
      "8 guiones y 8 reels.",
      "Calendario editorial.",
      "Producción de hasta 4 horas.",
      "2 rondas de ajustes.",
    ],
  },
  {
    name: "IMPACT",
    volume: "12 videos / mes",
    social: "$1.700.000",
    pro: "$2.750.000",
    includes: [
      "12 guiones y 12 reels.",
      "Investigación de audiencias.",
      "Calendario editorial.",
      "2 jornadas de hasta 3 horas.",
      "Reunión de seguimiento.",
      "2 rondas de ajustes.",
    ],
  },
];

export const planEssentials = [
  "Diagnóstico o análisis de marca.",
  "Estrategia de contenido.",
  "Guiones estratégicos.",
  "Reels editados.",
  "Portadas y copys.",
  "Jornada de producción.",
  "Rondas de ajustes.",
];

export const pricingNote =
  "Precios mensuales en COP, IVA incluido. El alcance de cada entregable varía según el plan y la modalidad de producción.";
