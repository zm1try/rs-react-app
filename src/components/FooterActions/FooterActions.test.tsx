import { render, screen, fireEvent } from '@testing-library/react';
import { FooterActions } from './FooterActions';

jest.mock('../Pagination/Pagination', () => ({
  Pagination: ({
    currentPage,
    onPreviousPage,
    onNextPage,
  }: {
    currentPage: number;
    onPreviousPage: () => object;
    onNextPage: () => object;
  }) => (
    <div>
      <button onClick={onPreviousPage}>Previous</button>
      <span>Current Page: {currentPage}</span>
      <button onClick={onNextPage}>Next</button>
    </div>
  ),
}));
jest.mock('../ThrowErrorButton/ThrowErrorButton', () => ({
  ThrowErrorButton: () => <button>Throw Error</button>,
}));

describe('FooterActions Component', () => {
  const onPreviousPageMock = jest.fn();
  const onNextPageMock = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render Pagination and ThrowErrorButton components', () => {
    render(
      <FooterActions
        isPaginationVisible={true}
        currentPage={1}
        onPreviousPage={onPreviousPageMock}
        onNextPage={onNextPageMock}
      />
    );
    expect(screen.getByText('Current Page: 1')).toBeInTheDocument();
    expect(screen.getByText('Throw Error')).toBeInTheDocument();
  });

  it('should handle previous and next page clicks', () => {
    render(
      <FooterActions
        isPaginationVisible={true}
        currentPage={1}
        onPreviousPage={onPreviousPageMock}
        onNextPage={onNextPageMock}
      />
    );
    fireEvent.click(screen.getByText('Previous'));
    fireEvent.click(screen.getByText('Next'));
    expect(onPreviousPageMock).toHaveBeenCalledWith(0);
    expect(onNextPageMock).toHaveBeenCalledWith(2);
  });

  it('should not display Pagination when isPaginationVisible is false', () => {
    render(
      <FooterActions
        isPaginationVisible={false}
        currentPage={1}
        onPreviousPage={onPreviousPageMock}
        onNextPage={onNextPageMock}
      />
    );
    expect(screen.queryByText('Current Page: 1')).not.toBeInTheDocument();
  });
});
