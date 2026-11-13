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
  /** Semester show this work was selected for, e.g. "2026-S3". Optional: older entries have none. */
  semester?: string;
  /** Course the work was made in, e.g. "Photography 101 (VART3626)". */
  course?: string;
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
