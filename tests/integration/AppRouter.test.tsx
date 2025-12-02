/**
 * AppRouter Integration Tests
 * Tests for route rendering and 404 handling
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AppRouter } from '@/components/AppRouter';

describe('AppRouter Component', () => {
  it('renders HomePage at root route', () => {
    window.history.pushState({}, 'Home', '/');
    render(<AppRouter />);
    
    // Check for hero description text (unique to home page)
    expect(screen.getByText(/Explore the groundbreaking HBO series/i)).toBeInTheDocument();
    
    // Verify hero heading with display-font class exists
    const headings = screen.getAllByRole('heading', { level: 1 });
    const heroHeading = headings.find(h => h.classList.contains('display-font'));
    expect(heroHeading).toBeDefined();
  });

  it('renders NotFoundPage for invalid route', () => {
    window.history.pushState({}, 'Invalid', '/invalid-route-xyz');
    render(<AppRouter />);
    
    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('renders navigation on all routes', () => {
    window.history.pushState({}, 'Home', '/');
    render(<AppRouter />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Home' })).toBeInTheDocument();
    expect(screen.getByRole('menuitem', { name: 'Seasons' })).toBeInTheDocument();
  });

  it('renders placeholder for seasons page', async () => {
    window.history.pushState({}, 'Seasons', '/seasons');
    render(<AppRouter />);
    
    // Wait for lazy-loaded component
    const heading = await screen.findByText('Seasons & Episodes');
    expect(heading).toBeInTheDocument();
  });

  it('renders placeholder for recipes page', async () => {
    window.history.pushState({}, 'Recipes', '/recipes');
    render(<AppRouter />);
    
    // Wait for lazy-loaded component
    const heading = await screen.findByText('Italian Recipes');
    expect(heading).toBeInTheDocument();
  });

  it('renders placeholder for top list page', async () => {
    window.history.pushState({}, 'Top List', '/toplist');
    render(<AppRouter />);
    
    // Wait for lazy-loaded component
    const heading = await screen.findByText('Top Lists');
    expect(heading).toBeInTheDocument();
  });

  it('renders 404 link back to home', () => {
    window.history.pushState({}, 'Invalid', '/invalid-route');
    render(<AppRouter />);
    
    const homeLink = screen.getByText('← Back to Home');
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });
});
