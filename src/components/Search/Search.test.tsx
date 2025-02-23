import { render, screen, fireEvent } from '@testing-library/react';
import { Search } from './Search';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const mockLoadSearchQuery = jest.fn();
const mockSaveSearchQuery = jest.fn();
jest.mock('../../hooks/useLocalStorage.tsx', () => ({
  useLocalStorage: () => ({
    loadSearchQuery: mockLoadSearchQuery,
    saveSearchQuery: mockSaveSearchQuery,
  }),
}));

describe('Search', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
    mockLoadSearchQuery.mockClear();
    mockSaveSearchQuery.mockClear();
  });

  it('submits the form and calls onSearch with the input value', () => {
    const handleSearch = jest.fn();
    render(<Search onSearch={handleSearch} />);
    const input = screen.getByPlaceholderText('Enter something to search');
    const form = screen.getByTitle('form');

    fireEvent.change(input, { target: { value: 'Darth Vader' } });
    fireEvent.submit(form);

    expect(mockSaveSearchQuery).toHaveBeenCalledWith('Darth Vader');
    expect(handleSearch).toHaveBeenCalledWith('Darth Vader');
  });
});
