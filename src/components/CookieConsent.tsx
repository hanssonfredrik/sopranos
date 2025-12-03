/**
 * Cookie Consent Component
 * GDPR-compliant cookie consent banner for Google Analytics
 */

import { useState, useEffect } from 'react';

const CONSENT_KEY = 'sopranos-cookie-consent';

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already made a choice
    const consent = localStorage.getItem(CONSENT_KEY);
    if (!consent) {
      setShowBanner(true);
    } else if (consent === 'accepted') {
      // Enable Google Analytics if previously accepted
      enableAnalytics();
    }
  }, []);

  const enableAnalytics = () => {
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted'
      });
    }
  };

  const handleAccept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted');
    enableAnalytics();
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem(CONSENT_KEY, 'declined');
    if (typeof window.gtag !== 'undefined') {
      window.gtag('consent', 'update', {
        analytics_storage: 'denied'
      });
    }
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-surface shadow-lg border-t border-primary z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-primary mb-2">Cookie Notice</h3>
            <p className="text-secondary text-sm">
              We use cookies to improve your experience and analyze site traffic. 
              By clicking "Accept", you consent to our use of cookies for analytics purposes.{' '}
              <a 
                href="https://policies.google.com/technologies/cookies" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-accent underline"
              >
                Learn more
              </a>
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={handleDecline}
              className="px-6 py-2 rounded-lg font-semibold border border-primary text-primary hover:bg-hover transition-colors"
            >
              Decline
            </button>
            <button
              onClick={handleAccept}
              className="btn-primary px-6 py-2 rounded-lg font-semibold transition-colors"
            >
              Accept
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
