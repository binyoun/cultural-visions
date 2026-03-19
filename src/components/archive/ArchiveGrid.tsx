import type { ArtworkMatter } from "@/types/artwork";
import ArtworkCard from "./ArtworkCard";

interface ArchiveGridProps {
  artworks: ArtworkMatter[];
}

export default function ArchiveGrid({ artworks }: ArchiveGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-lg" style={{ color: "#8a6040" }}>No works match the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.slug} artwork={artwork} />
      ))}
    </div>
  );
}
