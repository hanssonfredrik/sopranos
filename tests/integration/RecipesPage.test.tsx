/**
 * Integration tests for RecipesPage
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { RecipesPage } from '@/pages/RecipesPage';
import * as useRecipesModule from '@/hooks/useRecipes';

// Mock the useRecipes hook
vi.mock('@/hooks/useRecipes', () => ({
  useRecipes: vi.fn(),
  clearRecipesCache: vi.fn()
}));

const mockRecipes = [
  {
    id: 'tonys-gabagool-sandwich',
    name: "Tony's Gabagool Sandwich",
    description: 'A classic Italian-American sandwich',
    ingredients: ['1 Italian sub roll', '4-6 slices of capicola'],
    instructions: ['Slice the bread', 'Layer the capicola'],
    prepTime: 10,
    cookTime: 0,
    servings: 1
  },
  {
    id: 'carmelas-ziti',
    name: "Carmela's Ziti",
    description: 'Famous baked ziti',
    ingredients: ['1 pound ziti pasta', '2 pounds ricotta cheese'],
    instructions: ['Preheat oven', 'Cook ziti'],
    prepTime: 20,
    cookTime: 45,
    servings: 6
  }
];

describe('RecipesPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should display loading state', () => {
    vi.mocked(useRecipesModule.useRecipes).mockReturnValue({
      loading: true,
      data: undefined,
      error: undefined
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<RecipesPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/loading recipes/i)).toBeInTheDocument();
  });

  it('should display error state', () => {
    vi.mocked(useRecipesModule.useRecipes).mockReturnValue({
      loading: false,
      data: undefined,
      error: 'Failed to load recipes'
    });

    render(
      <MemoryRouter>
        <Routes>
          <Route path="*" element={<RecipesPage />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText(/failed to load recipes/i)).toBeInTheDocument();
  });

  it('should render sidebar with recipe list', async () => {
    vi.mocked(useRecipesModule.useRecipes).mockReturnValue({
      loading: false,
      data: mockRecipes,
      error: undefined
    });

    render(
      <MemoryRouter initialEntries={['/recipes/tonys-gabagool-sandwich']}>
        <Routes>
          <Route path="/recipes/:recipeSlug?" element={<RecipesPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      // Recipe names appear in both sidebar and detail, use getAllByText
      const gabagoolNames = screen.getAllByText("Tony's Gabagool Sandwich");
      expect(gabagoolNames.length).toBeGreaterThan(0);
      expect(screen.getByText("Carmela's Ziti")).toBeInTheDocument();
    });
  });

  it('should display recipe detail for selected recipe', async () => {
    vi.mocked(useRecipesModule.useRecipes).mockReturnValue({
      loading: false,
      data: mockRecipes,
      error: undefined
    });

    render(
      <MemoryRouter initialEntries={['/recipes/tonys-gabagool-sandwich']}>
        <Routes>
          <Route path="/recipes/:recipeSlug?" element={<RecipesPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      // Recipe name appears in both sidebar and detail
      const recipeNames = screen.getAllByText("Tony's Gabagool Sandwich");
      expect(recipeNames.length).toBeGreaterThan(0);
      expect(screen.getByText('A classic Italian-American sandwich')).toBeInTheDocument();
    });
  });

  it('should display ingredients and instructions', async () => {
    vi.mocked(useRecipesModule.useRecipes).mockReturnValue({
      loading: false,
      data: mockRecipes,
      error: undefined
    });

    render(
      <MemoryRouter initialEntries={['/recipes/tonys-gabagool-sandwich']}>
        <Routes>
          <Route path="/recipes/:recipeSlug?" element={<RecipesPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Ingredients/i)).toBeInTheDocument();
      expect(screen.getByText(/1 Italian sub roll/i)).toBeInTheDocument();
      expect(screen.getByText(/Instructions/i)).toBeInTheDocument();
      expect(screen.getByText(/Slice the bread/i)).toBeInTheDocument();
    });
  });

  it('should display "Recipe not found" for invalid recipe slug', async () => {
    vi.mocked(useRecipesModule.useRecipes).mockReturnValue({
      loading: false,
      data: mockRecipes,
      error: undefined
    });

    render(
      <MemoryRouter initialEntries={['/recipes/invalid-recipe']}>
        <Routes>
          <Route path="/recipes/:recipeSlug?" element={<RecipesPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/Recipe "invalid-recipe" not found/i)).toBeInTheDocument();
    });
  });

  it('should use PageWithSidebar layout', async () => {
    vi.mocked(useRecipesModule.useRecipes).mockReturnValue({
      loading: false,
      data: mockRecipes,
      error: undefined
    });

    const { container } = render(
      <MemoryRouter initialEntries={['/recipes/tonys-gabagool-sandwich']}>
        <Routes>
          <Route path="/recipes/:recipeSlug?" element={<RecipesPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const layout = container.querySelector('.flex');
      expect(layout).toBeInTheDocument();
    });
  });

  it('should render back link in recipe detail', async () => {
    vi.mocked(useRecipesModule.useRecipes).mockReturnValue({
      loading: false,
      data: mockRecipes,
      error: undefined
    });

    render(
      <MemoryRouter initialEntries={['/recipes/carmelas-ziti']}>
        <Routes>
          <Route path="/recipes/:recipeSlug?" element={<RecipesPage />} />
        </Routes>
      </MemoryRouter>
    );

    await waitFor(() => {
      const backLink = screen.getByRole('link', { name: /back to recipes/i });
      expect(backLink).toBeInTheDocument();
      expect(backLink).toHaveAttribute('href', '/recipes');
    });
  });
});
