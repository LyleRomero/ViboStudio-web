import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/** Favicon: acid square with the VIBO V mark. */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#D4F542",
          color: "#151515",
          fontSize: 42,
          fontWeight: 700,
          letterSpacing: "-0.06em",
          fontFamily: "Arial Black, Arial Narrow, sans-serif",
        }}
      >
        V
      </div>
    ),
    { ...size },
  );
}
