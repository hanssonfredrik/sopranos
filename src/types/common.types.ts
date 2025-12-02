/**
 * Common Types - Shared type definitions across the application
 */

/**
 * Generic data loading state with typed data
 * @template T - The type of data being loaded
 */
export interface DataLoadingState<T> {
  /** The loaded data, undefined while loading or on error */
  data: T | undefined;
  /** Loading state indicator */
  loading: boolean;
  /** Error message if loading failed, undefined otherwise */
  error: string | undefined;
}

/**
 * Navigation menu item
 */
export interface NavigationItem {
  /** Unique identifier for the nav item */
  id: string;
  /** Display label */
  label: string;
  /** Route path */
  path: string;
  /** Optional icon identifier */
  icon?: string;
}
