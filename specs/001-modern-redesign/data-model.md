# Data Model: Modern Site Redesign

**Feature**: 001-modern-redesign  
**Phase**: 1 - Design & Contracts  
**Date**: 2025-12-02

## Purpose

This document defines the TypeScript interfaces and data structures for all entities in The Sopranos PWA. All interfaces are derived from the existing JSON data files (seasons.json, recipes.json, toplist.json) and follow TypeScript strict mode requirements from the constitution.

---

## Core Entities

### Season Entity

Represents a season of The Sopranos series containing multiple episodes.

```typescript
interface Season {
  seasonNumber: number;
  episodes: Episode[];
}
```

**Fields**:
- `seasonNumber`: Integer 1-6 representing the season number
- `episodes`: Array of Episode objects (13 episodes typical)

**Validation Rules**:
- `seasonNumber` must be positive integer
- `episodes` array cannot be empty
- All episodes in a season must have unique `episodeInSeason` values

**Usage Context**: Loaded from seasons.json, displayed in SeasonsPage sidebar

---

### Episode Entity

Represents a single episode with complete metadata including Godfather references and music tracks.

```typescript
interface Episode {
  episodeNumber: number;
  episodeInSeason: number;
  title: string;
  author: string;
  director: string;
  airDate: string;
  mistress: string | null;
  description: string;
  godfatherReferences: string[];
  music: MusicTrack[];
  hboReview: string;
}

interface MusicTrack {
  song: string;
  artist: string;
}
```

**Fields**:
- `episodeNumber`: Global episode number (1-86 for full series)
- `episodeInSeason`: Episode number within season (1-13 typical)
- `title`: Episode title
- `author`: Writer(s) of the episode
- `director`: Director(s) of the episode
- `airDate`: ISO 8601 date string (YYYY-MM-DD) or human-readable format
- `mistress`: Name of mistress featured in episode, or null if none
- `description`: Full episode description (multiple paragraphs possible)
- `godfatherReferences`: Array of references to The Godfather films
- `music`: Array of music tracks featured in episode
- `hboReview`: HBO's official review text

**Validation Rules**:
- `episodeNumber` must be positive integer
- `title`, `author`, `director`, `description`, `hboReview` cannot be empty strings
- `airDate` should be parseable as valid date
- `mistress` can be null (optional field)
- `godfatherReferences` can be empty array (not all episodes have references)
- `music` can be empty array (not all episodes track music)

**Usage Context**: Displayed in EpisodeCard (summary), EpisodeDetailPage (full details)

---

### Recipe Entity

Represents an Italian-American recipe featured in The Sopranos with ingredients and cooking instructions.

```typescript
interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}
```

**Fields**:
- `name`: Recipe name (e.g., "Tony's Gabagool Sandwich")
- `description`: Brief description of the recipe and its context in the show
- `ingredients`: Ordered list of ingredients with quantities
- `instructions`: Ordered list of cooking steps

**Validation Rules**:
- `name` cannot be empty string
- `description` cannot be empty string
- `ingredients` array must have at least 1 item
- `instructions` array must have at least 1 item
- Array order matters (display in order provided)

**Usage Context**: Displayed in RecipesPage sidebar (name only), RecipeDetail (full recipe)

---

### TopList Entity

Represents a curated ranked list of episodes, characters, or quotes from the series.

```typescript
interface TopList {
  name: string;
  items: TopListItem[];
}

interface TopListItem {
  rank: number;
  title: string;
  description: string;
}
```

**Fields**:
- `name`: Name of the top list (e.g., "Best Episodes", "Most Memorable Characters")
- `items`: Array of ranked items (typically 5-10 items)

**TopListItem Fields**:
- `rank`: Integer ranking (1 is highest)
- `title`: Title of the item being ranked
- `description`: Explanation of why this item earned its ranking

**Validation Rules**:
- `name` cannot be empty string
- `items` array must have at least 1 item
- `rank` must be positive integer
- `rank` values should be sequential (1, 2, 3, 4, 5) but not enforced in type
- `title` and `description` cannot be empty strings

