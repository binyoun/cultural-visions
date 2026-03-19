import { loadHonoredArtworks } from "@/lib/dataLoader";
import HonoredHero from "@/components/honored/HonoredHero";
import HonoredWorkCard from "@/components/honored/HonoredWorkCard";
import PageWrapper from "@/components/layout/PageWrapper";

export default function HonoredPage() {
  const honoredWorks = loadHonoredArtworks();

  return (
    <PageWrapper>
      <HonoredHero />
      <div className="mt-4">
        {honoredWorks.map((artwork, index) => (
          <HonoredWorkCard key={artwork.id} artwork={artwork} index={index} />
        ))}
      </div>
    </PageWrapper>
  );
}
