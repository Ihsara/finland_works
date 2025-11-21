import { UserProfile } from '../types';

export const getAvatarUrl = (p: UserProfile | null) => {
  const name = p?.name || 'Guest';
  // Seed composition: Name + Country + Age + ID to ensure diversity even with similar names
  const extraSeed = (p?.originCountry || '') + (p?.ageRange || '') + (p?.id || '');
  const seed = encodeURIComponent(name + extraSeed);
  return `https://api.dicebear.com/9.x/micah/svg?seed=${seed}&backgroundColor=transparent`;
};

export const calculateProfileCompleteness = (p: UserProfile | null): number => {
  if (!p) return 0;
  
  const fields = [
    p.name,
    p.ageRange,
    p.originCountry,
    p.residencePermitType,
    p.maritalStatus,
    p.profession,
    p.education?.degree,
    p.languages?.length > 0 ? 'yes' : '',
    p.aspirations?.length > 0 ? 'yes' : ''
  ];
  
  // Filter out empty or placeholder values
  const filled = fields.filter(f => f && f !== 'Unknown').length;
  const total = fields.length;
  
  return Math.round((filled / total) * 100);
};