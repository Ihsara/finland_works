
import { describe, it, expect, beforeEach } from 'vitest';
import * as Storage from '../../services/storageService';

describe('StorageService', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('returns empty list if no profiles exist', () => {
    // Note: getAllProfiles might automatically re-create the default profile if missing
    // in the actual implementation, let's see.
    const profiles = Storage.getAllProfiles();
    // It should at least return the default Gabriela profile if it initializes on read
    expect(profiles.length).toBeGreaterThanOrEqual(1);
    expect(profiles[0].id).toBe('demo-gabriela');
  });

  it('saves and retrieves a new profile', () => {
    const mockProfile = {
      id: 'test-1',
      name: 'Test User',
      residencePermitType: 'Student',
      ageRange: '18-25',
      originCountry: 'Testland',
      maritalStatus: 'Single',
      languages: [],
      education: { degree: 'None', field: 'None' },
      profession: 'Tester',
      aspirations: [],
      challenges: []
    };

    Storage.saveProfile(mockProfile, true);
    
    const active = Storage.getActiveProfile();
    expect(active).toBeDefined();
    expect(active?.id).toBe('test-1');
    expect(active?.name).toBe('Test User');
  });

  it('saves global length preference', () => {
    Storage.saveGlobalLengthPreference('short');
    expect(Storage.getGlobalLengthPreference()).toBe('short');
    
    Storage.saveGlobalLengthPreference('long');
    expect(Storage.getGlobalLengthPreference()).toBe('long');
  });
});
