import { Wordmark } from "@/components/ui/Wordmark";
import { contact, navItems, site } from "@/data/site";

export function Footer() {
  return (
    <footer className="on-ink">
      <div className="shell py-[clamp(3rem,6vw,4.5rem)]">
        <div className="grid gap-x-12 gap-y-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <span className="block text-[clamp(2rem,5vw,3.25rem)] leading-none">
              <Wordmark />
            </span>
            <p className="disp mt-6 text-[clamp(1.1rem,2.2vw,1.6rem)] text-acid">
              {site.claim}
            </p>
            <p className="mono mt-4 text-ink-text">{site.disciplinesLine}</p>
          </div>

          <nav aria-label="Secciones" className="lg:col-span-3">
            <p className="mono border-t border-ink-line pb-4 pt-4 text-ink-text">
              NAVEGACIÓN
            </p>
            <ul className="mono space-y-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="ed-link inline-flex min-h-11 items-center"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-4">
            <p className="mono border-t border-ink-line pb-4 pt-4 text-ink-text">
              CONTACTO
            </p>
            <ul className="space-y-1">
              <li>
                <a
                  href={contact.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ed-link inline-flex min-h-11 items-center"
                >
                  {contact.whatsappNumber}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="ed-link inline-flex min-h-11 max-w-full items-center break-all"
                >
                  {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={contact.instagramUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ed-link inline-flex min-h-11 items-center"
                >
                  {contact.instagram}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mono mt-[clamp(2.5rem,5vw,3.5rem)] flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-ink-line pt-5 text-ink-text">
          <span>{site.issue}</span>
          <span className="hidden md:block">{site.label}</span>
          <span>VIBO STUDIO © 2026</span>
        </div>
      </div>
    </footer>
  );
}
