import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { seasons } from '@/data/sopranos';

/**
 * Seasons overview page with expandable episode tree view
 */
export const SeasonsPage: React.FC = () => {
  const [expandedSeasons, setExpandedSeasons] = useState<Set<number>>(new Set());

  const toggleSeason = (seasonNumber: number) => {
    const newExpanded = new Set(expandedSeasons);
    if (newExpanded.has(seasonNumber)) {
      newExpanded.delete(seasonNumber);
    } else {
      newExpanded.add(seasonNumber);
    }
    setExpandedSeasons(newExpanded);
  };

  const isSeasonExpanded = (seasonNumber: number) => expandedSeasons.has(seasonNumber);

  return (
    <div className="bg-primary py-16">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          All Seasons & Episodes
        </h1>
        
        <div className="bg-card p-6 rounded shadow mb-8 text-center">
          <p className="text-accent-gold mb-2">📺 Complete Episode Guide</p>
          <p className="text-secondary text-sm">
            Expand each season to view all episodes with detailed information, HBO reviews, music tracks, and Godfather references.
          </p>
        </div>
        
        {/* Expandable Seasons Tree View */}
        <div className="space-y-4">
          {seasons.map((season) => (
            <div key={season.number} className="bg-card rounded shadow overflow-hidden">
              {/* Season Header - Clickable */}
              <button
                onClick={() => toggleSeason(season.number)}
                className="w-full px-6 py-4 bg-secondary hover:bg-hover transition-colors flex items-center justify-between text-left"
              >
                <div className="flex items-center space-x-4">
                  <div className="text-accent-gold text-2xl font-bold">
                    Season {season.number}
                  </div>
                  <div className="text-muted text-sm">
                    {season.episodes} episodes • {season.year}
                  </div>
                </div>
                <div className={`transform transition-transform ${isSeasonExpanded(season.number) ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {/* Episodes List - Expandable */}
              {isSeasonExpanded(season.number) && (
                <div className="border-t border-border-color">
                  {season.episodeList.length > 0 ? (
                    <div className="divide-y divide-border-color">
                      {season.episodeList.map((episode) => (
                        <Link
                          key={`${episode.seasonNumber}-${episode.episodeNumber}`}
                          to={`/seasons/${episode.seasonNumber}/${episode.episodeNumber}`}
                          className="block px-6 py-4 hover:bg-hover transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-2">
                                <span className="text-accent-gold font-bold text-sm">
                                  S{episode.seasonNumber}E{episode.episodeNumber}
                                </span>
                                <h3 className="font-semibold text-primary">
                                  {episode.title}
                                </h3>
                              </div>
                              <div className="text-muted text-sm mb-2">
                                Directed by {episode.director} • Written by {episode.writer} • {episode.airDate}
                              </div>
                              <p className="text-secondary text-sm leading-relaxed mb-3">
                                {episode.description.slice(0, 150)}...
                              </p>
                              <div className="flex flex-wrap gap-4 text-xs text-muted">
                                <span>🎵 {episode.music.slice(0, 2).join(', ')}</span>
                                {episode.mistress !== 'None' && (
                                  <span>💔 {episode.mistress}</span>
                                )}
                              </div>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="px-6 py-8 text-center">
                      <div className="text-muted mb-2">📺</div>
                      <p className="text-secondary text-sm">
                        Episodes for Season {season.number} will be loaded from XML data
                      </p>
                      <p className="text-muted text-xs">
                        {season.episodes} episodes total
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <div className="bg-card p-6 rounded shadow text-center">
            <div className="text-accent-gold text-2xl font-bold mb-2">
              {seasons.length}
            </div>
            <div className="text-muted text-sm">Seasons Available</div>
          </div>
          <div className="bg-card p-6 rounded shadow text-center">
            <div className="text-accent-gold text-2xl font-bold mb-2">
              {seasons.reduce((total, season) => total + season.episodes, 0)}
            </div>
            <div className="text-muted text-sm">Total Episodes</div>
          </div>
          <div className="bg-card p-6 rounded shadow text-center">
            <div className="text-accent-gold text-2xl font-bold mb-2">
              {seasons.reduce((total, season) => total + season.episodeList.length, 0)}
            </div>
            <div className="text-muted text-sm">Episodes with Data</div>
          </div>
          <div className="bg-card p-6 rounded shadow text-center">
            <div className="text-accent-gold text-2xl font-bold mb-2">
              1999-2007
            </div>
            <div className="text-muted text-sm">Original Run</div>
          </div>
        </div>
      </div>
    </div>
  );
};