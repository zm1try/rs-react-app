import { Pokemon } from './Pokemon.interface.ts';

export interface SearchComponentState {
  items: Pokemon[];
  isLoading: boolean;
  error: string;
  throwError: boolean;
}
