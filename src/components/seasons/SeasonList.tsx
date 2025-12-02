/**
 * SeasonList Component
 * Sidebar navigation for seasons with active state highlighting
 */

import { NavLink } from 'react-router-dom';
import type { Season } from '@/types';

interface SeasonListProps {
  /** Array of seasons to display */
  seasons: Season[];
  /** Currently active season number */
  activeSeason?: number;
}

/**
 * Season list component for sidebar navigation
 * Shows all seasons with active state highlighting
 */
export function SeasonList({ seasons, activeSeason }: SeasonListProps) {
  return (
    <nav className="space-y-2" aria-label="Seasons navigation">
      <h2 className="text-lg font-semibold text-primary mb-4 px-3">
        Seasons
      </h2>
      <ul className="space-y-1">
        {seasons.map((season) => (
          <li key={season.seasonNumber}>
            <NavLink
              to={`/seasons/${season.seasonNumber}`}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md transition-colors ${
                  isActive || season.seasonNumber === activeSeason
                    ? 'bg-primary text-white font-semibold'
                    : 'text-secondary hover:bg-secondary-light hover:text-primary'
                }`
              }
            >
              <div className="flex items-center justify-between">
                <span>Season {season.seasonNumber}</span>
                <span className="text-xs opacity-75">
                  {season.episodeCount} eps
                </span>
              </div>
              <div className="text-xs opacity-75 mt-1">
                {season.year}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
