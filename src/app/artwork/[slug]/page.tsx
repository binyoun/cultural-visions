import { notFound } from "next/navigation";
import { loadArtworkBySlug, loadAllSlugs } from "@/lib/dataLoader";
import ArtworkDetail from "@/components/artwork/ArtworkDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return loadAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const artwork = loadArtworkBySlug(slug);
  if (!artwork) return {};
  return {
    title: `${artwork.title} — ${artwork.artist.displayName} | Cultural Visions`,
    description: artwork.artistStatement.slice(0, 160),
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;
  const artwork = loadArtworkBySlug(slug);

  if (!artwork) notFound();

  return <ArtworkDetail artwork={artwork} />;
}
