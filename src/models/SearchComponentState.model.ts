import { Pokemon } from './Pokemon.model.ts';

export interface SearchComponentState {
  items: Pokemon[];
  isLoading: boolean;
  error: string;
  throwError: boolean;
}
