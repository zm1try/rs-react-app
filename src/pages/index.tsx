import MainLayout from '@/components/MainLayout/MainLayout';
import { ResultItem } from '@/models/ResultItem.model';
import { makeStore } from '@/store/store';
import { swApi } from '@/store/api/swApi';

export const getServerSideProps = async (context: {
  query: { page: string; search: string };
}) => {
  let charactersData = null;
  let isError = false;
  const store = makeStore();
  try {
    const { data } = await store.dispatch(
      swApi.endpoints.getCharacters.initiate({
        page: Number(context.query.page) || 1,
        search: context.query.search || '',
        offset: 0,
      })
    );
    charactersData = data;
  } catch (_error) {
    isError = Boolean(_error);
  }

  if (!charactersData) {
    return {
      notFound: true,
    };
  }

  if (isError) {
    return {
      props: { error: 'Something went wrong' },
    };
  }

  return {
    props: { characters: charactersData.results },
  };
};

const HomePage = ({
  characters,
  characterDetails,
}: {
  error?: string;
  characters: ResultItem[];
  characterDetails: ResultItem | null;
}) => {
  return (
    <MainLayout
      characters={characters}
      characterDetails={characterDetails}
      withDetails={false}
    />
  );
};

export default HomePage;
