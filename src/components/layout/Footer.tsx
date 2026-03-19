export default function Footer() {
  return (
    <footer className="border-t border-[#2e2820] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-serif text-[#f0e6d3] text-sm">Cultural Visions</p>
          <p className="text-xs text-[#6b5c4a] mt-1">
            RMIT University Vietnam — Curatorial Photography Archive
          </p>
          <p className="text-[10px] text-[#6b5c4a]/50 italic mt-0.5">
            Triển Lãm Ảnh Nghệ Thuật
          </p>
        </div>
        <p className="text-xs text-[#6b5c4a]">
          All works © their respective artists. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
