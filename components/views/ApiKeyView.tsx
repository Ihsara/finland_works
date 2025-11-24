
import React, { useState } from 'react';
import { Icons } from '../Icon';

interface ApiKeyViewProps {
  onSave: (key: string) => void;
}

export const ApiKeyView: React.FC<ApiKeyViewProps> = ({ onSave }) => {
  const [keyInput, setKeyInput] = useState('');

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6 animate-in fade-in duration-500 bg-white dark:bg-gray-950">
      <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-full">
        <Icons.Key className="w-8 h-8 text-blue-600 dark:text-blue-400" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome to Finland Works!</h1>
      <p className="text-gray-700 dark:text-gray-300 max-w-md">
        To ensure your privacy, this app runs locally. Please provide your Google Gemini API Key to start. 
        This key is stored only on your device in <code className="bg-gray-100 dark:bg-gray-800 px-1 rounded">data/.env</code>.
      </p>
      <input 
        type="password" 
        value={keyInput}
        onChange={(e) => setKeyInput(e.target.value)}
        placeholder="Enter Gemini API Key"
        className="w-full max-w-md px-4 py-3 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button 
        onClick={() => onSave(keyInput)}
        disabled={keyInput.length < 5}
        className="w-full max-w-md bg-black dark:bg-white text-white dark:text-black py-3 rounded-lg font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition disabled:opacity-50"
      >
        Save & Continue
      </button>
      <p className="text-xs text-gray-500 dark:text-gray-400">Don't have a key? Get a free one from Google AI Studio.</p>
    </div>
  );
};
