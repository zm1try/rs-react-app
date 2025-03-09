'use server';
import { useRouter } from 'next/router';
import Card from '../Card/Card';
import { ResultItem } from '@/models/ResultItem.model';
import { ReactNode } from 'react';

type ResultsProps = {
  characters: ResultItem[];
  searchQuery: string;
  errorMessage: string;
  children: ReactNode;
};

export default function Results({
  characters,
  searchQuery,
  errorMessage,
  children,
}: ResultsProps) {
  const router = useRouter();

  const handleClickCard = async (character: ResultItem) => {
    const id = character?.url.split('/').filter(Boolean).pop() || '';
    if (id) {
      router.push({
        pathname: '/details/[id]',
        query: { id, page: 1, ...router.query },
      });
    }
  };

  if (characters?.length > 0) {
    return (
      <div data-testid="results-container" className={'results-container'}>
        <div className={'results-list'}>
          {characters?.map((character: ResultItem) => (
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

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (!characters.length && !errorMessage) {
    return <p>Nothing to show for search term: {searchQuery}</p>;
  }
}
