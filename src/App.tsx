/**
 * Main App component for The Sopranos PWA
 */

import { AppRouter } from '@/components/AppRouter';
import { CookieConsent } from '@/components/CookieConsent';
import './App.css';

export default function App() {
  return (
    <>
      <AppRouter />
      <CookieConsent />
    </>
  );
}
