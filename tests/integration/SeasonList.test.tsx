/**
 * Integration tests for SeasonList component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { SeasonList } from '@/components/seasons/SeasonList';
import type { Season } from '@/types';

const mockSeasons: Season[] = [
  {
    seasonNumber: 1,
    episodeCount: 13,
    year: 1999,
    description: 'Season 1',
    episodes: []
  },
  {
    seasonNumber: 2,
    episodeCount: 13,
    year: 2000,
    description: 'Season 2',
    episodes: []
  },
  {
    seasonNumber: 3,
    episodeCount: 13,
    year: 2001,
    description: 'Season 3',
    episodes: []
  }
];

describe('SeasonList', () => {
  it('should render all seasons', () => {
    render(
      <BrowserRouter>
        <SeasonList seasons={mockSeasons} />
      </BrowserRouter>
    );

    expect(screen.getByText('Season 1')).toBeInTheDocument();
    expect(screen.getByText('Season 2')).toBeInTheDocument();
    expect(screen.getByText('Season 3')).toBeInTheDocument();
  });

  it('should display episode count for each season', () => {
    render(
      <BrowserRouter>
        <SeasonList seasons={mockSeasons} />
      </BrowserRouter>
    );

    const episodeCounts = screen.getAllByText(/13 eps/i);
    expect(episodeCounts).toHaveLength(3);
  });

  it('should display year for each season', () => {
    render(
      <BrowserRouter>
        <SeasonList seasons={mockSeasons} />
      </BrowserRouter>
    );

    expect(screen.getByText(/1999/)).toBeInTheDocument();
    expect(screen.getByText(/2000/)).toBeInTheDocument();
    expect(screen.getByText(/2001/)).toBeInTheDocument();
  });

  it('should render navigation links with correct paths', () => {
    render(
      <BrowserRouter>
        <SeasonList seasons={mockSeasons} />
      </BrowserRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', '/seasons/1');
    expect(links[1]).toHaveAttribute('href', '/seasons/2');
    expect(links[2]).toHaveAttribute('href', '/seasons/3');
  });

  it('should handle empty seasons array', () => {
    render(
      <BrowserRouter>
        <SeasonList seasons={[]} />
      </BrowserRouter>
    );

    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });

  it('should apply correct CSS classes', () => {
    const { container } = render(
      <BrowserRouter>
        <SeasonList seasons={mockSeasons} />
      </BrowserRouter>
    );

    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('space-y-2');
  });
});
