import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { HomePage } from '@/pages/HomePage';
import { SeasonsPage } from '@/pages/SeasonsPage';
import { SeasonDetailPage } from '@/pages/SeasonDetailPage';
import { EpisodeDetailPage } from '@/pages/EpisodeDetailPage';
import { RecipesPage } from '@/pages/RecipesPage';
import { TopListPage } from '@/pages/TopListPage';

/**
 * Main App Router with all Sopranos routes
 */
export const AppRouter: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Main page */}
          <Route path="/" element={<HomePage />} />
          
          {/* Seasons routes */}
          <Route path="/seasons" element={<SeasonsPage />} />
          <Route path="/seasons/:seasonNumber" element={<SeasonDetailPage />} />
          <Route path="/seasons/:seasonNumber/:episodeNumber" element={<EpisodeDetailPage />} />
          
          {/* Recipes page */}
          <Route path="/recipes" element={<RecipesPage />} />
          
          {/* Top list page */}
          <Route path="/toplist" element={<TopListPage />} />
        </Routes>
      </Layout>
    </Router>
  );
};