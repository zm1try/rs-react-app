import { ResultItem } from '../../models/ResultItem.model';
import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { swapiService } from '../../services/swapiService';
import { Loader } from '../Loader/Loader';

export const Details = () => {
  const navigate = useNavigate();
  const [selectedCharacter, setSelectedCharacter] = useState<ResultItem | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [innerErrorMessage, setInnerErrorMessage] = useState('');

  const { itemId } = useParams();
  const loadData = useCallback(async (itemId: string) => {
    setLoading(true);

    try {
      const character = (await swapiService.fetchCharacter(itemId)) || null;
      setSelectedCharacter(character);
      setLoading(false);
    } catch (error) {
      const message = error instanceof Error ? error.message : `${error}`;
      setInnerErrorMessage(message);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(itemId || '');
  }, [itemId, loadData]);

  const handleMainClick = () => {
    navigate('/');
  };

  return loading ? (
    <Loader />
  ) : (
    (selectedCharacter && (
      <div className={'details-container'}>
        <div>
          <h3>Name: {selectedCharacter.name}</h3>
          <p>Birth year: {selectedCharacter.birth_year}</p>
        </div>
        <button type="button" onClick={handleMainClick}>
          Close
        </button>
      </div>
    )) || <p>{innerErrorMessage}</p>
  );
};
