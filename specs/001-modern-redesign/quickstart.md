# Quickstart Guide: Modern Site Redesign

**Feature**: 001-modern-redesign  
**Phase**: 1 - Design & Contracts  
**Date**: 2025-12-02

## Purpose

This guide provides practical examples for implementing components, using data hooks, styling with the design system, and writing tests for the modern site redesign. Use this as a reference when building new components or refactoring existing ones.

---

## Quick Reference

| Task | See Section |
|------|-------------|
| Load seasons data | [Data Loading](#data-loading) |
| Create a new UI component | [Component Patterns](#component-patterns) |
| Style with design system | [Styling Guide](#styling-guide) |
| Add routing | [Routing Setup](#routing-setup) |
| Write component tests | [Testing Examples](#testing-examples) |
| Handle errors | [Error Handling](#error-handling) |

---

## Data Loading

### Using Data Hooks

All JSON data is loaded via custom hooks following a consistent pattern.

**Load Seasons Data**:

```typescript
import { useSeasons } from '@/hooks/useSeasons';

function SeasonsPage() {
  const { data: seasons, loading, error } = useSeasons();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Failed to load seasons" error={error} />;
  }

  if (!seasons) {
    return null;  // Shouldn't happen, but satisfies TypeScript
  }

  return (
    <div>
      {seasons.map(season => (
        <div key={season.seasonNumber}>Season {season.seasonNumber}</div>
      ))}
    </div>
  );
}
```

**Load Recipes Data**:

```typescript
import { useRecipes } from '@/hooks/useRecipes';

function RecipesPage() {
  const { data: recipes, loading, error } = useRecipes();

  // Same loading/error pattern as above
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load recipes" error={error} />;
  if (!recipes) return null;

  return (
    <div>
      {recipes.map(recipe => (
        <div key={recipe.name}>{recipe.name}</div>
      ))}
    </div>
  );
}
```

**Load Top Lists Data**:

```typescript
import { useTopLists } from '@/hooks/useTopLists';

function TopListPage() {
  const { data: topLists, loading, error } = useTopLists();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message="Failed to load top lists" error={error} />;
  if (!topLists) return null;

  return (
    <div>
      {topLists.map(list => (
        <section key={list.name}>
          <h2>{list.name}</h2>
          {/* Render list items */}
        </section>
      ))}
    </div>
  );
}
```

---

## Component Patterns

### Functional Component Template

All components follow this structure:

```typescript
import type { FC } from 'react';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
  className?: string;
}

export const MyComponent: FC<MyComponentProps> = ({ title, onClick, className }) => {
  return (
    <div className={`my-component ${className ?? ''}`}>
      <h2>{title}</h2>
      {onClick && (
        <button onClick={onClick}>Click me</button>
      )}
    </div>
  );
};
```

**Key Points**:
- Use `FC<PropsType>` or explicit return type
- Destructure props in function parameter
- Handle optional props with `??` or conditional rendering
- Accept `className` prop for styling flexibility
- Export as named export, not default

### Component with Children

```typescript
import type { FC, ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
  sidebar?: ReactNode;
  className?: string;
}

export const PageWithSidebar: FC<LayoutProps> = ({ children, sidebar, className }) => {
  return (
    <div className={`grid lg:grid-cols-[280px_1fr] ${className ?? ''}`}>
      {sidebar && (
        <aside className="border-r border-border">
          {sidebar}
        </aside>
      )}
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};
```

**Usage**:

```typescript
<PageWithSidebar
  sidebar={<SeasonList seasons={seasons} />}
>
  <SeasonEpisodeList season={currentSeason} />
</PageWithSidebar>
```

### Component with Hooks

```typescript
import { useState, useCallback } from 'react';
import type { FC } from 'react';

interface SearchableListProps {
  items: string[];
  onItemClick: (item: string) => void;
}

export const SearchableList: FC<SearchableListProps> = ({ items, onItemClick }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleItemClick = useCallback((item: string) => {
    onItemClick(item);
  }, [onItemClick]);

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search..."
        className="w-full px-4 py-2 border border-border rounded-md"
      />
      <ul className="mt-4">
        {filteredItems.map(item => (
          <li key={item}>
            <button onClick={() => handleItemClick(item)}>
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
```

---

## Styling Guide

### Using CSS Variables

Always use CSS custom properties defined in `src/styles/variables.css`:

```typescript
// ✅ Correct: Using CSS variables via Tailwind or inline styles
<div className="bg-[var(--color-primary)] text-white">
  Primary background
</div>

<div style={{ color: 'var(--color-text-secondary)' }}>
  Secondary text
</div>

// ❌ Incorrect: Hardcoded colors
<div className="bg-red-800 text-white">
  Don't hardcode colors
</div>
```

### Responsive Design

Use mobile-first approach with Tailwind breakpoints:

```typescript
// Mobile: stack vertically
// Tablet (md): 2 columns
// Desktop (lg): 3 columns
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {items.map(item => <Card key={item.id} item={item} />)}
</div>

// Mobile: hidden sidebar
// Desktop (lg): visible sidebar
<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
  <aside className="hidden lg:block">
    Sidebar content
  </aside>
  <main>
    Main content
  </main>
</div>
```

### Spacing Scale

Use consistent spacing from design system:

```typescript
// ✅ Correct: Using spacing scale
<div className="p-4 m-2">      {/* 16px padding, 8px margin */}
<div className="px-6 py-4">    {/* 24px horizontal, 16px vertical */}
<div className="space-y-6">    {/* 24px gap between children */}

// ❌ Incorrect: Arbitrary values
<div className="p-[13px] m-[7px]">
```

### Typography

Use design system font sizes and families:

```typescript
// Headings (Playfair Display serif)
<h1 className="font-heading text-4xl font-bold">
  Main Heading
</h1>

// Body text (Inter sans-serif)
<p className="font-primary text-base text-[var(--color-text-primary)]">
  Body paragraph
</p>

// Secondary text
<span className="text-sm text-[var(--color-text-secondary)]">
  Helper text
</span>
```

### Shadows and Borders

```typescript
// Card with shadow
<div className="bg-surface rounded-md shadow-md p-6">
  Card content
</div>

// Hover effect
<button className="shadow-sm hover:shadow-lg transition-shadow duration-300">
  Hover me
</button>

// Border
<div className="border border-[var(--color-border)] rounded-lg">
  Bordered content
</div>
```

---

## Routing Setup

### Defining Routes

```typescript
// src/components/AppRouter.tsx
import { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

// Lazy load pages for code splitting
const HomePage = lazy(() => import('@/pages/HomePage'));
const SeasonsPage = lazy(() => import('@/pages/SeasonsPage'));
const EpisodeDetailPage = lazy(() => import('@/pages/EpisodeDetailPage'));
const RecipesPage = lazy(() => import('@/pages/RecipesPage'));
const TopListPage = lazy(() => import('@/pages/TopListPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <NotFoundPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'seasons', element: <SeasonsPage /> },
      { path: 'seasons/:seasonNumber', element: <SeasonsPage /> },
      { path: 'episodes/:episodeNumber', element: <EpisodeDetailPage /> },
      { path: 'recipes', element: <RecipesPage /> },
      { path: 'recipes/:recipeName', element: <RecipesPage /> },
      { path: 'toplist', element: <TopListPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);

export function AppRouter() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <RouterProvider router={router} />
    </Suspense>
  );
}
```

### Using Route Parameters

```typescript
import { useParams, useNavigate } from 'react-router-dom';

function SeasonsPage() {
  const { seasonNumber } = useParams<{ seasonNumber: string }>();
  const navigate = useNavigate();
  const { data: seasons } = useSeasons();

  // Convert string param to number, default to 1
  const currentSeasonNum = seasonNumber ? Number(seasonNumber) : 1;
  const currentSeason = seasons?.find(s => s.seasonNumber === currentSeasonNum) ?? seasons?.[0];

  const handleSeasonSelect = (num: number) => {
    navigate(`/seasons/${num}`);
  };

  return (
    <PageWithSidebar
      sidebar={
        <SeasonList
          seasons={seasons ?? []}
          currentSeasonNumber={currentSeasonNum}
          onSeasonSelect={handleSeasonSelect}
        />
      }
    >
      {currentSeason && (
        <SeasonEpisodeList
          season={currentSeason}
          onEpisodeClick={(episodeNum) => navigate(`/episodes/${episodeNum}`)}
        />
      )}
    </PageWithSidebar>
  );
}
```

### Navigation Links

```typescript
import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname.startsWith(path);

  return (
    <nav className="flex gap-6">
      <Link
        to="/"
        className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
        aria-current={location.pathname === '/' ? 'page' : undefined}
      >
        Home
      </Link>
      <Link
        to="/seasons"
        className={`nav-link ${isActive('/seasons') ? 'active' : ''}`}
        aria-current={isActive('/seasons') ? 'page' : undefined}
      >
        Seasons
      </Link>
      <Link
        to="/recipes"
        className={`nav-link ${isActive('/recipes') ? 'active' : ''}`}
        aria-current={isActive('/recipes') ? 'page' : undefined}
      >
        Recipes
      </Link>
      <Link
        to="/toplist"
        className={`nav-link ${isActive('/toplist') ? 'active' : ''}`}
        aria-current={isActive('/toplist') ? 'page' : undefined}
      >
        Top List
      </Link>
    </nav>
  );
}
```

---

## Error Handling

### Error Boundary

```typescript
import { Component, type ReactNode, type ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="error-boundary p-6 text-center">
          <h2 className="text-2xl font-bold text-error">Something went wrong</h2>
          <p className="mt-2 text-text-secondary">
            {this.state.error?.message ?? 'An unexpected error occurred'}
          </p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
          >
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Usage**:

```typescript
<ErrorBoundary>
  <App />
</ErrorBoundary>
```

### Async Error Handling

```typescript
function DataLoadingComponent() {
  const { data, loading, error } = useSeasons();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div className="error-message p-6 border border-error rounded-md">
        <h3 className="text-lg font-semibold text-error">Error Loading Data</h3>
        <p className="mt-2 text-text-secondary">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-4 py-2 bg-primary text-white rounded-md"
        >
          Reload Page
        </button>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="empty-state p-6 text-center">
        <p className="text-text-secondary">No data available</p>
      </div>
    );
  }

  return (
    <div>
      {/* Render data */}
    </div>
  );
}
```

---

## Testing Examples

### Testing a Component

```typescript
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { EpisodeCard } from '@/components/seasons/EpisodeCard';
import type { Episode } from '@/types/season.types';

describe('EpisodeCard', () => {
  const mockEpisode: Episode = {
    episodeNumber: 1,
    episodeInSeason: 1,
    title: 'The Sopranos',
    author: 'David Chase',
    director: 'David Chase',
    airDate: '1999-01-10',
    mistress: null,
    description: 'Pilot episode description',
    godfatherReferences: [],
    music: [],
    hboReview: 'HBO review text',
  };

  it('renders episode information', () => {
    render(<EpisodeCard episode={mockEpisode} />);

    expect(screen.getByText('The Sopranos')).toBeInTheDocument();
    expect(screen.getByText(/David Chase/)).toBeInTheDocument();
    expect(screen.getByText(/January 10, 1999/)).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<EpisodeCard episode={mockEpisode} onClick={handleClick} />);

    const card = screen.getByRole('article');
    await user.click(card);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is keyboard accessible', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<EpisodeCard episode={mockEpisode} onClick={handleClick} />);

    const card = screen.getByRole('article');
    card.focus();
    await user.keyboard('{Enter}');

    expect(handleClick).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    const { container } = render(
      <EpisodeCard episode={mockEpisode} className="custom-class" />
    );

    expect(container.querySelector('.custom-class')).toBeInTheDocument();
  });
});
```

### Testing a Hook

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useSeasons } from '@/hooks/useSeasons';

// Mock fetch
global.fetch = vi.fn();

describe('useSeasons', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads seasons successfully', async () => {
    const mockSeasons = [
      { seasonNumber: 1, episodes: [] },
      { seasonNumber: 2, episodes: [] },
    ];

    (global.fetch as any).mockResolvedValueOnce({
      ok: true,
      json: async () => mockSeasons,
    });

    const { result } = renderHook(() => useSeasons());

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockSeasons);
    expect(result.current.error).toBeNull();
  });

  it('handles fetch errors', async () => {
    (global.fetch as any).mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useSeasons());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Network error');
  });
});
```

### Testing with Router

```typescript
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Navigation } from '@/components/Navigation';

describe('Navigation', () => {
  it('highlights active route', () => {
    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveAttribute('aria-current', 'page');
  });

  it('navigates to seasons page', async () => {
    const user = userEvent.setup();

    render(
      <BrowserRouter>
        <Navigation />
      </BrowserRouter>
    );

    await user.click(screen.getByText('Seasons'));

    // Verify navigation occurred (check URL or page content)
    expect(window.location.pathname).toBe('/seasons');
  });
});
```

---

## Common Patterns

### Loading States

```typescript
{loading && <LoadingSpinner />}
{error && <ErrorMessage error={error} />}
{data && <DataDisplay data={data} />}
```

### Conditional Rendering

```typescript
// Optional field
{episode.mistress && <div>Mistress: {episode.mistress}</div>}

// Empty array
{episode.music.length > 0 && (
  <section>
    <h3>Music</h3>
    <ul>
      {episode.music.map((track, idx) => (
        <li key={idx}>{track.song} - {track.artist}</li>
      ))}
    </ul>
  </section>
)}
```

### List Rendering

```typescript
// With key prop
{items.map(item => (
  <ItemCard key={item.id} item={item} />
))}

// With index (only if items don't have unique ID)
{items.map((item, index) => (
  <ItemCard key={index} item={item} />
))}

// Empty state
{items.length === 0 ? (
  <EmptyState message="No items found" />
) : (
  items.map(item => <ItemCard key={item.id} item={item} />)
)}
```

---

## Development Workflow

### Running the App

```powershell
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### File Creation Checklist

When creating a new component:

- [ ] Create component file in appropriate directory (ui/, layout/, seasons/, etc.)
- [ ] Define TypeScript interface for props
- [ ] Implement component with proper types
- [ ] Add className prop for styling flexibility
- [ ] Ensure keyboard accessibility
- [ ] Add ARIA attributes where needed
- [ ] Create test file with same name (`.test.tsx`)
- [ ] Write at least 3 tests (render, interaction, accessibility)
- [ ] Update imports in parent components
- [ ] Add to relevant documentation if public API

---

**Quickstart guide complete. Refer to this document when implementing new features.**
