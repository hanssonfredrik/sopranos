# Tasks: Modern Site Redesign

**Branch**: `001-modern-redesign`  
**Date**: 2025-12-02  
**Input**: Design documents from `/specs/001-modern-redesign/`

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `- [ ] [ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and foundational structure

- [X] T001 Install testing dependencies: `npm install --save-dev vitest @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
- [X] T002 Create vitest.config.ts with React plugin, jsdom environment, and path aliases
- [X] T003 Create tests/setup.ts with React Testing Library global configuration
- [X] T004 [P] Create src/styles/variables.css with CSS custom properties (colors, typography, spacing, shadows)
- [X] T005 [P] Update src/styles/index.css to import variables.css and add base styles
- [X] T006 [P] Create src/types/common.types.ts with DataLoadingState<T> and NavigationItem interfaces
- [X] T007 [P] Create src/types/season.types.ts with Season, Episode, MusicTrack interfaces
- [X] T008 [P] Create src/types/recipe.types.ts with Recipe interface
- [X] T009 [P] Create src/types/toplist.types.ts with TopList, TopListItem interfaces
- [X] T010 [P] Update src/types/index.ts to export all type definitions

**Checkpoint**: Foundation ready - TypeScript types defined, styling system in place, testing configured ✅

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T011 Create src/utils/dataLoader.ts with type guards (isSeasonArray, isRecipeArray, isTopListArray)
- [X] T012 [P] Create src/utils/formatters.ts with formatAirDate and toSlug utility functions
- [X] T013 [P] Update src/utils/index.ts to export dataLoader and formatters utilities
- [X] T014 Create src/components/layout/ErrorBoundary.tsx with error catching and fallback UI
- [X] T015 [P] Create src/components/ui/LoadingSpinner.tsx for async loading states
- [X] T016 [P] Create src/components/ui/ErrorMessage.tsx for error display with retry button
- [X] T017 Write tests/unit/formatters.test.ts for date formatting and slug generation
- [X] T018 Write tests/unit/dataLoader.test.ts for type guard validation functions

**Checkpoint**: Foundation complete - utilities, error handling, and base UI components ready. User story implementation can now begin in parallel. ✅ ALL TESTS PASS (28/28)

---

## Phase 3: User Story 4 - Welcome Experience (Priority: P1) 🎯 MVP Foundation

**Goal**: Users landing on the home page see modern, visually appealing design with clear navigation

**Independent Test**: Load homepage, verify hero section displays, navigation menu with 4 items (Home, Seasons, Top List, Recipes) is visible and functional

### Implementation for User Story 4

- [X] T019 [P] [US4] Create src/components/ui/Navigation.tsx with top-level menu (Home, Seasons, Top List, Recipes)
- [X] T020 [P] [US4] Create src/components/layout/MainLayout.tsx with Navigation, ErrorBoundary, Outlet, NetworkStatus
- [X] T021 [US4] Refactor src/pages/HomePage.tsx with modern hero section, feature overview, call-to-action
- [X] T022 [US4] Create src/pages/NotFoundPage.tsx for 404 error handling
- [X] T023 [US4] Update src/components/AppRouter.tsx with lazy loading, MainLayout wrapper, and all routes
- [X] T024 [US4] Write tests/integration/Navigation.test.tsx for active route highlighting and navigation clicks
- [X] T025 [US4] Write tests/integration/HomePage.test.tsx for hero section and navigation presence
- [X] T026 [US4] Write tests/integration/AppRouter.test.tsx for route rendering and 404 handling

**Checkpoint**: At this point, homepage and navigation are fully functional. Users can navigate between pages (even if content pages are not yet fully implemented). ✅ ALL TESTS PASS (45/45)

---

## Phase 4: User Story 1 - Browse Seasons and Episodes (Priority: P1) 🎯 MVP Core

**Goal**: Users can explore The Sopranos by season and read detailed episode information

**Independent Test**: Navigate to /seasons, see Season 1-4 in sidebar, click Season 2, see Season 2 episodes, click episode to see full details including description, music, Godfather references

### Implementation for User Story 1

