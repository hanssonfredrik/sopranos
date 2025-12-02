/**
 * Integration tests for EpisodeDetail component
 */

import { describe, it, expect } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { EpisodeDetail } from '@/components/seasons/EpisodeDetail';
import type { Episode } from '@/types';

const mockEpisode: Episode = {
  episodeNumber: 5,
  title: 'College',
  airDate: '1999-02-07',
  summary: 'While visiting colleges with Meadow, Tony spots a snitch. Carmela finds herself alone at home.',
  director: 'Allen Coulter',
  writer: 'James Manos Jr.',
  runtime: 60,
  music: [
    { title: 'Living on a Thin Line', artist: 'The Kinks' },
    { title: 'Mona Lisas and Mad Hatters', artist: 'Elton John' }
  ],
  quotes: [
    'A wrong decision is better than indecision.',
    'Those who want respect, give respect.'
  ]
};

describe('EpisodeDetail', () => {
  it('should render episode title', () => {
    render(
      <BrowserRouter>
        <EpisodeDetail episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.getByText('College')).toBeInTheDocument();
  });

  it('should display episode badge', () => {
    render(
      <BrowserRouter>
        <EpisodeDetail episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.getByText('S1E5')).toBeInTheDocument();
  });

  it('should display all metadata (director, writer, air date, runtime)', () => {
    render(
      <BrowserRouter>
        <EpisodeDetail episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Directed by:/i)).toBeInTheDocument();
    expect(screen.getByText('Allen Coulter')).toBeInTheDocument();
    expect(screen.getByText(/Written by:/i)).toBeInTheDocument();
    expect(screen.getByText('James Manos Jr.')).toBeInTheDocument();
    expect(screen.getByText(/February 7, 1999/i)).toBeInTheDocument();
    expect(screen.getByText(/60 minutes/i)).toBeInTheDocument();
  });

  it('should display full episode summary', () => {
    render(
      <BrowserRouter>
        <EpisodeDetail episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.getByText(/While visiting colleges with Meadow/i)).toBeInTheDocument();
    expect(screen.getByText(/Carmela finds herself alone at home/i)).toBeInTheDocument();
  });

  it('should render all music tracks', () => {
    render(
      <BrowserRouter>
        <EpisodeDetail episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Featured Music/i)).toBeInTheDocument();
    expect(screen.getByText(/Living on a Thin Line/i)).toBeInTheDocument();
    expect(screen.getByText(/The Kinks/i)).toBeInTheDocument();
    expect(screen.getByText(/Mona Lisas and Mad Hatters/i)).toBeInTheDocument();
    expect(screen.getByText(/Elton John/i)).toBeInTheDocument();
  });

  it('should number music tracks sequentially', () => {
    render(
      <BrowserRouter>
        <EpisodeDetail episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    const musicSection = screen.getByText(/Featured Music/i).closest('section');
    expect(musicSection).toBeInTheDocument();
    
    // Check for numbered list items
    const listItems = within(musicSection!).getAllByRole('listitem');
    expect(listItems).toHaveLength(2);
  });

  it('should render memorable quotes', () => {
    render(
      <BrowserRouter>
        <EpisodeDetail episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Memorable Quotes/i)).toBeInTheDocument();
    expect(screen.getByText(/A wrong decision is better than indecision/i)).toBeInTheDocument();
    expect(screen.getByText(/Those who want respect, give respect/i)).toBeInTheDocument();
  });

  it('should not show music section if no music', () => {
    const episodeWithoutMusic: Episode = {
      ...mockEpisode,
      music: []
    };

    render(
      <BrowserRouter>
        <EpisodeDetail episode={episodeWithoutMusic} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.queryByText(/Featured Music/i)).not.toBeInTheDocument();
  });

  it('should not show quotes section if no quotes', () => {
    const episodeWithoutQuotes: Episode = {
      ...mockEpisode,
      quotes: []
    };

    render(
      <BrowserRouter>
        <EpisodeDetail episode={episodeWithoutQuotes} seasonNumber={1} />
      </BrowserRouter>
    );

    expect(screen.queryByText(/Memorable Quotes/i)).not.toBeInTheDocument();
  });

  it('should render back link', () => {
    render(
      <BrowserRouter>
        <EpisodeDetail episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    const backLink = screen.getByRole('link', { name: /back to season/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/seasons/1');
  });

  it('should have correct href when back link is present', async () => {
    render(
      <BrowserRouter>
        <EpisodeDetail episode={mockEpisode} seasonNumber={2} />
      </BrowserRouter>
    );

    const backLink = screen.getByRole('link', { name: /back to season/i });
    expect(backLink).toHaveAttribute('href', '/seasons/2');
  });

  it('should apply correct styling classes', () => {
    const { container } = render(
      <BrowserRouter>
        <EpisodeDetail episode={mockEpisode} seasonNumber={1} />
      </BrowserRouter>
    );

    const div = container.querySelector('.max-w-4xl');
    expect(div).toBeInTheDocument();
  });
});
