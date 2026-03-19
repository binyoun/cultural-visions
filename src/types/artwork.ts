export interface Artwork {
  id: string;
  slug: string;
  title: string;
  artistId: string;
  year: number;
  tags: string[];
  imagePath: string;
  thumbnailPath: string;
  imageAlt: string;
  imageWidth: number;
  imageHeight: number;
  artistStatement: string;
  curatorNote: string;
  isHonored: boolean;
  featured: boolean;
}
