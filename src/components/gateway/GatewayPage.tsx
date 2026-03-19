"use client";

import { useState, useRef, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import type { ArtworkWithArtist } from "@/lib/dataLoader";

type Phase = "gateway" | "split";

// Static layout for floating images — positions as % of viewport, depth 0=far 3=near
const FLOAT_LAYOUT = [
  { x: "6%",  y: "10%", w: 340, depth: 3, rotate: -1.5 },
  { x: "70%", y: "6%",  w: 220, depth: 1, rotate: 2.5  },
  { x: "40%", y: "5%",  w: 180, depth: 0, rotate: -3   },
  { x: "82%", y: "35%", w: 300, depth: 2, rotate: 1    },
  { x: "2%",  y: "52%", w: 260, depth: 1, rotate: 2    },
  { x: "55%", y: "68%", w: 200, depth: 0, rotate: -2   },
  { x: "20%", y: "72%", w: 320, depth: 3, rotate: 1.5  },
  { x: "76%", y: "72%", w: 180, depth: 1, rotate: -1   },
  { x: "35%", y: "40%", w: 150, depth: 0, rotate: 3    },
  { x: "14%", y: "25%", w: 240, depth: 2, rotate: -2   },
  { x: "62%", y: "28%", w: 200, depth: 1, rotate: 1.5  },
  { x: "48%", y: "78%", w: 160, depth: 0, rotate: -1   },
];

// Parallax multiplier by depth
const DEPTH_FACTOR = [0.4, 0.8, 1.4, 2.2];
const DEPTH_OPACITY = [0.25, 0.4, 0.6, 0.85];
const DEPTH_BLUR = ["blur-[3px]", "blur-[1.5px]", "", ""];

interface GatewayPageProps {
  artworks: ArtworkWithArtist[];
}

export default function GatewayPage({ artworks }: GatewayPageProps) {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("gateway");
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Pick representative images for the split view
  const hanoiArtwork = artworks.find((a) => a.artist.campus === "Hanoi");
  const saigonArtwork = artworks.find((a) => a.artist.campus === "Saigon");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      // Normalize to -1..1
      mouseX.set((e.clientX / vw - 0.5) * 2);
      mouseY.set((e.clientY / vh - 0.5) * 2);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-[#0f0d0b]"
      style={{ zIndex: 0 }}
    >
      <AnimatePresence mode="wait">
        {phase === "gateway" ? (
          <motion.div
            key="gateway"
            className="absolute inset-0"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {/* Floating artwork images */}
            {FLOAT_LAYOUT.map((pos, i) => {
              const artwork = artworks[i % artworks.length];
              const factor = DEPTH_FACTOR[pos.depth];
              const opacity = DEPTH_OPACITY[pos.depth];

              return (
                <FloatingImage
                  key={i}
                  artwork={artwork}
                  pos={pos}
                  factor={factor}
                  opacity={opacity}
                  blurClass={DEPTH_BLUR[pos.depth]}
                  mouseX={mouseX}
                  mouseY={mouseY}
                  exitIndex={i}
                />
              );
            })}

            {/* Vignette */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 60% at 50% 50%, transparent 30%, rgba(15,13,11,0.7) 100%)",
              }}
            />

            {/* Enter button */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <motion.button
                className="pointer-events-auto flex flex-col items-center gap-4 group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                onClick={() => setPhase("split")}
              >
                {/* Glassmorphic pill */}
                <div
                  className="px-8 py-3 rounded-full backdrop-blur-md
                    text-[11px] tracking-[0.35em] uppercase text-white/70
                    hover:text-white transition-all duration-500 flex flex-col items-center gap-0.5"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(201,168,76,0.3)",
                    boxShadow: "0 0 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.08)",
                  }}
                >
                  <span>Enter the Archive</span>
                  <span className="text-[9px] tracking-[0.2em] text-[#c9a84c]/50 normal-case font-light italic">
                    Vào Kho Lưu Trữ
                  </span>
                </div>
                {/* Animated chevron */}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="text-[#c9a84c]/40"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </motion.div>
              </motion.button>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="split"
            className="absolute inset-0 flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Hanoi */}
            <CampusPanel
              campus="hanoi"
              label="HANOI"
              artwork={hanoiArtwork}
              onSelect={() => router.push("/archive/hanoi/")}
            />
            {/* Divider */}
            <div className="w-px bg-white/10 shrink-0 z-10" />
            {/* Saigon */}
            <CampusPanel
              campus="saigon"
              label="SAIGON"
              artwork={saigonArtwork}
              onSelect={() => router.push("/archive/saigon/")}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Floating image ──────────────────────────────────────────────────────────

interface FloatingImageProps {
  artwork: ArtworkWithArtist;
  pos: (typeof FLOAT_LAYOUT)[0];
  factor: number;
  opacity: number;
  blurClass: string;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  exitIndex: number;
}

function FloatingImage({
  artwork,
  pos,
  factor,
  opacity,
  blurClass,
  mouseX,
  mouseY,
  exitIndex,
}: FloatingImageProps) {
  const range = 40; // max px movement
  const tx = useTransform(mouseX, [-1, 1], [-range * factor, range * factor]);
  const ty = useTransform(mouseY, [-1, 1], [-range * factor * 0.6, range * factor * 0.6]);

  const aspectRatio = artwork.imageHeight / artwork.imageWidth;

  return (
    <motion.div
      className={`absolute ${blurClass} pointer-events-none`}
      style={{
        left: pos.x,
        top: pos.y,
        width: pos.w,
        height: pos.w * aspectRatio,
        opacity,
        rotate: pos.rotate,
        x: tx,
        y: ty,
      }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity, scale: 1 }}
      exit={{
        opacity: 0,
        scale: 1.3,
        transition: { duration: 0.4, delay: exitIndex * 0.02, ease: "easeIn" },
      }}
      transition={{ delay: exitIndex * 0.04, duration: 0.8, ease: "easeOut" }}
    >
      <div className="relative w-full h-full overflow-hidden">
        <Image
          src={artwork.thumbnailPath}
          alt=""
          fill
          className="object-cover"
          draggable={false}
          sizes="340px"
        />
      </div>
    </motion.div>
  );
}

// ── Campus panel ────────────────────────────────────────────────────────────

const CAMPUS_COLORS: Record<string, { color: string; wash: string; viLabel: string }> = {
  hanoi: { color: "#4a8f9e", wash: "rgba(74,143,158,0.12)", viLabel: "HÀ NỘI" },
  saigon: { color: "#b85c38", wash: "rgba(184,92,56,0.12)", viLabel: "SÀI GÒN" },
};

interface CampusPanelProps {
  campus: string;
  label: string;
  artwork: ArtworkWithArtist | undefined;
  onSelect: () => void;
}

function CampusPanel({ campus, label, artwork, onSelect }: CampusPanelProps) {
  const [hovered, setHovered] = useState(false);
  const campusTheme = CAMPUS_COLORS[campus] ?? { color: "#f0e6d3", wash: "rgba(240,230,211,0.08)", viLabel: label };

  return (
    <motion.button
      className="relative flex-1 h-full overflow-hidden cursor-pointer group text-left"
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onSelect}
    >
      {/* Background image */}
      {artwork && (
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <Image
            src={artwork.imagePath}
            alt={label}
            fill
            className="object-cover"
            draggable={false}
            sizes="50vw"
            style={{
              filter: hovered ? "grayscale(0)" : "grayscale(0.85) brightness(0.6)",
              transition: "filter 0.9s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          />
        </motion.div>
      )}

      {/* Dark overlay — lightens slightly on hover */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: hovered
            ? `rgba(0,0,0,0.35)`
            : "rgba(0,0,0,0.65)",
        }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />

      {/* Campus color wash on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0, background: campusTheme.wash }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
      />

      {/* City label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <motion.div className="flex flex-col items-center gap-1">
          <motion.h2
            className="font-sans font-light tracking-[0.45em] uppercase"
            animate={{
              color: hovered ? campusTheme.color : "rgba(209,213,219,0.75)",
              fontSize: hovered ? "2.75rem" : "2.5rem",
            }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {label}
          </motion.h2>
          <motion.span
            className="text-[10px] tracking-[0.2em] font-light italic"
            animate={{ color: hovered ? campusTheme.color : "rgba(209,213,219,0.3)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {campusTheme.viLabel}
          </motion.span>
        </motion.div>
        <motion.div
          className="h-px"
          style={{ backgroundColor: campusTheme.color }}
          animate={{ width: hovered ? 60 : 30, opacity: hovered ? 0.7 : 0.25 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        />
        <motion.p
          className="text-[10px] tracking-[0.3em] uppercase text-white/50"
          animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 6 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          Enter
        </motion.p>
      </div>
    </motion.button>
  );
}
