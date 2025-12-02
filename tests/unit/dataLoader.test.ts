/**
 * Data Loader Utilities Test Suite
 * Tests for type guard validation functions
 */

import { describe, it, expect } from 'vitest';
import { isSeasonArray, isRecipeArray, isTopListArray } from '@/utils/dataLoader';

describe('isSeasonArray', () => {
  it('validates correct season array structure', () => {
    const validSeasons = [
      {
        seasonNumber: 1,
        episodeCount: 13,
        year: 1999,
        description: 'First season',
        episodes: [
          {
            episodeNumber: 1,
            title: 'Pilot',
            airDate: '1999-01-10',
            summary: 'Tony begins therapy',
            director: 'David Chase',
            writer: 'David Chase',
            runtime: 60,
            music: [],
            quotes: []
          }
        ]
      }
    ];

    expect(isSeasonArray(validSeasons)).toBe(true);
  });

  it('rejects invalid season array', () => {
    expect(isSeasonArray(null)).toBe(false);
    expect(isSeasonArray(undefined)).toBe(false);
    expect(isSeasonArray('not an array')).toBe(false);
    expect(isSeasonArray({})).toBe(false);
  });

  it('rejects season with missing required fields', () => {
    const invalidSeason = [
      {
        seasonNumber: 1,
        episodeCount: 13,
        // missing year, description, episodes
      }
    ];

    expect(isSeasonArray(invalidSeason)).toBe(false);
  });

  it('rejects season with invalid episode structure', () => {
    const invalidEpisode = [
      {
        seasonNumber: 1,
        episodeCount: 13,
        year: 1999,
        description: 'First season',
        episodes: [
          {
            episodeNumber: 1,
            title: 'Pilot'
            // missing required episode fields
          }
        ]
      }
    ];

    expect(isSeasonArray(invalidEpisode)).toBe(false);
  });

  it('validates empty array', () => {
    expect(isSeasonArray([])).toBe(true);
  });
});

describe('isRecipeArray', () => {
  it('validates correct recipe array structure', () => {
    const validRecipes = [
      {
        id: 'pasta-1',
        name: 'Sunday Gravy',
        description: 'Traditional Italian sauce',
        ingredients: ['Tomatoes', 'Garlic'],
        instructions: ['Cook tomatoes', 'Add garlic'],
        prepTime: 30,
        cookTime: 180,
        servings: 8
      }
    ];

    expect(isRecipeArray(validRecipes)).toBe(true);
  });

  it('rejects invalid recipe array', () => {
    expect(isRecipeArray(null)).toBe(false);
    expect(isRecipeArray(undefined)).toBe(false);
    expect(isRecipeArray('not an array')).toBe(false);
  });

  it('rejects recipe with missing required fields', () => {
    const invalidRecipe = [
      {
        id: 'pasta-1',
        name: 'Sunday Gravy'
        // missing required fields
      }
    ];

    expect(isRecipeArray(invalidRecipe)).toBe(false);
  });

  it('rejects recipe with invalid ingredients array', () => {
    const invalidIngredients = [
      {
        id: 'pasta-1',
        name: 'Sunday Gravy',
        description: 'Traditional Italian sauce',
        ingredients: [123, 456], // should be strings
        instructions: ['Cook'],
        prepTime: 30,
        cookTime: 180,
        servings: 8
      }
    ];

    expect(isRecipeArray(invalidIngredients)).toBe(false);
  });

  it('validates empty array', () => {
    expect(isRecipeArray([])).toBe(true);
  });
});

describe('isTopListArray', () => {
  it('validates correct top list array structure', () => {
    const validTopLists = [
      {
        id: 'top-episodes',
        title: 'Top 10 Episodes',
        description: 'The best episodes',
        category: 'episodes',
        items: [
          {
            rank: 1,
            title: 'Pine Barrens',
            description: 'Paulie and Christopher get lost'
          }
        ]
      }
    ];

    expect(isTopListArray(validTopLists)).toBe(true);
  });

  it('rejects invalid top list array', () => {
    expect(isTopListArray(null)).toBe(false);
    expect(isTopListArray(undefined)).toBe(false);
    expect(isTopListArray('not an array')).toBe(false);
  });

  it('rejects top list with missing required fields', () => {
    const invalidList = [
      {
        id: 'top-episodes',
        title: 'Top 10 Episodes'
        // missing required fields
      }
    ];

    expect(isTopListArray(invalidList)).toBe(false);
  });

  it('rejects top list with invalid items structure', () => {
    const invalidItems = [
      {
        id: 'top-episodes',
        title: 'Top 10 Episodes',
        description: 'The best episodes',
        category: 'episodes',
        items: [
          {
            rank: 1
            // missing title and description
          }
        ]
      }
    ];

    expect(isTopListArray(invalidItems)).toBe(false);
  });

  it('validates empty array', () => {
    expect(isTopListArray([])).toBe(true);
  });
});
