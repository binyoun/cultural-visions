import type { ArtworkMatter } from "@/types/artwork";
import ArtworkImage from "./ArtworkImage";
import ArtworkMeta from "./ArtworkMeta";

interface ArtworkDetailProps {
  artwork: ArtworkMatter;
}

export default function ArtworkDetail({ artwork }: ArtworkDetailProps) {
  return (
    <div className="min-h-screen">
      {/* Mobile: stacked. Desktop: 60/40 grid */}
      <div className="lg:grid lg:grid-cols-[60fr_40fr] lg:min-h-screen">
        {/* Image panel — sticky on desktop */}
        <div
          className="lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden p-4 lg:p-8"
          style={{ backgroundColor: "var(--bg)" }}
        >
          <ArtworkImage artwork={artwork} />
        </div>

        {/* Meta panel — scrollable; top padding clears the fixed header */}
        <div
          className="p-6 pt-20 lg:p-10 lg:pt-20 overflow-y-auto"
          style={{
            backgroundColor: "var(--surface)",
            borderLeft: "1px solid var(--line)",
          }}
        >
          <ArtworkMeta artwork={artwork} />
        </div>
      </div>
    </div>
  );
}
