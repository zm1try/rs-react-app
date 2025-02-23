import { screen, fireEvent } from '@testing-library/react';
import { render } from '../../store/test-utils';
import { Results } from './Results';
import { useNavigate } from 'react-router-dom';
import { ResultItem } from '../../models/ResultItem.model';
import { ThemeProvider } from '../../context/ThemeContext';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
  Outlet: () => <div data-testid="mock-outlet"></div>,
}));

describe('Results Component', () => {
  const mockNavigate = useNavigate as jest.Mock;
  const empty = '';
  const mockSearchQuery = 'Yoda';
  const emptyArray: ResultItem[] = [];
  const characters = [
    {
      name: 'Luke Skywalker',
      url: 'http://swapi.dev/api/people/1/',
      birth_year: '19',
    },
    {
      name: 'Darth Vader',
      url: 'http://swapi.dev/api/people/4/',
      birth_year: '21',
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockNavigate.mockReturnValue(jest.fn());
  });

  it('should render list of characters', () => {
    render(
      <ThemeProvider>
        <Results
          characters={characters}
          searchQuery={empty}
          errorMessage={empty}
        />
      </ThemeProvider>
    );
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('should navigate to details page when a card is clicked', () => {
    render(
      <ThemeProvider>
        <Results
          characters={characters}
          searchQuery={empty}
          errorMessage={empty}
        />
      </ThemeProvider>
    );
    const lukeCard = screen
      .getByText('Luke Skywalker')
      .closest('button') as HTMLElement;
    fireEvent.click(lukeCard);
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should navigate to home when background is clicked', () => {
    render(
      <ThemeProvider>
        <Results
          characters={characters}
          searchQuery={empty}
          errorMessage={empty}
        />
      </ThemeProvider>
    );
    const resultsContainer = screen.getByTestId(
      'results-container'
    ) as HTMLElement;
    fireEvent.click(resultsContainer);
    expect(mockNavigate).toHaveBeenCalled();
  });

  it('should display message when there are no characters and no error message', () => {
    render(
      <ThemeProvider>
        <Results
          characters={emptyArray}
          searchQuery={mockSearchQuery}
          errorMessage={empty}
        />
      </ThemeProvider>
    );
    expect(
      screen.getByText('Nothing to show for search term: Yoda')
    ).toBeInTheDocument();
  });
});
