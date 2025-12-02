/**
 * Recipe Types - Data models for Sopranos-inspired recipes
 */

/**
 * Recipe with ingredients and preparation instructions
 */
export interface Recipe {
  /** Unique recipe identifier */
  id: string;
  /** Recipe name */
  name: string;
  /** Brief description of the dish */
  description: string;
  /** List of ingredients with quantities */
  ingredients: string[];
  /** Step-by-step preparation instructions */
  instructions: string[];
  /** Preparation time in minutes */
  prepTime: number;
  /** Cooking time in minutes */
  cookTime: number;
  /** Number of servings the recipe yields */
  servings: number;
  /** Optional reference to episode/season where featured */
  featuredIn?: {
    /** Season number */
    season: number;
    /** Episode number */
    episode: number;
  };
}
