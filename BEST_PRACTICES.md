# React + TypeScript + Vite + PWA Best Practices Guide

## Table of Contents
- [Project Structure](#project-structure)
- [TypeScript Best Practices](#typescript-best-practices)
- [React Best Practices](#react-best-practices)
- [Vite Configuration](#vite-configuration)
- [PWA Implementation](#pwa-implementation)
- [Performance Optimization](#performance-optimization)
- [Code Quality & Testing](#code-quality--testing)
- [Development Workflow](#development-workflow)

## Project Structure

### Recommended Folder Organization
```
src/
├── components/           # Reusable UI components
│   ├── ui/              # Basic UI components (Button, Input, etc.)
│   └── common/          # Shared components
├── pages/               # Page-level components
├── hooks/               # Custom React hooks
├── utils/               # Utility functions and helpers
├── types/               # TypeScript type definitions
├── services/            # API services and data fetching
├── context/             # React Context providers
├── assets/              # Static assets (images, fonts, etc.)
└── styles/              # Global styles and CSS modules
```

### File Naming Conventions
- **Components**: PascalCase (`UserProfile.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useAuth.ts`)
- **Utilities**: camelCase (`formatDate.ts`)
- **Types**: PascalCase (`User.ts`, `ApiResponse.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

## TypeScript Best Practices

### 1. Strict Configuration
Your `tsconfig.app.json` is configured with strict settings:
```json
{
  "strict": true,
  "exactOptionalPropertyTypes": true,
  "noImplicitReturns": true,
  "noPropertyAccessFromIndexSignature": true,
  "noUncheckedIndexedAccess": true
}
```

### 2. Type Definitions

#### Interface vs Type
- Use `interface` for object shapes that might be extended
- Use `type` for unions, primitives, and computed types

```typescript
// ✅ Good: Interface for extendable objects
interface User {
  id: string;
  name: string;
  email: string;
}

interface AdminUser extends User {
  permissions: string[];
}

// ✅ Good: Type for unions and computed types
type Status = 'loading' | 'success' | 'error';
type UserKeys = keyof User;
```

#### Props Type Definitions
```typescript
// ✅ Good: Explicit props interface
interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  return <button className={`btn btn-${variant}`} {...props}>{children}</button>;
};
```

### 3. Generic Types
```typescript
// ✅ API response wrapper
interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

// ✅ Generic hook
function useApi<T>(url: string): {
  data: T | null;
  loading: boolean;
  error: string | null;
} {
  // Implementation
}
```

### 4. Utility Types
```typescript
// ✅ Use built-in utility types
type PartialUser = Partial<User>;
type RequiredUser = Required<User>;
type UserEmail = Pick<User, 'email'>;
type UserWithoutId = Omit<User, 'id'>;
```

## React Best Practices

### 1. Component Patterns

#### Functional Components with TypeScript
```typescript
// ✅ Good: Explicit return type
const UserCard: React.FC<{ user: User }> = ({ user }) => {
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </div>
  );
};

// ✅ Better: With props interface
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onEdit }) => {
  const handleEdit = () => onEdit?.(user);
  
  return (
    <div className="user-card">
      <h3>{user.name}</h3>
      <p>{user.email}</p>
      {onEdit && <button onClick={handleEdit}>Edit</button>}
    </div>
  );
};
```

### 2. State Management
```typescript
// ✅ Typed useState
const [user, setUser] = useState<User | null>(null);
const [users, setUsers] = useState<User[]>([]);
const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');

// ✅ Complex state with useReducer
interface State {
  users: User[];
  loading: boolean;
  error: string | null;
}

type Action = 
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: User[] }
  | { type: 'FETCH_ERROR'; payload: string };

const userReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, users: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
```

### 3. Custom Hooks
```typescript
// ✅ Typed custom hook
interface UseApiResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

function useApi<T>(url: string): UseApiResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  }, [url]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
}
```

### 4. Event Handling
```typescript
// ✅ Properly typed event handlers
interface FormProps {
  onSubmit: (data: FormData) => void;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    onSubmit(formData);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleInputChange} />
      <button type="submit">Submit</button>
    </form>
  );
};
```

## Vite Configuration

### 1. Optimal Build Settings
```typescript
// vite.config.ts
export default defineConfig({
  plugins: [react(), VitePWA({...})],
  build: {
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@/components/ui'],
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true,
    cors: true
  }
});
```

### 2. Path Aliases
Already configured in your `tsconfig.app.json`:
```typescript
// Usage with path aliases
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { formatDate } from '@/utils/date';
```

## PWA Implementation

### 1. Service Worker Registration
```typescript
// src/pwa.ts
import { Workbox } from 'workbox-window';

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/sw.js');
  
  wb.addEventListener('installed', (event) => {
    if (event.isUpdate) {
      // Show update available notification
      if (confirm('New app update available! Reload to get the latest version?')) {
        window.location.reload();
      }
    }
  });

  wb.register();
}
```

### 2. Offline Detection Hook
```typescript
// src/hooks/useOnlineStatus.ts
import { useState, useEffect } from 'react';

