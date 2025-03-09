import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Search from '@/components/Search/Search.tsx';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('@/components/ThemeSwitcher/ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">ThemeSwitcher</div>,
}));

describe('Search', () => {
  let mockRouterPush: vi.Mock;

  beforeEach(() => {
    mockRouterPush = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    (useSearchParams as vi.Mock).mockReturnValue({
      toString: vi.fn(() => ''),
    });
  });

  it('renders the search input, submit button, and ThemeSwitcher', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(<Search />);

    expect(
      getByPlaceholderText('Enter something to search')
    ).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
    expect(getByTestId('theme-switcher')).toBeInTheDocument();
  });

  it('updates the input value when typing', () => {
    const { getByPlaceholderText } = render(<Search />);
    const searchInput = getByPlaceholderText(
      'Enter something to search'
    ) as HTMLInputElement;

    fireEvent.change(searchInput, { target: { value: 'test query' } });

    expect(searchInput.value).toBe('test query');
  });

  it('adds the search query to the URL when the form is submitted', () => {
    const { getByPlaceholderText, getByText } = render(<Search />);
    const searchInput = getByPlaceholderText(
      'Enter something to search'
    ) as HTMLInputElement;
    const submitButton = getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'test query' } });
    fireEvent.click(submitButton);

    expect(mockRouterPush).toHaveBeenCalledWith('?search=test+query&page=1');
  });

  it('removes the search query from the URL when the input is empty', () => {
    const { getByPlaceholderText, getByText } = render(<Search />);
    const searchInput = getByPlaceholderText(
      'Enter something to search'
    ) as HTMLInputElement;
    const submitButton = getByText('Search');

    fireEvent.change(searchInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    expect(mockRouterPush).toHaveBeenCalledWith('?page=1');
  });

  it('resets the page query parameter to 1 on form submission', () => {
    const { getByPlaceholderText, getByText } = render(<Search />);
    const searchInput = getByPlaceholderText(
      'Enter something to search'
    ) as HTMLInputElement;
    const submitButton = getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'another query' } });
    fireEvent.click(submitButton);

    expect(mockRouterPush).toHaveBeenCalledWith('?search=another+query&page=1');
  });
});
