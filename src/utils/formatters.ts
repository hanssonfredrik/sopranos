/**
 * Formatter Utilities
 * Functions for formatting dates, durations, and generating URL slugs
 */

/**
 * Format ISO date string to human-readable format
 * @param isoDate - Date string in ISO 8601 format (YYYY-MM-DD)
 * @returns Formatted date string (e.g., "January 10, 1999")
 * @example
 * formatAirDate("1999-01-10") // "January 10, 1999"
 */
export function formatAirDate(isoDate: string): string {
  try {
    const date = new Date(isoDate);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return isoDate; // Return original if invalid
    }
    
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  } catch {
    return isoDate; // Return original on error
  }
}

/**
 * Convert string to URL-friendly slug
 * @param text - Text to convert to slug
 * @returns URL-safe slug (lowercase, hyphenated)
 * @example
 * toSlug("The Sopranos: Episode 1") // "the-sopranos-episode-1"
 */
export function toSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars except spaces and hyphens
    .replace(/[\s_-]+/g, '-') // Replace spaces, underscores, multiple hyphens with single hyphen
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

/**
 * Format duration in minutes to human-readable string
 * @param minutes - Duration in minutes
 * @returns Formatted duration (e.g., "1h 5m", "45m")
 * @example
 * formatDuration(65) // "1h 5m"
 * formatDuration(45) // "45m"
 */
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`;
  }
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (remainingMinutes === 0) {
    return `${hours}h`;
  }
  
  return `${hours}h ${remainingMinutes}m`;
}
