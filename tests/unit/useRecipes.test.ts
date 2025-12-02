/**
 * Unit tests for useRecipes hook
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useRecipes, clearRecipesCache } from '@/hooks/useRecipes';

describe('useRecipes', () => {
  // Mock fetch
  const mockRecipesData = {
    recipes: [
      {
        name: "Tony's Gabagool Sandwich",
        description: 'A classic Italian-American sandwich',
        ingredients: ['1 Italian sub roll', '4-6 slices of capicola'],
        instructions: ['Slice the bread lengthwise', 'Layer the capicola']
      },
      {
        name: "Carmela's Ziti",
        description: 'Famous baked ziti',
        ingredients: ['1 pound ziti pasta', '2 pounds ricotta cheese'],
        instructions: ['Preheat oven to 375°F', 'Cook ziti according to package']
      }
    ]
  };

  beforeEach(() => {
    clearRecipesCache();
    global.fetch = vi.fn();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should start in loading state', () => {
    (global.fetch as any).mockImplementation(() =>
      new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useRecipes());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeUndefined();
  });

  it('should load recipes successfully', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecipesData
    });

    const { result } = renderHook(() => useRecipes());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeDefined();
    expect(result.current.data?.length).toBe(2);
    expect(result.current.data?.[0].name).toBe("Tony's Gabagool Sandwich");
    expect(result.current.data?.[0].id).toBe('tonys-gabagool-sandwich');
    expect(result.current.data?.[0].ingredients).toHaveLength(2);
    expect(result.current.data?.[0].instructions).toHaveLength(2);
    expect(result.current.data?.[1].name).toBe("Carmela's Ziti");
    expect(result.current.error).toBeUndefined();
  });

  it('should handle network errors', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useRecipes());

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

    const { result } = renderHook(() => useRecipes());

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
      json: async () => mockRecipesData
    });

    // First render
    const { result: result1, unmount } = renderHook(() => useRecipes());

    await waitFor(() => {
      expect(result1.current.loading).toBe(false);
    });

    expect(result1.current.data).toBeDefined();
    expect(global.fetch).toHaveBeenCalledTimes(1);

    unmount();

    // Second render - should use cache
    const { result: result2 } = renderHook(() => useRecipes());

    // Should immediately have data from cache
    expect(result2.current.loading).toBe(false);
    expect(result2.current.data).toBeDefined();
    expect(result2.current.data?.[0].name).toBe("Tony's Gabagool Sandwich");
    
    // Fetch should not have been called again
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should handle invalid data structure - missing recipes property', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ invalid: 'data' })
    });

    const { result } = renderHook(() => useRecipes());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.error).toContain('Invalid recipes data structure');
  });

  it('should handle invalid data structure - recipes not array', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ recipes: 'not-an-array' })
    });

    const { result } = renderHook(() => useRecipes());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeDefined();
    expect(result.current.error).toContain('recipes must be an array');
  });

  it('should transform raw JSON to typed Recipe objects with default values', async () => {
    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockRecipesData
    });

    const { result } = renderHook(() => useRecipes());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    const recipe = result.current.data?.[0];
    expect(recipe).toBeDefined();
    
    // Check Recipe type properties
    expect(recipe?.id).toBe('tonys-gabagool-sandwich');
    expect(recipe?.name).toBe("Tony's Gabagool Sandwich");
    expect(recipe?.description).toBe('A classic Italian-American sandwich');
    expect(recipe?.ingredients).toEqual(['1 Italian sub roll', '4-6 slices of capicola']);
    expect(recipe?.instructions).toEqual(['Slice the bread lengthwise', 'Layer the capicola']);
    
    // Check default values
    expect(recipe?.prepTime).toBe(15);
    expect(recipe?.cookTime).toBe(30);
    expect(recipe?.servings).toBe(4);
  });
});
