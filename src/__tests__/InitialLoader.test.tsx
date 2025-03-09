import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { InitialLoader } from '@/components/InitialLoader/InitialLoader.tsx';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('@/components/Loader/Loader.tsx', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

describe('InitialLoader', () => {
  let mockRouterReplace: vi.Mock;

  beforeEach(() => {
    mockRouterReplace = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      replace: mockRouterReplace,
    });
  });

  it('calls router.replace with ?page=1 when page query parameter is missing', () => {
    (useSearchParams as vi.Mock).mockReturnValue({
      get: vi.fn(() => null),
      toString: vi.fn(() => ''),
    });

    render(<InitialLoader />);

    expect(mockRouterReplace).toHaveBeenCalledWith('?page=1');
  });

  it('does not call router.replace when page query parameter is present', () => {
    (useSearchParams as vi.Mock).mockReturnValue({
      get: vi.fn((key) => (key === 'page' ? '1' : null)),
      toString: vi.fn(() => 'page=1'),
    });

    render(<InitialLoader />);

    expect(mockRouterReplace).not.toHaveBeenCalled();
  });

  it('renders the Loader component', () => {
    (useSearchParams as vi.Mock).mockReturnValue({
      get: vi.fn(() => null),
      toString: vi.fn(() => ''),
    });

    const { getByTestId } = render(<InitialLoader />);

    expect(getByTestId('loader')).toBeInTheDocument();
    expect(getByTestId('loader')).toHaveTextContent('Loading...');
  });
});
