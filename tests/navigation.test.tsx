
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { NavigationLinks } from '../components/NavigationLinks';
import { ProfileDetailView } from '../components/views/ProfileDetailView';
import { AppView, GUEST_PROFILE } from '../types';
import { APP_IDS } from '../data/system/identifiers';
import * as LanguageContextModule from '../contexts/LanguageContext';

// Mock Translation
const useLanguageSpy = vi.spyOn(LanguageContextModule, 'useLanguage');
const mockT = (key: string) => key;

describe('Navigation & User Flow', () => {
  
  beforeEach(() => {
    useLanguageSpy.mockReturnValue({
      language: 'en',
      setLanguage: vi.fn(),
      t: mockT
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  describe('Global Navigation Bar', () => {
    it('renders the three core pillars: Guide, Chat, and Plan', () => {
      render(
        <NavigationLinks 
          currentView={AppView.DASHBOARD} 
          onNavigate={vi.fn()} 
        />
      );

      expect(screen.getByTestId(APP_IDS.VIEWS.GLOBAL_NAV.LINK_KB)).toBeInTheDocument();
      expect(screen.getByTestId(APP_IDS.VIEWS.GLOBAL_NAV.LINK_CHAT)).toBeInTheDocument();
      expect(screen.getByTestId(APP_IDS.VIEWS.GLOBAL_NAV.LINK_PLAN)).toBeInTheDocument();
    });

    it('highlights the active view correctly', () => {
      render(
        <NavigationLinks 
          currentView={AppView.CHAT} 
          onNavigate={vi.fn()} 
        />
      );

      const chatLink = screen.getByTestId(APP_IDS.VIEWS.GLOBAL_NAV.LINK_CHAT);
      // Check for active class styling (bg-white is used for active state in the component)
      expect(chatLink.className).toContain('bg-white');
    });

    it('triggers navigation callback on click', () => {
      const handleNav = vi.fn();
      render(
        <NavigationLinks 
          currentView={AppView.DASHBOARD} 
          onNavigate={handleNav} 
        />
      );

      fireEvent.click(screen.getByTestId(APP_IDS.VIEWS.GLOBAL_NAV.LINK_PLAN));
      expect(handleNav).toHaveBeenCalledWith(AppView.PROFILE);
    });
  });

  describe('The "My Plan" Loop (Profile View)', () => {
    // Rule: Guests must be prompted to take the quiz
    it('shows the "Take Quiz" CTA for Guest users accessing Profile', () => {
      render(
        <ProfileDetailView 
          profile={GUEST_PROFILE}
          profileCompleteness={0}
          allProfiles={[]}
          onNavigateBack={vi.fn()}
          onSwitchProfile={vi.fn()}
          onCreateProfile={vi.fn()}
          onEditVisual={vi.fn()}
          onEditYaml={vi.fn()}
          onNavigateToWiki={vi.fn()}
        />
      );

      // Should verify the Empty State ID exists
      expect(screen.getByTestId(APP_IDS.VIEWS.PROFILE.BTN_TAKE_QUIZ)).toBeInTheDocument();
      // Should NOT show specific profile details
      expect(screen.queryByText('profile_sect_languages')).not.toBeInTheDocument();
    });

    // Rule: Authenticated users see their data
    it('shows the Profile Details for a real user', () => {
      const realProfile = {
        ...GUEST_PROFILE,
        id: 'user-123',
        name: 'Test User',
        residencePermitType: 'Student'
      };

      render(
        <ProfileDetailView 
          profile={realProfile}
          profileCompleteness={50}
          allProfiles={[realProfile]}
          onNavigateBack={vi.fn()}
          onSwitchProfile={vi.fn()}
          onCreateProfile={vi.fn()}
          onEditVisual={vi.fn()}
          onEditYaml={vi.fn()}
          onNavigateToWiki={vi.fn()}
        />
      );

      expect(screen.queryByTestId(APP_IDS.VIEWS.PROFILE.BTN_TAKE_QUIZ)).not.toBeInTheDocument();
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
  });
});
