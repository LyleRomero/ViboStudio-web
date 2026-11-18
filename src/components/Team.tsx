import { Chapter } from "@/components/ui/Chapter";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { team } from "@/data/team";

/**
 * Chapter 07: the people.
 *
 * No portraits were supplied, so the spread is set typographically: the names
 * carry the page at display scale, each tied to the discipline it anchors.
 * Nothing here claims a biography the studio has not written.
 */
export function Team() {
  return (
    <Chapter id="equipo" surface="ink">
      <ChapterLabel number="07" title="THE PEOPLE" aside="03 INTEGRANTES" />

      <Reveal className="mt-[clamp(2.5rem,6vw,4.5rem)]">
        <h2 className="disp text-[clamp(2.3rem,7vw,6rem)]">
          TRES MENTES.
          <br />
          UNA <span className="mk">DIRECCIÓN.</span>
        </h2>
      </Reveal>

      <RevealGroup
        className="mt-[clamp(3rem,7vw,5rem)] border-t border-ink-line"
        amount={0.12}
      >
        {team.map((member) => (
          <RevealItem
            key={member.number}
            className="grid grid-cols-[2.6rem_1fr] items-baseline gap-x-4 gap-y-2 border-b border-ink-line py-6 md:grid-cols-[4rem_minmax(0,1.4fr)_minmax(0,1fr)] md:py-8"
          >
            <span className="mono text-acid">{member.number}</span>
            <h3 className="disp text-[clamp(1.9rem,5.6vw,4rem)]">
              {member.name}
            </h3>
            <p className="col-start-2 text-ink-text md:col-start-3 md:text-right">
              {member.role}
              <span className="mono mt-2 block text-acid md:mt-1.5">
                {member.discipline}
              </span>
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </Chapter>
  );
}
