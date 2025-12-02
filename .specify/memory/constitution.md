<!--
SYNC IMPACT REPORT
Version Change: N/A → 1.0.0 (Initial Constitution)
Modified Principles: N/A (Initial creation)
Added Sections: All sections (initial creation)
Removed Sections: None
Templates Status:
  ✅ plan-template.md - Reviewed and aligned
  ✅ spec-template.md - Reviewed and aligned
  ✅ tasks-template.md - Reviewed and aligned
Follow-up TODOs: None
-->

# Sopranos React/TypeScript/Vite PWA Constitution

## Core Principles

### I. TypeScript Strict Mode (NON-NEGOTIABLE)

All TypeScript code MUST adhere to strict type safety with zero tolerance for `any` types except when interfacing with untyped third-party libraries.

**Rules**:
- Enable `strict: true`, `exactOptionalPropertyTypes: true`, `noImplicitReturns: true` in tsconfig
- Explicitly type all component props, state, hooks, and function return values
- Use type guards for runtime type validation
- Leverage utility types (`Partial<T>`, `Required<T>`, `Pick<T>`, `Omit<T>`) over manual type construction
- Define interfaces for object shapes, types for unions and computed types

**Rationale**: Type safety prevents 80% of runtime errors at compile time, improves IDE support, enables confident refactoring, and serves as living documentation.

---

### II. Functional Components with Hooks (REQUIRED)

All React components MUST be functional components using modern hooks patterns. Class components are prohibited except for Error Boundaries.

**Rules**:
- Use `React.FC` or explicit return types for all components
- Implement custom hooks for reusable stateful logic
- Follow Rules of Hooks (only call at top level, only in React functions)
- Use `useState` for local state, `useReducer` for complex state logic
- Implement proper cleanup in `useEffect` to prevent memory leaks
- Use `useMemo` and `useCallback` judiciously for performance optimization

**Rationale**: Functional components with hooks provide better code reuse, simpler testing, improved performance with React Compiler future support, and align with React 19+ best practices.

---

### III. Component Composition Over Inheritance (REQUIRED)

Design components using composition patterns. Components MUST be small, focused, and independently testable.

**Rules**:
- Single Responsibility Principle: each component does one thing well
- Separate presentational components from container (data-fetching) components
- Use render props, children as functions, or compound components for flexibility
- Maximum 150 lines per component file; extract logic to hooks if exceeding
- Props interface MUST be defined explicitly before component implementation
- Components MUST accept `className` prop for styling flexibility

**Rationale**: Composable components are easier to test, reuse, and maintain. Small components reduce cognitive load and improve collaboration across teams.

---

### IV. Performance First (REQUIRED)

Performance optimization MUST be considered from the start, not as an afterthought.

