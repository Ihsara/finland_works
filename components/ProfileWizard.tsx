
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icon';
import { UserProfile } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { isEUCountry } from '../data/countries';
import { LanguageSelector } from './LanguageSelector';
import { generateNickname } from '../data/nicknameData';
import { useLanguage } from '../contexts/LanguageContext';
import { Logo } from './wizard/shared/WizardUI';

// Step Components
import StepName from './wizard/steps/StepName';
import StepOrigin from './wizard/steps/StepOrigin';
import { StepAge, StepEnglish, StepEducation, StepProfession, StepCareerConfidence, StepLifeConfidence, StepCulture, StepInfoLevel, StepExcitement, StepVision } from './wizard/steps/StepGeneral';
import { StepMarital, StepChildren, StepFamilyDetails } from './wizard/steps/StepFamily';
import StepPermit from './wizard/steps/StepPermit';
import StepFinnish from './wizard/steps/StepFinnish';

interface ProfileWizardProps {
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
  initialData?: UserProfile | null;
}

const ProfileWizard: React.FC<ProfileWizardProps> = ({ onComplete, onCancel, initialData }) => {
  const { language, t } = useLanguage();
  const [step, setStep] = useState(1);
  const totalSteps = 17;
  const [activeSection, setActiveSection] = useState<string>('origin');

  // Form Data
  const [formData, setFormData] = useState({
    name: '',
    ageRange: '',
    originCountry: '',
    residencePermitType: '',
    maritalStatus: '',
    hasChildren: null as boolean | null,
    childCount: '1',
    childAgeGroups: [] as string[],
    educationDegree: '',
    profession: '',
    languageFinnish: '',
    languageEnglish: '',
    aspirations: '',
    challenges: '',
    finnishMotivation: '',
    cultureInterest: '',
    confidenceLife: '',
    confidenceCareer: '',
    infoLevel: '',
    primaryExcitement: ''
  });

  // Use Ref to track latest formData for async callbacks (setTimeout)
  const formDataRef = useRef(formData);
  useEffect(() => {
    formDataRef.current = formData;
  }, [formData]);

  useEffect(() => {
    if (initialData) {
        setFormData(prev => ({
            ...prev,
            name: (initialData.name === 'Friend' || initialData.name === 'Guest') ? '' : initialData.name,
            ageRange: initialData.ageRange === 'Unknown' ? '' : initialData.ageRange,
            originCountry: (initialData.originCountry === 'Unknown' || initialData.originCountry === 'Abroad') ? '' : initialData.originCountry,
            residencePermitType: (initialData.residencePermitType === 'Unknown' || initialData.residencePermitType === 'General') ? '' : initialData.residencePermitType,
            maritalStatus: (initialData.maritalStatus === 'Unknown' || initialData.maritalStatus === 'Single') ? '' : initialData.maritalStatus,
            educationDegree: (initialData.education?.degree === 'Unknown' || initialData.education?.degree === 'Not specified') ? '' : initialData.education?.degree,
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
        }));
        
        if (initialData.originCountry && initialData.originCountry.startsWith('Region:')) {
           if (initialData.originCountry.includes('Europe')) {
               setActiveSection('eu');
           }
        }
    }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    if (field === 'originCountry') {
        // Check if it's a concrete country (not Region string) to set Permit
        if (!value.startsWith('Region:')) {
            const isEU = isEUCountry(value);
            setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                residencePermitType: isEU ? 'EU Registration' : (prev.residencePermitType === 'EU Registration' ? '' : prev.residencePermitType)
            }));
        } else {
            // It's a region string, just update
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    } else {
        setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleNext = () => {
    // ALWAYS use ref to get the latest state, preventing stale closures in setTimeouts
    const currentData = formDataRef.current;

    if (step === 1 && !currentData.name.trim()) {
        const nickname = generateNickname(language);
        setFormData(prev => ({ ...prev, name: nickname }));
    }

    // Navigation Logic
    if (step === 4) { // Marital
        // Strict Rule: If Solo, clear children data and skip questions
        if (currentData.maritalStatus.includes('Solo')) { 
            setFormData(prev => ({
                ...prev,
                hasChildren: false,
                childCount: '0',
                childAgeGroups: []
            }));
            setStep(7); 
            return; 
        }
        setStep(5); return;
    }
    if (step === 5) { // Children Bool
        if (currentData.hasChildren === false) { setStep(7); return; }
        setStep(6); return;
    }
    if (step === 6) { // Child Details
        setStep(7); return;
    }
    if (step === 7) { // Permit
        if (isEUCountry(currentData.originCountry) || currentData.residencePermitType === 'EU Registration') {
            setStep(8);
            setActiveSection('level'); 
            return;
        }
        setStep(8); return;
    }

    if (step < totalSteps) {
        setStep(step + 1);
        if (step + 1 === 2) setActiveSection('origin');
        if (step + 1 === 9) setActiveSection('level'); 
    } else {
        finishWizard();
    }
  };

  const handleBack = () => {
    // Intra-step navigation logic
    if (step === 2 && activeSection === 'eu') { setActiveSection('origin'); return; }
    if (step === 9 && activeSection === 'motivation') { setActiveSection('level'); return; }

    if (step === 8) { setStep(7); return; }
    if (step === 7) {
        // Back logic respecting strict rules based on current state
        // Use ref to be safe, though normal state access in click handler is usually fine
        const currentData = formDataRef.current; 
        
        if (currentData.maritalStatus.includes('Solo')) { 
            setStep(4); // Go straight back to marital status
        } else {
             if (currentData.hasChildren === true) setStep(6); // Go back to details
             else setStep(5); // Go back to boolean check
        }
        return;
    }
    if (step === 6) { setStep(5); return; }
    if (step === 5) { setStep(4); return; }

    if (step > 1) {
        setStep(step - 1);
        if (step - 1 === 2) {
             setActiveSection(formData.originCountry.includes('Europe') || isEUCountry(formData.originCountry) ? 'eu' : 'origin');
        }
        if (step - 1 === 9) {
            setActiveSection(formData.languageFinnish ? 'motivation' : 'level');
        }
    }
  };

  const finishWizard = () => {
    const currentData = formDataRef.current;
    
    let finalMarital = currentData.maritalStatus || 'Single';
    if (currentData.hasChildren) {
        const count = currentData.childCount || 'some';
        const ages = currentData.childAgeGroups.join(', ');
        finalMarital = `${finalMarital}, with ${count} children${ages ? ` (${ages})` : ''}`;
    }

    const profile: UserProfile = {
      id: initialData?.id || uuidv4(),
      name: currentData.name || 'Friend',
      ageRange: currentData.ageRange || 'Unknown',
      originCountry: currentData.originCountry || 'Abroad',
      residencePermitType: currentData.residencePermitType || 'General',
      maritalStatus: finalMarital,
      languages: [
        { language: 'Finnish', level: currentData.languageFinnish || 'None' },
        { language: 'English', level: currentData.languageEnglish || 'None' }
      ],
      education: {
        degree: currentData.educationDegree || 'Not specified',
        field: 'General'
      },
      profession: currentData.profession || 'Job Seeker',
      aspirations: currentData.aspirations.split(',').map(s => s.trim()).filter(s => s),
      challenges: currentData.challenges.split(',').map(s => s.trim()).filter(s => s),
      finnishMotivation: currentData.finnishMotivation,
      cultureInterest: currentData.cultureInterest,
      confidenceLife: currentData.confidenceLife,
      confidenceCareer: currentData.confidenceCareer,
      infoLevel: currentData.infoLevel,
      primaryExcitement: currentData.primaryExcitement
    };
    onComplete(profile);
  };

  const getPhaseTitle = () => {
      if (step <= 1) return t('wizard_phase_identity');
      if (step <= 6) return t('wizard_phase_demo');
      if (step === 7) return t('wizard_phase_status');
      if (step <= 11) return t('wizard_phase_skills');
      if (step <= 16) return t('wizard_phase_mindset');
      return t('wizard_phase_vision');
  };

  const renderStep = () => {
      const props = { formData, handleChange, handleNext, activeSection, setActiveSection };
      switch(step) {
          case 1: return <StepName {...props} />;
          case 2: return <StepOrigin {...props} />;
          case 3: return <StepAge {...props} />;
          case 4: return <StepMarital {...props} />;
          case 5: return <StepChildren {...props} />;
          case 6: return <StepFamilyDetails {...props} />;
          case 7: return <StepPermit {...props} />;
          case 8: return <StepEnglish {...props} />;
          case 9: return <StepFinnish {...props} />;
          case 10: return <StepEducation {...props} />;
          case 11: return <StepProfession {...props} />;
          case 12: return <StepCareerConfidence {...props} />;
          case 13: return <StepLifeConfidence {...props} />;
          case 14: return <StepCulture {...props} />;
          case 15: return <StepInfoLevel {...props} />;
          case 16: return <StepExcitement {...props} />;
          case 17: return <StepVision {...props} />;
          default: return null;
      }
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-950 font-sans">
       <div className="flex-shrink-0 px-4 py-4 md:px-8 md:py-6 flex justify-between items-center bg-white dark:bg-gray-950 border-b border-gray-50 dark:border-gray-800">
          <div onClick={onCancel} className="cursor-pointer hover:opacity-70 transition scale-90 md:scale-100 origin-left">
             <Logo />
          </div>
          <div className="flex items-center gap-2 md:gap-3">
             {formData.name.trim().length > 0 && (
                 <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-900 dark:text-gray-100 font-bold text-xs md:text-sm border border-gray-200 dark:border-gray-700 animate-in fade-in slide-in-from-right-4 duration-500">
                    <span className="text-base md:text-lg">👋</span>
                    <span className="max-w-[100px] md:max-w-[150px] truncate">
                        {t('wizard_greeting_short', { name: formData.name.split(' ')[0] })}
                    </span>
                 </div>
             )}

             <button 
               onClick={onCancel} 
               className="hidden md:flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 rounded-full bg-white dark:bg-gray-900 border-2 border-gray-900 dark:border-gray-100 text-gray-900 dark:text-white shadow-sm hover:bg-gray-50 dark:hover:bg-gray-800 hover:scale-[1.02] transition-all duration-200 text-xs md:text-sm font-bold tracking-tight"
             >
               <Icons.MessageSquare className="w-4 h-4 text-gray-900 dark:text-white" /> 
               <span className="hidden lg:inline">{t('wizard_btn_ask')}</span>
             </button>

             <div className="relative z-50">
               <LanguageSelector 
                 className="min-w-[auto] md:min-w-[140px]"
                 direction="down"
               />
             </div>
          </div>
       </div>

       <div className="px-6 md:px-8 mb-4 md:mb-8 max-w-3xl mx-auto w-full mt-4">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
             <div className="flex-1">
                 <p className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-widest mb-2 animate-in fade-in" key={`phase`}>
                    {getPhaseTitle()}
                 </p>
                 <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white animate-in fade-in slide-in-from-left-2 duration-300" key={`title-${step}`}>
                    {step === 1 && !formData.name ? t('wizard_title_init') : t('wizard_title_custom', { name: formData.name.split(' ')[0] || '...' })}
                 </h1>
             </div>

             <div className="flex items-center gap-4 w-full md:w-1/3">
                <span className="text-sm font-bold whitespace-nowrap w-8 text-right text-gray-900 dark:text-gray-100">{step}/{totalSteps}</span>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full w-full overflow-hidden">
                   <div 
                      className="h-full bg-black dark:bg-white transition-all duration-500 ease-out rounded-full"
                      style={{ width: `${(step / totalSteps) * 100}%` }}
                   ></div>
                </div>
             </div>
          </div>
       </div>

       <div className="flex-1 px-6 md:px-8 overflow-y-auto pb-32">
          <div className="max-w-3xl mx-auto" key={`${step}`}>
             {renderStep()}
          </div>
       </div>

       <div className="p-6 md:p-8 max-w-3xl mx-auto w-full flex gap-4 items-center bg-white dark:bg-gray-950 sticky bottom-0 border-t border-gray-50 dark:border-gray-800" key={`footer`}>
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-full border font-medium transition flex items-center gap-2 ${
              step === 1 
                ? 'border-transparent text-transparent cursor-default' 
                : 'border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:border-gray-900 dark:hover:border-white hover:bg-white dark:hover:bg-gray-900'
            }`}
          >
            <Icons.ArrowLeft className="w-4 h-4" /> {t('wizard_btn_prev')}
          </button>
          
          {step > 1 && step < totalSteps && (
            <button
               onClick={finishWizard}
               className="hidden sm:block px-4 py-3 text-sm text-gray-500 dark:text-gray-400 underline hover:text-gray-900 dark:hover:text-white ml-auto mr-4"
            >
               {t('wizard_btn_finish_early')}
            </button>
          )}

          <button 
            onClick={handleNext}
            className={`px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-medium hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg flex items-center gap-2 ${step < totalSteps && step <= 1 ? 'ml-auto' : ''}`}
          >
            {step === totalSteps ? t('wizard_btn_submit') : t('wizard_btn_next')}
            {step !== totalSteps && <Icons.ArrowRight className="w-4 h-4" />}
          </button>
       </div>
    </div>
  );
};

export default ProfileWizard;
