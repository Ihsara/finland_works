import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { LandingView } from './LandingView';
import { GUEST_PROFILE } from '../../types';

describe('LandingView', () => {
  const mockProps = {
    language: 'en' as const,
    profile: null,
    onLanguageSelect: vi.fn(),
    onStartQuiz: vi.fn(),
    onOpenGuide: vi.fn(),
    onStartChat: vi.fn(),
    onLoadDemo: vi.fn(),
    onReset: vi.fn(),
    onClearKey: vi.fn(),
    onSetGuest: vi.fn()
  };

  it('renders the main welcome message', () => {
    render(<LandingView {...mockProps} />);
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Find your way to work in Finland')).toBeInTheDocument();
  });

  // USAGE TEST: Guest Flow
  it('renders the "Browse the Guide" button for users without a profile', () => {
    render(<LandingView {...mockProps} />);
    const browseBtn = screen.getByText('Browse the Guide');
    expect(browseBtn).toBeInTheDocument();
    
    fireEvent.click(browseBtn);
    // It should set guest profile AND open guide
    expect(mockProps.onSetGuest).toHaveBeenCalledWith(GUEST_PROFILE);
    expect(mockProps.onOpenGuide).toHaveBeenCalled();
  });

  // USAGE TEST: Profile Flow
  it('renders "Explore My Guide" instead of Quiz if profile exists', () => {
    render(<LandingView {...mockProps} profile={{ ...GUEST_PROFILE, id: '123', name: 'Test' }} />);
    expect(screen.getByText('Explore My Guide')).toBeInTheDocument();
    expect(screen.queryByText('Tell me about yourself')).not.toBeInTheDocument();
  });
});
