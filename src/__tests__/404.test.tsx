import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import NotFoundPage from '@/pages/404.tsx';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('NotFoundPage', () => {
  let mockRouterPush: vi.Mock;

  beforeEach(() => {
    mockRouterPush = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  it('renders the 404 message and button', () => {
    const { getByText } = render(<NotFoundPage />);

    expect(getByText('404 - Page Not Found')).toBeInTheDocument();
    expect(getByText('Go to Home page')).toBeInTheDocument();
  });

  it('navigates to the home page when the button is clicked', () => {
    const { getByText } = render(<NotFoundPage />);
    const button = getByText('Go to Home page');

    fireEvent.click(button);

    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });
});
