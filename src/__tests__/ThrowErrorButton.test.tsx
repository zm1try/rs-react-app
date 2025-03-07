import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { ThrowErrorButton } from '@/components/ThrowErrorButton/ThrowErrorButton.tsx';

describe('ThrowErrorButton', () => {
  it('renders the button with the correct text', () => {
    const { getByText } = render(<ThrowErrorButton />);
    expect(getByText('Trigger Error')).toBeInTheDocument();
  });

  it('throws an error when the button is clicked', () => {
    const { getByText } = render(<ThrowErrorButton />);
    const button = getByText('Trigger Error');

    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    expect(() => {
      fireEvent.click(button);
    }).toThrowError();
    consoleErrorSpy.mockRestore();
  });
});
