/**
 * useSeasons Hook
 * Custom hook for loading and managing seasons data
 * Features module-level cache for performance
 */

import { useState, useEffect } from 'react';
import type { Season, DataLoadingState } from '@/types';

// Module-level cache to prevent refetching on component remount
let cachedSeasons: Season[] | null = null;
let cachePromise: Promise<Season[]> | null = null;

/**
 * Raw JSON structure from seasons.json
 */
interface RawSeasonData {
  seasonNumber?: number;
  year?: string;
  episodeCount?: number;
  episodes?: Array<{
    episodeNumber?: number;
    episodeInSeason?: number;
    title?: string;
    author?: string;
    director?: string;
    airDate?: string;
    mistress?: string;
    description?: string;
    swedishDescription?: string;
    godfather?: string;
    music?: string;
    hboReview?: string;
    imdbLink?: string;
    imdbRating?: number;
  }>;
}

/**
 * Fetch seasons data from seasons.json with caching
 */
async function fetchSeasons(): Promise<Season[]> {
  // Return cached data if available
  if (cachedSeasons) {
    return cachedSeasons;
  }

  // Return in-flight promise if fetch is already in progress
  if (cachePromise) {
    return cachePromise;
  }

  // Start new fetch
  cachePromise = fetch('/src/data/seasons.json')
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch seasons: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((data: unknown) => {
      // Validate data is an array
      if (!Array.isArray(data)) {
        throw new Error('Invalid seasons data structure: expected array');
      }

      // Transform raw JSON data to match our Season type
      const rawSeasons = data as RawSeasonData[];
      const seasons: Season[] = rawSeasons.map((seasonData) => ({
        seasonNumber: seasonData.seasonNumber || 1,
        episodeCount: seasonData.episodeCount || seasonData.episodes?.length || 0,
        year: seasonData.year 
          ? (typeof seasonData.year === 'string' ? parseInt(seasonData.year) : seasonData.year)
          : (seasonData.episodes?.[0]?.airDate 
              ? new Date(seasonData.episodes[0].airDate).getFullYear() 
              : 1999),
        description: `Season ${seasonData.seasonNumber || 1} of The Sopranos`,
        episodes: (seasonData.episodes || []).map((ep) => ({
          episodeNumber: ep.episodeNumber || ep.episodeInSeason || 1,
          title: ep.title || 'Untitled',
          airDate: ep.airDate || '',
          summary: ep.description || '',
          swedishDescription: ep.swedishDescription,
          director: ep.director || 'Unknown',
          writer: ep.author || 'Unknown',
          runtime: 60,
          music: ep.music && typeof ep.music === 'string'
            ? ep.music
                .split('\n')
                .filter((m) => m.trim())
                .map((m) => {
                  const parts = m.replace(/^\d+\.\s*/, '').split(' - ');
                  return {
                    title: parts[0]?.trim() || m.trim(),
                    artist: parts[1]?.trim() || 'Unknown'
                  };
                })
            : [],
          quotes: [],
          hboReview: ep.hboReview,
          imdbLink: ep.imdbLink,
          imdbRating: ep.imdbRating
        }))
      }));

      cachedSeasons = seasons;
      cachePromise = null;
      return seasons;
    })
    .catch((error) => {
      cachePromise = null;
      throw error;
    });

  return cachePromise;
}

/**
 * Custom hook to load seasons data with loading and error states
 * @returns DataLoadingState with seasons array, loading flag, and error message
 */
export function useSeasons(): DataLoadingState<Season[]> {
  const [state, setState] = useState<DataLoadingState<Season[]>>({
    data: cachedSeasons || undefined,
    loading: !cachedSeasons,
    error: undefined
  });

  useEffect(() => {
    // Skip fetch if data is already cached
    if (cachedSeasons) {
      return;
    }

    let cancelled = false;

    fetchSeasons()
      .then((seasons) => {
        if (!cancelled) {
          setState({
            data: seasons,
            loading: false,
            error: undefined
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({
            data: undefined,
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to load seasons'
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

/**
 * Clear the module-level cache (useful for testing)
 */
export function clearSeasonsCache(): void {
  cachedSeasons = null;
  cachePromise = null;
}
