"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const VIETNAM_PATH =
  "M 80,25 L 148,38 L 158,62 L 155,88 L 160,112 L 156,135 L 148,150 L 138,162 L 130,175 L 126,195 L 124,215 L 126,235 L 132,255 L 142,272 L 150,292 L 152,315 L 150,338 L 145,358 L 135,374 L 118,388 L 100,396 L 82,392 L 70,380 L 72,364 L 78,348 L 76,330 L 74,312 L 78,294 L 84,276 L 82,258 L 76,240 L 72,220 L 70,200 L 72,182 L 78,166 L 82,150 L 78,132 L 72,112 L 72,88 L 70,64 L 74,44 Z";

// Auspicious cloud motif (祥云 inspired)
function AuspiciousCloud({
  cx, cy, scale = 1, opacity = 0.35,
}: { cx: number; cy: number; scale?: number; opacity?: number }) {
  return (
    <g transform={`translate(${cx}, ${cy}) scale(${scale})`} opacity={opacity} fill="#7a1515">
      <ellipse cx={0}   cy={0}  rx={14} ry={8} />
      <ellipse cx={-10} cy={4}  rx={9}  ry={6} />
      <ellipse cx={10}  cy={4}  rx={9}  ry={6} />
      <ellipse cx={-18} cy={7}  rx={6}  ry={5} />
      <ellipse cx={18}  cy={7}  rx={6}  ry={5} />
      <path d="M-22,9 Q-26,14 -22,16" stroke="#7a1515" strokeWidth={1} fill="none" opacity={0.6} />
      <path d="M22,9 Q26,14 22,16"   stroke="#7a1515" strokeWidth={1} fill="none" opacity={0.6} />
    </g>
  );
}

// Traditional wave row
function WaveRow({ y, opacity = 0.3 }: { y: number; opacity?: number }) {
  return (
    <path
      d={`M15,${y} Q28,${y - 6} 41,${y} Q54,${y + 6} 67,${y} Q80,${y - 6} 93,${y} Q106,${y + 6} 119,${y} Q132,${y - 6} 145,${y} Q158,${y + 6} 171,${y} Q184,${y - 6} 197,${y}`}
      stroke="#7a1515"
      strokeWidth={1}
      fill="none"
      opacity={opacity}
    />
  );
}

// Decorative corner mark
function CornerMark({ x, y, rotation }: { x: number; y: number; rotation: number }) {
  return (
    <g
      transform={`translate(${x}, ${y}) rotate(${rotation})`}
      stroke="#7a1515"
      strokeWidth={0.9}
      fill="none"
      opacity={0.5}
    >
      <path d="M0,0 L10,0" />
      <path d="M0,0 L0,10" />
      <circle cx={4} cy={4} r={1.8} fill="#7a1515" />
    </g>
  );
}

// Wax seal — clickable city node
function CitySeal({
  cx, cy, label, sublabel, isHovered, onClick, onMouseEnter, onMouseLeave,
}: {
  cx: number; cy: number;
  label: string; sublabel: string;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <g
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ cursor: "pointer" }}
    >
      {/* Hover glow ring */}
      <circle cx={cx} cy={cy} r={28} fill="#7a1515" opacity={isHovered ? 0.18 : 0} />
      {/* Seal body */}
      <circle cx={cx} cy={cy} r={20} fill="#7a1515" opacity={isHovered ? 1 : 0.88} />
      {/* Inner decorative ring */}
      <circle cx={cx} cy={cy} r={17} fill="none" stroke="#f2e4c0" strokeWidth={0.8} opacity={0.6} />
      {/* Diamond mark */}
      <rect
        x={cx - 5} y={cy - 5}
        width={10} height={10}
        transform={`rotate(45, ${cx}, ${cy})`}
        fill="none"
        stroke="#f2e4c0"
        strokeWidth={0.8}
        opacity={0.45}
      />
      {/* Crosshair lines */}
      <line x1={cx - 9} y1={cy} x2={cx + 9} y2={cy} stroke="#f2e4c0" strokeWidth={0.5} opacity={0.35} />
      <line x1={cx} y1={cy - 9} x2={cx} y2={cy + 9} stroke="#f2e4c0" strokeWidth={0.5} opacity={0.35} />
      {/* City name */}
      <text
        x={cx} y={cy + 31}
        textAnchor="middle"
        fill="#7a1515"
        fontSize={7}
        fontFamily="'DM Serif Display', Georgia, serif"
        letterSpacing={1.5}
        fontStyle="italic"
        opacity={isHovered ? 1 : 0.8}
      >
        {label}
      </text>
      <text
        x={cx} y={cy + 40}
        textAnchor="middle"
        fill="#8a6040"
        fontSize={5.5}
        fontFamily="'DM Sans', sans-serif"
        letterSpacing={0.5}
        opacity={isHovered ? 0.8 : 0.5}
      >
        {sublabel}
      </text>
    </g>
  );
}

