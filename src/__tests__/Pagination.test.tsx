import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { useRouter } from 'next/router';
import { ThemeEnum } from '@/models/Theme.enum';
import { Pagination } from '@/components/Pagination/Pagination.tsx';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockStore = configureMockStore();

describe('Pagination', () => {
  let mockReplace: vi.Mock;

  beforeEach(() => {
    mockReplace = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      query: { page: '1' },
      pathname: '/test',
      replace: mockReplace,
    });
  });

  it('renders correctly with light theme', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByText, container } = render(
      <Provider store={store}>
        <Pagination
          currentPage={1}
          onPreviousPage={vi.fn()}
          onNextPage={vi.fn()}
        />
      </Provider>
    );

    expect(getByText('Page 1')).toBeInTheDocument();
    expect(container.querySelector('.pagination-container')).toHaveClass(
      'light'
    );
  });

  it('renders correctly with dark theme', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.DARK } },
    });

    const { getByText, container } = render(
      <Provider store={store}>
        <Pagination
          currentPage={1}
          onPreviousPage={vi.fn()}
          onNextPage={vi.fn()}
        />
      </Provider>
    );

    expect(getByText('Page 1')).toBeInTheDocument();
    expect(container.querySelector('.pagination-container')).toHaveClass(
      'dark'
    );
  });

  it('disables the "Previous" button when on the first page', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Pagination
          currentPage={1}
          onPreviousPage={vi.fn()}
          onNextPage={vi.fn()}
        />
      </Provider>
    );

    const previousButton = getByText('Previous');
    expect(previousButton).toBeDisabled();
  });

  it('enables the "Previous" button when not on the first page', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByText } = render(
      <Provider store={store}>
        <Pagination
          currentPage={2}
          onPreviousPage={vi.fn()}
          onNextPage={vi.fn()}
        />
      </Provider>
    );

    const previousButton = getByText('Previous');
    expect(previousButton).not.toBeDisabled();
  });

  it('calls onPreviousPage when the "Previous" button is clicked', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const onPreviousPageMock = vi.fn();

    const { getByText } = render(
      <Provider store={store}>
        <Pagination
          currentPage={2}
          onPreviousPage={onPreviousPageMock}
          onNextPage={vi.fn()}
        />
      </Provider>
    );

    const previousButton = getByText('Previous');
    fireEvent.click(previousButton);

    expect(onPreviousPageMock).toHaveBeenCalled();
  });

  it('calls onNextPage when the "Next" button is clicked', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const onNextPageMock = vi.fn();

    const { getByText } = render(
      <Provider store={store}>
        <Pagination
          currentPage={1}
          onPreviousPage={vi.fn()}
          onNextPage={onNextPageMock}
        />
      </Provider>
    );

    const nextButton = getByText('Next');
    fireEvent.click(nextButton);

    expect(onNextPageMock).toHaveBeenCalled();
  });

  it('updates the router query when the currentPage changes', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    render(
      <Provider store={store}>
        <Pagination
          currentPage={2}
          onPreviousPage={vi.fn()}
          onNextPage={vi.fn()}
        />
      </Provider>
    );

    expect(mockReplace).toHaveBeenCalledWith(
      {
        pathname: '/test',
        query: { page: '2' },
      },
      undefined,
      { shallow: true }
    );
  });

  it('does not update the router query if the page is already correct', () => {
    const store = mockStore({
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    (useRouter as vi.Mock).mockReturnValue({
      query: { page: '2' },
      pathname: '/test',
      replace: mockReplace,
    });

    render(
      <Provider store={store}>
        <Pagination
          currentPage={2}
          onPreviousPage={vi.fn()}
          onNextPage={vi.fn()}
        />
      </Provider>
    );

    expect(mockReplace).not.toHaveBeenCalled();
  });
});
