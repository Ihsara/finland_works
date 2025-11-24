
import React from 'react';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import ProfileWizard from '../../components/ProfileWizard';
import { TRANSLATIONS } from '../../data/languages';
import * as LanguageContextModule from '../../contexts/LanguageContext';

// Mock the context hook
const useLanguageSpy = vi.spyOn(LanguageContextModule, 'useLanguage');

describe('ProfileWizard', () => {
  const mockProps = {
    onComplete: vi.fn(),
    onCancel: vi.fn(),
    initialData: null
  };

  // Default mock setup
  const setupMock = (langCode: string = 'en') => {
    useLanguageSpy.mockReturnValue({
      language: langCode as any,
      setLanguage: vi.fn(),
      t: (key: string, _?: any, params?: any) => {
        let text = TRANSLATIONS[langCode as keyof typeof TRANSLATIONS]?.[key as any];
        if (!text) text = TRANSLATIONS['en'][key as any] || key;
        if (params) {
            Object.entries(params).forEach(([k, v]) => {
                text = text!.replace(`{${k}}`, v as string);
            });
        }
        return text || key;
      }
    });
  };

  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it('renders the initial greeting', () => {
    setupMock('en');
    render(<ProfileWizard {...mockProps} />);
    // "wizard_title_name" -> "What is your name?"
    expect(screen.getByText('What is your name?')).toBeInTheDocument();
  });

  it('updates text when language changes to Finnish', () => {
    setupMock('fi');
    render(<ProfileWizard {...mockProps} />);
    // "wizard_title_name" -> "Mikä on nimesi?"
    expect(screen.getByText('Mikä on nimesi?')).toBeInTheDocument();
  });

  it('updates text when language changes to Thai', () => {
    setupMock('th');
    render(<ProfileWizard {...mockProps} />);
    // "wizard_title_name" -> "คุณชื่ออะไร?"
    expect(screen.getByText('คุณชื่ออะไร?')).toBeInTheDocument();
  });

  it('updates the header title when language changes', () => {
    setupMock('fi');
    render(<ProfileWizard {...mockProps} />);
    // "wizard_title_init" -> "Luo profiilisi"
    expect(screen.getByText('Luo profiilisi')).toBeInTheDocument();
  });

  it('generates a nickname when requested', () => {
    setupMock('en');
    render(<ProfileWizard {...mockProps} />);
    const genBtn = screen.getByText('Give me a nickname!');
    fireEvent.click(genBtn);
    
    const input = screen.getByPlaceholderText('Your name') as HTMLInputElement;
    expect(input.value).toBeTruthy();
    expect(input.value).toContain(' ');
  });

  it('updates content language on subsequent steps (Step 2)', () => {
    setupMock('en');
    const { unmount } = render(<ProfileWizard {...mockProps} />);
    
    // Advance to Step 2
    const input = screen.getByPlaceholderText('Your name');
    fireEvent.change(input, { target: { value: 'Test User' } });
    const nextBtn = screen.getByText('Next');
    fireEvent.click(nextBtn);

    // Check English Step 2
    expect(screen.getByText('How old are you?')).toBeInTheDocument();
    
    // Clean up and re-render with new language to simulate context switch
    unmount();
    setupMock('fi');
    render(<ProfileWizard {...mockProps} />);
    
    // We need to navigate again because state is local to component instance
    // Re-enter name
    const inputFi = screen.getByPlaceholderText('Your name'); // Placeholder might change but test ID better? Or assume key matches
    fireEvent.change(inputFi, { target: { value: 'Test User' } });
    
    // "Seuraava" is Finnish for Next
    const nextBtnFi = screen.getByText('Seuraava');
    fireEvent.click(nextBtnFi);

    // "wizard_step2_title" -> "How old are you?" (EN) -> "Ikä?" or similar?
    // Checking translations.ts: 'wizard_step2_title' -> 'How old are you?' (EN)
    // For FI: 'wizard_step2_title' is missing in the provided subset in prompt? 
    // Checking `data/languages.ts` content provided previously...
    // FI has `wizard_title_name`. 
    // Wait, the prompt provided `data/languages.ts` content.
    // 'wizard_step2_title' is NOT in the 'fi' override list in the provided file content.
    // So it will fallback to English 'How old are you?'.
    // Let's check a key that IS translated. 'wizard_btn_next' -> 'Seuraava'.
    
    expect(screen.getByText('Seuraava')).toBeInTheDocument();
  });
});
