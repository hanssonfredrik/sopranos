import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { seasons } from '@/data/sopranos';

/**
 * Individual episode detail page
 */
export const EpisodeDetailPage: React.FC = () => {
  const { seasonNumber, episodeNumber } = useParams<{ 
    seasonNumber: string; 
    episodeNumber: string;
  }>();
  
  const seasonNum = parseInt(seasonNumber || '1');
  const episodeNum = parseInt(episodeNumber || '1');
  
  const season = seasons.find(s => s.number === seasonNum);
  const episode = season?.episodeList.find(e => e.episodeNumber === episodeNum);
  
  if (!episode || !season) {
    return (
      <div className="bg-primary py-16">
        <div className="container mx-auto text-center">
          <div className="text-red-400 mb-4">
            Episode not found: Season {seasonNumber}, Episode {episodeNumber}
          </div>
          <Link 
            to="/seasons" 
            className="text-accent-secondary hover:text-accent-primary"
          >
            ← Back to All Seasons
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-primary py-16">
      <div className="container mx-auto">
        <div className="flex items-center mb-8">
          <Link 
            to="/seasons" 
            className="text-accent-secondary hover:text-accent-primary mr-4"
          >
            ← Back to All Seasons
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="mb-6">
              <div className="text-accent-gold text-sm mb-2">
                Season {episode.seasonNumber} • Episode {episode.episodeNumber}
              </div>
              <h1 className="text-4xl font-bold text-primary mb-4">
                {episode.title}
              </h1>
              {episode.originalTitle !== episode.title && (
                <p className="text-muted text-sm mb-4">
                  Original Title: {episode.originalTitle}
                </p>
              )}
            </div>
            
            <div className="bg-card p-6 rounded shadow mb-6">
              <h2 className="text-xl font-bold text-accent-gold mb-4">
                Synopsis
              </h2>
              <p className="text-secondary mb-6 leading-relaxed">
                {episode.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-muted">Air Date:</span>
                  <span className="text-secondary ml-2">{episode.airDate}</span>
                </div>
                <div>
                  <span className="text-muted">Writer:</span>
                  <span className="text-secondary ml-2">{episode.writer}</span>
                </div>
                <div>
                  <span className="text-muted">Director:</span>
                  <span className="text-secondary ml-2">{episode.director}</span>
                </div>
                {episode.mistress !== 'None' && (
                  <div>
                    <span className="text-muted">Mistress:</span>
                    <span className="text-secondary ml-2">{episode.mistress}</span>
                  </div>
                )}
              </div>
            </div>

            {/* HBO Review */}
            <div className="bg-card p-6 rounded shadow mb-6">
              <h2 className="text-xl font-bold text-accent-gold mb-4">
                HBO Review
              </h2>
              <p className="text-secondary leading-relaxed">
                {episode.hboReview}
              </p>
            </div>

            {/* Godfather Reference */}
            <div className="bg-card p-6 rounded shadow">
              <h2 className="text-xl font-bold text-accent-gold mb-4">
                Godfather Connection
              </h2>
              <p className="text-secondary leading-relaxed">
                {episode.godfatherReference}
              </p>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="bg-card p-6 rounded shadow">
              <h3 className="text-lg font-bold text-primary mb-4">
                Episode Details
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted">Season:</span>
                  <span className="text-secondary">{episode.seasonNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Episode:</span>
                  <span className="text-secondary">{episode.episodeNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Year:</span>
                  <span className="text-secondary">{season.year}</span>
                </div>
              </div>
            </div>

            {/* Music Tracks */}
            <div className="bg-card p-6 rounded shadow">
              <h3 className="text-lg font-bold text-primary mb-4">
                Featured Music
              </h3>
              <div className="space-y-2">
                {episode.music.map((track, index) => (
                  <div key={index} className="text-secondary text-sm">
                    🎵 {track}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Navigation */}
            <div className="bg-card p-6 rounded shadow">
              <h3 className="text-lg font-bold text-primary mb-4">
                Navigation
              </h3>
              <div className="space-y-3">
                {episode.episodeNumber > 1 && (
                  <Link
                    to={`/seasons/${seasonNumber}/${episode.episodeNumber - 1}`}
                    className="block text-accent-secondary hover:text-accent-primary text-sm"
                  >
                    ← Previous Episode
                  </Link>
                )}
                {episode.episodeNumber < season.episodes && (
                  <Link
                    to={`/seasons/${seasonNumber}/${episode.episodeNumber + 1}`}
                    className="block text-accent-secondary hover:text-accent-primary text-sm"
                  >
                    Next Episode →
                  </Link>
                )}
                <Link
                  to="/toplist"
                  className="block text-accent-secondary hover:text-accent-primary text-sm"
                >
                  View Top Episodes
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};