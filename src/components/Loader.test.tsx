import { render, screen } from '@testing-library/react';
import { Loader } from './Loader';
describe('Loader', () => {
  it('displays the loading message', () => {
    render(<Loader />);
    const loadingElement = screen.getByText(/loading.../i);
    expect(loadingElement).toBeInTheDocument();
  });
});
