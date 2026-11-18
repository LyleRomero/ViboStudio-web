import { clsx } from "@/lib/clsx";

/**
 * The running head of each chapter. ISSUE 001 numbers its sections, so the
 * landing keeps the same device: number, title, and a hairline across the page.
 */
export function ChapterLabel({
  number,
  title,
  aside,
  className,
}: {
  number: string;
  title: string;
  aside?: string;
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "mono flex items-baseline justify-between gap-6 border-t border-current/25 pt-3",
        className,
      )}
    >
      <span className="flex items-baseline gap-3">
        <span className="chip">{number}</span>
        <span>{title}</span>
      </span>
      {aside ? (
        <span className="hidden text-right opacity-60 sm:block">{aside}</span>
      ) : null}
    </div>
  );
}
