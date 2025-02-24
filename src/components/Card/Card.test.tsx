import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';
import { useTheme } from '../../hooks/useTheme';
import { ThemeEnum } from '../../models/Theme.enum';
import { ResultItem } from '../../models/ResultItem.model';

jest.mock('../../hooks/useTheme');
jest.mock('../Checkbox/Checkbox', () => ({
  Checkbox: ({ character }: { character: ResultItem }) => (
    <div>Checkbox for {character.name}</div>
  ),
}));

describe('Card Component', () => {
  const mockUseTheme = useTheme as jest.Mock;
  const character = {
    birth_year: '19BBY',
    name: 'Luke Skywalker',
    url: 'http://swapi.dev/api/people/1/',
  };
  const onClickMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseTheme.mockReturnValue({ theme: ThemeEnum.DARK });
  });

  it('should render character name and checkbox', () => {
    render(<Card character={character} onClick={onClickMock} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Checkbox for Luke Skywalker')).toBeInTheDocument();
  });

  it('should apply dark theme class', () => {
    render(<Card character={character} onClick={onClickMock} />);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('dark');
  });

  it('should call onClick when button is clicked', () => {
    render(<Card character={character} onClick={onClickMock} />);
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledWith(expect.any(Object), character);
  });
});
