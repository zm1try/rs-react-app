'use server';
import { useRouter } from 'next/router';
import { ResultItem } from '@/models/ResultItem.model';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ThemeEnum } from '@/models/Theme.enum';

export const Details = ({
  characterDetails = null,
}: {
  characterDetails: ResultItem | null;
}) => {
  const router = useRouter();
  const theme = useSelector((state: RootState) => state.theme.theme.state);

  const handleMainClick = () => {
    router.push('/');
  };

  return (
    characterDetails && (
      <div
        className={`details-container flex-text ${theme === ThemeEnum.DARK ? 'dark' : 'light'}`}
      >
        <div>
          <h3>Name: {characterDetails.name}</h3>
          <p>Birth year: {characterDetails.birth_year}</p>
        </div>
        <button type="button" onClick={handleMainClick}>
          Close
        </button>
      </div>
    )
  );
};
