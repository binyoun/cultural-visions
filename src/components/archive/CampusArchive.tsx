"use client";

import { useState, useMemo } from "react";
import { sortArtworks, filterArtworksByTags } from "@/lib/sortUtils";
import type { SortOption } from "@/lib/sortUtils";
import type { ArtworkMatter } from "@/types/artwork";
import FilterBar from "@/components/archive/FilterBar";
import ArchiveGrid from "@/components/archive/ArchiveGrid";
import PageWrapper from "@/components/layout/PageWrapper";

interface Props {
  campus: string;
  initialArtworks: ArtworkMatter[];
  availableTags: string[];
}

export default function CampusArchive({
  campus,
  initialArtworks,
  availableTags,
}: Props) {
  const campusLabel = (campus.charAt(0).toUpperCase() + campus.slice(1)) as
    | "Hanoi"
    | "Saigon";

  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("year-desc");

  const filteredAndSorted = useMemo(() => {
    const filtered = filterArtworksByTags(initialArtworks, activeTags);
    return sortArtworks(filtered, sort);
  }, [initialArtworks, activeTags, sort]);

  const handleTagToggle = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <div
        className="pt-24 pb-6 px-6 lg:px-10"
        style={{ borderBottom: "1px solid rgba(122,21,21,0.2)" }}
      >
        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-0.5"
          style={{ color: "#8a6040" }}
        >
          Campus Archive
        </p>
        <p
          className="text-[9px] tracking-[0.15em] italic mb-2"
          style={{ color: "#b09070" }}
        >
          Kho Lưu Trữ Sinh Viên
        </p>
        <h1
          className="font-serif font-normal text-3xl tracking-[0.25em] uppercase"
          style={{ color: campusLabel === "Hanoi" ? "#2a5a6e" : "#8b3520" }}
        >
          {campusLabel}
        </h1>
      </div>

      <FilterBar
        tags={availableTags}
        activeTags={activeTags}
        onTagToggle={handleTagToggle}
        sort={sort}
        onSortChange={setSort}
        count={filteredAndSorted.length}
        total={initialArtworks.length}
      />
      <PageWrapper className="mt-6">
        <ArchiveGrid artworks={filteredAndSorted} />
      </PageWrapper>
    </>
  );
}
