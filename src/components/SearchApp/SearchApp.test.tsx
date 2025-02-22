import { render, screen, waitFor } from '@testing-library/react';
import { SearchApp } from './SearchApp';
import * as useLocalStorage from '../../services/useLocalStorage';

jest.mock('../../services/useLocalStorage');
jest.mock('../../services/swapiService');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({ itemId: '1' }),
  useNavigate: () => jest.fn(),
}));

describe('SearchApp Component', () => {
  const mockSaveSearchQuery = jest.fn();
  const mockLoadSearchQuery = jest.fn();
  const mockUseLocalStorage = useLocalStorage.useLocalStorage as jest.Mock;
  mockUseLocalStorage.mockReturnValue({
    loadSearchQuery: mockLoadSearchQuery,
    saveSearchQuery: mockSaveSearchQuery,
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockLoadSearchQuery.mockReturnValue('');
  });

  it('renders without crashing', async () => {
    render(<SearchApp />);
    await waitFor(() => {
      expect(screen.getByText(/swapi search/i)).toBeInTheDocument();
    });
  });
});
