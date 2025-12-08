
import React, { useState, useRef, useEffect } from 'react';
import { Icons } from '../../Icon';
import { useLanguage } from '../../../contexts/LanguageContext';
import { COUNTRIES, isEUCountry } from '../../../data/countries';
import { WizardStepProps } from '../types';

interface RegionGridProps {
  originCountry: string;
  isEuropeSelected: boolean;
  onSelect: (id: string, value: string) => void;
  t: any;
}

const RegionGrid: React.FC<RegionGridProps> = ({ originCountry, isEuropeSelected, onSelect, t }) => {
    const regions = [
        { id: 'europe', value: 'Europe', label: t('wizard_region_europe'), icon: Icons.Landmark, color: 'text-blue-600 bg-blue-50 border-blue-200' },
        { id: 'americas', value: 'Americas', label: t('wizard_region_americas'), icon: Icons.Map, color: 'text-green-600 bg-green-50 border-green-200' },
        { id: 'asia', value: 'Asia', label: t('wizard_region_asia'), icon: Icons.Mountain, color: 'text-red-600 bg-red-50 border-red-200' },
        { id: 'africa', value: 'Africa', label: t('wizard_region_africa'), icon: Icons.Sun, color: 'text-orange-600 bg-orange-50 border-orange-200' },
        { id: 'oceania', value: 'Oceania', label: t('wizard_region_oceania'), icon: Icons.Waves, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
        { id: 'middle_east', value: 'Middle East', label: t('wizard_region_middle_east'), icon: Icons.Palmtree, color: 'text-purple-600 bg-purple-50 border-purple-200' }, 
    ];

    return (
           <div className="grid grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
               {regions.map(r => {
                   const isSelected = originCountry.includes(r.value) || (r.id === 'europe' && isEuropeSelected);
                   return (
                      <button
                          key={r.id}
                          onClick={() => onSelect(r.id, r.value)}
                          className={`
                              flex flex-col items-center justify-start p-6 rounded-xl border-2 transition-all duration-200 gap-3
                              ${isSelected 
                                  ? 'border-black dark:border-white bg-gray-50 dark:bg-gray-800 shadow-md ring-1 ring-black dark:ring-white' 
                                  : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800 hover:-translate-y-1'
                              }
                          `}
                      >
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${r.color}`}>
                              <r.icon className="w-6 h-6" />
                          </div>
                          <span className={`font-bold text-sm text-center ${isSelected ? 'text-black dark:text-white' : 'text-gray-700 dark:text-gray-300'}`}>{r.label}</span>
                      </button>
                   );
               })}
           </div>
    );
};

const StepOrigin: React.FC<WizardStepProps> = ({ formData, handleChange, handleNext, activeSection = 'origin', setActiveSection }) => {
  const { t } = useLanguage();
  
  // Default to 'region', unless we have a specific country string (that isn't a Region string)
  const [originInputMode, setOriginInputMode] = useState<'search' | 'region'>(() => {
      if (formData.originCountry && !formData.originCountry.startsWith('Region:')) {
          return 'search';
      }
      return 'region';
  });

  const [showCountryList, setShowCountryList] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const countryWrapperRef = useRef<HTMLDivElement>(null);

  // Initialize state based on incoming data
  const [isEuropeSelected, setIsEuropeSelected] = useState(
      formData.originCountry?.includes('Europe') || isEUCountry(formData.originCountry || '')
  );

  const filteredCountries = formData.originCountry 
    ? COUNTRIES
        .filter(c => c.toLowerCase().includes(formData.originCountry.toLowerCase()))
        .sort((a, b) => {
            const query = formData.originCountry.toLowerCase();
            const aStarts = a.toLowerCase().startsWith(query);
            const bStarts = b.toLowerCase().startsWith(query);
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            return a.localeCompare(b);
        })
    : COUNTRIES;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryWrapperRef.current && !countryWrapperRef.current.contains(event.target as Node)) {
        setShowCountryList(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleRegionSelect = (regionKey: string, regionName: string) => {
      if (regionKey === 'europe') {
          setIsEuropeSelected(true); 
          setActiveSection && setActiveSection('eu'); 
          handleChange('originCountry', `Region: ${regionName}`);
      } else {
          setIsEuropeSelected(false);
          handleChange('originCountry', `Region: ${regionName}`);
          
          setTimeout(() => {
             handleNext();
          }, 350);
      }
  };

  const handleCountrySelect = (country: string) => {
    handleChange('originCountry', country);
    setShowCountryList(false);
    setTimeout(() => {
        handleNext();
    }, 350);
  };

  const handleEuropeCitizenSelect = (isCitizen: boolean) => {
      handleChange('originCountry', isCitizen ? 'Region: Europe (EU/EEA)' : 'Region: Europe (Non-EU)');
      setTimeout(() => {
         handleNext();
      }, 350);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showCountryList) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev + 1) % filteredCountries.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev - 1 + filteredCountries.length) % filteredCountries.length);
        break;
      case 'Enter':
        e.preventDefault();
        if (filteredCountries[highlightedIndex]) {
          handleCountrySelect(filteredCountries[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowCountryList(false);
        break;
    }
  };

  const getOriginDisplay = () => {
      const val = formData.originCountry;
      if (!val) return t('wizard_step4_desc');
      if (val.startsWith('Region: ')) {
          const region = val.replace('Region: ', '');
          if (region.includes('Europe')) {
              const base = t('wizard_region_europe');
              if (region.includes('EU/EEA')) return `${base} (EU/EEA)`;
              if (region.includes('Non-EU')) return `${base} (Non-EU)`;
              return base;
          }
          const map: Record<string, string> = {
              'Americas': t('wizard_region_americas'),
              'Asia': t('wizard_region_asia'),
              'Africa': t('wizard_region_africa'),
              'Oceania': t('wizard_region_oceania'),
              'Middle East': t('wizard_region_middle_east')
          };
          return map[region] || val;
      }
      return val;
  };

  return (
          <div className="space-y-4 animate-in fade-in duration-500">
            <div>
               <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wizard_step4_title')}</h2>
               <p className="text-gray-600 dark:text-gray-400 mt-2 mb-4">{t('wizard_step4_desc')}</p>
            </div>

            <div className={`border rounded-2xl transition-all duration-500 ${activeSection === 'origin' ? 'border-black dark:border-white shadow-md bg-white dark:bg-gray-900 overflow-visible' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800 overflow-hidden'}`}>
                 <div className="w-full flex items-center justify-between p-5 text-left cursor-default">
                    <div className="flex items-center gap-3">
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeSection === 'origin' ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                             <Icons.Map className="w-4 h-4" />
                         </div>
                         <span className="font-bold text-gray-900 dark:text-white text-lg">
                             {getOriginDisplay()}
                         </span>
                    </div>
                    {activeSection === 'origin' ? <Icons.ChevronDown className="w-5 h-5 text-gray-500" /> : <Icons.ChevronRight className="w-5 h-5 text-gray-500" />}
                 </div>

                 {activeSection === 'origin' && (
                     <div className="p-5 pt-0 border-t border-gray-100 dark:border-gray-800 animate-in slide-in-from-top-2">
                        <div className="flex bg-gray-100 dark:bg-gray-800 p-1 rounded-lg mb-4 mt-4">
                            <button 
                            onClick={() => setOriginInputMode('search')}
                            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                                originInputMode === 'search' ? 'bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                            >
                            {t('wizard_btn_search_country')}
                            </button>
                            <button 
                            onClick={() => setOriginInputMode('region')}
                            className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                                originInputMode === 'region' ? 'bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                            }`}
                            >
                            {t('wizard_btn_select_region')}
                            </button>
                        </div>

                        {originInputMode === 'search' ? (
                            <div className="relative" ref={countryWrapperRef}>
                                <input 
                                    type="text" 
                                    className="w-full p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-black dark:focus:ring-white focus:outline-none text-gray-900 dark:text-white"
                                    placeholder={t('wizard_step4_placeholder')}
                                    value={formData.originCountry.startsWith('Region:') ? '' : formData.originCountry}
                                    onChange={(e) => {
                                        handleChange('originCountry', e.target.value);
                                        setShowCountryList(true);
                                    }}
                                    onFocus={() => setShowCountryList(true)}
                                    onKeyDown={handleKeyDown}
                                />
                                {showCountryList && (
                                    <div className="absolute z-50 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-xl overflow-hidden animate-in fade-in duration-200">
                                    <div className="max-h-60 overflow-y-auto">
                                        {filteredCountries.length > 0 ? (
                                        filteredCountries.map((country, index) => (
                                            <button
                                            type="button"
                                            key={country}
                                            onMouseDown={(e) => e.preventDefault()}
                                            onClick={() => handleCountrySelect(country)}
                                            className={`w-full text-left px-4 py-3 text-sm transition border-b border-gray-50 dark:border-gray-700 last:border-0 block
                                                ${index === highlightedIndex ? 'bg-gray-100 dark:bg-gray-700 text-black dark:text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'}
                                            `}
                                            >
                                            {country}
                                            </button>
                                        ))
                                        ) : (
                                        <div className="px-4 py-3 text-sm text-gray-600 dark:text-gray-400 italic">{t('wizard_step4_no_match')}</div>
                                        )}
                                    </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <RegionGrid 
                              originCountry={formData.originCountry}
                              isEuropeSelected={isEuropeSelected}
                              onSelect={handleRegionSelect}
                              t={t}
                            />
                        )}
                     </div>
                 )}
            </div>

            {isEuropeSelected && (
                <div className={`border rounded-2xl overflow-hidden transition-all duration-500 ${activeSection === 'eu' ? 'border-blue-500 shadow-md bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800'}`}>
                    <div className="p-5 flex items-center justify-between min-h-[80px]">
                         <div className="flex items-center gap-3">
                             <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activeSection === 'eu' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'}`}>
                                <Icons.Flag className="w-4 h-4" />
                             </div>
                             <span className={`font-bold text-lg ${activeSection === 'eu' ? 'text-blue-900 dark:text-blue-300' : 'text-gray-500 dark:text-gray-400'}`}>
                                 {t('wizard_eu_question')}
                             </span>
                         </div>
                         
                         {activeSection === 'eu' && (
                             <div className="flex bg-white dark:bg-gray-900 rounded-full p-1 shadow-sm border border-blue-200 dark:border-blue-800">
                                 <button
                                     onClick={() => handleEuropeCitizenSelect(true)}
                                     className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                         formData.residencePermitType === 'EU Registration' 
                                         ? 'bg-blue-600 text-white shadow-md' 
                                         : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                     }`}
                                 >
                                     {t('wizard_eu_yes')}
                                 </button>
                                 <button
                                     onClick={() => handleEuropeCitizenSelect(false)}
                                     className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                                         formData.originCountry.includes('Non-EU')
                                         ? 'bg-gray-800 dark:bg-gray-700 text-white shadow-md' 
                                         : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                                     }`}
                                 >
                                     {t('wizard_eu_no')}
                                 </button>
                             </div>
                         )}
                    </div>
                </div>
            )}
          </div>
  );
};

export default StepOrigin;
