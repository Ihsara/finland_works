
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icon';
import { UserProfile } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { isEUCountry } from '../data/countries';
import { LanguageSelector } from './LanguageSelector';
import { generateRandomNicknameIndices, getNickname } from '../data/nicknameData';
import { useLanguage } from '../contexts/LanguageContext';
import { Logo } from './wizard/shared/WizardUI';
import { unlockAchievement } from '../services/storageService';
import { getRandomPuzzleImageId } from '../data/puzzleImages';

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

  const [formData, setFormData] = useState({
    name: '',
    nicknameIndices: null as { adjIndex: number, animalIndex: number } | null,
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

  const formDataRef = useRef(formData);
  useEffect(() => { formDataRef.current = formData; }, [formData]);

  useEffect(() => {
      if (formData.nicknameIndices) {
          const { adjIndex, animalIndex } = formData.nicknameIndices;
          const newName = getNickname(adjIndex, animalIndex, language);
          if (newName !== formData.name) setFormData(prev => ({ ...prev, name: newName }));
      }
  }, [language]);

  useEffect(() => {
    if (initialData) {
        setFormData(prev => ({
            ...prev,
            name: (initialData.name === 'Friend' || initialData.name === 'Guest') ? '' : initialData.name,
            nicknameIndices: null,
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
        if (initialData.originCountry && initialData.originCountry.startsWith('Region:') && initialData.originCountry.includes('Europe')) {
           setActiveSection('eu');
        }
    }
  }, [initialData]);

  const handleChange = (field: string, value: any) => {
    if (field === 'originCountry') {
        if (!value.startsWith('Region:')) {
            const isEU = isEUCountry(value);
            setFormData(prev => ({ 
                ...prev, 
                [field]: value,
                residencePermitType: isEU ? 'EU Registration' : (prev.residencePermitType === 'EU Registration' ? '' : prev.residencePermitType)
            }));
        } else {
            setFormData(prev => ({ ...prev, [field]: value }));
        }
    } else {
        setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleNext = () => {
    const currentData = formDataRef.current;
    if (step === 1 && !currentData.name.trim()) {
        const indices = generateRandomNicknameIndices();
        const nickname = getNickname(indices.adjIndex, indices.animalIndex, language);
        setFormData(prev => ({ ...prev, name: nickname, nicknameIndices: indices }));
    }
    if (step === 4) { 
        if (currentData.maritalStatus.includes('Solo')) { 
            setFormData(prev => ({ ...prev, hasChildren: false, childCount: '0', childAgeGroups: [] }));
            setStep(7); return; 
        }
        setStep(5); return;
    }
    if (step === 5) { 
        if (currentData.hasChildren === false) { setStep(7); return; }
        setStep(6); return;
    }
    if (step === 6) { setStep(7); return; }
    if (step === 7) { 
        if (isEUCountry(currentData.originCountry) || currentData.residencePermitType === 'EU Registration') {
            setStep(8); setActiveSection('level'); return;
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
    if (step === 2 && activeSection === 'eu') { setActiveSection('origin'); return; }
    if (step === 9 && activeSection === 'motivation') { setActiveSection('level'); return; }
    if (step === 8) { setStep(7); return; }
    if (step === 7) {
        const currentData = formDataRef.current; 
        if (currentData.maritalStatus.includes('Solo')) { setStep(4); } else {
             if (currentData.hasChildren === true) setStep(6); else setStep(5);
        }
        return;
    }
    if (step === 6) { setStep(5); return; }
    if (step === 5) { setStep(4); return; }
    if (step > 1) {
        setStep(step - 1);
        if (step - 1 === 2) setActiveSection(formData.originCountry.includes('Europe') || isEUCountry(formData.originCountry) ? 'eu' : 'origin');
        if (step - 1 === 9) setActiveSection(formData.languageFinnish ? 'motivation' : 'level');
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
    
    // Critical fix: If the user was in "Guest" mode (id='guest'), we MUST generate a new ID
    const newId = (initialData?.id && initialData.id !== 'guest') ? initialData.id : uuidv4();

    // --- ACHIEVEMENT CHECKS ---
    unlockAchievement(newId, 'planner_initiated');
    if (!currentData.nicknameIndices && currentData.name.trim().length > 0) {
        unlockAchievement(newId, 'true_identity');
    }
    if (step === totalSteps) {
        unlockAchievement(newId, 'quiz_master');
    }

    // Determine Puzzle Image (Randomize for new users if not set)
    // We exclude 'helsinki_iso' for new users to keep that unique to the Demo or specific users, 
    // OR we include it. Let's make it random but different from demo if possible.
    const puzzleImageId = initialData?.puzzleImageId || getRandomPuzzleImageId('helsinki_iso'); 

    const profile: UserProfile = {
      id: newId,
      name: currentData.name || 'Friend',
      ageRange: currentData.ageRange || 'Unknown',
      originCountry: currentData.originCountry || 'Abroad',
      residencePermitType: currentData.residencePermitType || 'General',
      maritalStatus: finalMarital,
      languages: [{ language: 'Finnish', level: currentData.languageFinnish || 'None' }, { language: 'English', level: currentData.languageEnglish || 'None' }],
      education: { degree: currentData.educationDegree || 'Not specified', field: 'General' },
      profession: currentData.profession || 'Job Seeker',
      aspirations: currentData.aspirations.split(',').map(s => s.trim()).filter(s => s),
      challenges: currentData.challenges.split(',').map(s => s.trim()).filter(s => s),
      finnishMotivation: currentData.finnishMotivation,
      cultureInterest: currentData.cultureInterest,
      confidenceLife: currentData.confidenceLife,
      confidenceCareer: currentData.confidenceCareer,
      infoLevel: currentData.infoLevel,
      primaryExcitement: currentData.primaryExcitement,
      puzzleImageId: puzzleImageId
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
    <div className="flex flex-col h-full bg-white dark:bg-[#0b1021] font-sans transition-colors duration-500 relative">
       {/* Background Aurora */}
       <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-30 dark:opacity-60">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-200/40 dark:bg-emerald-500/10 blur-[100px] rounded-full"></div>
       </div>

       <div className="flex-shrink-0 px-4 py-4 md:px-8 md:py-6 flex justify-between items-center bg-white/80 dark:bg-[#0b1021]/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/10 sticky top-0 z-20">
          <div onClick={onCancel} className="cursor-pointer hover:opacity-70 transition scale-90 md:scale-100 origin-left">
             <Logo />
          </div>
          <div className="flex items-center gap-2 md:gap-3">
             <LanguageSelector className="min-w-[auto] md:min-w-[140px]" direction="down" />
          </div>
       </div>

       <div className="px-6 md:px-8 mb-4 md:mb-8 max-w-3xl mx-auto w-full mt-4 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-4">
             <div className="flex-1">
                 <p className="text-xs font-bold text-blue-600 dark:text-emerald-400 uppercase tracking-widest mb-2 animate-in fade-in" key={`phase`}>
                    {getPhaseTitle()}
                 </p>
                 <h1 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 dark:text-white animate-in fade-in slide-in-from-left-2 duration-300 font-serif" key={`title-${step}`}>
                    {step === 1 && !formData.name ? t('wizard_title_init') : t('wizard_title_custom', { name: formData.name.split(' ')[0] || '...' })}
                 </h1>
             </div>

             <div className="flex items-center gap-4 w-full md:w-1/3">
                <span className="text-sm font-bold whitespace-nowrap w-8 text-right text-gray-900 dark:text-white">{step}/{totalSteps}</span>
                <div className="h-2 bg-gray-200 dark:bg-white/10 rounded-full w-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-blue-600 to-purple-600 dark:from-emerald-400 dark:to-teal-500 transition-all duration-500 ease-out rounded-full" style={{ width: `${(step / totalSteps) * 100}%` }}></div>
                </div>
             </div>
          </div>
       </div>

       <div className="flex-1 px-6 md:px-8 overflow-y-auto pb-32 relative z-10">
          <div className="max-w-3xl mx-auto" key={`${step}`}>
             {renderStep()}
          </div>
       </div>

       <div className="p-4 md:p-8 max-w-3xl mx-auto w-full flex gap-3 items-center bg-white/90 dark:bg-[#0b1021]/90 backdrop-blur-xl sticky bottom-0 border-t border-gray-100 dark:border-white/10 z-20" key={`footer`}>
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className={`px-4 sm:px-6 py-3 rounded-full border font-bold transition flex items-center gap-2 min-h-[50px] ${step === 1 ? 'border-transparent text-transparent cursor-default' : 'border-gray-200 dark:border-white/20 text-gray-900 dark:text-white hover:border-gray-900 dark:hover:border-white hover:bg-gray-50 dark:hover:bg-white/10'}`}
          >
            <Icons.ArrowLeft className="w-4 h-4" /> 
            <span className="hidden sm:inline">{t('wizard_btn_prev')}</span>
          </button>
          
          {step > 1 && step < totalSteps && (
            <button 
                onClick={finishWizard} 
                className="ml-auto mr-2 sm:mr-4 px-4 py-2 rounded-full font-bold text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all flex items-center gap-2 min-h-[44px]"
                title={t('wizard_btn_finish_early')}
            >
               <span className="hidden sm:inline underline">{t('wizard_btn_finish_early')}</span>
               <Icons.Save className="w-5 h-5 sm:hidden" />
            </button>
          )}

          <button onClick={handleNext} className={`px-6 sm:px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold hover:bg-gray-800 dark:hover:bg-gray-200 transition shadow-lg flex items-center gap-2 min-h-[50px] ${step < totalSteps && step <= 1 ? 'ml-auto' : ''}`}>
            <span className="hidden sm:inline">{step === totalSteps ? t('wizard_btn_submit') : t('wizard_btn_next')}</span>
            <span className="sm:hidden">{step === totalSteps ? 'Finish' : 'Next'}</span>
            {step !== totalSteps && <Icons.ArrowRight className="w-4 h-4" />}
          </button>
       </div>
    </div>
  );
};

export default ProfileWizard;
