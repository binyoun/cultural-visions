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
          style={{ backgroundColor: "#0a0806" }}
        >
          <ArtworkImage artwork={artwork} />
        </div>

        {/* Meta panel — scrollable */}
        <div
          className="p-6 lg:p-10 overflow-y-auto"
          style={{
            backgroundColor: "#130f0c",
            borderLeft: "1px solid rgba(122,21,21,0.2)",
          }}
        >
          <ArtworkMeta artwork={artwork} />
        </div>
      </div>
    </div>
  );
}
