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
  honoredCount: number;
}

/* Vanishing point of the corridor, as fractions of the stage */
const VP = { x: 0.79, y: 0.3 };
/* Screen position of the front card (z = 0) */
const FRONT = { x: 0.46, y: 0.57 };
const Z_STEP = 1.0;
const DRIFT_SPEED = 0.1; /* z units per second toward the viewer */

export default function ArchiveStackHero({
  works,
  honoredCount,
}: ArchiveStackHeroProps) {
  const stageRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const paused = useRef(false);

  const hanoiCount = works.filter((w) => w.campus === "Hanoi").length;
  const saigonCount = works.filter((w) => w.campus === "Saigon").length;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const N = works.length;
    const L = N * Z_STEP;
    let off = 0;
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
        let z = (((i * Z_STEP - off) % L) + L) % L;
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
      if (!paused.current && !document.hidden) {
        off = (off + dt * DRIFT_SPEED) % L;
      }
      layout();
      rafId = requestAnimationFrame(step);
    };

    layout();
    if (!reduced) {
      rafId = requestAnimationFrame(step);
    }

    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
    };
  }, [works.length]);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = stageRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouse.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.current.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
  };

  const chip = (
    href: string,
    label: string,
    n: number,
    delay: string
  ) => (
    <Link
      key={label}
      href={href}
      className="hero-chip anim-hero-rise"
      style={{ animationDelay: delay }}
    >
      {label}
      <span className="n">{n}</span>
    </Link>
  );

  return (
    <section
      aria-label="Cultural Visions archive gateway"
      style={{
        position: "relative",
        height: "calc(100svh - 56px)",
        marginTop: 56,
        overflow: "hidden",
        backgroundColor: "var(--bg)",
        borderBottom: "1px solid var(--line)",
      }}
    >
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

      {/* Wall-engraved title on the left wall plane */}
      <div
        aria-hidden="false"
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
          style={{
            position: "absolute",
            left: "1.4%",
            top: "16%",
            transform: "rotateY(54deg) translateX(340px)",
            transformOrigin: "left center",
          }}
        >
          <p
            className="anim-hero-rise uppercase"
            style={{
              animationDelay: "0.12s",
              fontFamily: "var(--mono)",
              fontSize: "0.82rem",
              letterSpacing: "0.3em",
              color: "rgba(186,171,148,0.5)",
              textShadow:
                "0 -1px 1px rgba(0,0,0,0.55), 0 1px 0 rgba(226,210,184,0.09), 0 0 8px rgba(216,170,120,0.26), 0 0 20px rgba(216,170,120,0.12)",
              marginBottom: 18,
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                width: 26,
                height: 1,
                background: "rgba(186,171,148,0.28)",
                display: "inline-block",
              }}
            />
            RMIT University Vietnam
          </p>
          <h1
            className="anim-hero-rise uppercase"
            style={{
              animationDelay: "0.22s",
              fontFamily: "var(--serif)",
              fontWeight: 400,
              fontSize: "clamp(3.4rem, 6.4vw, 6rem)",
              lineHeight: 1.02,
              letterSpacing: "0.075em",
              color: "rgba(199,184,159,0.5)",
              textShadow:
                "0 -1px 1px rgba(0,0,0,0.62), 0 1px 0 rgba(232,216,190,0.12), 0 3px 6px rgba(0,0,0,0.30), var(--backlit)",
              margin: 0,
            }}
          >
            Cultural
            <br />
            Visions
          </h1>
          <p
            className="anim-hero-rise italic"
            style={{
              animationDelay: "0.34s",
              fontFamily: "var(--serif)",
              fontSize: "1.05rem",
              letterSpacing: "0.08em",
              color: "rgba(186,171,148,0.4)",
              marginTop: 16,
            }}
          >
            Triển Lãm Ảnh Nghệ Thuật
          </p>
        </div>
      </div>

      {/* Drifting archive stack */}
      <div
        ref={stageRef}
        onMouseMove={onMouseMove}
        onMouseEnter={() => (paused.current = true)}
        onMouseLeave={() => (paused.current = false)}
        style={{ position: "absolute", inset: 0, zIndex: 2 }}
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

      {/* Entry chips along the floor */}
      <div
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: "7%",
          zIndex: 6,
          display: "flex",
          justifyContent: "center",
          gap: 14,
          flexWrap: "wrap",
          padding: "0 16px",
        }}
      >
        {chip("/archive/hanoi/", "Hà Nội", hanoiCount, "0.6s")}
        {chip("/archive/saigon/", "Sài Gòn", saigonCount, "0.7s")}
        {chip("/honored/", "Honored", honoredCount, "0.8s")}
      </div>
    </section>
  );
}
