/**
 * Integration tests for RecipeDetail component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { RecipeDetail } from '@/components/recipes/RecipeDetail';
import type { Recipe } from '@/types';

const mockRecipe: Recipe = {
  id: 'carmelas-ziti',
  name: "Carmela's Ziti",
  description: "Carmela's famous baked ziti is a staple at Soprano family gatherings. This rich, cheesy pasta dish is comfort food at its finest.",
  ingredients: [
    '1 pound ziti pasta',
    '2 pounds ricotta cheese',
    '1 pound mozzarella, shredded',
    '1 cup grated Parmesan cheese'
  ],
  instructions: [
    'Preheat oven to 375°F (190°C).',
    'Cook ziti according to package directions until al dente.',
    'In a large bowl, combine ricotta, eggs, and cheeses.',
    'Bake for 30 minutes covered, then 15 minutes uncovered.'
  ],
  prepTime: 20,
  cookTime: 45,
  servings: 6
};

describe('RecipeDetail', () => {
  it('should render recipe name', () => {
    render(
      <BrowserRouter>
        <RecipeDetail recipe={mockRecipe} />
      </BrowserRouter>
    );

    expect(screen.getByText("Carmela's Ziti")).toBeInTheDocument();
  });

  it('should render recipe description', () => {
    render(
      <BrowserRouter>
        <RecipeDetail recipe={mockRecipe} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Carmela's famous baked ziti/i)).toBeInTheDocument();
    expect(screen.getByText(/comfort food at its finest/i)).toBeInTheDocument();
  });

  it('should render all ingredients', () => {
    render(
      <BrowserRouter>
        <RecipeDetail recipe={mockRecipe} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Ingredients/i)).toBeInTheDocument();
    expect(screen.getByText(/1 pound ziti pasta/i)).toBeInTheDocument();
    expect(screen.getByText(/2 pounds ricotta cheese/i)).toBeInTheDocument();
    expect(screen.getByText(/1 pound mozzarella, shredded/i)).toBeInTheDocument();
    expect(screen.getByText(/1 cup grated Parmesan cheese/i)).toBeInTheDocument();
  });

  it('should render all instructions', () => {
    render(
      <BrowserRouter>
        <RecipeDetail recipe={mockRecipe} />
      </BrowserRouter>
    );

    expect(screen.getByText(/Instructions/i)).toBeInTheDocument();
    expect(screen.getByText(/Preheat oven to 375°F/i)).toBeInTheDocument();
    expect(screen.getByText(/Cook ziti according to package/i)).toBeInTheDocument();
    expect(screen.getByText(/combine ricotta, eggs, and cheeses/i)).toBeInTheDocument();
    expect(screen.getByText(/Bake for 30 minutes covered/i)).toBeInTheDocument();
  });

  it('should number instructions sequentially', () => {
    render(
      <BrowserRouter>
        <RecipeDetail recipe={mockRecipe} />
      </BrowserRouter>
    );

    // Check that instructions are displayed with numbers
    const instructions = screen.getByText(/Instructions/i).closest('div');
    expect(instructions).toBeInTheDocument();
    
    // Instructions should have numbered list
    expect(screen.getByText('1.')).toBeInTheDocument();
    expect(screen.getByText('2.')).toBeInTheDocument();
    expect(screen.getByText('3.')).toBeInTheDocument();
    expect(screen.getByText('4.')).toBeInTheDocument();
  });

  it('should render back link', () => {
    render(
      <BrowserRouter>
        <RecipeDetail recipe={mockRecipe} />
      </BrowserRouter>
    );

    const backLink = screen.getByRole('link', { name: /back to recipes/i });
    expect(backLink).toBeInTheDocument();
    expect(backLink).toHaveAttribute('href', '/recipes');
  });

  it('should apply correct styling classes', () => {
    const { container } = render(
      <BrowserRouter>
        <RecipeDetail recipe={mockRecipe} />
      </BrowserRouter>
    );

    const mainDiv = container.querySelector('.max-w-4xl');
    expect(mainDiv).toBeInTheDocument();
  });

  it('should render ingredients section with emoji icon', () => {
    render(
      <BrowserRouter>
        <RecipeDetail recipe={mockRecipe} />
      </BrowserRouter>
    );

    const ingredientsHeading = screen.getByText(/Ingredients/i);
    expect(ingredientsHeading).toBeInTheDocument();
    
    // Check for emoji in heading
    const headingElement = ingredientsHeading.closest('h2');
    expect(headingElement?.textContent).toContain('🥘');
  });

  it('should render instructions section with emoji icon', () => {
    render(
      <BrowserRouter>
        <RecipeDetail recipe={mockRecipe} />
      </BrowserRouter>
    );

    const instructionsHeading = screen.getByText(/Instructions/i);
    expect(instructionsHeading).toBeInTheDocument();
    
    // Check for emoji in heading
    const headingElement = instructionsHeading.closest('h2');
    expect(headingElement?.textContent).toContain('👨‍🍳');
  });
});
