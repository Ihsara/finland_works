
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import ProfileWizard from '../../components/ProfileWizard';

describe('ProfileWizard', () => {
  const mockProps = {
    onComplete: vi.fn(),
    onCancel: vi.fn(),
    language: 'en' as const,
    onLanguageSelect: vi.fn(),
    initialData: null
  };

  it('renders the initial greeting', () => {
    render(<ProfileWizard {...mockProps} />);
    expect(screen.getByText('What is your name?')).toBeInTheDocument();
  });

  it('updates text when language changes to Finnish', () => {
    const { rerender } = render(<ProfileWizard {...mockProps} />);
    expect(screen.getByText('What is your name?')).toBeInTheDocument();

    rerender(<ProfileWizard {...mockProps} language="fi" />);
    expect(screen.getByText('Mikä on nimesi?')).toBeInTheDocument();
  });

  it('updates text when language changes to Thai', () => {
    const { rerender } = render(<ProfileWizard {...mockProps} />);
    expect(screen.getByText('What is your name?')).toBeInTheDocument();

    rerender(<ProfileWizard {...mockProps} language="th" />);
    expect(screen.getByText('คุณชื่ออะไร?')).toBeInTheDocument();
  });

  it('generates a nickname when requested', () => {
    render(<ProfileWizard {...mockProps} />);
    const genBtn = screen.getByText('Give me a nickname!');
    fireEvent.click(genBtn);
    
    const input = screen.getByPlaceholderText('Your name') as HTMLInputElement;
    expect(input.value).toBeTruthy();
    expect(input.value).toContain(' '); // Should likely be "Emoji Adjective Animal"
  });
});
