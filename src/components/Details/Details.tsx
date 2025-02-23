import { ResultItem } from '../../models/ResultItem.model';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Loader } from '../Loader/Loader';
import { useGetCharacterDetailsQuery } from '../../api/swApi';
import { useTheme } from '../../hooks/useTheme';
import { ThemeEnum } from '../../models/Theme.enum';

export const Details = () => {
  const { theme } = useTheme();
  const { itemId = '' } = useParams();
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState<ResultItem | null>(
    null
  );
  const { data, isLoading, isFetching, error } =
    useGetCharacterDetailsQuery(itemId);

  useEffect(() => {
    if (data) {
      setSelectedCharacter(data);
    }
  }, [data]);

  const handleMainClick = () => {
    navigate('/');
  };

  return isLoading || isFetching ? (
    <Loader />
  ) : (
    (selectedCharacter && (
      <div
        className={`details-container flex-text ${theme === ThemeEnum.DARK ? 'dark' : 'light'}`}
      >
        <div>
          <h3>Name: {selectedCharacter.name}</h3>
          <p>Birth year: {selectedCharacter.birth_year}</p>
        </div>
        <button type="button" onClick={handleMainClick}>
          Close
        </button>
      </div>
    )) || <p>{error instanceof Error ? error.message : `${error}`}</p>
  );
};
