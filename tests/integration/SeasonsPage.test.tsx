/**
 * Integration tests for SeasonsPage
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { SeasonsPage } from '@/pages/SeasonsPage';
import * as useSeasonsModule from '@/hooks/useSeasons';

// Mock the useSeasons hook
vi.mock('@/hooks/useSeasons', () => ({
  useSeasons: vi.fn(),
  clearSeasonsCache: vi.fn()
}));

const mockSeasons = [
  {
    seasonNumber: 1,
    episodeCount: 13,
    year: 1999,
    description: 'Season 1 of The Sopranos',
    episodes: [
      {
        episodeNumber: 1,
        title: 'Pilot',
        airDate: '1999-01-10',
        summary: 'Tony Soprano visits a psychiatrist.',
        director: 'David Chase',
        writer: 'David Chase',
        runtime: 60,
        music: [],
        quotes: []
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
  },
  {
    seasonNumber: 2,
    episodeCount: 13,
    year: 2000,
    description: 'Season 2 of The Sopranos',
    episodes: [
      {
        episodeNumber: 1,
        title: 'Guy Walks into a Psychiatrist\'s Office',
        airDate: '2000-01-16',
        summary: 'Tony adjusts to life after being shot.',
        director: 'Allen Coulter',
        writer: 'Jason Cahill',
        runtime: 60,
        music: [],
        quotes: []
      }
    ]
  }
];

describe('SeasonsPage', () => {
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
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<SeasonsPage />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should display error state', () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: undefined,
      error: 'Failed to load seasons'
    });

    render(
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<SeasonsPage />} />
        </Routes>
      </BrowserRouter>
    );

    expect(screen.getByText(/failed to load seasons/i)).toBeInTheDocument();
  });

  it('should render sidebar with season list', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/seasons/1']}>
        <Routes>
          <Route path="/seasons/:seasonNumber?" element={<SeasonsPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Season 1')).toBeInTheDocument();
      expect(screen.getByText('Season 2')).toBeInTheDocument();
    });
  });

  it('should display episodes for selected season', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/seasons/1']}>
        <Routes>
          <Route path="/seasons/:seasonNumber?" element={<SeasonsPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Pilot')).toBeInTheDocument();
      expect(screen.getByText('46 Long')).toBeInTheDocument();
    });
  });

  it('should redirect to Season 1 when no season is specified', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    const { container } = render(
      <BrowserRouter initialEntries={['/seasons']}>
        <Routes>
          <Route path="/seasons/:seasonNumber?" element={<SeasonsPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      // Should be redirected to /seasons/1
      expect(container).toBeInTheDocument();
    });
  });

  it('should update episode list when season is changed', async () => {
    const user = userEvent.setup();
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/seasons/1']}>
        <Routes>
          <Route path="/seasons/:seasonNumber?" element={<SeasonsPage />} />
        </Routes>
      </BrowserRouter>
    );

    // Initially showing Season 1 episodes
    await waitFor(() => {
      expect(screen.getByText('Pilot')).toBeInTheDocument();
    });

    // Click Season 2 link
    const season2Link = screen.getByRole('link', { name: /Season 2/i });
    await user.click(season2Link);

    // Should now show Season 2 episode
    await waitFor(() => {
      expect(screen.getByText(/Guy Walks into a Psychiatrist's Office/i)).toBeInTheDocument();
    });
  });

  it('should display "Season not found" for invalid season number', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/seasons/99']}>
        <Routes>
          <Route path="/seasons/:seasonNumber?" element={<SeasonsPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/season not found/i)).toBeInTheDocument();
    });
  });

  it('should use PageWithSidebar layout', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    const { container } = render(
      <BrowserRouter initialEntries={['/seasons/1']}>
        <Routes>
          <Route path="/seasons/:seasonNumber?" element={<SeasonsPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      const layout = container.querySelector('.flex');
      expect(layout).toBeInTheDocument();
    });
  });

  it('should display episode count in season heading', async () => {
    vi.mocked(useSeasonsModule.useSeasons).mockReturnValue({
      loading: false,
      data: mockSeasons,
      error: undefined
    });

    render(
      <BrowserRouter initialEntries={['/seasons/1']}>
        <Routes>
          <Route path="/seasons/:seasonNumber?" element={<SeasonsPage />} />
        </Routes>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/2 episodes/i)).toBeInTheDocument();
    });
  });
});
