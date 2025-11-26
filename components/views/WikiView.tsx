
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Icons } from '../Icon';
import { getWikiCategories, WikiCategory, WikiArticle, getAllFlattenedArticles } from '../../data/wikiContent';
import { marked } from 'marked';
import { UserProfile } from '../../types';
import * as Storage from '../../services/storageService';
import { WikiProgressData } from '../../services/storageService';
import { LanguageSelector } from '../LanguageSelector';
import { useLanguage } from '../../contexts/LanguageContext';
import { wrapSentencesInHtml } from '../../utils/textUtils';
import { FeedbackRibbon } from '../FeedbackRibbon';

interface WikiViewProps {
  onClose: () => void;
  profile: UserProfile | null;
  // Controlled component props - refactored to ID to allow content to refresh on language change
  activeArticleId: string | null;
  onArticleSelect: (article: WikiArticle | null) => void;
  onStartChatWithContext?: (context: string, sentence: string) => void;
}

type ViewMode = 'list' | 'icons';

// Metadata for Tags to match the visual style of the reference image
// We define full Tailwind class strings to ensure they are not purged
const TAG_METADATA: Record<string, { icon: keyof typeof Icons, border: string, text: string, hover: string, badge: string }> = {
  "Recruitment": { 
      icon: "Briefcase", 
      border: "border-orange-200 dark:border-orange-800", 
      text: "text-orange-600 dark:text-orange-400",
      hover: "group-hover:bg-orange-50 dark:group-hover:bg-orange-900/20",
      badge: "bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-300"
  },
  "Job searching": { 
      icon: "Search", 
      border: "border-lime-200 dark:border-lime-800", 
      text: "text-lime-600 dark:text-lime-400",
      hover: "group-hover:bg-lime-50 dark:group-hover:bg-lime-900/20",
      badge: "bg-lime-100 dark:bg-lime-900 text-lime-700 dark:text-lime-300"
  },
  "Entrepreneurship": { 
      icon: "Rocket", 
      border: "border-teal-200 dark:border-teal-800", 
      text: "text-teal-600 dark:text-teal-400",
      hover: "group-hover:bg-teal-50 dark:group-hover:bg-teal-900/20",
      badge: "bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300"
  },
  "Work Culture": { 
      icon: "Coffee", 
      border: "border-purple-200 dark:border-purple-800", 
      text: "text-purple-600 dark:text-purple-400",
      hover: "group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20",
      badge: "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
  },
  "Networking": { 
      icon: "Users", 
      border: "border-cyan-200 dark:border-cyan-800", 
      text: "text-cyan-600 dark:text-cyan-400",
      hover: "group-hover:bg-cyan-50 dark:group-hover:bg-cyan-900/20",
      badge: "bg-cyan-100 dark:bg-cyan-900 text-cyan-700 dark:text-cyan-300"
  },
  "Work Rights": { 
      icon: "Scale", 
      border: "border-violet-200 dark:border-violet-800", 
      text: "text-violet-600 dark:text-violet-400",
      hover: "group-hover:bg-violet-50 dark:group-hover:bg-violet-900/20",
      badge: "bg-violet-100 dark:bg-violet-900 text-violet-700 dark:text-violet-300"
  },
  "Volunteering Internships": { 
      icon: "Heart", 
      border: "border-emerald-200 dark:border-emerald-800", 
      text: "text-emerald-600 dark:text-emerald-400",
      hover: "group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20",
      badge: "bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300"
  },
  "Learning Finnish": { 
      icon: "Languages", 
      border: "border-rose-200 dark:border-rose-800", 
      text: "text-rose-600 dark:text-rose-400",
      hover: "group-hover:bg-rose-50 dark:group-hover:bg-rose-900/20",
      badge: "bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300"
  },
  "Work-life Balance": { 
      icon: "Sun", 
      border: "border-sky-200 dark:border-sky-800", 
      text: "text-sky-600 dark:text-sky-400",
      hover: "group-hover:bg-sky-50 dark:group-hover:bg-sky-900/20",
      badge: "bg-sky-100 dark:bg-sky-900 text-sky-700 dark:text-sky-300"
  },
};

