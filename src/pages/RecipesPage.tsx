/**
 * Recipes Page Component
 * Browse authentic Italian-American recipes
 */

import { useParams, Navigate } from 'react-router-dom';
import { useRecipes } from '@/hooks/useRecipes';
import { PageWithSidebar } from '@/components/layout/PageWithSidebar';
import { RecipeList } from '@/components/recipes/RecipeList';
import { RecipeDetail } from '@/components/recipes/RecipeDetail';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { ErrorMessage } from '@/components/ui/ErrorMessage';
import { toSlug } from '@/utils';

/**
 * Recipes page with sidebar navigation and recipe detail
 * Shows recipe list in sidebar and full recipe details in main content
 */
export function RecipesPage() {
  const { recipeSlug } = useParams<{ recipeSlug: string }>();
  const { data: recipes, loading, error } = useRecipes();

  // Loading state
  if (loading) {
    return <LoadingSpinner centered label="Loading recipes..." />;
  }

  // Error state
  if (error) {
    return <ErrorMessage message={error} centered />;
  }

  // No data
  if (!recipes || recipes.length === 0) {
    return <ErrorMessage message="No recipes data available" centered />;
  }

  // Redirect to first recipe if no recipe specified
  if (!recipeSlug && recipes.length > 0) {
    const firstRecipeSlug = toSlug(recipes[0]!.name);
    return <Navigate to={`/recipes/${firstRecipeSlug}`} replace />;
  }

  // No recipes available
  if (recipes.length === 0) {
    return <ErrorMessage message="No recipes available" centered />;
  }

  // Find current recipe
  const currentRecipe = recipes.find(r => toSlug(r.name) === recipeSlug);

  // Recipe not found
  if (!currentRecipe) {
    return (
      <div className="text-center py-16">
        <ErrorMessage
          message={`Recipe "${recipeSlug}" not found`}
          centered
        />
      </div>
    );
  }

  return (
    <PageWithSidebar
      sidebar={
        <RecipeList
          recipes={recipes}
          activeRecipe={recipeSlug!}
        />
      }
    >
      <RecipeDetail recipe={currentRecipe} />
    </PageWithSidebar>
  );
}
