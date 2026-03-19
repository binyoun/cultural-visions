import type { ArtworkMatter } from "@/types/artwork";
import TagPill from "@/components/ui/TagPill";
import Link from "next/link";

interface ArtworkMetaProps {
  artwork: ArtworkMatter;
}

function SectionLabel({ en, vi }: { en: string; vi: string }) {
  return (
    <div className="mb-3">
      <h2
        className="text-xs uppercase tracking-widest"
        style={{ color: "#7a1515" }}
      >
        {en}
      </h2>
      <span
        className="text-[9px] tracking-[0.1em] italic"
        style={{ color: "#b09070" }}
      >
        {vi}
      </span>
    </div>
  );
}

export default function ArtworkMeta({ artwork }: ArtworkMetaProps) {
  return (
    <div className="space-y-8">
      {/* Title & Artist */}
      <div>
        <h1
          className="font-serif text-3xl sm:text-4xl leading-tight"
          style={{ color: "#1a0a05" }}
        >
          {artwork.title}
        </h1>
        <p className="mt-2 text-lg" style={{ color: "#4a2c1a" }}>
          {artwork.artistName}
        </p>
        <p className="mt-1 text-sm" style={{ color: "#8a6040" }}>
          {artwork.year}
        </p>
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
        <p className="text-sm leading-relaxed" style={{ color: "#4a2c1a" }}>
          {artwork.artistStatement}
        </p>
      </div>

      {/* Curator Note */}
      <div>
        <SectionLabel en="Curator's Note" vi="Ghi Chú Giám Tuyển" />
        <p
          className="text-sm leading-relaxed italic"
          style={{ color: "#4a2c1a" }}
        >
          {artwork.curatorNote}
        </p>
      </div>

      {/* Artist Bio */}
      <div
        className="pt-6"
        style={{ borderTop: "1px solid rgba(122,21,21,0.2)" }}
      >
        <SectionLabel en="About the Artist" vi="Về Nghệ Sĩ" />
        <p className="text-sm leading-relaxed" style={{ color: "#4a2c1a" }}>
          {artwork.longBio}
        </p>
      </div>

      {/* Copyright */}
      <div
        className="pt-4"
        style={{ borderTop: "1px solid rgba(122,21,21,0.2)" }}
      >
        <p className="text-xs" style={{ color: "#8a6040" }}>
          © {artwork.year} {artwork.artistName}. All rights reserved.
        </p>
      </div>

      {/* Back link */}
      <div>
        <Link
          href="/"
          className="text-xs hover:underline"
          style={{ color: "#7a1515" }}
        >
          ← Back to Archive
        </Link>
      </div>
    </div>
  );
}
