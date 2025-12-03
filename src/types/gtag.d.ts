/**
 * Google Analytics gtag.js type definitions
 */

interface Window {
  dataLayer: any[];
  gtag?: (
    command: 'config' | 'event' | 'js' | 'set' | 'consent',
    targetId: string | Date | 'default' | 'update',
    config?: any
  ) => void;
}
