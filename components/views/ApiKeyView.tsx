
import React, { useState, useEffect } from 'react';
import { Icons } from '../Icon';
import { useLanguage } from '../../contexts/LanguageContext';

interface ApiKeyViewProps {
  onSave: (key: string) => void;
}

// Reusing the CitySlideshow logic here for consistency
const CitySlideshow = () => {
  const [index, setIndex] = useState(0);
  const cities = ["Finland", "Vantaa"];
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((prev) => (prev + 1) % cities.length);
        setVisible(true);
      }, 500); 
    }, 4000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-grid grid-cols-1 justify-items-end">
      {/* Invisible spacer to reserve width of the longest city */}
      <span className="col-start-1 row-start-1 opacity-0 pointer-events-none select-none" aria-hidden="true">Finland</span>
      
      {/* Animated visible text */}
      <span className={`
        col-start-1 row-start-1
        inline-block transition-all duration-500 ease-in-out transform
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}
        bg-clip-text text-transparent bg-gradient-to-r 
        ${index === 0 
          ? 'from-blue-600 to-indigo-600 dark:from-emerald-200 dark:via-teal-200 dark:to-cyan-200' 
          : 'from-fuchsia-600 to-pink-600 dark:from-fuchsia-300 dark:to-pink-300' 
        }
      `}>
        {cities[index]}
      </span>
    </span>
  );
};

export const ApiKeyView: React.FC<ApiKeyViewProps> = ({ onSave }) => {
  const [keyInput, setKeyInput] = useState('');
  const { headingFont } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-8 animate-in fade-in duration-500 bg-gray-50 dark:bg-[#0b1021]">
      <div className="relative">
          <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-20 rounded-full animate-pulse"></div>
          <div className="p-6 bg-white dark:bg-white/10 rounded-3xl shadow-xl relative z-10 border border-gray-100 dark:border-white/10">
            <Icons.Key className="w-12 h-12 text-blue-600 dark:text-blue-400" />
          </div>
      </div>
      
      <div>
          <h1 className={`text-3xl font-black text-gray-900 dark:text-white mb-2 tracking-tight ${headingFont}`}>
            <CitySlideshow />
            <span> Works!</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto leading-relaxed">
            To ensure your privacy, this app runs locally. Please provide your Google Gemini API Key to start. 
            This key is stored only on your device.
          </p>
      </div>

      <div className="w-full max-w-md space-y-4">
          <input 
            type="password" 
            value={keyInput}
            onChange={(e) => setKeyInput(e.target.value)}
            placeholder="Enter Gemini API Key"
            className="w-full px-5 py-4 border border-gray-300 dark:border-white/10 bg-white dark:bg-[#151b2e] text-gray-900 dark:text-white rounded-2xl focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm transition-all"
          />
          <button 
            onClick={() => onSave(keyInput)}
            disabled={keyInput.length < 5}
            className="w-full bg-black dark:bg-white text-white dark:text-black py-4 rounded-2xl font-bold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50 shadow-lg min-h-[56px]"
          >
            Save & Continue
          </button>
      </div>
      
      <p className="text-xs text-gray-400 dark:text-gray-600 uppercase tracking-wider font-bold">Local-First • Privacy Focused</p>
    </div>
  );
};
