"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface SidebarEntry {
  slug: string;
  title: string;
  year: number;
  campus: "Hanoi" | "Saigon";
  isHonored: boolean;
}

interface SidebarState {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const SidebarContext = createContext<SidebarState>({
  open: false,
  setOpen: () => {},
});

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <SidebarContext.Provider value={{ open, setOpen }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function useSidebar() {
  return useContext(SidebarContext);
}

function SectionLabel({
  color,
  href,
  children,
}: {
  color: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="nav-link flex items-center gap-2 uppercase"
      style={{
        fontFamily: "var(--mono)",
        fontSize: "0.62rem",
        fontWeight: 700,
        letterSpacing: "0.22em",
        color: "var(--text-dim)",
        paddingBottom: "8px",
        marginBottom: "6px",
        borderBottom: "1px solid var(--line-soft)",
        textDecoration: "none",
        transition: "color 0.2s",
      }}
    >
      <span
        aria-hidden
        style={{
          width: "5px",
          height: "5px",
          background: color,
          display: "inline-block",
          transform: "rotate(45deg)",
        }}
      />
      {children}
    </Link>
  );
}

function SidebarLink({ entry }: { entry: SidebarEntry }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      href={`/artwork/${entry.slug}/`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex items-baseline justify-between gap-2"
      style={{
        fontSize: "0.76rem",
        color: hovered ? "var(--text-bright)" : "var(--text)",
        padding: hovered ? "4.5px 6px 4.5px 9px" : "4.5px 6px 4.5px 0",
        borderLeft: hovered
          ? "1px solid var(--accent)"
          : "1px solid transparent",
        transition: "color .15s, padding-left .15s, border-color .15s",
        lineHeight: 1.35,
        textDecoration: "none",
      }}
    >
      <span>{entry.title}</span>
      <span
        style={{
          fontFamily: "var(--mono)",
          fontSize: "0.62rem",
          color: "var(--text-dim)",
          flexShrink: 0,
        }}
      >
        {entry.year}
      </span>
    </Link>
  );
}

interface SidebarProps {
  entries: SidebarEntry[];
}

export default function Sidebar({ entries }: SidebarProps) {
  const { open, setOpen } = useSidebar();
  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  if (pathname === "/choose/") return null;

  const byYear = (a: SidebarEntry, b: SidebarEntry) =>
    b.year - a.year || a.title.localeCompare(b.title);
  const hanoi = entries.filter((e) => e.campus === "Hanoi").sort(byYear);
  const saigon = entries.filter((e) => e.campus === "Saigon").sort(byYear);
  const honored = entries.filter((e) => e.isHonored).sort(byYear);

  return (
    <>
      {/* Backdrop (mobile) */}
      <div
        onClick={() => setOpen(false)}
        className="lg:hidden"
        style={{
          position: "fixed",
          inset: "56px 0 0 0",
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(2px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity .28s",
          zIndex: 230,
        }}
      />

      {/* Drawer */}
      <aside
        aria-label="Artwork index"
        className="sidebar-scroll"
        style={{
          position: "fixed",
          top: "56px",
          left: 0,
          bottom: 0,
          width: "min(268px, 84vw)",
          overflowY: "auto",
          background: "rgba(5,6,7,0.94)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
          borderRight: "1px solid var(--line)",
          padding: "26px 20px 54px",
          transform: open ? "none" : "translateX(-100%)",
          transition: "transform .36s cubic-bezier(0.16,1,0.3,1), box-shadow .36s",
          boxShadow: open ? "44px 0 90px rgba(0,0,0,0.55)" : "none",
          zIndex: 240,
        }}
      >
        <div style={{ marginBottom: "26px" }}>
          <SectionLabel color="var(--campus-hanoi)" href="/archive/hanoi/">
            Hanoi
          </SectionLabel>
          {hanoi.map((e) => (
            <SidebarLink key={e.slug} entry={e} />
          ))}
        </div>
        <div style={{ marginBottom: "26px" }}>
          <SectionLabel color="var(--campus-saigon)" href="/archive/saigon/">
            Saigon
          </SectionLabel>
          {saigon.map((e) => (
            <SidebarLink key={e.slug} entry={e} />
          ))}
        </div>
        <div style={{ marginBottom: "26px" }}>
          <SectionLabel color="var(--accent4)" href="/honored/">
            Honored
          </SectionLabel>
          {honored.map((e) => (
            <SidebarLink key={e.slug} entry={e} />
          ))}
        </div>
      </aside>

      {/* Edge handle (desktop) */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-label="Toggle artwork index"
        aria-expanded={open}
        className="hidden lg:flex"
        style={{
          position: "fixed",
          top: "50%",
          left: 0,
          zIndex: 241,
          transform: open
            ? "translateY(-50%) translateX(min(268px, 84vw))"
            : "translateY(-50%)",
          width: "26px",
          height: "74px",
          alignItems: "center",
          justifyContent: "center",
          background: "rgba(15,17,20,0.8)",
          backdropFilter: "blur(8px)",
          border: "1px solid var(--line)",
          borderLeft: 0,
          borderRadius: "0 8px 8px 0",
          color: "var(--text-dim)",
          cursor: "pointer",
          transition:
            "color .2s, background .2s, transform .36s cubic-bezier(0.16,1,0.3,1)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent)")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-dim)")}
      >
        <svg
          width="12"
          height="12"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: open ? "rotate(180deg)" : "none",
            transition: "transform .3s",
          }}
        >
          <path d="M9 6l6 6-6 6" />
        </svg>
      </button>
    </>
  );
}
