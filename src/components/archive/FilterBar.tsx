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
}

export default function FilterBar({
  tags,
  activeTags,
  onTagToggle,
  sort,
  onSortChange,
  count,
  total,
}: FilterBarProps) {
  return (
    <div
      className="sticky top-14 z-40 backdrop-blur-sm py-3"
      style={{
        backgroundColor: "rgba(232, 212, 160, 0.95)",
        borderBottom: "1px solid rgba(122,21,21,0.25)",
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

          {/* Sort + Count */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xs" style={{ color: "#8a6040" }}>
              Showing {count} of {total} works
            </span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="text-xs px-2 py-1 focus:outline-none"
              style={{
                backgroundColor: "#f2e4c0",
                border: "1px solid rgba(122,21,21,0.4)",
                color: "#4a2c1a",
                fontFamily: "'DM Serif Display', serif",
              }}
            >
              <option value="year-desc">Year: Newest</option>
              <option value="year-asc">Year: Oldest</option>
              <option value="artist-az">Artist: A–Z</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
