import { Pokemon } from './Pokemon.interface.ts';

export interface ResultsProps {
  items: Pokemon[];
  isLoading: boolean;
  error: string;
}
