import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render } from '@testing-library/react';
import { AppStore, makeStore } from '@/store/store.ts';
import StoreProvider from '@/app/StoreProvider.tsx';

vi.mock('@/store/store.ts', () => ({
  makeStore: vi.fn(),
}));

vi.mock('react-redux', () => ({
  Provider: ({
    store,
    children,
  }: {
    store: AppStore;
    children: React.ReactNode;
  }) => (
    <div data-testid="provider" data-store={store}>
      {children}
    </div>
  ),
}));

describe('StoreProvider', () => {
  let mockStore: AppStore;

  beforeEach(() => {
    mockStore = { mockKey: 'mockValue' } as unknown as AppStore;
    (makeStore as vi.Mock).mockReturnValue(mockStore);
  });

  it('creates the Redux store using makeStore', () => {
    render(
      <StoreProvider>
        <div>Child Component</div>
      </StoreProvider>
    );

    expect(makeStore).toHaveBeenCalledTimes(1);
  });

  it('renders the Provider with the created store', () => {
    const { getByTestId } = render(
      <StoreProvider>
        <div>Child Component</div>
      </StoreProvider>
    );

    const provider = getByTestId('provider');
    expect(provider).toBeInTheDocument();
  });

  it('renders the children inside the Provider', () => {
    const { getByText } = render(
      <StoreProvider>
        <div>Child Component</div>
      </StoreProvider>
    );

    expect(getByText('Child Component')).toBeInTheDocument();
  });
});
