
import React, { useState, useEffect, useRef } from 'react';
import { Icons } from './Icon';
import { UserProfile } from '../types';
import { v4 as uuidv4 } from 'uuid';
import { COUNTRIES } from '../data/countries';

interface ProfileWizardProps {
  onComplete: (profile: UserProfile) => void;
  onCancel: () => void;
}

const ProfileWizard: React.FC<ProfileWizardProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;
  const [showCountryList, setShowCountryList] = useState(false);
  const countryWrapperRef = useRef<HTMLDivElement>(null);
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    ageRange: '',
    originCountry: '',
    residencePermitType: '',
    maritalStatus: '',
    educationDegree: '',
    educationField: '',
    profession: '',
    languageFinnish: 'None',
    languageEnglish: 'None',
    aspirations: '',
    challenges: ''
  });

  // Calculate filtered countries at top level for access in handlers
  const filteredCountries = formData.originCountry 
    ? COUNTRIES
        .filter(c => c.toLowerCase().includes(formData.originCountry.toLowerCase()))
        .sort((a, b) => {
            const query = formData.originCountry.toLowerCase();
            const aStarts = a.toLowerCase().startsWith(query);
            const bStarts = b.toLowerCase().startsWith(query);
            // Prioritize exact start matches
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            return a.localeCompare(b);
        })
    : COUNTRIES;

  // Handle clicking outside the country dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (countryWrapperRef.current && !countryWrapperRef.current.contains(event.target as Node)) {
        setShowCountryList(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Reset highlight when search changes
  useEffect(() => {
    setHighlightedIndex(0);
  }, [formData.originCountry]);

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
          handleChange('originCountry', filteredCountries[highlightedIndex]);
          setShowCountryList(false);
        }
        break;
      case 'Escape':
        setShowCountryList(false);
        break;
    }
  };

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
    else finishWizard();
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const finishWizard = () => {
    // Construct UserProfile object with a NEW UNIQUE ID
    const profile: UserProfile = {
      id: uuidv4(),
      name: formData.name || 'Friend',
      ageRange: formData.ageRange || 'Unknown',
      originCountry: formData.originCountry || 'Abroad',
      residencePermitType: formData.residencePermitType || 'General',
      maritalStatus: formData.maritalStatus || 'Single',
      languages: [
        { language: 'Finnish', level: formData.languageFinnish },
        { language: 'English', level: formData.languageEnglish }
      ],
      education: {
        degree: formData.educationDegree || 'Not specified',
        field: formData.educationField || 'General'
      },
      profession: formData.profession || 'Job Seeker',
      aspirations: formData.aspirations.split(',').map(s => s.trim()).filter(s => s),
      challenges: formData.challenges.split(',').map(s => s.trim()).filter(s => s)
    };

    onComplete(profile);
  };

  // --- STEP RENDERERS ---

  const renderStep = () => {
    switch(step) {
      case 1: // Intro
        return (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="text-center mb-8">
              <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
                 <Icons.User className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Tervetuloa! Let's start your Finnish story.</h3>
              <p className="text-gray-600 mt-2">We'll create a profile to guide you through the bureaucracy maze.</p>
            </div>
            
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">First things first, what should we call you?</label>
                <input 
                  type="text" 
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  autoFocus
                />
              </div>
              
              <div className="space-y-2 relative" ref={countryWrapperRef}>
                <label className="block text-sm font-medium text-gray-700">And where is 'home' currently?</label>
                <div className="relative">
                  <input 
                    type="text" 
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm"
                    placeholder="Start typing country name..."
                    value={formData.originCountry}
                    onChange={(e) => {
                      handleChange('originCountry', e.target.value);
                      setShowCountryList(true);
                    }}
                    onFocus={() => setShowCountryList(true)}
                    onKeyDown={handleKeyDown}
                    // Removed onBlur to prevent race condition with dropdown clicks
                  />
                  {showCountryList && (
                    <div 
                      className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-xl max-h-60 overflow-y-auto animate-in fade-in duration-200"
                    >
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country, index) => (
                          <button
                            type="button"
                            key={country}
                            // IMPORTANT: Prevent default mousedown to stop input from blurring
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => {
                              handleChange('originCountry', country);
                              setShowCountryList(false);
                            }}
                            className={`w-full text-left px-4 py-3 text-sm transition border-b border-gray-50 last:border-0 block
                              ${index === highlightedIndex ? 'bg-blue-100 text-blue-800' : 'hover:bg-blue-50 hover:text-blue-700 text-gray-700'}
                            `}
                          >
                            {country}
                          </button>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-sm text-gray-400 italic">
                          No matching countries found.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Which age group represents you?</label>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: "18-25", sub: "Student / Early Career" },
                    { label: "26-35", sub: "Young Professional" },
                    { label: "36-50", sub: "Established" },
                    { label: "50+", sub: "Senior Expert / Retired" }
                  ].map((opt) => (
                    <button
                      type="button"
                      key={opt.label}
                      onClick={() => handleChange('ageRange', opt.label)}
                      className={`p-3 rounded-xl border text-left transition-all ${
                        formData.ageRange === opt.label
                        ? 'border-blue-600 bg-blue-50 text-blue-900 ring-1 ring-blue-600 shadow-sm'
                        : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                      }`}
                    >
                      <div className="font-bold">{opt.label}</div>
                      <div className="text-xs opacity-70">{opt.sub}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Permit Classification (The "Why")
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">What brings you to the land of a thousand lakes?</h3>
              <p className="text-sm text-gray-500 mt-1">This helps us identify your residence permit type.</p>
            </div>

            <div className="grid grid-cols-1 gap-3">
              {[
                { 
                  label: "I have a job offer or business", 
                  sub: "Work-based Residence Permit", 
                  icon: Icons.Rocket,
                  value: "Work-based" 
                },
                { 
                  label: "I'm coming to study", 
                  sub: "Student Residence Permit", 
                  icon: Icons.FileText,
                  value: "Student" 
                },
                { 
                  label: "My family/partner is here", 
                  sub: "Family Ties", 
                  icon: Icons.UserPlus,
                  value: "Family" 
                },
                { 
                  label: "I am an EU/EEA citizen", 
                  sub: "EU Registration", 
                  icon: Icons.Languages,
                  value: "EU Registration" 
                },
                { 
                  label: "Seeking safety or protection", 
                  sub: "International Protection", 
                  icon: Icons.AlertCircle,
                  value: "International Protection" 
                },
                { 
                  label: "Just exploring / Other", 
                  sub: "Visitor / Other", 
                  icon: Icons.User,
                  value: "Other" 
                },
              ].map((opt) => (
                <button
                  type="button"
                  key={opt.value}
                  onClick={() => handleChange('residencePermitType', opt.value)}
                  className={`flex items-center p-4 rounded-xl border transition-all duration-200 text-left group ${
                    formData.residencePermitType === opt.value 
                      ? 'border-blue-600 bg-blue-50 ring-1 ring-blue-600' 
                      : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50 shadow-sm'
                  }`}
                >
                  <div className={`p-3 rounded-full mr-4 transition-colors ${
                     formData.residencePermitType === opt.value ? 'bg-blue-200 text-blue-800' : 'bg-gray-100 text-gray-500 group-hover:bg-white'
                  }`}>
                    <opt.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className={`font-semibold ${formData.residencePermitType === opt.value ? 'text-blue-900' : 'text-gray-900'}`}>
                      {opt.label}
                    </div>
                    <div className="text-xs text-gray-500">{opt.sub}</div>
                  </div>
                  {formData.residencePermitType === opt.value && (
                    <Icons.CheckCircle className="ml-auto w-6 h-6 text-blue-600" />
                  )}
                </button>
              ))}
            </div>
          </div>
        );

      case 3: // Family (Social Support)
        return (
           <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Moving is an adventure. Who is joining you?</h3>
              <p className="text-sm text-gray-500 mt-1">This affects income requirements and day-to-day logistics.</p>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
               {[
                 { label: "I'm flying solo", value: "Single" },
                 { label: "With my partner/spouse", value: "Partnered" },
                 { label: "With my children", value: "Single Parent" },
                 { label: "Whole family (Partner + Kids)", value: "Family with Children" }
               ].map((status) => (
                  <button
                    type="button"
                    key={status.value}
                    onClick={() => handleChange('maritalStatus', status.value)}
                    className={`p-5 rounded-xl border text-left font-medium transition ${
                      formData.maritalStatus === status.value
                        ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-inner' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50 shadow-sm text-gray-700'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
            </div>
          </div>
        );

      case 4: // Work & Education
         return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">What skills are you bringing with you?</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Your Profession / Field of Work</label>
                <input 
                  type="text" 
                  className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm"
                  placeholder="e.g. Nurse, Welder, IT Specialist, Student"
                  value={formData.profession}
                  onChange={(e) => handleChange('profession', e.target.value)}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Highest Education</label>
                  <input 
                    type="text" 
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm"
                    placeholder="e.g. Master's, Vocational"
                    value={formData.educationDegree}
                    onChange={(e) => handleChange('educationDegree', e.target.value)}
                  />
                </div>
                 <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Study Field</label>
                  <input 
                    type="text" 
                    className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 shadow-sm"
                    placeholder="e.g. Engineering, Arts"
                    value={formData.educationField}
                    onChange={(e) => handleChange('educationField', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        );

       case 5: // Languages
         return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="text-center mb-6">
               <h3 className="text-xl font-bold text-gray-900">Language is a key to the culture.</h3>
               <p className="text-sm text-gray-500">Don't worry if you're just starting! Honesty helps us recommend the right courses.</p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                <label className="block text-sm font-bold text-blue-900 mb-3">How is your Finnish?</label>
                <div className="grid grid-cols-2 gap-2">
                   {['None yet', 'Basics (A1)', 'Intermediate (A2-B1)', 'Fluent (B2+)'].map(level => (
                      <button 
                        type="button"
                        key={level}
                        onClick={() => handleChange('languageFinnish', level)}
                         className={`p-3 text-sm rounded-lg border transition ${
                          formData.languageFinnish === level 
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md' 
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-blue-100'
                        }`}
                      >{level}</button>
                   ))}
                </div>
              </div>
               <div className="p-4 rounded-xl border border-gray-200">
                <label className="block text-sm font-bold text-gray-900 mb-3">How is your English?</label>
                <div className="grid grid-cols-2 gap-2">
                   {['None', 'Basic', 'Working Proficiency', 'Native/Fluent'].map(level => (
                      <button 
                        type="button"
                        key={level}
                        onClick={() => handleChange('languageEnglish', level)}
                         className={`p-3 text-sm rounded-lg border transition ${
                          formData.languageEnglish === level 
                            ? 'bg-black text-white border-black shadow-md' 
                            : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                        }`}
                      >{level}</button>
                   ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 6: // Goals
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <div className="text-center mb-6">
                <h3 className="text-xl font-bold text-gray-900">Final Step: Your Vision</h3>
             </div>

             <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">What are your biggest hopes for this move?</label>
                <textarea 
                  className="w-full p-4 border border-gray-200 rounded-xl h-24 resize-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  placeholder="e.g. Finding a community, advancing my career, peace of mind..."
                  value={formData.aspirations}
                  onChange={(e) => handleChange('aspirations', e.target.value)}
                />
              </div>
               <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Any specific worries or blockers?</label>
                <textarea 
                  className="w-full p-4 border border-gray-200 rounded-xl h-24 resize-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                  placeholder="e.g. The long winter, finding a job without Finnish, making friends..."
                  value={formData.challenges}
                  onChange={(e) => handleChange('challenges', e.target.value)}
                />
              </div>
            </div>
          </div>
        );

      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
       <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-bold flex items-center gap-2 text-gray-900">
               Setup Progress
            </h2>
            <div className="flex gap-1 mt-1">
               {[1, 2, 3, 4, 5, 6].map(i => (
                 <div key={i} className={`h-1 w-6 rounded-full ${i <= step ? 'bg-blue-600' : 'bg-gray-200'}`} />
               ))}
            </div>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-red-500 transition">
            <Icons.X className="w-6 h-6" />
          </button>
       </div>

       {/* Added pb-40 to ensure there is scrolling space at the bottom for the dropdown */}
       <div className="flex-1 p-6 md:p-8 overflow-y-auto pb-40">
          {renderStep()}
       </div>

       <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-3 rounded-xl font-medium transition ${
              step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Back
          </button>
          
          <button 
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-black text-white rounded-xl font-medium hover:bg-gray-800 transition shadow-lg transform active:scale-[0.98]"
          >
            {step === totalSteps ? 'Complete Profile' : 'Continue'}
            {step !== totalSteps && <Icons.Send className="w-4 h-4" />}
          </button>
       </div>
    </div>
  );
};

export default ProfileWizard;
