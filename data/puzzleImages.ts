
export interface PuzzleImageDef {
  id: string;
  url: string;
  alt: string;
}

export const PUZZLE_IMAGES: Record<string, PuzzleImageDef> = {
  'vantaa_iso': {
    id: 'vantaa_iso',
    // Fallback to a reliable remote image since local file is missing
    url: 'https://images.unsplash.com/photo-1516216628259-222df9c43d44?q=80&w=2070&auto=format&fit=crop', 
    alt: 'Isometric City View'
  },
  'helsinki_iso': {
    id: 'helsinki_iso',
    // Fallback to a reliable remote image
    url: 'https://images.unsplash.com/photo-1538332536281-2130b9536c9a?q=80&w=2069&auto=format&fit=crop', 
    alt: 'Helsinki Winter Mood'
  },
  'lapland_aurora': {
    id: 'lapland_aurora',
    url: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?q=80&w=2070&auto=format&fit=crop',
    alt: 'Northern Lights in Lapland'
  },
  'lakeland_summer': {
    id: 'lakeland_summer',
    url: 'https://images.unsplash.com/photo-1504198266287-16594a975254?q=80&w=2070&auto=format&fit=crop',
    alt: 'Finnish Lakeland Summer'
  },
  'archipelago': {
    id: 'archipelago',
    url: 'https://images.unsplash.com/photo-1473862213733-4c920ba497e6?q=80&w=2070&auto=format&fit=crop',
    alt: 'Baltic Sea Archipelago'
  }
};

export const DEFAULT_PUZZLE_ID = 'vantaa_iso';

export const getRandomPuzzleImageId = (excludeId?: string): string => {
  const keys = Object.keys(PUZZLE_IMAGES);
  // Filter out exclusion if provided
  const available = excludeId ? keys.filter(k => k !== excludeId) : keys;
  
  if (available.length === 0) return DEFAULT_PUZZLE_ID;
  
  const randomIndex = Math.floor(Math.random() * available.length);
  return available[randomIndex];
};

export const getPuzzleImageById = (id?: string): PuzzleImageDef => {
  return PUZZLE_IMAGES[id || DEFAULT_PUZZLE_ID] || PUZZLE_IMAGES[DEFAULT_PUZZLE_ID];
};
