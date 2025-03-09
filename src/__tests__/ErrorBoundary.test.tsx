import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ErrorBoundary } from '@/components/ErrorBoundary/ErrorBoundary';

describe('ErrorBoundary', () => {
  it('renders children when there is no error', () => {
    const ChildComponent = () => <div>Child Component</div>;

    render(
      <ErrorBoundary>
        <ChildComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders fallback UI when an error is thrown', () => {
    const ErrorThrowingComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText('Something went wrong')).toBeInTheDocument();
  });

  it('calls componentDidCatch when an error is thrown', () => {
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});
    const ErrorThrowingComponent = () => {
      throw new Error('Test error');
    };

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>
    );

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'ErrorBoundary caught an error',
      expect.any(Error),
      expect.any(Object)
    );

    consoleErrorSpy.mockRestore();
  });
});
