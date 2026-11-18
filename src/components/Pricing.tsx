import { Chapter } from "@/components/ui/Chapter";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { QuoteButton } from "@/components/ui/QuoteButton";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import {
  modalities,
  planEssentials,
  plans,
  pricingNote,
} from "@/data/pricing";

/**
 * Chapter 05: content production plans.
 *
 * Set as a printed rate table with rules and tabular figures, not as three
 * pricing cards. Below md the table turns into one plate per plan, with the
 * two modalities side by side so the figures stay comparable.
 */
export function Pricing() {
  return (
    <Chapter id="planes">
      <ChapterLabel
        number="05"
        title="CONTENT PRODUCTION"
        aside="DOS MODALIDADES / TRES PLANES"
      />

      <div className="mt-[clamp(2.5rem,6vw,4.5rem)] grid gap-x-12 gap-y-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-6">
          <h2 className="disp text-[clamp(2.3rem,7vw,6rem)]">
            CONTENIDO
            <br />
            CON <span className="mk">ESTRATEGIA.</span>
          </h2>
        </Reveal>

        <Reveal className="self-end lg:col-span-6" delay={0.1}>
          <dl className="grid gap-x-10 gap-y-5 sm:grid-cols-2">
            {modalities.map((modality) => (
              <div key={modality.key} className="border-t border-paper-line pt-4">
                <dt className="disp text-[clamp(1.2rem,2.2vw,1.65rem)]">
                  {modality.name}
                </dt>
                <dd className="mt-2.5 text-[0.925rem] leading-[1.55] text-paper-text">
                  {modality.description}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>

      {/* ---------- rate table ---------- */}
      <RevealGroup
        className="mt-[clamp(3rem,7vw,5rem)] border-t-2 border-ink"
        amount={0.08}
      >
        <RevealItem className="mono hidden border-b border-paper-line py-3 text-graphite md:grid md:grid-cols-[minmax(14rem,1.3fr)_1fr_1fr]">
          <span>PLAN / MES</span>
          <span className="pl-6">VIBO SOCIAL</span>
          <span className="pl-6">VIBO PRO</span>
        </RevealItem>

        {plans.map((plan) => (
          <RevealItem
            key={plan.name}
            className={`grid grid-cols-2 items-center gap-x-4 border-b border-ink/20 px-0 py-6 md:grid-cols-[minmax(14rem,1.3fr)_1fr_1fr] md:gap-x-0 md:py-7 ${
              plan.recommended ? "bg-acid md:px-6" : ""
            }`}
          >
            <div className="col-span-2 md:col-span-1">
              <span className="disp block text-[clamp(1.9rem,4.4vw,2.9rem)]">
                {plan.name}
              </span>
              <span className="mono mt-2 block text-graphite">
                {plan.volume}
              </span>
              {plan.recommended ? (
                <span className="mono mt-3 inline-block bg-ink px-2.5 py-1 text-acid">
                  RECOMENDADO
                </span>
              ) : null}
            </div>

            <PriceCell
              label="SOCIAL"
              value={plan.social}
              highlighted={plan.recommended}
            />
            <PriceCell
              label="PRO"
              value={plan.pro}
              highlighted={plan.recommended}
            />
          </RevealItem>
        ))}
      </RevealGroup>

      {/* ---------- what each level adds ---------- */}
      <div className="mt-[clamp(2.5rem,5vw,3.5rem)] grid gap-x-10 gap-y-8 md:grid-cols-3">
        {plans.map((plan, index) => (
          <Reveal
            key={plan.name}
            delay={index * 0.06}
            className="border-t border-paper-line pt-4"
          >
            <p className="mono flex items-center gap-2 text-graphite">
              {plan.name}
              {plan.recommended ? (
                <span className="chip">RECOMENDADO</span>
              ) : null}
            </p>
            <ul className="mt-3.5 space-y-1.5">
              {plan.includes.map((item) => (
                <li
                  key={item}
                  className="relative pl-4 text-[0.925rem] leading-[1.5] text-paper-text before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2 before:bg-ink"
                >
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* ---------- everything included ---------- */}
      <Reveal className="mt-[clamp(2.5rem,5vw,4rem)] on-ink p-[clamp(1.5rem,3.5vw,2.75rem)]">
        <p className="mono text-acid">QUÉ INCLUYEN TODOS NUESTROS PLANES</p>
        <ul className="mt-5 grid gap-x-8 gap-y-2.5 sm:grid-cols-2 lg:grid-cols-4">
          {planEssentials.map((item) => (
            <li
              key={item}
              className="relative pl-4 text-[0.925rem] leading-[1.5] text-ink-text before:absolute before:left-0 before:top-[0.55em] before:size-1.5 before:bg-acid"
            >
              {item}
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal
        className="mt-8 flex flex-col items-start justify-between gap-7 border-t border-paper-line pt-6 md:flex-row md:items-center"
        delay={0.08}
      >
        <p className="max-w-[58ch] text-[0.875rem] leading-[1.55] text-paper-text">
          {pricingNote}
        </p>
        <QuoteButton
          service="PLANES DE CONTENIDO"
          label="COTIZAR MI PLAN"
          className="btn-ink shrink-0"
        />
      </Reveal>
    </Chapter>
  );
}

function PriceCell({
  label,
  value,
  highlighted,
}: {
  label: string;
  value: string;
  highlighted?: boolean;
}) {
  return (
    <div
      className={`mt-6 md:mt-0 md:pl-6 ${
        highlighted ? "md:border-l md:border-ink/25" : "md:border-l md:border-paper-line"
      }`}
    >
      <span className="mono block text-graphite md:hidden">{label}</span>
      <span className="disp tabular mt-1.5 block text-[clamp(1.5rem,4.6vw,2.9rem)] leading-none md:mt-0">
        {value}
      </span>
      <span className="mono mt-1.5 block text-graphite">COP</span>
    </div>
  );
}
