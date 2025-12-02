/**
 * EpisodeCard Component
 * Displays episode summary in a card format
 */

import { Link } from 'react-router-dom';
import type { Episode } from '@/types';
import { formatAirDate } from '@/utils';

interface EpisodeCardProps {
  /** Episode data to display */
  episode: Episode;
  /** Season number for routing */
  seasonNumber: number;
}

/**
 * Episode card component showing summary information
 * Clickable card that navigates to episode detail page
 */
export function EpisodeCard({ episode, seasonNumber }: EpisodeCardProps) {
  return (
    <Link
      to={`/seasons/${seasonNumber}/${episode.episodeNumber}`}
      className="block bg-surface rounded-lg shadow-md hover:shadow-lg p-5 transition-all hover:-translate-y-1 group"
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 bg-primary text-white text-xs font-semibold rounded">
            S{seasonNumber}E{episode.episodeNumber}
          </span>
          <h3 className="text-lg font-semibold text-primary group-hover:text-primary-light transition-colors">
            {episode.title}
          </h3>
        </div>
      </div>

      <div className="text-sm text-secondary mb-3">
        <div>{formatAirDate(episode.airDate)}</div>
        <div className="mt-1">
          Directed by {episode.director} • Written by {episode.writer}
        </div>
      </div>

      <p className="text-sm text-secondary line-clamp-3 leading-relaxed">
        {episode.summary}
      </p>

      {episode.music.length > 0 && (
        <div className="mt-3 pt-3 border-t border-border text-xs text-secondary">
          <span className="font-medium">🎵 Featured Music:</span>{' '}
          {episode.music.slice(0, 2).map(m => m.title).join(', ')}
          {episode.music.length > 2 && ` +${episode.music.length - 2} more`}
        </div>
      )}
    </Link>
  );
}
