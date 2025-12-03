/**
 * Navigation Component
 * Top-level navigation menu with route links and mobile hamburger menu
 */

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import type { NavigationItem } from '@/types';
import '../../responsive.css';

const navigationItems: NavigationItem[] = [
  { id: 'home', label: 'Home', path: '/' },
  { id: 'seasons', label: 'Seasons', path: '/seasons' },
  { id: 'toplist', label: 'Top List', path: '/toplist' },
  { id: 'recipes', label: 'Recipes', path: '/recipes' }
];

/**
 * Main navigation component with active route highlighting and mobile hamburger menu
 */
export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-surface border-b border-border" role="navigation" aria-label="Main navigation">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-primary">The Sopranos</h1>
          </div>

          {/* Desktop Navigation Links */}
          <ul className="hidden md:flex space-x-8" role="menubar">
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

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden p-2 hover:bg-hover rounded"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6 text-secondary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-border bg-surface py-4">
            <ul className="space-y-2" role="menubar">
              {navigationItems.map((item) => (
                <li key={item.id} role="none">
                  <NavLink
                    to={item.path}
                    role="menuitem"
                    className={({ isActive }) =>
                      `block px-4 py-2 text-sm font-medium transition-colors rounded ${
                        isActive
                          ? 'text-primary bg-hover'
                          : 'text-secondary hover:text-primary hover:bg-hover'
                      }`
                    }
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
