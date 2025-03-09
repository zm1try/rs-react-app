import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import { FooterActions } from '@/components/FooterActions/FooterActions.tsx';

vi.mock('../components/Pagination/Pagination', () => ({
  Pagination: vi.fn(() => <div data-testid="pagination-mock">Pagination</div>),
}));

vi.mock('../components/ThrowErrorButton/ThrowErrorButton', () => ({
  ThrowErrorButton: vi.fn(() => (
    <button data-testid="throw-error-button">Throw Error</button>
  )),
}));

describe('FooterActions', () => {
  it('renders the Pagination component when isPaginationVisible is true', () => {
    const { getByTestId } = render(
      <FooterActions isPaginationVisible={true} />
    );

    expect(getByTestId('pagination-mock')).toBeInTheDocument();
  });

  it('does not render the Pagination component when isPaginationVisible is false', () => {
    const { queryByTestId } = render(
      <FooterActions isPaginationVisible={false} />
    );

    expect(queryByTestId('pagination-mock')).not.toBeInTheDocument();
  });

  it('renders the ThrowErrorButton component', () => {
    const { getByTestId } = render(
      <FooterActions isPaginationVisible={true} />
    );

    expect(getByTestId('throw-error-button')).toBeInTheDocument();
  });
});
