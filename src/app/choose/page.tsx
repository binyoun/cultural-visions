"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function ChoosePage() {
  const [mouseX, setMouseX] = useState(0.5); // 0–1, normalized
  const [revealed, setRevealed] = useState<"hanoi" | "saigon" | null>(null);
  const router = useRouter();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouseX(e.clientX / window.innerWidth);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  // Divide shifts slightly with mouse — center is 50%, bias ±8%
  const divide = 50 + (mouseX - 0.5) * -16; // mouse left → Hanoi grows

  const hanoiHovered = revealed === "hanoi";
  const saigonHovered = revealed === "saigon";

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        cursor: "crosshair",
        overflow: "hidden",
        fontFamily: "'DM Serif Display', serif",
      }}
    >
      {/* ── Hanoi — left panel ────────────────────────────────── */}
      <div
        onClick={() => router.push("/archive/hanoi/")}
        onMouseEnter={() => setRevealed("hanoi")}
        onMouseLeave={() => setRevealed(null)}
        style={{
          position: "absolute",
          inset: 0,
          width: `${divide}%`,
          background: `
            radial-gradient(ellipse at 30% 50%, rgba(42,90,110,0.9) 0%, rgba(18,35,45,0.98) 70%),
            radial-gradient(ellipse at 70% 20%, rgba(55,110,140,0.4) 0%, transparent 50%)
          `,
          cursor: "pointer",
          transition: "width 0.15s ease",
          overflow: "hidden",
        }}
      >
        {/* Ink wash texture */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.08 }}
          aria-hidden
        >
          <filter id="noise-h">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-h)" />
        </svg>

        {/* Content — centered */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          {/* Chinese character watermark */}
          <div
            style={{
              fontSize: "clamp(60px, 10vw, 130px)",
              color: "#2a5a6e",
              opacity: hanoiHovered ? 0.15 : 0.08,
              lineHeight: 1,
              transition: "opacity 0.5s ease",
              position: "absolute",
              fontFamily: "serif",
            }}
          >
            河
          </div>

          <div
            style={{
              fontSize: "clamp(9px, 1vw, 12px)",
              letterSpacing: "0.4em",
              color: "rgba(180,220,235,0.45)",
              fontFamily: "'Courier New', monospace",
              transition: "opacity 0.4s",
              opacity: hanoiHovered ? 1 : 0.55,
            }}
          >
            HÀ NỘI
          </div>

          <div
            style={{
              fontSize: "clamp(36px, 5vw, 68px)",
              letterSpacing: "0.18em",
              color: "#b4dce8",
              lineHeight: 1,
              opacity: hanoiHovered ? 1 : 0.65,
              transition: "opacity 0.4s ease, transform 0.4s ease",
              transform: hanoiHovered ? "translateY(-4px)" : "translateY(0px)",
            }}
          >
            Hà Nội
          </div>

          <div
            style={{
              fontSize: "clamp(8px, 0.85vw, 11px)",
              letterSpacing: "0.28em",
              color: "rgba(180,220,235,0.4)",
              fontFamily: "'Courier New', monospace",
              fontStyle: "italic",
              opacity: hanoiHovered ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            河內 · enter →
          </div>
        </div>
      </div>

      {/* ── Saigon — right panel ───────────────────────────────── */}
      <div
        onClick={() => router.push("/archive/saigon/")}
        onMouseEnter={() => setRevealed("saigon")}
        onMouseLeave={() => setRevealed(null)}
        style={{
          position: "absolute",
          inset: 0,
          left: `${divide}%`,
          background: `
            radial-gradient(ellipse at 70% 50%, rgba(139,53,32,0.88) 0%, rgba(40,12,8,0.98) 70%),
            radial-gradient(ellipse at 20% 80%, rgba(160,70,35,0.35) 0%, transparent 50%)
          `,
          cursor: "pointer",
          transition: "left 0.15s ease",
          overflow: "hidden",
        }}
      >
        {/* Ink wash texture */}
        <svg
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.08 }}
          aria-hidden
        >
          <filter id="noise-s">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise-s)" />
        </svg>

        {/* Content — centered */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "16px",
          }}
        >
          {/* Chinese character watermark */}
          <div
            style={{
              fontSize: "clamp(60px, 10vw, 130px)",
              color: "#8b3520",
              opacity: saigonHovered ? 0.15 : 0.08,
              lineHeight: 1,
              transition: "opacity 0.5s ease",
              position: "absolute",
              fontFamily: "serif",
            }}
          >
            貢
          </div>

          <div
            style={{
              fontSize: "clamp(9px, 1vw, 12px)",
              letterSpacing: "0.4em",
              color: "rgba(235,180,155,0.45)",
              fontFamily: "'Courier New', monospace",
              transition: "opacity 0.4s",
              opacity: saigonHovered ? 1 : 0.55,
            }}
          >
            SÀI GÒN
          </div>

          <div
            style={{
              fontSize: "clamp(36px, 5vw, 68px)",
              letterSpacing: "0.18em",
              color: "#e8b090",
              lineHeight: 1,
              opacity: saigonHovered ? 1 : 0.65,
              transition: "opacity 0.4s ease, transform 0.4s ease",
              transform: saigonHovered ? "translateY(-4px)" : "translateY(0px)",
            }}
          >
            Sài Gòn
          </div>

          <div
            style={{
              fontSize: "clamp(8px, 0.85vw, 11px)",
              letterSpacing: "0.28em",
              color: "rgba(235,180,155,0.4)",
              fontFamily: "'Courier New', monospace",
              fontStyle: "italic",
              opacity: saigonHovered ? 1 : 0,
              transition: "opacity 0.4s ease",
            }}
          >
            西貢 · enter →
          </div>
        </div>
      </div>

      {/* ── Dividing line ─────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: `${divide}%`,
          width: "1px",
          background: "linear-gradient(to bottom, transparent 0%, rgba(242,228,192,0.12) 20%, rgba(242,228,192,0.22) 50%, rgba(242,228,192,0.12) 80%, transparent 100%)",
          pointerEvents: "none",
          transition: "left 0.15s ease",
        }}
      />

      {/* ── Back link ─────────────────────────────────────────── */}
      <div
        style={{
          position: "absolute",
          bottom: 28,
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Courier New', monospace",
          fontSize: "7px",
          color: "rgba(242,228,192,0.25)",
          letterSpacing: "0.25em",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        ← CULTURAL VISIONS
      </div>
    </div>
  );
}
