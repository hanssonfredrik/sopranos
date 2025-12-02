import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { seasons } from '@/data/sopranos';

/**
 * Season detail page showing all episodes in a season
 */
export const SeasonDetailPage: React.FC = () => {
  const { seasonNumber } = useParams<{ seasonNumber: string }>();
  const seasonNum = parseInt(seasonNumber || '1');
  const season = seasons.find(s => s.number === seasonNum);
  
  if (!season) {
    return (
      <div className="bg-primary py-16">
        <div className="container mx-auto text-center">
          <div className="text-red-400">Season {seasonNumber} not found</div>
          <Link to="/seasons" className="text-accent-secondary hover:text-accent-primary mt-4 inline-block">
            ← Back to Seasons
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-primary py-16">
      <div className="container mx-auto">
        <div className="flex items-center mb-8">
          <Link to="/seasons" className="text-accent-secondary hover:text-accent-primary mr-4">
            ← Back to Seasons
          </Link>
        </div>
        
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">
            Season {season.number}
          </h1>
          <p className="text-secondary text-lg max-w-3xl mb-4">
            Explore all episodes from Season {season.number} ({season.year}) with complete episode information, HBO reviews, and music tracks.
          </p>
          <div className="text-muted">
            {season.episodes} episodes total • {season.episodeList.length} episodes with full details
          </div>
        </div>
        
        {season.episodeList.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {season.episodeList.map((episode) => (
              <Link
                key={`${episode.seasonNumber}-${episode.episodeNumber}`}
                to={`/seasons/${seasonNumber}/${episode.episodeNumber}`}
                className="bg-card hover:bg-hover p-6 rounded shadow transition-colors group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="text-accent-gold font-bold">
                    Episode {episode.episodeNumber}
                  </div>
                  <div className="text-muted text-xs">
                    {episode.airDate}
                  </div>
                </div>
                
                <h3 className="text-primary font-semibold mb-2 group-hover:text-accent-secondary transition-colors">
                  {episode.title}
                </h3>
                
                <p className="text-muted text-sm mb-3 line-clamp-3">
                  {episode.description.slice(0, 120)}...
                </p>

                <div className="text-xs text-muted">
                  <div>Directed by {episode.director}</div>
                  <div>Music: {episode.music[0]}</div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-card p-8 rounded shadow text-center">
            <div className="text-6xl mb-4">📺</div>
            <h3 className="text-xl font-bold text-accent-gold mb-4">
              Episodes Coming Soon
            </h3>
            <p className="text-secondary mb-4">
              Detailed episode information for Season {season.number} will be added from the XML data.
            </p>
            <p className="text-muted text-sm">
              This season has {season.episodes} episodes from {season.year}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};