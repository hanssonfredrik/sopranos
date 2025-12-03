/**
 * TopListItem Component
 * Displays a single ranked item in a top list
 */

import type { TopListItem as TopListItemType } from '@/hooks/useTopLists';

interface TopListItemProps {
  /** The top list item to display */
  item: TopListItemType;
  /** Whether this is the top-ranked item (for special styling) */
  isTopRank?: boolean;
}

/**
 * Displays a ranked item with numbered badge
 */
export function TopListItem({ item, isTopRank = false }: TopListItemProps) {
  return (
    <div
      className={`
        bg-surface rounded-lg shadow-md p-6 transition-all hover:shadow-lg
        ${isTopRank ? 'border-2 border-accent' : ''}
      `}
    >
      <div className="flex items-start gap-4">
        {/* Rank badge */}
        <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white">
          <span className="text-lg font-bold">{item.rank}</span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-semibold text-primary mb-2">
            {item.title}
          </h3>
          <p className="text-secondary leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
