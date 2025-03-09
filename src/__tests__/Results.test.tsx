import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { ResultItem } from '@/models/ResultItem.model';
import Results from '@/components/Results/Results.tsx';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
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

const mockRouterPush = vi.fn();

describe('Results', () => {
  beforeEach(() => {
    (useRouter as vi.Mock).mockReturnValue({
      push: mockRouterPush,
      query: { search: 'test' },
    });
  });

  const mockCharacters: ResultItem[] = [
    { name: 'Character 1', url: 'https://api.example.com/character/1' },
    { name: 'Character 2', url: 'https://api.example.com/character/2' },
  ] as ResultItem[];

  it('renders a list of Card components when characters are provided', () => {
    const { getAllByTestId } = render(
      <Results characters={mockCharacters} searchQuery="test" errorMessage="">
        <div>Child Content</div>
      </Results>
    );

    const cards = getAllByTestId('card');
    expect(cards).toHaveLength(mockCharacters.length);
    expect(cards[0]).toHaveTextContent('Character 1');
    expect(cards[1]).toHaveTextContent('Character 2');
  });

  it('renders the errorMessage when provided', () => {
    const { getByText } = render(
      <Results
        characters={[]}
        searchQuery="test"
        errorMessage="An error occurred"
      >
        null
      </Results>
    );

    expect(getByText('An error occurred')).toBeInTheDocument();
  });

  it('renders "Nothing to show" message when no characters and no errorMessage are provided', () => {
    const { getByText } = render(
      <Results characters={[]} searchQuery="test" errorMessage="">
        null
      </Results>
    );

    expect(
      getByText('Nothing to show for search term: test')
    ).toBeInTheDocument();
  });

  it('navigates to the correct route when a Card is clicked', () => {
    const { getAllByTestId } = render(
      <Results characters={mockCharacters} searchQuery="test" errorMessage="">
        null
      </Results>
    );

    const cards = getAllByTestId('card');
    fireEvent.click(cards[0]);

    expect(mockRouterPush).toHaveBeenCalledWith({
      pathname: '/details/[id]',
      query: { id: '1', page: 1, search: 'test' },
    });
  });

  it('renders the children prop', () => {
    const { getByText } = render(
      <Results characters={mockCharacters} searchQuery="test" errorMessage="">
        <div>Child Content</div>
      </Results>
    );

    expect(getByText('Child Content')).toBeInTheDocument();
  });
});
