"use client";

import Image from "next/image";
import Link from "next/link";
import type { ArtworkWithArtist } from "@/lib/dataLoader";
import TagPill from "@/components/ui/TagPill";

interface HonoredWorkCardProps {
  artwork: ArtworkWithArtist;
  index: number;
}

export default function HonoredWorkCard({ artwork, index }: HonoredWorkCardProps) {
  const isEven = index % 2 === 0;

  return (
    <article className="py-16 sm:py-24 border-b border-[#2a2a2a] last:border-0">
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
            <p className="text-xs uppercase tracking-widest text-[#c9a84c] mb-2">
              Honored Work
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#e5e5e5] leading-tight">
              {artwork.title}
            </h2>
            <p className="mt-2 text-[#9ca3af] text-lg">{artwork.artist.displayName}</p>
            <p className="text-[#6b6b6b] text-sm mt-1">{artwork.year}</p>
          </div>

          <div className="flex flex-wrap gap-2">
            {artwork.tags.map((tag) => (
              <TagPill key={tag} label={tag} />
            ))}
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#6b6b6b] mb-3">
              Artist Statement
            </h3>
            <p className="text-[#9ca3af] text-sm leading-relaxed">
              {artwork.artistStatement}
            </p>
          </div>

          <div>
            <h3 className="text-xs uppercase tracking-widest text-[#6b6b6b] mb-3">
              Curator&#39;s Note
            </h3>
            <p className="text-[#9ca3af] text-sm leading-relaxed italic">
              {artwork.curatorNote}
            </p>
          </div>

          <div className="pt-2">
            <p className="text-xs text-[#6b6b6b]">
              © {artwork.year} {artwork.artist.displayName}. All rights reserved.
            </p>
          </div>

          <Link
            href={`/artwork/${artwork.slug}/`}
            className="inline-flex items-center gap-2 text-sm text-[#c9a84c] hover:underline"
          >
            View full detail →
          </Link>
        </div>
      </div>
    </article>
  );
}
