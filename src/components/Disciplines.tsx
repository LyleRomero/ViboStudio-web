import { Chapter } from "@/components/ui/Chapter";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { disciplines } from "@/data/disciplines";

/**
 * Chapter 02: the three perspectives.
 *
 * A three-column rule-separated spread on desktop, exactly as the brochure
 * sets it, collapsing to stacked plates on narrow screens. Creatividad keeps
 * the acid treatment it has in print.
 */
export function Disciplines() {
  return (
    <Chapter id="perspectivas" tight>
      <ChapterLabel number="02" title="OUR THINKING" aside="TRES DISCIPLINAS" />

      <div className="mt-[clamp(2.5rem,6vw,4.5rem)] grid gap-x-12 gap-y-6 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <h2 className="disp text-[clamp(2.4rem,7.4vw,6.5rem)]">
            TRES PERSPECTIVAS.
            <br />
            UNA VISIÓN.
          </h2>
        </Reveal>
      </div>

      <RevealGroup className="mt-[clamp(2.75rem,6vw,5rem)] border-t-2 border-ink md:grid md:grid-cols-3">
        {disciplines.map((discipline) => (
          <RevealItem
            key={discipline.number}
            className="flex flex-col border-t border-paper-line pt-5 first:border-t-0 md:border-l md:border-t-0 md:pl-6 md:pr-6 md:first:border-l-0 md:first:pl-0 md:last:pr-0 [&:not(:first-child)]:mt-7 md:[&:not(:first-child)]:mt-0"
          >
            <span className="mono text-graphite">{discipline.number} /</span>
            <h3 className="disp mt-4 text-[clamp(2rem,4.6vw,3.4rem)]">
              {discipline.accent ? (
                <span className="mk">{discipline.title}</span>
              ) : (
                discipline.title
              )}
            </h3>
            <p className="mono mt-2 text-graphite">{discipline.english}</p>
            <p className="mt-5 max-w-[34ch] text-[0.975rem] leading-[1.55] text-paper-text">
              {discipline.description}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Chapter>
  );
}
