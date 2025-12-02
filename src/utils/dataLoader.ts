/**
 * Data Loader Utilities
 * Type guards and validation functions for JSON data loading
 */

import type { Season, Recipe, TopList } from '@/types';

/**
 * Type guard to validate if data matches Season array structure
 * @param data - Unknown data to validate
 * @returns True if data is valid Season array
 */
export function isSeasonArray(data: unknown): data is Season[] {
  if (!Array.isArray(data)) return false;
  if (data.length === 0) return true; // Empty array is valid

  return data.every((item) => {
    if (typeof item !== 'object' || item === null) return false;
    
    const season = item as Record<string, unknown>;
    
    return (
      typeof season['seasonNumber'] === 'number' &&
      typeof season['episodeCount'] === 'number' &&
      typeof season['year'] === 'number' &&
      typeof season['description'] === 'string' &&
      Array.isArray(season['episodes']) &&
      (season['episodes'] as unknown[]).every((episode: unknown) => {
        if (typeof episode !== 'object' || episode === null) return false;
        const ep = episode as Record<string, unknown>;
        return (
          typeof ep['episodeNumber'] === 'number' &&
          typeof ep['title'] === 'string' &&
          typeof ep['airDate'] === 'string' &&
          typeof ep['summary'] === 'string' &&
          typeof ep['director'] === 'string' &&
          typeof ep['writer'] === 'string' &&
          typeof ep['runtime'] === 'number' &&
          Array.isArray(ep['music']) &&
          Array.isArray(ep['quotes'])
        );
      })
    );
  });
}

/**
 * Type guard to validate if data matches Recipe array structure
 * @param data - Unknown data to validate
 * @returns True if data is valid Recipe array
 */
export function isRecipeArray(data: unknown): data is Recipe[] {
  if (!Array.isArray(data)) return false;
  if (data.length === 0) return true; // Empty array is valid

  return data.every((item) => {
    if (typeof item !== 'object' || item === null) return false;
    
    const recipe = item as Record<string, unknown>;
    
    return (
      typeof recipe['id'] === 'string' &&
      typeof recipe['name'] === 'string' &&
      typeof recipe['description'] === 'string' &&
      Array.isArray(recipe['ingredients']) &&
      (recipe['ingredients'] as unknown[]).every((i: unknown) => typeof i === 'string') &&
      Array.isArray(recipe['instructions']) &&
      (recipe['instructions'] as unknown[]).every((i: unknown) => typeof i === 'string') &&
      typeof recipe['prepTime'] === 'number' &&
      typeof recipe['cookTime'] === 'number' &&
      typeof recipe['servings'] === 'number'
    );
  });
}

/**
 * Type guard to validate if data matches TopList array structure
 * @param data - Unknown data to validate
 * @returns True if data is valid TopList array
 */
export function isTopListArray(data: unknown): data is TopList[] {
  if (!Array.isArray(data)) return false;
  if (data.length === 0) return true; // Empty array is valid

  return data.every((item) => {
    if (typeof item !== 'object' || item === null) return false;
    
    const list = item as Record<string, unknown>;
    
    return (
      typeof list['id'] === 'string' &&
      typeof list['title'] === 'string' &&
      typeof list['description'] === 'string' &&
      typeof list['category'] === 'string' &&
      Array.isArray(list['items']) &&
      (list['items'] as unknown[]).every((listItem: unknown) => {
        if (typeof listItem !== 'object' || listItem === null) return false;
        const item = listItem as Record<string, unknown>;
        return (
          typeof item['rank'] === 'number' &&
          typeof item['title'] === 'string' &&
          typeof item['description'] === 'string'
        );
      })
    );
  });
}
