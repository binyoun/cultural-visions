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

export default function ArchivePage() {
  const [activeTags, setActiveTags] = useState<string[]>([]);
  const [sort, setSort] = useState<SortOption>("year-desc");

  const filteredAndSorted = useMemo(() => {
    const filtered = filterArtworksByTags(allArtworks, activeTags);
    return sortArtworks(filtered, sort);
  }, [activeTags, sort]);

  const handleTagToggle = (tag: string) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <>
      <FilterBar
        tags={taxonomy.tags}
        activeTags={activeTags}
        onTagToggle={handleTagToggle}
        sort={sort}
        onSortChange={setSort}
        count={filteredAndSorted.length}
        total={allArtworks.length}
      />
      <PageWrapper className="mt-6">
        <ArchiveGrid artworks={filteredAndSorted} />
      </PageWrapper>
    </>
  );
}
