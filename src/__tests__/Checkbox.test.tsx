import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { useDispatch } from 'react-redux';
import { switchSelection } from '@/store/selectedChatactersReducer';
import { addItem, removeItemByKey } from '@/store/savedItems';
import { Checkbox } from '@/components/Checkbox/Checkbox';

vi.mock('react-redux', async () => {
  const actual = await vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: vi.fn(),
  };
});

const mockStore = configureMockStore();
const characterMock = {
  id: '1',
  name: 'Test Character',
  url: 'http://test-character-url.com',
  status: 'Alive',
  species: 'Human',
  gender: 'Male',
  origin: { name: 'Earth' },
  location: { name: 'Earth' },
  image: 'test_image.jpg',
};

describe('Checkbox', () => {
  let mockDispatch: vi.Mock;

  beforeEach(() => {
    mockDispatch = vi.fn();
    (useDispatch as vi.Mock).mockReturnValue(mockDispatch);
  });

  it('renders correctly and initializes characterKey', () => {
    const store = mockStore({
      selectedCharacters: { selected: [] },
    });

    const { getByRole } = render(
      <Provider store={store}>
        <Checkbox character={characterMock} />
      </Provider>
    );

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
    expect(checkbox).not.toBeChecked();
  });

  it('checks the checkbox if the character is selected', () => {
    const store = mockStore({
      selectedCharacters: { selected: [characterMock.url] },
    });

    const { getByRole } = render(
      <Provider store={store}>
        <Checkbox character={characterMock} />
      </Provider>
    );

    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeChecked();
  });

  it('dispatches switchSelection and addItem when checkbox is checked', () => {
    const store = mockStore({
      selectedCharacters: { selected: [] },
    });

    const { getByRole } = render(
      <Provider store={store}>
        <Checkbox character={characterMock} />
      </Provider>
    );

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(
      switchSelection(characterMock.url)
    );
    expect(mockDispatch).toHaveBeenCalledWith(addItem(characterMock));
  });

  it('dispatches switchSelection and removeItemByKey when checkbox is unchecked', () => {
    const store = mockStore({
      selectedCharacters: { selected: [characterMock.url] },
    });

    const { getByRole } = render(
      <Provider store={store}>
        <Checkbox character={characterMock} />
      </Provider>
    );

    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(
      switchSelection(characterMock.url)
    );
    expect(mockDispatch).toHaveBeenCalledWith(
      removeItemByKey(characterMock.url)
    );
  });
});
