/**
 * Card Component
 * Reusable card component with consistent styling
 */

import type { ReactNode } from 'react';

interface CardProps {
  /** Card content */
  children: ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Optional click handler */
  onClick?: () => void;
  /** Whether the card is hoverable */
  hoverable?: boolean;
  /** Whether the card is selected/active */
  isActive?: boolean;
}

/**
 * Reusable card component with consistent styling
 * Used for episodes, recipes, top list items, etc.
 */
export function Card({ 
  children, 
  className = '', 
  onClick, 
  hoverable = false,
  isActive = false 
}: CardProps) {
  const baseClasses = 'bg-surface rounded-lg shadow-md p-6';
  const hoverClasses = hoverable ? 'transition-all hover:shadow-lg hover:-translate-y-1' : '';
  const activeClasses = isActive ? 'border-2 border-accent' : '';
  const clickClasses = onClick ? 'cursor-pointer' : '';
  
  return (
    <div 
      className={`${baseClasses} ${hoverClasses} ${activeClasses} ${clickClasses} ${className}`.trim()}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
