/**
 * Unit tests for useTopLists hook
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useTopLists, clearTopListsCache } from '@/hooks/useTopLists';

// Mock fetch globally
global.fetch = vi.fn();

const mockTopListsData = {
  topList: [
    {
      name: 'Best Episodes',
      items: [
        {
          rank: 1,
          title: 'Pine Barrens',
          description: 'Christopher and Paulie get lost in the snowy Pine Barrens.'
        },
        {
          rank: 2,
          title: 'College',
          description: 'Tony takes Meadow on a college tour.'
        }
      ]
    },
    {
      name: 'Most Memorable Characters',
      items: [
        {
          rank: 1,
          title: 'Tony Soprano',
          description: 'The complex protagonist who redefined the TV antihero.'
        }
      ]
    }
  ]
};

describe('useTopLists', () => {
  beforeEach(() => {
    clearTopListsCache();
    vi.clearAllMocks();
  });

  it('should return loading state initially', () => {
    vi.mocked(fetch).mockReturnValue(
      new Promise(() => {}) as Promise<Response>
    );

    const { result } = renderHook(() => useTopLists());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it('should fetch and transform top lists data successfully', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTopListsData
    } as Response);

    const { result } = renderHook(() => useTopLists());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data).toHaveLength(2);
    expect(result.current.data?.[0]).toEqual({
      id: 'best-episodes',
      name: 'Best Episodes',
      items: [
        {
          rank: 1,
          title: 'Pine Barrens',
          description: 'Christopher and Paulie get lost in the snowy Pine Barrens.'
        },
        {
          rank: 2,
          title: 'College',
          description: 'Tony takes Meadow on a college tour.'
        }
      ]
    });
    expect(result.current.error).toBeUndefined();
  });

  it('should handle network errors', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useTopLists());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toContain('Network error');
  });

  it('should handle HTTP errors', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: false,
      status: 404
    } as Response);

    const { result } = renderHook(() => useTopLists());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toContain('HTTP error');
  });

  it('should use cached data on subsequent calls', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTopListsData
    } as Response);

    const { result: result1 } = renderHook(() => useTopLists());

    await waitFor(() => {
      expect(result1.current.loading).toBe(false);
    });

    // Second render should use cache
    const { result: result2 } = renderHook(() => useTopLists());

    expect(result2.current.loading).toBe(false);
    expect(result2.current.data).toBeDefined();
    expect(fetch).toHaveBeenCalledTimes(1); // Only called once
  });

  it('should handle invalid data structure (missing topList)', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({})
    } as Response);

    const { result } = renderHook(() => useTopLists());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toContain('Invalid top lists data structure');
  });

  it('should handle invalid data structure (non-array topList)', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ topList: 'not-an-array' })
    } as Response);

    const { result } = renderHook(() => useTopLists());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toContain('Invalid top lists data structure');
  });

  it('should generate correct IDs from list names', async () => {
    vi.mocked(fetch).mockResolvedValueOnce({
      ok: true,
      json: async () => mockTopListsData
    } as Response);

    const { result } = renderHook(() => useTopLists());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data?.[0].id).toBe('best-episodes');
    expect(result.current.data?.[1].id).toBe('most-memorable-characters');
  });
});
