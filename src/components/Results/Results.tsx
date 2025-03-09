import { useRouter, useSearchParams } from 'next/navigation';
import Card from '../Card/Card';
import { ResultItem } from '@/models/ResultItem.model';
import { ReactNode } from 'react';

type ResultsProps = {
  characters: ResultItem[];
  searchQuery: string;
  children: ReactNode;
};

export default function Results({
  characters,
  searchQuery,
  children,
}: ResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleClickCard = (character: ResultItem) => {
    const id = character?.url.split('/').filter(Boolean).pop() || '';
    if (id) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');
      router.push(`/details/${id}?${params.toString()}`);
    }
  };

  if (characters?.length > 0) {
    return (
      <div data-testid="results-container" className={'results-container'}>
        <div className={'results-list'}>
          {characters.map((character: ResultItem) => (
            <div className={'results-list__item'} key={character.name}>
              <Card
                character={character}
                onClick={() => handleClickCard(character)}
              />
            </div>
          ))}
        </div>
        {children}
      </div>
    );
  }

  if (!characters.length) {
    return <p>Nothing to show for search term: {searchQuery}</p>;
  }

  return null;
}
