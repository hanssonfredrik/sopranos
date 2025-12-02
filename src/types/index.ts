// Common types used throughout the application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
  errors?: string[];
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

export interface PaginationParams {
  page: number;
  limit: number;
  total?: number;
}

export interface ButtonVariant {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  size: 'sm' | 'md' | 'lg';
}

export interface NetworkStatus {
  isOnline: boolean;
  effectiveType?: '2g' | '3g' | '4g' | 'slow-2g';
  downlink?: number;
}