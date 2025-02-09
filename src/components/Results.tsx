import { type FC } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { ResultsProps } from '../models/ResultsProps.model.ts';
import { ResultItem } from '../models/ResultItem.model.ts';
import { Card } from './Card.tsx';
import './Results.css';

export const Results: FC<ResultsProps> = ({
  characters,
  searchQuery,
  errorMessage,
}) => {
  const navigate = useNavigate();

  const handleClickCard = (
    event: React.MouseEvent<HTMLButtonElement>,
    character: ResultItem | null
  ) => {
    event.stopPropagation();
    const id = character?.url.split('/').filter(Boolean).pop() || '';
    navigate(`/characters/details/${id}`);
  };

  const handleCloseCard = () => {
    navigate(`/characters`);
  };

  return characters && characters.length > 0 ? (
    <div className={'results-container'} onClick={handleCloseCard}>
      <div className={'results-list'}>
        {characters?.map((character: ResultItem) => (
          <div className={'results-list__item'} key={character.name}>
            <Card character={character} onClick={handleClickCard} />
          </div>
        ))}
      </div>
      <Outlet />
    </div>
  ) : (
    !errorMessage && <p>Nothing to show for search term: {searchQuery}</p>
  );
};
