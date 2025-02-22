import { render, screen } from '@testing-library/react';
import { NotFoundPage } from './NotFoundPage';

describe('NotFoundPage', () => {
  it('displays the not found message', () => {
    render(<NotFoundPage />);
    const messageElement = screen.getByText(/Route doesnt exist/i);
    expect(messageElement).toBeInTheDocument();
  });
});
