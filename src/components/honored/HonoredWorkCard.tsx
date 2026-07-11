"use client";

import Image from "next/image";
import Link from "next/link";
import type { ArtworkMatter } from "@/types/artwork";
import TagPill from "@/components/ui/TagPill";

interface HonoredWorkCardProps {
  artwork: ArtworkMatter;
  index: number;
}

const monoLabel: React.CSSProperties = {
  fontFamily: "var(--mono)",
  fontSize: "0.62rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  color: "var(--accent)",
};

export default function HonoredWorkCard({ artwork, index }: HonoredWorkCardProps) {
  const isEven = index % 2 === 0;

  return (
    <article
      className="py-16 sm:py-24 last:border-0"
      style={{ borderBottom: "1px solid var(--line-soft)" }}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${
          isEven ? "" : "lg:[&>*:first-child]:order-2"
        }`}
      >
        {/* Image */}
        <Link
          href={`/artwork/${artwork.slug}/`}
          className="block group relative overflow-hidden"
          style={{
            borderRadius: "10px",
            border: "1px solid var(--line)",
            boxShadow: "0 18px 44px rgba(0,0,0,0.5), 0 0 24px rgba(216,170,120,0.07)",
          }}
        >
          <div
            className="relative w-full"
            style={{
              paddingBottom: `${(artwork.imageHeight / artwork.imageWidth) * 100}%`,
            }}
          >
            <Image
              src={artwork.imagePath}
              alt={artwork.imageAlt}
              fill
              className="object-cover group-hover:scale-[1.02] transition-transform duration-700"
              draggable={false}
              onDragStart={(e) => e.preventDefault()}
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0 z-10"
              onContextMenu={(e) => e.preventDefault()}
              style={{ userSelect: "none" }}
            />
          </div>
        </Link>

        {/* Meta */}
        <div className="space-y-6 lg:py-4">
          <div>
            <p className="mb-2" style={monoLabel}>
              Honored Work · {artwork.catalogueId}
            </p>
            <h2
              className="text-3xl sm:text-4xl leading-tight"
              style={{ fontFamily: "var(--serif)", color: "var(--text-bright)" }}
            >
              {artwork.title}
            </h2>
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
                {artwork.exhibition}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {artwork.tags.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>

          {artwork.artistStatement && (
            <div>
              <h3 className="mb-3" style={monoLabel}>
                Artist Statement
              </h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text)" }}>
                {artwork.artistStatement}
              </p>
            </div>
          )}

          {artwork.curatorNote && (
            <div>
              <h3 className="mb-3" style={monoLabel}>
                Curator&#39;s Note
              </h3>
              <p
                className="text-base leading-relaxed italic"
                style={{ fontFamily: "var(--serif)", color: "var(--text)" }}
              >
                {artwork.curatorNote}
              </p>
            </div>
          )}

          <div className="pt-2">
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

          <Link
            href={`/artwork/${artwork.slug}/`}
            className="nav-link inline-flex items-center gap-2 uppercase"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.72rem",
              letterSpacing: "0.08em",
              color: "var(--accent)",
              textDecoration: "none",
              transition: "color 0.2s",
            }}
          >
            View full detail →
          </Link>
        </div>
      </div>
    </article>
  );
}
