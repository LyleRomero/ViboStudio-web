import { Chapter } from "@/components/ui/Chapter";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

/**
 * Chapter 01: the manifesto.
 *
 * Two typographic plates separated by a wide trough of paper. The second plate
 * is pushed into the right half of the grid so the eye has to travel, which is
 * the whole argument of the section.
 */
export function Manifesto() {
  return (
    <Chapter id="estudio">
      <ChapterLabel number="01" title="THE STUDIO" aside="MANIFIESTO" />

      <RevealGroup className="mt-[clamp(2.5rem,6vw,5rem)]">
        <RevealItem>
          <h2 className="disp text-[clamp(2.6rem,9.2vw,8.5rem)]">
            NO CREAMOS
            <br />
            POR CREAR.
          </h2>
        </RevealItem>

        <RevealItem className="mt-[clamp(2rem,5vw,4.5rem)] md:pl-[22%] lg:pl-[34%]">
          <p className="disp text-[clamp(2.6rem,9.2vw,8.5rem)]">
            <span className="mk">CREAMOS</span>
            <br />
            CON DIRECCIÓN.
          </p>
        </RevealItem>
      </RevealGroup>

      <Reveal
        className="mt-[clamp(3rem,7vw,6rem)] grid gap-x-10 gap-y-5 border-t border-paper-line pt-6 md:grid-cols-12"
        delay={0.1}
      >
        <p className="mono text-graphite md:col-span-3">QUIÉNES SOMOS</p>
        <div className="md:col-span-7 md:col-start-5 xl:col-span-6">
          <p className="max-w-[46ch] text-[clamp(1.05rem,1.5vw,1.35rem)] leading-[1.5]">
            En VIBO STUDIO conectamos estrategia empresarial, creatividad y
            tecnología para construir marcas, experiencias y soluciones que
            generan valor.
          </p>
        </div>
      </Reveal>
    </Chapter>
  );
}
