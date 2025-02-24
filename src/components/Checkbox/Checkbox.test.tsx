import { render, screen, fireEvent } from '@testing-library/react';
import { Checkbox } from './Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { ResultItem } from '../../models/ResultItem.model';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('Checkbox Component', () => {
  const mockDispatch = jest.fn();
  const character: ResultItem = {
    birth_year: '19BBY',
    name: 'Luke Skywalker',
    url: 'some-url',
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
  });

  it('should render checkbox as unchecked when character is not selected', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(false);

    render(<Checkbox character={character} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(false);
  });

  it('should render checkbox as checked when character is selected', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(true);

    render(<Checkbox character={character} />);
    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;

    expect(checkbox.checked).toBe(true);
  });

  it('should dispatch actions on checkbox change', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(false);

    render(<Checkbox character={character} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it('should dispatch removeItemByKey when checkbox is unchecked', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(true);

    render(<Checkbox character={character} />);
    const checkbox = screen.getByRole('checkbox');

    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'SWITCH_SELECTION',
      payload: character.url,
    });
    expect(mockDispatch).toHaveBeenCalledWith({
      type: 'savedItems/removeItemByKey',
      payload: character.url,
    });
  });
});
