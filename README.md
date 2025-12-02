# React + TypeScript + Vite PWA Starter

A modern, production-ready web application template built with React, TypeScript, Vite, and PWA capabilities.

## 🚀 Features

- ⚡️ **Vite** - Fast build tool and development server
- ⚛️ **React 19** - Latest React with modern hooks
- 🔷 **TypeScript** - Strict typing with advanced configuration
- 📱 **PWA Ready** - Service worker, offline support, and installable
- 🎨 **Modern UI** - Responsive design with Tailwind CSS classes
- 🔧 **Best Practices** - Comprehensive guide included
- 📁 **Organized Structure** - Clean folder organization with path aliases
- 🧪 **Development Ready** - ESLint, Prettier, and type checking

## 📦 What's Included

### Core Technologies
- React 19.1.1 with TypeScript
- Vite 7.1.7 for fast development and building
- PWA plugin with Workbox for service worker generation

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # Basic UI components (Button, etc.)
│   ├── NetworkStatus.tsx
│   └── InstallPrompt.tsx
├── hooks/              # Custom React hooks
│   ├── useNetworkStatus.ts
│   └── useInstallPWA.ts
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Static assets
```

### Example Components
- **Button**: Fully typed button component with variants
- **NetworkStatus**: PWA network awareness component
- **InstallPrompt**: PWA installation prompt handler
- **Custom Hooks**: useNetworkStatus, useInstallPWA

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation
Dependencies are already installed. To reinstall:
```bash
npm install
```

### Development
Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Building for Production
Build the app for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 📱 PWA Features

This app is configured as a Progressive Web App with:

- **Service Worker**: Automatic caching and offline support
- **Web App Manifest**: Installable on mobile devices
- **Install Prompt**: Custom installation UI
- **Network Status**: Online/offline detection
- **Caching Strategy**: Intelligent caching for assets and API calls

### Installing the PWA
1. Open the app in a supported browser (Chrome, Firefox, Safari, Edge)
2. Look for the install prompt or use the "Install" button in the app
3. Follow the browser's installation process

## 🔧 Configuration

### TypeScript
The project uses strict TypeScript configuration with:
- `strict: true` - Strict type checking
- `exactOptionalPropertyTypes: true` - Exact optional property types
- `noImplicitReturns: true` - No implicit returns
- Path aliases configured (`@/*` for `src/*`)

### PWA Configuration
PWA settings can be modified in `vite.config.ts`:
- Manifest settings (name, icons, colors)
- Service worker configuration
- Caching strategies

### ESLint
Pre-configured with React and TypeScript rules:
```bash
npm run lint          # Check for issues
npm run lint:fix      # Auto-fix issues (if script exists)
```

## 📖 Documentation

### Best Practices Guide
See `BEST_PRACTICES.md` for comprehensive documentation covering:
- TypeScript best practices
- React patterns and hooks
- PWA implementation
- Performance optimization
- Code quality guidelines

### Component Documentation
Each component includes:
- TypeScript interface definitions
- JSDoc comments
- Usage examples
- Proper prop typing

## 🧪 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🔄 Project Workflow

1. **Development**: Use `npm run dev` for hot reloading
2. **Type Checking**: TypeScript is checked during build
3. **Linting**: Use `npm run lint` to maintain code quality
4. **Building**: Use `npm run build` for production builds
5. **Testing PWA**: Use `npm run preview` to test PWA features locally

## 📁 Folder Conventions

- **Components**: PascalCase (`UserCard.tsx`)
- **Hooks**: camelCase with 'use' prefix (`useAuth.ts`)
- **Types**: PascalCase (`User.ts`, `ApiResponse.ts`)
- **Utils**: camelCase (`formatDate.ts`)
- **Constants**: UPPER_SNAKE_CASE (`API_ENDPOINTS.ts`)

## 🚀 Deployment

This app can be deployed to any static hosting service:

### Vercel
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Upload dist/ folder to Netlify
```

### GitHub Pages
1. Update `base` in `vite.config.ts` to your repository name
2. Build and deploy the `dist/` folder

## 🤝 Contributing

1. Follow the TypeScript and ESLint configurations
2. Add proper type definitions for new features
3. Update documentation for new components
4. Test PWA functionality across different devices

## 📄 License

This project is provided as-is for educational and development purposes.

## 🔗 Useful Links

- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Vite Guide](https://vite.dev/guide/)
- [PWA Documentation](https://web.dev/progressive-web-apps/)
- [Workbox](https://developers.google.com/web/tools/workbox)

## Original Vite Template Notes

This template was built on top of the official Vite React TypeScript template and enhanced with PWA capabilities and best practices.

### React Compiler
The React Compiler is not enabled due to performance considerations during development. To add it, see [React Compiler documentation](https://react.dev/learn/react-compiler/installation).
