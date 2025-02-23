import { render, screen, fireEvent } from '@testing-library/react';
import { FlyoutPanel } from './FlyoutPanel';
import { useDispatch, useSelector } from 'react-redux';
import { useTheme } from '../../hooks/useTheme';
import { formatToCsv } from '../../services/formatToCsv';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));
jest.mock('../../hooks/useTheme');
jest.mock('../../services/formatToCsv');

describe('FlyoutPanel Component', () => {
  const mockDispatch = jest.fn();
  const mockFormatToCsv = formatToCsv as jest.MockedFunction<
    typeof formatToCsv
  >;

  beforeEach(() => {
    jest.clearAllMocks();
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useTheme as jest.Mock).mockReturnValue({ theme: 'DARK' });
    mockFormatToCsv.mockReturnValue('name,height\nLuke Skywalker,172');
  });

  it('should display the number of selected items', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        selectedCharacters: { selected: ['Luke Skywalker', 'Darth Vader'] },
        savedItems: { characters: [] },
      })
    );

    render(<FlyoutPanel />);
    expect(screen.getByText('2 items are selected')).toBeInTheDocument();
  });

  it('should call dispatch twice when unselect all button is clicked', () => {
    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        selectedCharacters: { selected: ['Luke Skywalker'] },
        savedItems: { characters: [] },
      })
    );

    render(<FlyoutPanel />);
    fireEvent.click(screen.getByText('Unselect all'));
    expect(mockDispatch).toHaveBeenCalledTimes(2);
  });

  it('should trigger download when download button is clicked', () => {
    const jsdomAlert = window.URL.createObjectURL;
    window.URL.createObjectURL = jest.fn();

    (useSelector as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        selectedCharacters: { selected: ['Luke Skywalker'] },
        savedItems: { characters: [{ name: 'Luke Skywalker', height: '172' }] },
      })
    );

    render(<FlyoutPanel />);
    fireEvent.click(screen.getByText('Download'));
    expect(mockFormatToCsv).toHaveBeenCalled();
    expect(window.URL.createObjectURL).toHaveBeenCalled();

    window.URL.createObjectURL = jsdomAlert;
  });
});
