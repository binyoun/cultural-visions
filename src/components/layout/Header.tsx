"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const campusLink = (campus: string, label: string) => {
    const href = `/archive/${campus}/`;
    const isActive = pathname.includes(`/archive/${campus}`);
    const activeColor = campus === "hanoi" ? "#2a5a6e" : "#8b3520";
    return (
      <Link
        href={href}
        className={`text-sm tracking-widest uppercase transition-colors pb-0.5 ${
          isActive ? "border-b" : "hover:opacity-70"
        }`}
        style={
          isActive
            ? { color: activeColor, borderColor: activeColor }
            : { color: "#8a6040" }
        }
      >
        {label}
      </Link>
    );
  };

  const isHonored = pathname === "/honored/";

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm"
      style={{
        backgroundColor: "rgba(242, 228, 192, 0.92)",
        borderBottom: "2px solid #7a1515",
      }}
    >
      <div className="h-14 px-6 lg:px-10 grid grid-cols-3 items-center">
        {/* Left — wordmark */}
        <Link href="/" className="flex flex-col leading-tight group">
          <span
            className="text-[11px] tracking-[0.2em] uppercase transition-colors"
            style={{ color: "#8a6040" }}
          >
            RMIT University Vietnam
          </span>
          <span
            className="text-[11px] tracking-[0.15em] uppercase transition-colors hidden sm:block font-serif"
            style={{ color: "#7a1515" }}
          >
            Cultural Visions
          </span>
          <span
            className="text-[10px] tracking-[0.1em] hidden sm:block font-light italic"
            style={{ color: "#b09070" }}
          >
            Triển Lãm Ảnh Nghệ Thuật
          </span>
        </Link>

        {/* Center — campus nav */}
        <div className="flex items-center justify-center gap-6">
          {campusLink("hanoi", "Hanoi")}
          <span style={{ color: "rgba(122,21,21,0.25)" }} className="text-xs">|</span>
          {campusLink("saigon", "Saigon")}
        </div>

        {/* Right — search + honored */}
        <div className="flex items-center justify-end gap-4">
          <button
            aria-label="Search"
            className="transition-colors"
            style={{ color: "#8a6040" }}
          >
            <svg
              width="16" height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
          </button>

          <Link
            href="/honored/"
            className="text-xs font-medium px-4 py-1.5 transition-colors"
            style={
              isHonored
                ? {
                    backgroundColor: "#7a1515",
                    color: "#f2e4c0",
                    border: "1px solid #7a1515",
                  }
                : {
                    backgroundColor: "transparent",
                    color: "#7a1515",
                    border: "1px solid rgba(122,21,21,0.5)",
                  }
            }
          >
            <span style={{ color: isHonored ? "#f2e4c0" : "#7a1515" }}>★</span>{" "}
            Honored Works
          </Link>
        </div>
      </div>
    </header>
  );
}
