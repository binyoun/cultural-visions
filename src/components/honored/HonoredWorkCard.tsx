"use client";

import Image from "next/image";
import Link from "next/link";
import type { ArtworkMatter } from "@/types/artwork";
import TagPill from "@/components/ui/TagPill";

interface HonoredWorkCardProps {
  artwork: ArtworkMatter;
  index: number;
}

export default function HonoredWorkCard({ artwork, index }: HonoredWorkCardProps) {
  const isEven = index % 2 === 0;

  return (
    <article
      className="py-16 sm:py-24 last:border-0"
      style={{ borderBottom: "1px solid rgba(122,21,21,0.15)" }}
    >
      <div
        className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start ${
          isEven ? "" : "lg:[&>*:first-child]:order-2"
        }`}
      >
        {/* Image */}
        <Link
          href={`/artwork/${artwork.slug}/`}
          className="block group relative overflow-hidden rounded-sm"
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
            <p
              className="text-xs uppercase tracking-widest mb-2"
              style={{ color: "#7a1515" }}
            >
              Honored Work
            </p>
            <h2
              className="font-serif text-3xl sm:text-4xl leading-tight"
              style={{ color: "#f2e4c0" }}
            >
              {artwork.title}
            </h2>
            <p className="mt-2 text-lg" style={{ color: "#c4a480" }}>
              {artwork.artistName}
            </p>
            <p className="text-sm mt-1" style={{ color: "#6a4a30" }}>
              {artwork.year}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {artwork.tags.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>

          <div>
            <h3
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "#7a1515" }}
            >
              Artist Statement
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#b09070" }}>
              {artwork.artistStatement}
            </p>
          </div>

          <div>
            <h3
              className="text-xs uppercase tracking-widest mb-3"
              style={{ color: "#7a1515" }}
            >
              Curator&#39;s Note
            </h3>
            <p
              className="text-sm leading-relaxed italic"
              style={{ color: "#8a6040" }}
            >
              {artwork.curatorNote}
            </p>
          </div>

          <div className="pt-2">
            <p className="text-xs" style={{ color: "#4a2c1a" }}>
              © {artwork.year} {artwork.artistName}. All rights reserved.
            </p>
          </div>

          <Link
            href={`/artwork/${artwork.slug}/`}
            className="inline-flex items-center gap-2 text-sm hover:underline"
            style={{ color: "#7a1515" }}
          >
            View full detail →
          </Link>
        </div>
      </div>
    </article>
  );
}
