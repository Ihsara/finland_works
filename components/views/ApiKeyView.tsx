import React, { useState } from 'react';
import { Icons } from '../Icon';

interface ApiKeyViewProps {
  onSave: (key: string) => void;
}

export const ApiKeyView: React.FC<ApiKeyViewProps> = ({ onSave }) => {
  const [keyInput, setKeyInput] = useState('');

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-6 animate-in fade-in duration-500">
      <div className="p-4 bg-blue-100 rounded-full">
        <Icons.Key className="w-8 h-8 text-blue-600" />
      </div>
      <h1 className="text-2xl font-bold text-gray-900">Welcome to Finland Works!</h1>
      <p className="text-gray-700 max-w-md">
        To ensure your privacy, this app runs locally. Please provide your Google Gemini API Key to start. 
        This key is stored only on your device in <code className="bg-gray-100 px-1 rounded">data/.env</code>.
      </p>
      <input 
        type="password" 
        value={keyInput}
        onChange={(e) => setKeyInput(e.target.value)}
        placeholder="Enter Gemini API Key"
        className="w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button 
        onClick={() => onSave(keyInput)}
        disabled={keyInput.length < 5}
        className="w-full max-w-md bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50"
      >
        Save & Continue
      </button>
      <p className="text-xs text-gray-500">Don't have a key? Get a free one from Google AI Studio.</p>
    </div>
  );
};