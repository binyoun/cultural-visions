export interface ArtworkMatter {
  slug: string;
  catalogueId: string;
  title: string;
  artistName: string;
  artistId: string;
  shortBio?: string;
  longBio?: string;
  cohort: string;
  year: number;
  campus: "Hanoi" | "Saigon";
  medium?: string;
  exhibition?: string;
  portfolioUrl?: string;
  imagePath: string;
  thumbnailPath: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  tags: string[];
  artistStatement?: string;
  curatorNote?: string;
  isHonored: boolean;
  featured: boolean;
}
