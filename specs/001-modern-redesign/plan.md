# Implementation Plan: Modern Site Redesign

**Branch**: `001-modern-redesign` | **Date**: 2025-12-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-modern-redesign/spec.md`

## Summary

Complete reimplementation of The Sopranos PWA with modern, inspiring design featuring top-level navigation (Home, Seasons, Top List, Recipes) and left sidebar navigation for Seasons and Recipes pages. All content will be driven by JSON data files (seasons.json, recipes.json, toplist.json) ensuring data-driven architecture and eliminating hardcoded content.

## Technical Context

**Language/Version**: TypeScript 5.8.3 with strict mode enabled  
**Primary Dependencies**: React 19.1.1, React Router DOM 7.9.3, Vite 7.1.7, vite-plugin-pwa 1.0.3  
**Storage**: JSON files (seasons.json, recipes.json, toplist.json) - static data loaded at runtime  
**Testing**: React Testing Library, Vitest (to be added), ESLint 9.36.0  
**Target Platform**: Web browsers (Chrome, Firefox, Safari, Edge) - PWA installable on desktop and mobile
**Project Type**: Web application - single-page PWA with client-side routing  
**Performance Goals**: 
  - Initial load <2s on 3G
  - Page transitions <300ms
  - Lighthouse score >90 (Performance, Accessibility, Best Practices, PWA)
  - Bundle size <200KB gzipped for initial chunk  
**Constraints**: 
  - MUST work offline after initial load (PWA requirement)
  - MUST be keyboard navigable (accessibility)
  - MUST be responsive 320px-2560px
  - MUST support touch and pointer interactions  
**Scale/Scope**: 
  - 4 main pages (Home, Seasons, Recipes, Top List)
  - 27+ episode detail pages
  - 3 recipe detail views
  - ~20 reusable components

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### ✅ Gate 1: TypeScript Strict Mode
- **Status**: PASS
- **Evidence**: `tsconfig.app.json` has `strict: true`, `exactOptionalPropertyTypes: true`, `noImplicitReturns: true`
- **Action**: Continue - all type safety requirements already configured

### ✅ Gate 2: Functional Components with Hooks
- **Status**: PASS
- **Evidence**: Constitution mandates functional components; existing codebase uses React 19.1.1 with modern hooks
- **Action**: Continue - all new components will follow functional paradigm

### ✅ Gate 3: Component Composition
- **Status**: PASS
- **Evidence**: Planned architecture separates presentational components (ui/), page components (pages/), and data logic (hooks/)
- **Action**: Continue - component structure aligns with composition principles

### ✅ Gate 4: Performance First
- **Status**: PASS
- **Evidence**: Vite 7.1.7 provides code splitting, tree shaking; PWA plugin configured for caching
- **Action**: Add React.lazy for route-based code splitting, implement virtual scrolling for episode lists if needed

### ✅ Gate 5: Accessibility Compliance
- **Status**: PASS
- **Evidence**: Semantic HTML required, keyboard navigation mandatory per constitution
- **Action**: Implement ARIA labels, ensure 4.5:1 contrast ratio, test with keyboard navigation and screen readers

### ✅ Gate 6: Error Handling and Resilience
- **Status**: PASS
- **Evidence**: Constitution requires Error Boundaries, loading/error states for async operations
- **Action**: Implement Error Boundary component, handle JSON loading failures, offline state handling

### ✅ Gate 7: Testing Strategy
- **Status**: NEEDS ACTION
- **Evidence**: No testing framework currently configured (package.json shows no Vitest or React Testing Library)
- **Action**: Add Vitest + React Testing Library to devDependencies during Phase 0, configure test setup

### ✅ Gate 8: Security Best Practices
- **Status**: PASS
- **Evidence**: HTTPS enforced, no sensitive data storage required, all data from static JSON files
- **Action**: Ensure CSP headers configured, sanitize any user input if future features add forms

**Overall Gate Status**: ✅ PASS (7/8 gates clear, 1 gate requires dependency addition in Phase 0)

## Project Structure

### Documentation (this feature)

```text
specs/001-modern-redesign/
├── plan.md              # This file (phase 0-2 planning)
├── research.md          # Phase 0: Design system research, routing patterns, data loading strategies
├── data-model.md        # Phase 1: TypeScript interfaces for Season, Episode, Recipe, TopList
├── quickstart.md        # Phase 1: Component usage examples and integration guide
├── contracts/           # Phase 1: Component prop interfaces, data contracts
│   ├── season.contract.ts
│   ├── recipe.contract.ts
│   └── toplist.contract.ts
└── tasks.md             # Phase 2: Task breakdown (created by /speckit.tasks command)
```

### Source Code (repository root)

```text
src/
├── components/
│   ├── ui/                      # Basic reusable components
│   │   ├── Button.tsx           # [EXISTING] Primary UI button
│   │   ├── Card.tsx             # [NEW] Content card component
│   │   ├── Sidebar.tsx          # [NEW] Navigation sidebar component
│   │   └── Navigation.tsx       # [NEW] Top-level navigation menu
│   ├── layout/                  # [NEW] Layout components
│   │   ├── MainLayout.tsx       # Main app layout with navigation
│   │   ├── PageWithSidebar.tsx  # Two-column layout for Seasons/Recipes
│   │   └── ErrorBoundary.tsx    # Error boundary wrapper
│   ├── seasons/                 # [NEW] Season-specific components
│   │   ├── SeasonList.tsx       # Sidebar list of seasons
│   │   ├── EpisodeCard.tsx      # Episode summary card
│   │   └── EpisodeDetail.tsx    # Full episode details
│   ├── recipes/                 # [NEW] Recipe-specific components
│   │   ├── RecipeList.tsx       # Sidebar list of recipes
│   │   └── RecipeDetail.tsx     # Recipe with ingredients/instructions
│   ├── toplist/                 # [NEW] Top list components
│   │   └── TopListItem.tsx      # Individual ranked item
│   ├── AppRouter.tsx            # [EXISTING] Route configuration
│   ├── Layout.tsx               # [EXISTING] Will be refactored to MainLayout
│   ├── InstallPrompt.tsx        # [EXISTING] PWA install UI
│   └── NetworkStatus.tsx        # [EXISTING] Online/offline indicator
├── pages/
│   ├── HomePage.tsx             # [EXISTING] Will be redesigned - hero + features
│   ├── SeasonsPage.tsx          # [EXISTING] Will be redesigned - sidebar + episodes
│   ├── EpisodeDetailPage.tsx    # [EXISTING] Will be redesigned - full episode view
│   ├── RecipesPage.tsx          # [EXISTING] Will be redesigned - sidebar + recipe detail
│   ├── TopListPage.tsx          # [EXISTING] Will be redesigned - all top lists
│   └── NotFoundPage.tsx         # [NEW] 404 error page
├── hooks/
│   ├── useSeasons.ts            # [NEW] Hook to load and manage season data
│   ├── useRecipes.ts            # [NEW] Hook to load and manage recipe data
│   ├── useTopLists.ts           # [NEW] Hook to load and manage top list data
│   ├── useInstallPWA.ts         # [EXISTING] PWA installation logic
│   └── useNetworkStatus.ts      # [EXISTING] Online/offline detection
├── data/
│   ├── seasons.json             # [EXISTING] Season and episode data
│   ├── recipes.json             # [EXISTING] Recipe data
│   ├── toplist.json             # [EXISTING] Top list data
│   └── sopranos.ts              # [EXISTING] May be deprecated if unused
├── types/
│   ├── index.ts                 # [EXISTING] Will be expanded
│   ├── season.types.ts          # [NEW] Season, Episode interfaces
│   ├── recipe.types.ts          # [NEW] Recipe interface
│   └── toplist.types.ts         # [NEW] TopList interface
├── utils/
│   ├── index.ts                 # [EXISTING] General utilities
│   ├── dataLoader.ts            # [NEW] JSON data loading utilities
│   └── formatters.ts            # [NEW] Date, text formatting utilities
└── styles/
    ├── index.css                # [EXISTING] Global styles - will be expanded
    ├── variables.css            # [NEW] CSS custom properties (colors, spacing)
    └── App.css                  # [EXISTING] App-level styles

