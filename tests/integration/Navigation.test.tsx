/**
 * Navigation Component Integration Tests
 * Tests for active route highlighting and navigation clicks
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Navigation } from '@/components/ui/Navigation';

describe('Navigation Component', () => {
  it('renders all navigation items', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('Seasons')).toBeInTheDocument();
    expect(screen.getByText('Top List')).toBeInTheDocument();
    expect(screen.getByText('Recipes')).toBeInTheDocument();
  });

  it('highlights active route', () => {
    render(
      <MemoryRouter initialEntries={['/seasons']}>
        <Navigation />
      </MemoryRouter>
    );

    const seasonsLink = screen.getByText('Seasons');
    expect(seasonsLink).toHaveClass('text-primary');
    expect(seasonsLink).toHaveClass('border-primary');
  });

  it('renders brand logo', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    expect(screen.getByText('The Sopranos')).toBeInTheDocument();
  });

  it('has correct ARIA attributes', () => {
    render(
      <MemoryRouter>
        <Navigation />
      </MemoryRouter>
    );

    const nav = screen.getByRole('navigation');
    expect(nav).toHaveAttribute('aria-label', 'Main navigation');
    
    const menubar = screen.getByRole('menubar');
    expect(menubar).toBeInTheDocument();
  });
});
