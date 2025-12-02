/**
 * Central type exports for the Sopranos PWA
 * Re-exports all type definitions from domain-specific modules
 */

// Common types
export type { DataLoadingState, NavigationItem } from './common.types';

// Season & Episode types
export type { Season, Episode, MusicTrack } from './season.types';

// Recipe types
export type { Recipe } from './recipe.types';

// Top List types
export type { TopList, TopListItem } from './toplist.types';

// Legacy types (to be migrated)
export interface NetworkStatus {
  isOnline: boolean;
  effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
  downlink?: number;
}
