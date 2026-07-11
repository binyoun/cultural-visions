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
      {/* Catalogue number — reference for the selection process */}
      <div>
        <span
          className="inline-block uppercase"
          style={{
            fontFamily: "var(--mono)",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            color: "var(--accent)",
            border: "1px solid var(--line)",
            borderRadius: "5px",
            padding: "4px 10px",
          }}
        >
          {artwork.catalogueId}
        </span>

        {/* Title & Artist */}
        <h1
          className="mt-4 text-3xl sm:text-4xl leading-tight"
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
          {artwork.medium ? ` · ${artwork.medium}` : ""}
        </p>
        {artwork.exhibition && (
          <p
            className="mt-1"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.68rem",
              color: "var(--text-dim)",
            }}
          >
            Exhibited: {artwork.exhibition}
          </p>
        )}
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {artwork.tags.map((tag) => (
          <TagPill key={tag} label={tag} />
        ))}
      </div>

      {/* Artist Statement */}
      {artwork.artistStatement && (
        <div>
          <SectionLabel en="Artist Statement" vi="Tuyên Bố Nghệ Sĩ" />
          <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
            {artwork.artistStatement}
          </p>
        </div>
      )}

      {/* Curator Note */}
      {artwork.curatorNote && (
        <div>
          <SectionLabel en="Curator's Note" vi="Ghi Chú Giám Tuyển" />
          <p
            className="text-base leading-relaxed italic"
            style={{ fontFamily: "var(--serif)", color: "var(--text)" }}
          >
            {artwork.curatorNote}
          </p>
        </div>
      )}

      {/* Artist Bio */}
      {(artwork.longBio || artwork.shortBio) && (
        <div
          className="pt-6"
          style={{ borderTop: "1px solid var(--line-soft)" }}
        >
          <SectionLabel en="About the Artist" vi="Về Nghệ Sĩ" />
          <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
            {artwork.longBio || artwork.shortBio}
          </p>
        </div>
      )}

      {/* More work — external portfolio */}
      {artwork.portfolioUrl && (
        <div
          className="pt-6"
          style={{ borderTop: "1px solid var(--line-soft)" }}
        >
          <SectionLabel en="More Work" vi="Xem Thêm Tác Phẩm" />
          <a
            href={artwork.portfolioUrl}
            target="_blank"
            rel="noopener noreferrer"
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
            View {artwork.artistName}&apos;s portfolio ↗
          </a>
        </div>
      )}

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
