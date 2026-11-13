// Writes public/gallery/artworks.json from the Markdown archive so the walkable
// gallery (a plain static page) reads the same source of record as the Next site.
// Runs automatically before `npm run dev` and `npm run build`.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const dir = path.join(root, "src/content/artworks");
const out = path.join(root, "public/gallery/artworks.json");

const keep = [
  "catalogueId", "title", "artistName", "artistId", "cohort", "year", "campus", "semester", "course",
  "medium", "exhibition", "portfolioUrl", "imagePath", "thumbnailPath", "imageAlt",
  "imageWidth", "imageHeight", "artistStatement", "curatorNote", "isHonored",
];

const works = fs.readdirSync(dir)
  .filter((f) => f.endsWith(".md"))
  .map((f) => {
    const { data } = matter(fs.readFileSync(path.join(dir, f), "utf-8"));
    const w = { slug: f.replace(/\.md$/, "") };
    for (const k of keep) if (data[k] !== undefined && data[k] !== "") w[k] = data[k];
    return w;
  })
  .sort((a, b) => String(a.catalogueId).localeCompare(String(b.catalogueId)));

fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, JSON.stringify(works));
console.log(`gallery: wrote ${works.length} works to public/gallery/artworks.json`);
