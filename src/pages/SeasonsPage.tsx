/**
 * Seasons Page Component
 * Browse all seasons - overview/landing page
 */

import { Navigate } from 'react-router-dom';

/**
 * Seasons overview page - redirects to Season 1 detail
 * This is the landing page for /seasons route
 */
export function SeasonsPage() {
  // Always redirect to Season 1 detail page
  return <Navigate to="/seasons/1" replace />;
}