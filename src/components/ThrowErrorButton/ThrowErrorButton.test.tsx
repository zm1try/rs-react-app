import { render, screen, fireEvent } from '@testing-library/react';
import { ThrowErrorButton } from './ThrowErrorButton';

describe('ThrowErrorButton Component', () => {
  it('should render the button initially', () => {
    render(<ThrowErrorButton />);
    expect(
      screen.getByRole('button', { name: /trigger error/i })
    ).toBeInTheDocument();
  });

  it('should throw an error when the button is clicked', () => {
    const { getByText } = render(<ThrowErrorButton />);
    const button = getByText(/trigger error/i);

    // To test components that throw errors, we need to suppress error logging to the console for this test.
    const consoleError = console.error;
    console.error = jest.fn();

    expect(() => fireEvent.click(button)).toThrow();

    // Restore the original console.error function.
    console.error = consoleError;
  });
});
