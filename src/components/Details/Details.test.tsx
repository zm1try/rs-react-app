import { render, screen, fireEvent } from '@testing-library/react';
import { Details } from './Details';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetCharacterDetailsQuery } from '../../api/swApi';
import { useTheme } from '../../hooks/useTheme';
import { ThemeEnum } from '../../models/Theme.enum';

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useParams: jest.fn(),
}));
jest.mock('../../api/swApi', () => ({
  useGetCharacterDetailsQuery: jest.fn(),
}));
jest.mock('../../hooks/useTheme');

describe('Details Component', () => {
  const mockNavigate = useNavigate as jest.Mock;
  const mockUseParams = useParams as jest.Mock;
  const mockUseGetCharacterDetailsQuery =
    useGetCharacterDetailsQuery as jest.Mock;
  const mockUseTheme = useTheme as jest.Mock;

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockReturnValue(jest.fn());
    mockUseParams.mockReturnValue({ itemId: '1' });
    mockUseTheme.mockReturnValue({ theme: ThemeEnum.DARK });
  });

  it('should display loader when data is loading', () => {
    mockUseGetCharacterDetailsQuery.mockReturnValue({ isLoading: true });

    render(<Details />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should display character details when data is loaded', () => {
    const character = {
      name: 'Luke Skywalker',
      birth_year: '19BBY',
    };
    mockUseGetCharacterDetailsQuery.mockReturnValue({
      isLoading: false,
      isFetching: false,
      data: character,
    });

    render(<Details />);
    expect(screen.getByText('Name: Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Birth year: 19BBY')).toBeInTheDocument();
  });

  it('should display error message when there is an error', () => {
    mockUseGetCharacterDetailsQuery.mockReturnValue({
      isLoading: false,
      error: new Error('Failed to fetch'),
    });

    render(<Details />);
    expect(screen.getByText('Failed to fetch')).toBeInTheDocument();
  });

  it('should navigate to home when close button is clicked', () => {
    const character = {
      name: 'Luke Skywalker',
      birth_year: '19BBY',
    };
    mockUseGetCharacterDetailsQuery.mockReturnValue({
      isLoading: false,
      data: character,
    });

    render(<Details />);
    fireEvent.click(screen.getByText('Close'));
    expect(mockNavigate).toHaveBeenCalled();
  });
});
