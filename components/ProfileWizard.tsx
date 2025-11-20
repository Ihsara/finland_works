
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icon';
import { UserProfile, LanguageCode } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { COUNTRIES, isEUCountry } from '../data/countries';
import { SUPPORTED_LANGUAGES, t } from '../data/languages';
import { LanguageSelector } from './LanguageSelector';
import { generateNickname } from '../data/nicknameData';

interface ProfileWizardProps {
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
  language: LanguageCode;
  onLanguageSelect: (code: LanguageCode, supported: boolean) => void;
  initialData?: UserProfile | null;
}

interface OptionItem {
  label: string;
  value: string;
}

const Logo = () => (
  <svg width="100" height="37" viewBox="0 0 100 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="select-none cursor-pointer">
    <path d="M65.1545 15.4172H61.0295L56.6946 3.82056L53.9153 11.0139H50.0881L54.5823 0.00708008H58.8987L65.1545 15.4172Z" fill="#181818"/>
    <path d="M92.2647 36.9749C90.8453 36.9749 89.4426 36.7156 88.0565 36.197C86.6705 35.6784 85.4348 34.959 84.3494 34.0388L86.754 30.902C87.8228 31.7719 88.808 32.3993 89.7098 32.7841C90.6115 33.1522 91.5717 33.3362 92.5903 33.3362C93.2583 33.3362 93.8261 33.2693 94.2936 33.1354C94.7612 33.0016 95.1202 32.8092 95.3707 32.5582C95.6212 32.2906 95.7465 31.9811 95.7465 31.6297C95.7465 31.1446 95.5628 30.7682 95.1954 30.5005C94.828 30.2328 94.2018 30.0237 93.3167 29.8731L89.4593 29.1956C88.0398 28.9446 86.9461 28.4009 86.1779 27.5644C85.4098 26.7279 85.0257 25.6656 85.0257 24.3774C85.0257 23.2398 85.3096 22.2611 85.8773 21.4413C86.4618 20.6215 87.2884 19.9942 88.3571 19.5592C89.4426 19.1242 90.7284 18.9067 92.2146 18.9067C93.5171 18.9067 94.828 19.1326 96.1472 19.5843C97.4665 20.0193 98.6103 20.6299 99.5789 21.4162L97.2995 24.6032C95.496 23.2147 93.7008 22.5204 91.914 22.5204C91.3296 22.5204 90.8202 22.5873 90.3861 22.7211C89.9686 22.8382 89.643 23.0139 89.4092 23.2481C89.1921 23.4656 89.0835 23.7333 89.0835 24.0511C89.0835 24.4861 89.2422 24.8207 89.5595 25.0549C89.8934 25.2892 90.4278 25.4732 91.1626 25.607L94.7946 26.2093C96.4812 26.477 97.7587 27.0374 98.627 27.8906C99.5121 28.7439 99.9546 29.848 99.9546 31.2031C99.9546 32.3909 99.6457 33.4198 99.0278 34.2898C98.4099 35.143 97.5249 35.8038 96.3727 36.2723C95.2204 36.7407 93.8511 36.9749 92.2647 36.9749Z" fill="#181818"/>
    <path d="M66.3013 36.7239V19.1576H70.6096V26.8366L77.6984 19.1576H82.9085L74.7927 27.4137L83.3593 36.7239H77.6483L70.6096 28.6685V36.7239H66.3013Z" fill="#181818"/>
    <path d="M47.6814 36.7239V19.1576H56.6488C57.8511 19.1576 58.9198 19.4002C59.855 19.8853 60.7901 20.3538 61.5165 21.0146C62.0342 21.8678 62.8358 23.6663 62.8358 24.7537C62.8358 25.8579 62.5352 26.8449 61.934 27.7149C61.3329 28.5848 60.5396 29.2457 59.5544 29.6974L63.3868 36.7239H58.5775L55.2711 30.3247H51.9897V36.7239H47.6814ZM51.9897 26.8115H56.248C56.916 26.8115 57.4503 26.6274 57.8511 26.2594C58.2686 25.8913 58.4773 25.4145 58.4773 24.829C58.4773 24.2434 58.2686 23.7667 57.8511 23.3986C57.4503 23.0305 56.916 22.8465 56.248 22.8465H51.9897V26.8115Z" fill="#181818"/>
    <path d="M34.77 37C33.4508 37 32.2234 36.7741 31.0879 36.3224C29.9523 35.854 28.9587 35.2099 28.1071 34.3901C27.2554 33.5536 26.5875 32.5917 26.1032 31.5042C25.6356 30.4001 25.4019 29.2122 25.4019 27.9408C25.4019 26.6693 25.6356 25.4899 26.1032 24.4024C26.5875 23.2983 27.2554 22.3363 28.1071 21.5165C28.9587 20.68 29.9523 20.0359 31.0879 19.5842C32.2234 19.1158 33.4508 18.8816 34.77 18.8816C36.0892 18.8816 37.3166 19.1158 38.4521 19.5842C39.5877 20.0359 40.5813 20.68 41.4329 21.5165C42.2846 22.3363 42.9442 23.2983 43.4118 24.4024C43.896 25.4899 44.1382 26.6693 44.1382 27.9408C44.1382 29.2122 43.896 30.4001 43.4118 31.5042C42.9442 32.5917 42.2846 33.5536 41.4329 34.3901C40.5813 35.2099 39.5877 35.854 38.4521 36.3224C37.3166 36.7741 36.0892 37 34.77 37ZM34.77 33.035C35.4714 33.035 36.1226 32.9095 36.7238 32.6586C37.325 32.3909 37.8426 32.0312 38.2768 31.5795C38.7277 31.1278 39.0784 30.5924 39.3288 29.9734C39.5793 29.3377 39.7046 28.6602 39.7046 27.9408C39.7046 27.2047 39.5793 26.5271 39.3288 25.9081C39.0784 25.2891 38.7277 24.7537 38.2768 24.302C37.8426 23.8503 37.325 23.499 36.7238 23.2481C36.1226 22.9804 35.4714 22.8466 34.77 22.8466C34.0687 22.8466 33.4174 22.9804 32.8162 23.2481C32.2151 23.499 31.689 23.8503 31.2382 24.302C30.804 24.7537 30.4617 25.2891 30.2112 25.9081C29.9607 26.5271 29.8354 27.2047 29.8354 27.9408C29.8354 28.6602 29.9607 29.3377 30.2112 29.9734C30.4617 30.5924 30.804 31.1278 31.2382 31.5795C31.689 32.0312 32.2151 32.3909 32.8162 32.6586C33.4174 32.9095 34.0687 33.035 34.77 33.035Z" fill="#181818"/>
    <path d="M3.90757 36.7239L0 19.1576H4.43359L6.56272 29.9985L9.61864 19.1576H13.6515L16.7074 29.9985L18.8365 19.1576H23.1198L19.2122 36.7239H14.6534L11.5724 25.5316L8.46641 36.7239H3.90757Z" fill="#181818"/>
    <path d="M89.3989 12.0748H91.7742C92.3754 12.0748 92.9326 11.9647 93.4458 11.7443C93.9736 11.524 94.4355 11.2155 94.8314 10.8189C95.2273 10.4223 95.5352 9.96687 95.7551 9.45274C95.9751 8.92391 96.085 8.35837 96.085 8.75609C96.085 7.13913 95.9751 6.56624 95.7551 6.03741C95.5352 5.4939 95.2273 5.02383 94.8314 4.62722C94.4355 4.2306 93.9736 3.92212 93.4458 3.70177C92.9326 3.46674 92.3754 3.34922 91.7742 3.34922H89.3989V12.0748ZM85.616 15.424V0H91.8622C93.0059 0 94.0689 0.198309 95.0513 0.594928C96.0337 0.991546 96.8915 1.54241 97.6246 2.2475C98.3724 2.9526 98.9516 3.77522 99.3621 4.71535C99.7873 5.65549 99.9999 6.66907 99.9999 7.75609C99.9999 8.82843 99.7873 9.82732 99.3621 10.7528C98.9516 11.6782 98.3724 12.4935 97.6246 13.1986C96.8915 13.889 96.0337 14.4325 95.0513 14.8291C94.0689 15.2257 93.0059 15.424 91.8622 15.424H85.616Z" fill="#181818"/>
    <path d="M67.8491 15.424V0H71.4121L78.4062 8.94595V0H81.9692V15.424H78.6261L71.4121 6.12555V15.424H67.8491Z" fill="#181818"/>
    <path d="M42.0657 15.424V0H45.8486V12.0748H53.9643V15.424H42.0657Z" fill="#181818"/>
    <path d="M24.2988 15.424V0H27.8618L34.8559 8.94595V0H38.4189V15.424H35.0758L27.8618 6.12555V15.424H24.2988Z" fill="#181818"/>
    <path d="M16.8625 15.424V0H20.6455V15.424H16.8625Z" fill="#181818"/>
    <path d="M1.41553 15.424V0H13.6441V3.28312H5.19847V6.16962H10.8289V9.34257H5.19847V15.424H1.41553Z" fill="#181818"/>
    <path d="M48.2991 9.45691C48.2991 8.62848 48.9706 7.95691 49.7991 7.95691H51.9647V11.0172H48.2991V9.45691Z" fill="#181818"/>
  </svg>
);

