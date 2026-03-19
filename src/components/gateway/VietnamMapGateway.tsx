"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const VIETNAM_PATH =
  "M 80,25 L 148,38 L 158,62 L 155,88 L 160,112 L 156,135 L 148,150 L 138,162 L 130,175 L 126,195 L 124,215 L 126,235 L 132,255 L 142,272 L 150,292 L 152,315 L 150,338 L 145,358 L 135,374 L 118,388 L 100,396 L 82,392 L 70,380 L 72,364 L 78,348 L 76,330 L 74,312 L 78,294 L 84,276 L 82,258 L 76,240 L 72,220 L 70,200 L 72,182 L 78,166 L 82,150 L 78,132 L 72,112 L 72,88 L 70,64 L 74,44 Z";

interface NodeDef {
  id: string;
  label: string;
  cx: number;
  cy: number;
  color: string;
  href: string;
}

const NODES: NodeDef[] = [
  {
    id: "hanoi",
    label: "HÀ NỘI",
    cx: 110,
    cy: 130,
    color: "#4a8f9e",
    href: "/archive/hanoi/",
  },
  {
    id: "saigon",
    label: "SÀI GÒN",
    cx: 135,
    cy: 355,
    color: "#b85c38",
    href: "/archive/saigon/",
  },
];

export default function VietnamMapGateway() {
  const router = useRouter();
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  return (
    <div className="fixed inset-0 bg-[#121212] flex items-center justify-center">
      <svg
        viewBox="0 0 200 450"
        className="h-[80vh] max-h-[700px] w-auto"
        style={{ overflow: "visible" }}
        aria-label="Map of Vietnam"
      >
        {/* Vietnam silhouette — watermark */}
        <path
          d={VIETNAM_PATH}
          fill="white"
          opacity="0.07"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.15"
        />

        {/* City nodes */}
        {NODES.map((node) => {
          const isHovered = hoveredNode === node.id;
          return (
            <g
              key={node.id}
              style={{ cursor: "pointer" }}
              onClick={() => router.push(node.href)}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              {/* Outer pulse ring */}
              <circle
                cx={node.cx}
                cy={node.cy}
                r={isHovered ? 10 : 8}
                fill="none"
                stroke={node.color}
                strokeWidth="1"
                opacity={isHovered ? 0.5 : 0.25}
                style={{
                  transition: "r 0.3s ease, opacity 0.3s ease",
                }}
              />
              {/* Core dot — animated */}
              <circle
                cx={node.cx}
                cy={node.cy}
                fill={node.color}
                opacity={isHovered ? 1 : 0.8}
                style={{
                  animation: "map-pulse 2.5s ease-in-out infinite",
                  filter: isHovered
                    ? `drop-shadow(0 0 6px ${node.color})`
                    : `drop-shadow(0 0 3px ${node.color})`,
                  transition: "opacity 0.3s ease, filter 0.3s ease",
                  r: isHovered ? "7" : "5",
                }}
              />
              {/* City label */}
              <text
                x={node.cx + 12}
                y={node.cy + 4}
                fill={node.color}
                fontSize="9"
                fontFamily="Inter, DM Sans, sans-serif"
                letterSpacing="0.15em"
                opacity={isHovered ? 1 : 0.5}
                style={{ transition: "opacity 0.3s ease", userSelect: "none" }}
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
