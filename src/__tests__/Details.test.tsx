import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/router';
import { ThemeEnum } from '@/models/Theme.enum';
import { useTheme } from '@/hooks/useTheme.tsx';
import { Details } from '@/components/Details/Details.tsx';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('@/hooks/useTheme.tsx', () => ({
  useTheme: vi.fn(),
}));

describe('Details', () => {
  let mockRouterPush: vi.Mock;

  beforeEach(() => {
    mockRouterPush = vi.fn();
    (useRouter as vi.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    (useTheme as vi.Mock).mockReturnValue({
      theme: ThemeEnum.LIGHT,
    });
  });

  const characterDetailsMock = {
    name: 'Luke Skywalker',
    birth_year: '19BBY',
    url: 'https://swapi.dev/api/people/1/',
  };

  it('renders character details when characterDetails is provided', () => {
    const { getByText } = render(
      <Details characterDetails={characterDetailsMock} />
    );

    expect(getByText('Name: Luke Skywalker')).toBeInTheDocument();
    expect(getByText('Birth year: 19BBY')).toBeInTheDocument();
  });

  it('applies the correct theme class based on the current theme', () => {
    const { container } = render(
      <Details characterDetails={characterDetailsMock} />
    );

    const detailsContainer = container.querySelector('.details-container');
    expect(detailsContainer).toHaveClass('light');
  });

  it('updates the theme class when the theme changes', () => {
    (useTheme as vi.Mock).mockReturnValueOnce({
      theme: ThemeEnum.DARK,
    });

    const { container } = render(
      <Details characterDetails={characterDetailsMock} />
    );

    const detailsContainer = container.querySelector('.details-container');
    expect(detailsContainer).toHaveClass('dark');
  });

  it('navigates to the main page when the "Close" button is clicked', () => {
    const { getByText } = render(
      <Details characterDetails={characterDetailsMock} />
    );

    const closeButton = getByText('Close');
    fireEvent.click(closeButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/');
  });

  it('does not render anything when characterDetails is null', () => {
    const { container } = render(<Details characterDetails={null} />);

    expect(container.firstChild).toBeNull();
  });
});
