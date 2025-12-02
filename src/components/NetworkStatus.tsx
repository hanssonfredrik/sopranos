import React from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';

/**
 * NetworkStatus component demonstrating PWA network awareness
 * Shows current connection status and quality
 */
export const NetworkStatus: React.FC = () => {
  const { isOnline, effectiveType, downlink } = useNetworkStatus();

  if (isOnline) {
    return (
      <div className="flex items-center space-x-2 text-sm text-gray-600">
        <div className="h-2 w-2 rounded-full bg-green-500"></div>
        <span>Online</span>
        {effectiveType && (
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            {effectiveType.toUpperCase()}
          </span>
        )}
        {downlink && (
          <span className="text-xs text-gray-500">
            {downlink.toFixed(1)} Mbps
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2 text-sm text-red-600">
      <div className="h-2 w-2 rounded-full bg-red-500"></div>
      <span>Offline</span>
    </div>
  );
};