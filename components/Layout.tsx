
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  onTouchStart?: (e: React.TouchEvent) => void;
  onTouchEnd?: (e: React.TouchEvent) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onTouchStart, onTouchEnd }) => {
  return (
    <div className="fixed inset-0 bg-gray-100 md:flex md:items-center md:justify-center font-sans">
      {/* 
        App Container Optimization:
        1. h-[100dvh]: Uses dynamic viewport height to fix mobile browser address bar jumping issues.
        2. pt-[env(safe-area-inset-top)]: Adds padding for notches (iPhone).
        3. pb-[env(safe-area-inset-bottom)]: Adds padding for home indicator.
        4. md:h-[90vh]: On desktop, revert to 90% height floating window.
      */}
      <div 
        className="w-full h-[100dvh] md:h-[90vh] md:max-w-6xl bg-white md:rounded-3xl md:shadow-2xl md:border md:border-gray-200 flex flex-col overflow-hidden relative pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)] md:pt-0 md:pb-0 transition-all duration-300 ease-in-out"
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

export default Layout;
