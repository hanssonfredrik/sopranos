/**
 * Season & Episode Types - Data models for Sopranos seasons and episodes
 */

/**
 * Music track featured in an episode
 */
export interface MusicTrack {
  /** Track title */
  title: string;
  /** Artist name */
  artist: string;
  /** Optional timestamp or scene description */
  scene?: string;
}

/**
 * Individual episode data
 */
export interface Episode {
  /** Episode number within the season */
  episodeNumber: number;
  /** Episode title */
  title: string;
  /** Air date in ISO 8601 format (YYYY-MM-DD) */
  airDate: string;
  /** Episode summary/description */
  summary: string;
  /** Director name */
  director: string;
  /** Writer name(s) */
  writer: string;
  /** Runtime in minutes */
  runtime: number;
  /** Music tracks featured in the episode */
  music: MusicTrack[];
  /** Notable quotes from the episode */
  quotes: string[];
}

/**
 * Season data with episode collection
 */
export interface Season {
  /** Season number (1-6 for The Sopranos) */
  seasonNumber: number;
  /** Total number of episodes in the season */
  episodeCount: number;
  /** Year the season aired */
  year: number;
  /** Season description/overview */
  description: string;
  /** Array of episodes in the season */
  episodes: Episode[];
}
