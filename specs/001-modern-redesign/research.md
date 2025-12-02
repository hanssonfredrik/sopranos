# Research: Modern Site Redesign

**Feature**: 001-modern-redesign  
**Phase**: 0 - Research & Technology Selection  
**Date**: 2025-12-02

## Purpose

This document captures research findings and technology decisions for implementing a modern, inspiring redesign of The Sopranos PWA. All decisions align with the project constitution and prioritize user experience, performance, and maintainability.

---

## 1. Modern Design System

### Decision: Tailwind CSS with Custom CSS Variables

**Rationale**:
- Already integrated in project (vite.config.ts, existing components use Tailwind)
- Utility-first approach enables rapid prototyping and consistent spacing
- Excellent tree-shaking reduces bundle size
- Custom CSS variables provide theme flexibility while maintaining type safety

**Implementation Approach**:

```css
/* src/styles/variables.css */
:root {
  /* Color Palette - Sopranos-inspired dark, sophisticated theme */
  --color-primary: #8B0000;        /* Dark red (blood/power theme) */
  --color-primary-light: #A52A2A;
  --color-primary-dark: #660000;
  --color-secondary: #1A1A1A;      /* Near black (mob sophistication) */
  --color-secondary-light: #2D2D2D;
  --color-accent: #DAA520;         /* Goldenrod (luxury accent) */
  --color-background: #FAFAFA;     /* Off-white background */
  --color-surface: #FFFFFF;        /* Pure white cards */
  --color-text-primary: #1A1A1A;   /* Near black text */
  --color-text-secondary: #666666; /* Gray text */
  --color-border: #E0E0E0;         /* Light gray borders */
  --color-error: #D32F2F;
  --color-success: #388E3C;

  /* Spacing Scale (4px base) */
  --spacing-xs: 0.25rem;   /* 4px */
  --spacing-sm: 0.5rem;    /* 8px */
  --spacing-md: 0.75rem;   /* 12px */
  --spacing-lg: 1rem;      /* 16px */
  --spacing-xl: 1.5rem;    /* 24px */
  --spacing-2xl: 2rem;     /* 32px */
  --spacing-3xl: 3rem;     /* 48px */
  --spacing-4xl: 4rem;     /* 64px */

  /* Typography */
  --font-family-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-family-heading: 'Playfair Display', Georgia, serif; /* Elegant serif for headings */
  --font-size-xs: 0.75rem;    /* 12px */
  --font-size-sm: 0.875rem;   /* 14px */
  --font-size-base: 1rem;     /* 16px */
  --font-size-lg: 1.125rem;   /* 18px */
  --font-size-xl: 1.25rem;    /* 20px */
  --font-size-2xl: 1.5rem;    /* 24px */
  --font-size-3xl: 1.875rem;  /* 30px */
  --font-size-4xl: 2.25rem;   /* 36px */

  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 20px 25px rgba(0, 0, 0, 0.15);

  /* Border Radius */
  --radius-sm: 0.25rem;   /* 4px */
  --radius-md: 0.5rem;    /* 8px */
  --radius-lg: 0.75rem;   /* 12px */
  --radius-full: 9999px;  /* Fully rounded */

  /* Transitions */
  --transition-fast: 150ms ease-in-out;
  --transition-base: 250ms ease-in-out;
  --transition-slow: 350ms ease-in-out;

  /* Z-index layers */
  --z-base: 0;
  --z-dropdown: 1000;
  --z-sticky: 1100;
  --z-modal: 1200;
  --z-popover: 1300;
  --z-tooltip: 1400;
}
```

**Tailwind Configuration**:
Extend Tailwind to use CSS variables for colors, ensuring consistency and theme flexibility.

**Alternatives Considered**:
- **CSS Modules**: More verbose, harder to maintain consistent spacing
- **Styled Components**: Adds runtime overhead, conflicts with Vite optimization
- **Plain CSS**: No utility classes, more custom CSS to write and maintain

---

