import { describe, it, expect, vi } from 'vitest';
import { renderHook } from '@testing-library/react';
import { ThemeEnum } from '../models/Theme.enum';
import { ThemeContextType } from '../models/ThemeContext.model';
import { ThemeContext, useTheme } from '@/hooks/useTheme.tsx';

describe('ThemeContext', () => {
  it('provides default values', () => {
    const defaultContext = {
      theme: ThemeEnum.DARK,
      toggleTheme: () => {},
    };

    expect(defaultContext.theme).toBe(ThemeEnum.DARK);
    expect(defaultContext.toggleTheme).toBeInstanceOf(Function);
  });

  it('retrieves theme and toggleTheme from ThemeContext', () => {
    const mockContext: ThemeContextType = {
      theme: ThemeEnum.LIGHT,
      toggleTheme: vi.fn(),
    };

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeContext.Provider value={mockContext}>
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(), { wrapper });

    expect(result.current.theme).toBe(ThemeEnum.LIGHT);
    expect(result.current.toggleTheme).toBe(mockContext.toggleTheme);
  });
});
