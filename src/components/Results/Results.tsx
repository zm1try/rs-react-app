import { Outlet, useNavigate } from 'react-router-dom';
import { Card } from '../Card/Card';
import { ResultItem } from '../../models/ResultItem.model';

type ResultsProps = {
  characters: ResultItem[];
  searchQuery: string;
  errorMessage: string;
};

export function Results({
  characters,
  searchQuery,
  errorMessage,
}: ResultsProps) {
  const navigate = useNavigate();

  const handleClickCard = (
    event: React.MouseEvent<HTMLButtonElement>,
    character: ResultItem
  ) => {
    event.stopPropagation();
    const id = character?.url.split('/').filter(Boolean).pop() || '';
    navigate(`/details/${id}`);
  };

  const handleCloseCard = () => {
    navigate(`/`);
  };

  return (
    <>
      {characters?.length > 0 && (
        <div
          data-testid="results-container"
          className={'results-container'}
          onClick={handleCloseCard}
        >
          <div className={'results-list'}>
            {characters?.map((character: ResultItem) => (
              <div className={'results-list__item'} key={character.name}>
                <Card character={character} onClick={handleClickCard} />
              </div>
            ))}
          </div>
          <Outlet></Outlet>
        </div>
      )}
      {!errorMessage && <p>Nothing to show for search term: {searchQuery}</p>}
    </>
  );
}
