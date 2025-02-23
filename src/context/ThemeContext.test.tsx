import { useContext } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from './ThemeContext';
import { ThemeContext } from '../hooks/useTheme';

const MockChildComponent = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div>
      <span>Current Theme: {theme}</span>
      <button onClick={toggleTheme}>Toggle Theme</button>
    </div>
  );
};

describe('ThemeProvider Component', () => {
  it('should render with initial dark theme', () => {
    render(
      <ThemeProvider>
        <MockChildComponent />
      </ThemeProvider>
    );
    expect(screen.getByText('Current Theme: 0')).toBeInTheDocument();
  });

  it('should toggle theme from dark to light', () => {
    render(
      <ThemeProvider>
        <MockChildComponent />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByText('Current Theme: 1')).toBeInTheDocument();
  });

  it('should toggle theme from light to dark', () => {
    render(
      <ThemeProvider>
        <MockChildComponent />
      </ThemeProvider>
    );
    fireEvent.click(screen.getByText('Toggle Theme'));
    fireEvent.click(screen.getByText('Toggle Theme'));
    expect(screen.getByText('Current Theme: 0')).toBeInTheDocument();
  });
});
