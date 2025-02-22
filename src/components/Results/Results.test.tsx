import { render, screen, fireEvent } from '@testing-library/react';
import { Results } from './Results';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Results', () => {
  const mockCharacters = [
    { name: 'Luke Skywalker', url: 'http://swapi.dev/api/people/1/' },
    { name: 'Darth Vader', url: 'http://swapi.dev/api/people/4/' },
  ] as never;

  it('renders cards for each character', () => {
    render(
      <MemoryRouter>
        <Results
          characters={mockCharacters}
          searchQuery="Luke"
          errorMessage=""
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  it('navigates to character details on card click', () => {
    render(
      <MemoryRouter>
        <Results
          characters={mockCharacters}
          searchQuery="Luke"
          errorMessage=""
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Luke Skywalker'));
    expect(mockNavigate).toHaveBeenCalledWith('/details/1');
  });

  it('shows a message when no characters are found and no error message is present', () => {
    render(
      <MemoryRouter>
        <Results characters={[]} searchQuery="Nonexistent" errorMessage="" />
      </MemoryRouter>
    );

    expect(
      screen.getByText('Nothing to show for search term: Nonexistent')
    ).toBeInTheDocument();
  });

  it('does not render anything when there is an error message', () => {
    render(
      <MemoryRouter>
        <Results
          characters={[]}
          searchQuery="Error"
          errorMessage="Network Error"
        />
      </MemoryRouter>
    );

    expect(
      screen.queryByText('Nothing to show for search term: Error')
    ).not.toBeInTheDocument();
  });
});
