/**
 * PageWithSidebar Component
 * Two-column responsive layout with sidebar and main content
 */

import type { ReactNode } from 'react';

interface PageWithSidebarProps {
  /** Sidebar content (typically navigation) */
  sidebar: ReactNode;
  /** Main content area */
  children: ReactNode;
}

/**
 * Page layout component with sidebar and main content
 * Responsive: stacks on mobile, side-by-side on desktop
 */
export function PageWithSidebar({ sidebar, children }: PageWithSidebarProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Sidebar */}
      <aside className="md:w-64 flex-shrink-0">
        <div className="md:sticky md:top-24 bg-surface rounded-lg shadow-md p-4">
          {sidebar}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0">
        {children}
      </main>
    </div>
  );
}
