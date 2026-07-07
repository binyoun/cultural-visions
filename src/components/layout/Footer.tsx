export default function Footer() {
  return (
    <footer
      className="mt-10"
      style={{ borderTop: "1px solid var(--line)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="text-center sm:text-left">
          <p
            className="text-sm"
            style={{ fontFamily: "var(--serif)", color: "var(--text-bright)" }}
          >
            Cultural Visions
          </p>
          <p
            className="mt-1 uppercase"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.08em",
              color: "var(--text-dim)",
            }}
          >
            RMIT University Vietnam · Curatorial Photography Archive
          </p>
          <p
            className="italic mt-0.5"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.58rem",
              color: "var(--text-dim)",
              opacity: 0.7,
            }}
          >
            Triển Lãm Ảnh Nghệ Thuật
          </p>
        </div>
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.62rem",
            color: "var(--text-dim)",
          }}
        >
          All works © their respective artists. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
