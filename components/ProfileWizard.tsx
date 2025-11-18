import React, { useState } from 'react';
import { Icons } from './Icon';
import { UserProfile } from '../types';
import jsYaml from 'js-yaml';

interface ProfileWizardProps {
  onComplete: (profileYaml: string) => void;
  onCancel: () => void;
}

const ProfileWizard: React.FC<ProfileWizardProps> = ({ onComplete, onCancel }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 6;

  const [formData, setFormData] = useState({
    name: '',
    ageRange: '',
    originCountry: '',
    maritalStatus: '',
    educationDegree: '',
    educationField: '',
    profession: '',
    languageFinnish: 'None',
    languageEnglish: 'None',
    aspirations: '',
    challenges: ''
  });

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
    // Construct UserProfile object
    const profile: UserProfile = {
      name: formData.name || 'Friend',
      ageRange: formData.ageRange || 'Unknown',
      originCountry: formData.originCountry || 'Abroad',
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

    // Convert to YAML
    const yamlStr = jsYaml.dump(profile);
    onComplete(yamlStr);
  };

  // --- RENDER STEPS ---

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">What should we call you?</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Your Name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                autoFocus
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Where is home currently?</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                placeholder="Country of origin"
                value={formData.originCountry}
                onChange={(e) => handleChange('originCountry', e.target.value)}
              />
            </div>
             <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Which stage of life are you in?</label>
              <select 
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white"
                value={formData.ageRange}
                onChange={(e) => handleChange('ageRange', e.target.value)}
              >
                <option value="">Select age range</option>
                <option value="18-25">18-25 (Student/Early Career)</option>
                <option value="26-35">26-35 (Young Professional)</option>
                <option value="36-50">36-50 (Established)</option>
                <option value="50+">50+ (Senior)</option>
              </select>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h3 className="text-lg font-semibold text-gray-800">Moving is often a shared adventure.</h3>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-gray-700">Are you coming alone or with family?</label>
              <div className="grid grid-cols-1 gap-3">
                {['Single', 'Partnered', 'Married', 'Family with Children'].map(status => (
                  <button
                    key={status}
                    onClick={() => handleChange('maritalStatus', status)}
                    className={`p-4 rounded-lg border text-left transition ${
                      formData.maritalStatus === status 
                        ? 'border-blue-500 bg-blue-50 text-blue-700' 
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>
          </div>
        );
      case 3:
         return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h3 className="text-lg font-semibold text-gray-800">Finland values skills highly.</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">What is your highest education?</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="e.g. Bachelor's, Vocational, High School"
                value={formData.educationDegree}
                onChange={(e) => handleChange('educationDegree', e.target.value)}
              />
            </div>
             <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Field of Study</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="e.g. Nursing, IT, Engineering"
                value={formData.educationField}
                onChange={(e) => handleChange('educationField', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">What is your profession?</label>
              <input 
                type="text" 
                className="w-full p-3 border border-gray-300 rounded-lg"
                placeholder="e.g. Software Developer, Nurse, Student"
                value={formData.profession}
                onChange={(e) => handleChange('profession', e.target.value)}
              />
            </div>
          </div>
        );
       case 4:
         return (
          <div className="space-y-6 animate-in fade-in duration-500">
            <h3 className="text-lg font-semibold text-gray-800">Language is the key to culture.</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">How is your Finnish?</label>
                <div className="grid grid-cols-2 gap-2">
                   {['None', 'Basics (A1)', 'Intermediate (A2-B1)', 'Fluent (B2+)'].map(level => (
                      <button 
                        key={level}
                        onClick={() => handleChange('languageFinnish', level)}
                         className={`p-2 text-sm rounded-md border transition ${
                          formData.languageFinnish === level 
                            ? 'bg-blue-600 text-white border-blue-600' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >{level}</button>
                   ))}
                </div>
              </div>
               <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">And English?</label>
                <div className="grid grid-cols-2 gap-2">
                   {['None', 'Basic', 'Working Proficiency', 'Native/Fluent'].map(level => (
                      <button 
                        key={level}
                        onClick={() => handleChange('languageEnglish', level)}
                         className={`p-2 text-sm rounded-md border transition ${
                          formData.languageEnglish === level 
                            ? 'bg-black text-white border-black' 
                            : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                        }`}
                      >{level}</button>
                   ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 5:
        return (
          <div className="space-y-6 animate-in fade-in duration-500">
             <h3 className="text-lg font-semibold text-gray-800">What drives you?</h3>
             <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">What are your main goals in Finland?</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none"
                placeholder="e.g. Find a job in my field, Learn the language, Get citizenship"
                value={formData.aspirations}
                onChange={(e) => handleChange('aspirations', e.target.value)}
              />
              <p className="text-xs text-gray-500">Separate with commas</p>
            </div>
             <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Any worries or challenges?</label>
              <textarea 
                className="w-full p-3 border border-gray-300 rounded-lg h-24 resize-none"
                placeholder="e.g. Language barrier, No professional network, Cold weather"
                value={formData.challenges}
                onChange={(e) => handleChange('challenges', e.target.value)}
              />
               <p className="text-xs text-gray-500">Separate with commas</p>
            </div>
          </div>
        );
      case 6:
         return (
          <div className="space-y-6 animate-in fade-in duration-500 text-center py-6">
             <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-4">
                <Icons.CheckCircle className="w-8 h-8" />
             </div>
             <h3 className="text-2xl font-bold text-gray-900">You're all set!</h3>
             <p className="text-gray-600">
               Thanks, {formData.name}. We've built a profile that will help "Finland Works!" give you the most relevant advice.
             </p>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto w-full">
       <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="bg-black text-white w-6 h-6 rounded-full flex items-center justify-center text-xs">
                {step}
              </span>
              {step === totalSteps ? 'Ready' : 'Profile Setup'}
            </h2>
            <p className="text-xs text-gray-500">Step {step} of {totalSteps}</p>
          </div>
          <button onClick={onCancel} className="text-gray-400 hover:text-red-500 transition">
            <Icons.X className="w-6 h-6" />
          </button>
       </div>

       <div className="flex-1 p-8 overflow-y-auto">
          {renderStep()}
       </div>

       <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between">
          <button 
            onClick={handleBack}
            disabled={step === 1}
            className={`px-6 py-2 rounded-lg font-medium transition ${
              step === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-200'
            }`}
          >
            Back
          </button>
          
          <button 
            onClick={handleNext}
            className="px-8 py-2 bg-black text-white rounded-lg font-medium hover:bg-gray-800 transition shadow-lg transform active:scale-95"
          >
            {step === totalSteps ? 'Finish Setup' : 'Continue'}
          </button>
       </div>
    </div>
  );
};

export default ProfileWizard;
