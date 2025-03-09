import { ResultItem } from '@/models/ResultItem.model';
import { Checkbox } from '../Checkbox/Checkbox';
import { ThemeEnum } from '@/models/Theme.enum';
import { useTheme } from '@/hooks/useTheme.tsx';

type CardProps = {
  character: ResultItem;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    character: ResultItem
  ) => void;
};

const Card = ({ character, onClick }: CardProps) => {
  const { theme } = useTheme();

  return (
    <div className={`card ${theme === ThemeEnum.DARK ? 'dark' : 'light'}`}>
      <Checkbox character={character} />
      <button
        className="card-button"
        onClick={(event) => onClick(event, character)}
      >
        <p>{character.name}</p>
      </button>
    </div>
  );
};

export default Card;
