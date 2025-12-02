/**
 * Integration tests for EpisodeDetailPage
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { EpisodeDetailPage } from '@/pages/EpisodeDetailPage';
import * as useSeasonsModule from '@/hooks/useSeasons';

// Mock the useSeasons hook
vi.mock('@/hooks/useSeasons', () => ({
  useSeasons: vi.fn(),
  clearSeasonsCache: vi.fn()
}));

const mockSeasons = [
  {
    seasonNumber: 1,
    episodeCount: 2,
    year: 1999,
    description: 'Season 1 of The Sopranos',
    episodes: [
      {
        episodeNumber: 1,
        title: 'Pilot',
        airDate: '1999-01-10',
        summary: 'Tony Soprano visits a psychiatrist to deal with his panic attacks.',
        director: 'David Chase',
        writer: 'David Chase',
        runtime: 60,
        music: [
          { title: 'Woke Up This Morning', artist: 'Alabama 3' }
        ],
        quotes: ['I find I have to be the sad clown']
      },
      {
        episodeNumber: 2,
        title: '46 Long',
        airDate: '1999-01-17',
        summary: 'Tony has trouble with his business.',
        director: 'Dan Attias',
        writer: 'David Chase',
        runtime: 60,
        music: [],
        quotes: []
      }
    ]
  }
];

describe('EpisodeDetailPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state', () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: true,
      data: undefined,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/episodes/1/1']}>
        <Routes>
          <Route path="/episodes/:seasonNumber/:episodeNumber" element={<EpisodeDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display error state', () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: undefined,
      error: 'Failed to load episode data'
    });

    render(
      <BrowserRouter initialEntries={['/episodes/1/1']}>
        <Routes>
          <Route path="/episodes/:seasonNumber/:episodeNumber" element={<EpisodeDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText(/failed to load episode data/i)).toBeInTheDocument();
  });

  it('should render episode detail for valid episode', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/episodes/1/1']}>
        <Routes>
          <Route path="/episodes/:seasonNumber/:episodeNumber" element={<EpisodeDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Pilot')).toBeInTheDocument();
      expect(screen.getByText(/Tony Soprano visits a psychiatrist/i)).toBeInTheDocument();
    });
  });

  it('should display episode metadata', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/episodes/1/1']}>
        <Routes>
          <Route path="/episodes/:seasonNumber/:episodeNumber" element={<EpisodeDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('David Chase')).toBeInTheDocument();
      expect(screen.getByText(/January 10, 1999/i)).toBeInTheDocument();
    });
  });

  it('should display music tracks', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/episodes/1/1']}>
        <Routes>
          <Route path="/episodes/:seasonNumber/:episodeNumber" element={<EpisodeDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Woke Up This Morning/i)).toBeInTheDocument();
      expect(screen.getByText(/Alabama 3/i)).toBeInTheDocument();
    });
  });

  it('should display memorable quotes', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/episodes/1/1']}>
        <Routes>
          <Route path="/episodes/:seasonNumber/:episodeNumber" element={<EpisodeDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/I find I have to be the sad clown/i)).toBeInTheDocument();
    });
  });

  it('should render sidebar with season list', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/episodes/1/1']}>
        <Routes>
          <Route path="/episodes/:seasonNumber/:episodeNumber" element={<EpisodeDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Season 1')).toBeInTheDocument();
    });
  });

  it('should display "Episode not found" for invalid episode number', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/episodes/1/99']}>
        <Routes>
          <Route path="/episodes/:seasonNumber/:episodeNumber" element={<EpisodeDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/episode not found/i)).toBeInTheDocument();
    });
  });

  it('should display "Season not found" for invalid season number', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/episodes/99/1']}>
        <Routes>
          <Route path="/episodes/:seasonNumber/:episodeNumber" element={<EpisodeDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/season not found/i)).toBeInTheDocument();
    });
  });

  it('should navigate to correct episode from URL params', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/episodes/1/2']}>
        <Routes>
          <Route path="/episodes/:seasonNumber/:episodeNumber" element={<EpisodeDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('46 Long')).toBeInTheDocument();
      expect(screen.getByText(/Tony has trouble with his business/i)).toBeInTheDocument();
    });
  });

  it('should have back link with correct href', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/episodes/1/1']}>
        <Routes>
          <Route path="/episodes/:seasonNumber/:episodeNumber" element={<EpisodeDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Pilot')).toBeInTheDocument();
    });

    const backLink = screen.getByRole('link', { name: /back to season/i });
    expect(backLink).toHaveAttribute('href', '/seasons/1');
  });

  it('should use PageWithSidebar layout', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    const { container } = render(
      <BrowserRouter initialEntries={['/episodes/1/1']}>
        <Routes>
          <Route path="/episodes/:seasonNumber/:episodeNumber" element={<EpisodeDetailPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      const layout = container.querySelector('.flex');
      expect(layout).toBeInTheDocument();
    });
  });
});
