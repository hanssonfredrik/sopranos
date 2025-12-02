# Component Contracts: Season Components

**Feature**: 001-modern-redesign  
**Phase**: 1 - Design & Contracts  
**Component Domain**: Seasons

## Overview

This document defines the prop interfaces and contracts for all Season and Episode-related components. These contracts ensure type safety and clear component boundaries.

---

## SeasonList Component

**Purpose**: Displays list of seasons in sidebar for navigation

**Location**: `src/components/seasons/SeasonList.tsx`

```typescript
interface SeasonListProps {
  seasons: Season[];
  currentSeasonNumber: number | null;
  onSeasonSelect: (seasonNumber: number) => void;
  className?: string;
}
```

**Props**:
- `seasons`: Array of Season objects to display (required)
- `currentSeasonNumber`: Currently selected season number, or null if none selected (required)
- `onSeasonSelect`: Callback when user clicks a season (required)
- `className`: Optional CSS classes for styling flexibility

**Behavior**:
- Renders vertical list of season buttons
- Highlights current season with active state
- Calls `onSeasonSelect` when user clicks a season
- Accessible via keyboard (Tab, Enter/Space)

**Example Usage**:
```typescript
<SeasonList
  seasons={seasons}
  currentSeasonNumber={1}
  onSeasonSelect={(num) => navigate(`/seasons/${num}`)}
  className="p-4"
/>
```

---

## EpisodeCard Component

**Purpose**: Displays episode summary in card format (used in season episode list)

**Location**: `src/components/seasons/EpisodeCard.tsx`

```typescript
interface EpisodeCardProps {
  episode: Episode;
  onClick?: () => void;
  className?: string;
}
```

**Props**:
- `episode`: Episode object with all metadata (required)
- `onClick`: Optional callback when card is clicked (navigates to detail page)
- `className`: Optional CSS classes

**Displayed Fields**:
- Episode number (e.g., "Episode 5")
- Title
- Air date (formatted)
- Author (writer)
- Director
- Description (truncated to 3 lines with ellipsis)

**Behavior**:
- Clickable card (entire card is interactive)
- Hover state on desktop (pointer devices only)
- Focus state for keyboard navigation
- Responsive: stacks vertically on mobile, may show in grid on desktop

**Example Usage**:
```typescript
<EpisodeCard
  episode={episode}
  onClick={() => navigate(`/episodes/${episode.episodeNumber}`)}
  className="shadow-md hover:shadow-lg"
/>
```

---

## EpisodeDetail Component

**Purpose**: Displays full episode details including music, Godfather references, HBO review

**Location**: `src/components/seasons/EpisodeDetail.tsx`

```typescript
interface EpisodeDetailProps {
  episode: Episode;
  onBack?: () => void;
  className?: string;
}
```

**Props**:
- `episode`: Episode object with complete metadata (required)
- `onBack`: Optional callback for back button (navigates to season view)
- `className`: Optional CSS classes

**Displayed Fields**:
- All fields from EpisodeCard plus:
  - Mistress (if present)
  - Godfather references (list with bullet points)
  - Music tracks (song and artist for each track)
  - HBO review (full text, may be multiple paragraphs)

**Behavior**:
- Back button if `onBack` provided
- Scrollable content (may be long)
- Sections clearly separated (Description, Godfather References, Music, HBO Review)
- Responsive layout (single column mobile, possibly two-column desktop)

**Example Usage**:
```typescript
<EpisodeDetail
  episode={episode}
  onBack={() => navigate(`/seasons/${episode.episodeInSeason}`)}
  className="max-w-4xl mx-auto"
/>
```

---

## SeasonEpisodeList Component

**Purpose**: Displays all episodes for a specific season as a list of cards

**Location**: `src/components/seasons/SeasonEpisodeList.tsx`

```typescript
interface SeasonEpisodeListProps {
  season: Season;
  onEpisodeClick: (episodeNumber: number) => void;
  className?: string;
}
```

