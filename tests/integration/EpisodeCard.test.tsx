/**
 * Integration tests for EpisodeCard component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { EpisodeCard } from '@/components/seasons/EpisodeCard';
import type { Episode } from '@/types';

const mockEpisode: Episode = {
  episodeNumber: 1,
  title: 'Pilot',
  airDate: '1999-01-10',
  summary: 'Tony Soprano visits a psychiatrist to deal with his panic attacks.',
  director: 'David Chase',
  writer: 'David Chase',
  runtime: 60,
  music: [
    { title: 'Woke Up This Morning', artist: 'Alabama 3' },
    { title: 'Nobody Loves Me But My Mother', artist: 'B.B. King' },
    { title: 'I Wonder Why', artist: 'Dion and the Belmonts' }
  ],
  quotes: ['I find I have to be the sad clown']
};

describe('EpisodeCard', () => {
  it('should render episode title', () => {
    render(
      <BrowserRouter>
        <EpisodeCard episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.getByText('Pilot')).toBeInTheDocument();
  });

  it('should display episode badge with season and episode numbers', () => {
    render(
      <BrowserRouter>
        <EpisodeCard episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.getByText('S1E1')).toBeInTheDocument();
  });

  it('should display director and writer', () => {
    render(
      <BrowserRouter>
        <EpisodeCard episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Written by:/i)).toBeInTheDocument();
    expect(screen.getByText(/David Chase/)).toBeInTheDocument();
    expect(screen.getByText(/Directed by:/i)).toBeInTheDocument();
  });

  it('should display formatted air date', () => {
    render(
      <BrowserRouter>
        <EpisodeCard episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    // formatAirDate('1999-01-10') should return 'January 10, 1999'
    expect(screen.getByText(/January 10, 1999/i)).toBeInTheDocument();
  });

  it('should display episode summary', () => {
    render(
      <BrowserRouter>
        <EpisodeCard episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Tony Soprano visits a psychiatrist/i)).toBeInTheDocument();
  });

  it('should display music preview (first 2 tracks)', () => {
    render(
      <BrowserRouter>
        <EpisodeCard episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Featured Music:/i)).toBeInTheDocument();
    expect(screen.getByText(/Woke Up This Morning/i)).toBeInTheDocument();
    expect(screen.getByText(/Alabama 3/i)).toBeInTheDocument();
    expect(screen.getByText(/Nobody Loves Me But My Mother/i)).toBeInTheDocument();
    expect(screen.getByText(/B.B. King/i)).toBeInTheDocument();
  });

  it('should show music count when more than 2 tracks', () => {
    render(
      <BrowserRouter>
        <EpisodeCard episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.getByText(/\+1 more track/i)).toBeInTheDocument();
  });

  it('should not show music section if no music', () => {
    const episodeWithoutMusic: Episode = {
      ...mockEpisode,
      music: []
    };

    render(
      <BrowserRouter>
        <EpisodeCard episode={episodeWithoutMusic} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.queryByText(/Featured Music:/i)).not.toBeInTheDocument();
  });

  it('should render as a link to episode detail page', () => {
    render(
      <BrowserRouter>
        <EpisodeCard episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/episodes/1/1');
  });

  it('should handle click navigation', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <EpisodeCard episode={mockEpisode} seasonNumber={2} />
      </BrowserRouter>
    );

    const link = screen.getByRole('link');
    await user.click(link);

    // Link should have correct href for season 2
    expect(link).toHaveAttribute('href', '/episodes/2/1');
  });

  it('should apply correct CSS classes for card styling', () => {
    const { container } = render(
      <BrowserRouter>
        <EpisodeCard episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    const link = container.querySelector('a');
    expect(link).toHaveClass('block', 'bg-surface', 'rounded-lg');
  });
});
