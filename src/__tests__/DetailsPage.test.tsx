import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { swapiService } from '@/api/swapiService';
import DetailsPage from '@/app/details/[id]/page.tsx';
import { ResultItem } from '@/models/ResultItem.model.ts';

vi.mock('@/api/swapiService', () => ({
  swapiService: {
    fetchCharacters: vi.fn(),
    fetchCharacter: vi.fn(),
  },
}));

vi.mock('@/components/MainLayout/MainLayout', () => ({
  default: ({
    characters,
    characterDetails,
  }: {
    characters: ResultItem[];
    characterDetails: ResultItem;
  }) => (
    <div data-testid="main-layout">
      <div data-testid="characters">
        {characters.map((character) => (
          <div key={character.name}>{character.name}</div>
        ))}
      </div>
      <div data-testid="character-details">{characterDetails.name}</div>
    </div>
  ),
}));

describe('DetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches data and renders MainLayout when both charactersData and characterDetailsData are available', async () => {
    const mockCharacters = [{ name: 'Character 1' }, { name: 'Character 2' }];
    const mockCharacterDetails = { name: 'Character Details' };

    (swapiService.fetchCharacters as vi.Mock).mockResolvedValue({
      characters: mockCharacters,
    });
    (swapiService.fetchCharacter as vi.Mock).mockResolvedValue(
      mockCharacterDetails
    );

    const searchParams = { page: '1', search: '' };
    const params = { id: '123' };

    render(await DetailsPage({ searchParams, params }));

    const mainLayout = screen.getByTestId('main-layout');
    expect(mainLayout).toBeInTheDocument();

    const characters = screen.getByTestId('characters');
    expect(characters).toHaveTextContent('Character 1');
    expect(characters).toHaveTextContent('Character 2');

    const characterDetails = screen.getByTestId('character-details');
    expect(characterDetails).toHaveTextContent('Character Details');

    expect(swapiService.fetchCharacters).toHaveBeenCalledWith({
      page: 1,
      searchQuery: '',
    });
    expect(swapiService.fetchCharacter).toHaveBeenCalledWith('123');
  });

  it('renders "Not Found" when charactersData is null', async () => {
    (swapiService.fetchCharacters as vi.Mock).mockResolvedValue(null);
    (swapiService.fetchCharacter as vi.Mock).mockResolvedValue({
      name: 'Character Details',
    });

    const searchParams = { page: '1', search: '' };
    const params = { id: '123' };

    render(await DetailsPage({ searchParams, params }));

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });

  it('renders "Not Found" when characterDetailsData is null', async () => {
    (swapiService.fetchCharacters as vi.Mock).mockResolvedValue({
      characters: [{ name: 'Character 1' }],
    });
    (swapiService.fetchCharacter as vi.Mock).mockResolvedValue(null);

    const searchParams = { page: '1', search: '' };
    const params = { id: '123' };

    render(await DetailsPage({ searchParams, params }));

    expect(screen.getByText('Not Found')).toBeInTheDocument();
  });
});
