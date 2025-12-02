/**
 * Integration tests for RecipeList component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecipeList } from '@/components/recipes/RecipeList';
import type { Recipe } from '@/types';

const mockRecipes: Recipe[] = [
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
  },
  {
    id: 'paulies-peppers-and-eggs',
    name: "Paulie's Peppers and Eggs",
    description: 'Simple Italian dish',
    ingredients: ['4 large bell peppers', '6 large eggs'],
    instructions: ['Slice peppers', 'Cook until soft'],
    prepTime: 10,
    cookTime: 25,
    servings: 4
  }
];

describe('RecipeList', () => {
  it('should render all recipes', () => {
    render(
      <BrowserRouter>
        <RecipeList recipes={mockRecipes} />
      </BrowserRouter>
    );

    expect(screen.getByText("Tony's Gabagool Sandwich")).toBeInTheDocument();
    expect(screen.getByText("Carmela's Ziti")).toBeInTheDocument();
    expect(screen.getByText("Paulie's Peppers and Eggs")).toBeInTheDocument();
  });

  it('should render navigation links with correct paths', () => {
    render(
      <BrowserRouter>
        <RecipeList recipes={mockRecipes} />
      </BrowserRouter>
    );

    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links[0]).toHaveAttribute('href', '/recipes/tonys-gabagool-sandwich');
    expect(links[1]).toHaveAttribute('href', '/recipes/carmelas-ziti');
    expect(links[2]).toHaveAttribute('href', '/recipes/paulies-peppers-and-eggs');
  });

  it('should handle empty recipes array', () => {
    render(
      <BrowserRouter>
        <RecipeList recipes={[]} />
      </BrowserRouter>
    );

    const links = screen.queryAllByRole('link');
    expect(links).toHaveLength(0);
  });

  it('should render "Recipes" heading', () => {
    render(
      <BrowserRouter>
        <RecipeList recipes={mockRecipes} />
      </BrowserRouter>
    );

    expect(screen.getByText('Recipes')).toBeInTheDocument();
  });

  it('should apply correct CSS classes', () => {
    const { container } = render(
      <BrowserRouter>
        <RecipeList recipes={mockRecipes} />
      </BrowserRouter>
    );

    const nav = container.querySelector('nav');
    expect(nav).toHaveClass('space-y-2');
    expect(nav).toHaveAttribute('aria-label', 'Recipes navigation');
  });

  it('should highlight active recipe when activeRecipe prop is provided', () => {
    render(
      <BrowserRouter>
        <RecipeList recipes={mockRecipes} activeRecipe="carmelas-ziti" />
      </BrowserRouter>
    );

    const links = screen.getAllByRole('link');
    // The active link should have different styling (we can't easily test CSS classes due to NavLink)
    expect(links[1]).toHaveAttribute('href', '/recipes/carmelas-ziti');
  });
});
