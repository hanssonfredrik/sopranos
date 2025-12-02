# 🎭 The Sopranos Website

A comprehensive, HBO Max-inspired website for The Sopranos TV series, built with React, TypeScript, Vite, and PWA capabilities.

## 🌟 Features

### 🎬 Complete Series Experience
- **All Seasons & Episodes**: Browse through all 6 seasons and 86 episodes
- **Episode Details**: Detailed information for each episode including ratings, descriptions, and air dates
- **Routing Structure**: Clean URLs like `/seasons/season1/episode1`

### 🍝 Italian Recipes
- **Authentic Recipes**: Italian recipes featured throughout the series
- **Translated Content**: Swedish content automatically translated to English
- **Recipe Categories**: Organized by pasta, main courses, and desserts

### 🏆 Top Episodes Ranking
- **Fan Rankings**: Highest-rated episodes by critics and fans
- **Detailed Ratings**: Episode scores and descriptions
- **Interactive List**: Click through to episode details

### 🎨 HBO Max-Inspired Design
- **Dark Theme**: Black background with purple/gold accents
- **Responsive Layout**: Works on desktop and mobile
- **Modern UI**: Clean, professional interface
- **Smooth Animations**: Hover effects and transitions

### ⚡ Technical Features
- **React 19** with TypeScript for type safety
- **React Router** for navigation
- **PWA Ready** with offline support
- **Vite** for fast development and building
- **Mobile Responsive** design

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm, yarn, or pnpm

### Installation & Development
1. **Install dependencies** (already installed):
   ```bash
   npm install
   ```

2. **Add XML Data**:
   - Copy your `Sopranos.xml` content to `src/data/sopranos.xml`
   - The parser will automatically translate Swedish to English

3. **Start development server**:
   ```bash
   npm run dev
   ```
   App runs at `http://localhost:5179`

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── AppRouter.tsx      # Main routing configuration
│   ├── Layout.tsx         # HBO Max-inspired layout
│   ├── ui/               # Reusable UI components
│   ├── NetworkStatus.tsx # PWA network awareness
│   └── InstallPrompt.tsx # PWA installation
├── pages/
│   ├── HomePage.tsx      # Series overview
│   ├── SeasonsPage.tsx   # All seasons grid
│   ├── SeasonDetailPage.tsx # Episodes in season
│   ├── EpisodeDetailPage.tsx # Individual episode
│   ├── RecipesPage.tsx   # Italian recipes
│   └── TopListPage.tsx   # Top-rated episodes
├── data/
│   ├── sopranos.ts       # TypeScript data types
│   └── sopranos.xml      # XML data (to be populated)
├── hooks/
│   ├── useNetworkStatus.ts # Network monitoring
│   └── useInstallPWA.ts   # PWA installation
└── types/              # TypeScript definitions
```

## 🛣️ Routing Structure

- `/` - Home page with series overview
- `/seasons` - All seasons overview
- `/seasons/:seasonNumber` - Episodes in specific season
- `/seasons/:seasonNumber/:episodeNumber` - Individual episode details
- `/recipes` - Italian recipes from the show
- `/toplist` - Top-rated episodes ranking

## 📋 Data Integration

### XML Data Structure Expected
The `Sopranos.xml` file should contain:

```xml
<sopranos>
  <episodes>
    <season number="1">
      <episode number="1" title="..." description="..." airdate="..." />
      <!-- More episodes -->
    </season>
    <!-- More seasons -->
  </episodes>
  
  <recipes>
    <recipe title="..." description="..." category="...">
      <ingredients>
        <ingredient>...</ingredient>
      </ingredients>
      <instructions>
        <step>...</step>
      </instructions>
    </recipe>
    <!-- More recipes -->
  </recipes>
  
  <toplist>
    <episode rank="1" season="..." episode="..." rating="..." title="..." />
    <!-- More top episodes -->
  </toplist>
</sopranos>
```

### Translation Notes
- Swedish content will be automatically translated to English
- Recipe ingredients and instructions will be localized
- Episode descriptions will maintain authenticity

## 🎨 Design System

### Color Palette (HBO Max Inspired)
- **Primary Background**: `#000000` (Pure black)
- **Secondary Background**: `#111111` (Dark gray)
- **Card Background**: `#222222` (Medium gray)
- **Primary Accent**: `#9d4edd` (Purple)
- **Secondary Accent**: `#c77dff` (Light purple)
- **Gold Accent**: `#ffd60a` (Gold for highlights)

### Typography
- **Font**: Inter (Google Fonts)
- **Headers**: Bold weights (700-900)
- **Body**: Regular weight (400-500)

### Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔧 Configuration

### Custom Port
The development server runs on port `5179` as configured in `vite.config.ts`.

### PWA Settings
- **Installable**: Custom install prompt
- **Offline Support**: Service worker caching
- **Network Awareness**: Online/offline detection

## 📱 PWA Features

### Installation
1. Open app in supported browser
2. Look for install prompt or use "Install" button
3. App becomes installable on desktop/mobile

### Offline Support
- Cached assets for offline viewing
- Network status monitoring
- Progressive enhancement

## 🎯 Next Steps

1. **Add XML Data**: Copy your Sopranos.xml content to `src/data/sopranos.xml`
2. **Test Functionality**: Navigate through seasons and episodes
3. **Customize Branding**: Update colors, fonts, or layout as needed
4. **Deploy**: Build and deploy to your hosting platform

## 🔗 Links & Resources

- **Development Server**: `http://localhost:5179`
- **Best Practices**: See `BEST_PRACTICES.md`
- **HBO Max Design**: Inspired by streaming platform aesthetics
- **The Sopranos**: Original HBO series (1999-2007)

## 📄 License

This is a fan website created for educational purposes. The Sopranos is owned by HBO.

---

**Ready to explore the world of Tony Soprano! 🎭**

Add your XML data and start browsing through the complete series experience.