- [X] T027 [US1] Create src/hooks/useSeasons.ts with module-level cache, fetch from seasons.json, type validation
- [X] T028 [P] [US1] Create src/components/seasons/SeasonList.tsx for sidebar navigation with active state
- [X] T029 [P] [US1] Create src/components/seasons/EpisodeCard.tsx for episode summary display
- [X] T030 [P] [US1] Create src/components/seasons/EpisodeDetail.tsx for full episode details with all fields
- [X] T031 [US1] Create src/components/seasons/SeasonEpisodeList.tsx to render grid of EpisodeCards
- [X] T032 [US1] Create src/components/layout/PageWithSidebar.tsx for two-column responsive layout
- [X] T033 [US1] Refactor src/pages/SeasonsPage.tsx to use useSeasons hook, PageWithSidebar, SeasonList, and SeasonEpisodeList
- [X] T034 [US1] Refactor src/pages/EpisodeDetailPage.tsx to use useSeasons hook and EpisodeDetail component
- [X] T035 [US1] Write tests/unit/useSeasons.test.ts for hook loading, success, and error states
- [X] T036 [P] [US1] Write tests/integration/SeasonList.test.tsx for rendering and selection
- [X] T037 [P] [US1] Write tests/integration/EpisodeCard.test.tsx for rendering and click handler
- [X] T038 [P] [US1] Write tests/integration/EpisodeDetail.test.tsx for full episode display and back button
- [X] T039 [US1] Write tests/integration/SeasonsPage.test.tsx for sidebar navigation and episode list updates
- [X] T040 [US1] Write tests/integration/EpisodeDetailPage.test.tsx for episode detail page routing and data display

**Checkpoint**: User Story 1 complete and independently testable. Users can browse all seasons and episodes with full details. This is the core MVP.

---

## Phase 5: User Story 2 - Discover Recipes (Priority: P2)

**Goal**: Users can browse authentic Italian-American recipes with ingredients and instructions

**Independent Test**: Navigate to /recipes, see 3 recipes in sidebar, click "Carmela's Ziti", see full recipe with ingredients and cooking instructions

### Implementation for User Story 2

- [X] T041 [US2] Create src/hooks/useRecipes.ts with module-level cache, fetch from recipes.json, type validation
- [X] T042 [P] [US2] Create src/components/recipes/RecipeList.tsx for sidebar navigation with recipe names
- [X] T043 [P] [US2] Create src/components/recipes/RecipeDetail.tsx for recipe display with description, ingredients, instructions
- [X] T044 [US2] Refactor src/pages/RecipesPage.tsx to use useRecipes hook, PageWithSidebar, RecipeList, and RecipeDetail
- [X] T045 [US2] Write tests/unit/useRecipes.test.ts for hook loading, success, and error states
- [X] T046 [P] [US2] Write tests/integration/RecipeList.test.tsx for rendering and selection
- [X] T047 [P] [US2] Write tests/integration/RecipeDetail.test.tsx for recipe display with all fields
- [X] T048 [US2] Write tests/integration/RecipesPage.test.tsx for sidebar navigation and recipe detail updates

**Checkpoint**: User Story 2 complete and independently testable. Users can browse and read all recipes. Works independently of seasons/episodes functionality.

---

## Phase 6: User Story 3 - Explore Top Lists (Priority: P3)

**Goal**: Users can see curated top lists including best episodes, characters, and quotes

**Independent Test**: Navigate to /toplist, see 3 top lists displayed (Best Episodes, Characters, Quotes) with rankings and descriptions

### Implementation for User Story 3

- [X] T049 [US3] Create src/hooks/useTopLists.ts with module-level cache, fetch from toplist.json, type validation
- [X] T050 [P] [US3] Create src/components/toplist/TopListItem.tsx for individual ranked item display
- [X] T051 [US3] Refactor src/pages/TopListPage.tsx to use useTopLists hook and render all lists with TopListItem components
- [X] T052 [US3] Write tests/unit/useTopLists.test.ts for hook loading, success, and error states
- [X] T053 [P] [US3] Write tests/integration/TopListItem.test.tsx for ranking and description display
- [X] T054 [US3] Write tests/integration/TopListPage.test.tsx for all top lists rendering with proper structure

**Checkpoint**: User Story 3 complete and independently testable. Users can view all top lists. Works independently of other features.

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final quality assurance

