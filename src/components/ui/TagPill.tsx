"use client";

interface TagPillProps {
  label: string;
  active?: boolean;
  onClick?: () => void;
}

export default function TagPill({ label, active = false, onClick }: TagPillProps) {
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center px-3 py-0.5 text-xs tracking-wider uppercase transition-all duration-200 cursor-pointer"
      style={
        active
          ? {
              backgroundColor: "#7a1515",
              color: "#f2e4c0",
              border: "1px solid #7a1515",
              fontFamily: "'DM Serif Display', serif",
            }
          : {
              backgroundColor: "transparent",
              color: "#8a6040",
              border: "1px solid rgba(122,21,21,0.35)",
              fontFamily: "'DM Serif Display', serif",
            }
      }
    >
      {label}
    </button>
  );
}
