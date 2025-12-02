/**
 * Formatter Utilities Test Suite
 * Tests for date formatting, slug generation, and duration formatting
 */

import { describe, it, expect } from 'vitest';
import { formatAirDate, toSlug, formatDuration } from '@/utils/formatters';

describe('formatAirDate', () => {
  it('formats ISO date string to human-readable format', () => {
    expect(formatAirDate('1999-01-10')).toBe('January 10, 1999');
    expect(formatAirDate('2007-06-10')).toBe('June 10, 2007');
  });

  it('handles invalid date gracefully', () => {
    expect(formatAirDate('invalid-date')).toBe('invalid-date');
    expect(formatAirDate('')).toBe('');
  });

  it('handles edge case dates', () => {
    expect(formatAirDate('2000-01-01')).toBe('January 1, 2000');
    expect(formatAirDate('2000-12-31')).toBe('December 31, 2000');
  });
});

describe('toSlug', () => {
  it('converts text to lowercase hyphenated slug', () => {
    expect(toSlug('The Sopranos')).toBe('the-sopranos');
    expect(toSlug('Episode 1')).toBe('episode-1');
  });

  it('removes special characters', () => {
    expect(toSlug('The Sopranos: Episode 1')).toBe('the-sopranos-episode-1');
    expect(toSlug('Tony\'s Story!')).toBe('tonys-story');
  });

  it('replaces spaces and underscores with hyphens', () => {
    expect(toSlug('hello world test')).toBe('hello-world-test');
    expect(toSlug('hello_world_test')).toBe('hello-world-test');
  });

  it('removes leading and trailing hyphens', () => {
    expect(toSlug(' -hello- ')).toBe('hello');
    expect(toSlug('---test---')).toBe('test');
  });

  it('handles empty string', () => {
    expect(toSlug('')).toBe('');
  });

  it('collapses multiple hyphens into one', () => {
    expect(toSlug('hello---world')).toBe('hello-world');
  });
});

describe('formatDuration', () => {
  it('formats minutes less than 60', () => {
    expect(formatDuration(45)).toBe('45m');
    expect(formatDuration(30)).toBe('30m');
    expect(formatDuration(5)).toBe('5m');
  });

  it('formats exact hours', () => {
    expect(formatDuration(60)).toBe('1h');
    expect(formatDuration(120)).toBe('2h');
  });

  it('formats hours with remaining minutes', () => {
    expect(formatDuration(65)).toBe('1h 5m');
    expect(formatDuration(90)).toBe('1h 30m');
    expect(formatDuration(125)).toBe('2h 5m');
  });

  it('handles zero duration', () => {
    expect(formatDuration(0)).toBe('0m');
  });
});
