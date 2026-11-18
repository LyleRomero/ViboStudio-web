export type SocialProject = {
  slug: string;
  name: string;
  category: string;
  /** Handle as it appears on the live account, verified in the capture. */
  handle: string;
  network: "Instagram" | "TikTok";
  href: string;
  image: string;
  alt: string;
};

export type DigitalProject = {
  slug: string;
  name: string;
  category: string;
  displayUrl: string;
  href: string;
  image: string;
  alt: string;
};

export const socialProjects: SocialProject[] = [
  {
    slug: "reto-21",
    name: "RETO 21",
    category: "Gimnasio y eventos fitness especializados.",
    handle: "@retof21",
    network: "Instagram",
    href: "https://www.instagram.com/retof21",
    image: "/work/reto21-social.webp",
    alt: "Perfil de Instagram de Reto 21 con su parrilla de publicaciones.",
  },
  {
    slug: "homero-artesanal",
    name: "HOMERO ARTESANAL",
    category: "Restaurante de carne al estilo llanero.",
    handle: "@homeroartesanal",
    network: "Instagram",
    href: "https://www.instagram.com/homeroartesanal",
    image: "/work/homero-artesanal-social.webp",
    alt: "Perfil de Instagram de Homero Artesanal con su parrilla de publicaciones.",
  },
  {
    slug: "industriales-andes",
    name: "INDUSTRIALES ANDES",
    category: "Empresa de automatización industrial.",
    handle: "@industrialesandes",
    network: "TikTok",
    href: "https://www.tiktok.com/@industrialesandes",
    image: "/work/industriales-andes-social.webp",
    alt: "Perfil de TikTok de Industriales Andes con sus publicaciones.",
  },
  {
    slug: "academia-vivian",
    name: "ACADEMIA DE BELLEZA VIVIAN",
    category: "Academia de formación en belleza.",
    handle: "@tecnicos_viviann",
    network: "Instagram",
    href: "https://www.instagram.com/tecnicos_viviann",
    image: "/work/academia-viviann-social.webp",
    alt: "Perfil de Instagram de la Academia de Belleza Vivian'n con su parrilla de publicaciones.",
  },
];

export const digitalProjects: DigitalProject[] = [
  {
    slug: "eternique-essence",
    name: "ETERNIQUE ESSENCE",
    category: "Tienda virtual de fragancias.",
    displayUrl: "eternique.co",
    href: "https://eternique-essence.myshopify.com/",
    image: "/work/eternique-essence-web-screen.webp",
    alt: "Ficha de producto de la tienda Eternique Essence.",
  },
  {
    slug: "reto21-evento",
    name: "EVENTO FITNESS RETO21 2026",
    category: "Plataforma de inscripciones para eventos fitness.",
    displayUrl: "eventosreto21.com",
    href: "https://reto21-web-evento.web.app/modalidades",
    image: "/work/reto21-evento-web-screen.webp",
    alt: "Portada del sitio del 3er Reto Fitness con el llamado a inscripción.",
  },
  {
    slug: "ag-ingenieria",
    name: "AG INGENIERÍA",
    category: "Sitio web corporativo de ingeniería.",
    displayUrl: "agingenieria.co",
    href: "https://agingenieria-web-corporativa.web.app/",
    image: "/work/ag-ingenieria-web-screen.webp",
    alt: "Sección de contacto del sitio corporativo de AG Ingeniería.",
  },
];
