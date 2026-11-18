"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { Arrow } from "@/components/ui/Arrow";
import { Wordmark } from "@/components/ui/Wordmark";
import { contact, navItems, site } from "@/data/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Header() {
  const { scrollY } = useScroll();
  const reduce = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const lastY = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    setLifted(y > 24);
    // The masthead steps aside while reading down and returns on the way up.
    if (!menuOpen) {
      setHidden(y > lastY.current && y > 360);
    }
    lastY.current = y;
  });

  useEffect(() => {
    if (!menuOpen) return;
    const { body } = document;
    const previous = body.style.overflow;
    body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-40"
        animate={{ y: hidden && !reduce ? "-100%" : "0%" }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        <div
          className={`transition-colors duration-500 ${
            lifted || menuOpen
              ? "border-b border-paper-line bg-paper/95 backdrop-blur-sm"
              : "border-b border-transparent"
          }`}
        >
          <div className="shell flex h-16 items-center justify-between gap-6 md:h-[4.5rem]">
            <a
              href="#portada"
              className="flex min-h-11 shrink-0 items-center text-[1.45rem] leading-none md:text-[1.6rem]"
              aria-label={`${site.name}, ir al inicio`}
            >
              <Wordmark />
            </a>

            <nav aria-label="Secciones" className="hidden lg:block">
              <ul className="mono flex items-center gap-7 xl:gap-9">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className="ed-link">
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#contacto"
                className="btn btn-ink btn-sm hidden sm:inline-flex"
              >
                HABLEMOS
                <Arrow className="w-[1.9em]" />
              </a>

              <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
                aria-expanded={menuOpen}
                aria-controls="menu-editorial"
                className="mono flex min-h-11 items-center gap-2.5 px-1 lg:hidden"
              >
                {menuOpen ? "CERRAR" : "MENÚ"}
                <span aria-hidden="true" className="flex w-5 flex-col gap-[5px]">
                  <motion.span
                    className="block h-px w-full bg-current"
                    animate={{
                      rotate: menuOpen ? 45 : 0,
                      y: menuOpen ? 3 : 0,
                    }}
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                  <motion.span
                    className="block h-px w-full bg-current"
                    animate={{
                      rotate: menuOpen ? -45 : 0,
                      y: menuOpen ? -3 : 0,
                    }}
                    transition={{ duration: 0.3, ease: EASE }}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            id="menu-editorial"
            className="fixed inset-0 z-30 flex flex-col bg-paper pt-16 lg:hidden"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.28, ease: EASE }}
          >
            <nav
              aria-label="Secciones"
              className="shell flex flex-1 flex-col justify-center py-10"
            >
              <ul>
                {navItems.map((item, index) => (
                  <motion.li
                    key={item.href}
                    className="border-t border-paper-line"
                    initial={reduce ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: 0.05 + index * 0.05,
                      ease: EASE,
                    }}
                  >
                    <a
                      href={item.href}
                      onClick={() => setMenuOpen(false)}
                      className="disp flex items-baseline gap-4 py-4 text-[clamp(2.4rem,11vw,4rem)]"
                    >
                      <span className="mono shrink-0 self-start pt-2 text-graphite">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </nav>

            <div className="shell mono flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-paper-line py-6">
              <a href={contact.instagramUrl} className="ed-link" target="_blank" rel="noreferrer">
                {contact.instagram}
              </a>
              <a href={`mailto:${contact.email}`} className="ed-link">
                {contact.email}
              </a>
              <a
                href="#contacto"
                onClick={() => setMenuOpen(false)}
                className="btn btn-ink w-full"
              >
                HABLEMOS
                <Arrow className="w-[1.9em]" />
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
