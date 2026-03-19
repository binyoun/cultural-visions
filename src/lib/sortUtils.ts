import type { ArtworkMatter } from "@/types/artwork";

export type SortOption = "year-desc" | "year-asc" | "artist-az";

export function sortArtworks(
  artworks: ArtworkMatter[],
  sort: SortOption
): ArtworkMatter[] {
  const copy = [...artworks];
  switch (sort) {
    case "year-desc":
      return copy.sort((a, b) => b.year - a.year);
    case "year-asc":
      return copy.sort((a, b) => a.year - b.year);
    case "artist-az":
      return copy.sort((a, b) =>
        a.artistName.localeCompare(b.artistName)
      );
    default:
      return copy;
  }
}

export function filterArtworksByTags(
  artworks: ArtworkMatter[],
  activeTags: string[]
): ArtworkMatter[] {
  if (activeTags.length === 0) return artworks;
  return artworks.filter((aw) =>
    activeTags.every((tag) => aw.tags.includes(tag))
  );
}
