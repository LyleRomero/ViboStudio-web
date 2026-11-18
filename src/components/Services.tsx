"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Minus, Plus } from "lucide-react";
import { Arrow } from "@/components/ui/Arrow";
import { Chapter } from "@/components/ui/Chapter";
import { ChapterLabel } from "@/components/ui/ChapterLabel";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { serviceLines } from "@/data/services";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Chapter 03: the five service lines.
 *
 * A full-measure editorial list rather than five cards. On desktop the reader
 * sweeps the list and the plate on the right recomposes around whichever line
 * is under the cursor or keyboard focus. Below lg the same selection opens the
 * detail inline, so the section never depends on hover.
 */
export function Services() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const current = serviceLines[active];

  return (
    <Chapter id="servicios" surface="ink">
      <ChapterLabel number="03" title="WHAT WE DO" aside="05 LÍNEAS DE SERVICIO" />

      <Reveal className="mt-[clamp(2.5rem,6vw,4.5rem)]">
        <h2 className="disp max-w-[16ch] text-[clamp(2.3rem,7vw,6rem)]">
          LO QUE IMAGINAS.
          <br />
          LO HACEMOS <span className="mk">POSIBLE.</span>
        </h2>
      </Reveal>

      <div className="mt-[clamp(2.75rem,6vw,5rem)] grid gap-x-14 lg:grid-cols-12">
        <RevealGroup className="border-t border-ink-line lg:col-span-7" amount={0.1}>
          {serviceLines.map((service, index) => {
            const isActive = index === active;
            return (
              <RevealItem key={service.number} className="border-b border-ink-line">
                <button
                  type="button"
                  onMouseEnter={() => setActive(index)}
                  onFocus={() => setActive(index)}
                  onClick={() => setActive(index)}
                  aria-expanded={isActive}
                  aria-controls={`servicio-${service.number}`}
                  className="group grid w-full grid-cols-[2.6rem_1fr_auto] items-baseline gap-x-4 py-5 text-left md:grid-cols-[3.5rem_1fr_auto] md:py-7"
                >
                  <span
                    className={`mono transition-colors duration-300 ${
                      isActive ? "text-acid" : "text-ink-text"
                    }`}
                  >
                    {service.number}.
                  </span>

                  <span>
                    <span
                      className={`disp block text-[clamp(1.5rem,4.2vw,2.9rem)] transition-colors duration-300 ${
                        isActive ? "text-acid" : "text-paper"
                      }`}
                    >
                      {service.title}
                    </span>
                    <span className="mono mt-2 block text-ink-text lg:hidden">
                      {service.english}
                    </span>
                  </span>

                  <span className="self-center">
                    <Arrow
                      className={`hidden w-[2.4rem] text-acid transition-transform duration-500 lg:block ${
                        isActive ? "translate-x-1.5" : "-translate-x-1 opacity-35"
                      }`}
                    />
                    <span className="flex size-8 items-center justify-center border border-ink-line text-acid lg:hidden">
                      {isActive ? <Minus size={15} /> : <Plus size={15} />}
                    </span>
                  </span>
                </button>

                {/* Inline detail for touch and small screens. */}
                <div
                  id={`servicio-${service.number}`}
                  className={`service-drawer lg:hidden ${isActive ? "is-open" : ""}`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-6 pl-[3rem] pr-2">
                      <p className="max-w-[46ch] leading-[1.55] text-ink-text">
                        {service.description}
                      </p>
                      <ul className="mono mt-4 flex flex-wrap gap-x-3 gap-y-2">
                        {service.scope.map((item) => (
                          <li
                            key={item}
                            className="border border-ink-line px-2.5 py-1.5 text-acid"
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Contextual plate, desktop only. */}
        <div className="hidden lg:col-span-5 lg:block">
          <div className="sticky top-28 border-t border-ink-line pt-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.number}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 1 } : { opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <span className="disp block text-[9rem] leading-[0.78] text-acid xl:text-[11rem]">
                  {current.number}
                </span>
                <p className="mono mt-5 text-ink-text">{current.english}</p>
                <p className="mt-4 max-w-[34ch] text-[1.15rem] leading-[1.5]">
                  {current.description}
                </p>
                <ul className="mt-8 border-t border-ink-line">
                  {current.scope.map((item) => (
                    <li
                      key={item}
                      className="mono border-b border-ink-line py-3 text-ink-text"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </Chapter>
  );
}
