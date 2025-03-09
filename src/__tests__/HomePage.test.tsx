import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import HomePage, { getServerSideProps } from '../pages/index';
import { makeStore } from '@/store/store';
import { swApi } from '@/store/api/swApi';
import MainLayout from '@/components/MainLayout/MainLayout';

vi.mock('@/store/store', () => ({
  makeStore: vi.fn(),
}));

vi.mock('@/store/api/swApi', () => ({
  swApi: {
    endpoints: {
      getCharacters: {
        initiate: vi.fn(),
      },
    },
  },
}));

vi.mock('@/components/MainLayout/MainLayout', () => ({
  default: vi.fn(() => <div data-testid="main-layout">MainLayout</div>),
}));

describe('HomePage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getServerSideProps', () => {
    it('returns notFound when data is missing', async () => {
      const mockDispatch = vi.fn();
      const mockStore = { dispatch: mockDispatch };
      (makeStore as vi.Mock).mockReturnValue(mockStore);

      (swApi.endpoints.getCharacters.initiate as vi.Mock).mockResolvedValue({
        data: null,
      });

      const context = {
        query: { page: '1', search: 'test' },
      };

      const result = await getServerSideProps(context);

      expect(result).toEqual({
        notFound: true,
      });
    });
  });

  describe('HomePage component', () => {
    it('renders MainLayout with the correct props', () => {
      const mockCharacters = [{ name: 'Character 1' }];

      const { getByTestId } = render(
        <HomePage characters={mockCharacters} characterDetails={null} />
      );

      expect(getByTestId('main-layout')).toBeInTheDocument();
      expect(MainLayout).toHaveBeenCalledWith(
        {
          characters: mockCharacters,
          characterDetails: null,
          withDetails: false,
        },
        {}
      );
    });

    it('renders MainLayout with an error prop', () => {
      const { getByTestId } = render(
        <HomePage
          characters={[]}
          characterDetails={null}
          error="Something went wrong"
        />
      );

      expect(getByTestId('main-layout')).toBeInTheDocument();
    });
  });
});
