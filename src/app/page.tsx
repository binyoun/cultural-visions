import ArchiveStackHero from "@/components/gateway/ArchiveStackHero";
import type { HeroWork } from "@/components/gateway/ArchiveStackHero";
import { getAllArtworks } from "@/lib/getArtworks";

export default function GatewayPage() {
  const artworks = getAllArtworks();
  const works: HeroWork[] = [...artworks]
    .sort((a, b) => Number(b.isHonored) - Number(a.isHonored))
    .map((aw) => ({
      slug: aw.slug,
      title: aw.title,
      artistName: aw.artistName,
      campus: aw.campus,
      imagePath: aw.imagePath,
    }));
  const honoredCount = artworks.filter((aw) => aw.isHonored).length;

  return <ArchiveStackHero works={works} honoredCount={honoredCount} />;
}
