"use client";

import Link from "next/link";
import Image from "next/image";
import type { ArtworkWithArtist } from "@/lib/dataLoader";

interface ArtworkCardProps {
  artwork: ArtworkWithArtist;
}

export default function ArtworkCard({ artwork }: ArtworkCardProps) {
  const aspectRatio = artwork.imageHeight / artwork.imageWidth;

  return (
    <Link
      href={`/artwork/${artwork.slug}/`}
      className="block break-inside-avoid mb-4 group relative overflow-hidden rounded-sm bg-[#1e1e1e]"
    >
      {/* Image container with natural aspect ratio */}
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
        {/* Transparent overlay to prevent right-click save on image */}
        <div
          className="absolute inset-0 z-10"
          onContextMenu={(e) => e.preventDefault()}
          style={{ userSelect: "none" }}
        />
        {/* Hover overlay */}
        <div
          className="absolute inset-0 z-20 flex flex-col justify-end p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-[350ms]"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)",
            transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          <h3 className="font-serif text-[#e5e5e5] text-lg leading-tight">
            {artwork.title}
          </h3>
          <p className="text-[#9ca3af] text-sm mt-1">
            {artwork.artist.displayName}
          </p>
        </div>
      </div>
    </Link>
  );
}
