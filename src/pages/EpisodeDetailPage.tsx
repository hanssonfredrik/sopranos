/**
 * Episode Detail Page Component
 * Shows complete episode information
 */

import { useParams } from 'react-router-dom';
import { useSeasons } from '@/hooks/useSeasons';
import { PageWithSidebar } from '@/components/layout/PageWithSidebar';
import { SeasonList } from '@/components/seasons/SeasonList';
import { EpisodeDetail } from '@/components/seasons/EpisodeDetail';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

/**
 * Episode detail page showing full episode information
 * With sidebar navigation to other seasons
 */
export function EpisodeDetailPage() {
  const { seasonNumber, episodeNumber } = useParams<{ seasonNumber: string; episodeNumber: string }>();
  const { data: seasons, loading, error } = useSeasons();

  // Loading state
  if (loading) {
    return <LoadingSpinner centered label="Loading episode..." />;
  }

  // Error state
  if (error) {
    return <ErrorMessage message={error} centered />;
  }

  // No data
  if (!seasons || seasons.length === 0) {
    return <ErrorMessage message="No seasons data available" centered />;
  }

  // Parse parameters
  const seasonNum = parseInt(seasonNumber || '1', 10);
  const episodeNum = parseInt(episodeNumber || '1', 10);

  // Find season and episode
  const season = seasons.find(s => s.seasonNumber === seasonNum);
  const episode = season?.episodes.find(e => e.episodeNumber === episodeNum);

  // Episode not found
  if (!season || !episode) {
    return (
      <div className="text-center py-16">
        <ErrorMessage
          message={`Episode S${seasonNum}E${episodeNum} not found`}
          centered
        />
      </div>
    );
  }

  return (
    <PageWithSidebar
      sidebar={
        <SeasonList
          seasons={seasons}
          activeSeason={seasonNum}
        />
      }
    >
      <EpisodeDetail
        episode={episode}
        seasonNumber={seasonNum}
      />
    </PageWithSidebar>
  );
}
