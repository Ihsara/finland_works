
import React, { useState, useEffect } from 'react';
import { Icons } from './Icon';
import { WIKI_CATEGORIES, WikiCategory, WikiArticle } from '../data/wikiContent';
import { marked } from 'marked';
import { UserProfile } from '../types';
import * as Storage from '../services/storageService';
import { WikiProgressData } from '../services/storageService';

interface WikiViewProps {
  onClose: () => void;
  profile: UserProfile | null;
}

type ViewMode = 'list' | 'icons';

const WikiView: React.FC<WikiViewProps> = ({ onClose, profile }) => {
  const [activeArticle, setActiveArticle] = useState<WikiArticle | null>(null);
  const [openCategories, setOpenCategories] = useState<Record<string, boolean>>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // View Mode State - Defaults to ICONS as requested
  const [viewMode, setViewMode] = useState<ViewMode>('icons');

  // Progress State
  const [progress, setProgress] = useState<WikiProgressData>({ 
    items: {}, 
    globalStats: { totalSessions: 0, firstSessionAt: 0, lastSessionAt: 0, sessionsWithoutUpdate: 0 } 
  });

  // Initialize
  useEffect(() => {
    if (!profile) {
      const initialOpen: Record<string, boolean> = {};
      WIKI_CATEGORIES.forEach(c => initialOpen[c.id] = true);
      setOpenCategories(initialOpen);
      return;
    }

    Storage.trackWikiSession(profile.id);
    const savedProgress = Storage.getWikiProgress(profile.id);
    setProgress(savedProgress);

    const userTags = getUserTags(profile);
    const initialOpen: Record<string, boolean> = {};
    
    WIKI_CATEGORIES.forEach(cat => {
      const hasRelevant = cat.articles.some(a => 
        a.tags.some(t => userTags.has(t) || t === 'mandatory')
      );
      if (hasRelevant || cat === WIKI_CATEGORIES[0]) {
        initialOpen[cat.id] = true;
      }
    });
    setOpenCategories(initialOpen);

    // NOTE: Auto-selection removed to support "Navigation First" UX
  }, [profile]);

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
    for(let i=0; i<WIKI_CATEGORIES.length; i++) {
        const cat = WIKI_CATEGORIES[i];
        const idx = cat.articles.findIndex(a => a.id === article.id);
        if (idx !== -1) return `${i+1}.${idx+1}`;
    }
    return "";
  };

  const handleArticleClick = (article: WikiArticle) => {
    setActiveArticle(article);
    setIsMobileMenuOpen(false); 
    // Note: We don't need to set viewMode here because activeArticle != null implies Reader View
  };

  const handleIconCategoryClick = (catId: string) => {
      // When clicking a big icon, we open that category and switch to FULL LIST view
      setOpenCategories({ [catId]: true });
      setViewMode('list');
      setActiveArticle(null); // Ensure we see the list, not a specific article
  };

  const handleSwitchToIcons = () => {
      setViewMode('icons');
      setActiveArticle(null);
  };

  const handleSwitchToList = () => {
      setViewMode('list');
      setActiveArticle(null);
  };

  // Reusable list renderer for both Sidebar (Reader) and Full Screen List
  const renderCategoryList = (isSidebar: boolean = false) => {
    return (
      <div className={`space-y-4 ${isSidebar ? 'pb-20' : 'pb-10'}`}>
         {WIKI_CATEGORIES.map((category, catIndex) => {
            const isOpen = openCategories[category.id];
            const catProgress = getCategoryProgress(category);
            const catNumber = catIndex + 1;

            return (
                <div key={category.id} className={`select-none ${!isSidebar ? 'bg-white rounded-xl p-2 border border-transparent hover:border-gray-100 transition-colors' : ''}`}>
                    <button 
                        onClick={() => toggleCategory(category.id)}
                        className={`flex items-center justify-between w-full group ${isSidebar ? 'mb-2' : 'mb-2 p-2'}`}
                    >
                        <div className="flex items-center gap-3 font-bold text-gray-700 group-hover:text-black">
                            <span className="text-xs text-gray-400 font-mono w-5">{catNumber}.</span>
                            {renderIcon(category.icon as any, "w-5 h-5 text-gray-400 group-hover:text-gray-600")}
                            <span className="text-sm uppercase tracking-wide truncate">{category.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            {catProgress > 0 && (
                                <span className="text-[10px] font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                    {catProgress}%
                                </span>
                            )}
                            {isOpen ? <Icons.ChevronDown className="w-4 h-4 text-gray-400"/> : <Icons.ChevronRight className="w-4 h-4 text-gray-400"/>}
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
                                        onClick={() => handleArticleClick(article)}
                                        className={`w-full text-left px-3 py-3 rounded-md flex items-start gap-3 transition text-sm ${
                                            isActive && isSidebar
                                                ? 'bg-white shadow-sm text-blue-700 font-medium ring-1 ring-gray-100' 
                                                : 'text-gray-600 hover:bg-gray-100/50 hover:text-gray-900'
                                        }`}
                                    >
                                        <span className={`mt-0.5 flex-shrink-0 ${isActive ? 'text-blue-500' : 'text-gray-400'}`}>
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
      <div className="flex-shrink-0 px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-white z-50 shadow-sm md:px-6 md:py-4">
        <div className="flex items-center gap-3">
          {/* Mobile Menu Toggle (Only in Reader Mode) */}
          {activeArticle && (
            <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
                {isMobileMenuOpen ? <Icons.ChevronDown className="w-6 h-6" /> : <Icons.MessageSquare className="w-6 h-6 rotate-90" />} 
            </button>
          )}
          
          <div className="bg-black p-1.5 md:p-2 rounded-lg text-white shadow-sm">
            <Icons.Languages className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-gray-900 text-base md:text-lg leading-tight line-clamp-1">Finland Works!</h2>
            <p className="text-[10px] md:text-xs text-gray-500 hidden sm:block">
              {profile ? `Curated for ${profile.name}` : 'Essential guide'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
            {/* View Mode Toggles */}
            <div className="hidden sm:flex bg-gray-100 rounded-lg p-1">
                <button
                    onClick={handleSwitchToList}
                    className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    (viewMode === 'list' || activeArticle) ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <Icons.FileText className="w-3 h-3" /> List
                </button>
                <button
                    onClick={handleSwitchToIcons}
                    className={`flex items-center justify-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${
                    (viewMode === 'icons' && !activeArticle) ? 'bg-white shadow-sm text-black' : 'text-gray-500 hover:text-gray-700'
                    }`}
                >
                    <Icons.LayoutGrid className="w-3 h-3" /> Icons
                </button>
            </div>

            <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 p-2 hover:bg-gray-100 rounded-full transition"
            >
                <Icons.X className="w-6 h-6" />
            </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden relative">
        
        {/* 
            STATE 1: ICONS GRID 
            Conditions: Icons Mode AND No Article Selected
        */}
        {viewMode === 'icons' && !activeArticle && (
            <div className="w-full h-full overflow-y-auto bg-gray-50 p-4 md:p-8 animate-in fade-in zoom-in-95 duration-300">
                <div className="max-w-6xl mx-auto">
                     <div className="mb-8 text-center">
                         <h3 className="text-2xl font-bold text-gray-900">Explore Categories</h3>
                         <p className="text-gray-500 mt-2">Select a topic to dive into the details.</p>
                     </div>
                     <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 pb-20">
                        {WIKI_CATEGORIES.map((category) => {
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
                                        <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-[10px] font-bold px-2 py-1 rounded-full">
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
            Conditions: List Mode AND No Article Selected
        */}
        {viewMode === 'list' && !activeArticle && (
             <div className="w-full h-full overflow-y-auto bg-gray-50 p-4 md:p-8 animate-in slide-in-from-right-4 duration-300">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-6 text-center">
                        <h3 className="text-2xl font-bold text-gray-900">Full Index</h3>
                        <p className="text-gray-500 mt-1">Browse all topics below.</p>
                    </div>
                    {renderCategoryList(false)}
                </div>
             </div>
        )}

        {/* 
            STATE 3: READER (SPLIT VIEW)
            Conditions: Article Selected (regardless of viewMode state)
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
                <div className="flex-1 overflow-y-auto relative bg-white w-full">
                    <div className="max-w-3xl mx-auto p-6 md:p-12 pb-32">
                        {/* Article Header */}
                        <div className="flex flex-col gap-6 mb-6 md:mb-8 pb-6 md:pb-8 border-b border-gray-100">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="text-sm font-mono text-blue-500 font-bold">
                                        Section {getCurrentDisplayId(activeArticle)}
                                    </span>
                                    <div className="flex flex-wrap gap-2">
                                        {activeArticle.tags.map(tag => (
                                            <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-[10px] md:text-xs font-medium uppercase tracking-wide">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 w-full md:w-auto">
                                    <button
                                        onClick={() => handleToggleStatus('later')}
                                        className={`flex-1 md:flex-none justify-center flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold transition border shadow-sm ${
                                            progress.items[activeArticle.id]?.status === 'later'
                                                ? 'bg-amber-50 border-amber-200 text-amber-700'
                                                : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'
                                        }`}
                                    >
                                        <Icons.Clock className="w-3 h-3" />
                                        {progress.items[activeArticle.id]?.status === 'later' ? 'Saved' : 'Later'}
                                    </button>

                                    <button
                                        onClick={() => handleToggleStatus('done')}
                                        className={`flex-1 md:flex-none justify-center flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold transition border shadow-sm ${
                                            progress.items[activeArticle.id]?.status === 'done'
                                                ? 'bg-green-50 border-green-200 text-green-700'
                                                : 'bg-black border-black text-white hover:bg-gray-800'
                                        }`}
                                    >
                                        <Icons.CheckSquare className="w-3 h-3" />
                                        {progress.items[activeArticle.id]?.status === 'done' ? 'Completed' : 'Mark Done'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        {/* Markdown Content */}
                        <article className="prose prose-slate prose-sm md:prose-base max-w-none 
                            prose-headings:font-bold prose-h1:text-2xl md:prose-h1:text-3xl prose-h1:tracking-tight
                            prose-h2:text-lg md:prose-h2:text-xl prose-h2:mt-6 prose-h2:mb-3
                            prose-p:text-gray-700 prose-p:leading-relaxed
                            prose-a:text-blue-600 hover:prose-a:text-blue-800 
                            prose-li:marker:text-gray-300
                            [&>ul]:pl-4 [&>ol]:pl-4">
                            <div dangerouslySetInnerHTML={{ __html: marked.parse(activeArticle.content) as string }} />
                        </article>
                    </div>
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default WikiView;
