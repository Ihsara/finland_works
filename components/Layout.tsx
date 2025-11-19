import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="fixed inset-0 bg-gray-100 md:flex md:items-center md:justify-center font-sans">
      {/* 
        App Container 
        Mobile: Full width/height, no radius.
        Desktop: Fixed max width, height, radius, shadow.
      */}
      <div className="w-full h-full md:h-[90vh] md:max-w-6xl bg-white md:rounded-3xl md:shadow-2xl md:border md:border-gray-200 flex flex-col overflow-hidden relative">
        {children}
      </div>

      {/* Desktop Footer Tagline */}
      <div className="hidden md:block absolute bottom-4 text-[10px] text-gray-400 font-medium tracking-widest uppercase">
        Finland Works! • Local • AI
      </div>
    </div>
  );
};

export default Layout;