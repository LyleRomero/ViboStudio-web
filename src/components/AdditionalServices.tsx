import { Chapter } from "@/components/ui/Chapter";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  additionalCategories,
  additionalNote,
} from "@/data/additional-services";

/**
 * Chapter 06: the rate card.
 *
 * Grouped into four categories so a long price list never becomes one long
 * ruled list. Each category keeps its own rule; the rows inside it share a
 * single hairline between them.
 */
export function AdditionalServices() {
  return (
    <Chapter id="tarifas" tight>
      <ChapterLabel number="06" title="MORE SERVICES" aside="TARIFAS DE REFERENCIA" />

      <Reveal className="mt-[clamp(2.5rem,6vw,4.5rem)]">
        <h2 className="disp text-[clamp(2.3rem,7vw,6rem)]">
          MÁS SOLUCIONES.
          <br />
          MÁS POSIBILIDADES.
        </h2>
      </Reveal>

      <div className="mt-[clamp(2.75rem,6vw,4.5rem)] grid gap-x-16 gap-y-[clamp(2.5rem,5vw,3.5rem)] lg:grid-cols-2">
        {additionalCategories.map((category) => (
          <RevealGroup key={category.number} amount={0.1}>
            <RevealItem className="flex items-baseline gap-3 border-t-2 border-ink pt-4">
              <span className="mono text-graphite">{category.number}</span>
              <h3 className="disp text-[clamp(1.25rem,2.6vw,1.9rem)]">
                {category.name}
              </h3>
            </RevealItem>

            <RevealItem as="div" className="mt-4">
              <dl>
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-baseline justify-between gap-6 border-b border-paper-line py-3.5"
                  >
                    <dt className="text-[0.975rem] leading-[1.45]">
                      {item.name}
                    </dt>
                    <dd className="tabular mono shrink-0 text-right text-[0.8125rem] text-ink">
                      {item.price}
                      {item.unit ? (
                        <span className="ml-1.5 normal-case tracking-normal text-graphite">
                          {item.unit}
                        </span>
                      ) : null}
                    </dd>
                  </div>
                ))}
              </dl>
            </RevealItem>
          </RevealGroup>
        ))}
      </div>

      <Reveal
        className="mt-[clamp(2rem,4vw,3rem)] flex flex-col items-start justify-between gap-7 border-t border-paper-line pt-6 md:flex-row md:items-center"
        delay={0.08}
      >
        <p className="max-w-[62ch] text-[0.875rem] leading-[1.55] text-paper-text">
          {additionalNote}
        </p>
        <QuoteButton
          service="Servicio puntual"
          label="PEDIR UNA TARIFA"
          className="btn-line shrink-0"
        />
      </Reveal>
    </Chapter>
  );
}