## 2. React Router 7.9.3 Patterns

### Decision: Route-based Code Splitting with Nested Layouts

**Routing Architecture**:

```typescript
// src/components/AppRouter.tsx
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
      { path: 'seasons/:seasonNumber', element: <SeasonsPage /> }, // Sidebar navigation
      { path: 'episodes/:episodeNumber', element: <EpisodeDetailPage /> },
      { path: 'recipes', element: <RecipesPage /> },
      { path: 'recipes/:recipeName', element: <RecipesPage /> }, // Sidebar navigation
      { path: 'toplist', element: <TopListPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]);
```

**URL Structure**:
- `/` - Home page
- `/seasons` - All seasons, Season 1 displayed by default
- `/seasons/2` - Season 2 episodes (updates main content, sidebar stays)
- `/episodes/5` - Episode 5 detail page
- `/recipes` - All recipes, first recipe displayed by default
- `/recipes/carmelas-ziti` - Specific recipe detail
- `/toplist` - All top lists on one page

**Data Loading Strategy**:
- Use URL parameters for sidebar state (seasons/:seasonNumber, recipes/:recipeName)
- Load all data upfront in custom hooks (seasons.json, recipes.json are small)
- No React Router loaders needed - data is static and cacheable

**Rationale**:
- Route-based code splitting reduces initial bundle size
- URL parameters enable deep linking and browser back/forward navigation
- Nested layouts avoid duplicating MainLayout across routes
- Lazy loading improves Time to Interactive (TTI)

**Alternatives Considered**:
- **React Router loaders**: Overkill for static JSON, adds complexity
- **Single route with client-side state**: Breaks browser navigation, no deep linking

---

## 3. Data Loading & Caching Strategy

### Decision: Custom Hooks with In-Memory Cache

**Implementation Pattern**:

```typescript
// src/hooks/useSeasons.ts
import { useState, useEffect } from 'react';
import type { Season } from '@/types/season.types';

let seasonsCache: Season[] | null = null;

export function useSeasons() {
  const [data, setData] = useState<Season[] | null>(seasonsCache);
  const [loading, setLoading] = useState(!seasonsCache);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    if (seasonsCache) {
      return; // Use cached data
    }

    const loadData = async () => {
      try {
        const response = await fetch('/src/data/seasons.json');
        if (!response.ok) throw new Error('Failed to load seasons data');
        const seasons: Season[] = await response.json();
        seasonsCache = seasons;
        setData(seasons);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { data, loading, error };
}
```

**Caching Strategy**:
- Module-level cache (survives component re-mounts, cleared on page refresh)
- Service Worker caches JSON files for offline access (configured in vite.config.ts)
- No need for React Query - data is static, no mutations or background updates

**Error Handling**:
- Network errors displayed with user-friendly messages
- Offline mode: Service Worker serves cached JSON
- Fallback UI for missing or malformed data

**Rationale**:
- Simple, predictable, no external dependencies
- In-memory cache prevents redundant fetches
- Service Worker provides offline resilience
- Aligns with Constitution error handling requirements

**Alternatives Considered**:
- **React Query**: Overkill for static data, adds 12KB to bundle
- **Direct imports**: Not cacheable separately, bloats initial bundle
- **Context API for caching**: Over-engineered, hook approach is simpler

---

## 4. Responsive Layout Patterns

### Decision: CSS Grid with Mobile-First Breakpoints

**Breakpoint Strategy**:

```css
/* Mobile-first approach */
/* Default: Mobile (<768px) - single column, no sidebar */
/* Tablet (768px-1024px) - two columns, collapsible sidebar */
/* Desktop (>1024px) - two columns, persistent sidebar */

/* Tailwind breakpoints (configured in tailwind.config.js) */
sm: '640px',   // Small devices
md: '768px',   // Medium devices (tablets)
lg: '1024px',  // Large devices (desktops)
xl: '1280px',  // Extra large devices
2xl: '1536px'  // 2X large devices
```

**Layout Implementation**:

