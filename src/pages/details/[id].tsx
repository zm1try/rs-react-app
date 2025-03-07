import MainLayout from '@/components/MainLayout/MainLayout';
import { ResultItem } from '@/models/ResultItem.model';
import { makeStore } from '@/store/store';
import { swApi } from '@/store/api/swApi';

export const getServerSideProps = async (context: {
  query: { id: string; page: string; search: string };
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

  let characterDetails = null;
  if (context.query.id) {
    try {
      const { data } = await store.dispatch(
        swApi.endpoints.getCharacterDetails.initiate(context.query.id)
      );
      characterDetails = data;
    } catch (_error) {
      isError = Boolean(_error);
    }
  }

  if (isError) {
    return {
      props: { error: 'Something went wrong' },
    };
  }

  if (!charactersData || (context.query.id && !characterDetails)) {
    return {
      notFound: true,
    };
  }

  return {
    props: { characters: charactersData.results, characterDetails },
  };
};

const DetailsPage = ({
  error,
  characters,
  characterDetails,
}: {
  error?: string;
  characters: ResultItem[];
  characterDetails: ResultItem | null;
}) => {
  return (
    <MainLayout
      error={error}
      characters={characters}
      characterDetails={characterDetails}
      withDetails={true}
    />
  );
};

export default DetailsPage;
