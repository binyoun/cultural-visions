export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-col sm:flex-row items-center justify-between gap-1.5">
        <p
          className="uppercase"
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.62rem",
            letterSpacing: "0.08em",
            color: "var(--text-dim)",
          }}
        >
          Cultural Visions · RMIT University Vietnam
        </p>
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.62rem",
            color: "var(--text-dim)",
            textAlign: "center",
          }}
        >
          All works © their respective artists ·{" "}
          <a
            href="https://www.rmit.edu.vn/profiles/y/bin-youn"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
            style={{
              color: "var(--accent)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            Bin Youn made this website ↗
          </a>
        </p>
      </div>
    </footer>
  );
}
