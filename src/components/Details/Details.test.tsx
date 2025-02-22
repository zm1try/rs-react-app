import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Details } from './Details';
import * as swapiService from '../../services/swapiService';

jest.mock('../../services/swapiService.tsx');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ itemId: '1' }),
  useNavigate: () => jest.fn(),
}));

describe('Details Component', () => {
  const mockFetchCharacter = swapiService.swapiService
    .fetchCharacter as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should display loader while fetching data', async () => {
    mockFetchCharacter.mockReturnValue(new Promise(() => {}));
    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    );

    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it('should handle error when fetching data fails', async () => {
    mockFetchCharacter.mockRejectedValue(new Error('Failed to fetch'));
    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch/i)).toBeInTheDocument();
    });
  });

  it('should display character details when data is successfully fetched', async () => {
    const mockCharacter = {
      name: 'Luke Skywalker',
      birth_year: '19BBY',
    };
    mockFetchCharacter.mockResolvedValue(mockCharacter);
    render(
      <BrowserRouter>
        <Details />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText(/luke skywalker/i)).toBeInTheDocument();
      expect(screen.getByText(/19bby/i)).toBeInTheDocument();
    });
  });
});
