"use client";

import { useState, useMemo } from "react";
import { loadAllArtworks, loadTaxonomy } from "@/lib/dataLoader";
import { sortArtworks, filterArtworksByTags } from "@/lib/sortUtils";
import type { SortOption } from "@/lib/sortUtils";
import FilterBar from "@/components/archive/FilterBar";
import ArchiveGrid from "@/components/archive/ArchiveGrid";
import PageWrapper from "@/components/layout/PageWrapper";

const allArtworks = loadAllArtworks();
const taxonomy = loadTaxonomy();

interface Props {
  campus: string;
}

export default function CampusArchive({ campus }: Props) {
  const campusLabel = (campus.charAt(0).toUpperCase() + campus.slice(1)) as
    | "Hanoi"
    | "Saigon";

  const campusArtworks = useMemo(
    () => allArtworks.filter((aw) => aw.artist.campus === campusLabel),
    [campusLabel]
  );

  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("year-desc");

  const filteredAndSorted = useMemo(() => {
    const filtered = filterArtworksByTags(campusArtworks, activeTags);
    return sortArtworks(filtered, sort);
  }, [campusArtworks, activeTags, sort]);

  const handleTagToggle = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <div className="pt-24 pb-6 px-6 lg:px-10 border-b border-white/5">
        <p className="text-[10px] tracking-[0.3em] uppercase text-[#6b5c4a] mb-0.5">
          Campus Archive
        </p>
        <p className="text-[9px] tracking-[0.15em] text-[#6b5c4a]/60 italic mb-2">
          Kho Lưu Trữ Sinh Viên
        </p>
        <h1
          className="font-sans font-light text-3xl tracking-[0.25em] uppercase"
          style={{ color: campusLabel === "Hanoi" ? "#4a8f9e" : "#b85c38" }}
        >
          {campusLabel}
        </h1>
      </div>

      <FilterBar
        tags={taxonomy.tags}
        activeTags={activeTags}
        onTagToggle={handleTagToggle}
        sort={sort}
        onSortChange={setSort}
        count={filteredAndSorted.length}
        total={campusArtworks.length}
      />
      <PageWrapper className="mt-6">
        <ArchiveGrid artworks={filteredAndSorted} />
      </PageWrapper>
    </>
  );
}
