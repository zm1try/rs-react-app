import { render, screen, fireEvent } from '@testing-library/react';
import { Card } from './Card';
import { ResultItem } from '../../models/ResultItem.model';

describe('Card', () => {
  const mockCharacter: ResultItem = {
    name: 'John Doe',
  } as never;

  it('renders the character name', () => {
    render(<Card character={mockCharacter} onClick={jest.fn()} />);
    const nameElement = screen.getByText(mockCharacter.name);
    expect(nameElement).toBeInTheDocument();
  });

  it('calls onClick when the button is clicked', () => {
    const handleClick = jest.fn();
    render(<Card character={mockCharacter} onClick={handleClick} />);
    const buttonElement = screen.getByRole('button');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
    expect(handleClick).toHaveBeenCalledWith(expect.anything(), mockCharacter);
  });
});
