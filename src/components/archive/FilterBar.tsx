"use client";

import type { TaxonomyTag } from "@/types/taxonomy";
import type { SortOption } from "@/lib/sortUtils";
import TagPill from "@/components/ui/TagPill";

interface FilterBarProps {
  tags: TaxonomyTag[];
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
    <div className="sticky top-14 z-40 bg-[#0f0d0b]/90 backdrop-blur-sm border-b border-white/5 py-3">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 flex-1">
            {tags.map((tag) => (
              <TagPill
                key={tag.id}
                label={tag.label}
                active={activeTags.includes(tag.label)}
                onClick={() => onTagToggle(tag.label)}
              />
            ))}
          </div>

          {/* Sort + Count */}
          <div className="flex items-center gap-4 shrink-0">
            <span className="text-xs text-[#6b5c4a]">
              Showing {count} of {total} works
            </span>
            <select
              value={sort}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-[#1a1612] border border-[#2e2820] text-[#b0967a] text-xs rounded px-2 py-1 focus:outline-none focus:border-[#c9a84c]"
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
