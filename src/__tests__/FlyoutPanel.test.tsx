import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';
import { clearAllSelected } from '@/store/selectedChatactersReducer';
import { removeAllItems } from '@/store/savedItems';
import { formatToCsv } from '@/services/formatToCsv';
import { ThemeEnum } from '@/models/Theme.enum';
import { FlyoutPanel } from '@/components/FlyoutPanel/FlyoutPanel.tsx';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

vi.mock('@/services/formatToCsv', () => ({
  formatToCsv: vi.fn(),
}));

const mockStore = configureMockStore();

describe('FlyoutPanel', () => {
  let mockDispatch: vi.Mock;

  beforeEach(() => {
    (window.URL.createObjectURL as vi.Mock) = vi.fn();
    mockDispatch = vi.fn();
    (useDispatch as vi.Mock).mockReturnValue(mockDispatch);
    (formatToCsv as vi.Mock).mockReturnValue('mocked_csv_data');
  });

  it('renders correctly when there are selected characters', () => {
    const store = mockStore({
      selectedCharacters: { selected: ['character1', 'character2'] },
      savedItems: { characters: [] },
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByText } = render(
      <Provider store={store}>
        <FlyoutPanel />
      </Provider>
    );

    expect(getByText('2 items are selected')).toBeInTheDocument();
    expect(getByText('Unselect all')).toBeInTheDocument();
    expect(getByText('Download')).toBeInTheDocument();
  });

  it('does not render when there are no selected characters', () => {
    const store = mockStore({
      selectedCharacters: { selected: [] },
      savedItems: { characters: [] },
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { container } = render(
      <Provider store={store}>
        <FlyoutPanel />
      </Provider>
    );

    expect(container.firstChild).toBeNull();
  });

  it('dispatches clearAllSelected and removeAllItems when "Unselect all" is clicked', () => {
    const store = mockStore({
      selectedCharacters: { selected: ['character1'] },
      savedItems: { characters: [] },
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByText } = render(
      <Provider store={store}>
        <FlyoutPanel />
      </Provider>
    );

    const unselectAllButton = getByText('Unselect all');
    fireEvent.click(unselectAllButton);

    expect(mockDispatch).toHaveBeenCalledWith(clearAllSelected());
    expect(mockDispatch).toHaveBeenCalledWith(removeAllItems());
  });

  it('calls formatToCsv and triggers download when "Download" is clicked', () => {
    const store = mockStore({
      selectedCharacters: { selected: ['character1'] },
      savedItems: { characters: [{ id: '1', name: 'Character 1' }] },
      theme: { theme: { state: ThemeEnum.LIGHT } },
    });

    const { getByText } = render(
      <Provider store={store}>
        <FlyoutPanel />
      </Provider>
    );

    const downloadButton = getByText('Download');
    const createElementSpy = vi.spyOn(document, 'createElement');
    const clickSpy = vi.fn();
    createElementSpy.mockReturnValue({
      href: '',
      download: '',
      click: clickSpy,
    } as unknown as HTMLAnchorElement);

    fireEvent.click(downloadButton);

    expect(formatToCsv).toHaveBeenCalledWith([
      { id: '1', name: 'Character 1' },
    ]);
    expect(createElementSpy).toHaveBeenCalledWith('a');
    expect(clickSpy).toHaveBeenCalled();
  });
});
