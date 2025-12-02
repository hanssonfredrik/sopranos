/**
 * ErrorMessage Component
 * Displays error messages with optional retry functionality
 */

interface ErrorMessageProps {
  /** Error message to display */
  message: string;
  /** Optional retry callback */
  onRetry?: () => void;
  /** Whether to center the error message */
  centered?: boolean;
}

/**
 * Error message component with optional retry button
 */
export function ErrorMessage({ 
  message, 
  onRetry, 
  centered = false 
}: ErrorMessageProps) {
  const content = (
    <div className="bg-surface border border-error rounded-lg p-4 max-w-md">
      <div className="flex items-start gap-3">
        <svg
          className="w-5 h-5 text-error flex-shrink-0 mt-0.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-error mb-1">Error</h3>
          <p className="text-sm text-secondary">{message}</p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="mt-3 text-sm font-medium text-primary hover:text-primary-light transition-colors"
              type="button"
            >
              Try Again →
            </button>
          )}
        </div>
      </div>
    </div>
  );

  if (centered) {
    return (
      <div className="min-h-[200px] flex items-center justify-center p-4">
        {content}
      </div>
    );
  }

  return content;
}