const WikiView: React.FC<WikiViewProps> = ({ 
  onClose, 
  profile, 
  activeArticleId,
  onArticleSelect,
  onStartChatWithContext
}) => {
  const { language, t } = useLanguage();
  
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Navigation State
  const [activeCategoryId, setActiveCategoryId] = useState<string | null>(null);
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('icons');

  // Interactive Sentence State
  const [activeSentence, setActiveSentence] = useState<{text: string, x: number, y: number} | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  
  // Dynamic Content based on Language
  const wikiCategories = useMemo(() => getWikiCategories(language), [language]);

  // Derived Active Category
  const activeCategory = useMemo(() => {
    if (!activeCategoryId) return null;
    return wikiCategories.find(c => c.id === activeCategoryId) || null;
  }, [activeCategoryId, wikiCategories]);

  // Derived Active Article
  const activeArticle = useMemo(() => {
      if (!activeArticleId) return null;
      const all = getAllFlattenedArticles(language);
      return all.find(a => a.id === activeArticleId) || null;
  }, [activeArticleId, language]);

  // Progress State
  const [progress, setProgress] = useState<WikiProgressData>({ 
    items: {}, 
    globalStats: { totalSessions: 0, firstSessionAt: 0, lastSessionAt: 0, sessionsWithoutUpdate: 0 } 
  });

  // Tag Cloud Data Calculation
  const tagCloudData = useMemo(() => {
    const allArticles = getAllFlattenedArticles(language);
    const counts: Record<string, number> = {};
    
    allArticles.forEach(article => {
      if (article.tags) {
        article.tags.forEach(tag => {
          // Only count tags that are in our metadata (The "Image" tags)
          if (TAG_METADATA[tag]) {
            counts[tag] = (counts[tag] || 0) + 1;
          }
        });
      }
    });

    // Convert to array and sort by count descending
    return Object.entries(counts)
      .map(([tag, count]) => ({ tag, count }))
      .sort((a, b) => b.count - a.count);
  }, [language]);

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
      // Check subsections recursively
      const hasRelevant = cat.subsections.some(sub => 
          sub.articles.some(a => a.tags.some(t => userTags.has(t) || t === 'mandatory'))
      );
      if (hasRelevant || cat === wikiCategories[0]) {
        initialOpen[cat.id] = true;
      }
    });
    setOpenCategories(initialOpen);
  }, [profile]); 

  // Sync activeArticle with ViewMode & Sidebar State
  useEffect(() => {
      if (activeArticle) {
          setIsMobileMenuOpen(false);
          setActiveSentence(null); // Reset active sentence when changing articles
          
          // Auto-expand the category of the active article
          if (activeArticle.categoryId) {
              setOpenCategories(prev => ({ ...prev, [activeArticle.categoryId]: true }));
          }
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
    const allArticles = cat.subsections.flatMap(sub => sub.articles);
    if (!allArticles.length) return 0;
    const doneCount = allArticles.filter(a => progress.items[a.id]?.status === 'done').length;
    return Math.round((doneCount / allArticles.length) * 100);
  };

  const getCurrentDisplayId = (article: WikiArticle) => {
    for(let i=0; i<wikiCategories.length; i++) {
        const cat = wikiCategories[i];
        for(let j=0; j<cat.subsections.length; j++) {
            const sub = cat.subsections[j];
            const idx = sub.articles.findIndex(a => a.id === article.id);
            if (idx !== -1) return `${i+1}.${j+1}.${idx+1}`;
        }
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

  // Helper to find next/prev
  const allArticles = useMemo(() => getAllFlattenedArticles(language), [language]);
  const currentArticleIndex = useMemo(() => {
      if (!activeArticle) return -1;
      return allArticles.findIndex(a => a.id === activeArticle.id);
  }, [activeArticle, allArticles]);

  const prevArticle = currentArticleIndex > 0 ? allArticles[currentArticleIndex - 1] : null;
  const nextArticle = currentArticleIndex > -1 && currentArticleIndex < allArticles.length - 1 ? allArticles[currentArticleIndex + 1] : null;

  // Reusable list renderer for both Sidebar (Reader) and Full Screen List
  const renderCategoryList = (isSidebar: boolean = false) => {
    return (
      <div className="space-y-4 pb-20">
         {wikiCategories.map((category, catIndex) => {
            const isOpen = openCategories[category.id];
            const catProgress = getCategoryProgress(category);
            const catNumber = catIndex + 1;

            return (
                <div key={category.id} className={`select-none ${!isSidebar ? 'bg-white dark:bg-gray-800 rounded-xl p-2 border border-transparent hover:border-gray-100 dark:hover:border-gray-700 transition-colors' : ''}`}>
                    <button 
                        onClick={() => toggleCategory(category.id)}
                        className={`flex items-center justify-between w-full group ${isSidebar ? 'mb-2' : 'mb-2 p-2'}`}
                    >
                        <div className="flex items-center gap-3 font-bold text-gray-800 dark:text-gray-200 group-hover:text-black dark:group-hover:text-white overflow-hidden">
                            <span className="text-xs text-gray-500 dark:text-gray-400 font-mono w-5 flex-shrink-0">{catNumber}.</span>
                            {renderIcon(category.icon as any, "w-5 h-5 text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-300 flex-shrink-0")}
                            <span className="text-sm uppercase tracking-wide truncate">{category.title}</span>
                        </div>
                        <div className="flex items-center gap-2 flex-shrink-0">
                            {catProgress > 0 && (
                                <span className="text-[10px] font-bold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-0.5 rounded-full">
                                    {catProgress}%
                                </span>
                            )}
                            {isOpen ? <Icons.ChevronDown className="w-4 h-4 text-gray-500"/> : <Icons.ChevronRight className="w-4 h-4 text-gray-500"/>}
                        </div>
                    </button>

                    {isOpen && (
                        <div className={`space-y-4 mt-2 ${isSidebar ? 'ml-3 border-l-2 border-gray-200 dark:border-gray-700 pl-3' : 'px-2'}`}>
                            {category.subsections.map((sub, subIndex) => (
                                <div key={sub.title} className="space-y-1">
                                    <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-3 mb-1">
                                        {sub.title}
                                    </h4>
                                    {sub.articles.map((article, artIndex) => {
                                        const isActive = activeArticle?.id === article.id;
                                        const itemData = progress.items[article.id];
                                        const status = itemData?.status;
                                        
                                        return (
                                            <button
                                                key={article.id}
                                                onClick={() => {
                                                    handleArticleClick(article);
                                                    if (!activeTag) setActiveCategoryId(category.id);
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-md flex items-start gap-3 transition text-sm ${
                                                    isActive && isSidebar
                                                        ? 'bg-white dark:bg-gray-700 shadow-sm text-blue-700 dark:text-blue-300 font-medium ring-1 ring-gray-100 dark:ring-gray-600' 
                                                        : 'text-gray-700 dark:text-gray-400 hover:bg-gray-100/50 dark:hover:bg-gray-700/50 hover:text-gray-900 dark:hover:text-white'
                                                }`}
                                            >
                                                <span className={`mt-0.5 flex-shrink-0 ${isActive ? 'text-blue-500 dark:text-blue-400' : 'text-gray-500 dark:text-gray-600'}`}>
                                                    {status === 'done' ? (
                                                        <Icons.CheckCircle className="w-4 h-4 text-green-500 dark:text-green-400" />
                                                    ) : status === 'later' ? (
                                                        <Icons.Clock className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                                                    ) : (
                                                        <Icons.FileText className="w-4 h-4 opacity-50" />
                                                    )}
                                                </span>
                                                <span className="leading-snug">{article.title}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full bg-white dark:bg-gray-900 relative overflow-hidden font-sans">
      {/* Header */}
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-100 dark:border-gray-800 flex items-center bg-white dark:bg-gray-950 z-50 shadow-sm md:px-6 md:py-4 transition-colors">
        {/* Left Controls */}
        <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
           {(activeArticle || activeCategory || activeTag || viewMode === 'list') ? (
               <button 
                   onClick={handleBack}
                   className="p-2 -ml-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
               >
                   <Icons.ArrowLeft className="w-6 h-6" />
               </button>
           ) : (
               <div className="w-2"></div>
           )}

           {activeArticle && (
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
            >
                {isMobileMenuOpen ? <Icons.ChevronDown className="w-6 h-6" /> : <Icons.MessageSquare className="w-6 h-6 rotate-90" />} 
            </button>
           )}
        </div>

        {/* Title */}
        <div className="flex-1 min-w-0 mx-2 text-center md:text-left">
            <h2 className="font-bold text-gray-900 dark:text-gray-100 text-base md:text-lg leading-tight truncate">
                {activeArticle ? activeArticle.title : activeCategory ? activeCategory.title : activeTag ? t('wiki_topic_label', { tag: activeTag }) : t('wiki_header_title')}
            </h2>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
            <LanguageSelector className="mr-1" />

            <div className={`hidden sm:flex bg-gray-100 dark:bg-gray-800 rounded-lg p-1 ${ (activeArticle || activeCategory || activeTag) ? 'opacity-0 pointer-events-none' : ''}`}>
                <button
                    onClick={handleSwitchToList}
                    className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    (viewMode === 'list' && !activeCategory) ? 'bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                >
                    <Icons.FileText className="w-3 h-3" /> {t('wiki_nav_list')}
                </button>
                <button
                    onClick={handleSwitchToIcons}
                    className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    (viewMode === 'icons' && !activeCategory) ? 'bg-white dark:bg-gray-700 shadow-sm text-black dark:text-white' : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                >
                    <Icons.LayoutGrid className="w-3 h-3" /> {t('wiki_nav_icons')}
                </button>
            </div>

            <button 
                onClick={onClose}
                className="text-gray-400 hover:text-red-600 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition"
            >
                <Icons.X className="w-6 h-6" />
            </button>
        </div>
      </div>

      <FeedbackRibbon />

      <div className="flex-1 overflow-hidden relative">
        
        {/* STATE 1: ICONS GRID (TAG CLOUD REPLACEMENT) */}
        {viewMode === 'icons' && !activeArticle && !activeCategory && !activeTag && (
            <div className="w-full h-full overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-8 duration-300">
                <div className="max-w-6xl mx-auto">
                     <div className="mb-8 text-center">
                         <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wiki_explore_cats')}</h3>
                         <p className="text-gray-600 dark:text-gray-400 mt-2">{t('wiki_explore_subtitle')}</p>
                     </div>
                     
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-20">
                        {tagCloudData.map(({ tag, count }) => {
                            const meta = TAG_METADATA[tag];
                            // If not in metadata, skip it (only showing specific image tags as requested)
                            if (!meta) return null;

                            return (
                                <button
                                    key={tag}
                                    onClick={() => handleTagClick(tag)}
                                    className={`
                                        group relative aspect-square rounded-[2rem] bg-white dark:bg-gray-800
                                        border-2 ${meta.border}
                                        flex flex-col items-center justify-center 
                                        shadow-sm hover:shadow-xl
                                        transition-all duration-300 hover:-translate-y-1
                                        overflow-hidden
                                    `}
                                >
                                    
                                    {/* Icon - Moved up slightly for label space */}
                                    <div className={`mb-8 transform group-hover:scale-110 transition-transform duration-300 ${meta.text}`}>
                                        {renderIcon(meta.icon as any, "w-12 h-12 md:w-16 md:h-16 stroke-[1.5]")}
                                    </div>

                                    {/* Count Indicator - representing Weight */}
                                    <div className={`absolute top-4 right-4 ${meta.badge} text-[10px] font-bold px-2 py-1 rounded-full z-20`}>
                                        {count}
                                    </div>

                                    {/* Label - ALWAYS VISIBLE */}
                                    <div className={`
                                        absolute inset-x-0 bottom-0 p-4 
                                        ${meta.hover} backdrop-blur-sm
                                        border-t ${meta.border}
                                        rounded-b-[2rem]
                                        flex items-center justify-center
                                    `}>
                                        <span className={`block text-center text-xs md:text-sm font-bold uppercase tracking-wider ${meta.text}`}>
                                            {tag}
                                        </span>
                                    </div>
                                </button>
                            );
                        })}
                     </div>
                </div>
            </div>
        )}

        {/* STATE 2: FULL SCREEN LIST INDEX */}
        {viewMode === 'list' && !activeArticle && !activeCategory && !activeTag && (
             <div className="w-full h-full overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-8 animate-in slide-in-from-right-4 duration-300">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6 text-center">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{t('wiki_full_index')}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mt-1">{t('wiki_full_index_subtitle')}</p>
                    </div>
                    {renderCategoryList(false)}
                </div>
             </div>
        )}

        {/* STATE 3: TOPIC/TAG VIEW */}
        {activeTag && !activeArticle && (
            <div className="w-full h-full overflow-y-auto bg-white dark:bg-gray-950 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className="w-full p-8 md:p-12 bg-gray-50 dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
                    <div className="max-w-4xl mx-auto flex items-center gap-6">
                         <div className="w-20 h-20 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center shadow-lg border border-gray-100 dark:border-gray-700 text-black dark:text-white">
                              <Icons.Tag className="w-10 h-10" />
                         </div>
                         <div>
                              <h1 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white capitalize tracking-tight">{activeTag}</h1>
                              <p className="text-gray-500 dark:text-gray-400 font-medium mt-1">{t('wiki_topic_desc')}</p>
                         </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto p-6 md:p-12 pb-24 space-y-12">
                    {wikiCategories.map(cat => {
                        const allArticles = cat.subsections.flatMap(s => s.articles);
                        const matches = allArticles.filter(a => a.tags.includes(activeTag));
                        if (matches.length === 0) return null;
                        
                        return (
                            <div key={cat.id} className="animate-in fade-in slide-in-from-bottom-2">
                                <h3 className={`flex items-center gap-3 font-bold uppercase tracking-wider text-sm mb-6 pb-2 border-b border-gray-100 dark:border-gray-800 ${cat.theme.text}`}>
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
                                                        ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20 hover:border-green-300' 
                                                        : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
                                                    }
                                                `}
                                            >
                                                <div className="flex justify-between items-start w-full">
                                                    <span className={`text-sm font-bold ${status==='done' ? 'text-green-600 dark:text-green-400' : 'text-gray-400 dark:text-gray-500 group-hover:text-black dark:group-hover:text-white'}`}>
                                                        {t('wiki_guide_prefix')} #{idx + 1}
                                                    </span>
                                                    {status === 'done' && <Icons.CheckCircle className="w-5 h-5 text-green-500" />}
                                                </div>
                                                <h4 className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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

        {/* STATE 4: CATEGORY LANDING PAGE */}
        {activeCategory && !activeArticle && !activeTag && (
            <div className="w-full h-full overflow-y-auto bg-white dark:bg-gray-950 animate-in fade-in slide-in-from-bottom-4 duration-300">
                <div className={`w-full p-8 md:p-12 ${activeCategory.theme.hoverBg} border-b ${activeCategory.theme.border}`}>
                    <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center md:items-end gap-6">
                        <div className={`p-6 bg-white dark:bg-gray-800 rounded-3xl shadow-lg border-2 ${activeCategory.theme.border} ${activeCategory.theme.text}`}>
                            {renderIcon(activeCategory.icon as any, "w-16 h-16")}
                        </div>
                        <div className="text-center md:text-left flex-1">
                            <h1 className={`text-3xl md:text-5xl font-black tracking-tight ${activeCategory.theme.text} mb-2`}>
                                {activeCategory.title}
                            </h1>
                            <div className="flex items-center justify-center md:justify-start gap-4 text-gray-600 dark:text-gray-300 font-medium">
                                <span className="flex items-center gap-1">
                                    <Icons.FileText className="w-4 h-4" /> 
                                    {activeCategory.subsections.reduce((acc, sub) => acc + sub.articles.length, 0)} {t('wiki_stat_articles')}
                                </span>
                                {getCategoryProgress(activeCategory) > 0 && (
                                    <span className="flex items-center gap-1 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/30 px-2 py-0.5 rounded-full border border-green-200 dark:border-green-800 text-sm font-bold">
                                        <Icons.CheckCircle className="w-4 h-4" /> {getCategoryProgress(activeCategory)}% {t('wiki_stat_complete')}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="max-w-4xl mx-auto p-6 md:p-12 pb-24">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6 px-1 flex items-center gap-2">
                        <Icons.List className="w-5 h-5 text-gray-400" />
                        {t('wiki_section_chapters')}
                    </h3>

                    <div className="space-y-10">
                        {activeCategory.subsections.map((sub, subIdx) => (
                            <div key={sub.title}>
                                <h4 className="text-sm font-bold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-4 px-1 border-b border-gray-100 dark:border-gray-800 pb-2">
                                    {sub.title}
                                </h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {sub.articles.map((article, idx) => {
                                        const itemData = progress.items[article.id];
                                        const status = itemData?.status;
                                        
                                        return (
                                            <button
                                                key={article.id}
                                                onClick={() => handleArticleClick(article)}
                                                className={`
                                                    text-left group flex flex-col gap-3 p-6 rounded-2xl border-2 transition-all duration-200
                                                    ${status === 'done' 
                                                        ? 'border-green-200 dark:border-green-800 bg-green-50/50 dark:bg-green-900/20 hover:border-green-300' 
                                                        : 'border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-md'
                                                    }
                                                `}
                                            >
                                                <div className="flex justify-between items-start w-full">
                                                    <span className={`
                                                        w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border
                                                        ${status === 'done' 
                                                            ? 'bg-green-500 text-white border-green-500' 
                                                            : 'bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 border-gray-200 dark:border-gray-700 group-hover:bg-gray-900 dark:group-hover:bg-white group-hover:text-white dark:group-hover:text-black group-hover:border-gray-900 dark:group-hover:border-white transition-colors'
                                                        }
                                                    `}>
                                                        {idx + 1}
                                                    </span>
                                                    {status === 'done' && <Icons.CheckCircle className="w-5 h-5 text-green-500" />}
                                                    {status === 'later' && <Icons.Clock className="w-5 h-5 text-amber-500" />}
                                                </div>
                                                
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
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
                                                                    className="text-[10px] uppercase font-bold text-gray-400 dark:text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition-colors"
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
                        ))}
                    </div>
                </div>
            </div>
        )}

        {/* STATE 5: READER (SPLIT VIEW) */}
        {activeArticle && (
            <div className="flex h-full relative animate-in fade-in duration-300">
                <div className={`
                    absolute inset-0 z-40 bg-gray-50 dark:bg-gray-900 flex flex-col transform transition-transform duration-300 ease-in-out
                    md:relative md:inset-auto md:transform-none md:w-80 md:border-r md:border-gray-100 dark:md:border-gray-800 md:flex
                    ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    <div className="p-4 overflow-y-auto h-full">
                        {renderCategoryList(true)}
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto relative bg-white dark:bg-gray-900 w-full" ref={contentRef}>
                    <div className="max-w-3xl mx-auto p-6 md:p-12 pb-32">
                        <div className="flex items-center justify-between gap-4 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-100 dark:border-gray-800">
                            <div className="flex flex-col gap-2">
                                <span className="text-sm font-mono text-blue-600 dark:text-blue-400 font-bold tracking-tight">
                                    {t('wiki_section_prefix')} {getCurrentDisplayId(activeArticle)}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {activeArticle.tags.map(tag => (
                                        <button 
                                            key={tag} 
                                            onClick={() => handleTagClick(tag)}
                                            className="bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide border border-gray-200 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 hover:text-black dark:hover:text-white transition-colors"
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => handleToggleStatus('later')}
                                    title={progress.items[activeArticle.id]?.status === 'later' ? t('wiki_btn_saved') : t('wiki_btn_later')}
                                    className={`p-3 rounded-full transition-all duration-200 border ${
                                        progress.items[activeArticle.id]?.status === 'later'
                                            ? 'bg-amber-100 dark:bg-amber-900/30 border-amber-200 dark:border-amber-700 text-amber-700 dark:text-amber-400 shadow-inner'
                                            : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 shadow-sm'
                                    }`}
                                >
                                    <Icons.Clock className="w-5 h-5" strokeWidth={2.5} />
                                </button>

                                <button
                                    onClick={() => handleToggleStatus('done')}
                                    title={progress.items[activeArticle.id]?.status === 'done' ? t('wiki_btn_completed') : t('wiki_btn_mark_done')}
                                    className={`p-3 rounded-full transition-all duration-200 border ${
                                        progress.items[activeArticle.id]?.status === 'done'
                                            ? 'bg-green-100 dark:bg-green-900/30 border-green-200 dark:border-green-700 text-green-700 dark:text-green-400 shadow-inner'
                                            : 'bg-white dark:bg-gray-900 border-gray-100 dark:border-gray-700 text-gray-400 dark:text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 hover:border-gray-300 shadow-sm'
                                    }`}
                                >
                                    {progress.items[activeArticle.id]?.status === 'done' 
                                        ? <Icons.CheckCircle className="w-5 h-5" strokeWidth={2.5} /> 
                                        : <Icons.CheckSquare className="w-5 h-5" strokeWidth={2.5} />
                                    }
                                </button>
                            </div>
                        </div>
                        
                        {/* NEW COMPOSITE VIEW: Summary + Content */}
                        {activeArticle.summary && (
                            <div className="mb-10 p-6 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border-l-4 border-blue-500 dark:border-blue-400">
                                <h3 className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                                    Quick Summary
                                </h3>
                                <p className="text-lg font-medium text-gray-800 dark:text-gray-200 leading-relaxed">
                                    {activeArticle.summary}
                                </p>
                            </div>
                        )}

                        <article className="prose prose-slate dark:prose-invert prose-sm md:prose-base max-w-none 
                            text-gray-900 dark:text-gray-200
                            prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-h1:text-2xl md:prose-h1:text-3xl prose-h1:tracking-tight
                            prose-h2:text-lg md:prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3
                            prose-p:text-gray-800 dark:prose-p:text-gray-300 prose-p:leading-relaxed
                            prose-a:text-blue-600 dark:prose-a:text-blue-400 hover:prose-a:text-blue-800 dark:hover:prose-a:text-blue-300
                            prose-li:text-gray-800 dark:prose-li:text-gray-300 prose-li:marker:text-gray-500
                            prose-strong:text-gray-900 dark:prose-strong:text-white
                            [&>ul]:pl-4 [&>ol]:pl-4">
                            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
                        </article>

                        {/* Explicit Navigation Footer */}
                        <div className="mt-16 pt-8 border-t border-gray-100 dark:border-gray-800 grid grid-cols-2 gap-4">
                            {prevArticle ? (
                                <button 
                                    onClick={() => handleArticleClick(prevArticle)}
                                    className="flex flex-col items-start p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition group text-left hover:border-gray-200 dark:hover:border-gray-700"
                                >
                                    <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-1">
                                        <Icons.ArrowLeft className="w-3 h-3" /> {t('wizard_btn_prev')}
                                    </span>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white leading-tight">
                                        {prevArticle.title}
                                    </span>
                                </button>
                            ) : <div />}

                            {nextArticle ? (
                                <button 
                                    onClick={() => handleArticleClick(nextArticle)}
                                    className="flex flex-col items-end p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 transition group text-right bg-gray-50/50 dark:bg-gray-900/50 hover:border-gray-200 dark:hover:border-gray-700"
                                >
                                    <span className="text-xs text-gray-400 dark:text-gray-500 uppercase tracking-wider font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 flex items-center gap-1">
                                        {t('wizard_btn_next')} <Icons.ArrowRight className="w-3 h-3" />
                                    </span>
                                    <span className="text-sm font-bold text-gray-700 dark:text-gray-300 group-hover:text-black dark:group-hover:text-white leading-tight">
                                        {nextArticle.title}
                                    </span>
                                </button>
                            ) : <div />}
                        </div>
                    </div>
                </div>

                {activeSentence && (
                    <div 
                        className="fixed z-50 sentence-popover animate-in fade-in zoom-in-95 duration-200"
                        style={{ 
                            left: Math.min(window.innerWidth - 60, Math.max(20, activeSentence.x - 25)), 
                            top: activeSentence.y - 50
                        }}
                    >
                        <button 
                            onClick={handleStartChat}
                            className="flex items-center justify-center w-10 h-10 bg-black text-white rounded-full shadow-xl hover:bg-gray-800 hover:scale-110 transition-all border-2 border-white dark:border-gray-800"
                            title={t('wiki_ctx_ask')}
                        >
                            <Icons.MessageSquare className="w-5 h-5" />
                        </button>
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
