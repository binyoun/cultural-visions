import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { ArtworkMatter } from "@/types/artwork";

const ARTWORKS_DIR = path.join(process.cwd(), "src/content/artworks");

export function getAllArtworks(): ArtworkMatter[] {
  const files = fs.readdirSync(ARTWORKS_DIR);
  return files
    .filter((f) => f.endsWith(".md"))
    .map((filename) => {
      const slug = filename.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(ARTWORKS_DIR, filename), "utf-8");
      const { data } = matter(raw);
      return { slug, ...data } as ArtworkMatter;
    });
}

export function getArtworkBySlug(slug: string): ArtworkMatter | null {
  const filePath = path.join(ARTWORKS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return { slug, ...data } as ArtworkMatter;
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(ARTWORKS_DIR)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getHonoredArtworks(): ArtworkMatter[] {
  return getAllArtworks().filter((aw) => aw.isHonored);
}

export function getUniqueTags(artworks?: ArtworkMatter[]): string[] {
  const source = artworks ?? getAllArtworks();
  const tagSet = new Set<string>();
  source.forEach((aw) => aw.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
