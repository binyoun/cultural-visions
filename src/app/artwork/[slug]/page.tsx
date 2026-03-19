import { notFound } from "next/navigation";
import { getArtworkBySlug, getAllSlugs } from "@/lib/getArtworks";
import ArtworkDetail from "@/components/artwork/ArtworkDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);
  if (!artwork) return {};
  return {
    title: `${artwork.title} — ${artwork.artistName} | Cultural Visions`,
    description: artwork.artistStatement.slice(0, 160),
  };
}

export default async function ArtworkPage({ params }: Props) {
  const { slug } = await params;
  const artwork = getArtworkBySlug(slug);

  if (!artwork) notFound();

  return <ArtworkDetail artwork={artwork} />;
}
