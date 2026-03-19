import type { ArtworkWithArtist } from "@/lib/dataLoader";
import TagPill from "@/components/ui/TagPill";
import Link from "next/link";

interface ArtworkMetaProps {
  artwork: ArtworkWithArtist;
}

export default function ArtworkMeta({ artwork }: ArtworkMetaProps) {
  return (
    <div className="space-y-8">
      {/* Title & Artist */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-[#e5e5e5] leading-tight">
          {artwork.title}
        </h1>
        <p className="mt-2 text-[#9ca3af] text-lg">{artwork.artist.displayName}</p>
        <p className="mt-1 text-[#6b6b6b] text-sm">{artwork.year}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {artwork.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>

      {/* Artist Statement */}
      <div>
        <h2 className="text-xs uppercase tracking-widest text-[#6b6b6b] mb-3">
          Artist Statement
        </h2>
        <p className="text-[#9ca3af] text-sm leading-relaxed">
          {artwork.artistStatement}
        </p>
      </div>

      {/* Curator Note */}
      <div>
        <h2 className="text-xs uppercase tracking-widest text-[#6b6b6b] mb-3">
          Curator&#39;s Note
        </h2>
        <p className="text-[#9ca3af] text-sm leading-relaxed italic">
          {artwork.curatorNote}
        </p>
      </div>

      {/* Artist Bio */}
      <div className="border-t border-[#2a2a2a] pt-6">
        <h2 className="text-xs uppercase tracking-widest text-[#6b6b6b] mb-3">
          About the Artist
        </h2>
        <p className="text-[#9ca3af] text-sm leading-relaxed">
          {artwork.artist.longBio}
        </p>
      </div>

      {/* Copyright */}
      <div className="border-t border-[#2a2a2a] pt-4">
        <p className="text-xs text-[#6b6b6b]">
          © {artwork.year} {artwork.artist.displayName}. All rights reserved.
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
