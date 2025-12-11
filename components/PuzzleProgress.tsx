
import React, { useState, useEffect } from 'react';
import { Icons } from './Icon';

export interface PuzzleModule {
  id: string;
  title: string;
  icon: string;
  percent: number;
  total: number;
  completed: number;
}

interface PuzzleProgressProps {
  modules: PuzzleModule[];
  imageUrl?: string;
}

export const PuzzleProgress: React.FC<PuzzleProgressProps> = ({ modules, imageUrl }) => {
  const allComplete = modules.every(m => m.percent === 100);
  const [imageStatus, setImageStatus] = useState<'loading' | 'loaded' | 'error'>('loading');
  
  // Clean effect when imageUrl changes
  useEffect(() => {
    if (!imageUrl) return;
    
    setImageStatus('loading');
    const img = new Image();
    img.src = imageUrl;
    
    if (img.complete) {
        setImageStatus('loaded');
        return;
    }
    
    img.onload = () => setImageStatus('loaded');
    img.onerror = () => {
        console.error(`Failed to load puzzle image at: ${imageUrl}`);
        setImageStatus('error');
    };
  }, [imageUrl]);

  return (
    <div className="w-full relative overflow-hidden rounded-[2rem] shadow-2xl border-4 border-gray-900/10 dark:border-white/10 aspect-[4/3] sm:aspect-[2/1] md:aspect-[2.5/1] bg-gray-900 group">
      
      {/* 1. The "Big Picture" (Underneath) */}
      <div className="absolute inset-0 z-0 bg-[#1a233b]">
         
         {/* A. Actual Image */}
         {imageStatus === 'loaded' && imageUrl && (
             <img 
                src={imageUrl} 
                alt="Finland Landscape" 
                className={`w-full h-full object-cover transition-all duration-1000 ${allComplete ? 'scale-100 blur-0' : 'scale-105 blur-[1px]'}`}
             />
         )}

         {/* B. Loading Skeleton */}
         {imageStatus === 'loading' && (
             <div className="absolute inset-0 bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse flex items-center justify-center">
                 <Icons.Image className="w-12 h-12 text-gray-700 animate-bounce" />
             </div>
         )}

         {/* C. Error / Missing File State */}
         {imageStatus === 'error' && (
             <div className="absolute inset-0 bg-gray-800 flex flex-col items-center justify-center text-center p-4">
                 <Icons.ImageOff className="w-12 h-12 text-gray-500 mb-2" />
                 <p className="text-gray-400 font-bold text-sm">Image Not Found</p>
                 <p className="text-gray-600 text-xs font-mono mt-1">{imageUrl}</p>
                 <p className="text-yellow-500 text-[10px] mt-2 max-w-xs">
                    Please save your image file to <b>public{imageUrl}</b>
                 </p>
             </div>
         )}
         
         {/* Overlay to ensure icons pop even on completed image */}
         <div className={`absolute inset-0 bg-black/20 transition-opacity duration-1000 ${allComplete ? 'opacity-0' : 'opacity-20'}`}></div>
      </div>

      {/* 2. SISU Overlay (Only when 100% complete) */}
      <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center transition-opacity duration-1000 pointer-events-none ${allComplete ? 'opacity-100 delay-500' : 'opacity-0'}`}>
          <h1 className="text-6xl md:text-9xl font-black text-white tracking-widest drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] animate-in zoom-in duration-1000">
              SISU
          </h1>
      </div>

      {/* 3. The Grid of Modules */}
      <div className="absolute inset-0 z-20 grid grid-cols-2 sm:grid-cols-4 gap-0">
        {modules.map((module) => {
          const isDone = module.percent === 100;
          const Icon = (Icons as any)[module.icon] || Icons.Star;
          
          // Calculate circumference for SVG circle
          const radius = 18;
          const circumference = 2 * Math.PI * radius;
          const strokeDashoffset = circumference - (module.percent / 100) * circumference;

          return (
            <div 
              key={module.id}
              className="relative flex items-center justify-center overflow-hidden border-r border-b border-white/5 last:border-0"
            >
               {/* 
                  The "Cover" Tile. 
                  - If NOT done: It is a dark, blurry block hiding the image.
                  - If DONE: It fades out completely (opacity-0).
               */}
               <div className={`
                  absolute inset-0 bg-[#1a233b] transition-all duration-1000 ease-in-out
                  ${isDone ? 'opacity-0 scale-150' : 'opacity-95 backdrop-blur-md'}
               `}></div>

               {/* The Content (Icon & Ring) */}
               <div className="relative z-10 flex flex-col items-center justify-center">
                   
                   <div className="relative w-16 h-16 flex items-center justify-center">
                       {/* Floating Icon (Always visible, but changes style) */}
                       <Icon 
                          className={`
                            transition-all duration-700
                            ${isDone 
                                ? 'w-8 h-8 text-white/40 drop-shadow-md scale-75' // Subtle watermark when done
                                : 'w-6 h-6 text-gray-400' // Standard when locked
                            }
                            ${module.percent > 0 && !isDone ? 'text-white' : ''} // Bright when in progress
                          `} 
                       />

                       {/* Progress Ring (Only if started but not finished) */}
                       {!isDone && module.percent > 0 && (
                           <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none">
                               {/* Track */}
                               <circle
                                   cx="32" cy="32" r={radius}
                                   fill="transparent"
                                   stroke="currentColor"
                                   strokeWidth="3"
                                   className="text-white/10"
                               />
                               {/* Progress Bar with Glow */}
                               <circle
                                   cx="32" cy="32" r={radius}
                                   fill="transparent"
                                   stroke="url(#gradient-glow)"
                                   strokeWidth="3"
                                   strokeDasharray={circumference}
                                   strokeDashoffset={strokeDashoffset}
                                   strokeLinecap="round"
                                   className="transition-all duration-1000 ease-out drop-shadow-[0_0_4px_rgba(56,189,248,0.8)]"
                               />
                               <defs>
                                   <linearGradient id="gradient-glow" x1="0%" y1="0%" x2="100%" y2="0%">
                                       <stop offset="0%" stopColor="#38bdf8" />
                                       <stop offset="100%" stopColor="#818cf8" />
                                   </linearGradient>
                               </defs>
                           </svg>
                       )}
                   </div>
               </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
