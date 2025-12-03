/**
 * EpisodeDetail Component
 * Displays full episode information with all details
 */

import { Link } from 'react-router-dom';
import type { Episode } from '@/types';
import { formatAirDate, formatDuration } from '@/utils';

interface EpisodeDetailProps {
  /** Episode data to display */
  episode: Episode;
  /** Season number for routing */
  seasonNumber: number;
}

/**
 * Episode detail component showing complete episode information
 * Includes summary, crew, music tracks, and quotes
 */
export function EpisodeDetail({ episode, seasonNumber }: EpisodeDetailProps) {
  return (
    <div className="max-w-4xl">
      {/* Back Navigation */}
      <Link
        to={`/seasons/${seasonNumber}`}
        className="inline-flex items-center text-secondary hover:text-primary transition-colors mb-6"
      >
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Season {seasonNumber}
      </Link>

      {/* Episode Header */}
      <div className="bg-surface rounded-lg shadow-md p-6 mb-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="px-3 py-1 bg-primary text-white text-sm font-semibold rounded">
                S{seasonNumber}E{episode.episodeNumber}
              </span>
              <span className="text-sm text-secondary">
                {formatDuration(episode.runtime)}
              </span>
            </div>
            <h1 className="text-3xl font-bold text-primary mb-2">
              {episode.title}
            </h1>
          </div>
          {episode.imdbRating && episode.imdbRating > 0 && (
            <span className="px-2 py-1 bg-yellow-500 text-black text-sm font-semibold rounded flex items-center gap-1">
              ⭐ {episode.imdbRating.toFixed(1)}
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold text-primary">Air Date:</span>{' '}
            <span className="text-secondary">{formatAirDate(episode.airDate)}</span>
          </div>
          <div>
            <span className="font-semibold text-primary">Director:</span>{' '}
            <span className="text-secondary">{episode.director}</span>
          </div>
          <div>
            <span className="font-semibold text-primary">Writer:</span>{' '}
            <span className="text-secondary">{episode.writer}</span>
          </div>
          <div>
            <span className="font-semibold text-primary">Runtime:</span>{' '}
            <span className="text-secondary">{formatDuration(episode.runtime)}</span>
          </div>
          {episode.imdbLink && (
            <div className="col-span-2">
              <span className="font-semibold text-primary">IMDB:</span>{' '}
              <a 
                href={episode.imdbLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                View on IMDB →
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Episode Summary */}
      <div className="bg-surface rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-primary mb-4">Synopsis</h2>
        <p className="text-secondary leading-relaxed whitespace-pre-wrap">
          {episode.swedishDescription || episode.summary}
        </p>
      </div>

      {/* HBO Review */}
      {episode.hboReview && (
        <div className="bg-surface rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">HBO Review</h2>
          <p className="text-secondary leading-relaxed whitespace-pre-wrap">
            {episode.hboReview}
          </p>
        </div>
      )}

      {/* Music Tracks */}
      {episode.music.length > 0 && (
        <div className="bg-surface rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-primary mb-4">
            🎵 Featured Music
          </h2>
          <ul className="space-y-3">
            {episode.music.map((track, index) => (
              <li key={index} className="flex items-start gap-3">
                <span className="text-accent font-semibold min-w-[24px]">
                  {index + 1}.
                </span>
                <div className="text-left">
                  <div className="font-medium text-primary">{track.title}</div>
                  <div className="text-sm text-secondary">{track.artist}</div>
                  {track.scene && (
                    <div className="text-xs text-secondary mt-1 italic">
                      Scene: {track.scene}
                    </div>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Memorable Quotes */}
      {episode.quotes.length > 0 && (
        <div className="bg-surface rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-primary mb-4">
            💬 Memorable Quotes
          </h2>
          <ul className="space-y-4">
            {episode.quotes.map((quote, index) => (
              <li key={index} className="border-l-4 border-accent pl-4 py-2 italic text-secondary">
                "{quote}"
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
