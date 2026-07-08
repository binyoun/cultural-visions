import type { ArtworkMatter } from "@/types/artwork";
import ArtworkCard from "./ArtworkCard";

interface ArchiveGridProps {
  artworks: ArtworkMatter[];
  cardSize?: number;
}

export default function ArchiveGrid({ artworks, cardSize = 340 }: ArchiveGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-lg" style={{ color: "var(--text-dim)" }}>No works match the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="gap-4" style={{ columnWidth: `${cardSize}px` }}>
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.slug} artwork={artwork} />
      ))}
    </div>
  );
}
