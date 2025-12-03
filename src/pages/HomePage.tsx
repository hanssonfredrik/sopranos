/**
 * Home Page Component
 * Modern welcome experience with hero section and feature overview
 */

import { Link } from 'react-router-dom';

/**
 * Home page with hero section, feature overview, and call-to-action
 */
export function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-16">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary mb-6 display-font">
          The Sopranos
        </h1>
        <p className="text-lg md:text-xl text-secondary max-w-3xl mx-auto mb-8 leading-relaxed">
          Explore the groundbreaking HBO series that redefined television drama. 
          Dive into six seasons of compelling storytelling, memorable characters, 
          and the world of Tony Soprano.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/seasons"
            className="btn-primary px-8 py-3 rounded-lg font-semibold transition-colors hover:text-white"
          >
            Browse Seasons
          </Link>
          <Link
            to="/toplist"
            className="px-8 py-3 rounded-lg font-semibold border border-primary text-primary hover:bg-primary hover:!text-white transition-colors"
          >
            Top Episodes
          </Link>
        </div>
      </section>

      {/* Feature Overview Cards */}
      <section className="grid md:grid-cols-3 gap-8">
        {/* Seasons & Episodes */}
        <Link
          to="/seasons"
          className="group bg-surface rounded-lg shadow-md hover:shadow-lg p-6 transition-all hover:-translate-y-1"
        >
          <div className="text-4xl mb-4">📺</div>
          <h2 className="text-xl font-semibold text-primary mb-3 group-hover:text-primary-light transition-colors">
            Seasons & Episodes
          </h2>
          <p className="text-secondary">
            Browse all 6 seasons and 86 episodes. Explore detailed episode information, 
            music tracks, and memorable quotes.
          </p>
        </Link>

        {/* Recipes */}
        <Link
          to="/recipes"
          className="group bg-surface rounded-lg shadow-md hover:shadow-lg p-6 transition-all hover:-translate-y-1"
        >
          <div className="text-4xl mb-4">🍝</div>
          <h2 className="text-xl font-semibold text-primary mb-3 group-hover:text-primary-light transition-colors">
            Italian Recipes
          </h2>
          <p className="text-secondary">
            Discover authentic Italian recipes featured in the series. 
            From Sunday gravy to ziti, cook like the Sopranos family.
          </p>
        </Link>

        {/* Top Lists */}
        <Link
          to="/toplist"
          className="group bg-surface rounded-lg shadow-md hover:shadow-lg p-6 transition-all hover:-translate-y-1"
        >
          <div className="text-4xl mb-4">🏆</div>
          <h2 className="text-xl font-semibold text-primary mb-3 group-hover:text-primary-light transition-colors">
            Top Lists
          </h2>
          <p className="text-secondary">
            Curated rankings of the best episodes, most iconic quotes, 
            and unforgettable moments from the series.
          </p>
        </Link>
      </section>

      {/* Series Stats */}
      <section className="bg-surface rounded-lg shadow-md p-8">
        {/* <h2 className="text-2xl font-semibold text-primary mb-6 text-center">
          Series Information
        </h2> */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">6</div>
            <div className="text-sm text-secondary">Seasons</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">86</div>
            <div className="text-sm text-secondary">Episodes</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">1999-2007</div>
            <div className="text-sm text-secondary">Original Run</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">21</div>
            <div className="text-sm text-secondary">Emmy Awards</div>
          </div>
        </div>
      </section>
    </div>
  );
}