// Cartographic compass rose
function CompassRose() {
  return (
    <svg
      viewBox="-50 -65 100 130"
      style={{ width: "80px", height: "104px" }}
      aria-hidden="true"
    >
      <g stroke="#4a2c1a" fill="#4a2c1a" opacity="0.75">
        {/* N — tall cardinal point */}
        <polygon points="0,-42 4.5,-18 0,-25 -4.5,-18" />
        {/* S */}
        <polygon points="0,42 4.5,18 0,25 -4.5,18" />
        {/* E — shorter cardinal point */}
        <polygon points="32,0 14,3.5 20,0 14,-3.5" />
        {/* W */}
        <polygon points="-32,0 -14,3.5 -20,0 -14,-3.5" />
        {/* NE diagonal */}
        <polygon points="20,-20 14,-10 4,-4 10,-14" fill="#7a1515" opacity="0.55" />
        {/* NW diagonal */}
        <polygon points="-20,-20 -10,-14 -4,-4 -14,-10" fill="#7a1515" opacity="0.55" />
        {/* SE diagonal */}
        <polygon points="20,20 14,10 4,4 10,14" fill="#7a1515" opacity="0.55" />
        {/* SW diagonal */}
        <polygon points="-20,20 -10,16 -4,4 -16,10" fill="#7a1515" opacity="0.55" />
        {/* Center rings */}
        <circle cx="0" cy="0" r="9"   fill="none" stroke="#7a1515" strokeWidth="1" />
        <circle cx="0" cy="0" r="5"   fill="#7a1515" />
        <circle cx="0" cy="0" r="2.5" fill="#f2e4c0" />
        {/* Outer decorative ring */}
        <circle cx="0" cy="0" r="37" fill="none" strokeWidth="0.5" opacity="0.3" />
        {/* Cardinal labels */}
        <text x="0"   y="-50" textAnchor="middle" fontSize="8" fontFamily="'DM Serif Display', serif" fill="#4a2c1a">N</text>
        <text x="0"   y="58"  textAnchor="middle" fontSize="8" fontFamily="'DM Serif Display', serif" fill="#4a2c1a">S</text>
        <text x="40"  y="3"   textAnchor="middle" fontSize="8" fontFamily="'DM Serif Display', serif" fill="#4a2c1a">E</text>
        <text x="-40" y="3"   textAnchor="middle" fontSize="8" fontFamily="'DM Serif Display', serif" fill="#4a2c1a">W</text>
      </g>
    </svg>
  );
}

