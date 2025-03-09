import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { swapiService } from '@/api/swapiService';
import { ResultItem } from '@/models/ResultItem.model.ts';
import HomePage from '@/app/page.tsx';

vi.mock('@/api/swapiService', () => ({
  swapiService: {
    fetchCharacters: vi.fn(),
  },
}));

vi.mock('@/components/InitialLoader/InitialLoader', () => ({
  InitialLoader: () => <div data-testid="initial-loader">Loading...</div>,
}));

vi.mock('@/components/MainLayout/MainLayout', () => ({
  default: ({ characters }: { characters: ResultItem[] }) => (
    <div data-testid="main-layout">
      {characters.map((character) => (
        <div key={character.name}>{character.name}</div>
      ))}
    </div>
  ),
}));

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches character data and renders MainLayout when page query parameter is provided', async () => {
    const mockCharacters = [{ name: 'Character 1' }, { name: 'Character 2' }];
    (swapiService.fetchCharacters as vi.Mock).mockResolvedValue({
      characters: mockCharacters,
    });

    const searchParams = { page: '1', search: '' };

    render(await HomePage({ searchParams }));

    const mainLayout = screen.getByTestId('main-layout');
    expect(mainLayout).toBeInTheDocument();
    expect(mainLayout).toHaveTextContent('Character 1');
    expect(mainLayout).toHaveTextContent('Character 2');
    expect(swapiService.fetchCharacters).toHaveBeenCalledWith({
      page: 1,
      searchQuery: '',
    });
  });

  it('renders "Not Found" when no data is returned', async () => {
    (swapiService.fetchCharacters as vi.Mock).mockResolvedValue(null);

    const searchParams = { page: '1', search: '' };

    render(await HomePage({ searchParams }));

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('renders InitialLoader when page query parameter is missing', async () => {
    const searchParams = { page: undefined, search: '' };

    render(await HomePage({ searchParams }));

    expect(screen.getByTestId('initial-loader')).toBeInTheDocument();
    expect(screen.getByTestId('initial-loader')).toHaveTextContent(
      'Loading...'
    );
  });
});
