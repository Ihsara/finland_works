
import React from 'react';
import { Icons } from '../Icon';
import { LanguageSelector } from '../LanguageSelector';
import { UserProfile } from '../../types';
import { useLanguage } from '../../contexts/LanguageContext';

interface ProfileEditViewProps {
  profile: UserProfile | null;
  yamlInput: string;
  onYamlChange: (val: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onLoadDemo: () => void;
}

export const ProfileEditView: React.FC<ProfileEditViewProps> = ({
  profile,
  yamlInput,
  onYamlChange,
  onSave,
  onCancel,
  onLoadDemo
}) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500">
      <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-white z-50">
        <div className="flex items-center gap-3">
          <h2 className="text-lg md:text-xl font-bold flex items-center gap-2 text-gray-900">
            <Icons.Edit3 className="w-5 h-5" /> {t('dash_edit_profile')} (YAML)
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <LanguageSelector />
          <button onClick={onCancel} className="text-gray-600 hover:text-gray-800">
            <Icons.X className="w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="flex-1 p-4 md:p-6 overflow-hidden flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <p className="text-sm text-gray-600">
            Update details for: <span className="font-bold text-black">{profile?.name}</span>
          </p>
          <button onClick={onLoadDemo} className="text-xs text-blue-700 hover:underline flex items-center gap-1">
            <Icons.User className="w-3 h-3" /> Load Demo
          </button>
        </div>
        <textarea 
          className="flex-1 w-full font-mono text-sm p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-black focus:outline-none resize-none shadow-inner text-gray-900"
          value={yamlInput}
          onChange={(e) => onYamlChange(e.target.value)}
          spellCheck={false}
          placeholder="name: ..."
        />
      </div>
      <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50">
        <button 
          onClick={onSave}
          className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 flex items-center justify-center gap-2 shadow-md transition transform active:scale-[0.98]"
        >
          <Icons.Save className="w-4 h-4" /> Save Changes
        </button>
      </div>
    </div>
  );
};
