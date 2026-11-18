import type { ReactNode } from "react";
import { clsx } from "@/lib/clsx";

type Surface = "paper" | "ink" | "acid";

const surfaces: Record<Surface, string> = {
  paper: "",
  ink: "on-ink",
  acid: "on-acid",
};

/**
 * One chapter of the issue. The surface alternates between paper and ink the
 * way the printed pages do, which is what gives the scroll its rhythm.
 */
export function Chapter({
  id,
  surface = "paper",
  children,
  className,
  tight = false,
}: {
  id?: string;
  surface?: Surface;
  children: ReactNode;
  className?: string;
  tight?: boolean;
}) {
  return (
    <section
      id={id}
      className={clsx(
        surfaces[surface],
        tight
          ? "py-[clamp(3.5rem,7vw,6rem)]"
          : "py-[clamp(4.5rem,9vw,8.5rem)]",
        className,
      )}
    >
      <div className="shell">{children}</div>
    </section>
  );
}
