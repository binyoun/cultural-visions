"use client";

import type { SortOption } from "@/lib/sortUtils";
import TagPill from "@/components/ui/TagPill";

interface FilterBarProps {
  tags: string[];
  activeTags: string[];
  onTagToggle: (tag: string) => void;
  sort: SortOption;
  onSortChange: (sort: SortOption) => void;
  count: number;
  total: number;
  cardSize: number;
  onCardSizeChange: (size: number) => void;
}

export default function FilterBar({
  tags,
  activeTags,
  onTagToggle,
  sort,
  onSortChange,
  count,
  total,
  cardSize,
  onCardSizeChange,
}: FilterBarProps) {
  return (
    <div
      className="sticky top-14 z-40 py-3"
      style={{
        background: "rgba(5,6,7,0.5)",
        backdropFilter: "blur(7px) saturate(1.15)",
        WebkitBackdropFilter: "blur(7px) saturate(1.15)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 flex-1">
            {tags.map((tag) => (
              <TagPill
                key={tag}
                label={tag}
                active={activeTags.includes(tag)}
                onClick={() => onTagToggle(tag)}
              />
            ))}
          </div>

          {/* Size + Sort + Count */}
          <div className="flex items-center gap-4 shrink-0 flex-wrap">
            <label
              className="flex items-center gap-2 uppercase"
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.08em",
                color: "var(--text-dim)",
              }}
            >
              Size
              <input
                type="range"
                className="size-range"
                min={220}
                max={560}
                step={20}
                value={cardSize}
                onChange={(e) => onCardSizeChange(Number(e.target.value))}
                aria-label="Image size"
              />
            </label>
            <span
              className="uppercase"
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.62rem",
                letterSpacing: "0.08em",
                color: "var(--text-dim)",
              }}
            >
              Showing {count} of {total} works
            </span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="px-2 py-1 focus:outline-none"
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.68rem",
                backgroundColor: "var(--surface)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                color: "var(--text)",
              }}
            >
              <option value="year-desc">Year: Newest</option>
              <option value="year-asc">Year: Oldest</option>
              <option value="artist-az">Artist: A-Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
