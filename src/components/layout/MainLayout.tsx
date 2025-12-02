/**
 * MainLayout Component
 * Root layout wrapper with navigation, error boundary, and network status
 */

import { Outlet } from 'react-router-dom';
import { Navigation } from '@/components/ui/Navigation';
import { ErrorBoundary } from '@/components/layout/ErrorBoundary';
// import { NetworkStatus } from '@/components/NetworkStatus';

/**
 * Main layout component wrapping all pages
 * Includes navigation, error boundary, and network status indicator
 */
export function MainLayout() {
  return (
    <div className="min-h-screen bg-background">
      {/* Skip to Main Content Link for Keyboard Navigation */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-accent focus:text-surface focus:rounded-md focus:shadow-lg"
      >
        Skip to main content
      </a>

      {/* Main Navigation */}
      <Navigation />

      {/* Main Content with Error Boundary */}
      <ErrorBoundary>
        <main id="main-content" className="container mx-auto px-4 py-8">
          <Outlet />
        </main>
      </ErrorBoundary>
    </div>
  );
}
