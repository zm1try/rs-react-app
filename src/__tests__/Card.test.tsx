import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import Card from '@/components/Card/Card';
import { ThemeEnum } from '@/models/Theme.enum';
import { useTheme } from '@/hooks/useTheme.tsx';
import { ResultItem } from '@/models/ResultItem.model.ts';

vi.mock('@/hooks/useTheme.tsx', () => ({
  useTheme: vi.fn(),
}));

vi.mock('../components/Checkbox/Checkbox', () => ({
  Checkbox: ({ character }: { character: ResultItem }) => (
    <div data-testid="checkbox">{character.name}</div>
  ),
}));

describe('Card', () => {
  const mockCharacter = {
    name: 'Luke Skywalker',
    url: 'https://swapi.dev/api/people/1/',
  } as ResultItem;

  const mockOnClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useTheme as vi.Mock).mockReturnValue({
      theme: ThemeEnum.LIGHT,
    });
  });

  it('renders the Checkbox component with the correct character prop', () => {
    const { getByTestId } = render(
      <Card character={mockCharacter} onClick={mockOnClick} />
    );

    const checkbox = getByTestId('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toHaveTextContent('Luke Skywalker');
  });

  it('applies the correct theme class based on the current theme', () => {
    const { container } = render(
      <Card character={mockCharacter} onClick={mockOnClick} />
    );

    const card = container.querySelector('.card');
    expect(card).toHaveClass('light');
  });

  it('updates the theme class when the theme changes', () => {
    (useTheme as vi.Mock).mockReturnValueOnce({
      theme: ThemeEnum.DARK,
    });

    const { container } = render(
      <Card character={mockCharacter} onClick={mockOnClick} />
    );

    const card = container.querySelector('.card');
    expect(card).toHaveClass('dark');
  });
});
