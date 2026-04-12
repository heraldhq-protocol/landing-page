import { ImageResponse } from "next/og";
import { source } from "@/lib/source";

export const runtime = "nodejs";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  const { slug } = await params;
  const page = source.getPage(slug);

  if (!page) {
    return new Response("Not Found", { status: 404 });
  }

  const title = page.data.title;
  const description = page.data.description;

  // Fetch logo and convert to base64 for reliable rendering in Satori
  const logoUrl = "https://ucshdejvxzanuxlxrano.supabase.co/storage/v1/object/public/herald-public-asset/herald-logo.svg";
  let logoDataUrl = "";
  try {
    const response = await fetch(logoUrl);
    const buffer = await response.arrayBuffer();
    const base64 = Buffer.from(buffer).toString("base64");
    logoDataUrl = `data:image/svg+xml;base64,${base64}`;
  } catch (e) {
    console.error("Failed to fetch logo for OG:", e);
  }

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          backgroundColor: "#040C18",
          padding: "80px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Herald Style Background Glow */}
        <div
          style={{
            position: "absolute",
            top: "-15%",
            left: "-5%",
            width: "800px",
            height: "800px",
            background: "radial-gradient(circle, rgba(0, 200, 150, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(80px)",
          }}
        />

        {/* Brand Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "20px",
            marginBottom: "60px",
          }}
        >
          {logoDataUrl ? (
            <img
              src={logoDataUrl}
              alt="Herald"
              style={{
                width: "72px",
                height: "72px",
              }}
            />
          ) : (
            <div
              style={{
                width: "72px",
                height: "72px",
                backgroundColor: "#00C896",
                borderRadius: "12px",
              }}
            />
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span
              style={{
                fontSize: "36px",
                fontWeight: 700,
                color: "#F0F6FF",
                letterSpacing: "-0.02em",
              }}
            >
              Herald Protocol
            </span>
            <span
              style={{
                fontSize: "18px",
                fontWeight: 500,
                color: "#00C896",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Documentation
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            maxWidth: "1000px",
          }}
        >
          <span
            style={{
              fontSize: "84px",
              fontWeight: 800,
              color: "#00C896",
              lineHeight: 1.05,
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </span>
          {description && (
            <span
              style={{
                fontSize: "36px",
                fontWeight: 400,
                color: "#94A3B8",
                lineHeight: 1.4,
                marginTop: "12px",
              }}
            >
              {description}
            </span>
          )}
        </div>

        {/* Security / Privacy Badge */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "80px",
            display: "flex",
            alignItems: "center",
            gap: "12px",
            padding: "10px 20px",
            backgroundColor: "rgba(0, 200, 150, 0.08)",
            border: "1px solid rgba(0, 200, 150, 0.2)",
            borderRadius: "12px",
          }}
        >
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "#00C896" }} />
          <span style={{ color: "#F0F6FF", fontSize: "16px", fontWeight: 600, letterSpacing: "0.05em" }}>
            ZERO-PII NOTIFICATIONS
          </span>
        </div>

        {/* Domain Badge */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
          }}
        >
          <span style={{ color: "#4A607A", fontSize: "22px", fontWeight: 500 }}>
            useherald.xyz
          </span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
