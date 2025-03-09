'use client';

import Search from '@/components/Search/Search';
import Results from '@/components/Results/Results';
import { FooterActions } from '@/components/FooterActions/FooterActions';
import { FlyoutPanel } from '@/components/FlyoutPanel/FlyoutPanel';
import { ResultItem } from '@/models/ResultItem.model';
import { Details } from '@/components/Details/Details';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { ThemeEnum } from '@/models/Theme.enum';
const MainLayout = ({
  characters,
  characterDetails = null,
  withDetails,
}: {
  characters: ResultItem[];
  characterDetails?: ResultItem | null;
  withDetails: boolean;
}) => {
  const theme = useSelector((state: RootState) => state.theme.theme.state);

  if (!characters) {
    return <div>Not Found</div>;
  }

  const isPaginationVisible = characters && characters.length > 0;

  return (
    <>
      <h1
        className={`flex-text ${theme === ThemeEnum.DARK ? 'dark' : 'light'}`}
      >
        swApi search
      </h1>
      <Search />
      {
        <Results characters={characters || []} searchQuery={''}>
          {withDetails && <Details characterDetails={characterDetails} />}
        </Results>
      }
      <FlyoutPanel />
      <FooterActions isPaginationVisible={Boolean(isPaginationVisible)} />
    </>
  );
};

export default MainLayout;
