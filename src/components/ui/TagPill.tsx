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
      className={`
        inline-flex items-center px-3 py-1 rounded-full text-xs font-medium
        border transition-all duration-200 cursor-pointer
        ${
          active
            ? "bg-[#c9a84c] border-[#c9a84c] text-[#121212]"
            : "bg-transparent border-[#2a2a2a] text-[#9ca3af] hover:border-[#c9a84c] hover:text-[#c9a84c]"
        }
      `}
    >
      {label}
    </button>
  );
}
