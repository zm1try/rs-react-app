import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { removeAllItems } from '../../store/savedItems';
import { clearAllSelected } from '../../store/selectedChatactersReducer';
import { formatToCsv } from '../../services/formatToCsv';
import { ThemeEnum } from '../../models/Theme.enum';
import { useTheme } from '../../hooks/useTheme';

export const FlyoutPanel = () => {
  const dispatch = useDispatch();
  const { theme } = useTheme();
  const selectedCharacters = useSelector(
    (state: RootState) => state.selectedCharacters.selected
  );
  const savedItems = useSelector(
    (state: RootState) => state.savedItems.characters
  );

  const handleUnselectAll = () => {
    dispatch(clearAllSelected());
    dispatch(removeAllItems());
  };

  const handleDownload = () => {
    const data = formatToCsv(savedItems);
    const blob = new Blob([data], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${savedItems.length}_characters.csv`;
    link.click();
  };

  return (
    <>
      {selectedCharacters?.length > 0 && (
        <>
          <div className="flayout-panel">
            <div
              className={`flex-text ${theme === ThemeEnum.DARK ? 'dark' : 'light'}`}
            >
              {selectedCharacters.length} items are selected
            </div>
            <button onClick={handleUnselectAll}>Unselect all</button>
            <button onClick={handleDownload}>Download</button>
          </div>
        </>
      )}
    </>
  );
};
