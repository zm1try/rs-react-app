import MainLayout from '@/components/MainLayout/MainLayout';
import { ResultItem } from '@/models/ResultItem.model';
import { swapiService } from '@/api/swapiService';
import { InitialLoader } from '@/components/InitialLoader/InitialLoader';

export const metadata = {
  title: 'Home Page',
  description: 'A Next.js App Router example',
};

export default async function HomePage({
  searchParams,
}: {
  searchParams: { page?: string; search?: string };
}) {
  const { page, search } = await searchParams;
  let charactersData: { characters: ResultItem[] } | null = null;
  let isError = false;

  if (page) {
    try {
      charactersData = await swapiService.fetchCharacters({
        page: Number(page) || 1,
        searchQuery: search || '',
      });
    } catch (_error) {
      isError = Boolean(_error);
    }

    if (!charactersData) {
      return <div>Not Found</div>;
    }

    if (isError) {
      return <div>Something went wrong</div>;
    }

    return (
      <MainLayout
        characters={charactersData.characters}
        characterDetails={null}
        withDetails={false}
      />
    );
  } else {
    return <InitialLoader />;
  }
}
