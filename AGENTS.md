# AI Agent Guidelines for Sopranos PWA

This document provides guidance for AI coding agents working on the Sopranos React/TypeScript/Vite PWA project. It supplements the project's Constitution and ensures consistent, high-quality contributions.

## Core Philosophy

When working on this project, AI agents should:
1. **Prioritize type safety**: Never compromise TypeScript strict mode
2. **Favor composition**: Build small, reusable components
3. **Think performance first**: Code splitting, lazy loading, and optimization from the start
4. **Ensure accessibility**: Every feature must be keyboard navigable and screen reader compatible
5. **Handle errors gracefully**: No silent failures

## Technology Stack

- **Framework**: React 19 with functional components and hooks
- **Language**: TypeScript with strict mode enabled
- **Build Tool**: Vite 7
- **Routing**: React Router v7 with HashRouter (for Azure Static Web Apps)
- **Styling**: Tailwind CSS v4
- **State Management**: Local state first, React Context for cross-cutting concerns
- **PWA**: Service worker with offline support

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic components (Button, Navigation)
│   ├── layout/         # Layout components
│   ├── seasons/        # Season-specific components
│   ├── recipes/        # Recipe-specific components
│   └── toplist/        # Top list components
├── pages/              # Page-level route components
├── hooks/              # Custom React hooks (useSeasons, useRecipes)
├── utils/              # Pure utility functions
├── types/              # TypeScript type definitions
└── assets/             # Static assets (images, icons)

public/
└── data/               # JSON data files (seasons.json, recipes.json, toplist.json)
```

## Key Conventions

### TypeScript

- **Always use explicit types**: No `any` types unless interfacing with untyped libraries
- **exactOptionalPropertyTypes**: Only set optional properties if they have values (don't set to `undefined`)
- **Type components**: Use interface for props, explicit return types for components

```typescript
// Good
interface ButtonProps {
  label: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

export function Button({ label, onClick, variant = 'primary' }: ButtonProps): JSX.Element {
  return <button onClick={onClick}>{label}</button>;
}

// Bad - implicit return type, no props interface
export function Button({ label, onClick }) {
  return <button onClick={onClick}>{label}</button>;
}
```

### Components

- **Functional components only**: No class components except Error Boundaries
- **Maximum 150 lines per file**: Extract logic to custom hooks if exceeding
- **JSDoc comments**: Document complex components and public APIs
- **Named exports**: Use named exports, not default exports (except for pages)

```typescript
/**
 * Episode detail component showing complete episode information
 * Includes summary, crew, music tracks, and IMDB data
 */
export function EpisodeDetail({ episode, seasonNumber }: EpisodeDetailProps) {
  // Implementation
}
```

### Styling

- **Tailwind classes**: Use Tailwind utility classes for styling
- **Mobile-first**: Design for mobile, enhance for desktop
- **Consistent spacing**: Use Tailwind's spacing scale (4px increments)
- **Dark mode ready**: Use semantic color variables

### Data Fetching

- **Custom hooks**: Encapsulate data fetching in hooks (useSeasons, useRecipes)
- **Module-level caching**: Cache loaded data to prevent refetching
- **Error handling**: Always handle loading, success, and error states

```typescript
export function useSeasons(): DataLoadingState<Season[]> {
  const [state, setState] = useState<DataLoadingState<Season[]>>({
    data: cachedSeasons || undefined,
    loading: !cachedSeasons,
    error: undefined
  });
  // Implementation
}
```

## Common Tasks

### Adding a New Page

1. Create page component in `src/pages/`
2. Add lazy import in `AppRouter.tsx`
3. Add route with Suspense fallback
4. Test navigation and error states

### Adding New Data

1. Add JSON file to `public/data/`
2. Create TypeScript types in `src/types/`
3. Create custom hook in `src/hooks/`
4. Implement module-level caching
5. Handle loading and error states

### Styling Components

1. Use Tailwind utility classes
2. Extract repeated patterns to component variants
3. Ensure responsive design (mobile-first)
4. Test keyboard navigation
5. Verify color contrast (4.5:1 minimum)

## File Locations

### Data Files
- **Production data**: `public/data/*.json` (served at `/data/*.json`)
- **Source data**: Excel files NOT in repo (sync scripts reference external paths)

### Sync Scripts
- `sync-seasons-xlsx.js`: Syncs Sopranos.xlsx to public/data/seasons.json
- Only writes to `public/data/` (not `src/data/`)

### Configuration
- `index.html`: HTML template with Google Analytics
- `vite.config.ts`: Vite configuration with PWA plugin
- `tsconfig.app.json`: TypeScript strict mode configuration
- `tailwind.config.js`: Tailwind CSS configuration

## Data Structure

### Episodes
```typescript
interface Episode {
  episodeNumber: number;
  title: string;
  airDate: string;
  summary: string;
  swedishDescription?: string;  // Swedish description
  director: string;
  writer: string;
  runtime: number;
  music: MusicTrack[];
  quotes: string[];
  hboReview?: string;
  imdbLink?: string;
  imdbRating?: number;
}
```

### Key Points
- **swedishDescription**: Used for Synopsis display (Swedish content)
- **hboReview**: English HBO review content
- **Optional properties**: Only set if they have values (exactOptionalPropertyTypes)

## Testing Checklist

Before submitting changes:
- [ ] TypeScript compiles with no errors (`npm run build`)
- [ ] No console.log or debugger statements
- [ ] Responsive on mobile, tablet, desktop
- [ ] Keyboard navigable
- [ ] Error states handled
- [ ] Loading states implemented
- [ ] Works offline (if PWA feature)
- [ ] WCAG 2.1 AA compliant

## Common Pitfalls

### ❌ Don't
- Use `any` types
- Create class components
- Set optional properties to `undefined` explicitly
- Fetch from `/src/data/` (use `/data/` instead)
- Forget error boundaries
- Skip accessibility attributes
- Use inline styles unnecessarily

### ✅ Do
- Use explicit types everywhere
- Create functional components with hooks
- Only add optional properties if they have values
- Fetch from `/data/` (public folder)
- Wrap lazy components in Suspense with fallback
- Add ARIA labels and semantic HTML
- Use Tailwind classes for styling

## Deployment

- **Platform**: Azure Static Web Apps
- **Build command**: `npm run build`
- **Output directory**: `build`
- **Routing**: HashRouter (uses `#` in URLs for static hosting)
- **Auto-deploy**: Pushes to `main` branch trigger deployment

## Analytics & Privacy

- **Google Analytics**: Implemented with consent management
- **Cookie consent**: Required before tracking (GDPR compliant)
- **Tracking**: Page views on route changes via AnalyticsTracker component

## Support & Documentation

- **Constitution**: `.specify/memory/constitution.md` - Core principles and standards
- **Best Practices**: `BEST_PRACTICES.md` - Detailed implementation guide
- **README**: `README.md` - Project setup and overview
- **Sopranos Data**: `SOPRANOS_README.md` - Content and data guide

---

**Version**: 1.0.0  
**Last Updated**: 2025-12-04  
**Maintained by**: Project Team
