"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const campusLink = (campus: string, label: string) => {
    const href = `/archive/${campus}/`;
    const isActive = pathname.includes(`/archive/${campus}`);
    const activeColor = campus === "hanoi" ? "#4a8f9e" : "#b85c38";
    return (
      <Link
        href={href}
        className={`text-sm tracking-widest uppercase transition-colors pb-0.5 ${
          isActive
            ? "border-b"
            : "text-gray-500 hover:text-gray-300"
        }`}
        style={isActive ? { color: activeColor, borderColor: activeColor } : undefined}
      >
        {label}
      </Link>
    );
  };

  const isHonored = pathname === "/honored/";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0f0d0b]/80 backdrop-blur-md border-b border-white/5">
      <div className="h-14 px-6 lg:px-10 grid grid-cols-3 items-center">
        {/* Left */}
        <Link href="/" className="flex flex-col leading-tight group">
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#6b5c4a] group-hover:text-[#b0967a] transition-colors">
            RMIT University Vietnam
          </span>
          <span className="text-[11px] tracking-[0.15em] uppercase text-[#6b5c4a] group-hover:text-[#b0967a] transition-colors hidden sm:block">
            Cultural Visions
          </span>
          <span className="text-[10px] tracking-[0.1em] text-[#6b5c4a]/60 group-hover:text-[#6b5c4a] transition-colors hidden sm:block font-light italic">
            Triển Lãm Ảnh Nghệ Thuật
          </span>
        </Link>

        {/* Center */}
        <div className="flex items-center justify-center gap-6">
          {campusLink("hanoi", "Hanoi")}
          <span className="text-white/10 text-xs">|</span>
          {campusLink("saigon", "Saigon")}
        </div>

        {/* Right */}
        <div className="flex items-center justify-end gap-4">
          {/* Search icon */}
          <button
            aria-label="Search"
            className="text-[#6b5c4a] hover:text-[#b0967a] transition-colors"
          >
            <svg
              width="16"
              height="16"
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

          {/* Honored Works pill */}
          <Link
            href="/honored/"
            className={`text-xs font-medium px-5 py-2 rounded-full border transition-colors ${
              isHonored
                ? "bg-[#c9a84c] text-[#0f0d0b] border-[#c9a84c]"
                : "border-[#c9a84c]/40 text-[#c9a84c]/70 hover:border-[#c9a84c] hover:text-[#c9a84c]"
            }`}
          >
            <span
              className="text-[#c9a84c]"
              style={{ textShadow: "0 0 6px #c9a84c, 0 0 14px rgba(201,168,76,0.5)" }}
            >
              ★
            </span>{" "}
            Honored Works
          </Link>
        </div>
      </div>
    </header>
  );
}