**Props**:
- `season`: Season object containing episodes array (required)
- `onEpisodeClick`: Callback when user clicks an episode card (required)
- `className`: Optional CSS classes

**Behavior**:
- Renders header "Season {seasonNumber}"
- Maps over `season.episodes` and renders EpisodeCard for each
- Responsive grid (1 column mobile, 2 columns tablet, 3 columns desktop)
- Empty state if season has no episodes (should never happen with valid data)

**Example Usage**:
```typescript
<SeasonEpisodeList
  season={currentSeason}
  onEpisodeClick={(num) => navigate(`/episodes/${num}`)}
  className="grid gap-6"
/>
```

---

## Contract Validation Rules

### Required Props

All props marked as required MUST be provided. TypeScript will enforce this at compile time.

```typescript
// ✅ Valid: All required props provided
<SeasonList
  seasons={seasons}
  currentSeasonNumber={1}
  onSeasonSelect={handleSelect}
/>

// ❌ Invalid: Missing required prop (TypeScript error)
<SeasonList
  seasons={seasons}
  currentSeasonNumber={1}
/>
```

### Optional Props

Optional props (`className`, `onClick`, `onBack`) can be omitted:

```typescript
// ✅ Valid: Optional props omitted
<EpisodeCard episode={episode} />

// ✅ Valid: Optional props provided
<EpisodeCard episode={episode} onClick={handleClick} className="my-4" />
```

### Type Safety

All props must match declared types:

```typescript
// ✅ Valid: Correct types
<SeasonList
  seasons={seasons}                    // Season[]
  currentSeasonNumber={1}              // number
  onSeasonSelect={(num) => void}       // (num: number) => void
/>

// ❌ Invalid: Wrong type (TypeScript error)
<SeasonList
  seasons={seasons}
  currentSeasonNumber="1"              // string, not number
  onSeasonSelect={(num) => void}
/>
```

---

## Accessibility Contracts

### Keyboard Navigation

All interactive components MUST be keyboard accessible:

- **SeasonList**: Arrow keys navigate between seasons, Enter/Space selects
- **EpisodeCard**: Tab to focus, Enter/Space to activate
- **EpisodeDetail Back button**: Focusable, activatable with Enter/Space

### ARIA Attributes

Components MUST include appropriate ARIA attributes:

```typescript
// SeasonList
<nav aria-label="Season navigation">
  <button
    aria-pressed={season.seasonNumber === currentSeasonNumber}
    onClick={() => onSeasonSelect(season.seasonNumber)}
  >
    Season {season.seasonNumber}
  </button>
</nav>

// EpisodeCard
<article aria-label={`Episode ${episode.episodeNumber}: ${episode.title}`}>
  {/* Card content */}
</article>

// EpisodeDetail
<article aria-label="Episode details">
  {onBack && (
    <button aria-label="Back to season view" onClick={onBack}>
      Back
    </button>
  )}
</article>
```

### Focus Management

- Focus indicators MUST be visible (outline, ring, background change)
- Focus order MUST follow logical reading order (top to bottom, left to right)
- Back button receives focus when EpisodeDetail mounts (if present)

---

## Performance Contracts

### Rendering Optimization

Components SHOULD be memoized if they render frequently with same props:

```typescript
// EpisodeCard - may render many times in list
export const EpisodeCard = React.memo<EpisodeCardProps>(({ episode, onClick, className }) => {
  // Component implementation
});

// Comparison function (optional)
const arePropsEqual = (prev: EpisodeCardProps, next: EpisodeCardProps) => {
  return prev.episode.episodeNumber === next.episode.episodeNumber &&
         prev.onClick === next.onClick;
};

export const EpisodeCard = React.memo(Component, arePropsEqual);
```

### Callback Stability

Parent components MUST provide stable callbacks (use `useCallback`):

```typescript
// ✅ Correct: Stable callback
const handleSeasonSelect = useCallback((num: number) => {
  navigate(`/seasons/${num}`);
}, [navigate]);

<SeasonList onSeasonSelect={handleSeasonSelect} />

// ❌ Incorrect: New function every render (causes unnecessary re-renders)
<SeasonList onSeasonSelect={(num) => navigate(`/seasons/${num}`)} />
```

