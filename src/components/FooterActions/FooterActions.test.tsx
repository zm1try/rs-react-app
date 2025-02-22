import { render, screen } from '@testing-library/react';
import { FooterActions } from './FooterActions';

jest.mock('../Pagination/Pagination.tsx', () => ({
  Pagination: () => <p>Pagination</p>,
}));

describe('FooterActions', () => {
  it('does not render Pagination when isPaginationVisible is false', () => {
    render(
      <FooterActions
        isPaginationVisible={false}
        currentPage={1}
        onPreviousPage={jest.fn()}
        onNextPage={jest.fn()}
      />
    );

    expect(screen.queryByText(/current page: 1/i)).not.toBeInTheDocument();
  });
});
