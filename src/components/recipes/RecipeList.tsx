/**
 * RecipeList Component
 * Sidebar navigation for recipes with active state highlighting
 */

import { NavLink } from 'react-router-dom';
import type { Recipe } from '@/types';
import { toSlug } from '@/utils';

interface RecipeListProps {
  /** Array of recipes to display */
  recipes: Recipe[];
  /** Currently active recipe name */
  activeRecipe?: string;
}

/**
 * Recipe list component for sidebar navigation
 * Shows all recipes with active state highlighting
 */
export function RecipeList({ recipes, activeRecipe }: RecipeListProps) {
  return (
    <nav className="space-y-2" aria-label="Recipes navigation">
      <h2 className="text-lg font-semibold text-primary mb-4 px-3">
        Recipes
      </h2>
      <ul className="space-y-1">
        {recipes.map((recipe) => {
          const slug = toSlug(recipe.name);
          const isActive = activeRecipe === slug;
          
          return (
            <li key={slug}>
              <NavLink
                to={`/recipes/${slug}`}
                className={({ isActive: routeActive }) =>
                  `block px-3 py-2 rounded-md transition-colors ${
                    routeActive || isActive
                      ? 'bg-primary text-white font-semibold'
                      : 'text-secondary hover:bg-secondary-light hover:text-primary'
                  }`
                }
              >
                <div className="text-sm">
                  {recipe.name}
                </div>
              </NavLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
