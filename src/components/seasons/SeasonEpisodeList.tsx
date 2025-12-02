/**
 * SeasonEpisodeList Component
 * Grid layout displaying all episodes in a season
 */

import type { Episode } from '@/types';
import { EpisodeCard } from './EpisodeCard';

interface SeasonEpisodeListProps {
  /** Season number for routing */
  seasonNumber: number;
  /** Array of episodes to display */
  episodes: Episode[];
}

/**
 * Season episode list component rendering grid of episode cards
 */
export function SeasonEpisodeList({ seasonNumber, episodes }: SeasonEpisodeListProps) {
  if (episodes.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-secondary">No episodes found for this season.</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-primary mb-6">
        Season {seasonNumber}
      </h1>
      <p className="text-secondary mb-8">
        {episodes.length} episode{episodes.length !== 1 ? 's' : ''}
      </p>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {episodes.map((episode) => (
          <EpisodeCard
            key={episode.episodeNumber}
            episode={episode}
            seasonNumber={seasonNumber}
          />
        ))}
      </div>
    </div>
  );
}
