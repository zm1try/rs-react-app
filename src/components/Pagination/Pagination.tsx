import { useRouter, useSearchParams } from 'next/navigation';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ThemeEnum } from '@/models/Theme.enum';

export const Pagination = () => {
  const router = useRouter();
  const theme = useSelector((state: RootState) => state.theme.theme.state);
  const searchParams = useSearchParams();

  // if (!searchParams.get('page')) {
  //   const params = new URLSearchParams(searchParams.toString());
  //   params.set('page', '1');
  //   router.replace(`?${params.toString()}`);
  // }

  const page = searchParams.get('page');

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Number(page) !== newPage) {
      params.set('page', newPage.toString());
      router.push(`?${params.toString()}`);
    }
  };

  return (
    <div
      className={`pagination-container flex-text ${theme === ThemeEnum.DARK ? 'dark' : 'light'}`}
    >
      <button
        onClick={() => handlePageChange(Number(page) - 1)}
        disabled={!page || Number(page) === 1}
      >
        Previous
      </button>
      <div>
        <span>Page {Number(page) || 1}</span>
      </div>
      <button onClick={() => handlePageChange(Number(page) + 1)}>Next</button>
    </div>
  );
};
