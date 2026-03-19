"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

// ── Floating cloud (祥云 inspired) ──────────────────────────────────────
function Cloud({ style }: { style: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 80 44"
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      <g fill="#7a1515">
        <ellipse cx="40" cy="20" rx="36" ry="18" opacity="0.42" />
        <ellipse cx="17" cy="27" rx="22" ry="14" opacity="0.42" />
        <ellipse cx="63" cy="27" rx="22" ry="14" opacity="0.42" />
        <ellipse cx="3"  cy="33" rx="10" ry="8"  opacity="0.36" />
        <ellipse cx="77" cy="33" rx="10" ry="8"  opacity="0.36" />
      </g>
    </svg>
  );
}

// ── Floating wave ────────────────────────────────────────────────────────
function Wave({ style }: { style: React.CSSProperties }) {
  return (
    <svg
      viewBox="0 0 90 26"
      style={{ position: "absolute", pointerEvents: "none", ...style }}
    >
      <path
        d="M0,13 Q15,5 30,13 Q45,21 60,13 Q75,5 90,13"
        stroke="#7a1515" strokeWidth="1.6" fill="none" opacity="0.52"
      />
      <path
        d="M0,20 Q15,12 30,20 Q45,28 60,20 Q75,12 90,20"
        stroke="#7a1515" strokeWidth="1" fill="none" opacity="0.32"
      />
    </svg>
  );
}

// ── Compass rose with live needle ────────────────────────────────────────
function LiveCompass({ angle }: { angle: number }) {
  return (
    <svg viewBox="-45 -55 90 110" width="78" height="96" aria-hidden="true">
      <g stroke="#4a2c1a" fill="#4a2c1a">
        {/* Outer ring */}
        <circle cx="0" cy="0" r="38" fill="none" strokeWidth="0.6" opacity="0.32" />
        {/* Tick marks */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
          const w   = deg % 90 === 0 ? 0.9 : 0.5;
          const rad = (deg * Math.PI) / 180;
          return (
            <line
              key={deg}
              x1={Math.sin(rad) * 30} y1={-Math.cos(rad) * 30}
              x2={Math.sin(rad) * 36} y2={-Math.cos(rad) * 36}
              strokeWidth={w} opacity="0.5"
            />
          );
        })}
        {/* Cardinal labels */}
        <text x="0"   y="-42" textAnchor="middle" fontSize="7" fontFamily="'DM Serif Display',serif">N</text>
        <text x="0"   y="48"  textAnchor="middle" fontSize="7" fontFamily="'DM Serif Display',serif">S</text>
        <text x="44"  y="3"   textAnchor="middle" fontSize="7" fontFamily="'DM Serif Display',serif">E</text>
        <text x="-44" y="3"   textAnchor="middle" fontSize="7" fontFamily="'DM Serif Display',serif">W</text>
      </g>

      {/* Rotating needle — tracks cursor */}
      <g
        style={{
          transform: `rotate(${angle}deg)`,
          transformBox: "view-box",
          transformOrigin: "center",
          transition: "transform 0.08s ease-out",
        }}
      >
        {/* North — red */}
        <polygon points="0,-28 3,-10 0,-16 -3,-10" fill="#7a1515" />
        {/* South — ink */}
        <polygon points="0,28 3,10 0,16 -3,10"    fill="#4a2c1a" opacity="0.6" />
      </g>

      {/* Center pivot */}
      <circle cx="0" cy="0" r="4"   fill="#7a1515" />
      <circle cx="0" cy="0" r="2"   fill="#f2e4c0" />
    </svg>
  );
}

