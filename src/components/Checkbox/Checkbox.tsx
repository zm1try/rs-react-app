import { useDispatch, useSelector } from 'react-redux';
import { switchSelection } from '@/store/selectedChatactersReducer';
import { RootState } from '@/store/store';
import { ResultItem } from '@/models/ResultItem.model';
import { useEffect, useState } from 'react';
import { addItem, removeItemByKey } from '@/store/savedItems';

export const Checkbox = ({ character }: { character: ResultItem }) => {
  const [characterKey, setCharacterKey] = useState('');
  const dispatch = useDispatch();
  const isSelected = useSelector((state: RootState) =>
    state.selectedCharacters.selected.includes(characterKey)
  );

  useEffect(() => {
    if (character) {
      setCharacterKey(character.url);
    }
  }, [character]);

  const handleChange = () => {
    dispatch(switchSelection(characterKey));
    dispatch(isSelected ? removeItemByKey(character.url) : addItem(character));
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={isSelected} onChange={handleChange} />
      </label>
    </div>
  );
};
