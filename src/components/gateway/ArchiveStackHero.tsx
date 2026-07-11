"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

export interface HeroWork {
  slug: string;
  title: string;
  artistName: string;
  campus: "Hanoi" | "Saigon";
  imagePath: string;
}

interface ArchiveStackHeroProps {
  works: HeroWork[];
}

/* Vanishing point of the corridor, as fractions of the stage */
const VP = { x: 0.79, y: 0.3 };
/* Screen position of the front card (z = 0) */
const FRONT = { x: 0.46, y: 0.57 };
const Z_STEP = 1.0;
const DRIFT_SPEED = 0.16; /* z units per second toward the viewer */
/* z units advanced by dragging across the full stage width */
const DRAG_GAIN = 3.2;
/* RMIT / Vietnam red */
const RED = "226,32,44";

/* Rays converging on the vanishing point (viewBox 0..100) */
const RAY_ENDS: Array<[number, number, boolean]> = [
  [0, 0, false],
  [0, 22, false],
  [0, 48, true],
  [0, 78, false],
  [4, 100, false],
  [30, 100, true],
  [54, 100, false],
  [78, 100, false],
  [100, 92, false],
  [100, 62, true],
  [100, 4, false],
];

export default function ArchiveStackHero({ works }: ArchiveStackHeroProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const paused = useRef(false);
  const off = useRef(0);
  const drag = useRef({ active: false, lastX: 0, moved: 0 });

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const N = works.length;
    const L = N * Z_STEP;
    /* reduced motion: no autonomous drift, dragging still repositions */
    const drift = reduced ? 0 : DRIFT_SPEED;
    let rafId = 0;
    let last = performance.now();

    const layout = () => {
      const rect = stage.getBoundingClientRect();
      const vpX = rect.width * VP.x;
      const vpY = rect.height * VP.y;
      const frontX = rect.width * FRONT.x;
      const frontY = rect.height * FRONT.y;

      for (let i = 0; i < N; i++) {
        const el = cardRefs.current[i];
        if (!el) continue;
        let z = (((i * Z_STEP - off.current) % L) + L) % L;
        if (z > L - 0.6) z -= L;
        /* s > 1 for z < 0: the card keeps travelling along the ray past
           the front position, sliding off toward the viewer as it fades */
        const s = 1 / (1 + 0.62 * z);
        const x =
          vpX + (frontX - vpX) * s + mouse.current.x * 22 * s;
        const y =
          vpY + (frontY - vpY) * s + mouse.current.y * 14 * s;
        const opacity =
          z < 0
            ? Math.max(0, 1 + z / 0.28) ** 2
            : Math.min(1, Math.max(0, (L - 0.45 - z) / 1.1));
        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${s})`;
        el.style.opacity = String(opacity);
        el.style.zIndex = String(100 + Math.round((L - z) * 10));
        el.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
      }
    };

    const step = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1);
      last = now;
      if (!paused.current && !drag.current.active && !document.hidden) {
        off.current += dt * drift;
      }
      off.current = ((off.current % L) + L) % L;
      layout();
      rafId = requestAnimationFrame(step);
    };

    layout();
    rafId = requestAnimationFrame(step);

    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [works.length]);

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    drag.current = { active: true, lastX: e.clientX, moved: 0 };
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (e.pointerType === "mouse") {
      mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    }
    if (drag.current.active) {
      const dx = e.clientX - drag.current.lastX;
      drag.current.lastX = e.clientX;
      drag.current.moved += Math.abs(dx);
      off.current += (dx / rect.width) * DRAG_GAIN;
    }
  };

  const endDrag = () => {
    drag.current.active = false;
  };

  /* A drag should scrub the deck, not open the card under the pointer */
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved > 8) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <section
      aria-label="Cultural Visions archive gateway"
      style={{
        position: "relative",
        /* header (56px) and the slim footer stay inside the first screen */
        height: "calc(100svh - 56px - 42px)",
        minHeight: 480,
        marginTop: 56,
        overflow: "hidden",
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <h1 className="sr-only">Cultural Visions, RMIT University Vietnam</h1>

      {/* Vanishing-point glow */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: `radial-gradient(60% 55% at ${VP.x * 100}% ${
            VP.y * 100
          }%, rgba(200,149,108,0.12), rgba(124,156,186,0.05) 40%, transparent 68%), radial-gradient(90% 90% at 50% 120%, rgba(0,0,0,0.6), transparent 60%)`,
        }}
      />

      {/* Red light: RMIT / Vietnam. Breathing glow at the vanishing point
          plus a faint wash rising from the lower left */}
      <div
        aria-hidden="true"
        className="hero-red-glow"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: `radial-gradient(44% 38% at ${VP.x * 100}% ${
            VP.y * 100
          }%, rgba(${RED},0.15), transparent 62%), radial-gradient(64% 50% at 6% 100%, rgba(${RED},0.09), transparent 58%)`,
        }}
      />

      {/* Perspective floor grid converging on the vanishing point */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          overflow: "hidden",
          WebkitMaskImage:
            "radial-gradient(80% 70% at 72% 34%, #000 0%, transparent 72%)",
          maskImage:
            "radial-gradient(80% 70% at 72% 34%, #000 0%, transparent 72%)",
        }}
      >
        <div
          style={{
            position: "absolute",
            left: "-30%",
            right: "-30%",
            top: "30%",
            height: "160%",
            backgroundImage:
              "repeating-linear-gradient(90deg, transparent 0 78px, rgba(150,165,190,0.10) 78px 79px), repeating-linear-gradient(0deg, transparent 0 78px, rgba(150,165,190,0.08) 78px 79px)",
            transform: "perspective(1400px) rotateX(66deg)",
            transformOrigin: "50% 0",
          }}
        />
      </div>

      {/* Corridor rays converging on the vanishing point */}
      <svg
        aria-hidden="true"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 1,
          pointerEvents: "none",
          WebkitMaskImage:
            "radial-gradient(78% 72% at 79% 30%, #000 0%, rgba(0,0,0,0.5) 46%, transparent 80%)",
          maskImage:
            "radial-gradient(78% 72% at 79% 30%, #000 0%, rgba(0,0,0,0.5) 46%, transparent 80%)",
        }}
      >
        {RAY_ENDS.map(([x, y, red], i) => (
          <line
            key={i}
            x1={VP.x * 100}
            y1={VP.y * 100}
            x2={x}
            y2={y}
            stroke={red ? `rgba(${RED},0.20)` : "rgba(150,165,190,0.12)"}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {/* Vanishing-point reticle */}
        <circle
          cx={VP.x * 100}
          cy={VP.y * 100}
          r={1.7}
          fill="none"
          stroke={`rgba(${RED},0.4)`}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <circle
          cx={VP.x * 100}
          cy={VP.y * 100}
          r={4.2}
          fill="none"
          stroke="rgba(199,184,159,0.16)"
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Orbital diagram on the left wall plane: nested rings in 3D */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 4,
          pointerEvents: "none",
          perspective: 1200,
          perspectiveOrigin: "16% 29%",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="anim-hero-rise"
          style={{
            animationDelay: "0.18s",
            position: "absolute",
            left: "1.4%",
            top: "14%",
            width: 380,
            height: 380,
            transform: "rotateY(54deg) translateX(340px)",
            transformOrigin: "left center",
            transformStyle: "preserve-3d",
          }}
        >
          {/* flat rings on the wall */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "1px dashed rgba(199,184,159,0.34)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 52,
              borderRadius: "50%",
              border: "1px solid rgba(150,165,190,0.2)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 108,
              borderRadius: "50%",
              border: "1px dashed rgba(199,184,159,0.22)",
            }}
          />

          {/* tilted rings crossing the plane: armillary depth */}
          <div
            style={{
              position: "absolute",
              inset: 14,
              borderRadius: "50%",
              border: `1px solid rgba(${RED},0.32)`,
              transform: "rotateX(70deg)",
              boxShadow: `0 0 18px rgba(${RED},0.10)`,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 44,
              borderRadius: "50%",
              border: "1px solid rgba(150,165,190,0.16)",
              transform: "rotateY(64deg)",
            }}
          />

          {/* orbiting markers */}
          <div
            className="orbit-spin"
            style={{ position: "absolute", inset: 0, animationDuration: "72s" }}
          >
            <span
              style={{
                position: "absolute",
                top: -3,
                left: "50%",
                transform: "translateX(-50%)",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: `rgba(${RED},0.85)`,
                boxShadow: `0 0 12px 3px rgba(${RED},0.4)`,
              }}
            />
          </div>
          <div
            className="orbit-spin-rev"
            style={{
              position: "absolute",
              inset: 52,
              animationDuration: "46s",
            }}
          >
            <span
              style={{
                position: "absolute",
                top: -2.5,
                left: "50%",
                transform: "translateX(-50%)",
                width: 5,
                height: 5,
                borderRadius: "50%",
                background: "rgba(199,184,159,0.7)",
                boxShadow: "0 0 8px 2px rgba(199,184,159,0.25)",
              }}
            />
          </div>

          {/* centre: red core and crosshair */}
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 5,
              height: 5,
              borderRadius: "50%",
              background: `rgba(${RED},0.9)`,
              boxShadow: `0 0 14px 4px rgba(${RED},0.35)`,
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 46,
              height: 1,
              background: "rgba(199,184,159,0.3)",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 1,
              height: 46,
              background: "rgba(199,184,159,0.3)",
            }}
          />
        </div>
      </div>

      {/* Drifting archive stack: drag to scrub, hover a card to hold it */}
      <div
        ref={stageRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
        onClickCapture={onClickCapture}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          cursor: "grab",
          touchAction: "pan-y",
        }}
      >
        {works.map((w, i) => (
          <Link
            key={w.slug}
            href={`/artwork/${w.slug}/`}
            ref={(el) => {
              cardRefs.current[i] = el;
            }}
            className="stack-card"
            aria-label={`${w.title} by ${w.artistName}`}
            draggable={false}
            onDragStart={(e) => e.preventDefault()}
            onMouseEnter={() => (paused.current = true)}
            onMouseLeave={() => (paused.current = false)}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "clamp(364px, 57vw, 700px)",
              aspectRatio: "1200 / 630",
              willChange: "transform, opacity",
              display: "block",
            }}
          >
            <span
              className="stack-card-inner"
              style={{
                position: "absolute",
                inset: 0,
                borderRadius: 12,
                overflow: "hidden",
                display: "block",
                backgroundImage: `url(${w.imagePath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundColor: "#0e1013",
              }}
            >
              <span
                className="stack-caption"
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  padding: "26px 18px 14px",
                  background:
                    "linear-gradient(180deg, transparent, rgba(5,6,7,0.82))",
                  display: "block",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--serif)",
                    fontSize: "1.05rem",
                    color: "var(--text-bright)",
                  }}
                >
                  {w.title}
                </span>
                <span
                  className="uppercase"
                  style={{
                    display: "block",
                    marginTop: 2,
                    fontFamily: "var(--mono)",
                    fontSize: "0.58rem",
                    letterSpacing: "0.18em",
                    color:
                      w.campus === "Hanoi"
                        ? "var(--campus-hanoi)"
                        : "var(--campus-saigon)",
                  }}
                >
                  {w.artistName} / {w.campus}
                </span>
              </span>
            </span>
          </Link>
        ))}
      </div>

    </section>
  );
}
