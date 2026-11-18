"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { Arrow } from "@/components/ui/Arrow";
import { CoverWordmark } from "@/components/ui/Wordmark";
import { site } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const cover: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.09, delayChildren: 0.12 } },
};

const plate: Variants = {
  hidden: { opacity: 0, y: 30 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

/**
 * Chapter 01: the cover.
 *
 * Built as the brochure's front page: running head, the compressed VIBO
 * wordmark at full measure, the STUDIO lockup with its tag, the claim, and the
 * three disciplines along the foot.
 */
export function EditorialHero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="portada"
      className="relative flex min-h-[100dvh] flex-col pt-16 md:pt-[4.5rem]"
    >
      {/* The acid edge that runs down the printed cover. */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 w-3 bg-acid md:w-[1.1rem]"
      />

      <motion.div
        className="shell relative flex flex-1 flex-col pr-[max(1.25rem,4.2vw)] md:pr-[max(2.5rem,5vw)]"
        variants={cover}
        initial={reduce ? false : "hidden"}
        animate="shown"
      >
        <motion.div
          variants={plate}
          className="mono flex items-baseline justify-between gap-4 border-b border-paper-line pb-3 pt-4 md:pt-5"
        >
          <span>{site.issue}</span>
          <span className="hidden sm:block">THE DIGITAL ISSUE</span>
          <span className="text-right">01 / 09</span>
        </motion.div>

        {/* The cover plate takes whatever height is left and centres in it. */}
        <div className="flex flex-1 flex-col justify-center py-[clamp(0.5rem,2.2vh,2.5rem)]">
          <motion.div variants={plate} className="cover-wordmark">
            <CoverWordmark className="cover-wordmark-size" />
          </motion.div>

          <motion.div
            variants={plate}
            className="mt-[clamp(0.25rem,1vh,1.1rem)] flex items-end justify-between gap-x-8 gap-y-4"
          >
            <span className="disp shrink-0 text-[clamp(2.25rem,11vw,9rem)] leading-[0.8]">
              STUDIO
            </span>
            <p className="mono max-w-[13rem] text-right leading-[1.55] sm:text-left">
              <span className="chip mb-1.5 inline-block">INDEPENDENT</span>
              <br />
              CREATIVE &amp; STRATEGIC
              <br />
              STUDIO
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={plate}
          className="flex flex-col justify-between gap-y-5 border-t border-paper-line pb-6 pt-4 md:flex-row md:items-end md:gap-x-10 md:pb-8 md:pt-5"
        >
          <h1 className="disp text-[clamp(1.9rem,5.2vw,4.25rem)] leading-[1]">
            ESTRATEGIA
            <br />
            QUE <span className="mk">TRANSFORMA.</span>
          </h1>

          <div className="flex items-end justify-between gap-6 md:gap-10">
            <div className="md:text-right">
              <p className="disp text-[clamp(0.95rem,1.8vw,1.5rem)] leading-[1.02]">
                TRES PERSPECTIVAS.
                <br />
                UNA VISIÓN.
              </p>
              <p className="mono mt-2.5 text-graphite">
                {site.disciplinesLine}
              </p>
            </div>

            <div className="flex shrink-0 items-end gap-5">
              <ScrollCue />
              <Arrow className="w-[2.2rem] md:w-[2.8rem]" />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/** A hairline that drips downward: the only looping motion on the page. */
function ScrollCue() {
  const reduce = useReducedMotion();

  return (
    <span
      aria-hidden="true"
      className="relative hidden h-10 w-px bg-paper-line sm:block"
    >
      <motion.span
        className="absolute inset-x-0 top-0 block h-3 bg-ink"
        initial={{ y: 0 }}
        animate={reduce ? { y: 0 } : { y: [0, 28, 28] }}
        transition={
          reduce
            ? undefined
            : { duration: 2.4, times: [0, 0.65, 1], repeat: Infinity, ease: EASE }
        }
      />
    </span>
  );
}
