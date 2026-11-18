import { AdditionalServices } from "@/components/AdditionalServices";
import { Contact } from "@/components/Contact";
import { DigitalPortfolio } from "@/components/DigitalPortfolio";
import { Disciplines } from "@/components/Disciplines";
import { EditorialHero } from "@/components/EditorialHero";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Manifesto } from "@/components/Manifesto";
import { Pricing } from "@/components/Pricing";
import { Services } from "@/components/Services";
import { SocialPortfolio } from "@/components/SocialPortfolio";
import { Team } from "@/components/Team";
import { contact, site } from "@/data/site";

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  slogan: site.claim,
  description: site.description,
  email: contact.email,
  telephone: contact.whatsappNumber,
  sameAs: [contact.instagramUrl],
  address: { "@type": "PostalAddress", addressCountry: "CO" },
};

export default function Home() {
  return (
    <>
      <a
        href="#estudio"
        className="btn btn-ink sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50"
      >
        SALTAR AL CONTENIDO
      </a>

      <Header />

      <main>
        <EditorialHero />
        <Manifesto />
        <Disciplines />
        <Services />
        <SocialPortfolio />
        <DigitalPortfolio />
        <Pricing />
        <AdditionalServices />
        <Team />
        <Contact />
      </main>

      <Footer />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
    </>
  );
}
