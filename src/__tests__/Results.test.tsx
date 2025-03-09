import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import { ResultItem } from '@/models/ResultItem.model';
import Results from '@/components/Results/Results.tsx';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('../components/Card/Card', () => ({
  default: ({
    character,
    onClick,
  }: {
    character: ResultItem;
    onClick: () => void;
  }) => (
    <div data-testid="card" onClick={onClick}>
      {character.name}
    </div>
  ),
}));

describe('Results', () => {
  let mockRouterPush: vi.Mock;

  beforeEach(() => {
    mockRouterPush = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  const mockCharacters: ResultItem[] = [
    { name: 'Character 1', url: 'https://api.example.com/character/1' },
    { name: 'Character 2', url: 'https://api.example.com/character/2' },
  ] as ResultItem[];

  it('renders a list of Card components when characters are provided', () => {
    const { getAllByTestId } = render(
      <Results characters={mockCharacters} searchQuery="test">
        <div>Child Content</div>
      </Results>
    );

    const cards = getAllByTestId('card');
    expect(cards).toHaveLength(mockCharacters.length);
    expect(cards[0]).toHaveTextContent('Character 1');
    expect(cards[1]).toHaveTextContent('Character 2');
  });
});
