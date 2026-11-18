import { clsx } from "@/lib/clsx";

/**
 * The VIBO lockup.
 *
 * The brochure compresses the Anton wordmark horizontally to 0.77. That ratio
 * is the logotype, so it travels with every instance instead of being re-tuned
 * per placement. The wrapper is sized in em against the measured advance width
 * of the compressed glyphs, which keeps the layout box honest.
 */

const COMPRESSION = 0.77;

/** Advance width of the uncompressed Anton string, in em. Measured in browser. */
const ADVANCE = {
  VIBO: 2.14,
  STUDIO: 3.14,
};

function Glyphs({
  text,
  advance,
  className,
}: {
  text: keyof typeof ADVANCE;
  advance: number;
  className?: string;
}) {
  return (
    <span
      className={clsx("disp block", className)}
      style={{ width: `${advance * COMPRESSION}em` }}
      aria-hidden="true"
    >
      <span
        className="block origin-left"
        style={{
          width: "max-content",
          transform: `scaleX(${COMPRESSION})`,
        }}
      >
        {text}
      </span>
    </span>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={clsx("inline-flex items-baseline gap-[0.22em]", className)}>
      <Glyphs text="VIBO" advance={ADVANCE.VIBO} />
      <Glyphs
        text="STUDIO"
        advance={ADVANCE.STUDIO}
        className="text-[0.46em] leading-none"
      />
      <span className="sr-only">VIBO STUDIO</span>
    </span>
  );
}

/** The cover wordmark: VIBO alone, sized by its container. */
export function CoverWordmark({ className }: { className?: string }) {
  return (
    <span className={clsx("block", className)}>
      <Glyphs text="VIBO" advance={ADVANCE.VIBO} className="leading-[0.84]" />
    </span>
  );
}
