import MainLayout from '@/components/MainLayout/MainLayout';
import { ResultItem } from '@/models/ResultItem.model';
import { swapiService } from '@/api/swapiService';

export const metadata = {
  title: 'Details Page',
  description: 'A Next.js App Router example',
};

export default async function DetailsPage({
  searchParams,
  params,
}: {
  searchParams: Promise<{ page?: string; search?: string }>;
  params: Promise<{ id: string }>;
}) {
  const { page, search } = await searchParams;
  const { id } = await params;
  let charactersData: { characters: ResultItem[] } | null = null;
  let characterDetailsData: ResultItem | null = null;
  let isError = false;

  try {
    charactersData = await swapiService.fetchCharacters({
      page: Number(page) || 1,
      searchQuery: search || '',
    });
  } catch (_error) {
    isError = Boolean(_error);
  }

  try {
    characterDetailsData = await swapiService.fetchCharacter(id);
  } catch (_error) {
    isError = Boolean(_error);
  }

  if (!charactersData || !characterDetailsData) {
    return <div>Not Found</div>;
  }

  if (isError) {
    return <div>Something went wrong</div>;
  }

  return (
    <MainLayout
      characters={charactersData.characters}
      characterDetails={characterDetailsData}
      withDetails={true}
    />
  );
}