tests/                           # [NEW] Testing infrastructure
├── setup.ts                     # Test configuration
├── unit/                        # Unit tests for hooks, utils
├── integration/                 # Integration tests for pages
└── e2e/                         # End-to-end tests (optional future addition)
```

**Structure Decision**: Web application structure selected based on single-page PWA with client-side routing. Separates UI components by domain (seasons, recipes, toplist) for maintainability. Existing files marked [EXISTING] will be refactored; new files marked [NEW] will be created. Clear separation between presentational components (ui/), domain components (seasons/, recipes/, toplist/), page-level components (pages/), and business logic (hooks/).

## Complexity Tracking

**No violations detected** - all Constitution gates passed or have clear remediation paths. This feature follows established React/TypeScript/Vite patterns without introducing architectural complexity.

---

## Phase 0: Research & Technology Selection

### Research Areas

1. **Modern Design System**
   - Research: Contemporary React design patterns for content-heavy applications
   - Investigate: Tailwind CSS utility patterns, CSS-in-JS alternatives, CSS Modules best practices
   - Outcome: Select design approach aligned with constitution (current: inline Tailwind classes)
   - Deliverable: Design system tokens (colors, spacing, typography) documented in `research.md`

2. **React Router 7.9.3 Patterns**
   - Research: Latest React Router DOM patterns for nested routes and route-based code splitting
   - Investigate: Data loading strategies (loaders vs hooks), URL parameter handling
   - Outcome: Define routing architecture for /seasons/:id, /episodes/:id, /recipes/:id
   - Deliverable: Routing pattern documentation in `research.md`

3. **Data Loading & Caching Strategy**
   - Research: Best practices for loading static JSON in React 19 + Vite
   - Investigate: Service Worker caching strategies for JSON files, React Query vs custom hooks
   - Outcome: Define data loading pattern (likely: custom hooks with useState + useEffect)
   - Deliverable: Data loading architecture in `research.md`

4. **Responsive Layout Patterns**
   - Research: Modern CSS Grid and Flexbox patterns for sidebar layouts
   - Investigate: Breakpoint strategies, mobile-first design approaches
   - Outcome: Define responsive breakpoints (mobile: <768px, tablet: 768-1024px, desktop: >1024px)
   - Deliverable: Layout pattern documentation in `research.md`

5. **Accessibility Best Practices**
   - Research: ARIA patterns for navigation menus, sidebars, and card-based layouts
   - Investigate: Keyboard navigation patterns, focus management for route transitions
   - Outcome: Define accessibility checklist and implementation patterns
   - Deliverable: Accessibility guidelines in `research.md`

6. **Testing Setup**
   - Research: Vitest configuration for React 19, React Testing Library patterns
   - Investigate: Test coverage targets, component testing patterns, integration test approaches
   - Outcome: Add Vitest, React Testing Library, configure test environment
   - Deliverable: Testing strategy and setup documentation in `research.md`

### Phase 0 Deliverable

**File**: `specs/001-modern-redesign/research.md`

**Contents**:
- Design system decisions (colors, typography, spacing scale)
- Routing architecture and URL structure
- Data loading pattern (hooks implementation approach)
- Responsive layout strategy with breakpoints
- Accessibility implementation checklist
- Testing setup instructions and patterns
- Technology choices with rationale for each decision

---

## Phase 1: Design & Contracts

### Data Model Design

**File**: `specs/001-modern-redesign/data-model.md`

Define TypeScript interfaces for all entities based on existing JSON structure:

```typescript
// Season Entity
interface Season {
  seasonNumber: number;
  episodes: Episode[];
}

