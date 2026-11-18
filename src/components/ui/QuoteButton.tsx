"use client";

import { Arrow } from "@/components/ui/Arrow";
import { clsx } from "@/lib/clsx";

export const PREFILL_EVENT = "vibo:prefill-service";

/**
 * Carries the chosen service through to the contact form instead of dropping
 * the reader at a blank field.
 */
export function QuoteButton({
  service,
  label,
  className,
}: {
  service: string;
  label: string;
  className?: string;
}) {
  return (
    <a
      href="#contacto"
      className={clsx("btn", className)}
      onClick={() => {
        window.dispatchEvent(
          new CustomEvent(PREFILL_EVENT, { detail: service }),
        );
      }}
    >
      {label}
      <Arrow className="w-[1.9em]" />
    </a>
  );
}
