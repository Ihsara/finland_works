
import { describe, it, expect } from 'vitest';
import { APP_IDS } from '../data/system/identifiers';
import { NAV_LINKS } from '../data/system/links';
import { AppView } from '../types';

describe('System Registry (UIS)', () => {
  
  // 1. Export Integrity Test
  // Ensures the aggregator is working and exporting the main branches
  it('should always export the root APP_IDS object with correct structure', () => {
    expect(APP_IDS).toBeDefined();
    expect(APP_IDS.SCENES).toBeDefined();
    expect(APP_IDS.VIEWS).toBeDefined();
    expect(APP_IDS.LINKS).toBeDefined();
  });

  // 2. Navigation Link Integrity Test (Destination)
  // Ensures that every link defined leads to a real Page/View in the app
  it('should ensure all Navigation Links point to valid AppViews', () => {
    const validViews = Object.values(AppView);
    
    Object.entries(NAV_LINKS).forEach(([triggerId, destinationView]) => {
      expect(validViews).toContain(destinationView);
    });
  });

  // 3. Referential Integrity Test (Source)
  // This is the most critical test. It ensures that if we say "Button X goes to Page Y",
  // Button X actually exists in our component registry.
  it('should ensure keys in NAV_LINKS exist in SCENE definitions', () => {
    // 1. Harvest all valid ID strings from the VIEWS registry
    const validIds = new Set<string>();
    
    // Recursive function to grab all strings from the nested VIEWS object
    const collectIds = (obj: any) => {
      Object.values(obj).forEach((value) => {
        if (typeof value === 'string') {
          validIds.add(value);
        } else if (typeof value === 'object' && value !== null) {
          collectIds(value);
        }
      });
    };

    collectIds(APP_IDS.VIEWS);

    // Manually add shared component IDs that might serve as triggers (e.g. Navbar items)
    // These are defined in APP_IDS.COMPONENTS usually, but might be used in links
    validIds.add('nav_profile');
    validIds.add('nav_dashboard');

    // 2. Check every link trigger against the harvest
    Object.keys(NAV_LINKS).forEach((triggerId) => {
      if (!validIds.has(triggerId)) {
        console.error(`Broken Link Detected: Trigger ID '${triggerId}' is defined in NAV_LINKS but not found in APP_IDS.VIEWS`);
      }
      expect(validIds.has(triggerId)).toBe(true);
    });
  });

  // 4. Collision Detection
  // Ensures we didn't accidentally copy-paste an ID string to two different constants
  it('should not have duplicate ID strings across different constants in the same scene', () => {
    Object.entries(APP_IDS.VIEWS).forEach(([sceneName, sceneObj]: [string, any]) => {
      const idsSeen = new Set<string>();
      
      Object.entries(sceneObj).forEach(([key, value]) => {
        // Skip function generators (dynamic IDs) and nested objects
        if (typeof value === 'string') {
          if (idsSeen.has(value)) {
            throw new Error(`Duplicate ID detected in Scene '${sceneName}': The ID '${value}' is used multiple times.`);
          }
          idsSeen.add(value);
        }
      });
    });
  });

  // 5. Structure Snapshot
  // Ensures important top-level keys exist (Prevent regression if files are deleted)
  it('should contain definitions for critical scenes', () => {
    expect(APP_IDS.VIEWS).toHaveProperty('LANDING');
    expect(APP_IDS.VIEWS).toHaveProperty('DASHBOARD');
    expect(APP_IDS.VIEWS).toHaveProperty('CHAT');
    expect(APP_IDS.VIEWS).toHaveProperty('WIKI');
  });
});