**Usage Context**: Displayed in TopListPage, all lists shown on single page

---

## UI State Entities

These entities represent component-level state and prop types.

### Data Loading State

Used by custom hooks (useSeasons, useRecipes, useTopLists) to represent async data fetching state.

```typescript
interface DataLoadingState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
```

**Fields**:
- `data`: Loaded data of type T, or null if not yet loaded or error occurred
- `loading`: True while fetch is in progress, false otherwise
- `error`: Error object if fetch failed, null otherwise

**States**:
- Initial state: `{ data: null, loading: true, error: null }`
- Success state: `{ data: T, loading: false, error: null }`
- Error state: `{ data: null, loading: false, error: Error }`

**Usage Context**: Return type for all data loading hooks

---

### Navigation State

Represents the current active route for navigation highlighting.

```typescript
interface NavigationItem {
  path: string;
  label: string;
  isActive: boolean;
}
```

**Fields**:
- `path`: Route path (e.g., "/seasons", "/recipes")
- `label`: Display label for navigation item
- `isActive`: True if current route matches this path

**Usage Context**: Navigation component for rendering menu items with active state

---

## Derived Types

### Helper Types

```typescript
// Extract season by season number
type SeasonLookup = Map<number, Season>;

// Recipe lookup by name (URL-safe slug)
type RecipeLookup = Map<string, Recipe>;

// Episode lookup by global episode number
type EpisodeLookup = Map<number, Episode>;
```

**Usage Context**: Internal to data loading hooks for efficient lookups

---

## Data Transformation Rules

### URL Slugification

Recipe names need URL-safe slugs for routing:

```typescript
function toSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/'/g, '')           // Remove apostrophes
    .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric with hyphens
    .replace(/^-+|-+$/g, '');    // Remove leading/trailing hyphens
}

// Examples:
// "Tony's Gabagool Sandwich" -> "tonys-gabagool-sandwich"
// "Carmela's Ziti" -> "carmelas-ziti"
// "Paulie's Peppers and Eggs" -> "paulies-peppers-and-eggs"
```

**Usage Context**: RecipesPage routing, RecipeList component

### Date Formatting

Episode air dates may be in different formats in JSON, normalize for display:

```typescript
function formatAirDate(airDate: string): string {
  // If ISO format (YYYY-MM-DD), format as "Month DD, YYYY"
  // Otherwise, return as-is
  const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
  if (isoDatePattern.test(airDate)) {
    const date = new Date(airDate);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }
  return airDate;
}

// Examples:
// "1999-01-10" -> "January 10, 1999"
// "January 10, 1999" -> "January 10, 1999" (passthrough)
```

**Usage Context**: EpisodeCard, EpisodeDetailPage

---

## JSON Data Structure

### seasons.json Structure

```json
[
  {
    "seasonNumber": 1,
    "episodes": [
      {
        "episodeNumber": 1,
        "episodeInSeason": 1,
        "title": "The Sopranos",
        "author": "David Chase",
        "director": "David Chase",
        "airDate": "1999-01-10",
        "mistress": null,
        "description": "Episode description...",
        "godfatherReferences": [
          "Reference 1",
          "Reference 2"
        ],
        "music": [
          { "song": "Song Name", "artist": "Artist Name" }
        ],
        "hboReview": "HBO review text..."
      }
    ]
  }
]
```

### recipes.json Structure

```json
[
  {
    "name": "Tony's Gabagool Sandwich",
    "description": "Recipe description...",
    "ingredients": [
      "Ingredient 1",
      "Ingredient 2"
    ],
    "instructions": [
      "Step 1",
      "Step 2"
    ]
  }
]
```

### toplist.json Structure

```json
[
  {
    "name": "Best Episodes",
    "items": [
      {
        "rank": 1,
        "title": "Pine Barrens",
        "description": "Why this is ranked #1..."
      }
    ]
  }
]
```

---

## Type Safety Guarantees

### Strict Null Checks

