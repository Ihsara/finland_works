
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
  const [imageLoaded, setImageLoaded] = useState(false);
  const [currentImage, setCurrentImage] = useState(imageUrl);

  // Fallback image if local one fails or isn't provided
  const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1538332576228-eb5b4c4de6f5?q=80&w=2070&auto=format&fit=crop";

  useEffect(() => {
    setCurrentImage(imageUrl || FALLBACK_IMAGE);
  }, [imageUrl]);

  useEffect(() => {
    if (!currentImage) return;
    
    const img = new Image();
    img.src = currentImage;
    
    // If the image is already cached by the browser, don't show the loading skeleton
    if (img.complete) {
        setImageLoaded(true);
        return;
    }
    
    setImageLoaded(false);
    
    img.onload = () => {
      setImageLoaded(true);
    };
    
    img.onerror = () => {
        // If the local image (e.g. /images/helsinki.png) fails, switch to fallback
        if (currentImage !== FALLBACK_IMAGE) {
            console.warn(`Failed to load puzzle image: ${currentImage}. Reverting to fallback.`);
            setCurrentImage(FALLBACK_IMAGE);
        }
    };
  }, [currentImage]);

  return (
    <div className="w-full relative overflow-hidden rounded-[2rem] shadow-2xl border-4 border-gray-900/10 dark:border-white/10 aspect-[4/3] sm:aspect-[2/1] md:aspect-[2.5/1] bg-gray-900 group">
      
      {/* 1. The "Big Picture" (Underneath) - Lazy Loaded with Fallback */}
      <div className="absolute inset-0 z-0 bg-[#1a233b]">
         {/* Skeleton / Loading State */}
         <div className={`absolute inset-0 transition-opacity duration-700 ${imageLoaded ? 'opacity-0' : 'opacity-100'}`}>
             <div className="w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 animate-pulse"></div>
         </div>

         {/* Actual Image */}
         {currentImage && (
             <img 
                src={currentImage} 
                alt="Finland Landscape" 
                className={`w-full h-full object-cover transition-all duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'} ${allComplete ? 'scale-100 blur-0' : 'scale-105 blur-[1px]'}`}
             />
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
      <div className="absolute inset-0 z-20 grid grid-cols-2 sm:grid-cols-4 gap-[2px]">
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
              className="relative flex items-center justify-center overflow-hidden"
            >
               {/* 
                  The "Cover" Tile. 
                  - If NOT done: It is a dark, blurry block hiding the image.
                  - If DONE: It fades out completely (opacity-0).
               */}
               <div className={`
                  absolute inset-0 bg-[#1a233b] transition-all duration-1000 ease-in-out border border-white/5
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
