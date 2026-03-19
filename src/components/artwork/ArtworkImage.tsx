"use client";

import Image from "next/image";
import type { ArtworkMatter } from "@/types/artwork";

interface ArtworkImageProps {
  artwork: ArtworkMatter;
}

export default function ArtworkImage({ artwork }: ArtworkImageProps) {
  return (
    <div className="relative w-full h-full min-h-[60vh]">
      {/* Layer 4: Transparent pointer-capture overlay */}
      <div
        className="absolute inset-0 z-10"
        onContextMenu={(e) => e.preventDefault()}
        style={{ userSelect: "none", WebkitUserDrag: "none" } as React.CSSProperties}
      />
      <div
        className="relative w-full"
        style={{ paddingBottom: `${(artwork.imageHeight / artwork.imageWidth) * 100}%` }}
      >
        <Image
          src={artwork.imagePath}
          alt={artwork.imageAlt}
          fill
          className="object-contain"
          priority
          draggable={false}
          // Layer 1 & 2: React handlers
          onContextMenu={(e) => e.preventDefault()}
          onDragStart={(e) => e.preventDefault()}
          // Layer 3: CSS via style
          style={{ userSelect: "none", WebkitUserDrag: "none" } as React.CSSProperties}
          sizes="(max-width: 1024px) 100vw, 60vw"
        />
      </div>
    </div>
  );
}
