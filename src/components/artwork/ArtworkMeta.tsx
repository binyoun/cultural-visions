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
        className="uppercase"
        style={{
          fontFamily: "var(--mono)",
          fontSize: "0.62rem",
          letterSpacing: "0.22em",
          color: "var(--accent)",
        }}
      >
        {en}
      </h2>
      <span
        className="italic"
        style={{
          fontFamily: "var(--mono)",
          fontSize: "0.58rem",
          letterSpacing: "0.1em",
          color: "var(--text-dim)",
        }}
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
          className="text-3xl sm:text-4xl leading-tight"
          style={{ fontFamily: "var(--serif)", color: "var(--text-bright)" }}
        >
          {artwork.title}
        </h1>
        <p className="mt-2 text-lg" style={{ color: "var(--text)" }}>
          {artwork.artistName}
        </p>
        <p
          className="mt-1"
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.72rem",
            color: "var(--text-dim)",
          }}
        >
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
        <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
          {artwork.artistStatement}
        </p>
      </div>

      {/* Curator Note */}
      <div>
        <SectionLabel en="Curator's Note" vi="Ghi Chú Giám Tuyển" />
        <p
          className="text-base leading-relaxed italic"
          style={{ fontFamily: "var(--serif)", color: "var(--text)" }}
        >
          {artwork.curatorNote}
        </p>
      </div>

      {/* Artist Bio */}
      <div
        className="pt-6"
        style={{ borderTop: "1px solid var(--line-soft)" }}
      >
        <SectionLabel en="About the Artist" vi="Về Nghệ Sĩ" />
        <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
          {artwork.longBio}
        </p>
      </div>

      {/* Copyright */}
      <div
        className="pt-4"
        style={{ borderTop: "1px solid var(--line-soft)" }}
      >
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.62rem",
            color: "var(--text-dim)",
          }}
        >
          © {artwork.year} {artwork.artistName}. All rights reserved.
        </p>
      </div>

      {/* Back link */}
      <div>
        <Link
          href="/"
          className="nav-link uppercase"
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            color: "var(--accent)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
        >
          ← Back to Archive
        </Link>
      </div>
    </div>
  );
}
