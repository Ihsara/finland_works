
import React from 'react';
import { LayoutPreference } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
  layoutMode?: LayoutPreference;
}

const Layout: React.FC<LayoutProps> = ({ children, onTouchStart, onTouchEnd, layoutMode = 'windowed' }) => {
  return (
    <div className={`fixed inset-0 bg-gray-100 dark:bg-black transition-colors duration-300 ${layoutMode === 'windowed' ? 'md:flex md:items-center md:justify-center' : ''}`}>
      {/* 
        App Container Optimization:
        1. h-[100dvh]: Uses dynamic viewport height to fix mobile browser address bar jumping issues.
        2. pt-[env(safe-area-inset-top)]: Adds padding for notches (iPhone).
        3. pb-[env(safe-area-inset-bottom)]: Adds padding for home indicator.
        
        Layout Modes:
        - 'windowed' (Default): md:h-[90vh] floating card on desktop. Simulates mobile app feel.
        - 'fullscreen': Full width/height on all devices. Standard desktop app feel.
      */}
      <div 
        className={`
          w-full h-[100dvh] bg-white dark:bg-gray-950 flex flex-col overflow-hidden relative 
          pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] md:pt-0 md:pb-0 
          transition-all duration-300 ease-in-out
          ${layoutMode === 'windowed' ? 'md:h-[90vh] md:max-w-6xl md:rounded-3xl md:shadow-2xl md:border md:border-gray-200 dark:md:border-gray-800' : 'h-full'}
        `}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
