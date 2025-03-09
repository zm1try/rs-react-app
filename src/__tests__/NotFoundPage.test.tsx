import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { NotFoundPage } from '@/components/NotFoundPage/NotFoundPage.tsx';

describe('NotFoundPage', () => {
  it('renders the not found message', () => {
    const { getByText } = render(<NotFoundPage />);
    expect(getByText('Route doesnt exist')).toBeInTheDocument();
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<NotFoundPage />);
    expect(asFragment()).toMatchSnapshot();
  });
});
