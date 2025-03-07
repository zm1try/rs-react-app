import {
  CombinedState,
  createApi,
  EndpointDefinitions,
  fetchBaseQuery,
} from '@reduxjs/toolkit/query/react';
import { ResultItem } from '@/models/ResultItem.model';
import { Action } from 'redux';
import { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/store/store';

function isHydrateAction(action: Action): action is PayloadAction<RootState> {
  return action.type === 'HYDRATE';
}

export const swApi = createApi({
  reducerPath: 'swApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://swapi.dev/api/people/',
  }),
  extractRehydrationInfo(
    action,
    { reducerPath }
  ): CombinedState<EndpointDefinitions, string, 'swApi'> | undefined {
    if (isHydrateAction(action)) {
      return action.payload[reducerPath];
    }
  },
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
