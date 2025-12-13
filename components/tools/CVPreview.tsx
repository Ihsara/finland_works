
import React from 'react';
import { UserProfile } from '../../types';
import { Icons } from '../Icon';
import { useLanguage } from '../../contexts/LanguageContext';
import { getAvatarUrl } from '../../utils/profileUtils';

interface CVPreviewProps {
  profile: UserProfile | null;
}

export const CVPreview: React.FC<CVPreviewProps> = ({ profile }) => {
  const { t } = useLanguage();
  const isGuest = !profile || profile.id === 'guest';

  // --- Dynamic Data Construction ---
  const name = isGuest || !profile.name ? "Alex Esimerkki" : profile.name;
  const profession = isGuest || !profile.profession ? "Professional" : profile.profession;
  const email = isGuest ? "alex.email@example.com" : `${name.split(' ')[0].toLowerCase().replace(/\s+/g, '.')}@email.com`;
  const phone = "+358 40 123 4567";
  const address = "Vantaa, Finland";

  // Construct Summary
  let summary = "Motivated professional looking for opportunities in the Helsinki capital region. Eager to learn and contribute to Finnish working life.";
  if (!isGuest) {
      if (profile.aspirations && profile.aspirations.length > 0) {
          summary = `${profile.aspirations[0]}. I am passionate about ${profile.profession} and ready to apply my skills in a Finnish environment.`;
      }
      if (profile.finnishMotivation) {
          summary += ` I am currently learning Finnish (Motivation: ${profile.finnishMotivation}).`;
      }
  }

  // --- Realistic Experience Generator ---
  // Simple heuristic to generate relevant bullet points based on profession text
  const getExperienceBullets = (role: string) => {
      const lowerRole = role.toLowerCase();
      if (lowerRole.includes('nurs') || lowerRole.includes('health') || lowerRole.includes('doctor')) {
          return [
              "Provided high-quality patient care in a fast-paced environment.",
              "Collaborated with multidisciplinary teams to ensure patient safety.",
              "Maintained accurate medical records and adhered to hygiene protocols."
          ];
      }
      if (lowerRole.includes('engineer') || lowerRole.includes('dev') || lowerRole.includes('tech') || lowerRole.includes('it')) {
          return [
              "Designed and implemented technical solutions to improve system efficiency.",
              "Managed project timelines and coordinated with cross-functional teams.",
              "Troubleshot complex issues and optimized performance metrics."
          ];
      }
      if (lowerRole.includes('sales') || lowerRole.includes('business') || lowerRole.includes('market')) {
          return [
              "Developed and executed strategies to increase market share.",
              "Built strong relationships with key clients and stakeholders.",
              "Analyzed market trends to identify new business opportunities."
          ];
      }
      if (lowerRole.includes('teach') || lowerRole.includes('education')) {
          return [
              "Planned and delivered engaging lessons for diverse student groups.",
              "Assessed student progress and provided constructive feedback.",
              "Organized extracurricular activities to enhance learning."
          ];
      }
      // Generic fallback
      return [
          "Responsible for daily operations and team coordination.",
          "Implemented new efficiency protocols to reduce waste.",
          "Demonstrated strong problem-solving skills in challenging situations."
      ];
  };

  const experienceBullets = getExperienceBullets(profession);

  const handlePrint = () => {
      window.print();
  };

  return (
    <div className="w-full bg-gray-100 dark:bg-gray-800 p-4 rounded-3xl mt-8 mb-8 border border-gray-200 dark:border-gray-700">
        <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                <Icons.FileText className="w-5 h-5" />
                {t('cv_preview_title')}
            </h3>
            <button 
                onClick={handlePrint}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
                <Icons.Printer className="w-4 h-4" /> {t('cv_btn_print')}
            </button>
        </div>

        {/* A4 Paper Simulation */}
        <div className="bg-white text-gray-900 w-full aspect-[1/1.414] shadow-xl p-6 md:p-8 flex flex-col gap-6 text-xs md:text-sm leading-relaxed overflow-hidden relative font-sans">
            {/* Header */}
            <div className="flex gap-6 border-b-2 border-gray-900 pb-6">
                <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0 print:hidden">
                    <img src={getAvatarUrl(profile)} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                    <h1 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-gray-900">{name}</h1>
                    <p className="text-lg font-bold text-blue-700 mt-1">{profession}</p>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mt-3 text-gray-600 text-xs">
                        <span className="flex items-center gap-1"><Icons.Mail className="w-3 h-3"/> {email}</span>
                        <span className="flex items-center gap-1"><Icons.Phone className="w-3 h-3"/> {phone}</span>
                        <span className="flex items-center gap-1"><Icons.MapPin className="w-3 h-3"/> {address}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 gap-6 flex-1">
                {/* Left Column */}
                <div className="col-span-1 space-y-6 border-r border-gray-100 pr-4">
                    <section>
                        <h4 className="font-bold uppercase tracking-wider text-xs mb-3 border-b border-gray-200 pb-1 text-gray-800">{t('cv_sect_skills')}</h4>
                        <ul className="space-y-2 text-xs">
                            {!isGuest && profile.languages?.map((lang, i) => (
                                <li key={i} className="flex justify-between">
                                    <span className="font-medium">{lang.language}</span>
                                    <span className="text-gray-500 text-[10px]">{lang.level}</span>
                                </li>
                            ))}
                            {isGuest && (
                                <>
                                    <li className="flex justify-between"><span className="font-medium">English</span><span className="text-gray-500">Fluent</span></li>
                                    <li className="flex justify-between"><span className="font-medium">Finnish</span><span className="text-gray-500">Basics</span></li>
                                </>
                            )}
                        </ul>
                    </section>

                    <section>
                        <h4 className="font-bold uppercase tracking-wider text-xs mb-3 border-b border-gray-200 pb-1 text-gray-800">{t('cv_sect_soft_skills')}</h4>
                        <div className="flex flex-wrap gap-1">
                            {['Teamwork', 'Punctuality', 'Adaptability', 'Sisu'].map(s => (
                                <span key={s} className="bg-gray-100 px-2 py-1 rounded text-[10px] text-gray-700">{s}</span>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column */}
                <div className="col-span-2 space-y-6">
                    <section>
                        <h4 className="font-bold uppercase tracking-wider text-xs mb-3 border-b border-gray-200 pb-1 text-gray-800">{t('cv_sect_profile')}</h4>
                        <p className="text-gray-600 italic">
                            "{summary}"
                        </p>
                    </section>

                    <section>
                        <h4 className="font-bold uppercase tracking-wider text-xs mb-3 border-b border-gray-200 pb-1 text-gray-800">{t('cv_sect_experience')}</h4>
                        
                        <div className="mb-4">
                            <div className="flex justify-between items-baseline mb-1">
                                <h5 className="font-bold text-gray-900">{profession}</h5>
                                <span className="text-xs text-gray-500">2020 - Present</span>
                            </div>
                            <p className="text-sm font-medium text-gray-700 mb-2">Previous Company Ltd.</p>
                            <ul className="list-disc list-inside text-gray-600 text-xs space-y-1">
                                {experienceBullets.map((bullet, i) => (
                                    <li key={i}>{bullet}</li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    <section>
                        <h4 className="font-bold uppercase tracking-wider text-xs mb-3 border-b border-gray-200 pb-1 text-gray-800">{t('cv_sect_education')}</h4>
                        <div>
                            <div className="flex justify-between items-baseline">
                                <h5 className="font-bold text-gray-900">{!isGuest && profile.education?.degree !== 'Unknown' ? profile.education.degree : "Degree Title"}</h5>
                                <span className="text-xs text-gray-500">Graduated 2019</span>
                            </div>
                            <p className="text-sm text-gray-700">
                                {!isGuest && profile.education?.field !== 'General' ? profile.education.field : "Field of Study"}
                            </p>
                            <p className="text-xs text-gray-500">Institution Name, {!isGuest ? profile.originCountry : "Country"}</p>
                        </div>
                    </section>
                </div>
            </div>
        </div>
        
        <p className="text-center text-xs text-gray-500 mt-2 italic">{t('cv_preview_disclaimer')}</p>
    </div>
  );
};
