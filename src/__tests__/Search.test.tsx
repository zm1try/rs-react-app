import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import Search from '@/components/Search/Search.tsx';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/components/ThemeSwitcher/ThemeSwitcher', () => ({
  ThemeSwitcher: () => <div data-testid="theme-switcher">ThemeSwitcher</div>,
}));

describe('Search', () => {
  let mockRouterReplace: vi.Mock;

  beforeEach(() => {
    mockRouterReplace = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      query: {},
      replace: mockRouterReplace,
    });
  });

  it('renders the search input, submit button, and ThemeSwitcher', () => {
    const { getByPlaceholderText, getByText, getByTestId } = render(
      <Search onSearch={vi.fn()} />
    );

    expect(
      getByPlaceholderText('Enter something to search')
    ).toBeInTheDocument();
    expect(getByText('Search')).toBeInTheDocument();
    expect(getByTestId('theme-switcher')).toBeInTheDocument();
  });

  it('calls onSearch with the correct query when the form is submitted', () => {
    const onSearchMock = vi.fn();

    const { getByPlaceholderText, getByText } = render(
      <Search onSearch={onSearchMock} />
    );
    const searchInput = getByPlaceholderText(
      'Enter something to search'
    ) as HTMLInputElement;
    const submitButton = getByText('Search');

    fireEvent.change(searchInput, { target: { value: 'new query' } });
    fireEvent.click(submitButton);

    expect(onSearchMock).toHaveBeenCalledWith('new query');
  });
});
