import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-[#121212]/95 backdrop-blur-sm border-b border-[#2a2a2a]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full bg-[#c9a84c] flex items-center justify-center">
            <span className="text-[#121212] text-xs font-bold">CV</span>
          </div>
          <div>
            <span className="font-serif text-[#e5e5e5] text-sm tracking-wide group-hover:text-[#c9a84c] transition-colors">
              Cultural Visions
            </span>
            <span className="hidden sm:block text-[10px] text-[#6b6b6b] leading-none">
              RMIT University Vietnam
            </span>
          </div>
        </Link>

        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className="text-sm text-[#9ca3af] hover:text-[#e5e5e5] transition-colors"
          >
            Archive
          </Link>
          <Link
            href="/honored/"
            className="text-sm text-[#9ca3af] hover:text-[#e5e5e5] transition-colors"
          >
            Honored Works
          </Link>
        </nav>
      </div>
    </header>
  );
}
