import type { ArtworkWithArtist } from "@/lib/dataLoader";
import ArtworkCard from "./ArtworkCard";

interface ArchiveGridProps {
  artworks: ArtworkWithArtist[];
}

export default function ArchiveGrid({ artworks }: ArchiveGridProps) {
  if (artworks.length === 0) {
    return (
      <div className="py-24 text-center">
        <p className="text-[#6b6b6b] text-lg">No works match the selected filters.</p>
      </div>
    );
  }

  return (
    <div className="columns-1 sm:columns-2 lg:columns-3 gap-4">
      {artworks.map((artwork) => (
        <ArtworkCard key={artwork.id} artwork={artwork} />
      ))}
    </div>
  );
}