```typescript
// PageWithSidebar component structure
<div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] min-h-screen">
  {/* Sidebar: full width on mobile, fixed width on desktop */}
  <aside className="bg-surface border-r border-border lg:sticky lg:top-0 lg:h-screen overflow-y-auto">
    {/* Sidebar content */}
  </aside>

  {/* Main content: full width on mobile, flex-grow on desktop */}
  <main className="px-4 py-6 lg:px-8 lg:py-10">
    {/* Page content */}
  </main>
</div>
```

**Mobile Sidebar Behavior**:
- Mobile (<768px): Sidebar appears above main content (vertical stack)
- Tablet (768-1024px): Sidebar toggleable via hamburger menu (off-canvas)
- Desktop (>1024px): Sidebar always visible, sticky positioning

**Touch vs Pointer Considerations**:
- Touch targets minimum 44x44px (WCAG guideline)
- Hover states only on pointer devices (use `@media (hover: hover)`)
- Swipe gestures not implemented (rely on scroll for simplicity)

**Rationale**:
- Mobile-first ensures core content accessible on all devices
- CSS Grid provides clean two-column layout without extra divs
- Sticky sidebar on desktop improves navigation UX
- Responsive breakpoints align with common device sizes

**Alternatives Considered**:
- **Flexbox**: Less semantic for two-column layouts, requires more markup
- **Fixed sidebar on mobile**: Reduces content space, poor UX on small screens
- **Hamburger menu on all devices**: Desktop users expect persistent sidebar

---

## 5. Accessibility Implementation

### Decision: Semantic HTML + ARIA + Keyboard Navigation

**Accessibility Checklist**:

- [x] **Semantic HTML**: Use `<nav>`, `<main>`, `<aside>`, `<article>`, `<section>`
- [x] **Keyboard Navigation**: All interactive elements reachable via Tab, activated via Enter/Space
- [x] **Focus Management**: Visible focus indicators (outline), focus trapped in modals (if any)
- [x] **ARIA Labels**: `aria-label` for icon-only buttons, `aria-current` for active nav items
- [x] **Color Contrast**: 4.5:1 minimum for text, 3:1 for large text (18px+)
- [x] **Screen Reader Support**: Test with NVDA (Windows), VoiceOver (macOS/iOS)
- [x] **Alt Text**: All images have meaningful alt attributes
- [x] **Skip Links**: "Skip to main content" link for keyboard users
- [x] **Responsive Text**: Text zoomable to 200% without layout breaking

**Implementation Patterns**:

```typescript
// Navigation with aria-current
<nav aria-label="Main navigation">
  <Link to="/" aria-current={location.pathname === '/' ? 'page' : undefined}>
    Home
  </Link>
  <Link to="/seasons" aria-current={location.pathname.startsWith('/seasons') ? 'page' : undefined}>
    Seasons
  </Link>
</nav>

// Sidebar with proper landmarks
<aside aria-label="Season navigation">
  <ul role="list">
    {seasons.map(season => (
      <li key={season.seasonNumber}>
        <button onClick={() => selectSeason(season.seasonNumber)}>
          Season {season.seasonNumber}
        </button>
      </li>
    ))}
  </ul>
</aside>

// Skip link (hidden but focusable)
<a href="#main-content" className="sr-only focus:not-sr-only">
  Skip to main content
</a>
<main id="main-content">
  {/* Page content */}
</main>
```

**Testing Strategy**:
- Automated: ESLint plugin `eslint-plugin-jsx-a11y` (already in project)
- Manual: Keyboard navigation testing (Tab, Enter, Space, Arrow keys)
- Screen reader: Test critical flows with NVDA or VoiceOver
- Color contrast: Use browser DevTools Lighthouse audit

**Rationale**:
- Constitution mandates WCAG 2.1 AA compliance
- Semantic HTML provides built-in accessibility
- Keyboard navigation benefits power users and accessibility users
- Screen reader compatibility expands user base

