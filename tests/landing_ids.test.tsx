
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LandingView } from '../components/views/LandingView';
import { APP_IDS } from '../data/system/identifiers';
import { GUEST_PROFILE } from '../types';

// Mock language context
vi.mock('../contexts/LanguageContext', () => ({
  useLanguage: () => ({ t: (key: string) => key })
}));

describe('Landing View - System ID Compliance', () => {
  const mockProps = {
    profile: null,
    onStartQuiz: vi.fn(),
    onOpenGuide: vi.fn(),
    onBrowseWiki: vi.fn(),
    onStartChat: vi.fn(),
    onLoadDemo: vi.fn(),
    onReset: vi.fn(),
    onClearKey: vi.fn(),
    onSetGuest: vi.fn()
  };

  it('renders all primary interactive elements with correct System IDs', () => {
    render(<LandingView {...mockProps} />);

    // Primary Buttons (Cards)
    expect(screen.getByTestId(APP_IDS.VIEWS.LANDING.BTN_BROWSE)).toBeInTheDocument();
    expect(screen.getByTestId(APP_IDS.VIEWS.LANDING.BTN_QUIZ)).toBeInTheDocument();
    expect(screen.getByTestId(APP_IDS.VIEWS.LANDING.BTN_CHAT)).toBeInTheDocument();
    
    // Header
    expect(screen.getByTestId(APP_IDS.VIEWS.LANDING.HERO_TITLE)).toBeInTheDocument();
  });

  it('renders footer links with correct System IDs', () => {
    render(<LandingView {...mockProps} />);

    const sampleBtn = screen.getByTestId(APP_IDS.VIEWS.LANDING.LINK_SAMPLE);
    const resetBtn = screen.getByTestId(APP_IDS.VIEWS.LANDING.LINK_RESET);
    const keyBtn = screen.getByTestId(APP_IDS.VIEWS.LANDING.LINK_KEY);

    expect(sampleBtn).toBeInTheDocument();
    expect(resetBtn).toBeInTheDocument();
    expect(keyBtn).toBeInTheDocument();

    // Verify functionality
    fireEvent.click(sampleBtn);
    expect(mockProps.onLoadDemo).toHaveBeenCalled();
  });

  it('renders Continue button ID when profile exists', () => {
    render(<LandingView {...mockProps} profile={{...GUEST_PROFILE, id: 'user-123'}} />);
    
    // Should NOT have Quiz ID
    expect(screen.queryByTestId(APP_IDS.VIEWS.LANDING.BTN_QUIZ)).not.toBeInTheDocument();
    // Should HAVE Continue ID
    expect(screen.getByTestId(APP_IDS.VIEWS.LANDING.BTN_CONTINUE)).toBeInTheDocument();
  });
});
