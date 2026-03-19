import type { ArtworkWithArtist } from "./dataLoader";

export type SortOption = "year-desc" | "year-asc" | "artist-az";

export function sortArtworks(
  artworks: ArtworkWithArtist[],
  sort: SortOption
): ArtworkWithArtist[] {
  const copy = [...artworks];
  switch (sort) {
    case "year-desc":
      return copy.sort((a, b) => b.year - a.year);
    case "year-asc":
      return copy.sort((a, b) => a.year - b.year);
    case "artist-az":
      return copy.sort((a, b) =>
        a.artist.displayName.localeCompare(b.artist.displayName)
      );
    default:
      return copy;
  }
}

export function filterArtworksByTags(
  artworks: ArtworkWithArtist[],
  activeTags: string[]
): ArtworkWithArtist[] {
  if (activeTags.length === 0) return artworks;
  return artworks.filter((aw) =>
    activeTags.every((tag) => aw.tags.includes(tag))
  );
}
