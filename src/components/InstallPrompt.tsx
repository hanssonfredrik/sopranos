import React from 'react';
import { Button } from '@/components/ui/Button';
import { useInstallPWA } from '@/hooks/useInstallPWA';

/**
 * InstallPrompt component for PWA installation
 * Demonstrates proper PWA installation handling with TypeScript
 */
export const InstallPrompt: React.FC = () => {
  const { isInstallable, isInstalled, installPWA } = useInstallPWA();

  const handleInstall = async () => {
    try {
      await installPWA();
    } catch (error) {
      console.error('Failed to install PWA:', error);
    }
  };

  if (isInstalled) {
    return (
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <div className="flex items-center">
          <svg 
            className="h-5 w-5 text-green-400" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
              clipRule="evenodd" 
            />
          </svg>
          <p className="ml-3 text-sm font-medium text-green-800">
            App installed successfully!
          </p>
        </div>
      </div>
    );
  }

  if (!isInstallable) {
    return null;
  }

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
      <div className="flex items-center justify-between">
        <div className="flex">
          <svg 
            className="h-5 w-5 text-blue-400" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20" 
            fill="currentColor"
          >
            <path 
              fillRule="evenodd" 
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" 
              clipRule="evenodd" 
            />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">
              Install App
            </h3>
            <p className="mt-1 text-sm text-blue-700">
              Install this app on your device for a better experience.
            </p>
          </div>
        </div>
        <div className="ml-4">
          <Button
            variant="primary"
            size="sm"
            onClick={handleInstall}
          >
            Install
          </Button>
        </div>
      </div>
    </div>
  );
};