- [ ] T055 [P] Create src/components/ui/Card.tsx reusable component and refactor EpisodeCard to use it
- [X] T056 [P] Add skip link ("Skip to main content") in MainLayout for keyboard users
- [X] T057 Accessibility audit: Test keyboard navigation (Tab, Enter, Escape) across all pages
- [X] T058 Accessibility audit: Test with screen reader (NVDA or VoiceOver) on critical flows
- [X] T059 Verify color contrast ratios meet WCAG 2.1 AA (4.5:1 minimum) using browser DevTools
- [X] T060 [P] Performance: Run Lighthouse audit on all pages, target >90 score
- [X] T061 [P] Performance: Verify bundle size <200KB gzipped for initial chunk using `npm run build`
- [X] T062 [P] Performance: Test page transitions are <300ms without full reload
- [X] T063 Responsive testing: Verify layouts on mobile (320px-767px), tablet (768px-1023px), desktop (1024px+)
- [X] T064 Cross-browser testing: Chrome, Firefox, Safari, Edge on homepage, seasons, recipes, toplist
- [X] T065 [P] PWA testing: Verify offline functionality after initial load using DevTools Network throttling
- [X] T066 [P] PWA testing: Test install prompt appears and installation works on Chrome/Edge
- [X] T067 Error handling: Test graceful degradation when JSON files fail to load or are malformed
- [X] T068 Error handling: Test error boundary catches component errors and displays fallback UI
- [ ] T069 [P] Update README.md with project overview, setup instructions, development workflow
- [X] T070 [P] Code cleanup: Remove unused imports, console.logs, and commented code
- [X] T071 Run ESLint across all files and fix any warnings: `npm run lint`
- [X] T072 Validate quickstart.md examples still work with final implementation

**Checkpoint**: All polish complete. Application is production-ready with accessibility, performance, and cross-browser support validated.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup (Phase 1) completion - BLOCKS all user stories
- **User Story 4 (Phase 3)**: Depends on Foundational (Phase 2) - Navigation and layout foundation
- **User Stories 1, 2, 3 (Phases 4-6)**: All depend on Foundational (Phase 2) and User Story 4 (Phase 3) for MainLayout
  - Can proceed in parallel if multiple developers
  - Or sequentially: US1 (P1) → US2 (P2) → US3 (P3)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 4 (P1)**: Foundation for all pages - provides MainLayout, Navigation, routing structure
- **User Story 1 (P1)**: Independent after US4 complete - Can be fully tested without US2 or US3
- **User Story 2 (P2)**: Independent after US4 complete - Can be fully tested without US1 or US3
- **User Story 3 (P3)**: Independent after US4 complete - Can be fully tested without US1 or US2

### Within Each User Story

- Hooks before components (data loading must work first)
- Base UI components before page components
- Components before tests (implementation before test writing)
- Integration tests after all components complete
- Story complete before moving to next priority

### Parallel Opportunities Per Phase

**Phase 1 (Setup)**: T004-T010 all parallel (different files)

**Phase 2 (Foundational)**: 
- T012-T013 parallel (formatters and exports)
- T015-T016 parallel (LoadingSpinner and ErrorMessage)
- T017-T018 parallel (different test files)

**Phase 3 (US4)**:
- T019-T020 parallel (Navigation and MainLayout - different files)
- T024-T026 parallel (all test files)

**Phase 4 (US1)**:
- T028-T030 parallel (SeasonList, EpisodeCard, EpisodeDetail - different files)
- T036-T038 parallel (component test files)

**Phase 5 (US2)**:
- T042-T043 parallel (RecipeList and RecipeDetail - different files)
- T046-T047 parallel (component test files)

**Phase 6 (US3)**:
- T052-T053 parallel (hook tests and component tests)

**Phase 7 (Polish)**:
- T055-T056 parallel (Card component and skip link - different files)
- T060-T062 parallel (Lighthouse, bundle size, page transitions - independent checks)
- T065-T066 parallel (offline and install testing - different features)
- T069-T070 parallel (README and code cleanup - different files)

---

## Parallel Example: User Story 1 Implementation