**Rules**:
- Implement code splitting with `React.lazy` and `Suspense` for route-based chunks
- Use `React.memo` for expensive or frequently re-rendered components
- Optimize bundle size: tree shaking enabled, dynamic imports for large dependencies
- Implement virtual scrolling for lists exceeding 100 items
- Profile with React DevTools Performance tab before optimizing (measure, don't guess)
- Lazy load images and use proper image formats (WebP with fallbacks)
- Service worker MUST cache static assets and implement stale-while-revalidate for API calls

**Rationale**: Users abandon apps with slow load times. Performance directly impacts user satisfaction, retention, and accessibility. React 19 and Vite provide tools to achieve sub-second initial loads.

---

### V. Accessibility Compliance (NON-NEGOTIABLE)

All interactive components MUST be keyboard navigable and screen reader compatible.

**Rules**:
- Use semantic HTML elements (`<button>`, `<nav>`, `<main>`, `<article>`)
- Implement proper ARIA attributes and roles where semantic HTML insufficient
- All images MUST have meaningful alt text; decorative images use empty alt=""
- Ensure minimum 4.5:1 color contrast ratio for text
- All interactive elements MUST be reachable and operable via keyboard alone
- Forms MUST have associated labels and validation messages
- Test with screen readers (NVDA, JAWS, VoiceOver) before deployment

**Rationale**: 15% of users have accessibility needs. Legal compliance (WCAG 2.1 AA), ethical responsibility, and improved UX for all users.

---

### VI. Error Handling and Resilience (REQUIRED)

Applications MUST gracefully handle errors, network failures, and edge cases.

**Rules**:
- Implement Error Boundaries for component-level error catching
- All async operations MUST handle loading, success, and error states explicitly
- Network requests MUST implement timeout, retry logic, and cancellation
- Display user-friendly error messages; log technical details for debugging
- PWA MUST handle offline scenarios with meaningful feedback
- Forms MUST validate input and display actionable error messages
- No silent failures; every error MUST be surfaced appropriately

**Rationale**: Errors are inevitable. Resilient error handling maintains user trust, reduces support burden, and enables debugging in production.

---

### VII. Testing Strategy (REQUIRED)

Code MUST be testable; tests MUST validate behavior, not implementation details.

**Rules**:
- Write unit tests for utility functions and custom hooks
- Use React Testing Library for component testing (query by accessibility roles)
- Test user interactions, not component internals (avoid testing state directly)
- Integration tests for critical user journeys (authentication, checkout, etc.)
- Mock external dependencies and API calls appropriately
- Tests MUST pass before merging; no skipped tests in main branch
- Aim for 70%+ code coverage on business logic; 100% on critical paths

**Rationale**: Tests enable confident refactoring, catch regressions, serve as documentation, and improve code design through testability requirements.

---

### VIII. Security Best Practices (NON-NEGOTIABLE)

Security MUST be integrated throughout development, not added later.

**Rules**:
- Sanitize all user inputs; use DOMPurify for rendering user-generated HTML
- Validate and escape data before rendering to prevent XSS attacks
- Use HTTPS exclusively for all API calls
- Never store sensitive data (passwords, tokens) in localStorage/sessionStorage
- Implement Content Security Policy (CSP) headers
- Use environment variables for API keys; never commit secrets to repository
- Implement proper authentication and authorization patterns (JWT, OAuth)
- Regular dependency audits (`npm audit`) and updates

**Rationale**: Security breaches destroy user trust, expose liability, and compromise user data. Proactive security is orders of magnitude cheaper than reactive incident response.

---

## Code Organization Standards

### File Structure

**Project MUST follow domain-driven folder structure**:

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic components (Button, Input, Card)
│   └── common/         # Shared complex components
├── pages/              # Page-level route components
├── hooks/              # Custom React hooks
├── utils/              # Pure utility functions
├── types/              # TypeScript type definitions
├── services/           # API clients and data fetching
├── context/            # React Context providers
├── assets/             # Static assets
└── styles/             # Global styles and CSS modules
```

**Naming Conventions**:
- Components: PascalCase (`UserProfile.tsx`)
- Hooks: camelCase with `use` prefix (`useAuth.ts`)
- Utilities: camelCase (`formatDate.ts`)
- Types: PascalCase (`User.ts`, `ApiResponse.ts`)
- Constants: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

### Import Organization

**Imports MUST be ordered**:
1. External libraries (React, third-party)
2. Internal absolute imports (via `@/` alias)
3. Relative imports
4. Type imports (separate)
5. Styles

Use ESLint auto-fix to enforce ordering.

---

## State Management

### Local State First

**Default to local component state**. Lift state only when sharing between siblings or distant components is required.

**Rules**:
- `useState` for simple local state
- `useReducer` for complex state logic (3+ related state variables)
- `useContext` for sharing state across component trees (theming, auth, localization)
- External state management (Redux Toolkit, Zustand) only for complex applications with heavy data synchronization needs
- React Query or SWR for server state management (recommended for API data)

**Rationale**: Over-engineered state management adds complexity. Start simple; refactor to complex solutions only when local state becomes unmanageable.

---

## Styling Conventions

**Use CSS Modules or Tailwind CSS** (project currently uses inline Tailwind classes).

**Rules**:
- Implement mobile-first responsive design
- Use CSS custom properties (variables) for theming (colors, spacing, typography)
- Follow BEM methodology if using CSS Modules
- Ensure consistent spacing scale (4px base unit: 4, 8, 12, 16, 24, 32, 48, 64)
- Extract repeated class combinations into component variants
- Avoid inline styles except for dynamic values (colors from props, calculated dimensions)

**Rationale**: Consistent styling system improves design coherence, reduces CSS bloat, and enables theme switching.

---

## PWA Requirements

**Application MUST be installable and functional offline**.

**Rules**:
- Service worker MUST cache static assets (JS, CSS, fonts, icons)
- Implement cache-first strategy for assets, network-first for API with fallback
- Provide install prompt UI for browsers supporting `beforeinstallprompt`
- Display online/offline status indicator
- Implement background sync for actions taken offline (when applicable)
- Web App Manifest MUST include name, short_name, icons (192x192, 512x512), theme_color, background_color
- Test PWA installation and offline functionality across Chrome, Firefox, Safari, Edge

**Rationale**: PWAs provide native-app-like experience with web's reach. Offline support is critical for unreliable network conditions.

---

## Development Workflow

### Git Workflow

**Feature branch workflow with pull requests**:

1. Create feature branch from `main`: `git checkout -b feature/###-description`
2. Make atomic commits with descriptive messages: `feat: add user authentication` or `fix: resolve button alignment issue`
3. Push and create pull request
4. Code review required before merging
5. Squash and merge to keep history clean

**Commit Message Format**:
```
<type>: <description>

[optional body]

[optional footer]
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`

### Code Review Checklist

**All PRs MUST verify**:
- ✅ TypeScript compiles without errors or warnings
- ✅ ESLint passes with zero warnings
- ✅ All tests pass
- ✅ No console.log or debugger statements
- ✅ Accessibility tested with keyboard navigation
- ✅ Responsive design validated on mobile, tablet, desktop
- ✅ Performance impact measured (bundle size, lighthouse score)
- ✅ Constitution principles compliance

---

## Governance

### Amendment Process

**Constitution amendments require**:
1. Written proposal with rationale for change
2. Team review and discussion
3. Approval by project maintainers
4. Version bump according to semantic versioning
5. Update dependent templates and documentation
6. Announcement to team with migration timeline if breaking changes

### Versioning Policy

**Constitution uses semantic versioning (MAJOR.MINOR.PATCH)**:
- **MAJOR**: Backward incompatible changes (removing principles, fundamentally changing requirements)
- **MINOR**: Additive changes (new principles, expanded guidance)
- **PATCH**: Clarifications, wording improvements, typo fixes

### Compliance Review

**Constitution compliance MUST be verified**:
- During code review before merging PRs
- Monthly architecture reviews for accumulated technical debt
- Quarterly principles review to ensure continued relevance

**Non-compliance requires**:
- Documentation of why principle cannot be followed
- Proposed alternative approach
- Approval from project maintainers
- Technical debt tracking item if temporary violation

### Runtime Development Guidance

For detailed implementation examples, refer to:
- `BEST_PRACTICES.md` - Comprehensive React/TypeScript/Vite/PWA guide
- `README.md` - Project setup and workflow
- `.specify/templates/` - Planning and task templates

---

**Version**: 1.0.0 | **Ratified**: 2025-12-02 | **Last Amended**: 2025-12-02
