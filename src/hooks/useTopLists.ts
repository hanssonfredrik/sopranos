/**
 * useTopLists Hook
 * Fetches and caches top lists data from toplist.json
 */

import { useState, useEffect } from 'react';
import type { DataLoadingState } from '@/types';

/**
 * Raw top list structure from JSON file
 */
interface RawTopListItem {
  rank: number;
  title: string;
  description: string;
}

interface RawTopList {
  name: string;
  items: RawTopListItem[];
}

interface RawTopListsData {
  topList: RawTopList[];
}

/**
 * Transformed top list item for display
 */
export interface TopListItem {
  rank: number;
  title: string;
  description: string;
}

/**
 * Transformed top list for display
 */
export interface TopList {
  id: string;
  name: string;
  items: TopListItem[];
}

// Module-level cache to prevent refetching on component remount
let cachedTopLists: TopList[] | null = null;
let cachePromise: Promise<TopList[]> | null = null;

/**
 * Fetch and transform top lists data
 */
async function fetchTopLists(): Promise<TopList[]> {
  if (cachedTopLists) {
    return cachedTopLists;
  }

  if (cachePromise) {
    return cachePromise;
  }

  cachePromise = (async () => {
    try {
      const response = await fetch('/src/data/toplist.json');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: RawTopListsData = await response.json();
      
      // Validate data structure
      if (!data || !Array.isArray(data.topList)) {
        throw new Error('Invalid top lists data structure: missing topList array');
      }
      
      // Transform to our format with generated IDs
      const transformedLists: TopList[] = data.topList.map((list) => ({
        id: list.name.toLowerCase().replace(/\s+/g, '-'),
        name: list.name,
        items: list.items.map((item) => ({
          rank: item.rank,
          title: item.title,
          description: item.description
        }))
      }));
      
      cachedTopLists = transformedLists;
      return transformedLists;
    } catch (error) {
      cachePromise = null; // Reset promise on error to allow retry
      if (error instanceof Error) {
        throw new Error(`Failed to load top lists: ${error.message}`);
      }
      throw new Error('Failed to load top lists: Unknown error');
    }
  })();

  return cachePromise;
}

/**
 * Hook to load top lists data
 * Uses module-level caching to prevent unnecessary refetches
 * 
 * @returns DataLoadingState with top lists data, loading, and error states
 * 
 * @example
 * ```tsx
 * function TopListsPage() {
 *   const { data: topLists, loading, error } = useTopLists();
 *   
 *   if (loading) return <LoadingSpinner />;
 *   if (error) return <ErrorMessage message={error} />;
 *   
 *   return (
 *     <div>
 *       {topLists?.map(list => (
 *         <TopList key={list.id} list={list} />
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 */
export function useTopLists(): DataLoadingState<TopList[]> {
  const [data, setData] = useState<TopList[] | undefined>(cachedTopLists ?? undefined);
  const [loading, setLoading] = useState<boolean>(!cachedTopLists);
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    if (cachedTopLists) {
      return;
    }

    fetchTopLists()
      .then((lists) => {
        setData(lists);
        setLoading(false);
      })
      .catch((err) => {
        setError(err instanceof Error ? err.message : 'Failed to load top lists');
        setLoading(false);
      });
  }, []);

  return { data, loading, error };
}

/**
 * Clear the module-level cache (primarily for testing)
 */
export function clearTopListsCache(): void {
  cachedTopLists = null;
  cachePromise = null;
}