const ProfileWizard: React.FC<ProfileWizardProps> = ({ onComplete, onCancel, language, onLanguageSelect, initialData }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 16; 
  const [showCountryList, setShowCountryList] = useState(false);
  const countryWrapperRef = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  // Step 4 Origin Logic
  const [originInputMode, setOriginInputMode] = useState<'search' | 'region'>('search');
  const [isEuropeSelected, setIsEuropeSelected] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    ageRange: '',
    originCountry: '',
    residencePermitType: '',
    maritalStatus: '',
    educationDegree: '',
    educationField: '',
    profession: '',
    languageFinnish: '',
    languageEnglish: '',
    aspirations: '',
    challenges: '',
    // New Fields
    finnishMotivation: '',
    cultureInterest: '',
    confidenceLife: '',
    confidenceCareer: '',
    infoLevel: '',
    primaryExcitement: ''
  });

  // Pre-fill data if editing
  useEffect(() => {
    if (initialData) {
        setFormData({
            name: (initialData.name === 'Friend' || initialData.name === 'Guest') ? '' : initialData.name,
            ageRange: initialData.ageRange === 'Unknown' ? '' : initialData.ageRange,
            originCountry: (initialData.originCountry === 'Unknown' || initialData.originCountry === 'Abroad') ? '' : initialData.originCountry,
            residencePermitType: (initialData.residencePermitType === 'Unknown' || initialData.residencePermitType === 'General') ? '' : initialData.residencePermitType,
            maritalStatus: (initialData.maritalStatus === 'Unknown' || initialData.maritalStatus === 'Single') ? '' : initialData.maritalStatus,
            educationDegree: (initialData.education?.degree === 'Unknown' || initialData.education?.degree === 'Not specified') ? '' : initialData.education?.degree,
            educationField: (initialData.education?.field === 'Unknown' || initialData.education?.field === 'General') ? '' : initialData.education?.field,
            profession: (initialData.profession === 'Unknown' || initialData.profession === 'Job Seeker') ? '' : initialData.profession,
            languageFinnish: initialData.languages?.find(l => l.language === 'Finnish')?.level || '',
            languageEnglish: initialData.languages?.find(l => l.language === 'English')?.level || '',
            aspirations: initialData.aspirations?.join(', ') || '',
            challenges: initialData.challenges?.join(', ') || '',
            finnishMotivation: initialData.finnishMotivation || '',
            cultureInterest: initialData.cultureInterest || '',
            confidenceLife: initialData.confidenceLife || '',
            confidenceCareer: initialData.confidenceCareer || '',
            infoLevel: initialData.infoLevel || '',
            primaryExcitement: initialData.primaryExcitement || ''
        });
        
        // Determine Origin Mode
        if (initialData.originCountry && initialData.originCountry.startsWith('Region:')) {
           setOriginInputMode('region');
        }
    }
  }, [initialData]);

  // Calculate filtered countries
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

  const handleCountrySelect = (country: string) => {
    const isEU = isEUCountry(country);
    setFormData(prev => ({ 
        ...prev, 
        originCountry: country,
        residencePermitType: isEU ? 'EU Registration' : (prev.residencePermitType === 'EU Registration' ? '' : prev.residencePermitType)
    }));
    setShowCountryList(false);
  };

  const handleNext = () => {
    // Check special conditions for step skipping logic
    if (step === 4 && (isEUCountry(formData.originCountry) || formData.residencePermitType === 'EU Registration')) {
       // Skip Permit Question if EU Citizen
       setStep(6);
       return;
    }
    
    if (step < totalSteps) setStep(step + 1);
    else finishWizard();
  };

  const handleBack = () => {
    if (step === 6 && (isEUCountry(formData.originCountry) || formData.residencePermitType === 'EU Registration')) {
        setStep(4);
        return;
    }

    if (step > 1) setStep(step - 1);
  };

  const handleChange = (field: string, value: string) => {
    if (field === 'originCountry') {
        const isEU = isEUCountry(value);
        setFormData(prev => ({ 
            ...prev, 
            [field]: value,
            residencePermitType: isEU ? 'EU Registration' : (prev.residencePermitType === 'EU Registration' ? '' : prev.residencePermitType)
        }));
    } else {
        setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleGenerateName = () => {
      const nickname = generateNickname(language);
      handleChange('name', nickname);
  };

  const handleRegionSelect = (regionKey: string, label: string) => {
      if (regionKey === 'europe') {
          setIsEuropeSelected(true); // Show conditional question
      } else {
          setIsEuropeSelected(false);
          setFormData(prev => ({ 
            ...prev, 
            originCountry: `Region: ${label}`,
            // Reset permit type if it was EU before but now user picked Asia etc.
            residencePermitType: prev.residencePermitType === 'EU Registration' ? '' : prev.residencePermitType
          }));
      }
  };

  const handleEuropeCitizenSelect = (isCitizen: boolean) => {
      setFormData(prev => ({ 
        ...prev, 
        originCountry: isCitizen ? 'Region: Europe (EU/EEA)' : 'Region: Europe (Non-EU)',
        residencePermitType: isCitizen ? 'EU Registration' : ''
      }));
      // Move to next step handled by Main Wizard logic via "Next" or manual invoke if we want auto-advance
      // Here we just update state, user clicks Next.
      setIsEuropeSelected(false); // Close sub-menu to show selection state if we want, or just keep it open.
      // Better UX: Keep visual feedback.
  };

  const finishWizard = () => {
    const profile: UserProfile = {
      id: initialData?.id || uuidv4(),
      name: formData.name || 'Friend',
      ageRange: formData.ageRange || 'Unknown',
      originCountry: formData.originCountry || 'Abroad',
      residencePermitType: formData.residencePermitType || 'General',
      maritalStatus: formData.maritalStatus || 'Single',
      languages: [
        { language: 'Finnish', level: formData.languageFinnish || 'None' },
        { language: 'English', level: formData.languageEnglish || 'None' }
      ],
      education: {
        degree: formData.educationDegree || 'Not specified',
        field: formData.educationField || 'General'
      },
      profession: formData.profession || 'Job Seeker',
      aspirations: formData.aspirations.split(',').map(s => s.trim()).filter(s => s),
      challenges: formData.challenges.split(',').map(s => s.trim()).filter(s => s),
      finnishMotivation: formData.finnishMotivation,
      cultureInterest: formData.cultureInterest,
      confidenceLife: formData.confidenceLife,
      confidenceCareer: formData.confidenceCareer,
      infoLevel: formData.infoLevel,
      primaryExcitement: formData.primaryExcitement
    };
    onComplete(profile);
  };

  // --- Render Helpers ---
  
  const OptionGrid = ({ options, current, onSelect }: { options: OptionItem[], current: string, onSelect: (v: string) => void }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3 mt-4">
      {options.map(opt => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={`p-4 rounded-xl border text-sm font-medium transition-all duration-200 text-left flex items-center ${
            current === opt.value 
              ? 'border-black ring-1 ring-black text-gray-900 bg-gray-50 shadow-sm' 
              : 'border-gray-200 text-gray-900 hover:border-gray-300 hover:shadow-sm'
          }`}
        >
          {current === opt.value && <Icons.CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 text-black" />}
          {opt.label}
        </button>
      ))}
    </div>
  );

  // Replaces LikertScale with a Progressive Grid that uses colors for scales
  const ProgressiveSelector = ({ options, current, onSelect }: { options: OptionItem[], current: string, onSelect: (v: string) => void }) => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
        {options.map((opt, idx) => {
            const isSelected = current === opt.value;
            
            // Calculate color based on position
            // 0 -> Red, Middle -> Yellow, End -> Green
            const position = idx / (options.length - 1 || 1); // 0 to 1
            
            let baseColorClass = 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white';
            let selectedColorClass = 'ring-1 shadow-md text-black';
            let iconColor = 'text-gray-400';
            
            // Define color stops logic
            if (position <= 0.25) {
                // Red/Orange (Low)
                 if (isSelected) selectedColorClass += ' border-red-500 ring-red-500 bg-red-50';
                 iconColor = isSelected ? 'text-red-600' : 'text-gray-300';
            } else if (position <= 0.75) {
                // Yellow/Orange (Mid)
                 if (isSelected) selectedColorClass += ' border-yellow-500 ring-yellow-500 bg-yellow-50';
                 iconColor = isSelected ? 'text-yellow-600' : 'text-gray-300';
            } else {
                // Green (High)
                 if (isSelected) selectedColorClass += ' border-green-500 ring-green-500 bg-green-50';
                 iconColor = isSelected ? 'text-green-600' : 'text-gray-300';
            }

            return (
                <button
                    key={opt.value}
                    onClick={() => onSelect(opt.value)}
                    className={`
                        relative p-4 rounded-xl border-2 text-left transition-all duration-200 group
                        ${isSelected ? selectedColorClass : baseColorClass}
                    `}
                >
                    <div className="flex items-center justify-between w-full">
                        <span className={`font-medium ${isSelected ? 'font-bold' : ''}`}>{opt.label}</span>
                        {isSelected && <Icons.CheckCircle className={`w-5 h-5 ${iconColor}`} />}
                    </div>
                    {/* Glow effect for selected */}
                    {isSelected && (
                         <div className={`absolute inset-0 rounded-xl opacity-20 ${
                            position <= 0.25 ? 'bg-red-400' : (position <= 0.75 ? 'bg-yellow-400' : 'bg-green-400')
                         } blur-sm -z-10`}></div>
                    )}
                </button>
            );
        })}
      </div>
    );
  };

  // Visual Marital Selector
  const MaritalSelector = ({ current, onSelect }: { current: string, onSelect: (v: string) => void }) => {
    const options = [
        { 
            id: 'Solo', 
            value: "Solo (Single/Divorced/Widowed)",
            title: t('wizard_marital_solo_title', language),
            desc: t('wizard_marital_solo_desc', language),
            icon: Icons.User,
            color: 'bg-blue-100 text-blue-600 border-blue-200 hover:bg-blue-200'
        },
        { 
            id: 'Partnered', 
            value: "Partnered (Married/Cohabiting)",
            title: t('wizard_marital_pair_title', language),
            desc: t('wizard_marital_pair_desc', language),
            icon: Icons.Users,
            color: 'bg-pink-100 text-pink-600 border-pink-200 hover:bg-pink-200'
        },
        { 
            id: 'Secret', 
            value: "Prefer not to say",
            title: t('wizard_marital_secret_title', language),
            desc: t('wizard_marital_secret_desc', language),
            icon: Icons.Ghost,
            color: 'bg-purple-100 text-purple-600 border-purple-200 hover:bg-purple-200'
        }
    ];

    return (
        <div className="grid grid-cols-1 gap-4 mt-6">
            {options.map(opt => {
                 const isSelected = current === opt.value;
                 return (
                    <button
                        key={opt.id}
                        onClick={() => onSelect(opt.value)}
                        className={`
                            flex items-center gap-4 p-5 rounded-2xl border-2 transition-all duration-200 group text-left
                            ${isSelected 
                                ? 'border-black bg-gray-50 shadow-md scale-[1.02]' 
                                : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50'
                            }
                        `}
                    >
                        <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 ${isSelected ? 'bg-black text-white' : opt.color}`}>
                            <opt.icon className="w-8 h-8" />
                        </div>
                        <div>
                            <h3 className={`font-bold text-lg ${isSelected ? 'text-black' : 'text-gray-900'}`}>{opt.title}</h3>
                            <p className="text-gray-500 text-sm">{opt.desc}</p>
                        </div>
                        {isSelected && (
                             <div className="ml-auto">
                                <Icons.CheckCircle className="w-6 h-6 text-black" />
                             </div>
                        )}
                    </button>
                 );
            })}
        </div>
    );
  };

  // Visual Region Selector
  const RegionGrid = () => {
      const regions = [
          { id: 'europe', label: t('wizard_region_europe', language), icon: Icons.Landmark, color: 'text-blue-600 bg-blue-50 border-blue-200' },
          { id: 'americas', label: t('wizard_region_americas', language), icon: Icons.Map, color: 'text-green-600 bg-green-50 border-green-200' },
          { id: 'asia', label: t('wizard_region_asia', language), icon: Icons.Mountain, color: 'text-red-600 bg-red-50 border-red-200' },
          { id: 'africa', label: t('wizard_region_africa', language), icon: Icons.Sun, color: 'text-orange-600 bg-orange-50 border-orange-200' },
          { id: 'oceania', label: t('wizard_region_oceania', language), icon: Icons.Waves, color: 'text-cyan-600 bg-cyan-50 border-cyan-200' },
          { id: 'middle_east', label: t('wizard_region_middle_east', language), icon: Icons.Ghost, color: 'text-purple-600 bg-purple-50 border-purple-200' }, // Placeholder icon
      ];

      return (
          <div className="space-y-6">
             <div className="grid grid-cols-2 gap-4">
                 {regions.map(r => {
                     const isSelected = formData.originCountry.includes(r.label) || (r.id === 'europe' && isEuropeSelected);
                     return (
                        <button
                            key={r.id}
                            onClick={() => handleRegionSelect(r.id, r.label)}
                            className={`
                                flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-200 gap-3
                                ${isSelected 
                                    ? 'border-black bg-gray-50 shadow-md ring-1 ring-black' 
                                    : 'border-gray-100 bg-white hover:border-gray-300 hover:bg-gray-50 hover:-translate-y-1'
                                }
                            `}
                        >
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${r.color}`}>
                                <r.icon className="w-6 h-6" />
                            </div>
                            <span className={`font-bold text-sm ${isSelected ? 'text-black' : 'text-gray-700'}`}>{r.label}</span>
                        </button>
                     );
                 })}
             </div>

             {/* Conditional EU Question */}
             {isEuropeSelected && (
                 <div className="animate-in fade-in slide-in-from-top-4 duration-300 bg-blue-50 p-6 rounded-2xl border border-blue-100">
                     <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                         <Icons.Flag className="w-5 h-5" />
                         {t('wizard_eu_question', language)}
                     </h3>
                     <div className="flex flex-col sm:flex-row gap-3">
                         <button 
                            onClick={() => handleEuropeCitizenSelect(true)}
                            className={`flex-1 p-4 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition
                                ${formData.residencePermitType === 'EU Registration' 
                                    ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                                    : 'bg-white text-blue-700 border-blue-200 hover:bg-blue-50'
                                }
                            `}
                         >
                            <Icons.Euro className="w-4 h-4" /> {t('wizard_eu_yes', language)}
                         </button>
                         <button 
                            onClick={() => handleEuropeCitizenSelect(false)}
                            className={`flex-1 p-4 rounded-xl border-2 font-bold text-sm flex items-center justify-center gap-2 transition
                                ${formData.originCountry.includes('Non-EU')
                                    ? 'bg-gray-800 text-white border-gray-800 shadow-md' 
                                    : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                                }
                            `}
                         >
                            <Icons.BookOpen className="w-4 h-4" /> {t('wizard_eu_no', language)}
                         </button>
                     </div>
                 </div>
             )}
          </div>
      );
  };

  // Dynamic Options Generators
  const getPermitOptions = (lang: LanguageCode): OptionItem[] => [
    // Mapped to values that preserve backend keywords ('work', 'student') where possible, 
    // or use descriptive strings for 'Full Rights'.
    { value: "Unlimited (Family/Permanent/Asylum)", label: t('wizard_opt_rights_full', lang) },
    { value: "Work-based (Restricted)", label: t('wizard_opt_rights_work', lang) },
    { value: "Student", label: t('wizard_opt_rights_student', lang) },
    { value: "Visitor / No Right", label: t('wizard_opt_rights_none', lang) }
  ];

  const getEducationOptions = (lang: LanguageCode): OptionItem[] => [
    { value: "High School", label: t('wizard_opt_hs', lang) },
    { value: "Vocational", label: t('wizard_opt_vocational', lang) },
    { value: "Bachelor's", label: t('wizard_opt_bachelors', lang) },
    { value: "Master's", label: t('wizard_opt_masters', lang) },
    { value: "PhD", label: t('wizard_opt_phd', lang) },
    { value: "Other", label: t('wizard_opt_other', lang) }
  ];

  const getFinnishLevelOptions = (lang: LanguageCode): OptionItem[] => [
    { value: "None yet", label: t('wizard_opt_lang_none', lang) },
    { value: "Basics (A1)", label: t('wizard_opt_lang_basics', lang) },
    { value: "Intermediate (A2-B1)", label: t('wizard_opt_lang_inter', lang) },
    { value: "Fluent (B2+)", label: t('wizard_opt_lang_fluent', lang) }
  ];

  const getEnglishLevelOptions = (lang: LanguageCode): OptionItem[] => [
    { value: "None", label: t('wizard_opt_lang_en_none', lang) },
    { value: "Basic", label: t('wizard_opt_lang_en_basic', lang) },
    { value: "Working Proficiency", label: t('wizard_opt_lang_en_working', lang) },
    { value: "Native/Fluent", label: t('wizard_opt_lang_en_fluent', lang) }
  ];

  // --- New Questions Options ---
  const getMotivationOptions = (lang: LanguageCode): OptionItem[] => [
      { value: "Just starting", label: t('wizard_opt_mot_low', lang) },
      { value: "Needs structure", label: t('wizard_opt_mot_med', lang) },
      { value: "Very committed", label: t('wizard_opt_mot_high', lang) },
  ];

  const getCultureOptions = (lang: LanguageCode): OptionItem[] => [
      { value: "A little interested", label: t('wizard_opt_cult_low', lang) },
      { value: "Moderately interested", label: t('wizard_opt_cult_med', lang) },
      { value: "Very interested", label: t('wizard_opt_cult_high', lang) },
  ];

  const getConfidenceLifeOptions = (lang: LanguageCode): OptionItem[] => [
      { value: "Lost", label: t('wizard_opt_conf_life_low', lang) },
      { value: "Somewhat confident", label: t('wizard_opt_conf_life_med', lang) },
      { value: "Quite confident", label: t('wizard_opt_conf_life_high', lang) },
  ];

  const getConfidenceCareerOptions = (lang: LanguageCode): OptionItem[] => [
      { value: "Unsure where to start", label: t('wizard_opt_conf_career_low', lang) },
      { value: "Have ideas", label: t('wizard_opt_conf_career_med', lang) },
      { value: "Confident", label: t('wizard_opt_conf_career_high', lang) },
  ];

  const getInfoLevelOptions = (lang: LanguageCode): OptionItem[] => [
      { value: "Not informed", label: t('wizard_opt_info_none', lang) },
      { value: "Somewhat informed", label: t('wizard_opt_info_some', lang) },
      { value: "Very informed", label: t('wizard_opt_info_high', lang) },
  ];

  const getExcitementOptions = (lang: LanguageCode): OptionItem[] => [
      { value: "Career opportunities", label: t('wizard_opt_excite_career', lang) },
      { value: "Quality of life", label: t('wizard_opt_excite_life', lang) },
      { value: "Nature and culture", label: t('wizard_opt_excite_nature', lang) },
      { value: "Education", label: t('wizard_opt_excite_edu', lang) },
      { value: "Still figuring it out", label: t('wizard_opt_excite_idk', lang) },
  ];

  const renderStepContent = () => {
    switch(step) {
      case 1: // Name
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('wizard_title_name', language)}</h2>
              <p className="text-gray-600 mt-2">{t('wizard_desc_name', language)}</p>
            </div>
            <div className="relative">
                <input 
                  type="text" 
                  className="w-full p-4 bg-gray-100 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900"
                  placeholder={t('wizard_placeholder_name', language)}
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  autoFocus
                />
                <button
                  onClick={handleGenerateName}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white border border-gray-200 hover:border-black hover:bg-gray-50 text-gray-900 text-xs sm:text-sm font-bold py-2 px-4 rounded-lg shadow-sm transition-all"
                >
                  <span className="flex items-center gap-2">
                    <Icons.Zap className="w-3 h-3" /> 
                    {t('wizard_btn_generate_name', language)}
                  </span>
                </button>
            </div>
            <p className="text-xs text-gray-500 italic">
                {t('wizard_nickname_hint', language)}
            </p>
          </div>
        );
      case 2: // Age
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step2_title', language)}</h2>
              <p className="text-gray-600 mt-2">{t('wizard_step2_desc', language)}</p>
            </div>
            <div className="grid grid-cols-2 gap-3 mt-4">
               {["18–25", "26–35", "36–50", "51+"].map(opt => (
                <button
                  key={opt}
                  onClick={() => handleChange('ageRange', opt)}
                  className={`p-6 rounded-xl border font-medium text-lg transition-all ${
                    formData.ageRange === opt 
                    ? 'border-black ring-1 ring-black bg-gray-50 text-black' 
                    : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
                  }`}
                >
                  {opt}
                </button>
               ))}
            </div>
          </div>
        );
      case 3: // Marital
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step3_title', language)}</h2>
            </div>
            <MaritalSelector 
                current={formData.maritalStatus}
                onSelect={(v) => handleChange('maritalStatus', v)}
            />
          </div>
        );
      case 4: // Nationality (Dual Mode)
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
               <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step4_title', language)}</h2>
               <p className="text-gray-600 mt-2">{t('wizard_step4_desc', language)}</p>
            </div>

            {/* Toggle Mode Switch */}
            <div className="flex bg-gray-100 p-1 rounded-lg mb-4">
                <button 
                  onClick={() => setOriginInputMode('search')}
                  className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                    originInputMode === 'search' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                   {t('wizard_btn_search_country', language)}
                </button>
                <button 
                  onClick={() => setOriginInputMode('region')}
                  className={`flex-1 py-2 rounded-md text-sm font-bold transition-all ${
                    originInputMode === 'region' ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                   {t('wizard_btn_select_region', language)}
                </button>
            </div>

            {originInputMode === 'search' ? (
                <div className="relative" ref={countryWrapperRef}>
                   <input 
                    type="text" 
                    className="w-full p-4 bg-gray-100 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900"
                    placeholder={t('wizard_step4_placeholder', language)}
                    value={formData.originCountry.startsWith('Region:') ? '' : formData.originCountry}
                    onChange={(e) => {
                      handleChange('originCountry', e.target.value);
                      setShowCountryList(true);
                    }}
                    onFocus={() => setShowCountryList(true)}
                    onKeyDown={handleKeyDown}
                  />
                  {showCountryList && (
                    <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden animate-in fade-in duration-200">
                      <div className="max-h-60 overflow-y-auto">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((country, index) => (
                            <button
                              type="button"
                              key={country}
                              onMouseDown={(e) => e.preventDefault()}
                              onClick={() => handleCountrySelect(country)}
                              className={`w-full text-left px-4 py-3 text-sm transition border-b border-gray-50 last:border-0 block
                                ${index === highlightedIndex ? 'bg-gray-100 text-black' : 'hover:bg-gray-50 text-gray-700'}
                              `}
                            >
                              {country}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-sm text-gray-600 italic">{t('wizard_step4_no_match', language)}</div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
            ) : (
                <RegionGrid />
            )}
          </div>
        );
      case 5: // Permit - WORK RIGHTS QUESTION
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div>
               <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step5_title', language)}</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
               {getPermitOptions(language).map(opt => (
                 <button
                   key={opt.value}
                   onClick={() => handleChange('residencePermitType', opt.value)}
                   className={`p-4 text-left rounded-xl border font-medium transition-all flex items-center ${
                     formData.residencePermitType === opt.value ? 'border-black ring-1 ring-black bg-gray-50 text-black' : 'border-gray-200 bg-white text-gray-900 hover:border-gray-300'
                   }`}
                 >
                   {formData.residencePermitType === opt.value && <Icons.CheckCircle className="w-4 h-4 mr-2 flex-shrink-0 text-black" />}
                   {opt.label}
                 </button>
               ))}
            </div>
          </div>
        );
      case 6: // Education
         return (
           <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step6_title', language)}</h2>
             </div>
             <OptionGrid 
                options={getEducationOptions(language)}
                current={formData.educationDegree}
                onSelect={(v) => handleChange('educationDegree', v)}
             />
             <div className="mt-4">
               <label className="block text-sm font-medium text-gray-700 mb-2">{t('wizard_step6_field_label', language)}</label>
               <input 
                type="text" 
                className="w-full p-4 bg-gray-100 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900"
                placeholder={t('wizard_step6_field_placeholder', language)}
                value={formData.educationField}
                onChange={(e) => handleChange('educationField', e.target.value)}
              />
             </div>
           </div>
         );
      case 7: // Profession
         return (
           <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step7_title', language)}</h2>
                <p className="text-gray-600 mt-2">{t('wizard_step7_desc', language)}</p>
             </div>
             <input 
                type="text" 
                className="w-full p-4 bg-gray-100 rounded-lg focus:ring-2 focus:ring-black focus:outline-none text-gray-900"
                placeholder={t('wizard_step7_placeholder', language)}
                value={formData.profession}
                onChange={(e) => handleChange('profession', e.target.value)}
                autoFocus
              />
           </div>
         );
      case 8: // Finnish
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step8_title', language)}</h2>
             </div>
             <ProgressiveSelector 
                options={getFinnishLevelOptions(language)}
                current={formData.languageFinnish}
                onSelect={(v) => handleChange('languageFinnish', v)}
             />
          </div>
        );
      case 9: // English
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step9_title', language)}</h2>
             </div>
             <ProgressiveSelector 
                options={getEnglishLevelOptions(language)}
                current={formData.languageEnglish}
                onSelect={(v) => handleChange('languageEnglish', v)}
             />
          </div>
        );
      case 10: // Goals
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step10_title', language)}</h2>
             </div>
             <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('wizard_step10_aspirations_label', language)}</label>
                  <textarea 
                    className="w-full p-4 bg-gray-100 rounded-lg focus:ring-2 focus:ring-black focus:outline-none resize-none h-24 text-gray-900"
                    placeholder={t('wizard_step10_aspirations_placeholder', language)}
                    value={formData.aspirations}
                    onChange={(e) => handleChange('aspirations', e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">{t('wizard_step10_challenges_label', language)}</label>
                  <textarea 
                    className="w-full p-4 bg-gray-100 rounded-lg focus:ring-2 focus:ring-black focus:outline-none resize-none h-24 text-gray-900"
                    placeholder={t('wizard_step10_challenges_placeholder', language)}
                    value={formData.challenges}
                    onChange={(e) => handleChange('challenges', e.target.value)}
                  />
                </div>
             </div>
          </div>
        );
      // NEW STEPS
      case 11: // Motivation
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step11_title', language)}</h2>
             </div>
             <ProgressiveSelector 
                options={getMotivationOptions(language)}
                current={formData.finnishMotivation}
                onSelect={(v) => handleChange('finnishMotivation', v)}
             />
          </div>
        );
      case 12: // Cultural Interest
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step12_title', language)}</h2>
             </div>
             <ProgressiveSelector 
                options={getCultureOptions(language)}
                current={formData.cultureInterest}
                onSelect={(v) => handleChange('cultureInterest', v)}
             />
          </div>
        );
      case 13: // Confidence Life
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step13_title', language)}</h2>
             </div>
             <ProgressiveSelector 
                options={getConfidenceLifeOptions(language)}
                current={formData.confidenceLife}
                onSelect={(v) => handleChange('confidenceLife', v)}
             />
          </div>
        );
      case 14: // Confidence Career
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step14_title', language)}</h2>
             </div>
             <ProgressiveSelector 
                options={getConfidenceCareerOptions(language)}
                current={formData.confidenceCareer}
                onSelect={(v) => handleChange('confidenceCareer', v)}
             />
          </div>
        );
      case 15: // Info Level
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step15_title', language)}</h2>
             </div>
             <ProgressiveSelector 
                options={getInfoLevelOptions(language)}
                current={formData.infoLevel}
                onSelect={(v) => handleChange('infoLevel', v)}
             />
          </div>
        );
      case 16: // Excitement - Remains OptionGrid
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div>
                <h2 className="text-2xl font-bold text-gray-900">{t('wizard_step16_title', language)}</h2>
             </div>
             <OptionGrid 
                options={getExcitementOptions(language)}
                current={formData.primaryExcitement}
                onSelect={(v) => handleChange('primaryExcitement', v)}
             />
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full bg-white font-sans">
       {/* HEADER */}
       <div className="flex-shrink-0 p-6 md:p-8 flex justify-between items-center">
          <div onClick={onCancel} className="cursor-pointer hover:opacity-70 transition">
             <Logo />
          </div>
          <div className="flex items-center gap-3">
             <button 
               onClick={onCancel} 
               className="hidden md:flex items-center gap-2 px-6 py-3 rounded-full bg-white border-2 border-gray-900 text-gray-900 shadow-sm hover:bg-gray-50 hover:scale-[1.02] transition-all duration-200 text-sm font-bold tracking-tight"
             >
               <Icons.MessageSquare className="w-4 h-4 text-gray-900" /> 
               {t('wizard_btn_ask', language)}
             </button>

             <LanguageSelector 
               currentLanguage={language} 
               onSelect={onLanguageSelect} 
               className="min-w-[140px]"
             />
          </div>
       </div>

       {/* PROGRESS & TITLE AREA */}
       <div className="px-6 md:px-8 mb-8 max-w-3xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
             <h1 className="text-4xl font-black tracking-tight text-gray-900">{t('wizard_header_quiz', language)}</h1>
             <div className="flex items-center gap-4 flex-1 w-full">
                <span className="text-sm font-bold whitespace-nowrap w-8 text-right">{step}/{totalSteps}</span>
                <div className="h-2 bg-gray-100 rounded-full w-full overflow-hidden">
                   <div 
                      className="h-full bg-black transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${(step / totalSteps) * 100}%` }}
                   ></div>
                </div>
             </div>
          </div>
       </div>

       {/* ACKNOWLEDGEMENT RIBBON */}
       {formData.name.trim().length > 0 && (
         <div className="px-6 md:px-8 mb-6 max-w-3xl mx-auto w-full animate-in fade-in slide-in-from-top-2 duration-500">
           <div className="bg-blue-50 border border-blue-100 text-blue-800 px-4 py-3 rounded-xl flex items-center gap-3 shadow-sm">
              <div className="bg-white p-1.5 rounded-full shadow-sm text-lg">👋</div>
              <span className="font-medium text-sm md:text-base">
                {t('wizard_ribbon_greeting', language, { name: formData.name })}
              </span>
           </div>
         </div>
       )}

       {/* MAIN CONTENT */}
       <div className="flex-1 px-6 md:px-8 overflow-y-auto pb-32">
          <div className="max-w-3xl mx-auto">
             {renderStepContent()}
          </div>
       </div>

       {/* FOOTER NAV */}
       <div className="p-6 md:p-8 max-w-3xl mx-auto w-full flex gap-4 items-center">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-full border font-medium transition flex items-center gap-2 ${
              step === 1 
                ? 'border-transparent text-transparent cursor-default' 
                : 'border-gray-200 text-gray-900 hover:border-gray-900 hover:bg-white'
            }`}
          >
            <Icons.ArrowLeft className="w-4 h-4" /> {t('wizard_btn_prev', language)}
          </button>
          
          {step > 1 && step < totalSteps && (
            <button
               onClick={finishWizard}
               className="hidden sm:block px-4 py-3 text-sm text-gray-500 underline hover:text-gray-900 ml-auto mr-4"
            >
               {t('wizard_btn_finish_early', language)}
            </button>
          )}

          <button 
            onClick={handleNext}
            className={`px-8 py-3 rounded-full bg-black text-white font-medium hover:bg-gray-800 transition shadow-lg flex items-center gap-2 ${step < totalSteps && step <= 1 ? 'ml-auto' : ''}`}
          >
            {step === totalSteps ? t('wizard_btn_submit', language) : t('wizard_btn_next', language)}
            {step !== totalSteps && <Icons.ArrowRight className="w-4 h-4" />}
          </button>
       </div>
    </div>
  );
};

export default ProfileWizard;
