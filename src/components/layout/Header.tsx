"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/components/layout/Sidebar";

export default function Header() {
  const pathname = usePathname();
  const { open, setOpen } = useSidebar();
  if (pathname === "/choose/") return null;

  const monoLink: React.CSSProperties = {
    fontFamily: "var(--mono)",
    fontSize: "0.72rem",
    fontWeight: 400,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    textDecoration: "none",
    transition: "color 0.2s",
  };

  const campusLink = (campus: string, label: string) => {
    const isActive = pathname.includes(`/archive/${campus}`);
    const accent =
      campus === "hanoi" ? "var(--campus-hanoi)" : "var(--campus-saigon)";
    return (
      <Link
        href={`/archive/${campus}/`}
        className="nav-link"
        style={{
          ...monoLink,
          color: isActive ? accent : "var(--text-dim)",
          borderBottom: isActive ? `1px solid ${accent}` : "1px solid transparent",
          paddingBottom: "2px",
        }}
      >
        {label}
      </Link>
    );
  };

  const isHonored = pathname === "/honored/";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 anim-nav-drop"
      style={{
        background: "rgba(5,6,7,0.5)",
        backdropFilter: "blur(7px) saturate(1.15)",
        WebkitBackdropFilter: "blur(7px) saturate(1.15)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-4"
        style={{ height: "56px" }}
      >
        {/* Left: hamburger (mobile) + wordmark */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-label="Open artwork index"
            aria-expanded={open}
            className="lg:hidden flex flex-col justify-center gap-1 shrink-0"
            style={{
              width: "34px",
              height: "34px",
              padding: "7px",
              marginLeft: "-7px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                style={{
                  display: "block",
                  width: "18px",
                  height: "1.5px",
                  borderRadius: "1px",
                  background: "var(--text-bright)",
                  transition: "transform .25s, opacity .2s",
                  transform:
                    open && i === 0
                      ? "translateY(5.5px) rotate(45deg)"
                      : open && i === 2
                        ? "translateY(-5.5px) rotate(-45deg)"
                        : "none",
                  opacity: open && i === 1 ? 0 : 1,
                }}
              />
            ))}
          </button>

          <Link
            href="/"
            className="whitespace-nowrap overflow-hidden text-ellipsis"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.78rem",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--text-dim)",
              textDecoration: "none",
            }}
          >
            <b style={{ color: "var(--text-bright)", fontWeight: 700 }}>
              cultural.visions
            </b>
            <span className="hidden sm:inline"> /rmit-vietnam</span>
          </Link>
        </div>

        {/* Right: campus nav + honored */}
        <div className="hidden sm:flex items-center gap-4 sm:gap-6 shrink-0">
          {campusLink("hanoi", "Hanoi")}
          {campusLink("saigon", "Saigon")}
          <Link
            href="/honored/"
            className="nav-link"
            style={{
              ...monoLink,
              color: isHonored ? "var(--accent)" : "var(--text-dim)",
              borderBottom: isHonored
                ? "1px solid var(--accent)"
                : "1px solid transparent",
              paddingBottom: "2px",
            }}
          >
            Honored
          </Link>
        </div>
      </div>
    </header>
  );
}
