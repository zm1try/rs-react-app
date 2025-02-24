const SWITCH_SELECTION = 'SWITCH_SELECTION';
const UNSELECT_ALL = 'UNSELECT_ALL';

const initialState: {
  type: string;
  selected: (string | undefined)[];
  payload?: string;
} = {
  type: '',
  selected: [],
};

export function selectedCharacters(
  state = initialState,
  action: { type: string; selected?: (string | undefined)[]; payload?: string }
) {
  switch (action.type) {
    case SWITCH_SELECTION: {
      const isNeedToRemove = state.selected.includes(action.payload || '');
      const selected = isNeedToRemove
        ? state.selected.filter((id) => id !== action.payload)
        : [...state.selected, action.payload];
      return {
        ...state,
        selected,
      };
    }
    case UNSELECT_ALL:
      return { ...state, selected: [] };
    default:
      return state;
  }
}

export const switchSelection = (id: string) => ({
  type: SWITCH_SELECTION,
  payload: id,
});

export const clearAllSelected = () => ({
  type: UNSELECT_ALL,
});

export default selectedCharacters;
