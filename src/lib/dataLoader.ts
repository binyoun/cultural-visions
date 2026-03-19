import artworksData from "@/data/artworks.json";
import artistsData from "@/data/artists.json";
import taxonomyData from "@/data/taxonomy.json";
import type { Artwork } from "@/types/artwork";
import type { Artist } from "@/types/artist";
import type { Taxonomy } from "@/types/taxonomy";

export interface ArtworkWithArtist extends Artwork {
  artist: Artist;
}

export function loadAllArtworks(): ArtworkWithArtist[] {
  const artworks = artworksData as Artwork[];
  const artists = artistsData as Artist[];

  return artworks.map((artwork) => {
    const artist = artists.find((a) => a.id === artwork.artistId);
    if (!artist) throw new Error(`Artist not found: ${artwork.artistId}`);
    return { ...artwork, artist };
  });
}

export function loadArtworkBySlug(slug: string): ArtworkWithArtist | null {
  const all = loadAllArtworks();
  return all.find((aw) => aw.slug === slug) ?? null;
}

export function loadAllSlugs(): string[] {
  return (artworksData as Artwork[]).map((aw) => aw.slug);
}

export function loadHonoredArtworks(): ArtworkWithArtist[] {
  return loadAllArtworks().filter((aw) => aw.isHonored);
}

export function loadTaxonomy(): Taxonomy {
  return taxonomyData as Taxonomy;
}

export function loadArtistById(id: string): Artist | null {
  const artists = artistsData as Artist[];
  return artists.find((a) => a.id === id) ?? null;
}
