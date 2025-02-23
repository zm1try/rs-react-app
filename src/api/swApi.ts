import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ResultItem } from '../models/ResultItem.model';
export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api/people/',
  }),
  endpoints: (builder) => {
    return {
      getCharacters: builder.query<
        { results: ResultItem[] },
        { page: number; offset: number; search: string }
      >({
        query: ({ offset, page, search }) =>
          `?page=${String(page)}&search=${String(search)}&offset=${String(offset)}`,
      }),
      getCharacterDetails: builder.query<ResultItem, string>({
        query: (id: string) => `${id}`,
      }),
    };
  },
});

export const { useGetCharactersQuery, useGetCharacterDetailsQuery } = swApi;
