/**
 * Studio identity and verified contact channels.
 * Every value here is taken from the ISSUE 001 brochure. Nothing is invented:
 * if a channel is not listed below, the studio has not confirmed it yet.
 */

export const site = {
  name: "VIBO STUDIO",
  claim: "ESTRATEGIA QUE TRANSFORMA.",
  concept: "TRES PERSPECTIVAS. UNA VISIÓN.",
  disciplinesLine: "ESTRATEGIA / CREATIVIDAD / TECNOLOGÍA",
  label: "INDEPENDENT CREATIVE & STRATEGIC STUDIO",
  issue: "ISSUE 001 / 2026",
  url: "https://vibocol.com.co",
  description:
    "VIBO STUDIO es una agencia multidisciplinaria que integra estrategia empresarial, creatividad y tecnología para construir marcas, experiencias y soluciones que generan valor.",
} as const;

export const contact = {
  whatsappNumber: "+57 300 593 2450",
  whatsappUrl: "https://wa.me/573005932450",
  email: "comercial@vibocol.com.co",
  instagram: "@vibostudiocol",
  instagramUrl: "https://www.instagram.com/vibostudiocol/",
} as const;

/**
 * Optional POST endpoint for the contact form (Formspree, Basin, a Route
 * Handler of your own, anything that accepts JSON). While it is unset the form
 * hands the message over to WhatsApp instead of pretending it was delivered.
 */
export const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_ENDPOINT ?? "";

export const navItems = [
  { label: "ESTUDIO", href: "#estudio" },
  { label: "SERVICIOS", href: "#servicios" },
  { label: "PROYECTOS", href: "#proyectos" },
  { label: "PLANES", href: "#planes" },
  { label: "CONTACTO", href: "#contacto" },
] as const;