---

## Error Handling Contracts

### Invalid Data

Components MUST handle invalid or missing data gracefully:

```typescript
// Handle missing mistress field
{episode.mistress && (
  <div className="mistress">
    <strong>Mistress:</strong> {episode.mistress}
  </div>
)}

// Handle empty arrays
{episode.godfatherReferences.length > 0 && (
  <section>
    <h3>Godfather References</h3>
    <ul>
      {episode.godfatherReferences.map((ref, idx) => (
        <li key={idx}>{ref}</li>
      ))}
    </ul>
  </section>
)}
```

### Empty States

Components MUST render empty states when data is empty:

```typescript
// SeasonEpisodeList with no episodes
{season.episodes.length === 0 ? (
  <div className="empty-state">
    <p>No episodes found for this season.</p>
  </div>
) : (
  season.episodes.map(episode => (
    <EpisodeCard key={episode.episodeNumber} episode={episode} />
  ))
)}
```

---

## Testing Contracts

### Unit Tests Required

Each component MUST have unit tests covering:

1. **Rendering**: Component renders without errors
2. **Props**: All required props are used correctly
3. **Interactions**: Callbacks are called when user interacts
4. **Accessibility**: ARIA attributes present, keyboard navigation works
5. **Edge cases**: Empty data, null values, missing optional props

**Example Test**:

```typescript
describe('EpisodeCard', () => {
  const mockEpisode: Episode = {
    episodeNumber: 1,
    episodeInSeason: 1,
    title: 'Test Episode',
    author: 'Test Author',
    director: 'Test Director',
    airDate: '1999-01-10',
    mistress: null,
    description: 'Test description',
    godfatherReferences: [],
    music: [],
    hboReview: 'Test review',
  };

  it('renders episode title and metadata', () => {
    render(<EpisodeCard episode={mockEpisode} />);
    expect(screen.getByText('Test Episode')).toBeInTheDocument();
    expect(screen.getByText(/Test Author/)).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', async () => {
    const handleClick = vi.fn();
    render(<EpisodeCard episode={mockEpisode} onClick={handleClick} />);
    
    await userEvent.click(screen.getByRole('article'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is keyboard accessible', async () => {
    const handleClick = vi.fn();
    render(<EpisodeCard episode={mockEpisode} onClick={handleClick} />);
    
    const card = screen.getByRole('article');
    card.focus();
    await userEvent.keyboard('{Enter}');
    expect(handleClick).toHaveBeenCalled();
  });
});
```

---

## Integration Points

### With Pages

Season components integrate with `SeasonsPage` and `EpisodeDetailPage`:

```typescript
// SeasonsPage.tsx
function SeasonsPage() {
  const { data: seasons, loading, error } = useSeasons();
  const { seasonNumber } = useParams();
  const navigate = useNavigate();

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!seasons) return null;

  const currentSeason = seasons.find(s => s.seasonNumber === Number(seasonNumber)) ?? seasons[0];

  return (
    <PageWithSidebar
      sidebar={
        <SeasonList
          seasons={seasons}
          currentSeasonNumber={currentSeason.seasonNumber}
          onSeasonSelect={(num) => navigate(`/seasons/${num}`)}
        />
      }
      main={
        <SeasonEpisodeList
          season={currentSeason}
          onEpisodeClick={(num) => navigate(`/episodes/${num}`)}
        />
      }
    />
  );
}
```

### With Data Hooks

Components consume data from `useSeasons` hook:

```typescript
// useSeasons.ts returns DataLoadingState<Season[]>
const { data: seasons, loading, error } = useSeasons();

// Components receive Season[] after loading complete
<SeasonList seasons={seasons!} />  // Non-null assertion safe here after loading check
```

---

**Season component contracts complete. See [recipe.contract.md](./recipe.contract.md) for Recipe components.**
