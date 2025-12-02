/**
 * Unit tests for useSeasons hook
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useSeasons, clearSeasonsCache } from '@/hooks/useSeasons';

describe('useSeasons', () => {
  // Mock fetch
  const mockSeasons = [
    {
      season: 1,
      episodes: [
        {
          episodeNumber: 1,
          episodeInSeason: 1,
          title: 'Pilot',
          airDate: '1999-01-10',
          description: 'Tony Soprano visits a psychiatrist.',
          director: 'David Chase',
          author: 'David Chase',
          runtime: 60,
          music: '1. Woke Up This Morning - Alabama 3\n\n2. Nobody Loves Me But My Mother - B.B. King',
          quotes: ['I find I have to be the sad clown']
        }
      ]
    }
  ];

  beforeEach(() => {
    clearSeasonsCache();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should start in loading state', () => {
    (global.fetch as any).mockImplementation(() =>
      new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useSeasons());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it('should load seasons successfully', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSeasons
    });

    const { result } = renderHook(() => useSeasons());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.length).toBe(1);
    expect(result.current.data?.[0].seasonNumber).toBe(1);
    expect(result.current.data?.[0].episodeCount).toBe(1);
    expect(result.current.data?.[0].episodes[0].title).toBe('Pilot');
    expect(result.current.data?.[0].episodes[0].writer).toBe('David Chase');
    expect(result.current.data?.[0].episodes[0].music).toHaveLength(2);
    expect(result.current.data?.[0].episodes[0].music[0].title).toBe('Woke Up This Morning');
    expect(result.current.error).toBeUndefined();
  });

  it('should handle network errors', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useSeasons());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.error).toContain('Network error');
  });

  it('should handle HTTP errors', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: false,
      status: 404,
      statusText: 'Not Found'
    });

    const { result } = renderHook(() => useSeasons());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.error).toContain('404');
  });

  it('should cache data and not refetch on remount', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSeasons
    });

    // First render
    const { result: result1, unmount } = renderHook(() => useSeasons());

    await waitFor(() => {
      expect(result1.current.loading).toBe(false);
    });

    expect(result1.current.data).toBeDefined();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    unmount();

    // Second render - should use cache
    const { result: result2 } = renderHook(() => useSeasons());

    // Should immediately have data from cache
    expect(result2.current.loading).toBe(false);
    expect(result2.current.data).toBeDefined();
    expect(result2.current.data?.[0].seasonNumber).toBe(1);
    
    // Fetch should not have been called again
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should handle invalid data structure', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ invalid: 'data' })
    });

    const { result } = renderHook(() => useSeasons());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.error).toContain('Invalid seasons data structure');
  });

  it('should transform raw JSON to typed Season objects', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSeasons
    });

    const { result } = renderHook(() => useSeasons());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const season = result.current.data?.[0];
    expect(season).toBeDefined();
    
    // Check Season type properties
    expect(season?.seasonNumber).toBe(1);
    expect(season?.episodeCount).toBe(1);
    expect(season?.year).toBe(1999);
    expect(season?.description).toContain('Season 1');

    // Check Episode type properties
    const episode = season?.episodes[0];
    expect(episode?.episodeNumber).toBe(1);
    expect(episode?.title).toBe('Pilot');
    expect(episode?.summary).toBe('Tony Soprano visits a psychiatrist.');
    expect(episode?.writer).toBe('David Chase');
    expect(episode?.director).toBe('David Chase');
    expect(episode?.runtime).toBe(60);

    // Check MusicTrack transformation
    expect(episode?.music).toHaveLength(2);
    expect(episode?.music[0]).toEqual({
      title: 'Woke Up This Morning',
      artist: 'Alabama 3'
    });
    expect(episode?.music[1]).toEqual({
      title: 'Nobody Loves Me But My Mother',
      artist: 'B.B. King'
    });
  });
});
