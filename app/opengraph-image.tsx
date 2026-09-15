import { ImageResponse } from "next/og";

export const alt = "Control — gestão fiscal, caixa e financeiro em uma tela só";
export const size = { width: 1200, height: 630 };
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
          justifyContent: "center",
          padding: 80,
          background: "linear-gradient(158deg, #0B1F3A 0%, #0E2140 52%, #152A4D 100%)",
          color: "#ffffff",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "#E71962",
            }}
          />
          <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: -0.5 }}>
            Control
          </div>
        </div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            lineHeight: 1.1,
            maxWidth: 920,
            letterSpacing: -1,
          }}
        >
          Do balcão ao contador, sua empresa inteira em uma tela só.
        </div>
        <div
          style={{
            marginTop: 28,
            fontSize: 24,
            color: "#C7D0E2",
            maxWidth: 760,
            lineHeight: 1.4,
          }}
        >
          Emite nota, controla caixa e financeiro — e continua vendendo mesmo
          se a internet cair.
        </div>
      </div>
    ),
    size,
  );
}
