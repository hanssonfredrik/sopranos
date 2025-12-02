/**
 * Top List Page Component
 * Displays curated top lists including best episodes, characters, and quotes
 */

import { useTopLists } from '@/hooks/useTopLists';
import { TopListItem } from '@/components/toplist/TopListItem';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

/**
 * Top lists page showing all curated rankings
 * Displays multiple lists with ranked items
 */
export function TopListPage() {
  const { data: topLists, loading, error } = useTopLists();

  // Loading state
  if (loading) {
    return <LoadingSpinner centered label="Loading top lists..." />;
  }

  // Error state
  if (error) {
    return <ErrorMessage message={error} centered />;
  }

  // No data
  if (!topLists || topLists.length === 0) {
    return <ErrorMessage message="No top lists available" centered />;
  }

  return (
    <div className="max-w-6xl mx-auto">
      {/* Page header */}
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-primary mb-3">
          Top Lists
        </h1>
        <p className="text-lg text-secondary">
          Curated rankings of the show's best moments, characters, and episodes
        </p>
      </header>

      {/* Top lists */}
      <div className="space-y-12">
        {topLists.map((list) => (
          <section key={list.id} className="space-y-4">
            {/* List header */}
            <div className="border-l-4 border-accent pl-4 mb-6">
              <h2 className="text-2xl font-bold text-primary mb-1">
                {list.name}
              </h2>
              <p className="text-sm text-secondary">
                {list.items.length} {list.items.length === 1 ? 'item' : 'items'}
              </p>
            </div>

            {/* List items */}
            <div className="space-y-4">
              {list.items.map((item) => (
                <TopListItem
                  key={item.rank}
                  item={item}
                  isTopRank={item.rank === 1}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
