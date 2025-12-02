/**
 * Top List Types - Data models for curated top lists (episodes, quotes, music)
 */

/**
 * Individual item in a top list
 */
export interface TopListItem {
  /** Position/rank in the list (1-based) */
  rank: number;
  /** Item title or name */
  title: string;
  /** Item description or context */
  description: string;
  /** Optional reference to source episode */
  episodeReference?: {
    /** Season number */
    season: number;
    /** Episode number */
    episode: number;
  };
}

/**
 * Curated top list with ranked items
 */
export interface TopList {
  /** Unique list identifier */
  id: string;
  /** List title (e.g., "Top 10 Episodes", "Most Iconic Quotes") */
  title: string;
  /** List description/introduction */
  description: string;
  /** List category (episodes, quotes, music, etc.) */
  category: string;
  /** Ranked items in the list */
  items: TopListItem[];
}
