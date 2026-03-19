"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const campusLink = (campus: string, label: string) => {
    const href = `/archive/${campus}/`;
    const isActive = pathname.includes(`/archive/${campus}`);
    return (
      <Link
        href={href}
        className={`text-sm tracking-widest uppercase transition-colors pb-0.5 ${
          isActive
            ? "text-white border-b border-white"
            : "text-gray-500 hover:text-gray-300"
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#121212]/80 backdrop-blur-md border-b border-white/5">
      <div className="h-14 px-6 lg:px-10 grid grid-cols-3 items-center">
        {/* Left */}
        <Link href="/" className="flex flex-col leading-tight group">
          <span className="text-[11px] tracking-[0.2em] uppercase text-gray-500 group-hover:text-gray-300 transition-colors">
            RMIT University Vietnam
          </span>
          <span className="text-[11px] tracking-[0.15em] uppercase text-gray-400 group-hover:text-gray-200 transition-colors hidden sm:block">
            Cultural Visions: Curatorial Photo Archive
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
            className="text-gray-500 hover:text-gray-200 transition-colors"
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
            className={`text-[11px] tracking-widest uppercase px-3 py-1 rounded-full border transition-colors ${
              pathname === "/honored/"
                ? "border-white/40 text-white"
                : "border-white/10 text-gray-500 hover:border-white/30 hover:text-gray-300"
            }`}
          >
            Honored Works
          </Link>
        </div>
      </div>
    </header>
  );
}
