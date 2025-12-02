import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Main layout component with persistent top navigation and mobile hamburger menu
 */
export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/', label: 'Home' },
    { path: '/seasons', label: 'Seasons' },
    { path: '/recipes', label: 'Recipes' },
    { path: '/toplist', label: 'Top List' },
  ];

  const isActiveLink = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header Navigation */}
      <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur border-b border-border-color">
        <div className="container mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="text-2xl font-black text-accent-gold">
                THE SOPRANOS
              </div>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigationItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-sm font-medium transition-colors hover:text-accent-secondary ${
                    isActiveLink(item.path)
                      ? 'text-accent-primary border-b-2 border-accent-primary pb-4'
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 hover:bg-hover rounded"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle mobile menu"
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
            <div className="md:hidden border-t border-border-color bg-secondary">
              <nav className="px-4 py-3 space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-2 rounded text-sm font-medium transition-colors ${
                      isActiveLink(item.path)
                        ? 'text-accent-primary bg-tertiary'
                        : 'text-secondary hover:text-primary hover:bg-hover'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-screen">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-secondary border-t border-border-color">
        <div className="container mx-auto py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-bold text-accent-gold mb-4">
                The Sopranos
              </h3>
              <p className="text-muted text-sm">
                Experience the complete world of Tony Soprano and his family.
                From episodes and recipes to the ultimate ranking of the greatest moments.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link to="/seasons" className="text-muted hover:text-secondary">
                    All Seasons
                  </Link>
                </li>
                <li>
                  <Link to="/recipes" className="text-muted hover:text-secondary">
                    Recipes
                  </Link>
                </li>
                <li>
                  <Link to="/toplist" className="text-muted hover:text-secondary">
                    Top Episodes
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Series Info</h4>
              <ul className="space-y-2 text-sm text-muted">
                <li>Created by David Chase</li>
                <li>1999 - 2007</li>
                <li>6 Seasons, 86 Episodes</li>
                <li>HBO Original Series</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-border-color mt-8 pt-8 text-center">
            <p className="text-muted text-sm">
              &copy; 2025 The Sopranos Fan Site. This is an unofficial fan website.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};