// ── Main gateway ─────────────────────────────────────────────────────────
export default function VietnamMapGateway() {
  const router       = useRouter();
  const cardRef      = useRef<HTMLDivElement>(null);
  const compassRef   = useRef<HTMLDivElement>(null);

  const [tilt,        setTilt]        = useState({ x: 0, y: 0 });
  const [compassAngle, setCompassAngle] = useState(0);
  const [hoveredCity, setHoveredCity] = useState<"hanoi" | "saigon" | null>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    // Card 3D tilt
    if (cardRef.current) {
      const r  = cardRef.current.getBoundingClientRect();
      const nx = (e.clientX - r.left)  / r.width  - 0.5;
      const ny = (e.clientY - r.top)   / r.height - 0.5;
      setTilt({ x: ny * -6, y: nx * 6 });
    }
    // Compass needle toward cursor
    if (compassRef.current) {
      const r   = compassRef.current.getBoundingClientRect();
      const cx  = r.left + r.width  / 2;
      const cy  = r.top  + r.height / 2;
      const deg = Math.atan2(e.clientY - cy, e.clientX - cx) * (180 / Math.PI) + 90;
      setCompassAngle(deg);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [handleMouseMove]);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{ cursor: "crosshair" }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      {/* Ambient background shift on hover */}
      <div
        style={{
          position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0,
          transition: "background 0.6s ease",
          background:
            hoveredCity === "hanoi"
              ? "radial-gradient(ellipse at 35% 30%, rgba(42,90,110,0.09) 0%, transparent 60%)"
              : hoveredCity === "saigon"
              ? "radial-gradient(ellipse at 38% 75%, rgba(139,53,32,0.09) 0%, transparent 60%)"
              : "transparent",
        }}
      />

      {/* ── Index wordmark — top-left ─────────────────────────────────── */}
      <div
        className="absolute top-6 left-6 z-20 select-none"
        style={{ pointerEvents: "none" }}
      >
        <p style={{ fontFamily: "'DM Serif Display',serif", fontSize: "11px", color: "#7a1515", letterSpacing: "0.28em", textTransform: "uppercase" }}>
          Cultural Visions
        </p>
        <p style={{ fontSize: "8px", color: "#8a6040", letterSpacing: "0.18em", marginTop: "3px" }}>
          RMIT University Vietnam
        </p>
        <div style={{ width: "100%", height: "1px", background: "rgba(122,21,21,0.22)", margin: "5px 0" }} />
        <p style={{ fontSize: "7px", color: "#b09070", fontStyle: "italic", letterSpacing: "0.1em" }}>
          Triển Lãm Ảnh Nghệ Thuật
        </p>
      </div>

      {/* ── Nav index — top-right ─────────────────────────────────────── */}
      <div
        className="absolute top-6 right-6 z-20 flex flex-col items-end"
        style={{ gap: "7px" }}
      >
        <Link
          href="/honored/"
          style={{ fontSize: "9px", color: "#7a1515", letterSpacing: "0.22em", textTransform: "uppercase", textDecoration: "none", cursor: "pointer" }}
          className="hover:opacity-60 transition-opacity"
        >
          ★ Honored Works
        </Link>
        <div style={{ width: "32px", height: "1px", background: "rgba(122,21,21,0.2)" }} />
        <Link
          href="/archive/hanoi/"
          style={{ fontSize: "8px", color: "#4a2c1a", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", cursor: "pointer" }}
          className="hover:opacity-60 transition-opacity"
        >
          HÀ NỘI
        </Link>
        <Link
          href="/archive/saigon/"
          style={{ fontSize: "8px", color: "#4a2c1a", letterSpacing: "0.18em", textTransform: "uppercase", textDecoration: "none", cursor: "pointer" }}
          className="hover:opacity-60 transition-opacity"
        >
          SÀI GÒN
        </Link>
      </div>

      {/* ── Card — 3D tilt, city hotspots, floating elements ─────────── */}
      <div
        ref={cardRef}
        style={{
          position: "relative",
          display: "inline-block",
          zIndex: 1,
          transform: `perspective(1400px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transition: "transform 0.18s ease-out",
          transformStyle: "preserve-3d",
          willChange: "transform",
          filter: "drop-shadow(0 20px 60px rgba(122,21,21,0.18)) drop-shadow(0 4px 16px rgba(0,0,0,0.12))",
        }}
      >
        {/* The reference image — fill inside aspect-ratio container */}
        <div
          style={{
            position: "relative",
            /* Width = min(90vw, height-that-fills-84vh) to respect both axes */
            width: "min(90vw, calc(84vh * 2752 / 1536))",
            aspectRatio: "2752 / 1536",
          }}
        >
          <Image
            src="/gateway-card.png"
            alt="Cultural Visions — Vietnam Map"
            fill
            priority
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
            style={{ objectFit: "contain", userSelect: "none" }}
          />
        </div>

        {/* ── Hanoi hotspot — upper-center of envelope ── */}
        <div
          style={{
            position: "absolute",
            left: "26%", top: "19%",
            width: "13%", height: "18%",
            cursor: "pointer", zIndex: 10,
          }}
          onMouseEnter={() => setHoveredCity("hanoi")}
          onMouseLeave={() => setHoveredCity(null)}
          onClick={() => router.push("/archive/hanoi/")}
        >
          {hoveredCity === "hanoi" && (
            <div style={{
              position: "absolute", inset: "-35px",
              background: "radial-gradient(circle, rgba(42,90,110,0.2) 0%, transparent 68%)",
              borderRadius: "50%", pointerEvents: "none",
            }} />
          )}
        </div>

        {/* ── Saigon hotspot — lower map area ── */}
        <div
          style={{
            position: "absolute",
            left: "28%", top: "68%",
            width: "13%", height: "17%",
            cursor: "pointer", zIndex: 10,
          }}
          onMouseEnter={() => setHoveredCity("saigon")}
          onMouseLeave={() => setHoveredCity(null)}
          onClick={() => router.push("/archive/saigon/")}
        >
          {hoveredCity === "saigon" && (
            <div style={{
              position: "absolute", inset: "-35px",
              background: "radial-gradient(circle, rgba(139,53,32,0.2) 0%, transparent 68%)",
              borderRadius: "50%", pointerEvents: "none",
            }} />
          )}
        </div>

        {/* ── City name on hover ── */}
        {hoveredCity && (
          <div
            style={{
              position: "absolute",
              left:  hoveredCity === "hanoi" ? "18%" : "20%",
              top:   hoveredCity === "hanoi" ? "40%" : "88%",
              pointerEvents: "none", zIndex: 20,
              fontFamily: "'DM Serif Display',serif",
              fontSize: "clamp(10px, 1.1vw, 15px)",
              color: hoveredCity === "hanoi" ? "#2a5a6e" : "#8b3520",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              fontStyle: "italic",
              textShadow: "0 1px 10px rgba(248,240,216,0.9)",
            }}
          >
            {hoveredCity === "hanoi" ? "HÀ NỘI" : "SÀI GÒN"}
          </div>
        )}

        {/* ── Floating clouds — Hanoi ── */}
        {hoveredCity === "hanoi" && (
          <>
            <Cloud style={{ width: "7%",  left: "16%", top:  "7%", animation: "floatCloud 3.4s ease-in-out 0s    infinite" }} />
            <Cloud style={{ width: "5%",  left: "26%", top:  "3%", animation: "floatCloud 3.4s ease-in-out 0.55s infinite" }} />
            <Cloud style={{ width: "6%",  left: "35%", top:  "6%", animation: "floatCloud 3.4s ease-in-out 1.0s  infinite" }} />
            <Cloud style={{ width: "4%",  left: "12%", top: "15%", animation: "floatCloud 3.4s ease-in-out 0.25s infinite" }} />
          </>
        )}

        {/* ── Floating waves — Saigon ── */}
        {hoveredCity === "saigon" && (
          <>
            <Wave style={{ width: "13%", left: "14%", top: "83%", animation: "floatWave 2.9s ease-in-out 0s    infinite" }} />
            <Wave style={{ width: "11%", left: "28%", top: "87%", animation: "floatWave 2.9s ease-in-out 0.45s infinite" }} />
            <Wave style={{ width: "12%", left: "21%", top: "90%", animation: "floatWave 2.9s ease-in-out 0.8s  infinite" }} />
          </>
        )}
      </div>

      {/* ── Interactive compass — bottom-right corner ─────────────────── */}
      <div
        ref={compassRef}
        className="absolute bottom-7 right-7 z-20 select-none"
        style={{ opacity: 0.8, pointerEvents: "none" }}
      >
        <LiveCompass angle={compassAngle} />
      </div>
    </div>
  );
}
