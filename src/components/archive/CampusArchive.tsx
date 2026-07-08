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
  const [cardSize, setCardSize] = useState(340);

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
        style={{ borderBottom: "1px solid var(--line)" }}
      >
        <p
          className="flex items-center gap-2.5 text-[10px] tracking-[0.3em] uppercase mb-0.5"
          style={{ fontFamily: "var(--mono)", color: "var(--text-dim)" }}
        >
          <span
            aria-hidden
            style={{
              width: "26px",
              height: "1px",
              background: "var(--line)",
              display: "inline-block",
            }}
          />
          Campus Archive
        </p>
        <p
          className="text-[9px] tracking-[0.15em] italic mb-2"
          style={{ fontFamily: "var(--mono)", color: "var(--text-dim)", opacity: 0.7 }}
        >
          Kho Lưu Trữ Sinh Viên
        </p>
        <h1
          className="font-normal text-3xl tracking-[0.25em] uppercase"
          style={{
            fontFamily: "var(--serif)",
            color:
              campusLabel === "Hanoi"
                ? "var(--campus-hanoi)"
                : "var(--campus-saigon)",
            textShadow: "var(--backlit)",
          }}
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
        cardSize={cardSize}
        onCardSizeChange={setCardSize}
      />
      <PageWrapper className="mt-6">
        <ArchiveGrid artworks={filteredAndSorted} cardSize={cardSize} />
      </PageWrapper>
    </>
  );
}
