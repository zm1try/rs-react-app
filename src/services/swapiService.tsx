import { ResultItem } from '../models/ResultItem.model';

interface Results {
  count: number;
  next: string;
  previous: string;
  results?: ResultItem[];
}

async function fetchData<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.status.toString());
  }
  return await response.json();
}

const getCharactersBySearchTerm = async (
  searchQuery: string,
  page: number
): Promise<Results> => {
  const searchParams = new URLSearchParams([
    ['search', searchQuery],
    ['page', page.toString()],
    ['offset', (page - 1 > 0 ? page * 10 : 0).toString()],
  ]);

  const url = `https://swapi.dev/api/people/?${searchParams.toString()}`;

  return fetchData(url);
};

const getCharacterById = async (id: string): Promise<ResultItem> => {
  const url = `https://swapi.dev/api/people/${id}`;
  return fetchData(url);
};

const getCharactersDetails = {
  async fetchCharacter(id: string) {
    return (await getCharacterById(id)) || null;
  },
};

const getCharacters = {
  async fetchCharacters(searchQuery: string, page: number) {
    const { results: characters } = await getCharactersBySearchTerm(
      searchQuery,
      page
    );
    return { characters: characters || [] };
  },
};

export const swapiService = {
  ...getCharacters,
  ...getCharactersDetails,
};
