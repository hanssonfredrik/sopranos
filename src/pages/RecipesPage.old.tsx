import React from 'react';
import { recipes } from '@/data/sopranos';

/**
 * Recipes page with Italian recipes from the show
 */
export const RecipesPage: React.FC = () => {
  return (
    <div className="bg-primary py-16">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          Italian Recipes from The Sopranos
        </h1>
        
        <div className="text-center mb-12">
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            Discover the authentic Italian-American recipes featured throughout the series. 
            From Tony's favorite sandwiches to Carmela's family dinner staples.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
          {recipes.map((recipe, index) => (
            <div key={index} className="bg-card p-6 rounded shadow">
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-xl font-bold text-primary">
                  {recipe.name}
                </h3>
                <span className="text-accent-gold text-sm bg-tertiary px-2 py-1 rounded">
                  Italian-American
                </span>
              </div>
              
              <p className="text-secondary mb-6">
                {recipe.description}
              </p>
              
              <div className="border-t border-border-color pt-4">
                <h4 className="font-semibold text-primary mb-3">Ingredients:</h4>
                <ul className="text-sm text-secondary space-y-1 mb-6">
                  {recipe.ingredients.map((ingredient, ingredientIndex) => (
                    <li key={ingredientIndex}>• {ingredient}</li>
                  ))}
                </ul>
                
                <h4 className="font-semibold text-primary mb-3">Instructions:</h4>
                <ol className="text-sm text-secondary space-y-2">
                  {recipe.instructions.map((instruction, instructionIndex) => (
                    <li key={instructionIndex} className="flex">
                      <span className="text-accent-gold font-bold mr-3 min-w-[20px]">
                        {instructionIndex + 1}.
                      </span>
                      <span>{instruction}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          ))}
        </div>

        {/* Recipe Tips */}
        <div className="mt-16 bg-card p-8 rounded shadow">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Cooking Tips from The Sopranos Kitchen
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-3">🥫</div>
              <h4 className="font-bold text-accent-gold mb-2">Quality Ingredients</h4>
              <p className="text-muted text-sm">Always use the finest San Marzano tomatoes and authentic Italian cheeses</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">👨‍🍳</div>
              <h4 className="font-bold text-accent-gold mb-2">Family Tradition</h4>
              <p className="text-muted text-sm">These recipes have been passed down through generations of Italian families</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-3">�️</div>
              <h4 className="font-bold text-accent-gold mb-2">Sunday Dinner</h4>
              <p className="text-muted text-sm">Perfect for bringing the family together, just like in the show</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};