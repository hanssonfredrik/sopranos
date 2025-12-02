/**
 * LoadingSpinner Component
 * Displays animated loading indicator for async operations
 */

interface LoadingSpinnerProps {
  /** Size variant of the spinner */
  size?: 'sm' | 'md' | 'lg';
  /** Optional label text */
  label?: string;
  /** Whether to center the spinner in container */
  centered?: boolean;
}

/**
 * Animated loading spinner with configurable size and optional label
 */
export function LoadingSpinner({ 
  size = 'md', 
  label, 
  centered = false 
}: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4 border-2',
    md: 'w-8 h-8 border-3',
    lg: 'w-12 h-12 border-4'
  };

  const spinner = (
    <div className="flex flex-col items-center gap-2">
      <div
        className={`${sizeClasses[size]} border-primary border-t-transparent rounded-full animate-spin`}
        role="status"
        aria-label={label || 'Loading'}
      />
      {label && (
        <span className="text-sm text-secondary">{label}</span>
      )}
    </div>
  );

  if (centered) {
    return (
      <div className="min-h-[200px] flex items-center justify-center">
        {spinner}
      </div>
    );
  }

  return spinner;
}