export default function VietnamMapGateway() {
  const router = useRouter();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pt-14 pb-10 px-4">
      {/* Page title */}
      <div className="text-center mb-7">
        <p
          className="text-[9px] tracking-[0.45em] uppercase"
          style={{ color: "#8a6040" }}
        >
          RMIT University Vietnam
        </p>
        <h1
          className="font-serif text-2xl tracking-[0.3em] uppercase mt-1"
          style={{ color: "#7a1515" }}
        >
          Cultural Visions
        </h1>
        <p
          className="text-[9px] tracking-[0.2em] mt-0.5 font-light italic"
          style={{ color: "#8a6040" }}
        >
          Triển Lãm Ảnh Nghệ Thuật
        </p>
      </div>

      {/* Card + Compass */}
      <div className="relative flex items-center gap-6 sm:gap-10">

        {/* The envelope card — red meander frame → inner parchment */}
        <div
          style={{
            padding: "16px",
            background: "#7a1515",
            backgroundImage: `
              repeating-linear-gradient(90deg, rgba(0,0,0,0.11) 0px, rgba(0,0,0,0.11) 1px, transparent 1px, transparent 8px),
              repeating-linear-gradient(0deg,  rgba(0,0,0,0.11) 0px, rgba(0,0,0,0.11) 1px, transparent 1px, transparent 8px)
            `,
            boxShadow:
              "0 14px 55px rgba(122, 21, 21, 0.38), 0 4px 14px rgba(0,0,0,0.18)",
          }}
        >
          {/* Inner parchment map area */}
          <div
            style={{
              width: "220px",
              height: "400px",
              background: "#f8f0d8",
              backgroundImage: `
                radial-gradient(ellipse at 30% 15%, rgba(180,140,60,0.2) 0%, transparent 45%),
                radial-gradient(ellipse at 70% 85%, rgba(160,120,40,0.15) 0%, transparent 45%)
              `,
            }}
          >
            <svg
              viewBox="0 0 200 450"
              style={{ width: "100%", height: "100%" }}
              aria-label="Map of Vietnam — select a campus to enter"
            >
              {/* Corner marks */}
              <CornerMark x={12}  y={12}  rotation={0}   />
              <CornerMark x={188} y={12}  rotation={90}  />
              <CornerMark x={12}  y={438} rotation={270} />
              <CornerMark x={188} y={438} rotation={180} />

              {/* Auspicious clouds */}
              <AuspiciousCloud cx={48}  cy={38} scale={0.65} opacity={0.32} />
              <AuspiciousCloud cx={158} cy={62} scale={0.55} opacity={0.25} />

              {/* Vietnam country outline */}
              <path
                d={VIETNAM_PATH}
                fill="rgba(122, 21, 21, 0.07)"
                stroke="#4a2c1a"
                strokeWidth={1.2}
                strokeLinejoin="round"
              />

              {/* Hanoi seal */}
              <CitySeal
                cx={110} cy={130}
                label="HÀ NỘI"
                sublabel="Hanoi Campus"
                isHovered={hoveredNode === "hanoi"}
                onClick={() => router.push("/archive/hanoi/")}
                onMouseEnter={() => setHoveredNode("hanoi")}
                onMouseLeave={() => setHoveredNode(null)}
              />

              {/* Saigon seal */}
              <CitySeal
                cx={130} cy={355}
                label="SÀI GÒN"
                sublabel="Saigon Campus"
                isHovered={hoveredNode === "saigon"}
                onClick={() => router.push("/archive/saigon/")}
                onMouseEnter={() => setHoveredNode("saigon")}
                onMouseLeave={() => setHoveredNode(null)}
              />

              {/* Waves at bottom */}
              <WaveRow y={415} opacity={0.28} />
              <WaveRow y={424} opacity={0.16} />

              {/* Prompt */}
              <text
                x={100} y={442}
                textAnchor="middle"
                fontSize={5.5}
                fontFamily="'DM Serif Display', serif"
                fill="#8a6040"
                letterSpacing={1}
                opacity={0.65}
              >
                SELECT A CAMPUS
              </text>
            </svg>
          </div>
        </div>

        {/* Compass rose — right side, hidden on very small screens */}
        <div className="hidden sm:block">
          <CompassRose />
        </div>
      </div>
    </div>
  );
}
