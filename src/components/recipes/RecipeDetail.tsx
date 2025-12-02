/**
 * RecipeDetail Component
 * Displays full recipe information with ingredients and instructions
 */

import { Link } from 'react-router-dom';
import type { Recipe } from '@/types';

interface RecipeDetailProps {
  /** Recipe data to display */
  recipe: Recipe;
}

/**
 * Recipe detail component showing complete recipe information
 * Includes description, ingredients list, and step-by-step instructions
 */
export function RecipeDetail({ recipe }: RecipeDetailProps) {
  return (
    <div className="max-w-4xl">
      {/* Back Navigation */}
      <Link
        to="/recipes"
        className="inline-flex items-center text-secondary hover:text-primary transition-colors mb-6"
      >
        <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to Recipes
      </Link>

      {/* Recipe Header */}
      <div className="bg-surface rounded-lg shadow-md p-6 mb-6">
        <h1 className="text-3xl font-bold text-primary mb-4">
          {recipe.name}
        </h1>
        <p className="text-secondary leading-relaxed">
          {recipe.description}
        </p>
      </div>

      {/* Ingredients Section */}
      <div className="bg-surface rounded-lg shadow-md p-6 mb-6">
        <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
          <span>🥘</span>
          Ingredients
        </h2>
        <ul className="space-y-2">
          {recipe.ingredients.map((ingredient, index) => (
            <li 
              key={index}
              className="flex items-start gap-3 text-secondary"
            >
              <span className="text-accent font-semibold min-w-[24px]">•</span>
              <span>{ingredient}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Instructions Section */}
      <div className="bg-surface rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-primary mb-4 flex items-center gap-2">
          <span>👨‍🍳</span>
          Instructions
        </h2>
        <ol className="space-y-4">
          {recipe.instructions.map((instruction, index) => (
            <li 
              key={index}
              className="flex items-start gap-3"
            >
              <span className="text-accent font-semibold min-w-[32px] text-lg">
                {index + 1}.
              </span>
              <p className="text-secondary leading-relaxed pt-0.5">
                {instruction}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