All interfaces follow TypeScript strict mode with exact optional property types:

```typescript
// ✅ Correct: Explicit null in union
mistress: string | null;

// ❌ Incorrect: Optional property (would allow undefined)
mistress?: string;
```

**Rationale**: JSON data has explicit `null` values, not missing properties. Using `| null` matches the data structure exactly.

### Array Type Safety

All arrays are strongly typed:

```typescript
// ✅ Correct: Typed array
music: MusicTrack[];

// ❌ Incorrect: Any array
music: any[];
```

**Rationale**: TypeScript strict mode with `noUncheckedIndexedAccess` requires explicit array types for safe iteration.

### No Any Types

Constitution prohibits `any` types except for untyped third-party libraries:

```typescript
// ✅ Correct: Explicit unknown, then type guard
function parseJSON(text: string): unknown {
  return JSON.parse(text);
}

const data = parseJSON(text);
if (isSeasonArray(data)) {
  // data is now Season[]
}

// ❌ Incorrect: Using any
const data: any = JSON.parse(text);
```

**Rationale**: Type guards provide runtime safety while maintaining compile-time type checking.

---

## Validation Functions

### Type Guards

```typescript
// Season array validation
function isSeasonArray(value: unknown): value is Season[] {
  if (!Array.isArray(value)) return false;
  return value.every(item => 
    typeof item === 'object' &&
    item !== null &&
    'seasonNumber' in item &&
    'episodes' in item &&
    typeof item.seasonNumber === 'number' &&
    Array.isArray(item.episodes)
  );
}

// Recipe array validation
function isRecipeArray(value: unknown): value is Recipe[] {
  if (!Array.isArray(value)) return false;
  return value.every(item =>
    typeof item === 'object' &&
    item !== null &&
    'name' in item &&
    'description' in item &&
    'ingredients' in item &&
    'instructions' in item &&
    typeof item.name === 'string' &&
    Array.isArray(item.ingredients) &&
    Array.isArray(item.instructions)
  );
}

// TopList array validation
function isTopListArray(value: unknown): value is TopList[] {
  if (!Array.isArray(value)) return false;
  return value.every(item =>
    typeof item === 'object' &&
    item !== null &&
    'name' in item &&
    'items' in item &&
    typeof item.name === 'string' &&
    Array.isArray(item.items)
  );
}
```

**Usage Context**: Data loading hooks use type guards to validate JSON data at runtime before setting state.

---

## State Transitions

All data entities are **read-only** (no mutations). State transitions occur only at the loading state level:

```
[Loading State Transitions]

Initial Load:
  null → { loading: true, data: null, error: null }

Success:
  { loading: true, data: null, error: null } 
    → { loading: false, data: T, error: null }

Error:
  { loading: true, data: null, error: null }
    → { loading: false, data: null, error: Error }

Cached (subsequent loads):
  null → { loading: false, data: T, error: null } (immediate)
```

**No entity-level state transitions** - episodes, recipes, seasons, top lists are immutable after loading.

---

## Integration with Existing Code

### Type Definitions Location

All type definitions will be created in:

```
src/types/
├── season.types.ts     # Season, Episode, MusicTrack
├── recipe.types.ts     # Recipe
├── toplist.types.ts    # TopList, TopListItem
└── common.types.ts     # DataLoadingState, NavigationItem, helpers
```

### Import Pattern

```typescript
// ✅ Correct: Import from types directory
import type { Season, Episode } from '@/types/season.types';
import type { DataLoadingState } from '@/types/common.types';

// ❌ Incorrect: Relative imports outside component directory
import type { Season } from '../../types/season.types';
```

**Rationale**: Absolute imports with `@/` alias improve maintainability and enable easier refactoring.

---

## Next Steps

1. ✅ Data model defined with all entities and validation rules
2. 📝 Create contracts/ directory with component prop interfaces
3. 📝 Create quickstart.md with usage examples
4. 📝 Update agent context with new type definitions

**Phase 1 data model complete. Ready to proceed to contracts definition.**
