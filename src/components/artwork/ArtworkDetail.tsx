import type { ArtworkWithArtist } from "@/lib/dataLoader";
import ArtworkImage from "./ArtworkImage";
import ArtworkMeta from "./ArtworkMeta";

interface ArtworkDetailProps {
  artwork: ArtworkWithArtist;
}

export default function ArtworkDetail({ artwork }: ArtworkDetailProps) {
  return (
    <div className="min-h-screen">
      {/* Mobile: stacked. Desktop: 60/40 grid */}
      <div className="lg:grid lg:grid-cols-[60fr_40fr] lg:min-h-screen">
        {/* Image panel — sticky on desktop */}
        <div className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] bg-[#0a0a0a] flex items-center justify-center overflow-hidden p-4 lg:p-8">
          <ArtworkImage artwork={artwork} />
        </div>

        {/* Meta panel — scrollable */}
        <div className="bg-[#1a1612] border-l border-[#2e2820] p-6 lg:p-10 overflow-y-auto">
          <ArtworkMeta artwork={artwork} />
        </div>
      </div>
    </div>
  );
}
