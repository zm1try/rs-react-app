import { render, fireEvent, screen } from '@testing-library/react';
import { ThrowErrorButton } from './ThrowErrorButton';

describe('ThrowErrorButton Component', () => {
  it('renders a button', () => {
    render(<ThrowErrorButton />);
    expect(
      screen.getByRole('button', { name: 'Trigger Error' })
    ).toBeInTheDocument();
  });

  it('throws an error when the button is clicked', () => {
    const spy = jest.spyOn(console, 'error');
    spy.mockImplementation(() => {});

    const { getByRole } = render(<ThrowErrorButton />);
    expect(() => fireEvent.click(getByRole('button'))).toThrow();

    spy.mockRestore();
  });
});
