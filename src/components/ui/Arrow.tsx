import { clsx } from "@/lib/clsx";

/**
 * The brochure's own long arrow. It is part of the ISSUE 001 identity, drawn
 * with the same path and stroke weight as the printed pages.
 */
export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 12"
      className={clsx("block w-[2.6em] overflow-visible", className)}
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M0 6H37M30 .8L37 6l-7 5.2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      />
    </svg>
  );
}
