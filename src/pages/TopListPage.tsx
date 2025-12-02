import React from 'react';
import { topListCategories } from '@/data/sopranos';

/**
 * Top list page showing the highest-rated episodes and memorable content
 */
export const TopListPage: React.FC = () => {
  return (
    <div className="bg-primary py-16">
      <div className="container mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          The Sopranos Top Lists
        </h1>
        
        <div className="text-center mb-12">
          <p className="text-lg text-secondary max-w-2xl mx-auto">
            The most acclaimed episodes, memorable characters, and iconic moments 
            from the greatest television series ever made.
          </p>
        </div>
        
        <div className="space-y-12">
          {topListCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-card p-8 rounded shadow">
              <h2 className="text-2xl font-bold text-accent-gold mb-8 text-center">
                {category.name}
              </h2>
              
              <div className="space-y-4">
                {category.items.map((item) => (
                  <div key={item.rank} className="bg-secondary p-6 rounded flex items-start">
                    <div className="bg-accent-primary text-primary font-bold text-xl w-12 h-12 rounded flex items-center justify-center mr-6 flex-shrink-0">
                      {item.rank}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-primary mb-2 text-lg">
                        {item.title}
                      </h3>
                      <p className="text-secondary text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 bg-card p-8 rounded shadow">
          <h2 className="text-2xl font-bold text-primary mb-6 text-center">
            Why These Rankings Matter
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl mb-3">🎭</div>
              <h4 className="font-bold text-accent-gold mb-2">Cultural Impact</h4>
              <p className="text-muted text-sm">These episodes and characters shaped modern television and popular culture</p>
            </div>
            <div>
              <div className="text-3xl mb-3">🏆</div>
              <h4 className="font-bold text-accent-gold mb-2">Critical Acclaim</h4>
              <p className="text-muted text-sm">Recognized by critics, awards ceremonies, and industry professionals worldwide</p>
            </div>
            <div>
              <div className="text-3xl mb-3">👥</div>
              <h4 className="font-bold text-accent-gold mb-2">Fan Favorites</h4>
              <p className="text-muted text-sm">Beloved by audiences and consistently ranked among the best television moments</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};