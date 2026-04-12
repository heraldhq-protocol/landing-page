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
        {/* Subtle Background Glow */}
        <div
          style={{
            position: "absolute",
            top: "-20%",
            left: "-10%",
            width: "600px",
            height: "600px",
            background: "radial-gradient(circle, rgba(0, 200, 150, 0.15) 0%, transparent 70%)",
            borderRadius: "50%",
            filter: "blur(60px)",
          }}
        />

        {/* Herald Logo / Brand */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginBottom: "40px",
          }}
        >
          <img
            src="https://ucshdejvxzanuxlxrano.supabase.co/storage/v1/object/public/herald-public-asset/herald-logo.svg"
            alt="Herald Logo"
            width="60"
            height="60"
          />
          <span
            style={{
              fontSize: "32px",
              fontWeight: 700,
              color: "#F0F6FF",
              letterSpacing: "-0.02em",
            }}
          >
            Herald Docs
          </span>
        </div>

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            maxWidth: "900px",
          }}
        >
          <span
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#00C896",
              lineHeight: 1.1,
              letterSpacing: "-0.04em",
            }}
          >
            {title}
          </span>
          {description && (
            <span
              style={{
                fontSize: "32px",
                fontWeight: 400,
                color: "#94A3B8",
                lineHeight: 1.4,
                marginTop: "10px",
              }}
            >
              {description}
            </span>
          )}
        </div>

        {/* Footer / Badge */}
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "80px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            padding: "8px 16px",
            backgroundColor: "rgba(0, 200, 150, 0.08)",
            border: "1px solid rgba(0, 200, 150, 0.2)",
            borderRadius: "99px",
          }}
        >
          <span style={{ color: "#00C896", fontSize: "18px", fontWeight: 600 }}>
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
