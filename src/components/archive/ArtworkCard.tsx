"use client";

import Link from "next/link";
import Image from "next/image";
import type { ArtworkMatter } from "@/types/artwork";

interface ArtworkCardProps {
  artwork: ArtworkMatter;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const aspectRatio = artwork.imageHeight / artwork.imageWidth;

  return (
    <Link
      href={`/artwork/${artwork.slug}/`}
      className="block break-inside-avoid mb-3 group relative overflow-hidden"
    >
      <div
        className="relative w-full overflow-hidden"
        style={{ paddingBottom: `${aspectRatio * 100}%` }}
      >
        <Image
          src={artwork.thumbnailPath}
          alt={artwork.imageAlt}
          fill
          className="object-cover"
          draggable={false}
          onDragStart={(e) => e.preventDefault()}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Transparent overlay — blocks right-click/drag on image */}
        <div
          className="absolute inset-0 z-10"
          onContextMenu={(e) => e.preventDefault()}
          style={{ userSelect: "none" }}
        />

        {/* Hover overlay — slides up from bottom */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-end p-4 translate-y-full group-hover:translate-y-0"
          style={{
            background:
              "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.3) 50%, transparent 100%)",
            transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <h3 className="font-serif text-white text-base leading-snug">
            {artwork.title}
          </h3>
          <p className="text-gray-400 text-xs mt-0.5 tracking-wide">
            {artwork.artistName}
          </p>
        </div>
      </div>
    </Link>
  );
}
