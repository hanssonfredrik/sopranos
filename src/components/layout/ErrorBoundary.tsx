/**
 * ErrorBoundary Component
 * Catches React errors in child component tree and displays fallback UI
 */

import { Component, type ReactNode, type ErrorInfo } from 'react';

interface ErrorBoundaryProps {
  /** Child components to render */
  children: ReactNode;
  /** Optional custom fallback UI */
  fallback?: ReactNode;
  /** Optional error handler callback */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;
  /** The caught error object */
  error: Error | null;
}

/**
 * Error boundary component that catches errors in child component tree
 * Provides graceful error handling and fallback UI
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console in development
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call optional error handler
    this.props.onError?.(error, errorInfo);
  }

  handleReset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Render custom fallback if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full bg-surface rounded-lg shadow-lg p-6 text-center">
            <h1 className="text-2xl font-bold text-primary mb-4">
              Something went wrong
            </h1>
            <p className="text-secondary mb-6">
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              onClick={this.handleReset}
              className="btn-primary px-6 py-2"
              type="button"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
