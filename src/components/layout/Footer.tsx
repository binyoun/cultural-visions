export default function Footer() {
  return (
    <footer
      className="mt-24"
      style={{ borderTop: "2px solid #7a1515" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-serif text-sm" style={{ color: "#1a0a05" }}>
            Cultural Visions
          </p>
          <p className="text-xs mt-1" style={{ color: "#8a6040" }}>
            RMIT University Vietnam — Curatorial Photography Archive
          </p>
          <p className="text-[10px] italic mt-0.5" style={{ color: "#b09070" }}>
            Triển Lãm Ảnh Nghệ Thuật
          </p>
        </div>
        <p className="text-xs" style={{ color: "#8a6040" }}>
          All works © their respective artists. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