```bash
# After completing T027 (useSeasons hook), launch these 3 tasks together:
T028: Create src/components/seasons/SeasonList.tsx
T029: Create src/components/seasons/EpisodeCard.tsx
T030: Create src/components/seasons/EpisodeDetail.tsx

# After completing component integration, launch these 3 test tasks together:
T036: Write tests/integration/SeasonList.test.tsx
T037: Write tests/integration/EpisodeCard.test.tsx
T038: Write tests/integration/EpisodeDetail.test.tsx
```

---

## Implementation Strategy

### MVP First (US4 + US1 Only)

1. Complete Phase 1: Setup (10 tasks) - ~1 day
2. Complete Phase 2: Foundational (8 tasks) - ~1 day
3. Complete Phase 3: User Story 4 (8 tasks) - ~2 days
4. Complete Phase 4: User Story 1 (14 tasks) - ~3-4 days
5. **STOP and VALIDATE**: Test navigation + seasons/episodes independently
6. **MVP READY**: Homepage with navigation + full seasons/episodes browsing functionality

**Total MVP**: ~7-8 days, 40 tasks

### Incremental Delivery After MVP

1. **MVP Deployed** (US4 + US1) - Homepage + Seasons browsing
2. Add Phase 5: User Story 2 (8 tasks) - ~2 days → Deploy recipes feature
3. Add Phase 6: User Story 3 (6 tasks) - ~1-2 days → Deploy top lists feature
4. Phase 7: Polish (18 tasks) - ~2-3 days → Final production-ready release

**Total Full Release**: ~12-15 days, 72 tasks

### Parallel Team Strategy (3 Developers)

With 3 developers after Foundational phase complete:

1. **All together**: Phase 1 (Setup) + Phase 2 (Foundational) - ~2 days
2. **All together**: Phase 3 (User Story 4) - ~2 days
3. **Split parallel**:
   - Developer A: Phase 4 (User Story 1) - ~3-4 days
   - Developer B: Phase 5 (User Story 2) - ~2 days
   - Developer C: Phase 6 (User Story 3) - ~1-2 days
4. **All together**: Phase 7 (Polish) - ~2-3 days

**Total with 3 devs**: ~9-11 days, 72 tasks

---

## Task Statistics

**Total Tasks**: 72

**By Phase**:
- Phase 1 (Setup): 10 tasks
- Phase 2 (Foundational): 8 tasks
- Phase 3 (US4 - Welcome): 8 tasks
- Phase 4 (US1 - Seasons): 14 tasks
- Phase 5 (US2 - Recipes): 8 tasks
- Phase 6 (US3 - Top Lists): 6 tasks
- Phase 7 (Polish): 18 tasks

**By Priority**:
- P1 (MVP Critical): 40 tasks (Phases 1-4)
- P2 (High Value): 8 tasks (Phase 5)
- P3 (Nice to Have): 6 tasks (Phase 6)
- Polish (Quality): 18 tasks (Phase 7)

**Parallelizable Tasks**: 28 tasks marked [P]

**Test Tasks**: 19 tasks (26% of total)

**Average Story Size**:
- US4: 8 tasks
- US1: 14 tasks (largest - core feature)
- US2: 8 tasks
- US3: 6 tasks (smallest)

---

## Success Criteria Mapping

| Success Criteria | Validated By Tasks |
|------------------|-------------------|
| SC-001: Navigate in ≤3 clicks | T023, T033, T034 (routing setup) |
| SC-002: Page transitions <300ms | T062 (performance testing) |
| SC-003: Usable 320px-2560px | T063 (responsive testing) |
| SC-004: JSON loads on first load | T027, T041, T049 (data hooks) |
| SC-005: Find recipe <30 seconds | T044, T048 (recipes navigation) |
| SC-006: 80%+ design approval | T021, T055-T056 (UI polish) |
| SC-007: Sidebar accessible all devices | T032, T063 (PageWithSidebar + responsive) |
| SC-008: Episode data formats correctly | T030, T038 (EpisodeDetail component) |

---

## Notes

- **[P]** = Parallelizable (different files, no dependencies between them)
- **[Story]** = User story label for traceability (US1, US2, US3, US4)
- Each user story independently completable and testable
- Commit after each task or logical group
- Stop at checkpoints to validate story independently
- Run `npm run lint` and `npm test` frequently
- All file paths follow structure defined in plan.md

**Ready for implementation! Start with Phase 1: Setup (T001-T010)**
