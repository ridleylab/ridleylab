import { ImageResponse } from "next/og";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";
export const alt = "RidleyLab - Pelatihan AI Social Media Marketing Bisnis Jasa";

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
          backgroundColor: "#09090b",
          color: "#fafafa",
          padding: "64px 72px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle monochrome grid accent */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "24px",
            display: "flex",
          }}
        />

        {/* Top header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "14px",
            }}
          >
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "10px",
                backgroundColor: "#fafafa",
                color: "#09090b",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "22px",
              }}
            >
              R
            </div>
            <span
              style={{
                fontSize: "28px",
                fontWeight: 700,
                letterSpacing: "-0.02em",
              }}
            >
              RidleyLab
            </span>
          </div>

          <div
            style={{
              display: "flex",
              padding: "8px 18px",
              borderRadius: "9999px",
              border: "1px solid rgba(255,255,255,0.2)",
              fontSize: "16px",
              color: "#d4d4d8",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            AI Marketing Lab
          </div>
        </div>

        {/* Main copy */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "22px",
            maxWidth: "960px",
            position: "relative",
          }}
        >
          <div
            style={{
              fontSize: "58px",
              fontWeight: 700,
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "#ffffff",
            }}
          >
            Pelatihan AI Social Media Marketing Bisnis Jasa.
          </div>
          <div
            style={{
              fontSize: "24px",
              color: "#a1a1aa",
              lineHeight: 1.4,
            }}
          >
            Online Course · Online Mentoring · Offline Mentoring
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(255,255,255,0.12)",
            paddingTop: "24px",
            fontSize: "20px",
            color: "#a1a1aa",
            position: "relative",
          }}
        >
          <span>Sistem Konten, SOP Tim &amp; Alur Konversi Otomatis</span>
          <span style={{ color: "#ffffff", fontWeight: 600 }}>ridleylab.com</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
