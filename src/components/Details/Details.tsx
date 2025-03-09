import { useRouter, useSearchParams } from 'next/navigation';
import { ResultItem } from '@/models/ResultItem.model';
import { ThemeEnum } from '@/models/Theme.enum';
import { useTheme } from '@/hooks/useTheme.tsx';

export const Details = ({
  characterDetails = null,
}: {
  characterDetails: ResultItem | null;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { theme } = useTheme();

  const handleGoToMain = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', '1');
    router.push(`/?${params.toString()}`);
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
        <button type="button" onClick={handleGoToMain}>
          Close
        </button>
      </div>
    )
  );
};
