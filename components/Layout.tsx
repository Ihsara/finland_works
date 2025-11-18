import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-8">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden min-h-[600px] md:min-h-[700px] flex flex-col border border-gray-100">
        {children}
      </div>
      <div className="mt-4 text-xs text-gray-400">
        Finland Works! • Local Data Storage • Gemini AI
      </div>
    </div>
  );
};

export default Layout;