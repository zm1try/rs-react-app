import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { makeStore } from '@/store/store';
import { swApi } from '@/store/api/swApi';
import MainLayout from '@/components/MainLayout/MainLayout';
import DetailsPage, { getServerSideProps } from '@/pages/details/[id]';

vi.mock('@/store/store', () => ({
  makeStore: vi.fn(),
}));

vi.mock('@/store/api/swApi', () => ({
  swApi: {
    endpoints: {
      getCharacters: {
        initiate: vi.fn(),
      },
      getCharacterDetails: {
        initiate: vi.fn(),
      },
    },
  },
}));

vi.mock('@/components/MainLayout/MainLayout', () => ({
  default: vi.fn(() => <div data-testid="main-layout">MainLayout</div>),
}));

describe('DetailsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getServerSideProps', () => {
    it('returns an error prop when fetching fails', async () => {
      const mockDispatch = vi.fn();
      const mockStore = { dispatch: mockDispatch };
      (makeStore as vi.Mock).mockReturnValue(mockStore);

      (swApi.endpoints.getCharacters.initiate as vi.Mock).mockRejectedValue(
        new Error('Error')
      );
      (
        swApi.endpoints.getCharacterDetails.initiate as vi.Mock
      ).mockRejectedValue(new Error('Error'));

      const context = {
        query: { id: '1', page: '1', search: 'test' },
      };

      const result = await getServerSideProps(context);

      expect(result).toEqual({
        props: {
          error: 'Something went wrong',
        },
      });
    });
  });

  describe('DetailsPage component', () => {
    it('renders MainLayout with the correct props', () => {
      const mockCharacters = [{ name: 'Character 1' }];
      const mockCharacterDetails = { name: 'Character Details' };

      const { getByTestId } = render(
        <DetailsPage
          characters={mockCharacters}
          characterDetails={mockCharacterDetails}
          error={undefined}
        />
      );

      expect(getByTestId('main-layout')).toBeInTheDocument();
      expect(MainLayout).toHaveBeenCalledWith(
        {
          characters: mockCharacters,
          characterDetails: mockCharacterDetails,
          error: undefined,
          withDetails: true,
        },
        {}
      );
    });

    it('renders MainLayout with an error prop', () => {
      const { getByTestId } = render(
        <DetailsPage
          characters={[]}
          characterDetails={null}
          error="Something went wrong"
        />
      );

      expect(getByTestId('main-layout')).toBeInTheDocument();
      expect(MainLayout).toHaveBeenCalledWith(
        {
          characters: [],
          characterDetails: null,
          error: 'Something went wrong',
          withDetails: true,
        },
        {}
      );
    });
  });
});
