import { ResultItem } from '@/models/ResultItem.model';
import { Checkbox } from '../Checkbox/Checkbox';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ThemeEnum } from '@/models/Theme.enum';

type CardProps = {
  character: ResultItem;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    character: ResultItem
  ) => void;
};

const Card = ({ character, onClick }: CardProps) => {
  const theme = useSelector((state: RootState) => state.theme.theme.state);

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
