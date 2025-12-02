/**
 * HomePage Component Integration Tests
 * Tests for hero section and navigation presence
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HomePage } from '@/pages/HomePage';

describe('HomePage Component', () => {
  it('renders hero section with title', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const title = screen.getByText('The Sopranos');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H1');
  });

  it('renders hero description', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Explore the groundbreaking HBO series/i)).toBeInTheDocument();
  });

  it('renders call-to-action buttons', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Browse Seasons')).toBeInTheDocument();
    expect(screen.getByText('Top Episodes')).toBeInTheDocument();
  });

  it('renders feature overview cards', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Seasons & Episodes')).toBeInTheDocument();
    expect(screen.getByText('Italian Recipes')).toBeInTheDocument();
    expect(screen.getByText('Top Lists')).toBeInTheDocument();
  });

  it('renders series statistics', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    expect(screen.getByText('Series Information')).toBeInTheDocument();
    expect(screen.getByText('6')).toBeInTheDocument(); // Seasons
    expect(screen.getByText('86')).toBeInTheDocument(); // Episodes
  });

  it('has links to main sections', () => {
    render(
      <MemoryRouter>
        <HomePage />
      </MemoryRouter>
    );

    const seasonsLinks = screen.getAllByRole('link', { name: /seasons/i });
    expect(seasonsLinks.length).toBeGreaterThan(0);
    
    const recipesLinks = screen.getAllByRole('link', { name: /recipes/i });
    expect(recipesLinks.length).toBeGreaterThan(0);
    
    const topListLinks = screen.getAllByRole('link', { name: /top/i });
    expect(topListLinks.length).toBeGreaterThan(0);
  });
});
