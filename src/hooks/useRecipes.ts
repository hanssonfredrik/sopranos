/**
 * useRecipes Hook
 * Custom hook for loading and managing recipes data
 * Features module-level cache for performance
 */

import { useState, useEffect } from 'react';
import type { Recipe, DataLoadingState } from '@/types';
import { toSlug } from '@/utils';

// Module-level cache to prevent refetching on component remount
let cachedRecipes: Recipe[] | null = null;
let cachePromise: Promise<Recipe[]> | null = null;

/**
 * Raw JSON structure from recipes.json
 */
interface RawRecipesData {
  recipes: Array<{
    name: string;
    description: string;
    ingredients: string[];
    instructions: string[];
  }>;
}

/**
 * Fetch recipes data from recipes.json with caching
 */
async function fetchRecipes(): Promise<Recipe[]> {
  // Return cached data if available
  if (cachedRecipes) {
    return cachedRecipes;
  }

  // Return in-flight promise if fetch is already in progress
  if (cachePromise) {
    return cachePromise;
  }

  // Start new fetch
  cachePromise = fetch('/data/recipes.json')
    .then(async (response) => {
      if (!response.ok) {
        throw new Error(`Failed to fetch recipes: ${response.status} ${response.statusText}`);
      }
      return response.json();
    })
    .then((data: unknown) => {
      // Validate data structure
      if (!data || typeof data !== 'object' || !('recipes' in data)) {
        throw new Error('Invalid recipes data structure: expected object with recipes array');
      }

      const rawData = data as RawRecipesData;
      
      if (!Array.isArray(rawData.recipes)) {
        throw new Error('Invalid recipes data structure: recipes must be an array');
      }

      // Transform raw JSON data to match our Recipe type
      const recipes: Recipe[] = rawData.recipes.map((recipe) => ({
        id: toSlug(recipe.name),
        name: recipe.name || 'Untitled Recipe',
        description: recipe.description || '',
        ingredients: recipe.ingredients || [],
        instructions: recipe.instructions || [],
        prepTime: 15, // Default prep time
        cookTime: 30, // Default cook time
        servings: 4 // Default servings
      }));

      cachedRecipes = recipes;
      cachePromise = null;
      return recipes;
    })
    .catch((error) => {
      cachePromise = null;
      throw error;
    });

  return cachePromise;
}

/**
 * Custom hook to load recipes data with loading and error states
 * @returns DataLoadingState with recipes array, loading flag, and error message
 */
export function useRecipes(): DataLoadingState<Recipe[]> {
  const [state, setState] = useState<DataLoadingState<Recipe[]>>({
    data: cachedRecipes || undefined,
    loading: !cachedRecipes,
    error: undefined
  });

  useEffect(() => {
    // Skip fetch if data is already cached
    if (cachedRecipes) {
      return;
    }

    let cancelled = false;

    fetchRecipes()
      .then((recipes) => {
        if (!cancelled) {
          setState({
            data: recipes,
            loading: false,
            error: undefined
          });
        }
      })
      .catch((error) => {
        if (!cancelled) {
          setState({
            data: undefined,
            loading: false,
            error: error instanceof Error ? error.message : 'Failed to load recipes'
          });
        }
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

/**
 * Clear the recipes cache (useful for testing)
 */
export function clearRecipesCache(): void {
  cachedRecipes = null;
  cachePromise = null;
}
