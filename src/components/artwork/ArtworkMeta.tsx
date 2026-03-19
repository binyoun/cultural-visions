import type { ArtworkMatter } from "@/types/artwork";
import TagPill from "@/components/ui/TagPill";
import Link from "next/link";

interface ArtworkMetaProps {
  artwork: ArtworkMatter;
}

function SectionLabel({ en, vi }: { en: string; vi: string }) {
  return (
    <div className="mb-3">
      <h2 className="text-xs uppercase tracking-widest text-[#6b5c4a]">{en}</h2>
      <span className="text-[9px] tracking-[0.1em] text-[#6b5c4a]/50 italic">{vi}</span>
    </div>
  );
}

export default function ArtworkMeta({ artwork }: ArtworkMetaProps) {
  return (
    <div className="space-y-8">
      {/* Title & Artist */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#f0e6d3] leading-tight">
          {artwork.title}
        </h1>
        <p className="mt-2 text-[#b0967a] text-lg">{artwork.artistName}</p>
        <p className="mt-1 text-[#6b5c4a] text-sm">{artwork.year}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {artwork.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>

      {/* Artist Statement */}
      <div>
        <SectionLabel en="Artist Statement" vi="Tuyên Bố Nghệ Sĩ" />
        <p className="text-[#b0967a] text-sm leading-relaxed">
          {artwork.artistStatement}
        </p>
      </div>

      {/* Curator Note */}
      <div>
        <SectionLabel en="Curator's Note" vi="Ghi Chú Giám Tuyển" />
        <p className="text-[#b0967a] text-sm leading-relaxed italic">
          {artwork.curatorNote}
        </p>
      </div>

      {/* Artist Bio */}
      <div className="border-t border-[#2e2820] pt-6">
        <SectionLabel en="About the Artist" vi="Về Nghệ Sĩ" />
        <p className="text-[#b0967a] text-sm leading-relaxed">
          {artwork.longBio}
        </p>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#2e2820] pt-4">
        <p className="text-xs text-[#6b5c4a]">
          © {artwork.year} {artwork.artistName}. All rights reserved.
        </p>
      </div>

      {/* Back link */}
      <div>
        <Link
          href="/"
          className="text-xs text-[#c9a84c] hover:underline"
        >
          ← Back to Archive
        </Link>
      </div>
    </div>
  );
}
