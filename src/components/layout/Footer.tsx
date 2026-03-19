export default function Footer() {
  return (
    <footer
      className="mt-10"
      style={{ borderTop: "1px solid rgba(122,21,21,0.3)" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="text-center sm:text-left">
          <p className="font-serif text-sm" style={{ color: "#c4906a" }}>
            Cultural Visions
          </p>
          <p className="text-xs mt-1" style={{ color: "#6a4a30" }}>
            RMIT University Vietnam — Curatorial Photography Archive
          </p>
          <p className="text-[10px] italic mt-0.5" style={{ color: "#4a2c1a" }}>
            Triển Lãm Ảnh Nghệ Thuật
          </p>
        </div>
        <p className="text-xs" style={{ color: "#4a2c1a" }}>
          All works © their respective artists. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
