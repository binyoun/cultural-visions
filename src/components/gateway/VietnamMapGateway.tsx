"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";

export default function VietnamMapGateway() {
  const [phase, setPhase] = useState(0);
  const [mouseX, setMouseX] = useState(0.5);
  const [angle, setAngle] = useState(0);
  const compassRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const delays = [300, 850, 1350, 2000, 2750];
    const timers = delays.map((d, i) =>
      setTimeout(() => setPhase((p) => Math.max(p, i + 1)), d)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMouseX(e.clientX / window.innerWidth);
    if (!compassRef.current) return;
    const r = compassRef.current.getBoundingClientRect();
    const cx = r.left + r.width / 2;
    const cy = r.top + r.height / 2;
    setAngle(Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  const fadeIn = (p: number): React.CSSProperties => ({
    opacity: phase >= p ? 1 : 0,
    transform: phase >= p ? "translateY(0px)" : "translateY(12px)",
    transition: "opacity 1.1s ease, transform 1.1s ease",
  });

  const hanoiWeight  = 1 - mouseX;
  const saigonWeight = mouseX;

  // +120% intensified smoke
  const hanoiOpacity  = Math.min(1, (0.35 + hanoiWeight  * 0.75) * 2.2);
  const saigonOpacity = Math.min(1, (0.35 + saigonWeight * 0.75) * 2.2);

  const hanoiColor  = `rgba(155, 185, 214, ${0.2 + hanoiWeight  * 0.8})`;
  const saigonColor = `rgba(224, 184, 132, ${0.2 + saigonWeight * 0.8})`;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "var(--bg)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        cursor: "crosshair",
        position: "relative",
        overflow: "hidden",
      }}
    >

      {/* Hanoi smoke — bottom left */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: hanoiOpacity, transition: "opacity 0.3s ease" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 126% 98% at 8% 108%, rgba(66, 98, 130, 0.85) 0%, rgba(38, 58, 78, 0.4) 42%, transparent 68%)",
          filter: "blur(45px)",
          animation: "smokeHanoi 10s ease-in-out infinite",
          transformOrigin: "8% 100%",
        }} />
      </div>

      {/* Saigon smoke — bottom right */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none", opacity: saigonOpacity, transition: "opacity 0.3s ease" }}>
        <div style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse 126% 98% at 92% 108%, rgba(152, 104, 66, 0.85) 0%, rgba(96, 62, 36, 0.4) 42%, transparent 68%)",
          filter: "blur(45px)",
          animation: "smokeSaigon 12s ease-in-out infinite",
          transformOrigin: "92% 100%",
        }} />
      </div>

      {/* Honored — top right */}
      <div className="absolute top-7 right-8 z-20" style={fadeIn(5)}>
        <Link href="/honored/" className="hover:opacity-70 transition-opacity"
          style={{ fontFamily: "var(--mono)", fontSize: "0.62rem", color: "var(--accent)", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none" }}>
          + Honored +
        </Link>
      </div>

      {/* Central content */}
      <div style={{ textAlign: "center", userSelect: "none", position: "relative", zIndex: 1, padding: "0 24px" }}>

        {/* Title — backlit lettering */}
        <div style={{
          ...fadeIn(1),
          fontFamily: "var(--serif)",
          fontWeight: 400,
          fontSize: "clamp(26px, 4.4vw, 58px)",
          letterSpacing: "0.24em",
          textTransform: "uppercase",
          color: "rgba(214, 198, 172, 0.88)",
          textShadow: "0 -1px 1px rgba(0,0,0,0.55), 0 1px 0 rgba(232,216,190,0.12), var(--backlit)",
          marginBottom: "16px",
        }}>
          Cultural Visions
        </div>

        {/* Subtitle */}
        <div style={{ ...fadeIn(2), fontFamily: "var(--mono)", fontSize: "clamp(10px, 1.2vw, 14px)", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--text)", marginBottom: "7px" }}>
          Curatorial Photography Archive
        </div>

        {/* Vietnamese */}
        <div style={{ ...fadeIn(2), fontFamily: "var(--mono)", fontSize: "clamp(9px, 1vw, 12px)", letterSpacing: "0.28em", color: "var(--text-dim)", fontStyle: "italic", marginBottom: "6px" }}>
          Triển Lãm Ảnh Nghệ Thuật
        </div>

        {/* Institution */}
        <div style={{ ...fadeIn(3), fontFamily: "var(--mono)", fontSize: "clamp(7px, 0.7vw, 9px)", letterSpacing: "0.3em", color: "var(--text-dim)", opacity: 0.7, marginBottom: "48px" }}>
          RMIT UNIVERSITY VIETNAM
        </div>

        {/* Compass — no cardinal letters */}
        <div ref={compassRef} style={{ ...fadeIn(4), marginBottom: "52px", display: "inline-block" }}>
          <svg width="100" height="100" viewBox="0 0 100 100" style={{ overflow: "visible" }}>
            <circle cx="50" cy="50" r="46" fill="none" stroke="#c8956c" strokeWidth="0.4" opacity="0.25" />
            <circle cx="50" cy="50" r="38" fill="none" stroke="#c8956c" strokeWidth="0.3" opacity="0.14" />

            {Array.from({ length: 16 }, (_, i) => {
              const deg = i * 22.5;
              const rad = (deg - 90) * Math.PI / 180;
              const isCardinal = i % 4 === 0;
              const r1 = isCardinal ? 37 : 41;
              return (
                <line key={i}
                  x1={50 + r1 * Math.cos(rad)} y1={50 + r1 * Math.sin(rad)}
                  x2={50 + 45 * Math.cos(rad)} y2={50 + 45 * Math.sin(rad)}
                  stroke="#c8956c" strokeWidth={isCardinal ? 1 : 0.5}
                  opacity={isCardinal ? 0.5 : 0.2}
                />
              );
            })}

            {/* Needle */}
            <g transform={`rotate(${angle}, 50, 50)`} style={{ transition: "transform 0.05s linear" }}>
              <polygon points="50,13 46.5,50 50,44 53.5,50" fill="#c8956c" opacity="0.9" />
              <polygon points="50,87 46.5,50 50,56 53.5,50" fill="#545b66" opacity="0.45" />
            </g>

            <circle cx="50" cy="50" r="3"   fill="#c8956c" opacity="0.6" />
            <circle cx="50" cy="50" r="1.2" fill="#eef1f5" opacity="0.85" />
          </svg>
        </div>

        {/* City links — responsive: column on mobile, row on sm+ */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-y-4 sm:gap-y-0"
          style={fadeIn(5)}
        >
          <Link href="/archive/hanoi/" style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(13px, 1.6vw, 20px)",
              letterSpacing: "0.45em",
              color: hanoiColor,
              transition: "color 0.2s ease",
              textShadow: hanoiWeight > 0.6 ? `0 0 40px rgba(124,156,186,${(hanoiWeight - 0.6) * 1.5})` : "none",
            }}>
              HÀ NỘI
            </span>
          </Link>

          {/* Divider — hidden on mobile */}
          <div className="hidden sm:flex items-center" style={{ gap: "10px", margin: "0 14px" }}>
            <span style={{ color: "var(--line)", fontSize: "9px" }}>·</span>
            <div style={{ width: "36px", height: "0.5px", background: "var(--line)" }} />
            <span style={{ fontSize: "9px", color: "var(--accent)", opacity: 0.4 }}>✦</span>
            <div style={{ width: "36px", height: "0.5px", background: "var(--line)" }} />
            <span style={{ color: "var(--line)", fontSize: "9px" }}>·</span>
          </div>

          {/* Mobile divider */}
          <div className="flex sm:hidden items-center" style={{ gap: "8px" }}>
            <div style={{ width: "24px", height: "0.5px", background: "var(--line)" }} />
            <span style={{ fontSize: "9px", color: "var(--accent)", opacity: 0.5 }}>✦</span>
            <div style={{ width: "24px", height: "0.5px", background: "var(--line)" }} />
          </div>

          <Link href="/archive/saigon/" style={{ textDecoration: "none" }}>
            <span style={{
              fontFamily: "var(--serif)",
              fontSize: "clamp(13px, 1.6vw, 20px)",
              letterSpacing: "0.45em",
              color: saigonColor,
              transition: "color 0.2s ease",
              textShadow: saigonWeight > 0.6 ? `0 0 40px rgba(200,149,108,${(saigonWeight - 0.6) * 1.5})` : "none",
            }}>
              SÀI GÒN
            </span>
          </Link>
        </div>

      </div>

      {/* Coordinates */}
      <div style={{
        position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
        fontFamily: "var(--mono)", fontSize: "7px", color: "var(--text-dim)",
        letterSpacing: "0.28em", opacity: phase >= 5 ? 0.55 : 0,
        transition: "opacity 1.8s ease", whiteSpace: "nowrap", pointerEvents: "none",
      }}>
        14°03′N · 108°17′E
      </div>

    </div>
  );
}
