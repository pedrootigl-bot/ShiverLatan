import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background: "#05070d",
          color: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "14px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #38bdf8 0%, #2563eb 100%)",
              fontSize: "24px",
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "0.18em",
              fontWeight: 700,
            }}
          >
            SHIVER
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: "64px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.03em",
            }}
          >
            Auxílio na hora de comprar e vender.
          </div>
          <div
            style={{
              marginTop: "24px",
              fontSize: "28px",
              color: "#8b93a7",
              maxWidth: "820px",
              lineHeight: 1.35,
            }}
          >
            Tendência, momentum e volatilidade em um só painel. A ferramenta
            da corretora Shiver auxilia — quem opera é você.
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
