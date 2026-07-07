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
      style={{
        borderRadius: "10px",
        border: "1px solid var(--line)",
        transition: "border-color .25s, box-shadow .25s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--border-hover)";
        e.currentTarget.style.boxShadow =
          "0 18px 44px rgba(0,0,0,0.6), 0 0 24px rgba(216,170,120,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "var(--line)";
        e.currentTarget.style.boxShadow = "none";
      }}
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
              "linear-gradient(to top, rgba(5,6,7,0.92) 0%, rgba(5,6,7,0.35) 55%, transparent 100%)",
            transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <h3
            className="text-base leading-snug"
            style={{ fontFamily: "var(--serif)", color: "var(--text-bright)" }}
          >
            {artwork.title}
          </h3>
          <p
            className="mt-0.5 uppercase"
            style={{
              fontFamily: "var(--mono)",
              fontSize: "0.62rem",
              letterSpacing: "0.14em",
              color: "var(--text)",
            }}
          >
            {artwork.artistName}
          </p>
        </div>
      </div>
    </Link>
  );
}
