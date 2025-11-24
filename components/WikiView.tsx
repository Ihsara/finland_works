
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Icons } from './Icon';
import { getWikiCategories, WikiCategory, WikiArticle, getAllFlattenedArticles } from '../data/wikiContent';
import { marked } from 'marked';
import { UserProfile, LanguageCode } from '../types';
import * as Storage from '../services/storageService';
import { WikiProgressData } from '../services/storageService';
import { LanguageSelector } from './LanguageSelector';
import { t } from '../data/languages';
import { wrapSentencesInHtml } from '../utils/textUtils';

interface WikiViewProps {
  onClose: () => void;
  profile: UserProfile | null;
  language: LanguageCode;
  onLanguageSelect: (code: LanguageCode, supported: boolean) => void;
  // Controlled component props
  activeArticle: WikiArticle | null;
  onArticleSelect: (article: WikiArticle | null) => void;
  onStartChatWithContext?: (context: string, sentence: string) => void;
}

type ViewMode = 'list' | 'icons';

const WikiView: React.FC<WikiViewProps> = ({ 
  onClose, 
  profile, 
  language, 
  onLanguageSelect,
  activeArticle,
  onArticleSelect,
  onStartChatWithContext
}) => {
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation State
  // Changed to store ID instead of object to prevent stale state on language change
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('icons');

  // Interactive Sentence State
  const [activeSentence, setActiveSentence] = useState<{text: string, x: number, y: number} | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Dynamic Content based on Language
  const wikiCategories = useMemo(() => getWikiCategories(language), [language]);

  // Derived Active Category to ensure instant language switch without useEffect lag
  const activeCategory = useMemo(() => {
    if (!activeCategoryId) return null;
    return wikiCategories.find(c => c.id === activeCategoryId) || null;
  }, [activeCategoryId, wikiCategories]);

  // Progress State
  const [progress, setProgress] = useState<WikiProgressData>({ 
    items: {}, 
    globalStats: { totalSessions: 0, firstSessionAt: 0, lastSessionAt: 0, sessionsWithoutUpdate: 0 } 
  });

  // Initialize & Progress Tracking
  useEffect(() => {
    if (!profile) {
      const initialOpen: Record<string, boolean> = {};
      wikiCategories.forEach(c => initialOpen[c.id] = true);
      setOpenCategories(initialOpen);
      return;
    }

    // Only track session once on mount, not on every language change
    if (language === 'en') { 
       Storage.trackWikiSession(profile.id);
    }
    
    const savedProgress = Storage.getWikiProgress(profile.id);
    setProgress(savedProgress);

    const userTags = getUserTags(profile);
    const initialOpen: Record<string, boolean> = {};
    
    wikiCategories.forEach(cat => {
      const hasRelevant = cat.articles.some(a => 
        a.tags.some(t => userTags.has(t) || t === 'mandatory')
      );
      if (hasRelevant || cat === wikiCategories[0]) {
        initialOpen[cat.id] = true;
      }
    });
    setOpenCategories(initialOpen);
  }, [profile]); 

  // Sync activeArticle with ViewMode
  useEffect(() => {
      if (activeArticle) {
          setIsMobileMenuOpen(false);
          setActiveSentence(null); // Reset active sentence when changing articles
      }
  }, [activeArticle]);

  // Effect to handle highlighting cleanup
  useEffect(() => {
      if (!activeSentence) {
          // Clear all highlights
          document.querySelectorAll('.interactive-sentence.highlight-active').forEach(el => {
              el.classList.remove('highlight-active', 'bg-yellow-100', 'shadow-sm');
          });
      }
  }, [activeSentence]);

  // Event delegation for sentence interaction
  useEffect(() => {
      const handleClick = (e: MouseEvent) => {
          const target = e.target as HTMLElement;
          
          // Check if clicked on a sentence span (or inside one)
          const sentenceSpan = target.closest('.interactive-sentence') as HTMLElement;
          
          if (sentenceSpan) {
              const id = sentenceSpan.dataset.sentenceId;
              const text = sentenceSpan.dataset.sentenceText || sentenceSpan.textContent || '';
              const rect = sentenceSpan.getBoundingClientRect();
              
              // If we found a valid sentence ID
              if (id) {
                  // Clear previous highlights
                  document.querySelectorAll('.interactive-sentence.highlight-active').forEach(el => {
                      el.classList.remove('highlight-active', 'bg-yellow-100', 'shadow-sm');
                  });

                  // Add active highlight to ALL fragments with this ID
                  document.querySelectorAll(`.interactive-sentence[data-sentence-id="${id}"]`).forEach(el => {
                      el.classList.add('highlight-active', 'bg-yellow-100', 'shadow-sm');
                  });

                  // Position relative to the clicked fragment
                  setActiveSentence({
                      text,
                      x: rect.left + (rect.width / 2),
                      y: rect.top
                  });
              }
              e.stopPropagation();
          } else if (activeSentence && !target.closest('.sentence-popover')) {
              // Click outside closes popover
              setActiveSentence(null);
          }
      };

      document.addEventListener('click', handleClick);
      return () => document.removeEventListener('click', handleClick);
  }, [activeSentence]);

  const processedContent = useMemo(() => {
      if (!activeArticle) return '';
      const rawHtml = marked.parse(activeArticle.content) as string;
      // Process HTML to wrap sentences
      return wrapSentencesInHtml(rawHtml, language);
  }, [activeArticle, language]);

  const getUserTags = (p: UserProfile): Set<string> => {
    const tags = new Set<string>(['general']);
    const permit = p.residencePermitType.toLowerCase();
    if (permit.includes('student')) tags.add('student');
    if (permit.includes('work') || permit.includes('specialist')) tags.add('worker');
    const marital = p.maritalStatus.toLowerCase();
    if (marital.includes('child') || marital.includes('family')) tags.add('family');
    if (p.ageRange === '18-25') tags.add('youth');
    tags.add('arrival');
    return tags;
  };

  const handleToggleStatus = (status: 'done' | 'later') => {
      if (!activeArticle || !profile) return;
      const currentStatus = progress.items[activeArticle.id]?.status;
      const newStatus = currentStatus === status ? undefined : status;
      Storage.saveWikiArticleStatus(profile.id, activeArticle.id, newStatus);
      setProgress(Storage.getWikiProgress(profile.id));
  };

  const handleStartChat = () => {
      if (!activeArticle || !activeSentence || !onStartChatWithContext) return;
      
      const status = progress.items[activeArticle.id]?.status || 'Not started';
      
      // Construct hidden context
      const context = `
      CONTEXT: User is reading Guide Section [${activeArticle.title}]. 
      STATUS: ${status}.
      USER CLICKED ON SENTENCE: "${activeSentence.text}".
      
      INSTRUCTION: The user wants to know more about this specific sentence in the context of the guide. Explain it simply.
      `;
      
      onStartChatWithContext(context, activeSentence.text);
      setActiveSentence(null);
  };

  const toggleCategory = (catId: string) => {
    setOpenCategories(prev => ({...prev, [catId]: !prev[catId]}));
  };

  const renderIcon = (iconName: string, className: string = "w-4 h-4") => {
    const IconComponent = (Icons as any)[iconName] || Icons.FileText; 
    return <IconComponent className={className} />;
  };

  const getCategoryProgress = (cat: WikiCategory) => {
    if (!cat.articles.length) return 0;
    const doneCount = cat.articles.filter(a => progress.items[a.id]?.status === 'done').length;
    return Math.round((doneCount / cat.articles.length) * 100);
  };

  const getCurrentDisplayId = (article: WikiArticle) => {
    for(let i=0; i<wikiCategories.length; i++) {
        const cat = wikiCategories[i];
        const idx = cat.articles.findIndex(a => a.id === article.id);
        if (idx !== -1) return `${i+1}.${idx+1}`;
    }
    return "";
  };

  const handleArticleClick = (article: WikiArticle) => {
    onArticleSelect(article);
  };

  const handleTagClick = (tag: string) => {
      setActiveTag(tag);
      onArticleSelect(null);
      setActiveCategoryId(null);
  };

  const handleIconCategoryClick = (catId: string) => {
      setActiveCategoryId(catId);
      setOpenCategories({ [catId]: true }); // Ensure open for sidebar sync
  };

  const handleSwitchToIcons = () => {
      setViewMode('icons');
      onArticleSelect(null);
      setActiveCategoryId(null);
      setActiveTag(null);
  };

  const handleSwitchToList = () => {
      setViewMode('list');
      onArticleSelect(null);
      setActiveCategoryId(null);
      setActiveTag(null);
  };

  const handleBack = () => {
      if (activeArticle) {
          // If we have a tag context or category context, go back to it
          onArticleSelect(null);
      } else if (activeTag) {
          setActiveTag(null);
      } else if (activeCategory) {
          setActiveCategoryId(null);
      } else if (viewMode === 'list') {
          setViewMode('icons');
      } else {
          onClose();
      }
  };

  // Reusable list renderer for both Sidebar (Reader) and Full Screen List
  const renderCategoryList = (isSidebar: boolean = false) => {
    return (
      <div className="space-y-4 pb-20">
         {wikiCategories.map((category, catIndex) => {
            const isOpen = openCategories[category.id];
            const catProgress = getCategoryProgress(category);
            const catNumber = catIndex + 1;

            return (
                <div key={category.id} className={`select-none ${!isSidebar ? 'bg-white rounded-xl p-2 border border-transparent hover:border-gray-100 transition-colors' : ''}`}>
                    <button 
                        onClick={() => toggleCategory(category.id)}
                        className={`flex items-center justify-between w-full group ${isSidebar ? 'mb-2' : 'mb-2 p-2'}`}
                    >
                        <div className="flex items-center gap-3 font-bold text-gray-800 group-hover:text-black overflow-hidden">
                            <span className="text-xs text-gray-500 font-mono w-5 flex-shrink-0">{catNumber}.</span>
                            {renderIcon(category.icon as any, "w-5 h-5 text-gray-500 group-hover:text-gray-700 flex-shrink-0")}
                            <span className="text-sm uppercase tracking-wide truncate">{category.title}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {catProgress > 0 && (
                                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                    {catProgress}%
                                </span>
                            )}
                            {isOpen ? <Icons.ChevronDown className="w-4 h-4 text-gray-500"/> : <Icons.ChevronRight className="w-4 h-4 text-gray-500"/>}
                        </div>
                    </button>

                    {isOpen && (
                        <div className={`pl-8 space-y-1 ${isSidebar ? 'border-l-2 border-gray-200 ml-3' : 'ml-3'}`}>
                            {category.articles.map((article, artIndex) => {
                                const isActive = activeArticle?.id === article.id;
                                const itemData = progress.items[article.id];
                                const status = itemData?.status;
                                const numbering = `${catNumber}.${artIndex + 1}`;

                                return (
                                    <button
                                        key={article.id}
                                        onClick={() => {
                                            handleArticleClick(article);
                                            // Only update active category if we are not in tag view
                                            if (!activeTag) setActiveCategoryId(category.id);
                                        }}
                                        className={`w-full text-left px-3 py-3 rounded-md flex items-start gap-3 transition text-sm ${
                                            isActive && isSidebar
                                                ? 'bg-white shadow-sm text-blue-700 font-medium ring-1 ring-gray-100' 
                                                : 'text-gray-700 hover:bg-gray-100/50 hover:text-gray-900'
                                        }`}
                                    >
                                        <span className={`mt-0.5 flex-shrink-0 ${isActive ? 'text-blue-500' : 'text-gray-500'}`}>
                                            {status === 'done' ? (
                                                <Icons.CheckCircle className="w-4 h-4 text-green-500" />
                                            ) : status === 'later' ? (
                                                <Icons.Clock className="w-4 h-4 text-amber-500" />
                                            ) : (
                                                <span className="text-xs font-mono font-medium w-5 inline-block">{numbering}</span>
                                            )}
                                        </span>
                                        <span className="leading-snug">{article.title}</span>
                                    </button>
                                );
                            })}
                        </div>
                    )}
                </div>
            );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white relative overflow-hidden font-sans">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-100 flex items-center bg-white z-50 shadow-sm md:px-6 md:py-4">
        {/* Left Controls */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
           {/* Back / Close Button Logic */}
           {(activeArticle || activeCategory || activeTag || viewMode === 'list') ? (
               <button 
                   onClick={handleBack}
                   className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition"
               >
                   <Icons.ArrowLeft className="w-6 h-6" />
               </button>
           ) : (
               <div className="w-2"></div> /* Spacer */
           )}

           {/* Mobile Menu Toggle (Only in Reader Mode) */}
           {activeArticle && (
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
                {isMobileMenuOpen ? <Icons.ChevronDown className="w-6 h-6" /> : <Icons.MessageSquare className="w-6 h-6 rotate-90" />} 
            </button>
           )}
        </div>

        {/* Title (Responsive) */}
        <div className="flex-1 min-w-0 mx-2 text-center md:text-left">
            <h2 className="font-bold text-gray-900 text-base md:text-lg leading-tight truncate">
                {activeArticle ? activeArticle.title : activeCategory ? activeCategory.title : activeTag ? t('wiki_topic_label', language, { tag: activeTag }) : t('wiki_header_title', language)}
            </h2>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <LanguageSelector 
                currentLanguage={language} 
                onSelect={onLanguageSelect}
                className="mr-1"
            />

            {/* View Mode Toggles - Hidden if deeply nested */}
            <div className={`hidden sm:flex bg-gray-100 rounded-lg p-1 ${ (activeArticle || activeCategory || activeTag) ? 'opacity-0 pointer-events-none' : ''}`}>
                <button
                    onClick={handleSwitchToList}
                    className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    (viewMode === 'list' && !activeCategory) ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <Icons.FileText className="w-3 h-3" /> {t('wiki_nav_list', language)}
                </button>
                <button
                    onClick={handleSwitchToIcons}
                    className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    (viewMode === 'icons' && !activeCategory) ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <Icons.LayoutGrid className="w-3 h-3" /> {t('wiki_nav_icons', language)}
                </button>
            </div>

            <button 
                onClick={onClose}
                className="text-gray-400 hover:text-red-600 p-2 hover:bg-gray-100 rounded-full transition"
            >
                <Icons.X className="w-6 h-6" />
            </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        
        {/* 
            STATE 1: ICONS GRID 
            Conditions: Icons Mode AND No Selection
        */}
        {viewMode === 'icons' && !activeArticle && !activeCategory && !activeTag && (
            <div className="w-full h-full overflow-y-auto bg-gray-50 p-4 md:p-8 animate-in fade-in zoom-in-95 duration-300">
                <div className="max-w-6xl mx-auto">
                     <div className="mb-8 text-center">
                         <h3 className="text-2xl font-bold text-gray-900">{t('wiki_explore_cats', language)}</h3>
                         <p className="text-gray-600 mt-2">{t('wiki_explore_subtitle', language)}</p>
                     </div>
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-20">
                        {wikiCategories.map((category) => {
                            const progressPercent = getCategoryProgress(category);
                            return (
                                <button
                                    key={category.id}
                                    onClick={() => handleIconCategoryClick(category.id)}
                                    className={`
                                        group relative aspect-square rounded-[2rem] bg-white 
                                        border-2 ${category.theme.border} 
                                        flex flex-col items-center justify-center 
                                        shadow-sm ${category.theme.shadow}
                                        transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                                        overflow-hidden
                                    `}
                                >
                                    {/* Shine Effect Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 z-10 pointer-events-none"></div>
                                    
                                    {/* Icon */}
                                    <div className={`mb-4 transform group-hover:scale-110 transition-transform duration-300 ${category.theme.text}`}>
                                        {renderIcon(category.icon as any, "w-16 h-16 md:w-20 md:h-20 stroke-[1.5]")}
                                    </div>

                                    {/* Progress Indicator */}
                                    {progressPercent > 0 && (
                                        <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full z-20">
                                            {progressPercent}%
                                        </div>
                                    )}

                                    {/* Label */}
                                    <div className={`
                                        absolute inset-x-0 bottom-0 p-4 
                                        translate-y-full group-hover:translate-y-0 
                                        transition-transform duration-300 ease-out
                                        ${category.theme.hoverBg} backdrop-blur-sm
                                        border-t ${category.theme.border}
                                        rounded-b-[2rem]
                                    `}>
                                        <span className={`block text-center text-xs md:text-sm font-bold uppercase tracking-wider ${category.theme.text}`}>
                                            {category.title}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                     </div>
                </div>
            </div>
        )}

        {/* 
            STATE 2: FULL SCREEN LIST INDEX
            Conditions: List Mode AND No Selection
        */}
        {viewMode === 'list' && !activeArticle && !activeCategory && !activeTag && (
             <div className="w-full h-full overflow-y-auto bg-gray-50 p-4 md:p-8 animate-in slide-in-from-right-4 duration-300">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6 text-center">
                        <h3 className="text-2xl font-bold text-gray-900">{t('wiki_full_index', language)}</h3>
                        <p className="text-gray-600 mt-1">{t('wiki_full_index_subtitle', language)}</p>
                    </div>
                    {renderCategoryList(false)}
                </div>
             </div>
        )}

        {/* 
            STATE 3: TOPIC/TAG VIEW
            Conditions: Active Tag set, No Article set
        */}
        {activeTag && !activeArticle && (
            <div className="w-full h-full overflow-y-auto bg-white animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Header */}
                <div className="w-full p-8 md:p-12 bg-gray-50 border-b border-gray-100">
                    <div className="max-w-4xl mx-auto flex items-center gap-6">
                         <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-lg border border-gray-100 text-black">
                              <Icons.Tag className="w-10 h-10" />
                         </div>
                         <div>
                              <h1 className="text-3xl md:text-4xl font-black text-gray-900 capitalize tracking-tight">{activeTag}</h1>
                              <p className="text-gray-500 font-medium mt-1">{t('wiki_topic_desc', language)}</p>
                         </div>
                    </div>
                </div>

                {/* Grouped Articles */}
                <div className="max-w-4xl mx-auto p-6 md:p-12 pb-24 space-y-12">
                    {wikiCategories.map(cat => {
                        const matches = cat.articles.filter(a => a.tags.includes(activeTag));
                        if (matches.length === 0) return null;
                        
                        return (
                            <div key={cat.id} className="animate-in fade-in slide-in-from-bottom-2">
                                <h3 className={`flex items-center gap-3 font-bold uppercase tracking-wider text-sm mb-6 pb-2 border-b border-gray-100 ${cat.theme.text}`}>
                                     {renderIcon(cat.icon, "w-5 h-5")} {cat.title}
                                </h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                     {matches.map((article, idx) => {
                                         const itemData = progress.items[article.id];
                                         const status = itemData?.status;
                                         return (
                                            <button
                                                key={article.id}
                                                onClick={() => handleArticleClick(article)}
                                                className={`
                                                    text-left group flex flex-col gap-3 p-5 rounded-xl border-2 transition-all duration-200
                                                    ${status === 'done' 
                                                        ? 'border-green-200 bg-green-50/50 hover:border-green-300' 
                                                        : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-md'
                                                    }
                                                `}
                                            >
                                                <div className="flex justify-between items-start w-full">
                                                    <span className={`text-sm font-bold ${status==='done' ? 'text-green-600' : 'text-gray-400 group-hover:text-black'}`}>
                                                        {t('wiki_guide_prefix', language)} #{idx + 1}
                                                    </span>
                                                    {status === 'done' && <Icons.CheckCircle className="w-5 h-5 text-green-500" />}
                                                </div>
                                                <h4 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                                                    {article.title}
                                                </h4>
                                            </button>
                                         );
                                     })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        )}

        {/* 
            STATE 4: CATEGORY LANDING PAGE
            Conditions: Active Category set, No Article set
        */}
        {activeCategory && !activeArticle && !activeTag && (
            <div className="w-full h-full overflow-y-auto bg-white animate-in fade-in slide-in-from-bottom-4 duration-300">
                {/* Hero Header for Category */}
                <div className={`w-full p-8 md:p-12 ${activeCategory.theme.hoverBg} border-b ${activeCategory.theme.border}`}>
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className={`p-6 bg-white rounded-3xl shadow-lg border-2 ${activeCategory.theme.border} ${activeCategory.theme.text}`}>
                            {renderIcon(activeCategory.icon as any, "w-16 h-16")}
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className={`text-3xl md:text-5xl font-black tracking-tight ${activeCategory.theme.text} mb-2`}>
                                {activeCategory.title}
                            </h1>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-gray-600 font-medium">
                                <span className="flex items-center gap-1">
                                    <Icons.FileText className="w-4 h-4" /> {activeCategory.articles.length} {t('wiki_stat_articles', language)}
                                </span>
                                {getCategoryProgress(activeCategory) > 0 && (
                                    <span className="flex items-center gap-1 text-green-600 bg-green-50 px-2 py-0.5 rounded-full border border-green-200 text-sm font-bold">
                                        <Icons.CheckCircle className="w-4 h-4" /> {getCategoryProgress(activeCategory)}% {t('wiki_stat_complete', language)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="max-w-4xl mx-auto p-6 md:p-12 pb-24">
                    {/* Section Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-6 px-1 flex items-center gap-2">
                        <Icons.List className="w-5 h-5 text-gray-400" />
                        {t('wiki_section_chapters', language)}
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {activeCategory.articles.map((article, idx) => {
                             const itemData = progress.items[article.id];
                             const status = itemData?.status;
                             
                             return (
                                <button
                                    key={article.id}
                                    onClick={() => handleArticleClick(article)}
                                    className={`
                                        text-left group flex flex-col gap-3 p-6 rounded-2xl border-2 transition-all duration-200
                                        ${status === 'done' 
                                            ? 'border-green-200 bg-green-50/50 hover:border-green-300' 
                                            : 'border-gray-100 bg-white hover:border-gray-300 hover:shadow-md'
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-start w-full">
                                        <span className={`
                                            w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border
                                            ${status === 'done' 
                                                ? 'bg-green-500 text-white border-green-500' 
                                                : 'bg-gray-50 text-gray-500 border-gray-200 group-hover:bg-gray-900 group-hover:text-white group-hover:border-gray-900 transition-colors'
                                            }
                                        `}>
                                            {idx + 1}
                                        </span>
                                        {status === 'done' && <Icons.CheckCircle className="w-5 h-5 text-green-500" />}
                                        {status === 'later' && <Icons.Clock className="w-5 h-5 text-amber-500" />}
                                    </div>
                                    
                                    <div>
                                        <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-blue-600 transition-colors">
                                            {article.title}
                                        </h3>
                                        {article.tags.length > 0 && (
                                            <div className="flex flex-wrap gap-1 mt-2">
                                                {article.tags.slice(0, 2).map(t => (
                                                    <span 
                                                        key={t}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleTagClick(t);
                                                        }}
                                                        className="text-[10px] uppercase font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded hover:bg-gray-200 hover:text-black transition-colors"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </button>
                             )
                        })}
                    </div>
                </div>
            </div>
        )}

        {/* 
            STATE 5: READER (SPLIT VIEW)
            Conditions: Article Selected
        */}
        {activeArticle && (
            <div className="flex h-full relative animate-in fade-in duration-300">
                {/* Sidebar */}
                <div className={`
                    absolute inset-0 z-40 bg-gray-50 flex flex-col transform transition-transform duration-300 ease-in-out
                    md:relative md:inset-auto md:transform-none md:w-80 md:border-r md:border-gray-100 md:flex
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    <div className="p-4 overflow-y-auto h-full">
                        {renderCategoryList(true)}
                    </div>
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto relative bg-white w-full" ref={contentRef}>
                    <div className="max-w-3xl mx-auto p-6 md:p-12 pb-32">
                        {/* Article Header */}
                        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-100">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-mono text-blue-600 font-bold tracking-tight">
                                    {t('wiki_section_prefix', language)} {getCurrentDisplayId(activeArticle)}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {activeArticle.tags.map(tag => (
                                        <button 
                                            key={tag} 
                                            onClick={() => handleTagClick(tag)}
                                            className="bg-gray-100 text-gray-500 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-gray-200 hover:bg-gray-200 hover:text-black transition-colors"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleToggleStatus('later')}
                                    title={progress.items[activeArticle.id]?.status === 'later' ? t('wiki_btn_saved', language) : t('wiki_btn_later', language)}
                                    className={`p-3 rounded-full transition-all duration-200 border ${
                                        progress.items[activeArticle.id]?.status === 'later'
                                            ? 'bg-amber-100 border-amber-200 text-amber-700 shadow-inner'
                                            : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-600 hover:border-gray-300 shadow-sm'
                                    }`}
                                >
                                    <Icons.Clock className="w-5 h-5" strokeWidth={2.5} />
                                </button>

                                <button
                                    onClick={() => handleToggleStatus('done')}
                                    title={progress.items[activeArticle.id]?.status === 'done' ? t('wiki_btn_completed', language) : t('wiki_btn_mark_done', language)}
                                    className={`p-3 rounded-full transition-all duration-200 border ${
                                        progress.items[activeArticle.id]?.status === 'done'
                                            ? 'bg-green-100 border-green-200 text-green-700 shadow-inner'
                                            : 'bg-white border-gray-100 text-gray-400 hover:bg-gray-50 hover:text-gray-600 hover:border-gray-300 shadow-sm'
                                    }`}
                                >
                                    {progress.items[activeArticle.id]?.status === 'done' 
                                        ? <Icons.CheckCircle className="w-5 h-5" strokeWidth={2.5} /> 
                                        : <Icons.CheckSquare className="w-5 h-5" strokeWidth={2.5} />
                                    }
                                </button>
                            </div>
                        </div>
                        
                        {/* Markdown Content */}
                        <article className="prose prose-slate prose-sm md:prose-base max-w-none text-gray-900
                            prose-headings:font-bold prose-headings:text-gray-900 prose-h1:text-2xl md:prose-h1:text-3xl prose-h1:tracking-tight
                            prose-h2:text-lg md:prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3
                            prose-p:text-gray-800 prose-p:leading-relaxed
                            prose-a:text-blue-600 hover:prose-a:text-blue-800 
                            prose-li:text-gray-800 prose-li:marker:text-gray-500
                            prose-strong:text-gray-900
                            [&>ul]:pl-4 [&>ol]:pl-4">
                            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
                        </article>
                    </div>
                </div>

                {/* Context Popover */}
                {activeSentence && (
                    <div 
                        className="fixed z-50 sentence-popover animate-in fade-in zoom-in-95 duration-200"
                        style={{ 
                            left: Math.min(window.innerWidth - 60, Math.max(20, activeSentence.x - 25)), 
                            top: activeSentence.y - 50 // Position above
                        }}
                    >
                        <button 
                            onClick={handleStartChat}
                            className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full shadow-xl hover:bg-gray-800 hover:scale-110 transition-all border-2 border-white"
                            title={t('wiki_ctx_ask', language)}
                        >
                            <Icons.MessageSquare className="w-5 h-5" />
                        </button>
                        {/* Triangle */}
                        <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-black"></div>
                    </div>
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default WikiView;