export const useOnlineStatus = (): boolean => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return isOnline;
};
```

### 3. Install PWA Hook
```typescript
// src/hooks/useInstallPWA.ts
import { useState, useEffect } from 'react';

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const useInstallPWA = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setIsInstallable(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
      setIsInstallable(false);
    }
  };

  return { isInstallable, installPWA };
};
```

## Performance Optimization

### 1. Code Splitting
```typescript
// ✅ Lazy loading components
import { lazy, Suspense } from 'react';

const Dashboard = lazy(() => import('@/pages/Dashboard'));
const UserProfile = lazy(() => import('@/pages/UserProfile'));

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<UserProfile />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
```

### 2. Memoization
```typescript
// ✅ React.memo for component memoization
interface UserItemProps {
  user: User;
  onSelect: (user: User) => void;
}

const UserItem = React.memo<UserItemProps>(({ user, onSelect }) => {
  const handleClick = useCallback(() => {
    onSelect(user);
  }, [user, onSelect]);

  return (
    <div onClick={handleClick}>
      {user.name}
    </div>
  );
});

// ✅ useMemo for expensive calculations
const ExpensiveComponent: React.FC<{ data: number[] }> = ({ data }) => {
  const expensiveValue = useMemo(() => {
    return data.reduce((sum, item) => sum + item * 2, 0);
  }, [data]);

  return <div>{expensiveValue}</div>;
};
```

## Code Quality & Testing

### 1. ESLint Configuration
Your project comes with ESLint configured. Key rules to follow:
- Use `const` for immutable variables
- Prefer arrow functions for callbacks
- Use template literals over string concatenation
- Destructure props and state

### 2. Error Boundaries
```typescript
// src/components/ErrorBoundary.tsx
interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends React.Component<
  React.PropsWithChildren<{}>,
  ErrorBoundaryState
> {
  constructor(props: React.PropsWithChildren<{}>) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details>
            {this.state.error?.message}
          </details>
        </div>
      );
    }

    return this.props.children;
  }
}
```

### 3. Type Guards
```typescript
// src/utils/typeGuards.ts
export const isString = (value: unknown): value is string => {
  return typeof value === 'string';
};

export const isUser = (obj: unknown): obj is User => {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    'id' in obj &&
    'name' in obj &&
    'email' in obj
  );
};

// Usage
if (isUser(data)) {
  // TypeScript knows data is User here
  console.log(data.name);
}
```

## Development Workflow

### 1. Git Hooks Setup
```bash
# Install husky for git hooks
npm install --save-dev husky lint-staged

# Add to package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

### 2. Environment Variables
```typescript
// src/config/env.ts
interface EnvConfig {
  API_BASE_URL: string;
  NODE_ENV: 'development' | 'production' | 'test';
  VERSION: string;
}

export const env: EnvConfig = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  NODE_ENV: import.meta.env.NODE_ENV || 'development',
  VERSION: import.meta.env.VITE_APP_VERSION || '1.0.0',
};
```

### 3. Scripts in package.json
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc -b && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "type-check": "tsc --noEmit",
    "format": "prettier --write \"src/**/*.{ts,tsx}\"",
    "test": "vitest",
    "test:ui": "vitest --ui"
  }
}
```

## Recommended VS Code Extensions

1. **TypeScript Hero** - Auto import and organize imports
2. **ESLint** - Code linting
3. **Prettier** - Code formatting
4. **Auto Rename Tag** - Rename HTML/JSX tags
5. **Bracket Pair Colorizer** - Color matching brackets
6. **ES7+ React/Redux/React-Native snippets** - Code snippets
7. **PWA Tools** - PWA development tools

## Common Patterns to Avoid

### ❌ Bad Practices
```typescript
// Don't use any
const handleData = (data: any) => {
  return data.someProperty;
};

// Don't mutate props directly
const Component = ({ items }: { items: string[] }) => {
  items.push('new item'); // ❌ Mutating props
  return <ul>{items.map(item => <li key={item}>{item}</li>)}</ul>;
};

// Don't use function declarations in JSX
<button onClick={function() { console.log('clicked'); }}>
  Click me
</button>
```

### ✅ Good Practices
```typescript
// Use proper types
interface DataResponse {
  someProperty: string;
}

const handleData = (data: DataResponse) => {
  return data.someProperty;
};

// Don't mutate, create new arrays
const Component = ({ items }: { items: string[] }) => {
  const newItems = [...items, 'new item'];
  return <ul>{newItems.map(item => <li key={item}>{item}</li>)}</ul>;
};

// Use useCallback for event handlers
const handleClick = useCallback(() => {
  console.log('clicked');
}, []);

<button onClick={handleClick}>Click me</button>
```

---

This guide provides a foundation for building high-quality React applications with TypeScript, Vite, and PWA capabilities. Always prioritize type safety, performance, and maintainability in your code.