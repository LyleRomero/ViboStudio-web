import { ArrowUpRight } from "lucide-react";
import { Chapter } from "@/components/ui/Chapter";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { LaptopMockup } from "@/components/ui/Mockups";
import { Reveal, RevealImage } from "@/components/ui/Reveal";
import { digitalProjects } from "@/data/projects";

/**
 * Chapter 04b: digital experiences.
 *
 * Each of the three sites gets its own composition so the spread does not
 * settle into a zigzag: right rail, left rail, then full measure. The last
 * project is the widest, which guarantees it is never the one that gets lost.
 */

const layouts = [
  {
    frame: "lg:col-span-9",
    meta: "lg:col-span-3 lg:self-end",
    order: "",
  },
  {
    frame: "lg:col-span-9 lg:col-start-4",
    meta: "lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:self-end",
    order: "",
  },
  {
    frame: "lg:col-span-12",
    meta: "lg:col-span-12",
    order: "",
  },
] as const;

export function DigitalPortfolio() {
  return (
    <Chapter id="experiencias" surface="ink">
      <ChapterLabel
        number="04"
        title="SELECTED WORK"
        aside="DIGITAL EXPERIENCES"
      />

      <Reveal className="mt-[clamp(2.5rem,6vw,4.5rem)]">
        <h2 className="disp text-[clamp(2.3rem,7vw,6rem)]">
          EXPERIENCIAS
          <br />
          QUE <span className="mk">CONECTAN.</span>
        </h2>
      </Reveal>

      <ul className="mt-[clamp(3rem,7vw,5.5rem)] flex flex-col gap-[clamp(3.5rem,8vw,7rem)]">
        {digitalProjects.map((project, index) => {
          const layout = layouts[index];
          return (
            <li
              key={project.slug}
              className="grid gap-x-12 gap-y-7 lg:grid-cols-12"
            >
              <RevealImage className={layout.frame}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <LaptopMockup
                    src={project.image}
                    alt={project.alt}
                    sizes={
                      index === 2
                        ? "(max-width: 1023px) 92vw, 88vw"
                        : "(max-width: 1023px) 92vw, 66vw"
                    }
                    className="transition-transform duration-500 ease-[var(--ease-editorial)] group-hover:-translate-y-1.5"
                  />
                </a>
              </RevealImage>

              <Reveal className={layout.meta} delay={0.08}>
                <div
                  className={
                    index === 2
                      ? "grid items-baseline gap-x-10 gap-y-4 border-t border-ink-line pt-5 md:grid-cols-12"
                      : "border-t border-ink-line pt-5"
                  }
                >
                  <div className={index === 2 ? "md:col-span-5" : ""}>
                    <span className="mono text-ink-text">
                      0{index + 1} / DIGITAL
                    </span>
                    <h3 className="disp mt-3 text-[clamp(1.4rem,3.2vw,2.6rem)]">
                      {project.name}
                    </h3>
                  </div>

                  <p
                    className={`leading-[1.55] text-ink-text ${
                      index === 2
                        ? "md:col-span-4 md:mt-0"
                        : "mt-3 max-w-[32ch]"
                    }`}
                  >
                    {project.category}
                  </p>

                  <a
                    href={project.href}
                    target="_blank"
                    rel="noreferrer"
                    className={`mono ed-link mt-5 inline-flex min-h-11 items-center text-acid ${
                      index === 2 ? "md:col-span-3 md:mt-0 md:justify-self-end" : ""
                    }`}
                  >
                    {project.displayUrl}
                    <ArrowUpRight size={14} strokeWidth={1.5} aria-hidden="true" />
                    <span className="sr-only">
                      Abre {project.name} en una pestaña nueva
                    </span>
                  </a>
                </div>
              </Reveal>
            </li>
          );
        })}
      </ul>
    </Chapter>
  );
}
