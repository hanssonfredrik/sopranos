/**
 * Season Detail Page Component
 * Displays all episodes for a specific season with season navigation sidebar
 */

import { useParams } from 'react-router-dom';
import { useSeasons } from '@/hooks/useSeasons';
import { PageWithSidebar } from '@/components/layout/PageWithSidebar';
import { SeasonList } from '@/components/seasons/SeasonList';
import { SeasonEpisodeList } from '@/components/seasons/SeasonEpisodeList';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';

/**
 * Season detail page showing episode list for a specific season
 * with sidebar navigation to other seasons
 */
export function SeasonDetailPage() {
  const { seasonNumber } = useParams<{ seasonNumber: string }>();
  const { data: seasons, loading, error } = useSeasons();

  // Loading state
  if (loading) {
    return <LoadingSpinner centered label="Loading season..." />;
  }

  // Error state
  if (error) {
    return <ErrorMessage message={error} centered />;
  }

  // No data
  if (!seasons || seasons.length === 0) {
    return <ErrorMessage message="No seasons data available" centered />;
  }

  // Parse season number
  const currentSeasonNum = parseInt(seasonNumber || '1', 10);
  const currentSeason = seasons.find(s => s.seasonNumber === currentSeasonNum);

  // Season not found
  if (!currentSeason) {
    return (
      <div className="text-center py-16">
        <ErrorMessage
          message={`Season ${seasonNumber} not found`}
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
          activeSeason={currentSeasonNum}
        />
      }
    >
      <SeasonEpisodeList
        seasonNumber={currentSeasonNum}
        episodes={currentSeason.episodes}
      />
    </PageWithSidebar>
  );
}

