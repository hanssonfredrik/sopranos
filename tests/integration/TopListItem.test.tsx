/**
 * Integration tests for TopListItem component
 */

import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TopListItem } from '@/components/toplist/TopListItem';

describe('TopListItem', () => {
  const mockItem = {
    rank: 1,
    title: 'Pine Barrens',
    description: 'Christopher and Paulie get lost in the snowy Pine Barrens while trying to dispose of a Russian mobster.'
  };

  it('should render rank, title, and description', () => {
    render(<TopListItem item={mockItem} />);

    expect(screen.getByText('Pine Barrens')).toBeInTheDocument();
    expect(screen.getByText(/Christopher and Paulie get lost/i)).toBeInTheDocument();
  });

  it('should display gold medal emoji for rank 1', () => {
    render(<TopListItem item={mockItem} />);

    expect(screen.getByText('🥇')).toBeInTheDocument();
  });

  it('should display silver medal emoji for rank 2', () => {
    const item = { ...mockItem, rank: 2 };
    render(<TopListItem item={item} />);

    expect(screen.getByText('🥈')).toBeInTheDocument();
  });

  it('should display bronze medal emoji for rank 3', () => {
    const item = { ...mockItem, rank: 3 };
    render(<TopListItem item={item} />);

    expect(screen.getByText('🥉')).toBeInTheDocument();
  });

  it('should display numeric rank for ranks 4 and above', () => {
    const item = { ...mockItem, rank: 4 };
    render(<TopListItem item={item} />);

    expect(screen.getByText('4')).toBeInTheDocument();
    // Should not have medal emoji
    expect(screen.queryByText('🥇')).not.toBeInTheDocument();
    expect(screen.queryByText('🥈')).not.toBeInTheDocument();
    expect(screen.queryByText('🥉')).not.toBeInTheDocument();
  });

  it('should apply special styling for top-ranked items', () => {
    const { container } = render(<TopListItem item={mockItem} isTopRank={true} />);

    const itemElement = container.querySelector('.border-accent');
    expect(itemElement).toBeInTheDocument();
  });

  it('should not apply special styling for non-top-ranked items', () => {
    const { container } = render(<TopListItem item={mockItem} isTopRank={false} />);

    const itemElement = container.querySelector('.border-accent');
    expect(itemElement).not.toBeInTheDocument();
  });

  it('should render with correct CSS classes', () => {
    const { container } = render(<TopListItem item={mockItem} />);

    const itemElement = container.querySelector('.bg-surface');
    expect(itemElement).toBeInTheDocument();
    expect(itemElement).toHaveClass('rounded-lg', 'shadow-md', 'p-6');
  });

  it('should display title as h3 heading', () => {
    render(<TopListItem item={mockItem} />);

    const heading = screen.getByText('Pine Barrens');
    expect(heading.tagName).toBe('H3');
    expect(heading).toHaveClass('text-xl', 'font-semibold', 'text-primary');
  });

  it('should handle long descriptions', () => {
    const longItem = {
      rank: 1,
      title: 'Episode Title',
      description: 'This is a very long description that goes on and on and should still be displayed properly in the component without breaking the layout or causing any visual issues. '.repeat(3)
    };

    render(<TopListItem item={longItem} />);

    // Use a partial match since the text might have whitespace normalization
    expect(screen.getByText(/This is a very long description that goes on and on/i)).toBeInTheDocument();
  });
});
