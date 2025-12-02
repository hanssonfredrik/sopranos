/**
 * Navigation Component
 * Top-level navigation menu with route links
 */

import { NavLink } from 'react-router-dom';
import type { NavigationItem } from '@/types';

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'seasons', label: 'Seasons', path: '/seasons' },
  { id: 'toplist', label: 'Top List', path: '/toplist' },
  { id: 'recipes', label: 'Recipes', path: '/recipes' }
];

/**
 * Main navigation component with active route highlighting
 */
export function Navigation() {
  return (
    <nav className="bg-surface border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">The Sopranos</h1>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-8" role="menubar">
            {navigationItems.map((item) => (
              <li key={item.id} role="none">
                <NavLink
                  to={item.path}
                  role="menuitem"
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary ${
                      isActive
                        ? 'text-primary border-b-2 border-primary pb-1'
                        : 'text-secondary'
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
