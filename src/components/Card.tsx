import { ResultItem } from '../models/ResultItem.model';

type CardProps = {
  character: ResultItem;
  onClick: (
    event: React.MouseEvent<HTMLButtonElement>,
    character: ResultItem
  ) => void;
};

export const Card = ({ character, onClick }: CardProps) => {
  return (
    <button onClick={(event) => onClick(event, character)}>
      <p>{character.name}</p>
    </button>
  );
};
