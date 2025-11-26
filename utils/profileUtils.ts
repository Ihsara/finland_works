import { UserProfile } from '../types';

export const getAvatarUrl = (p: UserProfile | null) => {
  if (!p) return `https://api.dicebear.com/9.x/micah/svg?seed=Guest&backgroundColor=transparent`;

  // FIXED: Specific Override for the Demo Profile "Gabriela" to ensure she looks female and matches her bio.
  // Gabriela is Brazilian, female, 26-35. We use a curated config to prevent random male assignment.
  if (p.id === 'demo-gabriela') {
     return `https://api.dicebear.com/9.x/micah/svg?seed=GabrielaFixed&facialHairProbability=0&hair=full&mouth=smile&baseColor=f9c9b6&earringsProbability=40`;
  }

  // Dynamic Generation for other profiles
  // We include name, ageRange, and originCountry in the seed.
  // This ensures that if a user edits their age in the wizard (e.g. 18-25 vs 51+), 
  // the avatar visually updates, giving feedback that the profile has changed.
  const name = p.name || 'Guest';
  const ageInfo = p.ageRange || '';
  const originInfo = p.originCountry || '';
  
  // Combine fields to create a unique visual seed based on their specific demographics
  const seedString = `${name}-${originInfo}-${ageInfo}-${p.id}`;
  const seed = encodeURIComponent(seedString);

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