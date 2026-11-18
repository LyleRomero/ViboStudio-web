import Image from "next/image";
import { clsx } from "@/lib/clsx";

/**
 * Device frames for the portfolio captures.
 *
 * Screen aspect ratios match the source files exactly so nothing is stretched
 * or cropped: 720x1640 for the phone captures, 1893x951 for the desktop ones.
 */

export function PhoneMockup({
  src,
  alt,
  className,
  sizes = "(max-width: 767px) 44vw, (max-width: 1279px) 30vw, 20vw",
  priority = false,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={clsx(
        "device-phone relative w-full bg-[#141414] p-[2.4%] shadow-[0.35rem_0.5rem_0_var(--color-paper-line)]",
        className,
      )}
      style={{ aspectRatio: "720 / 1640" }}
    >
      <div className="device-screen-phone relative h-full w-full overflow-hidden bg-black">
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          loading={priority ? undefined : "lazy"}
          className="object-cover object-top"
        />
      </div>
    </div>
  );
}

export function LaptopMockup({
  src,
  alt,
  className,
  sizes = "(max-width: 767px) 92vw, (max-width: 1279px) 60vw, 46vw",
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  return (
    <div className={clsx("w-full", className)}>
      {/* Screen sits slightly inset so the base can read wider without
          escaping the shell on narrow viewports. */}
      <div className="mx-[2.5%] bg-[#2b2b28] p-[0.9%] pb-[1.6%]">
        <div
          className="relative w-full overflow-hidden bg-black"
          style={{ aspectRatio: "1893 / 951" }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            sizes={sizes}
            loading="lazy"
            className="object-cover object-top"
          />
        </div>
      </div>
      <div className="mx-auto h-[0.7vw] max-h-[0.6rem] min-h-[0.3rem] w-full bg-[#1f1f1d]" />
    </div>
  );
}
