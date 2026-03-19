export default function Footer() {
  return (
    <footer className="border-t border-[#2a2a2a] mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <p className="font-serif text-[#e5e5e5] text-sm">Cultural Visions</p>
          <p className="text-xs text-[#6b6b6b] mt-1">
            RMIT University Vietnam — Curatorial Photography Archive
          </p>
        </div>
        <p className="text-xs text-[#6b6b6b]">
          All works © their respective artists. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
