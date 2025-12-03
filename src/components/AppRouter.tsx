/**
 * App Router Component
 * Main application routing with lazy loading and error handling
 */

import { lazy, Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MainLayout } from '@/components/layout/MainLayout';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { HomePage } from '@/pages/HomePage';
import { NotFoundPage } from '@/pages/NotFoundPage';

// Lazy load route components for code splitting
const SeasonsPage = lazy(() => import('@/pages/SeasonsPage').then(m => ({ default: m.SeasonsPage })));
const SeasonDetailPage = lazy(() => import('@/pages/SeasonDetailPage').then(m => ({ default: m.SeasonDetailPage })));
const EpisodeDetailPage = lazy(() => import('@/pages/EpisodeDetailPage').then(m => ({ default: m.EpisodeDetailPage })));
const RecipesPage = lazy(() => import('@/pages/RecipesPage').then(m => ({ default: m.RecipesPage })));
const TopListPage = lazy(() => import('@/pages/TopListPage').then(m => ({ default: m.TopListPage })));

/**
 * Analytics tracker component for Google Analytics
 */
function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    // Track page views on route change
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'page_view', {
        page_path: location.pathname + location.search + location.hash
      });
    }
  }, [location]);

  return null;
}

/**
 * Main application router with lazy loading and 404 handling
 */
export function AppRouter() {
  return (
    <Router>
      <AnalyticsTracker />
      <Routes>
        <Route element={<MainLayout />}>
          {/* Home - no lazy loading for immediate display */}
          <Route index element={<HomePage />} />
          
          {/* Seasons routes - lazy loaded */}
          <Route
            path="/seasons"
            element={
              <Suspense fallback={<LoadingSpinner centered label="Loading seasons..." />}>
                <SeasonsPage />
              </Suspense>
            }
          />
          <Route
            path="/seasons/:seasonNumber"
            element={
              <Suspense fallback={<LoadingSpinner centered label="Loading season..." />}>
                <SeasonDetailPage />
              </Suspense>
            }
          />
          <Route
            path="/seasons/:seasonNumber/:episodeNumber"
            element={
              <Suspense fallback={<LoadingSpinner centered label="Loading episode..." />}>
                <EpisodeDetailPage />
              </Suspense>
            }
          />
          
          {/* Recipes page - lazy loaded */}
          <Route
            path="/recipes/:recipeSlug?"
            element={
              <Suspense fallback={<LoadingSpinner centered label="Loading recipes..." />}>
                <RecipesPage />
              </Suspense>
            }
          />
          
          {/* Top list page - lazy loaded */}
          <Route
            path="/toplist"
            element={
              <Suspense fallback={<LoadingSpinner centered label="Loading top lists..." />}>
                <TopListPage />
              </Suspense>
            }
          />
          
          {/* 404 - catch all unmatched routes */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Router>
  );
}