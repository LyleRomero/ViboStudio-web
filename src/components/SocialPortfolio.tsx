import { ArrowUpRight } from "lucide-react";
import { Chapter } from "@/components/ui/Chapter";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { PhoneMockup } from "@/components/ui/Mockups";
import { Reveal, RevealImage } from "@/components/ui/Reveal";
import { socialProjects } from "@/data/projects";

/**
 * Chapter 04a: social and content work.
 *
 * Four real account captures in phone frames, set on a staggered baseline so
 * the row reads as a contact sheet rather than a product grid.
 */
export function SocialPortfolio() {
  return (
    <Chapter id="proyectos">
      <ChapterLabel number="04" title="SELECTED WORK" aside="SOCIAL & CONTENT" />

      <Reveal className="mt-[clamp(2.5rem,6vw,4.5rem)]">
        <h2 className="disp text-[clamp(2.3rem,7vw,6rem)]">
          MARCAS QUE
          <br />
          CONFIARON
          <br />
          EN NOSOTROS.
        </h2>
      </Reveal>

      <ul className="mt-[clamp(3rem,7vw,5.5rem)] grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-10 lg:grid-cols-4 lg:gap-x-8">
        {socialProjects.map((project, index) => (
          <li
            key={project.slug}
            className={index % 2 === 1 ? "lg:mt-[clamp(2rem,4vw,4.5rem)]" : ""}
          >
            <RevealImage delay={index * 0.07}>
              <a
                href={project.href}
                target="_blank"
                rel="noreferrer"
                className="group block"
              >
                <PhoneMockup
                  src={project.image}
                  alt={project.alt}
                  className="transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:-translate-y-1.5 group-focus-visible:-translate-y-1.5"
                />

                <div className="mt-6 border-t border-paper-line pt-4">
                  <h3 className="disp text-[clamp(1.05rem,2.1vw,1.6rem)]">
                    {project.name}
                  </h3>
                  <p className="mt-2 text-[0.9rem] leading-[1.5] text-paper-text">
                    {project.category}
                  </p>
                  <span className="mono mt-4 flex items-center gap-1.5 text-graphite transition-colors duration-300 group-hover:text-ink group-focus-visible:text-ink">
                    {project.handle}
                    <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                    <span className="sr-only">
                      Ver el perfil en {project.network}, abre en una pestaña nueva
                    </span>
                  </span>
                </div>
              </a>
            </RevealImage>
          </li>
        ))}
      </ul>
    </Chapter>
  );
}