**Alternatives Considered**:
- **ARIA-heavy approach**: More complex, semantic HTML is simpler and more robust
- **No skip links**: Keyboard users forced to tab through navigation on every page

---

## 6. Testing Setup

### Decision: Vitest + React Testing Library + ESLint

**Dependencies to Add**:

```json
{
  "devDependencies": {
    "vitest": "^2.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.1.5",
    "@testing-library/user-event": "^14.5.1",
    "jsdom": "^25.0.0"
  }
}
```

**Vitest Configuration**:

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    css: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      exclude: [
        'node_modules/',
        'tests/',
        '**/*.config.ts',
        '**/types/',
      ],
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
});
```

**Test Setup File**:

```typescript
// tests/setup.ts
import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});
```

**Testing Patterns**:

**Unit Tests (Hooks)**:
```typescript
// tests/unit/useSeasons.test.ts
import { renderHook, waitFor } from '@testing-library/react';
import { useSeasons } from '@/hooks/useSeasons';

describe('useSeasons', () => {
  it('loads seasons data successfully', async () => {
    const { result } = renderHook(() => useSeasons());
    
    expect(result.current.loading).toBe(true);
    
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toHaveLength(4);
      expect(result.current.error).toBeNull();
    });
  });
});
```

**Component Tests**:
```typescript
// tests/integration/SeasonsPage.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import { SeasonsPage } from '@/pages/SeasonsPage';

describe('SeasonsPage', () => {
  it('displays season list and episodes', async () => {
    render(
      <BrowserRouter>
        <SeasonsPage />
      </BrowserRouter>
    );

    // Wait for data to load
    expect(await screen.findByText('Season 1')).toBeInTheDocument();
    
    // Click Season 2 in sidebar
    await userEvent.click(screen.getByText('Season 2'));
    
    // Verify Season 2 episodes displayed
    expect(screen.getByText(/Season 2/i)).toBeInTheDocument();
  });
});
```

**Coverage Targets**:
- Overall: 70%+ coverage
- Critical paths (data loading, navigation): 100%
- UI components: 80%+
- Utility functions: 90%+

**Rationale**:
- Vitest is Vite-native, faster than Jest
- React Testing Library encourages testing user behavior, not implementation
- ESLint catches accessibility issues during development
- Constitution requires 70%+ coverage on business logic

**Alternatives Considered**:
- **Jest**: Slower with Vite, requires additional configuration
- **Cypress/Playwright**: Good for E2E but overkill for component testing
- **No testing**: Violates constitution, increases regression risk

---

## Technology Stack Summary

| Category | Technology | Version | Rationale |
|----------|-----------|---------|-----------|
| **Language** | TypeScript | 5.8.3 | Type safety, constitution requirement |
| **Framework** | React | 19.1.1 | Latest stable, modern hooks support |
| **Build Tool** | Vite | 7.1.7 | Fast HMR, excellent DX, PWA plugin |
| **Routing** | React Router DOM | 7.9.3 | Standard, code splitting support |
| **Styling** | Tailwind CSS | (installed) | Utility-first, small bundle, consistent spacing |
| **PWA** | vite-plugin-pwa | 1.0.3 | Service worker, offline support |
| **Testing** | Vitest | 2.0.0 (to add) | Vite-native, fast, ESM support |
| **Component Testing** | React Testing Library | 16.0.0 (to add) | User-centric testing |
| **Linting** | ESLint | 9.36.0 | Code quality, accessibility checks |

---

## Next Steps (Phase 1)

1. **Create data-model.md**: Define TypeScript interfaces for Season, Episode, Recipe, TopList
2. **Create contracts/**: Component prop interfaces, data loading contracts
3. **Create quickstart.md**: Component usage examples, testing patterns, integration guide
4. **Update agent context**: Run `update-agent-context.ps1 -AgentType copilot`
5. **Re-evaluate Constitution Check**: Verify all gates still pass after design decisions

**All research findings documented. Ready to proceed to Phase 1: Design & Contracts.**