// Episode Entity
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

// Recipe Entity
interface Recipe {
  name: string;
  description: string;
  ingredients: string[];
  instructions: string[];
}

// TopList Entity
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

**Validation Rules**:
- All required fields must be present
- Arrays cannot be empty
- Dates must be valid date strings
- Null handling for optional fields (mistress)

**State Transitions**: N/A (static read-only data)

### API Contracts

**Directory**: `specs/001-modern-redesign/contracts/`

**Component Prop Contracts**:

1. **season.contract.ts**: Props for Season-related components
2. **recipe.contract.ts**: Props for Recipe-related components  
3. **toplist.contract.ts**: Props for TopList-related components
4. **layout.contract.ts**: Props for Layout components (Navigation, Sidebar)
5. **common.contract.ts**: Shared props (loading states, error states, onClick handlers)

**Data Loading Contracts**:

```typescript
// Hook return types
interface UseDataResult<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

// Data loader utilities
interface DataLoaderOptions {
  cache?: boolean;
  timeout?: number;
}
```

### Component Architecture

**High-level component relationships**:

```
<MainLayout>                         # Top-level layout with navigation
  <Navigation />                     # Top menu: Home | Seasons | Top List | Recipes
  <NetworkStatus />                  # Online/offline indicator
  <ErrorBoundary>                    # Catches component errors
    <Outlet />                       # React Router outlet
      <HomePage />                   # Landing page
      <SeasonsPage>                  # /seasons
        <PageWithSidebar>            # Two-column layout
          <SeasonList />             # Left sidebar
          <EpisodeList />            # Main content
        </PageWithSidebar>
      </SeasonsPage>
      <EpisodeDetailPage />          # /episodes/:id
      <RecipesPage>                  # /recipes
        <PageWithSidebar>
          <RecipeList />             # Left sidebar
          <RecipeDetail />           # Main content
        </PageWithSidebar>
      </RecipesPage>
      <TopListPage />                # /toplist
  </ErrorBoundary>
  <InstallPrompt />                  # PWA install banner
</MainLayout>
```

### Quickstart Guide

**File**: `specs/001-modern-redesign/quickstart.md`

**Contents**:
- Component usage examples with props
- Data loading hook usage patterns
- Routing setup examples
- Styling conventions and theme usage
- Testing examples for each component type
- Common patterns (error handling, loading states, responsive behavior)

### Agent Context Update

After completing Phase 1 design artifacts, run:

```powershell
.\.specify\scripts\powershell\update-agent-context.ps1 -AgentType copilot
```

This will update `.github/copilot-instructions.md` with:
- New component structure
- TypeScript interfaces from data-model.md
- Routing patterns
- Data loading conventions
- Testing patterns

**Manual additions between markers will be preserved**.

---

## Phase 2: Implementation Planning (Completed by /speckit.tasks)

Phase 2 produces the `tasks.md` file with:
- Task breakdown by user story priority (P1, P2, P3)
- Dependencies between tasks
- Estimated complexity (Small, Medium, Large)
- Acceptance criteria per task
- Testing requirements per task

**This phase is NOT completed by /speckit.plan** - run `/speckit.tasks` after Phase 1 is complete.
