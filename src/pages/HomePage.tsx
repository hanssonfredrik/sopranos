import React from 'react';
import { Link } from 'react-router-dom';
import { seriesInfo, awards } from '@/data/sopranos';

/**
 * Home page component with series overview
 */
export const HomePage: React.FC = () => {
  return (
    <div className="bg-primary">
      {/* Hero Section */}
      <section className="relative bg-secondary">
        <div className="container mx-auto py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-black text-accent-gold mb-6">
                THE SOPRANOS
              </h1>
              <p className="text-lg text-secondary mb-8 leading-relaxed">
                {seriesInfo.description}
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/seasons"
                  className="bg-accent-primary hover:bg-accent-secondary text-primary font-semibold px-8 py-3 rounded transition-colors"
                >
                  Watch Episodes
                </Link>
                <Link
                  to="/toplist"
                  className="border border-accent-primary text-accent-primary hover:bg-accent-primary hover:text-primary font-semibold px-8 py-3 rounded transition-colors"
                >
                  Top Episodes
                </Link>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-card p-8 rounded shadow-lg">
                <h3 className="text-2xl font-bold text-accent-gold mb-4">
                  Series Information
                </h3>
                <div className="space-y-3 text-left">
                  <div className="flex justify-between">
                    <span className="text-muted">Created by:</span>
                    <span className="text-secondary">David Chase</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Years:</span>
                    <span className="text-secondary">{seriesInfo.originalRun}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Seasons:</span>
                    <span className="text-secondary">{seriesInfo.seasons}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Episodes:</span>
                    <span className="text-secondary">{seriesInfo.totalEpisodes}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Network:</span>
                    <span className="text-secondary">{seriesInfo.network}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Genre and Cast Section */}
      <section className="py-16">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Genres */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Genre
              </h2>
              <div className="flex flex-wrap gap-3">
                {["Crime Drama", "Black Comedy", "Psychological Drama"].map((genre, index) => (
                  <span
                    key={index}
                    className="bg-tertiary text-secondary px-4 py-2 rounded font-medium"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Cast */}
            <div>
              <h2 className="text-3xl font-bold text-primary mb-6">
                Main Cast
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  "James Gandolfini",
                  "Lorraine Bracco", 
                  "Edie Falco",
                  "Michael Imperioli",
                  "Dominic Chianese",
                  "Steven Van Zandt",
                  "Tony Sirico",
                  "Robert Iler"
                ].map((actor, index) => (
                  <div key={index} className="text-secondary">
                    {actor}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="bg-secondary py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-primary mb-12">
            Explore The Sopranos Universe
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Seasons */}
            <Link to="/seasons" className="group">
              <div className="bg-card hover:bg-hover p-6 rounded shadow transition-colors">
                <div className="text-accent-gold text-4xl mb-4">📺</div>
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent-secondary transition-colors">
                  All Seasons
                </h3>
                <p className="text-secondary">
                  Dive into all 6 seasons and 86 episodes of this groundbreaking series.
                </p>
              </div>
            </Link>

            {/* Recipes */}
            <Link to="/recipes" className="group">
              <div className="bg-card hover:bg-hover p-6 rounded shadow transition-colors">
                <div className="text-accent-gold text-4xl mb-4">🍝</div>
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent-secondary transition-colors">
                  Italian Recipes
                </h3>
                <p className="text-secondary">
                  Discover authentic Italian recipes featured throughout the series.
                </p>
              </div>
            </Link>

            {/* Top List */}
            <Link to="/toplist" className="group">
              <div className="bg-card hover:bg-hover p-6 rounded shadow transition-colors">
                <div className="text-accent-gold text-4xl mb-4">🏆</div>
                <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-accent-secondary transition-colors">
                  Top Episodes
                </h3>
                <p className="text-secondary">
                  The highest-rated and most memorable episodes ranked by fans.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Awards and Recognition */}
      <section className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold text-primary mb-12">
            Awards & Recognition
          </h2>
          
          <div className="grid md:grid-cols-4 gap-8">
            {awards.map((award, index) => (
              <div key={index} className="bg-card p-6 rounded">
                <div className="text-accent-gold text-3xl font-bold mb-2">{award.wins}</div>
                <div className="text-secondary">{award.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};