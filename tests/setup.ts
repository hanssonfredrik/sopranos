import '@testing-library/jest-dom';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock fetch for tests
global.fetch = vi.fn();

// Reset mocks after each test
afterEach(() => {
  vi.restoreAllMocks();
});
