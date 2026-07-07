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
      className="inline-flex items-center uppercase transition-all duration-200 cursor-pointer"
      style={{
        fontFamily: "var(--mono)",
        fontSize: "0.62rem",
        letterSpacing: "0.14em",
        borderRadius: "999px",
        padding: "6px 14px",
        backdropFilter: "blur(6px)",
        ...(active
          ? {
              color: "#2a1c10",
              backgroundColor: "#f0e2ce",
              border: "1px solid #f0e2ce",
              boxShadow: "0 0 34px rgba(224,184,132,0.5)",
            }
          : {
              color: "var(--text)",
              backgroundColor: "rgba(10,12,14,0.62)",
              border: "1px solid var(--border-hover)",
              boxShadow: "0 0 20px rgba(200,149,108,0.13)",
            }),
      }}
    >
      {label}
    </button>
  );
}
