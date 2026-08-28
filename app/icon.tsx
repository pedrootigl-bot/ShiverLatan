import { ImageResponse } from "next/og";

export const size = {
  width: 32,
  height: 32,
};

export const contentType = "image/png";

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
          background: "linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)",
          color: "white",
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "-0.04em",
        }}
      >
        S
      </div>
    ),
    { ...size },
  );
}
