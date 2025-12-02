/**
 * Integration tests for TopListPage
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { TopListPage } from '@/pages/TopListPage';
import * as useTopListsModule from '@/hooks/useTopLists';

// Mock the useTopLists hook
vi.mock('@/hooks/useTopLists', () => ({
  useTopLists: vi.fn(),
  clearTopListsCache: vi.fn()
}));

const mockTopLists = [
  {
    id: 'best-episodes',
    name: 'Best Episodes',
    items: [
      {
        rank: 1,
        title: 'Pine Barrens (Season 3, Episode 11)',
        description: 'Christopher and Paulie get lost in the snowy Pine Barrens.'
      },
      {
        rank: 2,
        title: 'College (Season 1, Episode 5)',
        description: 'Tony takes Meadow on a college tour.'
      }
    ]
  },
  {
    id: 'most-memorable-characters',
    name: 'Most Memorable Characters',
    items: [
      {
        rank: 1,
        title: 'Tony Soprano',
        description: 'The complex protagonist who redefined the TV antihero.'
      },
      {
        rank: 2,
        title: 'Dr. Jennifer Melfi',
        description: "Tony's psychiatrist who provides a moral compass."
      }
    ]
  }
];

describe('TopListPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state', () => {
    vi.mocked(useTopListsModule.useTopLists).mockReturnValue({
      loading: true,
      data: undefined,
      error: undefined
    });

    render(<TopListPage />);

    expect(screen.getByText(/loading top lists/i)).toBeInTheDocument();
  });

  it('should display error state', () => {
    vi.mocked(useTopListsModule.useTopLists).mockReturnValue({
      loading: false,
      data: undefined,
      error: 'Failed to load top lists'
    });

    render(<TopListPage />);

    expect(screen.getByText(/failed to load top lists/i)).toBeInTheDocument();
  });

  it('should render page header', async () => {
    vi.mocked(useTopListsModule.useTopLists).mockReturnValue({
      loading: false,
      data: mockTopLists,
      error: undefined
    });

    render(<TopListPage />);

    await waitFor(() => {
      expect(screen.getByText('Top Lists')).toBeInTheDocument();
      expect(screen.getByText(/Curated rankings/i)).toBeInTheDocument();
    });
  });

  it('should render all top lists', async () => {
    vi.mocked(useTopListsModule.useTopLists).mockReturnValue({
      loading: false,
      data: mockTopLists,
      error: undefined
    });

    render(<TopListPage />);

    await waitFor(() => {
      expect(screen.getByText('Best Episodes')).toBeInTheDocument();
      expect(screen.getByText('Most Memorable Characters')).toBeInTheDocument();
    });
  });

  it('should render all items in each list', async () => {
    vi.mocked(useTopListsModule.useTopLists).mockReturnValue({
      loading: false,
      data: mockTopLists,
      error: undefined
    });

    render(<TopListPage />);

    await waitFor(() => {
      // Best Episodes items
      expect(screen.getByText('Pine Barrens (Season 3, Episode 11)')).toBeInTheDocument();
      expect(screen.getByText('College (Season 1, Episode 5)')).toBeInTheDocument();
      
      // Characters items
      expect(screen.getByText('Tony Soprano')).toBeInTheDocument();
      expect(screen.getByText('Dr. Jennifer Melfi')).toBeInTheDocument();
    });
  });

  it('should display item count for each list', async () => {
    vi.mocked(useTopListsModule.useTopLists).mockReturnValue({
      loading: false,
      data: mockTopLists,
      error: undefined
    });

    render(<TopListPage />);

    await waitFor(() => {
      // Both lists have 2 items, so we should see "2 items" twice
      const itemCounts = screen.getAllByText('2 items');
      expect(itemCounts).toHaveLength(2);
    });
  });

  it('should display medal emojis for top 3 ranks', async () => {
    vi.mocked(useTopListsModule.useTopLists).mockReturnValue({
      loading: false,
      data: mockTopLists,
      error: undefined
    });

    render(<TopListPage />);

    await waitFor(() => {
      // Should have gold medals for rank 1 items
      const goldMedals = screen.getAllByText('🥇');
      expect(goldMedals.length).toBeGreaterThan(0);
      
      // Should have silver medals for rank 2 items
      const silverMedals = screen.getAllByText('🥈');
      expect(silverMedals.length).toBeGreaterThan(0);
    });
  });

  it('should display descriptions for all items', async () => {
    vi.mocked(useTopListsModule.useTopLists).mockReturnValue({
      loading: false,
      data: mockTopLists,
      error: undefined
    });

    render(<TopListPage />);

    await waitFor(() => {
      expect(screen.getByText(/Christopher and Paulie get lost/i)).toBeInTheDocument();
      expect(screen.getByText(/Tony takes Meadow on a college tour/i)).toBeInTheDocument();
      expect(screen.getByText(/complex protagonist who redefined/i)).toBeInTheDocument();
      expect(screen.getByText(/psychiatrist who provides a moral compass/i)).toBeInTheDocument();
    });
  });

  it('should handle empty top lists data', () => {
    vi.mocked(useTopListsModule.useTopLists).mockReturnValue({
      loading: false,
      data: [],
      error: undefined
    });

    render(<TopListPage />);

    expect(screen.getByText(/no top lists available/i)).toBeInTheDocument();
  });

  it('should apply correct section structure', async () => {
    vi.mocked(useTopListsModule.useTopLists).mockReturnValue({
      loading: false,
      data: mockTopLists,
      error: undefined
    });

    const { container } = render(<TopListPage />);

    await waitFor(() => {
      const sections = container.querySelectorAll('section');
      expect(sections).toHaveLength(2);
    });
  });

  it('should display list names as h2 headings', async () => {
    vi.mocked(useTopListsModule.useTopLists).mockReturnValue({
      loading: false,
      data: mockTopLists,
      error: undefined
    });

    render(<TopListPage />);

    await waitFor(() => {
      const bestEpisodesHeading = screen.getByText('Best Episodes');
      expect(bestEpisodesHeading.tagName).toBe('H2');
      
      const charactersHeading = screen.getByText('Most Memorable Characters');
      expect(charactersHeading.tagName).toBe('H2');
    });
  });

  it('should use correct CSS classes for layout', async () => {
    vi.mocked(useTopListsModule.useTopLists).mockReturnValue({
      loading: false,
      data: mockTopLists,
      error: undefined
    });

    const { container } = render(<TopListPage />);

    await waitFor(() => {
      const mainContainer = container.querySelector('.max-w-6xl');
      expect(mainContainer).toBeInTheDocument();
    });
  });
});
