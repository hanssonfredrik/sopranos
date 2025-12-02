/**
 * NotFoundPage Component
 * 404 error page for unmatched routes
 */

import { Link } from 'react-router-dom';

/**
 * 404 Not Found page with navigation back to home
 */
export function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="text-6xl font-bold text-primary mb-4">404</div>
        <h1 className="text-3xl font-semibold text-primary mb-4">
          Page Not Found
        </h1>
        <p className="text-secondary mb-8">
          Looks like you've wandered into the Pine Barrens. 
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          className="btn-primary px-6 py-3 rounded-lg inline-block"
        >
          ← Back to Home
        </Link>
      </div>
    </div>
  );
}
