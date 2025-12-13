
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach, beforeEach } from 'vitest';
import { DashboardView } from '../components/views/DashboardView';
import { GUEST_PROFILE } from '../types';
import * as LanguageContextModule from '../contexts/LanguageContext';

// Mock Translation
const useLanguageSpy = vi.spyOn(LanguageContextModule, 'useLanguage');
const mockT = (key: string) => {
    const map: Record<string, string> = {
        'dash_sect_guides_title': 'STEP-BY-STEP GUIDES',
        'dash_card_guide_cv': 'How to write Finnish CV',
        'dash_card_guide_tax': 'How to get a tax card',
        'dash_card_guide_kela': 'How to get a Kela card'
    };
    return map[key] || key;
};

describe('Dashboard Guides Section', () => {
  const mockNavigateToWiki = vi.fn();

  beforeEach(() => {
    useLanguageSpy.mockReturnValue({
      language: 'en',
      setLanguage: vi.fn(),
      t: mockT,
      headingFont: 'font-sans'
    });
  });

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  const renderDashboard = () => {
      render(
        <DashboardView 
          profile={GUEST_PROFILE}
          profileCompleteness={0}
          onNavigateToProfile={vi.fn()}
          onNavigateToWiki={mockNavigateToWiki}
          onNavigateToQuiz={vi.fn()}
          onStartChat={vi.fn()}
          onNavigateToPlan={vi.fn()}
          onNavigateToSettings={vi.fn()}
          onNavigateToLanding={vi.fn()}
        />
      );
  };

  it('renders the Step-by-Step Guides section', () => {
    renderDashboard();
    expect(screen.getByText('STEP-BY-STEP GUIDES')).toBeInTheDocument();
  });

  it('navigates to CV guide when CV card is clicked', () => {
    renderDashboard();
    const cvCard = screen.getByText('How to write Finnish CV');
    fireEvent.click(cvCard);
    expect(mockNavigateToWiki).toHaveBeenCalledWith('job_cv_tips');
  });

  it('navigates to Tax guide when Tax card is clicked', () => {
    renderDashboard();
    const taxCard = screen.getByText('How to get a tax card');
    fireEvent.click(taxCard);
    expect(mockNavigateToWiki).toHaveBeenCalledWith('bureaucracy_tax');
  });

  it('navigates to Kela guide when Kela card is clicked', () => {
    renderDashboard();
    const kelaCard = screen.getByText('How to get a Kela card');
    fireEvent.click(kelaCard);
    expect(mockNavigateToWiki).toHaveBeenCalledWith('social_kela_card');
  });
});
