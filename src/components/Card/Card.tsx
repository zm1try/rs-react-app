import { ResultItem } from '../../models/ResultItem.model';
import { Checkbox } from '../Checkbox/Checkbox';
import { useTheme } from '../../hooks/useTheme';
import { ThemeEnum } from '../../models/Theme.enum';

type CardProps = {
  character: ResultItem;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    character: ResultItem
  ) => void;
};

export const Card = ({ character, onClick }: CardProps) => {
  const { theme } = useTheme();

  return (
    <>
      <Checkbox character={character} />
      <button
        className={`flex-text ${theme === ThemeEnum.DARK ? 'dark' : 'light'}`}
        onClick={(event) => onClick(event, character)}
      >
        <p>{character.name}</p>
      </button>
    </>
  );
};
