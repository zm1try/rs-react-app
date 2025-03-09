import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import { Loader } from '@/components/Loader/Loader.tsx';

describe('Loader', () => {
  it('renders the loading text', () => {
    const { getByText } = render(<Loader />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('has the correct class name', () => {
    const { container } = render(<Loader />);
    const paragraph = container.querySelector('p');
    expect(paragraph).toHaveClass('loading');
  });

  it('matches the snapshot', () => {
    const { asFragment } = render(<Loader />);
    expect(asFragment()).toMatchSnapshot();
  });
});
